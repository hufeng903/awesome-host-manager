#!/bin/bash

# Build script for Awesome Host Manager Chrome Extension

echo "开始构建Chrome扩展..."

# 清理之前的构建
echo "清理之前的构建..."
rm -rf build
rm -rf awesome-host-manager

# 运行测试
echo "运行测试..."
npm test -- --watchAll=false

# 构建React应用
echo "构建React应用..."
npm run build

# 重命名构建目录
echo "重命名构建目录..."
mv build awesome-host-manager

# 确保service-worker.js被复制到正确位置
echo "检查service-worker.js..."
if [ ! -f "awesome-host-manager/service-worker.js" ]; then
    echo "复制service-worker.js..."
    cp public/service-worker.js awesome-host-manager/
fi

# 确保manifest.json是最新的
echo "更新manifest.json..."
cp public/manifest.json awesome-host-manager/

echo "构建完成！扩展文件在 awesome-host-manager/ 目录中"
echo "您可以在Chrome中加载这个目录作为开发者模式的扩展" 