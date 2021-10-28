<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex">

<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="conn" content="">
<meta name="theme-color" content="#5f5ab9">

<!-- 타이틀 고치기 -->
<title>플로우(flow) - 대한민국 NO.1 올인원 협업툴</title>

<!-- url 전송시 뜨는 제목, 이미지, 설명 -->
<meta property="og:url" content="https://flow.team/login.act">
<meta property="og:title" content="플로우(flow) - 대한민국 NO.1 올인원 협업툴">
<meta property="og:type" content="website">
<meta property="og:description"
	content="프로젝트관리, 업무관리, 메신저, 화상회의, 파일공유&보관, 간트차트, 일정관리까지! 재택근무, 원격근무, 리모트워크, 비대면 업무환경을 구축해 보세요. 지금 무료로 시작하세요.">
<meta property="og:image"
	content="https://flow.team/design2/homepage_2019/img/flow_meta_V2.png">
<meta property="og:locale" content="ko_KR" />
<meta property="og:site_name" content="플로우(flow) - 대한민국 NO.1 올인원 협업툴">

<meta name="subject" content="work tool">
<meta name="content-language" content="ko">

<link rel="SHORTCUT ICON" href="design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="design2/favicon.ico">

<script type="text/javascript" src="js/lib/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jex/jex.core.js"></script>
<script type="text/javascript" src="js/commCustom/contents.custom.js"></script>
<script type="text/javascript" src="js/jexPlugin/jex.loading2.js"></script>
<script type="text/javascript" src="js/gibberish-aes.js"></script>
<script type="text/javascript" src="js/jquery.i18n.properties.js"></script>


<link href="https://fonts.googleapis.com/css?family=Roboto"
	rel="stylesheet" type="text/css">
<script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<!-- oauth -->
<script src="https://apis.google.com/js/api:client.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script><!-- 카톡 링크 공유? -->



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

<script type="text/javascript" src="js/collabo/login.js"></script>
<script type="text/javascript" src="js/collabo/flow_upgrade.js"></script>
<script type="text/javascript" src="js/collabo/flow_iamport_payment.js"></script>
<script type="text/javascript" src="js/collabo/inc/polyfill_IE.js"></script>
<!-- IE호환 -->
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
</style>
</head>
<body>
	<div class="business-signup-layer">

		<div class="pc-login-wrap" id="changePassword" style="display: block;">
			<!-- pc class="pc-login-wrap" -->

			<div class="f-login-wrap">
				<!-- content -->
				<div class="fl-content">
					<!-- 전체메시지 -->
					<div class="flk-msg-wrap">
						<h3 class="font-Noto" data-langcode="H376">비밀번호 변경</h3>
						<h4 class="font-Noto"></h4>
					</div>
					<!-- //전체메시지 -->

					<form action="">
						<fieldset>
							<input name="userName" type="hidden" /> <input name="prflPhtg"
								type="hidden" /> <input name="kakaoEmail" type="hidden" />
							<legend data-langcode="H377">변경할 비밀번호 입력</legend>
							<div class="input-box-style">
								<!-- 입력전 -->
								<div class="blocklabel">
									<label for="password1" class="font-Noto" data-langcode="H378">변경
										비밀번호</label>
									<div class="inputbox">
										<input type="password" id="password1" class="password-input"
											maxlength="" placeholder="비밀번호" value="" data-langcode="H362">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H449">
												비밀번호가 일치하지 않습니다..</div>
										</div>
									</div>
								</div>
								<!-- error -->
								<div class="blocklabel">
									<label for="password2" class="font-Noto" data-langcode="H383">비밀번호
										확인</label>
									<div class="inputbox">
										<input type="password" id="password2" class="password-input"
											maxlength="" placeholder="비밀번호 확인" value=""
											data-langcode="H383">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H449">
												비밀번호가 일치하지 않습니다.</div>
										</div>
									</div>
								</div>
							</div>

							<div class="btn-box login-btn">
								<button type="button" class="btn-bigs c-gray" id="pwdChangeBtn"
									data-langcode="H376">비밀번호 변경</button>
								<div class="form-chk fc_red" style="display: none;"
									data-langcode="H389">비밀번호는 영숫자 조합의 6자리 이상이어야 합니다.</div>
							</div>
						</fieldset>
					</form>
				</div>
				<!-- //content -->
			</div>
		</div>
	</div>
</body>
</html>