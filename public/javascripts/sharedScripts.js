$( document ).ready(function() {
    //const MySwal = MySwal;
    const relatedProductSlider = $('#relatedProducts').lightSlider({
        item: 5,
        slideMove: 3,
        loop: false,
        autoWidth: true,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        enableDrag: false,
        controls: false,
        pager: false,
        onSliderLoad: function() {
            $('#relatedProducts').removeClass('cS-hidden');
        }
    });
    $('#related-product-slide-left').on('click', function () {
        relatedProductSlider.goToPrevSlide();
    });
    $('#related-product-slide-right').on('click', function () {
        relatedProductSlider.goToNextSlide();
    });

    // Post recipe panel
    const $postRecipePanel = $('#postRecipePanel');
    if ($postRecipePanel.length > 0){
        const windowVar = window;
        const $recipeInfoTab = $postRecipePanel.find("#recipeInfoTab");
        const $recipeGuideTab = $postRecipePanel.find("#recipeGuideTab");
        const $tab1NextBtn = $postRecipePanel.find("#tab1NextBtn");
        const $tab2BackBtn = $postRecipePanel.find("#tab2BackBtn");
        const $submitBtn = $postRecipePanel.find("#submitBtn")
        // Next
        
        $tab1NextBtn.on('click', (e) => {
            if(!postRecipeInfoFormValidator.form()){
                $tab2BackBtn.click();
                swal(recipeInfoErrMsg);
                return;
            }
            $recipeGuideTab.tab('show');
            windowVar.scrollTo(0, 0);            
        });

        // Back
        $tab2BackBtn.on('click', (e) => {
            $recipeInfoTab.tab('show');
            windowVar.scrollTo(0, 0);
        });

        //Post recipe validate
        const $postRecipeForm = $(document.post_recipe_form);
        let postRecipeInfoFormValidator;
        if ($postRecipeForm.length > 0){
            $(document.post_recipe_form.name).focus();
            postRecipeInfoFormValidator = $postRecipeForm.validate(postRecipeFormValidateOp);
        }

        // Post recipe guide validate
        const $postRecipeGuideForm = $(document.recipeGuideForm);
        let postRecipeGuideFormValidator;
        if ($postRecipeGuideForm.length > 0){
            $(document.guide_content).focus();
            postRecipeGuideFormValidator = $postRecipeGuideForm.validate(postRecipeGuideValidateOp);
        }

        // Autocomplete
        // Nutritions
        const $postRecipeNutritionsSelect = $('#post_recipe_nutritions .select2');
        if ($postRecipeNutritionsSelect.length > 0){
            $postRecipeNutritionsSelect.select2(select2NutritionsOption);
        }

        // Ingredients
        const $recipeIngredientsInput = $('#recipe-ingredients .recipe-ingredient.select2');
        if ($recipeIngredientsInput.length > 0){
            $recipeIngredientsInput.select2(select2IngredientsOption);
        }

        // Extended Ingredients
        const $recipeExtIngredientsInput = $('#recipe-extended-ingredients .recipe-ext-ingredient.select2');
        if ($recipeExtIngredientsInput.length > 0){
            $recipeExtIngredientsInput.select2(select2IngredientsOption);
        }

        // Ingredient units
        const $recipeIngredientUnitSelect = $('#recipe-ingredients .recipe-ingredient-unit, #recipe-extended-ingredients .recipe-ingredient-unit');
        if ($recipeIngredientUnitSelect.length > 0){
            $recipeIngredientUnitSelect.select2();
        }

        // Submit
        $submitBtn.on('click', (e) => {
            // Check if recipe info is valid
            if(!postRecipeInfoFormValidator.form()){
                $tab2BackBtn.click();
                swal.error(recipeInfoErrMsg);
                return;
            }
            if(!postRecipeGuideFormValidator.form()){
                swal.error(recipeGuideErrMsg);
                return;
            }
            const props = new FormData();
            const checkDupSet = new Set();

            // Check duplicate ingredients
            // Ingredients
            const ingredients = [];
            $postRecipeForm.find("#recipe-ingredients .recipe-ingredient-row").each((key, item) => {
                const $item = $(item);
                const recipeIngreVal = $item.find("[name=recipeIngredient]").val();
                const isNew = isNaN(recipeIngreVal);
                const ingredientObj = {
                    ingredientID: (isNew)? recipeIngreVal : parseInt(recipeIngreVal),
                    amount: parseFloat($item.find("[name=recipeIngredientUnitVal]").val()),
                    unit: $item.find("[name=recipeIngredientUnit]").val(),
                    isNew: isNew
                };
                ingredients.push(ingredientObj);
                checkDupSet.add(ingredientObj.ingredientID);
            })

            if (checkDupSet.size != ingredients.length){
                swal.error(duplicateIngreErrMsg);
                return;
            }

            // Ingredients images
            recipeIngredientNewImgPonds.forEach((item, index) => {
                const file = item.getFile();
                if (file != null && ingredients[index].isNew){
                    props.append("newIngreImages", file.file);
                    ingredients[index].hasNewImage = true;
                }
                else 
                    ingredients[index].hasNewImage = false;
            })

            // Extended Ingredients
            const extIngredients = [];
            $postRecipeForm.find("#recipe-extended-ingredients .recipe-ingredient-row").each((key, item) => {
                const $item = $(item);
                const recipeExtIngreVal = $item.find("[name=recipeExtIngredient]").val();
                const isNew = isNaN(recipeExtIngreVal);
                const extIngredientObj = {
                    ingredientID: (isNew)? recipeExtIngreVal : parseInt(recipeExtIngreVal),
                    amount: parseFloat($item.find("[name=recipeExtIngredientUnitVal]").val()),
                    unit: $item.find("[name=recipeExtIngredientUnit]").val(),
                    isNew: isNew
                };
                extIngredients.push(extIngredientObj);
                checkDupSet.add(extIngredientObj.ingredientID);
            })

            if (checkDupSet.size != (extIngredients.length + ingredients.length)){
                swal.error(duplicateIngreErrMsg);
                return;
            }

            // Extended ingredients images
            recipeExtIngredientNewImgPonds.forEach((item, index) => {
                const file = item.getFile();
                if (file != null && extIngredients[index].isNew){
                    props.append("newExtIngreImages", file.file);
                    extIngredients[index].hasNewImage = true;
                }
                else 
                    extIngredients[index].hasNewImage = false;
                
            })

            props.append("ingredients", JSON.stringify(ingredients));
            props.append("extIngredients", JSON.stringify(extIngredients));

            // Get data from form
            $postRecipeForm.serializeArray().forEach((item, index) => props.append(item.name, item.value));
            // Parse number
            props.set("healthScore", parseInt(props.get("healthScore")));
            props.set("difficulty", parseInt(props.get("difficulty")));
            props.set("servings", parseInt(props.get("servings")));
            props.set("readyTime", parseInt(props.get("readyTime")));
            props.set("price", parseInt(props.get("price")));

            // Get checkboxes value
            dishTypes = [];
            cuisines = [];
            diets = [];
            // Dish types
            $("#recipeType input[name='dishTypeCb']:checked").each((key, item) => {
                dishTypes.push(parseInt(item.value));
            });
            // Cuisines
            $("#recipeCuisine input[name='cuisineCb']:checked").each((key, item) => {
                cuisines.push(parseInt(item.value));
            });
            // Diets
            $("#recipeDiet input[name='dietCb']:checked").each((key, item) => {
                diets.push(parseInt(item.value));
            });
            props.append("dishTypes", JSON.stringify(dishTypes));
            props.append("cuisines", JSON.stringify(cuisines));
            props.append("diets", JSON.stringify(diets));

            nutritions = [];
            // Nutritions
            $(document.post_recipe_form.nutritions).select2("data").forEach((item, index) => {
                nutritions.push(parseInt(item.id));
            });
            props.delete("nutritions");
            props.append("nutritions", JSON.stringify(nutritions));

            // Recipe guide
            $postRecipeGuideForm.serializeArray().forEach((item, index) => props.append(item.name, item.value));
            // Dish steps
            steps = [];
            $postRecipeGuideForm.find(".recipe-guide-row").each((key, item) => {
                const $item = $(item);
                steps.push({
                    number: parseInt($item.find(".guide-number").text()),
                    description: $item.find("[name=guide_content]").val(),
                    equipments: $item.find("[name=guide_equipments]").val(),
                    image: ""
                });
            })

            // Guide images
            let countStepImg = 0;
            recipeGuideFilePonds.forEach((item, index) => {
                const files = item.getFiles();
                if (files.length > 0){
                    props.append("stepImagesBoundary", countStepImg);
                    files.forEach((item2, index2) => {
                        props.append("stepImages", item2.file);
                        countStepImg++;
                    })
                    steps[index].hasImages = true;
                } else {
                    props.append("stepImagesBoundary", countStepImg);
                    steps[index].hasImages = false;
                }
            })

            props.append("steps", JSON.stringify(steps));

            props.append("image", recipeImagePond.getFile().file);
            showLoading();
            $.ajax({
                url: '/postRecipe',
                data: props,
                contentType: false,
                type: 'POST',
                processData: false,
                success: function(dataJson){
                    if (dataJson.success){
                        (async function(){
                            await swal.success(dataJson.message);
                            window.location.href = dataJson.returnUrl;
                        })();
                    } else {
                        swal.error(dataJson.message);
                    }
                    hideLoading();
                },
                error: function(err){
                    swal.error(err);
                    hideLoading();
                }
            });
        });
    }

    // Censor recipes
    const $waitingRecipes = $('#waitingRecipes');
    const $censorButtonsBar = $('#censorButtonsBar');
    if ($waitingRecipes.length > 0 && $censorButtonsBar.length > 0){
        const $waitingRecipeList = $waitingRecipes.find('.waiting-recipe');
        const $waitingRecipeCbs = $waitingRecipes.find('.waiting-recipe .waiting-recipe-checkbox input[type=checkbox]');
        $('#selectAll').on('click', (e) => {
            $waitingRecipeCbs.each((key, cb) => {
                cb.checked = true;
            })
        })
        $('#acceptRecipe').on('click', async (e) => {
            const data = [];
            $waitingRecipes.find('.waiting-recipe .waiting-recipe-checkbox input[type=checkbox]:checked').each((key, input) => {
                data.push(parseInt(input.value));
            });

            // Check empty censor
            if (data.length == 0){
                swal.error(noDishSelectedErrMsg);
                return;
            }

            // Confirm choice
            const confirm = await swal.warning(wantToAccepRecipeMsg);
            if (!confirm.isConfirmed)
                return;

            showLoading();
            $.ajax({
                url: '/censorRecipe',
                data: {
                    dishIDs: data,
                    status: 1
                },
                type: 'POST',
                dataType: 'json',
                success:  function(dataJson){
                    if (dataJson.success){
                        (async function(){
                            await swal.success(dataJson.message);
                            window.location.href = "/censorRecipe"
                        })();
                    } else {
                        swal.error(dataJson.message);
                    }
                    hideLoading();
                },
                error: function(err){
                    swal.error(err);
                    hideLoading();
                }
            });
        });

        $('#rejectRecipe').on('click', async (e) => {
            // Confirm choice
            const confirm = await swal.warning(wantToRejectRecipeMsg);
            if (!confirm.isConfirmed)
                return;
            const data = [];
            $waitingRecipes.find('.waiting-recipe .waiting-recipe-checkbox input[type=checkbox]:checked').each((key, input) => {
                data.push(parseInt(input.value));
            });

            // Check empty censor
            if (data.length == 0){
                swal.error(noDishSelectedErrMsg);
                return;
            }

            showLoading();
            $.ajax({
                url: '/censorRecipe',
                data: {
                    dishIDs: data,
                    status: 2
                },
                type: 'POST',
                dataType: 'json',
                success: function(dataJson){
                    if (dataJson.success){
                        (async function(){
                            await swal.success(dataJson.message);
                            window.location.href = window.location.reload(false);
                        })();
                    } else {
                        swal.error(dataJson.message);
                    }
                    hideLoading();
                },
                error: function(err){
                    swal.error(err);
                    hideLoading();
                }
            });
        })
    }
});
