<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div id="totalProjectEditBar" class="top-banner-1 top-select"
		style="display: none">
		<div class="top-banner-2">
			<ul id="totalEditButton" class="total-edit-group">
				<li class="edit-button color"><a href="#"
					class="top-banner-icon-type-1"> <em></em>색상 설정
				</a></li>
				<li class="edit-button label"><a href="#"
					class="top-banner-icon-type-2"> <em></em>프로젝트 폴더 설정
				</a></li>
				<li class="edit-button push"><a href="#"
					class="top-banner-icon-type-3"> <em></em>알림 설정
				</a></li>
				<li class="edit-button hidden js-hidden"><a href="#"
					class="top-banner-icon-type-4"> <em></em>숨김
				</a></li>
				<li class="edit-button hidden js-cancel-hidden"><a href="#"
					class="top-banner-icon-type-4"> <em></em>숨김 취소
				</a></li>
			</ul>
			<div id="totalEditSelect" class="menu-text-popup-1">
				<span class="select-count"></span> <em class="select-clear">선택취소</em>
			</div>
		</div>
		<a href="#" id="editBarCloseButton"
			class="main-container-close-button-1"></a>
	</div>

	<div id="topSettingBar" class="main-header">
		<div id="mainTop" class="title-1">프로젝트 홈</div>


		<span id="allCollectionCount"
			class="js-collection-total-count js-collection-count top-task-num"></span>


		<div id="projectHomeTop" class="main-sub-header">
			<div class="home-menu clearfix">
				<div class="home-menu-left">
					<a href="#">
						<div id="BoardTypeButton"
							class="menu-select-icon-type-1 type-button js-mouseover"
							mouseover-text="바둑판형"></div>
					</a> <a href="#">
						<div id="ListTypeButton"
							class="menu-select-icon-type-2 type-button js-mouseover"
							mouseover-text="리스트형"></div>
					</a>
				</div>
				<div class="home-menu-right">
					<a href="#" id="projectOrderButton"
						class="js-project-order-button project-order-button">
						<div id="projectOrderList"
							class="js-project-order-layer menu-popup-layer-1"
							style="display: none;">
							<ul class="menu-popup-t-1">
								<li class="order-item" code="0"><i></i><span>최신
										순(글/댓글)</span></li>
								<li class="order-item" code="1"><i></i><span>내가 작성한
										순 (글/댓글)</span></li>
								<li class="order-item" code="2"><i></i><span>오름차순(ㄱ~ㅎ)</span></li>
								<li class="order-item" code="3"><i></i><span>내림차순
										(ㅎ~ㄱ)</span></li>
							</ul>
							<ul class="menu-popup-t-2">
								<li class="filter-item" code="0"><i></i><span>내가
										참여중인 프로젝트</span></li>
								<li class="filter-item" code="1"><i></i><span>내가
										관리자인 프로젝트</span></li>
							</ul>
						</div> <i class="menu-select-icon-type-3"></i>
						<div class="menu-select-icon-type-4-text">정렬</div>
					</a> <a href="#" id="totalProjectEditButton"
						class="project-edit-button">
						<div class="menu-select-icon-type-4"></div> <span
						class="menu-select-icon-type-4-text">설정</span>
					</a>
				</div>
			</div>
		</div>
		<div id="detailTop" class="project-detail title-1 d-none">
			<div class="project-detail-header">
				<div class="project-color-area">
					<i id="projectColor" class="project-color color-code-2"></i>
				</div>
				<div class="project-header-group">
					<div class="project-title-area">
						<div class="project-option-area">
							<button id="projectStar" class="bookmark-button unstar">
								<span class="blind">즐겨찾기</span>
							</button>
							<button id="detailSettingTopButton" class="set-btn">
								<span></span> <span></span> <span></span>
							</button>
							<div id="detailSettingLayer" class="project-setup-wrap"
								style="display: none">
								<div class="project-setup-header">
									<span>프로젝트 번호</span> <em id="detailSettingProjectSrno"></em>
								</div>
								<ul id="detailSettingGroup" class="setup-group">
									<li id="detailSettingColorBtn"><a href="#"> <i
											class="icon-set-color"></i>색상 설정
									</a></li>
									<li id="detailSettingLabelBtn"><a href="#"> <i
											class="icon-set-label"></i>프로젝트 폴더 설정
									</a></li>
									<li id="detailSettingPushAlarmBtn"><a href="#"> <i
											class="icon-set-alarm"></i>알림 설정
									</a></li>
									<li id="detailSettingHideBtn"><a id="hideText" href="#">
											<i class="icon-set-hide"></i>
									</a></li>
									<li id="detailSettingProjectExitBtn"><a href="#"> <i
											class="icon-set-out"></i>프로젝트 나가기
									</a></li>
									<li id="detailSettingProjectUpdateBtn"><a href="#"> <i
											class="icon-set-modify"></i>프로젝트 수정
									</a></li>
									<li id="detailSettingProjectDeleteBtn"><a href="#"> <i
											class="icon-set-delete"></i>프로젝트 삭제
									</a></li>
								</ul>
							</div>
						</div>
						<h3 id="projectTitle" class="project-title ellipsis js-mouseover"
							mouseover-text=""></h3>
						<ul class="project-status-group">
							<li id="lockIcon" class="d-none"><i
								class="sprite-detail icon-locked js-icon-locked"><span
									class="blind">관리자 승인 필요</span></i>
								<div class="tooltip-square">
									<em class="tooltip-title">관리자 승인 필요</em>
									<p class="tooltip-text">프로젝트 관리자의 승인 후 참여가 가능한 프로젝트입니다.</p>
								</div></li>
							<li id="companyIcon" class="d-none"><i
								class="sprite-detail icon-company js-icon-company"><span
									class="blind">회사 프로젝트</span></i>
								<div class="tooltip-square">
									<em class="tooltip-title">회사 프로젝트</em>
									<p class="tooltip-text">회사 직원 모두가 자동 참여되는 프로젝트로 임의로 참여자를
										내보내거나 외부 직원을 초대할 수 없습니다.</p>
								</div></li>
							<li id="openProjIcon" class="d-none"><i
								class="sprite-detail icon-open-project js-icon-open-project"><span
									class="blind">회사 공개 프로젝트</span></i>
								<div class="tooltip-square">
									<em class="tooltip-title">회사 공개 프로젝트</em>
									<p class="tooltip-text">우리 회사 직원이라면 누구나 직접 참여를 요청할 수 있습니다.</p>
								</div></li>
							<li id="unalarmIcon" class="d-none"><i
								class="sprite-detail icon-unalarm js-icon-un-alarm"><span
									class="blind">푸시 알림 OFF</span></i>
								<div class="tooltip-square">
									<em class="tooltip-title">푸시 알림 OFF</em>
									<p class="tooltip-text">휴대폰 푸시 또는 브라우저에 알림이 가지 않습니다. 프로젝트
										[알림 설정]메뉴에서 변경할 수 있습니다.</p>
								</div></li>
							<li style="display: none"><i class="icons-public"></i></li>
							<li id="externalIcon" style="display: none"><span
								class="icon-out-display js-mouseover"
								mouseover-text="프로젝트에 외부 사용자가 있습니다">외부</span></li>
						</ul>
					</div>
					<div class="project-description">
						<p id="projectContents" class="description-text">...</p>
						<!--<div class="tooltip-square"></div>-->
					</div>
				</div>
			</div>
			<button id="openInviteLayerBtn" type="button"
				class="project-invite-button color-type-1">
				<i class="icons-invite"></i>초대하기
			</button>
		</div>
	</div>

</body>
</html>