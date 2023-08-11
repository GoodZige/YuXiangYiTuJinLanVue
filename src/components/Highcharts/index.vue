<!--
 * @Description:
 * @Author: jk
 * @Date: 2021-12-21 16:25:42
 * @LastEditTime: 2021-12-23 16:40:06
 * @LastEditors: jk
 * @Reference:
 * @FilePath: \qifu-tunnel-phase-ii\src\components\Highcharts\Highcharts.vue
-->
<template>
  <div
    id="highcharts-container"
    ref="highcharts-container"
    class="highcharts-container"
  ></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  name: "Highcharts",
  props: {
    styles: { type: Object, default: () => ({ width: "", height: "" }) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    options: {
      handler(val) {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      deep: true,
      immediate: true
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const el = this.$refs["highcharts-container"];
      el.style.width = (this.styles.width || 800) + "px";
      el.style.height = (this.styles.height || 400) + "px";
      this.chart = new Highcharts.Chart(el, this.options);
    },
  },
};
</script>

<style lang="scss">
.highcharts-container {
  width: 800px;
  height: 400px;
}
</style>
