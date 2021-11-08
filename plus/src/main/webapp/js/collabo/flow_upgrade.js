/**
 * <pre>
 * COLLABO PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : flow_upgrade.js
 * @File path    	 : COLLABO_PT_STATIC/web/js/collabo
 * @author       	 : 이수정 ( cubeclock94@gmail.com )
 * @Description    : 업그레이드 팝업
 * @History      	 : 20180912083840, 이수정
 * </pre>
 **/
new (Jex.extend({
	onload:function() {
		_this = this;
		//--- todo onload start ---//
	}, event:function() {
		//--- define event action ---//
	}
}))();

var upgrade = (function () { // 업그레이드 팝업은 무료사용자, 프리미엄 사용자에게만 보임

	var working = false;
	var isInit = false;

	var upgradePopupSelector = "#upgradePopup";
	var upgradePopupLayer, introLayer, businessSignUpLayer, basicBusinessSettingTeamInfoLayer, businessSelectacconutModal, businessSettingTeamInfoLayer, businessFinishedLayer, premiumFinishedLayer;
	
	

	function startWorking() {
		if (!working) {
			working = true;
		} else {
			return false;
		}
		return working;
	}

	function endWorking() {
		working = false;
	}

	var inputObject = (function() {
		
		function setAsValid(inputObject) {
			inputObject.parents(".blocklabel").find(".error-msg").find(".error-cont").text("");
			// inputObject.parents(".blocklabel").find(".error-msg").fadeOut(100);
			inputObject.parents(".inputbox").removeClass('error').addClass('ok');
		}

		function setAsError(e, inputObject, errorMessage) {
			inputObject.parents(".blocklabel").find(".error-msg").find(".error-cont").text(errorMessage);
			// inputObject.parents(".blocklabel").find(".error-msg").fadeIn(100);
			inputObject.parents(".inputbox").removeClass('ok').addClass('error'); cmf_btnClear(e);
		}

		function setAsNone(inputObject) {
			inputObject.parents(".blocklabel").find(".error-msg").find(".error-cont").text("");
			// inputObject.parents(".blocklabel").find(".error-msg").fadeOut(100);
			inputObject.parents(".inputbox").removeClass('error').removeClass('ok');
		}

		return {
			setAsValid: setAsValid,
			setAsError: setAsError,
			setAsNone: setAsNone
		}
	})();


	function init() {

		upgradePopupLayer = $(upgradePopupSelector);
		introLayer = upgradePopupLayer.find("#intro");
		businessSignUpLayer = upgradePopupLayer.find("#businessSignUp");
		businessSelectacconutModal = upgradePopupLayer.find("#businessSelectAccount");
		basicBusinessSettingTeamInfoLayer = upgradePopupLayer.find("#businessSettingTeamInfo");
		businessSettingTeamInfoLayer = upgradePopupLayer.find("#intro");
		businessFinishedLayer = upgradePopupLayer.find("#businessFinished");
		premiumFinishedLayer = upgradePopupLayer.find("#premiumFinished");

		// 이벤트 및 화면 초기화(최초) -------------------------------------------------------------------- 안쓰는 js
		// intro 스크롤
		
		if(_USE_INTT_ID.indexOf("KAKAO") > -1 || _USE_INTT_ID.indexOf("APPLE") > -1)  {
			introLayer.find("#kakaoAccount").show();
		} else {
			introLayer.find("#flowAccount").show();
			introLayer.find("#currentUserId").text(_USER_ID + "로 시작");
		}
		
		if (cnts_Null2Void($("#BUY_YN").val(), "N") == "N") { // 무료사용자
			upgradePopupLayer.find("#premiumLayer").find("#premiumPayment").removeClass('used').text(cnts_Null2Void(i18n('H499'),'1개월 무료'));
			upgradePopupLayer.find("#premiumLayer").find("#preminumCardStat").show();
		} else {
			upgradePopupLayer.find("#premiumLayer").find("#premiumPayment").addClass('used').text(cnts_Null2Void(i18n('DL148'),'현재 사용중'));
			upgradePopupLayer.find("#premiumLayer").find("#preminumCardStat").hide();
		}

		upgradePopupLayer.find(".fl-header").find(".close").on('click', function (e) {
			hide();
		});
		
		introLayer.find("#businessPayment1").on('click', function (e) {
			if ($("#serviceUpgrade").attr('COMP_EML_YN') == "Y") { // 회사이메일
				businessSignUpLayer.find("#backToIntro").parent().hide();
				goToBusinessSignUp();
			} else {
				businessSignUpLayer.find("#backToIntro").parent().show();
				businessSignUpLayer.find("#backToBusinessSelectAccount").parent().hide();
				goToBusinessSignUp();
			}
			introLayer.hide();
		});
		
		introLayer.find("#businessPayment2").on('click', function (e) {
			if ($("#serviceUpgrade").attr('COMP_EML_YN') == "Y") { // 회사이메일
				businessSignUpLayer.find("#backToIntro").parent().hide();
				goToBusinessSignUp();
			} else {
				businessSignUpLayer.find("#backToIntro").parent().show();
				businessSignUpLayer.find("#backToBusinessSelectAccount").parent().hide();
				goToBusinessSignUp();
			}
			introLayer.hide();
		});
		
		// 비즈니스 업그레이드 계정선택 -------------------------------------------------------------------- 안쓰는 js
		businessSelectacconutModal.find("#useExistAccount").on('click', function (e) {

			businessSelectacconutModal.hide();
			businessSettingTeamInfoLayer.find("#backToBusinessSignUp").parent().hide();
			businessSettingTeamInfoLayer.find("#backToBusinessSelectAccount").parent().show();
			businessSettingTeamInfoLayer.fadeIn(200, function () {

				businessSettingTeamInfoLayer.find("input[name='teamName']").focus();
			});
		});

		businessSelectacconutModal.find("#registerNewAccount").on('click', function (e) {
			businessSelectacconutModal.hide();
			goToBusinessSignUp();
		});

		businessSelectacconutModal.find("#backToIntro").on('click', function (e) {
			introLayer.fadeIn(200);
			businessSelectacconutModal.hide();
		});
		


		// 비즈니스 업그레이드 계정등록 -------------------------------------------------------------------- 안쓰는 js
		businessSignUpLayer.find("#nextToSettingTeamInfo").on('click', function (e) { // 다음
			validIdCheck(e);
		});
		
		businessSignUpLayer.find("#backToIntro").on('click', function (e) {

			if ($("#serviceUpgrade").attr('COMP_EML_YN') == "Y") { // 회사이메일
				businessSelectacconutModal.fadeIn(200);
			} else {
				introLayer.fadeIn(200);
			}
			if (upgradePopupLayer.find(".f-login-wrap").hasClass("mCustomScrollbar")) {
				upgradePopupLayer.find(".f-login-wrap").mCustomScrollbar("destroy");
			}
			businessSignUpLayer.hide();
		});

		
		// imput validation
		// businessSignUpLayer.find("#email").on("focus", onInputFocusEventListener).on("focusout", onInputFocusOutEventListener);
		// businessSignUpLayer.find("#name").on("focus", onInputFocusEventListener).on("focusout", onInputFocusOutEventListener);
		// businessSignUpLayer.find("#password").on("focus", onInputFocusEventListener).on("focusout", onInputFocusOutEventListener);
		// businessSignUpLayer.find("#passwordCheck").on("focus", onInputFocusEventListener).on("focusout", onInputFocusOutEventListener);

		function onInputFocusEventListener(e) {
			$(e.target).parents("div.inputbox").removeClass("ok error");
		}

		function onInputFocusOutEventListener(e) {
			var isValid;
			if ($(e.target).is("#email")) {
				isValid = function() {

				}
			} else if ($(e.target).is("#name")) {
				isValid = function() {

				}
			} else if ($(e.target).is("#password")) {
				isValid = function() {

				}
			} else if ($(e.target).is("#passwordCheck")) {
				isValid = function() {

				}
			}
		}
		

		businessSignUpLayer.find("#email").on('focus keyup', function (e) {
			var emailInput = businessSignUpLayer.find("#email");
			if (e.keyCode && e.keyCode == 13) {
				validIdCheck(e);
			} else {
				if (emailInput.val().length > 0 && !cmf_emailcheck(emailInput.val())) {
					inputObject.setAsValid(emailInput);
				} else {
					if (emailInput.val() === "") {
						inputObject.setAsNone(emailInput);
					} else {
						inputObject.setAsError(e, emailInput, cnts_Null2Void(i18n('DL157'),"이메일을 입력해주세요."));
					}
				}
				updateNextBtnToSettingTeamInfoBtn();
			}
		});

        businessSignUpLayer.find("#email").on('blur', function (e) {
            var emailInput = businessSignUpLayer.find("#email");
				if (emailInput.val().length > 0 && !cmf_emailcheck(emailInput.val())) {
					duplicationIdCheck(emailInput);
				} else {
					if (emailInput.val() === "") {
						inputObject.setAsNone(emailInput);
					} else {
						inputObject.setAsError(e, emailInput, cnts_Null2Void(i18n('DL157'),"이메일을 입력해주세요."));
					}
				}
				updateNextBtnToSettingTeamInfoBtn();
			
		});

		businessSignUpLayer.find("#name").on('focus keyup blur', function (e) {
			var nameInput = businessSignUpLayer.find("#name");
			if (e.keyCode && e.keyCode == 13) {
				validIdCheck(e);
			} else {
				if (nameInput.val() === "") {
					nameInput.parent().removeClass('ok').removeClass('error');
				} else {
					if ((nameInput.val().length > 0) && (!cmf_isSpecialCharacterExist(nameInput.val()))) {
						nameInput.parent().removeClass('error').addClass('ok');
					} else {
						nameInput.parent().removeClass('ok').addClass('error'); cmf_btnClear(e);
					}
				}
				updateNextBtnToSettingTeamInfoBtn();
			}
		});
		businessSignUpLayer.find("#password").on('focus keyup blur', function (e) {
			var pwdCheckInput = businessSignUpLayer.find("#passwordCheck");
			var pwdInput = businessSignUpLayer.find("#password");

			if (e.keyCode && e.keyCode == 13) {
				validIdCheck(e);
			} else {
				if (pwdInput.val() === "") {
					inputObject.setAsNone(pwdInput);
				} else {
					if (cmf_validate(pwdInput.val())) {
						inputObject.setAsError(e, pwdInput, cnts_Null2Void(i18n('DL161'),"6자 이상, 영문숫자를 입력하시기 바랍니다."));
						if ($.trim(pwdCheckInput.val()) === "") {
							inputObject.setAsNone(pwdCheckInput);
						} else {
							inputObject.setAsError(e, pwdCheckInput, "비밀번호가 일치하지 않습니다.");
						}
					} else {
						inputObject.setAsValid(pwdInput);
						if ($.trim(pwdCheckInput.val()) === "") {
							inputObject.setAsNone(pwdCheckInput);
						} else {
							if ($.trim(pwdCheckInput.val()) === $.trim(pwdInput.val())) {
								inputObject.setAsValid(pwdCheckInput);
							} else {
								inputObject.setAsError(e, pwdCheckInput, "비밀번호가 일치하지 않습니다.");
							}
						}
					}
				}
				updateNextBtnToSettingTeamInfoBtn();
			}
		});
		businessSignUpLayer.find("#passwordCheck").on('focus keyup blur', function (e) {
			var pwdInput = businessSignUpLayer.find("#password");
			var pwdCheckInput = businessSignUpLayer.find("#passwordCheck");
			if (e.keyCode && e.keyCode == 13) {
				validIdCheck(e);
			} else {
				if (pwdCheckInput.val() === "") {
					inputObject.setAsNone(pwdCheckInput);
				} else {
					if (cmf_validate(pwdCheckInput.val())) {
						inputObject.setAsError(e, pwdCheckInput, cnts_Null2Void(i18n('DL161'),"6자 이상, 영문숫자를 입력하시기 바랍니다."));
					} else {
						if (cmf_validate(pwdInput.val())) {
							inputObject.setAsValid(pwdCheckInput);
							inputObject.setAsError(e, pwdInput, cnts_Null2Void(i18n('DL161'),"6자 이상, 영문숫자를 입력하시기 바랍니다."));
						} else {
							inputObject.setAsValid(pwdInput);
							if (($.trim(pwdInput.val()) === $.trim(pwdCheckInput.val()))) {
								inputObject.setAsValid(pwdCheckInput);
							} else {
								inputObject.setAsError(e, pwdCheckInput, cnts_Null2Void(i18n('DL533'),'비밀번호가 일치하지 않습니다.'));
							}
						}
					}
				}
				updateNextBtnToSettingTeamInfoBtn();
			}
		});
		businessSignUpLayer.find("#agreeWithTheTerms").on('click focus', function (e) {
			updateNextBtnToSettingTeamInfoBtn();
		});
		businessSignUpLayer.find("#backToBusinessSelectAccount").on('click', function (e) {

			businessSelectacconutModal.show();
			businessSignUpLayer.hide();
			if (upgradePopupLayer.find(".f-login-wrap").hasClass("mCustomScrollbar")) {
				upgradePopupLayer.find(".f-login-wrap").mCustomScrollbar("destroy");
			}
		});

		// 비즈니스 업그레이드 팀정보등록
		basicBusinessSettingTeamInfoLayer.find("#domain").text("." + location.host);
		basicBusinessSettingTeamInfoLayer.find("#backToBusinessSignUp").on('click', function (e) {

			goToBusinessSignUp();
			basicBusinessSettingTeamInfoLayer.hide();
		});
		
		businessSettingTeamInfoLayer.find("#backToBusinessSelectAccount").on('click', function (e) {

			businessSelectacconutModal.show();
			businessSettingTeamInfoLayer.hide();
		});
		
		businessSettingTeamInfoLayer.find("#submitTeamSettingInfo").on('click', function (e) {
			registerTeamInfo(businessSettingTeamInfoLayer,e);
		});
		
		basicBusinessSettingTeamInfoLayer.find("#basicSubmitTeamSettingInfo").on('click', function (e) {
			registerTeamInfo(basicBusinessSettingTeamInfoLayer,e);
		});

		//input validation
		eventBusinessSettingTeamInfoLayer(businessSettingTeamInfoLayer);
		eventBusinessSettingTeamInfoLayer(basicBusinessSettingTeamInfoLayer);
		
		
		
		businessSettingTeamInfoLayer.find("#couponCode").on('keyup focus', function (e) {			
			var couponCodeInput = businessSettingTeamInfoLayer.find("#couponCode");
			if (e.keyCode && e.keyCode == 13) {
				registerTeamInfo(e);
			} else {
				if (couponCodeInput.val().length === 0){
					inputObject.setAsNone(couponCodeInput);						
				} else {
					if (cmf_couponValidate(couponCodeInput.val())) {
						inputObject.setAsValid(couponCodeInput);	
					} else {
						inputObject.setAsError(e, couponCodeInput, cnts_Null2Void(i18n('DFU536'),'형식에 맞지 않은 쿠폰코드입니다.'));		
					}
				}
				updateNextBtnToPayment();
			}
		});
		
		
		businessSettingTeamInfoLayer.find("#agreeWithTheTerms").on('click focus', function (e) {
			updateNextBtnToPayment();
		});

		// 비즈니스 업그레이드 마무리
		businessFinishedLayer.find("#copyURL").on('click', function (e) {

			cmf_copyTextToClipboard(businessFinishedLayer.find("#teamURL").val(), cnts_Null2Void(i18n('DL165'),"팀 주소를 클립보드에 복사했습니다."));
		});

		businessFinishedLayer.find("#startNow").on('click', function (e) {
			window.location.reload();
			
			var userId = _USER_ID;
			if (cnts_Null2Void(businessSignUpLayer.find("#email").val(), "") == "") {
				userId = _USER_ID;
			} else {
				userId = cnts_Null2Void(businessSignUpLayer.find("#email").val(), "");
			}
			
			location.href = location.protocol + "//" + businessFinishedLayer.find("#teamURL").val() + "/login.act?USER_ID=" + userId;
			
		});
		// 프리미엄 업그레이드 마무리
		premiumFinishedLayer.find("#startNow").on('click', function (e) {
			window.location.reload();
		});

		isInit = true;
	}
	
	function eventBusinessSettingTeamInfoLayer(Layer) {
		
		var currentLayer = Layer;
		
		currentLayer.find("input[name='teamName']").on('keyup focus', function (e) {
			var teamNameInput = currentLayer.find("input[name='teamName']");
			if (e.keyCode && e.keyCode == 13) {
				registerTeamInfo(currentLayer,e);
			} else {
				if ((teamNameInput.val().length > 0) && (!cmf_isSpecialCharacterExist(teamNameInput.val()))) {
					inputObject.setAsValid(teamNameInput);
				} else {
					if (teamNameInput.val() === "") {
						inputObject.setAsNone(teamNameInput);
					} else {
						inputObject.setAsError(e, teamNameInput, cnts_Null2Void(i18n('DFU534'),"회사 이름에 특수문자를 넣을 수 없습니다."));
					}
				}
				updateNextBtnToPayment(currentLayer);
			}
		});
		
		currentLayer.find("input[name='teamUrl']").on('keyup focus', function (e) {
            var el = $(this);
			var teamUrlInput = currentLayer.find("input[name='teamUrl']");
			if (e.keyCode && e.keyCode == 13) {
				registerTeamInfo(currentLayer,e);
			} else {
				if (teamUrlInput.val() === "") {
					inputObject.setAsNone(teamUrlInput);
				} else {
					if (cmf_subDomainValidate(teamUrlInput.val())) {
						inputObject.setAsValid(teamUrlInput);
					} else {					
						inputObject.setAsError(e, teamUrlInput, cnts_Null2Void(i18n('H494'),'3~50자 영문, 숫자만 가능합니다.'));

		                var text = $(el).val();
		                res = text.replace(/[^A-Za-z0-9]/gi,"");
		                teamUrlInput.val(res);
					}
				}
				updateNextBtnToPayment(currentLayer);
			}
		});
		
		currentLayer.find("input[name='teamUrl']").on('input',function(e){
			$(e.target).val($(e.target).val().replace(/[^0-9a-zA-Z_\.-@]/g, ""));
        });
		
		
		currentLayer.find("input[name='teamUrl']").bind('paste',function(e){
            var el = $(this);
            var res; 
            setTimeout(function(){
                var text = $(el).val();
                res = text.replace(/[^A-Za-z0-9]/gi,"");
                currentLayer.find("input[name='teamUrl']").val(res);
            },100);
        });
		
		
		
		//@유민호 : 가입경로 관련 처리 190513
		currentLayer.find("select.path_cd").on('change', function (e) {
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
				ADD_TAG.on('click',function(){
					currentLayer.find("select.path_cd").show();
					currentLayer.find("select.path_cd").parent().removeClass('ok').removeClass('error');
					currentLayer.find("input.path_cd").hide();
					currentLayer.find("select.path_cd").find('option:first').removeAttr('selected');
					currentLayer.find("select.path_cd").find('option:first').attr('selected','selected');
					
					
					$('#introPathCd').next().css('background','url(../img_rn/bul/bul_arrow2_open.png?4) no-repeat 298px 22px');
					$('#basicPathCd').next().css('background','url(../img_rn/bul/bul_arrow2_open.png?4) no-repeat 370px 22px');
					$('[data-langcode=H421]').find('u').remove();
				});
				$('[data-langcode=H421]').append(ADD_TAG);
				
				updateNextBtnToPayment(currentLayer);

			} else {
				$(e.target).parent().removeClass('error').addClass('ok');
				updateNextBtnToPayment(currentLayer);
			}
		});
		currentLayer.find("input.path_cd").on('keyup focus', function (e) {
			if (e.keyCode && e.keyCode == 13) {
				registerTeamInfo(currentLayer,e);
			} else {
				if ($(e.target).val() === "") {
					$(e.target).parent().removeClass('error').removeClass('ok');
				} else {
					if ($(e.target).val().length >= 3 && $(e.target).val().length < 20) {
						$(e.target).parent().removeClass('error').addClass('ok');
					} else {
						$(e.target).parent().find(".error-msg").find(".error-cont").text(cnts_Null2Void(i18n('DFU535'),'3~20자 안에서 작성 가능합니다.'));
						$(e.target).parent().removeClass('ok').addClass('error'); 
						cmf_btnClear(e);
					}
				}
				updateNextBtnToPayment(currentLayer);
			}
		});
	}
	

	function updateNextBtnToSettingTeamInfoBtn() {
		var ok = businessSignUpLayer.find(".blocklabel").find(".inputbox").length;
		businessSignUpLayer.find(".blocklabel").find(".inputbox").each(function (i, v) {

			if ($(v).hasClass("ok")) {
				ok--;
			}
		});
		if ((ok == 0) && businessSignUpLayer.find("#agreeWithTheTerms").is(":checked")) {
			businessSignUpLayer.find("#nextToSettingTeamInfo").removeClass("c-gray").addClass("c-blue");
		} else {
			businessSignUpLayer.find("#nextToSettingTeamInfo").removeClass("c-blue").addClass("c-gray");
		}
	}

	function updateNextBtnToPayment(currentLayer) {
		var ok = currentLayer.find(".blocklabel").find(".inputbox").length;
		currentLayer.find(".blocklabel").find(".inputbox").each(function (i, v) {

			if ($(v).hasClass("ok")) {
				ok--;
			}
		});
		
		if (ok == 0) {
			currentLayer.find("#basicSubmitTeamSettingInfo").removeClass("c-gray").addClass("c-blue");
		} else {
			currentLayer.find("#basicSubmitTeamSettingInfo").removeClass("c-blue").addClass("c-gray");
		}
		
	}

	function goToBusinessSignUp() {
		upgradePopupLayer.find(".f-login-wrap").mCustomScrollbar({
			autoHideScrollbar: true
		});
		businessSettingTeamInfoLayer.find("#backToBusinessSignUp").parent().show();
		businessSettingTeamInfoLayer.find("#backToBusinessSelectAccount").parent().hide();
		businessSignUpLayer.fadeIn(200, function () {
			businessSignUpLayer.find("#email").focus();
			
			collectTagManager({
				"event":"upgradeNew1"
			})
		});
	}

	/**
	 * ID 중복체크
	 * @param {d} element : input type='email' element 
	*/
	function duplicationIdCheck(element){
		console.log(element);
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
					if( element.parent().find(".error-msg").length > 0){
						element.parent().find(".error-msg").find(".error-cont").text(dat.ERR_MSG);
						element.parent().removeClass('ok').addClass('error');
					}else{
						$("#main").find("#USER_ID_CHK").removeClass("ok").addClass("error");
						$("#main").find(".signup_btn_st1").removeClass("on");
						
						$("#main").find(".error_txt").text(dat.ERR_MSG);
						$("#main").find(".error_txt").show();
					}
				}
				//that.updateNextBtnToSettingTeamInfoBtn();
			} else {
				if( element.parent().find(".error-msg").length > 0){
					element.parent().removeClass('error').addClass('ok');
				}else{
					$("#main").find("#USER_ID_CHK").removeClass("error").addClass("ok");
					
					$("#main").find(".error_txt").text("");
					$("#main").find(".error_txt").hide();
				}
			}
		});
	}
 	
	function goToSettingTeamInfo() {
		if (upgradePopupLayer.find(".f-login-wrap").hasClass("mCustomScrollbar")) {
			upgradePopupLayer.find(".f-login-wrap").mCustomScrollbar("destroy");
		}
		basicBusinessSettingTeamInfoLayer.fadeIn(200);
		businessSignUpLayer.hide();
	}

	function closePaymentLayer() { //결제 닫기.
		$("#payment-layer").hide();
	}

	function goToPayment() {
		billingTerms.close();

		if (!isInit) {
			init();
		}

		//if (cnts_Null2Void(_USER_ID, "").indexOf("flowtest.com") > -1 || "DEV" == _DEV_REAL) {
		$("#payment-layer").show();
		$("#payment-layer").find("#payment-form-container").find(".brick-icon").css("left", "-20px");
		$("#payment-layer").find("#payment-form-container").show();

		var brick;
		if (cnts_Null2Void(businessFinishedLayer.css("display"), 'none') == "block" || cnts_Null2Void(_USE_INTT_ID, "").toLowerCase().indexOf("bflow") > -1) { //비즈니스
			brick = new Brick({
				public_key: _BRICK_KEY, // please update it to Brick live key before launch your project
				amount: 1000,
				currency: 'KRW',
				container: 'payment-form-container',
				action: 'cardcheck.flow',
				form: {
					merchant: 'flow business',
					product: '1,000원(EUR) 결제 후 취소됨',
					pay_button: '결제하기',
					zip: true
				}
			});
		} else { //프리미엄
			brick = new Brick({
				public_key: _BRICK_KEY, // please update it to Brick live key before launch your project
				amount: 9900,
				currency: 'KRW',
				container: 'payment-form-container',
				action: 'premium.flow',
				form: {
					merchant: 'flow premium',
					product: '프리미엄',
					pay_button: '결제하기',
					zip: true
				}
			});
		}

		brick.showPaymentForm(function (data) {
			//getFlowBuyC001(errors);
		}, function (errors) { //성공해도 에러로 간다~
			// handle errors
			if (cnts_Null2Void(errors.error, "") != "" && cnts_Null2Void(errors.error.error, "") != "" && cnts_Null2Void(errors.error.error.code, "") != "") { //?
				alert(cnts_Null2Void(errors.error.error.message, ""));
			} else {
				getFlowBuyC001(errors);
			}
		});
	}

	function goToBusinessFinished(currentLayer) {
		businessFinishedLayer.fadeIn(200);
		upgradePopupLayer.find("div.fl-header-wrap > div.top-banner").hide();
		upgradePopupLayer.find("div.fl-header > a.close").hide();
		currentLayer.hide();
	}

	function goToPremiumFinished() {
		premiumFinishedLayer.fadeIn(200);
		upgradePopupLayer.find("div.fl-header-wrap > div.top-banner").hide();
		upgradePopupLayer.find("div.fl-header > a.close").hide();
	}

	function validIdCheck(e) {
		if (!businessSignUpLayer.find("#nextToSettingTeamInfo").hasClass('c-blue') && businessSignUpLayer.find("#nextToSettingTeamInfo").hasClass('c-gray')) {
			if (businessSignUpLayer.find(".inputbox.error:first").length > 0) {
				businessSignUpLayer.find(".inputbox.error:first").find("input").focus();
				
			} else {
				businessSignUpLayer.find(".inputbox").each(function (i, v) {
					if ($(v).find("input").val() == "") {
						$(v).find("input").focus();
						return false;
					}
				});
			}
			return;
		}
		
		//이메일 회원가입일 경우! 인증체크후 진행한다.
		auth_layer.emailAuthCheck(businessSignUpLayer.find("#email").val());
		
	}
	
	function registerUser(){
		if (!startWorking()) {
			return;
		}
		
		//@유민호 : 가입경로 초기화 190513
		var jexAjax = jex.createAjaxUtil("COLABO_USER_DUPLICATE_R001");
		jexAjax.set("USER_ID", businessSignUpLayer.find("#email").val());
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
				businessSignUpLayer.find("#email").select();
				inputObject.setAsError(e, businessSignUpLayer.find("#email"), dat.ERR_MSG);
				updateNextBtnToSettingTeamInfoBtn();
			} else {
				
				collectTagManager({
					"event":"upgradeNew2"
				})
				
				goToSettingTeamInfo();
			}
		});
		endWorking();
	}

	function registerTeamInfo(currentLayer,e) {
		
		if($("#upgradePopup").find("#intro").attr("id") == "intro")
		{
			var okCount = currentLayer.find(".inputbox").length;
			
			currentLayer.find(".inputbox").each(function (i, v) {
				if ($(v).hasClass("ok")) {
					okCount--;
				}
				 if ($(v).find("input").val() == "" && !$(v).hasClass("ok")) {
					if(i == 0) $(v).parent().find(".error-cont").text('회사명을 입력하세요');
					else if(i == 1) $(v).parent().find(".error-cont").text('회사 URL주소를 입력하세요');
					else if(i == 2) $(v).parent().find(".error-cont").text('가입경로를 선택하세요');
					$(v).removeClass('ok').addClass('error'); 
					return false;
				 }
			});
			
			if(okCount != 0) return;
			
		} else {
			if ((!currentLayer.find("#basicSubmitTeamSettingInfo").hasClass('c-blue') && currentLayer.find("#basicSubmitTeamSettingInfo").hasClass('c-gray')) ) {
				if (currentLayer.find(".inputbox.error:first").length > 0) {
					currentLayer.find(".inputbox.error:first").find("input").focus();
									
				} else {
					currentLayer.find(".inputbox").each(function (i, v) {
						if ($(v).find("input").val() == "") {
							$(v).find("input").focus();
							return false;
						}
					});
				}
				return;
			}
		}		
		
		if (!startWorking()) {
			return;
		}
		var jexAjax = jex.createAjaxUtil("FLOW_SUB_DOM_C001");
		jexAjax.set("SUB_DOM", currentLayer.find("input[name='teamUrl']").val());
		jexAjax.set("SUB_DOM_NM", currentLayer.find("input[name='teamName']").val());
		if (cnts_Null2Void(businessSignUpLayer.find("#email").val(), "") == "") {
			jexAjax.set("USER_ID", _USER_ID);
		} else {
			jexAjax.set("USER_ID", businessSignUpLayer.find("#email").val());
			jexAjax.set("USER_NM", cnts_Null2Void(businessSignUpLayer.find("#name").val(), ""));
			jexAjax.set("PWD", cnts_Null2Void(businessSignUpLayer.find("#password").val(), ""));
		}
		var cpCd = currentLayer.find("#couponCode").val();
		jexAjax.set("CP_CD", cpCd);
		
		//@유민호 : 가입경로 추가 190513
		if(cnts_Null2Void(currentLayer.find("select.path_cd").css('display'),'none') !== 'none' 
			&& cnts_Null2Void(currentLayer.find("input.path_cd").css('display'),'none') === 'none'){
			jexAjax.set("PATH_CD", currentLayer.find("select.path_cd").val());
			clog('select.path_cd ### ' + currentLayer.find("select.path_cd").val());
		} else if (cnts_Null2Void(currentLayer.find("select.path_cd").css('display'),'none') === 'none' 
			&& cnts_Null2Void(currentLayer.find("input.path_cd").css('display'),'none') !== 'none'){
			jexAjax.set("PATH_CD", currentLayer.find("input.path_cd").val());
			clog('input.path_cd ### ' + currentLayer.find("input.path_cd").val());
		}
		
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
				
				if (dat.ERR_CD == "1000") {
					currentLayer.find("input[name='teamUrl']").select();
					inputObject.setAsError(e, currentLayer.find("input[name='teamUrl']"), dat.ERR_MSG);
				} else if (dat.ERR_CD == "3000") {
					currentLayer.find("#errorMsg span").html(cnts_Null2Void(i18n('DL168'),"한 계정으로 '한개의 팀'만 생성 가능합니다. <br /> 이 계정은 이미 다른 팀의 관리자입니다. 다른 계정을 사용해주세요."));
					currentLayer.find("#errorMsg").show();
				} else if (dat.ERR_CD == "5000") {
					// 다시 아이디 수정하는 화면으로 돌려줘야함. 이거는 나올일이 없겠다! 왜냐면... 앞에서 체크를 한번 하니까!
					currentLayer.find("#errorMsg span").html(cnts_Null2Void(i18n('DL169'),"사용중인 이메일 주소입니다. 다른 메일주소를 등록해주세요"));
				} else if (dat.ERR_CD == "7000") {
					$("#businessMngrSignUpPopup").find("#businessMngrSettingTeamInfo").find("#couponCode").parent().removeClass('ok');			
					$("#businessMngrSignUpPopup").find("#businessMngrSettingTeamInfo").find("#couponCode").attr("placeholder",dat.ERR_MSG);
					$("#businessMngrSignUpPopup").find("#businessMngrSettingTeamInfo").find("#couponCode").val("").focus();
					businessSettingTeamInfoLayer.find("#errorMsg span").html(dat.ERR_MSG);
					businessSettingTeamInfoLayer.find("#errorMsg").show();

					currentLayer.find("#couponCode").select();
					inputObject.setAsError(e, currentLayer.find("#couponCode"), dat.ERR_MSG);					
				} else if (dat.ERR_CD == "9000") {
					
					var errMsgs = dat.ERR_MSG.split("&");
					
					currentLayer.find("input[name='teamUrl']").select();
					inputObject.setAsError(e, currentLayer.find("input[name='teamUrl']"), errMsgs[0]);
			
					currentLayer.find("#couponCode").select();
					inputObject.setAsError(e, currentLayer.find("#couponCode"), errMsgs[1]);					
				} 
				
				updateNextBtnToPayment(currentLayer);
			} else {
				if(_DEV_REAL == "DEV") {				
					businessFinishedLayer.find("#teamURL").val("http://" + currentLayer.find("input[name='teamUrl']").val() + ".flow.team");
				} else {
					businessFinishedLayer.find("#teamURL").val("https://" + currentLayer.find("input[name='teamUrl']").val() + ".flow.team");
				}
				var companyName = $("#flowAccount").find("[name=teamName]").val()
				businessFinishedLayer.find("#welcome-text").html(c18n('DL174','<b>$1</b>님은 <b>$2</b>의 관리자입니다.').replace('$1',_USER_NM).replace('$2',companyName))
				//ko : <b>$1</b>님은 <b>$2</b>의 관리자입니다.
				//en : <b>$1</b>, you are now administrator of <b>$2</b>

				collectTagManager({
					"event":($(".fl-pay-content.upgVer").is(":visible") ? "upgrade2" : "upgradeNew3"),
					"userId":_USER_ID,
					"joinDate":getNowTime().slice(0, 4) + "-" + getNowTime().slice(4,6) + "-" + getNowTime().slice(6,8),
					"company":jexAjax.get("SUB_DOM_NM"),
					"industry":jexAjax.get("PATH_CD")
				})
				
				goToBusinessFinished(currentLayer);		
			}
			endWorking();
		});
	}

	function show(from) {

		if (!isInit) {
			init();
		}

		$("body").css('overflow', 'hidden'); // main scroll


		// 기타 값 & 진행상황 초기화
		
		if (!(cnts_Null2Void(from) === "backToSettingTeamInfo")) {
			$('[data-langcode=H422]').next().val("S");
			businessSignUpLayer.find(".blocklabel").find(".inputbox").find("input").val("");
			businessSignUpLayer.find(".blocklabel").find(".inputbox").removeClass("error").removeClass("ok");
			businessSignUpLayer.find("#agreeWithTheTerms").prop("checked", false);
			businessSignUpLayer.find("#nextToSettingTeamInfo").removeClass("c-blue").addClass("c-gray");
			businessSettingTeamInfoLayer.find(".blocklabel").find(".inputbox").find("input").val("");
			businessSettingTeamInfoLayer.find(".blocklabel").find(".inputbox").removeClass("error").removeClass("ok");
			businessSettingTeamInfoLayer.find("#agreeWithTheTerms").prop("checked", false);
			basicBusinessSettingTeamInfoLayer.find("#basicSubmitTeamSettingInfo").removeClass("c-blue").addClass("c-gray");
		}
		introLayer.show();
		upgradePopupLayer.find("div.fl-header-wrap > div.top-banner").show();
		upgradePopupLayer.find("div.fl-header > a.close").show();

		if (cnts_Null2Void(from) === "backToIntro") {
			introLayer.hide();
			upgradePopupLayer.show();
			introLayer.fadeIn(200);
		} else if (cnts_Null2Void(from) === "backToSettingTeamInfo") {
			introLayer.hide();
			businessSettingTeamInfoLayer.hide();
			upgradePopupLayer.show();
			businessSettingTeamInfoLayer.fadeIn(200);
		} else if (cnts_Null2Void(from) === (payment.Product.BUSINESS + "Success")) {
			introLayer.hide();
			businessFinishedLayer.hide();
			upgradePopupLayer.show();
			upgradePopupLayer.find("div.fl-header > a.close").hide();
			upgradePopupLayer.find("div.fl-header-wrap > div.top-banner").hide();
			if (businessFinishedLayer.find("#teamURL").val() === "") {
				var subdomain = getTeamDomain().toLowerCase();
				var url = location.protocol + "//";
				if (location.hostname.indexOf(subdomain + ".") > -1) {
					url += location.hostname;
				} else {
					url += (subdomain + "." + location.hostname);
				}
				businessFinishedLayer.find("#teamURL").val(url);
				businessFinishedLayer.fadeIn(200);
			} else {
				businessFinishedLayer.fadeIn(200);
			}
		} else if (cnts_Null2Void(from) === (payment.Product.PREMIUM + "Success")) {
			introLayer.hide();
			premiumFinishedLayer.hide();
			upgradePopupLayer.show();
			upgradePopupLayer.find("div.fl-header-wrap > div.top-banner").hide();
			upgradePopupLayer.find("div.fl-header > a.close").hide();
			premiumFinishedLayer.fadeIn(200);
		} else {
			upgradePopupLayer.fadeIn(200);
		}
		
		
		collectTagManager({
			"event":"upgrade1"
		})
	}

	function hide() {
		if (cnts_Null2Void(upgradePopupLayer.find("#intro").css('display'), "none") == 'block') {
			fn_layerComfirm(null, '6', 'upgrade', 'reallyClose', cnts_Null2Void(i18n('DFU540'),"업그레이드를 취소하시겠습니까?"));
		} else if (cnts_Null2Void($("#businessFinished").find("#intro").css('display'), "none") == 'block' || cnts_Null2Void($("#premiumFinished").find("#intro").css('display'), "none") == 'block') {
			reallyClose();
			window.location.reload(true);
		} else {
			fn_layerComfirm(null, '6', 'upgrade', 'reallyClose', cnts_Null2Void(i18n('DFU540'),"업그레이드를 취소하시겠습니까?"));
		}
	}

	function reallyClose(notChangeBodyOverflow) {
		if (!notChangeBodyOverflow) {
			$("body").css('overflow', 'auto'); // main scroll
		}
		upgradePopupLayer.find("#payment-form-container").fadeOut(200);
		upgradePopupLayer.fadeOut(200);
		upgradePopupLayer.find("#intro").mCustomScrollbar("destroy");

		if (upgradePopupLayer.find(".f-login-wrap").hasClass("mCustomScrollbar")) {
			upgradePopupLayer.find(".f-login-wrap").mCustomScrollbar("destroy");
		}
		upgradePopupLayer.find(".fl-content").fadeOut(200);
	}

	function getSubDomain() {
		if (businessSettingTeamInfoLayer) {
			return businessSettingTeamInfoLayer.find("input[name='teamUrl']").val();
		} else {
			return "";
		}
	}

	function isLayerVisible() {
		return upgradePopupLayer && (upgradePopupLayer.css("display") === "block");
	}
	
	return {
		init: init,
		show: show,
		hide: hide,
		reallyClose: reallyClose,
		closePaymentLayer: closePaymentLayer,
		getSubDomain: getSubDomain,
		isLayerVisible: isLayerVisible,
		goToPayment: goToPayment,
		duplicationIdCheck : duplicationIdCheck, 
		registerUser : registerUser				//@jkw 2020.6.30 추가
	}
	

	

	
})();

