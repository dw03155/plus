var CommonJoin = (function () {

    var FLOW_URL = {
        TEST: '.flowtest.info',
        REAL: '.flow.team',
    }

    return {

        //get
        getUserInfo: getUserInfo,

        //set
        changeInputErrorMsg: changeInputErrorMsg,
        setUserStepEvent: setUserStepEvent,

        //action
        goLoginAfterJoin: goLoginAfterJoin,

        //event
        focusoutJoinInput: focusoutJoinInput,
        changeFirstStepButton: changeFirstStepButton,
        moveSecondStepButton: moveSecondStepButton,
        moveFinalStepButton: moveFinalStepButton,
        clickConfirmCheck: clickConfirmCheck,
        keyupJoinInput: keyupJoinInput,
        mousedownViewButton: mousedownViewButton,
        mouseupViewButton: mouseupViewButton,
        changeTeamSector: changeTeamSector,
        registerSubDomain: registerSubDomain,
    }

    function setUserStepEvent() {
        var $userStep = $("#userStep");
        $userStep.find("input").on("keyup", keyupJoinInput);
        $userStep.find(".js-view-button").on("mousedown", mousedownViewButton).on("mouseup", mouseupViewButton);
        $userStep.find("#joinUserEmail").on("focusout", focusoutJoinInput);
        $userStep.find("#joinConfirmCheck").on("click", clickConfirmCheck);
        $userStep.find("#guestStepButton").on("click", changeFirstStepButton);
        $userStep.find("#teamStepButton").on("click", function (e) {
            moveSecondStepButton(e, BusinessJoin.openTeamStep);
        });
    }

    // firstStep : userStep, guestStep
    function changeFirstStepButton(e) {
        var $userStep = $("#userStep");
        var $guestStep = $("#guestStep");
        var $teamStep = $("#teamStep");
        var $eTarget = $(e.target);
        if ($eTarget.is("#userStepButton")) {
            clearPrevPageData($guestStep.find("input"));
            $userStep.fadeIn(200);
            $guestStep.fadeOut(0);
        } else if ($eTarget.is("#guestStepButton")) {
            clearPrevPageData($userStep.find("input"));
            clearPrevPageData($teamStep.find("input"));
            GuestStep.openGuestStep();
        }
    }

    // secondStep :teamStep, guestFinalStep
    function moveSecondStepButton(e, callback) {
        var isStop;
        var $eTarget = $(e.target);
        var $mainStep = $eTarget.findUp(".js-main-step");
        var isGuest = $mainStep.is("#guestStep");
        var joinFormValue = $mainStep.find(".js-join-email").val();
        if (isInputsError($mainStep)) isStop = true;
        if (!isCheckConfirm($eTarget)) isStop = true;
        if (isStop) return;
        $("body").css("overflow", "hidden");
        EmailAuth.sendToServer(joinFormValue, joinFormValue, "E", isGuest, function () {
            $("body").css("overflow", "auto");
            (typeof callback === "function") && callback()
        });
    }

    function isCheckConfirm($eTarget) {
        var $confirmCheck = $eTarget.parent().find(".js-confirm-input");
        var isChecked = $confirmCheck.hasClass("checked");
        if (!isChecked) {
            var $errorText = $confirmCheck.findUp(".js-join-check").find(".js-error-text");
            $errorText.css("display", "block");
        }
        return isChecked;
    }

    function keyupJoinInput(e) {
        if (KeyCheck.isAvailable(e)) return;
        var $eTarget = $(e.target);
        var isEmailInput = $eTarget.is(".js-join-email");
        var isPasswordInput = $eTarget.is(".js-join-password");
        var isPasswordInput2 = $eTarget.is(".js-join-password2");
        var isTeamNameInput = $eTarget.is(".js-team-name");
        var $isErrorStatus = $eTarget.hasClass("input-error");
        var isSector = $eTarget.is(".js-sector-input");

        if (!isTeamNameInput) removeBlank($eTarget); //팀이름 제외 공백제거

        var checkJson = Validation.checkInput($eTarget);
        var isValidate = (Object.keys(checkJson).length === 0) || checkJson.errorCode === "empty";

        //이메일 에러모드 또는 글자수 제한을 넘기 전까지 키업체크안함
        if (isEmailInput && !$isErrorStatus && !(checkJson.errorCode === "over")) return;
        if (isSector) {
            changeInputErrorMsg($eTarget, $eTarget.val().length > 30 ? i18next.t('front.placeHolder.lengthLimit', {count: 30}) : '');
            return;
        }

        changeInputErrorMsg($eTarget, isValidate ? "" : checkJson.errorMessage);

        if (isPasswordInput || isPasswordInput2) {
            var isExistPassword = "" !== $eTarget.val();
            $eTarget.parent().find(".js-view-button").css("display", isExistPassword ? "block" : "none");
        } else {
            //pass
        }

        //비밀번호 키업시 비밀번호 확인영역 체크
        var $joinPassword2 = $eTarget.findUp("#userStep").find(".js-join-password2");
        if (isPasswordInput && "" !== $joinPassword2.val()) {
            checkJson = Validation.checkInput($joinPassword2);
            var isSamePassword = (Object.keys(checkJson).length > 0) && checkJson.errorCode === "un-valid";
            changeInputErrorMsg($joinPassword2, isSamePassword ? checkJson.errorMessage : "");
        }
    }

    function removeBlank($inputEl) {
        var inputVal = $inputEl.val().replace(/ /gi, '');
        $inputEl.val(inputVal);
        if (inputVal === 0) changeInputErrorMsg($inputEl, "");
    }

    function focusoutJoinInput(e) {
        var $eTarget = $(e.target);
        if ($eTarget.val().length === 0) return;
        if ($eTarget.is(".js-join-email")) {

            var checkJson = Validation.checkInput($eTarget);
            var isValidate = (Object.keys(checkJson).length === 0) || checkJson.errorCode === "empty";
            changeInputErrorMsg($eTarget, isValidate ? "" : checkJson.errorMessage);
            if (Object.keys(checkJson).length > 0) return;

            Ajax.executeApi(RestApi.GET.COLABO_USER_DUPLICATE_R001, {
                USER_ID: $.trim($eTarget.val())
            }, function (dat) {
                var errorCode = Often.null2Void(dat['ERR_CD']);
                var errMsg = (errorCode !== '0000' ? "사용 중인 이메일 주소입니다. 다른 메일 주소를 등록해주세요." : "");
                changeInputErrorMsg($eTarget, errMsg);
            })
        }
    }

    function changeInputErrorMsg($inputEl, errMsg) {
        var $errorText = $inputEl.parent().find(".error-text");
        if (errMsg.length === 0) {
            $inputEl.removeClass("input-error");
            $errorText.css("display", "none");
        } else {
            $inputEl.addClass("input-error");
            $errorText.css("display", "block");
        }
        $errorText.text(errMsg);
    }

    function clickConfirmCheck(e) {
        var $eTarget = $(e.target);
        var $errorText = $eTarget.findUp(".js-join-check").find(".js-error-text");
        $eTarget.toggleClass('checked');
        $errorText.css("display", "none");
    }

    function clearPrevPageData($inputEl) {
        // 체크 지우기
        var $confirmCheck = $(".js-confirm-check");
        $confirmCheck.removeClass("checked");
        $confirmCheck.parent().find(".js-error-text").css("display", "none");
        // 전 페이지 input 값 비우기
        $.each($inputEl, function (i, input) {
            var $input = $(input);
            changeInputErrorMsg($input, "");
            $input.val("");
        })
    }

    function mousedownViewButton(e) {
        var $pwd = $(e.target).parent().find(".js-join-input");
        $pwd.attr('type', 'text');
    }

    function mouseupViewButton(e) {
        var $pwd = $(e.target).parent().find(".js-join-input");
        $pwd.attr('type', 'password');
    }

    function changeTeamSector(e) {
        var $eTarget = $(e.target);
        var $teamSectorInput = $eTarget.findUp(".js-sector-section").find(".js-sector-input");
        CommonJoin.changeInputErrorMsg($teamSectorInput, "");
        if ($eTarget.val() === 'etc') {
            $teamSectorInput.fadeIn(200);
        } else {
            $teamSectorInput.fadeOut(0);
            $teamSectorInput.val("");
        }
    }

    // teamStep or flowUpgradeStep --> finalStep
    function moveFinalStepButton(e) {
        var isStop;
        var $stepSection = $(e.target).findUp(".js-step-section");
        var $teamStep = $(e.target).findUp(".js-team-step");

        if (isInputsError($teamStep)) isStop = true;
        if (!isCheckSectors($stepSection)) isStop = true;
        if (isStop) return;

        var isFlowUpgradeStep = $stepSection.find("#flowUpgradeStep").length > 0; // 플로우 계정 업그레이드
        var isKakaoUpgradeStep = $stepSection.find("#kakaoUpgradeStep").length > 0; // 카카오 계정 업그레이드
        var isJoinStep = !(isFlowUpgradeStep || isKakaoUpgradeStep)// 회원가입

        var passJson = isFlowUpgradeStep ? getFlowUpgradeInfo() : $.extend({}, getUserInfo("joinUser"), getTeamInfo());
        passJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;

        Ajax.executeApi(RestApi.POST.FLOW_SUB_DOM_C001, passJson, function (dat) {
            var errorCode = Often.null2Void(dat['ERR_CD'], '');
            var $teamUrl = $stepSection.find(".js-team-url");
            //NO_PROBLEM: '0000', EXISTS_URL: '1000', YOU_MANAGER: '3000',
            if ('3000' === errorCode) {
                CommonJoin.changeInputErrorMsg($teamUrl, "한 계정으로 '한개의 팀'만 생성 가능합니다. 이 계정은 이미 다른 팀의 관리자입니다. 다른 계정을 사용해주세요.");
                return;
            } else if ('1000' === errorCode) {
                CommonJoin.changeInputErrorMsg($teamUrl, "사용 중인 회사 URL 입니다. 다른 URL를 등록해주세요.");
                return;
            }

            openFinalStep(passJson, {
                isFlowUpgradeStep: isFlowUpgradeStep,
                isKakaoUpgradeStep: isKakaoUpgradeStep,
                isJoinStep: isJoinStep
            });
        })
    }

    function isInputsError($step) {
        var errMsg;
        var isError = false;
        var inputs = $step.find(".js-join-input");
        $.each(inputs, function (i, input) {
            var $input = $(input);
            // 비어있는 input 있는지 확인
            if ($input.val().length === 0) {
                errMsg = $input.attr("data-empty-msg")
                isError = true;
                changeInputErrorMsg($input, errMsg);
            }
            // 오류가 난 input 있는지 확인
            if ($input.hasClass("input-error")) isError = true;
        })
        return isError;
    }

    function openFinalStep(passJson, stepJson) {
        var $teamStep = $("#teamStep");
        var $finalStep = $("#finalStep");
        var isReal = Often.isServerModeByHost("REAL") || Often.isServerModeByHost("REAL_TEST")
        $finalStep.find("#finalUserName").text(passJson.USER_NM);
        $finalStep.find("#finalTeamName").text(passJson.SUB_DOM_NM);
        $finalStep.find("#finalTeamUrl").text(passJson.SUB_DOM);
        $finalStep.find("#finalTeamUrl2").text(!isReal ? FLOW_URL.TEST : FLOW_URL.REAL);
        $finalStep.find("#copyUrlButton").off("click").on("click", copyTeamUrl);
        $finalStep.find("#startButton").off("click").on("click", function () {
            Loading.drawLoadingPop(stepJson.isJoinStep);
            if (stepJson.isJoinStep || stepJson.isKakaoUpgradeStep) {
                // 회원가입, 업그레이드에서 회원가입, 카카오계정 업그레이드 -> 로그인
                goLoginAfterJoin(passJson)
            } else if (stepJson.isFlowUpgradeStep) {
                // 플로우 계정 연동 업그레이드 -> window.reload
                window.location.reload();
            }
        });
        if (stepJson.isJoinStep || stepJson.isKakaoUpgradeStep) $teamStep.fadeOut(0);
        else if (stepJson.isFlowUpgradeStep) $("#flowUpgradeStep").fadeOut(0);
        $finalStep.fadeIn(200);
    }

    function copyTeamUrl() {
        Often.copyUrl($("#teamServiceUrl").text());
    }

    function goLoginAfterJoin(userInfo) {
        var isElectron = Electron.isElectronApp()
        CommonLogin.goLogin($.extend({}, userInfo, {
            "ID_GB": SignCode.TYPE.NORMAL,
            "ENCRYPT_YN": SignCode.ENCRYPT.SERVER_TIME_CHECK,
            "OBJ_CNTS_NM": (isElectron ? "desktop" : "")
        }))
    }

    function registerSubDomain(e) {
        moveSecondStepButton(e, function () {
            var userInfo = CommonJoin.getUserInfo("joinUser");
            userInfo.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
            Ajax.executeApi(RestApi.POST.COLABO2_REGISTER_C001, $.extend({}, userInfo, {
                SUB_DOM: SUB_DOM,
            }), function (dat) {
                var errorCode = Often.null2Void(dat['ERR_CD'], '');
                if ("0000" !== errorCode) {
                    if ("5000" === errorCode) {
                        changeInputErrorMsg($("#joinUserEmail"), "사용 중인 이메일 주소입니다. 다른 메일 주소를 등록해주세요.");
                    }
                }
                goLoginAfterJoin(userInfo);
            })
        })
    }

    function isCheckSectors($stepSection) {
        var $sectorSection = $stepSection.find(".js-sector-section");
        var $select = $sectorSection.find("select");
        var selectVal = $select.val();
        var $sectorInput = $sectorSection.find(".js-sector-input")
        var isCheck = (selectVal !== "default");
        if (!isCheck) CommonJoin.changeInputErrorMsg($select.parent(), "회사 업종을 선택해주세요.");
        if (selectVal === "etc") {
            if ($sectorInput.val().length === 0) {
                isCheck = false;
                CommonJoin.changeInputErrorMsg($select.parent(), "회사 업종을 입력해주세요.");
            }
        }
        return isCheck;
    }

    function getUserInfo(page) {
        return {
            USER_NM: $.trim($("#" + page + "Name").val()),
            USER_ID: $.trim($("#" + page + "Email").val()),
            RESAILER: $.trim($("#" + page + "RecommendId").val()),
            CELLPHONE_NUM: $.trim($("#" + page + "PhoneNum").val()),
            PWD: page === "joinGuest" ? $("#joinGuestPassword").val() : $("#password").val(),
        }
    }

    function getTeamInfo() {
        var pathCd;
        var $teamStep = $("#teamStep");
        var teamSectorVal = $teamStep.find("#joinTeamSector").val()

        if (teamSectorVal !== 'etc') pathCd = teamSectorVal;
        else pathCd = $teamStep.find("#joinTeamSectorInput").val();

        return {
            SUB_DOM_NM: $.trim($teamStep.find("#joinTeamName").val()),
            SUB_DOM: $.trim($teamStep.find("#joinTeamUrl").val()),
            PATH_CD: $.trim(pathCd),
        }
    }

    function getFlowUpgradeInfo() {
        var $flowUpgradeStep = $("#flowUpgradeStep");

        return {
            "SUB_DOM": $flowUpgradeStep.find("#upgradeTeamUrl").val(),
            "SUB_DOM_NM": $flowUpgradeStep.find("#upgradeTeamName").val(),
            "USER_ID": _USER_ID,
            "PATH_CD": $flowUpgradeStep.find("#upgradeTeamSector").val()
        }
    }

})()