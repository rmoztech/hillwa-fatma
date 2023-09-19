
$(document).ready(function () {
    $(".editAccount-form").validate({
        rules: {
            name: {
                required: true,
            },
            mobile: {
                required: true,
            },
            email: {
                required: true,
            },
        },

        messages: {
            name: {
                required: 'يرجى ادخال الاسم',
            },
            mobile: {
                required: "يرجى ادخال رقم الموبايل",
            },
            email: {
                required: 'يرجى ادخال البريد الالكتروني'
            }
        }
    });

    $('.editAccount-form').on('submit', function (e) {
        e.preventDefault();
        if ($(".editAccount-form").valid()) {
            $("#successPassModal").modal("show");
            setTimeout(function () {
                $("#successPassModal").modal("hide");
            }, 1000);
        }
    });
    $.validator.addMethod('le', function (value, element, param) {
        return this.optional(element) || value == $(param).val();
    }, 'Invalid value');
    $(".editPass-form").validate({
        rules: {
            newPass: {
                required: true,
            },
            confirmPass: {
                required: true,
                le: '#newPass'
            }
        },

        messages: {
            newPass: {
                required: 'يرجى ادخال كلمة المرور',
            },
            confirmPass: {
                required: "يرجى تأكيد كلمة المرور",
                le: "يجب ان تتوافق مع كملة المرور الجديدة"
            }
        }
    });

    $('.editPass-form').on('submit', function (e) {
        e.preventDefault();
        if ($(".editPass-form").valid()) {
            $("#successPassModal").modal("show");
            setTimeout(function () {
                $("#successPassModal").modal("hide");
            }, 1000);
        }
    });


    // validation for checkout page 
    $(function () {
        if ($('.addresses input[type="radio"]').is(':checked') &&
            $('.receipt-date input[type="radio"]').is(':checked') &&
            $('.shipping-time input[type="radio"]').is(':checked')) {
            $(".nav-tabs li.next button").prop('disabled', false);
        }
        else {
            $(".nav-tabs li.next button").prop('disabled', true);
        }
        if($('.payment-method input[type="radio"]').is(':checked') ){
            $(".complete-sale-btn").prop('disabled', false);

        }
        else {
            $(".complete-sale-btn").prop('disabled', true);
        }

    })

    $(function () {
        if ($('#addressTab').hasClass('active')) {
            $('.nav-tabs li.prev').hide();
            $('.nav-tabs li.next').show();
        }
        if ($(".nav-tabs li.next button").attr('disabled') == undefined) {
            $('.nav-tabs li.next').on('click', function () {
                $('.nav-tabs li.next').hide();
                $('.nav-tabs li.prev').show();
            })
        }
        if ($(".nav-tabs li.prev button").attr('disabled') == undefined) {
            $('.nav-tabs li.prev').on('click', function () {
                $('.nav-tabs li.prev').hide();
                $('.nav-tabs li.next').show();
            })
        }
    })


    $(function() {
        if($('.addresses .owl-addresses .item').length <= 3){
            $('.addresses .owl-theme').hide()
        }else{
            $('.addresses .owl-theme').show()
        }
    })

    $('.owl-addresses').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        rtl: true,
        items: 3,
        dots: false,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        navContainer: '.news-custom-nav',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    // 
    // show and hide alert in checkout page and validate

    $('.complete-sale-btn').on('click', function () {
        $('.alert').show();
        $(".payment-method").valid()
    })
    $("input[type=file].voucherImg").change(function (e) {
        $(".voucherImgName").text(e.target.files[0].name);
    });

    // 
    // show and hide the bank select
    $('.payment-method').change(function () {
        selected_value = $("input[name='payment']:checked").val();
        if (selected_value == 7) {
            $(".bankForm").slideDown(500);
        }
        else {
            $(".bankForm").slideUp(500);
        }
    });
    // 
    // validation for add bank
    // add the rule here
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");

    // configure your validation
    $(".payment-method").validate({
        rules: {
            bank: { valueNotEquals: "default" },
            voucherImg: {
                required: true,
            }
        },
        messages: {
            bank: { valueNotEquals: "يرجى اختيار اسم البنك" },
            voucherImg: {
                required: "يرجى ارفاق ملف",
            }
        }
    });
})




