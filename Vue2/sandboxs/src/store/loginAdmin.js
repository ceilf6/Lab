import * as adminApi from "@/api/admin";

export default {
    namespaced: true, // 开启命名空间防止命名冲突
    state: {
        loading: false,
        admin: null,
    },
    mutations: {
        // 设置新状态
        setLoading(state, payload) {
            state.loading = payload;
        },
        setAdmin(state, payload) {
            state.admin = payload;
        },
    },
    getters: { // 仓库的计算属性
        // 通过 store.getters["loginAdmin/status"] 获取
        status(state) {
            if (state.loading) {
                return "loading";
            } else if (state.admin) {
                return "login";
            } else {
                return "unlogin";
            }
        },
    },
    actions: { // 管理登录副作用
        async whoAmI(ctx) {
            ctx.commit("setLoading", true); // ctx 就是当前仓库模块，所以可以省略 loginAdmin
            const resp = await adminApi.whoAmI();
            ctx.commit("setLoading", false);
            ctx.commit("setAdmin", resp);
        },
        async login(ctx, payload) {
            ctx.commit("setLoading", true);
            const resp = await adminApi.login(payload.loginId, payload.loginPwd);
            ctx.commit("setLoading", false);
            ctx.commit("setAdmin", resp);
            return resp;
        },
        async loginOut(ctx) {
            ctx.commit("setLoading", true);
            await adminApi.loginOut();
            ctx.commit("setLoading", false);
            ctx.commit("setAdmin", null);
        },
    },
};

