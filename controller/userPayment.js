const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");
const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.setUserPayment = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariPaymentId= req.params.paymentId;
    if (userRole == userRole){
        let order = await Order.findOne({ userId, statusdb:true });
        let payment = await adminPaymentModel.findOne({ paymentId:cariPaymentId });
        try {
            if(payment){
                order.payment = payment
                order = await order.save();
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Berhasil digunakan",
                })  
            }
            else{
                res.json({
                    message: 'pengiriman tidak ditemukan'
                })
            }
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
