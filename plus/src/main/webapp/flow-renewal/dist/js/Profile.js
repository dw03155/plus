var Profile = (function () {

    var profileId;

    return {
        drawProfilePopup: drawProfilePopup,
        convertClphNo: convertClphNo,
    }

    function drawProfilePopup(profileUserId) {
        if (profileUserId === "ALL") return;
        profileId = profileUserId;
        var isVisisbleProfilePopup = $(".js-profile-popup").is(":visible");
        var $tempPopup = isVisisbleProfilePopup ? $("#tempPopup") : PopupDraw.getPopupWrapObj();
        $tempPopup.css("z-index", 11);
        if (!isVisisbleProfilePopup) $tempPopup.find(".contents").html('')
        $tempPopup.find(".contents").append('<div class="profile-popup js-profile-popup d-none"></div>');
        var $profilePopup = $tempPopup.find(".js-profile-popup");

        setProfileData($tempPopup, $profilePopup);
        addProfileClickEvent($profilePopup);

        if (Electron.isElectronApp() && Often.isAct("subscreen")) $profilePopup.append($('#draggableForElectron').html())
    }

    function setProfileData($tempPopup, $profilePopup) {
        Ajax.executeApi(RestApi.GET.COLABO2_USER_PRFL_R002, {
            SRCH_USER_ID: profileId
        }, function (dat) {
            $profilePopup.append(getProfileContentHtml(dat));
            $profilePopup.css("display", "block");
            if (!$(".js-profile-popup").is(":visible")) {
                PopupDraw.closePopup();
                PopupDraw.openTempPopup($tempPopup);
            } else {
                $($(".js-profile-popup")[0]).remove();
            }
            PopupDraw.addEventOnTempPopup($tempPopup);

            var isSelf = (profileId === _USER_ID);
            var $btnVideo = $(".btn-wr").find(".js-btn-video");
            Often.showOrHideByFunc("VIDEO_CONFERENCE", $btnVideo);
            isSelf && $btnVideo.css("display", "none");

            if (Often.isAct("subscreen") && isSelf) {
                $profilePopup.find('.btn-modi').css("display", "none");
                $profilePopup.addClass('mini-profile-popup');
            }
        });
    }

    function getProfileContentHtml(dat) {
        var profileItemHtml = $("#profilePopup").html();
        var isLoginUser = dat.USER_ID === _USER_ID;
        var hasProfileImg = Often.null2Void(dat.PRFL_PHTG).length === 0;
        return ListHelper.replaceJson(profileItemHtml, {
            user_status_display: ListHelper.setDisplay(Often.isFunc("SET_STATUS")),
            btn_modi_display: ListHelper.setDisplay(isLoginUser && !Often.isAct("messenger"), "block"),
            btn_video_display: ListHelper.setDisplay(!isLoginUser, "block"),
            li_slogan_display: ListHelper.setDisplay(Often.isFunc(Func.CLOUD.SHOW_SLOGAN)),
            profile_image: hasProfileImg ? "" : ListHelper.setProfile(dat.PRFL_PHTG),
            IMG_DEFAULT: hasProfileImg ? "default" : "",
            USER_EMAIL: dat.EML.length !== 0 ? dat.EML : "-",
            USER_TXT: dat.SLGN.length !== 0 ? dat.SLGN : "-",
            USER_CALL: dat.CMPN_TLPH_NO.length !== 0 ? dat.CMPN_TLPH_NO : "-",
            USER_PHONE: dat.CLPH_NO.length !== 0 ? dat.CLPH_NO : "-",
            USER_NAME: dat.FLNM,
            USER_POSITION: Often.null2Void(dat.RSPT_NM, dat.JBCL_NM),
            USER_COMPANY: dat.CMNM,
            USER_DEPARTMENT: dat.DVSN_NM,
            USER_ID: dat.USER_ID,
        })
    }

    function addProfileClickEvent($profilePopup) {
        $profilePopup.off("click").on("click", function (e) {
            e.stopPropagation();
            var $eTarget = $(e.target);
            var isMiniPopupProfile = Electron.isElectronApp() && Often.isAct("subscreen");
            if ($eTarget.findUp(".js-user-status").length > 0) {
                Often.toast("error", "상태설정 - 준비중!!!");
            } else if ($eTarget.findUp(".js-btn-chat").length > 0) {
                if (!isMiniPopupProfile) PopupDraw.closePopup();
                OpenUtil.openMessengerByOneUserId(profileId);
            } else if ($eTarget.findUp(".js-btn-modi").length > 0) {
                if (!isMiniPopupProfile) PopupDraw.closePopup();
                MySettings.openPopup();
            } else if ($eTarget.findUp(".js-btn-video").length > 0) {
                PopupDraw.closePopup();
                if (LimitGuest.isLimitGuest("video", Often.isAct("messenger"))) return;
                VideoConference.isZoomSynchronized(
                    VideoConference.warnAndSendMessage,
                    VideoConference.alertRequiredZoomSync,
                    {isMini: Often.isAct("messenger"), type: 'userID', val: $eTarget.attr('user_id')}
                )
            } else if ($eTarget.findUp(".btn-close").length > 0) {
                isMiniPopupProfile ? window.close() : PopupDraw.closePopup();
            }
        })
    }

    function convertClphNo(str) {
        var convertStr = "";
        str = Often.null2Void(str, "-");
        if (!str.length < 8) {
            convertStr = str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-");
        } else {
            convertStr = "-"
        }
        return convertStr;
    }
})();