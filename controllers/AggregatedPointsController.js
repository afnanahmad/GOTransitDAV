var AggregatedPointsModel = require('../models/AggregatedPointsModel.js');

/**
 * AggregatedPointsController.js
 *
 * @description :: Server-side logic for managing AggregatedPointss.
 */
module.exports = {

    /**
     * AggregatedPointsController.list()
     */
    list: function (req, res) {
        AggregatedPointsModel.find(function (err, AggregatedPointss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AggregatedPoints.',
                    error: err
                });
            }
            return res.json(AggregatedPointss);
        });
    },

    /**
     * AggregatedPointsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        AggregatedPointsModel.findOne({_id: id}, function (err, AggregatedPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AggregatedPoints.',
                    error: err
                });
            }
            if (!AggregatedPoints) {
                return res.status(404).json({
                    message: 'No such AggregatedPoints'
                });
            }
            return res.json(AggregatedPoints);
        });
    },

    /**
     * AggregatedPointsController.create()
     */
    create: function (req, res) {
        var AggregatedPoints = new AggregatedPointsModel({
			_id : req.body._id,
			POINTS : req.body.POINTS,
			PASSENGER_OUT : req.body.PASSENGER_OUT,
			PASSENGER_ID : req.body.PASSENGER_ID,
			STOP_CODE : req.body.STOP_CODE,
			SHORT_NAME : req.body.SHORT_NAME,
			LONG_NAME : req.body.LONG_NAME,
			STOP_ID : req.body.STOP_ID,
			POS_NO : req.body.POS_NO,
			POINT_ROLE : req.body.POINT_ROLE,
			GPS_LONGITUDE : req.body.GPS_LONGITUDE,
			GPS_LATITUDE : req.body.GPS_LATITUDE,
			DISTRICT_ID : req.body.DISTRICT_ID,
			VALID_FROM : req.body.VALID_FROM,
			VALID_UNTIL : req.body.VALID_UNTIL

        });

        AggregatedPoints.save(function (err, AggregatedPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating AggregatedPoints',
                    error: err
                });
            }
            return res.status(201).json(AggregatedPoints);
        });
    },

    /**
     * AggregatedPointsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        AggregatedPointsModel.findOne({_id: id}, function (err, AggregatedPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting AggregatedPoints',
                    error: err
                });
            }
            if (!AggregatedPoints) {
                return res.status(404).json({
                    message: 'No such AggregatedPoints'
                });
            }

            AggregatedPoints._id = req.body._id ? req.body._id : AggregatedPoints._id;
			AggregatedPoints.POINTS = req.body.POINTS ? req.body.POINTS : AggregatedPoints.POINTS;
			AggregatedPoints.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : AggregatedPoints.PASSENGER_OUT;
			AggregatedPoints.PASSENGER_ID = req.body.PASSENGER_ID ? req.body.PASSENGER_ID : AggregatedPoints.PASSENGER_ID;
			AggregatedPoints.STOP_CODE = req.body.STOP_CODE ? req.body.STOP_CODE : AggregatedPoints.STOP_CODE;
			AggregatedPoints.SHORT_NAME = req.body.SHORT_NAME ? req.body.SHORT_NAME : AggregatedPoints.SHORT_NAME;
			AggregatedPoints.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : AggregatedPoints.LONG_NAME;
			AggregatedPoints.STOP_ID = req.body.STOP_ID ? req.body.STOP_ID : AggregatedPoints.STOP_ID;
			AggregatedPoints.POS_NO = req.body.POS_NO ? req.body.POS_NO : AggregatedPoints.POS_NO;
			AggregatedPoints.POINT_ROLE = req.body.POINT_ROLE ? req.body.POINT_ROLE : AggregatedPoints.POINT_ROLE;
			AggregatedPoints.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : AggregatedPoints.GPS_LONGITUDE;
			AggregatedPoints.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : AggregatedPoints.GPS_LATITUDE;
			AggregatedPoints.DISTRICT_ID = req.body.DISTRICT_ID ? req.body.DISTRICT_ID : AggregatedPoints.DISTRICT_ID;
			AggregatedPoints.VALID_FROM = req.body.VALID_FROM ? req.body.VALID_FROM : AggregatedPoints.VALID_FROM;
			AggregatedPoints.VALID_UNTIL = req.body.VALID_UNTIL ? req.body.VALID_UNTIL : AggregatedPoints.VALID_UNTIL;
			
            AggregatedPoints.save(function (err, AggregatedPoints) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating AggregatedPoints.',
                        error: err
                    });
                }

                return res.json(AggregatedPoints);
            });
        });
    },

    /**
     * AggregatedPointsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        AggregatedPointsModel.findByIdAndRemove(id, function (err, AggregatedPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the AggregatedPoints.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
