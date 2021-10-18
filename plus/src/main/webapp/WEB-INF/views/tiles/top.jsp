<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="topBanner" class="top-banner-area d-none">
		<div class="top-banner-1" banner="ie10">
			<div class="top-banner-type-2">
				<div class="top-banner-sub-type-2">
					<span>IE 10이하 버전은 지원하지 않습니다. 플로우 데스크탑 버전을 이용해 보세요!</span> <a
						href="#" class="top-banner-button">다운로드</a> <a href="#"
						class="top-banner-close-button"><i></i></a>
				</div>
			</div>
		</div>
		<div class="top-banner-1" banner="consult">
			<div class="top-banner-type-1">
				<div class="top-banner-sub-type-1">
					<span>30명 이상의 팀 또는 회사에서 이용하실 계획이신가요?</span> <a href="#"
						class="top-banner-button">별도 문의</a> <a href="#"
						class="top-banner-close-button"><i></i></a>
				</div>
			</div>
		</div>
		<div class="top-banner-1" banner="">
			<div class="top-banner-type-3">
				<div class="top-banner-sub-type-3">
					<span>플로우 데스크탑 버전을 이용해 보세요.</span> <a href="#"
						class="top-banner-button">다운로드</a> <a href="#"
						class="top-banner-close-button"><i></i></a>
				</div>
			</div>
		</div>
		<div class="top-banner-1" banner="">
			<div class="top-banner-type-4">
				<div class="top-banner-sub-type-4">
					<span>플로우 데스크탑 버전을 이용해 보세요.</span> <a href="#">사용하기</a> <a href="#">나중에
						하기</a> <a href="#">다시 물어보지 않기</a> <a href="#"
						class="top-banner-close-button"><i></i></a>
				</div>
			</div>
		</div>
		<div class="top-banner-1 alarm-banner d-none" banner="alarm-step-1">
			<span class="icons-alarm-wrapper"><i class="icons-alarm"></i></span>플로우
			브라우저 알림을 받아보세요! <a href="#" class="top-banner-close-button"><i></i></a>
			<a href="#" class="js-alarm-try top-banner-button">사용하기</a>
		</div>
		<div class="top-banner-1 alarm-banner type2 d-none"
			banner="alarm-step-2">
			<span class="icons-alarm-wrapper"><i class="icons-alarm"></i></span>알림을
			사용하지 않으면 중요한 알림을 놓치실 수 있습니다.
			<div class="alarm-button-area">
				<button type="button" class="js-alarm-try alarm-banner-button">사용하기</button>
				<button type="button" class="js-alarm-later alarm-banner-button">나중에
					하기</button>
				<button type="button" class="js-alarm-no alarm-banner-button">다시
					물어보지 않기</button>
			</div>
			<a href="#" class="top-banner-close-button"><i></i></a>
		</div>
	</div>
	<header class="header">
		<!-- 라이트 버전 클래스 .light -->
		<div class="top-state-wrap">
			<div id="electronNavi" class="electron-btn-navi d-none">
				<ul>
					<li class="js-history-back js-electron-navi"><a href="#"><i
							class="icon-btn-back"></i></a></li>
					<li class="js-history-forward js-electron-navi"><a href="#"><i
							class="icon-btn-next"></i></a></li>
					<li class="js-page-reload js-electron-navi"><a href="#"><i
							class="icon-btn-refresh js-reload-btn on"></i></a>
						<div id="electronReloadLayer"
							class="electron-load-wrap js-basic-menu js-plus-area d-none">
							<ul>
								<li data-code="reload" class="js-plus-area-item js-reload-menu"><a
									href="#">새로고침<em id="js-reload"></em></a></li>
								<li data-code="reload-force"
									class="js-plus-area-item js-reload-menu"><a href="#">강력
										새로고침 (캐시비우기)<em id="js-reload-force"></em>
								</a></li>
							</ul>
						</div></li>
				</ul>
			</div>
			<div id="versionTab" class="business-version-free d-none">
				<span class="d-day">D-<em class="js-grc-dt">30</em></span>
				<div class="business-free-text js-business-nm">
					비즈니스버전 무료 체험 중
					<p class="tooltip-square">
						<span id="versionMessage"></span><br /> <strong>무료기간
							종료시, 사용이 중지됩니다.</strong><br /> <span class="js-manager-call">관리자에게
							문의해주세요!</span>
					</p>
				</div>
				<button class="free-payment-button js-pay">결제하기</button>
			</div>
		</div>
		<div class="main-search-area cursor-pointer">
			<form id="searchPopupTopButton" class="main-search clearfix">
				<div class="main-search-box">
					<input type="text" class="cursor-pointer" placeholder="전체 검색"
						disabled />
					<!-- input value 값 존재 시 search-delete-button active  -->
					<button type="button"
						class="js-top-search-delete search-delete-button">
						<span class="blind">삭제</span>
					</button>
				</div>
				<button type="button" class="js-detail-search detail-search-button">옵션</button>
			</form>
			<div id="searchPopupLayer" class="name-type-seach-popup"
				data-search-area-code="IN_TONG"
				style="top: 0; right: -50%; display: none">
				<div class="search-popup-header">
					<div class="search-popup-input">
						<i class="js-search-icon icon-search"></i>
						<div class="js-add-section project-blue-button"></div>
						<input id="searchPopupInput" type="text"
							class="name-type-shift-txt" maxlength="20" autocomplete="off"
							placeholder="검색어를 입력해주세요" />
						<button class="js-search-del btn-search-delete">
							<i></i>
						</button>
						<button type="button" class="js-detail-search search-set-button">옵션</button>
					</div>
				</div>
				<div class="js-search-section-div">
					<p>
						카테고리
						<button class="js-mouseover" mouseover-noti="true"
							mouseover-text="마지막 설정값이 유지됩니다.">
							<i class="icons-question"></i>
						</button>
					</p>
					<ul class="section-name-list">
						<li data-code="project"
							class="js-search-section section-name-type-1"><a href="#">
								<div class="section-name-icon-1"></div> <span
								class="js-section-name">프로젝트</span> <!--<span>(Alt + P)</span>-->
						</a></li>
						<li data-code="post" class="js-search-section section-name-type-2"><a
							href="#">
								<div class="section-name-icon-2"></div> <span
								class="js-section-name">글 · 댓글</span> <!--<span>(Alt + W)</span>-->
						</a></li>
						<li data-code="file" class="js-search-section section-name-type-4"><a
							href="#">
								<div class="section-name-icon-4"></div> <span
								class="js-section-name">파일</span> <!--<span>(Alt + F)</span>-->
						</a></li>
					</ul>
				</div>
				<div id="detailSearchArea">
					<p>검색 옵션</p>
					<div class="detail-search-conditions">
						<ul class="conditions-group">
							<li class="js-project-name-search-filter" style="display: none">
								<div class="condition-cell title">프로젝트</div>
								<div class="condition-cell">
									<input type="text" />
								</div>
							</li>
							<li class="js-register-name-search-filter" style="display: none">
								<div class="condition-cell title">작성자</div>
								<div class="condition-cell">
									<input type="text" />
								</div>
							</li>
							<li class="js-participant-name-search-filter"
								style="display: none">
								<div class="condition-cell title">참여자</div>
								<div class="condition-cell">
									<input type="text" />
								</div>
							</li>
							<li class="js-period-type-search-filter">
								<div class="condition-cell title">기간 설정</div>
								<div class="condition-cell">
									<ul class="target-select-group"></ul>
								</div>
							</li>
							<li class="js-tmpl-type-search-filter" style="display: none">
								<div class="condition-cell title">대상</div>
								<div class="condition-cell">
									<ul class="target-select-group"></ul>
								</div>
							</li>
							<li class="js-file-type-search-filter" style="display: none">
								<div class="condition-cell title">파일유형</div>
								<div class="condition-cell">
									<ul class="target-select-group"></ul>
								</div>
							</li>
						</ul>
						<div class="condition-button-area">
							<div class="condition-left">
								<button type="button" class="js-filter-reset condition-reset">
									초기화</button>
							</div>
							<div class="condition-right">
								<button class="js-filter-cancel condition-button cancel">취소</button>
								<button class="js-filter-search condition-button search">검색</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="rightTopMenu" class="top-btns">
			<button type="button" id="recommendEvtTopBtn"
				class="top-recommend-evt-button" style="display: none">
				<i class="icons-recommend-evt"></i>&nbsp; <span> 소문내기 이벤트</span>
			</button>
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
				<span id="ProfileImg" class="profile-area"></span>
			</button>
		</div>
		<ul id="accountLayer" class="modal-account d-none">
			<li class="user-area">
				<p class="js-profile user-img"></p>
				<div class="user-info">
					<strong class="js-user-name js-mouseover"></strong> <span
						class="js-version"></span> <span>이용중</span>
				</div>
			</li>
			<!--
            <li class="user-status">
                <i class="icon-status"></i>
                상태 변경
            </li> -->
			<li id="topProfile" class="user-profile"><i
				class="icons-person-3"></i> 내 프로필</li>
			<li id="mySettingOpenBtn"><i class="icons-set"></i> 환경설정</li>
			<li id="desktopDownloadBtn" class="download-desktop"><i
				class="icons-donwload"></i> <span class="tooltip-square">데스크탑
					버전(설치형) 다운로드</span> PC 앱 다운로드</li>
			<li id="logoutBtn"><i class="icons-logout"></i> 로그아웃</li>
			<li id="miniOpenBtn" style="display: none">
				<button type="button" class="menu-popup-item">
					<i class="icon-my"></i> MINI-FLOW
				</button>
			</li>
			<li id="recommendEvtListBtn" style="display: none"><i
				class="icons-recommend-evt"></i> 소문내기 이벤트</li>
			<li id="prevVersionBtn" class="flow-switch">
				<button>
					<i></i>이전버전으로 돌아가기
				</button>
			</li>
		</ul>
	</header>
</body>
</html>