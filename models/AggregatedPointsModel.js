var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AggregatedPointsSchema = new Schema({
	'_id' : Number,
	'POINT_ID':Number,
	'POINTS' : Number,
	'PASSENGER_OUT' : Number,
	'PASSENGER_ID' : Number,
	'WHEELCHAIR_COUNT': Number,
	'STOP_CODE' : String,
	'SHORT_NAME' : String,
	'LONG_NAME' : String,
	'STOP_ID' : String,
	'POS_NO' : String,
	'POINT_ROLE' : String,
	'GPS_LONGITUDE' : Number,
	'GPS_LATITUDE' : Number,
	'DISTRICT_ID' : String,
	'VALID_FROM' : String,
	'VALID_UNTIL' : String
});

module.exports = mongoose.model('aggregated_flow_by_date_points', AggregatedPointsSchema);
