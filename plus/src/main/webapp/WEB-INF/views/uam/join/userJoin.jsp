<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="theme-color" content="#5f5ab9">

<meta name="author" content="Madras check">
<meta name="subject" content="work tool">
<meta name="copyright" content="Madras check">
<meta name="content-language" content="ko">
<meta property="og:locale" content="ko_KR" />

<link rel="SHORTCUT ICON" href="design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="design2/favicon.ico">

<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">

<script async=""
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw&amp;libraries=places"
	charset="UTF-8"></script>

<script type="text/javascript" src="js/lib/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jex/jex.core.js"></script>
<script type="text/javascript" src="js/commCustom/contents.custom.js"></script>
<script type="text/javascript" src="js/jexPlugin/jex.loading2.js"></script>
<script type="text/javascript" src="js/gibberish-aes.js"></script>
<script type="text/javascript" src="js/jquery.i18n.properties.js"></script>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/common.js"></script>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/util.js"></script>


<link href="https://fonts.googleapis.com/css?family=Roboto"
	rel="stylesheet" type="text/css">
<script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>


<script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>


<script type="text/javascript"
	src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>


<script type="text/javascript"
	src="js/collabo/collabo2019/start_testing.js"></script>
<script type="text/javascript" src="js/collabo/collabo2019/open.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/is_condition.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/convert_form.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/valid_check.js"></script>
<script type="text/javascript" src="js/collabo/collabo2019/get_value.js"></script>
<script type="text/javascript" src="js/collabo/collabo2019/google.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/screen_value.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/used_often.js"></script>
<script type="text/javascript" src="js/collabo/collabo2019/base.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/lang_timezone.js"></script>
<script type="text/javascript" src="js/collabo/collabo2019/js_draw.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/editor_control.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/lock_control.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/load_opensource.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2019/enter_control.js"></script>
<script type="text/javascript"
	src="js/collabo/collabo2020/auth_layer.js"></script>
<script type="text/javascript" src="js/collabo/collabo2020/base64.js"></script>

<!-- <script type="text/javascript" src="js/collabo/login.js"></script> -->
<script type="text/javascript" src="js/collabo/flow_upgrade.js"></script>
<script type="text/javascript" src="js/collabo/flow_iamport_payment.js"></script>
<script type="text/javascript" src="js/collabo/inc/polyfill_IE.js"></script>
<!-- IE?????? -->
<link href="design2/css/NotoSansKR-Hestia.css" rel="stylesheet"
	type="text/css">
<link rel="stylesheet" href="design2/css/login_cont.css" />
<link rel="stylesheet" href="design2/css/reset.css" />
<link rel="stylesheet" href="design2/css/contents.css" />
<link rel="stylesheet" href="design2/css/signup.css" />
<link rel="stylesheet" href="design2/css/signup2.css" />
<link rel="stylesheet" href="design2/css/f_login.css" />
<link rel="stylesheet" href="design2/css/f_pay.css" />



<link rel="stylesheet" href="design2/css/jquery.mCustomScrollbar.css">
<script src="design2/js/jquery.mCustomScrollbar.concat.min.js"></script>

<style>
.async-hide {
	opacity: 0 !important
}
.email_modal{

	min-width: 115px;
    padding: 14px; 
    z-index: 10;
    border-radius: 4px;
    font-size: 13px;
    text-align: left;
    color: #555;
    float: right;
	width:250px;
	background-color: white;
	border-radius: 2px;
	position: absolute;
	left: 86%;
	display: none;
	border: 1px solid;
}
.email_modal:after {
 border-top:0px solid transparent;
 border-left: 10px solid transparent;
 border-right: 10px solid transparent;
 border-bottom: 10px solid;
 content:"";
 position:absolute;
 top:-10px;
 left:20px;
}

.fl-content{
	z-index: 1
}
</style>
</head>
<body>


	<div class="alert_wrap" id="layerAlert"
		style="z-index: 99999; top: 50px; left: 40%; display: none; text-align: center;">
		<div class='alert_box'>
			<p style="color: #555; font-weight: bold"></p>
		</div>
	</div>

	<div class="business-signup-layer">
		
		<!-- businessMngrSignUpPopup -->

		<div class="pc-login-wrap" id="businessMngrSignUpPopup"
			style="top: 0px; left: 0px; z-index: 3000;">

			<!-- top -->
			<div class="fl-header-wrap">
				<!-- header -->
				<div class="fl-header">

					<h1>
						<a href="home.do"><img id="headerLogoImg"
							src="img_rn/memb2/plus_loing.png" style="cursor: pointer;"
							alt="flow"></a>
					</h1>

				</div>
				<!-- //header -->

			</div>
			<!-- //top -->
			<div class="f-login-wrap mCustomScrollbar"
				style="position: fixed; margin: 0px; padding: 60px 0 0 0; width: 100%; height: 100%;">
					<fieldset style="padding-bottom: 30px;">
						<!-- business sign in content -->
						<div class="fl-content" id="businessCreateAccount"
							style="padding-top: 50px;">

							<!-- ??????????????? -->
							<div class="flk-msg-wrap">
								<h3 class="font-Noto" data-langcode="H463">????????? ????????? ????????? ???????????????</h3>
								<h4 class="font-Noto">
									<span data-langcode="H486">?????? ???????????? ?????? ???, ????????? ???????????? ????????? ???
										????????????.</span><br class="block">
								</h4> 
							</div>
							<!-- //??????????????? -->

							<!-- <legend data-langcode="H467">???????????? ?????? ?????????, ??????, ???????????? ??????</legend> -->
							<div class="input-box-style">
								<!-- ????????? -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H333">?????????</label>
									<div class="inputbox">
										<input type="text" id="email" name="email" maxlength="50"
											tabindex="1" placeholder="example@gmail.com" value=""  required/>
										
										<button id="emailCheckOk" type="button" class="btn-ok-text">??????</button>
										<button id="emailCheck" type="button" class="btn-clear-text" style="cursor: pointer; display: block;" >?????????</button>
									</div>
									<div id="emailModal" class="email_modal" >
										<div id="email_msg" style="color: red">???????????? ??????????????????(click)</div>
									</div>
									<div id="emailModal" class="email_modal" style="display: none;">
										<div id="email_msg" style="color: green">???????????? ?????????????????????</div>
									</div>
								</div>
							
										
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H331">??????</label>
									<div class="inputbox">
										<input type="text" name="name" id="name" tabindex="2"
											maxlength="50" placeholder="??????" value="" data-langcode="H331" required>
										<button type="button" class="btn-ok-text" data-langcode="H359">??????</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">??????</button>
										<!-- ????????? -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H472">
												????????? ????????? ????????? (???????????? ????????????)</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H362">????????????</label>
									<div class="inputbox">
										<input type="password" name="pwd" id="pwd"
											class="password-input" maxlength="50" tabindex="3"
											placeholder="???????????? ??????" value="" data-langcode="H399" required>
										<span class="password-mask"><em class="blind">????????????
												????????? / ????????? ?????? </em></span>
										<button type="button" class="btn-ok-text" data-langcode="H359">??????</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">??????</button>
										<!-- ????????? -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H402">
												6??? ????????? ??????,????????? ???????????????.</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H383">???????????? ??????</label>
									<div class="inputbox">
										<input type="password" name="pwdCheck" id="pwdCheck"
											class="password-input" maxlength="50" tabindex="4"
											placeholder="???????????? ?????????" data-langcode="H477" required> <span
											class="password-mask"><em class="blind">???????????? ?????????
												/ ????????? ?????? </em></span>
										<button type="button" class="btn-ok-text" data-langcode="H359">??????</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">??????</button>
										<!-- ????????? -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H402">
												6??? ????????? ??????,????????? ???????????????.</div>
										</div>
									</div>
								</div>
								<input type="hidden" id="coUrl" value="${exUrl }">

								<!-- ?????????????????? -->
								<div class="terms-check">
									<input type="checkbox" tabindex="5" id="agreeWithTheTerms">
									<span class="terms-and-privacy"><a>????????? ??????????????? ?????????????????????????</a></span>

								</div>
							</div>
							<div class="btn-box" id="joinTry1">
								<button type="button"
									class="btn-bigs c-gray">????????????</button>
							</div>
							<div class="btn-box" id="joinTry2" style="display: none">
								<button type="button" id="joinSuccess"
									class="btn-bigs c-blue">????????????</button>
							</div>
						</div>
						<!-- ???????????? ?????? -->
						<div id="checkJoinPopup" class="flow-all-background-1 d-none">
							<div class="flow-project-make-1">
								<div class="flow-project-make-2">
									<div id="popupLayer" class="flow-login-popup popup-10">
										<div class="flow-project-header-1">
											??????????????? ???????????????! <a id="closePopupBtn" class="flow-close-type-1"></a>
										</div>
										<div id="coInfo" class="flow-content" align="center">
											<ul class="content-company" align="center" style="display:inline-block; width: 350px">
												<div id="companyName" class="name"  style="font-size: 20px; margin-top: 10px;">
												????????????:&nbsp;<input type="text" name="joinNum" id="joinNum" style="border: 1px solid gray; font-size: 13px; width: 120px; height: 22px;">
												</div><br/>
											<button type="button" id="join" name="join" style="border: 1px solid gray;
												  border-radius: 5px; width: 80px; height: 25px;">????????????</button>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- /???????????? ?????? -->

					</fieldset>
				
			</div>
		</div>
		<!-- //businessMngrSignUpPopup -->
		<form id="userSuccess" action="home.do" ></form>
		<!-- ????????? ?????? -->
	</div>
	<!-- Page hiding snippet (recommended) -->
	<script>
		var newValue;
	
		$("#emailCheck").mouseover(function(){
			$("#emailModal").css("display","block");
		});
		$("#emailCheck").mouseout(function(){
			$("#emailModal").css("display","none");
		});
		
		$("#emailCheck").click(function(){
			var email = $('input:text[name="email"]').val();
			if(email != ""){
			$('#emailPaste').val(email);
			$.ajax({
				url: "getMailCheck.do?email=" + email,
				type: "get",
				dataType: "json",
				success: function(data){
					var $email = data.email;
					if($email == email){
						alert("?????? ???????????? ??????????????????.")
					}
				},
				error:function(){
					$("#email_ok_Msg").css("display","block");
					$("#email_msg").css("display","none");
					$("#joinTry2").css("display","block");
					$("#joinTry1").css("display","none");
					$("#emailCheck").css("display","none");
					$("#emailCheckOk").css("display","block");
					$("<input type=\'hidden\' id=\'emailPaste\'>")
					
					$("#email").off("propertychange change keyup paste input")
					$("#email").on("propertychange change keyup paste input",function(){
						if($("#email").val()!=$('#emailPaste').val()){
							$("#joinTry2").css("display","none");
							$("#joinTry1").css("display","block");
							$("#emailCheck").css("display","block");
							$("#emailCheckOk").css("display","none");
							$("#email_msg").css("display","block");
							$("#email_ok_Msg").css("display","none");
						}

					});
				}
			});
			}else{
				alert("???????????? ???????????????");
			}
			
		});

		$("#joinSuccess").on("click", function() {
			if ($('#email').val() == "") {
				alert("???????????? ???????????????")
				
			}else if ($('#name').val() == "" ){
				alert("????????? ???????????????")
				
			}else if ($('#pwd').val() != $('#pwdCheck').val()|| $('#pwd').val() == ""){
				alert("??????????????? ????????? ???????????????")
				
			}else {
				var email = $('input:text[name="email"]').val();
				$.ajax({
					url: "getMailCheck.do?email=" + email,
					type: "get",
					dataType: "json",
					success: function(data){
						alert("??????")
					},
					error: function(){
						postMail();
					}

				});
			};
		});

		function postMail(){
			$('#checkJoinPopup').attr("class","flow-all-background-1");
			var email = $("#email").val();
			$.ajax({
				type : "post",
				url : "joinMail.do",
				data : {"email" : email},
				/* dataType : "json", */
				success: function(key){
					
					alert(email + "??? ??????????????? ?????????????????????.");
					isCertification = true;
					
					$("#joinNum").off("change keyup paste");
					$("#joinNum").on("change keyup paste", function(){
						if($("#joinNum").val() == key){
							$("#request").append("<li class='url'/>").text("??????");
							isCertification = true;
							$("#join").off("click");
							$("#join").on("click",function(){
								memberInsert();	
							});
						}else{
							$("#request").append("<li class='url'/>").text("?????????");
							isCertification = false;
							$("join").on("click", function(){
								alert("??????????????? ???????????????.");
							})
						}
					})
				}
			});
		};
		
		function memberInsert() {
			var email = $('input:text[name="email"]').val();
			var name = $('input:text[name="name"]').val();
			var pwd = $('input:password[name="pwd"]').val();
			var coUrl = $('#coUrl').val();
			$.ajax({
				url : "exCompanyInsert.do",
				method : "post",
				/* data:JSON.stringify($("#frm").serializeObject()), */
				data : JSON.stringify({
					email : email,
					name : name,
					pwd : pwd,
					coUrl : coUrl
				}),
				contentType : "application/json",
				dataType : "json",
				success : function(data) {
					alert("???????????? ???????????????")
					userSuccess.submit();
				}

			})

		}
		

		$('#closePopupBtn').on("click", function(){
			$('#checkJoinPopup').attr("class","flow-all-background-1 d-none");
		})
		
	</script>
</body>
