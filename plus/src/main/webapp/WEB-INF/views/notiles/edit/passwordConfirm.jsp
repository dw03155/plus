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

		<div class="pc-login-wrap" id="changePassword" style="display: none;">
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
												비밀번호가 일치하지 않습니다..</div>
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