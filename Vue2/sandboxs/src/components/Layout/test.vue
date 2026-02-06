<template>
  <Layout>
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>

    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>

    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </Layout>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>
