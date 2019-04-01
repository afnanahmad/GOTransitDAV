var express = require('express');
var router = express.Router();
var PointFlowByWeekdaysController = require('../controllers/PointFlowByWeekdaysController.js');

/*
 * GET
 */
router.get('/', PointFlowByWeekdaysController.list);

/*
 * GET
 */
router.get('/:id', PointFlowByWeekdaysController.show);

/*
 * POST
 */
router.post('/', PointFlowByWeekdaysController.create);

/*
 * PUT
 */
router.put('/:id', PointFlowByWeekdaysController.update);

/*
 * DELETE
 */
router.delete('/:id', PointFlowByWeekdaysController.remove);

module.exports = router;