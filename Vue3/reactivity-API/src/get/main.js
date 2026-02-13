import { computed, reactive, readonly, ref } from 'vue'

const state = reactive({ a: 1, b: 2 }) // 返回 Proxy 实例
window.state = state
const roState = readonly(state) // set 和 deleteProperty 做了特殊处理
/**
 * roState 是代理的 state，当 state 改变时，roState 内部的委托人也改变了，因为他们是一个
 */
window.roState = roState
/*
class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
        super(true, isShallow2);
    }
    set(target, key) {
        if (!!(process.env.NODE_ENV !== "production")) {
            warn$2(
                `Set operation on key "${String(key)}" failed: target is readonly.`,
                target
            );
        }
        return true;
    }
    deleteProperty(target, key) {
        if (!!(process.env.NODE_ENV !== "production")) {
            warn$2(
                `Delete operation on key "${String(key)}" failed: target is readonly.`,
                target
            );
        }
        return true;
    }
}
*/

class RefImpl {
    constructor(value, isShallow2) {
        this.dep = new Dep();
        this["__v_isRef"] = true;
        this["__v_isShallow"] = false;
        this._rawValue = isShallow2 ? value : toRaw(value);
        this._value = isShallow2 ? value : toReactive(value);
        this["__v_isShallow"] = isShallow2;
    }
    get value() { // 语法糖，本质就是设置了属性描述符
        if (!!(process.env.NODE_ENV !== "production")) {
            this.dep.track({
                target: this,
                type: "get",
                key: "value"
            });
        } else {
            this.dep.track();
        }
        return this._value;
    }
    set value(newValue) {
        const oldValue = this._rawValue;
        const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
        newValue = useDirectValue ? newValue : toRaw(newValue);
        if (hasChanged(newValue, oldValue)) {
            this._rawValue = newValue;
            this._value = useDirectValue ? newValue : toReactive(newValue);
            if (!!(process.env.NODE_ENV !== "production")) {
                this.dep.trigger({
                    target: this,
                    type: "set",
                    key: "value",
                    newValue,
                    oldValue
                });
            } else {
                this.dep.trigger();
            }
        }
    }
}
let origin = 'string'
const originP = ref(origin)
const obj = { a: 1, b: 2 }
const objP = ref(obj)
const proxyP = ref(objP)
window.originP = originP
window.objP = objP
window.proxyP = proxyP

const org = reactive({ a: 100, b: 250 })
const sum = computed(() => {
    console.log("触发了 computed 函数")
    return org.a + org.b
})
console.log(sum.value) // "触发了 computed 函数"
console.log(sum.value) // 缓存
console.log(sum.value) // 缓存
org.a = 250
console.log(sum.value) // "触发了 computed 函数"
console.log(sum.value) // 缓存