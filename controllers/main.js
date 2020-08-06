const Dish = require("../models/dish");
const User = require('../models/user');
const constant = require("../Utils/constant");

/* Home */
const home = async (req, res) => {
    const customDishTypes = constant.dishTypes.map((item, idx) =>  {
        return {name: item, index: (idx)};
    });
    const customCuisines = constant.cuisines.map((item, idx) =>  {
        return {name: item, index: idx};
    });
    const customDiets = constant.diets.map((item, idx) =>  {
        return {name: item, index: idx};
    });

    // Popular dishes
    const popularDishes = await Dish.getDishes({}, {
        sort: {createdDate: -1},
        perPage: constant.homePerPage,
        page: 1
    });

    // New Dishes
    const newDishes = await Dish.getDishes({}, {
        sort: {createdDate: -1},
        perPage: constant.homePerPage,
        page: 1
    });

    // User favorite Dishes
    const favoriteHashMap = {};
    const allDishIDs = [
        ...popularDishes.map((dish, index) => dish.dishID),
        ...newDishes.map((dish, index) => dish.dishID),
    ];
    if (req.user){
        const userFavoriteDishes = await User.getUserFavoriteDishes(req.user.userID, allDishIDs);
        userFavoriteDishes.forEach((favDish, index) => {
            favoriteHashMap[favDish.dishID] = 1
        });
    }

    popularDishes.forEach((dish) => {
        dish.imageUrl = () => constant.imageStorageLink + constant.dishPath + dish.image;
        dish.isUserFavorite = favoriteHashMap[dish.dishID] != undefined;
        dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
        dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
        dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    });

    newDishes.forEach((dish) => {
        dish.imageUrl = () => constant.imageStorageLink + constant.dishPath + dish.image;
        dish.isUserFavorite = favoriteHashMap[dish.dishID] != undefined;
        dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
        dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
        dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    });
    res.render('index', {
        title: constant.appName,
        user: req.user,
        popularDishes: popularDishes,
        newDishes: newDishes,
        userType: constant.userType,
        dishTypes: constant.splitToChunk(customDishTypes, 6),
        cuisines: customCuisines,
        diets: customDiets,
    });
};

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
    history,
    contact,
    about,
    privacy,
    terms,
    help,
    faqs,
};