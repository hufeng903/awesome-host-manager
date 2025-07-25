#!/bin/bash

echo "🔧 修复 manifest.json 文件问题..."

# 检查是否在正确的目录
if [ ! -d "awesome-host-manager" ]; then
    echo "❌ 错误: 找不到 awesome-host-manager 目录"
    echo "请先运行: npm run build"
    exit 1
fi

# 备份当前 manifest.json
if [ -f "awesome-host-manager/manifest.json" ]; then
    echo "📦 备份当前 manifest.json..."
    cp awesome-host-manager/manifest.json awesome-host-manager/manifest.json.backup
fi

# 创建新的 manifest.json
echo "📝 创建新的 manifest.json..."
cat > awesome-host-manager/manifest.json << 'EOF'
{
  "manifest_version": 3,
  "name": "Awesome Host Manager",
  "description": "Yet another Host tools.",
  "minimum_chrome_version": "88",
  "version": "1.0.16",
  "icons": {
    "16": "images/logo-16.png",
    "48": "images/logo-48.png",
    "128": "images/logo-128.png"
  },
  "action": {
    "default_icon": "images/logo-16.png",
    "default_title": "Awesome Host Manager",
    "default_popup": "index.html"
  },
  "options_page": "options.html",
  "permissions": ["proxy", "storage"],
  "host_permissions": ["http://*/*", "https://*/*", "<all_urls>"]
}
EOF

# 设置正确的文件权限
chmod 644 awesome-host-manager/manifest.json

echo "✅ manifest.json 已修复"

# 验证文件
echo "🔍 验证文件..."
if [ -f "awesome-host-manager/manifest.json" ]; then
    echo "✅ 文件存在"
    echo "📏 文件大小: $(wc -c < awesome-host-manager/manifest.json) 字节"
    
    # 检查 JSON 格式
    if python3 -m json.tool awesome-host-manager/manifest.json > /dev/null 2>&1; then
        echo "✅ JSON 格式正确"
    else
        echo "❌ JSON 格式错误"
        exit 1
    fi
else
    echo "❌ 文件创建失败"
    exit 1
fi

echo ""
echo "🎯 下一步操作："
echo "1. 打开 Chrome 浏览器"
echo "2. 访问: chrome://extensions/"
echo "3. 开启开发者模式"
echo "4. 移除旧的扩展（如果存在）"
echo "5. 点击'加载已解压的扩展程序'"
echo "6. 选择 'awesome-host-manager' 文件夹"
echo ""

# 尝试打开 Chrome 扩展页面
if command -v open >/dev/null 2>&1; then
    echo "🌐 正在打开 Chrome 扩展页面..."
    open -a "Google Chrome" chrome://extensions/
fi

echo "✅ 修复完成！" 