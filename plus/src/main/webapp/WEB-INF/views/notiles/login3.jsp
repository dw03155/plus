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
			<div class="fl-header-wrap">
				<!-- header -->

				<div class="fl-header">
					<h1>
						<a href="https://flow.team"><img id="headerLogoImg1"
							src="design2/img_login/bi_flow.png" style="cursor: pointer;"
							alt="flow"></a>
					</h1>
				</div>

				<!-- //header -->
			</div>
			<!-- //top -->

			<div class="f-login-wrap mCustomScrollbar" id="loginBox">

				<!-- content -->
				<div class="fl-content">
					<!-- ci -->
					<div class="ci-wrap">

						<h2 class="font-Noto"></h2>

						<p class="font-Noto">http://flow.team</p>
					</div>
					<!-- //ci -->

					<form action="">
						<fieldset style="padding-bottom: 30px;">
							<legend data-langcode="H391">로그인할 이메일, 비밀번호 입력</legend>
							<div class="input-box-style">
								<!-- 입력전 -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H361">아이디</label>
									<div class="inputbox">
										<input type="text" name="email" tabindex="1" maxlength="50"
											placeholder="아이디입력" value="" data-langcode="H394">
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
									<label class="font-Noto" data-langcode="H362">비밀번호</label>
									<div class="inputbox">
										<input type="password" name="password" tabindex="2"
											maxlength="50" placeholder="비밀번호 입력" data-langcode="H399">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H402">
												6자 이상의 영문, 숫자를 입력하세요.</div>
										</div>
									</div>
								</div>
							</div>

							<div class="btn-box login-btn">
								<button type="button" class="btn-bigs c-gray" name="loginBtn"
									data-langcode="H76">로그인</button>
								<div class="form-chk fc_red" id="errorMsg"
									style="display: none;" data-langcode="H433">올바른 이메일 주소를
									입력하시기 바랍니다.</div>

								<div class="form-chk">
									<label><input type="checkbox"><span
										data-langcode="H365">자동로그인</span></label>
								</div>


								<!-- 20170914 추가 -->

								<div class="btn-ft-fix">
									<a id="businessSignUpLink"><strong
										style="font-size: 16px; text-decoration: underline;">&nbsp;<span
											data-langcode="H435">가입하기</span></strong></a>
								</div>
								<!-- //20170914 추가 -->


							</div>
						</fieldset>
					</form>
				</div>
				<!-- //content -->
			</div>
</body>
</html>