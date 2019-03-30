var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
mongoose.pluralize(null);

var PointFlowByDateSchema = new Schema({
	'PASSENGER_OUT' : Number,
	'PASSENGER_IN' : Number,
	'WHEELCHAIR_COUNT' : Number,
	'OPD_DATE' : Date,
	'POINT_ID' : Number
});

module.exports = mongoose.model('point_flow_by_date', PointFlowByDateSchema);
