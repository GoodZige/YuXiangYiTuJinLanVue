
export function amap() {
  window._AMapSecurityConfig = {
    securityJsCode: "8e8782cd03f82613c7abfb9d2af838cb"
  };
  var amap
  AMapLoader.load({
    key: "c1b33e6852cd24312f2ad7f82a9a79de", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.DistrictSearch", "AMap.Polygon"] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then(AMap => {
    amap = new AMap.Map("container", {
      resizeEnable: true,
      mapStyle: "amap://styles/a840e22f6938f3a7537e96510ceafd60", //自定义样式id
      viewMode: "3D", // 是否为3D地图模式
      zoom: 12, // 初始化地图级别
      center: [116.405285, 39.904989]
    });
  });
  return amap
}

