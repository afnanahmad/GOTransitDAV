var CommuteOffPointsModel = require('../models/CommuteOffPointsModel.js');

/**
 * CommuteOffPointsController.js
 *
 * @description :: Server-side logic for managing CommuteOffPointss.
 */
module.exports = {

    /**
     * CommuteOffPointsController.list()
     */
    list: function (req, res) {
        CommuteOffPointsModel.find(function (err, CommuteOffPointss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOffPoints.',
                    error: err
                });
            }
            return res.json(CommuteOffPointss);
        });
    },

    /**
     * CommuteOffPointsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CommuteOffPointsModel.findOne({
            _id: id
        }, function (err, CommuteOffPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOffPoints.',
                    error: err
                });
            }
            if (!CommuteOffPoints) {
                return res.status(404).json({
                    message: 'No such CommuteOffPoints'
                });
            }
            return res.json(CommuteOffPoints);
        });
    },

    /**
     * CommuteOffPointsController.create()
     */
    create: function (req, res) {
        var CommuteOffPoints = new CommuteOffPointsModel({
            POINT_ID: req.body.POINT_ID,
            LONG_NAME: req.body.LONG_NAME,
            GPS_LATITUDE: req.body.GPS_LATITUDE,
            GPS_LONGITUDE: req.body.GPS_LONGITUDE,
            PASSENGER_IN: req.body.PASSENGER_IN,
            PASSENGER_OUT: req.body.PASSENGER_OUT

        });

        CommuteOffPoints.save(function (err, CommuteOffPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating CommuteOffPoints',
                    error: err
                });
            }
            return res.status(201).json(CommuteOffPoints);
        });
    },

    /**
     * CommuteOffPointsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CommuteOffPointsModel.findOne({
            _id: id
        }, function (err, CommuteOffPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOffPoints',
                    error: err
                });
            }
            if (!CommuteOffPoints) {
                return res.status(404).json({
                    message: 'No such CommuteOffPoints'
                });
            }

            CommuteOffPoints.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : CommuteOffPoints.POINT_ID;
            CommuteOffPoints.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : CommuteOffPoints.LONG_NAME;
            CommuteOffPoints.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : CommuteOffPoints.GPS_LATITUDE;
            CommuteOffPoints.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : CommuteOffPoints.GPS_LONGITUDE;
            CommuteOffPoints.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : CommuteOffPoints.PASSENGER_IN;
            CommuteOffPoints.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : CommuteOffPoints.PASSENGER_OUT;

            CommuteOffPoints.save(function (err, CommuteOffPoints) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating CommuteOffPoints.',
                        error: err
                    });
                }

                return res.json(CommuteOffPoints);
            });
        });
    },

    /**
     * CommuteOffPointsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CommuteOffPointsModel.findByIdAndRemove(id, function (err, CommuteOffPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the CommuteOffPoints.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};