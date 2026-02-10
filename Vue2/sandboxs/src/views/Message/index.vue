<template>
  <div>
    <h1>Talk whatever wanna</h1>
    <SyncComp />
  </div>
</template>

<script>
// import TestSyncComp from "@/test/TestSyncComp.vue";
// const SyncComp = () => {
//   return new Promise((resolve) => {
//     setTimeout(async () => {
//     //   resolve(TestSyncComp);
//     // }, 3000);
//     })
//   });
// };
const SyncComp = async () => {
  const res = await import("@/test/TestSyncComp.vue");
  return res;
};

export default {
  components: {
    SyncComp,
  },
};
</script>
