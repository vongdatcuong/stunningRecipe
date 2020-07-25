function parseDateMonth(date, seperator = "-") {
    return [("0" + date.getDate()).slice(-2), ("0" + (date.getMonth() + 1)).slice(-2)].join(seperator);
}
module.exports = {
    parseDateMonth
}