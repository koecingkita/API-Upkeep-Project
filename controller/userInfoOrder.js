const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoOrder = (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        Order.findOne({orderId:cariOrderId, userId: req.user.userId})
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

exports.allInfoOrder = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Order.find({userId: req.user.userId})
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