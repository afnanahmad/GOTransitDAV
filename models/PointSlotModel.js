var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PointSlotSchema = new Schema({
	'id': mongoose.SchemaTypes.ObjectId,
	'PASSENGER_OUT' : Number,
	'POINT_ID' : Number,
	'TIME_SLOT' : Number,
	'PASSENGER_IN' : Number
});

module.exports = mongoose.model('point_slots', PointSlotSchema);
