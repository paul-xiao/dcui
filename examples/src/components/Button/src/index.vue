<template>
  <div class="btn"><slot></slot></div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
