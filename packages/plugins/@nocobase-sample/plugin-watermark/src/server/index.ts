import { Plugin } from '@nocobase/server';

export class PluginWatermarkServer extends Plugin {
  beforeLoad() {
    // 服务器端无需特殊处理
  }
}

export default PluginWatermarkServer; 