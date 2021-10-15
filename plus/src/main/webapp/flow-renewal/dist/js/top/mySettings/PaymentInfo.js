var PaymentInfo = (function () {
    var $paymentInfoLayer = $("#paymentInfoLayer");

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
    }

    function openPopupLayer() {
        $paymentInfoLayer.css("display", "block");
        drawPaymentInfo();
        $paymentInfoLayer.find("#changePay").off("click").on("click", function () {
            Payment.openPaymentLayer("freelancer");
        });
    }

    function closePopupLayer() {
        $paymentInfoLayer.css("display", "none");
    }

    function drawPaymentInfo() {
        Ajax.executeApi(RestApi.GET.FLOW_BUY_R009, {}, function (dat) {
            var payGubun = Often.null2Void(dat.PAY_GUBUN, "M") === "M" ? "월 결제" : "연 결제";
            $paymentInfoLayer.find("cardNm").text(dat.CARD_NM);
            $paymentInfoLayer.find("cardNum").text(dat.CARD_NUM);
            $paymentInfoLayer.find("cardExpire").text(dat.CARD_EXPIRE_MONTH + "/" + dat.CARD_EXPIRE_YEAR);
            $paymentInfoLayer.find("payGubun").text(payGubun);
        })
    }
})();
