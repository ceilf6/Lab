<template>
  <Modal :msg="msg" />
</template>

<script>
import Modal from "./";

export default {
  components: { Modal },
  data() {
    return {
      msg: "hello ceilf6",
    };
  },
};
</script>
