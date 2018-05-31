const filToday = require('./convertToday')
module.exports = function convertData(dataReq, today) {
    let data = dataReq;
    if(today){
        data = filToday(dataReq);
    }
    const rer = [];
    data.forEach(dataI => {
        let dndDates = [
            [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
        ];
        const { data: arr, location } = dataI;
        let lastPm = arr[arr.length - 1].pm_2_5;
        // data => data flow hours
        arr.forEach(e => {
            let { pm_2_5, temperature, humidity, create_date } = e;
            let daa = new Date(create_date.toISOString())

            // console.log(create_date, 'daa'+daa.getHours(), 'data'+create_date.getUTCHours());

            let house = daa.getHours();
            dndData = dndDates[house].push({ pm_2_5, temperature, humidity })
        })
        // gia tri chung binh
        dndDates.forEach((e, index, array) => {
            let count = 0;
            let pm = 0, tem = 0, hu = 0;
            e.forEach(i => {
                let { pm_2_5 = 0, temperature = 0, humidity = 0 } = i;
                count++;
                pm += pm_2_5;
                tem += temperature;
                hu += humidity;
            })
            array[index] = {
                pm_2_5: parseInt(pm / count),
                temperature: parseInt(tem / count),
                humidity: parseInt(hu / count)
            }
        })
        // 
        let result = {
            "location": location,
            "data": dndDates,
            "lastPm": lastPm
        }
        rer.push(result)
    })
    return rer
}