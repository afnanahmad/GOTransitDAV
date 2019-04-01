var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PointFlowByWeekdaysSchema = new Schema({
	'POINT_ID' : Number,
	'LONG_NAME' : String,
	'GPS_LONGITDUE' : Number,
	'GPS_LATITUDE' : Number,
	'PASSENGER_IN' : Number,
	'PASSENGER_OUT' : Number
});

module.exports = mongoose.model('descriptive_point_flow_by_weekdays', PointFlowByWeekdaysSchema);
