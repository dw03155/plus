var InvitePopup = (function () {

    var projectSrno;
    var $mainInvitePopup;

    var PROJECT_INVITE = {
        JOIN: "Y",
        WAIT: "W",
        NONE: "N",
    }

    return {
        checkInviteAndAction: checkInviteAndAction,
        openInvitePopup: openInvitePopup,
        makeInvitePopup: makeInvitePopup,
        clearInvitePopup: clearInvitePopup,
    }

    function checkInviteAndAction(callback) {
        var isInvite = Often.null2Void(CONNECT_INVITE_KEY) !== "";
        if (isInvite) {
            openInvitePopup(callback);
            return;
        }
        (typeof callback === 'function') && callback(true);
    }

    function openInvitePopup(callback) {
        Ajax.executeApi(RestApi.GET.COLABO2_INVT_R001, {
            INVT_KEY: CONNECT_INVITE_KEY,
        }, function (dat) {
            makeInvitePopup(dat, callback);
        })
    }

    function set$element() {
        $mainInvitePopup = $("#mainInvitePopup");
    }

    function makeInvitePopup(dat, callback) {
        projectSrno = Often.null2Void(dat.COLABO_SRNO, "");
        if ("" === projectSrno) return (location.href = "errorpage.act");
        var passYn = Often.null2Void(dat.PASS_YN, PROJECT_INVITE.NONE);

        if (passYn === "C" || passYn === PROJECT_INVITE.WAIT) {
            PopupDraw.drawConfirm({
                contents: {
                    main: i18next.t('front.common.requestingToJoin'),
                    cancel: i18next.t('front.common.cancelApplication'),
                },
                callback: {
                    cancel: cancelJoinProject,
                }
            })
            return;
        }

        if (passYn === PROJECT_INVITE.JOIN) {
            if (Often.null2Void(projectSrno) === "") return;
            ViewChanger.loadPageJson({code: "detail", first: projectSrno});
            return;
        }
        (typeof callback === 'function') && callback();

        var isRequestProject = dat.JNNG_ATHZ_YN === "Y";
        var $tempHtml = getInvitePopupObj(dat).attr("id", "mainInvitePopup");
        $tempHtml.off("click").on("click", function (e) {
            var $eTarget = $(e.target);
            var $this = $(this);
            var $btnClose = $eTarget.findUp(".btn-close");
            var $backArea = $eTarget.findUp(".back-area");
            var $contentsArea = $eTarget.findUp(".contents-area");
            var $acceptBtn = $eTarget.findUp("#acceptBtn");

            if ($btnClose.length > 0 || ($backArea.length > 0 && $contentsArea.length === 0)) return clearInvitePopup($this);
            if ($acceptBtn.length > 0) {
                clearInvitePopup($this);
                if (isRequestProject) {
                    JoinProject.updateJoinStatus(projectSrno, "", JoinStatus.REQUEST_JOIN);
                    setOpenProjectItem(PROJECT_INVITE.WAIT);
                } else {
                    JoinProject.updateJoinStatus(projectSrno, "", JoinStatus.APPLY_JOIN);
                }
            }
        })

        $('body').append($tempHtml);
        set$element();
        $mainInvitePopup.fadeIn(200);


        //가입 취소
        function cancelJoinProject() {
            setOpenProjectItem(PROJECT_INVITE.NONE);
            PopupDraw.closePopup();
            JoinProject.updateJoinStatus(projectSrno, _USER_ID, JoinStatus.CANCEL_REQUEST_JOIN, PopupDraw.closePopup());
        }

        function setOpenProjectItem(passYn) {
            $("#openProjectList").find(".project-item[value=" + dat.COLABO_SRNO + "]").attr("PASS_YN", passYn);
        }
    }

    function clearInvitePopup() {
        CONNECT_INVITE_KEY = "";
        $mainInvitePopup.fadeOut("200", function () {
            $mainInvitePopup.remove();
        });
    }

    function getInvitePopupObj(dat) {
        var $invitePopup = $($("#sentInvitationPopup").html());
        var profileUrl = ImageUtil.removeDomain("PROFILE", dat.PRFL_PHTG);
        var isRequestProject = dat.JNNG_ATHZ_YN === "Y";
        $invitePopup.find(".js-prfl").css("background-image", "url(" + profileUrl + ")");
        $invitePopup.find(".js-title").text(dat.TTL);
        $invitePopup.find(".js-name").text(dat.FLNM);
        $invitePopup.find(".js-count").text(i18next.t('front.invitePopup.participating', {count: dat.SENDIENCE_CNT}));
        $invitePopup.find("#acceptBtn").text(i18next.t(isRequestProject ? 'front.invitePopup.requestToJoin' : 'front.invitePopup.accept'));
        return $invitePopup;
    }
})();