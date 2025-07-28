const fs = require("fs");
const path = require("path");

console.log("验证Chrome扩展文件...\n");

const extensionDir = "./awesome-host-manager";

// 检查必需文件
const requiredFiles = [
  "manifest.json",
  "service-worker.js",
  "index.html",
  "options.html",
  "options.js",
];

const requiredDirs = ["images", "static", "font-awesome"];

console.log("检查必需文件:");
let allFilesExist = true;
requiredFiles.forEach((file) => {
  const filePath = path.join(extensionDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - 缺失`);
    allFilesExist = false;
  }
});

console.log("\n检查必需目录:");
let allDirsExist = true;
requiredDirs.forEach((dir) => {
  const dirPath = path.join(extensionDir, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✓ ${dir}/`);
  } else {
    console.log(`✗ ${dir}/ - 缺失`);
    allDirsExist = false;
  }
});

// 验证manifest.json
console.log("\n验证manifest.json:");
try {
  const manifestPath = path.join(extensionDir, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  if (manifest.manifest_version === 3) {
    console.log("✓ Manifest V3");
  } else {
    console.log("✗ 不是Manifest V3");
  }

  if (manifest.background && manifest.background.service_worker) {
    console.log("✓ Service Worker配置正确");
  } else {
    console.log("✗ Service Worker配置缺失");
  }

  if (manifest.permissions && manifest.permissions.includes("storage")) {
    console.log("✓ 权限配置正确");
  } else {
    console.log("✗ 权限配置缺失");
  }
} catch (error) {
  console.log("✗ manifest.json解析失败:", error.message);
}

console.log("\n验证结果:");
if (allFilesExist && allDirsExist) {
  console.log("✅ 所有文件都存在，扩展应该可以正常加载");
  console.log("\n安装说明:");
  console.log("1. 打开Chrome浏览器");
  console.log("2. 访问 chrome://extensions/");
  console.log('3. 开启"开发者模式"');
  console.log('4. 点击"加载已解压的扩展程序"');
  console.log("5. 选择 awesome-host-manager 目录");
} else {
  console.log("❌ 缺少必需文件，请重新构建扩展");
}
