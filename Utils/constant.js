// Messages

// Constant variables
const dishTypes = ["Món chính", "Món phụ", "Tráng miệng", "Món khai vị", "Sald", "Bánh", "Ăn sáng", "Soup", "Thức uống", "Nước sốt", "Snack", "Ăn trưa"];
const cuisines = ["Món Mỹ", "Món Trung", "Món Pháp", "Món Ý", "Món Nhật", "Món Mexico", "Món Thái", "Món Việt", "Món Âu", "Món Tây", "Món Đông"];
const diets = ["Không Gluent", "Không chứa sữa", "Ketogenic", "Vegetarian", "Lacto Vegetarian", "Ovo Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];
const imageStorageLink = "https://stunningrecipe.blob.core.windows.net/";
const dishPath = "dish/";
const ingredientPath = "dish/";
const nutritionPath = "dish/";
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
const homePerPage = 4;
const dishesPerPage = 8;
const paginationMax = 5;
const currency = "VND";
const millisecondOfDay = 24 * 60 * 60 * 1000;
const millisecondOfWeek = millisecondOfDay * 7;

// Str
const emptyStr = "";
const commaSpace = ", ";

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
function createDishImageName(productId, num, extension) {
    return `dish_${productId}_image_${num}${extension}`;
}
module.exports = {
    dishTypes,
    cuisines,
    diets,
    imageStorageLink,
    dishPath,
    ingredientPath,
    nutritionPath,
    SALT_ROUNDS,
    type,
    userType,
    dishRecipeStatus,
    homePerPage,
    dishesPerPage,
    paginationMax,
    currency,
    millisecondOfDay,
    millisecondOfWeek,
    emptyStr,
    commaSpace,
    getUserType,
    splitToChunk,
    createDishImageName
};