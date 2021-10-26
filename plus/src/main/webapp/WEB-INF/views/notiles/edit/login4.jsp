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

		<div id="businessLoginDiv" class="pc-login-wrap"
			style="display: none;">


			<div class="f-login-wrap" style="display: none;" id="signUpBox">

				<!-- content -->

				<div class="fl-content"
					style="padding-top: 100px; background-color: white;">

					<!-- ci -->

					<div class="ci-wrap">


						<h2 class="font-Noto"></h2>

						<p class="font-Noto">http://flow.team</p>
					</div>
					<!-- //ci -->

					<form action="">
						<fieldset>
							<legend data-langcode="H391">로그인할 이메일, 비밀번호 입력</legend>
							<div class="input-box-style">
								<!-- 입력전 -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H333">이메일</label>

									<div class="inputbox">
										<input type="text" name="email" tabindex="1" maxlength="50"
											placeholder="example@gmail.com" value="">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H440">이메일을
												입력해주세요.</div>
										</div>
									</div>
								</div>
								<!-- error -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H331">이름</label>
									<div class="inputbox">
										<input type="text" name="name" tabindex="2" maxlength="50"
											placeholder="이름 입력" value="" data-langcode="H442">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H443">
												이름을 입력해 주세요 (특수문자 사용불가)</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H362">비밀번호</label>
									<div class="inputbox">
										<input type="password" name="password" tabindex="3"
											maxlength="50" placeholder="비밀번호" value=""
											data-langcode="H362">
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
								<!-- ok -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H383">비밀번호 확인</label>
									<div class="inputbox">
										<input type="password" name="passwordCheck" tabindex="4"
											maxlength="50" placeholder="비밀번호 확인" value=""
											data-langcode="H359">
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


								<!-- 약관동의체크 -->
								<div class="terms-check">
									<input type="checkbox" id="confBox"> <a
										href="/terms.act" target="flowTem" data-langcode="H1857">서비스
										이용약관,</a>&nbsp;<a href="/privacy.act" target="flowTem"
										data-langcode="H85">개인정보취급방침</a> <span data-langcode="H452">을
										확인하였고, 이에 동의합니다.</span>
									<!-- 약관 및 개인정보 취급방침 동의가 필요합니다. -->
								</div>
							</div>

							<div class="btn-box">
								<button type="button" id="signUpBtn" class="btn-bigs c-gray"
									data-langcode="H77">회원가입</button>
							</div>
							<!-- 20170914 추가 -->
							<div class="btn-ft-fix">
								<strong style="font-size: 16px; text-decoration: underline;"><span
									data-langcode="H454">이미 계정이 있으신가요?</span> <a
									id="businessLoginLink" class="fc_blue" data-langcode="H76">로그인</a></strong>
							</div>
							<!-- //20170914 추가 -->

							<!-- <a id="businessLoginLink" style="margin-top: 15px;display: block;text-decoration-line: underline;font-size: 20px;font-weight: 300;">이미 계정이 있으신가요? <span style="color: rgb(3, 169, 244);">로그인</span></a> -->
						</fieldset>
					</form>
				</div>
				<!-- //content -->
			</div>
		</div>
	</div>
</body>
</html>