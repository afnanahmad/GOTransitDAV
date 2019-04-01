var express = require('express');
var router = express.Router();
var PointSlotsDayController = require('../controllers/PointSlotsDayController.js');

/*
 * GET
 */
router.get('/', PointSlotsDayController.list);

/*
 * GET
 */
router.get('/:id', PointSlotsDayController.show);

/*
 * POST
 */
router.post('/', PointSlotsDayController.create);

/*
 * PUT
 */
router.put('/:id', PointSlotsDayController.update);

/*
 * DELETE
 */
router.delete('/:id', PointSlotsDayController.remove);

/*
 * GET
 */
router.get('/by_day/:id', PointSlotsDayController.byDay);

module.exports = router;