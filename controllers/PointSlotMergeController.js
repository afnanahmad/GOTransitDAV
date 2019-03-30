var PointModel = require('../models/PointModel.js');
var PointSlotModel = require('../models/PointSlotModel.js');
var async = require("async");

/**
 * PointSlotMergeController.js
 *
 * @description :: Server-side logic for managing PointSlots.
 */
module.exports = {

    /**
     * PointSlotMergeController.list()
     */
    list: function (req, res) {

        PointModel.find(function(err, Points){
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }
            return res.json(Points);
        });
    },
    
    /**
    * PointSlotMergeController.show()
    */
    show: function (req, res) {
       var point = req.params.point;

       PointSlotModel.find({POINT_ID: slot}, function(err, PointSlots){
            
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }

            return res.json(PointSlots);
       });
    },
};