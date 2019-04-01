var PointModel = require('../models/PointModel.js');
var PointSlotsModel = require('../models/PointSlotModel.js');

/**
 * PointController.js
 *
 * @description :: Server-side logic for managing Points.
 */
module.exports = {

    /**
     * PointController.list()
     */
    list: function (req, res) {
        PointModel.find(function (err, Points) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Point.',
                    error: err
                });
            }
            return res.json(Points);
        });
    },

    /**
     * PointController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointModel.findOne({
            POINT_ID: parseInt(id)
        }, function (err, Point) {
            console.log("Error: " + err);
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Point.',
                    error: err
                });
            }
            if (!Point) {
                return res.status(404).json({
                    message: 'No such Point'
                });
            }
            return res.json(Point);
        });
    },

    /**
     * PointController.create()
     */
    create: function (req, res) {
        var Point = new PointModel({
            _id: req.body._id,
            POINT_ID: req.body.POINT_ID,
            STOP_CODE: req.body.STOP_CODE,
            SHORT_NAME: req.body.SHORT_NAME,
            LONG_NAME: req.body.LONG_NAME,
            STOP_ID: req.body.STOP_ID,
            POS_NO: req.body.POS_NO,
            POINT_ROLE: req.body.POINT_ROLE,
            GPS_LONGITUDE: req.body.GPS_LONGITUDE,
            GPS_LATITUDE: req.body.GPS_LATITUDE,
            DISTRICT_ID: req.body.DISTRICT_ID,
            VALID_FROM: req.body.VALID_FROM,
            VALID_UNTIL: req.body.VALID_UNTIL

        });

        Point.save(function (err, Point) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Point',
                    error: err
                });
            }
            return res.status(201).json(Point);
        });
    },

    /**
     * PointController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointModel.findOne({
            _id: id
        }, function (err, Point) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Point',
                    error: err
                });
            }
            if (!Point) {
                return res.status(404).json({
                    message: 'No such Point'
                });
            }

            Point._id = req.body._id ? req.body._id : Point._id;
            Point.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : Point.POINT_ID;
            Point.STOP_CODE = req.body.STOP_CODE ? req.body.STOP_CODE : Point.STOP_CODE;
            Point.SHORT_NAME = req.body.SHORT_NAME ? req.body.SHORT_NAME : Point.SHORT_NAME;
            Point.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : Point.LONG_NAME;
            Point.STOP_ID = req.body.STOP_ID ? req.body.STOP_ID : Point.STOP_ID;
            Point.POS_NO = req.body.POS_NO ? req.body.POS_NO : Point.POS_NO;
            Point.POINT_ROLE = req.body.POINT_ROLE ? req.body.POINT_ROLE : Point.POINT_ROLE;
            Point.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : Point.GPS_LONGITUDE;
            Point.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : Point.GPS_LATITUDE;
            Point.DISTRICT_ID = req.body.DISTRICT_ID ? req.body.DISTRICT_ID : Point.DISTRICT_ID;
            Point.VALID_FROM = req.body.VALID_FROM ? req.body.VALID_FROM : Point.VALID_FROM;
            Point.VALID_UNTIL = req.body.VALID_UNTIL ? req.body.VALID_UNTIL : Point.VALID_UNTIL;

            Point.save(function (err, Point) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Point.',
                        error: err
                    });
                }

                return res.json(Point);
            });
        });
    },

    /**
     * PointController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointModel.findByIdAndRemove(id, function (err, Point) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Point.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};