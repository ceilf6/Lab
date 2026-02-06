<template>
  <TreeListMenu :list="list"></TreeListMenu>
</template>

<script>
import TreeListMenu from "./index.vue";
export default {
  components: {
    TreeListMenu,
  },
  data() {
    return {
      list: [
        { name: "1" }, // , isSelected: false },
        {
          name: "2",
          isSelected: false,
          children: [
            { name: "2-1", isSelected: true, children: [{ name: "2-1-1" }] },
          ],
        },
        { name: "3", isSelected: false },
        { name: "4", isSelected: false },
      ],
    };
  },
};
</script>
