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
}
</style>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
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
						<li class="js-tab-item"><a>파일</a></li>
						<li class="js-tab-item"><a>히스토리</a></li>
					</ul>
					<div class="project-search-area all-file-header-type-3">
						<i class="icons-search"></i>
						<div class="project-search">
							<input id="projectSearchInput" type="text"
								placeholder="검색어를 입력해주세요" class="project-search-input"
								autocomplete="off" maxlength="50" />
						</div>
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
														<canvas id="myChart" width="100" height="100"></canvas>
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
																			type="number"
																			value="${tskPrgsCnt.tskCnt / tskAllCnt * 100}" />%
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
															<em class="date"> <fmt:parseDate
																	value="${pincette.addList}" pattern="YY/MM/dd"
																	var="addDate" /> <fmt:formatDate value="${addDate}"
																	pattern="MM/dd" />
															</em> <span> <fmt:parseDate pattern="YY/MM/dd"
																	value="${pincette.addList}" var="addTime" /> <fmt:formatDate
																	value="${addTime}" pattern="HH:mm" />
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
												<div class="check-menu-item on">전체</div>
											</li>
											<li>
												<div class="check-menu-item">글</div>
											</li>
											<li>
												<div class="check-menu-item">업무</div>
											</li>
											<li>
												<div class="check-menu-item">일정</div>
											</li>
											<li>
												<div class="check-menu-item">할 일</div>
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
													<div class="js-post-nav list-item post-list-wrapper">
														<div class="fixed-list">
															<a href="#"> <!-- 새로운 글 표시 --> <i
																class="js-indication display-new-indication"
																style="display: none"></i> <!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
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
																				<em class="date"> <fmt:parseDate
																						value="${nwList.addList}" pattern="YY/MM/dd"
																						var="addDate" /> <fmt:formatDate
																						value="${addDate}" pattern="MM/dd" /></em> <span>
																					<fmt:parseDate pattern="YY/MM/dd"
																						value="${nwList.addList}" var="addTime" /> <fmt:formatDate
																						value="${addTime}" pattern="HH:mm" />
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
													</div>
												</li>
											</c:forEach>
											<!-- 반복 끝 -->
										</ul>
									</c:if>
									<c:if test="${fn:length(nwLists) == 0}">
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
																		<c:if test="${sessionScope.name eq pm.name}">(나)</c:if></strong>
																	<em class="position ellipsis">${user.wkpo}</em>
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
																src="/img/status_icn/${guest.memSt}.png" class="parti_st">
															<dl class="post-author-info">
																<dt>
																	<strong class="js-participant-name author ellipsis">${guest.name}
																		<c:if test="${sessionScope.name eq pm.name}">(나)</c:if></strong>
																	<em class="position ellipsis">${guest.wkpo}</em>
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


				<div id="pinPostItem" class="d-none">
					<li id="pin-{post-srno}" class="js-pin-item"
						data-post-srno="{post-srno}" data-project-srno="{colabo-srno}">
						<a href="#">
							<div class="fixed-kind">
								<i class="icons-{post-gb}"></i> <span>{post-name}</span>
							</div>
							<p class="js-post-title fixed-text {complete-yn}">{title}</p>
							<div class="fixed-value">
								<span class="js-task-state js-todo-state {status-code}">{status}</span>
								<div class="date-time {schedule-yn}">
									<em class="date">{start-date}</em> <span>{start-time}</span>
								</div>
							</div>
					</a>
					</li>
				</div>
				<div id="mentionItem" class="d-none">
					<li id="{id}-mention" class="js-mention-item participant-item"
						data-user-id="{id}">
						<div class="post-author">
							<span class="thumbnail size40 radius16" {profile}=""></span>
							<dl class="post-author-info">
								<dt>
									<strong class="author">{name}</strong> <em>{position}</em>
								</dt>
								<dd class="{personal-yn}">
									<strong class="company">{company}</strong> <span class="team">{team}</span>
								</dd>
							</dl>
						</div>
					</li>
				</div>


				<div id="inviteItem" class="d-none">
					<div class="invite-text-area">
						<span>{first-contents}</span> <span>{date}</span> <span
							class="invite-time">{rgsn-dttmdate}</span>
					</div>
				</div>
			</div>
		</div>
	</div>


	<script>
		$("#taskReportToggleButton").on("click", function() {
			$("#taskReportToggleButton").toggleClass("off");
			$("#doughnutChartLayer").toggle();
		});
	</script>
</body>
</html>