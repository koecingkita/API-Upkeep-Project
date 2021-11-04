const express = require("express");
const router = express.Router();

const cartController = require('../controller/userCart.js')
const authenticate = require("../middleware/authenticate.js");

router.post('/to-cart/:productId', authenticate,cartController.addItemToCart)// Done
router.get('/info-cart', authenticate,cartController.getCart)
router.put('/update-quantity/:productId', authenticate,cartController.updateQuantity)
router.delete('/delete-product/:_id', authenticate,cartController.deleteProductid)// delete sebagian
router.delete('/empty-cart', authenticate,cartController.emptyCart)// full delete

module.exports = router;