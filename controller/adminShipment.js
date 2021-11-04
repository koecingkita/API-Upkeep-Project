const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminShipmentModel = require("../model/adminShipment.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addShipment = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addShipment = await adminShipmentModel.create({
                shipmentId : uuid.v4(),
                nameShipment: req.body.nameShipment,
                description: req.body.description,
                location: req.body.location,
                price: req.body.price,
            });
            return res.status(201).send(addShipment);
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

exports.updateShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updateShipment = {
            nameShipment: req.body.nameShipment,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price,
        }
        adminShipmentModel.updateOne({shipmentId:req.params.shipmentId}, {$set:updateShipment})
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

exports.infoShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminShipmentModel.find({shipmentId : req.params.shipmentId})
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

exports.allInfoShipment = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
        adminShipmentModel.find({})
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

exports.deleteShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminShipmentModel.deleteOne({shipmentId:req.params.shipmentId})
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