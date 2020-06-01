(function(){
    const $loginForm = $(document.loginForm);
    const $signupForm = $(document.signupForm);
    const $alertMsg = $('.alert-message');
    const alertTimeout = 3000;

    if ($alertMsg.css('display') !== 'none'){
        setTimeout(()=>{
            $alertMsg.css('display', 'none');
        }, alertTimeout)
    }
    if ($loginForm.length > 0){
        $(document.loginForm.username).focus();
    }
    if ($signupForm.length > 0){
        $(document.signupForm.username).focus();
        $signupForm .validate({
            rules: {
                username: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 7,
                },
                "re-password": {
                    required: true,
                    equalTo: "#password1"
                },
                agree: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "Username không được để trống",
                },
                email: {
                    required: "Email không được để trống",
                    email: "Email phải có dạng example@abc.com"
                },
                password: {
                    required: "Mật khẩu không được để trống",
                    minlength: "Mật khẩu phải có trên 6 ký tự"
                },
                "re-password": {
                    required: "Xác nhận mật khẩu không trùng khớp",
                    equalTo: "Xác nhận mật khẩu không trùng khớp"
                },
                agree: {
                    required: "Chưa chấp nhận điều khoản"
                }
            }
        });
    }

    $('#signupBtn').on('click', (e) => {
        if ($signupForm.valid()){
            showLoading();
        }
    })
    $('#loginBtn').on('click', (e) => {
        showLoading();
    })
})();
