# 生成 .crx 文件指南

## 自动生成方法

### 方法一：使用 Chrome 开发者工具（推荐）

1. **打开 Chrome 扩展管理页面**

   ```bash
   # 在终端中运行以下命令
   open -a "Google Chrome" chrome://extensions/
   ```

2. **开启开发者模式**

   - 在扩展页面右上角找到"开发者模式"开关
   - 点击开启

3. **加载扩展**

   - 点击"加载已解压的扩展程序"
   - 选择项目中的 `awesome-host-manager` 文件夹
   - 确认加载

4. **打包扩展**

   - 在扩展列表中找到"Awesome Host Manager"
   - 点击"打包扩展程序"按钮
   - 在"扩展程序根目录"中选择 `awesome-host-manager` 文件夹
   - 点击"打包扩展程序"

5. **获取文件**
   - 打包完成后会在项目根目录生成：
     - `awesome-host-manager.crx` - 扩展文件
     - `awesome-host-manager.pem` - 私钥文件（请妥善保管）

### 方法二：使用命令行工具

如果你有 `crx` 工具，可以使用以下命令：

```bash
# 安装 crx 工具（如果没有）
npm install -g crx

# 生成 .crx 文件
crx pack awesome-host-manager -o awesome-host-manager.crx
```

### 方法三：使用 Web Store 开发者账号

如果你有 Chrome Web Store 开发者账号：

1. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. 上传 `awesome-host-manager` 文件夹
3. 填写扩展信息
4. 发布后下载 .crx 文件

## 验证生成的文件

生成 .crx 文件后，可以通过以下方式验证：

1. **检查文件大小**：应该约为 1-2MB
2. **检查文件格式**：应该是二进制文件
3. **测试安装**：
   - 将 .crx 文件拖拽到 `chrome://extensions/` 页面
   - 确认安装成功

## 注意事项

1. **私钥文件**：生成的 .pem 文件是私钥，用于后续更新扩展，请妥善保管
2. **版本更新**：每次更新扩展时，使用相同的私钥可以保持扩展 ID 不变
3. **分发限制**：Chrome 对 .crx 文件的分发有限制，建议通过 Web Store 分发

## 故障排除

如果遇到问题：

1. **打包失败**：检查 manifest.json 格式是否正确
2. **安装失败**：确保 Chrome 版本 >= 88
3. **权限问题**：检查扩展权限设置

## 文件结构

生成后的文件结构：

```
awesome-host-manager/
├── awesome-host-manager.crx    # 扩展文件
├── awesome-host-manager.pem    # 私钥文件（首次生成）
└── awesome-host-manager/       # 源代码文件夹
    ├── manifest.json
    ├── index.html
    ├── static/
    └── ...
```
