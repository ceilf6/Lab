<template>
  <div>
    <h2>错误示范：使用 index 作为 key</h2>
    <div>
      <ul>
        <li v-for="(item, index) in badList" :key="index">
          <span>{{ item.name }}</span>
          <input type="text" :placeholder="`输入${item.name}的值`" />
          <button @click="removeBadItem(index)">删除</button>
        </li>
      </ul>
      <button @click="addBadItem">添加项</button>
    </div>

    <h2>正确做法：使用唯一 id 作为 key</h2>
    <div>
      <ul>
        <li v-for="item in goodList" :key="item.id">
          <span>{{ item.name }}</span>
          <input type="text" :placeholder="`输入${item.name}的值`" />
          <button @click="removeGoodItem(item.id)">删除</button>
        </li>
      </ul>
      <button @click="addGoodItem">添加项</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 错误示范：使用 index 作为 key
      badList: [{ name: "项目 A" }, { name: "项目 B" }, { name: "项目 C" }],
      badCounter: 4,

      // 正确做法：使用唯一 id 作为 key
      goodList: [
        { id: 1, name: "项目 A" },
        { id: 2, name: "项目 B" },
        { id: 3, name: "项目 C" },
      ],
      goodCounter: 4,
    };
  },
  methods: {
    // 错误示范的方法
    removeBadItem(index) {
      this.badList.splice(index, 1);
    },
    addBadItem() {
      this.badList.push({
        name: `项目 ${String.fromCharCode(64 + this.badCounter)}`,
      });
      this.badCounter++;
    },

    // 正确做法的方法
    removeGoodItem(id) {
      const index = this.goodList.findIndex((item) => item.id === id);
      if (index > -1) {
        this.goodList.splice(index, 1);
      }
    },
    addGoodItem() {
      this.goodList.push({
        id: this.goodCounter, // 直接往后加就好
        name: `项目 ${String.fromCharCode(64 + this.goodCounter)}`,
      });
      this.goodCounter++;
    },
  },
};
</script>
