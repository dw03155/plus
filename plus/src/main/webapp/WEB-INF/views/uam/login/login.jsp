<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="theme-color" content="#5f5ab9">

<meta name="author" content="Madras check" >
<meta name="subject" content="work tool" >
<meta name="copyright" content="Madras check" >
<meta name="content-language" content="ko" >
<meta property="og:locale" content="ko_KR" />

<link rel="SHORTCUT ICON" href="/design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="/design2/favicon.ico">

	<script type="text/javascript" src="js/lib/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/jex/jex.core.js?1"></script>
	<script type="text/javascript" src="js/commCustom/contents.custom.js"></script>
	<script type="text/javascript" src="js/jexPlugin/jex.loading2.js"></script>
	<script type="text/javascript" src="js/gibberish-aes.js"></script>
	<script type="text/javascript" src="js/jquery.i18n.properties.js"></script>

	
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
	  	<script src="https://apis.google.com/js/api:client.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

	    <!--
	    <script src="https://apis.google.com/js/api:client.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
		-->
		
        	<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
        
	
	<script type="text/javascript" src="/js/collabo/collabo2019/start_testing.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/open.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/is_condition.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/convert_form.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/valid_check.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/get_value.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/google.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/screen_value.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/used_often.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/base.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/lang_timezone.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/js_draw.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/editor_control.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/lock_control.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/load_opensource.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2019/enter_control.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2020/auth_layer.js"></script>
	<script type="text/javascript" src="/js/collabo/collabo2020/base64.js"></script>

	<script type="text/javascript" src="/js/collabo/login.js"></script>
	<script type="text/javascript" src="/js/collabo/flow_upgrade.js"></script>
	<script type="text/javascript" src="/js/collabo/flow_iamport_payment.js"></script>
	<script type="text/javascript" src="/js/collabo/inc/polyfill_IE.js"></script>							<!-- IE?????? -->
	<link href="design2/css/NotoSansKR-Hestia.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="/design2/css/login_cont.css"/>
	<link rel="stylesheet" href="/design2/css/reset.css"/>
	<link rel="stylesheet" href="/design2/css/contents.css"/>
	<link rel="stylesheet" href="/design2/css/signup.css"/>
	<link rel="stylesheet" href="/design2/css/signup2.css"/>
	<link rel="stylesheet" href="/design2/css/f_login.css"/>
	<link rel="stylesheet" href="/design2/css/f_pay.css"/>

	

	<link rel="stylesheet" href="/design2/css/jquery.mCustomScrollbar.css">
	<script src="design2/js/jquery.mCustomScrollbar.concat.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<style>
	.signup{
		    margin: 280px auto 90px auto;
    		width: 380px;
    		padding: 40px 60px;
		    background-color: #f2f3f4;
	}
</style>
</head>
<body style="overflow: hidden;">
<!-- top -->
	<div class="signup_top">
		<a href="/index.act"><img src="img_rn/memb2/plus_loing.png"
			alt="flow"></a>
		<h2 id="title" data-langcode="H76">?????????</h2>
		<div class="right_btn">
			<a id="joinBTN" class="on" href="companyJoin.do">????????????</a>
		</div>


	</div>
	<!-- //top -->
	
	<div id="main" class="signup">

		<form name="loginForm" action="memberLogin.do" method="post">
		   <div class="login_fieldset">
			<ul>
				<li id="REG_1" style="display: none;"><input id="USER_NM"
					type="text" placeholder="??????" data-langcode="ui.name"> 
					<span id="USER_NM_CHK" class="ico_chk"></span>
				</li>
				<li>
				<input id="email" name="email" type="text" placeholder="?????????"
					value="" spellcheck="false" data-langcode="H361">
					<span id="USER_ID_CHK" class="ico_chk"></span>
				</li>
				<li>
				<input id="pwd" name="pwd" class="password-input" type="password"
					placeholder="????????????" data-langcode="H362"> 
					<span class="password-mask"><em class="blind">???????????? ????????? / ?????????
							?????? </em></span> 
					<span id="PWD_CHK" class="ico_chk"></span>
				</li>
			</ul>
			<div id="REG_2" style="display: none; margin-bottom: 30px;">
				<input id="CONF_BOX" type="checkbox"> <span
					class="terms-and-privacy"></span> <span lang="en"
					style="display: none">&nbsp;I agree to</span> <a href="/terms.html"
					target="flowTem" class="txt_b" data-langcode="H536"> ????????? ????????????</a> <span
					data-langcode="H537"> ??? </span> <a href="/privacy.html"
					target="flowTem" class="txt_b" data-langcode="H85">???????????? ????????????</a><span
					lang="df">??? ???????????????.</span>
			</div>
			<div style="display: none; margin-bottom: -10px;"
				data-langcode="H364">?????????????????? ????????? ??? ????????????. ?????? ??????????????????.</div>
			<div id="AUTO_LOGIN" style="display: block; margin-bottom: 60px;">

				<input id="AUTO_BOX" type="checkbox">&nbsp;<span
					data-langcode="H365">?????? ?????????</span><br/><br/><br/>
					<span id="result" style="color: red">${message }</span>

			</div>
			<button id="loginBtn"  class="signup_btn_st1 on" type="submit">?????????</button>
		  </div>
		 </form>
		<div id="REG_3" class="forgot_pw">
			<!-- <a data-langcode="H372">??????????????? ??????????????????????</a> -->
		</div>
	</div>
	
	<div id="sub" class="signup_wrap" style="display: none;">
		<h1 data-langcode="H372">??????????????? ??????????????????????</h1>
		<p data-langcode="H373">????????? ???????????? ???????????? ???????????????, ?????????????????? ????????? ?????????????????????.</p>
		<div class="signup_box">
			<div class="login_fieldset">
				<ul>
					<li><input id="forgetEmail" type="text" maxlength="50"
						placeholder="?????????" value=""> <span id="EMAIL_CHK"
						class="ico_chk"></span></li>
				</ul>
				<div class="error_txt" style="display: none; text-align: left;"
					data-langcode="H374">????????? ????????? ?????? ????????????.</div>
				<a class="signup_btn_st" data-langcode="H375">???????????? ?????????????????? </a>
			</div>
		</div>
	</div>
	<div>
	</div>
	
	<script>
	
	</script>
</body>
