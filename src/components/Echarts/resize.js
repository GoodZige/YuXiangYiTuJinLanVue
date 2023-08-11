/*
 * @Description:
 * @Author: jk
 * @Date: 2021-12-09 17:05:12
 * @LastEditTime: 2021-12-09 19:40:26
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\components\Echarts\resize.js
 */
import { debounce } from '@/utils/index'

export default {
  data() {
    return { $_sidebarElm: undefined }
  },
  // mounted() {
  //   this.$_initResizeEvent()
  //   this.$_initSidebarResizeEvent()
  // },
  // beforeDestroy() {
  //   this.$_destroyResizeEvent()
  //   this.$_destroySidebarResizeEvent()
  // },
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated() {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() {
      this.chart.resize()

      return debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)()
    },
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    $_initSidebarResizeEvent() {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
