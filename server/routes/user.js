const express = require ('express');
const router = express.Router ();
const urlController = require ('../controllers/urlController')
const urlTopController = require ('../controllers/urlTopController');

router.get('/', urlTopController.view);
router.get('/year', urlController.year);
router.get('/pass', urlController.passView);
router.get('/viewPrograms/:year', urlController.viewPrograms);
router.post('/passKlavier', urlController.pass);
router.get('/delete/:id', urlController.delete);
router.get('/edit', urlController.view);
router.get('/addPrograms', urlController.form);
router.post('/addPrograms', urlController.create);
router.get('/editPrograms/:id', urlController.edit);
router.post('/editPrograms/:id', urlController.update);

module.exports = router;