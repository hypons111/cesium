const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

// cesium
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "node_modules/cesium/Build/Cesium/Workers";

module.exports = defineConfig({
  outputDir: "cesium_dev",
  publicPath: './',
  assetsDir: 'assets',
  indexPath: 'index.html',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: { https: false, zlib: false, http: false, url: false }
    },
    plugins: [
      new DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, "Assets"), to: "Assets" },
          { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
          { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
          { from: cesiumWorkers, to: "Workers" },
        ],
      }),
    ],
  },
});