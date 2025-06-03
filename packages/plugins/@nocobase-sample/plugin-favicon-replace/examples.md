# Favicon Replace Plugin - 示例代码

## 预设图标示例

### 1. 公司Logo风格
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#2C3E50" rx="6"/>
      <rect x="6" y="6" width="20" height="20" fill="#3498DB" rx="3"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">LOGO</text>
    </svg>
  `;
}
```

### 2. 现代渐变风格
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea"/>
          <stop offset="100%" style="stop-color:#764ba2"/>
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#modernGrad)"/>
      <circle cx="16" cy="16" r="8" fill="white" opacity="0.9"/>
      <circle cx="16" cy="16" r="4" fill="url(#modernGrad)"/>
    </svg>
  `;
}
```

### 3. 简约字母风格
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#FF6B6B" rx="8"/>
      <text x="16" y="22" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">A</text>
    </svg>
  `;
}
```

### 4. 科技感风格
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#0F172A"/>
      <rect x="4" y="4" width="24" height="24" fill="none" stroke="#00D9FF" stroke-width="2" rx="4"/>
      <circle cx="16" cy="16" r="6" fill="#00D9FF" opacity="0.3"/>
      <circle cx="16" cy="16" r="3" fill="#00D9FF"/>
    </svg>
  `;
}
```

### 5. 自然风格
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#4CAF50"/>
      <path d="M16 8 L20 16 L16 24 L12 16 Z" fill="#2E7D32"/>
      <circle cx="16" cy="16" r="4" fill="#81C784"/>
    </svg>
  `;
}
```

## 使用外部图标

### 使用Font Awesome图标
```typescript
private getFaviconUrl(): string {
  // 使用Font Awesome的CDN图标
  return 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/svgs/solid/star.svg';
}
```

### 使用Google Material Icons
```typescript
private createCustomSVG(): string {
  return `
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#1976D2"/>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" transform="translate(4,4) scale(0.8)"/>
    </svg>
  `;
}
```

## 动态图标

### 根据时间变化的图标
```typescript
private createCustomSVG(): string {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;
  
  if (isDaytime) {
    // 白天图标
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#FFD700"/>
        <circle cx="16" cy="16" r="8" fill="#FFA500"/>
      </svg>
    `;
  } else {
    // 夜晚图标
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#2C3E50"/>
        <path d="M20 8 A8 8 0 0 0 20 24 A6 6 0 0 1 20 8" fill="#F1C40F"/>
      </svg>
    `;
  }
}
```

### 根据用户状态的图标
```typescript
private createCustomSVG(): string {
  // 这里可以根据用户登录状态、角色等来决定图标
  const isLoggedIn = !!localStorage.getItem('NOCOBASE_TOKEN');
  
  const color = isLoggedIn ? '#4CAF50' : '#9E9E9E';
  
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="${color}"/>
      <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
        ${isLoggedIn ? '✓' : '?'}
      </text>
    </svg>
  `;
}
```

## 高级自定义

### 使用本地图片文件
```typescript
private getFaviconUrl(): string {
  // 确保图片文件在 public 目录下
  return '/custom-favicon.png';
}
```

### 使用Base64编码的图片
```typescript
private getFaviconUrl(): string {
  // 将您的图片转换为base64格式
  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0...'; // 您的base64字符串
  return `data:image/png;base64,${base64Image}`;
}
```

### 响应式图标（根据屏幕尺寸）
```typescript
private createCustomSVG(): string {
  const isSmallScreen = window.innerWidth < 768;
  const fontSize = isSmallScreen ? '12' : '16';
  
  return `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#1890ff"/>
      <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="${fontSize}" font-weight="bold">R</text>
    </svg>
  `;
}
```
