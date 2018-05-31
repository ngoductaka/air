var map = require('./connect.js');

module.exports = function getData() {
    var query = {
    };
    var getData = new Promise(
        function (resolve, reject) {
            map.find(query, function(err, ress) { // map is 
                if(err) console.log(err);
                resolve(ress);
            })
        }
    );
    return getData
}