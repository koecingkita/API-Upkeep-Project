const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminVoucherModel = require("../model/adminVoucher.js");
const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.setUserVoucher = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariVoucherId= req.params.voucherId;
    if (userRole == userRole){
        let order = await Order.findOne({ userId, statusdb:true });
        let voucher = await adminVoucherModel.findOne({ voucherId:cariVoucherId });
 
        //count couantity
        let countItem = order.products.length;
        let arrTotal = []
        let priceTotal = []
        for(var i=0; i<=countItem-1; i++){
            arrTotal.push(order.products[i].quantity)
            priceTotal.push(order.products[i].price *order.products[i].quantity)
        }
        hslQuantity = arrTotal.reduce((a, b) => a + b, 0);
        hslPrice = priceTotal.reduce((a, b) => a + b, 0);

        try {
            if(voucher){
                if(hslQuantity >= 5){
                    order.voucher = voucher
                    order.discount = hslPrice - (hslQuantity * 10000)
                    order.subTotal = hslPrice
                    order.total = (hslQuantity * 10000) + order.shipment[0].price
                    order = await order.save();
                    res.status(200).json({
                        status: true,
                        type: "Success",
                        msg: "Berhasil digunakan",
                    })  
                } else{
                    res.status(200).json({
                        type: "Invalid",
                        msg: "Syarat tidak terpenuhi",
                    })  
                }
            }
            else{
                res.json({
                    message: 'Voucher tidak ditemukan'
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
