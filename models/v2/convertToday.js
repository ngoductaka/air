var moment = require('moment-timezone');

module.exports = function filToday(data) { 
    let now = new Date()
    let endOfLastDay = now.setHours(-1);
    let dateQuery  = new Date(endOfLastDay)

    let toDayResult = []
    // console.log('data in to day',data)
    data.forEach(datai => {
        let { data: obj, location } = datai
        // console.log(obj)
        let arr = []

        obj.forEach(e => {
            // console.log(e.create_date >= dateQuery)
            if (e.create_date >= dateQuery) {
                arr.push(e)
            }
        })
        let result = {
            location,
            data: arr
        }
        toDayResult.push(result)
        // console.log(arr)
    })
    // console.log(toDayResult)
    return toDayResult;

}
