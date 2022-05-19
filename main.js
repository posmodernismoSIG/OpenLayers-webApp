window.onload = init;
function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        zIndex: 0,
        /*extent: [
          -8615049.674084047, 1333913.6071358265, -7640383.7940574,
          -39401257029412733,
        ],*/
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
  });
  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 1,
        visible: true,
        extent: [
          12400753.576694038, -5658730.000549673, 17174426.336716905,
          -980228.5067132516,
        ],
        opacity: 1,
      }),
    ],
  });
  map.addLayer(layerGroup);
  map.on("click", (x) => {
    console.log(x.coordinate);
  });
}
