var PointFlowBySlotModel = require('../models/PointFlowBySlotModel.js');

/**
 * PointFlowBySlotController.js
 *
 * @description :: Server-side logic for managing PointFlowBySlots.
 */
module.exports = {

    /**
     * PointFlowBySlotController.list()
     */
    list: function (req, res) {
        PointFlowBySlotModel.find(function (err, PointFlowBySlots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowBySlot.',
                    error: err
                });
            }
            return res.json(PointFlowBySlots);
        });
    },

    /**
     * PointFlowBySlotController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointFlowBySlotModel.find({POINT_ID: id}, function (err, PointFlowBySlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowBySlot.',
                    error: err
                });
            }
            if (!PointFlowBySlot) {
                return res.status(404).json({
                    message: 'No such PointFlowBySlot'
                });
            }
            return res.json(PointFlowBySlot);
        });
    },

    /**
     * PointFlowBySlotController.create()
     */
    create: function (req, res) {
        var PointFlowBySlot = new PointFlowBySlotModel({
			PASSENGER_OUT : req.body.PASSENGER_OUT,
			PASSENGER_IN : req.body.PASSENGER_IN,
			WHEELCHAIR_COUNT : req.body.WHEELCHAIR_COUNT,
			TIME_SLOT : req.body.TIME_SLOT,
			POINT_ID : req.body.POINT_ID

        });

        PointFlowBySlot.save(function (err, PointFlowBySlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointFlowBySlot',
                    error: err
                });
            }
            return res.status(201).json(PointFlowBySlot);
        });
    },

    /**
     * PointFlowBySlotController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointFlowBySlotModel.findOne({_id: id}, function (err, PointFlowBySlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointFlowBySlot',
                    error: err
                });
            }
            if (!PointFlowBySlot) {
                return res.status(404).json({
                    message: 'No such PointFlowBySlot'
                });
            }

            PointFlowBySlot.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointFlowBySlot.PASSENGER_OUT;
			PointFlowBySlot.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointFlowBySlot.PASSENGER_IN;
			PointFlowBySlot.WHEELCHAIR_COUNT = req.body.WHEELCHAIR_COUNT ? req.body.WHEELCHAIR_COUNT : PointFlowBySlot.WHEELCHAIR_COUNT;
			PointFlowBySlot.TIME_SLOT = req.body.TIME_SLOT ? req.body.TIME_SLOT : PointFlowBySlot.TIME_SLOT;
			PointFlowBySlot.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointFlowBySlot.POINT_ID;
			
            PointFlowBySlot.save(function (err, PointFlowBySlot) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointFlowBySlot.',
                        error: err
                    });
                }

                return res.json(PointFlowBySlot);
            });
        });
    },

    /**
     * PointFlowBySlotController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointFlowBySlotModel.findByIdAndRemove(id, function (err, PointFlowBySlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointFlowBySlot.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
