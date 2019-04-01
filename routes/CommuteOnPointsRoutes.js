var express = require('express');
var router = express.Router();
var CommuteOnPointsController = require('../controllers/CommuteOnPointsController.js');

/*
 * GET
 */
router.get('/', CommuteOnPointsController.list);

/*
 * GET
 */
router.get('/:id', CommuteOnPointsController.show);

/*
 * POST
 */
router.post('/', CommuteOnPointsController.create);

/*
 * PUT
 */
router.put('/:id', CommuteOnPointsController.update);

/*
 * DELETE
 */
router.delete('/:id', CommuteOnPointsController.remove);

module.exports = router;