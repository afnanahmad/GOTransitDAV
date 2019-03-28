require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
  ], function(
    Map, MapView, FeatureLayer, Legend
  ) {

    const map = new Map({
      basemap: "dark-gray"
    });

    const view = new MapView({
      container: "map",
      map: map,
      center:  [-79.391787, 43.671436],
      zoom: 11
    });

    /******************************************************************
     *
     * Add layers to layerInfos on the legend
     *
     ******************************************************************/

    view.ui.add(new Legend({
      view: view
    }), "top-right");

    require(["esri/geometry/Circle"], function(Circle) {
        
        var circleGeometry = new Circle([-79.391787, 43.671436],{
            "radius": 2000
          });
    
    });

});