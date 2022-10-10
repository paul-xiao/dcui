<template>
  <ul class="w-full menu bg-base-100">
    <template v-for="item of list">
      <div v-if="item.children" :key="item.group">
        <span class="font-mono text-xs text-gray-500">{{ item.group }}</span>
        <my-list :list="item.children"></my-list>
      </div>
      <li v-else :key="item.label">
        <router-link :to="item.path">{{ item.label }}</router-link>
      </li>
    </template>
  </ul>
</template>
<script>
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  name: 'MyList',
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
