const getData = require('../models/user/getData'); 

async function getDataController() {
  const data = await getData();
  console.log(data);
}

module.exports = {getDataController};