// Mapping between product IDs and 3D model files
const modelMapping = {
  // iPhone models
  "iphone-17-pro-max": "/models/iphone_17_pro_max.glb",
  "iphone-17-pro": "/models/iphone_17_pro_max.glb", // Fallback to 17 pro max
  "iphone-17-slim": "/models/iphone_17_pro_max.glb", // Fallback to 17 pro max (Air/slim)
  "iphone-17": "/models/iphone_17_pro_max.glb", // Fallback to 17 pro max
  "iphone-17e": "/models/iphone_16_-_free.glb", // Fallback to 16e
  "iphone-16-pro-max": "/models/iphone_16_pro_max.glb",
  "iphone-16-pro": "/models/iphone_16_pro_max.glb", // Fallback to 16 pro max
  "iphone-16-plus": "/models/iphone_16_plus.glb",
  "iphone-16": "/models/iphone_16_-_free.glb", // Fallback to 16e
  "iphone-16e": "/models/iphone_16_-_free.glb",
  "iphone-se-4": "/models/iphone_x_lowpoly.glb", // Fallback to low poly
  "iphone-15-pro-max": "/models/iphone_15_pro_max.glb",
  "iphone-15-pro": "/models/iphone_15_pro_deep-blue.glb", // Using deep blue version
  "iphone-15-plus": "/models/iphone_15_pro_max.glb", // Fallback to 15 pro max
  "iphone-15": "/models/iphone_15_pro_max.glb", // Fallback to 15 pro max
  "iphone-14-pro-max": "/models/iphone_14_pro.glb",
  "iphone-14-pro": "/models/iphone_14_pro.glb",
  "iphone-14-plus": "/models/iphone_14_pro.glb", // Fallback to 14 pro
  "iphone-14": "/models/iphone_14_pro.glb", // Fallback to 14 pro
  "iphone-se-3": "/models/iphone_x_lowpoly.glb", // Fallback to low poly
  "iphone-13-pro-max": "/models/apple_iphone_13_pro_max.glb",
  "iphone-13-pro": "/models/apple_iphone_13_pro_max.glb", // Fallback to 13 pro max
  "iphone-13": "/models/apple_iphone_13_pro_max.glb", // Fallback to 13 pro max
  "iphone-13-mini": "/models/apple_iphone_13_pro_max.glb", // Fallback to 13 pro max
  "iphone-12-pro-max": "/models/iphone_12_pro.glb",
  "iphone-12-pro": "/models/iphone_12_pro.glb",
  "iphone-12": "/models/iphone_12_pro.glb", // Fallback to 12 pro
  "iphone-12-mini": "/models/iphone_12_pro.glb", // Fallback to 12 pro
  "iphone-se-2": "/models/iphone_x_lowpoly.glb", // Fallback to low poly
  "iphone-11-pro-max": "/models/iphone_12_pro.glb", // Fallback to 12 pro
  "iphone-11-pro": "/models/iphone_12_pro.glb", // Fallback to 12 pro
  "iphone-11": "/models/iphone_x_lowpoly.glb", // Fallback to low poly
  "iphone-xs-max": "/models/iphone_x_lowpoly.glb",
  "iphone-xs": "/models/iphone_x_lowpoly.glb",
  "iphone-xr": "/models/iphone_x_lowpoly.glb",
  "iphone-x": "/models/iphone_x_lowpoly.glb",
  "iphone-8-plus": "/models/iphone_x_lowpoly.glb",
  "iphone-8": "/models/iphone_x_lowpoly.glb",
  "iphone-7-plus": "/models/iphone_x_lowpoly.glb",
  "iphone-7": "/models/iphone_x_lowpoly.glb",
  "iphone-se-1": "/models/iphone_x_lowpoly.glb",
  "iphone-6s-plus": "/models/iphone_x_lowpoly.glb",
  "iphone-6s": "/models/iphone_x_lowpoly.glb",
  "iphone-6-plus": "/models/iphone_x_lowpoly.glb",
  "iphone-6": "/models/iphone_x_lowpoly.glb",
  "iphone-5s": "/models/iphone_x_lowpoly.glb",
  
  // iPad models
  "ipad-air-m4-13": "/models/ipad_pro.glb", // Fallback to ipad pro
  "ipad-air-m4-11": "/models/ipad_pro.glb", // Fallback to ipad pro
  "ipad-11": "/models/ipad_pro.glb",
  "ipad-pro-13-m5": "/models/ipad_pro.glb",
  "ipad-pro-11-m5": "/models/ipad_pro.glb",
  "ipad-mini-7": "/models/ipad_pro.glb", // Fallback to ipad pro
  "ipad-pro-13-m4": "/models/ipad_pro.glb",
  "ipad-pro-11-m4": "/models/ipad_pro.glb",
  "ipad-air-m2-13": "/models/ipad_pro.glb",
  "ipad-air-m2-11": "/models/ipad_pro.glb",
  "ipad-pro-12-9-6": "/models/ipad_pro.glb",
  "ipad-pro-11-4": "/models/ipad_pro.glb",
  "ipad-10": "/models/ipad_pro.glb",
  "ipad-air-5": "/models/ipad_pro.glb",
  "ipad-mini-6": "/models/ipad_pro.glb",
  "ipad-9": "/models/ipad_pro.glb",
  "ipad-pro-12-9-5": "/models/ipad_pro.glb",
  "ipad-pro-11-3": "/models/ipad_pro.glb",
  "ipad-air-4": "/models/ipad_pro.glb",
  "ipad-8": "/models/ipad_pro.glb",
  "ipad-pro-12-9-4": "/models/ipad_pro.glb",
  "ipad-pro-11-2": "/models/ipad_pro.glb",
  "ipad-7": "/models/ipad_pro.glb",
  "ipad-mini-5": "/models/ipad_pro.glb",
  "ipad-air-3": "/models/ipad_pro.glb",
  "ipad-pro-12-9-3": "/models/ipad_pro.glb",
  "ipad-pro-11-1": "/models/ipad_pro.glb",
  "ipad-6": "/models/ipad_pro.glb",
  "ipad-pro-10-5": "/models/ipad_pro.glb",
  "ipad-pro-12-9-2": "/models/ipad_pro.glb",
  "ipad-5": "/models/ipad_pro.glb",
  "ipad-pro-9-7": "/models/ipad_pro.glb",
  "ipad-mini-4": "/models/ipad_pro.glb",
  "ipad-mini-3": "/models/ipad_pro.glb",
  "ipad-mini-2": "/models/ipad_pro.glb",
  "ipad-mini-1": "/models/ipad_pro.glb",
  "ipad-4": "/models/ipad_pro.glb",
  "ipad-3": "/models/ipad_pro.glb",
  "ipad-2": "/models/ipad_pro.glb",
  "ipad-1": "/models/ipad_pro.glb",
  
  // MacBook models
  "macbook-pro-14-4": "/models/macbook.glb",
  "macbook-pro-14-3": "/models/macbook.glb",
  "macbook-pro-14-2": "/models/macbook.glb",
  "macbook-pro-14-1": "/models/macbook.glb",
  "macbook-pro-16-4": "/models/macbook.glb",
  "macbook-pro-16-3": "/models/macbook.glb",
  "macbook-pro-16-2": "/models/macbook.glb",
  "macbook-pro-16-1": "/models/macbook.glb",
  "macbook-air-15-3": "/models/macbook.glb",
  "macbook-air-15-2": "/models/macbook.glb",
  "macbook-air-15-1": "/models/macbook.glb",
  "macbook-air-13-3": "/models/macbook.glb",
  "macbook-air-13-2": "/models/macbook.glb",
  "macbook-air-13-1": "/models/macbook.glb",
  "macbook-12": "/models/macbook.glb",
  
  // iMac models
  "imac-24-4": "/models/apple_imac.glb",
  "imac-24-3": "/models/apple_imac.glb",
  "imac-24-2": "/models/apple_imac.glb",
  "imac-24-1": "/models/apple_imac.glb",
  "imac-27-5": "/models/apple_imac.glb",
  "imac-27-4": "/models/apple_imac.glb",
  "imac-27-3": "/models/apple_imac.glb",
  "imac-27-2": "/models/apple_imac.glb",
  "imac-27-1": "/models/apple_imac.glb",
  "imac-21-5-4": "/models/apple_imac.glb",
  "imac-21-5-3": "/models/apple_imac.glb",
  "imac-21-5-2": "/models/apple_imac.glb",
  "imac-21-5-1": "/models/apple_imac.glb",
  
  // Watch models
  "watch-ultra-2": "/models/apple_watch_ultra_2.glb",
  "watch-ultra-1": "/models/apple_watch_ultra_2.glb",
  "watch-series-10-42": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-series-10-46": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-series-9-41": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-series-9-45": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-series-8-41": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-series-8-45": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-3-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-3-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-7-41": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-7-45": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-2-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-2-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-6-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-6-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-1-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-se-1-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-5-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-5-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-4-40": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-4-44": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-3-38": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-3-42": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-2-38": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-2-42": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-1-38": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  "watch-1-42": "/models/apple_watch_ultra_2.glb", // Fallback to ultra 2
  
  // AirPods models
  "airpods-pro-3": "/models/airpod_max.glb", // Fallback to airpod max
  "airpods-pro-2": "/models/airpod_max.glb",
  "airpods-pro-1": "/models/airpod_max.glb",
  "airpods-3": "/models/airpod_max.glb",
  "airpods-2": "/models/airpod_max.glb",
  "airpods-1": "/models/airpod_max.glb",
  "airpods-max": "/models/airpod_max.glb",
};

// Function to get model path for a product
function getModelForProduct(productId) {
  return modelMapping[productId] || "/models/iphone_x_lowpoly.glb"; // Default fallback
}

// Teardown model for services page
const TEARDOWN_MODEL = "/models/iphone_teardown.glb";

module.exports = {
  getModelForProduct,
  TEARDOWN_MODEL
};
