const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const Voucher = require("../model/adminVoucher.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

//voucher
exports.addVoucher = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addVoucher = await Voucher.create({
                voucherId : uuid.v4(),
                nameVoucher: req.body.nameVoucher,
                description: req.body.description,
                code: req.body.code,
            });
            return res.status(201).send(addVoucher);
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

exports.infoVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.find({voucherId: req.params.voucherId})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result
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
exports.allInfoVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.find({})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result
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
exports.deleteVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.deleteOne({voucherId:req.params.voucherId})
        .then(result => {
            res.json({
                message: 'Deleted successfully!',
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