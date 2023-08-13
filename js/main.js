$(document).ready(function () {

    $(window).scroll(function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 150) {
            $(".header").addClass("is-sticky");
        } else {
            $(".header").removeClass("is-sticky");
        }
    });

    $('.menu-btn').click(function () {
        $('.mobile-navbar').css({ display: 'flex' })
    })
    $('.close-btn').click(function () {
        $('.mobile-navbar').css({ display: ' none' });
    })

    $('.sidebar .menu-icon').click(function () {
        if ($('.sidebar .menu-icon i').hasClass('fa-bars')) {
            console.log('dfkjdhfjkdhf');
            $('.sidebar').css({ right: ' 0px' });
            $('.sidebar i').removeClass('fa-bars').addClass('fa-xmark')
        }
        else {
            $('.sidebar').css({ right: ' -270px' });
            $('.sidebar i').removeClass('fa-xmark').addClass('fa-bars')
        }
    })
    $('.owl-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        rtl: true,
        items: 1,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
    });

    $('.owl-clients, .owl-certificates').owlCarousel({
        loop: true,
        nav: true,
        rtl: true,
        dots: false,
        items: 4,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa-solid fa-chevron-left"></i>',
            '<i class="fa-solid fa-chevron-right"></i>'
        ],
        navContainer: '.member-custom-nav',
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    $('.btn-number').click(function (e) {
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-qty').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-qty').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });
    $(".input-qty").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".complete-sale-btn").click(function (e) {
        e.preventDefault();
        var count = $(".shopping-cart-page").find(".product-card").length;
        if (count < 10) {
            var toastElList = [].slice.call($('.toast'))
            var toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl)
            })
            toastList.forEach(toast => toast.show())
        } else {
            $("#logInModal").modal("show");
        }
    });

    $(".logInForm").validate({
        rules: {
            mobile: {
                required: true,
            },
        },

        messages: {
            mobile: {
                required: "يرجى ادخال رقم الموبايل",
            },
        }
    });

    $('.logInForm').on('submit', function (e) {
        e.preventDefault();
        if ($(".logInForm").valid()) {
            $("#logInModal").modal("hide");
        }
    });

    $(".newAccountForm").validate({
        rules: {
            mobile: {
                required: true,
            },
            username: {
                required: true
            }
        },

        messages: {
            mobile: {
                required: "يرجى ادخال رقم الموبايل",
            },
            username: {
                required: "يرجى ادخال الاسم"
            }
        }
    });

    $('.newAccountForm').on('submit', function (e) {
        e.preventDefault();
        if ($(".newAccountForm").valid()) {
            $("#newAccountModal").modal("hide");
            $("#codeModal").modal("show");
        }
    });

    $(function () {
        $("#datepicker").datepicker();
    });

    var cart = [];
    $(function () {
        if (localStorage.cart) {
            // load cart data from local storage
            cart = JSON.parse(localStorage.cart);
            $('.num-cart').text(JSON.parse(localStorage.cart).length);
            // showCart();  // display cart that is loaded into cart array
        }
    });
    function saveCart() {
        if (window.localStorage) {
            localStorage.cart = JSON.stringify(cart);
            $('.num-cart').text(JSON.parse(localStorage.cart).length);
        }
    }
    function addToCart(item) {
        var name = $(item).parent('.card-body').find(".card-title").text() || $('.card').find(".card-title").text();
        var price = $(item).parent('.card-body').find(".price").find(".new-price").text() || $('.card').find(".price").find(".new-price").text();
        var qty = $('.card').find(".input-qty").val() || 1;

        // update Qty if product is already present
        for (var i in cart) {
            if (cart[i].Product == name) {
                cart[i].Qty = qty;  // replace existing Qty
                // showCart();
                saveCart();
                return;
            }
        }

        var item = { Product: name, Price: price, Qty: qty };
        cart.push(item);

        saveCart();
        // showCart();
    }

    $('.add-to-cart').on('click', function () {
        var cart = $('.shopping-cart');
        var imgtodrag = $(this).parent('.card-body').parent('.card').find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top - 70,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, 1000, 'easeInOutExpo');

            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }
        addToCart($(this));
    });

    $('.add-cart').on('click', function () {
        var cart = $('.shopping-cart');
        var imgtodrag = $('.card').find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top - 70,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, 1000, 'easeInOutExpo');

            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }
        addToCart($(this));
    });



    var numberCodeForm = $('[data-number-code-form]');
    var numberCodeInputs = [...$('[data-number-code-input]').find('[data-number-code-input]').prevObject];
    // Event callbacks
    const handleInput = ({ target }) => {
        if (!target.value.length) { return target.value = null; }

        const inputLength = target.value.length;
        let currentIndex = Number(target.dataset.numberCodeInput);

        if (inputLength > 1) {
            const inputValues = target.value.split('');

            inputValues.forEach((value, valueIndex) => {
                const nextValueIndex = currentIndex + valueIndex;

                if (nextValueIndex >= numberCodeInputs.length) { return; }

                numberCodeInputs[nextValueIndex].value = value;
            });

            currentIndex += inputValues.length - 2;
        }

        const nextIndex = currentIndex + 1;

        if (nextIndex < numberCodeInputs.length) {
            numberCodeInputs[nextIndex].focus();
        }
    }

    const handleKeyDown = e => {
        const { code, target } = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch (code) {
            case 'ArrowLeft':
            case 'ArrowUp':
                if (hasPreviousIndex) {
                    numberCodeInputs[previousIndex].focus();
                }
                e.preventDefault();
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                if (hasNextIndex) {
                    numberCodeInputs[nextIndex].focus();
                }
                e.preventDefault();
                break;
            case 'Backspace':
                if (!e.target.value.length && hasPreviousIndex) {
                    numberCodeInputs[previousIndex].value = null;
                    numberCodeInputs[previousIndex].focus();
                }
                break;
            default:
                break;
        }
    }

    numberCodeForm.on('input', handleInput);
    numberCodeForm.on('keydown', handleKeyDown);
    AOS.init({
        duration: 1500,
        once: true,
    });
});