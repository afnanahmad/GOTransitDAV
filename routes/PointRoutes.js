var express = require('express');
var router = express.Router();
var PointController = require('../controllers/PointController.js');

/*
 * GET
 */
router.get('/', PointController.list);

/*
 * GET
 */
router.get('/:id', PointController.show);

/*
 * POST
 */
router.post('/', PointController.create);

/*
 * PUT
 */
router.put('/:id', PointController.update);

/*
 * DELETE
 */
router.delete('/:id', PointController.remove);

module.exports = router;
