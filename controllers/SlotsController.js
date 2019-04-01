var SlotsModel = require('../models/SlotsModel.js');

/**
 * SlotsController.js
 *
 * @description :: Server-side logic for managing Slotss.
 */
module.exports = {

    /**
     * SlotsController.list()
     */
    list: function (req, res) {
        SlotsModel.find(function (err, Slotss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Slots.',
                    error: err
                });
            }
            return res.json(Slotss);
        });
    },

    /**
     * SlotsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        SlotsModel.find({
            POINT_ID: id
        }, function (err, Slots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Slots.',
                    error: err
                });
            }
            if (!Slots) {
                return res.status(404).json({
                    message: 'No such Slots'
                });
            }
            return res.json(Slots);
        });
    },

    /**
     * SlotsController.create()
     */
    create: function (req, res) {
        var Slots = new SlotsModel({
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
            VALID_UNTIL: req.body.VALID_UNTIL,
            PASSENGER_OUT: req.body.PASSENGER_OUT,
            PASSENGER_ID: req.body.PASSENGER_ID,
            TIME_SLOT: req.body.TIME_SLOT

        });

        Slots.save(function (err, Slots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Slots',
                    error: err
                });
            }
            return res.status(201).json(Slots);
        });
    },

    /**
     * SlotsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        SlotsModel.findOne({
            _id: id
        }, function (err, Slots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Slots',
                    error: err
                });
            }
            if (!Slots) {
                return res.status(404).json({
                    message: 'No such Slots'
                });
            }

            Slots.POINT_ID = req.body.POINT_ID ? req.body.POINT_ID : Slots.POINT_ID;
            Slots.STOP_CODE = req.body.STOP_CODE ? req.body.STOP_CODE : Slots.STOP_CODE;
            Slots.SHORT_NAME = req.body.SHORT_NAME ? req.body.SHORT_NAME : Slots.SHORT_NAME;
            Slots.LONG_NAME = req.body.LONG_NAME ? req.body.LONG_NAME : Slots.LONG_NAME;
            Slots.STOP_ID = req.body.STOP_ID ? req.body.STOP_ID : Slots.STOP_ID;
            Slots.POS_NO = req.body.POS_NO ? req.body.POS_NO : Slots.POS_NO;
            Slots.POINT_ROLE = req.body.POINT_ROLE ? req.body.POINT_ROLE : Slots.POINT_ROLE;
            Slots.GPS_LONGITUDE = req.body.GPS_LONGITUDE ? req.body.GPS_LONGITUDE : Slots.GPS_LONGITUDE;
            Slots.GPS_LATITUDE = req.body.GPS_LATITUDE ? req.body.GPS_LATITUDE : Slots.GPS_LATITUDE;
            Slots.DISTRICT_ID = req.body.DISTRICT_ID ? req.body.DISTRICT_ID : Slots.DISTRICT_ID;
            Slots.VALID_FROM = req.body.VALID_FROM ? req.body.VALID_FROM : Slots.VALID_FROM;
            Slots.VALID_UNTIL = req.body.VALID_UNTIL ? req.body.VALID_UNTIL : Slots.VALID_UNTIL;
            Slots.PASSENGER_OUT = req.body.PASSENGER_OUT ? req.body.PASSENGER_OUT : Slots.PASSENGER_OUT;
            Slots.PASSENGER_ID = req.body.PASSENGER_ID ? req.body.PASSENGER_ID : Slots.PASSENGER_ID;
            Slots.TIME_SLOT = req.body.TIME_SLOT ? req.body.TIME_SLOT : Slots.TIME_SLOT;

            Slots.save(function (err, Slots) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Slots.',
                        error: err
                    });
                }

                return res.json(Slots);
            });
        });
    },

    /**
     * SlotsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        SlotsModel.findByIdAndRemove(id, function (err, Slots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Slots.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * SlotsController.show()
     */
    slot: function (req, res) {
        var slot = req.params.slot;
        SlotsModel.find({
            TIME_SLOT: slot
        }, function (err, Slots) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Slots.',
                    error: err
                });
            }
            if (!Slots) {
                return res.status(404).json({
                    message: 'No such Slots'
                });
            }
            return res.json(Slots);
        });
    }
};