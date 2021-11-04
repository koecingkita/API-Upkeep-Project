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

// kurir
exports.addDriver = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}
exports.infoDriver = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.allInfoDriver = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.updateDriver = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.deleteDriver = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}