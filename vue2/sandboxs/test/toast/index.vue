<template>
  <div class="toast-test">
    <div class="form-group">
      <label>提示类型:</label>
      <div class="type-buttons">
        <button
          v-for="type in types"
          :key="type"
          :class="{ active: selectedType === type }"
          @click="selectedType = type"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>提示内容:</label>
      <input
        v-model="message"
        type="text"
        placeholder="请输入提示内容"
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label>持续时间(ms):</label>
      <input
        v-model.number="duration"
        type="number"
        placeholder="请输入持续时间"
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label>显示容器:</label>
      <div class="type-buttons">
        <button
          v-for="cont in containers"
          :key="cont.value"
          :class="{ active: selectedContainer === cont.value }"
          @click="selectedContainer = cont.value"
        >
          {{ cont.label }}
        </button>
      </div>
    </div>

    <button @click="showToast" class="submit-btn">显示提示</button>

    <!-- 测试容器 -->
    <div ref="customContainer" class="custom-container">
      <p>自定义容器区域</p>
      <p>Toast可以显示在这里</p>
    </div>
  </div>
</template>

<script>
import { toast } from "@/utils";

window.toast = toast; // 挂载、方便测试

export default {
  data() {
    return {
      types: ["success", "error", "warn", "info"],
      selectedType: "success",
      message: "操作成功",
      duration: 3000,
      containers: [
        { label: "页面中间", value: null },
        { label: "自定义容器", value: "custom" },
      ],
      selectedContainer: null,
    };
  },
  methods: {
    showToast() {
      if (!this.message.trim()) {
        alert("请输入提示内容");
        return;
      }

      // $refs => 根据选择获取容器
      let container = null;
      if (this.selectedContainer === "custom") {
        container = this.$refs.customContainer;
      }

      toast(this.message, this.selectedType, this.duration, container);
    },
  },
};
</script>

<style scoped>
.toast-test {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.type-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.type-buttons button {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.type-buttons button:hover {
  border-color: #999;
}

.type-buttons button.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #1890ff;
}

.submit-btn {
  padding: 12px 24px;
  background: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

.submit-btn:hover {
  background: #73d13d;
}

.submit-btn:active {
  background: #389e0d;
}

.custom-container {
  margin-top: 40px;
  padding: 60px 20px;
  border: 2px dashed #1890ff;
  border-radius: 8px;
  background: #f0f5ff;
  text-align: center;
  position: relative;
  min-height: 150px;
}

.custom-container p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}
</style>
