import { ref } from 'vue'

const cnt = ref(0)

console.log(cnt.value)

cnt.value++


// ======


import { reactive } from 'vue'

const state = reactive({ cnt: 0 })

console.log(state.cnt)

state.cnt++