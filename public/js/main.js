var elem = document.getElementById("map");
var width = 0;
var height = 0;
if(elem) {
   var rect = elem.getBoundingClientRect();
   width = rect.width;
   height = rect.height;  
}

console.log(width+" x "+height);

var centerCoordinates = [43.6814927, -79.3639761];

var map = L.map('map').setView(centerCoordinates, 10);

var gl = L.mapboxGL({
	style: 'mapbox://styles/aafnan/cjtcb8d1411441fleg13ipnxd',
	accessToken: 'pk.eyJ1IjoiYWFmbmFuIiwiYSI6ImNqdGM3MGluNTB0aWI0NW9hczk1dDFpaGcifQ.r9gLzEd9GQvVDVUeWOr0ow'
}).addTo(map);

function onEachFeature(feature, layer) {

	var popupContent = "";
	button = "<a href='viz/point/"+feature.properties.point_id+"' class='btn btn-info' role='button'>Details ></a>";
	//button = "<button type='button' class='thisbutton' point='"+ feature.properties.point_id +"'>Details</button>";

	if (feature.properties && feature.properties.popupContent) {
		popupContent += "<h5>";
		popupContent += feature.properties.popupContent;
		popupContent += "</h5>";
		popupContent += "<br>"+button;
	}

	var content = L.DomUtil.create('div', 'content'),
	popup = L.popup().setContent(popupContent);
	
	L.DomEvent.addListener(content, 'click', function(event){
		// do stuff
		console.log("yolo"+ feature);
	}, layer);

	layer.bindPopup(popup);
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

var stopLayer;

function limit_number(num, max) {
	return Math.min(Math.max(num, 1), max);
}

function load_data_from_api(api, inOrOut, wheelchair) {

	d3.json(api).then(function(collection) { 

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
					"popupContent": point.LONG_NAME,
					"passenger_in": point.PASSENGER_IN,
					"passenger_out": point.PASSENGER_OUT,
					"wheelchair_count": point.WHEELCHAIR_COUNT,
					"point_id": point.POINT_ID
				},
				"geometry": {
					"type": "Point",
					"coordinates": [point.GPS_LONGITUDE, point.GPS_LATITUDE]
				}
			};

			features.push(geojsonFeature);
		}

		var max_num = 20000;

		var map_in = filtered.map(function(o) { return o.PASSENGER_IN; });
		var max_in = max_num; Math.max.apply(Math, map_in);
		var min_in = Math.min.apply(Math, map_in);

		var map_out = filtered.map(function(o) { return o.PASSENGER_OUT; });
		var max_out = max_num; Math.max.apply(Math, map_out);
		var min_out = Math.min.apply(Math, map_out);

		var wheel_map, wheel_max, wheel_min;

		var wheel_max = 75;
		if (wheelchair) {
			wheel_map = filtered.map(function(o) { return o.WHEELCHAIR_COUNT; });
			wheel_max = wheel_max; Math.max.apply(Math, wheel_map);
			wheel_min = Math.min.apply(Math, wheel_map);
		}


		var stopFeatures = {
			"type": "FeatureCollection",
			"features":	features
		};
		try{
			stopLayer = L.geoJSON([stopFeatures], {
				style: function (feature) {
					return feature.properties && feature.properties.style;
				},

				onEachFeature: onEachFeature,

				pointToLayer: function (feature, latlng) {

					var radius = 0;
					var percentage = 0;
					
					if (!wheelchair) {
						if (inOrOut) {
							radius = convertRange( limit_number(feature.properties.passenger_in, max_num) , [ min_in, max_in ], [ 3, 15 ] );
							percentage = convertRange( limit_number(feature.properties.passenger_in, max_num), [ max_in, min_in ], [ 1, 100 ] );
						} else {
							radius = convertRange( limit_number(feature.properties.passenger_out, max_num), [ min_out, max_out ], [ 3, 15 ] );
							percentage = convertRange( limit_number(feature.properties.passenger_out, max_num), [ max_out, min_out ], [ 1, 100 ] );
						}
					} else {
						radius = convertRange( limit_number(feature.properties.wheelchair_count, wheel_max), [ wheel_min, wheel_max ], [ 3, 15 ] );
						percentage = convertRange( limit_number(feature.properties.wheelchair_count, wheel_max), [ wheel_max, wheel_min ], [ 1, 100 ] );
					}

					var color = perc2color(percentage);

					return L.circleMarker(latlng, {
						radius: radius,
						fillColor: color,
						color: "#000",
						weight: 0.4,
						opacity: 1,
						fillOpacity: 0.5
					});
				}
			}).addTo(map);
		}catch(err) {
			console.log(err);
		}

	});
}

map.on('popupopen', function() {  
	// $('.thisbutton').click(function(e){
	//   var val = $('.thisbutton').attr('point');
	//   console.log("One of the many Small Polygon Links was clicked");
	// });
});

$("#whole-month-passenger-in" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/aggregate_points/", true, false);
});

$("#whole-month-passenger-out" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/aggregate_points/", false, false);
});

$("#wheel-chair" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/point_flow_weekday/", true, true);
});

$("#weekday-passenger-in" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/point_flow_weekday/", true, false);
});

$("#weekday-passenger-out" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/point_flow_weekday/", false, false);
});

$("#weekend-passenger-in" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/point_flow_weekend/", true, false);
});

$("#weekend-passenger-out" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/point_flow_weekend/", false, false);
});

$("#commute-on-passenger-in" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/commute_on/", true, false);
});

$("#commute-on-passenger-out" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/commute_on/", false, false);
});

$("#regular-hours-passenger-in" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/commute_off", true, false);
});

$("#regular-hours-passenger-out" ).click(function() {
	map.removeLayer(stopLayer);
	load_data_from_api("api/commute_off/", false, false);
});

load_data_from_api("api/aggregate_points/", true, false);