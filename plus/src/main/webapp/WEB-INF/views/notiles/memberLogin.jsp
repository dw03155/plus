<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="business-signup-layer">


		<div id="enterpriseLoginDiv" class="pc-login-wrap"
			style="display: block;">

			<div class="f-login-wrap">
				<!-- content -->
				<div class="fl-content">



					<div class="" style="margin-top: -20px; margin-bottom: 80px;">
						<div class="font-Noto"
							style="font-size: 48px; font-weight: 200; color: #111;"
							data-langcode="H390">임직원 로그인</div>
					</div>


					<form action="">
						<fieldset>
							<input name="userName" type="hidden" /> <input name="prflPhtg"
								type="hidden" /> <input name="kakaoEmail" type="hidden" />
							<legend data-langcode="H391">로그인할 이메일, 비밀번호 입력</legend>
							<div class="input-box-style">

								<!-- 입력전 -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H394">아이디</label>
									<div class="inputbox">
										<input type="text" tabindex="2" name="email" maxlength="50"
											placeholder="아이디 입력" value="" data-langcode="H394">
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
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H362">비밀번호</label>
									<div class="inputbox">
										<input type="password" tabindex="3" name="password"
											maxlength="50" placeholder="비밀번호 입력" value=""
											data-langcode="H399">
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
								<button type="button" name="loginBtn"
									class="btn-bigs c-flow c-gray" data-langcode="H76">로그인</button>
								<div class="form-chk fc_red" id="errorMsg"
									style="display: none;" data-langcode="H389">비밀번호는 영숫자 조합의
									6자리 이상이어야 합니다.</div>
								<div class="form-chk">
									<label><input id="autoLoginCheckbox" type="checkbox"><span
										data-langcode="H365">자동로그인</span></label>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>