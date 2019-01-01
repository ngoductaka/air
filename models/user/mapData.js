const { isEqual, find } = require('lodash');

module.exports = function convertData(input) {
  const output = [];
  input.map(item => {
    const mapData = {
      location: {},
      data: []
    };
    const dataItem = {
      create_date: item.create_date,
      pm_2_5: item.pm_2_5,
    }
    const location = {
      lat: item.latitude,
      lng: item.longitude
    }
    const dnd = find(output, e => isEqual(e.location, location));
    if (dnd){
      dnd.data.push(dataItem)
    } else {
      mapData.data.push(dataItem)
      mapData.location = location
      output.push(mapData);
    }
  })
  return output
}




// [
//   {
//       "create_date": "2018-06-02T01:38:49.748Z",
//       "_id": "5b11f529178ff21a4cc91b26",
//       "pm_2_5": null,
//       "latitude": 21.00441,
//       "longitude": 105.846596
//   },
// ========================
// "location": {
//   "lat": 21.004473,
//   "lng": 105.846609
// },
// "_id": "5af28125edaac8b60f8e55f5",
// "id": "2",
// "data": [
//   {
//       "create_date": "2017-12-07T04:46:39.874Z",
//       "pm_2_5": 35,
//       "temperature": 24,
//       "humidity": 64
//   },
// ========================
    // [
    //   {
    //     "location": {
    //       "lat": 21.004473,
    //       "lng": 105.846609
    //     },
    //     "data": [
    //       {
    //         "pm_2_5": 80
    //       },
    //     ],
    //     "lastPm": 32
    //   }
    // ];