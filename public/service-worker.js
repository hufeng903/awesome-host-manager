// Service Worker for Awesome Host Manager Chrome Extension
// This is required for Manifest V3

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

// Fetch event - handle requests
self.addEventListener("fetch", (event) => {
  // For now, just pass through all requests
  // You can add caching logic here if needed
  event.respondWith(fetch(event.request));
});

// Message event - handle messages from content scripts or popup
self.addEventListener("message", (event) => {
  console.log("Service Worker received message:", event.data);

  // Handle different message types
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case "GET_HOSTS":
        // Handle getting hosts data
        break;
      case "UPDATE_HOSTS":
        // Handle updating hosts data
        break;
      default:
        console.log("Unknown message type:", event.data.type);
    }
  }
});
