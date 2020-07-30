$( document ).ready(function() {
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
            $postRecipeForm.submit(); return;
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
        let postRecipeFormValidator;
        if ($postRecipeForm.length > 0){
            $(document.post_recipe_form.name).focus();
            postRecipeFormValidator = $postRecipeForm.validate(postRecipeFormValidateOp);
        }

        // Post recipe guide validate
        const $postRecipeGuideForm = $(document.recipeGuideForm);
        if ($postRecipeGuideForm.length > 0){
            $(document.guide_content).focus();
            $postRecipeGuideForm.validate(postRecipeGuideValidateOp);
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
        $submitBtn.on('click', function(e) {
            const checkedDishTypes = $("#recipeType input[name='dishTypeCb']:checked");
            const checkedCuisines = $("#recipeCuisine input[name='cuisineCb']:checked");
            const checkedDiets = $("#recipeDiet input[name='dietCb']:checked");
            $postRecipeGuideForm.submit(); return;
            // Check if recipe info is valid
            if(postRecipeFormValidator);
            //$postRecipeForm.submit();
        });
    }
});
