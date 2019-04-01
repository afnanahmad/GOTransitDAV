var PointFlowByWeekendModel = require('../models/PointFlowByWeekendModel.js');

/**
 * PointFlowByWeekendController.js
 *
 * @description :: Server-side logic for managing PointFlowByWeekends.
 */
module.exports = {

    /**
     * PointFlowByWeekendController.list()
     */
    list: function (req, res) {
        PointFlowByWeekendModel.find(function (err, PointFlowByWeekends) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekend.',
                    error: err
                });
            }
            return res.json(PointFlowByWeekends);
        });
    },

    /**
     * PointFlowByWeekendController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekendModel.findOne({_id: id}, function (err, PointFlowByWeekend) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekend.',
                    error: err
                });
            }
            if (!PointFlowByWeekend) {
                return res.status(404).json({
                    message: 'No such PointFlowByWeekend'
                });
            }
            return res.json(PointFlowByWeekend);
        });
    },

    /**
     * PointFlowByWeekendController.create()
     */
    create: function (req, res) {
        var PointFlowByWeekend = new PointFlowByWeekendModel({
			POINT_ID : req.body.POINT_ID,
			LONG_NAME : req.body.LONG_NAME,
			GPS_LATITUDE : req.body.GPS_LATITUDE,
			GPS_LONGITUDE : req.body.GPS_LONGITUDE,
			PASSENGER_IN : req.body.PASSENGER_IN,
			PASSENGER_OUT : req.body.PASSENGER_OUT

        });

        PointFlowByWeekend.save(function (err, PointFlowByWeekend) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointFlowByWeekend',
                    error: err
                });
            }
            return res.status(201).json(PointFlowByWeekend);
        });
    },

    /**
     * PointFlowByWeekendController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekendModel.findOne({_id: id}, function (err, PointFlowByWeekend) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekend',
                    error: err
                });
            }
            if (!PointFlowByWeekend) {
                return res.status(404).json({
                    message: 'No such PointFlowByWeekend'
                });
            }

            PointFlowByWeekend.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointFlowByWeekend.POINT_ID;
			PointFlowByWeekend.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : PointFlowByWeekend.LONG_NAME;
			PointFlowByWeekend.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : PointFlowByWeekend.GPS_LATITUDE;
			PointFlowByWeekend.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : PointFlowByWeekend.GPS_LONGITUDE;
			PointFlowByWeekend.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointFlowByWeekend.PASSENGER_IN;
			PointFlowByWeekend.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointFlowByWeekend.PASSENGER_OUT;
			
            PointFlowByWeekend.save(function (err, PointFlowByWeekend) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointFlowByWeekend.',
                        error: err
                    });
                }

                return res.json(PointFlowByWeekend);
            });
        });
    },

    /**
     * PointFlowByWeekendController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekendModel.findByIdAndRemove(id, function (err, PointFlowByWeekend) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointFlowByWeekend.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
