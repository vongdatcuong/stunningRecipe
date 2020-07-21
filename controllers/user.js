const home = async(req, res) => {
    //const dish = await Dish.getDish(1);
    res.render('index', {
        title: 'Stunning Recipe',
        user: {}
    });
};

const login = async(req, res) => {
    res.render('login', {
        title: 'Stunning Recipe',
        layout: false
    });
}

const signup = async(req, res) => {
    res.render('signup', {
        title: 'Stunning Recipe',
        layout: false
    });
}

const profile = async(req, res) => {
    res.render('profile', {
        title: 'Stunning Recipe',
        user: {}
    });
}

const yourInfo = async(req, res) => {
    res.render('yourInfo', {
        title: 'Stunning Recipe',
        user: {}
    });
}

const editInfo = async(req, res) => {
    res.render('editInfo', {
        title: 'Stunning Recipe',
        user: {}
    });
}

const changePwd = async(req, res) => {
    res.render('changePwd', {
        title: 'Stunning Recipe',
        layout: false,
        user: {}
    });
}

module.exports = {
    login,
    signup,
    profile,
    yourInfo,
    editInfo,
    changePwd
};