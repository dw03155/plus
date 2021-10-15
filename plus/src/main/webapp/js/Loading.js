var Loading = (function () {

    return {
        drawLoadingPop: drawLoadingPop,
        drawLoadingJson: drawLoadingJson,
        closeLoadingPop: closeLoadingPop,
    };

    function drawLoadingPop(isJoin) {
        var waitingContents = i18next.t('front.common.wait');
        waitingContents = (isJoin ? i18next.t('front.common.wait') + "\n" : "") + waitingContents; //회원가입 진행 중 입니다 << 다국어 추가 필요
        $('body').prepend(ListHelper.replaceJson($("#wrapLoading").html(), {contents: waitingContents}));
        $(".js-loading-popup").find(".js-cancel-btn").css("display", "none");
    }

    function drawLoadingJson(dataJson) {
        var contents = dataJson.CONTENTS;
        var popupHtml = ListHelper.replaceJson($("#wrapLoading").html(), {contents: contents});
        $('body').prepend(popupHtml);
        var isExistCloseCallBack = (dataJson.CALLBACK && dataJson.CALLBACK.CANCEL);
        $($(".js-loading-popup")[0]).attr("id", "js-loading-popup");
        var $tempPopup = $(".js-loading-popup");
        $tempPopup.find(".js-cancel-btn").css("display", isExistCloseCallBack ? "block" : "none");
        isExistCloseCallBack && $tempPopup.find(".js-cancel-btn").off("click").on("click", dataJson.CALLBACK.CANCEL);
    }

    function closeLoadingPop() {
        var $loadingPopup = $("#js-loading-popup");
        var $targetPopup = $($loadingPopup[$loadingPopup.length - 1]);
        $targetPopup.remove();
    }
})();
