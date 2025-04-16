import { Plugin } from '@nocobase/client';
import { CustomAuthLayout } from './AuthLayout';

export class PluginReplacePageClient extends Plugin {
  async load() {
    // 等待应用初始化完成
    const initRouter = () => {
      if (this.app.router) {
        this.app.router.add('auth', {
          Component: CustomAuthLayout,
        });
      } else {
        // 如果路由还没准备好，等待一段时间后重试
        setTimeout(initRouter, 100);
      }
    };

    // 确保在应用准备好后再初始化路由
    if (document.readyState === 'complete') {
      initRouter();
    } else {
      window.addEventListener('load', initRouter);
    }
  }
}

export default PluginReplacePageClient;