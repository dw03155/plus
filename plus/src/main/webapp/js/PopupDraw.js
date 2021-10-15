var PopupDraw = (function () {

    var $currentPopup;
    var currentPassJson;
    var workingTimer;

    return {
        drawInputConfirm: drawInputConfirm,
        drawConfirm: drawConfirm,
        drawColorSetting: drawColorSetting,
        drawLabelSetting: drawLabelSetting,
        drawPushAlarmSetting: drawPushAlarmSetting,
        drawBlock: drawBlock,
        drawBigBlock: drawBigBlock,
        drawCheck: drawCheck,
        drawAuth: drawAuth,

        getPopupWrapObj: getPopupWrapObj,
        drawToast: drawToast,
        closePopup: closePopup,
        openTempPopup: openTempPopup,
        addEventOnTempPopup: addEventOnTempPopup,
    }

    function drawInputConfirm(data) {
        drawPopup('input', $.extend({
            TITLE: data.contents && data.contents.title,
            HOLDER: data.contents && data.contents.holder,
            VALUE: data.contents && data.contents.value,
            EMPTY_MSG: data.contents && data.contents.empty,
            OVER_MSG: data.contents && data.contents.over,
            CLASS: data.class,
        }, makeJsonByData(data)))
    }

    function drawConfirm(data) {
        if ($("#tempPopup .confirm-popup").is(":visible")) return false;
        drawPopup('confirm', $.extend({
            MINI: data.mini,
            CONTENTS: data.contents && data.contents.main
        }, makeJsonByData(data)))
    }

    function drawColorSetting(data) {
        drawPopup('color', makeJsonByData(data))
    }

    function drawLabelSetting(data) {
        drawPopup('label', makeJsonByData(data))
    }

    function drawPushAlarmSetting(data) {
        drawPopup('push-alarm', makeJsonByData(data));
    }

    function drawBlock(data) {
        drawPopup('limit', $.extend({
            MINI: data.mini,
            CLASS: data.class,
            TITLE: i18next.t(data.contents && data.contents.title),
            CONTENTS: Interpolation.breakLine(i18next.t(data.contents && data.contents.main)),
        }, makeJsonByData(data)))
    }

    function drawBigBlock(data) {
        drawPopup('big-block', $.extend({
            CLASS: data.class,
            TITLE: data.contents && data.contents.title,
            CONTENTS: data.contents && data.contents.main,
        }, makeJsonByData(data)))
    }

    function drawCheck(data) {
        drawPopup('check-box', $.extend({
            MINI: data.mini,
            CLASS: data.contents && data.class,
            CHECK_ID: data.contents && data.id,
            TITLE: data.contents && data.contents.title,
            CONTENTS: data.contents && data.contents.main,
            VALUE: data.contents && data.contents.value,
            HOLDER: data.contents && data.contents.holder,
        }, makeJsonByData(data)))
    }

    function drawAuth(data) {
        drawPopup('auth', $.extend({
            CLASS: data.contents && data.class,
            TITLE: data.contents && data.contents.title,
            CONTENTS: data.contents && data.contents.main,
            COUNTER_ID: data.contents && data.contents.id
        }, makeJsonByData(data)))
    }

    function makeJsonByData(data) {
        return {
            AWAIT: data.await,
            LINK_URL: data.linkUrl,
            SUBMIT_TEXT: i18next.t(data.contents && data.contents.submit),
            SECONDARY_SUBMIT_TEXT: i18next.t(data.contents && data.contents.secondarySubmit),
            CANCEL_TEXT: i18next.t(data.contents && data.contents.cancel),
            LINK_TEXT: i18next.t(data.contents && data.contents.link_text),
            SUBMIT_CALLBACK: data.callback && data.callback.submit,
            SECONDARY_SUBMIT_CALLBACK: data.callback && data.callback.secondarySubmit,
            CANCEL_CALLBACK: data.callback && data.callback.cancel,
            CLOSE_CALLBACK: data.callback && data.callback.close,
            FINAL_CALLBACK: data.callback && data.callback.final,
            KEYUP_CALLBACK: data.callback && data.callback.keyup,
        }
    }

    function drawToast(data) {
        if ("" === Often.null2Void(data)) return;
        var type = Often.null2Void(data.type, "");
        var msg = Often.null2Void(data.msg, "");
        var sec = Number(Often.null2Void(data.sec, "2500"));
        if ("" === msg || "" === type) return;
        var $toastPop = getToastPopupObj();
        var isExistToastPopup = $toastPop.length > 0;
        isExistToastPopup && clearToastPopup();
        var $toastPopup = $($("#toastWrap").html());
        $toastPopup.attr("id", "toastPopup");
        if (Electron.isElectronApp()) $toastPopup.addClass('mini');
        $toastPopup.find(".alert-type").addClass(type);
        $toastPopup.find(".text").text(msg);
        $('body').prepend($toastPopup);
        $toastPop = getToastPopupObj();
        $toastPop.fadeIn(200);
        if (workingTimer) {
            clearTimeout(workingTimer);
        }
        workingTimer = setTimeout(function () {
            $toastPop.fadeOut(200, clearToastPopup);
        }, sec);

        function getToastPopupObj() {
            return $("#toastPopup");
        }

        function clearToastPopup() {
            getToastPopupObj().remove();
        }
    }

    function getPopupWrapObj() {
        return $($("#popupWrap").html()).attr("id", "tempPopup").css("display", "none").addClass("temp-popup");
    }

    function drawPopup(mode, passJson) {
        currentPassJson = $.extend({}, passJson);
        var $tempPopup = $(getPopupHtml());
        if (mode === "input") {
            var $inputObj = $tempPopup.find(".popup-input");
            $inputObj.attr({
                "data-empty-msg": passJson.EMPTY_MSG,
                "data-over-msg": passJson.OVER_MSG,
            })
            addInputKeyUp($inputObj)
        } else if (mode === 'label') {
            var $labelUl = $tempPopup.find(".js-label-ul");
            AllLabel.drawProjectLabelList($labelUl);
        } else if (mode === 'push-alarm') {
            var $pushAlarmPopup = $tempPopup.find(".push-alarm-content")
            PushAlarmSetting.drawPushAlarmSetting($pushAlarmPopup);
        } else if (mode === 'check-box') {
            var $checkBoxInput = $tempPopup.find(".js-checkbox-input")
            var $checkBoxLabel = $tempPopup.find(".js-checkbox-label")
            $checkBoxInput.attr('id', passJson.CHECK_ID)
            $checkBoxLabel.attr('for', passJson.CHECK_ID)
        } else if (mode === 'auth') {
            var $authCounter = $tempPopup.find(".js-auth-counter")
            $authCounter.attr('id', passJson.COUNTER_ID)
        } else {
            //pass
        }
        $tempPopup.find(".popup-title").text(passJson.TITLE);
        $tempPopup.find(".popup-input").attr('placeholder', ' ' + passJson.HOLDER).val(Often.null2Void(passJson.VALUE));
        $tempPopup.find(".popup-cont").html(passJson.CONTENTS);
        $tempPopup.find(".submit-event").text(Often.null2Void(passJson.SUBMIT_TEXT, i18next.t('dictionary.confirm')));
        $tempPopup.find(".cancel-event").text(i18next.t('dictionary.cancel'));
        $tempPopup.find(".secondary-submit-event").text(passJson.SECONDARY_SUBMIT_TEXT);

        var $modePopup;
        if (mode === 'limit') {
            $modePopup = $tempPopup.find("." + mode + "-popup");
            passJson.MINI && $modePopup.addClass('chat-limit-popup');
            passJson.LINK_URL && $tempPopup.find("#detailLinkBtn").css("display", "inline-block");
            passJson.LINK_TEXT && $tempPopup.find("#detailLinkBtn").text(passJson.LINK_TEXT);
            !passJson.SUBMIT_TEXT && $tempPopup.find('.limit-link-button').css('display', 'none');
            passJson.CONTENTS === BLOCK_TYPE.STOP_FLOWNEW && $modePopup.find('.limit-close-button').css('display', 'none');
        } else {
            mode = ((passJson.MINI ? "mini-" : "") + mode);
            $modePopup = $tempPopup.find("." + mode + "-popup");
        }
        passJson.CLASS && $modePopup.addClass(passJson.CLASS);
        $modePopup.css("display", "block");
        addEventOnTempPopup($tempPopup);
        openTempPopup($tempPopup);

        function addInputKeyUp($inputObj) {
            var inputTimer;
            var inputMaxLength = Number($inputObj.attr("maxlength"));
            $inputObj.off("keyup").on("keyup", function (e) {
                inputTimer && clearTimeout(inputTimer);
                inputTimer = setTimeout(function () {
                    if ($inputObj.val().length === inputMaxLength) Often.toast("error", $inputObj.attr("data-over-msg"));
                }, 10)
            })
        }
    }

    function addEventOnTempPopup($tempPopup) {
        $tempPopup.on("click", function (e) {
            e.stopPropagation();
            var $eTarget = $(e.target);
            var isBackArea = $eTarget.is(".back-area");
            var $closeEvent = $eTarget.findUp(".close-event");
            var $cancelEvent = $eTarget.findUp(".cancel-event");
            var $submitEvent = $eTarget.findUp(".submit-event");
            var $secondarySubmitEvent = $eTarget.findUp(".secondary-submit-event");
            var $colorItem = $eTarget.findUp(".color-item");
            var $detailLinkBtn = $eTarget.findUp("#detailLinkBtn");

            if (isBackArea || $closeEvent.length > 0) return closePopup();
            if ($cancelEvent.length > 0) return cancelPopup();
            if ($submitEvent.length > 0) return submitPopup();
            if ($secondarySubmitEvent.length > 0) return secondarySubmitPopup();
            if ($detailLinkBtn.length > 0) return detailLinkConnect();
            if ($colorItem.length > 0) {
                var $selectColorTypes = $eTarget.findUp("#selectColorTypes");
                $selectColorTypes.find(".project-color-check-active-1").removeClass("project-color-check-active-1");
                $colorItem.addClass("project-color-check-active-1");
            } else {
                //pass
            }

        });

        $tempPopup.off("keydown").on("keydown", function (e) {
            e.stopPropagation();
            if (KeyCheck.isKey(e, "ESC")) {
                Often.isAct("subscreen") ? subscreenClose() : closePopup()
            } else if (KeyCheck.isKey(e, "ENTER")) {
                submitPopup();
            } else {
                //pass
            }

            function subscreenClose() {
                var tempPopupCount = $(".temp-popup").length;
                if (tempPopupCount && tempPopupCount > 1) return $(".temp-popup")[tempPopupCount - 1].remove();
                window.close();
            }
        });
    }

    function openTempPopup($tempPopup) {
        $('body').append($tempPopup);
        $currentPopup = $("#tempPopup");

        if (currentPassJson && typeof currentPassJson.FINAL_CALLBACK === "function") {
            currentPassJson.FINAL_CALLBACK($currentPopup);
        } else {
            //pass
        }

        $tempPopup.fadeIn(200, function () {
            if ($tempPopup.find("input:visible").length !== 0) {
                $tempPopup.find("input:visible").focus();
            } else {
                $tempPopup.focus();
            }
        });
    }

    function cancelPopup() {
        if (currentPassJson && typeof currentPassJson.CANCEL_CALLBACK === "function") {
            currentPassJson.CANCEL_CALLBACK($currentPopup);
        } else {
            closePopup();
        }
    }

    function submitPopup() {
        if (currentPassJson && typeof currentPassJson.SUBMIT_CALLBACK === "function") {
            currentPassJson.SUBMIT_CALLBACK($currentPopup);
            !currentPassJson.AWAIT && $("#tempPopup").remove();
        } else {
            closePopup();
        }
    }

    function secondarySubmitPopup() {
        if (currentPassJson && typeof currentPassJson.SUBMIT_CALLBACK === "function") {
            currentPassJson.SECONDARY_SUBMIT_CALLBACK($currentPopup);
            !currentPassJson.AWAIT && closePopup();
        } else {
            closePopup();
        }
    }

    function closePopup() {
        //Todo. temp-popup 은 명확하지 않은 선택자라 영향도를 많이 줄수 있으니 좀 더 명확하게 쓰는 것을 권장
        var $tempPopup = $("#tempPopup");
        !$tempPopup.hasClass("serviceStop") && $tempPopup.remove();
        if (currentPassJson && typeof currentPassJson.CLOSE_CALLBACK === "function") {
            currentPassJson.CLOSE_CALLBACK();
        }
    }

    function detailLinkConnect() {
        OpenUtil.openWindow(currentPassJson.LINK_URL, "_blank");
    }

    function getPopupHtml() {
        var ColorPopupHtml = $("#colorPopup").html();
        var ConfirmPopupHtml = $("#confirmPopup").html();
        var MiniAlertPopupHtml = $("#miniAlertPopup").html();
        var AlertPopupHtml = $("#alertPopup").html();
        var LabelWrapHtml = $("#labelWrap").html();
        var PushAlarmWrapHtml = $("#pushWrap").html();
        var ProfileWrapHtml = $("#profileWrap").html();
        var PopupWrapHtml = $("#popupWrap").html();
        var BlockHtml = $("#blockPopup").html();
        var BigBlockHtml = $("#bigBlockPopup").html();
        var CheckPopupHtml = $("#checkBoxPopup").html();
        var EmailAuthHtml = $("#emailAuthLayer").html();
        var PopupHtml = ListHelper.replaceJson(PopupWrapHtml, {
            contents: BigBlockHtml + BlockHtml + ColorPopupHtml + ConfirmPopupHtml + CheckPopupHtml + EmailAuthHtml +
                MiniAlertPopupHtml + AlertPopupHtml + LabelWrapHtml + PushAlarmWrapHtml + ProfileWrapHtml,
        })
        return $(PopupHtml).attr("id", "tempPopup").css("display", "none").addClass("temp-popup");
    }

})();
