var mongoose = require('mongoose').set('debug', true);
var Schema   = mongoose.Schema;
mongoose.pluralize(null);

var PointSlotsDaySchema = new Schema({
	'PASSENGER_OUT' : Number,
	'WHEELCHAIR_COUNT' : Number,
	'PASSENGER_IN' : Number,
	'OPD_DATE' : Date,
	'TIME_SLOT' : Number,
	'POINT_ID' : Number
});

module.exports = mongoose.model('point_slots_by_day', PointSlotsDaySchema);
