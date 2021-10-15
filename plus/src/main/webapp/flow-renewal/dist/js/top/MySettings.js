var MySettings = (function () {

    var $mySettingPopup;

    return {
        openPopup: openPopup,
        closePopup: closePopup,
        initSetting: initSetting,
    }

    function closePopup() {
        $mySettingPopup.removeClass('d-block').addClass('d-none');
        closeAllPopup();
    }

    function openPopup() {
        if ($("#postPopup").is(":visible")) {
            PostPopup.checkWritingAndShowPopup(function () {
                PostPopup.removePopup();
                openPopupLayer();
            });
            return;
        }
        openPopupLayer();

        function openPopupLayer() {
            initLeft();
            $("#accountLayer").fadeOut(200);
            if ($(".js-read-check-layer").is(":visible") || $(".js-reaction-check-layer").is(":visible")) {
                $mySettingPopup.css("z-index", 10);
            } else {
                //pass
            }
            $mySettingPopup.removeClass('d-none').addClass('d-block');
            AccountSetting.openPopupLayer();
            initScrollLayer();
            addEvent();
        }
    }

    function initSetting() {
        $mySettingPopup = $("#mySettingPopup");
        AccountSetting.initProfileView();
        AccountSetting.updateUserName(_USER_NM);
    }

    function addEvent() {
        $mySettingPopup.off('click').on('click', function (e) {

            var $eTarget = $(e.target);
            var $mySettingLayer = $eTarget.findUp("#innerMySettingPopup");
            var $mySettingClose = $eTarget.findUp("#mySettingPopupCloseBtn");
            var $mySettingLeftMenu = $eTarget.findUp("#mySettingLeftMenu");
            var $mySettingEditorProfile = $eTarget.findUp("#editorProfilePhotoBtn");
            var $mySettingChangeProfile = $eTarget.findUp("#changeProfilePhotoBtn");
            var $mySettingRemoveProfile = $eTarget.findUp("#removeProfilePhotoBtn");
            var $mySettingProfilePopup = $eTarget.findUp("#editorProfilePhoto");
            var $editProfilePhoto = $("#editorProfilePhoto");
            var $versionUpgrade = $eTarget.findUp("#versionUpgrade");
            var $companyParticipationBtn = $eTarget.findUp("#companyParticipationBtn");

            if ($mySettingLayer.length === 0 || $mySettingClose.length > 0) return closePopup();
            if ($mySettingLeftMenu.length > 0) return clickLeftMenu($eTarget);
            if ($mySettingEditorProfile.length > 0) return clickEditorProfilePhotoBtn($eTarget)
            if ($mySettingChangeProfile.length > 0) return clickChangeProfilePhoto();
            if ($mySettingRemoveProfile.length > 0) return removeProfilePhoto();
            if ($versionUpgrade.length > 0) return clickVersionUpgradeBtn();
            if ($companyParticipationBtn.length > 0) return clickCompanyParticipationBtn();
            if ($mySettingProfilePopup.length === 0 && $editProfilePhoto.is(":visible")) {
                $editProfilePhoto.addClass("d-none");
                $mySettingEditorProfile.attr("class", "my-button-1");
            } else {
                //pass
            }
        });
    }

    function clickLeftMenu($eTarget) {
        closeAllPopup();

        var $targetButton = $eTarget.findUp(".js-my-setting-left");

        changeLeftBtnColor($targetButton);
        if ($targetButton.find("#accountSettingBtn").length > 0) {
            AccountSetting.openPopupLayer();
        } else if ($targetButton.find("#preferencesBtn").length > 0) {
            Preferences.openPopupLayer();
        } else if ($targetButton.find("#deviceManagementBtn").length > 0) {
            DeviceManagement.openPopupLayer();
        } else if ($targetButton.find("#projectSettingBtn").length > 0) {
            ProjectSettings.openPopupLayer();
        } else if ($targetButton.find("#outServiceBtn").length > 0) {
            OutService.openPopupLayer();
        } else if ($targetButton.find("#downloadAppBtn").length > 0) {
            DownloadApp.openPopupLayer();
        } else if ($targetButton.find("#paymentInfoBtn").length > 0) {
            PaymentInfo.openPopupLayer();
        } else {
            //done.
        }
        initScrollLayer();
    }

    function initScrollLayer() {
        $mySettingPopup.find(".js-my-scroll-layer").scrollTop(0);
    }

    function changeLeftBtnColor($targetButton) {
        var $mySettingLeftMenu = $("#mySettingLeftMenu");
        $mySettingLeftMenu.find(".my-color-type-2").removeClass("my-color-type-2").addClass("my-color-type-1");
        $mySettingLeftMenu.find(".my-type-text-1").removeClass("my-type-text-1").addClass("my-type-text-2");
        $targetButton.find(".my-color-type-1").removeClass("my-color-type-1").addClass("my-color-type-2");
        $targetButton.find(".my-type-text-2").removeClass("my-type-text-2").addClass("my-type-text-1");
    }

    function closeAllPopup() {
        DownloadApp.closePopupLayer();
        AccountSetting.closePopupLayer();
        DeviceManagement.closePopupLayer();
        Preferences.closePopupLayer();
        ProjectSettings.closePopupLayer();
        OutService.closePopupLayer();
        PaymentInfo.closePopupLayer();
    }

    function clickEditorProfilePhotoBtn($eTarget) {
        $eTarget.toggleClass("my-button-1").toggleClass("my-button-3");
        var isActive = $eTarget.hasClass("my-button-3");
        $("#editorProfilePhoto").attr("class", isActive ? "my-popup-pro-1-1" : "my-popup-pro-1-1 d-none");
    }

    function clickChangeProfilePhoto() {
        Upload.uploadFile("profile", AccountSetting.updateUserProfile)
        $("#editorProfilePhotoBtn").removeClass("my-button-3").addClass("my-button-1");
        $("#editorProfilePhoto").removeClass("d-block").addClass("d-none");
    }

    function removeProfilePhoto() {
        AccountSetting.updateUserProfile("6", "");
        $("#editorProfilePhoto").removeClass("d-block").addClass("d-none");
    }

    function clickVersionUpgradeBtn() {
        // 버튼 추가 필요
        var buyYn = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "BUY_YN");
        if (buyYn === BuyCode.FREE) {
            closePopup();
            Upgrade.showUpgradeLayer()
        }else{
            // 클릭 이벤트 제한
        }
    }

    function initLeft() {
        var $mySettingLeftMenu = $("#mySettingLeftMenu");
        $mySettingLeftMenu.find(".my-color-type-2").removeClass("my-color-type-2").addClass("my-color-type-1");
        $mySettingLeftMenu.find(".my-type-text-1").removeClass("my-type-text-1").addClass("my-type-text-2");
        $mySettingLeftMenu.find("li:first").find(".my-color-type-1").removeClass("my-color-type-1").addClass("my-color-type-2");
        $mySettingLeftMenu.find("li:first").find(".my-type-text-2").removeClass("my-type-text-2").addClass("my-type-text-1");
    }

    function clickCompanyParticipationBtn() {
        closePopup();
        CompanyJoin.openLayer();
    }
})();