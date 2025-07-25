// 测试脚本：验证 Awesome Host Manager 插件功能
// 在浏览器控制台中运行此脚本

console.log("🧪 开始测试 Awesome Host Manager 插件...");

// 测试 1: 检查 Chrome API 可用性
function testChromeAPI() {
  console.log("📋 测试 1: Chrome API 可用性");

  if (typeof chrome === "undefined") {
    console.error("❌ Chrome API 不可用");
    return false;
  }

  if (typeof chrome.proxy === "undefined") {
    console.error("❌ Chrome Proxy API 不可用");
    return false;
  }

  if (typeof chrome.storage === "undefined") {
    console.error("❌ Chrome Storage API 不可用");
    return false;
  }

  console.log("✅ Chrome API 可用");
  return true;
}

// 测试 2: 检查本地存储
function testLocalStorage() {
  console.log("📋 测试 2: 本地存储功能");

  try {
    const testKey = "AWESOME_HOST_TEST";
    const testValue = { test: "data" };

    localStorage.setItem(testKey, JSON.stringify(testValue));
    const retrieved = JSON.parse(localStorage.getItem(testKey));
    localStorage.removeItem(testKey);

    if (JSON.stringify(retrieved) === JSON.stringify(testValue)) {
      console.log("✅ 本地存储功能正常");
      return true;
    } else {
      console.error("❌ 本地存储数据不匹配");
      return false;
    }
  } catch (error) {
    console.error("❌ 本地存储测试失败:", error);
    return false;
  }
}

// 测试 3: 检查代理设置功能
function testProxySettings() {
  console.log("📋 测试 3: 代理设置功能");

  return new Promise((resolve) => {
    chrome.proxy.settings.get({}, (config) => {
      if (chrome.runtime.lastError) {
        console.error("❌ 获取代理设置失败:", chrome.runtime.lastError);
        resolve(false);
        return;
      }

      console.log("✅ 当前代理设置:", config);
      resolve(true);
    });
  });
}

// 测试 4: 检查扩展权限
function testPermissions() {
  console.log("📋 测试 4: 扩展权限");

  chrome.permissions.getAll((permissions) => {
    if (chrome.runtime.lastError) {
      console.error("❌ 获取权限失败:", chrome.runtime.lastError);
      return;
    }

    console.log("✅ 当前权限:", permissions);

    const requiredPermissions = ["proxy", "storage"];
    const hasAllPermissions = requiredPermissions.every((perm) =>
      permissions.permissions.includes(perm)
    );

    if (hasAllPermissions) {
      console.log("✅ 所有必需权限已授予");
    } else {
      console.warn(
        "⚠️ 缺少某些权限:",
        requiredPermissions.filter(
          (perm) => !permissions.permissions.includes(perm)
        )
      );
    }
  });
}

// 运行所有测试
async function runAllTests() {
  console.log("🚀 开始运行所有测试...\n");

  const results = [];

  // 同步测试
  results.push(testChromeAPI());
  results.push(testLocalStorage());

  // 异步测试
  results.push(await testProxySettings());

  // 权限测试（异步，不等待结果）
  testPermissions();

  // 总结
  setTimeout(() => {
    console.log("\n📊 测试总结:");
    const passed = results.filter((r) => r).length;
    const total = results.length;

    console.log(`✅ 通过: ${passed}/${total}`);
    console.log(`❌ 失败: ${total - passed}/${total}`);

    if (passed === total) {
      console.log("🎉 所有测试通过！插件应该可以正常工作。");
    } else {
      console.log("⚠️ 部分测试失败，请检查相关功能。");
    }
  }, 1000);
}

// 自动运行测试
runAllTests();

// 导出测试函数供手动调用
window.testAwesomeHostManager = {
  testChromeAPI,
  testLocalStorage,
  testProxySettings,
  testPermissions,
  runAllTests,
};
