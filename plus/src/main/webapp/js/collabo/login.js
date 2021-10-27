$(document).ready(function () {
    //@유민호 : 다국어 및 타임존 설정 190325
    setI18nTz();

});

/**
 * <pre>
 * COLLABO PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 * @File Name      : login.js
 * @File path         : COLLABO_PT_STATIC/web/js/collabo
 * @author         : 주광욱 ( greenjkw@naver.com )
 * @Description    : 로그인
 * @History         : 20160212014953, 주광욱
 * </pre>
 */

var g_var;
var entLogin;
var bisLogin;
var g_post_var = "";
var bisSignup = "needInit";
var appr_yn = "N";
var _COUNTRY_CODE = "ko";
var _DEV_REAL = '';
var _SERVER_CONN_NUM = '';
var _STR_BASE_URL = '';
var _ID_GB = "4";

new (Jex.extend({
    onload: function () {
        history.pushState(null, null, location.href);
        window.addEventListener('popstate', function (event) {

        });

        $('html').click();
        _this = this;

        _DEV_REAL = $("#_DEV_REAL").val();
        _SERVER_CONN_NUM = $("#serverConnNum").val();
        _STR_BASE_URL = $("#_STR_BASE_URL").val();


        setDesktopCookieValue();

        if (cnts_Null2Void($("#_SERVICE_VERSION").val(), "") == "E") {

            if (cnts_Null2Void($.trim($("#INVT_KEY").html()), "") != "") {
                cf_setCookie("invtKey", cnts_Null2Void($.trim($("#INVT_KEY").html()), ""), 30 * 12);
            } else {
                // done.
            }


            cf_setCookie("flowLogin", "", 30 * 12);
        } else {
            if (cf_getCookie("flowLogin") != "" || cf_getCookie("miniflowLogin") != "") {
                // 세션 만들고 이동한다.
                if ($("#_SUB_DOM").val() == "SECO") {
                    // done.
                } else {
                    fn_goAutoLogin();
                }
            }
        }

        g_var = {
            g_electronYn: (cf_getCookie("electronYn") == "Y")
        }

        if ($("#_SERVICE_VERSION").val() == "E") {

            entLogin = elogin();
            entLogin.fn_initEnterpriseLogin();

            if (cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), "") != "") {
                if (cnts_Null2Void($("#enterpriseLoginDiv").find("input[name=email]").val(), "") == "") {
                    $("#enterpriseLoginDiv").find("input[name=email]").val(cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), ""));
                }
                $("#enterpriseLoginDiv").find("input[name=email]").focus();
                $("#enterpriseLoginDiv").find("input[name=password]").focus();
            } else {
                if (cnts_Null2Void($("#enterpriseLoginDiv").find("input[name=email]").val(), "") == "") {
                    $("#enterpriseLoginDiv").find("input[name=email]").focus();
                } else {
                    $("#enterpriseLoginDiv").find("input[name=email]").focus();
                    $("#enterpriseLoginDiv").find("input[name=password]").focus();
                }
            }

        } else if ($("#_SERVICE_VERSION").val() == "B") {


            bisLogin = blogin();
            bisLogin.fn_initBusinessLogin();
            //bisLogin.fn_goSignUp();

            if (cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), "") != "") {
                if (cnts_Null2Void($("#businessLoginDiv").find("#loginBox").find("input[name=email]").val(), "") == "") {
                    $("#businessLoginDiv").find("#loginBox").find("input[name=email]").val(cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), ""));
                    $("#businessLoginDiv").find("#loginBox").find("input[name=email]").focus();
                    $("#businessLoginDiv").find("#loginBox").find("input[name=password]").focus();
                } else {

                }
            } else {
                if (cnts_Null2Void($("#businessLoginDiv").find("#loginBox").find("input[name=email]").val(), "") == "") {

                } else {
                    $("#businessLoginDiv").find("#loginBox").find("input[name=email]").focus();
                }

            }
        } else {
            if (cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), "") != "") {
                if (cnts_Null2Void($("#main").find("#USER_ID").val(), "") == "") {
                    $("#main").find("#USER_ID").val(cnts_Null2Void(cf_getCookie("FLOW_USER_ID"), ""));
                    $("#main").find("#USER_ID").focus();
                    $("#main").find("#PWD").focus();
                } else {
                }
            } else {
                // done
                if (cnts_Null2Void($("#main").find("#USER_ID").val(), "") == "") {

                } else {
                    $("#main").find("#USER_ID").focus();
                }
            }
        }


        if ($("#_BIS_MNGR_SIGNUP").val() == "Y" || $("#_BIS_MNGR_SIGNUP").val() == "KY") { // 비즈니스 관리자 회원가입


            if (bisSignup == "needInit") {
                bisSignup = bMngrSignUp();
                bisSignup.init();
            }
            bisSignup.show();

            collectTagManager({
                "event": "signUp1"
            })

        }

        if (cf_getCookie("AutoLogin") == '') {
            if (g_var.g_electronYn) {
                $("#AUTO_BOX").attr("checked", true);
                $("#enterpriseLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
                $("#businessLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
            } else {
                $("#AUTO_BOX").attr("checked", false);
                $("#enterpriseLoginDiv").find("#autoLoginCheckbox").attr("checked", false);
                $("#businessLoginDiv").find("#autoLoginCheckbox").attr("checked", false);
            }
        } else if (cf_getCookie("AutoLogin") == 'N') {
            $("#AUTO_BOX").attr("checked", false);
            $("#enterpriseLoginDiv").find("#autoLoginCheckbox").attr("checked", false);
            $("#businessLoginDiv").find("#autoLoginCheckbox").attr("checked", false);
        } else {
            $("#AUTO_BOX").attr("checked", true);
            $("#enterpriseLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
            $("#businessLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
        }

        $("#AUTO_BOX").on('click', function () {
            if ($("#AUTO_BOX").is(':checked')) {
                cf_setCookie("AutoLogin", "Y", 30 * 12);
            } else {
                cf_setCookie("AutoLogin", "N", 30 * 12);
            }
        });

        $("#enterpriseLoginDiv").find("#autoLoginCheckbox").on('click', function () {
            if ($("#enterpriseLoginDiv").find("#autoLoginCheckbox").is(':checked')) {
                cf_setCookie("AutoLogin", "Y", 30 * 12);
            } else {
                cf_setCookie("AutoLogin", "N", 30 * 12);
                cf_setCookie("FLOW_USER_ID", "", 30 * 12 * 10);
            }
        });
        $("#businessLoginDiv").find("#autoLoginCheckbox").on('click', function () {
            if ($("#businessLoginDiv").find("#autoLoginCheckbox").is(':checked')) {
                cf_setCookie("AutoLogin", "Y", 30 * 12);
            } else {
                cf_setCookie("AutoLogin", "N", 30 * 12);
            }
        });

        if (g_var.g_electronYn) {
            if (cf_getCookie("electronVer") < "1_0_6") {
                $("#enterpriseLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
                $("#businessLoginDiv").find("#autoLoginCheckbox").attr("checked", true);
                window.onmessage = function (e) {
                    if (e.data && typeof e.data === 'string' && e.data.indexOf("kakao_login:") > -1) {
                        var kaccount_info = JSON.parse(e.data.replace("kakao_login:", ""));
                        if (cnts_Null2Void($("#_SERVICE_VERSION").val(), "") == "E") {
                            $("#enterpriseLoginDiv").find("input[name=email]").val(kaccount_info.USER_ID);
                            $("#enterpriseLoginDiv").find("input[name=kakaoEmail]").val(cnts_Null2Void(kaccount_info.EMAIL, ""));
                            $("#enterpriseLoginDiv").find("input[name=userName]").val(cnts_Null2Void(kaccount_info.USER_NM, kaccount_info.USER_ID));
                            $("#enterpriseLoginDiv").find("input[name=prflPhtg]").val(cnts_Null2Void(kaccount_info.PRFL_PHTG, ""));
                            entLogin.fn_goLogin("2");
                        } else if (cnts_Null2Void($("#_SERVICE_VERSION").val(), "") == "B") {
                            console.error("bisniess member can't login via kakao accounts");
                        } else {
                            $("#main").find("#USER_ID").val(kaccount_info.USER_ID);
                            $("#main").find("#KAKAO_EMAIL").val(cnts_Null2Void(kaccount_info.EMAIL, ""));
                            $("#main").find("#USER_NM").val(cnts_Null2Void(kaccount_info.USER_NM, kaccount_info.USER_ID));
                            $("#main").find("#PRFL_PHTG").val(cnts_Null2Void(kaccount_info.PRFL_PHTG, ""));
                            fn_goLogin("2");
                        }
                    }
                };
            } else {
                // do nothing;
            }
        } else {
            try { // web browser에서는 auth2 따로 load 후 사용
                gapi.load('auth2', function () {
                    var myClientId = '';
                    if (b_joins) {
                        myClientId = '1020012817568-qnk6lru6t13hk6mnk2v2kolrm3ih28bn.apps.googleusercontent.com';
                    } else {
                        myClientId = getGoogleOAuthKey(_SERVER_CONN_NUM, _DEV_REAL).clientId;
                    }

                    auth2 = gapi.auth2.init({
                        client_id: myClientId,
                        scope: 'profile'
                    });

                });
            } catch (e) {
                // done.
            }
        }

        g_post_var = {
            g_execute: false // 액션 처리 여부
        };

        // --- todo onload start ---//
        _loading = jex.plugin.get("JEX_LODING");
        $.support.placeholder = ('placeholder' in document.createElement('input'));

        //@유민호 : 프로젝트투어 선작업 20190212
        if (location.href.indexOf('PROJECT_TOUR=Y') > -1) {
            cmf_layerMsg("1", cnts_Null2Void(i18n('DL148'), "프로젝트 투어를 준비중입니다!"));
            $("#main").find("#USER_ID").val("tour@flow.team");
            $("#main").find("#PWD").val("flow1234");
            fn_goLogin("1");
        }

        if ($("#_SUB_DOM").val() == "") {
            if ("Y" == cnts_Null2Void($.trim($("#JOIN").html()), "")) {
                fn_viewChange("1"); // 회원가입
            } else if ("P" == cnts_Null2Void($.trim($("#JOIN").html()), "")) {
                $("#main").find(".error_txt").hide();
                $("#sub").find(".error_txt").hide();
                $("#topId").text(cnts_Null2Void(i18n('H76'), "로그인"));
                $("#title").text(cnts_Null2Void(i18n('DL149'), "비밀번호찾기"));
                $("#main").hide();
                $("#sub").show();
            } else {
                fn_viewChange(""); // 로그인
            }

        } else {
            fn_viewChange(""); // 로그인
        }

        if (!$.support.placeholder) {
            if ($("#main").find("#USER_NM").val() == "")
                $("#main").find("#USER_NM").val($("#main").find("#USER_NM").attr("placeholder"));
            if ($("#main").find("#USER_ID").val() == "")
                $("#main").find("#USER_ID").val($("#main").find("#USER_ID").attr("placeholder"));
            if ($("#sub").find("#EMAIL").val() == "")
                $("#sub").find("#EMAIL").val($("#sub").find("#EMAIL").attr("placeholder"));
        }

        $("#headerLogoImg").on('click', function () {

            location.href = $("#_HOMEPAGE").val();
        });

        $("#headerLogoImg1").on('click', function () {

            location.href = $("#_HOMEPAGE").val();
        });

        $("#businessMngrSignUpPopup").find("input[name=email]").val(cnts_Null2Void($("#checkUserId").val(), ""));

        //@유민호 : html 다국어 순서 바꾸기 190521
        if (_FLOW_LANG === "en") {
            $("#main").find("#REG_2").find("[lang=df]").hide();
            $("#main").find("#REG_2").find("[lang=en]").show();
        } else {
            $("#main").find("#REG_2").find("[lang=df]").show();
            $("#main").find("#REG_2").find("[lang=en]").hide();
        }
        if (window.location.search.indexOf("=G") > -1) {
            fn_viewChange("1");//Guest 로그인
        }

        $(".terms-and-privacy").html(c18n("H452", "<a>서비스 이용약관</a>, <a>개인정보취급방침</a>을 확인하였고, 이에 동의합니다."));
        $(".terms-and-privacy").find("a:eq(0)").attr({'href': '/terms.act', "target": "flowTem"});
        $(".terms-and-privacy").find("a:eq(1)").attr({'href': '/privacy.act', "target": "flowTem"});
        //ko - <a>서비스 이용약관</a>, <a>개인정보취급방침</a>을 확인하였고, 이에 동의합니다.
        //en - I agree to the <a>Terms and Conditions</a> and I have read the <a>Privacy Policy</a>.
    },
    event: function () {

        $(document).on({
            click: function (e) {
                // 상단 활동 레이어
                if (!($(e.target).parents().is(".setup") || $(e.target).is(".setup") || $(e.target).html() == cnts_Null2Void(i18n('H355'), "모바일 앱 설치")
                    || $(e.target).parents().is("#mobileLayer") || $(e.target).is("#mobileLayer"))) {
                    if ($("#mobileLayer").css("display") == "block") {
                        fn_mobileLayerHide();
                    }
                }
                if (!($(e.target).parents().is("#companyCodeLayer") || $(e.target).is("#companyCodeLayer") || $(e.target).parents().is("#companyName") || $(e.target).is("#companyName"))) {
                    if ($("#companyCodeLayer").css("display") == "block") {
                        $("#enterpriseLoginDiv").find("#companyCodeLayer").hide();
                    }
                }
            }
        });

        $(".signup_top").find("#setup").on("click", function (e) {

            if ($("#mobileLayer").css("display") == "block") {
                fn_mobileLayerHide();
            } else {
                fn_mobileLayerShow();
                var Browser = cmf_browser();
                if (Browser.ieYn) {
                } else {
                    $("#mobileClphNo").focus();
                }
            }
        });

        $("#mobileLayer").find("#mobileAppSend").on("click", function (e) {
            fn_mobileAppSend();
            fn_mobileLayerHide();
        });

        $(document).keydown(function (e) {
            if (e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {

                if (e.keyCode === 8) { // backspace
                    if ($("#sub").css("display") != "none") {
                        fn_viewChange(""); // 로그인
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    if ($("#main").find("#REG_1").css("display") != "none") {
                        fn_viewChange(""); // 로그인
                        e.preventDefault();
                        e.stopPropagation();
                    }
                } else if (e.keyCode == 27) { // esc
                    if (cnts_Null2Void($("#changePassword").css('display'), 'block') == 'block') {
                        $("#changePassword").css('display', 'none');
                        $("#changePassword").find("#password1").removeAttribute('tabindex');
                        $("#changePassword").find("#password2").removeAttribute('tabindex');
                        $("#changePassword").find("#pwdChangeBtn").removeAttribute('tabindex');
                    } else if (cnts_Null2Void($("#guestLoginDiv").css('display'), 'block') == 'block') {
                        $("#enterpriseLoginDiv").find("#guestLoginDiv").hide();
                        $("#enterpriseLoginDiv").find("#guestLoginDivModal").hide();

                    }
                }
            } else {
                if (e.target.nodeName == "INPUT" && $(e.target).attr('id') === "companyName") {
                    if (cnts_Null2Void($("#enterpriseLoginDiv").find("#companyCodeLayer").css('display'), 'block') == 'block') {
                        $("#enterpriseLoginDiv").find("#companyCodeLayer").hide();
                    }
                }
            }
        });

        $("#topId").off("click").on("click", function (e) {

            if (cnts_Null2Void(i18n('H76'), "로그인") == $(this).text()) {
                fn_viewChange(""); // 로그인
            } else {
                //@유민호 : 초대 url 활용시 회원가입하면 invt_key 날아가는데 그러지 않도록 처리 200211
                //@유민호 : 게스트회원가입이 아닌 30일 회원가입으로 이동 190723
                location.href = '/login.act?BIS_MNGR_SIGNUP=Y' + ($("#INVT_KEY").text().length > 0 ? ("&INVT_KEY=" + $("#INVT_KEY").text()) : "");
                //fn_viewChange("1"); // 회원가입
            }
        });


        $("#main").find("#goToBusinessMngrSignUp").on('click', function () {

            if (bisSignup == "needInit") {
                bisSignup = bMngrSignUp();
                bisSignup.init();
            }
            bisSignup.show();

            collectTagManager({
                "event": "signUp1"
            })

        });

        $("#main").find(".signup_btn_st1").on("click", function (event) {


            if ($("#main").find("#REG_1").css("display") != "none") {
                fn_register(event);
            } else {
                fn_goLogin("1");
            }
        });

        $("#main").find("#USER_NM").bind("keyup", function (event) {

            if ($("#main").find("#USER_NM").val().length > 0) {
                $("#main").find("#USER_NM_CHK").removeClass("error").addClass("ok");
                $("#main").find(".error_txt").hide();

                if ($("#main").find("#REG_1").css("display") != "none") {
                    if ($("#main").find("#PWD_CHK").hasClass("ok") && $("#main").find("#USER_ID_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                        $("#main").find(".signup_btn_st1").addClass("on");
                    } else {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                        $("#main").find(".signup_btn_st1").removeClass("on");
                    }
                } else {

                }
            } else {
                $("#main").find("#USER_NM_CHK").removeClass("ok").removeClass("error");
            }
        });

        $("#main").find("#USER_ID").on("keyup", function (event) {

            if ($("#main").find("#USER_ID").val().length > 0) {

                $("#main").find("#USER_ID_CHK").removeClass("error").addClass("ok");
                $("#main").find(".error_txt").hide();

                if ($("#main").find("#REG_1").css("display") != "none") {
                    if ($("#main").find("#USER_NM_CHK").hasClass("ok") && $("#main").find("#PWD_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                        $("#main").find(".signup_btn_st1").addClass("on");
                    } else {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                        $("#main").find(".signup_btn_st1").removeClass("on");
                    }
                } else {
                    if ($("#main").find("#PWD_CHK").hasClass("ok")) {
                        $("#main").find(".signup_btn_st1").addClass("on");
                    }
                }

            } else {
                //$("#main").find("#USER_ID_CHK").removeClass("ok").removeClass("error");
                $("#main").find(".signup_btn_st1").removeClass("on");
            }
        });

        $("#main").find("#USER_ID").on("blur", function (e) {
            if ($("#main").find("#REG_1").css("display") != "none") {
                if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                    upgrade.duplicationIdCheck($(e.target));
                    //$(e.target).parent().removeClass('error').addClass('ok');
                } else {
                    if ($(e.target).val() === "") {
                        $("#main").find(".error_txt").text("");
                        $("#main").find(".error_txt").hide();
                    } else {

                        $("#main").find("#USER_ID_CHK").removeClass("ok").addClass("error");
                        $("#main").find(".signup_btn_st1").removeClass("on");

                        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('DL152'), "이메일 주소를 입력하시기 바랍니다."));
                        $("#main").find(".error_txt").show();

                        //cmf_btnClear(e);
                    }
                }
            }
        });


        $("#main").find("#PWD").on("click", function () {

            $(this).focus();
        });
        $("#main").find("#PWD").on("focus", function (event) {

            if ($("#main").find("#USER_ID").val().length > 0 && $("#main").find("#USER_ID_CHK").hasClass("ok")) {

                //$("#main").find("#USER_ID_CHK").removeClass("error").addClass("ok");
                //$("#main").find(".error_txt").hide();

                if ($("#main").find("#REG_1").css("display") != "none") {
                    if ($("#main").find("#USER_NM_CHK").hasClass("ok") && $("#main").find("#PWD_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                        $("#main").find(".signup_btn_st1").addClass("on");
                    } else {
                        $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                        $("#main").find(".signup_btn_st1").removeClass("on");
                    }
                } else {
                    if ($("#main").find("#PWD_CHK").hasClass("ok")) {
                        $("#main").find(".signup_btn_st1").addClass("on");
                    }
                }

            } else {
                //$("#main").find("#USER_ID_CHK").removeClass("ok").removeClass("error");
                $("#main").find(".signup_btn_st1").removeClass("on");
            }
        });

        $("#main").find("#PWD").on("keyup", function (e) {

            if ($("#main").find("#PWD").val().length >= 6) {
                if (cnts_Null2Void($("#main").find("#PWD").val(), "") != "" && $("#main").find("#USER_ID_CHK").hasClass("ok")) {
                    $("#main").find("#PWD_CHK").removeClass("error").addClass("ok");
                    $("#main").find(".error_txt").hide();

                    if ($("#main").find("#REG_1").css("display") != "none") {
                        if ($("#main").find("#USER_NM_CHK").hasClass("ok") && $("#main").find("#USER_ID_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                            $("#main").find(".signup_btn_st1").addClass("on");
                        } else {
                            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                            $("#main").find(".signup_btn_st1").removeClass("on");
                        }
                    } else {
                        if ($("#main").find("#USER_ID_CHK").hasClass("ok")) {
                            $("#main").find(".signup_btn_st1").addClass("on");
                        }
                    }

                } else {
                    $("#main").find("#PWD_CHK").removeClass("ok").addClass("error");
                    cmf_btnClear(e);
                }
            } else {
                $("#main").find("#PWD_CHK").removeClass("ok").addClass("error");
                cmf_btnClear(e);
                $("#main").find(".signup_btn_st1").removeClass("on");
            }
        });

        $("#main").find("#PWD").on("blur", function (e) {

            if ($("#main").find("#PWD").val().length >= 6) {
                if (cnts_Null2Void($("#main").find("#PWD").val(), "") != "" && $("#main").find("#USER_ID_CHK").hasClass("ok")) {
                    $("#main").find("#PWD_CHK").removeClass("error").addClass("ok");
                    $("#main").find(".error_txt").hide();

                    if ($("#main").find("#REG_1").css("display") != "none") {
                        if ($("#main").find("#USER_NM_CHK").hasClass("ok") && $("#main").find("#USER_ID_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                            $("#main").find(".signup_btn_st1").addClass("on");
                        } else {
                            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                            $("#main").find(".signup_btn_st1").removeClass("on");
                        }
                    } else {
                        if ($("#main").find("#USER_ID_CHK").hasClass("ok")) {
                            $("#main").find(".signup_btn_st1").addClass("on");
                        }
                    }

                } else {
                    $("#main").find("#PWD_CHK").removeClass("ok").addClass("error");
                    cmf_btnClear(e);
                }
            } else {
                $("#main").find("#PWD_CHK").removeClass("ok").addClass("error");
                cmf_btnClear(e);

                if ($("#main").find("#USER_ID_CHK").hasClass("ok")) {
                    $("#main").find(".error_txt").text(cnts_Null2Void(i18n('H389'), '비밀번호는 영숫자 조합의 6자리 이상이어야 합니다.'));
                    $("#main").find(".error_txt").show();
                } else {
                    //done.
                }
                $("#main").find(".signup_btn_st1").removeClass("on");
            }
        });


        var b_eamil = false;
        $("#sub").find("#EMAIL_CHK").removeClass("error").addClass("ok");
        $("#sub").find(".error_txt").hide();
        $("#sub").find(".signup_btn_st1").addClass("on");
        /*
		$("#sub").find("#EMAIL").bind("keyup", function (event) {

			if ($("#sub").find("#EMAIL").val().length > 0) {
				if (!cmf_emailcheck($("#sub").find("#EMAIL").val())) {
					if (!b_eamil) {
						$("#sub").find("#EMAIL_CHK").removeClass("error").addClass("ok");
						$("#sub").find(".error_txt").hide();
						$("#sub").find(".signup_btn_st1").addClass("on");
					}
					b_eamil = true;

				} else {
					b_eamil = false;
					$("#sub").find("#EMAIL_CHK").removeClass("ok");
					$("#sub").find(".error_txt").text(cnts_Null2Void(i18n('DL151'),"이메일 주소 형식이 아닙니다."));
					$("#sub").find("ul").css("margin-bottom", "");
					$("#sub").find(".error_txt").css("bottom", "");
					$("#sub").find(".error_txt").show();
					$("#sub").find(".signup_btn_st1").removeClass("on");
				}
			}
		});
		 */
        $("#main").find("#CONF_BOX").click(function () {

            if ($("#main").find("#REG_1").css("display") != "none") {
                if ($("#main").find("#USER_NM_CHK").hasClass("ok") && $("#main").find("#USER_ID_CHK").hasClass("ok") && $("#main").find("#CONF_BOX").prop("checked")) {
                    $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('DL150'), "가입완료"));
                    $("#main").find(".signup_btn_st1").addClass("on");
                } else {
                    $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                    $("#main").find(".signup_btn_st1").removeClass("on");
                }
            }
        });

        // 구글계정 로그인
        $("#main").find(".google").click(function () {
            if (getElectronYn()) {
                googleLogin();
            } else {
                googleLogin();
            }
        });
        $("#main").find(".kakao").click(function () {

            if (g_var.g_electronYn && (cf_getCookie("electronVer") < "1_0_6")) {
                var $frmObj = $("<form id='kakao_login' name='kakao_login'></form>");
                if (b_joins) {
                    $frmObj.attr("action", "https://kauth.kakao.com/oauth/authorize?client_id=58b6357ca8367b8610f61da6c3f48229&redirect_uri=" + location.origin + "/login.act&response_type=code")
                } else {
                    $frmObj.attr("action", "https://kauth.kakao.com/oauth/authorize?client_id=e1d3e5b1a478fdb8e0b6b6b07f929995&redirect_uri=" + location.origin + "/login.act&response_type=code")
                }
                $frmObj.attr("method", "post");
                $frmObj.attr("target", "_blank");
                $frmObj.attr("resizable");
                $frmObj.appendTo("body");
                $frmObj.submit();
                $frmObj.remove();
            } else {
                Kakao.Auth.login({
                    success: function (authObj) {
                        Kakao.API.request({
                            url: '/v2/user/me',
                            success: function (res) {
                                $("#main").find("#USER_ID").val(res.id);
                                $("#main").find("#KAKAO_EMAIL").val(cnts_Null2Void(res.kaccount_email, ""));

                                if (res.properties) {
                                    if (res.properties.nickname) {
                                        $("#main").find("#USER_NM").val(cnts_Null2Void(res.properties.nickname, res.id));
                                    } else {
                                        $("#main").find("#USER_NM").val(res.id);
                                    }
                                    if (cnts_Null2Void(res.properties.thumbnail_image, "") != "") {
                                        $("#main").find("#PRFL_PHTG").val(cnts_Null2Void(res.properties.thumbnail_image, ""));
                                    } else {
                                        // done.
                                    }
                                } else {
                                    $("#main").find("#USER_NM").val(res.id);
                                    $("#main").find("#PRFL_PHTG").val("");
                                }
                                fn_goLogin("2");
                            },
                            fail: function (error) {
                                console.error(error);
                            }
                        });
                    },
                    fail: function (error) {
                        console.error(error);
                    }
                });
            }
        });

        $("#main").find(".apple").click(function () {
            var ClientId = 'web.flow';
            var Browser = cmf_browser();

            if (Browser.ieYn) {
                alert(c18n('ui.ie.limit', 'IE 브라우저에서 지원하지 않는 기능입니다. 크롬 및 다른 브라우저에서 다시 시도해주세요.'));
                return;
            }

            AppleID.auth.init({
                clientId: ClientId,
                scope: 'name email',
                redirectURI: location.origin + '/appleRedirect.act',
                state: 'DE',
                usePopup: true //or false defaults to false
            });

            AppleID.auth.signIn().then(function (data) {
                var appleIdToken = cnts_Null2Void(data.authorization.id_token, "");
                if (appleIdToken !== "" && appleIdToken.indexOf(".") > -1) {
                    $("#main").find("#USER_ID").val(parseJwt(appleIdToken).sub);
                    fn_goLogin("11");
                } else {
                    console.error("apple error");
                }
            });
        });


        $("#sub").find(".signup_btn_st1").click(function () {

            fn_pwdChangeMail();
        });

        $("#main").find("#USER_NM").focus(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == $(this).attr("placeholder"))
                    $(this).val("");
            }
        }).blur(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == "")
                    $(this).val($(this).attr("placeholder"));
            }
        });

        $("#main").find("#USER_ID").focus(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == $(this).attr("placeholder"))
                    $(this).val("");
            }
        });

        $("#sub").find("#EMAIL").focus(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == $(this).attr("placeholder"))
                    $(this).val("");
            }
        }).blur(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == "")
                    $(this).val($(this).attr("placeholder"));
            }
        });

        $("#main").find("#USER_NM").focus(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == $(this).attr("placeholder"))
                    $(this).val("");
            }
        }).blur(function () {

            if (!$.support.placeholder) {
                if ($(this).val() == "")
                    $(this).val($(this).attr("placeholder"));
            }
        });

        // 자체계정 로그인
        $("#main").find("#USER_ID").bind("keydown", function (event) {

            if (event.keyCode == 13) {
                if ($("#main").find("#REG_1").css("display") != "none") {
                    fn_register(event);
                } else {
                    fn_goLogin("1");
                }

            }
        });
        $("#main").find("#PWD").bind("keydown", function (event) {

            if (event.keyCode == 13) {
                if ($("#main").find("#REG_1").css("display") != "none") {
                    fn_register(event);
                } else {
                    fn_goLogin("1");
                }
            }
        });

        //비밀번호 찾기
        //2019.12.02 현기차 즉, 설치형일 때도 비밀번호 찾을 경우 처리
        $(".forgot_pw").click(function () {

            if ($(this).hasClass('bizplay')) {
                goUrl($("#BizplayUrl").text() + '/comm_0023_01.act');
            } else {
                jkwlog("aaa");


                if ($("#main").is(":visible")) {		//일반적일 경우
                    $("#main").find(".error_txt").hide();
                    $("#sub").find(".error_txt").hide();
                    $("#topId").text(cnts_Null2Void(i18n('H76'), "로그인"));
                    $("#title").text(cnts_Null2Void(i18n('DL149'), "비밀번호찾기"));

                    $("#sub").find("#EMAIL").val($("#main").find("#USER_ID").val());
                    $("#main").hide();
                    $("#sub").show();
                } else if ($(".business-signup-layer").is(":visible")) {	//현기차
                    $(".business-signup-layer").find(".error_txt").hide();
                    $("#sub").find(".error_txt").hide();
                    $("#topId").text(cnts_Null2Void(i18n('H76'), "로그인"));
                    $("#title").text(cnts_Null2Void(i18n('DL149'), "비밀번호찾기"));

                    $("#sub").find("#EMAIL").val($("#main").find("#USER_ID").val());
                    $(".business-signup-layer").hide();
                    $("#sub").show();
                }

            }
        });

        // 비밀번호 변경메일받기
        $("#sub").find("#EMAIL").bind("keydown", function (event) {

            if (event.keyCode == 13) {
                fn_pwdChangeMail();
            }
        });

        // $("#bizplay").click(function(){
        // if($("#main").find("#REG_1").css("display") != "none"){
        // goUrl($("#BizplayUrl").text()+'/comm_0015_01.act');
        // }else{
        // window.location.href =
        // "/bizLogin.act?INVT_KEY="+cnts_Null2Void($.trim($("#INVT_KEY").html()),
        // "");
        // }
        // });

        $("#changePassword").find("#password1").on('keyup', function (e) {

            if (e.keyCode == 27) { // esc

            } else if (e.keyCode == 8) { // enter
                fn_checkPwdValidation();
            } else {
                fn_checkPwdValidation(e);
            }
        });

        $("#changePassword").find("#password2").on('keyup', function (e) {

            if (e.keyCode == 27) { // esc

            } else if (e.keyCode == 8) { // enter
                fn_checkPwdValidation(e);
            } else {
                fn_checkPwdValidation(e);
            }
        });

        $("#changePassword").find("#pwdChangeBtn").on('click', function (e) {

            if ($(e.target).hasClass('c-blue')) {
                fn_changePwd2();
            }
        });


        // 비밀번호 숨기기 및 보이기
        $(".password-input").on("keyup", function (e) {
            if ($(this).val().length > 0) {
                $(this).siblings(".password-mask").addClass('on');
            } else {
                $(this).siblings(".password-mask").removeClass('on');
            }
        });

        $(".password-mask").on("mousedown", function (e) {
            passwordShowBrowser(e);
        });

        $(".password-mask").on("mouseup", function (e) {
            passwordHideBrowser(e);
        });
    }

}))();

function fn_pwdChangeMail() {

    if ($.trim($("#sub").find("#EMAIL").val()).length < 1) {
        $("#sub").find(".error_txt").text(cnts_Null2Void(i18n('DL152'), "이메일 주소를 입력하시기 바랍니다."));
        $("#sub").find("ul").css("margin-bottom", "");
        $("#sub").find(".error_txt").css("bottom", "");
        $("#sub").find(".error_txt").show();
        $("#sub").find("#EMAIL").focus();
        return;
    }
    /*
	if (cmf_emailcheck($("#sub").find("#EMAIL").val())) {
		$("#sub").find(".error_txt").text(cnts_Null2Void(i18n('DL153'),"E-mail 주소를 확인하시기 바랍니다."));
		$("#sub").find(".error_txt").show();
		$("#sub").find("ul").css("margin-bottom", "");
		$("#sub").find(".error_txt").css("bottom", "");
		$("#sub").find(".signup_btn_st1").removeClass("on");
		return;
	}
	*/
    var jexAjax = jex.createAjaxUtil("COLABO2_PWD_R001");
    jexAjax.set("USER_ID", $.trim($("#sub").find("#EMAIL").val()));
    //jexAjax.setAsync(true);			//@주광욱 2019.12.02 비동기 처리 합니다.


    if (cnts_Null2Void($("#_SUB_DOMAIN_USE_INTT_ID").val(), "") == "HYUNDAI_1") {	//@주광욱 2019.12.02 현기차
        alert(cnts_Null2Void(i18n('DL154'), "비밀번호 변경메일을 보냈습니다."));
        $(".business-signup-layer").find("#PWD").focus();
        $(".business-signup-layer").show();
        $("#sub").hide();
    }

    jexAjax.execute(function (dat) {

        //@주광욱 2019.12.02  현기차.
        if (cnts_Null2Void($("#_SUB_DOMAIN_USE_INTT_ID").val(), "") != "HYUNDAI_1") {
            if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {
                if (cnts_Null2Void(dat.ERR_CD, "") == "2002") {
                    $("#sub").find("ul").css("margin-bottom", "80px");
                    $("#sub").find(".error_txt").css("bottom", "80px");
                } else {
                    $("#sub").find("ul").css("margin-bottom", "");
                    $("#sub").find(".error_txt").css("bottom", "");
                }
                $("#sub").find(".error_txt").html(cnts_Null2Void(dat.ERR_MSG, ""));
                $("#sub").find(".error_txt").show();
            } else {
                alert(cnts_Null2Void(i18n('DL154'), "비밀번호 변경메일을 보냈습니다."));
                $("#main").find("#USER_ID").val($.trim($("#sub").find("#EMAIL").val()));
                $("#main").find("#PWD").focus();
                $("#main").show();
                $("#sub").hide();
                $("#topId").text(cnts_Null2Void(i18n('H77'), "회원가입"));
                $("#title").text(cnts_Null2Void(i18n('H76'), "로그인"));
            }
        } else {
            //done.
        }
    });
}

function fn_viewChange(gubun) {

    if ($("#sub").css("display") == "block") {
        $("#topId").text(cnts_Null2Void(i18n('H77'), "회원가입"));
        $("#title").text(cnts_Null2Void(i18n('H76'), "로그인"));
        $("#sub").find("input[name=email]").focus();
        $("#main").show();
        $("#sub").hide();
    } else {

        if ("1" == gubun) {

            $("#main").find("#REG_1").show();
            $("#main").find("#REG_2").show();
            $("#main").find("#REG_3").hide();
            $("#main").find("#AUTO_LOGIN").hide();

            $("#topId").text(cnts_Null2Void(i18n('H76'), "로그인"));
            $("#title").text(cnts_Null2Void(i18n('H77'), "회원가입"));
            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H77'), "회원가입"));
            $("#main").find("#USER_NM").focus();
            $("#main").find("#USER_ID").attr("placeholder", cnts_Null2Void(i18n('H333'), "이메일"));
            $("#main").find("#businessMngrSignUpDiv").show();

            collectTagManager({
                "event": "guest1"
            })

        } else {
            $("#main").find("#REG_1").hide();
            $("#main").find("#REG_2").hide();
            $("#main").find("#REG_3").show();
            $("#main").find("#AUTO_LOGIN").show();
            $("#topId").text(cnts_Null2Void(i18n('H77'), "회원가입"));
            $("#title").text(cnts_Null2Void(i18n('H76'), "로그인"));
            $("#main").find(".signup_btn_st1").text(cnts_Null2Void(i18n('H76'), "로그인"));
            $("#main").find("#businessMngrSignUpDiv").hide();

            if (cnts_Null2Void($("#main").find("#USER_ID").val(), "") != "") {
                $("#main").find("#PWD").focus();
            } else {
                $("#main").find("#USER_ID").focus();
            }

            $("#main").find("#USER_ID").attr("placeholder", cnts_Null2Void(i18n('H361'), "이메일 또는 아이디"));

            if (cnts_Null2Void($("#main").find("#checkUserId").val(), "") == "") {
                if (cnts_Null2Void($("#main").find("#USER_ID").val(), "").length > 0) {
                    $("#main").find("#USER_ID_CHK").removeClass("error").addClass("ok");
                    $("#main").find("#PWD_CHK").removeClass("error").addClass("ok");
                    $("#main").find(".signup_btn_st1").removeClass("error").addClass("on");
                }

            }

        }
    }
}


/**
 * 자체계정 등록
 */
function fn_register(e) {

    if ($.trim($("#main").find("#USER_NM").val()) == "") {
        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('H443'), "이름을 입력하시기 바랍니다."));
        $("#main").find(".error_txt").show();
        $("#main").find("#USER_NM").focus();
        return;
    } else {
        // done.
    }

    if ($.trim($("#main").find("#USER_ID").val()) == "") {
        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('H440'), "이메일을 입력하시기 바랍니다."));
        $("#main").find("#USER_ID").focus();
        $("#main").find(".error_txt").show();
        return;
    } else {
        if (cmf_emailcheck($("#main").find("#USER_ID").val()) || !$("#main").find("#USER_ID_CHK").hasClass("ok")) {
            $("#main").find("#USER_ID_CHK").addClass("error");
            cmf_btnClear(e);
            $("#main").find(".error_txt").text(cnts_Null2Void(i18n('DL158'), "이메일 주소를 확인하시기 바랍니다."));
            $("#main").find(".error_txt").show();
            return;
        } else {
            //done.
        }
    }

    if ($.trim($("#main").find("#PWD").val()) == "" || cmf_validate($("#main").find("#PWD").val())) {
        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('H389'), "비밀번호는 6자 이상의 영문, 숫자만 가능합니다."));
        $("#main").find("#PWD").focus();
        $("#main").find(".error_txt").show();
        return;
    } else {
        // done
    }
    if (!$("#main").find("#CONF_BOX").prop("checked")) {
        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('DL160'), "이용약관 체크를 하시기 바랍니다."));
        $("#main").find(".error_txt").show();
        return;
    } else {
        //done.
    }

    //이메일 회원가입일 경우! 인증체크후 진행한다.
    auth_layer.emailAuthCheck($.trim($("#main").find("#USER_ID").val()));

}

function fn_registerC001() {
    _loading.start();

    var jexAjax = jex.createAjaxUtil("COLABO2_REGISTER_C001");
    jexAjax.set("USER_NM", $.trim($("#main").find("#USER_NM").val()));
    jexAjax.set("USER_ID", $.trim($("#main").find("#USER_ID").val()));
    jexAjax.set("PWD", $.trim($("#main").find("#PWD").val()));

    jexAjax.execute(function (dat) {

        _loading.stop();
        if (jex.isError(dat)) { // authorization check
            if (dat && dat.COMMON_HEAD) {
                alert(dat.COMMON_HEAD.MESSAGE);
            } else {
                alert(jex.getMsg("WCB009"));
            }
            return;
        }

        if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {

            $("#main").find(".error_txt").text(cnts_Null2Void(dat.ERR_MSG, ""));
            $("#main").find(".error_txt").show();
        } else {

            collectTagManager({
                "event": "guest2",
                "userId": jexAjax.get("USER_ID"),
                "guestDate": getNowTime().slice(0, 4) + "-" + getNowTime().slice(4, 6) + "-" + getNowTime().slice(6, 8)
            })

            fn_goLogin("1");
        }
    });
}

function fn_sendEmail() {

    var jexAjax = jex.createAjaxUtil("COLABO2_EMAIL_C001");
    jexAjax.set("USER_NM", $.trim($("#main").find("#USER_NM").val()));
    jexAjax.set("USER_ID", $.trim($("#main").find("#USER_ID").val()));
    jexAjax.execute(function (dat) {

    });
}

function fn_goLogin(ID_GB) {
    _ID_GB = ID_GB;
    if (g_post_var.g_execute) {
        return;
    }
    g_post_var.g_execute = true;

    if (ID_GB !== "3") {
        cf_setCookie("googleLoginYn", "", 30 * 12);
    } else {
        //pass
    }

    if (ID_GB == "1") {
        if ($.trim($("#main").find("#PWD").val()) == "") {
            $("#main").find(".error_txt").text(cnts_Null2Void(i18n('H402'), "6자 이상, 영문숫자를 입력하시기 바랍니다."));
            $("#main").find(".error_txt").show();
            $("#main").find("#PWD").focus();
            g_post_var.g_execute = false; // 이중방지
            return;
        }
    }

    if ($.trim($("#main").find("#USER_ID").val()) == "") {
        $("#main").find(".error_txt").text(cnts_Null2Void(i18n('DL162'), "ID or 이메일 주소를 입력하시기 바랍니다."));
        $("#main").find(".error_txt").show();
        $("#main").find("#USER_ID").focus();
        g_post_var.g_execute = false; // 이중방지
        return;
    }

    _loading.start();

    var jexAjax = jex.createAjaxUtil("COLABO2_LOGIN_R003");
    jexAjax.set("ID_GB", ID_GB);
    jexAjax.set("USER_ID", $("#main").find("#USER_ID").val());
    //jexAjax.set("PWD", $("#main").find("#PWD").val());

    //@jkw 2020.4.17 암호화 처리
    cf_setCookie("DATE_TIME", fn_flowCurTimeR001());
    jexAjax.set("ENCRYPT_YN", "YC");							//yes, change
    jexAjax.set("PWD", AES_Encode($("#main").find("#PWD").val(), cf_getCookie("DATE_TIME")));

    jexAjax.set("USER_NM", $("#main").find("#USER_NM").val());
    jexAjax.set("PRFL_PHTG", $("#main").find("#PRFL_PHTG").val());
    jexAjax.set("EMAIL", $("#main").find("#KAKAO_EMAIL").val());
    jexAjax.set("SUB_DOM", $("#_SUB_DOM").val());
    if (g_var.g_electronYn) { // 20170621 desktopVersion info
        jexAjax.set("OBJ_CNTS_NM", "desktop");
    }
    setGuid(jexAjax, clientIp);


    jexAjax.execute(function (dat) {

        clog(dat);

        _loading.stop();
        if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {
            if (cnts_Null2Void(dat.ERR_CD, "") == "3001" || cnts_Null2Void(dat.ERR_CD, "") == "1006") { // 기업사용자(ENAGE) 초기
                fn_showChangePwd(dat.USER_ID, dat.RGSN_DTTM);
            } else {
                $(".error_txt").html(cnts_Null2Void(dat.ERR_MSG, ""));
                $(".error_txt").show();
            }

            if (cnts_Null2Void(dat.ERR_CD, "") == "5510" || cnts_Null2Void(dat.ERR_CD, "") == "5555") {
                if (!$("#main").find(".forgot_pw").hasClass('bizplay')) {
                    $("#main").find(".forgot_pw").addClass('bizplay');
                }
            } else {
                if ($("#main").find(".forgot_pw").hasClass('bizplay')) {
                    $("#main").find(".forgot_pw").removeClass('bizplay');
                }

            }
            g_post_var.g_execute = false; // 이중방지

            return;

        } else {
            if (cnts_Null2Void(dat.AUTH_TYPE, "") != "" && cnts_Null2Void(dat.AUTH_YN, "N") == "N") {
                g_post_var.g_execute = false;
                auth_layer.createAuthLayer(dat);
            } else {
                if (ID_GB == 2) {
                    $("#main").find("#USER_ID").val("kakao_" + $("#main").find("#USER_ID").val());
                } else {
                    // done.
                }

                if (ID_GB == 2 || ID_GB == 3 || ID_GB == 11) {
                    if ("Y" === coalesce3(dat.GUEST_INIT_YN, "N")) {
                        collectTagManager({
                            "event": "guest2",
                            "userId": jexAjax.get("USER_ID"),
                            "guestDate": getNowTime().slice(0, 4) + "-" + getNowTime().slice(4, 6) + "-" + getNowTime().slice(6, 8),
                        })
                    } else {
                        // done.
                    }
                    fn_getRandKey();
                } else if (!(ID_GB == 2 || ID_GB == 3 || ID_GB == 11)) { // 카톡 or 지메일이 아닐 경우.
                    fn_getRandKey();
                    cf_setCookie("FLOW_USER_ID", $("#main").find("#USER_ID").val(), 30 * 12 * 10);
                } else {
                    //done
                }

                movePage(dat.RESULT_ADDR, "goLogin");
            }
        }
    });
}

function movePage(url, mode) {

    if (location.href.indexOf('PROJECT_TOUR=Y') > -1) {
        location.href = location.href.replace("/login.act?PROJECT_TOUR=Y&URL=", "");
        return;
    }

    mode = mode || "goLogin";

    var invtKey = cnts_Null2Void($.trim($("#INVT_KEY").html()), "");
    var userId = $.trim($("#main").find("#USER_ID").val());
    var pwd = $.trim($("#main").find("#PWD").val());
    var $frmObj = $("<form id='invite_form' name='invite_form'></form>");
    var s_var_list = "<input type='hidden' name='INVT_KEY' value='" + invtKey + "'/>";
    $frmObj.attr("method", "post");
    $frmObj.appendTo("body");

    if (mode === "goBizLogin") { //비플로그인
        s_var_list += "<input type='hidden' name='USER_ID' value='" + userId + "'/>";
        s_var_list += "<input type='hidden' name='ORG_CLPH_NO' value='" + pwd + "'/>";
    } else if (mode === "goAutoLogin") { //자동로그인
        //pass
    } else if (mode === "elogin") { //엔터로그인
        //pass
    } else if (mode === "blogin") { //비즈니스계정로그인
        //pass
    } else if (mode === "goLogin") { //일반로그인
        //pass
    }

    $frmObj.append(s_var_list);
    setActionUrl($frmObj, url);
    $frmObj.attr("target", "_self");
    $frmObj.submit();

    function setActionUrl($frmObj, url) {
        if (cf_getCookie("electronYn") === "Y") {
            $frmObj.attr("action", "/flow_layout.act");
        } else if (cf_getCookie("RENEWAL_MAINTAIN") === "Y" || isFunc("FLOW_S_MAIN_BASE")) {
            $frmObj.attr("action", "/main.act");
        } else {
            $frmObj.attr("action", url);
        }
    }
}

/**
 * ID 중복체크
 * @param {d} element : input type='email' element
 **/
 function duplicationIdCheck(element){
	//var jexAjax = jex.createAjaxUtil("COLABO2_REGISTER_R001");
	var jexAjax = jex.createAjaxUtil("COLABO_USER_DUPLICATE_R001");
	jexAjax.set("USER_ID", element.val());
	jexAjax.execute(function (dat) {

		if (jex.isError(dat)) {
			if (dat && dat.COMMON_HEAD) {
				alert(dat.COMMON_HEAD.MESSAGE);
			} else {
				alert(jex.getMsg("WCB009"));
			}
			return;
		}

		if (cnts_Null2Void(dat.ERR_CD, "0000") != "0000") {
			if(cmf_browser().ieYn){
				//$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").select();
				toast("2", dat.ERR_MSG);
			} else {
				//$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").select();
				element.parent().find(".error-msg").find(".error-cont").text(dat.ERR_MSG);
				element.parent().removeClass('ok').addClass('error');
			}
			//that.updateNextBtnToSettingTeamInfoBtn();
		} else {
			element.parent().removeClass('error').addClass('ok');
		}
	});
}


/**
 * 구글 로그인 API.
 */
var GoogleSignInApi = function (TARGET_STATUSBAR, RESULT_CALLBACK) {

    this.login = function () {

    }

    this.loadOnWebBrowser = function () {
        auth2.signIn().then(function () {
            attachSignin();
            cf_setCookie("googleLoginYn", "Y");
        });
    }

    this.loadOnDesktopApp = function () {
        gapi.load("auth", {
            callback: onAuthApiLoad
        });
    };

    var onAuthApiLoad = function () {
        try {
            gapi.auth.authorize({
                'client_id': getGoogleOAuthKey(_SERVER_CONN_NUM, _DEV_REAL).clientId,
                'scope': getGoogleOauthScope("signIn"),
                'immediate': true
            }, handleAuthResult)
        } catch (e) {

        }
    };

    var handleAuthResult = function (authResult) { // 데스크탑 버전에서만 사용함
        cf_setCookie("googleLoginYn", "Y");
        fn_openGoogleSignInForElectron(getGoogleOauthRedirectUri("signIn"), "Google", 600, 600, window.screenLeft + ($(window).width() - 600) / 2, window.screenTop + ($(window).height() - 600) / 2);
    };
};

/**
 *
 * @param {string}
 *            token 데스크탑 버전에서 사용. 토큰을 parameter에 넣어 호출하면 profile받아와서 로그인이 됨.
 */
function googleSignInCallback(token) {

    var key = getGoogleOAuthKey($("#SERVER_CONN_NUM").val(), _DEV_REAL);

    gapi.client.setToken(token);
    gapi.client.init({
        apiKey: key.apiKey,
        clientId: key.clientId,
        scope: 'profile'
    }).then(function () {
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        if (profile) {
            $("#main").find("#USER_ID").val(profile.getEmail());
            $("#main").find("#USER_NM").val(profile.getName());
            $("#main").find("#PRFL_PHTG").val(cnts_Null2Void(profile.getImageUrl()));
            gapi.auth2.getAuthInstance().disconnect();
            gapi.auth2.getAuthInstance().signOut().then(function () {
                fn_goLogin("3");
            });
        } else {
            fn_openGoogleSignInForElectron(getGoogleOauthRedirectUri("signIn"), "Google", 600, 600, window.screenLeft + ($(window).width() - 600) / 2, window.screenTop + ($(window).height() - 600) / 2);
        }
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {

        }
    }
}

var googleSignIn = null;
var g_token = "";

function googleLogin() {

    //if (googleSignIn == null) {
    googleSignIn = new GoogleSignInApi("body", function () {
    });
    //}

    if (cf_getCookie("electronYn") === "Y") {
        if ((cf_getCookie("electronVer") < "1_0_6")) {
            alert(cnts_Null2Void(i18n('DL163'), "구글 정책 변경으로 인하여 구글 로그인은 브라우저를 통해서만 이용할 수 있습니다."));
        } else {
            googleSignIn.loadOnDesktopApp();
        }
    } else {
        if (isGoogleOauthUseable()) {
            googleSignIn.loadOnWebBrowser();
        }
    }
}

function attachSignin() {
    var GoogleUser = auth2.currentUser.get();
    var profile = GoogleUser.getBasicProfile();

    clog("profile : " + json(profile));

    if (cnts_Null2Void($("#enterpriseLoginDiv").css('display'), 'none') === 'block') {

        $("#enterpriseLoginDiv").find("input[name=email]").val(profile.getEmail());
        $("#enterpriseLoginDiv").find("input[name=userName]").val(profile.getName());
        $("#enterpriseLoginDiv").find("input[name=prflPhtg]").val(cnts_Null2Void(profile.getImageUrl()));
        GoogleUser.disconnect();
        signOut();
        entLogin.fn_goLogin("3");

    } else if (cnts_Null2Void($("#businessLoginDiv").css('display'), 'none') === 'block') {

    } else {
        $("#main").find("#USER_ID").val(profile.getEmail());
        $("#main").find("#USER_NM").val(profile.getName());
        $("#main").find("#PRFL_PHTG").val(cnts_Null2Void(profile.getImageUrl()));
        GoogleUser.disconnect();
        signOut();
        fn_goLogin("3");

    }
}

function signOut() { // WebBrowser에서 구글 로그인한 경우 로그아웃하기.

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    auth2.disconnect();
}

/**
 * 페이지 Form Submit
 */
function goUrl(val) {

    document.frmJoin.action = val;
    document.frmJoin.submit();
}

/**
 * 비플 로그인후 이동
 */
function fn_goBizLogin() {

    _loading.start();

    var jexAjax = jex.createAjaxUtil("goLogin");
    jexAjax.set("USER_ID", $.trim($("#main").find("#USER_ID").val()));
    jexAjax.set("PWD", $.trim($("#main").find("#PWD").val()));

    if (g_var.g_electronYn) { // 20170621 desktopVersion info
        jexAjax.set("OBJ_CNTS_NM", "desktop");
    }

    jexAjax.execute(function (dat) {
        if (cnts_Null2Void(dat.RESULT_CODE, "") != "0000") {
            $("#main").find(".error_txt").text(cnts_Null2Void(dat.ERR_MSG, ""));
            $("#main").find(".error_txt").show();
            g_post_var.g_execute = false; // 이중방지
            _loading.stop();
        } else {
            _loading.stop();
            fn_getRandKey();
            movePage(dat.RESULT_ADDR, "goBizLogin")
        }
    });
}

// 자동 로그인 랜덤키생성 - 세션이 존재할 경우에만 생성이 되도록 한다.
function fn_getRandKey() {
    if ($("#main").find("#AUTO_BOX").prop("checked") ||
        $("#enterpriseLoginDiv").find("#autoLoginCheckbox").prop("checked") ||
        $("#businessLoginDiv").find("input[type=checkbox]").prop("checked")
    ) {
        var jexAjax = jex.createAjaxUtil("COLABO2_AUTO_LOGIN_R001");

        var userId = "";
        if (cnts_Null2Void($("#enterpriseLoginDiv").css('display'), 'none') === 'block') {
            userId = $.trim($("#enterpriseLoginDiv").find("input[name=email]").val());
        } else if (cnts_Null2Void($("#businessLoginDiv").css('display'), 'none') === 'block') {
            userId = $.trim($("#businessLoginDiv").find("input[name=email]").val());
        } else {
            userId = $.trim($("#main").find("#USER_ID").val());
        }
        if (userId == "") {
            return;
        }
        jexAjax.set("USER_ID", userId);
        if (getElectronYn()) { // 20170621 desktopVersion info
            jexAjax.set("OBJ_CNTS_NM", "desktop");
        }
        jexAjax.setAsync(false);
        jexAjax.execute(function (dat) {

            if (jex.isError(dat)) { // authorization check
                if (dat && dat.COMMON_HEAD) {
                    alert(dat.COMMON_HEAD.MESSAGE);
                } else {
                    alert(jex.getMsg("WCB009"));
                }
                return;
            } else {
                var ClientId = 'web.flow';
                if (b_joins) {
                    ClientId = 'web.joinsflow';
                } else if (isKtWorks) {
                    ClientId = 'ktworks.login';
                } else {
                    ClientId = 'web.flow';
                }
            }

            if (getElectronYn()) {
                cf_setCookie("miniflowLogin", userId + "|" + dat.RAND_KEY, 30 * 12);
            } else {
                cf_setCookie("flowLogin", userId + "|" + dat.RAND_KEY, 30 * 12);
            }
        });
    } else {
        if (getElectronYn()) {
            cf_setCookie("miniflowLogin", "", 30 * 12);
        } else {
            cf_setCookie("flowLogin", "", 30 * 12);
        }
    }
}

// 자동 로그인 처리 - 세션이 존재할 경우에만 생성이 되도록 한다.
function fn_goAutoLogin() {


    var data;

    if (getElectronYn()) {
        data = cf_getCookie("miniflowLogin").split("|");
    } else {
        data = cf_getCookie("flowLogin").split("|");
    }

    if (data.length < 2 || "" === coalesce(data[0]) || "" === coalesce(data[1])) {
        return;
    } else {
        //done
    }

    // 자동 로그인 체크했을 경우.
    var jexAjax = jex.createAjaxUtil("COLABO2_AUTO_LOGIN_R002");

    jexAjax.set("USER_ID", data[0]);
    jexAjax.set("RAND_KEY", data[1]);


    if (cf_getCookie("electronYn") == "Y") { // 20170621 desktopVersion info
        jexAjax.set("OBJ_CNTS_NM", "desktop");
    }

    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {

        if (jex.isError(dat)) { // authorization check
            if (dat && dat.COMMON_HEAD) {
                alert(dat.COMMON_HEAD.MESSAGE);
            } else {
                alert(jex.getMsg("WCB009"));
            }
            return;
        }

        if (cnts_Null2Void(dat.RESULT_CODE, "") != "0000") {
            // pass.
        } else {
            movePage(dat.RESULT_ADDR, "goAutoLogin")
        }
    });

}

function fn_checkPwdValidation(e) {

    if (cnts_Null2Void($("#password1").val(), '') == '') {
        $("#password1").parent().find(".btn-clear-text").show();
        $("#password1").parent().find(".btn-ok-text").hide();
        $("#password1").parent().addClass('error');
        cmf_btnClear(e);
        $("#password1").parent().removeClass('ok');
        $("#password1").parent().find('.error-msg').find(".error-cont").text(cnts_Null2Void(i18n('DL531'), '비밀번호를 입력해주세요!'));
        $("#changePassword").find("#pwdChangeBtn").addClass('c-gray').removeClass('c-blue');
        return;
    } else {
        if (cmf_validate($("#password1").val())) {
            $("#password1").parent().find(".btn-clear-text").show();
            $("#password1").parent().find(".btn-ok-text").hide();
            $("#password1").parent().addClass('error');
            cmf_btnClear(e);
            $("#password1").parent().removeClass('ok');
            $("#password1").parent().find('.error-msg').find(".error-cont").text('암호 규칙에 맞지 않습니다. (8자이상, 숫자/문자/특수기호 중 3가지 이상)');
            $("#changePassword").find("#pwdChangeBtn").addClass('c-gray').removeClass('c-blue');
            return;
        } else {
            $("#password1").parent().find(".btn-clear-text").hide();
            $("#password1").parent().find(".btn-ok-text").show();
            $("#password1").parent().removeClass('error');
            $("#password1").parent().addClass('ok');
        }
    }

    if (cnts_Null2Void($("#password2").val(), '') == '') {
        $("#password2").parent().find(".btn-clear-text").show();
        $("#password2").parent().find(".btn-ok-text").hide();
        $("#password2").parent().addClass('error');
        cmf_btnClear(e);
        $("#password2").parent().removeClass('ok');
        $("#password2").parent().find('.error-msg').find(".error-cont").text(cnts_Null2Void(i18n('DL531'), '비밀번호를 입력해주세요!'));
        $("#changePassword").find("#pwdChangeBtn").addClass('c-gray').removeClass('c-blue');
        return;
    } else {
        if (cmf_validate($("#password2").val())) {
            $("#password2").parent().find(".btn-clear-text").show();
            $("#password2").parent().find(".btn-ok-text").hide();
            $("#password2").parent().addClass('error');
            cmf_btnClear(e);
            $("#password2").parent().removeClass('ok');
            $("#password2").parent().find('.error-msg').find(".error-cont").text('암호 규칙에 맞지 않습니다. (8자이상, 숫자/문자/특수기호 중 3가지 이상)');
            $("#changePassword").find("#pwdChangeBtn").addClass('c-gray').removeClass('c-blue');
            return;
        } else {
            $("#password2").parent().find(".btn-clear-text").hide();
            $("#password2").parent().find(".btn-ok-text").show();
            $("#password2").parent().removeClass('error');
            $("#password2").parent().addClass('ok');
        }
    }

    if ($("#password1").val() != $("#password2").val()) {
        $("#password2").parent().find(".btn-clear-text").show();
        $("#password2").parent().find(".btn-ok-text").hide();
        $("#password2").parent().addClass('error');
        cmf_btnClear(e);
        $("#password2").parent().removeClass('ok');
        $("#password2").parent().find('.error-msg').find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
        $("#changePassword").find("#pwdChangeBtn").addClass('c-gray').removeClass('c-blue');
        return;
    } else {
        $("#changePassword").find("#pwdChangeBtn").addClass('c-blue').removeClass('c-gray');
    }
}

function fn_showChangePwd(user_id, rgsn_dttm) {
    electronConfirm("알림", "비밀번호 초기화(설정)를 진행 완료 후<br> 로그인 가능합니다.", function () {
        $("#enterpriseLoginDiv").hide();
        $("#changePassword").show();

        $("#changePassword").find("#password1").attr('tabindex', '1');
        $("#changePassword").find("#password2").attr('tabindex', '2');
        $("#changePassword").find("#pwdChangeBtn").attr('tabindex', '3');
        $("#changePassword").find("#pwdChangeBtn").attr('user_id', user_id);
        $("#changePassword").find("#pwdChangeBtn").attr('rgsn_dttm', rgsn_dttm);

    }, function () {
        $("#changePassword").hide();
        $("#enterpriseLoginDiv").show();
    });
}

function fn_changePwd() { // changePassword
    // COLABO2_PWD_U002

    var jexAjax = jex.createAjaxUtil("COLABO2_PWD_U002");
    jexAjax.set("USER_ID", $("#changePassword").find("#pwdChangeBtn").attr('user_id'));
    jexAjax.set("RGSN_DTTM", $("#changePassword").find("#pwdChangeBtn").attr('rgsn_dttm'));
    jexAjax.set("PWD", $("#password1").val());
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {

        if (jex.isError(dat)) { // authorization check
            if (dat && dat.COMMON_HEAD) {
                alert(dat.COMMON_HEAD.MESSAGE);
            } else {
                alert(jex.getMsg("WCB009"));
            }
            return;
        }

        $("#changePassword").hide();
        $("#main").find("#PWD").val('').focus();
    });

}

function fn_changePwd2() { // changePassword
    // COLABO2_PWD_U002

    var jexAjax = jex.createAjaxUtil("COLABO2_PWD_U002");
    jexAjax.set("USER_ID", $("#changePassword").find("#pwdChangeBtn").attr('user_id'));
    jexAjax.set("RGSN_DTTM", $("#changePassword").find("#pwdChangeBtn").attr('rgsn_dttm'));
    jexAjax.set("PWD", $("#password1").val());
    jexAjax.set("USER_GB", "INIT");
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {

        if (jex.isError(dat)) { // authorization check
            if (dat && dat.COMMON_HEAD) {
                alert(dat.COMMON_HEAD.MESSAGE);
            } else {
                alert(jex.getMsg("WCB009"));
            }
            return;
        }

        cmf_layerMsg("1", "성공적으로 변경되었습니다.");
        location.href = '/flow_layout.act'
    });

}


var elogin = function () {
    var execute = false;

    return {
        _start: function () {

            if (!execute) {
                execute = true;
            }
            return execute;
        },
        _end: function () {

            execute = false;
        },
        fn_initEnterpriseLogin: function () {
            var that = this;

            if ($("#_SUB_DOM").val() == "SECO") {
                _ID_GB = "4";
            } else if ($("#_SUB_DOM").val() == "JOINS") {
                _ID_GB = "7";
            } else {
                //done
            }

            $("#enterpriseLoginDiv").find("button[name$='loginBtn']").on('click', function (event) {
                that.fn_goLogin(_ID_GB);
            });

            $("#enterpriseLoginDiv").find("#guestLoginBtn").off();
            $("#enterpriseLoginDiv").find("#guestLoginBtn").on('click', function (event) {

                if (cnts_Null2Void(cf_getCookie("invtKey"), "") == "") {
                    if ($("#_SUB_DOM").val() == "FLOW_MOBIS" || _STR_BASE_URL.indexOf("mobis") > -1) {
                        jsDraw.alert({'type': '2', 'msg': '현재 이용이 불가능합니다.'})
                        //that.fn_goGuestLogin();
                    } else {
                        $("#collabo_mod_bg_layer").show();
                        $("#guestNoInvtKeyLayer").show();

                        $("#guestNoInvtKeyLayer").find("#guestNoInvtKeyPopupClose").off("click").on('click', function (event) {
                            $("#collabo_mod_bg_layer").hide();
                            $("#guestNoInvtKeyLayer").hide();
                        });
                        $("#guestNoInvtKeyLayer").find("#guestNoInvtKeyPopupConfm").off("click").on('click', function (event) {
                            $("#collabo_mod_bg_layer").hide();
                            $("#guestNoInvtKeyLayer").hide();
                        });
                    }
                } else {
                    if ($("#_SUB_DOM").val() == "SOIL" || _STR_BASE_URL.indexOf("s-oil") > -1) {
                        $("#collabo_mod_bg_layer").show();
                        $("#securityAgreeLayerView").show();
                        $("#securityAgreeLayerView").load(_STR_BASE_URL + "/collabo/flow_agreement_view.jsp?PRJ=N&USE_INTT_ID=" + $("#_SUB_DOMAIN_USE_INTT_ID").val(), '.layerstyle4_po', function () {
                            cmf_centerLocation($("#securityAgreeLayer").show());
                            $("#securityAgreeLayer").find("#securityAgreeButton").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                                appr_yn = "Y"
                                that.fn_goGuestLogin();
                            })

                            $("#securityAgreeLayer").find("#securityAgreeLayerClose").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                            })

                            $("#securityAgreeLayer").find("#securityDisagreeButton").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                            })
                        })
                    } else {
                        that.fn_goGuestLogin();
                    }
                }
            });

            $("#enterpriseLoginDiv").find("#guestLoginDiv").find(".closebtn").on('click', function (event) {

                $("#enterpriseLoginDiv").find("#guestLoginDiv").hide();
                $("#enterpriseLoginDiv").find("#guestLoginDivModal").hide();
            });

            $("#enterpriseLoginDiv").find("#guestLoginDiv").find("#guestLoginPopupClose").on('click', function (event) {

                $("#enterpriseLoginDiv").find("#guestLoginDiv").hide();
                $("#enterpriseLoginDiv").find("#guestLoginDivModal").hide();
            });


            if ($("#_COMPANY_CODE_USEABLE").val()) {
                $("#enterpriseLoginDiv").find("#companyName").on('click', function (e) {
                    that.fn_showCompanyCodeLayer();
                });
                $("#enterpriseLoginDiv").find("button.btn-open-selectbox").on('click', function (e) {
                    e.stopPropagation();
                    that.fn_showCompanyCodeLayer();
                });

                if ($("#_SUB_DOM").val() == "SECO") {
                    var secoCompanyCode = cf_getCookie('SECO_COMPANY_CODE');
                    var secoCompanyName = cf_getCookie('SECO_COMPANY_NAME');
                    if (secoCompanyCode != "") {
                        $("#enterpriseLoginDiv").find("#companyCode").val(secoCompanyCode);
                        $("#enterpriseLoginDiv").find("#companyName").val(secoCompanyName);
                        $("#enterpriseLoginDiv").find("input#companyName").parents("div.inputbox").addClass("ok");
                    }
                }
            }

            $("#enterpriseLoginDiv").find("input[name=email]").on("keyup focusout", function (e) {
                $("#enterpriseLoginDiv").find("#errorMsg").html("");
                if (e.keyCode) {
                    if (e.keyCode == 13) {
                        that.fn_goLogin(_ID_GB);
                    } else if (e.keyCode == 32) {
                        $(this).val($(this).val().trim().replace(/\ /, ""));
                    }
                } else {
                    if ($.trim($(e.target).val()) != "") {
                        $(e.target).parent().removeClass('error').addClass('ok');
                    } else {
                        if ($(e.target).val().length === 0) {
                            $(e.target).parent().removeClass('ok').removeClass('error');
                        } else {
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.fn_updateLoginBtn();
                }
            });

            $("#enterpriseLoginDiv").find("input[name=password]").on("keyup focusout", function (event) {

                if (event.keyCode && event.keyCode == 13) {
                    if ($(event.target).parent().hasClass('ok')) {
                        that.fn_goLogin(_ID_GB);
                    }
                } else {
                    if ($.trim($(event.target).val()) == "") {
                        $(event.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        $(event.target).parent().removeClass('error').addClass('ok');
                    }
                    that.fn_updateLoginBtn();
                }
            });

            $("#enterpriseLoginDiv").find("#googleLogin").click(function () {

                googleLogin();
            });

            $("#enterpriseLoginDiv").find("#kakaoLogin").click(function () {

                if (g_var.g_electronYn && (cf_getCookie("electronVer") < "1_0_6")) {
                    var $frmObj = $("<form id='kakao_login' name='kakao_login'></form>");
                    $frmObj.attr("action", "https://kauth.kakao.com/oauth/authorize?client_id=e1d3e5b1a478fdb8e0b6b6b07f929995&redirect_uri=" + location.origin + "/login.act&response_type=code")
                    $frmObj.attr("method", "post");
                    $frmObj.attr("target", "_blank");
                    $frmObj.attr("resizable");
                    $frmObj.appendTo("body");
                    $frmObj.submit();
                    $frmObj.remove();
                } else {
                    Kakao.Auth.login({
                        success: function (authObj) {
                            Kakao.API.request({
                                url: '/v2/user/me',
                                success: function (res) {
                                    $("#enterpriseLoginDiv").find("input[name=email]").val(res.id);
                                    $("#enterpriseLoginDiv").find("input[name=kakaoEmail]").val(cnts_Null2Void(res.kaccount_email, ""));
                                    if (res.properties) {
                                        if (res.properties.nickname) {
                                            $("#enterpriseLoginDiv").find("input[name=userName]").val(cnts_Null2Void(res.properties.nickname, res.id));
                                        } else {
                                            $("#enterpriseLoginDiv").find("input[name=userName]").val(res.id);
                                        }
                                        if (cnts_Null2Void(res.properties.thumbnail_image, "") != "") {
                                            $("#enterpriseLoginDiv").find("input[name=prflPhtg]").val(cnts_Null2Void(res.properties.thumbnail_image, ""));
                                        } else {
                                            // done.
                                        }
                                    } else {
                                        $("#enterpriseLoginDiv").find("input[name=userName]").val(res.id);
                                        $("#enterpriseLoginDiv").find("input[name=prflPhtg]").val("");
                                    }
                                    entLogin.fn_goLogin("2");
                                },
                                fail: function (error) {
                                    console.error(error);
                                }
                            });
                        },
                        fail: function (error) {
                            console.error(error);
                        }
                    });
                }
            });
            $("#enterpriseLoginDiv").show();

        },
        fn_updateLoginBtn: function () {

            var result = false;

            $("#enterpriseLoginDiv").find(".inputbox").each(function (i, v) {
                if ($(v).find('input').val()) {
                    $(v).addClass('ok')
                    result = true;
                } else {
                    result = false;
                    return false;
                }
            });

            if (result) {
                $("#enterpriseLoginDiv").find("button[name$='loginBtn']").removeClass('c-gray');
            } else if (b_kimchang) {
                $("#enterpriseLoginDiv").find("button[name$='loginBtn']").removeClass('c-gray');
            } else {
                $("#enterpriseLoginDiv").find("button[name$='loginBtn']").addClass('c-gray');
            }
        },
        fn_goLogin: function (ID_GB) {
            clog('ID_GB ### ' + ID_GB);

            //SECO: 4, JOINS :7, 나머지 : 없음
            _ID_GB = ID_GB;
            if (!this._start()) {
                return;
            }

            if (g_post_var.g_execute) {
                return;
            }
            g_post_var.g_execute = true;

            if (ID_GB == "4"
                && ($("#_SUB_DOM").val() == "SECO")
                && ($("#enterpriseLoginDiv").find("#companyCode").val() == "")) {
                cmf_layerMsg("2", cnts_Null2Void(i18n('DL164'), '회사코드를 입력하세요'));
                //alert(cnts_Null2Void(i18n('DL164'),'회사코드를 입력하세요'));
                return;
            }

            if (b_kimchang) {
                if ($("#enterpriseLoginDiv").find("input[name$='email']").val() == "") {
                    cmf_layerMsg("2", "아이디를 입력해주세요.")
                    return;
                }
            } else {
                if (cnts_Null2Void($("#guestLoginDiv").css('display'), 'block') != 'block') {
                    if ($("#enterpriseLoginDiv").find("button[name$='loginBtn']").hasClass('c-gray')) {
                        return;
                    }
                }
            }

            $("#enterpriseLoginDiv").find("#errorMsg").hide();

            _loading.start();

            var jexAjax = jex.createAjaxUtil("COLABO2_LOGIN_R003");
            if ($("#enterpriseLoginDiv").find("input[name=email]").val() === "madrascheck" ||
                $("#enterpriseLoginDiv").find("input[name=email]").val() === "flowtest1" ||
                $("#enterpriseLoginDiv").find("input[name=email]").val() === "flowtest2" ||
                $("#enterpriseLoginDiv").find("input[name=email]").val() === "mediadata" ||
                /bot$/i.test($("#enterpriseLoginDiv").find("input[name=email]").val())
            ) {
                _ID_GB = 1;
                jexAjax.set("ID_GB", 1);
                jexAjax.set("SUB_DOM", "");
            } else {
                jexAjax.set("ID_GB", ID_GB);
                jexAjax.set("SUB_DOM", $("#_SUB_DOM").val());
            }
            if ($("#_SUB_DOM").val() == "SECO") {
                jexAjax.set("CMPN_CD", $("#enterpriseLoginDiv").find("#companyCode").val());
            }

            jexAjax.set("USER_ID", $("#enterpriseLoginDiv").find("input[name=email]").val());

            //@jkw 2020.4.17 암호화 처리
            cf_setCookie("DATE_TIME", fn_flowCurTimeR001());
            jexAjax.set("ENCRYPT_YN", "YC");	//yes, change
            jexAjax.set("PWD", AES_Encode($("#enterpriseLoginDiv").find("input[name=password]").val()));

            jexAjax.set("USER_NM", $("#enterpriseLoginDiv").find("input[name=userName]").val());
            jexAjax.set("PRFL_PHTG", $("#enterpriseLoginDiv").find("input[name=prflPhtg]").val());
            jexAjax.set("EMAIL", $("#enterpriseLoginDiv").find("input[name=kakaoEmail]").val());

            if (appr_yn == "Y") {		//보안서약서 동의
                jexAjax.set("APPR_YN", appr_yn);
            }

            if (cf_getCookie("electronYn") == "Y") { // 20170621
                // desktopVersion info
                jexAjax.set("OBJ_CNTS_NM", "desktop");
            }

            setGuid(jexAjax, clientIp);

            var that = this;
            jexAjax.execute(function (dat) {
                _loading.stop();
                g_post_var.g_execute = false;
                if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {

                    /* @유민호 :  에러코드에 따른 용어 정리 190529 */
                    /*
						1000 S63 S64 비밀번호를 0번 틀렸습니다.
						1002 S65 비밀번호 오류가 3회이상 발생하였습니다. 비밀번호를 다시 설정해보세요
						2000 S59 S67 선택하신 회사에 계정이 없습니다. 존재하지 않은 사용자입니다.
						2001 S70  gware와 동기화된 사용자가 아닙니다.
						3001 S73 비밀번호 변경 로직
						3002 S74 아이디와 비밀번호가 일치하지 않습니다.
						3333 S68 user@xxx.xx 형식으로 입력하셔야 합니다.
						3334 S69 enage 관리자에게 도메인 등록을 문의하시기 바랍니다.
						4001 S61 팀 가입 대기 중입니다.
						4003 S75 이용 중지 - 팀 관리자가 일시 중지하여 이용할 수 없습니다.
						4006 S62 요청 거절시
						5000 S76 관리자가 아니여서 로그인하실 수 없으십니다.
						5001 S60 해당 도메인의 사용자가 존재하지 않습니다.
						5003 S71 패스워드 오류
						6000 SXX 보안서약서에 동의해주셔야합니다.
						9999 S66 탈퇴된 이메일입니다.
					*/

                    var _ID_ERROR = ["2000", "3333"];
                    var _PW_ERROR = ["1000", "1002", "3001", "5003"];
                    var _DF_ERROR = ["3002", "4001", "4003", "4006", "5000", "5001", "9999",];
                    var _GW_ERROR = ["2001", "3334"];

                    var _ID_OBJ = $("#enterpriseLoginDiv").find("input[name=email]").parent();
                    var _PW_OBJ = $("#enterpriseLoginDiv").find("input[name=password]").parent();

                    if (cnts_Null2Void(dat.ERR_CD, "") == "2000" || cnts_Null2Void(dat.ERR_CD, "") == "3333") {

                        _ID_OBJ.removeClass('ok').addClass('error');
                        _ID_OBJ.find('.error-cont').html(dat.ERR_MSG.replace('\\n', ' '));

                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "1000" || cnts_Null2Void(dat.ERR_CD, "") == "1002" || cnts_Null2Void(dat.ERR_CD, "") == "3001" || cnts_Null2Void(dat.ERR_CD, "") == "5003") {

                        _PW_OBJ.removeClass('ok').addClass('error');
                        _PW_OBJ.find('.error-cont').html(dat.ERR_MSG.replace('\\n', ' '));

                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "3002" || cnts_Null2Void(dat.ERR_CD, "") == "4001" || cnts_Null2Void(dat.ERR_CD, "") == "4003" || cnts_Null2Void(dat.ERR_CD, "") == "4006"
                        || cnts_Null2Void(dat.ERR_CD, "") == "5000" || cnts_Null2Void(dat.ERR_CD, "") == "5001" || cnts_Null2Void(dat.ERR_CD, "") == "9999"
                    ) {

                        cmf_layerMsg("2", dat.ERR_MSG);

                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "2001" || cnts_Null2Void(dat.ERR_CD, "") == "3334") {

                        cmf_layerMsg("2", dat.ERR_MSG);

                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "1004") { 			//@안광선 191024 : 현대 모비스 비밀번호 7회이상 틀릴시 팝업

                        $("#collabo_mod_bg_layer").show();
                        $("#passWordFailLayer").show();

                        $("#passWordFailLayer").find("#passWordFailPopupClose").off("click").on('click', function (event) {
                            $("#collabo_mod_bg_layer").hide();
                            $("#passWordFailLayer").hide();
                        });
                        $("#passWordFailLayer").find("#passWordFailPopupConfm").off("click").on('click', function (event) {
                            $("#collabo_mod_bg_layer").hide();
                            $("#passWordFailLayer").hide();
                        });


                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "6000") { 			//@안광선 191011 : 현대모비스 보안서약서

                        //$("#authLayer").css("z-index", "1100").hide()
                        $("#collabo_mod_bg_layer").show();
                        $("#securityAgreeLayerView").show();
                        $("#securityAgreeLayerView").load(_STR_BASE_URL + "/collabo/flow_agreement_view.jsp?PRJ=N&USE_INTT_ID=" + $("#_SUB_DOMAIN_USE_INTT_ID").val(), '.layerstyle4_po', function () {
                            cmf_centerLocation($("#securityAgreeLayer").show());
                            $("#securityAgreeLayer").find("#securityAgreeButton").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                                appr_yn = "Y"
                                that.fn_goLogin(_ID_GB);
                            })

                            $("#securityAgreeLayer").find("#securityAgreeLayerClose").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                            })

                            $("#securityAgreeLayer").find("#securityDisagreeButton").off().on("click", function () {
                                $("#collabo_mod_bg_layer").hide();
                                $("#securityAgreeLayer").hide()
                            })

                        })

                    } else if (cnts_Null2Void(dat.ERR_CD, "") == "1006") { // 기업사용자(ENAGE) 초기
                        fn_showChangePwd(dat.USER_ID, dat.RGSN_DTTM)
                    } else {
                        $("#enterpriseLoginDiv").find("#errorMsg").text(cnts_Null2Void(dat.ERR_MSG, ""));
                        $("#enterpriseLoginDiv").find("#errorMsg").show();
                    }
                } else {

                    if (cnts_Null2Void(dat.AUTH_TYPE, "") != "" && cnts_Null2Void(dat.AUTH_YN, "N") == "N") {
                        that._end();
                        auth_layer.createAuthLayer(dat);
                    } else {

                        if (ID_GB == 2) {
                            $("#enterpriseLoginDiv").find("input[name=email]").val("kakao_" + $("input[name=email]").val());
                        } else {
                            // done.
                        }

                        if ($("#_SUB_DOM").val() == "SECO") {
                            if ($("#enterpriseLoginDiv").find("#autoLoginCheckbox").prop("checked")) {
                                cf_setCookie("FLOW_USER_ID", $("#enterpriseLoginDiv").find("input[name=email]").val(), 30 * 12 * 10);
                            } else {
                                // done.
                            }
                        } else {

                            if (!(ID_GB == 2 || ID_GB == 3 || ID_GB == 11)) { // 카톡 or 지메일이 아닐 경우.
                                fn_getRandKey();
                                cf_setCookie("FLOW_USER_ID", $("#enterpriseLoginDiv").find("input[name=email]").val(), 30 * 12 * 10);
                            } else {
                                // done.
                            }
                        }

                        if (cnts_Null2Void(dat.WRITTEN_AGREEMENT_YN, "") == "Y" && cnts_Null2Void(dat.ENT_FIRST_INIT_YN, "") == "Y") {
                            //$("#authLayer").css("z-index", "1100").hide();
                        } else {
                            movePage(dat.RESULT_ADDR, "elogin");
                        }
                    }
                }
                that._end();
            });

        },
        fn_goGuestLogin: function () {


            cmf_centerLocation($("#guestLoginDiv"));
            $("#guestLoginDiv").show();
            $("#guestLoginDivModal").show()
        },
        fn_showCompanyCodeLayer: function () {
            if (cnts_Null2Void($("#enterpriseLoginDiv").find("#companyCodeLayer").css('display'), "none") === "none") {
                this.fn_getCompanyCode($("#_SUB_DOMAIN_NAME").val());
                $("#enterpriseLoginDiv").find("#companyCodeLayer").fadeIn(100);
            } else {
                $("#enterpriseLoginDiv").find("#companyCodeLayer").hide();
            }
        },
        fn_getCompanyCode: function (subDomNm) {
            var jexAjax = jex.createAjaxUtil("FLOW_COMPANY_INFO_R001");
            jexAjax.set("SUB_DOM_NM", subDomNm);
            var that = this;
            jexAjax.execute(function (dat) {
                if (cnts_Null2Void(dat.COMPANY_LIST, "") != "") {
                    var list = JSON.parse(dat.COMPANY_LIST);
                    that.fn_drawCompanyCode(list)
                }
            });
        },
        fn_drawCompanyCode: function (list) {
            var liObj;
            $("#enterpriseLoginDiv").find("#companyCodeLayer").mCustomScrollbar("destroy");
            $("#enterpriseLoginDiv").find("#companyCodeLayer").empty();
            list.forEach(function (v) {
                liObj = $("#enterpriseLoginDiv").find("div#cpn_cd_li_obj > div.cpn_cd_li").clone();
                liObj.text(v.cpn_name);
                liObj.on('click', function () {
                    cf_setCookie('SECO_COMPANY_CODE', v.cpn_code, 30 * 12); // 30일
                                                                            // *
                                                                            // 12개월
                                                                            // = 1년
                    cf_setCookie('SECO_COMPANY_NAME', v.cpn_name, 30 * 12); // 30일
                                                                            // *
                                                                            // 12개월
                                                                            // = 1년
                    $("#enterpriseLoginDiv").find("input#companyName").val(v.cpn_name);
                    $("#enterpriseLoginDiv").find("input#companyCode").val(v.cpn_code);
                    $("#enterpriseLoginDiv").find("#companyCodeLayer").hide();
                    $("#enterpriseLoginDiv").find("input#companyName").parents("div.inputbox").addClass("ok");
                });
                liObj.appendTo($("#enterpriseLoginDiv").find("#companyCodeLayer"));
            });

            $("#enterpriseLoginDiv").find("#companyCodeLayer").mCustomScrollbar();
        }
    }
}

var blogin = function () {

    var execute = false;

    return {
        _start: function () {

            if (!execute) {
                execute = true;
            }
            return execute;
        },
        _end: function () {

            execute = false;
        },
        fn_initBusinessLogin: function () {

            var that = this;
            // businessLogin
            $("#businessLoginDiv").find("button[name$='loginBtn']").on('click', function () {
                that.fn_goLogin("1");
            });

            $("#businessLoginDiv").find("#signUpBtn").on('click', function () {
                that.fn_goSignUp();
            });

            $("#businessLoginDiv").find("input[type=checkbox]").off('change').on('change', function (e, v) {
                if ($(this).is(":checked")) {
                    cf_setCookie("AutoLogin", "Y", 30 * 12);
                } else {
                    cf_setCookie("AutoLogin", "N", 30 * 12);
                }
            });

            //@유민호 : 모바일 뷰에서 스크롤이 제대로 되지 않는 현상 발생함 190821 회원가입
            if ($("#_MOBILE_YN").val() !== "Y") {
                $("#businessLoginDiv").find("#signUpBox").find(".fl-content").mCustomScrollbar({
                    setHeight: window.innerHeight - 110
                });


                $(window).on('resize', function () {
                    $("#businessLoginDiv").find("#signUpBox").find(".fl-content").css('height', window.innerHeight - 110);
                    $("#businessLoginDiv").find("#signUpBox").find(".fl-content").mCustomScrollbar("disable");
                    $("#businessLoginDiv").find("#signUpBox").find(".fl-content").mCustomScrollbar({
                        setHeight: window.innerHeight - 110,
                        mouseWheel: {
                            preventDefault: true
                        }
                    });
                    $("#businessLoginDiv").find("#signUpBox").find(".fl-content").mCustomScrollbar("update");
                });
            }


            $("#businessLoginDiv").find("#businessSignUpLink").on('click', function () {
                that.fn_showSignUpBox();
            });

            $("#businessLoginDiv").find("#businessLoginLink").on('click', function () {
                that.fn_showLoginBox();
            });

            $("#businessLoginDiv").find("#loginBox").find("input[name=email]").on("keyup focus", function (e) {
                if (e.keyCode) {
                    if (e.keyCode == 13) {
                        that.fn_goLogin("1");
                        return;
                    } else if (e.keyCode == 32) {
                        $(this).val($(this).val().trim().replace(/\ /, ""));
                    }
                }
                if (cnts_Null2Void($("#_SUB_DOM").val(), "").indexOf("BFLOW") > -1) {
                    if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                        $(e.target).parent().removeClass('error').addClass('ok');
                    } else {
                        if ($(e.target).val().length === 0) {
                            $(e.target).parent().removeClass('ok').removeClass('error');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text("아이디를 입력해주세요.");
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                } else {
                    if ($(e.target).val().length > 0) {
                        $(e.target).parent().removeClass('error').addClass('ok');
                    } else {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    }
                }

                that.fn_updateLoginBtn();
            });

            $("#businessLoginDiv").find("#loginBox").find("input[name=password]").on("keyup focus", function (e) {
                if (e.keyCode && e.keyCode == 13) {
                    if ($(e.target).parent().hasClass('ok')) {
                        that.fn_goLogin("1");
                        return;
                    }
                }
                if ($.trim($(e.target).val()) == "") {
                    $(e.target).parent().removeClass('ok').removeClass('error');
                } else {
                    $(e.target).parent().removeClass('error').addClass('ok');
                }
                that.fn_updateLoginBtn();
            });

            $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").on("keyup focus", function (e) {
                if (e.keyCode) {
                    if (e.keyCode == 13) {
                        that.fn_goSignUp();
                        return;
                    } else if (e.keyCode == 32) {
                        $(this).val($(this).val().trim().replace(/\ /, ""));
                    }
                }
                if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                    $(e.target).parent().removeClass('error').addClass('ok');
                } else {
                    $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H440'), "이메일을 입력해주세요."));
                    $(e.target).parent().removeClass('ok').addClass('error');
                    cmf_btnClear(e);
                }
                that.fn_updateSignUpBtn();
            });

            $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").on("blur", function (e) {
                if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                    upgrade.duplicationIdCheck($(e.target));
                    //$(e.target).parent().removeClass('error').addClass('ok');
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H440'), "이메일을 입력해주세요."));
                        $(e.target).parent().removeClass('ok').addClass('error');
                        //cmf_btnClear(e);
                    }
                }
                that.fn_updateSignUpBtn();
            });


            $("#businessLoginDiv").find("#signUpBox").find("input[name='name']").on("keyup focus", function (e) {

                if (e.keyCode) {
                    if (e.keyCode == 13) {
                        that.fn_goSignUp();
                        return;
                    } else if (e.keyCode == 32) {
                        $(this).val($(this).val().trim());
                    }
                }
                if (($(e.target).val().length > 0) && (!cmf_isSpecialCharacterExist($(e.target).val()))) {
                    $(e.target).parent().removeClass('error').addClass('ok');
                } else {
                    if ($(e.target).val().length === 0) {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        $(e.target).parent().removeClass('ok').addClass('error');
                        cmf_btnClear(e);
                    }
                }
                that.fn_updateSignUpBtn();
            });
            $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").on("keyup focus", function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.fn_goSignUp();
                } else {
                    if ($(e.target).val().length === 0) {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (cmf_validate($.trim($(e.target).val()))) {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text("6자 이상의 영문, 숫자를 입력하세요.");
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        } else {
                            $(e.target).parent().removeClass('error').addClass('ok');
                        }
                        if ($.trim($("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").val()) === "") {
                            $("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").parent().removeClass('ok').removeClass('error');
                        } else {
                            if ($.trim($("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").val()) === $.trim($(e.target).val())) {
                                $("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").parent().addClass('ok').removeClass('error');
                            } else {
                                $("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
                                $("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").parent().removeClass('ok').addClass('error');
                                cmf_btnClear(e);
                            }
                        }
                    }
                    that.fn_updateSignUpBtn();
                }
            });
            $("#businessLoginDiv").find("#signUpBox").find("input[name='passwordCheck']").on("keyup focus", function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.fn_goSignUp();
                } else {
                    if ($(e.target).val().length === 0) {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (cmf_validate($.trim($(e.target).val()))) {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text("6자 이상의 영문, 숫자를 입력하세요.");
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                            if (cmf_validate($("#businessLoginDiv").find("#signUpBox").find("input[name=password]").val())) {
                                $(e.target).parent().find(".error-msg").find(".error-cont").text("6자 이상의 영문, 숫자를 입력하세요.");
                                $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").parent().removeClass('ok').addClass("error");
                                cmf_btnClear(e);

                            } else {
                                $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").parent().addClass("ok").removeClass('error');
                            }
                        } else {
                            if (cmf_validate($("#businessLoginDiv").find("#signUpBox").find("input[name=password]").val())) {
                                $(e.target).parent().removeClass('error').addClass('ok');
                                $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").parent().find(".error-msg").find(".error-cont").text("6자 이상의 영문, 숫자를 입력하세요.");
                                $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").parent().removeClass('ok').addClass("error");
                                cmf_btnClear(e);
                            } else {
                                $("#businessLoginDiv").find("#signUpBox").find("input[name=password]").parent().addClass("ok").removeClass('error');
                                if ($.trim($("#businessLoginDiv").find("#signUpBox").find("input[name=password]").val()) === $.trim($(e.target).val())) {
                                    $(e.target).parent().removeClass('error').addClass('ok');
                                } else {
                                    $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
                                    $(e.target).parent().removeClass('ok').addClass('error');
                                    cmf_btnClear(e);
                                }
                            }
                        }
                    }
                    that.fn_updateSignUpBtn();
                }
            });

            $("#businessLoginDiv").find("#signUpBox").find("#confBox").on("click", function () {
                that.fn_updateSignUpBtn();
            });

            $("#businessLoginDiv").find("#appDownloadDiv").find("#appDownload").on('click', function () {
                that.fn_downloadFlowApp();
            });

            $("#businessLoginDiv").find("#appDownloadDiv").find("#goToMobileWeb").on('click', function () {
                that.fn_updateLoginBtn();
                that.fn_goLogin("1");
            });

            $("#businessLoginDiv").show();

            //@유민호 : 카카오브라우져로 접속시 회원가입 페이지를 제공한다 190821
            if (location.hash === "#in") {
                that.fn_showSignUpBox();
            } else {
                //done
            }

            $("#businessLoginDiv").find("#loginBox").find("input[name=email]").focus();


        },
        fn_updateLoginBtn: function () {

            var ok = $("#businessLoginDiv").find("#loginBox").find(".blocklabel").find(".inputbox").length;

            $("#businessLoginDiv").find("#loginBox").find(".blocklabel").find(".inputbox").each(function (i, v) {
                if ($(v).hasClass("ok")) {
                    ok--;
                }
            });

            if (ok == 0) {
                $("#businessLoginDiv").find("button[name$='loginBtn']").removeClass("c-gray").addClass("c-flow");
            } else {
                $("#businessLoginDiv").find("button[name$='loginBtn']").removeClass("c-flow").addClass("c-gray");
            }
        },
        fn_updateSignUpBtn: function () {

            var ok = $("#businessLoginDiv").find("#signUpBox").find(".blocklabel").find(".inputbox").length;

            $("#businessLoginDiv").find("#signUpBox").find(".blocklabel").find(".inputbox").each(function (i, v) {
                if ($(v).hasClass("ok")) {
                    ok--;
                }
            });

            if ((ok == 0) && $("#businessLoginDiv").find("#signUpBox").find("#confBox").is(":checked")) {
                $("#businessLoginDiv").find("#signUpBtn").removeClass("c-gray").addClass("c-flow");
            } else {
                $("#businessLoginDiv").find("#signUpBtn").removeClass("c-flow").addClass("c-gray");
            }
        },
        fn_goLogin: function (ID_GB) {
            _ID_GB = ID_GB;
            if (!this._start()) {
                return;
            }

            if ($("#businessLoginDiv").find("button[name$='loginBtn']").hasClass("c-gray") && !$("#businessLoginDiv").find("button[name$='loginBtn']").hasClass("c-flow")) {
                this._end();
                return;
            }

            $("#businessLoginDiv").find("#loginBox").find("#errorMsg").hide();

            _loading.start();

            var jexAjax = jex.createAjaxUtil("COLABO2_LOGIN_R003");
            jexAjax.set("ID_GB", ID_GB);
            jexAjax.set("USER_ID", $("#businessLoginDiv").find("#loginBox").find("input[name=email]").val());

            //@jkw 2020.4.17 암호화 처리
            cf_setCookie("DATE_TIME", fn_flowCurTimeR001());
            jexAjax.set("ENCRYPT_YN", "YC");	//yes, change
            jexAjax.set("PWD", AES_Encode($("#businessLoginDiv").find("#loginBox").find("input[name=password]").val()));


            jexAjax.set("USER_NM", $("#businessLoginDiv").find("#loginBox").find("input[name=userName]").val());
            jexAjax.set("PRFL_PHTG", $("#businessLoginDiv").find("#loginBox").find("input[name=prflPhtg]").val());
            jexAjax.set("EMAIL", '');
            jexAjax.set("SUB_DOM", $("#_SUB_DOM").val());


            if (cf_getCookie("electronYn") == "Y") { // 20170621
                // desktopVersion info
                jexAjax.set("OBJ_CNTS_NM", "desktop");
            }

            setGuid(jexAjax, clientIp);

            var that = this;
            jexAjax.execute(function (dat) {

                _loading.stop();

                if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {

                    if (cnts_Null2Void(dat.ERR_CD, "") == "4001" || cnts_Null2Void(dat.ERR_CD, "") == "4002" || cnts_Null2Void(dat.ERR_CD, "") == "4003" || cnts_Null2Void(dat.ERR_CD, "") == "4004" || cnts_Null2Void(dat.ERR_CD, "") == "4005" || cnts_Null2Void(dat.ERR_CD, "") == "4006") {


                        var s_var_list = "";
                        s_var_list += "<input type='hidden' name='TEAM_NM' value='" + $("#_SUB_DOMAIN_NAME").val() + "'/>";
                        s_var_list += "<input type='hidden' name='ERR_CD' value='" + dat.ERR_CD + "'/>";
                        s_var_list += "<input type='hidden' name='USER_ID' value='" + $("#businessLoginDiv").find("#loginBox").find("input[name=email]").val() + "'/>";
                        s_var_list += "<input type='hidden' name='RGSN_DTTM' value='" + dat.RGSN_DTTM + "'/>";
                        var $frmObj = $("<form id='error_form' name='error_form'></form>");
                        $frmObj.attr("method", "post");
                        $frmObj.appendTo("body");
                        $frmObj.append(s_var_list);

                        $frmObj.attr("action", '/login_error.act');
                        $frmObj.attr("target", "_self");

                        $frmObj.submit();

                    } else {
                        $("#businessLoginDiv").find("#loginBox").find("#errorMsg").text(cnts_Null2Void(dat.ERR_MSG, ""));
                        $("#businessLoginDiv").find("#loginBox").find("#errorMsg").show();
                        console.error(cnts_Null2Void(dat.ERR_MSG, ""));
                    }
                } else {
                    if (cnts_Null2Void(dat.AUTH_TYPE, "") != "" && cnts_Null2Void(dat.AUTH_YN, "N") == "N") {
                        g_post_var.g_execute = false;
                        auth_layer.createAuthLayer(dat);
                    } else {
                        if (!(ID_GB == 2 || ID_GB == 3 || ID_GB == 11)) { // 카톡 or 지메일이 아닐 경우.
                            fn_getRandKey();
                            cf_setCookie("FLOW_USER_ID", $("#businessLoginDiv").find("#loginBox").find("input[name=email]").val(), 30 * 12 * 10);
                        } else {
                            // done.
                        }

                        movePage(dat.RESULT_ADDR, "blogin")
                    }


                }
                that._end();
            });

        },
        fn_goSignUp: function () {

            if (!this._start()) {
                return;
            }

            if ($("#businessLoginDiv").find("#signUpBtn").hasClass("c-gray") || !$("#businessLoginDiv").find("#signUpBtn").hasClass("c-flow")) {
                this._end();
                return;
            }

            //이메일 회원가입일 경우! 인증체크후 진행한다.
            auth_layer.emailAuthCheck($.trim($("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val()));

        },
        registerUser: function () {
            _loading.start();

            var jexAjax = jex.createAjaxUtil("COLABO2_REGISTER_C001");
            jexAjax.set("USER_NM", $.trim($("#businessLoginDiv").find("#signUpBox").find("input[name='name']").val()));
            jexAjax.set("USER_ID", $.trim($("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val()));
            jexAjax.set("PWD", $.trim($("#businessLoginDiv").find("#signUpBox").find("input[name=password]").val()));
            jexAjax.set("SUB_DOM", cnts_Null2Void($("#_SUB_DOM").val(), "")); // 해당
            // 기관
            // 서브도메인
            // 적어주기

            var that = this;
            jexAjax.execute(function (dat) {
                _loading.stop();
                if (jex.isError(dat)) { // authorization check
                    if (dat && dat.COMMON_HEAD) {
                        alert(dat.COMMON_HEAD.MESSAGE);
                    } else {
                        alert(jex.getMsg("WCB009"));
                    }
                    return;
                } else {


                    if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {
                        if (cnts_Null2Void(dat.ERR_CD, "") == "5000") {
                            $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").parent().find(".error-msg").find("div.error-cont").text(dat.ERR_MSG);
                            $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").parent().removeClass('ok').addClass('error');
                            $("#businessLoginDiv").find("#signUpBtn").removeClass("c-flow").addClass("c-gray");
                        } else {
                            console.error(cnts_Null2Void(dat.ERR_MSG, ""));
                        }
                    } else {
                        if (cnts_Null2Void(dat.EMAIL_INIT_YN, "N") == "Y") {
                            location.href = "/welcome.act";
                        } else {
                            $("#businessLoginDiv").find("#loginBox").find("input[name=email]").val($("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val());
                            $("#businessLoginDiv").find("#loginBox").find("input[name=password]").val($("#businessLoginDiv").find("#signUpBox").find("input[name=password]").val());

                            if ($("#businessLoginDiv").find("#loginBox").find("input[name=email]").val().length > 0 && !cmf_emailcheck($("#businessLoginDiv").find("#loginBox").find("input[name=email]").val())) {
                                $("#businessLoginDiv").find("#loginBox").find("input[name=email]").parent().removeClass('error').addClass('ok');
                            } else {
                                $("#businessLoginDiv").find("#loginBox").find("input[name=email]").parent().removeClass('ok').addClass('error');
                                cmf_btnClear(e);
                            }

                            if ($.trim($("#businessLoginDiv").find("#loginBox").find("input[name=password]").val()) != "") {
                                $("#businessLoginDiv").find("#loginBox").find("input[name=password]").parent().removeClass('error').addClass('ok');
                            } else {
                                $("#businessLoginDiv").find("#loginBox").find("input[name=password]").parent().removeClass('ok').addClass('error');
                                cmf_btnClear(e);
                            }

                            if ($("#_MOBILE_YN").val() == "Y") {
                                // 앱다운로드 뷰 열어주기
                                $("#businessLoginDiv").find("#signUpBox").hide();
                                $("#businessLoginDiv").find("#appDownloadDiv").fadeIn('100');

                            } else {
                                that.fn_updateLoginBtn();
                                that.fn_goLogin("1");
                            }
                        }
                    }
                }
            });
        },
        fn_showSignUpBox: function () {

            $("#businessLoginDiv").find("#signUpBox").css('display', 'block');
            $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").focus();
            $("#businessLoginDiv").find("#loginBox").css('display', 'none');
        },
        fn_showLoginBox: function () {

            $("#businessLoginDiv").find("#loginBox").css('display', 'block');
            $("#businessLoginDiv").find("#loginBox").find("input[name=email]").focus();
            $("#businessLoginDiv").find("#signUpBox").css('display', 'none');
        },
        fn_sendEmail: function () {

            var jexAjax = jex.createAjaxUtil("COLABO2_EMAIL_C001");
            jexAjax.set("USER_NM", $.trim($("#businessLoginDiv").find("#signUpBox").find("input[name='name']").val()));
            jexAjax.set("USER_ID", $.trim($("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val()));
            jexAjax.execute(function (dat) {

            });
        },
        fn_downloadFlowApp: function () {

            var url = "";
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipod") > -1) {
                url = "https://itunes.apple.com/us/app/id939143477?mt=8";
            } else if (userAgent.indexOf("android") > -1) {
                url = "https://play.google.com/store/apps/details?id=com.webcash.bizplay.collabo";
            }

            if (url != "") {
                cmf_openWindow(url, "_blank");
            }
        }
    }
}

var bMngrSignUp = function () {


    var working = false;
    return {
        startWorking: function () { // 임계구역 진입하고 true리턴. 진입할 수 없으면 false리턴.

            if (!working) {
                working = true;
            } else {
                return false;
            }
            return working;
        },
        endWorking: function () {

            working = false;
        },
        init: function () {

            var that = this;
            $("#businessMngrSignUpPopup").find("#goToPremiumSignUp").on('click', function () {

                that.goToPremiumSignUp();
            });

            $('#whatIsGuest').on('click', function () {
                window.open('https://support.flow.team/hc/ko/articles/234707747');
            })

            //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").on('focus keyup blur', function (e) {
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").on('focus keyup', function (e) {
                if (e.keyCode) {
                    if ($(e.target).parent().hasClass('error')) {
                        $(e.target).parent().removeClass('error');
                    }

                    if (e.keyCode == 13) {
                        that.validIdCheck();
                    } else if (e.keyCode == 32) {
                        $(this).val($(this).val().trim().replace(/\ /, ""));
                    }
                } else {
                    if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                        //that.duplicationIdCheck();
                        //$(e.target).parent().removeClass('error').addClass('ok');
                    } else {
                        if ($(e.target).val() === "") {
                            $(e.target).parent().removeClass('ok').removeClass('error');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H440'), "이메일을 입력해주세요."));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.updateNextBtnToSettingTeamInfoBtn();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").on('blur', function (e) {
                if ($(e.target).val().length > 0 && !cmf_emailcheck($(e.target).val())) {
                    var element = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]");
                    upgrade.duplicationIdCheck(element);
                    //$(e.target).parent().removeClass('error').addClass('ok');
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H440'), "이메일을 입력해주세요."));
                        $(e.target).parent().removeClass('ok').addClass('error');
                        //cmf_btnClear(e);
                    }
                }
                that.updateNextBtnToSettingTeamInfoBtn();
            });


            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='name']").on('focus keyup blur', function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.validIdCheck();
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (($(e.target).val().length > 0) && (!cmf_isSpecialCharacterExist($(e.target).val()))) {
                            $(e.target).parent().removeClass('error').addClass('ok');
                        } else {
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.updateNextBtnToSettingTeamInfoBtn();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").on('focus keyup blur', function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.validIdCheck();
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (cmf_validate($(e.target).val())) {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H402'), "6자 이상의 영문,숫자를 입력하세요."));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                            if ($.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").val()) === "") {
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().removeClass('ok').removeClass('error');
                            } else {
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().removeClass('ok').addClass('error');
                                cmf_btnClear(e);
                            }
                        } else {
                            $(e.target).parent().removeClass('error').addClass('ok');
                            if ($.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").val()) === "") {
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().removeClass('ok').removeClass('error');
                            } else {
                                if ($.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").val()) === $.trim($(e.target).val())) {
                                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().addClass('ok').removeClass('error');
                                } else {
                                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
                                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").parent().removeClass('ok').addClass('error');
                                    cmf_btnClear(e);
                                }
                            }
                        }
                    }
                    that.updateNextBtnToSettingTeamInfoBtn();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='passwordCheck']").on('focus keyup blur', function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.validIdCheck();
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (cmf_validate($(e.target).val())) {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H402'), "6자 이상의 영문,숫자를 입력하세요."));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        } else {
                            if (cmf_validate($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").val())) {
                                $(e.target).parent().removeClass('error').addClass('ok');
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H402'), "6자 이상의 영문,숫자를 입력하세요."));
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").parent().addClass("error").removeClass('ok');
                            } else {
                                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").parent().addClass("ok").removeClass('error');
                                if (($.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").val()) === $.trim($(e.target).val()))) {
                                    $(e.target).parent().removeClass('error').addClass('ok');
                                } else {
                                    $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('H449'), '비밀번호가 일치하지 않습니다.'));
                                    $(e.target).parent().removeClass('ok').addClass('error');
                                    cmf_btnClear(e);
                                }
                            }
                        }
                    }
                    that.updateNextBtnToSettingTeamInfoBtn();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#agreeWithTheTerms").on('click focus', function (e) {

                that.updateNextBtnToSettingTeamInfoBtn();
            });

          /*  $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToSettingTeamInfo").on('click', function (e) {


                //@유민호 : 가입경로 초기화 190513
                //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").find('option:first').removeAttr('selected');
                //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").find('option:first').attr('selected','selected');

                that.validIdCheck();

            });*/

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#domain").text("." + location.hostname);

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#backToBusinessCreateAccount").on('click', function (e) {

                $("#businessMngrSignUpPopup").find("#businessCreateAccount").show();
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").hide();
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextTobusinessMngrFinished").on('click', function (e) {

                that.registerTeamInfo();
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamName").on('keyup focus', function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.registerTeamInfo();
                } else {
                    if (($(e.target).val().length > 0) && (!cmf_isSpecialCharacterExist($(e.target).val()))) {
                        $(e.target).parent().removeClass('error').addClass('ok');
                    } else {
                        if ($(e.target).val() === "") {
                            $(e.target).parent().removeClass('error').removeClass('ok');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text("회사 이름을 입력해주세요.");
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.updateNextBtnToPayment();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").on('keyup focus', function (e) {

                if (e.keyCode && e.keyCode == 13) {
                    that.registerTeamInfo();
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('error').removeClass('ok');
                    } else {
                        if (cmf_subDomainValidate($(e.target).val())) {
                            $(e.target).parent().removeClass('error').addClass('ok');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('DFU535'), '3~50자 영문, 숫자만 가능합니다.'));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }

                    }
                    that.updateNextBtnToPayment();
                }
            });

            //@유민호 : 가입경로 관련 처리 190513
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").on('change', function (e) {
                if ("Z" === $(e.target).val()) {
                    $(this).hide();
                    $(e.target).parents('.blocklabel').find('input').val('');
                    $(e.target).parents('.blocklabel').find('input').show();
                    $(e.target).parent().removeClass('error').removeClass('ok');

                    var uTag = $('<u />');
                    var ADD_TAG = uTag.clone().text('다시 선택하기');
                    ADD_TAG.css({
                        'float': 'right',
                        'font-weight': '300',
                        'cursor': 'pointer',
                        'font-size': '14px'
                    });
                    ADD_TAG.on('click', function () {
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").show();
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").parent().removeClass('ok').removeClass('error');
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").hide();
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").find('option:first').removeAttr('selected');
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").find('option:first').attr('selected', 'selected');
                        $('[data-langcode=H422]').next().css('background', 'url(../img_rn/bul/bul_arrow2_open.png?4) no-repeat 370px 22px');
                        $('[data-langcode=H421]').find('u').remove();
                    });
                    $('[data-langcode=H421]').append(ADD_TAG);

                    that.updateNextBtnToPayment();

                } else {
                    $(this).css('background', '');
                    $(e.target).parent().removeClass('error').addClass('ok');
                    that.updateNextBtnToPayment();
                }
            });
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").on('keyup focus', function (e) {
                if (e.keyCode && e.keyCode == 13) {
                    that.registerTeamInfo();
                } else {
                    if ($(e.target).val() === "") {
                        $(e.target).parent().removeClass('error').removeClass('ok');
                    } else {
                        if ($(e.target).val().length >= 3 && $(e.target).val().length < 20) {
                            $(e.target).parent().removeClass('error').addClass('ok');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('DFU535'), '3~20자 안에서 작성 가능합니다.'));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.updateNextBtnToPayment();
                }
            });
            //end

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").on('keyup focus', function (e) {
                if (e.keyCode && e.keyCode == 13) {
                    that.registerTeamInfo();
                } else {
                    if (($(e.target).val().length === 0)) {
                        $(e.target).parent().removeClass('ok').removeClass('error');
                    } else {
                        if (cmf_couponValidate($(e.target).val())) {
                            $(e.target).parent().removeClass('error').addClass('ok');
                        } else {
                            $(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('DFU536'), '형식에 맞지 않은 쿠폰코드입니다.'));
                            $(e.target).parent().removeClass('ok').addClass('error');
                            cmf_btnClear(e);
                        }
                    }
                    that.updateNextBtnToPayment();
                }
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").on('click', function (e) {
                that.registerTeamInfo();
            });

            // 비즈니스 업그레이드 마무리
            $("#businessMngrSignUpPopup").find("#businessMngrFinished").find("#copyURL").on('click', function (e) {

                cmf_copyTextToClipboard($("#businessMngrSignUpPopup").find("#businessMngrFinished").find("#teamURL").val(), cnts_Null2Void(i18n('DL165'), cnts_Null2Void(i18n('DFU537'), "회사 주소를 클립보드에 복사했습니다.")));
            });

            $("#businessMngrSignUpPopup").find("#businessMngrFinished").find("#startNow").on('click', function (e) {

                // login시키고
                // team url로 넘겨준다
                that.login();
            });

        },
        show: function () {

            $("body").css('overflow', 'hidden'); // main scroll

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input").each(function (i, v) {

                $(v).val('');
            });

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input").each(function (i, v) {

                $(v).val('');
            });

            $("#businessMngrSignUpPopup").find(".fl-content").hide();
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").show();

            $("#main").find("#REG_1").css('display', 'none');

            $("#businessMngrSignUpPopup").fadeIn(100, function () {

                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").focus();
            });
        },
        hide: function () {

            $("body").css('overflow', 'auto'); // main scroll
            $("#businessMngrSignUpPopup").hide();

            $(window).off('resize');

        },
        goToPremiumSignUp: function () {

            // 지금은 프리미엄으로 바로 가는게 없으니 일단 무료회원가입 페이지로...
            // 프리미엄 회원가입 계정등록전문과 같은 트랜잭션으로 => that.goToPayment("P");

            // var move = confirm("개인 계정으로 가입하시겠어요?");
            // if (move) {
            fn_viewChange("1");

            this.hide();
            // }
        },

        updateNextBtnToSettingTeamInfoBtn: function () {

            var ok = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".blocklabel").find(".inputbox").length;

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".blocklabel").find(".inputbox").each(function (i, v) {

                if ($(v).hasClass("ok")) {
                    ok--;
                }
            });

            if ((ok == 0) && $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#agreeWithTheTerms").is(":checked")) {
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToSettingTeamInfo").removeClass("c-gray").addClass("c-blue");
            } else {
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToSettingTeamInfo").removeClass("c-blue").addClass("c-gray");
            }
        },

        updateNextBtnToPayment: function () {

            var ok = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".blocklabel").find(".inputbox").length;

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".blocklabel").find(".inputbox").each(function (i, v) {

                if ($(v).hasClass("ok")) {
                    ok--;
                }
            });

            if (ok == 0) {
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").text(cnts_Null2Void(i18n('DL166'), '쿠폰 표기 기간만큼 무료로 시작하기'));
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").removeClass("c-gray").addClass("c-blue");
            } else if (ok == 1) {
                if (location.hostname.indexOf("ktworks.co.kr") > -1 || location.href.indexOf("ktbizworks.co.kr") > -1) {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").text(cnts_Null2Void(i18n('H499'), '가입 완료'));
                } else {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").text(cnts_Null2Void(i18n('H499'), '1개월 무료 시작하기'));
                }
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").removeClass("c-gray").addClass("c-blue");
                if ($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").val() === ""
                    || $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamName").val() === ""
                    || $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").val() !== "") {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").removeClass("c-blue").addClass("c-gray");
                }
            } else {
                if (location.hostname.indexOf("ktworks.co.kr") > -1 || location.href.indexOf("ktbizworks.co.kr") > -1) {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").text(cnts_Null2Void(i18n('H499'), '가입 완료'));
                } else {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").text(cnts_Null2Void(i18n('H499'), '1개월 무료 시작하기'));
                }
                $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToBusinessFinished").removeClass("c-blue").addClass("c-gray");
            }
        },

        goToSettingTeamInfo: function () {

            $("#businessMngrSignUpPopup").find("#businessCreateAccount").fadeIn(200);
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").hide();
        },

        goTobusinessMngrFinished: function () {

            $("#businessMngrSignUpPopup").find("#businessMngrFinished").fadeIn(200);
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").hide();
        },

        validIdCheck: function () {

            if (!$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToSettingTeamInfo").hasClass('c-blue') && $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextToSettingTeamInfo").hasClass('c-gray')) {
                if ($("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox.error:first").length > 0) {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox.error:first").find("input").focus();
                } else {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox").each(function (i, v) {

                        if ($(v).find("input").val() == "") {
                            $(v).find("input").focus();
                            return false;
                        }
                    });
                }
                return;
            }

            //이메일 회원가입일 경우! 인증체크후 진행한다.
            auth_layer.emailAuthCheck($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());

        },
        registerUser: function () {


            //인증번호 레이어 초기화
            //initAuthLayer();

            if (!this.startWorking()) {
                return;
            }

            //@유민호 : 가입경로 초기화 190513
            //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").show();
            //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").parent().removeClass('ok').removeClass('error');
            //$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").hide();


            var that = this;
            //var jexAjax = jex.createAjaxUtil("COLABO2_REGISTER_R001");
            var jexAjax = jex.createAjaxUtil("COLABO_USER_DUPLICATE_R001");
            jexAjax.set("USER_ID", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());
            jexAjax.execute(function (dat) {

                if (jex.isError(dat)) {
                    if (dat && dat.COMMON_HEAD) {
                        alert(dat.COMMON_HEAD.MESSAGE);
                    } else {
                        alert(jex.getMsg("WCB009"));
                    }
                    return;
                }

                if (cnts_Null2Void(dat.ERR_CD, "0000") != "0000") {
                    if (cmf_browser().ieYn) {
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").select();
                        toast("2", dat.ERR_MSG);
                    } else {
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").select();
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").parent().find(".error-msg").find(".error-cont").text(dat.ERR_MSG);
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").parent().removeClass('ok').addClass('error');
                    }
                    that.updateNextBtnToSettingTeamInfoBtn();
                } else {

                    collectTagManager({
                        "event": "signUp2"
                    })

                    that.goToSettingTeamInfo();


                }
            });

            that.endWorking();
        },

        registerTeamInfo: function () {

            //@유민호 : 입력값이없는데 버튼이 눌러져서 필수갑 없다고 나는 오류 처리 1903012
            if ($('.input-box-style').find('.ok').length < 7) {
                return;
            }

            if (!$("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextTobusinessMngrFinished").hasClass('c-blue') && $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#nextTobusinessMngrFinished").hasClass('c-gray')) {
                if ($("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox.error:first").length > 0) {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox.error:first").find("input").focus();
                } else {
                    $("#businessMngrSignUpPopup").find("#businessCreateAccount").find(".inputbox").each(function (i, v) {

                        if ($(v).find("input").val() == "") {
                            $(v).find("input").focus();
                            return false;
                        }
                    });
                }
                return;
            }

            if (!this.startWorking()) {
                return;
            }

            var that = this;
            var jexAjax = jex.createAjaxUtil("FLOW_SUB_DOM_C001");
            jexAjax.set("SUB_DOM", $.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").val()));
            jexAjax.set("SUB_DOM_NM", $.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamName").val()));
            jexAjax.set("USER_ID", $.trim($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val()));
            jexAjax.set("USER_NM", cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='name']").val(), ""));
            jexAjax.set("PWD", cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").val(), ""));
            jexAjax.set("RESAILER", cnts_Null2Void($("#_RESAILER").val(), ""));
            jexAjax.set("UNTACT_VOUCHER_SRNO", $('#_UNTACT_VOUCHER_SRNO').val());
            var cpCd = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").val();
            jexAjax.set("CP_CD", cpCd);

            //@유민호 : 가입경로 추가 190513
            if (cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").css('display'), 'none') !== 'none'
                && cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").css('display'), 'none') === 'none') {
                jexAjax.set("PATH_CD", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").val());
                clog('select.path_cd ### ' + $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").val());
            } else if (cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("select.path_cd").css('display'), 'none') === 'none'
                && cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").css('display'), 'none') !== 'none') {
                jexAjax.set("PATH_CD", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").val());
                clog('input.path_cd ### ' + $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input.path_cd").val());
            }

            jexAjax.execute(function (dat) {
                that.endWorking();
                if (jex.isError(dat)) {
                    if (dat && dat.COMMON_HEAD) {
                        alert(dat.COMMON_HEAD.MESSAGE);
                    } else {
                        alert(jex.getMsg("WCB009"));
                    }
                    return;
                }

                if (cnts_Null2Void(dat.ERR_CD, "0000") != "0000") {
                    if (dat.ERR_CD == "1000") {
                        clog("dat.ERR_CD ### 2" + dat.ERR_CD + "/" + dat.ERR_MSG);
                        if (cmf_browser().ieYn) {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").select();
                            toast("2", dat.ERR_MSG);
                        } else {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").select();
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").parent().addClass('error').removeClass('ok');
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").parent().find(".error-msg").find(".error-cont").text(dat.ERR_MSG);
                        }
                    } else if (dat.ERR_CD == "3000") {
                        var _ERR_MSG = c18n('DL168', "한 계정으로 '한개의 회사'만 생성 가능합니다. <br /> 이 계정은 이미 다른 회사의 관리자입니다. 다른 계정을 사용해주세요.")
                        if (cmf_browser().ieYn) {
                            toast("2", _ERR_MSG);
                        } else {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#errorMsg span").html(_ERR_MSG);
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#errorMsg").show();
                        }
                    } else if (dat.ERR_CD == "5000") {
                        var _ERR_MSG = c18n('DL169', "사용중인 이메일 주소입니다. 다른 메일주소를 등록해주세요");
                        if (cmf_browser().ieYn) {
                            toast("2", _ERR_MSG);
                        } else {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#errorMsg span").html(_ERR_MSG);
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#errorMsg").show();
                        }
                    } else if (dat.ERR_CD == "7000") {		// 쿠폰 에러일때
                        if (cmf_browser().ieYn) {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").select();
                            toast("2", dat.ERR_MSG);
                        } else {
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").select();
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").parent().find(".error-msg").find(".error-cont").text(dat.ERR_MSG);
                            $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").parent().addClass('error').removeClass('ok');
                        }
                    } else if (dat.ERR_CD == "9000") {		// 쿠폰 에러이면서 회사도 존재일 경우

                        var errMsgs = dat.ERR_MSG.split("&");
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").select();
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").parent().find(".error-msg").find(".error-cont").text(errMsgs[0]);
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").parent().addClass('error').removeClass('ok');

                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").select();
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").parent().find(".error-msg").find(".error-cont").text(errMsgs[1]);
                        $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#couponCode").parent().addClass('error').removeClass('ok');

                    }
                    that.updateNextBtnToPayment();
                } else {
                    var teamUrl = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#teamUrl").val();
                    var teamDomain = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("#domain").text();
                    var teamUserName = $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name='name']").val();
                    var companyName = $("#businessCreateAccount").find("#teamName").val();
                    $("#businessMngrSignUpPopup").find("#businessMngrFinished").find("#teamURL").val((_DEV_REAL == "DEV" ? "http://" : "https://") + teamUrl + teamDomain);
                    $("#welcome-text").html(c18n('DL174', '<b>$1</b>님은 <b>$2</b>의 관리자입니다.').replace('$1', teamUserName).replace('$2', companyName))

                    var fc_info = c18n('DL171', "1개월간") + " "
                        + c18n('DL170', "무료로 이용 가능하며, 계속 이용하시려면 결제 정보 등록이 필요합니다<br class='block'>(기간 초과 시, 서비스 이용이 중지됩니다)");

                    if (location.hostname.indexOf("ktworks.co.kr") > -1 || location.href.indexOf("ktbizworks.co.kr") > -1) {
                        fc_info = "2021년 1월 말까지 출시 프로모션 중으로 무료 이용이 가능합니다. <br class='block'>(이후, 계속 이용하시려면 결제 정보 등록이 필요합니다.)";
                    }
                    if (cpCd === "") {
                        $("#businessMngrSignUpPopup").find("#businessMngrFinished").find(".fc_gray").html(fc_info);
                    } else {
                        $("#businessMngrSignUpPopup").find("#businessMngrFinished").find(".fc_gray").html(c18n('DL172', "쿠폰 표기 기간동안") + " " + fc_info);
                    }

                    collectTagManager({
                        "event": "signUp3",
                        "userId": jexAjax.get("USER_ID"),
                        "joinDate": getNowTime().slice(0, 4) + "-" + getNowTime().slice(4, 6) + "-" + getNowTime().slice(6, 8),
                        "company": jexAjax.get("SUB_DOM_NM"),
                        "industry": jexAjax.get("PATH_CD")
                    })

                    that.goToPayment("B");
                }

            });


        },
        goToPayment: function (status) {

            if (cnts_Null2Void(status, "") == "B") { // "Business"
                this.goToBusinessFinished();
            } else if (cnts_Null2Void(status, "") == "P") { // "Premium" //안씀.

            } else { // error
                // console.error('Payment status not exist.');
            }
        },
        goToBusinessFinished: function () {

            $("#businessMngrSignUpPopup").find("#businessMngrFinished").fadeIn(200);
            $("#businessMngrSignUpPopup").find("#businessCreateAccount").hide();
        },
        login: function () {
            _ID_GB = 1;

            if (g_post_var.g_execute) {
                return;
            }
            g_post_var.g_execute = true;
            var jexAjax = jex.createAjaxUtil("COLABO2_LOGIN_R003");
            jexAjax.set("ID_GB", "1");
            jexAjax.set("USER_ID", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());

            //@jkw 2020.4.17 암호화 처리
            cf_setCookie("DATE_TIME", fn_flowCurTimeR001());
            jexAjax.set("ENCRYPT_YN", "YC");	//yes, change
            jexAjax.set("PWD", AES_Encode(cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").val(), "")));


            if (g_var.g_electronYn) { // 20170621 desktopVersion info
                jexAjax.set("OBJ_CNTS_NM", "desktop");
            }
            setGuid(jexAjax, clientIp);
            _loading.start();
            jexAjax.execute(function (dat) {

                _loading.stop();
                if (cnts_Null2Void(dat.ERR_CD, "") != "0000") {
                    console.error(dat.ERR_CD);
                    console.error(dat.ERR_MSG);

                    $(".error_txt").html(cnts_Null2Void(dat.ERR_MSG, ""));
                    $(".error_txt").show();

                    g_post_var.g_execute = false;
                } else {
                    fn_getRandKey();

                    cf_setCookie("FLOW_USER_ID", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val(), 30 * 12 * 10);

                    var s_var_list = "";
                    s_var_list += "<input type='hidden' name='INVT_KEY' value='" + cnts_Null2Void($.trim($("#INVT_KEY").html()), "") + "'/>";
                    s_var_list += "<input type='hidden' name='USER_ID' value='" + $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val() + "'/>";
                    s_var_list += "<input type='hidden' name='PWD' value='" + cnts_Null2Void($("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=password]").val(), "") + "'/>";
                    var $frmObj = $("<form id='invite_form' name='invite_form'></form>");
                    $frmObj.attr("method", "post");
                    $frmObj.appendTo("body");
                    $frmObj.append(s_var_list);
                    $frmObj.append(redirectCntns);

                    //$frmObj.attr("action", $("#teamURL").val()+"/login.act");
                    $frmObj.attr("action", "/login.act");
                    $frmObj.attr("target", "_self");

                    $frmObj.submit();
                }
            });
        }
    }
}


function cnts_Null2Void(org, sub) {
    return ((org === "" || org == null || org == undefined) ? (sub == undefined ? "" : sub) : org);
}

//@jkw 2020.4.17 암호화 처리
//@유민호 : [hk이노엔] | [오류] | secure.flowteam.info 로그인 안 되는 이슈 200907
var key = "aes256-global-flow";

function AES_Encode(plain_text) {
    GibberishAES.size(256);
    return GibberishAES.aesEncrypt(plain_text, key + coalesce3(cf_getCookie("DATE_TIME"), "00000000000000"));
}

//서버 시간 체크
function fn_flowCurTimeR001() {
    var CUR_DTTM;
    // 자동 로그인 체크했을 경우.
    var jexAjax = jex.createAjaxUtil("FLOW_CUR_TIME_R001");
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {

        if (jex.isError(dat)) { // authorization check
            if (dat && dat.COMMON_HEAD) {
                alert(dat.COMMON_HEAD.MESSAGE);
            } else {
                alert(jex.getMsg("WCB009"));
            }
            return;
        }
        CUR_DTTM = dat.CUR_DTTM;

    });
    return CUR_DTTM;
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};