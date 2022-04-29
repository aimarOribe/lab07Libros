const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.listar);
router.get('/new-entry',employeeController.agregar)
router.post('/new-entry', employeeController.guardar);
router.get('/delete/:id', employeeController.eliminar);

module.exports = router;