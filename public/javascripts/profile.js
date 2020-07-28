$(document).ready(function() {
    $imgSrc = $('#imgProfile').attr('src');

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#imgProfile').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#btnChangePicture').on('click', function() {
        // document.getElementById('profilePicture').click();
        if (!$('#btnChangePicture').hasClass('changing')) {
            $('#profilePicture').click();
        } else {
            // change
            alert("Changed!");
            //$('#btnChangePicture').attr('type', 'submit');
            document.getElementById("editInfo-upload-Userimage").submit();
            //doUploadImage();
        }
    });
    $('#profilePicture').on('change', function() {
        readURL(this);
        $('#btnChangePicture').addClass('changing');
        $('#btnChangePicture').attr('value', 'Confirm');
        $('#btnDiscard').removeClass('d-none');
        // $('#imgProfile').attr('src', '');
    });
    $('#btnDiscard').on('click', function() {
        // if ($('#btnDiscard').hasClass('d-none')) {
        $('#btnChangePicture').removeClass('changing');
        $('#btnChangePicture').attr('value', 'Change');
        $('#btnDiscard').addClass('d-none');
        $('#imgProfile').attr('src', $imgSrc);
        $('#profilePicture').val('');
        // }
    });

    // function doUploadImage() {
    //     alert("Changed2!");
    //     $.ajax({
    //         url: "/uploadUserImage",
    //         method: "POST",
    //         timeout: 5 * 60 * 1000,
    //         //paramName: function(n) { return "images"; },
    //         //dictDefaultMessage: "Kéo ảnh sản phẩm vào",
    //         acceptedFiles: "image/*",
    //         // addRemoveLinks: true,
    //         // dictRemoveFile: "Xóa",
    //         // autoProcessQueue: false,
    //         sending: (file, xhr, formData) => {
    //             if (!isSent) {
    //                 formData.append("storeId", parseInt($(document.add_product_form.storeId).val()));
    //                 formData.append("name", $(document.add_product_form.name).val());
    //                 formData.append("new", $(document.add_product_form.new).is(":checked"));
    //                 formData.append("price", Number($(document.add_product_form.price).val()));
    //                 formData.append("discount", Number($(document.add_product_form.discount).val()));
    //                 formData.append("categoryId", parseInt($(document.add_product_form.categoryId).val()));
    //                 formData.append("description", $(document.add_product_form.description).val());
    //                 isSent = true;
    //             }
    //         },
    //         success: (file, response) => {
    //             if (response.productId) {
    //                 window.location.href = "/product_detail/" + response.productId;
    //             } else {
    //                 Alert.error(response.error || "Thêm sản phẩm thất bại !!!");
    //             }
    //         }
    //     });
    // }
});