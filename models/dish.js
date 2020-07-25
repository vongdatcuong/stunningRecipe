const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const constant = require('../Utils/constant');


module.exports = {
  getDish(dishID) {
    return Dish.find({dishID: dishID})
      .exec();
  },
  addDish(props){
    const dish = new Dish({
      name: props.name || constant.emptyStr,
      image: props.image || constant.emptyStr,
      servings: props.servings || 0,
      readyTime: props.readyTime || 0,
      healthScore: props.healthScore || 0,
      price: props.price || 0,
      difficulty: props.difficulty || 0,
      description: props.description || constant.emptyStr,
      video: props.video || null,
      status: props.status || 0,
      totalView: 0,
      totalReview: 0,
      createdBy: props.createdBy || 0,
      createdDate: Date.now(),
      censoredBy: null,
      censoreDate: null,
    })
    return dish.save();
  }
};
