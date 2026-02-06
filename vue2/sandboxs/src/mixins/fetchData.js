// 公共的远程获取数据的代码
// 通用性：需要使用方的方法 methods 中有 fetchData
export default function (defaultDataValue = null) { // 不用函数的话设置对象默认值为 null 会出错
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            }
        },
        async created() {
            console.log("=== fetchData mixin created 钩子执行了");
            this.data = await this.fetchData();
            console.log("=== fetchData mixin 获取数据完成", this.data);
            this.isLoading = false;
        }
    }
}