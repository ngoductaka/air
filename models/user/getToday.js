var user = require('./connect');

var moment = require('moment-timezone');
module.exports = function getToday() {
    // ------------------------
    let date = new Date();
    let setHourTOZero = date.setHours(0);
    // console.log(setHourTOZero)
    let setHour = new Date(setHourTOZero)
    // console.log(setHour)
    var query = {
        "data.create_date": { "$gte": setHour }
    };
    // console.log(query)

    return new Promise(  (resolve, reject) => {
        user.findOne(query, function(err, ress) { // map is 
            if(err) rej(err);
            resolve(ress); 
        }) }
    );

}