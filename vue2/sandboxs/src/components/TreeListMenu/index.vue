<!-- 
Vue 的 template 是静态的，不像 React ，如果想要实现嵌套结构
1. 配置 render 函数
2. 模版中递归 
-->

<template>
  <ul class="tree-list-menu-container">
    <li v-for="(item, index) in list" :key="index">
      <!-- 数据也不会经常变动 index ，设置 id 反而繁琐 -->
      <span :class="{ selected: item.isSelected }" @click="handleClick(item)">{{
        item.name
      }}</span>
      <TreeListMenu :list="item.children" @click="handleClick">
        <!-- 归的时候从子组件上抛的事件继续往上抛 -->
      </TreeListMenu>
    </li>
  </ul>
</template>

<script>
// 类似于广义表的递归结构 https://github.com/ceilf6/dataStructure/blob/main/learn2code/5-%E6%95%B0%E7%BB%84/%E5%B9%BF%E4%B9%89%E8%A1%A8/GenList.h
// [ {name:"xxx", id: 1 ,isSelected: true, children:[ {name:"yyy", id: 2 ,isSelected: false} ] } ]
function isTreeArray(arr) {
  return arr.every((item) => {
    return (
      typeof item.name === "string" &&
      //   typeof item.id === "number" &&
      (!item.children || Array.isArray(item.children)) &&
      (!item.children || isTreeArray(item.children)) // 递归检查 children
    );
  });
}

export default {
  name: "TreeListMenu", // 当前组件需要使用自己时，需要显式声明 name
  props: {
    list: {
      type: Array,
      default: () => [],
      validator(value) {
        return isTreeArray(value);
      },
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("click", item);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.tree-list-menu-container {
  list-style: none;
  padding: 0;
  .tree-list-menu-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .selected {
      color: @warn;
      font-weight: bold;
    }
  }
}
</style>
