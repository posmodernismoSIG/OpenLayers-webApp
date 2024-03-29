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
        visible: false,
        extent: [
          12400753.576694038, -5658730.000549673, 17174426.336716905,
          -980228.5067132516,
        ],
        opacity: 1,
      }),
      //bing map
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "Ah_PtPMoweuifRJjiA8CCvgrwqUH4kfzfK607KXyl71C9-dBdOCzCz-1bX5lsuVW",
          imagerySet: "Aerial",
        }),
        visible: false,
        zIndex: 2,
      }),
    ],
  });
  map.addLayer(layerGroup);

  //CartoDB BaseMap Layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
      attributions: "© CARTO",
    }),
    visible: false,
  });
  map.addLayer(cartoDBBaseLayer);
  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
  });
  map.addLayer(tileDebugLayer);

  // Stamen basemap layer
  const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
  });
  map.addLayer(stamenBaseLayer);

  const stamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
      attributions:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    visible: false,
  });
  map.addLayer(stamenBaseMapLayer);

  // Tile of arcGIS REST API LAYER
  const arcGisLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    visible: false,
    zIndex: 4,
  });
  map.addLayer(arcGisLayer);

  // wms services

  const WMSlayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_ocean_sfc_sst_time/MapServer/WMSServer",
      params: {
        LAYERS: 5,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      attributions: "<a href=https://nowcoast.noaa.gov/>© NOAA<a/>",
    }),
  });
  map.addLayer(WMSlayer);
  map.on("click", (x) => {
    console.log(x.coordinate);
  });
}
