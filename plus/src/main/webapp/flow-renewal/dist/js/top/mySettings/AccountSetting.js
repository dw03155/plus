var AccountSetting = (function () {

    var $accountSetting;

    return {
        initProfileView: initProfileView,
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
        getUserData: getUserData,
        updateUserProfile: updateUserProfile,
        updateUserName: updateUserName,
    }

    function init() {
        $accountSetting = $("#accountSettingLayer");
        $accountSetting.find(".read-mode").removeClass("d-none").addClass("d-block");
        $accountSetting.find(".editor-mode").removeClass("d-block").addClass("d-none");
        $accountSetting.find("#statusMessageMenu").css("display", Often.isFunc("SHOW_SLOGAN") ? "block" : "none");
        getUserData(makeUserData);
    }

    function openPopupLayer() {
        init();
        $accountSetting.removeClass('d-none').addClass('d-block');
        addEvent();
    }

    function closePopupLayer() {
        $accountSetting.removeClass('d-block').addClass('d-none');
    }

    function addEvent() {
        $(".change-editor-btn").off('click').on('click', changeEditorMode);
        $(".cancel-change").off('click').on('click', cancelChange);
        $(".change-ok").off('click').on('click', changeUserPrfl)
        $("#changePasswordBtn").off('click').on('click', clickChangePasswordBtn);
        $("#changePasswordCancel").off("click").on("click", clickChangePasswordCancelBtn);
        $("#leaveFlowBtn").off("click").on("click", leaveFlow)
    }

    function clickChangePasswordBtn() {
        var password = $("#myPassword").val();
        var password2 = $("#myPassword2").val();

        var checkJson = Validation.checkInput($("#myPassword"), true);
        if (Object.keys(checkJson).length > 0) return;

        if (password !== password2) {
            Often.toast("error", i18next.t('front.alert.passwordNotMatch'));
            return;
        }

        changePassword(password);
    }

    function clickChangePasswordCancelBtn() {
        var $editInput = $("#myPassword").parents(".edit-input");
        $("#myPassword, #myPassword2").val("");
        $editInput.find(".read-mode").removeClass("d-none").addClass("d-block");
        $editInput.find(".editor-mode").removeClass("d-block").addClass("d-none");
    }

    function leaveFlow() {
        PopupDraw.drawConfirm({
            contents: {main: i18next.t('front.alert.askDeleteAccount')},
            callback: {submit: deleteUser}
        })
    }

    function deleteUser() {
        Ajax.executeApi(RestApi.DELETE.COLABO2_USER_DELETE_001, {
            SRCH_USER_ID: _USER_ID,
        }, function (dat) {
            Often.toast("success", i18next.t('front.alert.deleteAccount'));
            Often.logoutDirect();
        })
    }

    function changePassword(password) {
        var passwordData = {"PWD": password}
        Ajax.executeApi(RestApi.PUT.COLABO2_PWD_U002, passwordData, changePasswordCallback);
    }

    function changePasswordCallback() {
        $("#myPassword, #myPassword2").val("");
        var $editInput = $("#myPassword").parents(".edit-input");
        $editInput.find(".read-mode").removeClass("d-none").addClass("d-block");
        $editInput.find(".editor-mode").removeClass("d-block").addClass("d-none");
        Often.toast("success", i18next.t('front.alert.passwordChange'));
    }

    function changeUserPrfl(e) {
        var $eTarget = $(e.target);
        var $accountButton = $eTarget.findUp(".js-account-set-button");
        var gubun = $accountButton.attr("gubun");
        var changeData = $accountButton.parents('.my-type-text-1').children('input').val();
        var countryCode = $accountButton.parents('.my-type-text-1').children('select').val();
        var $targetInput = $accountButton.parents('.my-type-text-1').find("input");
        if (!((gubun === "3" || gubun === "5") && changeData === "")) {
            var checkJson = Validation.checkInput($targetInput, true);
            if (Object.keys(checkJson).length > 0) return;
        } else {
            //pass
        }
        updateUserProfile(gubun, changeData, countryCode, $eTarget);
    }

    function changeEditorMode(e) {
        var $eTarget = $(e.target);
        var editInput = $eTarget.parents(".edit-input");
        if (editInput.length === 0) return;

        var isUtlz = _USE_INTT_ID.indexOf("UTLZ_") === 0;
        if (editInput.find(".editor-mode").find("#myPassword").length !== 0 && isUtlz) {
            window.open("https://www.bizplay.co.kr/comm_0023_01.act", "_blank");
            return;
        }

        editInput.find(".read-mode").removeClass('d-block').addClass('d-none');
        editInput.find(".editor-mode").removeClass('d-none').addClass('d-block');

        if (editInput.find(".editor-mode").find('select').length > 0) {
            var textSplit = editInput.find(".read-mode").find("div").text().split(" ");
            editInput.find(".editor-mode").find("select").val(textSplit[0].replace("(", "").replace(")", ""));
            editInput.find(".editor-mode").find("input").val(textSplit[1].replace(/-/g, ""));
            return;
        }

        if (editInput.find(".editor-mode").find("#myPassword").length === 0) {
            editInput.find(".editor-mode").find("input").val(editInput.find(".read-mode").find("div").text());
            return;
        }

        editInput.find(".editor-mode").find("#myPassword").focus();
    }

    function cancelChange(e) {
        var $eTarget = $(e.target);
        if ($eTarget.hasClass("edit-input") || $eTarget.parents(".edit-input")) {
            var editInput = $eTarget.hasClass("edit-input") ? $eTarget : $eTarget.parents(".edit-input");
            editInput.find(".editor-mode").removeClass('d-block').addClass('d-none');
            editInput.find(".read-mode").removeClass('d-none').addClass('d-block');
        }
    }

    function getUserData(callback) {
        var userData = {"SRCH_USER_ID": _USER_ID};
        Ajax.executeApi(RestApi.GET.COLABO2_USER_PRFL_R002, userData, callback);
    }

    function makeUserData(dat) {
        var countryCodeSplit = dat.CLPH_NTNL_CD.split("_");
        var countryCode = countryCodeSplit[1];
        var companyCountryCodeSplit = dat.CMPN_TLPH_NTNL_CD.split("_");
        var companyCountryCode = companyCountryCodeSplit[1];

        $accountSetting.find("#user_id").text(dat.USER_ID);
        $accountSetting.find("#bannerUserNm").text(dat.FLNM);
        $accountSetting.find("#email").text(dat.EML);
        $accountSetting.find("#phoneNum").text("(+" + countryCode + ") " + replacePhoneNum(dat.CLPH_NO));
        $accountSetting.find("#companyName").text(dat.CMNM);
        $accountSetting.find("#dvsnName").text(Often.null2Void(dat.DVSN_NM)); //null문자열 박히는 케이스 발생 시 우선 공백 처리
        $accountSetting.find("#position").text(dat.JBCL_NM);
        $accountSetting.find("#companyPhoneNum").text("(+" + companyCountryCode + ") " + replacePhoneNum(dat.CMPN_TLPH_NO));
        $accountSetting.find("#statusMessage").text(dat.SLGN);

        updateUserName(dat.FLNM);
        updateProfileView(dat.PRFL_PHTG);
        hideEditMode();
    }

    function initProfileView() {
        AccountSetting.getUserData(function (dat) {
            updateProfileView(dat.PRFL_PHTG);
        })
    }

    function hideEditMode() {
        var isPaidCompanyUser = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "BUY_YN") === BuyCode.PAID_COMPANY;
        var isEmailUser = _USER_ID === $accountSetting.find("#email").text();

        var $accountSettingLayer = $("#accountSettingLayer");
        ServerChecker.isUtlz && removeEditBtn("dvsn");
        isPaidCompanyUser && removeEditBtn("company");
        isEmailUser && removeEditBtn("email");

        function removeEditBtn(key) {
            $accountSettingLayer.find(".js-" + key + "-set").find(".change-editor-btn").remove();
        }
    }

    function updateUserName(userName) {
        $("#accountSettingLayer").find(".js-user-name").text(userName)
        $("#acconutModal").find(".js-user-name").text(userName);
        _USER_NM = userName;
    }

    function updateProfileView(imageUrl) {
        var profileImage = ImageUtil.removeDomain("PROFILE", imageUrl);
        var defaultImage = ImageUtil.removeDomain("PROFILE", "");
        var urlText = 'url(' + profileImage + '), url(' + defaultImage + ')'; //이미지 로드 실패시 디폴트 처리
        $("#acconutModal").find(".js-profile").css('background-image', urlText);
        $("#ProfileImg").css('background-image', urlText);
        $("#mySettingPopup").find("#myPicture").css('background-image', urlText);
        _PRFL_PHTG = profileImage;
    }

    function updateUserProfile(updateGubun, changeData, countryCode, $eTarget) {
        if (!changeData && changeData !== "") {
            changeData = updateGubun.IMG_PATH;
            updateGubun = "6";
        }

        if (updateGubun === "9" && (/[#\<\>]/).test(changeData)) {
            Often.toast("error", "<, >, #, \" " + i18next.t('front.alert.specialCharacter'));
            return;
        }

        var updateData = getUpdateData(updateGubun, changeData, countryCode);

        Ajax.executeApi(RestApi.PUT.COLABO2_USER_PRFL_U002, updateData, function () {
            if (updateGubun === "1") {
                _USER_NM = changeData;
                updateUserName(changeData)
            } else if (updateGubun === "2") {
                $accountSetting.find("#email").text(changeData);
            } else if (updateGubun === "3") {
                $accountSetting.find("#phoneNum").text("(" + countryCode + ") " + replacePhoneNum(changeData));
            } else if (updateGubun === "4") {
                $accountSetting.find("#position").text(changeData);
            } else if (updateGubun === "5") {
                $accountSetting.find("#companyPhoneNum").text("(" + countryCode + ") " + replacePhoneNum(changeData));
            } else if (updateGubun === "6") {
                updateProfileView(changeData);
            } else if (updateGubun === "7") {
                _BSNN_NM = changeData;
                $accountSetting.find("#companyName").text(changeData);
            } else if (updateGubun === "8") {
                _DVSN_NM = changeData;
                $accountSetting.find("#dvsnName").text(changeData);
            } else if (updateGubun === "9") {
                $accountSetting.find("#statusMessage").text(changeData);
            } else {
                Often.toast("error", i18next.t('front.alert.confirmInput', {val: '$t(dictionary.setting)'}));
                return;
            }
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}));
            if (!$eTarget) return;
            var editInput = $eTarget.parents('.edit-input');
            editInput.find(".editor-mode").removeClass('d-block').addClass('d-none');
            editInput.find(".read-mode").removeClass('d-none').addClass('d-block');
        });
    }

    function replacePhoneNum(phoneNum) {
        var phoneRex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/ //운영이랑 정규식 일치시킴
        return phoneNum.replace(phoneRex, "$1-$2-$3");
    }

    function getUpdateData(updateGubun, changeData, countryCode) {
        var updateData = {};
        switch (updateGubun) {
            case "1":
                updateData.FLNM = changeData;
                break;
            case "2":
                updateData.EML = changeData;
                break;
            case "3":
                updateData.CLPH_NO = changeData;
                updateData.CLPH_NTNL_CD = countryCode;
                break;
            case "4":
                updateData.JBCL_NM = changeData;
                break;
            case "5":
                updateData.CMPN_TLPH_NO = changeData;
                updateData.CMPN_TLPH_NTNL_CD = countryCode;
                break;
            case "6":
                updateData.PRFL_PHTG = changeData;
                break;
            case "7":
                updateData.CMNM = changeData;
                break;
            case "8":
                updateData.DVSN_NM = changeData;
                break;
            case "9":
                updateData.SLGN = changeData;
                break;
            default:
                break;
        }
        return updateData;
    }
})();