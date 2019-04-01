var PointFlowByDateModel = require('../models/PointFlowByDateModel.js');

/**
 * PointFlowByDateController.js
 *
 * @description :: Server-side logic for managing PointFlowByDates.
 */
module.exports = {

    /**
     * PointFlowByDateController.list()
     */
    list: function (req, res) {
        PointFlowByDateModel.find(function (err, PointFlowByDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByDate.',
                    error: err
                });
            }
            return res.json(PointFlowByDates);
        });
    },

    /**
     * PointFlowByDateController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointFlowByDateModel.find({
            POINT_ID: id
        }, function (err, PointFlowByDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByDate.',
                    error: err
                });
            }
            if (!PointFlowByDate) {
                return res.status(404).json({
                    message: 'No such PointFlowByDate'
                });
            }
            return res.json(PointFlowByDate);
        });
    },

    /**
     * PointFlowByDateController.create()
     */
    create: function (req, res) {
        var PointFlowByDate = new PointFlowByDateModel({
            PASSENGER_OUT: req.body.PASSENGER_OUT,
            PASSENGER_IN: req.body.PASSENGER_IN,
            WHEELCHAIR_COUNT: req.body.WHEELCHAIR_COUNT,
            OPD_DATE: req.body.OPD_DATE,
            POINT_ID: req.body.POINT_ID

        });

        PointFlowByDate.save(function (err, PointFlowByDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointFlowByDate',
                    error: err
                });
            }
            return res.status(201).json(PointFlowByDate);
        });
    },

    /**
     * PointFlowByDateController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointFlowByDateModel.findOne({
            _id: id
        }, function (err, PointFlowByDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowByDate',
                    error: err
                });
            }
            if (!PointFlowByDate) {
                return res.status(404).json({
                    message: 'No such PointFlowByDate'
                });
            }

            PointFlowByDate.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointFlowByDate.PASSENGER_OUT;
            PointFlowByDate.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointFlowByDate.PASSENGER_IN;
            PointFlowByDate.WHEELCHAIR_COUNT = req.body.WHEELCHAIR_COUNT ? req.body.WHEELCHAIR_COUNT : PointFlowByDate.WHEELCHAIR_COUNT;
            PointFlowByDate.OPD_DATE = req.body.OPD_DATE ? req.body.OPD_DATE : PointFlowByDate.OPD_DATE;
            PointFlowByDate.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointFlowByDate.POINT_ID;

            PointFlowByDate.save(function (err, PointFlowByDate) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointFlowByDate.',
                        error: err
                    });
                }

                return res.json(PointFlowByDate);
            });
        });
    },

    /**
     * PointFlowByDateController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointFlowByDateModel.findByIdAndRemove(id, function (err, PointFlowByDate) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointFlowByDate.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};