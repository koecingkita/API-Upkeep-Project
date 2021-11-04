const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const userModel = require("../model/user.js");
const userAddressModel = require("../model/userAddress.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")


// by admin
// user info
/// Role nanti diganti
exports.infoUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        userModel.find({}, {__v:0, password:0,})
        .then(result => {
            res.json({
                data:result,
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
exports.allInfoUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariUserId = req.params.userId;
    if (userRole == userRole){
        userModel.find({userId : cariUserId}, {__v:0, password:0,})
        .then(result => {
            res.json({
                data:result,
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
exports.infoAddressUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariAddressId = req.params.addressId;
    if (userRole == userRole){
        userAddressModel.find({addressId : cariAddressId}, {})
        .then(result => {
            res.json({
                data:result,
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
exports.allInfoAddressUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariUserId = req.params.userId;
    if (userRole == userRole){
        userAddressModel.find({userId : cariUserId}, {})
        .then(result => {
            res.json({
                data:result,
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