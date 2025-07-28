# Chrome 扩展重新加载指南

## 解决 Service Worker 注册错误

如果您遇到以下错误：

```
Error during service worker registration: TypeError: Failed to register a ServiceWorker for scope ('chrome-extension://...') with script ('chrome-extension://.../service-worker.js'): An unknown error occurred when fetching the script.
```

请按照以下步骤完全重新加载扩展：

### 步骤 1: 完全移除旧扩展

1. **打开 Chrome 扩展管理页面**

   - 在地址栏输入：`chrome://extensions/`
   - 或者点击 Chrome 菜单 → 更多工具 → 扩展程序

2. **找到 Awesome Host Manager 扩展**

   - 在扩展列表中找到 "Awesome Host Manager"
   - 点击扩展卡片右下角的"移除"按钮
   - 确认移除

3. **清理浏览器缓存**
   - 按 `Ctrl+Shift+Delete` (Windows) 或 `Cmd+Shift+Delete` (Mac)
   - 选择"缓存的图片和文件"
   - 点击"清除数据"

### 步骤 2: 重新构建扩展

在终端中运行：

```bash
# 重新构建扩展
./build-extension.sh

# 验证文件完整性
node test-extension.js
```

### 步骤 3: 重新加载扩展

1. **确保开发者模式已开启**

   - 在 `chrome://extensions/` 页面
   - 右上角开启"开发者模式"开关

2. **加载扩展**

   - 点击"加载已解压的扩展程序"按钮
   - 选择项目中的 `awesome-host-manager` 目录
   - 点击"选择文件夹"

3. **验证加载成功**
   - 扩展应该出现在扩展列表中
   - 状态应该显示为"已启用"
   - 没有错误信息

### 步骤 4: 测试扩展功能

1. **点击扩展图标**

   - 在 Chrome 工具栏中找到扩展图标
   - 点击打开弹出窗口
   - 确认界面正常显示

2. **检查控制台**
   - 右键点击扩展图标
   - 选择"检查弹出内容"
   - 查看控制台是否有错误信息

### 故障排除

#### 如果仍然出现错误：

1. **检查文件权限**

   ```bash
   ls -la awesome-host-manager/service-worker.js
   ls -la awesome-host-manager/manifest.json
   ```

2. **验证文件内容**

   ```bash
   cat awesome-host-manager/manifest.json | python -m json.tool
   ```

3. **重启 Chrome 浏览器**

   - 完全关闭 Chrome
   - 重新打开
   - 重新加载扩展

4. **检查 Chrome 版本**
   - 确保 Chrome 版本 >= 88
   - 访问 `chrome://version/` 查看版本号

#### 常见问题：

**Q: 扩展加载后立即显示错误**
A: 这通常是缓存问题，请完全移除扩展并清理缓存后重新加载。

**Q: Service Worker 文件找不到**
A: 确保 `service-worker.js` 文件在 `awesome-host-manager` 目录的根目录中。

**Q: 权限错误**
A: 检查 `manifest.json` 中的权限配置是否正确。

### 验证清单

- [ ] 旧扩展已完全移除
- [ ] 浏览器缓存已清理
- [ ] 扩展已重新构建
- [ ] 文件验证通过
- [ ] 开发者模式已开启
- [ ] 扩展已重新加载
- [ ] 弹出窗口正常显示
- [ ] 控制台无错误信息

如果按照以上步骤操作后仍然有问题，请提供：

1. Chrome 版本号
2. 完整的错误信息
3. 控制台输出
4. 扩展管理页面的截图
