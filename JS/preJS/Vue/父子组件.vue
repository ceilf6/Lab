<template>
  <div>
    <p>父组件的值：{{ value }}</p>
    <child-component v-on:child-click="handleChildClick"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  data() {
    return {
      value: '父组件初始值',
    }
  },
  components: {
    ChildComponent,
  },
  methods: {
    handleChildClick(newValue) {
      this.value = newValue;
    }
  }
}
</script>


作者：LeetCode
链接：https://leetcode.cn/leetbook/read/vue-interview/77n2ir/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。