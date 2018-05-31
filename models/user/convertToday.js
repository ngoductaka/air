module.exports = function filToday(data) {
    let date = new Date()

    const dateQuery = new Date(date.setHours(-1));
    
    let toDayResult = []
    let { data: obj, user } = data
    obj.forEach(e => {
        if (e.create_date >= dateQuery) {
            toDayResult.push(e)
        }
    })
    return { user, data: toDayResult };
}
