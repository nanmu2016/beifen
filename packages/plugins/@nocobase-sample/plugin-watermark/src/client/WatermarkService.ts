import { Application } from '@nocobase/client';

export class WatermarkService {
  private app: Application;
  private observer: MutationObserver | null = null;

  constructor(app: Application) {
    this.app = app;
  }

  private createWatermark(nickname: string, phone: string) {
    // 如果已存在水印，先移除
    const existingWatermark = document.querySelector('.global-watermark');
    if (existingWatermark) {
      existingWatermark.remove();
    }

    // 创建 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 调整画布尺寸
    canvas.width = 300;
    canvas.height = 180;
    
    if (ctx) {
      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 设置水印样式
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.font = '16px Arial';
      
      // 旋转角度调整为 -22 度
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(-22 * Math.PI / 180);
      ctx.translate(-canvas.width/2, -canvas.height/2);
      
      // 使用用户的昵称和手机号
      const watermarkText = `${nickname} ${phone}`;
      
      // 计算文本宽度以便居中
      const textWidth = ctx.measureText(watermarkText).width;
      
      // 在画布中心绘制文本
      ctx.fillText(watermarkText, (canvas.width - textWidth) / 2, canvas.height / 2);
    }

    // 创建水印容器
    const watermark = document.createElement('div');
    watermark.className = 'global-watermark';
    
    // 设置水印样式
    watermark.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      background-image: url(${canvas.toDataURL('image/png')});
      background-repeat: repeat;
      background-size: 300px 180px;
      background-position: 30px 30px;
      transform: translateZ(0);
    `;
    
    // 添加到页面
    document.body.appendChild(watermark);

    return watermark;
  }

  public initWatermark(nickname: string, phone: string) {
    // 创建水印
    const watermark = this.createWatermark(nickname, phone);

    // 防止水印被删除
    this.observer = new MutationObserver(() => {
      if (!document.querySelector('.global-watermark')) {
        document.body.appendChild(watermark.cloneNode(true));
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  public destroy() {
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
  }
} 