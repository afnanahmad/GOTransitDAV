var express = require('express');
var router = express.Router();
var PointFlowByWeekendController = require('../controllers/PointFlowByWeekendController.js');

/*
 * GET
 */
router.get('/', PointFlowByWeekendController.list);

/*
 * GET
 */
router.get('/:id', PointFlowByWeekendController.show);

/*
 * POST
 */
router.post('/', PointFlowByWeekendController.create);

/*
 * PUT
 */
router.put('/:id', PointFlowByWeekendController.update);

/*
 * DELETE
 */
router.delete('/:id', PointFlowByWeekendController.remove);

module.exports = router;
