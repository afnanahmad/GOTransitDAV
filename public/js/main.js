var elem = document.getElementById("map");
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

function onEachFeature(feature, layer) {
	var popupContent = "";

	if (feature.properties && feature.properties.popupContent) {
		popupContent += feature.properties.popupContent;
		popupContent += "<br>";
		popupContent += "PASSENGER_IN: "+feature.properties.passenger_in;
	}

	layer.bindPopup(popupContent);
}

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

function perc2color(perc) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}

L.control.scale().addTo(map);

d3.json("api/aggregate_points/").then(function(collection) { 


	var filtered = collection.filter(function(point){
		return point.PASSENGER_IN > 0;
	});

	var features = [];

	for (var i in filtered) {

		var point = filtered[i];

		var geojsonFeature = {
			"type": "Feature",
			"properties": {
				"name": point.LONG_NAME,
				"amenity": "Bus Stop",
				"popupContent": point.LONG_NAME + " - " + point.SHORT_NAME,
				"passenger_in": point.PASSENGER_IN,
				"passenger_out": point.PASSENGER_OUT
			},
			"geometry": {
				"type": "Point",
				"coordinates": [point.GPS_LONGITUDE, point.GPS_LATITUDE]
			}
		};

		features.push(geojsonFeature);
	}

	var map_in = filtered.map(function(o) { return o.PASSENGER_IN; });
	var max_in = Math.max.apply(Math, map_in);
	var min_in = Math.min.apply(Math, map_in);

	var map_out = filtered.map(function(o) { return o.PASSENGER_OUT; });
	var max_out = Math.max.apply(Math, map_out);
	var min_out = Math.min.apply(Math, map_out);


	var stopFeatures = {
		"type": "FeatureCollection",
		"features":	features
	};

	var stopLayer = L.geoJSON([stopFeatures], {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {

			var radius = convertRange( feature.properties.passenger_in, [ min_in, max_in ], [ 3, 20 ] );
			var percentage = convertRange( feature.properties.passenger_in, [ min_in, max_in ], [ 1, 100 ] );

			var color = perc2color(percentage);

			return L.circleMarker(latlng, {
				radius: radius,
				fillColor: color,
				color: "#000",
				weight: 0.4,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);

	var overlays = { 
		"In traffic": stopLayer,
		"Out traffic": stopLayer
	};

	L.control.layers(gl, overlays).addTo(map);
});
