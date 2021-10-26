<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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

<meta name="url" content="https://flow.team/main.act">
<meta name="conn" content="">

<meta name="theme-color" content="#5f5ab9">

<title>플로우(flow) - 대한민국 No.1 올인원 협업툴</title>
<meta name="description"
	content="프로젝트관리, 업무관리, 메신저, 화상회의, 파일공유&amp;보관, 간트차트, 일정관리까지! 재택근무, 원격근무, 리모트워크, 비대면 업무환경을 구축해 보세요. 지금 무료로 시작하세요.">
<meta name="keywords"
	content="프로젝트관리, 업무관리, 사내메신저, 업무메신저, 업무용메신저, 기업메신저, 기업메신져, 협업, 협업툴, 협업툴추천, 협업툴순위, 국내협업툴, 협업도구, 협업툴비교, 일정관리, 업무관리, 그룹웨어, 스마트워크, 리모트워크, 바우처, 바우처지원, 중소기업바우처, 중소기업지원사업, 비대면바우처">

<meta property="og:url" content="https://flow.team/main.act">
<meta property="og:title" content="플로우(flow) - 대한민국 No.1 올인원 협업툴">
<meta property="og:type" content="website">
<meta property="og:description"
	content="프로젝트관리, 업무관리, 메신저, 화상회의, 파일공유&amp;보관, 간트차트, 일정관리까지! 재택근무, 원격근무, 리모트워크, 비대면 업무환경을 구축해 보세요. 지금 무료로 시작하세요.">
<meta property="og:image"
	content="https://flow.team/design2/homepage_2019/img/flow_meta_V2.png">

<meta name="author" content="Madras check">
<meta name="subject" content="work tool">
<meta name="copyright" content="Madras check">
<meta name="content-language" content="ko">
<meta property="og:locale" content="ko_KR">

<link rel="canonical" href="https://flow.team/main.act">
<link rel="SHORTCUT ICON" href="/design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="/design2/favicon.ico">

<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="https://flow.team/main.act">
<meta name="twitter:title" content="플로우(flow) - 대한민국 No.1 올인원 협업툴">
<meta name="twitter:description"
	content="프로젝트관리, 업무관리, 메신저, 화상회의, 파일공유&amp;보관, 간트차트, 일정관리까지! 재택근무, 원격근무, 리모트워크, 비대면 업무환경을 구축해 보세요. 지금 무료로 시작하세요.">
<meta name="twitter:image"
	content="https://flow.team/design2/homepage_2019/img/flow_meta_V2.png">

<meta name="google-play-app"
	content="app-id=com.webcash.bizplay.collabo">
<meta name="apple-itunes-app" content="app-id=939143477">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<meta itemprop="image"
	content="https://flow.team/design2/homepage_2019/img/flow_meta_V2.png">
<meta property="og:site_name" content="플로우(flow) - 대한민국 No.1 올인원 협업툴">
<meta property="fb:app_id" content="1491712834464733">


<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">


<script async=""
	src="https://apis.google.com/js/platform.js?google-drive"
	gapi_processed="true"></script>
<script async="" src="https://www.dropbox.com/static/api/2/dropins.js"
	id="dropboxjs" data-app-key="mby426ffrxlv4qn"></script>
<script async=""
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw&amp;libraries=places"
	charset="UTF-8"></script>
<script type="text/javascript"
	src="https://t1.daumcdn.net/cssjs/common/cts/vr200/dcts.js"></script>
<script src="https://t1.kakaocdn.net/cts/__dcts__.js"></script>
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
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>

</head>
<body>
	<div id="companyJoinLayer" class="">
		<div class="upgrade-singup-header">
			<a href="http://" class="logo"> <img
				src="flow-renewal/assets/images/flow_logo_small.png">
			</a>
		</div>
		
		<div id="for" align="center">

		<div id="joinFrm" style="display: block;">
			<h1>회원가입</h1>
			<div>
				<form action="exCompanyInsert.do" name="frm" id="frm">
					<table>
						<tr>
							<th>이메일</th>
							<td><input type="text" id="email" name="email"></td>
						</tr>
						<tr>
							<th>이름</th>
							<td><input type="text" id="name" name="name"></td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td><input type="password" id="pwd" name="pwd"></td>
						</tr>
						<tr>
							<th>비밀번호 확인</th>
							<td><input type="password" id="pwdCheck" name="pwdCheck">
								<font name="check" size="2" color="red"></font></td>
						</tr>
					</table>
							<input type="hidden" id="coUrl" name="coUrl" value="${exUrl}">
					<div>
						<button type="button" id="joinBtn" name="btn">이동</button>
					</div>
				</form>
			</div>
		</div>
	</div>

		<div id="companyWaitJoinLayer" class="upgrade-singup-wrap d-none">
			<div class="accont-wrap">
				<div class="flow-account" id="waitCompanyName"></div>
				<div class="join-text-bold" id="waitCompanyUrl"></div>
				<div class="join-basic-wrap">
					<div class="join-backgroundimage"></div>
					<div class="guest-singup-complete">
						<em> 관리자에게 가입요청 중입니다. </em>
						<p>관리자 검토 후, 승인 완료 시 접속 가능합니다.</p>
					</div>
					<a href="#" class="join-start-button">메인 페이지 이동</a>
				</div>
			</div>
		</div>

	</div>
	<script>
	$(function() {
		$('#pwd').keyup(function() {
			$('font[name=check]').text('');
		}); //#user_pass.keyup

		$('#pwdCheck').keyup(function() {
			if ($('#pwd').val() != $('#pwdCheck').val()) {
				$('font[name=check]').text('');
				$('font[name=check]').css("color", "red")
				$('font[name=check]').html("암호틀림");
			} else {
				$('font[name=check]').text('');
				$('font[name=check]').css("color", "green")
				$('font[name=check]').html("암호맞음");
			}
		}); //#chpass.keyup 

		$("#joinBtn").on("click", function(e) {
			if ($('#pwd').val() != $('#pwdCheck').val()) {
				alert("비밀번호를 바르게 입력하세요")
			} else {
				exMemberInsert();
				$('#for').css("display", "none");
				$('#companyWaitJoinLayer').attr("class", "upgrade-singup-wrap")
			}
		});//memberInsert입력
	});

	function exMemberInsert() {
		var email = $('input:text[name="email"]').val();
		var name = $('input:text[name="name"]').val();
		var pwd = $('input:password[name="pwd"]').val();
		var coUrl = $('input:hidden[name="coUrl"]').val();
		$.ajax({
			url : "exCompanyInsert.do",
			method : "post",
			/* data:JSON.stringify($("#frm").serializeObject()), */
			data : JSON.stringify({
				email : email,
				name : name,
				pwd : pwd,
				coUrl : coUrl
			}),
			contentType : "application/json",
			dataType : "json",
			success : function(data) {
				console.log(data);
				frm.submit();

			}

		})

	}
		
	</script>
</body>
</html>
















