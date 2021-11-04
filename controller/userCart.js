const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const userModel = require("../model/user.js");
const userAddressModel = require("../model/userAddress.js");
const userVerification = require('../model/userVerification.js');

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

const Cart = require("../model/userCart.js");
const productModel = require("../model/adminProduct.js");

//success
exports.addItemToCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.userId;
    const { userRole } = req.user;
    const { quantity } = req.body;

    if (userRole == userRole){
        try {
            let cart = await Cart.findOne({ userId });
            let product = await productModel.findOne({productId:productId})
            
            if(product) {
                if (cart) {
                //cart exists for user
                let itemIndex = cart.products.findIndex(p => p.productId == productId);

                    if (itemIndex > -1) {
                        //product exists in the cart
                        //update the quantity
                        let productItem = cart.products[itemIndex];
                        productItem.quantity = quantity;
                        productItem.total= productItem.price * quantity;
                        cart.products[itemIndex] = productItem;
                        //update total price
                        let arrTotal = []
                        for(var i=0; i<=itemIndex; i++){
                            arrTotal.push(cart.products[i].total)
                        }
                        cart.subTotal= arrTotal.reduce((a, b) => a + b, 0);
                        
                    } else {
                        //productid does not exists in cart
                        //add new item
                        cart.products.push({ productId,
                                            nameProduct : product.nameProduct, 
                                            duration : product.duration, 
                                            quantity, 
                                            price : product.price,
                                            total: parseInt(product.price * quantity) });

                        cart.subTotal= cart.subTotal + product.price * quantity
                    }
                    cart = await cart.save();
                    return res.status(201).send(cart);
                } else {
                //no cart for user, create new cart
                const newCart = await Cart.create({
                    userId,
                    cartId : uuid.v4(),
                    products: [{ productId,
                                nameProduct : product.nameProduct,
                                duration : product.duration, 
                                quantity, 
                                price : product.price,
                                total: parseInt(product.price * quantity)
                                }],
                    subTotal : (product.price * quantity)
                });
                
                return res.status(201).send(newCart);
                }
            }
            else{
                res.json({
                    message: 'Product tidak ditemukan'
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.getCart = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}
// delete all
exports.emptyCart = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let cart = await Cart.findOne({ userId });
            cart.products = [];
            cart.subTotal = 0
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart has been emptied",
                data: data
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.deleteProductid = async (req, res) => {
    const productId = req.params.productId;
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let cart = await Cart.findOne({ userId });
            console.log("AAA",cart)
            let removeProduct = cart.products.filter((item) => item.productId !== productId);
            console.log("OOO", removeProduct)
            delete removeProduct
            console.log("OOO", cart.removeProduct)
            console.log("III",cart)
            

            //cart.subTotal = 0
            //let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart has been emptied",
                data: data
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.updateQuantity = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let cart = await Cart.findOne({ userId });
            let product = await productModel.findOne({productId:productId})
            let itemIndex = cart.products.findIndex(p => p.productId == productId);
            //update the quantity
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            productItem.total= product.price * quantity;
            cart.products[itemIndex] = productItem;
            //update total price
            let arrTotal = []
            for(var i=0; i<=cart.products.length-1; i++){
                arrTotal.push(cart.products[i].total)
            }
            cart.subTotal= arrTotal.reduce((a, b) => a + b, 0);
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart has been update quantity",
                data: data
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}