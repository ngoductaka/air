var map = require('./connect.js');
var moment = require('moment-timezone');

// var ma = require('./update.js');

function SaveData(data, res) {
    var { data: points } = { data };
    // console.log("data", res);
    // return 1;
    // points.lat=(points.lat==undefined||points.lat=='')? 21.03905  :points.lat;
    // points.lng=(points.lng==undefined||points.lng=='')? 105.847527:points.lng;

    var query_poition = {
        $and: [
            { "location.lat": { "$gt": +points.lat - 0.00005 } },
            { "location.lat": { "$lt": +points.lat + 0.00005 } },
            { "location.lng": { "$gt": +points.lng - 0.00005 } },
            { "location.lng": { "$lt": +points.lng + 0.00005 } },
        ]

    };//gt : <
    map.find(query_poition, function (err, ress) {
        if (err) {
            console.log(err);
        }
        else {
            if (ress.length != 0) {// -> exit----------------------------------------- update++++++++++
                // console.log(ress.length)
                // var MongoClient = require('mongodb').MongoClient;
                // var url = "mongodb://127.0.0.1:27017/MyDb";
                // MongoClient.connect(url, function(err, db) {
                // if (err) throw err;
                var myquery = {
                    "location.lat": ress[0].location.lat
                };
                var newvalues = {
                    $push:
                        {
                            "data": {
                                "pm_2_5": points.pm_2_5,
                                "temperature": points.temperature,
                                "humidity": points.humidity,
                                "create_date": dateLo()
                            }
                        }
                };
                map.update(myquery, newvalues, function (err, result) {
                    if (err) {throw err}
                    else { return result}
                });

                // });
                // res.redirect('/map');
            }
            else {// ----------------------------------------------------add new ------------------------------------
                var newpoint = new map({
                    "location": { "lat": points.lat, "lng": points.lng },
                    "data": {
                        "pm_2_5": points.pm_2_5,
                        "temperature": points.temperature,
                        "humidity": points.humidity,
                        "create_date": dateLo()
                    },
                });
                newpoint.save(function (err, newpoint) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // res.redirect('/map');
                    }
                });
            }
        }
    });
}
function dateLo() {
    let date = new Date()
    let dateStr = date.toISOString()
    let dateLo = moment.tz(dateStr, "Asia/Ho_Chi_Minh").format();
    // dateLo = dateLo.toISOString()
    let dnd = new Date(dateLo)
    return date
}
module.exports = SaveData;