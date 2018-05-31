const mongoose = require('mongoose');
// connect local database 
// mongoose.connect('mongodb://localhost:27017/MyDb');
//mongodb://<dbuser>:<dbpassword>@ds153732.mlab.com:53732/pm25
//mongodb://pm25:ducdn@ds153732.mlab.com:53732/pm25

// connect remote database
mongoose.connect('mongodb://pm25:ducdn@ds153732.mlab.com:53732/pm25');
// mongoose.connect('mongodb://pm25:ducdnds153732.mlab.com:53732/pm25');
const db = mongoose.connection;

const mapSchema = mongoose.Schema({ 
    location:{
        lat :{
            type: Number,
            required: true
        },
        lng :{
            type: Number,
            required: true
        },
    },
    data:[{
        pm_2_5:{
            type: Number,
            required: true
        },
        temperature:{
            type :Number,
            required: true
        },
        humidity:{
            type :Number,
            required: true
        },
        create_date:{
            type: Date,
            default: Date.now
        }
    }],
}, { collection : 'data_pm25' });
const map = mongoose.model('Data_pm25', mapSchema);

module.exports = map;
