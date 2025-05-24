import { Plugin } from '@nocobase/client';
import { WatermarkService } from './WatermarkService';
import React from 'react';
import { useCurrentUserContext } from '@nocobase/client';
import { observer } from '@formily/reactive-react';

interface WatermarkProviderProps {
  children: React.ReactNode;
}

const WatermarkProvider = observer((props: WatermarkProviderProps) => {
  const { children } = props;
  const currentUser = useCurrentUserContext();
  const [watermarkService] = React.useState(() => new WatermarkService(null as any));

  React.useEffect(() => {
    console.log('=== 水印组件 useEffect 触发 ===');
    console.log('当前用户数据:', currentUser);
    console.log('currentUser类型:', typeof currentUser);
    console.log('currentUser keys:', currentUser ? Object.keys(currentUser) : 'null');

    let nickname = '';
    let phone = '';

    // 尝试多种方式获取用户信息
    if (currentUser) {
      // 方式1: currentUser.data
      if (currentUser.data) {
        console.log('currentUser.data:', currentUser.data);
        console.log('currentUser.data keys:', Object.keys(currentUser.data));
        
        nickname = currentUser.data.nickname || currentUser.data.username || '';
        phone = currentUser.data.phone || '';
        console.log('从currentUser.data获取:', { nickname, phone });
      }
      
      // 方式2: currentUser.data.data
      if (!nickname && !phone && currentUser.data?.data) {
        console.log('currentUser.data.data:', currentUser.data.data);
        console.log('currentUser.data.data keys:', Object.keys(currentUser.data.data));
        
        nickname = currentUser.data.data.nickname || currentUser.data.data.username || '';
        phone = currentUser.data.data.phone || '';
        console.log('从currentUser.data.data获取:', { nickname, phone });
      }
      
      // 方式3: 直接从currentUser获取
      if (!nickname && !phone) {
        nickname = (currentUser as any).nickname || (currentUser as any).username || '';
        phone = (currentUser as any).phone || '';
        console.log('从currentUser直接获取:', { nickname, phone });
      }
    }

    // 如果仍然没有获取到，使用测试数据
    if (!nickname && !phone) {
      console.log('所有方式都未获取到用户信息，使用测试数据');
      nickname = '';
      phone = '';
      // nickname = '测试用户';
      // phone = '13800138000';
    }

    console.log('最终使用的用户信息:', { nickname, phone });
    console.log('开始初始化水印...');
    watermarkService.initWatermark(nickname, phone);

    // 清理函数
    return () => {
      console.log('水印组件卸载，清理水印');
      watermarkService.destroy();
    };
  }, [currentUser, watermarkService]);

  return <>{children}</>;
});

export class PluginWatermarkClient extends Plugin {
  async load() {
    console.log('=== 水印插件开始加载 ===');
    
    // 使用 addProvider 注册水印组件
    this.app.addProvider(WatermarkProvider);
    console.log('✅ 水印Provider已注册');
  }
}

export default PluginWatermarkClient; 