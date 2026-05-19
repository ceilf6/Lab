## FAQ

A few notes about the project and possible questions:

**Q**: _Is Pinia the successor of Vuex?_

**A**: [Yes](https://vuejs.org/guide/scaling-up/state-management.html#pinia)

**Q**: _What about dynamic modules?_

**A**: Dynamic modules are not type safe, so instead [we allow creating different stores](https://pinia.vuejs.org/cookbook/composing-stores.html) that can be imported anywhere

## Installation

```bash
# or pnpm or yarn
npm install pinia
```

## Usage

### Install the plugin

Create a pinia (the root store) and pass it to app:

```js
// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

For more detailed instructions, including [Nuxt configuration](https://pinia.vuejs.org/ssr/nuxt.html), check the [Documentation](https://pinia.vuejs.org).

### Create a Store

You can create as many stores as you want, and they should each exist in different files:

```ts
import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCounter: (state) => state.counter * 2,
    // use getters in other getters
    doubleCounterPlusOne(): number {
      return this.doubleCounter + 1
    },
  },
  // optional actions
  actions: {
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
  },
})
```

`defineStore` returns a function that has to be called to get access to the store:

```ts
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const main = useMainStore()

    // extract specific store properties
    const { counter, doubleCounter } = storeToRefs(main)

    return {
      // gives access to the whole store in the template
      main,
      // gives access only to specific state or getter
      counter,
      doubleCounter,
    }
  },
})
```

## Documentation

To learn more about Pinia, check [its documentation](https://pinia.vuejs.org).

## License

[MIT](http://opensource.org/licenses/MIT)