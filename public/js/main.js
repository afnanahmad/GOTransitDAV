/*var elem = document.getElementById("map");
var width = 0;
var height = 0;
if(elem) {
   var rect = elem.getBoundingClientRect();
   width = rect.width;
   height = rect.height;  
}

var projection = d3.geoEqualEarth(),
    path = d3.geoPath(projection);

console.log(width+" x "+height);

var centerCoordinates = [43.6814927, -79.3639761];

var map = L.map('map').setView(centerCoordinates, 11);

var gl = L.mapboxGL({
	style: 'mapbox://styles/aafnan/cjtcb8d1411441fleg13ipnxd',
	accessToken: 'pk.eyJ1IjoiYWFmbmFuIiwiYSI6ImNqdGM3MGluNTB0aWI0NW9hczk1dDFpaGcifQ.r9gLzEd9GQvVDVUeWOr0ow'
}).addTo(map);


d3.json("point/").then(function(collection) { 

	for (var i in collection) {
		var point = collection[i];
		var LatLng = L.latLng(point.GPS_LATITUDE, point.GPS_LONGITUDE);
		//console.log(collection[i].LatLng);

		var circle = L.circleMarker(LatLng, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.3,
			radius: 2
		}).addTo(map);
		var title = point.LONG_NAME + " -- "+ point.STOP_CODE;
		// var marker = L.marker(LatLng, {title: title}).addTo(map);
		
		// marker.bindPopup(title);
		circle.bindPopup(title);
	}

});*/

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFmbmFuIiwiYSI6ImNqdGM3MGluNTB0aWI0NW9hczk1dDFpaGcifQ.r9gLzEd9GQvVDVUeWOr0ow';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/aafnan/cjtcb8d1411441fleg13ipnxd',
	center: [-79.391787, 43.671436],
	zoom: 11.0,
	minZoom: 7.0,
	maxZoom: 14.0
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('map')}));

var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
});
map.addControl(scale);

scale.setUnit('metric');

function pointOnCircle(point) {
	return {
		"type": "Point",
		"coordinates": [
		point.GPS_LATITUDE,
		point.GPS_LONGITUDE
		]
	};
}

map.on('load', function () {
	// map.addSource('point', {
	// 	"type": "geojson",
	// 	"data": pointOnCircle(0)
	// });

	// map.addLayer({
	// 	"id": "point",
	// 	"source": "point",
	// 	"type": "circle",
	// 	"paint": {
	// 		"circle-radius": 10,
	// 		"circle-color": "#007cbf"
	// 	}
	// });


	

	d3.json("point/").then(function(collection) { 
		console.log("downloaded points");

		var i = 0;

		for (var i in collection) {

			i++;

			if (i > 500) {
				break;
			}

			var point = collection[i];

			var lat = point.GPS_LATITUDE;
			var lng = point.GPS_LONGITUDE;

			var myCircle = new MapboxCircle({lat: lat, lng: lng}, 500, {
				editable: false,
				minRadius: 500,
				fillColor: '#29AB87'
			}).addTo(map);

		}
	});
});

