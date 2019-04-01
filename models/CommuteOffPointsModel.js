var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
mongoose.pluralize(null);

var CommuteOffPointsSchema = new Schema({
	'POINT_ID' : Number,
	'LONG_NAME' : String,
	'GPS_LATITUDE' : Number,
	'GPS_LONGITUDE' : Number,
	'PASSENGER_IN' : Number,
	'PASSENGER_OUT' : Number
});

module.exports = mongoose.model('descriptive_point_flow_by_commmute_off', CommuteOffPointsSchema);
