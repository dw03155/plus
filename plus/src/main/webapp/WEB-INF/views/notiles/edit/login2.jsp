<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<!-- top -->

	<div class="signup_top">


		<a href="/index.act"><img src="img_rn/memb2/bi_flow.png"
			alt="flow"></a>
		<h2 id="title" data-langcode="H76">로그인</h2>
		<div class="right_btn">
			<a id="topId" class="on" data-langcode="H76">로그인</a>
		</div>


	</div>
	<!-- //top -->
	
	<div id="main" class="signup_box">

		<div class="login_fieldset">
			<ul>
				<li id="REG_1" style="display: none;"><input id="USER_NM"
					type="text" placeholder="이름" data-langcode="ui.name"> <span
					id="USER_NM_CHK" class="ico_chk"></span></li>
				<li><input id="USER_ID" type="text" placeholder="이메일 또는 아이디"
					value="" spellcheck="false" data-langcode="H361"> <span
					id="USER_ID_CHK" class="ico_chk"></span></li>
				<li><input id="PWD" class="password-input" type="password"
					placeholder="비밀번호" data-langcode="H362"> <span
					class="password-mask"><em class="blind">비밀번호 보이기 / 숨기기
							버튼 </em></span> <span id="PWD_CHK" class="ico_chk"></span></li>
				<input id="PRFL_PHTG" type="hidden" />
				<input id="KAKAO_EMAIL" type="hidden" />
			</ul>
			<div id="REG_2" style="display: none; margin-bottom: 30px;">
				<input id="CONF_BOX" type="checkbox"> <span
					class="terms-and-privacy"></span> <span lang="en"
					style="display: none">&nbsp;I agree to</span> <a href="/terms.html"
					target="flowTem" class="txt_b" data-langcode="H536"> 서비스 이용약관</a> <span
					data-langcode="H537"> 및 </span> <a href="/privacy.html"
					target="flowTem" class="txt_b" data-langcode="H85">개인정보 취급방침</a><span
					lang="df">에 동의합니다.</span>
			</div>
			<div class="error_txt" style="display: none; margin-bottom: -10px;"
				data-langcode="H364">이메일주소를 확인할 수 없습니다. 다시 확인해주세요.</div>
			<div id="AUTO_LOGIN" style="display: block; margin-bottom: 60px;">

				<input id="AUTO_BOX" type="checkbox">&nbsp;<span
					data-langcode="H365">자동 로그인</span>

			</div>
			<a class="signup_btn_st1" data-langcode="H76">로그인</a>
		</div>
		<div id="REG_3" class="forgot_pw">
			<a data-langcode="H372">비밀번호를 잊어버리셨나요?</a>
		</div>
		<div class="line_through">
			<span><em data-langcode="H367">또는</em></span>
		</div>
		<ul class="another_id">
			<li class="google" id="customBtn"><span data-langcode="H369">Google
					계정으로 시작</span></li>
			<li id="kakao-login-btn" class="kakao"><span
				data-langcode="H409">Kakao 계정으로 시작</span></li>

			<li class="apple"><span data-langcode="AA0165">Apple 계정으로
					시작</span></li>
		</ul>
	</div>
	
	<div id="sub" class="signup_wrap" style="display: none;">
		<h1 data-langcode="H372">비밀번호를 잊어버리셨나요?</h1>
		<p data-langcode="H373">기존에 가입하신 이메일을 입력하시면, 비밀번호변경 메일을 발송해드립니다.</p>
		<div class="signup_box">
			<div class="login_fieldset">
				<ul>
					<li><input id="EMAIL" type="text" maxlength="50"
						placeholder="아이디" value=""> <span id="EMAIL_CHK"
						class="ico_chk"></span></li>
				</ul>
				<div class="error_txt" style="display: none; text-align: left;"
					data-langcode="H374">이메일 형식에 맞지 않습니다.</div>
				<a class="signup_btn_st1" data-langcode="H375">비밀번호 변경메일받기 </a>
			</div>
		</div>
	</div>
	
</body>
</html>