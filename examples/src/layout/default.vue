<template>
  <div>
    <div class="absolute right-0 w-40">
      <div class="dropdown">
        <label tabindex="0" class="m-1">切换主题</label>
        <ul tabindex="0" class="p-2 shadow dropdown-content menu bg-base-100 rounded-box">
          <li v-for="t of themes" :key="t" :data-set-theme="t">
            <a>{{ t }}</a>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
const themes = ['dark', 'light', 'aqua']
onMounted(() => {
  themeChange(false)
})
</script>
