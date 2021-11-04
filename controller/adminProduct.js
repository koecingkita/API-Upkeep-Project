const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const productModel = require("../model/adminProduct.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addProduct = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole) {
        const product = new productModel ({   
            userId: req.user.userId,
            productId: uuid.v4(),
            nameProduct: req.body.nameProduct,
            description: req.body.description,
            duration: req.body.duration,
            normalPrice: req.body.normalPrice,
            discount: req.body.discount,
            price: req.body.normalPrice - (req.body.normalPrice * req.body.discount/100)
        })
        product.save()
        .then(result => {
            res.status(200).json({
                status: true,
                data: product,
            })
        })
        .catch(error => {
            res.json({
                message: 'Terjadi kesalahan, Lengkapi data!'
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}
exports.infoProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        productModel.find({productId : req.params.productId})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result,
            })
        })
        .catch(err => {
            res.json({
                message: 'Erorr!',
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}
//by userId
exports.allInfoProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        productModel.find({userId : req.params.userId})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result,
            })
        })
        .catch(err => {
            res.json({
                message: 'Erorr!',
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.updateProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updateProduct = {
            nameProduct: req.body.nameProduct,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            status: req.body.status,
        }
        productModel.updateOne({productId:req.params.productId}, {$set:updateProduct})
        .then(result => {
            res.status(200).json({
                status: true,
                message: 'Berhasil mengubah data',
            })
        })
        .catch(err => {
            res.json({
                message: 'Terjadi kesalahan',
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.deleteProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        productModel.deleteOne({productId:req.params.productId})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result,
                message: 'Berhasil menghapus data',
            })
        })
        .catch(err => {
            res.json({
                message: 'Id not found!',
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

