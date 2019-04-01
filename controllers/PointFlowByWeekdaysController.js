var PointFlowByWeekdaysModel = require('../models/PointFlowByWeekdaysModel.js');

/**
 * PointFlowByWeekdaysController.js
 *
 * @description :: Server-side logic for managing PointFlowByWeekdayss.
 */
module.exports = {

    /**
     * PointFlowByWeekdaysController.list()
     */
    list: function (req, res) {
        PointFlowByWeekdaysModel.find(function (err, PointFlowByWeekdayss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekdays.',
                    error: err
                });
            }
            return res.json(PointFlowByWeekdayss);
        });
    },

    /**
     * PointFlowByWeekdaysController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekdaysModel.findOne({
            _id: id
        }, function (err, PointFlowByWeekdays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekdays.',
                    error: err
                });
            }
            if (!PointFlowByWeekdays) {
                return res.status(404).json({
                    message: 'No such PointFlowByWeekdays'
                });
            }
            return res.json(PointFlowByWeekdays);
        });
    },

    /**
     * PointFlowByWeekdaysController.create()
     */
    create: function (req, res) {
        var PointFlowByWeekdays = new PointFlowByWeekdaysModel({
            POINT_ID: req.body.POINT_ID,
            LONG_NAME: req.body.LONG_NAME,
            GPS_LONGITDUE: req.body.GPS_LONGITDUE,
            GPS_LATITUDE: req.body.GPS_LATITUDE,
            PASSENGER_IN: req.body.PASSENGER_IN,
            PASSENGER_OUT: req.body.PASSENGER_OUT

        });

        PointFlowByWeekdays.save(function (err, PointFlowByWeekdays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointFlowByWeekdays',
                    error: err
                });
            }
            return res.status(201).json(PointFlowByWeekdays);
        });
    },

    /**
     * PointFlowByWeekdaysController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekdaysModel.findOne({
            _id: id
        }, function (err, PointFlowByWeekdays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByWeekdays',
                    error: err
                });
            }
            if (!PointFlowByWeekdays) {
                return res.status(404).json({
                    message: 'No such PointFlowByWeekdays'
                });
            }

            PointFlowByWeekdays.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointFlowByWeekdays.POINT_ID;
            PointFlowByWeekdays.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : PointFlowByWeekdays.LONG_NAME;
            PointFlowByWeekdays.GPS_LONGITDUE = req.body.GPS_LONGITDUE ? req.body.GPS_LONGITDUE : PointFlowByWeekdays.GPS_LONGITDUE;
            PointFlowByWeekdays.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : PointFlowByWeekdays.GPS_LATITUDE;
            PointFlowByWeekdays.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointFlowByWeekdays.PASSENGER_IN;
            PointFlowByWeekdays.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointFlowByWeekdays.PASSENGER_OUT;

            PointFlowByWeekdays.save(function (err, PointFlowByWeekdays) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointFlowByWeekdays.',
                        error: err
                    });
                }

                return res.json(PointFlowByWeekdays);
            });
        });
    },

    /**
     * PointFlowByWeekdaysController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointFlowByWeekdaysModel.findByIdAndRemove(id, function (err, PointFlowByWeekdays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointFlowByWeekdays.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};