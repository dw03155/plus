var EmailInvite = (function () {

    return {
        openSendInviteEmlLayer: openSendInviteEmlLayer,
        isSendInviteEmailAndAction: isSendInviteEmailAndAction,
        isAddEmailAndAction: isAddEmailAndAction,
        isEmailListAndAction: isEmailListAndAction,
        getEmail: getEmail,
        isCheckWriteEmail: isCheckWriteEmail,
    }

    function openSendInviteEmlLayer() {
        var baseEmlListLength = 5;
        InviteProject.closeAllInviteLayer();
        $("#emailList").empty();

        for (var i = 0; i < baseEmlListLength; i++) {
            addEmail();
        }

        //초대 내용 겹치는 이슈 임시 예외처리 Start
        var firstMsgHtml = "<p>" + i18next.t("front.inviteProject.inviteMessageBottomText") + "</p>";
        $("#inviteMsg").html(firstMsgHtml);
        //end 추후 다국어 부분 수정 필요

        $("#sendInviteEmlLayer").css({
            "display": "block",
            "right": "inherit",
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%,-50%)",
        });
    }

    function sendEmail() {
        var $emailItemInput = $("#emailList .emailItemInput");
        var checkJson = Validation.checkInput($emailItemInput);
        var inviteMessage = $("#inviteMsg").html().replace(/(<p>)/gi, "").replace(/(<\/p>)/gi, "<br>");
        if (Object.keys(checkJson).length > 0 && checkJson.errorCode !== "empty") {
            Often.toast("error", checkJson.errorMessage);
            checkJson.errorObj.focus();
            return;
        }
        var emailList = getEmail($emailItemInput);
        if (emailList.length === 0) {
            Often.toast("info", i18next.t('front.alert.notExist', {val: '$t(dictionary.email)'}));
            return;
        }
        Ajax.executeApi(RestApi.POST.COLABO2_SENDIENCE_C002, {
            COLABO_SRNO: Detail.getProjectSrno(),
            INVT_URL: $("#inviteLink").text(),
            CNTN: inviteMessage,
            EML_REC: emailList,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function () {
            Often.toast("success", i18next.t('front.alert.invitationEmailSent'));
            $emailItemInput.val("");
        })
    }

    function getEmail($emailItemInput) {
        var emailList = [];
        $emailItemInput.each(function (i, v) {
            var email = $.trim($(v).val());
            var isExistsEmail = ("" !== email)
            isExistsEmail && emailList.push({"EML": email});
        });
        return emailList;
    }

    function addEmail() {
        var $tempEmailItem = $($("#tempEmailItem").html());
        $("#emailList").append($tempEmailItem);
        return true;
    }

    function deleteEmail($eTarget) {
        var baseEmlListLength = 5;
        var currentEmailItem = $eTarget.parent(".emailItem");
        var emailItemLength = $("#emailList .emailItem").length;

        if (baseEmlListLength < emailItemLength) currentEmailItem.remove();
        else currentEmailItem.find(".emailItemInput").val("");
    }

    function isSendInviteEmailAndAction($eTarget) {
        var $sendInviteEmail = $eTarget.findUp("#sendInviteEmail");
        if ($sendInviteEmail.length === 0) return false;
        sendEmail();
        return true;
    }

    function isAddEmailAndAction($eTarget) {
        var $addEmail = $eTarget.findUp("#addEmail");
        if ($addEmail.length === 0) return false;
        addEmail();
        return true;
    }

    function isEmailListAndAction($eTarget) {
        var $emailList = $eTarget.findUp("#emailList");
        if ($emailList.length === 0) return false;
        if ($eTarget.hasClass("deleteEmail")) {
            deleteEmail($eTarget);
        }
        return true;
    }

    function isCheckWriteEmail() {
        var $sendInviteEmlLayer = $("#sendInviteEmlLayer");
        var $emailInput = $sendInviteEmlLayer.find(".emailItemInput");
        var $inviteMsgHtml = $sendInviteEmlLayer.find("#inviteMsg").html().replace("<br>", "<br/>");
        var firstMsgHtml = "<p>" + i18next.t("front.inviteProject.inviteMessageBottomText") + "</p>";

        var isCheckWrite = false;
        $.each($emailInput, function (i, v) { //이메일 영역 체크
            if ($(v).val() !== "") {
                isCheckWrite = true;
                return;
            }
        })

        if (!isCheckWrite && $inviteMsgHtml !== firstMsgHtml) isCheckWrite = true; //초대 내용 영역 체크
        return isCheckWrite;
    }
})();