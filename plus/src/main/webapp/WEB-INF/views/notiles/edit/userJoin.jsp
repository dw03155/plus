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

		<!-- businessMngrSignUpPopup -->

		<div class="pc-login-wrap" id="businessMngrSignUpPopup"
			style="top: 0px; left: 0px; z-index: 3000;">

			<!-- top -->
			<div class="fl-header-wrap">
				<!-- header -->
				<div class="fl-header">

					<h1>
						<a href="/"><img id="headerLogoImg"
							src="design2/img_login/bi_flow.png" style="cursor: pointer;"
							alt="flow"></a>
					</h1>

				</div>
				<!-- //header -->

			</div>
			<!-- //top -->
			<div class="f-login-wrap mCustomScrollbar"
				style="position: fixed; margin: 0px; padding: 60px 0 0 0; width: 100%; height: 100%;">
				<!-- business sign in content -->
				<div class="fl-content" id="businessCreateAccount"
					style="padding-top: 50px;">

					<!-- 전체메시지 -->
					<div class="flk-msg-wrap">
						<h3 class="font-Noto" data-langcode="H463">플러스 사용자 계정을 생성하세요</h3>
						<h4 class="font-Noto">
							<span data-langcode="H486">아래 정보들을 입력 후, 플러스 사용자로 시작할 수
										있습니다.</span><br class="block">URL 주소는 직원들을 초대할 때 이용할 수 있습니다.<span style="color: #4c80d6;"
										data-langcode="H487"></span>
						</h4>
					</div>
					<!-- //전체메시지 -->

					<form action="">
						<fieldset style="padding-bottom: 30px;">
							<legend data-langcode="H467">비즈니스 계정 이메일, 이름, 비밀번호 입력</legend>
							<div class="input-box-style">
								<!-- 입력전 -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H333">이메일</label>
									<div class="inputbox ok">
										<input type="text" name="email" maxlength="50" tabindex="1"
											placeholder="example@gmail.com" value="" />
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H397">
												이미 사용 중인 이메일주소입니다.</div>
										</div>
									</div>
								</div>
								<!-- error -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H331">이름</label>
									<div class="inputbox ok">
										<input type="text" name="name" tabindex="2" maxlength="50"
											placeholder="이름" value="" data-langcode="H331">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H472">
												이름을 확인해 주세요 (특수문자 사용불가)</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H362">비밀번호</label>
									<div class="inputbox ok">
										<input type="password" name="password" class="password-input"
											maxlength="50" tabindex="3" placeholder="비밀번호 입력" value=""
											data-langcode="H399"> <span class="password-mask"><em
											class="blind">비밀번호 보이기 / 숨기기 버튼 </em></span>
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H402">
												6자 이상의 영문,숫자를 입력하세요.</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H383">비밀번호 확인</label>
									<div class="inputbox ok">
										<input type="password" name="passwordCheck"
											class="password-input" maxlength="50" tabindex="4"
											placeholder="비밀번호 재입력" data-langcode="H477"> <span
											class="password-mask"><em class="blind">비밀번호 보이기
												/ 숨기기 버튼 </em></span>
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H402">
												6자 이상의 영문,숫자를 입력하세요.</div>
										</div>
									</div>
								</div>

								<!-- 약관동의체크 -->
								<div class="terms-check">
									<input type="checkbox" tabindex="5" id="agreeWithTheTerms">
									<span class="terms-and-privacy"></span>
								</div>
							</div>
							<div class="btn-box">
								<button type="button" id="nextToSettingTeam"
									class="btn-bigs c-blue" data-langcode="H482">다음</button>
							</div>
						</fieldset>
					</form>
				</div>
				<!-- // business sign in content -->
			</div>
		</div>
	</div>
</body>
</html>