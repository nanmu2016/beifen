import { Application } from '@nocobase/client';

export class WatermarkService {
  private app: Application;
  private observer: MutationObserver | null = null;
  private watermark: HTMLElement | null = null;

  constructor(app: Application) {
    this.app = app;
  }

  private createWatermark(nickname: string, phone: string) {
    // 如果已存在水印，先移除
    this.destroy();

    console.log('=== 开始创建水印 ===');
    console.log('水印参数:', { nickname, phone });

    // 创建水印文本
    const watermarkText = `${nickname} ${phone}`;
    console.log('水印文本:', watermarkText);

    // 创建水印容器
    const watermarkContainer = document.createElement('div');
    watermarkContainer.className = 'global-watermark';
    watermarkContainer.id = 'nocobase-watermark';
    
    // 创建网格状水印
    let watermarkHTML = '';
    const spacing = 200; // 水印间距
    const maxWidth = window.innerWidth + 400; // 增加一些边距
    const maxHeight = window.innerHeight + 400;
    
    console.log('页面尺寸:', { width: window.innerWidth, height: window.innerHeight });
    console.log('水印覆盖范围:', { maxWidth, maxHeight });
    
    for (let y = -100; y < maxHeight; y += spacing) {
      for (let x = -100; x < maxWidth; x += spacing) {
        watermarkHTML += `
          <div style="
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            color: rgba(0,0,0,0.15);
            font-size: 16px;
            font-family: Arial, sans-serif;
            transform: rotate(-45deg);
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
          ">${watermarkText}</div>
        `;
      }
    }
    
    watermarkContainer.innerHTML = watermarkHTML;
    console.log('生成的水印数量:', watermarkHTML.split('<div').length - 1);
    
    // 设置容器样式
    watermarkContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
      user-select: none;
      background: transparent;
      overflow: hidden;
    `;
    
    // 添加到页面
    document.body.appendChild(watermarkContainer);
    this.watermark = watermarkContainer;
    
    console.log('✅ 水印容器已添加到页面');
    console.log('页面body子元素数量:', document.body.children.length);
    console.log('水印元素是否在DOM中:', document.contains(watermarkContainer));

    return watermarkContainer;
  }

  private createSVGWatermark(text: string): string {
    // 创建 SVG 水印
    const svgWidth = 300;
    const svgHeight = 150;
    
    console.log('创建SVG水印，文本:', text);
    
    // 创建 SVG 元素
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <defs>
        <filter id="blur" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
        </filter>
      </defs>
      <g filter="url(#blur)" opacity="0.5" transform="rotate(-22, ${svgWidth/2}, ${svgHeight/2})">
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" fill="#000000" text-anchor="middle">${text}</text>
      </g>
    </svg>
    `;
    
    console.log('SVG内容:', svg);
    return svg;
  }

  public initWatermark(nickname: string, phone: string) {
    if (!nickname && !phone) {
      console.warn('水印需要昵称或手机号');
      return;
    }

    try {
      // 创建水印
      const watermark = this.createWatermark(nickname, phone);

      // 防止水印被删除
      this.observer = new MutationObserver((mutations) => {
        const watermarkElement = document.querySelector('.global-watermark');
        if (!watermarkElement) {
          console.log('水印被移除，重新添加');
          document.body.appendChild(watermark.cloneNode(true));
          this.watermark = document.querySelector('.global-watermark');
        }
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: false // 只监视直接子元素变化
      });
    } catch (error) {
      console.error('初始化水印出错:', error);
    }
  }

  public destroy() {
    try {
      // 清理 observer
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      // 移除水印
      const watermark = document.querySelector('.global-watermark');
      if (watermark) {
        watermark.remove();
      }
      this.watermark = null;
    } catch (error) {
      console.error('销毁水印出错:', error);
    }
  }
} 