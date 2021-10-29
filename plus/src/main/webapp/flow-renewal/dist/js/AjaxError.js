var AjaxError = (function () {

    var returnJson = {};
    var returnErrorMsg = i18next.t('front.alert.errorTryAgain');

    return {
        errorHandle: errorHandle,
        errorPopup: errorPopup,
        isServerModeByHostHandle: isServerModeByHostHandle
    };

    function errorHandle(res, errorCode, errorMsg, errorCallback, apiKey, inputJson) {
        if (errorCode === 'S0139' || errorCode === 'S0002') {
            LocalUtil.removeLocal("SUB_PATH");
            location.reload();
            return;
        }

        if (errorCode === 'WCB010') {
            Often.toast("error", i18next.t('front.alert.deletedPost'));
            return;
        }

        if (errorCode === "S0029") {
            (typeof errorCallback === 'function') && errorCallback(res);
            return Often.toast("error", "업무 제목을 입력해주세요.");
        }

        if (errorCode === "U400") {
            (typeof errorCallback === 'function') && errorCallback(res);
            return Often.toast("error", errorMsg);
        }

        if (Often.isServerModeByHost("DEV_TEST")) {
            errorPopup({
                response: res,
                apiKey: apiKey,
                inputJson: inputJson
            });
        }

        if ("" !== errorMsg) {
            returnErrorMsg += '\nERROR : ' + errorMsg;
            "NO_ALERT" !== errorMsg && Often.toast("error", errorMsg);
            (typeof errorCallback === 'function') && errorCallback(res);
        }

    }

    function isServerModeByHostHandle() {

    }

    function errorPopup(message) {
        var errorMessage = message.apiKey + "/" +
            JSON.stringify(message.inputJson) + "/" +
            JSON.stringify(message.response);
        if (!Often.isServerModeByHost("ALL_TEST")) {
            console.error(errorMessage);
            return;
        }
        PopupDraw.drawConfirm({
            contents: {
                main: returnErrorMsg
            },
            callback: {
                final: function ($popup) {
                    $popup.find(".cancel-event").remove();
                    var $errorCont = $("<div></div>").addClass("error-cont");
                    $errorCont.text(errorMessage);
                    $popup.find(".popup-cont").after($errorCont);
                }
            }
        });
    }

})();
