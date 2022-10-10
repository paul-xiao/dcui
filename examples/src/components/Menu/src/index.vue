<template>
    <List :list="menu">
       
    </List>
</template>
<script setup>
import List from '@/components/List'
const props = defineProps({
  menu: {
    type: Object,
    default: () => {}
  }
})

</script>