var express = require('express');
var router = express.Router();
var PointSlotMergeController = require('../controllers/PointSlotMergeController.js');

/*
 * GET
 */
router.get('/', PointSlotMergeController.list);

/*
 * GET
 */
router.get('/:point', PointSlotMergeController.show);


module.exports = router;