import { Plugin } from '@nocobase/client';
import { WatermarkService } from './WatermarkService';
import React from 'react';
import { useCurrentUserContext } from '@nocobase/client';
import { observer } from '@formily/reactive-react';

interface WatermarkComponentProps {
  watermarkService: WatermarkService;
}

const WatermarkComponent = observer((props: WatermarkComponentProps) => {
  const { watermarkService } = props;
  const { data: currentUser } = useCurrentUserContext();

  React.useEffect(() => {
    if (currentUser?.data) {
      const nickname = currentUser.data.nickname || '';
      const phone = currentUser.data.phone || '';
      
      if (nickname || phone) {
        watermarkService.initWatermark(nickname, phone);
      }
    }

    return () => {
      watermarkService.destroy();
    };
  }, [currentUser?.data, watermarkService]);

  return null;
});

export class PluginWatermarkClient extends Plugin {
  watermarkService: WatermarkService;

  async afterAdd() {
    // 在插件添加后初始化水印服务
    this.watermarkService = new WatermarkService(this.app);
  }

  async load() {
    // 添加水印组件到应用
    const WatermarkWrapper = () => (
      <WatermarkComponent 
        watermarkService={this.watermarkService}
      />
    );

    // 使用组件
    this.app.use(WatermarkWrapper);
  }

  async destroy() {
    if (this.watermarkService) {
      this.watermarkService.destroy();
    }
  }
}

export default PluginWatermarkClient; 