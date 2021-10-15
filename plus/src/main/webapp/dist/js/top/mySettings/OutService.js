var OutService = (function () {

    var $outServiceLayer = $("#outServiceLayer");

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
        activateZoomButton: activateZoomButton,
    }

    function openPopupLayer() {
        initSyncList();
        $outServiceLayer.removeClass('d-none').addClass('d-block');
        displayLearnDetailsBtn();
        addEvent();
    }

    function initSyncList() {
        // Default가 연동 안되어 있는 상태
        VideoConference.isZoomSynchronized(activateZoomButton, function () {
            return undefined;
        });
    }

    function closePopupLayer() {
        $outServiceLayer.removeClass('d-block').addClass('d-none');
    }

    function addEvent() {
        $("#zoomConnectBtn").off("click").on("click", zoomConnect);
        $("#serviceApplyBtn").off("click").on("click", serviceApply);
        $outServiceLayer.find(".js-learn-details").off("click").on("click", serviceHelper);
    }

    function zoomConnect(e) {
        if (LimitGuest.isLimitGuest("video")) return;
        var isZoomSynchronized = Often.null2Void($(this).attr('zoom-data'), "") === "Y";
        if (isZoomSynchronized) {
            PopupDraw.drawConfirm({
                contents: {main: '연동을 해제 하시겠습니까?'},
                callback: {
                    submit: deactivateZoomButton
                }
            })
        } else {
            VideoConference.syncZoom()

            /***
             * NOTE
             * 줌으로 URL 던져준 후 여기서 작업은 끝이남 단 개발에서 테스트를 위해 아래와 같이 적용
             * 운영에서는 zoom_outh.act에서 버튼을 제어함.
             */

            if (Often.isServerModeByHost("DEV_TEST")) activateZoomButton();
        }
    }

    function serviceApply() {
        window.open("https://forms.gle/2VRGuEGu9Kcpb7HQ6", "_blank");
    }

    function serviceHelper(e) {
        var $eTarget = $(e.target);
        var targetUrl = "";
        var serviceCode = $eTarget.attr("service-code");
        if (serviceCode === "ZOOM") targetUrl = FlowServiceHelper.ZOOM;
        return window.open(targetUrl, "_blank");
    }

    function displayLearnDetailsBtn() {
        $outServiceLayer.find(".js-connect-btn").each(function (i, v) {
            if ($(v).css("cursor") !== "default") {
                $(v).parents("li").find(".js-learn-details").css("display", "inline-block");
                return;
            }
        })
    }

    function activateZoomButton() {
        $("#zoomConnectBtn")
            .text(i18next.t('front.common.removeSync'))
            .removeClass('my-inoutput-button-type-1')
            .addClass('my-inoutput-button-type-2')
            .attr('zoom-data', 'Y')
    }

    function deactivateZoomButton() {
        $("#zoomConnectBtn")
            .text(i18next.t('dictionary.connect'))
            .removeClass('my-inoutput-button-type-2')
            .addClass('my-inoutput-button-type-1')
            .attr('zoom-data', 'N')
        VideoConference.unSyncZoom();
    }
})()