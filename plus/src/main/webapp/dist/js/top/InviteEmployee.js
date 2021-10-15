var InviteEmployee = (function () {

    var $inviteEmployeeLayer;

    return {
        toggleInviteEmployeeLayer: toggleInviteEmployeeLayer,
        openInviteEmployeeLayer: openInviteEmployeeLayer,
        closeInviteEmployeeLayer: closeInviteEmployeeLayer,
    }

    function toggleInviteEmployeeLayer() {
        $inviteEmployeeLayer = $("#inviteEmployeeLayer");
        if ($inviteEmployeeLayer.is(":visible")) closeInviteEmployeeLayer()
        else openInviteEmployeeLayer();
    }

    function openInviteEmployeeLayer(isBottomDisplay) {
        $inviteEmployeeLayer = $("#inviteEmployeeLayer");
        Ajax.executeApi(RestApi.GET.FLOW_USE_INTT_INFM_R001, {}, function (data) {
            var isSubDomain = location.hostname.indexOf(data.SUB_DOM.toLowerCase()) > -1;
            var url = location.protocol + "//" + (!isSubDomain ? data.SUB_DOM.toLowerCase() + "." : "") + location.hostname;
            $inviteEmployeeLayer.find(".js-link-text").text(url);
            $inviteEmployeeLayer.find("#firstInvitePopup").css("display", "block");
            $inviteEmployeeLayer.find("#popupBottom").css("display", isBottomDisplay ? "block" : "none");
            $inviteEmployeeLayer.fadeIn(200);
        })
        $inviteEmployeeLayer.find(".email-input").val("");
        $inviteEmployeeLayer.off("click").on("click", clickPopupArea);
    }

    function closeInviteEmployeeLayer() {
        $inviteEmployeeLayer.find(".js-invite-employee-layer").css("display", "none");
        $inviteEmployeeLayer.fadeOut(200);
    }

    function clickPopupArea(e) {
        var $eTarget = $(e.target);

        if (isLinkAreaAndAction($eTarget)) return;
        if (isCopyLinkBtnAndAction($eTarget)) return;
        if (isClosePopupBtnAndAction($eTarget)) return;
        if (isOtherInviteBtnAndAction($eTarget)) return;
        if (isNotViewTodayAndAction($eTarget)) return;

        function isLinkAreaAndAction($eTarget) {
            var $linkArea = $eTarget.findUp(".js-link-area");
            if ($linkArea.length === 0) return false;
            Often.copyUrl($linkArea.find(".js-link-text").text());
            return true;
        }

        function isCopyLinkBtnAndAction($eTarget) {
            var $copyLinkBtn = $eTarget.findUp("#copyLinkBtn");
            if ($copyLinkBtn.length === 0) return false;
            Often.copyUrl($copyLinkBtn.parent().find(".js-link-text").text());
            return true;
        }

        function isClosePopupBtnAndAction($eTarget) {
            var $closePopupBtn = $eTarget.findUp(".js-close-btn");
            if ($closePopupBtn.length === 0) return false;
            closeInviteEmployeeLayer();
            return true;
        }

        function isOtherInviteBtnAndAction($eTarget) {
            var $otherInviteBtn = $eTarget.findUp("#otherInviteBtn");
            if ($otherInviteBtn.length === 0) return false;
            window.open("/flow_admin.act?MENU=flow-invite", "admin_invite");
            closeInviteEmployeeLayer();
            return true;
        }

        function isNotViewTodayAndAction($eTarget) {
            var $notViewToday = $eTarget.findUp("#notViewToday");
            if ($notViewToday.length === 0) return false;
            Often.setCookie("FIRST_INVITE_POPUP", "Y", 1);
            closeInviteEmployeeLayer();
            return true;
        }
    }
})();