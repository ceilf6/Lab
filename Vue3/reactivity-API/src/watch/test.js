import { reactive, watchEffect, watch } from "vue";
const state = reactive({
    count: 0,
});
watchEffect(() => {
    console.log("watchEffect", state.count);
});
watch(
    () => state.count,
    (count, oldCount) => {
        console.log("watch", count, oldCount);
    }
);
console.log("start");
setTimeout(() => {
    console.log("time out");
    state.count++;
    state.count++;
});
state.count++;
state.count++;

console.log("end");

/*
test.js:6 watchEffect 0
test.js:14 start
test.js:23 end
test.js:6 watchEffect 2
test.js:11 watch 2 0
test.js:16 time out
test.js:6 watchEffect 4
test.js:11 watch 4 2
*/