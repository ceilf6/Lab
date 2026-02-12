<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="ModalVisible = true">打开朦层</button>
      </p>
      <!-- teleport 的 to 写的是 CSS 选择器 -->
      <Teleport to="body">
        <Modal v-if="ModalVisible">
          <button @click="ModalVisible = false">关闭朦层</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <Block3></Block3>
    <!-- <div class="block big"><h2>区域3</h2></div> -->
    <div class="block big"><h2>区域4</h2></div>
    <AsyncBlock5></AsyncBlock5>
    <!-- <div class="block mid"><h2>区域5</h2></div> -->
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script>
import { Loading, ErrorComp, Modal } from "../../components";
import useModal from "../../compositions/useModal";

import { defineAsyncComponent, h } from "vue"; // h函数具名了，方便随时创建虚拟节点
// 类似于 Vue2/sandboxs/src/utils/syncGetComp.js 也是传入一个 Promise任务
// const Block3 = defineAsyncComponent(() => import("../../test/Block3.vue"));
const Block3 = defineAsyncComponent({
  loader: async () => {
    // 别忘记 async 返回一个 Promise
    throw new Error("抱歉，你得出错");
    import("../../test/Block3.vue");
  },
  // errorComponent: ErrorComp,
  errorComponent: {
    render() {
      return h(ErrorComp, "加载出错了！");
    },
  }, // 想要注入的话就像配置对象一样
});

// const Block5 = defineAsyncComponent(() => import("../../test/Block5.vue"));
const Block5 = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    console.log("开始异步加载组件");
    setTimeout(() => {
      const comp = import("../../test/Block5.vue").then((res) => {
        return res;
      });
      resolve(comp);
    }, 3000);
  });
});
const AsyncBlock5 = defineAsyncComponent({
  loader: async () => {
    console.log("开始异步加载组件");
    // await setTimeout(() => {}, 3000); // setTimeout 返回的是定时器
    await new Promise((resolve) => {
      // 应该包在一个 Promise 中 await
      setTimeout(resolve, 3000);
    });
    return await import("../../test/Block5.vue");
  },
  loadingComponent: Loading, // loader 的 Promise 在 pending 状态时显示的组件
});
import { syncGetComp } from "../../utils";
const syncGetBlock5 = syncGetComp("@/test/Block5.vue", "Block5加载出错了");
export default {
  components: {
    Block3,
    // Block5,
    AsyncBlock5,
    Modal,
  },
  setup() {
    return {
      ...useModal(),
    };
  },
};
</script>

<style scope>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow:
    0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>
