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
				src="img_rn/memb2/plus_loing.png">
			</a> <a href="home.do" id="closeBtn" class="login-close-button"></a>
		</div>
		
		<!-- 빨간 알람창 -->
		<div id="toastWrap" class="d-none">
        <div class="alert-wrap d-none">
            <div class="alert-type">
                <div class="text"></div>
            </div>
        </div>
    </div>

		<!-- 기존회사참여 -->
		<div id="companyJoinMain" class="login-wrap invite-login">
			<div class="login-text">기존회사 참여</div>
			<div class="login-company">이미 회사에서 플로우를 사용하고 있다면 회사 URL을 입력하여
				함께하세요.</div>
			<div class="join-contents">
				<p class="url-tit">회사 URL</p>
				<div class="url-wr">
					<span>https://</span> 
					<input id="coUrl" name="coUrl" type="text" class="join-input" autocomplete="off" placeholder="회사 URL">
					<!-- 입력 오류 시 .error 클래스 추가 -->
					<span>.plus.team</span>
				</div>
				<p id="errMeg" class="error-text d-none">3~5자 영문, 숫자만 가능합니다.</p>
				<!-- 입력 오류 시 display: block -->
			</div>
			<button id="JoinBtn" class="btn-join">회사 참여하기</button>
		</div>
		<!-- /기존회사참여 -->
		
		<!-- 기존회사정보확인 -->
		<div id="checkJoinPopup" class="flow-all-background-1 d-none">
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="popupLayer" class="flow-login-popup popup-10">
						<div class="flow-project-header-1">
							회사 정보 확인 후 시작하세요! <a id="closePopupBtn"
								class="flow-close-type-1"></a>
						</div>
						<form id="frm">
						<input type="hidden" name="newCoUrl">
						<div id="coInfo" class="flow-content">
							<ul class="content-company">
								<li id="companyLogoUrl" class="logo"></li>
								<li id="companyName" class="name"></li>
								<li id="companyUrl" class="url"></li>
							</ul>
							<button id="joinSubmit1" class="btn-popup01">팀 참여하기</button>
							<button id="joinSubmit2" class="btn-popup01">플러스 생성</button>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- /기존회사정보확인 -->
	</div>
	<script>
		$("#JoinBtn").click(function() {
				var coUrl = $('#coUrl').val();
				if(coUrl == ""){
					alert("URL을 입력하세요");
				}else{
					console.log(coUrl)
					$.ajax({
						url : "getCompany.do?coUrl=" + coUrl,
						type : "get",
						//data:JSON.stringify({coUrl:coUrl}),
						/* data: $("input:text[name=coUrl]").serialize(), */
						//contentType: "application/json",
						dataType : "json",
						success : function(data) {
							console.log(data);
							/* var $coLogo = data.coLogo; */
							var $coUrl = data.coUrl;
							var $coName = data.coName;

							if (data != null) {
								$('#checkJoinPopup').attr('class',
										'flow-all-background-1');
								$('#companyName').text($coName);
								$('#companyUrl').text($coUrl);
								$('#joinSubmit2').attr('class','btn-popup01 d-none'); 
								$('#joinSubmit1').attr('class','btn-popup01');
								$('#joinSubmit1').on('click',function(){
									$('#frm').attr("action", "userJoin.do");
									$('[name="newCoUrl"]').val($("#coUrl").val());

								});
								
			
							}
						},
						error : function(reject) {
							console.log(reject);
							$('#checkJoinPopup').attr('class',
								'flow-all-background-1');
								$('#companyName').text('해당 회사가 존재하지않습니다');
								$('#companyUrl').text('새로운 플러스를 만들어보세요');
								$('#joinSubmit1').attr('class','btn-popup01 d-none');
								$('#joinSubmit2').attr('class','btn-popup01');
								$('#joinSubmit2').on('click',function(){
									if($("#coUrl").val()==""){
										alert("url을 입력하세요.")
									}else{										
									$('#frm').attr("action", "adminJoin.do");
									$('[name="newCoUrl"]').val($("#coUrl").val());

									}
								});
						}
					});
				}
			});//joinBtn click end
			
			
		$("#closePopupBtn").click(
			function(){
				$('#checkJoinPopup').attr('class',
				'flow-all-background-1 d-none');
			});	
		
		

	</script>
</body>
</html>

















