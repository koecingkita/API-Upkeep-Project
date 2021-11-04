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

exports.infoUser = (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == 1){
        userModel.find({userId : userId}, {userRole:0, _id:0, __v:0, password:0,})
        .then(result => {
            res.json({
                user :result,
            })
        })
        .catch(err => {
            res.json({
                message: 'Error!',
            })
        })  
    }
    else{
        res.json({
            message: 'Tidak dapat ditemukan',
        })
    }
}

exports.updateInfoUser = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
    
        userModel.updateOne({$set:{gender:req.body.gender, dateOfBirth: req.body.dateOfBirth}})
        .then(result => {
            res.json({
                message: 'Berhasil ditambahkan'
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

