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
					class="project-invite-button color-code-6">
					<i class="icons-invite"></i>초대하기
				</button>
			</div>
		</div>


		<!-- 프로젝트 상세페이지 메뉴 + 검색창 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="detailLayer"
				class="main-sub-header project-detail-wrap d-none"
				style="display: block;">
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

								<div id="taskReportItem" class="d-none">
									<div class="detail-section reports-section">
										<div class="section-title-area">
											<h4 class="section-title">
												<span>업무리포트</span> <span class="section-number">{TOTAL_CNT}</span>
											</h4>
											<button id="taskReportToggleButton" type="button"
												class="js-report-btn reports-button">
												<i class="ico-arrow"></i>
											</button>
										</div>
										<!-- 원형차트 -->
										<div class="js-task-report-layer d-none">
											<div class="taks-report">
												<!--display:none-->
												<!-- chart -->
												<div class="donut-chart-area">
													<div class="donut-chart" id="TASK_DONUT_CHART"></div>
													<div class="task-count" id="TaskCnt">{TOTAL_CNT}</div>
												</div>
												<ul id="taskReportLayer" class="donut-chart-list">
													<li><span class="task-chart-info request"
														data-code="0"> <i class="chart-info-label"></i> <span
															class="chart-info-text">{REQ_NAME}<em>{REQ}</em></span> <span
															class="chart-info-percent">{REQ_PER}%</span>
													</span> <span class="task-chart-info progress" data-code="1">
															<i class="chart-info-label"></i> <span
															class="chart-info-text">{PROG_NAME}<em>{PROG}</em></span>
															<span class="chart-info-percent">{PROG_PER}%</span>
													</span> <span class="task-chart-info feedback" data-code="4">
															<i class="chart-info-label"></i> <span
															class="chart-info-text">{FEDBK_NAME}<em>{FEDBK}</em></span>
															<span class="chart-info-percent">{FEDBK_PER}%</span>
													</span></li>
													<li><span class="task-chart-info complete"
														data-code="2"> <i class="chart-info-label"></i> <span
															class="chart-info-text">{COMP_NAME}<em>{COMP}</em></span>
															<span class="chart-info-percent">{COMP_PER}%</span>
													</span> <span class="task-chart-info hold" data-code="3"> <i
															class="chart-info-label"></i> <span
															class="chart-info-text">{HOLD_NAME}<em>{HOLD}</em></span>
															<span class="chart-info-percent">{HOLD_PER}%</span>
													</span></li>
												</ul>
											</div>
										</div>
										<!-- //원형차트 -->
									</div>
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
												class="icons-map"></i> <i class="icons-tag"></i> <i
												class="icons-mention"></i> <i class="icons-font"></i>
										</div>
									</div>
								</div>
							</div>

							<!-- 게시글 클릭시 a 태그에 class="highlight" -->

							<!-- 상단고정 -->
							<div id="projectPinArea"
								class="detail-section fix-section d-none" style="display: block">
								<div class="section-title-area">
									<h4 class="section-title">
										<span>상단고정</span> <span id="projectPinCount"
											class="section-number">${fn:length(pincettes)}</span>
									</h4>
								</div>
								<ul id="pinPostUl" class="pin-list fixed-list">
									<c:forEach var="pincette" items="${pincettes}">
										<li class="js-pin-item"><a href="#">
												<div class="fixed-kind">
													<!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
													<c:if test="${pincette.notiKnd=='text'}">
														<c:set var="notiKndIcon" value="icons-write2" />
													</c:if>
													<c:if test="${pincette.notiKnd=='task'}">
														<c:set var="notiKndIcon" value="icons-task" />
													</c:if>
													<c:if test="${pincette.notiKnd=='todo'}">
														<c:set var="notiKndIcon" value="icons-todo" />
													</c:if>
													<c:if test="${pincette.notiKnd=='schedule'}">
														<c:set var="notiKndIcon" value="icons-schedule" />
													</c:if>
													<i class="${notiKndIcon}"></i>
													<c:if test="${pincette.notiKnd=='text'}">
														<c:set var="notiKndSpan" value="글" />
													</c:if>
													<c:if test="${pincette.notiKnd=='task'}">
														<c:set var="notiKndSpan" value="업무" />
													</c:if>
													<c:if test="${pincette.notiKnd=='todo'}">
														<c:set var="notiKndSpan" value="할일" />
													</c:if>
													<c:if test="${pincette.notiKnd=='schedule'}">
														<c:set var="notiKndSpan" value="일정" />
													</c:if>
													<span>${notiKndSpan}</span>
												</div> <c:if test="${pincette.notiKnd=='task'}">
													<c:if test="${pincette.addList=='withhold'}">
														<c:set var="taskStyle" value="hold" />
													</c:if>
													<c:if test="${pincette.addList=='complete'}">
														<c:set var="taskStyle" value="complete" />
													</c:if>
												</c:if>
												<p class="js-post-title fixed-text ${taskStyle}">${pincette.notiTtl}</p>
												<div class="fixed-value">
													<!-- 업무일 때 -->
													<!-- 업무 진행상항 class="progress" 진행 /
												class="request" 요청 / class="completion"완료 /
												class="feedback"피드백 -->
													<c:if test="${pincette.notiKnd=='task'}">
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
															<em class="date"><fmt:formatDate pattern="MM/dd"
																	value="${pincette.addList}" /></em> <span><fmt:formatDate
																	pattern="HH:mm" value="${pincette.addList}" /></span>
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
															</c:if>
															<c:if test="${nwList.notiKnd=='task'}">
																<c:set var="notiKindIcon" value="icons-task" />
																<c:set var="notiKindSpan" value="업무" />
																<c:if test="${pincette.addList=='withhold'}">
																	<c:set var="taskPrgP" value="hold" />
																</c:if>
																<c:if test="${pincette.addList=='complete'}">
																	<c:set var="taskPrgP" value="completion" />
																</c:if>
															</c:if>
															<c:if test="${nwList.notiKnd=='todo'}">
																<c:set var="notiKindIcon" value="icons-todo" />
																<c:set var="notiKindSpan" value="할일" />
															</c:if> <c:if test="${nwList.notiKnd=='schedule'}">
																<c:set var="notiKindIcon" value="icons-schedule" />
																<c:set var="notiKindSpan" value="일정" />
															</c:if>
															<div class="fixed-kind">
																<i class="${notiKindIcon}"></i> <span>${notiKindSpan}</span>
															</div>
															<p class="js-post-title fixed-text ${taskPrgP}">${nwList.notiTtl}</p>
															<div class="post-list comment" style="display: none">
																<i class="icons-comment2"></i> <span
																	class="js-post-comment-count">0</span>
															</div>
															<div class="post-list-right">
																<div class="post-list name">${nwList.name }</div>
																<div class="post-list date">
																	<fmt:formatDate pattern="yyyy-MM-dd HH:mm"
																		value="${nwList.notiDttm}" />
																</div>

																<div class="fixed-value">
																	<!-- 업무일 때 -->
																	<c:if test="${pincette.notiKnd=='task'}">
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
																			class="js-task-state js-todo-state state ${taskPrgSpan} d-none"
																			style="display: inline-block">${taskPrgText}</span>
																	</c:if>
																	<!-- 일정일 때 -->
																	<c:if test="${pincette.notiKnd=='schedule'}">
																		<div class="js-schedule-state date-time d-none"
																			style="display: block">
																			<em class="date"><fmt:formatDate pattern="MM/dd"
																					value="${pincette.addList}" /></em> <span><fmt:formatDate
																					pattern="HH:mm" value="${pincette.addList}" /></span>
																		</div>
																	</c:if>
																	<!-- 할일일 때 -->
																	<c:if test="${pincette.notiKnd=='todo'}">
																		<span
																			class="js-task-state js-todo-state state request"
																			style="display: inline-block">${pincette.addList}%</span>
																	</c:if>
																</div>
															</div>
														</a>
													</div>
												</div>
											</li>
											<!-- 반복 끝 -->
										</c:forEach>
									</ul>
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

								<div id="participantArea" class="participants-container d-none"
									style="">
									<div id="participantScrollArea"
										class="participants-content-group scroll-mask">
										<span class="participants-title"> <em>프로젝트 관리자</em><span
											class="number-of-participants">${fn:length(pms)}</span>
										</span>
										<ul id="participantsUl" class="participants-list">
											<c:forEach var="pm" items="${pms}">
												<li class="js-participant-item">
													<div class="post-author">
														<span
															class="js-participant-profile thumbnail size40 radius16"
															style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
														<dl class="post-author-info">
															<dt>
																<strong class="js-participant-name author ellipsis">${pm.name}</strong>
																<em class="position ellipsis">${pm.wkpo}</em>
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
											<span class="participants-title"> <em>임직원</em><span
												class="number-of-participants">${fn:length(users)}</span>
											</span>
											<c:forEach var="user" items="${users}">
												<li class="js-participant-item">
													<div class="post-author">
														<span
															class="js-participant-profile thumbnail size40 radius16"
															style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
														<dl class="post-author-info">
															<dt>
																<strong class="js-participant-name author ellipsis">${user.name}</strong>
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
											<span class="participants-title"> <em>외부인</em><span
												class="number-of-participants">${fn:length(guests)}</span>
											</span>
											<c:forEach var="guest" items="${guests}">
												<li class="js-participant-item">
													<div class="post-author">
														<span
															class="js-participant-profile thumbnail size40 radius16"
															style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
														<dl class="post-author-info">
															<dt>
																<strong class="js-participant-name author ellipsis">${guest.name}</strong>
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
														<span class="post-type">${nwList.notiKnd }</span>${nwList.notiTtl }
													</p>
												</a>
												<p class="search-text-type-3 contents-project">
													<span class="search-name ellipsis">${nwList.name }</span><span
														class="date"><fmt:formatDate
															pattern="yyyy-MM-dd HH:mm" value="${nwList.notiDttm}" /></span>
													<em class="project-title ellipsis"><i
														class="icons-project-1"></i>${nwList.prjTtl }</em>
												</p>
											</div>
										</li>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
				</div>



				<!-- 팝업창 -->
				<div class="js-post-nav card-item post-card-wrapper task  side"
					style="display: none">
					<button type="button" class="post-popup-button left"></button>
					<div class="post-popup-header card-popup-header d-none"
						style="display: none">
						<h3 class="card-popup-title">
							<i id="projectTitleColor" class="project-color color-code-6"></i>
							<span class="js-project-title-button">${NW.prjTtl}</span> <span
								class="subtask-title up-task-title js-up-task-button"
								style="display: none"></span>
						</h3>
						<button class="btn-close card-popup-close">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="post-card-header">
						<div class="post-card-scroll">
							<div class="card-header-top">
								<div class="post-author js-post-author">
									<span class="thumbnail size40 radius16"
										style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
									<dl class="post-author-info">
										<dt>
											<strong class="author ellipsis">${NW.memId}</strong> <em
												class="position ellipsis" style="display: inline"></em> <span
												class="date">${NW.NWdttm}</span> <span class="post-security">
												<!-- <i class="icons-lock js-mouseover" mouseover-text="프로젝트 관리자만"></i>-->
												<i class="icons-person-7 js-mouseover"
												mouseover-text="전체 공개"></i>
											</span>
										</dt>
										<dd class="d-none">

											<span class="team"></span>
										</dd>
									</dl>
								</div>
								<div>
									<div class="post-option">
										<button id="movePost" class="btn-go d-none"
											style="display: inline-block;">게시글 바로가기</button>
										<!-- fixed-btn on class -->
										<button id="pinToTopBnt"
											class="js-pin-post fixed-btn js-pin-authority on"
											style="display: block">
											<span class="blind">상단 고정 등록</span>
										</button>
										<button class="js-setting-button set-btn"
											style="display: block" data="">
											<span></span> <span></span> <span></span>
										</button>
										<ul class="js-setting-ul js-setting-layer setup-group d-none"
											style="display: none">
											<li class="js-setting-item" style="display: block"><a
												href="#"> <i class="icons-write"></i>수정
											</a></li>
											<li class="js-setting-item" style="display: block"><a
												href="#"> <i class="icons-delete-3"></i>삭제
											</a></li>
										</ul>
									</div>
								</div>
							</div>

							<div class="card-header-bottom ">
								<!--schedule 상세보기-->
								<!--<div class="schedule-date">
<strong class="schedule-month">2021-10</strong>
<strong class="schedule-day">07</strong>
</div>
<div class="post-title-area">
                            <h4 class="js-post-title post-title hold">${NW.NWTtl}</h4>
                            <div class="schedule-period-area d-none" style="display:block">
                                <span class="schedule-period">2021-10-07 (목), 16:30</span>
                                <span class="schedule-period" style="display:inline-block">17:30</span>
                            </div>
                        </div>-->
								<!--업무, 글, 할일 상세보기-->
								<div class="post-title-area">
									<!-- 보류 : hold, 완료 : complete, 요청, 진행, 피드백일 경우는 X-->
									<h4 class="js-post-title post-title hold">${NW.NWTtl}</h4>
									<div class="schedule-period-area d-none">
										<span class="schedule-period"></span> <span
											class="schedule-period"></span>
									</div>
								</div>
							</div>
							<div class="post-card-container">

								<!-- 자세히 보기 : 더보기 클릭시 보이기 -->
								<div id="originalPost" class="post-card-content "
									style="display: none">
									<div class="js-map-item url-preview map map-item"
										data-url="https://maps.google.com/?cid=17960805821623202136"
										data-code="MAP">
										<div class="sort-hide-area">
											<img
												src="https://maps.googleapis.com/maps/api/staticmap?center=35.8693336,128.5955796&amp;zoom=14&amp;size=646x220&amp;markers=color:blue|35.8693336,128.5955796&amp;key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw"
												onerror="this.src='https://i.pinimg.com/236x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975--photo-icon-sad.jpg';"
												data="" alt="">
										</div>
										<button type="button" class="js-del-btn delete-button d-none">
											<i class="icons-delete-2"></i>
										</button>
										<div class="move-button">
											<i class="icons-move-2"></i>
										</div>
										<div class="url-preview-content">
											<em class="url-preview-title"><i class="icon-map"></i></em>
											<p class="url-preview-text">대한민국 대구광역시 중구 성내1동 168-1</p>
										</div>
									</div>

									<div class="js-post-file document-item file-item"
										data-code="FILE" atch_srno="15425100"
										rand_key="FLOW_202110123020050_08c033de-5766-4473-94b8-dd480732a1a4"
										file_idnt_id="FLOW_202110123020050_08c033de-5766-4473-94b8-dd480732a1a4"
										file_nm="MOCK_DATA.json" file_size="108959" rgsr_nm="오혜지"
										rgsn_dttm="20211012173050" use_intt_id="KAKAO_211003154523"
										atch_url="" img_path=""
										file_down_url="https://flow.team//FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_202110123020050_08c033de-5766-4473-94b8-dd480732a1a4&amp;ATCH_SRNO=15425100&amp;USER_ID=kakao_1934981996&amp;DUID=969850-99-120-937297&amp;OBJ_CNTS_NM=&amp;USE_INTT_ID=KAKAO_211003154523"
										cloud_yn="Y">
										<div class="extension-icon-area">
											<i class="icon-extension etc"></i> <span class="file-lock"
												style="display: none" data=""><i class="icons-lock"></i></span>
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
											style="display: block" data="">
											<i class="icons-arrow_down"></i> <span class="blind">다운로드
												버튼</span>
										</button>
										<button type="button" class="js-del-btn delete-button d-none">
											<i class="icons-delete-2"></i>
										</button>
										<div class="move-button">
											<i class="icons-move-2"> </i>
										</div>
									</div>
									<!-- 간략히 보기 -->
									<div id="summaryPost" class="post-card-content "
										style="display: block">
										<!--글-->
										<div>
											content 문단
											<div>
												<div>content 문단</div>
												<div class="js-post-file document-item file-item"
													data-code="FILE" atch_srno="15298556"
													rand_key="FLOW_202110071818857_4ae12406-5398-4554-8248-490870f45e37"
													file_idnt_id="FLOW_202110071818857_4ae12406-5398-4554-8248-490870f45e37"
													file_nm="20211001 회의록.hwp" file_size="13312" rgsr_nm="오혜지"
													rgsn_dttm="20211007161857" use_intt_id="KAKAO_211003154523"
													atch_url="" img_path=""
													file_down_url="https://flow.team//FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_202110071818857_4ae12406-5398-4554-8248-490870f45e37&amp;ATCH_SRNO=15298556&amp;USER_ID=kakao_1934981996&amp;DUID=969850-99-120-937297&amp;OBJ_CNTS_NM=&amp;USE_INTT_ID=KAKAO_211003154523"
													cloud_yn="Y">
													<div class="extension-icon-area">
														<!--hwp, pdf, word, ppt, -->
														<i class="icon-extension hwp"></i>
													</div>
													<dl class="document-item-info">
														<dt class="js-file-title">
															<span class="document-title">20211001 회의록.hwp</span><em
																class="document-extension"></em>
														</dt>
														<dd>13 KB</dd>
													</dl>
													<button type="button"
														class="js-down-btn document-download-button"
														style="display: block" data="">
														<i class="icons-arrow_down"></i> <span class="blind">다운로드
															버튼</span>
													</button>
													<button type="button"
														class="js-del-btn delete-button d-none">
														<i class="icons-delete-2"></i>
													</button>
													<div class="move-button">
														<i class="icons-move-2"> </i>
													</div>
												</div>
												<!-- 업무 -->
												<div class="js-task-option">
													<ul class="create-content-group">
														<li class="js-status-layer">
															<div class="create-content-cell title">
																<i class="icon-post-status"></i>
															</div>
															<div class="create-content-cell">
																<!-- 요청 : request, 진행 : progress, 피드백 : feedback, 완료 : completion, 보류 : hold -->
																<div
																	class="js-task-state state-button-group clearfix hold">
																	<button type="button"
																		class="js-stts task-state-button request"
																		stts="request">요청</button>
																	<button type="button"
																		class="js-stts task-state-button progress"
																		stts="progress">진행</button>
																	<button type="button"
																		class="js-stts task-state-button feedback"
																		stts="feedback">피드백</button>
																	<button type="button"
																		class="js-stts task-state-button completion"
																		stts="completion">완료</button>
																	<button type="button"
																		class="js-stts task-state-button hold" stts="hold">보류</button>
																</div>
															</div>
														</li>
														<li class="js-task-worker-layer js-more-task-li d-none"
															style="display: table">
															<div class="create-content-cell title manager">
																<i class="icon-post-worker"></i>
															</div>
															<div class="create-content-cell manager-btn-group">
																<span class="js-workers manager-group"> <span
																	class="js-registration manager-item"> <span
																		class="js-worker-profile thumbnail"
																		style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
																		<span class="js-registration-name">오혜지</span>
																</span>
																</span>
															</div>
														</li>
														<li
															class="js-date-layer js-start-date-layer js-more-task-li d-none"
															style="display: table;">
															<div class="create-content-cell title">
																<i class="icon-post-date"></i>
															</div>
															<div class="js-date-option create-content-cell">
																<div class="js-pickr-layer js-start-flatpickr">
																	<div class="js-date-back-layer date-bg d-none"
																		style="display: inline-block" data="">
																		<span class="js-pickr-text task-date"> <span
																			class="js-date-text">2021-11-03 (수) 부터</span>
																		</span>
																	</div>
																</div>
															</div>
														</li>
														<li
															class="js-date-layer js-end-date-layer js-more-task-li d-none"
															style="display: table;" data="">
															<div class="create-content-cell title">
																<i class="icon-post-date"></i>
															</div>
															<div class="js-date-option create-content-cell">
																<div class="js-pickr-layer js-end-flatpickr">
																	<div class="js-date-back-layer date-bg d-none"
																		style="display: inline-block" data="">

																		<!-- 날짜 지났을 때 추가 : deadline-exceeded -->
																		<span class="js-pickr-text task-date"> <span
																			class="js-date-text">2021-11-05 (금) 까지</span>
																		</span>
																	</div>
																</div>
															</div>
														</li>
													</ul>
												</div>
											</div>

											<button id="postMoreButton" type="button"
												class="js-contents-more-btn post-more-btn"
												style="display: none" data="">더보기</button>

											<div id="summaryFoldArea" class="content-fold"
												style="display: block" data="">
												<div class="subtask-space">
													<div class="js-subtask-area subtask-wrap">
														<div class="subtask-header">
															<span class="subtask-title"> <i
																class="icons-subtask"></i>하위업무<em
																class="js-subtask-count subtask-count"></em>
															</span>
														</div>
														<ul class="js-subtask-ul subtask-list ui-sortable"
															style="display: block" data-project-srno=""
															data-post-srno="">

														</ul>
														<!-- 삭제 (하위업무) -->
														<div class="subtask-bottom js-subtask-edit-layer">

															<div class="subtask-registered-area js-subtask-edit-area">
																<div class="subtask-input-area js-subtask-li">
																	<div
																		class="js-subtask-status-layer js-subtask-layer subtask-status-area">
																		<button type="button"
																			class="js-subtask-status-button subtask-button subtask-status request"
																			data_status="0">요청</button>
																		<ul
																			class="js-status-setting-layer js-subtask-layer subtask-status-list"
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
																	<input type="text"
																		class="subtask-input js-subtask-input"
																		tab-code="input" maxlength="50"
																		data-empty-msg="하위 업무 제목을 입력하세요!" data-required-yn="Y"
																		placeholder="업무명 입력 (Enter로 업무 연속 등록 가능)">
																	<ul class="js-subtask-menu subtask-menu">
																		<li
																			class="js-subtask-date-layer subtask-menu-date js-mouseover js-date-tooltip"
																			mouseover-text="마감일 추가" data_start_dt=""
																			data_end_dt="">
																			<div class="js-pickr-layer">
																				<input type="hidden" class="js-subtask-date-input"
																					readonly="readonly">
																				<div class="subtask-date-input-div">
																					<button type="button"
																						class="js-subtask-date-button js-flatpicker subtask-button create-icon-box small"
																						tab-code="date">
																						<span> <i class="icons-calendar"></i>
																						</span>
																					</button>
																					<span
																						class="js-subtask-date-text js-flatpicker subtask-date d-none {dead-line-class}"></span>
																				</div>
																			</div>
																		</li>

																		<li
																			class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
																			mouseover-text="담당자 추가">
																			<button type="button"
																				class="js-worker-button subtask-button manager js-worker-box create-icon-box small"
																				tab-code="worker">
																				<span> <i class="icons-person-6 small"></i>
																				</span>
																			</button>
																			<button type="button"
																				class="js-worker-button subtask-button manager js-worker-thumb create-icon-box small d-none"
																				tab-code="worker">
																				<span class="subtask-manager-area"> <span
																					class="js-thumb-image thumbnail">person</span> <span
																					class="subtask-manager-number d-none">{worker_count}</span>
																				</span>
																			</button>
																		</li>
																	</ul>
																	<button type="button"
																		class="js-subtask-enter-button subtask-enter">
																		<i class="icons-reply"></i>
																	</button>
																	<button type="button" class="subtask-register-btn off">
																		<span class="blind">Register</span>
																	</button>

																</div>
																<p class="subtask-close-text subtask-reset-text"
																	style="display: block">취소하려면 Esc 키를 누르세요.</p>
															</div>

														</div>
														<button type="button"
															class="js-add-subtask-button add-button">
															<i class="icons-plus-7"></i>하위업무 추가
														</button>
													</div>
												</div>
											</div>

											<div class="post-bottom-area">
												<div class="post-bottom-menu js-reaction-bookmark">
													<div class="bottom-button-area">
														<button class="js-post-bookmark post-bottom-button ">
															<i class="icon-bookmark"></i> <span>북마크</span>
														</button>
													</div>
												</div>
												<div class="cmt-read-wr">
													<div class="comment-count-area">
														<span>댓글</span> <span class="comment-count">2</span>
													</div>
												</div>

											</div>
											<!-- //post-card-container -->
										</div>
										<div class="post-card-footer js-comment-area">
											<div class="comment-header">
												<button type="button"
													class="js-remark-prev-button comment-more-button ">
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
																<span class="user-name js-comment-user-name">오혜지</span>
																<span class="user-position"></span> <span
																	class="record-date">2021-11-07 13:27</span>
															</div>
															<div class="comment-writer-menu">
																<button type="button"
																	class="js-remark-update js-remark-edit-button comment-writer-button ">
																	수정</button>
																<button type="button"
																	class="js-remark-delete js-remark-edit-button comment-writer-button on">
																	삭제</button>
															</div>
														</div>
														<div class="js-remark-layer comment-content">
															<div class="comment-text-area">
																<div class="js-remark-text comment-text">
																	<div>오혜지님이 상단고정 등록</div>
																</div>
															</div>
															<ul class="js-remark-upload-file upload-document-group"></ul>
															<ul class="js-remark-upload-img comment-upload-img"></ul>
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
																	<div contenteditable="true"
																		class="js-dimd-layer comment-upload-dimd d-none">
																		<span class="dimd-text">첨부할 파일, 이미지 등을 여기에 끌어다
																			놓으세요</span>
																	</div>
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
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- //팝업창 -->

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



	<!-- 게시물 입력 팝업 -->
	<div id="projectMakeLayer"
		class="flow-all-background-1 d-none back-area">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area">
				<div class="input-main-layer flow-project-popup-1 d-block">
					<div class="flow-project-header-1">
						<span id="projectMakePopupTitle"></span>
						<button class="js-service-helper js-mouseover"
							service-code="CREATE">
							<i class="icons-help"></i>
						</button>
						<a href="#"
							class="js-project-make-close-btn flow-close-type-1 close-event"></a>
					</div>
					<div class="flow-content scroll-mask">
						<div class="flow-content-1">
							<input id="projectTitleInput" type="text"
								placeholder="제목을 입력하세요." maxlength="50" autocomplete="off"
								data-empty-msg="제목을 입력하세요." data-over-msg="제목은 50자 이하로 입력하세요."
								data-required-yn="Y">
						</div>
						<div class="flow-content-2">
							<textarea id="projectContentsInput"
								placeholder="프로젝트에 관한 설명 입력 (옵션)" data-required-yn="N"></textarea>
						</div>
						<div class="flow-content-3">
							옵션
							<button class="js-service-helper js-mouseover"
								service-code="OPTION">
								<i class="icons-help"></i>
							</button>
						</div>
						<a href="#"> </a>
						<div class="open-yn check-setting flow-content-4"
							style="display: none;">
							<a> <em></em> 회사 공개 프로젝트 설정
							</a>
							<button class="js-sendience-service-helper js-mouseover"
								mouseover-text="회사 직원이라면 누구나 직접 참여를 요청할 수 있도록 설정합니다.">
								<i class="icons-question"></i>
							</button>
							<a href="#">
								<button type="button"
									class="toggle-button check-area js-project-open-toggle">
									<!-- active 클래스로 제어  -->
									<i class="handle"></i>
								</button>
							</a>
						</div>

						<a href="#">
							<div class="open-category-setting flow-content-8 d-none">
								<em></em> 회사 공개 프로젝트 카테고리 설정
								<div class="flow-sub-content-1">
									<span id="categoryName" class="category-name">선택</span><em></em>
									<i></i>
								</div>
							</div>
						</a> <a href="#"> </a>
						<div class="manager-permit-yn check-setting flow-content-5">
							<a> <em></em> 관리자 승인 후 참여 가능
							</a>
							<button class="js-sendience-service-helper js-mouseover"
								mouseover-text="프로젝트 관리자의 승인 이후에 참여할 수 있도록 설정합니다.">
								<i class="icons-question"></i>
							</button>
							<a href="#">
								<button type="button"
									class="toggle-button check-area js-project-toggle">
									<!-- active 클래스로 제어  -->
									<i class="handle"></i>
								</button>
							</a>
						</div>

						<a href="#">
							<div class="more-option-button flow-content-6">
								<em class="main-return-event"></em> 추가 설정
								<div class="flow-sub-content-1">
									<span class="category-name"></span><em></em> <i></i>
								</div>
							</div>
						</a>
					</div>
					<a href="#">
						<div class="project-submit flow-content-7 un-value">만들기</div>
					</a>
				</div>
				<div class="open-category-layer flow-project-popup-2 d-none">
					<div class="flow-project-header-1">
						<a href="#"><em class="main-return-event"></em></a> 회사 공개 프로젝트
						카테고리 설정 <a href="#" class="flow-close-type-1 close-event"></a>

					</div>
					<div class="flow-content scroll-mask">
						<div class="flow-category-option-1">
							<ul class="open-category-ul"></ul>
						</div>
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="main-return-event flow-pop-sub-button-1">이전으로</div>
						</a> <a href="#">
							<div class="open-category-submit flow-pop-sub-button-2">적용
							</div>
						</a>
					</div>
				</div>
				<div class="more-option-layer flow-project-popup-1 d-none">
					<div class="flow-project-header-1">
						<a href="#"><em class="main-return-event"></em></a> 추가 설정
						<button class="btn-close close-event">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="flow-content scroll-mask">
						<div class="more-option-group">
							<dl class="flow-more-option-1 write-option">
								<dt>글 작성 권한</dt>
								<dd class="check-area" data-manager-write-yn="N">
									<a href="#"><em></em>전체</a>
								</dd>
								<dd class="check-area" data-manager-write-yn="Y">
									<a href="#"><em></em> 프로젝트 관리자만</a>
								</dd>
							</dl>
							<dl class="flow-more-option-1 remark-write-option">
								<dt>댓글 작성 권한</dt>
								<dd class="check-area" data-manager-remark-write-yn="N">
									<a href="#"><em></em>전체</a>
								</dd>
								<dd class="check-area" data-manager-remark-write-yn="Y">
									<a href="#"><em></em> 프로젝트 관리자만</a>
								</dd>
							</dl>
							<dl class="flow-more-option-1 lookup-option">
								<dt class="clearfix">
									글/댓글 조회 권한
									<button class="js-sendience-service-helper js-mouseover"
										mouseover-text="게시물 조회 권한을 설정합니다.">
										<i class="icons-question"></i>
									</button>
									<span class="flow-more-option-alert-txt"> 프로젝트 생성 후에는 권한
										변경이 불가능 합니다 </span>
								</dt>
								<dd class="check-area" data-manager-lookup-yn="N">
									<a href="#"><em></em>전체</a>
								</dd>
								<dd class="check-area" data-manager-lookup-yn="Y">
									<a href="#"><em></em> 프로젝트 관리자 + 글 작성 본인만</a>
								</dd>
							</dl>
							<dl class="flow-more-option-3 download-option">
								<dt>
									파일 조회/다운로드 권한
									<button class="js-sendience-service-helper js-mouseover"
										mouseover-text="첨부 파일, 이미지의 다운로드 및 열람 모두 제한됩니다.">
										<i class="icons-question"></i>
									</button>
								</dt>
								<dd class="check-area" data-manager-download-yn="N">
									<a href="#"><em></em>전체</a>
								</dd>
								<dd class="check-area" data-manager-download-yn="Y">
									<a href="#"><em></em> 프로젝트 관리자 + 글 작성 본인만</a>
								</dd>
							</dl>
						</div>
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="main-return-event flow-pop-sub-button-1">이전으로</div>
						</a> <a href="#">
							<div class="more-option-submit flow-pop-sub-button-2">확인</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>



	<!-- 초대하기 클릭시 팝업 -->
	<div id="inviteLayer" class="flow-all-background-1 d-none">
		<div class="window_top rigVer" style="">
			<!-- 우측정렬 class="rigVer" 추가 -->
			<div class="dragArea"
				style="display: list-item; -webkit-app-region: drag;"></div>
		</div>
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="inviteMainLayer" class="detail-popup-type-1"
					style="display: none">
					<div id="copyLinkAlam" class="detail-alarm-type-1 d-none">초대링크를
						클립보드에 복사했습니다.</div>
					<div class="detail-popup-header-1">
						<span id="inviteTitle" class="invite-title ellipsis"><i
							class="project-color color-code-9"></i></span> <a
							class="closeInviteLayerBtn" href="#"><em></em></a>
					</div>
					<ul id="inviteUl">
						<li id="openTeamInvite"><a href="#">
								<div class="detail-popup-icon-1">
									<span></span>
								</div>
								<div class="detail-popuplist-type-1">
									<span>회사 직원 초대</span> <em>회사 직원 또는 조직도를 확인하고 초대할 수 있습니다.</em>
								</div>
						</a></li>
						<li id="openSendEml"><a href="#">
								<div class="detail-popup-icon-3">
									<span></span>
								</div>
								<div class="detail-popuplist-type-1">
									<span>이메일 초대장 발송</span> <em>초대장을 이메일로 발송할 수 있습니다.</em>
								</div>
						</a></li>
					</ul>
				</div>

				<!-- 이메일 초대장 발송 -->
				<div id="sendInviteEmlLayer"
					class="send-invite-email name-type-seach-popup-type-1"
					style="display: none">
					<div class="name-type-seach-popup-header-type-1 margin-bottom-20">
						<a href="#"><em class="returnMainBtn"></em></a> <span>이메일
							초대장 발송</span>
						<button class="btn-close closeInviteLayerBtn">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="invite-email-area scroll-mask">
						<div class="invite-email-list " id="emailList"></div>
						<a id="addEmail" href="#" class="email-plus-type-1"><em></em><span>이메일
								추가</span></a>
						<div class="flow-email-plus-type-1">초대내용 입력</div>
						<div class="flow-email-bottom-section-1">
							<div id="inviteMsg" contenteditable="true"
								class="flow-email-bottom-text-1">
								<p>
									플로우로 업무관리, 채팅, 파일공유를 한 곳에서! <br>아이폰, 안드로이드는 물론 PC에서도
									사용해보세요.
								</p>
							</div>
						</div>
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 returnMainBtn">취소</div>
						</a> <a href="#">
							<div id="sendInviteEmail" class="flow-pop-sub-button-2">초대</div>
						</a>
					</div>
				</div>

				<div id="teamInviteLayer" class="name-type-seach-popup-type-1"
					style="display: none">
					<div class="name-type-seach-popup-header-type-1">
						<a href="#"><em class="returnMainBtn"></em></a> <span
							id="teamInviteHeader">회사 직원 초대</span>
						<button class="btn-close closeInviteLayerBtn">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="all-setup-type-2">
						<i class="icons-search"></i> <input type="text"
							id="teamInviteSearch" class="coperate-input-type-1"
							placeholder="이름 소속 연락처 내선 검색" autocomplete="off">
					</div>
					<div id="teamInviteMenu" class="team-wrap-invite-type-1">
						<a id="memberMenu" href="#">
							<div class="team-job-invite-type-1">구성원</div>
						</a> <a id="orgChartMenu" href="#">
							<div class="team-job-invite-type-1">조직도</div>
						</a>
					</div>
					<div class="coperate-icon-list-type-1" style="display: block;">
						<ul id="selectMemberList">
						</ul>
					</div>
					<div id="teamInviteArea"
						class="group-tree-wrap-1 coperate-section-position-fix-1 scroll-mask">
						<ul id="inviteOrgChart" class="d-none">
						</ul>
						<ul id="inviteMemberList"
							class="participants-list invite-member-list">
						</ul>
					</div>
					<div id="inviteEmplArea"
						class="sub-drag-section-2 invite-empl-area coperate-section-position-fix-1"
						style="display: none;">
						<div class="line-fixed-section-1"></div>
						<div class="sub-drag-header-type-2">
							<span id="emplList-dvsnName"></span> <span id="resultSearch"
								class="empl-search-text d-none">검색 결과</span> <a
								id="emplAreaCloseBtn" href="#" class="group-close-type-1"></a>
						</div>
						<div class="sub-drag-picture-section-1">
							<div id="existEmplData" style="display: none">
								<ul id="organizationChart-emplList">
								</ul>
							</div>
							<div id="nullEmplData" class="null-empl-search"
								style="display: none">
								<div class="group-sub-null-type-1"></div>
								<span>검색 결과가 없습니다.</span>
							</div>
						</div>
					</div>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 returnMainBtn">취소</div>
						</a> <a href="#">
							<div id="submitInvite" class="flow-pop-sub-button-2">확인</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="tempEmailItem" style="display: none">
		<div class="input-email-type-wrap-1 emailItem">
			<input type="text" class="input-email-type-1 emailItemInput"
				placeholder="example@flow.team" data-valid="email" maxlength="50"
				data-required-yn="Y" data-empty-msg="이메일을 작성해주세요!"
				data-over-msg="이메일은 50자이내로 작성해주세요!"
				data-un-valid-msg="올바른 이메일을 작성해주세요!"> <a class="deleteEmail"
				href="#"></a>
		</div>
	</div>
	<div id="selectMemberItem" style="display: none">
		<li rcvr_cd="{rcvr-cd}" rcvr_gb="{rcvr-gb}" id="{id}"><i
			{profile}=""></i> <a href="#"> <span class="member-name ellipsis">{name}</span>
		</a> <a href="#"> <em class="deleteMemberItem"></em>
		</a></li>
	</div>
	<div id="selectDvsnItem" style="display: none">
		<li rcvr_cd="{rcvr-cd}" rcvr_gb="{rcvr-gb}" id="{id}"><a href="#">
				<span class="member-name ellipsis">{dvsn_name}</span>
		</a> <a href="#"> <em class="deleteMemberItem"></em>
		</a></li>
	</div>






	<!-- 참여자 관리 popup-->
	<div id="allSendiencePopup" class="flow-all-background-1"
		style="display: none;">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="allSendienceLayer" class="project-invite-popup-1">
					<div class="name-type-seach-popup-header-type-1">
						<span>참여자 관리</span>
						<button class="js-sendience-service-helper js-mouseover">
							<i class="icons-help"></i>
						</button>
						<button id="closeButton" class="btn-close">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="all-setup-type-2">
						<i class="icons-search"></i> <input type="text"
							id="allSendienceSearch" class="coperate-input-type-1"
							placeholder="참여자명으로 검색">
					</div>
					<div
						class="sub-drag-picture-section-1 overflow-scroll-type-1  scroll-mask">
						<ul id="allSendienceUl" class="all-sendience-ul">
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>