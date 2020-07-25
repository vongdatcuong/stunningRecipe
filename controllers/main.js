const Dish = require("../models/dish");
const User = require('../models/user');

const home = async(req, res) => {
    console.log(req.user); /////////////////////////////////////////
    res.render('index', {
        title: 'Stunning Recipe',
        user: req.user
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