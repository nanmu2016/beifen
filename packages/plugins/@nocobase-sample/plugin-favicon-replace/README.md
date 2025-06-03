# Favicon Replace Plugin

A NocoBase plugin to replace the website favicon with a custom icon.

这是一个用于替换网站图标的 NocoBase 插件。

## Features / 功能特性

- Replace website favicon with custom icon / 使用自定义图标替换网站图标
- Automatic restoration when plugin is disabled / 插件禁用时自动恢复原始图标
- Support for various icon formats (ICO, PNG, SVG, Base64) / 支持多种图标格式
- No configuration needed, works automatically after enabling / 无需配置，启用后自动生效

## Installation / 安装

1. Download the plugin package / 下载插件包
2. Go to NocoBase admin panel "Settings > Plugin manager" / 进入 NocoBase 管理面板的"设置 > 插件管理"
3. Upload and install the plugin / 上传并安装插件
4. Enable the plugin / 启用插件

## Usage / 使用方法

Simply enable the plugin, and the website favicon will be automatically replaced with the custom icon. When you disable the plugin, the original favicon will be restored.

只需启用插件，网站图标就会自动替换为自定义图标。当您禁用插件时，原始图标会自动恢复。

### Customization / 自定义设置

To use your own favicon, modify the `getFaviconUrl()` method in `src/client/index.tsx`:

要使用您自己的图标，请修改 `src/client/index.tsx` 中的 `getFaviconUrl()` 方法：

```typescript
private getFaviconUrl(): string {
  // Option 1: Use a URL to your icon file
  // 选项1：使用图标文件的URL
  return '/path/to/your/favicon.ico';
  
  // Option 2: Use a base64 encoded icon
  // 选项2：使用base64编码的图标
  return 'data:image/x-icon;base64,YOUR_BASE64_STRING';
  
  // Option 3: Use an external URL
  // 选项3：使用外部URL
  return 'https://example.com/favicon.ico';
}
```

## Supported Icon Formats / 支持的图标格式

- ICO files (.ico)
- PNG files (.png)
- SVG files (.svg)
- Base64 encoded images
- External URLs

## Technical Details / 技术细节

The plugin works by:
1. Saving the original favicon when loaded
2. Removing existing favicon links from the document head
3. Creating a new favicon link with the custom icon
4. Restoring the original favicon when the plugin is disabled

插件工作原理：
1. 加载时保存原始图标
2. 从文档头部移除现有的图标链接
3. 创建新的自定义图标链接
4. 插件禁用时恢复原始图标

## Support / 支持

If you encounter any issues or have questions, please visit our GitHub repository or contact NocoBase community.

如果您遇到任何问题或有疑问，请访问我们的 GitHub 仓库或联系 NocoBase 社区。

## License / 许可证

AGPL-3.0
