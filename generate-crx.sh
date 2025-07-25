#!/bin/bash

# Awesome Host Manager - 生成 .crx 文件脚本
# 使用方法: ./generate-crx.sh

echo "🚀 开始生成 Awesome Host Manager .crx 文件..."

# 检查是否在正确的目录
if [ ! -d "awesome-host-manager" ]; then
    echo "❌ 错误: 找不到 awesome-host-manager 目录"
    echo "请先运行: npm run build"
    exit 1
fi

# 检查 manifest.json 文件
if [ ! -f "awesome-host-manager/manifest.json" ]; then
    echo "❌ 错误: 找不到 manifest.json 文件"
    exit 1
fi

echo "✅ 检查文件结构..."

# 检查必要的文件
required_files=(
    "awesome-host-manager/manifest.json"
    "awesome-host-manager/index.html"
    "awesome-host-manager/images/logo-16.png"
    "awesome-host-manager/images/logo-48.png"
    "awesome-host-manager/images/logo-128.png"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误: 找不到文件 $file"
        exit 1
    fi
done

echo "✅ 所有必要文件都存在"

# 备份旧的 .crx 文件
if [ -f "awesome-host-manager.crx" ]; then
    echo "📦 备份旧的 .crx 文件..."
    mv awesome-host-manager.crx awesome-host-manager.crx.backup
fi

# 备份旧的 .pem 文件
if [ -f "awesome-host-manager.pem" ]; then
    echo "🔑 备份旧的私钥文件..."
    mv awesome-host-manager.pem awesome-host-manager.pem.backup
fi

echo "📋 生成步骤说明："
echo ""
echo "1. 打开 Chrome 浏览器"
echo "2. 访问: chrome://extensions/"
echo "3. 开启右上角的'开发者模式'"
echo "4. 点击'加载已解压的扩展程序'"
echo "5. 选择项目中的 'awesome-host-manager' 文件夹"
echo "6. 在扩展列表中找到 'Awesome Host Manager'"
echo "7. 点击'打包扩展程序'按钮"
echo "8. 在'扩展程序根目录'中选择 'awesome-host-manager' 文件夹"
echo "9. 点击'打包扩展程序'"
echo ""
echo "完成后，新的 .crx 和 .pem 文件将生成在项目根目录"
echo ""

# 尝试自动打开 Chrome 扩展页面
echo "🌐 正在打开 Chrome 扩展页面..."
if command -v open >/dev/null 2>&1; then
    open -a "Google Chrome" chrome://extensions/
    echo "✅ Chrome 扩展页面已打开"
else
    echo "⚠️ 无法自动打开 Chrome，请手动访问: chrome://extensions/"
fi

echo ""
echo "🎯 下一步操作："
echo "1. 按照上述步骤在 Chrome 中打包扩展"
echo "2. 检查生成的 awesome-host-manager.crx 文件"
echo "3. 测试安装新的 .crx 文件"
echo ""
echo "📝 提示：生成的 .pem 文件是私钥，请妥善保管用于后续更新" 