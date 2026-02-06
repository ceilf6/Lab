<template>
  <div class="layout-container">
    <header>
      <!-- 我们希望把页头放这里，提供插槽，名为header -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 我们希望把主要内容放这里，提供插槽，名为default -->
      <slot></slot>
    </main>
    <footer>
      <!-- 我们希望把页脚放这里，提供插槽，名为footer -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {};
</script>
