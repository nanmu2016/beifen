import { Plugin } from '@nocobase/client';

export class PluginFaviconReplaceClient extends Plugin {
  private originalFavicon: string | null = null;
  private customFaviconLink: HTMLLinkElement | null = null;
  private observer: MutationObserver | null = null;

  async load() {
    console.log('=== Favicon替换插件开始加载 ===');

    // 等待DOM完全加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeFavicon();
      });
    } else {
      this.initializeFavicon();
    }

    console.log('✅ Favicon替换插件加载完成');
  }

  private initializeFavicon() {
    try {
      console.log('开始初始化Favicon替换...');

      // 保存原始favicon
      this.saveOriginalFavicon();

      // 替换为自定义favicon
      this.replaceFavicon();

      // 监听页面变化，确保favicon始终是自定义的
      this.observeChanges();

      console.log('✅ Favicon替换初始化完成');
    } catch (error) {
      console.error('❌ Favicon替换初始化失败:', error);
    }
  }

  private saveOriginalFavicon() {
    try {
      // 查找现有的favicon链接
      const existingFavicon = document.querySelector('link[rel*="icon"]') as HTMLLinkElement;
      if (existingFavicon) {
        this.originalFavicon = existingFavicon.href;
        console.log('保存原始favicon:', this.originalFavicon);
      } else {
        console.log('未找到原始favicon');
      }
    } catch (error) {
      console.error('保存原始favicon失败:', error);
    }
  }

  private replaceFavicon() {
    try {
      // 移除现有的favicon链接
      const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
      existingFavicons.forEach(link => link.remove());
      console.log(`移除了 ${existingFavicons.length} 个现有favicon`);

      // 创建新的favicon链接
      this.customFaviconLink = document.createElement('link');
      this.customFaviconLink.rel = 'icon';
      this.customFaviconLink.type = 'image/x-icon';

      // 使用插件内置的favicon文件
      this.customFaviconLink.href = this.getFaviconUrl();

      // 添加到head中
      document.head.appendChild(this.customFaviconLink);
      console.log('✅ 自定义favicon已应用');
    } catch (error) {
      console.error('替换favicon失败:', error);
    }
  }

  private getFaviconUrl(): string {
    // 您可以在这里指定自定义图标的URL
    // 可以是相对路径、绝对路径或者base64编码的图标

    // 方法1：使用自定义SVG图标（推荐）
    const customIcon = this.createCustomSVG();
    const base64Icon = btoa(unescape(encodeURIComponent(customIcon)));
    return `data:image/svg+xml;base64,${base64Icon}`;

    // 方法2：使用本地文件（需要将图标文件放在public目录下）
    // return '/favicon-custom.ico';

    // 方法3：使用外部URL
    // return 'https://example.com/favicon.ico';

    // 方法4：使用base64编码的ICO文件
    // return 'data:image/x-icon;base64,YOUR_BASE64_ICO_STRING';
  }

  private createCustomSVG(): string {
    // 创建一个自定义的SVG图标
    // 您可以修改这里的SVG代码来创建您想要的图标
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1890ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#096dd9;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#grad1)" stroke="#0050b3" stroke-width="2"/>
        <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">N</text>
      </svg>
    `;
  }

  private restoreOriginalFavicon() {
    // 移除自定义favicon
    if (this.customFaviconLink) {
      this.customFaviconLink.remove();
      this.customFaviconLink = null;
    }

    // 恢复原始favicon
    if (this.originalFavicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = this.originalFavicon;
      document.head.appendChild(link);
    }
  }

  private observeChanges() {
    try {
      // 创建观察器来监听head元素的变化
      this.observer = new MutationObserver((mutations) => {
        try {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              // 检查是否有新的favicon被添加
              const addedNodes = Array.from(mutation.addedNodes);
              const faviconAdded = addedNodes.some(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element;
                  return element.tagName === 'LINK' &&
                         element.getAttribute('rel')?.includes('icon') &&
                         element !== this.customFaviconLink;
                }
                return false;
              });

              if (faviconAdded) {
                console.log('检测到新的favicon被添加，重新应用自定义favicon');
                // 如果检测到新的favicon，重新应用我们的自定义favicon
                setTimeout(() => this.replaceFavicon(), 100);
              }
            }
          });
        } catch (error) {
          console.error('观察器处理变化时出错:', error);
        }
      });

      // 开始观察head元素
      if (document.head) {
        this.observer.observe(document.head, {
          childList: true,
          subtree: true
        });
        console.log('✅ Favicon观察器已启动');
      }
    } catch (error) {
      console.error('启动favicon观察器失败:', error);
    }
  }

  private stopObserving() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      console.log('✅ Favicon观察器已停止');
    }
  }

  // 插件卸载时恢复原始favicon
  async beforeRemove() {
    console.log('=== Favicon替换插件开始卸载 ===');
    this.stopObserving();
    this.restoreOriginalFavicon();
    console.log('✅ Favicon替换插件卸载完成');
  }
}

export default PluginFaviconReplaceClient;
