<template>
  <div class="message-container">
    <button>确认</button>
    <button>关闭</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.message-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #bf91f3;
  padding: 20px;
}
</style>
