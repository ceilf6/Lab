<template>
  <div>
    <button @click="handleClick" :disabled="isLoading">
      {{ isLoading ? "loading" : "submit" }}
    </button>
    <div class="msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    click: Function,
  },
  data() {
    return {
      count: 0, // 点击的次数
      isLoading: false,
      msg: "",
    };
  },
  methods: {
    async handleClick() {
      /*
       * 点击次数 +1
       * 错误消息清空
       * 为了防止重复点击，需要先将 isLoading 设置为 true
       * 通知父组件：「我被点击了」，并传递当前的点击次数
       * 等待父组件处理（有可能是异步的），将父组件处理的结果设置到 msg
       */
      this.count++;
      this.msg = "";
      this.isLoading = true;

      // this.$emit("buttonClicked");
      // 上报事件到父组件让其处理，但是可能是异步的，该如何知道父组件什么时候结束才能终止loading？

      // 1. emit 中回调函数，类似于 React 中父组件传递给子组件处理函数、提供权力子组件影响父组件的数据
      // 这里相当于反着来
      // this.$emit("buttonClicked", this.count, (msg) => {
      //   this.isLoading = false;
      //   this.msg = msg;
      // });

      // 2. 父组件返回Promise，子组件通过 .$listeners 拿到父组件的 handle 函数引用
      // console.log(this.$listeners);
      // if (this.$listeners.buttonClicked) {
      //   const msg = await this.$listeners.buttonClicked();
      //   this.msg = msg;
      //   this.isLoading = false;
      // }

      // 3. 父组件直接 props 传下去处理函数，处理函数和 2 一样都是返回的 Promise
      if (this.click) {
        const msg = await this.click(this.count);
        this.isLoading = false;
        this.msg = msg;
      }
    },
  },
};
</script>

<style>
.msg {
  color: #f40;
  font-size: 12px;
}
</style>
