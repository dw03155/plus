<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="url" content="flow-renewal/main.act">
<meta name="conn" content="">

<meta name="theme-color" content="#5f5ab9">

<meta property="og:url" content="https://flow.team/main.act">
<meta property="og:title" content="플로우(flow) - 대한민국 No.1 올인원 협업툴">
<meta property="og:type" content="website">

<meta name="author" content="Madras check">
<meta name="subject" content="work tool">
<meta name="copyright" content="Madras check">
<meta name="content-language" content="ko">
<meta property="og:locale" content="ko_KR">

<link rel="canonical" href="https://flow.team/main.act">
<link rel="SHORTCUT ICON" href="design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="design2/favicon.ico">

<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">

<script
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw&amp;libraries=places"
	charset="UTF-8"></script>
<style type="text/css">
@
-webkit-keyframes rotate {from { -webkit-transform:rotate(0deg);
	
}

to {
	-webkit-transform: rotate(360deg);
}

}
@
keyframes rotate {from { transform:rotate(0deg);
	
}

to {
	transform: rotate(360deg);
}

}
.dropbox-dropin-btn, .dropbox-dropin-btn:link, .dropbox-dropin-btn:hover
	{
	display: inline-block;
	height: 14px;
	font-family: "Lucida Grande", "Segoe UI", "Tahoma", "Helvetica Neue",
		"Helvetica", sans-serif;
	font-size: 11px;
	font-weight: 600;
	color: #636363;
	text-decoration: none;
	padding: 1px 7px 5px 3px;
	border: 1px solid #ebebeb;
	border-radius: 2px;
	border-bottom-color: #d4d4d4;
	background: #fcfcfc;
	background: -moz-linear-gradient(top, #fcfcfc 0%, #f5f5f5 100%);
	background: -webkit-linear-gradient(top, #fcfcfc 0%, #f5f5f5 100%);
	background: linear-gradient(to bottom, #fcfcfc 0%, #f5f5f5 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc',
		endColorstr='#f5f5f5', GradientType=0);
}

.dropbox-dropin-default:hover, .dropbox-dropin-error:hover {
	border-color: #dedede;
	border-bottom-color: #cacaca;
	background: #fdfdfd;
	background: -moz-linear-gradient(top, #fdfdfd 0%, #f5f5f5 100%);
	background: -webkit-linear-gradient(top, #fdfdfd 0%, #f5f5f5 100%);
	background: linear-gradient(to bottom, #fdfdfd 0%, #f5f5f5 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fdfdfd',
		endColorstr='#f5f5f5', GradientType=0);
}

.dropbox-dropin-default:active, .dropbox-dropin-error:active {
	border-color: #d1d1d1;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
}

.dropbox-dropin-btn .dropin-btn-status {
	display: inline-block;
	width: 15px;
	height: 14px;
	vertical-align: bottom;
	margin: 0 5px 0 2px;
	background: transparent
		url('https://www.dropbox.com/static/images/widgets/dbx-saver-status.png')
		no-repeat;
	position: relative;
	top: 2px;
}

.dropbox-dropin-default .dropin-btn-status {
	background-position: 0px 0px;
}

.dropbox-dropin-progress .dropin-btn-status {
	width: 18px;
	margin: 0 4px 0 0;
	background:
		url('https://www.dropbox.com/static/images/widgets/dbx-progress.png')
		no-repeat center center;
	-webkit-animation-name: rotate;
	-webkit-animation-duration: 1.7s;
	-webkit-animation-iteration-count: infinite;
	-webkit-animation-timing-function: linear;
	animation-name: rotate;
	animation-duration: 1.7s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

.dropbox-dropin-success .dropin-btn-status {
	background-position: -15px 0px;
}

.dropbox-dropin-disabled {
	background: #e0e0e0;
	border: 1px #dadada solid;
	border-bottom: 1px solid #ccc;
	box-shadow: none;
}

.dropbox-dropin-disabled .dropin-btn-status {
	background-position: -30px 0px;
}

.dropbox-dropin-error .dropin-btn-status {
	background-position: -45px 0px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.4) {
	.dropbox-dropin-btn .dropin-btn-status {
		background-image:
			url('https://www.dropbox.com/static/images/widgets/dbx-saver-status-2x.png');
		background-size: 60px 14px;
		-webkit-background-size: 60px 14px;
	}
	.dropbox-dropin-progress .dropin-btn-status {
		background:
			url('https://www.dropbox.com/static/images/widgets/dbx-progress-2x.png')
			no-repeat center center;
		background-size: 20px 20px;
		-webkit-background-size: 20px 20px;
	}
}

.dropbox-saver:hover, .dropbox-chooser:hover {
	text-decoration: none;
	cursor: pointer;
}

.dropbox-chooser, .dropbox-dropin-btn {
	line-height: 11px !important;
	text-decoration: none !important;
	box-sizing: content-box !important;
	-webkit-box-sizing: content-box !important;
	-moz-box-sizing: content-box !important;
}
</style>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/common.js"></script>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/util.js"></script>
</head>
<body>
	<div id="miniLock" style="display: block">
		<div class="mini-mode-wrap">
			<div class="mini-mode-background-type-1">
				<div class="mini-mode-logo-icon-1"></div>
				<div class="mini-mode-wrap-2">
					<div class="mini-mode-wrap-3">
						<i class="icons-lock"></i>
					</div>
					<div class="mini-mode-wrap-4">
						<div class="mini-mode-picture-1 mini-lock-profile"></div>
					</div>
					<div class="mini-mode-wrap-5">
						<span class="mini-lock-userNm"></span>
					</div>
				</div>
				<div class="mini-mode-login-section-1">
					<div class="mini-mode-password-wrap-1">
						<input type="password" id="miniPassInput"
							class="mini-mode-password-1 js-join-input" placeholder="비밀번호"
							data-valid="login-password" autocomplete="current-password"
							maxlength="20" data-required-yn="Y"
							data-empty-msg="비밀번호를 입력해주세요!" data-over-msg="비밀번호가 20자가 넘으셨습니다!"
							data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
							data-login-err-msg="비밀번호를 확인해 주세요." value="">
						<div id="pwdViewBtn" class="mini-mode-eye-icon-1"
							style="display: none"></div>
					</div>
					<span id="miniLockErrorMsg" class="mini-mode-text-position-fix"></span>
					<div id="miniConfirmBtn" class="mini-mode-button-type-1">확인</div>
				</div>

				<div id="miniLockLogoutBtn"
					class="mini-mode-button-type-1 trans-background-button-type-1">로그아웃</div>
			</div>
		</div>
	</div>
</body>
</html>