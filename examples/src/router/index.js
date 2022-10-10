import { createRouter, createWebHashHistory } from 'vue-router'

// 动态路由名称映射表
const modules = import.meta.glob('../views/**/**.{vue,md}')
console.log(modules);
const components = {
  Layout: () => import('@/layout/default.vue'),
  DocsLayout: () => import('@/layout/docs.vue'),
}

Object.keys(modules).forEach(key => {
  const nameMatch = key.match(/^\.\.\/views\/(.+)\.(vue|md)/)
  if (!nameMatch) return
  // 排除_Components文件夹下的文件
  // if(nameMatch[1].includes('_Components')) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/index$/i)
  let name = indexMatch ? indexMatch[1] : nameMatch[1]
  name = name.replaceAll('/', '_')
  components[name] = modules[key]
})

const myRoutes = Object.entries(components)
  .filter(([key, val]) => key.includes('components_'))
  .map(([key, val]) => {
    const split = key.split('_')
    return {
      path: split.length > 2 ? key.replace('components_', '').replace('_', '/'): split[1],
      name: key,
      component: val,
      meta: {
        title: split.length > 2 ? split[2]: split[1],
        group: split.length > 2 ? split[1]: '' // 分组
      }
    }
  })

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const allowRoutes = [
  {
    path: '/',
    name: 'home',
    component: components['Layout'],
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '仪表盘'
        }
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: components['DocsLayout'],
    children:[
      ...myRoutes
    ]
  },
  {
    path: '/404',
    name: '404',
    component: components['ErrorPage_404']
  }
]

console.log(components)
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: allowRoutes // `routes: routes` 的缩写
})
export default router
