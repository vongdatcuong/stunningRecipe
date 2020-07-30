function SweetAlert() {
    const timer = 5 * 60 * 1000;
    this.warning = (message, options) => {
        return Swal.fire({
            title: "<span style='color: #28A745;'>Thông báo</span>",
            icon: "warning",
            html: message + "!",
            timer: timer,
            showCloseButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#28A745",
            showCancelButton: true,
            cancelButtonColor: "#DC3545",
            cancelButtonText: "Hủy bỏ",
            focusCancel: true,
        });
    }
    this.success = (message, options) => {
        return Swal.fire({
            title: "<span style='color: #28A745;'>Thông báo</span>",
            icon: "success",
            html: message + "!",
            timer: timer,
            showCloseButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#28A745",
            focusConfirm: true,
        });
    }
    this.error = (message, options) => {
        return Swal.fire({
            title: "<span style='color: #DC3545;'>Thông báo</span>",
            icon: "error",
            html: message + "!",
            timer: timer,
            showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: "#DC3545",
            cancelButtonText: "Đồng ý",
            focusCancel: true,
        });
    }
}
const swal = new SweetAlert();