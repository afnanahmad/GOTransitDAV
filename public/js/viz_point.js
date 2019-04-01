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

var baseUrl = (window.location).href; // You can also use document.URL
var id = baseUrl.substring(baseUrl.lastIndexOf('/') + 1);
$('#point_id').text(id);

$.getJSON('/api/aggregate_points/'+id, function(point){
    console.log(point);
    $('#point_id').text(point.POINT_ID);
    $('#point_name').text(point.LONG_NAME);
    $('#passenger_in').text(point.PASSENGER_IN);
    $('#passenger_out').text(point.PASSENGER_OUT);

    var marker = L.marker([point.GPS_LATITUDE, point.GPS_LONGITUDE]).addTo(map);
    var popupOptions =
    {
    'maxWidth': '500',
    'autoPan': true,
    'closeButton': false,
    'keepInView': true,
    'closeOnClick': false
    }
    marker.bindPopup("<p>"+point.LONG_NAME+"</p>", popupOptions).openPopup();
    map.panTo(new L.LatLng(point.GPS_LATITUDE, point.GPS_LONGITUDE));
});

function drawChart(data) {
    var svgWidth = 600, svgHeight = 600;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var g = svg.append("g")
    .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")"
    );

    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line1 = d3.line()
        .x(function(d) { return x(d.slot)})
        .y(function(d) { return y(d.passenger_in)})
    x.domain(d3.extent(data, function(d) { return d.slot }));
    y.domain(d3.extent(data, function(d) { return d.passenger_in }));
    
    var line2 = d3.line()
        .x(function(d) { return x(d.slot)})
        .y(function(d) { return y(d.passenger_out)})
        // x.domain(d3.extent(data, function(d) { return d.slot }));
        // y.domain(d3.extent(data, function(d) { return d.passenger_out }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Passengers");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line2);

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line1);
}


function draw_new_chart(data, chart_container) {

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 1400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.time.format("%b %Y").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(24);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(10);

    // Define the line
    var priceline = d3.svg.line()	
        .x(function(d) { return x(d.slot); })
        .y(function(d) { return y(d.value); });

    // Adds the svg canvas
    var svg = d3.select("#"+chart_container)
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform", 
                        "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.slot; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.name;})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for the legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("id", 'tag'+chart_container+'-'+d.key.replace(/\s+/g, '')) // assign ID
            .attr("d", priceline(d.values));

        // Add the Legend
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace)  // space legend
            .attr("y", height + (margin.bottom/2)+ 5)
            .attr("class", "legend")    // style the legend
            .style("fill", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .on("click", function(){
                // Determine if current line is visible 
                var active   = d.active ? false : true,
                newOpacity = active ? 0 : 1; 
                // Hide or show the elements based on the ID
                d3.select('#tag'+chart_container+'-'+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("opacity", newOpacity); 
                // Update whether or not the elements are active
                d.active = active;
                })  
            .text(d.key); 

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

$.getJSON('/api/slots/'+id, function(slots){
    var arr = [];
    for (var i in slots) {
        var slot = slots[i];
        var time = slot.TIME_SLOT * 1800;
        var date = new Date('2017-07-01 00:00:00');
        date.setUTCSeconds(time);
        arr.push(
            {
                name: 'Passenger In',
                slot: date,
                value: slot.PASSENGER_IN,
            }
        );
        arr.push(
            {
                name: 'Passenger Out',
                slot: date,
                value: slot.PASSENGER_OUT
            }
        );
    }

    draw_new_chart(arr, "chart");
});

$.getJSON('/api/point_flow_by_date/'+id, function(slots){
    var arr = [];

    for (var i in slots) {
        var slot = slots[i];
        var date = new Date(slot.OPD_DATE);
        arr.push (
            {
                name: 'Passenger In',
                slot: date,
                value: slot.PASSENGER_IN,
            }
        );
        arr.push(
            {
                name: 'Passenger Out',
                slot: date,
                value: slot.PASSENGER_OUT
            }
        );
    }

    var sorted_array = arr.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.slot - a.slot;
      });

    draw_new_chart(arr, "chart1");
});

isItWeekEnd = function() {
    var d = new Date();
    var dateValue = d.getDay(); 
    if(dateValue == 0 || dateValue == 6)
        return true;
    else 
        return false;  
}

function calculate_dates()
{
    var date = new Date();
    date.setFullYear(2017);
    date.setMonth(6);
    date.setDate(1);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setHours(0)

    var dates = [];

    for (var i = 0; i < 31; i++) {
        date.setDate(i+1);

        dates.push(date);
    }


    return dates;
}

function calculate_weekends()
{
    var date = new Date();
    date.setFullYear(2017);
    date.setMonth(6);
    date.setDate(1);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setHours(0)

    var dates = [];

    for (var i = 0; i < 31; i++) {
        date.setDate(i+1);

        var dateValue = date.getDay();
        if(dateValue == 0 || dateValue == 6)
            dates.push(date);
    }


    return dates;
}

function calculate_weekdays()
{
    var date = new Date();
    date.setFullYear(2017);
    date.setMonth(6);
    date.setDate(1);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setHours(0)

    var dates = [];

    for (var i = 0; i < 31; i++) {
        date.setDate(i+1);

        var dateValue = date.getDay();
        if(dateValue != 0 && dateValue != 6)
            dates.push(date);
    }


    return dates;
}

console.log("weekends: "+calculate_weekends());
console.log("weekends: "+calculate_weekdays());
