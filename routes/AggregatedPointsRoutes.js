var express = require('express');
var router = express.Router();
var AggregatedPointsController = require('../controllers/AggregatedPointsController.js');

/*
 * GET
 */
router.get('/', AggregatedPointsController.list);

/*
 * GET
 */
router.get('/:id', AggregatedPointsController.show);

/*
 * POST
 */
router.post('/', AggregatedPointsController.create);

/*
 * PUT
 */
router.put('/:id', AggregatedPointsController.update);

/*
 * DELETE
 */
router.delete('/:id', AggregatedPointsController.remove);

module.exports = router;