import axios from "axios";
import { toast } from "../utils";

const ins = axios.create(); // 创建 axios 实例

// 通过 interceptors 配置拦截器先处理响应
ins.interceptors.response.use(function (resp) {
    const resData = resp.data; // 从 HTTP 响应体里拿到真正的业务数据

    if (resData.code !== 0) { // 业务状态码不成功
        toast({
            content: resData.msg,
            type: "error",
            duration: 2000,
        });
        return null;
    }
    return resData.data; // 业务数据中需要的 data ，所以从 resp 中相当于取了两层 dtaa
})

export default ins;