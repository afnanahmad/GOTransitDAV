var express = require('express');
var router = express.Router();
var PointSlotController = require('../controllers/PointSlotController.js');

/*
 * GET
 */
router.get('/', PointSlotController.list);

/*
 * GET
 */
router.get('/:id', PointSlotController.show);

/*
 * POST
 */
router.post('/', PointSlotController.create);

/*
 * PUT
 */
router.put('/:id', PointSlotController.update);

/*
 * DELETE
 */
router.delete('/:id', PointSlotController.remove);

module.exports = router;