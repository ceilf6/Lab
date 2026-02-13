import { computed, ref, watch } from "vue";
import gsap from "gsap";
const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];

// 在 Bar1, Bar2 都能复用
// Vue3 开发粒度从 Vue2组件级别 ⇒ 功能实现级别，方便复用
export default function useGdpBar(maxSize, gdp) { // bars -> gdpRef -> props.gdp
  const max = computed(() => {
    if (gdp.value.length) {
      return Math.max(...gdp.value.map((it) => it.value));
    }
    return 0;
  });
  const bars = ref([]);
  const targetBars = computed(() =>
    gdp.value.map((it, i) => {
      let size = (it.value / max.value) * maxSize;
      return {
        size,
        color: colors[i % colors.length],
        ...it,
      };
    })
  );
  watch(
    targetBars,
    (newValue) => {
      for (let i = 0; i < newValue.length; i++) {
        if (!bars.value[i]) {
          bars.value[i] = {
            ...newValue[i],
            size: 0,
            value: 0,
          };
        }
        gsap.to(bars.value[i], {
          // 动画：从一个状态到另一个状态
          // 变化数据 => JS动画
          // bars.value[i] 中的属性 逐步变化到 barsTarget.value[i]
          ...newValue[i],
          duration: 1,
        });
      }
    },
    {
      deep: true,
    }
  );
  return {
    bars,
  };
}

