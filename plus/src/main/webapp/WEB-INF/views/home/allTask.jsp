<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1" style="display: block">
				<div>전체 업무</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block">50</span>
		</div>

		<!-- 전체 업무 페이지 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: block;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">

					<div class="allTaskLayer full-width small-style-wrap-2 d-none"
						style="display: block;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="업무명을 검색하세요!" autocomplete="off" maxlength="20"
										class="js-task-search-input project-search-input">
								</div>
							</div>

							<ul class="btns-area">
								<li>
									<button id="taskSettingButton"
										class="task-nav-button task-setting js-alltask-setting-button">
										<i class="icon-setting"></i>
									</button>
									<ul class="js-alltask-setting-layer menu-popup-wrap">
										<!-- taskSettingButton 누르면 style="display:block" 추가-->
										<li id="bundleButton"
											class="js-task-bundle-button js-bundle-list"><span>묶어보기</span><i
											class="icons-right-3"></i></li> <!-- 누르면  id="taskSortSettingPopupItem" display 설정 바꾸기-->
										<li id="sortPopupButton"><span>보기 설정</span></li>
									</ul>
									<ul id="bundleLayer"
										class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
										<li class="js-bundle-li" view-gb="0">없음</li>
										<li class="js-bundle-li" view-gb="1">상태</li>
										<li class="js-bundle-li" view-gb="2">마감일</li>
										<li class="js-bundle-li" view-gb="3">프로젝트</li>
									</ul>
								</li>
							</ul>
						</div>

						<section class="all-task-seaction">
							<h3 class="blind">모든업무 목록</h3>
							<div id="taskSortHeader" class="all-task-header scroll-for-ie">
								<div col-srno="1"
									class="js-task-sort-button task-header-cell task-task_num-cell">
									<span class="title js-task-sort-inner-button">번호</span>
								</div>
								<div col-srno="2"
									class="js-task-sort-button task-header-cell task-stts-cell">
									<span class="title js-task-sort-inner-button">상태</span>
								</div>
								<div col-srno="3"
									class="js-task-sort-button task-header-cell task-task_nm-cell task-name js-task-more">
									<span class="title js-task-sort-inner-button">업무명</span>
								</div>
								<div col-srno="4"
									class="js-task-sort-button task-header-cell task-worker_nm-cell">
									<span class="title js-task-sort-inner-button">담당자</span>
								</div>
								<div col-srno="5"
									class="js-task-sort-button task-header-cell task-rgsr_nm-cell">
									<span class="title js-task-sort-inner-button">작성자</span>
								</div>
								<div col-srno="6"
									class="js-task-sort-button task-header-cell task-start_dt-cell">
									<span class="title js-task-sort-inner-button">시작일</span>
								</div>
								<div col-srno="7"
									class="js-task-sort-button task-header-cell task-end_dt-cell">
									<span class="title js-task-sort-inner-button">마감일</span>
								</div>
								<div col-srno="8"
									class="js-task-sort-button task-header-cell task-rgsn_dt-cell">
									<span class="title js-task-sort-inner-button">등록일시</span>
								</div>
							</div>


							<ul id="taskListProjectItem" class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask scroll-for-ie">
								<li class="js-gubun-li">
									<div class="js-gubun-button all-task-project">								<!-- active 클래스 추가시  -->
										<span class="project-title">프로젝트 타이틀</span> <span
											class="project-task-count">50</span><!-- 갯수 -->
									</div>
									<ul class="js-inner-task project-inner-task active" style="display:block">	<!-- style="display: none" -->
										<!-- li 태그 넣기 : 상세보기시에는 class="highlight" 추가-->
									</ul>
								</li>
							</ul>


							<!-- li 태그 넣기 -->
							<ul id="taskListItem" class="d-none">
								<li id="allTask-{COLABO_COMMT_SRNO}" class="task-item {LI_STTS}"
									data-project-srno="{COLABO_SRNO}"
									data-post-srno="{COLABO_COMMT_SRNO}"
									data-task-srno="{TASK_SRNO}" data-post-code="4">
									업무</li>
							</ul>

							<div id="taskListNomalItem" class="d-none">
								<div class="{NOMAL_CLASS} {CELL_CLASS} task-item-cell">
									<div class="{NOMAL_TEXT_CLASS} ellipsis"{mouseover}>{NOMAL}</div>
								</div>
							</div>

							<!-- 묶어보기 : -->
							<div id="taskListPriorityItem" class="d-none">
								<div class="js-priority task-item-cell {CELL_CLASS}">
									<div class="js-priority-span rank-span">
										<i class="{PRIORITY_ICON} small"></i> <span
											class="js-priority-text priority-text-cell ellipsis">
											{PRIORITY}</span>
									</div>
								</div>
							</div>
							
							<!-- 묶어보기 : 상태 -->
							<div id="taskListStatusItem" class="d-none">
								<div class="task-item-cell task-state {CELL_CLASS}">
									<span class="js-task-state {STTS}">{STTS_TITLE}</span>
								</div>
							</div>
							<div id="taskListTitleItem" class="d-none">
								<div class="task-item-cell task-name {CELL_CLASS}">
									<div class="js-post-title task-title ellipsis js-mouseover"
										mouseover-text="{TASK_NM}">
										{TASK_NM} <em class="subtask-item"{subtask-display}> <i
											class="icons-subtask"></i> <span class="subtask-number">{SUBTASK_CNT}</span>
										</em>
									</div>
									<div class="js-post-title project-title"{project_display}>
										<i class="icons-project-1"></i>{PRJ_TTL}
									</div>
								</div>
							</div>

							<div id="taskListWorkerItem" class="d-none">
								<div class="js-workers task-item-cell {CELL_CLASS}">
									<span class="js-mouseover"
										mouseover-text="{MOUSEOVER_WORKER_LIST}"> <span
										class="js-worker-name manager ellipsis">{WORKER}</span> <span
										class="js-worker-count">{WORKER_COUNT}</span>
									</span>
								</div>
							</div>

							<div id="taskListProgressItem" class="d-none">
								<div class="task-item-cell task-progress-bar {CELL_CLASS}">
									<span class="progress-bar"> <span
										class="js-progress-bar {progress-class}"{progress}></span>
									</span>
								</div>
							</div>

							<div id="taskSortSettingPopupItem" style="display: none;">
								<div class=" flow-all-background-1 back-area">
									<div class="flow-project-make-1 back-area">
										<div class="flow-project-make-2 back-area">
											<div id="sortLayer"
												class="project-invite-popup-1 task-view-popup">
												<div class="name-type-seach-popup-header-type-1">
													<span>보기 설정</span>
													<button class="close-button flow-close-type-1"></button>
												</div>
												<p class="task-set-description">
													항목 순서 변경과 조회할 항목을 선택할 수 있습니다. <em>업무명은 필수 항목입니다.</em>
												</p>
												<ul id="taskSortList"
													class="invite-popup-list-type-2 ui-sortable scroll-mask"></ul>
												<div class="flow-pop-button-type-1">
													<a href="#">
														<div class="js-init-button flow-pop-sub-button-1">초기화</div>
													</a> <a href="#">
														<div class="js-save-button flow-pop-sub-button-2">저장</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>


							<!-- 전체 업무 > 설정 아이콘 > 보기설정 -->
							<ul id="taskSortPopupLiItem" style="display: none;">
								<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
									<div class="task-set-item">
										<span class="task-set-move-handle"></span> <span
											class="task-set-title">{COL_NM}</span>
										<button type="button"
											class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
											<i class="handle"></i>
										</button>
									</div>
								</li>
							</ul>
							<ul id="taskContentUl"
								class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask">
							</ul>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>