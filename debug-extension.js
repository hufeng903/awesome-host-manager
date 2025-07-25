// 调试扩展功能的脚本
console.log("=== 扩展调试信息 ===");

// 检查Chrome API是否可用
console.log("Chrome API 可用性:");
console.log("- chrome:", typeof chrome !== "undefined");
console.log(
  "- chrome.proxy:",
  typeof chrome !== "undefined" && typeof chrome.proxy !== "undefined"
);
console.log(
  "- chrome.storage:",
  typeof chrome !== "undefined" && typeof chrome.storage !== "undefined"
);

// 检查DOM元素
console.log("DOM 元素检查:");
const rootElement = document.getElementById("root");
console.log("- root 元素:", rootElement);
console.log("- root 元素内容:", rootElement ? rootElement.innerHTML : "N/A");

// 检查脚本加载
console.log("脚本加载检查:");
const scripts = document.querySelectorAll("script");
console.log("- 脚本数量:", scripts.length);
scripts.forEach((script, index) => {
  console.log(`- 脚本 ${index + 1}:`, script.src || "内联脚本");
});

// 检查错误
window.addEventListener("error", (event) => {
  console.error("JavaScript 错误:", event.error);
  console.error("错误文件:", event.filename);
  console.error("错误行号:", event.lineno);
  console.error("错误列号:", event.colno);
});

// 检查未处理的Promise拒绝
window.addEventListener("unhandledrejection", (event) => {
  console.error("未处理的Promise拒绝:", event.reason);
});

console.log("=== 调试信息结束 ===");
