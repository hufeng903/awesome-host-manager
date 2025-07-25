# 故障排除指南

## Manifest 文件问题解决方案

### 问题：Manifest file is missing or unreadable

如果遇到这个错误，请按以下步骤解决：

#### 1. 验证文件完整性

运行测试脚本：

```bash
node test-manifest.js
```

确保所有检查都通过。

#### 2. 清除 Chrome 缓存

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 找到已安装的扩展
4. 点击"移除"按钮
5. 重新加载扩展

#### 3. 检查文件权限

确保文件有正确的读取权限：

```bash
ls -la awesome-host-manager/manifest.json
```

#### 4. 重新构建项目

如果问题持续存在，重新构建项目：

```bash
npm run build
```

#### 5. 手动验证步骤

1. **检查文件编码**：

   ```bash
   file awesome-host-manager/manifest.json
   ```

   应该显示 "JSON data"

2. **验证 JSON 格式**：

   ```bash
   cat awesome-host-manager/manifest.json | python -m json.tool
   ```

3. **检查文件大小**：
   ```bash
   wc -c awesome-host-manager/manifest.json
   ```
   应该约为 558 字节

### 常见问题及解决方案

#### 问题 1：Chrome 版本过低

- **症状**：扩展无法加载，控制台显示版本错误
- **解决**：确保 Chrome 版本 >= 88

#### 问题 2：权限不足

- **症状**：扩展加载但功能不正常
- **解决**：检查 manifest.json 中的权限设置

#### 问题 3：文件路径错误

- **症状**：图标或页面无法加载
- **解决**：确保所有引用的文件都存在

#### 问题 4：JSON 格式错误

- **症状**：Manifest 解析失败
- **解决**：使用 JSON 验证工具检查格式

### 调试技巧

#### 1. 使用 Chrome 开发者工具

1. 打开 `chrome://extensions/`
2. 开启开发者模式
3. 点击扩展的"检查视图"
4. 查看控制台错误信息

#### 2. 逐步测试

1. 先使用简化版 manifest.json 测试
2. 逐步添加功能
3. 每次修改后重新加载扩展

#### 3. 检查网络请求

1. 打开开发者工具
2. 查看 Network 标签
3. 检查是否有 404 错误

### 预防措施

1. **定期备份**：保存工作版本的 manifest.json
2. **版本控制**：使用 Git 管理代码
3. **测试环境**：在开发环境中充分测试
4. **文档记录**：记录所有修改和配置

### 联系支持

如果问题仍然存在：

1. 检查 Chrome 版本
2. 查看控制台错误信息
3. 提供详细的错误日志
4. 描述复现步骤

## 成功安装后的验证

安装成功后，可以通过以下方式验证：

1. **基本功能测试**：

   - 点击扩展图标
   - 检查弹出窗口是否正常显示

2. **权限测试**：

   - 运行 `test-extension.js` 脚本
   - 检查所有 API 是否可用

3. **功能测试**：
   - 创建 host 分组
   - 添加 host 规则
   - 测试代理功能
