var PaymentEvent = (function () {

    return {
        clickPaymentLayer: clickPaymentLayer,
        inputPaymentLayer: inputPaymentLayer,
        keyupPaymentLayer: keyupPaymentLayer,
        changePaymentLayer: changePaymentLayer,
        setPayTooltip : setPayTooltip,
    }

    function clickPaymentLayer(e) {

        var $eTarget = $(e.target);


        if (isCalculatorBtnAndAction($eTarget)) return;
        if (isAutoAccountBtnAndAction($eTarget)) return;
        if (isTermsOfServiceBtnAndAction($eTarget)) return;
        if (isPayOptionAndAction($eTarget)) return;
        if (isPayOptionSelectAndAction($eTarget)) return;
        if (isClosePaymentAndAction($eTarget)) return;
        if (isSubmitPaymentAndAction($eTarget)) return;
        if (isPaymentAgreeAndAction($eTarget)) return;
        if (isHelpPaymentBtnAndAction($eTarget)) return;

        function isCalculatorBtnAndAction($eTarget) {
            var $calculatorBtn = $eTarget.findUp("#calculatorBtn");
            if ($calculatorBtn.length === 0) return false;
            e.preventDefault();
            PaymentPopup.openPaymentPopup("calculator");
            return true;
        }

        function isAutoAccountBtnAndAction($eTarget) {
            var $autoAccountBtn = $eTarget.findUp("#autoAccountBtn");
            if ($autoAccountBtn.length === 0) return false;
            PaymentPopup.openPaymentPopup("account");
            return true;
        }

        function isTermsOfServiceBtnAndAction($eTarget) {
            var $termsOfServiceBtn = $eTarget.findUp("#termsOfServiceBtn");
            if ($termsOfServiceBtn.length === 0) return false;
            PaymentPopup.openPaymentPopup("tearm-of-service");
            return true
        }

        function isPayOptionAndAction($eTarget) {
            var $payOption = $eTarget.findUp("#payOption");
            if ($payOption.length === 0) return false;
            Payment.tooglePayOptionSelect();
            return true;
        }


        function isPayOptionSelectAndAction($eTarget) {
            var $payOptionSelect = $eTarget.findUp("#payOptionSelect");
            var $paymentLayer = $("#paymentLayer");
            var $payOption = $paymentLayer.find("#payOption");

            if ($payOptionSelect.length === 0) {
                var isOptionSelectVisible = $paymentLayer.find("#payOptionSelect").is(":visible");
                isOptionSelectVisible && $paymentLayer.find("#payOptionSelect").css("display", "none");
                return false;
            }

            var $yearSelect = $eTarget.findUp("#yearSelect");
            var $monthSelect = $eTarget.findUp("#monthSelect");

            if ($yearSelect.length !== 0 && $payOption.attr("data-option") === "M") {
                $payOption.html($yearSelect.find("div").html());
                $payOption.attr("data-option", "Y");
                $yearSelect.insertBefore($payOptionSelect.find("#monthSelect"));
                setPayTooltip("Y");
            } else if ($monthSelect.length !== 0 && $payOption.attr("data-option") === "Y") {
                $payOption.html($monthSelect.find("div").html());
                $payOption.attr("data-option", "M");
                $monthSelect.insertBefore($payOptionSelect.find("#yearSelect"));
                setPayTooltip("M");
            } else {
                //pass
            }

            Payment.drawPayInfo();
            Payment.tooglePayOptionSelect();
            return true;
        }

        function isClosePaymentAndAction($eTarget) {
            var $closePayment = $eTarget.findUp("#closePayment");
            if ($closePayment.length === 0) return false;
            PopupDraw.drawConfirm({
                contents: {
                    main: i18next.t('front.common.ask', {
                        val: '$t(dictionary.payment)',
                        status: '$t(dictionary.cancel)'
                    })
                },
                callback: {submit: Payment.closePaymentLayer},
            })
            return true;
        }

        function isSubmitPaymentAndAction($eTarget) {
            var $submitPayment = $eTarget.findUp("#submitPayment");
            if ($submitPayment.length === 0) return false;
            if (isCheckError()) return true;
            $("#waitPaymentPopup").css("display", "block");
            executePayment();
            return true;
        }

        function isPaymentAgreeAndAction($eTarget) {
            var $paymentAgree = $eTarget.findUp("#paymentAgree");
            if ($paymentAgree.length === 0) return false;
            checkValid($paymentAgree);
            return true;
        }

        function isHelpPaymentBtnAndAction($eTarget) {
            var $helpPaymentBtn = $eTarget.findUp("#helpPaymentBtn");
            if ($helpPaymentBtn.length === 0) return false;
            OpenUtil.openWindow("https://support.flow.team/hc/ko/sections/360000324191", "help_payment");
            return true;
        }
    }
    /**
     * 공휴일을 한글 -> 영어로 변환 (추후에 클라우드만 RSS 적용 예정)
     * @param gubun Y => 연결제 / M => 월결제
     * 연 or 월에 따른 툴팁 금액 변경
     */
    function setPayTooltip(gubun){
        var $paymentLayer = $("#paymentLayer");

        var monthPrice = Payment.getInitPriceJson().initPrice;
        if ("Y" === gubun){
            monthPrice += -1000;
        }else if ("M" === gubun){
            //done.
        }
        $paymentLayer.find("#monthPriceSub").text(Payment.convertPrice(monthPrice));
        $paymentLayer.find("#monthPriceMain").text(Payment.convertPrice(monthPrice*10));
    }

    function executePayment() {
        var payInfoJson = Payment.getPaymentInfo();
        if ("" === payInfoJson.RECOMMEND_ID) {
            executeIamportPayment(payInfoJson);
            return;
        }

        Ajax.executeApi(RestApi.GET.FLOW_BUY_R007, {
            RECOMMEND_ID: payInfoJson.RECOMMEND_ID,
        }, function (dat) {
            if (!(dat.USE_YN === "Y" && dat.STTS === "Y")) {
                $("#waitPaymentPopup").css("display", "none");
                Often.toast("error", i18next.t('front.alert.NoRecommenderID'));
                return;
            }
            executeIamportPayment(payInfoJson);
        }, function () {
            $("#waitPaymentPopup").css("display", "none");
            Often.toast("error", i18next.t('front.alert.NoRecommenderID'));
        })
    }

    function executeIamportPayment(payInfoJson) {
        payInfoJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.IAMPORT_PAYMENT_C001, payInfoJson, function (dat) {
            $("#waitPaymentPopup").css("display", "none");
            if ("0" === dat.RESULT_CODE) {
                Often.toast("success", i18next.t('front.alert.cardRegister'));
                location.href = "/main.act";
                return;
            }
            Often.toast("error", dat.RESULT_MSG);
        }, function () {
            $("#waitPaymentPopup").css("display", "none");
            Often.toast("error", i18next.t('back.payment.paymentFail'));
        })
    }

    function inputPaymentLayer(e) {
        var $eTarget = $(e.target);

        if (isNumberInputAndAction($eTarget)) return;

        function isNumberInputAndAction($eTarget) {
            var $numberInput = $eTarget.findUp(".js-number-input");
            if ($numberInput.length === 0) return false;
            $numberInput.val($numberInput.val().replace(/[^0-9]/g, ""));
            return true;
        }
    }

    function keyupPaymentLayer(e) {
        var $eTarget = $(e.target);
        var $paymentLayer = $("#paymentLayer");

        checkValid($eTarget);

        if (isCardNumAndAction($eTarget)) return;
        if (isCardPasswordAndAction($eTarget)) return;

        function isCardNumAndAction($eTarget) {
            var $cardNum1 = $eTarget.findUp("#cardNum1");
            var $cardNum2 = $eTarget.findUp("#cardNum2");
            var $cardNum3 = $eTarget.findUp("#cardNum3");
            var $cardNum4 = $eTarget.findUp("#cardNum4");

            if ($cardNum1.length === 0 && $cardNum2.length === 0 && $cardNum3.length === 0 && $cardNum4.length === 0) {
                return false;
            }

            if ($cardNum1.length !== 0 && $cardNum1.val().length === 4) {
                $paymentLayer.find("#cardNum2").focus();
            } else if ($cardNum2.length !== 0 && $cardNum2.val().length === 4) {
                $paymentLayer.find("#cardNum3").focus();
            } else if ($cardNum3.length !== 0 && $cardNum3.val().length === 4) {
                $paymentLayer.find("#cardNum4").focus();
            } else if ($cardNum4.length !== 0 && $cardNum4.val().length === 4) {
                $paymentLayer.find("#expiryMonth").focus();
            } else {
                //pass
            }
            return true;
        }

        function isCardPasswordAndAction($eTarget) {
            var $cardPassword = $eTarget.findUp("#cardPassword");
            if ($cardPassword.length === 0) return false;
            if ($cardPassword.val().length === 2) {
                $paymentLayer.find("#birthdayNum").focus();
            } else {
                //pass
            }
            return true;
        }
    }

    function changePaymentLayer(e) {
        checkValid($(e.target));
    }

    function checkValid($inputObject) {
        if (!$inputObject.is("input") && !$inputObject.is('select')) return;
        var inputLength = $inputObject.val().length;
        var isUnValid = false;

        var unValidStatusJson = {
            "phoneNum": inputLength < 10,
            "cardPassword": inputLength !== 2,
            "birthdayNum": inputLength < 6,
            "paymentAgree": !$inputObject.is(":checked"),
            "cardNum": inputLength < 4,
            "expiry": Often.null2Void($($inputObject).val(), "") === "",
        };

        var inputId = $inputObject.attr("id");
        if (inputId.indexOf("cardNum") > -1) {
            isUnValid = unValidStatusJson['cardNum'];
        } else if (inputId.indexOf("expiry") > -1) {
            isUnValid = unValidStatusJson['expiry'];
        } else {
            isUnValid = unValidStatusJson[inputId];
        }

        if (!isUnValid || ($inputObject.is("input") && inputLength === 0)) {
            $inputObject.nextAll(".error-text").css("display", "none");
            $inputObject.removeClass("input-error");
        } else {
            $inputObject.nextAll(".error-text").css("display", "block");
            $inputObject.addClass("input-error")
        }
    }

    function isCheckError() {

        var isShowBusinessLayer = $("#businessLayer").is(":visible");
        var $payInfoUl = isShowBusinessLayer ? $("#payInfoUl") : $("#freePaymentUl");
        var $payInput = $payInfoUl.find("input");
        var $paySelect = $payInfoUl.find("select");
        var $paymentAgree = isShowBusinessLayer ? $("#paymentAgree") : $("#paymentConfirmCheck");

        var isError = false;

        $.each($payInput, function (i, v) {
            if ($(v).attr("id") === "recommendId") return;
            if ("" === Often.null2Void($(v).val())) {
                $(v).addClass("input-error");
                isError = isErrorAndShowText($(v));
                return;
            }
            if ($(v).hasClass("input-error")) isError = true;
        })

        $.each($paySelect, function (i, v) {
            if ("" === Often.null2Void($(v).val())) {
                isError = isErrorAndShowText($(v));
            }
        })

        if (!$paymentAgree.is(":checked")) {
            isError = isErrorAndShowText($paymentAgree);
        }

        return isError;

        function isErrorAndShowText($target) {
            $target.nextAll(".error-text").css("display", "block");
            return true;
        }
    }
})();