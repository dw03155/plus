var Payment = (function () {

    var $paymentLayer;
    var $targetLayer

    return {
        openPaymentLayer: openPaymentLayer,
        closePaymentLayer: closePaymentLayer,
        tooglePayOptionSelect: tooglePayOptionSelect,
        drawPayInfo: drawPayInfo,
        calculatorPrice: calculatorPrice,
        getPaymentInfo: getPaymentInfo,
        getInitPriceJson: getInitPriceJson,
        convertPrice: convertPrice,
    }

    function openPaymentLayer(type) {

        $paymentLayer = $("#paymentLayer");
        $targetLayer = $("#" + type + "Layer");
        $("#allMainContent").css("display", "none");
        $paymentLayer.find(".js-payment-layer").css("display", "none");
        initSelectCardNumYear();
        drawUserInfo();
        drawPayInfo();
        $("#tempPopup").remove();
        $targetLayer.css("display", "block");
        $paymentLayer.fadeIn(200);

        PaymentEvent.setPayTooltip("Y");
        addPaymentLayerEvent();
    }

    function closePaymentLayer() {
        $paymentLayer.fadeOut(200, function () {
            $("#allMainContent").css("display", "block");
            Company.controlPopup();
        });
    }

    function addPaymentLayerEvent() {
        $paymentLayer.off("click").on("click", PaymentEvent.clickPaymentLayer)
            .off("input").on("input", PaymentEvent.inputPaymentLayer)
            .off("keyup").on("keyup", PaymentEvent.keyupPaymentLayer)
            .off("change").on("change", PaymentEvent.changePaymentLayer);
    }

    function initSelectCardNumYear() {
        var now = new Date();
        var currentYear = now.getFullYear();
        var $expiryYear = $targetLayer.find("#expiryYear");
        var MAX_LENGTH = 11;
        var optionHtml = '';

        $expiryYear.empty();
        optionHtml += "<option value=\"\" selected disabled hidden>YYYY</option>"; //default;
        for (var i = 0; i < MAX_LENGTH; i++) {
            optionHtml += "<option value=\"" + (currentYear + i) + "\">" + (currentYear + i) + "</option>";
        }
        $expiryYear.append(optionHtml);
    }

    function drawUserInfo() {
        $targetLayer.find("#userName").val(_USER_NM);
        $targetLayer.find("#userEmail").val(_USER_EMAIL);
    }

    function drawPayInfo() {
        var isYearPayment = $paymentLayer.find("#payOption").attr("data-option") === "Y";
        var userCount = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "USER_CNT");
        var priceJson = calculatorPrice(userCount, isYearPayment);

        $paymentLayer.find("#userCnt").val(userCount);
        $paymentLayer.find("#price").text(priceJson.PREDICTION_PRICE);
        $paymentLayer.find("#savings").text(priceJson.SAVINGS);
        $paymentLayer.find(".js-pay-gubun")
            .text(i18next.t(isYearPayment ? 'front.common.year' : 'front.common.month'));
    }

    /**
     * 월 금액을 가져온다.
     * @returns {{initPrice: number, addInitPrice: number}} 이용기관 또는 이용기관아이디를 통해 월금액, 추가 금액을 구분해서 가져온다.
     */
    function getInitPriceJson() {
        var isBflow = (_USE_INTT_ID.indexOf("BFLOW_") === 0)
        var isUtlz = (_USE_INTT_ID.indexOf("UTLZ_") === 0)
        var registerTime = _USE_INTT_ID.indexOf("_") > -1 ? _USE_INTT_ID.split('_')[1] : "";
        var initPrice = 0; //디폴트 금액
        var addInitPrice = 0; //인원 추가 금액

        if (isUtlz) {
            initPrice = 5000;
            addInitPrice = 5000;
        }else if ( isBflow && LocalUtil.getSerpYn() === "Y" ) {
            initPrice = 5000;
            addInitPrice = 5000;
        } else if (isBflow && registerTime.length === 12 && registerTime < "200815000000" && registerTime >= "190709200000") {
            initPrice = 5000;
            addInitPrice = 5900;
        } else if (isBflow && registerTime.length === 12 && registerTime < "190709200000" && registerTime >= "190301000000") {
            initPrice = 4000;
            addInitPrice = 4900;
        } else if (isBflow && registerTime.length === 12 && registerTime < "190301000000") {
            initPrice = 3000;
            addInitPrice = 3900;
        } else {
            //BFLOW 현재 가격
            initPrice = 6000;
            addInitPrice = 6000;
        }

        return {
            initPrice : initPrice,
            addInitPrice : addInitPrice,
        }
    }

    /**
     * 공휴일을 한글 -> 영어로 변환 (추후에 클라우드만 RSS 적용 예정)
     * @param gubun Y => 연결제 / M => 월결제
     * @param userCount 인원수
     * @returns {int} 연 or 월에 따른 인원수별 금액
     */
    function getTotalPrice(gubun, userCount) {
        var initPriceJson = getInitPriceJson();
        if ("M" === gubun) {
            return (initPriceJson.initPrice * 10) + (userCount > 10 ? (initPriceJson.addInitPrice * (userCount - 10)) : 0);
        } else if (gubun === "Y") {
            return ((initPriceJson.initPrice - 1000) * 12) * 10 + (userCount > 10 ? ((initPriceJson.addInitPrice - 1000) * 12 * (userCount - 10)) : 0)
        }
    }

    function calculatorPrice(userCount, isYearPayment) {
        var monthPrice = getTotalPrice("M", userCount);
        var yearPrice = getTotalPrice("Y", userCount);
        return {
            PREDICTION_PRICE: userCount > 100 ? i18next.t('front.common.contactUs') : convertPrice(isYearPayment ? yearPrice : monthPrice),
            SAVINGS: userCount > 100 ? i18next.t('front.common.contactUs') : convertPrice(isYearPayment ? (monthPrice * 12) - yearPrice : 0),
        };
    }

    function convertPrice(price) {
        var priceRegex = /\B(?=(\d{3})+(?!\d))/g;
        return price.toString().replace(priceRegex, ",")
    }

    function tooglePayOptionSelect() {
        var $payOptionSelect = $paymentLayer.find("#payOptionSelect");
        if ($payOptionSelect.css("display") === "none") $payOptionSelect.css("display", "block");
        else $payOptionSelect.css("display", "none");
    }

    function getPaymentInfo() {
        var isShowBusinessLayer = $targetLayer.is("#businessLayer");
        var buyerName = getValue("#userName");
        var buyerEmail = getValue("#userEmail");
        var phoneNumber = getValue("#phoneNum");
        var cardNumber = getValue("#cardNum1") + getValue("#cardNum2")
            + getValue("#cardNum3") + getValue("#cardNum4");
        var expiryMonth = getValue("#expiryMonth");
        var expiryYear = getValue("#expiryYear");
        var cardPassword = getValue("#cardPassword");
        var birthday = getValue("#birthdayNum");
        var productName = isShowBusinessLayer ? "business" : "premium"
        var recommendId = getValue("#recommendId");
        var gubun = isShowBusinessLayer ? $paymentLayer.find("#payOption").attr("data-option") : "";
        var price = isShowBusinessLayer ? $paymentLayer.find("#price").text().replace(",", "") : "";
        var userCnt = isShowBusinessLayer ? getValue("#userCnt") : "";
        var initPriceJson = getInitPriceJson();
        var defaultPrice = ("M" === gubun) ? initPriceJson.initPrice * 10 : (initPriceJson.initPrice - 1000) * 10;
        var addUserPrice = ("M" === gubun) ? initPriceJson.addInitPrice : (initPriceJson.addInitPrice - 1000);

        return {
            USER_NM: buyerName,
            EMAIL: buyerEmail,
            CELLPHONE_NUM: phoneNumber,
            CARD_NUM: cardNumber,
            BRDT: birthday,
            CARD_EXPIRE_MONTH: expiryMonth,
            CARD_EXPIRE_YEAR: expiryYear,
            PWD: cardPassword,
            RATE_CNTN: productName,
            RECOMMEND_ID: recommendId,
            GUBUN: gubun,
            PRICE: price,
            USER_CNT: userCnt,
            DEFALUT_PRICE: defaultPrice,
            ADD_USER_PRICE: addUserPrice,
        }

        function getValue(selector) {
            return $targetLayer.find(selector).val();
        }
    }
})();