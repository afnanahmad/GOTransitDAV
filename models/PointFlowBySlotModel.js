var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.pluralize(null);

var PointFlowBySlotSchema = new Schema({
	'PASSENGER_OUT': Number,
	'PASSENGER_IN': Number,
	'WHEELCHAIR_COUNT': Number,
	'TIME_SLOT': Number,
	'POINT_ID': Number
});

module.exports = mongoose.model('point_flow_by_slot', PointFlowBySlotSchema);