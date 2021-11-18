<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<style>
.parti_st {
	display: inline-block;
	width: 15px;
	position: relative;
	top: 27px;
	left: -14px;
	position: relative;
	top: 27px;
	top: 27px;
}
</style>
<head>
<meta charset="UTF-8">
<title>플러스(Plus)</title>
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"></script>
<script>
	$(function() {
		var $prjId = '${prjInfo.prjId}';
		var jsonData = {
			"prjId" : $prjId
		};

		$.ajax({
			url : "doughnutChart.do",
			type : "post",
			dataType : 'json',
			data : jsonData,
			success : function(data) {
				if (data != "") {
					var $DCData = [ 0, 0, 0, 0, 0 ];

					for (i = 0; i < data.length; i++) {
						if (data[i].tskPrgs == 'request') {
							$DCData[0] = data[i].tskCnt;
						} else if (data[i].tskPrgs == 'progress') {
							$DCData[1] = data[i].tskCnt;
						} else if (data[i].tskPrgs == 'feedback') {
							$DCData[2] = data[i].tskCnt;
						} else if (data[i].tskPrgs == 'complete') {
							$DCData[3] = data[i].tskCnt;
						} else if (data[i].tskPrgs == 'withhold') {
							$DCData[4] = data[i].tskCnt;
						}

					} //end of for

					var ctx = $('#myChart');
					var myChart = new Chart(ctx, {
						type : 'doughnut',
						labels : [ 'request', 'progress', 'feedback',
								'complete', 'withhold' ],
						data : {
							datasets : [ {
								data : $DCData,
								backgroundColor : [ '#4aaefb', // request
								'#50b766', // progress
								'#f17a19', // feedback
								'#2e417e', // complete
								'#d2d3d6' // hold
								]
							} ]
						}
					}); //end of myChart

				} else {
					$("#doughnutChartLayer").css("display", "none");
				}

			} //end of success
		}); //end of ajax
	}); //end of function
</script>
</head>

<body>

	<div class="main-container">
		<!-- 프로젝트 상세페이지 Top -->
		<div id="topSettingBar" class="main-header">
			<div id="detailTop" class="project-detail title-1">
				<div class="project-detail-header">
					<div class="project-color-area">
						<i id="projectColor"
							class="project-color color-code-${prjInfo.prjColor}"></i>
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
										<span>프로젝트 번호</span> <em id="detailSettingProjectSrno">${prjInfo.prjId}</em>
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
								mouseover-text="">${prjInfo.prjTtl}</h3>
							<ul class="project-status-group">
								<c:if test="${prjInfo.prjKnd == 'N'}">
									<li id="lockIcon" class="d-none"><i
										class="sprite-detail icon-locked js-icon-locked"><span
											class="blind">일반 프로젝트</span></i>
										<div class="tooltip-square">
											<em class="tooltip-title">일반 프로젝트</em>
											<p class="tooltip-text">프로젝트 관리자의 승인 후 참여가 가능한 프로젝트입니다.</p>
										</div></li>
								</c:if>
								<c:if test="${prjInfo.prjKnd == 'C'}">
									<li id="companyIcon" class="d-none"><i
										class="sprite-detail icon-company js-icon-company"><span
											class="blind">회사 프로젝트</span></i>
										<div class="tooltip-square">
											<em class="tooltip-title">회사 프로젝트</em>
											<p class="tooltip-text">우리 회사 직원이라면 누구나 볼 수 있습니다.</p>
										</div></li>
								</c:if>
								<c:if test="${prjInfo.prjOpenPerm == 'all'}">
									<li id="openProjIcon" class="d-none"><i
										class="sprite-detail icon-open-project js-icon-open-project"><span
											class="blind">전체공개 프로젝트</span></i>
										<div class="tooltip-square">
											<em class="tooltip-title">전체공개 프로젝트</em>
											<p class="tooltip-text">우리 회사 직원이라면 누구나 볼 수 있습니다.</p>
										</div></li>
								</c:if>
							</ul>
						</div>
						<div class="project-description">
							<p id="projectContents" class="description-text">${prjInfo.prjCntn}</p>
							<!--<div class="tooltip-square"></div>-->
						</div>
					</div>
				</div>
				<button id="openInviteLayerBtn" type="button"
					class="project-invite-button color-code-${prjInfo.prjColor}">
					<i class="icons-invite"></i>초대하기
				</button>
			</div>
		</div>


		<!-- 프로젝트 상세페이지 메뉴 + 검색창 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="detailLayer"
				class="main-sub-header project-detail-wrap d-none"
				style="display: block">
				<div class="project-detail-top clearfix">
					<ul id="detailTab" class="project-detail-menu">
						<!-- active class 붙이기 -->
						<li class="js-tab-item active"><a>홈</a></li>
						<li class="js-tab-item"><a>업무</a></li>
						<li class="js-tab-item"><a>캘린더</a></li>
					</ul>
					<div class="project-search-area all-file-header-type-3">
						<i class="icons-search"></i>
						<form name="frm" method="post">
						<div class="project-search">
							<input id="projectSearchInput" type="text"
								placeholder="검색어를 입력해주세요" class="project-search-input"
								autocomplete="off" maxlength="50" />
						</div>
						<input type="hidden" id="memId" value="${sessionScope.memId}">
								<input type="hidden" id="coUrl" value="${sessionScope.coUrl}">
						</form>
					</div>
				</div>



				<!-- 프로젝트 홈탭 -->
				<div class="project-detail-inner layer-scroll type2"
					style="display: block">
					<div class="js-detail-wrap-area small-style-wrap">
						<!-- project-detail-container-->
						<section id="postTimeline" class="project-detail-container"
							style="display: block">
							<div class="project-detail-content">

								<div>
									<c:if test="${tskAllCnt != 0}">
										<div class="detail-section reports-section">
											<div class="section-title-area">
												<h4 class="section-title">
													<span>업무리포트</span> <span class="section-number">${tskAllCnt}</span>
												</h4>
												<!-- class = off , display:none-->
												<button id="taskReportToggleButton" type="button"
													class="js-report-btn reports-button">
													<i class="ico-arrow"></i>
												</button>
											</div>
											<!-- 원형차트 -->
											<div id="doughnutChartLayer"
												class="js-task-report-layer d-none" style="display: block">
												<div class="taks-report">
													<!-- chart -->
													<div class="donut-chart-area">
														<div class="donut-chart">
															<canvas id="myChart" width="100" height="100"></canvas>
														</div>
													</div>
													<ul id="taskReportLayer" class="donut-chart-list">
														<li><c:forEach var="tskPrgsCnt"
																items="${tskPrgsCnts}">
																<c:if test="${tskPrgsCnt.tskPrgs == 'request'}">
																	<c:set var="tskChartClass" value="request" />
																	<c:set var="tskText" value="요청" />
																</c:if>
																<c:if test="${tskPrgsCnt.tskPrgs == 'progress'}">
																	<c:set var="tskChartClass" value="progress" />
																	<c:set var="tskText" value="진행" />
																</c:if>
																<c:if test="${tskPrgsCnt.tskPrgs == 'feedback'}">
																	<c:set var="tskChartClass" value="feedback" />
																	<c:set var="tskText" value="피드백" />
																</c:if>
																<c:if test="${tskPrgsCnt.tskPrgs == 'complete'}">
																	<c:set var="tskChartClass" value="complete" />
																	<c:set var="tskText" value="완료" />
																</c:if>
																<c:if test="${tskPrgsCnt.tskPrgs == 'withhold'}">
																	<c:set var="tskChartClass" value="hold" />
																	<c:set var="tskText" value="보류" />
																</c:if>
																<span class="task-chart-info ${tskChartClass}"> <i
																	class="chart-info-label"></i> <span
																	class="chart-info-text">${tskText}<em>${tskPrgsCnt.tskCnt}</em></span>
																	<span class="chart-info-percent"> <fmt:formatNumber
																			type="percent"
																			value="${tskPrgsCnt.tskCnt / tskAllCnt}" />
																</span>
																</span>
															</c:forEach></li>
													</ul>
												</div>
											</div>
											<!-- //원형차트 -->
										</div>
									</c:if>
								</div>
								<!-- 글 입력하기 -->
								<div id="createPostArea" class="work-design-wrapper">
									<ul id="createPostUl" class="work-design-group">
										<li class="post-filter" data-post-code="1"><i
											class="icons-write2"></i><span>글</span></li>
										<li class="post-filter" data-post-code="4"><i
											class="icons-task"></i><span>업무</span></li>
										<li class="post-filter" data-post-code="3"><i
											class="icons-schedule"></i><span>일정</span></li>
										<li class="post-filter" data-post-code="2"><i
											class="icons-todo"></i><span>할 일</span></li>
									</ul>
									<div class="work-desing-element">
										<p class="work-desing-text">
											<i class="cursor"></i>내용을 입력하세요.
										</p>
										<div class="work-icon-group">
											<i class="icons-file"></i> <i class="icons-picture"></i> <i
												class="icons-map"></i>
										</div>
									</div>
								</div>
							</div>

							<!-- 게시글 클릭시 a 태그에 class="highlight" -->
							<!-- 상단고정 -->
							<div id="projectPinArea"
								class="detail-section fix-section d-none" style="display: block">
								<c:if test="${fn:length(pincettes) != 0}">
									<div class="section-title-area">
										<h4 class="section-title">
											<span>상단고정</span> <span id="projectPinCount"
												class="section-number">${fn:length(pincettes)}</span>
										</h4>
									</div>
								</c:if>


								<ul id="pinPostUl" class="pin-list fixed-list">
									<c:forEach var="pincette" items="${pincettes}">
										<li class="js-pin-item"><a href="#"> <!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
												<c:if test="${pincette.notiKnd=='text'}">
													<c:set var="notiKndIcon" value="icons-write2" />
													<c:set var="notiKndSpan" value="글" />
												</c:if> <c:if test="${pincette.notiKnd=='task'}">
													<c:set var="notiKndIcon" value="icons-task" />
													<c:set var="notiKndSpan" value="업무" />
												</c:if> <c:if test="${pincette.notiKnd=='subtask'}">
													<c:set var="notiKndIcon" value="icons-task" />
													<c:set var="notiKndSpan" value="하위업무" />
												</c:if> <c:if test="${pincette.notiKnd=='todo'}">
													<c:set var="notiKndIcon" value="icons-todo" />
													<c:set var="notiKndSpan" value="할일" />
												</c:if> <c:if test="${pincette.notiKnd=='schedule'}">
													<c:set var="notiKndIcon" value="icons-schedule" />
													<c:set var="notiKndSpan" value="일정" />
												</c:if>
												<div class="fixed-kind">
													<i class="${notiKndIcon}"></i> <span>${notiKndSpan}</span>
												</div>
												<p class="js-post-title fixed-text ${taskStyle}">${pincette.notiTtl}</p>
												<div class="fixed-value">
													<!-- 업무일 때 -->
													<!-- 업무 진행상항 class="progress" 진행 /
												class="request" 요청 / class="completion"완료 /
												class="feedback"피드백 -->
													<c:if
														test="${pincette.notiKnd=='task' or pincette.notiKnd=='subtask'}">
														<c:if test="${pincette.addList=='withhold'}">
															<c:set var="taskPrgSpan" value="hold" />
															<c:set var="taskPrgText" value="보류" />
														</c:if>
														<c:if test="${pincette.addList=='progress'}">
															<c:set var="taskPrgSpan" value="progress" />
															<c:set var="taskPrgText" value="진행" />
														</c:if>
														<c:if test="${pincette.addList=='request'}">
															<c:set var="taskPrgSpan" value="request" />
															<c:set var="taskPrgText" value="요청" />
														</c:if>
														<c:if test="${pincette.addList=='feedback'}">
															<c:set var="taskPrgSpan" value="feedback" />
															<c:set var="taskPrgText" value="피드백" />
														</c:if>
														<c:if test="${pincette.addList=='complete'}">
															<c:set var="taskPrgSpan" value="completion" />
															<c:set var="taskPrgText" value="완료" />
														</c:if>
														<span
															class="js-task-state js-todo-state state ${taskPrgSpan}">${taskPrgText}</span>
													</c:if>
													<!-- 일정일 때 -->
													<c:if test="${pincette.notiKnd=='schedule'}">
														<div class="date-time">
															<em class="date">${fn:substring(pincette.addList, 0, 8)}</em>
															<span>${fn:substring(pincette.addList, 9, 14)} <%-- <fmt:parseDate pattern="yy/MM/dd HH:mm"
																	value="${fn:substring(pincette.addList, 9, 16)}" var="addTime" /> <fmt:formatDate
																	value="${addTime}" pattern="HH:mm" /> --%>
															</span>
														</div>
													</c:if>
													<!-- 할일일 때 -->
													<c:if test="${pincette.notiKnd=='todo'}">
														<span class="js-task-state js-todo-state state request">${pincette.addList}%</span>
													</c:if>
												</div>
										</a></li>
									</c:forEach>
								</ul>
							</div>
							<!-- //상단고정 -->


							<!-- 전체피드 -->
							<div id="projectFeedArea" class="detail-section feed-section">
								<div class="section-title-area">
									<h4 id="allPostsFilterTitle" class="section-title">전체</h4>
									<!--필터링 후 취소 버튼 노출 -->
									<span class="filter-reset js-filter-reset">취소</span>
									<div id="feedTypeButton" class="feed-type-area">
										<button type="button"
											class="js-feed-filter-button filter-button">
											<i class="icons-filter"></i> <span>필터</span>
										</button>
										<ul class="js-feed-filter-layer check-menu-popup d-none">
											<li>
												<div id="allNW" class="check-menu-item on">전체</div>
											</li>
											<li>
												<div id="txtNW" class="check-menu-item">글</div>
											</li>
											<li>
												<div id="tskNW" class="check-menu-item">업무</div>
											</li>
											<li>
												<div id="scheNW"  class="check-menu-item">일정</div>
											</li>
											<li>
												<div id="todoNW" class="check-menu-item">할 일</div>
											</li>
										</ul>
									</div>
								</div>


								<!-- 게시글 목록 -->
								<div class="feed-content">
									<c:if test="${fn:length(nwLists) != 0}">
										<ul id="detailUl" class="post-group list"
											style="display: block">
											<!-- 반복 시작 -->
											<c:forEach var="nwList" items="${nwLists}">
												<li id="myPcontent"
													class="js-popup-before detail-item back-area">
													<!-- 리스트 타입 -->
													<div class="js-post-nav list-item post-list-wrapper"
														style="display: block">
														<div class="fixed-list">
															<a href="#"> <!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
																<c:if test="${nwList.notiKnd=='text'}">
																	<c:set var="notiKindIcon" value="icons-write2" />
																	<c:set var="notiKindSpan" value="글" />
																</c:if> <c:if test="${nwList.notiKnd=='todo'}">
																	<c:set var="notiKindIcon" value="icons-todo" />
																	<c:set var="notiKindSpan" value="할일" />
																</c:if> <c:if test="${nwList.notiKnd=='schedule'}">
																	<c:set var="notiKindIcon" value="icons-schedule" />
																	<c:set var="notiKindSpan" value="일정" />
																</c:if> <c:if test="${nwList.notiKnd=='task'}">
																	<c:set var="notiKindIcon" value="icons-task" />
																	<c:set var="notiKindSpan" value="업무" />
																</c:if> <c:if test="${nwList.notiKnd=='subtask'}">
																	<c:set var="notiKindIcon" value="icons-task" />
																	<c:set var="notiKindSpan" value="하위업무" />
																</c:if>
																<div class="fixed-kind">
																	<i class="${notiKindIcon}"></i> <span>${notiKindSpan}</span>
																</div>

																<p class="js-post-title fixed-text ${taskStyle}">
																	${nwList.notiTtl}</p>

																<div class="post-list-right">
																	<div class="post-list name">${nwList.name}</div>
																	<div class="post-list date">
																		<fmt:formatDate pattern="yyyy-MM-dd HH:mm"
																			value="${nwList.notiDttm}" />
																	</div>

																	<div class="fixed-value">
																		<!-- 업무일 때 -->
																		<c:if
																			test="${nwList.notiKnd=='task' or nwList.notiKnd=='subtask'}">
																			<c:if test="${nwList.addList=='withhold'}">
																				<c:set var="taskPrgSpan" value="hold" />
																				<c:set var="taskPrgText" value="보류" />
																			</c:if>
																			<c:if test="${nwList.addList=='progress'}">
																				<c:set var="taskPrgSpan" value="progress" />
																				<c:set var="taskPrgText" value="진행" />
																			</c:if>
																			<c:if test="${nwList.addList=='request'}">
																				<c:set var="taskPrgSpan" value="request" />
																				<c:set var="taskPrgText" value="요청" />
																			</c:if>
																			<c:if test="${nwList.addList=='feedback'}">
																				<c:set var="taskPrgSpan" value="feedback" />
																				<c:set var="taskPrgText" value="피드백" />
																			</c:if>
																			<c:if test="${nwList.addList=='complete'}">
																				<c:set var="taskPrgSpan" value="completion" />
																				<c:set var="taskPrgText" value="완료" />
																			</c:if>
																			<span
																				class="js-task-state js-todo-state state d-none ${taskPrgSpan}"
																				style="display: inline-block">${taskPrgText}</span>
																		</c:if>
																		<!-- 일정일 때 -->
																		<c:if test="${nwList.notiKnd=='schedule'}">
																			<div class="js-schedule-state date-time d-none"
																				style="display: block">
																				<em class="date">${fn:substring(nwList.addList, 0, 8)}</em>
																				<span>${fn:substring(nwList.addList, 9, 14)}
																					<%--${fn:substring(nwList.addList, 3, 14)}, ${fn:substring(nwList.addList, 18, 29)} --%>
																					<%-- <fmt:parseDate pattern="yy/MM/dd"
																						value="${fn:substring(nwList.addList, 9, 16)}" var="addTime" /> <fmt:formatDate
																						value="${addTime}" pattern="HH:mm" /> --%>
																				</span>
																			</div>
																		</c:if>
																		<!-- 할일일 때 -->
																		<c:if test="${nwList.notiKnd=='todo'}">
																			<span
																				class="js-task-state js-todo-state state request"
																				style="display: inline-block">${nwList.addList}%</span>
																		</c:if>
																	</div>
																</div>
															</a>
														</div>
													</div> <!-- 포스트 타입 -->
													<div class="js-post-nav card-item post-card-wrapper"
														style="display: none">
														<!-- highlight class 시 보라색 테두리 -->
														<button type="button" class="post-popup-button left"></button>
														<div class="post-card-header">
															<div class="post-card-scroll">
																<div class="card-header-top">
																	<div class="post-author js-post-author">
																		<span class="thumbnail size40 radius16"
																			style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
																		<dl class="post-author-info">
																			<dt>
																				<strong class="author ellipsis">${nwList.name}
																					${nwList.wkpo}</strong> <em class="position ellipsis"
																					style="display: inline"></em> <span class="date"><fmt:formatDate
																						pattern="yyyy-MM-dd HH:mm"
																						value="${nwList.notiDttm}" /></span> <span
																					class="post-security"> <c:if
																						test="${nwList.notiOpenPerm == 'pm'}">
																						<i class="icons-lock js-mouseover"
																							mouseover-text="프로젝트 관리자만"></i>
																					</c:if> <c:if test="${nwList.notiOpenPerm == 'all'}">
																						<i class="icons-person-7 js-mouseover"
																							mouseover-text="전체공개"></i>
																					</c:if>
																				</span>
																			</dt>
																			<dd class="{personal-yn}">
																				<strong class="company">${nwList.coUrl}</strong> <span
																					class="team">${nwList.dept}</span>
																			</dd>
																		</dl>
																	</div>
																	<div>
																		<div class="post-option">
																			<button id="pinToTopBnt"
																				class="js-pin-post fixed-btn js-pin-authority on"
																				style="display: block">
																				<!-- fixed-btn on class -->
																				<span class="blind">상단 고정 등록</span>
																			</button>
																			<button class="js-setting-button set-btn"
																				style="display: block">
																				<span></span> <span></span> <span></span>
																			</button>
																			<ul
																				class="js-setting-ul js-setting-layer setup-group d-none"
																				style="display: none">
																				<li class="js-setting-item" data-code="modify"
																					style="display: block"><a href="#"> <i
																						class="icons-write"></i>수정
																				</a></li>
																				<li class="js-setting-item" data-code="delete"
																					style="display: block"><a href="#"> <i
																						class="icons-delete-3"></i>삭제
																				</a></li>
																			</ul>
																		</div>
																	</div>
																</div>

																<div class="card-header-bottom ">
																	<c:if test="${nwList.notiKnd == 'schedule'}">
																		<div class="schedule-date">
																			<strong class="schedule-month"><fmt:formatDate
																					pattern="yyyy-MM" value="${nwList.notiDttm}" /></strong><strong
																				class="schedule-day"><fmt:formatDate
																					pattern="dd" value="${nwList.notiDttm}" /></strong>
																		</div>
																	</c:if>
																	<div class="post-title-area">
																		<c:if test="${nwList.notiKnd != 'schedule'}">
																			<c:if test="${nwList.addList=='withhold'}">
																				<c:set var="taskTtl" value="hold" />
																			</c:if>
																			<c:if test="${nwList.addList == 'complete'}">
																				<c:set var="taskTtl" value="complete" />
																			</c:if>
																			<c:if
																				test="${nwList.addList != 'withhold' and nwList.addList != 'complete'}">
																				<c:set var="taskTtl" value="" />
																			</c:if>
																			<h4 class="js-post-title post-title ${taskTtl}">${nwList.notiTtl}</h4>
																		</c:if>
																		<c:if test="${nwList.notiKnd == 'schedule'}">
																			<div class="schedule-period-area">
																				<span class="schedule-period"><fmt:formatDate
																						pattern="yyyy-MM-dd , HH:mm"
																						value="${nwList.notiDttm}" /></span>
																			</div>
																		</c:if>
																	</div>
																	<div class="post-state">
																		<span class="task-number d-inline-block"> 업무번호
																			<em>${nwList.notiId}</em>
																		</span>
																	</div>
																</div>
																<div class="post-card-container">
																	<c:if test="${nwList.notiKnd == 'text'}">
																		<div id="originalPost" class="post-card-content "
																			style="display: block">
																			<div class="js-map-item url-preview map map-item"
																				data-url="https://maps.google.com/?cid=17960805821623202136">
																				<div class="sort-hide-area">
																					<img
																						src="https://maps.googleapis.com/maps/api/staticmap?center=35.8693336,128.5955796&amp;zoom=14&amp;size=646x220&amp;markers=color:blue|35.8693336,128.5955796&amp;key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw"
																						onerror="this.src='https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg'">
																				</div>

																				<div class="url-preview-content">
																					<em class="url-preview-title"><i
																						class="icon-map"></i></em>
																					<p class="url-preview-text">{txtPl}</p>
																				</div>
																			</div>

																			<div class="js-post-file document-item file-item">
																				<div class="extension-icon-area">
																					<!-- etc 대신 pdf,txt,hwp,word,ppt, -->
																					<i class="icon-extension etc"></i>
																					<!-- 잠금파일일 경우에 block처리 요청 -->
																				</div>
																				<dl class="document-item-info">
																					<dt class="js-file-title">
																						<span class="document-title">MOCK_DATA.json</span><em
																							class="document-extension"></em>
																					</dt>
																					<dd>106.41 KB</dd>
																				</dl>
																				<button type="button"
																					class="js-down-btn document-download-button"
																					style="display: block">
																					<i class="icons-arrow_down"></i> <span
																						class="blind">다운로드 버튼</span>
																				</button>

																			</div>
																			<div>{txtCntn}</div>
																		</div>
																	</c:if>
																	<c:if test="${nwList.notiKnd == 'schedule'}">
																		<div id="originalPost" class="post-card-content "
																			style="display: block">
																			<div class="post-card-content js-schedule-comp"
																				spellcheck="true">
																				<ul class="create-content-group">
																					<li class="js-attendance-layer">
																						<div class="create-content-cell title manager">
																							<i class="icon-post-worker"></i>
																						</div>
																						<div class="create-content-cell manager-btn-group">
																							<span class="js-manager-group manager-group">
																								<span
																								class="js-registration participant-thumbnail attendee participate js-mouseover"
																								style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"
																								mouseover-text="{sche.memId}"></span>
																							</span>
																						</div>
																					</li>
																					<li style="display: table">
																						<div class="create-content-cell title manager">
																							<i class="icon-post-place"></i>
																						</div>
																						<div class="create-content-cell">
																							<div id="urlPreview"
																								class="url-preview-content schedule">
																								<em class="url-preview-title"> <span
																									class="ellipsis">{schePl}</span>
																									<button type="button"
																										class="js-place-span map-button"
																										data-map-link="https://www.google.co.kr/maps/place/35.90216869999999,128.849098?q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EA%B2%BD%EC%82%B0%EC%8B%9C%20%EC%A7%84%EB%9F%89%EC%9D%8D%20%EB%8C%80%EA%B5%AC%EB%8C%80%EB%A1%9C%20201"
																										style="display: inline-block">지도보기</button>
																								</em>
																							</div>
																							<div id="placeSpan"
																								class="js-place-span url-preview map"
																								data-map-link="https://www.google.co.kr/maps/place/35.90216869999999,128.849098?q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EA%B2%BD%EC%82%B0%EC%8B%9C%20%EC%A7%84%EB%9F%89%EC%9D%8D%20%EB%8C%80%EA%B5%AC%EB%8C%80%EB%A1%9C%20201"
																								style="display: inline-block">
																								<div>
																									<img id="mapImage"
																										src="https://maps.googleapis.com/maps/api/staticmap?center=35.90216869999999,128.849098&amp;zoom=14&amp;size=646x220&amp;markers=color:blue|35.90216869999999,128.849098&amp;key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw"
																										alt="게시물 이미지">
																								</div>
																							</div>
																						</div>
																					</li>
																					<li id="videoLi" style="display: none">
																						<div class="create-content-cell title">
																							<i class="icon-post-video"></i>
																						</div>
																						<div class="create-content-cell">
																							<span id="videoSpan" data-vc-srno="0">
																								<div id="zoomButton"
																									class="video-conference-join" tabindex="0">
																									Zoom으로 참여하기
																									<button type="button"
																										class="remove-button d-none">
																										<i class="icon-post-cancel"></i>
																									</button>
																								</div>
																								<div id="zoomUrlCopy"
																									class="video-conference-join" tabindex="0">
																									<span class="link-copy"><i
																										class="icons-copy"></i></span> 링크 복사
																								</div>
																							</span>
																						</div>
																					</li>
																					<li style="display: block">
																						<div
																							class="create-content-cell title manager memo">
																							<i class="icon-post-memo"></i>
																						</div>
																						<div class="create-content-cell memo">
																							<p class="memo-span" id="memoSpan">{scheCntn}</p>
																						</div>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</c:if>
																	<!-- 업무 -->
																	<c:if test="${nwList.notiKnd == 'task'}">
																		<div id="summaryPost" class="post-card-content "
																			style="display: block">
																			<div class="js-task-option">
																				<ul class="create-content-group">
																					<li class="js-status-layer">
																						<div class="create-content-cell title">
																							<i class="icon-post-status"></i>
																						</div>
																						<div class="create-content-cell">
																							<c:if test="${nwList.addList=='withhold'}">
																								<c:set var="taskPrgSpan" value="hold" />
																							</c:if>
																							<c:if test="${nwList.addList=='progress'}">
																								<c:set var="taskPrgSpan" value="progress" />
																							</c:if>
																							<c:if test="${nwList.addList=='request'}">
																								<c:set var="taskPrgSpan" value="request" />
																							</c:if>
																							<c:if test="${nwList.addList=='feedback'}">
																								<c:set var="taskPrgSpan" value="feedback" />
																							</c:if>
																							<c:if test="${nwList.addList=='complete'}">
																								<c:set var="taskPrgSpan" value="completion" />
																							</c:if>
																							<div
																								class="js-task-state state-button-group clearfix ${taskPrgSpan}">
																								<button type="button"
																									class="js-stts task-state-button request">요청</button>
																								<button type="button"
																									class="js-stts task-state-button progress">진행</button>
																								<button type="button"
																									class="js-stts task-state-button feedback">피드백</button>
																								<button type="button"
																									class="js-stts task-state-button completion">완료</button>
																								<button type="button"
																									class="js-stts task-state-button hold">보류</button>
																							</div>
																						</div>
																					</li>
																					<li
																						class="js-task-worker-layer js-more-task-li d-none"
																						style="display: table">
																						<div class="create-content-cell title manager">
																							<i class="icon-post-worker"></i>
																						</div>
																						<div class="create-content-cell manager-btn-group">
																							<span class="js-workers manager-group"> <span
																								class="js-registration manager-item"> <span
																									class="js-worker-profile thumbnail"
																									style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
																									<span class="js-registration-name">{task.memId}</span>
																							</span>
																							</span>
																						</div>
																					</li>
																					<li
																						class="js-date-layer js-start-date-layer js-more-task-li d-none"
																						style="display: inline-block">
																						<div class="create-content-cell title">
																							<i class="icon-post-date"></i>
																						</div>
																						<div class="js-date-option create-content-cell">
																							<div class="js-pickr-layer js-start-flatpickr">
																								<div class="js-date-back-layer date-bg d-none"
																									style="display: inline-block">
																									<span class="js-pickr-text task-date"> <span
																										class="js-date-text">{task.tskBgnDt}2021-11-03
																											(수) 부터</span>
																									</span>
																								</div>
																							</div>
																						</div>
																					</li>
																					<li
																						class="js-date-layer js-end-date-layer js-more-task-li d-none"
																						style="display: inline-block">
																						<div class="create-content-cell title">
																							<i class="icon-post-date"></i>
																						</div>
																						<div class="js-date-option create-content-cell">
																							<div class="js-pickr-layer js-end-flatpickr">
																								<div class="js-date-back-layer date-bg d-none"
																									style="display: inline-block">
																									<span
																										class="js-pickr-text task-date deadline-exceeded">
																										<span class="js-date-text">{task.tskEndDt}2021-11-09
																											(화) 까지</span>
																									</span>
																								</div>
																							</div>
																						</div>
																					</li>
																				</ul>
																			</div>
																			<div>{task.cntn}</div>
																		</div>


																		<div id="summaryFoldArea" class="content-fold"
																			style="display: block">
																			<div class="subtask-space">
																				<div class="js-subtask-area subtask-wrap">
																					<div class="subtask-header">
																						<span class="subtask-title"> <i
																							class="icons-subtask"></i>하위업무<em
																							class="js-subtask-count subtask-count">0</em>
																						</span>
																					</div>
																					<ul class="js-subtask-ul subtask-list ui-sortable"
																						style="display: block">
																						<li id="subtask-{COLABO_COMMT_SRNO}"
																							class="js-subtask-li {status-class}">
																							<div class="subtask-input-area">
																								<i class="drag-button"> <span class="blind">Move</span>
																								</i>
																								<div
																									class="js-subtask-status-layer js-subtask-layer subtask-status-area">
																									<button type="button"
																										class="js-subtask-status-button js-task-state subtask-button subtask-status {status_code}">{status_text}</button>
																									<ul
																										class="js-status-setting-layer subtask-status-list"
																										style="display: none">
																										<li>
																											<div
																												class="js-status-setting-button subtask-status request"
																												data_status_code="0">요청</div>
																										</li>
																										<li>
																											<div
																												class="js-status-setting-button subtask-status progress"
																												data_status_code="1">진행</div>
																										</li>
																										<li>
																											<div
																												class="js-status-setting-button subtask-status feedback"
																												data_status_code="4">피드백</div>
																										</li>
																										<li>
																											<div
																												class="js-status-setting-button subtask-status completion"
																												data_status_code="2">완료</div>
																										</li>
																										<li>
																											<div
																												class="js-status-setting-button subtask-status hold"
																												data_status_code="3">보류</div>
																										</li>
																									</ul>
																								</div>
																								<div class="subtask-input">
																									<p class="subtask-title js-mouseover">{TASK_NM}</p>
																									<input
																										class="subtask-title js-subtask-input js-mouseover"
																										tab-code="input" maxlength="50"
																										data-empty-msg="하위 업무 제목을 입력하세요!"
																										data-required-yn="Y" value="{TASK_NM}">
																									<span class="subtask-comment"{remark_display}><i
																										class="icons-comment2"></i><span
																										class="js-subtask-remark-count">{REMARK_CNT}</span></span>
																								</div>
																								<ul class="js-subtask-menu subtask-menu">
																									<li
																										class="js-subtask-date-layer subtask-menu-date js-date-tooltip {mouseover-class}"
																										tab-code="date"
																										mouseover-text="{mouseover-date}"
																										data_start_dt="{START_DT}"
																										data_end_dt="{END_DT}">
																										<div class="js-pickr-layer">
																											<input type="hidden"
																												class="js-subtask-date-input" type="text"
																												readonly="readonly">
																											<div class="subtask-date-input-div">
																												<button type="button"
																													class="js-subtask-date-button subtask-button create-icon-box small {date_off}"
																													tab-code="date"{date_button_display}>
																													<span> <i class="icons-calendar"></i>
																													</span>
																												</button>
																												<span
																													class="js-subtask-date-text js-flatpicker subtask-date d-none {dead-line-class}"{date_text_display}>{end_dt_text}</span>
																											</div>
																										</div>
																									</li>
																									<li
																										class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
																										tab-code="worker"
																										data_worker_id_list="{worker_id_list}"
																										data_worker_name_list="{worker_name_list}"
																										data_worker_profile_list="{data_worker_profile_list}"
																										mouseover-text="{mouseover-worker}">
																										<button type="button"
																											class="js-worker-button subtask-button manager js-worker-box create-icon-box small {worker_off}"
																											tab-code="worker"{worker_button_display}>
																											<span> <i class="icons-person-6 small"></i>
																											</span>
																										</button>
																										<button type="button"
																											class="js-worker-button subtask-button manager js-worker-thumb create-icon-box small d-none"
																											tab-code="worker"{worker_icon_display}>
																											<span class="subtask-manager-area"> <span
																												class="js-thumb-image thumbnail"{thumbnail_image}></span>
																												<span class="subtask-manager-number d-none"{worker_count_display}>{worker_count}</span>
																											</span>
																										</button>
																									</li>
																								</ul>
																								<button type="button"
																									class="subtask-register-btn off">
																									<span class="blind">등록</span>
																								</button>
																								<button type="button"
																									class="js-subtask-remove remove-button"{remove_display}>
																									<span class="blind">삭제</span>
																								</button>
																							</div>
																						</li>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</c:if>

																	<div class="post-bottom-area">
																		<div class="post-bottom-menu js-reaction-bookmark">
																			<div class="bottom-button-area">
																				<button class="js-post-bookmark post-bottom-button ">
																					<!-- on 추가 -->
																					<i class="icon-bookmark"></i> <span>북마크</span>
																				</button>
																			</div>
																		</div>
																		<div class="cmt-read-wr">
																			<div class="comment-count-area">
																				<span>댓글</span> <span class="comment-count">6</span>
																			</div>
																		</div>
																	</div>
																	<!-- //post-card-container -->
																</div>
															</div>
															<div class="post-card-footer js-comment-area">
																<div class="comment-header">
																	<!-- on 시 보이기 -->
																	<button type="button"
																		class="js-remark-prev-button comment-more-button">
																		이전 댓글 더보기</button>
																</div>
																<ul class="post-comment-group">
																	<li class="remark-item">
																		<div class="comment-thumbnail js-comment-thumbnail">
																			<span class="thumbnail size40 radius16"
																				style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
																		</div>
																		<div class="js-remark-view comment-container on ">
																			<div class="comment-user-area">
																				<div class="comment-user">
																					<span class="user-name js-comment-user-name">{reply.memId}</span>
																					<span class="user-position"></span> <span
																						class="record-date">{reply.dttm}2021-11-07
																						21:23</span>
																				</div>
																				<div class="comment-writer-menu">
																					<button type="button"
																						class="js-remark-update js-remark-edit-button comment-writer-button on">
																						수정</button>
																					<button type="button"
																						class="js-remark-delete js-remark-edit-button comment-writer-button on">
																						삭제</button>
																				</div>
																			</div>
																			<div class="js-remark-layer comment-content">
																				<div class="comment-text-area">
																					<div class="js-remark-text comment-text">
																						<div>{reply.cntn}</div>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div class="js-remark-edit comment-container">
																			<div class="js-remark-layer comment-content modify">
																				<form class="js-remark-form comment-text-area">
																					<fieldset>
																						<legend class="blind">댓글 입력</legend>
																						<div
																							class="js-remark-area js-paste-layer comment-input"
																							contenteditable="true"
																							placeholder="줄바꿈은 Shift + Enter / 입력은 Enter 입니다."></div>
																						<input type="hidden" class="comment-upload-input">
																						<i class="icons-link"> <span class="blind">업로드
																								버튼</span>
																						</i>
																					</fieldset>
																				</form>
																			</div>
																		</div>
																	</li>
																</ul>
															</div>
															<div
																class="js-remark-layer js-edit-layer comment-input-wrap">
																<div class="comment-thumbnail">
																	<span class="thumbnail size40 radius16"
																		style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
																</div>
																<form class="js-remark-form comment-container on ">
																	<fieldset>
																		<legend class="blind">댓글 입력</legend>
																		<div
																			class="js-remark-area js-paste-layer comment-input"
																			contenteditable="true"
																			placeholder="줄바꿈은 Shift + Enter / 입력은 Enter 입니다."></div>
																		<input type="hidden" class="comment-upload-input">
																		<label mouseover-text="파일 첨부"
																			class="js-remark-upload-button comment-upload-button js-mouseover">
																			<i class="icons-link"> <span class="blind">업로드
																					버튼</span>
																		</i>
																		</label>
																	</fieldset>
																</form>
															</div>
														</div>
														<button type="button" class="post-popup-button right"></button>
													</div>
												</li>
											</c:forEach>
											<!-- 반복 끝 -->
										</ul>
									</c:if>
									<c:if
										test="${fn:length(nwLists) == 0 and prjInfo.prjKnd == 'N'}">
										<div id="noDetailData" class="detail-data-none">
											<img src="/flow-renewal/assets/images/none_member.png"
												alt="함께할 멤버들을 지금 초대해 보세요!">
											<p class="none-text">
												아직 참여중인 멤버들이 없습니다<br> 함께할 멤버들을 지금 초대해 보세요!
											</p>
											<button id="noDetailDataBnt" type="button"
												class="data-none-button invite">초대하기</button>
										</div>
									</c:if>
									<c:if
										test="${fn:length(nwLists) == 0 and prjInfo.prjKnd == 'C'}">
										<div id="noDetailData" class="detail-data-none">
											<img src="/flow-renewal/assets/images/none_member.png">
											<p class="none-text">
												아직 작성하신 게시글이 없습니다<br> 게시글을 지금 작성해 보세요!
											</p>
										</div>
									</c:if>
								</div>
							</div>
						</section>
						<!-- //project-detail-container-->

						<!-- 참여자 -->
						<div class="participants-section">
							<div id="projectParticipants"
								class="project-participants-wrap feed-section">
								<div class="section-title-area">
									<h4 class="section-title">
										<span>참여자</span> <span id="participantCount">${partiCnt}</span>
									</h4>
									<div class="feed-type-area">
										<button id="allSendienceBtn" type="button">전체 보기</button>
									</div>
								</div>

								<div id="participantArea" class="participants-container">
									<div id="participantScrollArea"
										class="participants-content-group scroll-mask">
										<ul id="participantsUl" class="participants-list">
											<c:if test="${not empty pms}">
												<span class="participants-title"> <em>프로젝트 관리자</em><span
													class="number-of-participants">${fn:length(pms)}</span>
												</span>
												<c:forEach var="pm" items="${pms}">
													<li class="js-participant-item">
														<div class="post-author">
															<span
																class="js-participant-profile thumbnail size40 radius16"
																style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
															<img id="mem_st_icon" alt="on"
																src="/img/status_icn/${pm.memSt}.png" class="parti_st">
															<dl class="post-author-info">
																<dt>
																	<strong class="js-participant-name author ellipsis">${pm.name}
																		<c:if test="${sessionScope.name eq pm.name}">(나)</c:if>
																	</strong> <em class="position ellipsis">${pm.wkpo}</em>
																</dt>
																<dd>
																	<strong class="company">${pm.coUrl}</strong> <span
																		class="team">${pm.dept}</span>
																</dd>
															</dl>
														</div>
														<button type="button"
															class="js-participant-chat participant-chat-button">
															<i class="icons-chat"><span class="blind">채팅</span></i>
														</button>
													</li>
												</c:forEach>
											</c:if>
											<c:if test="${not empty users}">
												<span class="participants-title"> <em>임직원</em><span
													class="number-of-participants">${fn:length(users)}</span>
												</span>
												<c:forEach var="user" items="${users}">
													<li class="js-participant-item">
														<div class="post-author">
															<span
																class="js-participant-profile thumbnail size40 radius16"
																style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
															<img id="mem_st_icon" alt="on"
																src="/img/status_icn/${user.memSt}.png" class="parti_st">
															<dl class="post-author-info">
																<dt>
																	<strong class="js-participant-name author ellipsis">${user.name}
																		<c:if test="${sessionScope.name eq pm.name}">(나)</c:if>
																	</strong> <em class="position ellipsis">${user.wkpo}</em>
																</dt>
																<dd>
																	<strong class="company">${user.coUrl}</strong> <span
																		class="team">${user.dept}</span>
																</dd>
															</dl>
														</div>
														<button type="button"
															class="js-participant-chat participant-chat-button">
															<i class="icons-chat"><span class="blind">채팅</span></i>
														</button>
													</li>
												</c:forEach>
											</c:if>
											<c:if test="${not empty guests}">
												<span class="participants-title"> <em>외부인</em><span
													class="number-of-participants">${fn:length(guests)}</span>
												</span>
												<c:forEach var="guest" items="${guests}">
													<li class="js-participant-item">
														<div class="post-author">
															<span
																class="js-participant-profile thumbnail size40 radius16"
																style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
															<img id="mem_st_icon" alt="on"
																src="/img/status_icn/${guest.memSt}.png"
																class="parti_st">
															<dl class="post-author-info">
																<dt>
																	<strong class="js-participant-name author ellipsis">${guest.name}
																		<c:if test="${sessionScope.name eq pm.name}">(나)</c:if>
																	</strong> <em class="position ellipsis">${guest.wkpo}</em>
																</dt>
																<dd>
																	<strong class="company">${guest.coUrl}</strong> <span
																		class="team">${guest.dept}</span>
																</dd>
															</dl>
														</div>
														<button type="button"
															class="js-participant-chat participant-chat-button">
															<i class="icons-chat"><span class="blind">채팅</span></i>
														</button>
													</li>
												</c:forEach>
											</c:if>
										</ul>
									</div>
									<div class="participants-menu">
										<button class="js-project-chat participant-button">
											<i class="icons-chat small"></i>채팅
										</button>
										<button class="js-video-chat participant-button">
											<i class="icons-video"></i> 화상 회의
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<!-- 전체 검색화면 -->
				<!-- 검색 후 화면 display:block -->
				<div
					class="js-post-search-result all-search-section d-none me-post-wrap"
					style="display: none">
					<div class="all-search-container">
						<div class="all-search-content">
							<div id="postSearchArea" class="search-result-group">
								<div class="search-title-area">
									<span class="search-result-title">전체</span> <span
										id="allPostsSearchCount"
										class="js-search-post-count search-result-count"
										style="display: inline-block">${fn:length(nwLists)}</span>
								</div>
								<ul id="allPostsSearchUl"
									class="js-search-post-ul all-seach-list-type-1 scroll-mask">
									<!-- 반복 시작 -->
									<c:forEach var="nwList" items="${nwLists}">
										<li id="allPostsSearchUl"
											class="js-all-post-item post-search-item js-search-item">
											<!-- icon 태그 : icon-post-type write2(글), icon-post-type todo(할일), icon-post-type schedule(일정)-->
											<c:if test="${nwList.notiKnd=='text'}">
												<c:set var="notiKnd" value="icon-post-type write2" />
											</c:if> <c:if test="${nwList.notiKnd=='task'}">
												<c:set var="notiKnd" value="icon-post-type task" />
											</c:if> <c:if test="${nwList.notiKnd=='todo'}">
												<c:set var="notiKnd" value="icon-post-type todo" />
											</c:if> <c:if test="${nwList.notiKnd=='schedule'}">
												<c:set var="notiKnd" value="icon-post-type schedule" />
											</c:if> <i class="${notiKnd }"></i>
											<div class="search-sub-text-wrap">
												<a href="" class="search-text-type-3 contents-tit">
													<p>
														<span class="post-type">${nwList.notiKnd}</span>${nwList.notiTtl}
													</p>
												</a>
												<p class="search-text-type-3 contents-project">
													<span class="search-name ellipsis">${nwList.name}</span><span
														class="date"> <fmt:formatDate
															pattern="yyyy-MM-dd HH:mm" value="${nwList.notiDttm}" /></span>
													<em class="project-title ellipsis"><i
														class="icons-project-1"></i>${nwList.prjTtl}</em>
												</p>
											</div>
										</li>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<script>
		//업무리포트 토글
		$("#taskReportToggleButton").click(function() {
			$("#taskReportToggleButton").toggleClass("off");
			$("#doughnutChartLayer").toggle();
		});

		//게시글 토글
		$(".list-item a").click(function(e) {
					e.preventDefault;
					$(".list-item").css("display", "block");
					$(".card-item").css("display", "none");
					$(e.currentTarget).closest(".list-item").css("display",
							"none");
					$(e.currentTarget).closest(".list-item").next().css(
							"display", "block");
		});

		// 게시글 종류 필터
		$("#feedTypeButton button").click(function() {
			$(".js-feed-filter-button").addClass("active");
			$(".js-feed-filter-layer").toggle();
		});
		
		// 전체
		$("#allNW").click(function(e) { // 전체 필터
			$(".filter-reset").hide();
			$(".check-menu-item").removeClass("on");
			$("#allNW").addClass("on");
			$("#detailUl li").show();
			$(".js-feed-filter-button").removeClass("active");
			$(".js-feed-filter-layer").toggle();
		});
		
		$("#txtNW").click(function(e) { // 글 필터
			$(".filter-reset").show();
			$(".check-menu-item").removeClass("on");
			$("#txtNW").addClass("on");
			$("#detailUl li").hide();
			$(".icons-write2").closest("li").show();
			$(".js-feed-filter-button").removeClass("active");
			$(".js-feed-filter-layer").toggle();
		});
		
		$("#tskNW").click(function(e) { // 업무 필터
			$(".filter-reset").show();
			$(".check-menu-item").removeClass("on");
			$("#tskNW").addClass("on");
			$("#detailUl li").hide();
			$(".icons-task").closest("li").show();
			$(".js-feed-filter-button").removeClass("active");
			$(".js-feed-filter-layer").toggle();
		});
		
		$("#scheNW").click(function(e) { // 일정 필터
			$(".filter-reset").show();
			$(".check-menu-item").removeClass("on");
			$("#scheNW").addClass("on");
			$("#detailUl li").hide();
			$(".icons-schedule").closest("li").show();
			$(".js-feed-filter-button").removeClass("active");
			$(".js-feed-filter-layer").toggle();
		});

		$("#todoNW").click(function(e) { // 할일 필터
			$(".filter-reset").show();
			$(".check-menu-item").removeClass("on");
			$("#todoNW").addClass("on");
			$("#detailUl li").hide();
			$(".icons-todo").closest("li").show();
			$(".js-feed-filter-button").removeClass("active");
			$(".js-feed-filter-layer").toggle();
			
		});
		
		$(".filter-reset").click(function(){ // 필터 취소
			$(".filter-reset").hide();
			$(".check-menu-item").removeClass("on");
			$("#allNW").addClass("on");
			$("#detailUl li").show();
		});
		
		$(".js-tab-item").click(function(){
			
		});
	</script>
</body>
</html>