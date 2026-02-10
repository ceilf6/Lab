<template>
  <div>
    <h1>Administrator</h1>
    <div id="nav">
      <router-link :to="{ name: 'AdminHome' }"> Home </router-link>
      <!-- <router-link :to="{ name: 'AdminLogin' }"> Login </router-link> -->
      |
      <router-link to="/admin/action">Action</router-link>
      |
      <AdminName />
      <router-view />
    </div>
  </div>
</template>

<script>
import { AdminName } from "@/components";
export default {
  components: {
    AdminName,
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .ml-5 {
  margin-left: 5px;
}
</style>
