const mongoose = require('mongoose');
const Dish = mongoose.model('Dish');
const Ingredient = mongoose.model('Ingredient');
const DishIngredient = mongoose.model('DishIngredient');
const DishNutrition = mongoose.model('DishNutrition');
const DishStep = mongoose.model('DishStep');
const DishTypeDetail = mongoose.model('DishTypeDetail');
const CuisineDetail = mongoose.model('CuisineDetail');
const DietDetail = mongoose.model('DietDetail');
const UserFavoriteDish = mongoose.model('UserFavoriteDish');
const AzureBlob = require("../models/azure_blob");
const constant = require('../Utils/constant');


module.exports = {
  getDishes(query, option){
    option = option || {};
    // Default get accepted dishes
    query.status = query.status || constant.dishRecipeStatus.accepted;
    let findPromise = Dish.find(query)
                          .select({});
    if (option.perPage){
      findPromise = findPromise.limit(option.perPage);
      if (option.page){
        findPromise = findPromise.skip(option.perPage * (option.page - 1));
      }
    }
    if (option.sort){
      findPromise = findPromise.sort(option.sort);
    }
    return findPromise
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
  addDish(createdBy, props){
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
      status: props.status || constant.dishRecipeStatus.waiting,
      rating: props.rating || 0,
      totalView: 0,
      totalReview: 0,
      createdBy: createdBy || 0,
      createdDate: Date.now(),
      censoredBy: null,
      censoreDate: null,
    })
    return dish.save();
  },
  addDishIngredient(dishID, ingredientID, props){
    props = props || {};
    const dishIngredient = new DishIngredient({
      dishID: dishID,
      ingredientID: ingredientID,
      amount: props.amount || 0,
      isExtended: props.isExtended || false
    })
    return dishIngredient.save();
  },
  addDishNutrition(dishID, nutritionID, props){
    props = props || {};
    const dishNutrition = new DishNutrition({
      dishID: dishID,
      nutritionID: nutritionID,
      amount: props.amount || 0,
    })
    return dishNutrition.save();
  },
  addDishStep(dishID, props){
    props = props || {};
    const dishStep = new DishStep({
      dishID: dishID,
      number: props.number || 0,
      description: props.description || constant.emptyStr,
      equipments: props.equipments || constant.emptyStr,
      image: props.image || constant.emptyStr
    })
    return dishStep.save();
  },
  addDishTypeDetail(dishID, dishTypeID){
    return new DishTypeDetail({
      dishID: dishID,
      dishTypeID: dishTypeID
    }).save();
  },
  addCuisineDetail(dishID, cuisineID){
    return new CuisineDetail({
      dishID: dishID,
      cuisineID: cuisineID
    }).save();
  },
  addDietDetail(dishID, dietID){
    return new DietDetail({
      dishID: dishID,
      dietID: dietID
    }).save();
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
  },
  // Upload images
  async uploadDishImage(dishID, image){
    const extension = image.originalname.slice(image.originalname.lastIndexOf('.'));
    return await AzureBlob.uploadDishImage(constant.createDishImageName(dishID, extension), image);
  },
  setDishImage(dishID, imageName){
      return Dish.findOneAndUpdate({dishID: dishID}, {image: imageName}).exec();
  },
  // Upload dish step images
  async uploadDishStepImage(dishID, number, imageNum, image){
    const extension = image.originalname.slice(image.originalname.lastIndexOf('.'));
    return await AzureBlob.uploadDishStepImage(constant.createDishStepImageName(dishID, number, imageNum, extension), image);
  },
  setDishStepImage(dishID, number, imageName){
      return DishStep.findOneAndUpdate({dishID: dishID, number: number}, {image: imageName}).exec();
  },
  async resetDatabase(){
    await Dish.deleteMany({dishID: {$nin: [1, 2]}});
    //await Ingredient.deleteMany({isActive: false});
    await DishIngredient.deleteMany({dishID: {$nin: [1, 2]}});
    await DishNutrition.deleteMany({dishID: {$nin: [1, 2]}});
    await DishStep.deleteMany({dishID: {$nin: [1, 2]}});    
    await DishTypeDetail.deleteMany({dishID: {$nin: [1, 2]}});
    await CuisineDetail.deleteMany({dishID: {$nin: [1, 2]}});
    await DietDetail.deleteMany({dishID: {$nin: [1, 2]}});
  }
};
