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
});
