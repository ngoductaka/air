const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  upload = multer();
//
//save data pm in mongo
const saveData = require('./models/v2/savedata');
// getdata pm in mogo
const getData = require('./models/v2/getData');
// 
const getToday = require('./models/v2/getToday');
// convert data
const convertData = require('./models/v2/convertData')
const convertToday = require('./models/v2/convertToday')

//get data user in mongo
const getDataUser = require('./models/user/getData');
//save data user in mongo
const saveDataUser = require('./models/user/saveData');
// get data today user
const userToday = require('./models/user/getToday');
const convertuserToday = require('./models/user/convertToday');
const userController = require('./controller/userController');

// const liv = require('./models/v2/liv')
const moment = require('moment');
moment().format();
// authen request 
const authenSensor = require('./auth/sensor')
// set view
app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
// set public path
// app.use('/data',liv);

app.use(express.static(__dirname + '/public'));
//   http://localhost:5000/map  +++++++++++++++++++++++++++++++++++++++++++++
app.get('/map', async (req, res) => {
  getData()
    .then((data) => { // all data in collection
      let dataConvert = convertData(data);
      res.render('map/map_v2', {
        obj: dataConvert
      });
    }).catch((err) => console.log(err))
});
// end 

// to day http://localhost:5000/map/today
app.get('/map/today', async (req, res) => {
  getToday()
    .then((data) => { // all data in collection
      let dataConvert = convertData(data, 1);
      console.log(dataConvert[0].data)
      res.render('map/map_today', {
        obj: dataConvert
      });
    }).catch((err) => console.log(err))
});
// http://localhost:5000/data?pm_2_5=12&temperature=19&humidity=19&lat=21.03905&lng=105.847527------------------------------------------------handle  data with method get -----
app.get('/data', function (req, res) {
  let { pm_2_5, temperature, humidity, lat, lng } = req.query;
  const points = { pm_2_5, temperature, humidity, lat, lng }
  console.log(req.query);
  saveData(points);
  // res.redirect('/map');
  res.send(points);
});
// hand request from sensor client ( sensor system )
app.post('/data', authenSensor, async (req, res) => {
  let { pm_2_5, temperature, humidity, lat, lng } = req.body;
  const points = { pm_2_5, temperature, humidity, lat, lng }
  saveData(points);
  console.log(points);
  res.json(points);
});
// for game------------------------------
app.get('/2048', function (req, res) {
  res.render('game/2048');
});
// ===========================================================api data pm25
app.get('/pm25', function (req, res) {
  // getData()
  getToday()
    .then((data) => {
      let lastPM = [], location = {}, pm = {}
      data.forEach(element => {
        let {
          location: { lat: latitude, lng: longitude },
          data: [...x]
        } = element;
        location = { latitude, longitude };
        pm = (x[x.length - 1])._doc;
        var now = "04/09/2013 15:00:00";
        var then = "04/09/2013 14:20:30";
        pm.create_date=moment.utc(moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(moment( pm.create_date, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        // let pmConvert = pm._doc;
        // let pm25_ = {...pm}

        console.log(pm.create_date)

        lastPM.push({ location, pm });
      });
      res.json(lastPM);
    }).catch((err) => console.log(err))
});
// ==============================================================api history 
app.post('/pm25', async (req, res) => {
  try {
    userData = await userController.dataUser(req.body);
    return res.json(userData)
  }
  catch (err) {
    console.log("err in POST /pm25", err);
  }
});
// ================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listen on post " + PORT));
// app.listen(80,()=>console.log("listen on post 5000"));
