$(document).ready(function () {
    $(window).scroll(function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 150) {
            $(".header").addClass("is-sticky");
        } else {
            $(".header").removeClass("is-sticky");
        }
        if ($(window).scrollTop() > 300) {
            $('.swip-up').css('display', 'inline');
        }
        else {
            $('.swip-up').css('display', 'none')
        }
    });
    $(function () {
        $('.swip-up').css('display', 'none')
    })
    $('.swip-up').click(function () {
        $("html, body").stop().animate({ scrollTop: 0 }, 500);
    })
    $('.menu-btn').click(function () {
        $('.mobile-navbar').css({ display: 'flex' })
    })
    $('.close-btn').click(function () {
        $('.mobile-navbar').css({ display: ' none' });
    })
    $('.shopping-cart >span:first-of-type, .shopping-cart>svg').click(function () {
        $('.cart-list').toggle(500)
    })
    $('.sidebar .menu-icon').click(function () {
        if ($('.sidebar .menu-icon i').hasClass('fa-bars')) {
            if($('body').css('direction') == 'rtl'){
                $('.sidebar').css({ right: ' 0px' });
            }
            else{
                $('.sidebar').css({ left: ' 0px' });
            }
            
            $('.sidebar i').removeClass('fa-bars').addClass('fa-xmark')
        }
        else {
            if($('body').css('direction') == 'rtl'){
                $('.sidebar').css({ right: ' -270px' })
            }
            else{
                $('.sidebar').css({ left: ' -270px' })
            }
        ;
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
 console.log($('body').css('direction'))
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
    $('.owl-products').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        rtl: true,
        items: 3,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
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

    $('.owl-product').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        rtl: true,
        items: 1,
        dots: true,
        autoplayTimeout: 3000,
    });

    $(".complete-sale-btn").click(function (e) {
        e.preventDefault();
        var count = JSON.parse(localStorage.cart).length;
        if (1 < count < 10) {
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
    function onclickBtn(info) {
        fieldName = $(info).attr('data-field');
        type = $(info).attr('data-type');
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
    }
    function onchangeInput(info) {
        minValue = parseInt($(info).attr('min'));
        maxValue = parseInt($(info).attr('max'));
        valueCurrent = parseInt($(info).val());

        name = $(info).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(info).val($(info).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(info).val($(info).data('oldValue'));
        }
    }
    function onkeydownInput() {
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
    }
    $('.card-list').on('click', '.btn-number', function (e) {
        e.preventDefault();
        onclickBtn(this);
        var input = $("input[name='" + fieldName + "']");
        itemIndex = $(this).parent().parent().parent().parent().parent().parent().parent().parent().attr("id");
        var cart = JSON.parse(localStorage.cart);
        cart[itemIndex].qty = input.val();
        localStorage.setItem("cart", JSON.stringify(cart));
    })
    $('.card-list').on('focusin', '.input-qty', function () {
        $(this).data('oldValue', $(this).val());
    })
    $('.card-list').on('change', '.input-qty', function () {
        valueCurrent = parseInt($(this).val());
        onchangeInput(this);
        itemIndex = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id");
        var cart = JSON.parse(localStorage.cart);
        cart[itemIndex].qty = valueCurrent;
        localStorage.setItem("cart", JSON.stringify(cart));
    })
    $('.card-list').on('keydown', '.input-qty', function (e) {
        onkeydownInput()
    })
    $('.btn-number').click(function (e) {
        e.preventDefault();
        onclickBtn(this)
    })
    $('.input-qty').focusin(function () {
        $(this).data('oldValue', $(this).val());
    })
    $('.input-qty').change(function () {
        onchangeInput(this)
    })
    $('.input-qty').keydown(function (e) {
        e.preventDefault();
        onkeydownInput()
    })

    $(function () {
        $("#datepicker").datepicker();
    });
    var cart = [];
    $(function () {
        if (localStorage.cart == undefined || JSON.parse(localStorage.cart).length == 0) {
            $('.include-cart').hide();
            $('.empty-cart').show();
        }
        else {
            $('.include-cart').show();
            $('.empty-cart').hide();
        }
    })
    $(function () {
        if (localStorage.cart) {
            // load cart data from local storage
            cart = JSON.parse(localStorage.cart);
            $('.num-cart').text(JSON.parse(localStorage.cart).length || 0);
            showCart();  // display cart that is loaded into cart array
        }
    });
    function saveCart() {
        if (window.localStorage) {
            localStorage.cart = JSON.stringify(cart);
            $('.num-cart').text(JSON.parse(localStorage.cart).length);
        }
    }
    $('.card-list').on('click', '.trash', function () {
        var itemId = $(this).parent().parent().parent().parent().parent().attr("id");
        var cart = JSON.parse(localStorage.cart);
        var indexOfItem;
        $.each(cart, function (index, value) {
            console.log("index", cart, value.id, itemId);
            if (value.id == itemId) {
                indexOfItem = index;
            }
        });
        var newcart = cart.splice(indexOfItem, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    })
    function showCart() {
        $(".card-list").empty();

        for (var i in cart) {
            var item = cart[i];
            var product = `<div class="card product-card mb-4 pb-4" id = ` + item.id + `>
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="product-card-img">
                        <img src="../img/order-img.png" class="card-img-top" alt="new img">
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body d-flex align-items-start justify-content-between flex-wrap">
                        <div class="w-75">
                            <h6 class="card-title mb-4">`
                + item.name +
                `</h6> <p class="card-text mb-4">`
                + item.details +
                `</p> 
                        </div>
                        <div class="w-25">
                            <p class='price p-0 mb-5 text-end'>
                                <span class="new-price">`
                + item.newPrice + `</span>
                                <span class="old-price">`
                + item.oldPrice

                + `</span>
                        </p>
                    </div>
            <div class="w-100 d-flex align-items-center justify-content-between">
                <div class="amount">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-number" data-type="plus"
                                data-field="quant[` + i + `]">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                                    </span>
                                    <input type="text" name="quant[` + i + `]" class=" input-qty" value=` + item.qty + ` 
                                        min="1" max="100">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-number" data-type="minus"
                                                data-field="quant[` + i + `]">
                                                <i class="fa-solid fa-minus"></i> </button>
                                        </span>
                                        <span class="me-3">كرتون</span>
                                </div>
                            </div>
                            <button class=" btn btn-gray-bg trash">
                            <svg>
                                <use href="../icons.svg#trash"></use>
                            </svg>
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>`
            $(".card-list").append(product);
        }
    }
    function addToCart(item) {
        var name = $(item).parent('.card-body').find(".card-title").text() || $('.card').find(".card-title").text();
        var details = $(item).parent('.card-body').find("p.card-text").text() || $('.card').find("p.card-text").text();
        var newPrice = $(item).parent('.card-body').find(".price").find(".new-price").text() || $('.card').find(".price").find(".new-price").text();
        var oldPrice = $(item).parent('.card-body').find(".price").find(".old-price").text() || $('.card').find(".price").find(".old-price").text();
        var qty = parseInt($('.card').find(".input-qty").val() || 1);
        var id = parseInt($(item).parent('.card-body').parent().attr("id"));
        // var id = localStorage.cart == undefined ? 0 : JSON.parse(localStorage.cart).length;

        // update Qty if product is already present
        for (var i in cart) {
            if (cart[i].name == name) {
                cart[i].qty++;  // replace existing Qty
                showCart();
                saveCart();
                return;
            }
        }

        var item = { name: name, details: details, newPrice: newPrice, oldPrice: oldPrice, qty: qty, id: id };
        cart.push(item);

        saveCart();
        showCart();
    }
    $('.add-to-cart').parent().find('.amount').hide();

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
        $(this).hide();
        $(this).parent().find('.amount').show();
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
    
    $('.custom-radio input[type="radio"]').click(function () {
        var inputValue = $(this).attr("value");

        if (inputValue === 'others') {
            $('.others').show();
        }
        else {
            $('.others').hide();
        }
    });
    AOS.init({
        duration: 1500,
        once: true,
        disable: function () {
            var maxWidth = 800;
            return window.innerWidth < maxWidth;
        }
    });
});