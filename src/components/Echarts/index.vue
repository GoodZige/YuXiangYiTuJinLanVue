<!--
 * @Description:
 * @Author: jk
 * @Date: 2021-12-07 15:54:27
 * @LastEditTime: 2021-12-21 10:38:04
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\components\Echarts\index.vue
-->
<template>
  <div ref="chartRef" :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>
<script>
import * as echarts from "echarts";
// import * as echarts from "echarts";
// import { defaults } from "echarts-gl";
// import { Scatter3DChart } from "echarts-gl/charts";
// import { Grid3DComponent } from "echarts-gl/components";
// echarts.use([Scatter3DChart, Grid3DComponent]);
export default {
  name: "Echarts",
  props: {
    id: { type: String, default: "myChart" },
    className: { type: String, default: "chart" },
    width: { type: String, default: "100%" },
    height: { type: String, default: "100%" },
    options: { type: Object, default: () => ({}) },
    res: {
      type: [Number, String],
      defaults: ""
      // _resizeHandler
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs["chartRef"]);
    this.initChart();
    // window.addEventListener("resize", ()=> {
    //   this.chart.resize(); //下面可以接多个图
    // });
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    options: {
      handler(val) {
        if (JSON.stringify(val) !== "{}") {
          this.initChart(val, true);
        }
      },
      deep: true,
      immediate: true
    },
    res: {
      handler(v) {
        this.$_resizeHandler();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    $_resizeHandler() {
      if (!this.chart) return;
      this.chart.resize();
    },
    initChart(data, clearCaching = false) {
      if (data || this.options) {
        if (this.chart) {
          this.chart.setOption(data || this.options, clearCaching);
          this.$emit("getChart", this.chart);
        }
      }
    }
  }
};
</script>
