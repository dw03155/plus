var InviteProject = (function () {

    var $inviteLayer;
    var projectSrno;

    return {
        openInvite: openInvite,
        closeInvite: closeInvite,
        closeAllInviteLayer: closeAllInviteLayer,
        addInviteEvent: addInviteEvent,
        openInviteMain: openInviteMain,
        drawExitPopup: drawExitPopup,
        backInviteMain: backInviteMain,
        clickInvitePopup: clickInvitePopup,
    }

    function backInviteMain() {
        drawExitPopup(openInviteMain);
    }

    function openInvite(projectNumber, gubun) {
        const isGuest = StatusCode.UN_BFLOW.GUEST === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");
        projectSrno = Often.null2Void(projectNumber);
        $inviteLayer = $("#inviteLayer");

        if ("" !== projectSrno) {
            var projectColor = $("#projectColor").attr("class");
            var projectTitle = TagUtil.tag2html($("#projectTitle").text());
            $("#inviteTitle").html('<i class="' + projectColor + '"></i>' + projectTitle);
        }

        addInviteEvent();
        changeInviteDescription(isGuest);

        if ("" !== Often.null2Void(gubun)) {
            TeamInvite.openTeamInviteLayer(gubun, true);
            return;
        }

        makeInviteLink(function () {
            openInviteMain();
            $inviteLayer.fadeIn(200);
        });
    }

    function addInviteEvent() {
        $("#inviteLayer").off("click keyup")
            .on("click", clickInvitePopup)
            .on("keyup", keyUpInvitePopup);
    }

    function openInviteMain() {
        PopupDraw.closePopup();
        closeAllInviteLayer();
        $("#selectMemberList").empty();
        $("#inviteMainLayer").css("display", "block");
    }

    function makeInviteLink(callback) {
        if ("" === Often.null2Void(projectSrno)) return callback();
        Ajax.executeApi(RestApi.POST.COLABO2_INVT_C001, {
            COLABO_SRNO: projectSrno,
            GB: "CI",
            RENEWAL_YN: "Y",
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function (linkData) {
            $("#inviteLink").text(linkData.INVT_URL);
            callback();
        })
    }

    function clickInvitePopup(e) {
        var $eTarget = $(e.target);

        if (isCloseInviteLayerBtnAndAction($eTarget)) return;
        if (isBackAreaClickAndAction($eTarget)) return;
        if (isReturnMainBtnAndAction($eTarget)) return;
        if (isInviteUlAndAction($eTarget)) return;
        if (TeamInvite.isTeamInviteMenuAndAction($eTarget)) return;
        if (TeamInvite.isSubmitInviteAndAction($eTarget)) return;
        if (EmailInvite.isSendInviteEmailAndAction($eTarget)) return;
        if (EmailInvite.isAddEmailAndAction($eTarget)) return;
        if (EmailInvite.isEmailListAndAction($eTarget)) return;

        function isBackAreaClickAndAction($eTarget) {
            if (Often.isAct("subscreen")) return false;
            var $inviteMainLayer = $eTarget.findUp("#inviteMainLayer");
            var $sendInviteEmlLayer = $eTarget.findUp("#sendInviteEmlLayer");
            var $teamInviteLayer = $eTarget.findUp("#teamInviteLayer");
            if ($inviteMainLayer.length !== 0 || $sendInviteEmlLayer.length !== 0 || $teamInviteLayer.length !== 0) return false;
            drawExitPopup(closeInvite);
            return true;
        }

        function isCloseInviteLayerBtnAndAction($eTarget) {
            var $closeInviteLayerBtn = $eTarget.findUp(".closeInviteLayerBtn");
            if ($closeInviteLayerBtn.length === 0) return false;
            if (Often.isAct("subscreen")) {
                window.close();
            } else {
                drawExitPopup(closeInvite);
            }
            return true;
        }

        function isReturnMainBtnAndAction($eTarget) {
            var $returnMainBtn = $eTarget.findUp(".returnMainBtn");
            if ($returnMainBtn.length === 0) return false;
            drawExitPopup(openInviteMain);
            return true;
        }

        function isInviteUlAndAction($eTarget) {
            var $inviteUl = $eTarget.findUp("#inviteUl");
            if ($inviteUl.length === 0) return false;
            if (!clickInviteUl($eTarget)) return false;
            return true;
        }


    }

    function drawExitPopup(callback) {
        var $selectMemberItem = $inviteLayer.find("#selectMemberList li");
        var isWriteEmail = $("#sendInviteEmlLayer").is(":visible") && EmailInvite.isCheckWriteEmail();
        if ($selectMemberItem.length === 0 && !isWriteEmail) return callback();
        PopupDraw.drawConfirm({
            contents: {main: isWriteEmail ? "작성중인 내용이 있습니다. 나가시겠습니까?" : "선택된 참여자가 있습니다. 나가시겠습니까?"},
            callback: {submit: callback}
        })
    }

    function keyUpInvitePopup(e) {
        if (TeamInvite.isTeamInviteSearchAndAction(e)) return;
    }

    function closeAllInviteLayer() {
        initLayer();
        $("#teamInviteLayer, #inviteMainLayer, #sendInviteEmlLayer, #inviteEmplArea").css("display", "none");
    }

    function closeInvite() {
        PopupDraw.closePopup();
        initLayer();
        $inviteLayer.css("display", "none");
    }

    function initLayer() {
        var $sendEmlLayer = $("#sendInviteEmlLayer");
        $("#teamInviteArea").scrollTop(0);
        $sendEmlLayer.find(".invite-email-area").scrollTop(0);
        $sendEmlLayer.find(".emailItemInput").val("");
    }

    function changeInviteDescription(isGuest) {
        const $target = $('#openTeamInvite').find('em')
        const businessDescription = '직원 및 프로젝트를 함께했던 사람들을 초대할 수 있습니다.'
        const guestDescription = '프로젝트를 함께했던 사람들을 초대할 수 있습니다.'
        const defaultDescription = '회사 직원 또는 조직도를 확인하고 초대할 수 있습니다.'

        if(Often.isFunc('INVITATION_POPUP')) {
            $target.text(isGuest ? guestDescription : businessDescription)
        } else {
            $target.text(defaultDescription);
        }
    }

    function clickInviteUl($eTarget) {

        if ($eTarget.findUp("#copyInviteLink").length > 0) {
            Often.copyUrl($("#inviteLink").text());
            return true;
        }

        if ($eTarget.findUp("#openSendEml").length > 0) {
            EmailInvite.openSendInviteEmlLayer();
            return true;
        }

        if ($eTarget.findUp("#openTeamInvite").length > 0) {
            if (Often.isFunc("INVITATION_POPUP")) {
                InvitationPopup.openInvitationPopup();
                return true;
            }

            if (LimitGuest.isLimitGuest("invite", _IsMini)) return;
            TeamInvite.openTeamInviteLayer('team');
            return true;
        }

        if ($eTarget.findUp("#openSendienceInvite").length > 0) {
            TeamInvite.openTeamInviteLayer('sendience');
            return true;
        }
        return false;
    }

})();