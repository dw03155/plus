var PaymentPopup = (function () {

    var $paymentPopup;

    var titleJson;

    return {
        openPaymentPopup: openPaymentPopup,
        closePaymentPopup: closePaymentPopup,
    }

    function setTitleJson(){
        titleJson = {
            "calculator": i18next.t('front.payment.rateCalculate'),
            "tearm-of-service": "정기과금 이용약관",
            "account": "계좌 자동출금 신청",
        }
    }

    function openPaymentPopup(popupType) {
        setTitleJson();
        $paymentPopup = $("#paymentPopup");
        $paymentPopup.find("#popupTitle").text(titleJson[popupType]);
        var contentHtml = $("#paymentPopupContent").find(".js-" + popupType + "-item").html();
        $paymentPopup.find("#content").html(contentHtml);
        $paymentPopup.fadeIn(200, function () {
            $paymentPopup.focus();
        });
        drawCalPayInfo();
        addPopupEvent();
    }

    function closePaymentPopup() {
        $paymentPopup.fadeOut(200, function () {
            $paymentPopup.find(".js-popup-content").css("display", "none");
        });
    }

    function addPopupEvent() {
        $paymentPopup.off("click").on("click", clickPaymentPopup)
            .off("input").on("input", inputPaymentPopup)
            .off("keyup").on("keyup", keyupPaymentPopup)
            .off("keydown").on("keydown", keydownPaymentPopup);
    }

    function clickPaymentPopup(e) {
        var $eTarget = $(e.target);

        if (isCloseBtnAndAction($eTarget)) return;
        if (isBackAreaAndAction($eTarget)) return;
        if (isQuestionBtnAndAction($eTarget)) return;
        if (isCalPayOptionAndAction($eTarget)) return;
        if (isCalOptionSelectAndAction($eTarget)) return;
        if (isAutoAccountDownload($eTarget)) return;

        function isCloseBtnAndAction($eTarget) {
            var $closeBtn = $eTarget.findUp("#closeBtn");
            if ($closeBtn.length === 0) return false;
            closePaymentPopup();
            return true;
        }

        function isBackAreaAndAction($eTarget) {
            var $paymentPopupLayer = $eTarget.findUp("#paymentPopupLayer");
            if ($paymentPopupLayer.length !== 0) return false;
            closePaymentPopup();
            return true;
        }

        function isQuestionBtnAndAction($eTarget) {
            var $questionBtn = $eTarget.findUp(".js-question-btn");
            if ($questionBtn.length === 0) return false;
            var isCalculatorPopup = $paymentPopup.find("#popupTitle").text() === titleJson["calculator"];
            var supportParam = !isCalculatorPopup ? "articles/360002586471-비즈니스-버전-결제를-무통장입금해도-되나요-" : "sections/206999008-가격-정책";
            var supportUrl = "http://support.flow.team/hc/ko/" + supportParam;
            window.open(supportUrl, "support_blank");
            return true;
        }

        function isCalPayOptionAndAction($eTarget) {
            var $calPayOption = $eTarget.findUp("#calPayOption");
            if ($calPayOption.length === 0) return false;
            toogleCalPayOptionSelect();
            return true;
        }

        function isCalOptionSelectAndAction($eTarget) {
            var $calOptionSelect = $eTarget.findUp("#calOptionSelect");
            var $calPayOption = $paymentPopup.find("#calPayOption");

            if ($calOptionSelect.length === 0) {
                var isOptionSelectVisible = $paymentPopup.find("#calOptionSelect").is(":visible");
                isOptionSelectVisible && $paymentPopup.find("#calOptionSelect").css("display", "none");
                return false;
            }

            var $yearSelect = $eTarget.findUp("#yearSelect");
            var $monthSelect = $eTarget.findUp("#monthSelect");

            if ($yearSelect.length !== 0 && $calPayOption.attr("data-option") === "M") {
                $calPayOption.html($yearSelect.find("div").html());
                $calPayOption.attr("data-option", "Y");
                $yearSelect.insertBefore($calOptionSelect.find("#monthSelect"));
            } else if ($monthSelect.length !== 0 && $calPayOption.attr("data-option") === "Y") {
                $calPayOption.html($monthSelect.find("div").html());
                $calPayOption.attr("data-option", "M");
                $monthSelect.insertBefore($calOptionSelect.find("#yearSelect"));
            } else {
                //pass
            }
            drawCalPayInfo();
            toogleCalPayOptionSelect();
            return true;
        }

        //자동이체 동의서 다운로드
        function isAutoAccountDownload($eTarget) {
            var $autoAccountDownload = $eTarget.findUp("#autoAccountDownload");
            if ($autoAccountDownload.length === 0) return false;
            var duid = Often.getCookie("FLOW_DUID");
            var fileUrl = "";
            if (ServerChecker.isReal) { //자동이체 동의서 flowtest에서 다운로드 안되는 부분 처리
                fileUrl = "https://" + location.hostname + "/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904152320046_1caa0535-8f56-4fce-bf00-ad4e1ef73b26&ATCH_SRNO=2598205&OBJ_CNTS_NM=&DUID=" + duid;
            } else {
                fileUrl = "https://flowtest.info/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_20210527971744_4c6f5265-c887-4308-9618-2254607df1fe&ATCH_SRNO=1036381&OBJ_CNTS_NM=&DUID=" + duid;
            }
            window.open(fileUrl, "_parent");
            return true
        }
    }

    function inputPaymentPopup(e) {
        var $eTarget = $(e.target);

        if (isCalUserCntAndAction($eTarget)) return;

        function isCalUserCntAndAction($eTarget) {
            var $calUserCnt = $eTarget.findUp("#calUserCnt");
            if ($calUserCnt.length === 0) return false;
            $calUserCnt.val($calUserCnt.val().replace(/[^0-9]/g, ""));
            return true;
        }
    }

    function keyupPaymentPopup(e) {
        var $eTarget = $(e.target);

        if (isCalUserCntAndAction($eTarget)) return;

        function isCalUserCntAndAction($eTarget) {
            var $calUserCnt = $eTarget.findUp("#calUserCnt");
            if ($calUserCnt.length === 0) return false;
            if ($calUserCnt.val() !== "" && Number($calUserCnt.val()) === 0) $calUserCnt.val("1");
            drawCalPayInfo();
            return true;
        }
    }

    function keydownPaymentPopup(e) {
        if (!KeyCheck.isKey(e, "ESC")) return;
        closePaymentPopup();
    }

    function toogleCalPayOptionSelect() {
        var $calOptionSelect = $paymentPopup.find("#calOptionSelect");
        if ($calOptionSelect.is(":visible")) $calOptionSelect.css("display", "none");
        else $calOptionSelect.css("display", "block");
    }

    function drawCalPayInfo() {
        var isYearPayment = $paymentPopup.find("#calPayOption").attr("data-option") === "Y";
        var userCnt = $paymentPopup.find("#calUserCnt").val();
        var priceJson = Payment.calculatorPrice(userCnt, isYearPayment);
        var isOverUserCnt = userCnt > 100;
        var gubunText = isOverUserCnt ? "" : (" /" + (isYearPayment ? "년" : "월"));
        $paymentPopup.find(".js-cal-gubun").text(gubunText);
        $paymentPopup.find("#calPrice").val((isOverUserCnt ? "" : "₩") + priceJson.PREDICTION_PRICE);
        $paymentPopup.find("#calSavings").val((isOverUserCnt ? "" : "₩") + priceJson.SAVINGS);
    }
})();