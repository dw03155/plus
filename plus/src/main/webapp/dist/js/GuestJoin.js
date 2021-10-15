var GuestStep = (function () {

    var $joinGuestEmail = $("#joinGuestEmail");
    var $guestStep = $("#guestStep");

    var ERROR_CODE = {
        NO_PROBLEM: '0000',
        EXISTS_EMAIL: '5000',
    }

    return {
        openGuestStep: openGuestStep,
    }

    function openGuestStep() {
        $("#userStep").fadeOut(0);
        $guestStep.fadeIn(200);

        $guestStep.find("input").off("keyup").on("keyup", CommonJoin.keyupJoinInput);
        $guestStep.find(".js-view-button").off("mousedown").on("mousedown", CommonJoin.mousedownViewButton);
        $guestStep.find(".js-view-button").off("mouseup").on("mouseup", CommonJoin.mouseupViewButton);
        $joinGuestEmail.on("focusout", CommonJoin.focusoutJoinInput);
        $("#guestConfirmCheck").off("click").on("click", CommonJoin.clickConfirmCheck);
        $("#googleLoginButton").off("click").on("click", GoogleLogin.clickGoogleLoginButton);
        $("#kakaoLoginButton").off("click").on("click", KakaoLogin.clickKakaoLoginButton);
        $("#appleLoginButton").off("click").on("click", AppleLogin.clickAppleLoginButton);
        $("#userStepButton").off("click").on("click", CommonJoin.changeFirstStepButton);
        $("#guestFinalButton").off("click").on("click", function (e) {
            CommonJoin.moveSecondStepButton(e, openGuestFinalStep);
        });
    }

    function openGuestFinalStep() {
        var userInfo = CommonJoin.getUserInfo("joinGuest");
        userInfo.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_REGISTER_C001, userInfo, function (dat) {
            var errorCode = Often.null2Void(dat['ERR_CD'], '');
            if (ERROR_CODE.NO_PROBLEM !== errorCode) {
                if (ERROR_CODE.EXISTS_EMAIL === errorCode) {
                    CommonJoin.changeInputErrorMsg($joinGuestEmail, $joinGuestEmail.attr("data-un-valid-msg2"));
                }
            }
            $guestStep.fadeOut(0);
            $("#guestFinalStep").fadeIn(200);
            $("#guestStartButton").off("click").on("click", function () {
                Loading.drawLoadingPop(true);
                CommonJoin.goLoginAfterJoin(userInfo);
            });
        })
    }
})();