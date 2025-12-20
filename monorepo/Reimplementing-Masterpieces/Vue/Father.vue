<!-- Father -->

<template>
	<Child :countInChild="countInFather" :objInChild="objInFather" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import Child from './Child.vue'

const countInFather = ref(888)
const objInFather = reactive({ value: 666 })
</script>