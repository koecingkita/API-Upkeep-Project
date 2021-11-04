const express = require("express");
const router = express.Router();

const adminProductController = require('../controller/adminProduct')
const authenticate = require("../middleware/authenticate.js");

router.post('/add-product', authenticate,adminProductController.addProduct)
router.get('/info-product/:productId', authenticate,adminProductController.infoProduct)
router.get('/all-info-product/:userId', authenticate,adminProductController.allInfoProduct)
router.put('/update-product/:productId', authenticate,adminProductController.updateProduct)
router.delete('/delete-product/:productId', authenticate,adminProductController.deleteProduct)

module.exports = router;