import Vue from "vue";

/**
  通过 render 以及 $el 获取某个组件渲染的Dom根元素
*/
export default function getComponentRootDom(comp, props) {
    const vm = new Vue({
        render: h => h(comp, { props })
    })
    vm.$mount();
    return vm.$el;
}
