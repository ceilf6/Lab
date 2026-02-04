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

    <button @click="showToast" class="submit-btn">显示提示</button>
  </div>
</template>

<script>
import toast from "@/utils/toast";

window.toast = toast; // 挂载、方便测试

export default {
  data() {
    return {
      types: ["success", "error", "warn", "info"],
      selectedType: "success",
      message: "操作成功",
      duration: 3000,
    };
  },
  methods: {
    showToast() {
      if (!this.message.trim()) {
        alert("请输入提示内容");
        return;
      }
      toast(this.message, this.selectedType, this.duration);
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
</style>
