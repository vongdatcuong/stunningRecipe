const Dish = require("../models/dish");
const Ingredient = require("../models/ingredient");
const AzureBlob = require("../models/azure_blob");
const constant = require("../Utils/constant");

/* Dish Detail */
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
        step.image = (step.image)? constant.imageStorageLink + constant.dishStepPath + step.image.split(constant.imageUrlSeperator)[0] : constant.emptyStr;
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
/* Dishes */
const dishes = async (req, res) => {
    //const dish = await Dish.getDishAndUpdateView(req.params.dishID);
    res.render('dishes', {
        title: constant.appName,
        user: req.user,
        userType: constant.userType
    });
}

/* Post Recipe */
const postRecipePage = async (req, res) => {
    const customDishTypes = constant.dishTypes.map((item, idx) =>  {
        return {name: item, index: (idx)};
    });
    const customCuisines = constant.cuisines.map((item, idx) =>  {
        return {name: item, index: idx};
    });
    const customDiets = constant.diets.map((item, idx) =>  {
        return {name: item, index: idx};
    });
    res.render('post_recipe', {
        title: constant.appName,
        user: req.user,
        dishTypes: constant.splitToChunk(customDishTypes, 6),
        cuisines: constant.splitToChunk(customCuisines, 6),
        diets: constant.splitToChunk(customDiets, 4),
        ingredientUnits: constant.ingredientUnits
    });
}

const postRecipe = async (req, res) => {
    const props = req.body;
    const files = req.files;
    const user = req.user; 
    // Add new ingredients
    const ingredients = JSON.parse(props.ingredients);
    const extIngredients = JSON.parse(props.extIngredients);
    const ingrePromises = [];
    // Main ingredients
    ingredients.forEach((ingredient, index) => {
        if (!ingredient.isNew)
            return;
        ingrePromises.push(new Promise(async (resolve, reject) => {
            const newIngredient = await Ingredient.addIngredients(user.userID, {
                name: ingredient.ingredientID,
            });
            if (ingredient.hasNewImage){
                try {
                    const fileName = await Ingredient.uploadIngredientImage(newIngredient.ingredientID, files.newIngreImages.shift());
                    await Ingredient.setIngredientImage(newIngredient.ingredientID, fileName);
                    ingredient.ingredientID = newIngredient.ingredientID;
                } catch (err) {
                    console.log(err);
                    reject({
                        success: false,
                        message: constant.uploadImageFail
                    });
                }
            }
            resolve(newIngredient);
        }))
    })
    // Extended ingredients
    extIngredients.forEach((ingredient, index) => {
        if (!ingredient.isNew)
            return;
        ingrePromises.push(new Promise(async (resolve, reject) => {
            const newIngredient = await Ingredient.addIngredients(user.userID, {
                name: ingredient.ingredientID,
            });
            if (ingredient.hasNewImage){
                try {
                    const fileName = await Ingredient.uploadIngredientImage(newIngredient.ingredientID, files.newExtIngreImages.shift());
                    await Ingredient.setIngredientImage(newIngredient.ingredientID, fileName);
                    ingredient.ingredientID = newIngredient.ingredientID;
                } catch (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        message: constant.uploadIngredientImageFail
                    });
                }
            }
            resolve(newIngredient);
        }))
    })
    const ingreResponses = await Promise.all(ingrePromises);
    
    // Add Dishes
    const newDish = await Dish.addDish(user.userID, {
        name: props.name,
        servings: parseInt(props.servings),
        readyTime: parseInt(props.readyTime),
        healthScore: parseInt(props.healthScore),
        price: parseInt(props.price),
        difficulty: parseInt(props.difficulty),
        description: props.description,
        video: props.video,
    })
    try {
        const dishFileName = await Dish.uploadDishImage(newDish.dishID, files.image[0]);
        await Dish.setDishImage(newDish.dishID, dishFileName);
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: constant.uploadDishImageFail
        });
    }

    const dishPromises = [];
    // Ingredients
    ingredients.forEach((ingredient, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dishIngre = await Dish.addDishIngredient(newDish.dishID, ingredient.ingredientID, {
                amount: ingredient.amount,
                unit: ingredient.unit,
                isExtended: false
            });
            resolve(dishIngre);
        }))
    })

    // Extended Ingredients
    extIngredients.forEach((ingredient, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dishIngre = await Dish.addDishIngredient(newDish.dishID, ingredient.ingredientID, {
                amount: ingredient.amount,
                unit: ingredient.unit,
                isExtended: true
            });
            resolve(dishIngre);
        }))
    })

    // Dish Types
    const dishTypes = JSON.parse(props.dishTypes);
    dishTypes.forEach((dishType, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dishTypeDetail = await Dish.addDishTypeDetail(newDish.dishID, dishType);
            resolve(dishTypeDetail);
        }))
    })

    // Cuisines
    const cuisines = JSON.parse(props.cuisines);
    cuisines.forEach((cuisine, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const cuisineDetail = await Dish.addCuisineDetail(newDish.dishID, cuisine);
            resolve(cuisineDetail);
        }))
    })

    // Diets
    const diets = JSON.parse(props.diets);
    diets.forEach((diet, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dietDetail = await Dish.addDietDetail(newDish.dishID, diet);
            resolve(dietDetail);
        }))
    })

    // Nutritions
    const nutritions = JSON.parse(props.nutritions);
    nutritions.forEach((nutrition, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dishNutrition = await Dish.addDishNutrition(newDish.dishID, nutrition, {});
            resolve(dishNutrition);
        }))
    })

    // Steps
    const steps = JSON.parse(props.steps);
    const stepImagesBoundary = props.stepImagesBoundary;
    const stepNum = steps.length;
    steps.forEach((step, index) => {
        dishPromises.push(new Promise(async (resolve, reject) => {
            const dishStep = await Dish.addDishStep(newDish.dishID, {
                number: step.number,
                description: step.description,
                equipments: step.equipments,
            });
            try {
                // If step doesn't have any images
                if (!step.hasImages){
                    resolve(dishStep);
                }
                let stepIthImagePromises = [];
                // If not last step
                if (index < stepNum - 1){
                    files.stepImages.slice(parseInt(stepImagesBoundary[index]), parseInt(stepImagesBoundary[index + 1])).forEach((stepImage, index2) => {
                        stepIthImagePromises.push(new Promise(async (resolve2, reject2) => {
                            const fileName = await Dish.uploadDishStepImage(newDish.dishID, step.number, index2 + 1, stepImage);
                            resolve2(fileName);
                        }));
                    })
                } else {
                    files.stepImages.slice(parseInt(stepImagesBoundary[index])).forEach((stepImage, index2) => {
                        stepIthImagePromises.push(new Promise(async (resolve2, reject2) => {
                            const fileName = await Dish.uploadDishStepImage(newDish.dishID, step.number, index2 + 1, stepImage);
                            resolve2(fileName);
                        }));
                    })
                }
                const stepIthImages = await Promise.all(stepIthImagePromises);
                await Dish.setDishStepImage(newDish.dishID, step.number, stepIthImages.join(constant.imageUrlSeperator));
            } catch (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: constant.uploadImageFail
                });
            }
            resolve(dishStep);
        }))
    });
    const stepResponses = await Promise.all(dishPromises);
    res.json({
        success: true,
        message: constant.addDishSuccess,
        returnUrl: "/profile/" + user.userID
    })
}

module.exports = {
    dishDetail,
    dishes,
    postRecipePage,
    postRecipe
};