<%@page import="co.plus.prj.nwm.vo.NoticeWritingVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

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
				style="display: block">${fn:length(tasks)}</span>
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
									<form id="frm" name="frm" method="post">
										<i class="icons-search"></i> <input type="text" name="notiTtl"
											id="notiTtl" placeholder="업무명을 검색하세요!" autocomplete="off"
											maxlength="20"
											class="js-task-search-input project-search-input">
									</form>
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
										<li id="sortPopupButton"><span>보기 설정</span></li>
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


							<ul id="taskListProjectItem"
								class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask scroll-for-ie">
								<c:forEach var="task" items="${tasks }" varStatus="status">
									<li class="js-gubun-li">
										<div id="main" class="js-gubun-button all-task-project">
											<!-- active 클래스 추가시  -->
											<span class="project-title">${task.prjTtl }</span> <span
												class="project-task-count">50</span>
											<!-- 갯수 -->
											<%-- <div>${cnt }</div> --%>
										</div>
										
											<!-- style="display: none" -->
											<!-- li 태그 넣기 : 상세보기시에는 class="highlight" 추가-->
									</li>
								</c:forEach>
							</ul>

							<!-- 프로젝트 안 업무 목록 -->
							<ul class="js-inner-task project-inner-task active"
								style="display: block">
								<c:forEach var="dtasks" items="${tasks }">
								<li class="task-item ">
									<div class="js-task_num task-task_num-cell task-item-cell">
										<div class="js-task_num-text  ellipsis"=""="">${tasks.notiId }</div>
									</div>
									<div class="task-item-cell task-state task-stts-cell">
										<span class="js-task-state request">${tasks.tskPrgs }</span>
									</div>
									<div class="js-priority task-item-cell task-priority-cell ">
										<div class="js-priority-span rank-span">
											<i class=" small"></i> <span
												class="js-priority-text priority-text-cell ellipsis">
												-</span>
										</div>
									</div>
									<div class="task-item-cell task-name task-task_nm-cell ">
										<div class="js-post-title task-title ellipsis js-mouseover"
											mouseover-text="하위 업무 위치 찾기">
											하위 업무 위치 찾기 <em class="subtask-item" style="display: none"
												data=""> <i class="icons-subtask"></i> <span
												class="subtask-number">0</span>
											</em>
										</div>
										<div class="js-post-title project-title" style="display: none"
											data="">
											<i class="icons-project-1"></i>${tasks.prjTtl }
										</div>
									</div>
									<div class="js-workers task-item-cell task-worker_nm-cell ">
										<span class="js-mouseover" mouseover-text="QR"> <span
											class="js-worker-name manager ellipsis">${tasks.name}</span> <span
											class="js-worker-count"></span>
										</span>
									</div>
									<div class="js-workers task-item-cell task-worker_nm-cell ">
										<span class="js-mouseover" mouseover-text="QR"> <span
											class="js-worker-name manager ellipsis">${tasks.name}</span> <span
											class="js-worker-count"></span>
										</span>
									</div>
									<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
										<div class="js-edtr_dt-text  ellipsis"=""="">${tasks.tskBgnDt}</div>

									</div>
									<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
										<div class="js-edtr_dt-text  ellipsis"=""="">${tasks.tskEndDt}</div>

									</div>
									<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
										<div class="js-edtr_dt-text  ellipsis"=""="">${tasks.notiDttm}</div>

									</div>
								</li>
								</c:forEach>
							</ul>
							
							
							<!-- li 태그 넣기 -->
							<ul id="taskListItem" class="d-none">
								<li id="allTask-{COLABO_COMMT_SRNO}" class="task-item {LI_STTS}"
									data-project-srno="{COLABO_SRNO}"
									data-post-srno="{COLABO_COMMT_SRNO}"
									data-task-srno="{TASK_SRNO}" data-post-code="4">업무 넣기</li>
							</ul>


							<!-- 전체 업무 > 설정 아이콘 > 보기설정 -->
							<div id="taskSortSettingPopupItem" style="display: none">
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
													class="invite-popup-list-type-2 ui-sortable scroll-mask">
													<li class="js-sort-li before_on" col-srno="1">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">번호</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<!-- active 클래스 추가시 on -->
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">상태</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">업무명</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">담당자</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">작성자</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">시작일</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">마감일</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="{COL_SRNO}">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">등록일시</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
												</ul>
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
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 전체 업무 -> 목록 접고 펼치기 -->
	<script type="text/javascript">
		var main = document.querySelectorAll("#main");
		$(main).click(function(event) {
			console.log(event);
			var et = $(event.target);
			et.toggleClass("active");
			et.next("ul").toggle();
			
		});
	</script>
</body>
</html>