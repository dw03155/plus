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

				<!-- 게스트로그인 layerpopup -->
				<!--  <div
					style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0.5; filter: alpha(opacity = 50); z-index: 2000; display: block;"
					id="guestLoginDivModal"></div> -->
				<!-- modal -->

				<div class="geust_login_pop" id="guestLoginDiv"
					style="width: 500px; z-index: 2200; display: block; border: 1px solid #efefef">
					<div class="geust_login_wrap">
						<h1 class="font-Noto tit" data-langcode="H412">회사정보 확인 후
							시작하세요!</h1>
						<div class="compinfo">
							<img src="" alt="" style="height: 60px;">
							<h2 class="font-Noto" data-langcode="H413"></h2>
							<h3>http://flow.team</h3>
						</div>
						<form action="">
							<fieldset>
								<legend>로그인 계정 선택</legend>
								<div class="snsbtn">

									<a class="google" id="googleLogin" data-langcode="H369">Google
										계정으로 시작</a> <a class="kakao" id="kakaoLogin" data-langcode="H409">Kakao
										계정으로 시작</a> <a class="apple" data-langcode="AA0165">Apple 계정으로
										시작</a>

								</div>
							</fieldset>
						</form>
						<button class="closebtn">
							<span class="blind" data-langcode="H417">닫기</span>
						</button>
					</div>
				</div>
				<!-- //게스트로그인 layerpopup -->
			</div>
		</div>
	</div>
</body>
</html>