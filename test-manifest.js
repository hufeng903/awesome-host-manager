const fs = require("fs");
const path = require("path");

console.log("🔍 测试 manifest.json 文件完整性...\n");

// 检查 manifest.json 文件
const manifestPath = path.join(
  __dirname,
  "awesome-host-manager",
  "manifest.json"
);

try {
  // 检查文件是否存在
  if (!fs.existsSync(manifestPath)) {
    console.error("❌ manifest.json 文件不存在");
    process.exit(1);
  }

  // 读取文件内容
  const manifestContent = fs.readFileSync(manifestPath, "utf8");
  console.log("✅ manifest.json 文件存在");

  // 检查文件大小
  const stats = fs.statSync(manifestPath);
  console.log(`📏 文件大小: ${stats.size} 字节`);

  // 尝试解析 JSON
  try {
    const manifest = JSON.parse(manifestContent);
    console.log("✅ JSON 格式正确");

    // 检查必要字段
    const requiredFields = ["manifest_version", "name", "version", "action"];
    const missingFields = requiredFields.filter((field) => !manifest[field]);

    if (missingFields.length > 0) {
      console.error("❌ 缺少必要字段:", missingFields);
    } else {
      console.log("✅ 所有必要字段都存在");
    }

    // 检查 manifest_version
    if (manifest.manifest_version !== 3) {
      console.error("❌ manifest_version 必须是 3");
    } else {
      console.log("✅ manifest_version 正确");
    }

    // 检查 action 字段
    if (!manifest.action || !manifest.action.default_popup) {
      console.error("❌ action.default_popup 字段缺失");
    } else {
      console.log("✅ action 配置正确");
    }

    // 检查 popup 文件是否存在
    const popupPath = path.join(
      __dirname,
      "awesome-host-manager",
      manifest.action.default_popup
    );
    if (!fs.existsSync(popupPath)) {
      console.error(`❌ popup 文件不存在: ${manifest.action.default_popup}`);
    } else {
      console.log("✅ popup 文件存在");
    }

    console.log("\n📋 Manifest 内容:");
    console.log(JSON.stringify(manifest, null, 2));
  } catch (jsonError) {
    console.error("❌ JSON 解析失败:", jsonError.message);
    console.log("\n📄 文件内容:");
    console.log(manifestContent);
  }
} catch (error) {
  console.error("❌ 读取文件失败:", error.message);
}

console.log("\n🎯 建议:");
console.log("1. 如果所有检查都通过，尝试在 Chrome 中重新加载扩展");
console.log("2. 如果仍有问题，尝试清除 Chrome 扩展缓存");
console.log("3. 确保 Chrome 版本 >= 88");
