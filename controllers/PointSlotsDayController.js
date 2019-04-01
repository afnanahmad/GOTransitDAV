var PointSlotsDayModel = require('../models/PointSlotsDayModel.js');

/**
 * PointSlotsDayController.js
 *
 * @description :: Server-side logic for managing PointSlotsDays.
 */
module.exports = {

    /**
     * PointSlotsDayController.list()
     */
    list: function (req, res) {
        PointSlotsDayModel.find(function (err, PointSlotsDays) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlotsDay.',
                    error: err
                });
            }
            return res.json(PointSlotsDays);
        });
    },

    /**
     * PointSlotsDayController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointSlotsDayModel.find({
            POINT_ID: id
        }, function (err, PointSlotsDay) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlotsDay.',
                    error: err
                });
            }
            if (!PointSlotsDay) {
                return res.status(404).json({
                    message: 'No such PointSlotsDay'
                });
            }
            return res.json(PointSlotsDay);
        });
    },

    /**
     * PointSlotsDayController.create()
     */
    create: function (req, res) {
        var PointSlotsDay = new PointSlotsDayModel({
            PASSENGER_OUT: req.body.PASSENGER_OUT,
            WHEELCHAIR_COUNT: req.body.WHEELCHAIR_COUNT,
            PASSENGER_IN: req.body.PASSENGER_IN,
            OPD_DATE: req.body.OPD_DATE,
            TIME_SLOT: req.body.TIME_SLOT,
            POINT_ID: req.body.POINT_ID

        });

        PointSlotsDay.save(function (err, PointSlotsDay) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointSlotsDay',
                    error: err
                });
            }
            return res.status(201).json(PointSlotsDay);
        });
    },

    /**
     * PointSlotsDayController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointSlotsDayModel.findOne({
            _id: id
        }, function (err, PointSlotsDay) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlotsDay',
                    error: err
                });
            }
            if (!PointSlotsDay) {
                return res.status(404).json({
                    message: 'No such PointSlotsDay'
                });
            }

            PointSlotsDay.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointSlotsDay.PASSENGER_OUT;
            PointSlotsDay.WHEELCHAIR_COUNT = req.body.WHEELCHAIR_COUNT ? req.body.WHEELCHAIR_COUNT : PointSlotsDay.WHEELCHAIR_COUNT;
            PointSlotsDay.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointSlotsDay.PASSENGER_IN;
            PointSlotsDay.OPD_DATE = req.body.OPD_DATE ? req.body.OPD_DATE : PointSlotsDay.OPD_DATE;
            PointSlotsDay.TIME_SLOT = req.body.TIME_SLOT ? req.body.TIME_SLOT : PointSlotsDay.TIME_SLOT;
            PointSlotsDay.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointSlotsDay.POINT_ID;

            PointSlotsDay.save(function (err, PointSlotsDay) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointSlotsDay.',
                        error: err
                    });
                }

                return res.json(PointSlotsDay);
            });
        });
    },

    /**
     * PointSlotsDayController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointSlotsDayModel.findByIdAndRemove(id, function (err, PointSlotsDay) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointSlotsDay.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * PointSlotsDayController.show()
     */
    byDay: function (req, res) {
        var id = req.params.id;
        PointSlotsDayModel.aggregate([{
                $match: {
                    POINT_ID: parseInt(id)
                }
            },
            {
                "$group": {
                    _id: {
                        POINT_ID: "$POINT_ID",
                        OPD_DATE: "$OPD_DATE"
                    },
                    PASSENGER_OUT: {
                        $sum: "$PASSENGER_OUT"
                    },
                    PASSENGER_IN: {
                        $sum: "$PASSENGER_IN"
                    },
                    OPD_DATE: {
                        $first: "$OPD_DATE"
                    }
                }
            }
        ], function (err, PointSlotsDay) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlotsDay.',
                    error: err
                });
            }
            if (!PointSlotsDay) {
                return res.status(404).json({
                    message: 'No such PointSlotsDay'
                });
            }
            return res.json(PointSlotsDay);
        });
    }
};