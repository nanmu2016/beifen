# Favicon Replace Plugin - 使用指南

## 快速开始

1. 安装并启用插件后，网站图标会自动替换为默认的蓝色圆形图标
2. 要使用自定义图标，请修改 `src/client/index.tsx` 文件

## 自定义图标的方法

### 方法1：修改SVG图标（推荐）

编辑 `createCustomSVG()` 方法：

```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 您的SVG内容 -->
      <rect width="32" height="32" fill="#ff6b6b" rx="8"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
        您的文字
      </text>
    </svg>
  `;
}
```

### 方法2：使用本地图标文件

1. 将您的图标文件（.ico, .png, .svg）放在 NocoBase 的 public 目录下
2. 修改 `getFaviconUrl()` 方法：

```typescript
private getFaviconUrl(): string {
  return '/your-favicon.ico';  // 替换为您的文件名
}
```

### 方法3：使用外部URL

```typescript
private getFaviconUrl(): string {
  return 'https://your-domain.com/favicon.ico';
}
```

### 方法4：使用Base64编码

```typescript
private getFaviconUrl(): string {
  return 'data:image/x-icon;base64,您的Base64编码字符串';
}
```

## 图标格式支持

- **ICO格式** (.ico) - 传统的favicon格式，兼容性最好
- **PNG格式** (.png) - 现代浏览器支持，质量好
- **SVG格式** (.svg) - 矢量图标，可缩放，文件小
- **Base64编码** - 内嵌在代码中，无需额外文件

## 图标尺寸建议

- **16x16** - 浏览器标签页显示
- **32x32** - 高分辨率显示
- **48x48** - Windows任务栏
- **64x64** - 高质量显示

## 常见问题

### Q: 图标没有立即更新？
A: 浏览器可能缓存了旧图标，请尝试：
- 强制刷新页面 (Ctrl+F5)
- 清除浏览器缓存
- 使用隐私模式测试

### Q: 如何制作SVG图标？
A: 您可以：
- 使用在线SVG编辑器（如 SVG-Edit）
- 使用设计软件（如 Figma, Adobe Illustrator）
- 从图标库下载SVG格式图标

### Q: 插件禁用后图标没有恢复？
A: 这是正常的，因为浏览器缓存。清除缓存或重启浏览器即可恢复。

## 示例图标代码

### 简单的字母图标
```svg
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="16" fill="#4CAF50"/>
  <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">A</text>
</svg>
```

### 渐变背景图标
```svg
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B"/>
      <stop offset="100%" style="stop-color:#4ECDC4"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" fill="url(#grad)" rx="8"/>
  <circle cx="16" cy="16" r="8" fill="white"/>
</svg>
```

### 公司Logo样式
```svg
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#2C3E50" rx="4"/>
  <rect x="8" y="8" width="16" height="16" fill="#3498DB" rx="2"/>
  <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">LOGO</text>
</svg>
```
