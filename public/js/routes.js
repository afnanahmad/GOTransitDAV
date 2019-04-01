var elem = document.getElementById("map");
var width = 0;
var height = 0;
if (elem) {
   var rect = elem.getBoundingClientRect();
   width = rect.width;
   height = rect.height;
}

console.log(width + " x " + height);

var centerCoordinates = [43.6814927, -79.3639761];

var map = L.map('map').setView(centerCoordinates, 12);

var gl = L.mapboxGL({
   style: 'mapbox://styles/aafnan/cjtcb8d1411441fleg13ipnxd',
   accessToken: 'pk.eyJ1IjoiYWFmbmFuIiwiYSI6ImNqdGM3MGluNTB0aWI0NW9hczk1dDFpaGcifQ.r9gLzEd9GQvVDVUeWOr0ow'
}).addTo(map);