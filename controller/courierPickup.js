const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");
const Order = require("../model/userOrder.js");
const User = require("../model/user.js")
const emailStatusOrder = require("../view/email/statusConfirm.js")

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoPickup = (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        Order.findOne({orderId:cariOrderId, statusOrder: "Proses penjemputan"})
        .then(result => {
            res.status(200).json({
                type: "Success",
                msg: "Berhasil ditemukan",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.allInfoPickup = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Order.find({statusOrder: "Proses penjemputan"})
        .then(result => {
            res.status(200).json({
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.rejectOrder = async (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    const user = req.user;
    if (userRole == userRole){
        let order =  await Order.findOne({orderId:cariOrderId, statusOrder: "Proses penjemputan"})
        let user = await User.findOne({userId: order.userId})
        try {
            order.active = false
            order.confirm = false  
            order.statusOrder = "Dibatalkan oleh kurir"
            order = await order.save();
            emailStatusOrder(order, user, res);
            res.status(200).json({
                type: "Success",
                msg: "Orderan telah dibatalkan",
            })
        }
        catch(err) {
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

exports.processOrder = async (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        let order =  await Order.findOne({orderId:cariOrderId, statusOrder: "Proses penjemputan"})
        try {
            order.statusOrder = "Pesanan telah dioutlet"
            order = await order.save();
            res.status(200).json({
                type: "Success",
                msg: "Pesanan telah diselesaikan",
            })
        }
        catch(err) {
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