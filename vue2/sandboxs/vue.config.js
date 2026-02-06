// Vue-cli 的配置文件
// 本质是配置 webpack

module.exports = {
    devServer: {
        proxy: {
            '/ceilf6': {
                target: 'https://github.com',
                changeOrigin: true,
                secure: true
            },
            '/api/image': {
                target: 'http://dummyimage.com',
                changeOrigin: true,
                pathRewrite: { '^/api/image': '' }
            }
        }
    }
}