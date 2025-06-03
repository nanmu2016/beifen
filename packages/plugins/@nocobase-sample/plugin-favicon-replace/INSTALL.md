# 网站图标替换插件 - 安装指南

## 📦 插件文件

编译后的插件文件位于：
```
storage/tar/@nocobase-sample/plugin-favicon-replace-1.0.0.tgz
```

## 🚀 安装步骤

### 方法1：通过NocoBase管理界面安装（推荐）

1. **登录NocoBase管理后台**
   - 访问您的NocoBase站点管理界面
   - 使用管理员账号登录

2. **进入插件管理**
   - 点击左侧菜单 "设置" → "插件管理"
   - 或直接访问 `http://your-domain/admin/settings/plugins`

3. **上传插件**
   - 点击 "上传插件" 按钮
   - 选择 `plugin-favicon-replace-1.0.0.tgz` 文件
   - 等待上传完成

4. **安装并启用**
   - 上传完成后，在插件列表中找到 "网站图标替换" 插件
   - 点击 "安装" 按钮
   - 安装完成后，点击 "启用" 按钮

5. **验证效果**
   - 刷新浏览器页面
   - 查看浏览器标签页，应该显示新的蓝色渐变图标

### 方法2：通过命令行安装

1. **复制插件文件**
   ```bash
   # 将tgz文件复制到您的NocoBase项目目录
   cp plugin-favicon-replace-1.0.0.tgz /path/to/your/nocobase/project/
   ```

2. **安装插件**
   ```bash
   # 进入NocoBase项目目录
   cd /path/to/your/nocobase/project/
   
   # 安装插件
   yarn pm add plugin-favicon-replace-1.0.0.tgz
   
   # 启用插件
   yarn pm enable @nocobase-sample/plugin-favicon-replace
   ```

3. **重启应用**
   ```bash
   yarn start
   ```

## ✅ 验证安装

安装成功后，您应该看到：

1. **浏览器标签页图标** - 显示蓝色渐变的 "N" 字图标
2. **插件管理界面** - 在已启用插件列表中看到 "网站图标替换" 插件
3. **无错误信息** - 控制台没有相关错误

## 🎨 自定义图标

如需使用自定义图标，请：

1. **解压插件源码**
2. **修改** `src/client/index.tsx` 中的 `createCustomSVG()` 方法
3. **重新构建插件**
4. **重新安装**

详细自定义方法请参考 `USAGE.md` 和 `examples.md` 文件。

## 🔧 卸载插件

如需卸载插件：

1. **通过管理界面**
   - 进入插件管理
   - 找到 "网站图标替换" 插件
   - 点击 "禁用" → "卸载"

2. **通过命令行**
   ```bash
   yarn pm disable @nocobase-sample/plugin-favicon-replace
   yarn pm remove @nocobase-sample/plugin-favicon-replace
   ```

卸载后，网站图标会自动恢复为原始图标。

## 📞 技术支持

如遇到问题，请检查：

1. **NocoBase版本兼容性** - 确保使用NocoBase 1.4.x版本
2. **浏览器缓存** - 清除浏览器缓存后重试
3. **控制台错误** - 查看浏览器开发者工具的控制台错误信息
4. **插件日志** - 查看NocoBase应用日志

## 📋 系统要求

- NocoBase >= 1.4.0
- Node.js >= 18
- 现代浏览器（Chrome, Firefox, Safari, Edge）
