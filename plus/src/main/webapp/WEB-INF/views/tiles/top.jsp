<%@page import="java.awt.print.Printable"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">
<link rel="stylesheet" href="flow-renewal/dist/css/mini.min.css">

<title>Insert title here</title>
<style>
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
}

.my-left-style {
	width: 20%;
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
</style>

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
				<span id="ProfileImg" class="profile-area"
					style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></span>
			</button>
		</div>
		<ul id="accountLayer" class="modal-account d-none">
			<li class="user-area">
				<p class="js-profile user-img"
					style="background-image: url(&quot;flow-renewal/assets/images/profile-default.png&quot;), url(&quot;flow-renewal/assets/images/profile-default.png&quot;);"></p>
				<div class="user-info">
					<strong class="js-user-name js-mouseover"> <%=(String)session.getAttribute("name")%>     </strong> <span>이용중</span>
				</div>
			</li>

			<li class="user-status"><i class="icon-status"></i> 상태 변경</li>
			<li id="topProfile" class="user-profile"><i
				class="icons-person-3"></i> 내 프로필</li>
			<li id="mySettingOpenBtn"><i class="icons-set"></i> 환경설정</li>
			<li id="logoutBtn" onclick="location.href='logout.do'"><i class="icons-logout"></i> 로그아웃</li>
		</ul>
	</header>

	<div id="MySettiong" class="model" style="display: none">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="innerMySettingPopup" class="my-layer-type-3">
					<div class="my-layer-header">
						<div class="my-layer-header-1">
							<a href="#" id="mySettingPopupCloseBtn" class="my-button-close-1"></a>
							<div id="myPicture" class="my-prop-picture">
								<a id="editorProfilePhotoBtn" href="#" class="my-button-1"></a>
							</div>
							<span id="accountSetting" class="js-my-setting-title">환경설정</span>
						</div>

						<!-- 환경설정 메뉴 -->
						<div class="my-left-style">
							<ul class="my-popup-left-header" id="mySettingLeftMenu">
								<li id="myPageBtn" class="js-my-setting-left" style="color: #6449FC"><a id="accountSettingBtn"
									href="#">마이페이지</a></li>
								<li id="pushAlamBtn" class="js-my-setting-left"><a id="preferencesBtn"
									href="#">알림</a></li>
								<li id="lookBtn" class="js-my-setting-left"><a id="deviceManagementBtn"
									href="#">잠금설정</a></li>
							</ul>
						</div>

						<!-- 환경설정 메뉴내용 -->
						<div id="accountSettingLayer" class="js-my-scroll-layer">
							<div class="my-right-style adjust">
								<div id="mySet" style="display: none">
									<ul>
										<li class="edit-input js-email-set adjust">
											<div class="my-right-list-1">이메일</div>
											<div class="read-mode d-block">
												<div id="email" class="my-right-list-2"></div>
											</div>
										</li>
										<li class="edit-input js-company-set adjust">
											<div>
												<div class="my-right-list-1">이름</div>
												<div id="nameInput" class="read-mode d-block">
													<div id="name" class="my-right-list-2"></div>
												</div>
												<a id="nameUpdateBtn" href="#" class="poly-icon-1 change-editor-btn"></a>
												<div id="nameUpdateForm" class="editor-mode d-none">
													<div class="my-right-list-2 my-type-text-1">
														<input type="hidden" id="memIdHidden" value='${sessionScope.memId}'>
														<input id="editor_name" type="text"
															autocomplete="off" maxlength="50" data-valid="name"
															data-un-valid-msg="특수문자를 사용할 수 없습니다">
														<div class="btn-fr-wrap">
															<a href="#">
																<div id="noNameUpdate" class="my-button-cc cancel-change">취소</div>
															</a><a href="#">
																<div id="nameUpdate" class="js-account-set-button my-button-ok" gubun="7">확인</div>
															</a>
														</div>
													</div>
												</div>
											</div>

										</li>
										<li class="edit-input js-company-set adjust">
											<div>
												<div class="my-right-list-1">회사명</div>
												<div class="read-mode d-block">
													<div id="coName" class="my-right-list-2"></div>
												</div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
												<div class="editor-mode d-none">
													<div class="my-right-list-2 my-type-text-1">
														<input id="editor_companyNm" type="text"
															autocomplete="off" maxlength="50" data-valid="name"
															data-un-valid-msg="특수문자를 사용할 수 없습니다">
														<div class="btn-fr-wrap">
															<a href="#">
																<div class="my-button-cc cancel-change">취소</div>
															</a><a href="#">
																<div
																	class="js-account-set-button my-button-ok change-ok"
																	gubun="7">확인</div>
															</a>
														</div>
													</div>
												</div>
											</div>

										</li>
										<li class="edit-input js-dvsn-set adjust">
											<div class="my-right-list-1">부서명</div>
											<div class="read-mode d-block">
												<div id="dept" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_dvsnNm" type="text" autocomplete="off"
														maxlength="50" data-valid="name"
														data-un-valid-msg="특수문자를 사용할 수 없습니다">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="8">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">직책</div>
											<div class="read-mode d-block">
												<div id="wkpo" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<input id="editor_position" type="text" autocomplete="off"
														maxlength="50" data-over-msg="">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a><a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="4">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">휴대폰 번호</div>
											<div class="read-mode d-block">
												<div id="persTel" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<select class="my-select-1" id="editor_contury_code">
														<option>+82</option>
														<option>+855</option>
														<option>+1</option>
														<option>+81</option>
														<option>+86</option>
														<option>+852</option>
													</select> <input id="editor_phoneNum" type="text"
														class="my-text-input-1" autocomplete="off"
														data-valid="number" maxlength="20" data-over-msg=""
														data-un-valid-msg="전화번호는 숫자만 입력해주세요!"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a> <a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="3">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust">
											<div class="my-right-list-1">회사 연락처</div>
											<div class="read-mode d-block">
												<div id="coTel" class="my-right-list-2"></div>
												<a href="#" class="poly-icon-1 change-editor-btn"></a>
											</div>
											<div class="editor-mode d-none">
												<div class="my-right-list-2 my-type-text-1">
													<select id="editor_company_contury_code"
														class="my-select-1">
														<option>+82</option>
														<option>+855</option>
														<option>+1</option>
														<option>+81</option>
														<option>+86</option>
														<option>+852</option>
													</select> <input id="editor_companyPhoneNum" class="my-text-input-1"
														type="text" autocomplete="off" maxlength="20"
														data-over-msg="" data-valid="number"
														data-un-valid-msg="전화번호는 숫자만 입력해주세요!"
														style="min-width: 150px;">
													<div class="btn-fr-wrap">
														<a href="#">
															<div class="my-button-cc cancel-change">취소</div>
														</a> <a href="#">
															<div class="js-account-set-button my-button-ok change-ok"
																gubun="5">확인</div>
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="edit-input adjust" id="passwordArea">
											<div class="read-mode d-block">
												<div class="my-right-list-1">비밀번호</div>
												<div class="my-right-list-password">
													<strong class="password-alert">비밀번호 재설정이 가능합니다.</strong> <input
														type="password" id="normalPasswordInput"
														class="my-input-password-1 d-none" disabled
														placeholder="영문과 숫자를 포함한 6자리 이상"> <input
														type="password" id="bizplayPasswordInput"
														class="my-input-password-1 d-none" disabled
														placeholder="Bizplay 계정은 아래 버튼을 통해 비밀번호를 변경 하실 수 있습니다.">
													<button class="js-myset-password change-editor-btn">비밀번호
														재설정</button>
												</div>
											</div>
											<div class="editor-mode d-none">
												<ul>
													<li>
														<div class="my-right-list-1">비밀번호</div>
														<div class="my-right-list-2 edit-password">
															<a href="#"></a><span class="my-txt-t-1">비밀번호는 영문,
																숫자 포함 6자리 이상이어야 합니다.</span>
															<div class="btn-fr-wrap">
																<a href="#">
																	<div id="changePasswordCancel" class="my-button-cc">
																		취소</div>
																</a><a href="#">
																	<div id="changePasswordBtn" class="my-button-ok">확인
																	</div>
																</a>
															</div>
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">비밀번호</span> <input type="password"
																id="myPassword" class="my-input-password-2"
																autocomplete="off" data-required-yn="Y" maxlength="20"
																data-valid="password" data-empty-msg="비밀번호를 입력해주세요"
																data-over-msg=""
																data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
																placeholder="비밀번호를 입력해주세요">
														</div>
													</li>
													<li>
														<div class="my-right-list-1"></div>
														<div class="my-right-list-2">
															<span class="edit-tit">비밀번호 확인</span> <input
																type="password" class="my-input-password-2"
																id="myPassword2" autocomplete="off" data-required-yn="Y"
																maxlength="20" data-valid="password"
																data-empty-msg="비밀번호를 입력해주세요" data-over-msg=""
																data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
																placeholder="비밀번호를 다시 입력해주세요">
														</div>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>



								<!-- 알림 -->
								<div id="pushAlamGroup" style="display: none">
									<ul class="push-alarm-group">
										<li>
											<div class="my-right-list-1">푸시 설정</div>
											<div class="my-right-list-3">
												새로운 글, 댓글, 채팅의 실시간 알림을 받습니다.
												<button type="button" id="pushAlamSetting"
													class="toggle-button my-check-1">
													<!-- active 클래스로 제어  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												프로젝트 알림<a href="#">
													<div id="projectAlamSetting" class="my-check-2"></div>
												</a>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												채팅 알림<a href="#">
													<div id="chatAlamSetting" class="my-check-2-1"></div>
												</a>
											</div>
										</li>
									</ul>
									<ul id="doNotDisturbGroup" class="disturb-group">
										<li>
											<div class="my-right-list-1 mgt-20">방해 금지 모드</div>
											<div class="my-right-list-3 mgt-20">
												선택한 요일과 시간에 알림을 받지 않습니다.
												<button type="button" id="doNotDisturbSetting"
													class="toggle-button my-check-1">
													<!-- active 클래스로 제어  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1" id="notDisturbDailyEmpty"></div>
											<div class="my-right-list-2" id="notDisturbDailyList">
												요일
												<ul id="doNotDisturbDayby" class="my-dayby-w-1">
													<li class="my-dayby-1 day-of-the-week"><a href="#">일</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">월</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">화</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">수</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">목</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">금</a></li>
													<li class="my-dayby-1 day-of-the-week"><a href="#">토</a></li>
												</ul>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												시간
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

								<!-- 잠금설정 -->
								<div id="mylock" style="display: none">
									<ul class="lock-list">
										<li>
											<div class="my-right-list-1">잠금모드</div>
											<div class="my-right-list-3">
												설정한 시간 동안 사용하지 않으면 로그아웃 됩니다.
												<button type="button" id="lockModeSetting"
													class="toggle-button my-check-1">
													<!-- active 클래스로 제어  -->
													<i class="handle"></i>
												</button>
											</div>
										</li>
										<li>
											<div class="my-right-list-1"></div>
											<div class="my-right-list-2">
												시간 설정 <select id="lockTime" class="my-type-5">
													<option value="1">1분</option>
													<option value="5">5분</option>
													<option value="10">10분</option>
													<option value="30">30분</option>
													<option value="60">1 시간</option>
													<option value="120">2 시간</option>
													<option value="180">3 시간</option>
													<option value="240" selected>4 시간</option>
													<option value="300">5 시간</option>
												</select>
											</div>
										</li>
									</ul>
								</div>

								<button id="leaveFlowBtn" class="btn-leave">탈퇴</button>
							</div>
						</div>

						<div id="editorProfilePhoto" class="my-popup-pro-1-1 d-none">
							<a id="changeProfilePhotoBtn" href="#"> <span> <i
									class="icons-picture"></i> 사진 변경
							</span>
							</a> <a id="removeProfilePhotoBtn" href="#"> <span> <i
									class="icons-delete-2"></i> 삭제
							</span>
							</a>
						</div>
						<a href="#" id="mySettingPopupCloseBtn" class="my-button-close-1"></a>
					</div>
				</div>
			</div>
		</div>
	</div>



<!-- 조직도 ~ 채팅 id = mainBodyWrap 안의 내용, 팝업 실행해보고 안되면 안에 넣기-->

	<!-- 조직도 팝업 -->
	<article id="organizationLayer" class="side-wr" style="display: none">
		<div class="menu-top">
			<strong> 조직도</strong>
			<button id="organizationChartCloseBtn" class="btn-close">
				<i class="icons-close-1"></i>
			</button>
		</div>
		<div class="side-contents">
			<!-- 조직도 리스트 -->
			<strong id="companyName" class="org-tit"></strong>
			<div id="orgSearch" class="all-setup-type-2">
				<i class="icons-search"></i> <input id="organizationInput"
					type="text" class="all-setup-input-type-1"
					placeholder="이름 소속 연락처 내선 검색" autocomplete="off">
			</div>
			<div
				class="group-tree-wrap-1 coperate-section-position-fix-1 js-group-tree-wrap">
				<ul id="organizationChart">
				</ul>
				<div id="nullDvsnData" style="display: none;">
					<div class="group-sub-null-type-1"></div>
					<span>조직도가 존재하지 않습니다.</span>
				</div>
			</div>
		</div>

		<div id="emplArea" class="sub-drag-section-2" style="display: none">
			<div class="line-fixed-section-1">
				<div id="drag" class="sub-drag-icon-type-1 drag"></div>
			</div>
			<div class="sub-drag-header-type-2">
				<span class="dvsn-name" id="emplList-dvsnName"></span> <span
					id="resultSearch" class="empl-search-text d-none">검색 결과</span> <a
					id="emplAreaCloseBtn" href="#" class="group-close-type-1"></a>
			</div>

			<div class="sub-drag-picture-section-1">
				<div id="existEmplData" style="display: none">
					<ul id="organizationChart-emplList">
					</ul>
				</div>

				<div id="nullEmplData" class="null-empl-search"
					style="display: none;">
					<div class="null-wr">
						<div class="group-sub-null-type-1"></div>
						<span>검색 결과가 없습니다.</span>
					</div>
				</div>
			</div>
		</div>


		<div id="organizationItem" style="display: none">
			<li class="department-item" dvsn-cd="{dvsn-cd}" depth="{depth}"
				hgrn-dvsn-cd="{hgrn-dvsn-cd}" {margin-style}="">{group-icon} <em
				class="{button-class}"></em> <span style="cursor: pointer"
				class="group-tree-position-fix-type-{last-code} department-name group-tree-position-fix-type-1 {active}">{dvsn-nm}</span>
				<a href="#" class="js-dvsn-select coperate-check-type-1 d-none"
				{right-style}=""></a> <em class="{root-dvsn-line}"></em>
			</li>
		</div>

		<div id="chartDepthLineItem" style="display: none">
			<em class="chart-depth-line" {depth-line-left}=""></em>
		</div>

		<div id="emplListItem" style="display: none">
			<li class="js-participant-item" data-id="{USER_ID}"
				rcvr_cd="{USER_ID}" rcvr_gb="U" id="{id}"
				profile-image="{PRFL_PHTG}">
				<div class="mini-mode-text-sub-area-1">
					<div class="mini-mode-main-picture-1" {image}=""></div>
					<div class="mini-mode-area-list-type-1">
						<p>
							<strong id="name">{FLNM}</strong>{JBCL_NM}
						</p>
						<p class="mini-mode-text-gray-1">
							<span>{CMNM}</span> {DVSN_NM}
						</p>
					</div>
				</div> <a href="#" id="miniOrganizationChatButton"
				class="mini-mode-circle-type-1 js-participant-chat"> <i
					class="icons-chat"></i>
			</a>
				<div id="selectMemberBtn"
					class="my-check-2 select-member-btn d-none"></div>
			</li>
		</div>
	</article>









	<!-- 알림 팝업 -->
	<article id="alarmLayer" class="side-wr d-none">
		<div class="menu-top">
			<strong>알림</strong>
			<button class="js-close-event btn-close">
				<i class="icons-close-1"></i>
			</button>
		</div>
		<div class="side-contents">
			<ul id="notReadFilter" class="tab-menu">
				<li class=" js-alarm js-unread">미확인</li>
				<li class=" js-alarm js-read on">전체</li>
				<li id="readAllAlarm">모두읽음</li>
			</ul>
			<!-- 알림 리스트 -->
			<div class="all-setup-type-2">
				<i class="icons-search"></i> <input id="alarmSearchInput"
					type="text" class="all-setup-input-type-1" placeholder="검색"
					autocomplete="off"> <a href="#"
					id="alarmSearchFilterTopButton" class="all-setup-detail-text-1">옵션</a>
				<div id="alarmSearchFilterLayer" class="popup-filter-type-1 d-none">
					<div
						class="js-project-title js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="0">
						<a href="#"><span>프로젝트명</span><em></em></a>
					</div>
					<div
						class="js-contents js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="1">
						<a href="#"><span>내용</span><em></em></a>
					</div>
					<div
						class="js-register-id js-filter-item setup-detail-type-1 setup-active-type-1"
						data-num="2">
						<a href="#"><span>작성자</span><em></em></a>
					</div>
				</div>
			</div>
			<div class="name-setup-type-2 scroll-mask">
				<ul id="alarmUl">
				</ul>
			</div>
		</div>
		<div id="alarmItem" class="d-none">
			<li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}"
				colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}"
				alarm_action="{ALARM_ACTION}" alarm_status="{ALARM_STATUS}"
				toast_msg="{msg}" toast_cntn="{contents}">
				<div class="all-setup-picture-type-1" {profile}=""></div>
				<div class="all-text-wrap-type-1">
					<div class="all-setup-section-type-1">
						<span>{TTL}</span><em>{date}</em>
					</div>
					<div class="all-text-wrap-type-2 alarm-tit-ellipsis">
						<i class="{emojiIcon}"></i>{msg}
					</div>
					<div class="all-text-wrap-type-3">{task-name}{contents}</div>
					<div class="all-text-wrap-type-3">
						<span {img-display}=""> <em class="all-setup-icon-type-2"></em>이미지
						</span> <span {file-display}=""> <em class="all-setup-icon-type-1"></em>파일
						</span>
					</div>
				</div>
			</li>
		</div>

		<div id="projectAlarmItem" class="d-none">
			<li id="unread-{COLABO_COMMT_SRNO}" class="not-read-alarm-item"
				colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}"
				alarm_action="{ALARM_ACTION}" alarm_status="{ALARM_STATUS}"
				toast_msg="{msg}">
				<div class="unidentified-item profile">
					<span class="thumbnail size40 radius16" {profile}=""></span>
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
								<li {img-display}=""><span class="unidentified-image">이미지</span>
								</li>
								<li {file-display}=""><span class="unidentified-file">파일</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="unidentified-item button">
					<button type="button" class="unidentified-detail-btn">보기</button>
				</div>
			</li>
		</div>

	</article>








	<!-- 채팅 팝업 -->
	<article id="chattingLayer" class="side-wr d-none">
		<div class="menu-top">
			<strong>채팅</strong>
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
				<li id="chatBtn"><span class="popup-tab chat on" tabindex="0">채팅</span></li>
				<li id="contactBtn"><span class="popup-tab chat" tabindex="0">연락처</span>
				</li>
			</ul>
			<div class="popup-right">
				<button type="button" class="js-new-chat popup-button chat">
					<i class="icon-chat"></i> 새 채팅
				</button>
			</div>

			<div class="all-setup-type-2">
				<i class="icons-search"></i> <input id="chattingSearchInput"
					type="text" class="all-setup-input-type-1"
					placeholder="채팅방 또는 이름 검색" autocomplete="off">
			</div>
			<ul id="chatMemberList" class="participants-list contact-area d-none"></ul>
			<ul id="chattingUl"
				class="participants-list chat-list-area chat-list scroll-mask"></ul>
		</div>
		<div id="chattingItem" class="d-none">
			<li id="chatting-{ROOM_SRNO}" class="js-chatting-item"
				data-room-srno="{ROOM_SRNO}" data-bg-color-cd="{BG_COLOR_CD}"
				pin-yn="{PIN_YN}">
				<div class="mini-mode-text-sub-area-1">
					<div
						class="mini-mode-main-picture-1 mini-mode-chattng-type profile {profile-display-type}">{profile}
					</div>
					<div class="mini-mode-area-list-type-1">
						<p>
							<strong class="js-title">{ROOM_NM}</strong> <span
								class="mini-mode-chattng-type-2" {sendience-cnt-display}="">({SENDIENCE_CNT})</span>
							<i class="no-alarm mini-mode-chattng-icon-type-1"
								{no-alarm-display}=""></i> <i
								class="pin mini-mode-chattng-icon-type-2" {pin-display}=""></i>
						</p>
						<p class="mini-mode-text-gray-1">
							<i {img-display}="" class="js-image-icon all-setup-icon-type-2"></i><i
								{file-display}="" class="js-file-icon all-setup-icon-type-1"></i><span><a
								class="js-cntn">{CNTN}</a></span>
						</p>
					</div>
					<div class="mini-mode-chattng-type-3">
						<div class="mini-mode-chattng-type-text-1 not-read-count"
							{not-read-display}="">{NOT_READ_CNT}</div>
						<div class="mini-mode-chattng-type-text-2 js-date">{date}</div>
					</div>
				</div>
			</li>
		</div>
	</article>

	<script>
	//화면에 출력, 회원정보 가져오기	
	$("#mySettingOpenBtn").on("click", function() {
		$("#MySettiong").css("display", "block");
		$("#pushAlamGroup").css("display", "none");
		$("#mylock").css("display", "none");
		$("#mySet").css("display", "block");
		var memId = "${sessionScope.memId}";
		console.log(memId);
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
			}
		});
	});
		$(".my-button-close-1").on("click", function() {
			$("#MySettiong").css("display", "none");
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


		// 이름수정
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
			var memId = $("#memIdHidden").val();
			console.log(name);
			console.log(memId);
			$.ajax({
				url: "nameUpdate.do",
				method: "put",
				data: {memId:memId,name:name},
				contentType: "application/json",
				contentType: "json",
				success: function(data){
					console.log(data);
				}
			});
		});
	</script>
</body>
</html>