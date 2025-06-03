# 故障排除指南

## 常见问题及解决方案

### 1. 插件启用时报错

#### 错误：`this.app.middleware.use is not a function`
**原因：** 这通常是由于插件结构不正确或NocoBase版本不兼容导致的。

**解决方案：**
1. 确保使用NocoBase 1.4.x版本
2. 检查插件是否正确构建
3. 重新安装插件

#### 错误：`The application may be starting up. Please try again later.`
**原因：** NocoBase应用正在启动过程中。

**解决方案：**
1. 等待应用完全启动（通常需要1-2分钟）
2. 刷新页面后重试
3. 检查应用日志是否有错误

### 2. 图标没有显示或更新

#### 问题：启用插件后图标没有变化
**解决方案：**
1. **清除浏览器缓存**
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

2. **强制刷新页面**
   - Windows: Ctrl+F5
   - Mac: Cmd+Shift+R

3. **检查浏览器控制台**
   - 按F12打开开发者工具
   - 查看Console标签页是否有错误信息
   - 查找以"Favicon替换插件"开头的日志

#### 问题：图标显示不正确
**解决方案：**
1. 检查SVG代码是否正确
2. 验证base64编码是否有效
3. 尝试使用不同格式的图标（ICO、PNG）

### 3. 插件安装问题

#### 错误：上传失败
**解决方案：**
1. 检查文件大小（应该小于10MB）
2. 确保文件格式为.tgz
3. 检查网络连接
4. 尝试重新下载插件文件

#### 错误：安装失败
**解决方案：**
1. 检查NocoBase版本兼容性
2. 查看服务器日志
3. 确保有足够的磁盘空间
4. 重启NocoBase应用

### 4. 性能问题

#### 问题：页面加载变慢
**解决方案：**
1. 优化SVG图标大小
2. 使用更小的图标文件
3. 考虑使用ICO格式而非SVG

#### 问题：内存占用增加
**解决方案：**
1. 禁用观察器功能（修改代码）
2. 减少日志输出
3. 定期重启浏览器

### 5. 自定义图标问题

#### 问题：自定义图标不显示
**解决方案：**
1. 检查图标文件路径是否正确
2. 确保图标文件可以访问
3. 验证图标格式是否支持
4. 检查CORS设置（如果使用外部URL）

#### 问题：图标质量差
**解决方案：**
1. 使用高分辨率图标（32x32或更大）
2. 选择合适的图标格式
3. 优化SVG代码

## 调试步骤

### 1. 启用调试模式
打开浏览器控制台，查看以下日志：
```
=== Favicon替换插件开始加载 ===
开始初始化Favicon替换...
保存原始favicon: [URL]
移除了 X 个现有favicon
✅ 自定义favicon已应用
✅ Favicon观察器已启动
✅ Favicon替换初始化完成
✅ Favicon替换插件加载完成
```

### 2. 检查DOM元素
在控制台执行：
```javascript
// 检查当前favicon
document.querySelector('link[rel*="icon"]')

// 检查所有favicon链接
document.querySelectorAll('link[rel*="icon"]')
```

### 3. 手动测试
在控制台执行：
```javascript
// 手动设置favicon
const link = document.createElement('link');
link.rel = 'icon';
link.href = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMxODkwZmYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMkM0LjY4NjI5IDIgMiA0LjY4NjI5IDIgOEMyIDExLjMxMzcgNC42ODYyOSAxNCA4IDE0QzExLjMxMzcgMTQgMTQgMTEuMzEzNyAxNCA4QzE0IDQuNjg2MjkgMTEuMzEzNyAyIDggMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+';
document.head.appendChild(link);
```

## 联系支持

如果以上解决方案都无法解决您的问题，请：

1. **收集信息**
   - NocoBase版本
   - 浏览器类型和版本
   - 错误信息截图
   - 控制台日志

2. **提供详细描述**
   - 问题出现的具体步骤
   - 预期行为vs实际行为
   - 是否在其他环境中测试过

3. **检查文档**
   - README.md - 基本使用说明
   - USAGE.md - 详细使用指南
   - examples.md - 代码示例

## 版本兼容性

| NocoBase版本 | 插件版本 | 兼容性 |
|-------------|---------|--------|
| 1.4.x       | 1.0.0   | ✅ 完全兼容 |
| 1.3.x       | 1.0.0   | ⚠️ 可能有问题 |
| < 1.3       | 1.0.0   | ❌ 不兼容 |
