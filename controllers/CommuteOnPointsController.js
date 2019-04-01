var CommuteOnPointsModel = require('../models/CommuteOnPointsModel.js');

/**
 * CommuteOnPointsController.js
 *
 * @description :: Server-side logic for managing CommuteOnPointss.
 */
module.exports = {

    /**
     * CommuteOnPointsController.list()
     */
    list: function (req, res) {
        CommuteOnPointsModel.find(function (err, CommuteOnPointss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOnPoints.',
                    error: err
                });
            }
            return res.json(CommuteOnPointss);
        });
    },

    /**
     * CommuteOnPointsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        CommuteOnPointsModel.findOne({_id: id}, function (err, CommuteOnPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOnPoints.',
                    error: err
                });
            }
            if (!CommuteOnPoints) {
                return res.status(404).json({
                    message: 'No such CommuteOnPoints'
                });
            }
            return res.json(CommuteOnPoints);
        });
    },

    /**
     * CommuteOnPointsController.create()
     */
    create: function (req, res) {
        var CommuteOnPoints = new CommuteOnPointsModel({
			POINT_ID : req.body.POINT_ID,
			LONG_NAME : req.body.LONG_NAME,
			GPS_LATITUDE : req.body.GPS_LATITUDE,
			GPS_LONGITUDE : req.body.GPS_LONGITUDE,
			PASSENGER_IN : req.body.PASSENGER_IN,
			PASSENGER_OUT : req.body.PASSENGER_OUT

        });

        CommuteOnPoints.save(function (err, CommuteOnPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating CommuteOnPoints',
                    error: err
                });
            }
            return res.status(201).json(CommuteOnPoints);
        });
    },

    /**
     * CommuteOnPointsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        CommuteOnPointsModel.findOne({_id: id}, function (err, CommuteOnPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting CommuteOnPoints',
                    error: err
                });
            }
            if (!CommuteOnPoints) {
                return res.status(404).json({
                    message: 'No such CommuteOnPoints'
                });
            }

            CommuteOnPoints.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : CommuteOnPoints.POINT_ID;
			CommuteOnPoints.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : CommuteOnPoints.LONG_NAME;
			CommuteOnPoints.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : CommuteOnPoints.GPS_LATITUDE;
			CommuteOnPoints.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : CommuteOnPoints.GPS_LONGITUDE;
			CommuteOnPoints.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : CommuteOnPoints.PASSENGER_IN;
			CommuteOnPoints.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : CommuteOnPoints.PASSENGER_OUT;
			
            CommuteOnPoints.save(function (err, CommuteOnPoints) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating CommuteOnPoints.',
                        error: err
                    });
                }

                return res.json(CommuteOnPoints);
            });
        });
    },

    /**
     * CommuteOnPointsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        CommuteOnPointsModel.findByIdAndRemove(id, function (err, CommuteOnPoints) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the CommuteOnPoints.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
