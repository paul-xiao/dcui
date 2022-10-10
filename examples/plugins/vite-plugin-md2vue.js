import { marked } from 'marked'

const myLoader = (src, id) => {
  return {
    code: `import {h, defineComponent} from "vue";
          const _sfc_md = defineComponent({
              name: "Markdown",
          });

          const _sfc_render =() => {
              return h("div", {
                className: 'prose lg:prose-xl',
                innerHTML: ${JSON.stringify(marked(src))}, 
              })
          };

          _sfc_md.render = _sfc_render
          export default _sfc_md`,
    map: null // 如果可行将提供 source map
  }
}
export default function (options) {
  return {
    name: 'vitePluginMd2Vue',
    transform(src, id) {
      if (id.endsWith('.md')) {
        return myLoader(src, id)
      }
    }
  }
}
