const mongoose = require('mongoose');
try {
    // connect  local database
    // mongoose.connect('mongodb://localhost:27017/MyDb');
    // connect remote data
    mongoose.connect('mongodb://pm25:ducdn@ds153732.mlab.com:53732/pm25');
    // mongoose.connect('mongodb://pm25:ducdnds153732.mlab.com:53732/pm25');

}
catch (err) {
    console.log("<<<<<local database >>>>>.>>", err);
    mongoose.connect('mongodb://localhost:27017/MyDb');
    // mongoose.connect('mongodb://pm25:ducdn@ds153732.mlab.com:53732/pm25');
}
const db = mongoose.connection;

const mapSchema = mongoose.Schema({
    user: {
        name: String,
        api_key: Number,
    },
    data: [{
        pm_2_5: Number,
        latitude: Number,
        longitude: Number,
        create_date: {
            type: Date,
            default: Date.now
        }
    }],

}, { collection: 'users' });
const user = mongoose.model('users', mapSchema);

module.exports = user;
