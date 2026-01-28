// 如果只是生产环境受同源策略影响AJAX，只需要配置开发服务器反向代理即可

module.exports = {
    devServer: { // 配置开发服务器
        proxy: { // 配置代理
            "/api": { // 若请求路径以 /api 开头
                target: "<http://dev.example.com>", // 将其转发到 <http://dev.example.com>
            },
        },
    },
};