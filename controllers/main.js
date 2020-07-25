const Dish = require("../models/dish");
const constant = require("../Utils/constant");

const home = async (req, res) => {
    // Popular dishes
    const popularDishes = await Dish.getDishes({
        status: constant.dishRecipeStatus.accepted
    }, {createdDate: -1}, constant.homePerPage, 1);

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
    const newDishes = await Dish.getDishes({
        status: constant.dishRecipeStatus.accepted
    }, {createdDate: -1}, constant.homePerPage, 1);
    
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
        title: 'Stunning Recipe',
        popularDishes: popularDishes,
        newDishes: newDishes,
        userType: constant.userType
    });
};

const history = (req, res) => {
    res.render('history', {
        title: 'Lịch sử',
    });
};

const search = (req, res) => {
    res.render('search', {
        title: 'Tìm kiếm',
    });
};

const changePwd = (req, res) => {
    res.render('changePwd', {
        title: 'Thay đổi mật khảu',
    });
};

const contact = (req, res) => {
    res.render('contact', {
        title: 'Liên hệ',
    });
};

const about = (req, res) => {
    res.render('about', {
        title: 'About Us',
    });
};

const privacy = (req, res) => {
    res.render('privacy', {
        title: 'Riêng tư',
    });
};

const terms = (req, res) => {
    res.render('terms', {
        title: 'Chính sách',
    });
};

const help = (req, res) => {
    res.render('help', {
        title: 'Hỗ trợ',
    });
};

const faqs = (req, res) => {
    res.render('faqs', {
        title: 'FAQS',
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