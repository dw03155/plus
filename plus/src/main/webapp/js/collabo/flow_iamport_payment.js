/**
 * <pre>
 * (#)
 * JEXSTUDIO PROJECT
 * @COPYRIGHT (c) 2009-2010 WebCash, Inc. All Right Reserved.
 *
 * @File Name    : flow_iamport_payment.js
 * @File path         : COLLABO_PT_STATIC/web/js/collabo
 * @author         : 이수정 ( cubeclock94@gmail.com )
 * @Description  : 아임포트 결제 화면
 * @History         : 20180914023156, 이수정
 * </pre>
 *
 **/
new (Jex.extend({
    onload: function () {
        _this = this;
        //--- todo onload start ---//
    }, event: function () {
        //--- define event action ---//
    }
}))();

var isBflow = typeof _USE_INTT_ID != "undefined" && _USE_INTT_ID.indexOf('BFLOW') > -1;
var isUtlz  = typeof _USE_INTT_ID != "undefined" && _USE_INTT_ID.indexOf('UTLZ') > -1;
var companyRegisterDatetime = typeof _USE_INTT_ID != "undefined" && "20" + _USE_INTT_ID.split('_')[1];
var priceGroupArr = {
    "UTLZ_20210708": {YEAR_PRICE: 40000, YEAR_ADD_PRICE : 4000, MONTH_PRICE: 50000 , MONTH_ADD_PRICE : 5000, IS_YEAR_VERSION : true},
    "SERP"         : {YEAR_PRICE: 40000, YEAR_ADD_PRICE : 4000, MONTH_PRICE: 50000 , MONTH_ADD_PRICE : 5000, IS_YEAR_VERSION : true},
    "201218000000" : {YEAR_PRICE: 50000, YEAR_ADD_PRICE : 5000, MONTH_PRICE: 60000 , MONTH_ADD_PRICE : 6000, IS_YEAR_VERSION : true},
    "200815000000" : {YEAR_PRICE: 50000, YEAR_ADD_PRICE : 5000, MONTH_PRICE: 60000 , MONTH_ADD_PRICE : 6000, IS_YEAR_VERSION : true},
    "190709200000" : {YEAR_PRICE: 40000, YEAR_ADD_PRICE : 4900, MONTH_PRICE: 50000 , MONTH_ADD_PRICE : 5900, IS_YEAR_VERSION : true},
    "190228235959" : {YEAR_PRICE: 40000, YEAR_ADD_PRICE : 4900, MONTH_PRICE: 40000 , MONTH_ADD_PRICE : 4900, IS_YEAR_VERSION : false},
    "911010000000" : {YEAR_PRICE: 30000, YEAR_ADD_PRICE : 3900, MONTH_PRICE: 30000 , MONTH_ADD_PRICE : 3900, IS_YEAR_VERSION : false},
}

var defalutMonthPrice
var defalutMonthAddPrice
var defalutYearPrice
var defalutYearAddPrice

var payText = function(){

    var payTextPackage = {}

    return {
        get : get
    }

    function get(key){
        if(payTextPackage[key]){
            //pass
        } else {
            payTextPackage = {
                VAT : c18n("FIP1539","부가세별도"),
                MONTH : c18n("ui.pay.monthly","/월"),
                YEAR : c18n("ui.pay.yearly", "/년"),
                YEARLY_PAY : c18n("ui.pay.yearly.payment","연간 정기 결제"),
                MONTHLY_PAY : c18n("ui.pay.monthly.payment","월간 정기 결제"),
                DISCOUNT_PAY : c18n("ui.pay.discount","할인"),
                INFO1 : c18n("ui.pay.cont2","예상 금액은 현재 사용 인원 기준으로 계산되며, <br>사용 인원에 따라 결제 금액이 변경될 수 있습니다."),
                INFO2 : c18n("ui.pay.cont3","10명까지 월 $1원 적용,<br>10명 초과 시, 인원당 월 $2원 적용됩니다."),
                DISCOUNT_MESSAGE1  : c18n("ui.pay.cont4","연간 $1원 절약!"), //EN : $1won/year will be saved!
                DISCOUNT_MESSAGE2  : c18n("ui.pay.cont5","연간 결제시 $1원 절약 가능."), //EN : $1won/year will be saved.
            }
        }
        return payTextPackage[key];
    }
}();

// 이용약관
var billingTerms = (function () {

    var paymentLayer;
    var productName = "";
    var userCount;
    var calcUserCount = 0;
    var openBusinessUpgradeFinishedLayerWhenClose = false;
    var isInit = false;
    var billingTermsLayer;


    function init() {

        billingTermsLayer = $("#billingTerms");

        //정기 과금 이용 약관 취소
        billingTermsLayer.find(".closebtn").on("click", function (e) {
            close();
        });

        //정기 과금 이용 약관 동의
        billingTermsLayer.find(".btnStyle_ht50").on("click", function (e) {
            upgrade.goToPayment();
        });

        isInit = true;
    }

    function open(prodName, notOpenBusinessUpgradeFinishedLayerWhenClosed) {
        if (!isInit) {
            init();
        }

        if (!prodName && !notOpenBusinessUpgradeFinishedLayerWhenClosed) {
            if (!billingTermsLayer.hasClass("new_payment")) {
                billingTermsLayer.addClass("new_payment");
            }
        } else {
            if (billingTermsLayer.hasClass("new_payment")) {
                billingTermsLayer.removeClass("new_payment");
            }
            if (prodName) {
                productName = prodName;
            }
            if (notOpenBusinessUpgradeFinishedLayerWhenClosed) {
                openBusinessUpgradeFinishedLayerWhenClose = !notOpenBusinessUpgradeFinishedLayerWhenClosed;
            }
        }

        LayerPopupUtil.attachCloseEventListener(billingTermsLayer, null, function () {
            close()
        });
        billingTermsLayer.fadeIn(200);

    }

    function close() {
        productName = "";
        billingTermsLayer.hide();
    }

    return {
        open: open,
        close: close
    }
})();

function isSpecialUseInttId(){
    var specialUseInttIds = [
        'BFLOW_180710162729',
        'BFLOW_190524113347'
    ];
    var isCheckSpecialUseInttId = false;
    specialUseInttIds.forEach(function(v){
        isCheckSpecialUseInttId = isCheckSpecialUseInttId || (_USE_INTT_ID.indexOf(v) > -1)
    })
    return isCheckSpecialUseInttId
}

// 결제팝업 및 결제
var payment = (function () {

    var working = false;

    var Product = {
        BUSINESS: "business",
        PREMIUM: "premium"
    };

    Object.freeze(Product);

    var defaultView = (function () {

        var isInit = false;

        var paymentCancelConfirm = (function () {

            var isInit = false;
            var cancelConfirmLayer;

            function init() {

                cancelConfirmLayer = paymentLayer.find("#cancelPaymentLayerPopup");

                cancelConfirmLayer.find("#no").on("click", function () {
                    close();
                });

                cancelConfirmLayer.find("#yes").on("click", function () {
                    close();
                    paymentLayer.hide();
                    paymentLayer.find("#paymentLayer").hide();
                    paymentLayer.find("#newpaymentLayer").hide();

                    var stts = $("#serviceBlockPopup").find('#title').attr('stts');
                    var grc_dt = $('#serviceBlockPopup').attr('grc_dt');
                    if(stts !== 'businessPaymentFailMember' && stts !== 'businessPaymentFailManager' && stts !== 'businessAccountBlock' && cnts_Null2Void(grc_dt, "0").indexOf("-") > -1) {
                        fn_openServiceBlockPopup('businessPaymentFailManager');
                    }
                });

                isInit = true;
            }

            function show(paymentInputLayer) {

                if (!isInit) {
                    init(paymentInputLayer);
                }

                cancelConfirmLayer.fadeIn(200);
                LayerPopupUtil.attachCloseEventListener(cancelConfirmLayer, cancelConfirmLayer.find("div.dim-bg"), function () {
                    close()
                });
            }

            function close() {
                cancelConfirmLayer.hide();
                fn_buyYn(true);
            }

            return {
                show: show
            }
        })();

        function init(paymentInputLayer) {

            paymentLayer = $("#iamportPaymentLayer");

            paymentLayer.find("#paymentMessage").find("#payWithBankTransfer").on("click", function () {
                bankTransferPayment.open();
            });

            paymentLayer.find("#showAmountCalculator").on("click", function () {
                if ($(document).find("#payOption").attr("data") == "M") {
                    flowAmountCalculator.open("M");
                } else {
                    flowAmountCalculator.open("Y");
                }
            });

            if ((isBflow && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                paymentLayer.find("#showAmountCalculator").show();
            } else {
                paymentLayer.find("#showAmountCalculator").hide();
            }

            paymentLayer.find("#payToolTipHover").hover(
                function () {
                    var tenPrice = "";
                    var addPrice = "";
                    var isYearMode = $(document).find("#payOption").attr("data") == "Y";

                    if (isUtlz) {
                        return;
                    }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                        tenPrice = isYearMode ? priceGroupArr["SERP"].YEAR_PRICE : priceGroupArr["SERP"].MONTH_PRICE;
                        addPrice = isYearMode ? priceGroupArr["SERP"].YEAR_ADD_PRICE : priceGroupArr["SERP"].MONTH_ADD_PRICE;
                    }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                        tenPrice = isYearMode ? priceGroupArr["201218000000"].YEAR_PRICE : priceGroupArr["201218000000"].MONTH_PRICE;
                        addPrice = isYearMode ? priceGroupArr["201218000000"].YEAR_ADD_PRICE : priceGroupArr["201218000000"].MONTH_ADD_PRICE;
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                        tenPrice = isYearMode ? "50,000" : "60,000";
                        addPrice = isYearMode ? "5,000" : "6,000";
                    } else if ((isBflow > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                        tenPrice = isYearMode ? "40,000" : "50,000";
                        addPrice = isYearMode ? "4,900" : "5,900";
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "190228235959") {
                        tenPrice = "40,000";
                        addPrice = "4,900";
                    } else {
                        tenPrice = "30,000";
                        addPrice = "3,900";
                    }
                    paymentLayer.find("#payPrice").children().eq(0).append("" +
                        "<div class='user_tooltip'><div class='tip_cont'>" +
                            payText.get("INFO1") + "<br><br>" +
                            payText.get("INFO2").replace("$1", tenPrice).replace("$2", addPrice)
                        + "</div></div>"
                    )
                    ;
                },
                function () {
                    paymentLayer.find("#payPrice").find("div[class='user_tooltip']").remove();
                });


            paymentLayer.find("a.close").on("click", function (e) {
                hide();
            });

            paymentLayer.find(".recomPer").children().eq(0).on("click", function (e) {
                if (paymentLayer.find("input[name='recommendId']").css('display') == "none") {
                    paymentLayer.find("input[name='recommendId']").show();
                    paymentLayer.find("dl[class='recomPer']").css('bottom', '21px');
                } else {
                    paymentLayer.find("input[name='recommendId']").hide();
                    paymentLayer.find("dl[class='recomPer']").css('bottom', '64px');
                }
            });

            paymentLayer.find("button[name='executePayment']").on("click", function (e) {
                if ($(this).hasClass("disable") || $(this).hasClass("c-gray")) {
                    // TODO: 가능하다면, flash error input box
                    return;
                }
                submitPaymentInfo(paymentInputLayer);
            });

            initInputEvent(paymentInputLayer);

            isInit = true;
        }

        function initInputEvent(paymentInputLayer) {

            (function setCardExpiryList() {
                var nowYear = nowYear = (new Date()).getFullYear();
                var lastYear = nowYear + 11;
                for (; nowYear < lastYear; nowYear++) {
                    paymentInputLayer.find("ul[name='expiryYearList']").append("<li>" + nowYear + "</li>");
                }
                paymentInputLayer.find("span[name='expiryMonth']").parents("div.lycombo").find("div.lycombo-optn ul").mCustomScrollbar({
                    alwaysShowScrollbar: 1
                });
                paymentInputLayer.find("span[name='expiryYear']").parents("div.lycombo").find("div.lycombo-optn ul").mCustomScrollbar({
                    alwaysShowScrollbar: 1
                });
            })();

            function moveToNextTabIndex(nowTabIndex) {
                var nextTabIndex = Number(nowTabIndex) + 1;
                var nextTabIndexDiv = paymentInputLayer.find("div[tabindex=" + nextTabIndex + "]");
                var nextTabIndexInput = paymentInputLayer.find("input[tabindex=" + nextTabIndex + "]");

                if (nextTabIndexDiv.length > 0) {
                    nextTabIndexDiv.focus();
                } else { // nextTabIndexInput exist
                    nextTabIndexInput.focus();
                }
            }

            paymentInputLayer.find("div.lycombobox div.lycombo-optn ul").find("li").on("click", function (e) {
                setCardExpiredInfo($(this).parents("div.lycombo"), $(this).parents("div.lycombo-optn"), $(this));
            });

            if ((_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                paymentInputLayer.find("#paymentMethod").find("div.lycombo-optn ul").find("li").on("click", function (e) {
                    setPaymentInfo($(this).parents("#paymentMethod"), $(this).parents("div.lycombo-optn"), $(this));
                    $(this).prependTo($(this).parent());
                });
            } else {

            }

            function setPaymentInfo(targetObj, liLayerObj, value) {
                var numberCommaRegexp = /\B(?=(\d{3})+(?!\d))/g;
                var numUserCount = Number(userCount);
                var monthMoney, yearMoney, payResult, disCountMoney;

                // var monthBasicMoney = 50000;
                // var monthAddMoney = 5900;
                // var yearBasicMoney = 40000;
                // var yearAddMoney = 4900;
                var monthBasicMoney;
                var monthAddMoney;
                var yearBasicMoney;
                var yearAddMoney;

                if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                    monthBasicMoney = priceGroupArr["UTLZ_20210708"].MONTH_PRICE;
                    monthAddMoney = priceGroupArr["UTLZ_20210708"].MONTH_ADD_PRICE;
                    yearBasicMoney = priceGroupArr["UTLZ_20210708"].YEAR_PRICE;
                    yearAddMoney = priceGroupArr["UTLZ_20210708"].YEAR_ADD_PRICE;
                }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                    monthBasicMoney = priceGroupArr["SERP"].MONTH_PRICE;
                    monthAddMoney = priceGroupArr["SERP"].MONTH_ADD_PRICE;
                    yearBasicMoney = priceGroupArr["SERP"].YEAR_PRICE;
                    yearAddMoney = priceGroupArr["SERP"].YEAR_ADD_PRICE;;
                }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                    monthBasicMoney = priceGroupArr["201218000000"].MONTH_PRICE;
                    monthAddMoney = priceGroupArr["201218000000"].MONTH_ADD_PRICE;
                    yearBasicMoney = priceGroupArr["201218000000"].YEAR_PRICE;
                    yearAddMoney = priceGroupArr["201218000000"].YEAR_ADD_PRICE;;
                } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                    monthBasicMoney = 60000;
                    monthAddMoney = 6000;
                    yearBasicMoney = 50000;
                    yearAddMoney = 5000;
                } else {
                    monthBasicMoney = 50000;
                    monthAddMoney = 5900;
                    yearBasicMoney = 40000;
                    yearAddMoney = 4900;
                }

                if (value.find("em")) {

                    payResult = (monthBasicMoney + (numUserCount - 10) * monthAddMoney);
                    monthMoney = payResult * 12;
                    yearMoney = (yearBasicMoney + (numUserCount - 10) * yearAddMoney) * 12;
                    disCountMoney = monthMoney - yearMoney;

                    $("#payPrice").children().next().remove();
                    var tempHtml, defaultMonthlyPrice, defaultYearlyPrice, defaultSavePrice;

                    if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                        defaultMonthlyPrice = 50000;
                        defaultYearlyPrice = 480000;
                        defaultSavePrice = 120000;
                    }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                        defaultMonthlyPrice = 50000;
                        defaultYearlyPrice = 480000;
                        defaultSavePrice = 120000;
                    }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                        defaultMonthlyPrice = 60000;
                        defaultYearlyPrice = 600000;
                        defaultSavePrice = 120000;
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                        defaultMonthlyPrice = 60000;
                        defaultYearlyPrice = 600000;
                        defaultSavePrice = 120000;
                    } else {
                        defaultMonthlyPrice = 50000;
                        defaultYearlyPrice = 480000;
                        defaultSavePrice = 120000;
                    }

                    var monthlyPrice = String((numUserCount > 10) ? payResult : defaultMonthlyPrice).replace(numberCommaRegexp, ',');
                    var yearlyPrice = String((numUserCount > 10) ? yearMoney : defaultYearlyPrice).replace(numberCommaRegexp, ',');
                    var savePrice = String((numUserCount > 10) ? disCountMoney : defaultSavePrice).replace(numberCommaRegexp, ',');

                    if (value.context.id == "#monthPay") {
                        tempHtml = $("<p class='text'>₩<span>" + monthlyPrice + "</span> " + payText.get("MONTH") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                            "(" + payText.get("VAT") + ")</span>"
                        )
                    } else {
                        tempHtml = $("<p class='text'>₩<span>" + yearlyPrice + "</span> " + payText.get("YEAR") +"</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "(" + payText.get("VAT") + ")</span>")
                    }

                    $("#payPrice").append(tempHtml)
                    $("#payOption").attr("data", value.context.id == "#monthPay" ? "M" : "Y");
                    $("#payToolTip").val(userCount);
                    targetObj.find("#payOption").text("");
                    targetObj.find("#payOption").append(value.html());
                }

                if (!targetObj.hasClass("ok")) {
                    targetObj.addClass("ok");
                }
                closeLycomboOption(liLayerObj);
            }

            function setCardExpiredInfo(targetObj, liLayerObj, value) {
                targetObj.find("div.lycombo-select > span").text(value.text());
                if (!targetObj.hasClass("ok")) {
                    targetObj.addClass("ok");
                }
                closeLycomboOption(liLayerObj);
            }

            paymentInputLayer.find("div.lycombo-select .lycombo-click").on("click", onClickLycomboEventListener);
            paymentInputLayer.find("div.lycombo-select span").on("click", onClickLycomboEventListener);

            function onClickLycomboEventListener(e) {
                e.stopPropagation();
                if ($(e.target).parents("#paymentMethod").attr("id") != "paymentMethod") {
                    openLycomboOption($(e.target).parents("div.lycombo").find("div.lycombo-optn"));
                } else {
                    if ((_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                        openLycomboOption($(e.target).parents("div.lycombo").find("div.lycombo-optn"));
                    } else {
                        //done
                    }
                }
            }

            paymentInputLayer.find("div.lycombobox div.lycombo-optn ul").find("li").on("mouseover", function () {
                $(this).parents("ul").find("li.on").removeClass("on");
            });

            // lycombo keyboard event
            paymentInputLayer.find("div.tab_focus").on("focus", function () {
                if (paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible").length > 0) {
                    closeLycomboOption(paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible"));
                }
                openLycomboOption($(this).find("div.lycombo-optn"));
            });

            var cardExpiredSearchText = "";
            paymentInputLayer.find("div.tab_focus").on("keydown", function (e) {
                if (e.key === "Tab") {
                    if (!e.shiftKey) {
                        var targetObj = paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible");
                        if (targetObj.length > 0) {
                            setCardExpiredInfo(targetObj.parents("div.lycombo"), targetObj, targetObj.find("li.on"));
                        }
                    }
                    cardExpiredSearchText = "";
                } else {
                    if (/[0-9]/ig.test(e.key)) {
                        e.preventDefault();
                        cardExpiredSearchText += e.key;
                        focusLycomboLi($(this), cardExpiredSearchText);
                    } else {
                        cardExpiredSearchText = "";
                    }
                }
            });

            function focusLycomboLi(targetObj, searchText) {
                targetObj.find("div.lycombo-optn").find("ul li").each(function (i, v) {
                    if ($(v).text().indexOf(searchText) > -1) {

                        targetObj.find("div.lycombo-optn").find("ul li.on").removeClass("on");
                        $(v).addClass("on");
                        targetObj.find("div.lycombo-optn .mCustomScrollbar").mCustomScrollbar("scrollTo", $(v), {
                            scrollInertia: "100",
                            scrollEasing: "easeOut"
                        });

                        if ($(v).text() === searchText) { // 정확히 일치하는 경우
                            setCardExpiredInfo(targetObj.find("div.lycombo"), targetObj.find("div.lycombo-optn"), $(v));
                            moveToNextTabIndex(targetObj.attr("tabindex"));
                            cardExpiredSearchText = "";
                        }

                        return false;
                    }
                });
            }

            function closeLycomboWhenBlankClickEventListener(e) {
                if (!$(e.target).is("div.lycombo")) {
                    if (paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible").length > 0) {
                        closeLycomboOption(paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible"));
                    }
                }
            }

            function openLycomboOption(target) {
                target.find("ul").find("li:first").addClass("on");
                target.fadeIn(100);
                $(document).on("keyup", lyComboFocusMover);
                $(document).on("click", closeLycomboWhenBlankClickEventListener);
            }

            function closeLycomboOption(target) {
                $(document).off("click", closeLycomboWhenBlankClickEventListener);
                $(document).off("keyup", lyComboFocusMover);
                target.find("ul").find("li.on").removeClass("on");
                updateButtonEnability(paymentInputLayer);
                target.hide();
            }

            function lyComboFocusMover(e) {
                e.preventDefault();
                if (paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible").length === 0) {
                    $(document).off("keyup", lyComboFocusMover);
                    return;
                }

                var comboLayer = paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible");
                var ulLayer = comboLayer.find("ul");
                if (e.keyCode === 40) {
                    if (ulLayer.find("li.on").length > 0) {
                        if (ulLayer.find("li.on").next().length > 0) {
                            ulLayer.find("li.on").next().addClass("on").prev().removeClass("on");
                        }
                    } else {
                        ulLayer.find("li:first").addClass("on");
                    }
                    if (ulLayer.hasClass("mCustomScrollbar")) {
                        adjustScrollView("down", ulLayer);
                    }
                } else if (e.keyCode === 38) {
                    if (ulLayer.find("li.on").length > 0) {
                        if (ulLayer.find("li.on").prev().length > 0) {
                            ulLayer.find("li.on").prev().addClass("on").next().removeClass("on");
                        }
                    } else {
                        ulLayer.find("li:first").addClass("on");
                    }
                    if (ulLayer.hasClass("mCustomScrollbar")) {
                        adjustScrollView("up", ulLayer);
                    }
                } else if (e.keyCode === 13) {//enter
                    setCardExpiredInfo(comboLayer.parents("div.lycombo"), comboLayer, ulLayer.find("li.on"));
                    moveToNextTabIndex(comboLayer.parents("div.tab_focus").attr("tabindex"));
                } else if (e.keyCode === 27) {

                    closeLycomboOption(comboLayer);
                }
            }

            function adjustScrollView(direction, scrollLayer) {
                var scrolledHeight = scrollLayer.find(".mCSB_container").css("top").replace("px", "") * -1;
                var boxHeight = scrollLayer.find(".mCustomScrollBox").height();
                var prevLiObjsHeight = scrollLayer.find("li.on").height() * scrollLayer.find("li.on").attr("value");

                if (direction === "down") {
                    if (prevLiObjsHeight >= boxHeight + scrolledHeight) {
                        scrollLayer.mCustomScrollbar("scrollTo", function () {
                            return (scrollLayer.find("li.on").attr("value") * scrollLayer.find("li.on").height()) - boxHeight + scrollLayer.find("li.on").height();
                        }, {
                            scrollInertia: "100",
                            scrollEasing: "easeOut"
                        });
                    }
                } else { // if (direction === "up")
                    if (prevLiObjsHeight <= scrolledHeight) {
                        scrollLayer.mCustomScrollbar("scrollTo", function () {
                            return scrollLayer.find("li.on").attr("value") * scrollLayer.find("li.on").height();
                        }, {
                            scrollInertia: "100",
                            scrollEasing: "easeOut"
                        });
                    }
                }
            }

            paymentInputLayer.find("input[name='buyerName']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputEventListener);
            paymentInputLayer.find("input[name='buyerEmail']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputEventListener);
            paymentInputLayer.find("input[name='cardNum1']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputCardCheckEventListener);
            paymentInputLayer.find("input[name='cardNum2']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputCardCheckEventListener);
            paymentInputLayer.find("input[name='cardNum3']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputCardCheckEventListener);
            paymentInputLayer.find("input[name='cardNum4']").on("focus", focusInLycomboCloseEventListener).on("focusout", focusOutEventListener).on("input", onInputCardCheckEventListener);
            paymentInputLayer.find("input[name='cardPwNum']").on("focus", focusInLycomboCloseEventListener).on("focusout", focusOutEventListener).on("input", onInputCardCheckEventListener);
            paymentInputLayer.find("input[name='birthdayNum']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputBlockNotNumberEventListener);
            paymentInputLayer.find("input[name='recommendId']").on("focus", focusInEventListener).on("input", onInputBlockNotWordNumberEventListener);
            paymentInputLayer.find("input[name='buyerNumber']").on("focus", focusInEventListener).on("focusout", focusOutEventListener).on("input", onInputBlockNotNumberEventListener);

            paymentInputLayer.find("input[name='buyerNumber']").bind('paste', function (e) {
                var el = $(this);
                var res;
                setTimeout(function () {
                    var text = $(el).val();
                    res = text.replace(/[^0-9]/g, "");
                    paymentInputLayer.find("input[name='buyerNumber']").val(res);
                }, 100);
            });

            paymentInputLayer.find("#paymentTermsLink").on("click", function () {
                billingTerms.open();
            });

            paymentInputLayer.find("#paymentTermsLink2").on("click", function () {
                billingTerms.open();
            });

            paymentInputLayer.find("input[name='agreeWithThePaymentTerms']").on("click", function () {
                updateButtonEnability(paymentInputLayer);
            }).on("keyup", function (e) {
                if (e.keyCode === 13) {
                    $(this).prop("checked", !$(this).prop("checked"));
                    updateButtonEnability(paymentInputLayer);
                }
            });

            function onInputEventListener(e) {
                updateButtonEnability(paymentInputLayer);
            }

            function onInputCardCheckEventListener(e) {
                onInputBlockNotNumberEventListener(e);
                if ($(e.target).is("input[name='cardPwNum']")) {
                    if ($(e.target).val().length === 2) {
                        paymentInputLayer.find("input[name='birthdayNum']").focus();
                    }
                } else {
                    if ($(e.target).val().length === 4) {
                        if ($(e.target).is("input[name='cardNum1']")) {
                            paymentInputLayer.find("input[name='cardNum2']").focus();
                        } else if ($(e.target).is("input[name='cardNum2']")) {
                            paymentInputLayer.find("input[name='cardNum3']").focus();
                        } else if ($(e.target).is("input[name='cardNum3']")) {
                            paymentInputLayer.find("input[name='cardNum4']").focus();
                        } else if ($(e.target).is("input[name='cardNum4']")) {
                            paymentInputLayer.find("div.tab_focus:first").focus();
                        }
                    }
                }
            }

            function onInputBlockNotNumberEventListener(e) {
                blockNotNumber(e);
                updateButtonEnability(paymentInputLayer);
            }

            function onInputBlockNotWordNumberEventListener(e) {
                blockNotWordNumber(e);
            }

            function updateButtonEnability(paymentInputLayer) {
                if (isValid(paymentInputLayer.find("input[name='buyerName']")) &&
                    isValid(paymentInputLayer.find("input[name='buyerEmail']")) &&
                    isValid(paymentInputLayer.find("input[name='buyerNumber']")) &&
                    isValid(paymentInputLayer.find("input[name='cardNum1']")) &&
                    isValid(paymentInputLayer.find("input[name='cardNum2']")) &&
                    isValid(paymentInputLayer.find("input[name='cardNum3']")) &&
                    isValid(paymentInputLayer.find("input[name='cardNum4']")) &&
                    isValid(paymentInputLayer.find("input[name='cardPwNum']")) &&
                    isValid(paymentInputLayer.find("input[name='birthdayNum']")) &&
                    isValid(paymentInputLayer.find("span[name='expiryMonth']")) &&
                    isValid(paymentInputLayer.find("span[name='expiryYear']")) &&
                    paymentInputLayer.find("input[name='agreeWithThePaymentTerms']").prop("checked")
                ) {
                    paymentInputLayer.find("button[name='executePayment']").removeClass("c-gray");
                    paymentInputLayer.find("button[name='executePayment']").removeClass("disable");
                    paymentInputLayer.find("button[name='executePayment']").addClass("c-blue");
                } else {
                    if (!paymentInputLayer.find("button[name='executePayment']").hasClass("disable")) {
                        paymentInputLayer.find("button[name='executePayment']").removeClass("c-blue");
                        paymentInputLayer.find("button[name='executePayment']").addClass("c-gray");
                        paymentInputLayer.find("button[name='executePayment']").addClass("disable");
                    }
                }
            }

            function blockNotNumber(e) {
                $(e.target).val($(e.target).val().replace(/[^0-9]/g, ""));
            }

            function blockNotWordNumber(e) {
                $(e.target).val($(e.target).val().replace(/[^0-9a-zA-Z_\.-@]/g, ""));
            }

            function isValid(inputObject) {
                if (inputObject.is("input")) {
                    var inputLength = inputObject.val().length;
                    if (inputObject.is("input[name='buyerName']")) {
                        return (cnts_Null2Void(inputObject.val()) != "") && !cmf_isSpecialCharacterExist(inputObject.val());
                    } else if (inputObject.is("input[name='buyerEmail']")) {
                        return !cmf_emailcheck(inputObject.val());
                    } else if (inputObject.is("input[name='buyerNumber']")) {
                        return !cmf_pNumber_Validate(inputObject.val());
                    } else if (inputObject.is("input[name='cardNum1']") || inputObject.is("input[name='cardNum2']") || inputObject.is("input[name='cardNum3']")) {
                        return inputLength === 4;
                    } else if (inputObject.is("input[name='cardNum4']")) {
                        return inputLength === 3 || inputLength === 4;
                    } else if (inputObject.is("input[name='cardPwNum']")) {
                        return inputLength === 2;
                    } else if (inputObject.is("input[name='birthdayNum']")) {
                        return inputLength === 6 || inputLength === 10;
                    } else {

                    }
                } else { // expiryMonth, expiryYear
                    return inputObject.parents("div.lycombo").hasClass("ok");
                }
            }

            function focusOutEventListener(e) {
                if ($(e.target).val().trim() === "") {
                    $(e.target).parents("div.inputbox").removeClass("ok error");
                    return;
                }
                if (isValid($(e.target))) {
                    $(e.target).parents("div.inputbox").addClass("ok");
                } else {
                    $(e.target).parents("div.inputbox").addClass("error");
                }
            }

            function focusInEventListener(e) {
                $(e.target).parents("div.inputbox").removeClass("error ok");
            }

            function focusInLycomboCloseEventListener(e) {
                if (paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible").length > 0) {
                    closeLycomboOption(paymentInputLayer.find("div.lycombobox div.lycombo-optn:visible"));
                }
                focusInEventListener(e);
            }

        }

        function clearSubmitFields(paymentInputLayer) {

            paymentInputLayer.find("input[name='buyerName']").val(_USER_NM);
            paymentInputLayer.find("input[name='buyerEmail']").val(_EMAIL);
            paymentInputLayer.find("input[name='buyerNumber']").val("");
            paymentInputLayer.find("input[name='cardNum1']").val("");
            paymentInputLayer.find("input[name='cardNum2']").val("");
            paymentInputLayer.find("input[name='cardNum3']").val("");
            paymentInputLayer.find("input[name='cardNum4']").val("");
            paymentInputLayer.find("input[name='cardPwNum']").val("");
            paymentInputLayer.find("input[name='birthdayNum']").val("");
            paymentInputLayer.find("div.lycombo").removeClass("ok error");
            paymentInputLayer.find("div.inputbox").removeClass("ok error");
            paymentInputLayer.find("span[name='expiryMonth']").text("MM");
            paymentInputLayer.find("span[name='expiryYear']").text("YYYY");

            paymentInputLayer.find("input[name='buyerName']").trigger("focusout");
            paymentInputLayer.find("input[name='buyerEmail']").trigger("focusout");

            paymentInputLayer.find("#payOption").text("");
            if ((_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId() || isUtlz) {
                paymentInputLayer.find("#payOption").append(payText.get("YEARLY_PAY") + "<em class='sale_mark'>20% " + payText.get("DISCOUNT_PAY") +"</em>")
            } else {
                paymentInputLayer.find("#payOption").append(payText.get("MONTHLY_PAY") + "<em></em>")
            }


        }

        function show(paymentInputLayer) {
            if (!isInit) {
                init(paymentInputLayer);
            }

            $("body").css("overflow", "hidden");
            $("#iamportPaymentLayer").css({
                '-ms-overflow-style': 'none',
                '&::-webkit-scrollbar': '{display: none !important}'
            });


//            var scrollLayer = $("#iamportPaymentLayer").find("#paymentLayer");
//            scrollLayer.mCustomScrollbar({
//                setHeight: window.innerHeight - 90,
//                keyboard: {
//                    enable: false
//                }
//            });
//

            var scrollLayer = $("#iamportPaymentLayer").find("#paymentLayer");

            setViewPositionCenter();

            $(window).on('resize', setViewPositionCenter);

            function setViewPositionCenter() {
                scrollLayer.css('height', window.innerHeight - 70);
                scrollLayer.mCustomScrollbar("disable");
                scrollLayer.mCustomScrollbar({
                    setHeight: window.innerHeight - 70
                });
                scrollLayer.mCustomScrollbar("update");
                if (scrollLayer.is(":mcsOverflow")) {
                    scrollLayer.parent().css("padding-top", "140px");
                } else {
                    var paddingTop = Math.max((window.innerHeight - 800) / 2, 140);
                    scrollLayer.parent().css("padding-top", paddingTop + "px");
                }
            }

            clearSubmitFields(paymentInputLayer);
            paymentLayer.show();
            paymentLayer.find("#paymentLayer").fadeIn(200, function () {
                paymentInputLayer.find("input[name='buyerNumber']").focus();
            });

            paymentLayer.find("#newpaymentLayer").fadeIn(200, function () {
                paymentInputLayer.find("input[name='buyerNumber']").focus();
            });


        }

        function isInputFieldBlank() {
            return paymentLayer.find("div.inputbox.ok").length + paymentLayer.find("div.inputbox.error").length === 0;
        }

        function hide(paymentSucceeded) {
            if (!isInputFieldBlank() && !paymentSucceeded) {
                paymentCancelConfirm.show();
            } else {
                paymentLayer.hide();
                paymentLayer.find("#paymentLayer").hide();
                paymentLayer.find("#newpaymentLayer").hide();

                var scrollLayer = $("#iamportPaymentLayer").find("#paymentLayer");
                if (scrollLayer.hasClass("mCustomScrollbar")) {
                    scrollLayer.mCustomScrollbar("destroy");
                }
                $("body").css("overflow", "auto");
                $("#iamportPaymentLayer").css("overflow", "auto");

                fn_buyYn(true);
            }
        }

        return {
            show: show,
            clearSubmitFields: clearSubmitFields,
            hide: hide
        }
    })();

    function submitPaymentInfo(paymentInputLayer) {

        var buyerName = paymentInputLayer.find("input[name='buyerName']").val().trim();
        var buyerEmail = paymentInputLayer.find("input[name='buyerEmail']").val().trim();
        var buyerNumber = paymentInputLayer.find("input[name='buyerNumber']").val().trim();
        var cardNumber = paymentInputLayer.find("input[name='cardNum1']").val() + paymentInputLayer.find("input[name='cardNum2']").val() + paymentInputLayer.find("input[name='cardNum3']").val() + paymentInputLayer.find("input[name='cardNum4']").val();
        var expiryMonth = paymentInputLayer.find("span[name='expiryMonth']").text();
        var expiryYear = paymentInputLayer.find("span[name='expiryYear']").text();
        var twoPassword = paymentInputLayer.find("input[name='cardPwNum']").val();
        var birthday = paymentInputLayer.find("input[name='birthdayNum']").val();
        var productName = paymentInputLayer.find("button[name='executePayment']").attr("product-name");
        var recommend_id = paymentInputLayer.find("input[name='recommendId']").val();
        var gubun = paymentInputLayer.find("#payOption").attr("data");
        var price = paymentInputLayer.find("#payPrice").children().children('span').text().replace(/,/g, '');
        var user_cnt = paymentInputLayer.find("#payToolTip").val();

        var defalutPrice = gubun === "Y" ? defalutYearPrice : defalutMonthPrice
        var defalutAddPrice = gubun === "Y" ? defalutYearAddPrice : defalutMonthAddPrice

        var paymentInfo = {
            buyerName: buyerName,
            buyerEmail: buyerEmail,
            buyerNumber: buyerNumber,
            cardNumber: cardNumber,
            birthday: birthday,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            twoPassword: twoPassword,
            productName: productName,
            recommend_id: recommend_id,
            gubun: gubun,
            price: price,
            user_cnt : user_cnt,
            defalutPrice: defalutPrice,
            defalutAddPrice: defalutAddPrice
        }

        if (productName === Product.BUSINESS) {
            if (cnts_Null2Void(upgrade.getSubDomain()) === "") {
                getTeamDomain(function (dat) {
                    if (cnts_Null2Void(dat.SUB_DOM) === "") {
                        alert('팀 도메인이 존재하지 않습니다.');
                    } else {
                        paymentInfo.subDomain = dat.SUB_DOM.toLowerCase();
                        executePayment();
                    }
                });
            } else {
                paymentInfo.subDomain = upgrade.getSubDomain();
            }
        }

        executePayment();

        function executePayment() {

            var use_Yn = "";
            var stts = "";

            if (working) {
                return;
            }

            if (!(cnts_Null2Void(paymentInfo.recommend_id) === "")) {
                var jexAjax = jex.createAjaxUtil("FLOW_BUY_R007");
                jexAjax.set("USER_ID", _USER_ID);
                jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
                jexAjax.set("RECOMMEND_ID", paymentInfo.recommend_id);

                jexAjax.execute(function (dat) {
                    if (!jex.isError(dat)) {
                        use_Yn = dat.USE_YN;
                        stts = dat.STTS;

                        if (use_Yn == "Y" && stts == "Y") {

                            working = true;
                            $("#paymentPendingLayerPopup").fadeIn();

                            execute(paymentInfo,
                                function (result) {
                                    $("#paymentPendingLayerPopup").hide();
                                    defaultView.clearSubmitFields(paymentInputLayer);
                                    defaultView.hide(true);
                                    working = false;
                                    if (productName === Product.PREMIUM) {
                                        upgrade.show(paymentInfo.productName + "Success");
                                    } else { // NOTE:payAfter1 추후에 비즈니스도 카드등록을 해야 1개월 체험 가능하도록 변경할 수도 있다. 지금은 아님
                                        fn_buyYn();
                                        cmf_layerMsg("1", c18n("AA0180", "카드 등록이 완료되었습니다."));
                                        try {
                                            fn_setCardrePopUpLayerClose();		//페이먼트 카드 재등록일 경우.
                                        } catch (e) {
                                            // when fn_setCardrePopUpLayerClose function not exist, do nothing;
                                        }
                                    }
                                }, function (err) {
                                    $("#paymentPendingLayerPopup").hide();
                                    working = false;
                                    alert(cnts_Null2Void(err.RESULT_MSG, "결제실패!"));
                                }
                            );
                        } else {
                            cmf_layerMsg("2", c18n("DFA581", "추천인 아이디가 없습니다."));
                        }

                    } else {
                        cmf_layerMsg("2", c18n("DFA581", "추천인 아이디가 없습니다."));
                    }
                });
            } else {
                working = true;
                $("#paymentPendingLayerPopup").fadeIn();

                execute(paymentInfo,
                    function (result) {
                        $("#paymentPendingLayerPopup").hide();
                        defaultView.clearSubmitFields(paymentInputLayer);
                        defaultView.hide(true);
                        working = false;
                        if (productName === Product.PREMIUM) {
                            upgrade.show(paymentInfo.productName + "Success");
                        } else { // NOTE:payAfter1 추후에 비즈니스도 카드등록을 해야 1개월 체험 가능하도록 변경할 수도 있다. 지금은 아님
                            fn_buyYn();
                            cmf_layerMsg("1", c18n("AA0180", "카드 등록이 완료되었습니다."));
                            try {
                                fn_setCardrePopUpLayerClose();		//페이먼트 카드 재등록일 경우.
                            } catch (e) {
                                // when fn_setCardrePopUpLayerClose function not exist, do nothing;
                            }
                        }
                    }, function (err) {
                        $("#paymentPendingLayerPopup").hide();
                        working = false;
                        alert(cnts_Null2Void(err.RESULT_MSG, "결제실패!"));
                    }
                );
                //Done;
            }


        }

    }

    function execute(paymentInfo, onSuccessCallback, onErrorCallback) {

        var jexAjax = jex.createAjaxUtil("IAMPORT_PAYMENT_C001");
        jexAjax.set("USER_ID", _USER_ID);
        jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
        jexAjax.set("CARD_NUM", paymentInfo.cardNumber);
        jexAjax.set("CARD_EXPIRE_MONTH", paymentInfo.expiryMonth);
        jexAjax.set("CARD_EXPIRE_YEAR", paymentInfo.expiryYear);
        jexAjax.set("BRDT", paymentInfo.birthday);
        jexAjax.set("PWD", paymentInfo.twoPassword);
        jexAjax.set("RATE_CNTN", paymentInfo.productName);
        jexAjax.set("USER_NM", paymentInfo.buyerName);
        jexAjax.set("EMAIL", paymentInfo.buyerEmail);
        jexAjax.set("CELLPHONE_NUM", paymentInfo.buyerNumber);
        jexAjax.set("RECOMMEND_ID", paymentInfo.recommend_id);
        jexAjax.set("GUBUN", paymentInfo.gubun);
        jexAjax.set("PRICE", paymentInfo.price);
        jexAjax.set("USER_CNT", paymentInfo.user_cnt);
        jexAjax.set("DEFALUT_PRICE", paymentInfo.defalutPrice);
        jexAjax.set("ADD_USER_PRICE", paymentInfo.defalutAddPrice);


        if (paymentInfo.productName === Product.BUSINESS) {
            jexAjax.set("SUB_DOM", paymentInfo.subDomain);
        }

        jexAjax.execute(function (dat) {

            if (jex.isError(dat)) {
                if (dat && dat.COMMON_HEAD) {
                    alert(dat.COMMON_HEAD.MESSAGE);
                } else {
                    alert(jex.getMsg("WCB009"));
                }
                onErrorCallback(dat);
                return;
            }

            if (dat.RESULT_CODE === "0") {
                onSuccessCallback(dat);
            } else {
                onErrorCallback(dat);
            }
        });

    }

    function show(productName, openBusinessFinishedLayerWhenClosed) {

        var currentLayer;

        if (_USE_INTT_ID.substring(0, 4) == "FLOW") {
            currentLayer = $("#iamportPaymentLayer").find("#premiumPaymentLayer");
            currentLayer.show();
            currentLayer.find("button[name='executePayment']").attr("product-name", productName);
        } else {
            currentLayer = $("#iamportPaymentLayer").find("#companyPaymentLayer");
            currentLayer.show();
            currentLayer.find("button[name='executePayment']").attr("product-name", productName);

            var jexAjax = jex.createAjaxUtil("COLABO2_USER_R005");
            jexAjax.set("USER_ID", _USER_ID);
            jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
            jexAjax.set("GUBUN", "U")

            jexAjax.execute(function (dat) {
                if (!jex.isError(dat)) {
                    userCount = dat.USER_CNT;

                    var defalutMonthMoney;
                    var defaultYearMoney;
                    var numberCommaRegexp = /\B(?=(\d{3})+(?!\d))/g;

                    $(document).find("#payPrice").children().next().remove();
                    $("#payToolTip").val(userCount);

                    if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                        setDefalutMonthPayInfo(50000, 5000)
                        setDefalutYearPayInfo(40000, 4000)
                        defalutMonthMoney = (50000 + (Number(userCount) - 10) * 5000) * 12;
                        defaultYearMoney = (40000 + (Number(userCount) - 10) * 4000) * 12;
                    }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                        setDefalutMonthPayInfo(50000, 5000)
                        setDefalutYearPayInfo(40000, 4000)
                        defalutMonthMoney = (50000 + (Number(userCount) - 10) * 5000) * 12;
                        defaultYearMoney = (40000 + (Number(userCount) - 10) * 4000) * 12;
                    }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                        setDefalutMonthPayInfo(60000, 6000)
                        setDefalutYearPayInfo(50000, 5000)
                        defalutMonthMoney = (60000 + (Number(userCount) - 10) * 6000) * 12;
                        defaultYearMoney = (50000 + (Number(userCount) - 10) * 5000) * 12;
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                        setDefalutMonthPayInfo(60000, 6000)
                        setDefalutYearPayInfo(50000, 5000)
                        defalutMonthMoney = (60000 + (Number(userCount) - 10) * 6000) * 12;
                        defaultYearMoney = (50000 + (Number(userCount) - 10) * 5000) * 12;
                    } else if ((isBflow > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                        setDefalutMonthPayInfo(50000, 5900)
                        setDefalutYearPayInfo(40000, 4900)
                        defalutMonthMoney = (50000 + (Number(userCount) - 10) * 5900) * 12;
                        defaultYearMoney = (40000 + (Number(userCount) - 10) * 4900) * 12;
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "190228235959") {
                        setDefalutMonthPayInfo(40000, 4900)
                        defalutMonthMoney = 40000 + (Number(userCount) - 10) * 4900;
                    } else {
                        setDefalutMonthPayInfo(30000, 3900)
                        defalutMonthMoney = 30000 + (Number(userCount) - 10) * 3900;
                    }

                    var savePrice = String(Number(userCount) > 10 ? (defalutMonthMoney - defaultYearMoney) : 120000).replace(numberCommaRegexp, ',');
                    if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("YEAR") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                    }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("YEAR") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                    }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defaultYearMoney : 600000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("YEAR") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defaultYearMoney : 600000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("YEAR") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                    } else if ((isBflow > -1 && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId()) {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("YEAR") + "</p>" +
                            "<span class='sup'><em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                    } else if (isBflow && _USE_INTT_ID.split('_')[1] > "190228235959") {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defalutMonthMoney : 40000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("MONTH") + "</p> " +
                            "<span class='sup'>("+payText.get("VAT")+")</span>")
                    } else {
                        $("#payPrice").append("<p class='text'>₩" +
                            "<span>" + String(Number(userCount) > 10 ? defalutMonthMoney : 30000).replace(numberCommaRegexp, ',') + "</span> " + payText.get("MONTH") + "</p> " +
                            "<span class='sup'>("+payText.get("VAT")+")</span>")
                    }

                    if((isBflow && _USE_INTT_ID.split('_')[1] > "190709200000") || isSpecialUseInttId() || isUtlz){
                        $("#payOption").attr("data", "Y");
                    } else {
                        $("#payOption").attr("data", "M");
                        $("#paymentMethod").find("div.lycombo-optn ul").find("li")[0].remove()
                    }
                }
            });
        }
        defaultView.show(currentLayer);
    }

    function setDefalutYearPayInfo(yearPirce, yearAddPrice) {
        defalutYearPrice = yearPirce
        defalutYearAddPrice = yearAddPrice
    }

    function setDefalutMonthPayInfo(monthPirce, monthAddPrice) {
        defalutMonthPrice = monthPirce
        defalutMonthAddPrice = monthAddPrice
    }

    return {
        execute: execute,
        show: show,
        Product: Product
    }
})();

// CMS계좌이체 안내 팝업
var bankTransferPayment = (function () {

    var isInit = false;

    var CMSLayer;

    function init() {

        CMSLayer = $("#bankTransferDescriptionLayerPopup");

        CMSLayer.find("button.btn-lyp-close").on("click", function () {
            close();
        });

        CMSLayer.find("#getBankTransferApplyPaper").on("click", function () {
            //운영에서는 아래와 같이 하면 된다
            /*
             cmf_saveFile(									"remark_FC:FLOW_20180914343670_a6842357-8cf9-465f-9d07-b872e18ebf76:1936918",
                    "https://flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_20180914343670_a6842357-8cf9-465f-9d07-b872e18ebf76&ATCH_SRNO=1936918&OBJ_CNTS_NM=",
                    "Y", "플로우_자동이체_동의서.doc", 68096);
            */
            cmf_saveFile("remark_FC:FLOW_201904152320046_1caa0535-8f56-4fce-bf00-ad4e1ef73b26:2598205",
                "https://flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904152320046_1caa0535-8f56-4fce-bf00-ad4e1ef73b26&ATCH_SRNO=2598205&OBJ_CNTS_NM=",
                "Y", "플로우_자동이체_동의서.doc", 68096);
        });

        isInit = true;
    }

    function open() {
        if (!isInit) {
            init();
        }
        LayerPopupUtil.attachCloseEventListener(CMSLayer, CMSLayer.find("div.dim-bg"), function () {
            close()
        });
        CMSLayer.fadeIn(200);
    }

    function close() {
        CMSLayer.hide();
    }

    return {
        open: open,
        close: close
    }
})();

// 요금계산기
var flowAmountCalculator = (function () {

    var amountLayer;
    var numberCommaRegexp = /\B(?=(\d{3})+(?!\d))/g;

    function init(gubun) {

        amountLayer = $("#amountCalculatorLayerPopup");
        amountLayer.find("button.btn-lyp-close").off().on("click", function () {
            close();
        });

        amountLayer.find("input[id='calcAmount']").off().on("input", blockNotNumber).on("keyup", function (e) {

            calcUserCount = Number(amountLayer.find("input[id='calcAmount']").val());

            $(document).find("#payCalcPrice").children().next().text("");
            //@임석현 날짜 변경 2020-08-15

            var defalutMonthMoney;
            var defaultYearMoney;
            if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                defalutMonthMoney = (priceGroupArr["UTLZ_20210708"].MONTH_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["UTLZ_20210708"].MONTH_ADD_PRICE) * 12;
                defaultYearMoney = (priceGroupArr["UTLZ_20210708"].YEAR_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["UTLZ_20210708"].YEAR_ADD_PRICE) * 12;
            }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                defalutMonthMoney = (priceGroupArr["SERP"].MONTH_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["SERP"].MONTH_ADD_PRICE) * 12;
                defaultYearMoney = (priceGroupArr["SERP"].YEAR_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["SERP"].YEAR_ADD_PRICE) * 12;
            }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                defalutMonthMoney = (priceGroupArr["201218000000"].MONTH_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["201218000000"].MONTH_ADD_PRICE) * 12;
                defaultYearMoney = (priceGroupArr["201218000000"].YEAR_PRICE + (Number(calcUserCount) - 10) * priceGroupArr["201218000000"].YEAR_ADD_PRICE) * 12;
            } else if (_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "200815000000") {
                defalutMonthMoney = (60000 + (Number(calcUserCount) - 10) * 6000) * 12;
                defaultYearMoney = (50000 + (Number(calcUserCount) - 10) * 5000) * 12;
            } else {
                defalutMonthMoney = (50000 + (Number(calcUserCount) - 10) * 5900) * 12;
                defaultYearMoney = (40000 + (Number(calcUserCount) - 10) * 4900) * 12;
            }

            var numberCommaRegexp = /\B(?=(\d{3})+(?!\d))/g;
            var savePrice = String(isTenOver ? (defalutMonthMoney - defaultYearMoney) : 120000).replace(numberCommaRegexp, ',')

            if (Number(calcUserCount) > 100) {
                $(document).find("#payCalcPrice").children().next().append("<p class='text'>" +
                    "<span data-langcode='ui.pay.contact'>별도문의</span></p>" +
                    "<span class='sup' data-langcode='ui.pay.contact.content'>100명 이상은 별도문의 부탁드립니다.</span>");
            }else if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {

                var isTenOver = Number(calcUserCount) > 10;
                $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                    "<span>" + String(isTenOver ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                    "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                    "(" + payText.get("VAT") + ")</span>")
                $(document).find("#payCalcOption").attr("data", "Y");

            } else if (_USE_INTT_ID.indexOf('BFLOW') > -1 && "Y" == getLocal("SERP_YN") ) {
                if ($(document).find("#payCalcOption").attr("data") == "M") {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? (defalutMonthMoney / 12) : 50000).replace(numberCommaRegexp, ',') + "</span></p>" +
                        "<span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "M");
                } else {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "Y");
                }

            } else if (_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "201218000000") {
                if ($(document).find("#payCalcOption").attr("data") == "M") {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? (defalutMonthMoney / 12) : 60000).replace(numberCommaRegexp, ',') + "</span></p>" +
                        "<span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "M");
                } else {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? defaultYearMoney : 600000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "Y");
                }
            } else if (_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "200815000000") {
                if ($(document).find("#payCalcOption").attr("data") == "M") {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? (defalutMonthMoney / 12) : 60000).replace(numberCommaRegexp, ',') + "</span></p>" +
                        "<span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "M");
                } else {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? defaultYearMoney : 600000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "Y");
                }
            } else {
                if ($(document).find("#payCalcOption").attr("data") == "M") {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? (defalutMonthMoney / 12) : 50000).replace(numberCommaRegexp, ',') + "</span></p>" +
                        "<span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "M");
                } else {
                    var isTenOver = Number(calcUserCount) > 10;
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                        "<span>" + String(isTenOver ? defaultYearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                        "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                        "(" + payText.get("VAT") + ")</span>")
                    $(document).find("#payCalcOption").attr("data", "Y");
                }
            }
        })

        function blockNotNumber(e) {
            $(e.target).val($(e.target).val().replace(/[^0-9]/g, ""));
        }

        amountLayer.find("div.lycombobox div.lycombo-optn ul").find("li").on("click", function (e) {
            setPaymentInfo($(this).parents("div.lycombo"), $(this).parents("div.lycombo-optn"), $(this));
            $(this).prependTo($(this).parent());
        });

        function setPaymentInfo(targetObj, liLayerObj, value) {
            var numberCommaRegexp = /\B(?=(\d{3})+(?!\d))/g;
            var monthMoney, yearMoney, payResult, disCountMoney;

            // var monthBasicMoney = 50000;
            // var monthAddMoney = 5900;
            // var yearBasicMoney = 40000;
            // var yearAddMoney = 4900;
            var monthBasicMoney;
            var monthAddMoney;
            var yearBasicMoney;
            var yearAddMoney;
            var numUserCount;

            if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                monthBasicMoney = priceGroupArr["UTLZ_20210708"].MONTH_PRICE;
                monthAddMoney = priceGroupArr["UTLZ_20210708"].MONTH_ADD_PRICE;
                yearBasicMoney = priceGroupArr["UTLZ_20210708"].YEAR_PRICE;
                yearAddMoney = priceGroupArr["UTLZ_20210708"].YEAR_ADD_PRICE;;
            }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                monthBasicMoney = priceGroupArr["SERP"].MONTH_PRICE;
                monthAddMoney = priceGroupArr["SERP"].MONTH_ADD_PRICE;
                yearBasicMoney = priceGroupArr["SERP"].YEAR_PRICE;
                yearAddMoney = priceGroupArr["SERP"].YEAR_ADD_PRICE;;
            }else if (isBflow && _USE_INTT_ID.split('_')[1] > "201218000000") {
                monthBasicMoney = priceGroupArr["201218000000"].MONTH_PRICE;
                monthAddMoney = priceGroupArr["201218000000"].MONTH_ADD_PRICE;
                yearBasicMoney = priceGroupArr["201218000000"].YEAR_PRICE;
                yearAddMoney = priceGroupArr["201218000000"].YEAR_ADD_PRICE;;
            } else if (isBflow && _USE_INTT_ID.split('_')[1] > "200815000000") {
                monthBasicMoney = 60000;
                monthAddMoney = 6000;
                yearBasicMoney = 50000;
                yearAddMoney = 5000;
            } else {
                monthBasicMoney = 50000;
                monthAddMoney = 5900;
                yearBasicMoney = 40000;
                yearAddMoney = 4900;
            }

            if (typeof calcUserCount !== "undefined") {
                numUserCount = Number(calcUserCount);
            } else {
                calcUserCount = 0;
                numUserCount = Number(calcUserCount);
            }

            if (value.find("em")) {

                payResult = (monthBasicMoney + (numUserCount - 10) * monthAddMoney);
                monthMoney = payResult * 12;
                yearMoney = (yearBasicMoney + (numUserCount - 10) * yearAddMoney) * 12;
                disCountMoney = monthMoney - yearMoney;

                $(document).find("#payCalcPrice").children().next().text("");
                if (Number(calcUserCount) > 100) {
                    $(document).find("#payCalcPrice").children().next().append("<p class='text'><span>별도문의</span></p><span class='sup'>100명 이상은 별도문의 부탁드립니다.</span>")

                    targetObj.find("div.lycombo-select > span").text("");
                    targetObj.find("div.lycombo-select > span").append(value.html());


                    if (value.context.id == "#calcMonthPay") {
                        $(document).find("#payCalcOption").attr("data", "M");
                    } else {
                        $(document).find("#payCalcOption").attr("data", "Y");
                    }

                } else {
                    // @임석현 날짜변경 2020-08-15
                    var savePrice = String(numUserCount > 10 ? disCountMoney : 120000).replace(numberCommaRegexp, ',');

                    if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
                        $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                            "<span>" + String(numUserCount > 10 ? yearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                            "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                            "("+payText.get("VAT")+")</span>")
                        $("#payCalcOption").attr("data", "Y");
                    }else if (isBflow && "Y" == getLocal("SERP_YN")) {
                        if (value.context.id == "#calcMonthPay") {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? (monthMoney / 12) : 50000).replace(numberCommaRegexp, ',') + "</span></p>" +
                                "<span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "M");
                        } else {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? yearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "Y");
                        }
                    }else if(isBflow && _USE_INTT_ID.split('_')[1] > "201218000000"){
                        if (value.context.id == "#calcMonthPay") {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? (monthMoney / 12) : 60000).replace(numberCommaRegexp, ',') + "</span></p>" +
                                "<span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "M");
                        } else {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? yearMoney : 600000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "Y");
                        }
                    } else if(_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "200815000000"){
                        if (value.context.id == "#calcMonthPay") {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? (monthMoney / 12) : 60000).replace(numberCommaRegexp, ',') + "</span></p>" +
                                "<span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "M");
                        } else {
                            $("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? yearMoney : 600000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $("#payCalcOption").attr("data", "Y");
                        }
                    } else {
                        if (value.context.id == "#calcMonthPay") {
                            $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? (monthMoney / 12) : 50000).replace(numberCommaRegexp, ',') + "</span></p>" +
                                "<span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE2").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $(document).find("#payCalcOption").attr("data", "M");
                        } else {
                            $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
                                "<span>" + String(numUserCount > 10 ? yearMoney : 480000).replace(numberCommaRegexp, ',') + "</span></p><span class='sup'>" +
                                "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1",savePrice) + "</em> " +
                                "("+payText.get("VAT")+")</span>")
                            $(document).find("#payCalcOption").attr("data", "Y");
                        }
                    }
                    targetObj.find("div.lycombo-select > span").text("");
                    targetObj.find("div.lycombo-select > span").append(value.html());
                }
            }

            if (!targetObj.hasClass("ok")) {
                targetObj.addClass("ok");
            }
            closeLycomboOption(liLayerObj);
        }

        amountLayer.find("div.lycombo-select .lycombo-click").on("click", onClickLycomboEventListener);
        amountLayer.find("div.lycombo-select span").on("click", onClickLycomboEventListener);

        function onClickLycomboEventListener(e) {
            e.stopPropagation();
            openLycomboOption($(e.target).parents("div.lycombo").find("div.lycombo-optn"));
        }

        amountLayer.find("div.lycombobox div.lycombo-optn ul").find("li").on("mouseover", function () {
            $(this).parents("ul").find("li.on").removeClass("on");
        });

        // lycombo keyboard event
        amountLayer.find("div.tab_focus").on("focus", function () {
            if (amountLayer.find("div.lycombobox div.lycombo-optn:visible").length > 0) {
                closeLycomboOption(amountLayer.find("div.lycombobox div.lycombo-optn:visible"));
            }
            openLycomboOption($(this).find("div.lycombo-optn"));
        });

        function closeLycomboWhenBlankClickEventListener(e) {
            if (!$(e.target).is("div.lycombo")) {
                if (amountLayer.find("div.lycombobox div.lycombo-optn:visible").length > 0) {
                    closeLycomboOption(amountLayer.find("div.lycombobox div.lycombo-optn:visible"));
                }
            }
        }

        function openLycomboOption(target) {
            target.find("ul").find("li:first").addClass("on");
            target.fadeIn(100);
            $(document).on("keyup", lyComboFocusMover);
            $(document).on("click", closeLycomboWhenBlankClickEventListener);
        }

        function closeLycomboOption(target) {
            $(document).off("click", closeLycomboWhenBlankClickEventListener);
            $(document).off("keyup", lyComboFocusMover);

            target.find("ul").find("li.on").removeClass("on");
            target.hide();
        }

        function lyComboFocusMover(e) {
            e.preventDefault();
            if (amountLayer.find("div.lycombobox div.lycombo-optn:visible").length === 0) {
                $(document).off("keyup", lyComboFocusMover);
                return;
            }
        }

    }

    function open(gubun) {
        init(gubun);

        clearInputFields(gubun);

        var bgLayer = amountLayer.find("div.dim-bg") || amountLayer;
        bgLayer.on("click", function backgroundClickEventListener(e) {
            if ($(e.target).is(bgLayer)) {
                amountLayer.hide();
                $(this).off("click", backgroundClickEventListener);
            }
        });
        $(document).on("keyup", function closeAmountCalculatorLayerPopup(e) {
            if (e.key === "Escape" || e.keyCode === 27) {
                if (isFunctionExist(close())) {
                    clog('onCloseCallback ###');
                    close();
                } else {
                    clog('layerObject.hide ###');
                    amountLayer.hide();
                }
                $(document).off("keyup", closeAmountCalculatorLayerPopup);
            }
        });
        amountLayer.fadeIn(200);
        amountLayer.find('#numberOfPeople').focus();

        //바깥스크롤처리
        $('body').css("overflow", "hidden");
        $('body').css("overflow-y", "hidden");
    }

    function close() {
        amountLayer.hide();

        //바깥스크롤처리
        $('body').css("overflow", "visible");
        $('body').css("overflow-y", "auto");
    }

    function clearInputFields(gubun) {

        amountLayer.find("input[id='calcAmount']").val("10");       //2021.3.31 jkw defalut 10명 처리
        calcUserCount = 0;
        $(document).find("#payCalcPrice").children().next().text("");
        var defaultPrice = "";

        if (isUtlz  && _USE_INTT_ID.split('_')[1].length == 13 &&  _USE_INTT_ID.split('_')[1] > "2106010000000") {
            defaultPrice = 480000;
        }else if (isBflow && "Y" == getLocal("SERP_YN")) {
            defaultPrice = 480000;
        }else if (isBflow && _USE_INTT_ID.split('_')[1] > "20201218000000") {
            defaultPrice = 600000;
        } else if (_USE_INTT_ID.indexOf('BFLOW') > -1 && _USE_INTT_ID.split('_')[1] > "200815000000") {
            defaultPrice = 600000;
        } else {
            defaultPrice = 480000;
        }
        $(document).find("#payCalcPrice").children().next().append("<p class='text'>₩" +
            "<span>"+ String(defaultPrice).replace(numberCommaRegexp, ',') +"</span></p><span class='sup'>" +
            "<em>" + payText.get("DISCOUNT_MESSAGE1").replace("$1","120,000") + "</em> " +
            "(" + payText.get("VAT") +")</span>")
        $(document).find("#payCalcOption").attr("data", "Y");
        $(document).find("#payCalcOption").text("")
        $(document).find("#payCalcOption").append(payText.get("YEARLY_PAY")+"<em class='sale_mark'>20% "+payText.get("DISCOUNT_PAY")+"</em>")
    }

    return {
        open: open,
        close: close
    }
})();
