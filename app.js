const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const app = express()
const db = require("./config/dbConfig").mongoURL;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/user');
const userAddressRoutes = require('./routes/userAddress');
const userCartRoutes = require('./routes/userCart');
const userOrderRoutes = require('./routes/userOrder');
const userShipmentRoutes = require('./routes/userShipment');
const userPaymentRoutes = require('./routes/userPayment');
const uservoucherRoutes = require('./routes/userVoucher');
const userInfoOrderRoutes = require('./routes/userInfoOrder');

const adminProduct = require('./routes/adminProduct');
const adminInfoUser = require('./routes/adminInfoUser');
const adminShipment = require('./routes/adminShipment');
const adminPayment = require('./routes/adminPayment');
const adminVoucher = require('./routes/adminVoucher');
const adminProcessOrder = require('./routes/adminProcessOrder');

const courierConfirm = require('./routes/courierConfirm');
const courierPickup = require('./routes/courierPickup');
const courierReturn = require('./routes/courierReturn');

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//Testing API
app.get('/', (req, res) => res.send('Apps is working'))

//routes
app.use(express.static('public'))

const port = process.env.DB_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

//user
app.use('/user', userRoutes)
app.use('/address',userAddressRoutes)
app.use('/cart',userCartRoutes)
app.use('/process',userOrderRoutes)
app.use('/shipment',userShipmentRoutes)
app.use('/payment',userPaymentRoutes)
app.use('/voucher',uservoucherRoutes)
app.use('/info-order',userInfoOrderRoutes)


//admin
app.use('/admin', adminProduct, adminInfoUser, adminShipment, adminPayment, adminVoucher)
app.use('/admin/process-order', adminProcessOrder)

//kurir
app.use('/courier', courierConfirm, courierPickup, courierReturn)
