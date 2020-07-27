const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const UserFavoriteDish = mongoose.model('UserFavoriteDish');
const constant = require('../Utils/constant');


module.exports = {
  getDishes(query, sort, perPage, page){
    // Default get accepted disshes
    query.status = query.status || constant.dishRecipeStatus.accepted;
    return Dish.find(query)
    .select({})
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort(sort)
    .populate('creator')
    .populate('dishTypes')
    .populate('cuisines')
    .populate('diets')
    .populate('favoriteNumber')
    .exec();
  },
  getDish(dishID) {
    return Dish.findOne({dishID: dishID})
      .populate('creator')
      .populate('dishTypes')
      .populate('cuisines')
      .populate('diets')
      .populate('favoriteNumber')
      .populate({
          path: "ingredients",
          populate: "ingredient"
      })
      .populate({
          path: "nutritions",
          populate: "nutrition"
      })
      .populate('steps')
      .populate({
          path: "comments",
          populate: "user"
      })
      .populate('reviewNumber')
      .exec();
  },
  getDishAndUpdateView(dishID) {
    return new Promise(async (resolve, reject) => {
      const dish = await Dish.findOne({dishID: dishID})
                            .populate('creator')
                            .populate('dishTypes')
                            .populate('cuisines')
                            .populate('diets')
                            .populate('favoriteNumber')
                            .populate({
                                path: "ingredients",
                                populate: "ingredient"
                            })
                            .populate({
                                path: "nutritions",
                                populate: "nutrition"
                            })
                            .populate('steps')
                            .populate({
                                path: "comments",
                                populate: "user"
                            })
                            .populate('reviewNumber')
                            .exec();
      dish.totalView = parseInt(dish.totalView) + 1;
      await dish.save();
      resolve(dish);
    })
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
  },
  isDishUserFavorite(dishID, userID){
    return new Promise(async (resolve, reject) => {
      const dishUserFav = await UserFavoriteDish.find({
        dishID: dishID,
        userID: userID
      }).exec();
      if (dishUserFav)
        resolve(true);
      else 
        resolve(false);
    })
  }
};
