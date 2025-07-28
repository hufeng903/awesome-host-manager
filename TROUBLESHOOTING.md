# 故障排除指南

## Service Worker 注册错误

### 错误信息

```
Error during service worker registration: TypeError: Failed to register a ServiceWorker for scope ('chrome-extension://...') with script ('chrome-extension://.../service-worker.js'): An unknown error occurred when fetching the script.
```

### 问题原因

在 Chrome 扩展的 Manifest V3 中，必须包含一个 Service Worker 文件。如果缺少这个文件，Chrome 将无法加载扩展。

### 解决方案

#### 1. 自动构建（推荐）

运行构建脚本：

```bash
./build-extension.sh
```

#### 2. 手动构建

```bash
# 清理之前的构建
rm -rf build awesome-host-manager

# 运行测试
npm test -- --watchAll=false

# 构建应用
npm run build

# 重命名构建目录
mv build awesome-host-manager

# 复制 Service Worker 文件
cp public/service-worker.js awesome-host-manager/
```

#### 3. 验证构建结果

```bash
node test-extension.js
```

### 必需文件检查

确保 `awesome-host-manager` 目录包含以下文件：

- ✅ `manifest.json` - 扩展配置文件
- ✅ `service-worker.js` - Service Worker 文件（必需）
- ✅ `index.html` - 弹出窗口页面
- ✅ `options.html` - 选项页面
- ✅ `options.js` - 选项页面脚本
- ✅ `images/` - 图标目录
- ✅ `static/` - 静态资源目录
- ✅ `font-awesome/` - 字体图标目录

### 安装扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `awesome-host-manager` 目录

### 常见问题

#### Q: 为什么需要 Service Worker？

A: Chrome 扩展的 Manifest V3 要求使用 Service Worker 替代 Manifest V2 中的 background script。Service Worker 提供了更好的性能和安全性。

#### Q: 构建后仍然出现错误怎么办？

A: 确保：

1. 清理了之前的构建文件
2. Service Worker 文件被正确复制
3. manifest.json 包含正确的 Service Worker 配置

#### Q: 如何调试 Service Worker？

A: 在 Chrome 扩展页面中点击"检查视图" > "Service Worker" 来查看 Service Worker 的控制台输出。

### 技术细节

#### Service Worker 功能

- 处理扩展的后台逻辑
- 管理缓存和网络请求
- 处理来自弹出窗口和内容脚本的消息
- 提供离线功能支持

#### Manifest V3 要求

- `manifest_version: 3`
- `background.service_worker` 字段
- 适当的权限配置
- 兼容的 API 使用
