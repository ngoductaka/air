var user = require('./connect');

module.exports = (query, data)=> { 
    return new Promise ((res, rej)=>{
        user.findOneAndUpdate(query, {$push:  { "data": data  } } , function(err, result) {
            if (err) rej(err)
            res(result)
            // console.log("1 document updated",result);
        })
    })
    
 }
