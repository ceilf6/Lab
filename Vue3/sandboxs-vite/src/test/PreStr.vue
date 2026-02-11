<template>
  <div class="menu-bar-container">
    <div class="logo">
      <h1>logo</h1>
    </div>
    <ul class="nav">
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
      <li><a href="">menu</a></li>
    </ul>
    <div class="user">
      <span>{{ user.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "ceilf6",
      },
    };
  },
};
</script>
