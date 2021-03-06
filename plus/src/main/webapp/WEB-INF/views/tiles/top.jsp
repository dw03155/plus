<%@page import="java.awt.print.Printable"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<style>
.blueBtn{
		position: absolute;
		padding: 6px 15px 6px 15px;
		background-color: #5882FA;
		color: white;
		border-radius: 3px;
		margin-left: 5px;
		top: 85px;
	}
.model {
	width: 850px;
	height: 55.5vh;
	min-height: 490px;
	max-height: 600px;
	margin: 0 auto;
	border-radius: 20px;
	background: #fff;
	overflow: hidden;
	position: fixed;
	border: 1px solid #777;
	-webkit-box-shadow: 20px 20px 30px rgb(0 0 0/ 20%);
	box-shadow: 20px 20px 30px rgb(0 0 0/ 20%);
	top: 25%;
	left: 25%;
	z-index: 3000;
	box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.my-left-style {
	width: 15%;
	float: left;
	box-sizing: border-box;
}

.js-my-scroll-layer {
	width: 73%;
	height: 450px;
	float: right;
	box-sizing: border-box;
	overflow: auto;
}

.st_img{
	width: 17px;
}
.st_icn{
	width: 15px;
	position: absolute;
	top: 17px;
    right: -4px;
}
.st_modal{
	min-width: 115px;
    padding: 14px;
    position: absolute;
    top: 160px;
    right: 238px;
    z-index: 13;
    background: #fff;
    border: 1px solid #777;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
    color: #555;
    display: none;
    box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.statusStyle:hover{
	color: #6449FC;
}
.ctgry_del_modal{
	width: 400px;
	height: 200px;
    position: absolute;
    top: 35%;
    right: 45%;
    z-index: 13;
    background: #fff;
    border: 1px solid #777;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
    color: #555;
    display: none;
    align-content: center;
}
.model_heard{
	height: 30px;
	padding: 10px;
	
}
#ctgry_model_x{
	float: right;
	width: 15px;
}
#userImgX{
	float: right;
	width: 15px;
}
</style>

</head>
<body>
	<header class="header">
		<div id="userSetting">
		<div id="rightTopMenu" class="top-btns">
			<!-- <button type="button" id="chattingTopButton"
				class="btn-chatting js-mouseover
            js-button-tooltip"
				mouseover-text="??????">
				<i class="icon-chatting"></i> <i id="chatTopCount"
					class="label-chat d-none"></i>
			</button>
			<button type="button" id="alarmTopButton"
				class="btn-alarm js-mouseover
            js-button-tooltip"
				mouseover-text="??????">
				<i class="icon-alarm"></i> <i id="alarmTopCount" class="label-alarm"
					style="display: none"></i>
			</button> -->
			<!-- ?????????????????? -->
			<button type="button" id="accountTopButton" class="btn-profile">
				<span id="ProfileImg" class="profile-area"
					style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;); overflow: hidden;">
					<img id="memImgSomini" style="height: 100%; width: 100%; border-radius: 4px; transform: translate(50, 50); object-fit: cover">
					</span>
				<img id="mem_st_icon" alt="on" src="/img/status_icn/offline.png" class="st_icn">
			</button>
		</div>
			<ul id="accountModal" class="modal-account d-none" style="box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<li class="user-area">
					<p class="js-profile user-img"
						style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);  overflow: hidden;">
						<img id="memImgmini" style="height: 100%; width: 100%; border-radius: 4px; transform: translate(50, 50); object-fit: cover">
						</p>
					<div class="user-info">
						<strong id="sessionName" class="js-user-name js-mouseover">${sessionScope.name}</strong> <span>?????????</span>
					</div>
				</li>
	
				<li id="statusChange" class="user-status"><i class="icon-status"></i> ?????? ??????</li>
				<!-- <li id="topProfile" class="user-profile"><i class="icons-person-3"></i> ??? ?????????</li> -->
				<li id="mySettingOpenButton"><i class="icons-set"></i> ???????????????</li>
				<li id="logoutBtn" onclick="location.href='logout.do'"><i class="icons-logout"></i> ????????????</li>
			</ul>
			<ul id="status" class="st_modal">
				<li id="online" class="statusStyle"><img alt="onlineImg" src="/img/status_icn/online.png" class="st_img"><a href="#"> ?????????</a></li>
				<li id="notdesk" class="statusStyle"><img alt="notdeskImg" src="/img/status_icn/notdesk.png" class="st_img"><a href="#"> ????????????</a></li>
				<li id="other" class="statusStyle"><img alt="otherImg" src="/img/status_icn/other.png" class="st_img"><a href="#"> ???????????????</a></li>
				<li id="offline" class="statusStyle"><img alt="offlineImg" src="/img/status_icn/offline.png" class="st_img"><a href="#"> ????????????</a></li>
			</ul>
		</div>
	</header>
		
	<div id="MySettiong" class="flow-all-background-1 zx-9 d-block" style="display: none">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="innerMySettingPopup" class="my-layer-type-3">
					<div class="my-layer-header">
						<div class="my-layer-header-1">
							<a href="#" id="mySettingPopupCloseBtn" class="my-button-close-1"></a>
							<div id="myPicture" class="my-prop-picture" style="overflow: hidden;">
									<img id="memImgBig" style="height: 100%; width: 100%; border-radius: 4px; transform: translate(50, 50); object-fit: cover">
							</div>
								<a id="editorProfilePhotoBtn" href="#" class="my-button-1" style="left: 111px; bottom: -67px;"></a>
							<span id="accountSetting" class="js-my-setting-title">???????????????</span>
						</div>

						<!-- ???????????? ?????? -->
						<!-- <div class="my-left-style">
							<ul class="my-popup-left-header" id="mySettingLeftMenu">
								<li id="myPageBtn" class="js-my-setting-left" style="color: #6449FC"><a id="accountSettingBtn"
									href="#">???????????????</a></li>
							</ul>
						</div> -->

						<!-- ???????????? ???????????? -->
						<div id="accountSettingLayer" class="js-my-scroll-layer">
							<div class="my-right-style adjust" style="height: 670px;">
								<div id="mySet" style="display: none">
									<ul>
										<li class="edit-input js-email-set adjust">
											<div class="my-right-list-1">?????????</div>
											<div class="read-mode d-block">
												<div id="email" class="my-right-list-2"></div>
											</div>
										</li>
										<li class="edit-input js-company-set adjust">
											<div class="my-right-list-1">??????</div>
											<div id="nameInput" class="read-mode d-block">
												<div id="name" class="my-right-list-2"></div>
											<a id="nameUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div id="nameUpdateForm" class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_name" type="text"
														autocomplete="off" maxlength="50" data-valid="name"
														data-un-valid-msg="??????????????? ????????? ??? ????????????">
													<div class="btn-fr-wrap">
														<a href="#">
															<div id="noNameUpdate" class="my-button-cc cancel-change">??????</div>
														</a><a href="#">
															<div id="nameUpdate" class="js-account-set-button my-button-ok" gubun="7">??????</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input js-company-set adjust">
											<div>
												<div class="my-right-list-1">?????????</div>
												<div class="read-mode d-block">
													<div id="coName" class="my-right-list-2"></div>
												</div>
											</div>
										</li>
										<li class="edit-input js-dvsn-set adjust">
											<div class="my-right-list-1">?????????</div>
											<div id="deptInput" class="read-mode d-block">
												<div id="dept" class="my-right-list-2"></div>
												<a id="deptUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div id="deptUpdateForm" class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_dept" type="text" autocomplete="off"
														maxlength="50" data-valid="name"
														data-un-valid-msg="??????????????? ????????? ??? ????????????">
													<div class="btn-fr-wrap">
														<a href="#">
															<div id="noDeptUpdate" class="my-button-cc cancel-change">??????</div>
														</a>
														<a href="#">
															<div id="deptUpdate" class="js-account-set-button my-button-ok change-ok" gubun="8">??????</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input js-dvsn-set adjust">
											<div class="my-right-list-1">??????</div>
											<div id="wkpoInput" class="read-mode d-block">
												<div id="wkpo" class="my-right-list-2"></div>
												<a id="wkpoUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div id="wkpoUpdateForm" class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_wkpo" type="text" autocomplete="off"
														maxlength="50" data-over-msg="">
													<div class="btn-fr-wrap">
														<a href="#">
															<div id="noWkpoUpdate" class="my-button-cc cancel-change">??????</div>
														</a><a href="#">
															<div id="wkpoUpdate" class="js-account-set-button my-button-ok change-ok" gubun="4">??????</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">????????? ??????</div>
											<div id="persTelInput" class="read-mode d-block">
												<div id="persTel" class="my-right-list-2"></div>
												<a id="persTelUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div id="persTelUpdateForm" class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_persTel" type="text"
														class="my-text-input-1" autocomplete="off"
														data-valid="number" maxlength="20" data-over-msg=""
														data-un-valid-msg="??????????????? ????????? ??????????????????!"
														placeholder="????????? ??????????????????!"
														onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div id="noPersTelUpdate" class="my-button-cc cancel-change">??????</div>
														</a> 
														<a href="#">
															<div id="persTelUpdate" class="js-account-set-button my-button-ok change-ok" gubun="3">??????</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">?????? ?????????</div>
											<div id="coTelInput" class="read-mode d-block">
												<div id="coTel" class="my-right-list-2"></div>
												<a id="coTelUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div id="coTelUpdateForm" class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_coTel" class="my-text-input-1"
														type="text" autocomplete="off" maxlength="20"
														data-over-msg="" data-valid="number"
														data-un-valid-msg="??????????????? ????????? ??????????????????!"
														placeholder="????????? ??????????????????!"
														onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div id="noCoTelUpdate" class="my-button-cc cancel-change">??????</div>
														</a> 
														<a href="#">
															<div id="coTelUpdate" class="js-account-set-button my-button-ok change-ok">??????</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust" id="passwordArea">
											<div id="pwdInput" class="read-mode d-block">
												<div class="my-right-list-1">????????????</div>
												<div class="my-right-list-password">
													<strong class="password-alert">???????????? ???????????? ???????????????.</strong> 
													<span id="pwdUpdateSussacc" class="my-txt-t-1" style="display: none">??????????????? ?????????????????????.</span>
													<button id="pwdUpdateBtn" class="js-myset-password change-editor-btn">???????????? ?????????</button>
												</div>
											</div>
											<div id="pwdUpdateForm" class="editor-mode d-none">
												<ul>
													<li>
														<div class="my-right-list-1">????????????</div>
														<div class="my-right-list-2 edit-password">
															<a href="#"></a><span id="message" class="my-txt-t-1">??????????????? ??????,
																?????? ?????? 6?????? ??????????????? ?????????.</span>
															<div class="btn-fr-wrap">
																<a href="#">
																	<div id="noPwdUpdate" class="my-button-cc">??????</div>
																</a>
																<a href="#">
																	<div id="pwdUpdate" class="my-button-ok">??????</div>
																</a>
															</div>
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">?????? ????????????</span> 
															<input type="hidden" id="hiddenpwd">
															<input type="password"
																id="myPassword" class="my-input-password-2"
																autocomplete="off" data-required-yn="Y" maxlength="20"
																data-valid="password" data-empty-msg="??????????????? ??????????????????"
																data-over-msg=""
																data-un-valid-msg="6??? ????????? ??????,????????? ???????????????."
																placeholder="?????? ??????????????? ??????????????????">
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">????????????</span> 
															<input type="password"
																id="pwd" class="my-input-password-2"
																autocomplete="off" data-required-yn="Y" maxlength="20"
																data-valid="password" data-empty-msg="??????????????? ??????????????????"
																data-over-msg=""
																data-un-valid-msg="6??? ????????? ??????,????????? ???????????????."
																placeholder="??????????????? ??????????????????">
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">???????????? ??????</span> 
															<input type="password" class="my-input-password-2"
																id="newPassword" autocomplete="off" data-required-yn="Y"
																maxlength="20" data-valid="password"
																data-empty-msg="??????????????? ??????????????????" data-over-msg=""
																data-un-valid-msg="6??? ????????? ??????,????????? ???????????????."
																placeholder="??????????????? ?????? ??????????????????">
														</div>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>



								<!-- ?????? -->
								<div id="pushAlamGroup" style="display: none">
									<ul class="push-alarm-group">
										<li>
											<div class="my-right-list-1">?????? ??????</div>
											<div class="my-right-list-3">
												????????? ???, ??????, ????????? ????????? ????????? ????????????.
												<button type="button" id="pushAlamSetting"
													class="toggle-button my-check-1">
													<!-- active ???????????? ??????  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												???????????? ??????<a href="#">
													<div id="projectAlamSetting" class="my-check-2"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												?????? ??????<a href="#">
													<div id="chatAlamSetting" class="my-check-2-1"></div>
												</a>
											</div>
										</li>
									</ul>
									<ul id="doNotDisturbGroup" class="disturb-group">
										<li>
											<div class="my-right-list-1 mgt-20">?????? ?????? ??????</div>
											<div class="my-right-list-3 mgt-20">
												????????? ????????? ????????? ????????? ?????? ????????????.
												<button type="button" id="doNotDisturbSetting"
													class="toggle-button my-check-1">
													<!-- active ???????????? ??????  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1" id="notDisturbDailyEmpty"></div>
											<div class="my-right-list-2" id="notDisturbDailyList">
												??????
												<ul id="doNotDisturbDayby" class="my-dayby-w-1">
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">???</a></li>
												</ul>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												??????
												<div class="float-right-1">
													<select id="doNotDisturbStartTime" class="my-type-1">
														<option>00:00</option>
														<option>01:00</option>
														<option>02:00</option>
														<option>03:00</option>
														<option>04:00</option>
														<option>05:00</option>
														<option>06:00</option>
														<option>07:00</option>
														<option>08:00</option>
														<option>09:00</option>
														<option>10:00</option>
														<option>11:00</option>
														<option>12:00</option>
														<option>13:00</option>
														<option>14:00</option>
														<option>15:00</option>
														<option>16:00</option>
														<option>17:00</option>
														<option>18:00</option>
														<option>19:00</option>
														<option>20:00</option>
														<option>21:00</option>
														<option>22:00</option>
														<option>23:00</option>
														<option>24:00</option>
													</select> <span class="my-mk-1">~</span> <select
														id="doNotDisturbEndTime" class="my-type-1">
														<option>00:00</option>
														<option>01:00</option>
														<option>02:00</option>
														<option>03:00</option>
														<option>04:00</option>
														<option>05:00</option>
														<option>06:00</option>
														<option>07:00</option>
														<option>08:00</option>
														<option>09:00</option>
														<option>10:00</option>
														<option>11:00</option>
														<option>12:00</option>
														<option>13:00</option>
														<option>14:00</option>
														<option>15:00</option>
														<option>16:00</option>
														<option>17:00</option>
														<option>18:00</option>
														<option>19:00</option>
														<option>20:00</option>
														<option>21:00</option>
														<option>22:00</option>
														<option>23:00</option>
														<option>24:00</option>
													</select>
												</div>
											</div>
										</li>
									</ul>
								</div>

								<!-- ???????????? -->
								<div id="mylock" style="display: none">
									<ul class="lock-list">
										<li>
											<div class="my-right-list-1">????????????</div>
											<div class="my-right-list-3">
												????????? ?????? ?????? ???????????? ????????? ???????????? ?????????.
												<button type="button" id="lockModeSetting"
													class="toggle-button my-check-1">
													<!-- active ???????????? ??????  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												?????? ?????? <select id="lockTime" class="my-type-5">
													<option value="1">1???</option>
													<option value="5">5???</option>
													<option value="10">10???</option>
													<option value="30">30???</option>
													<option value="60">1 ??????</option>
													<option value="120">2 ??????</option>
													<option value="180">3 ??????</option>
													<option value="240" selected>4 ??????</option>
													<option value="300">5 ??????</option>
												</select>
											</div>
										</li>
									</ul>
								</div>

								<button id="leavePlusBtn" class="btn-leave">??????</button>
							</div>
						</div>
						
						<div id="leaveplus" class="my-popup-pro-1-1 d-none" style="left: 35%">
							<div class="my-right-list-1">?????????????????????????</div>
							<a href="#">
								<div id="stay" class="my-button-cc">??????</div>
							</a>
							<a href="">
								<div id="leave" class="my-button-ok">??????</div>
							</a>
						</div>

						<a href="#" id="mySettingPopupCloseBtn" class="my-button-close-1"></a>
					</div>
				</div>
			</div>
		</div>
		
		<div id="userImg" class="ctgry_del_modal" 
		style="box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); z-index: 100px;  top: 40%; right: 36%;">	
				<div class="model_heard">
					<a href="#"><img id="userImgX" src="/img/ico/x_icn.png"></a>
				</div>
				<div align="center" style="margin: 25px; 0px;">
					<h2>????????? ???????????? ???????????????.</h2>
					<p><input type="file" id="userImgFile" accept="image/jpeg,image/png,image/jpg"></p>
				</div>
				<div align="center">
					<button type="button" id="userImgBtn" class="blueBtn" style="position: static; background-color: #6449FC" >??????</button>
				</div>
		</div>	
		
	</div>




	<!-- ?????? ?????? -->
	<article id="alarmLayer" class="side-wr d-none">
		<div class="menu-top">
			<strong>??????</strong>
			<button class="js-close-event btn-close">
				<i class="icons-close-1"></i>
			</button>
		</div>
		<div class="side-contents">
			<ul id="notReadFilter" class="tab-menu">
				<li class=" js-alarm js-unread">?????????</li>
				<li class=" js-alarm js-read on">??????</li>
				<li id="readAllAlarm">????????????</li>
			</ul>
			<!-- ?????? ????????? -->
			<div class="all-setup-type-2">
				<i class="icons-search"></i> <input id="alarmSearchInput"
					type="text" class="all-setup-input-type-1" placeholder="??????"
					autocomplete="off"> <a href="#"
					id="alarmSearchFilterTopButton" class="all-setup-detail-text-1">??????</a>
				<div id="alarmSearchFilterLayer" class="popup-filter-type-1 d-none">
					<div
						class="js-project-title js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="0">
						<a href="#"><span>???????????????</span><em></em></a>
					</div>
					<div
						class="js-contents js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="1">
						<a href="#"><span>??????</span><em></em></a>
					</div>
					<div
						class="js-register-id js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="2">
						<a href="#"><span>?????????</span><em></em></a>
					</div>
				</div>
			</div>
			<div class="name-setup-type-2 scroll-mask">
				<ul id="alarmUl">
				</ul>
			</div>
		</div>
		<div id="alarmItem" class="d-none">
			<li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}">
				<div class="all-setup-picture-type-1"></div>
				<div class="all-text-wrap-type-1">
					<div class="all-setup-section-type-1">
						<span>{TTL}</span><em>{date}</em>
					</div>
					<div class="all-text-wrap-type-2 alarm-tit-ellipsis">
						<i class="{emojiIcon}"></i>{msg}
					</div>
					<div class="all-text-wrap-type-3">{task-name}{contents}</div>
					<div class="all-text-wrap-type-3">
						<span> <em class="all-setup-icon-type-2"></em>?????????
						</span> <span> <em class="all-setup-icon-type-1"></em>??????
						</span>
					</div>
				</div>
			</li>
		</div>

		<div id="projectAlarmItem" class="d-none">
			<li class="not-read-alarm-item">
				<div class="unidentified-item profile">
					<span class="thumbnail size40 radius16"></span>
				</div>
				<div class="middle-wr">
					<div class="unidentified-item title">
						<em class="unidentified-name"><i class="{emojiIcon}"></i>{msg}</em>
						<span class="unidentified-time">{date}</span>
					</div>
					<div class="unidentified-item task">
						<div class="unidentified-task-title {task-yn}">{task-name}</div>
						<div class="unidentified-task-content">
							<span>{contents}</span>
							<ul class="unidentified-file-group">
								<li><span class="unidentified-image">?????????</span>
								</li>
								<li><span class="unidentified-file">??????</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="unidentified-item button">
					<button type="button" class="unidentified-detail-btn">??????</button>
				</div>
			</li>
		</div>

	</article>




	<!-- ?????? ?????? -->
	<article id="chattingLayer" class="side-wr d-none">
		<div class="menu-top">
			<strong>??????</strong>
			<button type="button"
				class="js-allChat-alarm alarm on js-mouseover js-button-tooltip"
				mouseover-text="">
				<i class="icon-alarm"></i>
			</button>
			<button id="chatCloseBtn" class="btn-close">
				<i class="icons-close-1"></i>
			</button>
		</div>
		<div class="side-contents">
			<ul id="chatTabMenu" class="tab-menu">
				<li id="chatBtn"><span class="popup-tab chat on" tabindex="0">??????</span></li>
				<li id="contactBtn"><span class="popup-tab chat" tabindex="0">?????????</span>
				</li>
			</ul>
			<div class="popup-right">
				<button type="button" class="js-new-chat popup-button chat">
					<i class="icon-chat"></i> ??? ??????
				</button>
			</div>

			<div class="all-setup-type-2">
				<i class="icons-search"></i> <input id="chattingSearchInput"
					type="text" class="all-setup-input-type-1"
					placeholder="????????? ?????? ?????? ??????" autocomplete="off">
			</div>
			<ul id="chatMemberList" class="participants-list contact-area d-none"></ul>
			<ul id="chattingUl"
				class="participants-list chat-list-area chat-list scroll-mask"></ul>
		</div>
		<div id="chattingItem" class="d-none">
			<li class="js-chatting-item">
				<div class="mini-mode-text-sub-area-1">
					<div
						class="mini-mode-main-picture-1 mini-mode-chattng-type profile {profile-display-type}">{profile}
					</div>
					<div class="mini-mode-area-list-type-1">
						<p>
							<strong class="js-title">{ROOM_NM}</strong> <span
								class="mini-mode-chattng-type-2">{SENDIENCE_CNT}</span>
							<i class="no-alarm mini-mode-chattng-icon-type-1"></i> <i
								class="pin mini-mode-chattng-icon-type-2"></i>
						</p>
						<p class="mini-mode-text-gray-1">
							<i class="js-image-icon all-setup-icon-type-2"></i><i
							 class="js-file-icon all-setup-icon-type-1"></i><span><a
								class="js-cntn">{CNTN}</a></span>
						</p>
					</div>
					<div class="mini-mode-chattng-type-3">
						<div class="mini-mode-chattng-type-text-1 not-read-count"
							>{NOT_READ_CNT}</div>
						<div class="mini-mode-chattng-type-text-2 js-date">{date}</div>
					</div>
				</div>
			</li>
		</div>
	</article>
	
	<form id="sessionNull" action="home.do"></form>
	<form id="leave" action="home.do"></form>
	<script>
	/* //?????? ????????????
	$(function(){		
		var memId = "${sessionScope.memId}"
		if(memId == null || memId == ""){
			sessionNull.submit();
		}
	}); */

	$(function(){
		var memId = "${sessionScope.memId}";
		$.ajax({
			url: "getMemberImg.do?memId="+memId,
			type: "get",
			datatype: "json",
			success: function(data){
				var $memImg = data.memImg;
				var imgPath = "/userImg/"+$memImg + "?heigth=50";
				$("#memImgSomini").attr("src",imgPath);
				$("#memImgmini").attr("src",imgPath);
				$("#memImgBig").attr("src",imgPath);
			}
		})

	}) 

	
	//???????????? ????????????
	$(function(){
		var memId = "${sessionScope.memId}";
		$.ajax({
			url: "memberStatus.do?memId=" + memId,
			type: "Get",
			datatype: "json",
			success: function(data){
				var $memSt = data.memSt;
				if($memSt == 'online'){
					$("#mem_st_icon").attr("src", "/img/status_icn/online.png")
				}else if($memSt == 'offline'){
					$("#mem_st_icon").attr("src", "/img/status_icn/offline.png")
				}else if($memSt == 'notdesk'){
					$("#mem_st_icon").attr("src", "/img/status_icn/notdesk.png")
				}else if($memSt == 'other'){
					$("#mem_st_icon").attr("src", "/img/status_icn/other.png")
				}
			}
		});
		//????????????
		$.ajax({
			url: "memberInfo.do?memId=" + memId,
			type: "Get",
			datatype: "json",
			success: function(data){
					var $email = data.email;
					var $pwd = data.pwd;
					var $name = data.name;
					var $wkpo = data.wkpo;
					var $persTel = data.persTel;
					var $coTel = data.coTel;
					var $dept = data.dept;
					var $coName = data.coName;
					if($wkpo == null){
						$('#wkpo').text('');
					}else{						
						$('#wkpo').text($wkpo);
					};
					if($persTel == null){
						$('#persTel').text('');
					}else{						
						$('#persTel').text($persTel);
					};
					if($coTel == null){
						$('#coTel').text('');
					}else{						
						$('#coTel').text($coTel);
					};
					if($dept == null){
						$('#dept').text('');
					}else{						
						$('#dept').text($dept);
					};
					$('#email').text($email);
					$('#name').text($name);
					$('#coName').text($coName);
					$('#hiddenpwd').val($pwd);
			}
		});
	});
	

	 $('#editorProfilePhotoBtn').on("click",function(){
		$('#userImg').css('display','block');
		
	});
	$('#userImgX').on("click",function(){
		$('#userImg').css("display","none");
	}); 

	

	//?????? ?????????
	$("#userImgBtn").on("click",function(e){
		var formData = new FormData();
		var fileName = null;
		var memId = "${sessionScope.memId}";
		var userImgFile = $("#userImgFile");
		var files = userImgFile[0].files;
		for(var i= 0; i<files.length; i++){
			formData.append("userImgFile", files[i]);
			fileName = files[i].name;
		}
			$.ajax({
				url: 'imgUpload.do',
				processData: false,
				contentType: false,
				data: formData,
				type: 'POST',
				success: function(result){
					var $memImg = result.key +"_"+ fileName;
					var memId = "${sessionScope.memId}";
					$("#userImgFile").val();
					alert("Uploaded");
					var jsondata = {"memId": memId,"memImg":$memImg};
					$.ajax({
						url: 'memberImgUpdate.do',
						type: 'put',
						data: JSON.stringify(jsondata),
						contentType: "application/json",
						dataType: "json",
						success: function(){
							alert("??????????????? ??????????????????");
							$.ajax({
								url: "getMemberImg.do?memId="+memId,
								type: "get",
								datatype: "json",
								success: function(data){
									var $memImg = data.memImg;
									var imgPath = "/userImg/"+$memImg + "?heigth=50";
									$("#memImgSomini").attr("src",imgPath);
									$("#memImgmini").attr("src",imgPath);
									$("#memImgBig").attr("src",imgPath);
									$('#userImg').css("display","none");
								}
							})
						},
						error:function(){
							alert(${message });
						}
					})
				},
				error: function(){
					alert("???????????? ??????????????????");
				}
			}); //end of $.ajax
		
		
	});
	
	//?????? ?????? ??????
		 $(document).mouseup(function (e){
			var MySettiong = $("#MySettiong");
			var userSetting = $("#userSetting");
			var status = $("#status");
			if(userSetting.has(e.target).length === 0){
				$("#status").css("display", "none");
				$("#accountModal").attr("class", "modal-account d-none");
			}
			if(MySettiong.has(e.target).length === 0){
				MySettiong.css("display", "none");
			}
			if(status.has(e.target).length !== 0){
				$("#status").css("display", "none");
			}
		});
	
	//????????????
	$("#ProfileImg").on("click", function(){
		$("#accountModal").toggleClass("d-none");
	})
	
	//??????????????????
	//?????????
	$("#online").on("click",function(){
		var memId = "${sessionScope.memId}";
		var jsondata = {"memId": memId};
		$.ajax({
			url: "memberOnline.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(){
				$("#mem_st_icon").attr("src", "/img/status_icn/online.png")
			}
		});
	});
	//????????????
	$("#other").on("click",function(){
		var memId = "${sessionScope.memId}";
		var jsondata = {"memId": memId};
		$.ajax({
			url: "memberOther.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(){
				$("#mem_st_icon").attr("src", "/img/status_icn/other.png")
			}
		});
	});
	//????????????
	$("#notdesk").on("click",function(){
		var memId = "${sessionScope.memId}";
		var jsondata = {"memId": memId};
		$.ajax({
			url: "memberNotdesk.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(){
				$("#mem_st_icon").attr("src", "/img/status_icn/notdesk.png")
			}
		});
	});
	//????????????
	$("#offline").on("click",function(){
		var memId = "${sessionScope.memId}";
		var jsondata = {"memId": memId};
		$.ajax({
			url: "memberOffline.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(){
				$("#mem_st_icon").attr("src", "/img/status_icn/offline.png")
			}
		});
	});

		
	//????????? ??????, ???????????? ????????????		
		$("#mySettingOpenButton").on("click", function() {
			$("#MySettiong").css("display", "block");
			$("#pushAlamGroup").css("display", "none");
			$("#mylock").css("display", "none");
			$("#mySet").css("display", "block");
			$("#accountModal").toggleClass("d-none");
			$("#status").css("display", "none");
			$("#accountModal").attr("class", "modal-account d-none");
		});	
		
		$(".my-button-close-1").on("click", function() {
			$("#MySettiong").css("display", "none");
			$("#pwdUpdateSussacc").css("display","none");
		});
		

		$("#accountSettingBtn").on("click", function() {
			$("#myPageBtn").css("color", "#6449FC");
			$("#pushAlamBtn").css("color", "black");
			$("#lookBtn").css("color", "black");
			$("#mySet").css("display", "block");
			$("#pushAlamGroup").css("display", "none");
			$("#mylock").css("display", "none");
		});

		$("#preferencesBtn").on("click", function() {
			$("#pushAlamBtn").css("color", "#6449FC");
			$("#myPageBtn").css("color", "black");
			$("#lookBtn").css("color", "black");
			$("#pushAlamGroup").css("display", "block");
			$("#mySet").css("display", "none");
			$("#mylock").css("display", "none");
		});

		$("#deviceManagementBtn").on("click", function() {
			$("#lookBtn").css("display", "#6449FC");
			$("#myPageBtn").css("color", "black")
			$("#pushAlamBtn").css("color", "black");
			$("#mySet").css("display", "none");
			$("#pushAlamGroup").css("display", "none");
			$("#mylock").css("display", "block");
		});


		// ?????? ??????
		$("#nameUpdateBtn").on("click", function(){
			$("#nameInput").toggleClass("d-none");
			$("#nameUpdateForm").toggleClass("d-none");
			$("#editor_name").val($("#name").text());			
		});
		$("#noNameUpdate").on("click",function(){
			$("#nameInput").toggleClass("d-none");
			$("#nameUpdateForm").toggleClass("d-none");
		});
		$("#nameUpdate").on("click", function(){
			var name = $("#editor_name").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"name":name};
			$.ajax({
				url: "nameUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#nameInput").toggleClass("d-none");
					$("#nameUpdateForm").toggleClass("d-none");
					$("#name").text($("#editor_name").val());
					$("#sessionName").text($("#editor_name").val());
				}
			});
		});
		
		//????????? ??????
		$("#deptUpdateBtn").on("click", function(){
			$("#deptInput").toggleClass("d-none");
			$("#deptUpdateForm").toggleClass("d-none");
			$("#editor_dept").val($("#dept").text());			
		});
					
		$("#noDeptUpdate").on("click",function(){
			$("#deptInput").toggleClass("d-none");
			$("#deptUpdateForm").toggleClass("d-none");
		});
		$("#deptUpdate").on("click", function(){
			var dept = $("#editor_dept").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"dept":dept};
			$.ajax({
				url: "deptUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#deptInput").toggleClass("d-none");
					$("#deptUpdateForm").toggleClass("d-none");
					$("#dept").text($("#editor_dept").val());
				}
			});
		});
		
		//?????? ??????
		$("#wkpoUpdateBtn").on("click", function(){
			$("#wkpoInput").toggleClass("d-none");
			$("#wkpoUpdateForm").toggleClass("d-none");
			$("#editor_wkpo").val($("#wkpo").text());			
		});
					
		$("#noWkpoUpdate").on("click",function(){
			$("#wkpoInput").toggleClass("d-none");
			$("#wkpoUpdateForm").toggleClass("d-none");
		});
		$("#wkpoUpdate").on("click", function(){
			var wkpo = $("#editor_wkpo").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"wkpo":wkpo};
			$.ajax({
				url: "wkpoUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#wkpoInput").toggleClass("d-none");
					$("#wkpoUpdateForm").toggleClass("d-none");
					$("#wkpo").text($("#editor_wkpo").val());
				}
			});
		});
		
		//?????? ???????????? ??????
		$("#persTelUpdateBtn").on("click", function(){
			$("#persTelInput").toggleClass("d-none");
			$("#persTelUpdateForm").toggleClass("d-none");
			$("#editor_persTel").val($("#persTel").text());			
		});
					
		$("#noPersTelUpdate").on("click",function(){ 
			$("#persTelInput").toggleClass("d-none");
			$("#persTelUpdateForm").toggleClass("d-none");
		});
		$("#persTelUpdate").on("click", function(){
			var persTel = $("#editor_persTel").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"persTel":persTel};
			$.ajax({
				url: "persTelUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#persTelInput").toggleClass("d-none");
					$("#persTelUpdateForm").toggleClass("d-none");
					$("#persTel").text($("#editor_persTel").val());
				}
			});
		});
		
		//?????? ???????????? ??????
		$("#coTelUpdateBtn").on("click", function(){
			$("#coTelInput").toggleClass("d-none");
			$("#coTelUpdateForm").toggleClass("d-none");
			$("#editor_coTel").val($("#coTel").text());			
		});
					
		$("#noCoTelUpdate").on("click",function(){
			$("#coTelInput").toggleClass("d-none");
			$("#coTelUpdateForm").toggleClass("d-none");
		});
		$("#coTelUpdate").on("click", function(){
			var coTel = $("#editor_coTel").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"coTel":coTel};
			$.ajax({
				url: "coTelUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					console.log(data);
					$("#coTelInput").toggleClass("d-none");
					$("#coTelUpdateForm").toggleClass("d-none");
					$("#coTel").text($("#editor_coTel").val());
				}
			});
		});
		
		//???????????? ??????
		$('#pwdUpdateBtn').on("click",function(){
			$("#pwdInput").toggleClass("d-none");
			$("#pwdUpdateForm").toggleClass("d-none");
		});
		
		$("#noPwdUpdate").on("click",function(){
			$("#pwdInput").toggleClass("d-none");
			$("#pwdUpdateForm").toggleClass("d-none");
		})
		$("#pwdUpdate").on("click",function(){
			var hiddenpwd = $("#hiddenpwd").val();
			var myPwd = $("#myPassword").val();
			var pwd = $("#pwd").val();
			var newPwd = $("#newPassword").val();
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId":memId,"pwd":pwd};
			if (hiddenpwd != myPwd){
				$("#message").text("?????? ??????????????? ????????????????????????.")
						     .css("color","red");
			}else if(pwd == "" || newPwd == ""){
				$("#message").text("????????? ??????????????? ??????????????????.")
			     			.css("color","red");
			}else{
				if(pwd == newPwd){
					$.ajax({
						url: "pwdUpdate.do",
						method: "put",
						data: JSON.stringify(jsondata),
						contentType: "application/json",
						dataType: "json",
						success: function(data){
							console.log(data);
							$("#pwdInput").toggleClass("d-none");
							$("#pwdUpdateForm").toggleClass("d-none");
							$("#pwdUpdateSussacc").css("display","block");
							hiddenpwd.val();
							myPwd.val();
							pwd.val();
							newPwd.val();
							
						}
					});
				}else{
					$("#message").text("????????? ??????????????? ????????????????????????.")
						       	.css("color","red");
				}
			}
		});
		
		//??????
		$("#leavePlusBtn").on("click",function(){
			$('#leaveplus').toggleClass("d-none");
		});
		$("#stay").on("click", function(){
			$('#leaveplus').toggleClass("d-none");
		})
		$("#leave").on("click", function(){
			var memId = "${sessionScope.memId}";
			var jsondata = {"memId": memId};
			$.ajax({
				url: "memberDelete.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(){
					leave.submit();
				}
			});
		});
		
		//????????????
		 $("#statusChange").on("click", function(){
			 $("#status").css("display", "block");
		});
	</script>
</body>
</html>