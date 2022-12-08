const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://gamic.app/api",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/dashboard", createProxyMiddleware(proxy));
};
