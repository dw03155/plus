<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>

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
		height:450px;
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
								<li class="js-my-setting-left"><a id="accountSettingBtn"
									href="#">마이페이지</a>
								</li>
								<li class="js-my-setting-left"><a id="preferencesBtn"
									href="#">알림</a>
								</li>
								<li class="js-my-setting-left"><a id="deviceManagementBtn"
									href="#">잠금설정</a>
								</li>
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
								<li class="edit-input adjust">
									<div class="my-right-list-1">이름</div>
									<div class="read-mode d-block">
										<div class="js-user-name my-right-list-2"></div>
									</div> <a href="#" class="poly-icon-1 change-editor-btn"></a>
									<div class="editor-mode d-none">
										<div class="my-right-list-2 my-type-text-1">
											<input id="editor_user_name" type="text" maxlength="20"
												autocomplete="off" data-required-yn="Y" data-valid="name"
												data-empty-msg="이름을 입력해주세요!" data-over-msg=""
												data-un-valid-msg="특수문자를 사용할 수 없습니다">
											<div class="btn-fr-wrap">
												<a href="#">
													<div class="my-button-cc cancel-change">취소</div>
												</a><a href="#">
													<div
														class="js-account-set-button js-account-set-button my-button-ok change-ok"
														gubun="1">확인</div>
												</a>
											</div>
										</div>
									</div>
								</li>
								<li class="edit-input js-company-set adjust">
									<div>
										<div class="my-right-list-1">회사명</div>
										<div class="read-mode d-block">
											<div id="companyName" class="my-right-list-2"></div>
										</div>
										<a href="#" class="poly-icon-1 change-editor-btn"></a>
										<div class="editor-mode d-none">
											<div class="my-right-list-2 my-type-text-1">
												<input id="editor_companyNm" type="text" autocomplete="off"
													maxlength="50" data-valid="name"
													data-un-valid-msg="특수문자를 사용할 수 없습니다">
												<div class="btn-fr-wrap">
													<a href="#">
														<div class="my-button-cc cancel-change">취소</div>
													</a><a href="#">
														<div class="js-account-set-button my-button-ok change-ok"
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
										<div id="dvsnName" class="my-right-list-2"></div>
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
										<div id="position" class="my-right-list-2"></div>
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
										<div id="phoneNum" class="my-right-list-2"></div>
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
										<div id="companyPhoneNum" class="my-right-list-2"></div>
										<a href="#" class="poly-icon-1 change-editor-btn"></a>
									</div>
									<div class="editor-mode d-none">
										<div class="my-right-list-2 my-type-text-1">
											<select id="editor_company_contury_code" class="my-select-1">
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
														data-over-msg="" data-un-valid-msg="6자 이상의 영문,숫자를 입력하세요."
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
						        <div class="my-right-list-1">
						          푸시 설정
						        </div>
						        <div class="my-right-list-3">
						          새로운 글, 댓글, 채팅의 실시간 알림을 받습니다.
						          <button type="button" id="pushAlamSetting" class="toggle-button my-check-1">
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
						          <button type="button" id="doNotDisturbSetting" class="toggle-button my-check-1">
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
						            </select>
						            <span class="my-mk-1">~</span>
						            <select id="doNotDisturbEndTime" class="my-type-1">
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
				                        <button type="button" id="lockModeSetting" class="toggle-button my-check-1">
				                            <!-- active 클래스로 제어  -->
				                            <i class="handle"></i>
				                        </button>
				                    </div>
				                </li>
				                <li>
				                    <div class="my-right-list-1"></div>
				                    <div class="my-right-list-2">
				                        시간 설정
				                        <select id="lockTime" class="my-type-5">
				                            <option value="1">
				                                1분
				                            </option>
				                            <option value="5">
				                                5분
				                            </option>
				                            <option value="10">
				                                10분
				                            </option>
				                            <option value="30">
				                                30분
				                            </option>
				                            <option value="60">
				                                1 시간
				                            </option>
				                            <option value="120">
				                                2 시간
				                            </option>
				                            <option value="180">
				                                3 시간
				                            </option>
				                            <option value="240" selected>
				                                4 시간
				                            </option>
				                            <option value="300">
				                                5 시간
				                            </option>
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

	<script>
		$("#mySettingOpenBtn").on("click", function() {
			$("#MySettiong").css("display", "block");
			$("#pushAlamGroup").css("display","none");
			$("#mylock").css("display","none");
			$("#mySet").css("display", "block");
			
		});
		$(".my-button-close-1").on("click", function(){
			$("#MySettiong").css("display", "none");
		});
	
		$("#accountSettingBtn").on("click", function(){
			$("#mySet").css("display", "block");
			$("#pushAlamGroup").css("display","none");
			$("#mylock").css("display","none");
		});
		
		$("#preferencesBtn").on("click", function(){
			$("#pushAlamGroup").css("display","block");
			$("#mySet").css("display", "none");
			$("#mylock").css("display","none");
		});
		
		$("#deviceManagementBtn").on("click", function(){
			$("#mylock").css("display","block");
			$("#mySet").css("display", "none");
			$("#pushAlamGroup").css("display","none");
		});
		
	</script>
</body>
</html>