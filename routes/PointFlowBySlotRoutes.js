var express = require('express');
var router = express.Router();
var PointFlowBySlotController = require('../controllers/PointFlowBySlotController.js');

/*
 * GET
 */
router.get('/', PointFlowBySlotController.list);

/*
 * GET
 */
router.get('/:id', PointFlowBySlotController.show);

/*
 * POST
 */
router.post('/', PointFlowBySlotController.create);

/*
 * PUT
 */
router.put('/:id', PointFlowBySlotController.update);

/*
 * DELETE
 */
router.delete('/:id', PointFlowBySlotController.remove);

module.exports = router;