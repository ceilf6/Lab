<template>
  <div>
    <input
      :value="formData.data"
      @input="formData.data = $event.target.value"
    />
    <!-- 等同于 -->
    <input v-model="formData.data" />

    <!-- v-model 默认是 input 事件，在事件修饰符之后 v-model.lazy 是change 事件 -->
    <input type="text" v-model.lazy="formData.lazyData" />

    <h1>复选框</h1>
    <label>
      1
      <input type="checkbox" v-model="formData.dataList" value="id1" />
    </label>
    <label>
      2
      <input type="checkbox" v-model="formData.dataList" value="id2" />
    </label>
    <label>
      3
      <input type="checkbox" v-model="formData.dataList" value="id3" />
    </label>

    <!-- 因为同一组的单选框按钮对应同一个 data 所以不设置 name 也可以 -->
    <h1>单选框</h1>
    <label for="">
      A
      <input type="radio" v-model="formData.single" value="A" />
    </label>
    <label for="">
      B
      <input type="radio" v-model="formData.single" value="B" />
    </label>
    <label for="">
      C
      <input type="radio" v-model="formData.single" value="C" />
    </label>

    <!-- 开启 .number 修饰 让Vue内部自动转数字 -->
    <h1>没开启 .number 修饰</h1>
    <input type="number" v-model="formData.withoutNumber" />
    <h1>开启 .number 修饰</h1>
    <input type="number" v-model.number="formData.number" />

    <h1>职位</h1>
    <select v-model="formData.job">
      <option value="-1">请选择</option>
      <option value="1">前端开发</option>
      <option value="2">后端开发</option>
      <option value="3">全栈开发</option>
      <option value="4">项目经理</option>
    </select>

    <pre>
      {{ formData }}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Vue2 通过 Object.defineProperty 递归对所有内容都响应化状态了，无需担心
      formData: {
        data: "请输入",
        lazyData: "lazy",
        dataList: ["id2"],
        single: String,
        withoutNumber: Number,
        number: Number,
      },
    };
  },
};
</script>
