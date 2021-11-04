const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addPayment = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addPayment = await adminPaymentModel.create({
                paymentId : uuid.v4(),
                namePayment: req.body.namePayment,
                description: req.body.description,
            });
            return res.status(201).send(addPayment);
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

exports.updatePayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updatePayment = {
            namePayment: req.body.namePayment,
            description: req.body.description,
        }
        adminPaymentModel.updateOne({paymentId:req.params.paymentId}, {$set:updatePayment})
        .then(result => {
            res.status(200).json({
                status: true,
                data: result
            })
        })
        .catch(err => {
            res.json({
                message: 'Error',
            })
        })
    }
    else{
        res.json({
            message: 'Role not appropriate!'
        })
    }
}

exports.infoPayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminPaymentModel.find({paymentId : req.params.paymentId})
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

exports.allInfoPayment = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
        adminPaymentModel.find({})
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

exports.deletePayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminPaymentModel.deleteOne({paymentId:req.params.paymentId})
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