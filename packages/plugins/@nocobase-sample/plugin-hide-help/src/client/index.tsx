import { Plugin } from '@nocobase/client';

export class PluginHideHelpClient extends Plugin {
  async load() {
    // 确保在 DOM 准备好后注入样式
    const injectStyle = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* 隐藏帮助按钮 */
        [data-testid="help-button"],
        .ant-dropdown-trigger.css-xs0h5t,
        .anticon-question-circle {
          display: none !important;
        }
        
        /* 隐藏帮助按钮的容器 */
        .css-junazh {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    // 如果 document.head 已经存在，直接注入
    if (document.head) {
      injectStyle();
    } else {
      // 否则等待 DOM 加载完成
      document.addEventListener('DOMContentLoaded', injectStyle);
    }
  }
}

export default PluginHideHelpClient; 