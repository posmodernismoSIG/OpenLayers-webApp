window.onload = init;
function init() {
  const fullScreenCotrol = new ol.control.FullScreen();
  const attribution = new ol.control.Attribution();
  const overViewMap = new ol.control.OverviewMap({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
  });

  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
    controls: ol.control
      .defaults()
      .extend([fullScreenCotrol, attribution, overViewMap]),
  });
  const popupContainerElement = document.getElementById("popup-coordinates");
  const popup = new ol.Overlay({
    element: popupContainerElement,
  });
  map.addOverlay(popup);
  map.on("click", (e) => {
    const coordValue = e.coordinate;
    //console.log(coordValue);
    //popup.setPosition(undefined);
    popup.setPosition(coordValue);
    popupContainerElement.innerHTML = coordValue;
  });
  //drag rotation
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altShiftKeysOnly,
  });
  map.addInteraction(dragRotateInteraction);
  //draw interaction
  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
    freehand: true,
  });
  map.addInteraction(drawInteraction);
  drawInteraction.on("drawend", (x) => {
    let parser = new ol.format.GeoJSON();
    let drawFeatures = parser.writeFeaturesObject([x.feature]);
    console.log(drawFeatures);
  });
}
