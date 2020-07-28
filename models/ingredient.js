const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
const constant = require('../Utils/constant');


module.exports = {
  getIngredients(query, option){
    option = option || {};
    let findPromise = Ingredient.find(query)
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
          .exec();
  }
};
