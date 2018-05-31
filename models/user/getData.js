var user = require('./connect');

function getData(query = {}) {
    return new Promise(  (resolve, reject) => {
        user.findOne(query, function(err, ress) { // map is 
            if(err) {console.log(err);reject(err)}
            resolve(ress); 
        }) }
    );
}

module.exports = getData;