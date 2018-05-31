const distance = require('google-distance');
distance.apiKey = 'AIzaSyAsEatUiCch4EN6MX63OJlELqfwzdiwj90';

module.exports = function getDis({ origin, destination, pm25 }) {
    // 
    return new Promise((res, rej) => {
        distance.get({
            index: 1,
            origin: `${origin.lat},${origin.lng}`,
            destination: `${destination.lat},${destination.lng}`,
            units: 'distanceValue',
        }, function (err, data) {
            if (err) rej(err);
            else{
                res({ dis: data.distanceValue, pm25: pm25 })
            }
        });
    })
}

// const dnd = getDis(
//     {
//         origin: {
//             lat: '37.772886',
//             lng: '-122.423771'
//         },
//         destination: {
//             lat: '37.871601',
//             lng: '-122.269104'
//         }
//     }).then(data=> console.log(data))
// console.log(dnd)
