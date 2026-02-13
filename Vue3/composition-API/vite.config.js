export default {
    proxy: {
        "/api": {
            target: "http://127.0.0.1:5500/Vue3/composition-API",
            rewrite: (path) => path.replace(/^\/api/, ""), // 重写去除 /api
        },
    },
};