var express = require('express');
var router = express.Router();
var PointFlowByDateController = require('../controllers/PointFlowByDateController.js');

/*
 * GET
 */
router.get('/', PointFlowByDateController.list);

/*
 * GET
 */
router.get('/:id', PointFlowByDateController.show);

/*
 * POST
 */
router.post('/', PointFlowByDateController.create);

/*
 * PUT
 */
router.put('/:id', PointFlowByDateController.update);

/*
 * DELETE
 */
router.delete('/:id', PointFlowByDateController.remove);

module.exports = router;
