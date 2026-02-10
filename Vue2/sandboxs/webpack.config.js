// 打包分析插件
// Vue 会自动 webpack-merg
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// 开发环境
const dev = {
    plugins: [new BundleAnalyzerPlugin()],
    externals: {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        axios: "axios",
    }
}

// 生产环境
const prod = {

}

// 根据环境判断配置
// 开发环境每次都开启包体积分析有点烦
if (process.env.NODE_ENV === 'production') {
    module.exports = dev // 注意是 CMJ 导出
} else {
    module.exports = prod
}