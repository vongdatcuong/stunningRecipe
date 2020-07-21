const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const constant = require('../Utils/constant');


module.exports = {
  getDish(dishID) {
    return Dish.find({dishID: dishID})
      .exec();
  }
};
