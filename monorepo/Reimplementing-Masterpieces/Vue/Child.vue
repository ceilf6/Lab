<!-- Child -->

<template>
  <div>
    <p>Count in Child: {{ countInChild }}</p>
    <p>Object in Child: {{ objInChild }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
	countInChild: Number,
    objInChild: Object
})

console.log('countInChild:', props.countInChild)
console.log('objInChild:', props.objInChild)
</script>