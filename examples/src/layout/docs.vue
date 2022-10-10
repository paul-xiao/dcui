<template>
  <div class="flex">
    <div class="max-h-screen overflow-auto w-72">
      <div class="sticky top-0 p-5 bg-white">Logo</div>
      <List :list="components" class="p-5"> </List>
    </div>
    <div class="flex-1 mt-20">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import List from '@/components/List'
import { useRouter } from 'vue-router'
const router = useRouter()
const allRoutes = router.getRoutes()

let components = []
components = allRoutes
  .filter(r => r.path.includes('/components/'))
  .map(d => {
    return { label: d.meta.title, path: d.path, group: d.meta.group }
  })

const list2Tree = list => {
  let newList = []
  list.forEach(l => {
    if (!l.group) {
      newList.push(l)
    } else {
      const existGroup = newList.find(list => list.group === l.group)
      !existGroup
        ? newList.push({
            label: l.group,
            group: l.group,
            children: [].concat(l)
          })
        : existGroup.children.push(l)
    }
  })
  return newList.sort((a,b) => a.label > b.label && a.group > b.group ? 1: -1)
}
components = list2Tree(components)
</script>
