var express = require('express');
var router = express.Router();
var SlotsController = require('../controllers/SlotsController.js');

/*
 * GET
 */
router.get('/', SlotsController.list);

/*
 * GET
 */
router.get('/:id', SlotsController.show);

/*
 * POST
 */
router.post('/', SlotsController.create);

/*
 * PUT
 */
router.put('/:id', SlotsController.update);

/*
 * DELETE
 */
router.delete('/:id', SlotsController.remove);

/*
 * GET
 */
router.get('/time/:slot', SlotsController.slot);

module.exports = router;
