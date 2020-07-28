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

    //Post recipe validate
    const $postRecipeForm = $(document.post_recipe_form);
    if ($postRecipeForm.length > 0){
        $(document.post_recipe_form.name).focus();
        $postRecipeForm.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 1,
                    maxlength: 100
                },
                healthScore: {
                    required: true,
                    number: true,
                    min: 0,
                    max: 100
                },
                servings: {
                    required: true,
                    number: true,
                    min: 0
                },
                readyTime: {
                    required: true,
                    number: true,
                    min: 0
                },
                price: {
                    required: true,
                    number: true,
                    min: 0
                },
                description: {
                    required: true,
                    minlength: 1,
                    maxlength: 3000
                },
            },
            messages: {
                name: {
                    required: nameErrMsg,
                    minlength: nameErrMsg,
                    maxlength: nameErrMsg
                },
                healthScore: {
                    required: healthWScoreErrMsg,
                    number: healthWScoreErrMsg,
                    min: healthWScoreErrMsg,
                    max: healthWScoreErrMsg
                },
                servings: {
                    required: servingsErrMsg,
                    number: servingsErrMsg,
                    min: servingsErrMsg
                },
                readyTime: {
                    required: readyTimeErrMsg,
                    number: readyTimeErrMsg,
                    min: readyTimeErrMsg
                },
                price: {
                    required: priceErrMsg,
                    number: priceErrMsg,
                    min: priceErrMsg
                },
                description: {
                    required: descriptionErrMsg,
                    minlength: descriptionErrMsg,
                    maxlength: descriptionErrMsg
                },
            }
        });
    }

    // Autocomplete
    // Nutritions
    const $postRecipeNutritionsSelect = $('#post_recipe_nutritions .select2');
    if ($postRecipeNutritionsSelect.length > 0){
        $postRecipeNutritionsSelect.select2({
            placeholder: 'Thêm thành phần dinh dưỡng',
            minimumInputLength: 0,
            ajax: {
                url: '/autocompleteNutritions',
                type: "GET",
                data: function (params) {
                    var query = {
                        nameReg: params.term
                    }
                    return query;
                },
                dataType: 'json'
            }
        });
    }

    // Ingredients
    const $recipeIngredientsInput = $('#recipe-ingredients .recipe_ingredient.select2');
    if ($recipeIngredientsInput.length > 0){
        $recipeIngredientsInput.select2({
            placeholder: 'Tên nguyên liệu',
            minimumInputLength: 0,
            ajax: {
                url: '/autocompleteIngredients',
                type: "GET",
                data: function (params) {
                    var query = {
                        nameReg: params.term
                    }
                    return query;
                },
                dataType: 'json'
            }
        });
    }

    // Extended Ingredients
    const $recipeExtIngredientsInput = $('#recipe-extended-ingredients .recipe_ext_ingredient.select2');
    if ($recipeExtIngredientsInput.length > 0){
        $recipeExtIngredientsInput.select2({
            placeholder: 'Tên nguyên liệu',
            minimumInputLength: 0,            
            ajax: {
                url: '/autocompleteIngredients',
                type: "GET",
                data: function (params) {
                    var query = {
                        nameReg: params.term
                    }
                    return query;
                },
                dataType: 'json'
            }
        });
    }
});
