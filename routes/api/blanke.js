const express = require('express');

const router = express.Router();

const validate = require('../../app/Http/Middleware/validate.js')

const blanke = require('../../app/Http/Controllers/API/blankeController.js')

const blankeController = new blanke()


router.get('/', blankeController.index);

router.post('/', blankeController.store);

router.get('/:id', blankeController.show);

router.put('/:id', blankeController.update);

router.delete('/:id',blankeController.destroy);



module.exports = router;