<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="theme-color" content="#5f5ab9">

<meta name="author" content="Madras check">
<meta name="subject" content="work tool">
<meta name="copyright" content="Madras check">
<meta name="content-language" content="ko">

<link rel="SHORTCUT ICON" href="/design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="/design2/favicon.ico">

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
		
		<!-- ?????? ????????? -->
		<div id="toastWrap" class="d-none">
        <div class="alert-wrap d-none">
            <div class="alert-type">
                <div class="text"></div>
            </div>
        </div>
    </div>

		<!-- ?????????????????? -->
		<div id="companyJoinMain" class="login-wrap invite-login">
			<div class="login-text">?????? URL ??????</div>
			<div class="login-company">?????? ???????????? ???????????? ???????????? ????????? ?????? URL??? ????????????
				???????????????.</div>
			<div class="join-contents">
				<p class="url-tit">?????? URL</p>
				<div class="url-wr">
					<span>https://</span> 
					<input id="coUrl" name="coUrl" type="text" class="join-input" autocomplete="off" placeholder="?????? URL">
					<!-- ?????? ?????? ??? .error ????????? ?????? -->
					<span>.plus.team</span>
				</div>
				<p id="errMeg" class="error-text d-none">3~5??? ??????, ????????? ???????????????.</p>
				<!-- ?????? ?????? ??? display: block -->
			</div>
			<button id="JoinBtn" class="btn-join">?????? ????????????</button>
			<br>
			<a href="passUserJoinForm.do" ><p style="margin-top: 20px">?????? ????????? ????????????????</p></a>
		</div>
		<!-- /?????????????????? -->
		
		<!-- ???????????????????????? -->
		<div id="checkJoinPopup" class="flow-all-background-1 d-none">
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="popupLayer" class="flow-login-popup popup-10">
						<div class="flow-project-header-1">
							?????? ?????? ?????? ??? ???????????????! <a id="closePopupBtn"
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
							<button id="joinSubmit1" class="btn-popup01">??? ????????????</button>
							<button id="joinSubmit2" class="btn-popup01">????????? ??????</button>
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- /???????????????????????? -->
	</div>
	<script>
		$("#JoinBtn").click(function() {
				var coUrl = $('#coUrl').val();
				if(coUrl == ""){
					alert("URL??? ???????????????");
				}else{
					$.ajax({
						url : "getCompany.do?coUrl=" + coUrl,
						type : "get",
						//data:JSON.stringify({coUrl:coUrl}),
						/* data: $("input:text[name=coUrl]").serialize(), */
						//contentType: "application/json",
						dataType : "json",
						success : function(data) {
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
							$('#checkJoinPopup').attr('class',
								'flow-all-background-1');
								$('#companyName').text('?????? ????????? ????????????????????????');
								$('#companyUrl').text('????????? ???????????? ??????????????????');
								$('#joinSubmit1').attr('class','btn-popup01 d-none');
								$('#joinSubmit2').attr('class','btn-popup01');
								$('#joinSubmit2').on('click',function(){
									if($("#coUrl").val()==""){
										alert("url??? ???????????????.")
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

















