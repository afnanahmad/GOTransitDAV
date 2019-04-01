var mongoose = require('mongoose').set('debug', true);
var Schema   = mongoose.Schema;

var PointSchema = new Schema({
	'id': mongoose.SchemaTypes.ObjectId,
	'POINT_ID' : { 
		type: Number,
		required: true	
		},
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
}, { collection: 'point'});

module.exports = mongoose.model('point', PointSchema);
