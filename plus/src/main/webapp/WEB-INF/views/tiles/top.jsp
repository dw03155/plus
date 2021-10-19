<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<header class="header">
		<div id="rightTopMenu" class="top-btns">
			<button type="button" id="organizationTopButton"
				class="btn-organization js-mouseover
            js-button-tooltip"
				mouseover-text="조직도">
				<i class="icon-organization"></i>
			</button>
			<button type="button" id="chattingTopButton"
				class="btn-chatting js-mouseover
            js-button-tooltip"
				mouseover-text="채팅">
				<i class="icon-chatting"></i> <i id="chatTopCount"
					class="label-chat d-none"></i>
			</button>
			<button type="button" id="alarmTopButton"
				class="btn-alarm js-mouseover
            js-button-tooltip"
				mouseover-text="알림">
				<i class="icon-alarm"></i> <i id="alarmTopCount" class="label-alarm"
					style="display: none"></i>
			</button>
			<button type="button" id="accountTopButton" class="btn-profile">
                <span id="ProfileImg" class="profile-area" style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></span>
            </button>
		</div>
		<ul id="accountLayer" class="modal-account d-none">
			<li class="user-area">
				<p class="js-profile user-img" style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></p>
				<div class="user-info">
					 <strong class="js-user-name js-mouseover">cyr</strong> <span>이용중</span>
				</div>
			</li>

			<li class="user-status"><i class="icon-status"></i> 상태 변경</li>
			<li id="topProfile" class="user-profile"><i
				class="icons-person-3"></i> 내 프로필</li>
			<li id="mySettingOpenBtn"><i class="icons-set"></i> 환경설정</li>
			<li id="logoutBtn"><i class="icons-logout"></i> 로그아웃</li>
		</ul>
	</header>
</body>
</html>