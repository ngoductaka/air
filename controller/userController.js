const distan = require('../distan');
// const saveData = require('../models/v2/savedata');
// getdata pm in mogo
// const getData = require('../models/v2/getData');
// oke
const getUserToday = require('../models/v2/getToday');
// convert data
// const convertData = require('../models/v2/convertData')
// const convertToday = require('../models/v2/convertToday')

//get data user in mongo
// const getDataUser = require('../models/user/getData');
//oke
const saveDataUser = require('../models/user/saveData');
// get data today user
const userToday = require('../models/user/getToday');
// oke
const convertuserToday = require('../models/user/convertToday');
/**
 * 
 * @returns data user today 
 * @param {any} { latitude: reqLat, longitude: reqLng, userName = "ducdn", apiKey = "qwertyuiop153453563453" } 
 */
async function dataUser({ latitude: reqLat, longitude: reqLng, userName = "ducdn" }) {
  try {

    // get data today in collection data_pm25  
    const dataSensor = await getUserToday();
    // dataSensor is arr, all data of sensor 
    let lastPM = [];
    dataSensor.forEach(element => {
      let { location: { lat: latitude, lng: longitude }, data: [...dataPM] } = element;
      let location = { latitude, longitude };
      let pm = (dataPM[dataPM.length - 1]);
      lastPM.push({ location, pm });
    })
    // lastPM is arr, last data 
    let listPromise = [];
    lastPM.forEach(e => {
      let promise = distan({
        origin: { lat: e.location.latitude, lng: e.location.longitude },
        destination: { lat: reqLat, lng: reqLng },
        pm25: e.pm.pm_2_5
      })
      listPromise.push(promise)
    })
    // danh sách khoảng cách
    let listDistance = await Promise.all(listPromise)

    // console.log('listDistance', listDistance); return 1;
    let pmUser = null;
    let minDistance = listDistance[0].dis;
    listDistance.forEach(e => {
      // console.log(minDistance, minDistance <= 500, minDistance >= e.dis)
      if (e.dis <= 500 && minDistance >= e.dis) {
        pmUser = e.pm25
        minDistance = e.dis;
      }
    })
    // pmUser is null or pm25
    // save =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const dataResult = await saveDataUser(
      { "user.name": userName },
      {
        "pm_2_5": pmUser,// pm in location has min distance 
        "latitude": reqLat,
        "longitude": reqLng,
        "create_date": new Date()
      }
    )
    // console.log('dataResult',dataResult)
    // nếu không thì trã về giá trị cũ
    // const result = await userToday()
    const dataSend = convertuserToday(dataResult)
    return dataSend;
  }
  catch (err) {// if err
    console.log('err in datauser usercomtroller')
    const dataOld = await userToday()
    // console.log(dataOld); return 1;
    const dataSend = convertuserToday(dataOld)
    return dataSend
  }
}

module.exports = { dataUser }