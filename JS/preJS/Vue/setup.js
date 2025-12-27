//Vue2
export default {
  data() {
    return { count: 0 };
  },
  computed: {
    double() { return this.count * 2; }
  },
  methods: {
    inc() { this.count++; }
  }
}


//Vue3
setup() {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  const inc = () => count.value++;
  return { count, double, inc };
}