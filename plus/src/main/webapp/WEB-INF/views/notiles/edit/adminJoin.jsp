<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>



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
				<form action="">
					<fieldset style="padding-bottom: 30px;">
						<!-- business sign in content -->
						<div class="fl-content" id="businessCreateAccount"
							style="padding-top: 50px;">

							<!-- 전체메시지 -->
							<div class="flk-msg-wrap">
								<h3 class="font-Noto" data-langcode="H463">관리자 계정을 생성하세요</h3>
								<h4 class="font-Noto">
									<span data-langcode="H486">아래 정보들을 입력 후, 플러스 관리자로 시작할 수
										있습니다.</span><br class="block"> <span style="color: #4c80d6;"
										data-langcode="H487">URL 주소는 직원들을 초대할 때 이용할 수 있습니다.</span>
								</h4>
							</div>
							<!-- //전체메시지 -->

							<!-- <legend data-langcode="H467">비즈니스 계정 이메일, 이름, 비밀번호 입력</legend> -->
							<div class="input-box-style">
								<!-- 입력전 -->
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H333">이메일</label>
									<div class="inputbox">
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
									<div class="inputbox">
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
									<div class="inputbox">
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
									<div class="inputbox">
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
								
								<div class="blocklabel">
									<label class="font-Noto" data-langcode="H489">회사 이름</label>
									<div class="inputbox">
										<input type="text" id="teamName" tabindex="11" maxlength="50"
											placeholder="회사 이름 입력" value="" data-langcode="H490">
										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H491">
												회사 이름을 확인해 주세요 (특수문자 사용불가)</div>
										</div>
									</div>
								</div>
								<!-- ok -->
								<div class="blocklabel url-box">
									<label class="font-Noto" data-langcode="H492">회사 URL</label>
									<div class="inputbox" style="width: 290px">
										<input type="text" id="teamUrl" tabindex="12" maxlength=""
											placeholder="URL 주소 입력" value="" style="width: 100%;"
											data-langcode="H493"> <strong id="domain"
											style="position: absolute; left: 300px; top: 20px; font-size: 18px;">.flow.team</strong>

										<button type="button" class="btn-ok-text" data-langcode="H359">확인</button>
										<button type="button" class="btn-clear-text"
											style="cursor: pointer;" data-langcode="H381">삭제</button>
										<!-- 메시지 -->
										<div class="error-msg">
											<div class="error-cont font-Noto" data-langcode="H494">3
												~ 50자의 영문, 숫자만 가능합니다.</div>
										</div>
									</div>
								</div>


								<div id="errorMsg" style="display: none;">
									<span style="color: red; font-size: 12px;" data-langcode="H498">오류!</span>
								</div>

								<!-- 약관동의체크 -->
								<div class="terms-check">
									<input type="checkbox" tabindex="5" id="agreeWithTheTerms">
									<span class="terms-and-privacy"></span>

								</div>
							</div>
							<div class="btn-box">
								<button type="button" id="nextToSettingTeamInfo"
									class="btn-bigs c-gray" data-langcode="H482">회원가입</button>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
		<!-- //businessMngrSignUpPopup -->

	</div>
	<!-- Page hiding snippet (recommended) -->
</body>
</html>