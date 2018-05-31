var map = require('./connect.js');
var moment = require('moment-timezone');
module.exports = function getToday() {
    let date = new Date();
    date = date.setHours(-1)
    dateQuery = new Date(date)
    // console.log('date',date+'\n'+'dateQuery'+dateQuery)
    var query = {
        "data.create_date": { "$gte": dateQuery }
    };
    var getData = new Promise(
        function (resolve, reject) {
            map.find(query, function (err, ress) { // map is 
                if (err) console.log(err);
                resolve(ress);
            })
        }
    );
    return getData


}