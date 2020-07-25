// Messages

// Mongo connection string (connectionString)
//mongodb+srv://StunningRecipe:tkpm1731@academic.2tteq.mongodb.net/test?authSource=admin&replicaSet=atlas-zw0z0h-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

// Constant variables
const SALT_ROUNDS = 15;
const type = {
    admin: 0,
    customer: 1
}
const userType = {
    admin: 0,
    user: 1
}
const dishRecipeStatus = {
    waiting: 0,
    accepted: 1,
    rejected: 2
}
const perPage = 5;
const paginationMax = 5;
const currency = "VND";
const dishPerPage = 8;
const urlImageSeperator = ", ";
const topLimit = 10;
const millisecondOfDay = 24 * 60 * 60 * 1000;
const millisecondOfWeek = millisecondOfDay * 7;
const chartDay = 10;
const chartWeekRange = 15;
const numOfWeekPerYear = 54;
const numOfMonth = 12;
const numOfQuarter = 4;
const monthOfQuarter = 3;
const chartYearRange = 5;

// Str
const emptyStr = "";

function getUserType(typeStr) {
    return Object.keys(type).find(key => type[key] === typeStr);
}

function splitToChunk(arr, size) {
    let temp = [];
    for (let i = 0; i < arr.length; i += size) {
        temp.push(arr.slice(i, i + size));
    }
    return temp;
}

function parseDateMonth(date, seperator = "-") {
    return [("0" + date.getDate()).slice(-2), ("0" + (date.getMonth() + 1)).slice(-2)].join(seperator);
}

function createDishImageName(productId, num, extension) {
    return `dish_${productId}_image_${num}${extension}`;
}
module.exports = {
    SALT_ROUNDS,
    type,
    getUserType,
    perPage,
    paginationMax,
    currency,
    splitToChunk,
    dishPerPage,
    urlImageSeperator,
    topLimit,
    millisecondOfDay,
    millisecondOfWeek,
    chartDay,
    chartWeekRange,
    numOfWeekPerYear,
    numOfMonth,
    numOfQuarter,
    monthOfQuarter,
    chartYearRange,
    parseDateMonth,
    createDishImageName
};