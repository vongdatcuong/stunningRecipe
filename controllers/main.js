const Dish = require("../models/dish");
const User = require('../models/user');
const constant = require("../Utils/constant");

const home = async (req, res) => {
    // Popular dishes
    const popularDishes = await Dish.getDishes({}, {createdDate: -1}, constant.homePerPage, 1);

    const popularFavorites = {
        "1": 1
    }

    popularDishes.forEach((dish) => {
        dish.imageUrl = () => constant.imageStorageLink + constant.dishPath + dish.image;
        dish.isUserFavorite = popularFavorites[dish.dishID] != undefined;
        dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
        dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
        dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    });

    // New Dishes
    const newDishes = await Dish.getDishes({}, {createdDate: -1}, constant.homePerPage, 1);
    
    const newFavorites = {
        "2": 1
    }

    newDishes.forEach((dish) => {
        dish.imageUrl = () => constant.imageStorageLink + constant.dishPath + dish.image;
        dish.isUserFavorite = newFavorites[dish.dishID] != undefined;
        dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
        dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
        dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    });
    res.render('index', {
        title: constant.appName,
        user: req.user,
        popularDishes: popularDishes,
        newDishes: newDishes,
        userType: constant.userType
    });
};

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
const history = (req, res) => {
    res.render('history', {
        title: 'Lịch sử',
        user: req.user
    });
};

const search = (req, res) => {
    res.render('search', {
        title: 'Tìm kiếm',
    });
};


const contact = (req, res) => {
    res.render('contact', {
        title: 'Liên hệ',
        user: req.user
    });
};

const about = (req, res) => {
    res.render('about', {
        title: 'About Us',
        user: req.user
    });
};

const privacy = (req, res) => {
    res.render('privacy', {
        title: 'Riêng tư',
        user: req.user
    });
};

const terms = (req, res) => {
    res.render('terms', {
        title: 'Chính sách',
        user: req.user
    });
};

const help = (req, res) => {
    res.render('help', {
        title: 'Hỗ trợ',
        user: req.user
    });
};

const faqs = (req, res) => {
    res.render('faqs', {
        title: 'FAQS',
        user: req.user
    });
};

module.exports = {
    home,
    dishDetail,
    history,
    contact,
    about,
    privacy,
    terms,
    help,
    faqs,
};