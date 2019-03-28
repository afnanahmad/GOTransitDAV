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
       var slot = req.params.slot;

       PointSlotModel.find({TIME_SLOT: slot}, function(err, PointSlots){
            
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }

            return res.json(PointSlots);
       });

       /*PointModel.find(function(err, Points){
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting PointSlot.',
                    error: err
                });
            }

            var new_points = [];
            var promises = Points.map(function(thispoint) {

                var point = thispoint;
                return new Promise(function(resolve, reject) {
                    PointSlotModel.findOne({POINT_ID: point.POINT_ID, TIME_SLOT: slot}, function (err, PointSlot) {
                        
                        if (PointSlot) {
                            point.PASSENGER_IN = PointSlot.PASSENGER_IN;
                            point.PASSENGER_OUT = PointSlot.PASSENGER_OUT;
                            new_points.push(point);
                            console.log(point);
                        }
                        resolve();
                    });
                });
            });
            
            Promise.all(promises)
            .then(function() { console.log('all completed'); return res.json(new_points); })
            .catch(console.error);
        });*/
    },
};