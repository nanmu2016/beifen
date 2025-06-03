import { Plugin } from '@nocobase/server';

export class PluginFaviconReplaceServer extends Plugin {
  beforeLoad() {
    // 服务器端无需特殊处理，favicon替换完全在客户端进行
  }
}

export default PluginFaviconReplaceServer;
