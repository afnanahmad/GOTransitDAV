var PointSlotModel = require('../models/PointSlotModel.js');

/**
 * PointSlotController.js
 *
 * @description :: Server-side logic for managing PointSlots.
 */
module.exports = {

    /**
     * PointSlotController.list()
     */
    list: function (req, res) {
        PointSlotModel.find(function (err, PointSlots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }
            return res.json(PointSlots);
        });
    },

    /**
     * PointSlotController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PointSlotModel.findOne({_id: id}, function (err, PointSlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }
            if (!PointSlot) {
                return res.status(404).json({
                    message: 'No such PointSlot'
                });
            }
            return res.json(PointSlot);
        });
    },

    /**
     * PointSlotController.create()
     */
    create: function (req, res) {
        var PointSlot = new PointSlotModel({
			PASSENGER_OUT : req.body.PASSENGER_OUT,
			POINT_ID : req.body.POINT_ID,
			TIME_SLOT : req.body.TIME_SLOT,
			PASSENGER_IN : req.body.PASSENGER_IN

        });

        PointSlot.save(function (err, PointSlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating PointSlot',
                    error: err
                });
            }
            return res.status(201).json(PointSlot);
        });
    },

    /**
     * PointSlotController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PointSlotModel.findOne({_id: id}, function (err, PointSlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot',
                    error: err
                });
            }
            if (!PointSlot) {
                return res.status(404).json({
                    message: 'No such PointSlot'
                });
            }

            PointSlot.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : PointSlot.PASSENGER_OUT;
			PointSlot.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : PointSlot.POINT_ID;
			PointSlot.TIME_SLOT = req.body.TIME_SLOT ? req.body.TIME_SLOT : PointSlot.TIME_SLOT;
			PointSlot.PASSENGER_IN = req.body.PASSENGER_IN ? req.body.PASSENGER_IN : PointSlot.PASSENGER_IN;
			
            PointSlot.save(function (err, PointSlot) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating PointSlot.',
                        error: err
                    });
                }

                return res.json(PointSlot);
            });
        });
    },

    /**
     * PointSlotController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PointSlotModel.findByIdAndRemove(id, function (err, PointSlot) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the PointSlot.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
