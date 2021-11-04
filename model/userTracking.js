const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userTrackingSchema = new Schema({
    TrackId:{
        type: String
    },
    statusTrack: {
        type: String
    },
    createAt: {
        type: Date
    },
});

const userTracking = mongoose.model('userTracking',userTrackingSchema);
module.exports = userTracking