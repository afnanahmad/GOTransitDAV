var express = require('express');
var router = express.Router();
var CommuteOffPointsController = require('../controllers/CommuteOffPointsController.js');

/*
 * GET
 */
router.get('/', CommuteOffPointsController.list);

/*
 * GET
 */
router.get('/:id', CommuteOffPointsController.show);

/*
 * POST
 */
router.post('/', CommuteOffPointsController.create);

/*
 * PUT
 */
router.put('/:id', CommuteOffPointsController.update);

/*
 * DELETE
 */
router.delete('/:id', CommuteOffPointsController.remove);

module.exports = router;
