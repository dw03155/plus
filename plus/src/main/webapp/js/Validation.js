var Validation = (function () {

    //Note. 신버전은 좀 더 명확한 이메일 정규식을 활용함!(비밀번호 찾기, 회원 가입 등 활용), 로그인은 Validation 체크하지 않음
    var emailRex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var urlRex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    var teamUrlRex = /^[0-9a-zA-Z]{3,50}$/;
    var specialRex = /^[~!@$%^&*()_+|?:;{}★☆]/
    var emojiRex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF])/ig;
    var domainRex = /^[0-9a-z_+]*$/g
    var phoneNumberRex = /^\d{2,3}-\d{3,4}-\d{4}$/g;
    var numberRex = /^[0-9]+$/;
    var passwordRex = /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$/g;
    var loginPasswordRex = /^.{1,20}$/g; //기존 계정 중 password 숫자+특문으로만 되어있는 경우 고려하여 로그인 시 자리수만 체크

    return {
        checkInput: checkInput,
        checkEditable: checkEditable,
    }

    function checkEditable($editableObject, isToast) {
        var isEmpty = ("" === $.trim(TagConvert.html2DbStringByPost($editableObject.html())));
        var returnJson = {}
        var errorCode = (isEmpty ? "empty" : "");
        var isError = "" !== errorCode;
        if (isError) {
            returnJson = {
                errorObj: $editableObject,
                errorCode: errorCode,
                errorMessage: i18next.t('front.common.enterContext', {val: '$t(dictionary.article)'}),
            }
            if (isToast) {
                Often.toast("error", returnJson.errorMessage)
                returnJson.errorObj.focus();
            } else {
                //pass
            }
        } else {
            //pass
        }
        return returnJson
    }

    function checkInput($inputObjects, isToast) {
        var isEmpty = false;
        var isOver = false;
        var isUnValid = false;
        var targetObj;
        var returnJson = {}

        $.each($inputObjects, function (i, inputEl) {

            var value = $.trim($(inputEl).val());
            var maxLength = Number(Often.null2Void($(inputEl).attr('maxlength'), '50'));
            var validCode = Often.null2Void($(inputEl).attr('data-valid'), '')
            var isRequired = "Y" === Often.null2Void($(inputEl).attr('data-required-yn'), 'N');

            if (!isEmpty && "" === value && isRequired) {
                isEmpty = true;
                targetObj = $(inputEl);
            } else if (!isEmpty && !isOver && maxLength < value.length) {
                isOver = true;
                targetObj = $(inputEl);
            } else if (!isEmpty && !isOver && !isUnValid) {
                isUnValid = isUnValidValue(validCode, value, inputEl);
                isUnValid && (targetObj = $(inputEl))
            } else {
                //pass
            }
        })

        var errorCode = (isEmpty ? "empty" : isOver ? "over" : isUnValid ? "un-valid" : "");
        var isError = "" !== errorCode;
        if (targetObj && isError) {

            returnJson = {
                errorObj: targetObj,
                errorCode: errorCode,
                errorMessage: targetObj.attr('data-' + errorCode + '-msg'),
            }

            if (isToast) {
                Often.toast("error", returnJson.errorMessage)
                returnJson.errorObj.focus();
            } else {
                //pass
            }

        } else {
            //pass
        }

        return returnJson
    }

    function isUnValidValue(validCode, value, inputEl) {
        var isValidTeamUrl = new RegExp(teamUrlRex).test(value);
        var isValidEmail =  new RegExp(emailRex).test(value);
        var isValidPassword = new RegExp(getPasswordRex()).test(value);
        var isValidLoginPassword = new RegExp(loginPasswordRex).test(value);
        var isEmoji = new RegExp(emojiRex).test(value);
        var isSpecial = new RegExp(specialRex).test(value);
        var isValidName = !isSpecial && !isEmoji;
        var isValidDomain = new RegExp(domainRex).test(value);
        var isValidPhoneNumber = new RegExp(phoneNumberRex).test(value);
        var isValidNumber = new RegExp(numberRex).test(value);

        return (
            ("teamUrl" === validCode && !isValidTeamUrl) ||
            ("name" === validCode && !isValidName) ||
            ("email" === validCode && !isValidEmail) ||
            ("password" === validCode && !isValidPassword) ||
            ("password-confirm" === validCode && !isSamePassword($(inputEl))) ||
            ("domain" === validCode && !isValidDomain) ||
            ("phoneNumber" === validCode && !isValidPhoneNumber) ||
            ("number" === validCode && !isValidNumber) ||
            ("login-password" === validCode && !isValidLoginPassword)
        )
    }

    function getPasswordRex() {
        if (ServerChecker.isKimchang) return Kimchang.getPwdRex();
        return passwordRex;
    }

    function isSamePassword(password2Obj) {
        var $form = password2Obj.parents('form');
        return ($form.length > 0 && $form.find(".js-join-password").length > 0 &&
            password2Obj.val() === $form.find(".js-join-password").val())
    }

})()