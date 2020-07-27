const Dish = require("../models/dish");
const AzureBlob = require("../models/azure_blob");
const constant = require("../Utils/constant");

/* Dish Detail */
const dishDetail = async (req, res) => {
    const dish = await Dish.getDishAndUpdateView(req.params.dishID);
    dish.imageUrl = constant.imageStorageLink + constant.dishPath + dish.image;
    if (req.user){
        dish.isUserFavorite = await Dish.isDishUserFavorite(req.params.dishID, req.user.userID);
    } else {
        dish.isUserFavorite = false;
    }
    dish.nutritionsStr = dish.nutritions.map((item, idx) => item.nutrition.name).join(constant.commaSpace);
    dish.ingredients = constant.splitToChunk(dish.ingredients, 2);
    dish.steps.forEach((step, idx) => {
        step.equipment = step.equipment || constant.emptyStr;
        step.image = (step.image)? constant.imageStorageLink + constant.dishStepPath + step.image : constant.emptyStr;
    })
    dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
    dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
    dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    // Related dishes
    let relatedDishes = [dish, dish, dish, dish];
    relatedDishes = constant.splitToChunk(relatedDishes, 2);
    res.render('dish_detail', {
        title: constant.appName,
        user: req.user,
        dish: dish,
        relatedDishes,
        userType: constant.userType
    });
}
/* Dishes */
const dishes = async (req, res) => {
    //const dish = await Dish.getDishAndUpdateView(req.params.dishID);
    res.render('dishes', {
        title: constant.appName,
        user: req.user,
        userType: constant.userType
    });
}
module.exports = {
    dishDetail,
    dishes
};