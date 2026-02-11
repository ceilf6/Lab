<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <div class="checkbox" @click="handleClick" :class="{ checked: checked }">
        <!-- 根据 checked 添加 checked 样式 -->
      </div>
      <input
        type="text"
        class="editor"
        @input="handleTitleChange"
        :value="title"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // modelValue: Boolean,
    checked: Boolean,
    title: String,
    titleModifiers: {
      // v-model 修饰符
      default: () => ({}),
    },
  },
  // 组件的属性, 上下文
  setup(props, ctx) {
    console.log("=== props", props);
    console.log("=== ctx", ctx);

    console.log("=== titleModifiers", props.titleModifiers);

    const handleClick = () => {
      //   this.$emit("update:modelValue",);
      //   ctx.emit("update:modelValue", !props.modelValue); // 上报事件
      ctx.emit("update:checked", !props.checked);
    };

    const handleTitleChange = (e) => {
      let value = e.target.value;
      if (props.titleModifiers.trim) {
        value = value.trim();
      }
      ctx.emit("update:title", value);
    };

    return {
      handleClick,
      handleTitleChange,
    };
  },
};
</script>

<style scoped>
.check-editor {
  cursor: pointer;
}
.check-editor-inner {
  display: flex;
  align-items: center;
}
.checkbox {
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 3px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox:hover,
.checkbox.checked {
  border-color: #409eff;
}
.checkbox.checked::after {
  content: "";
  border-radius: 2px;
  width: 9px;
  height: 9px;
  background: #409eff;
}
.editor {
  border: none;
  outline: none;
  margin-left: 5px;
  border-bottom: 1px solid #dcdfe6;
  font-size: inherit;
}
</style>
