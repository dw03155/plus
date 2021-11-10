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
<script type="text/javascript">
	$(document).ready(function() {
		$("#filterBtn").on("click", function() {
			$("#filterBtn").addClass("active");
			$("#filterSelect").toggle();
		});
		// 버튼 생성과 이벤트 핸들러 추가를 분리합니다.
		$("#all").button().click(function(event) {
			$("#write, #task, #sche, #todo").removeClass("on");
			$("#all").addClass("on");
			$(".text, .task, .schedule, .todo").show();
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "");
		});

		$("#write").button();
		$("#write").click(function(event) {
			$("#all, #task, #sche, #todo").removeClass("on");
			$("#write").addClass("on");
			$(".text").show();
			$(".task, .schedule, .todo").hide();
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
		});

		$("#task").button();
		$("#task").click(function(event) {
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$("#all, #write, #sche, #todo").removeClass("on");
			$("#task").addClass("on");
			$(".task").show();
			$(".text, .schedule, .todo").hide();
		});

		$("#sche").button();
		$("#sche").click(function(event) {
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$("#all, #task, #write, #todo").removeClass("on");
			$("#sche").addClass("on");
			$(".schedule").show();
			$(".task, .text, .todo").hide();
		});

		$("#todo").button();
		$("#todo").click(function(event) {
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$("#all, #task, #sche, #write").removeClass("on");
			$("#todo").addClass("on");
			$(".todo").show();
			$(".task, .schedule, .text").hide();
		});
	});
</script>
</head>
<body>
	<!-- 전체 업무 상세보기 (모달창) -->
	<div class="back-area temp-popup" tabindex="0" id="postPopup"
		style="display: none;">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="js-post-nav card-item post-card-wrapper task  side">
					<button type="button" class="post-popup-button left"></button>
					<div id="modalBody"></div>
					<!-- 모달창 Jsp (nwm > modal) -->
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="js-post-nav card-item post-card-wrapper write2  side"></div> -->

	<!-- 내 게시물 -->
	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1" style="display: block">
				<div>내 게시물</div>
			</div>
		</div>

		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allPostsLayer" class="me-post-wrap layer-scroll d-none"
				style="display: block;">

				<!-- 내 게시물 검색창 -->
				<div class="my-search-area">
					<div class="project-search-area all-file-header-type-3">
						<form name="frm" method="post">
							<div class="project-search">
								<i class="icons-search"></i> <input id="notiTtl" name="notiTtl"
									type="text" placeholder="검색어를 입력해주세요!"
									class="project-search-input" autocomplete="off" maxlength="50">
								<input type="hidden" value="" name="mId" id="memId">
							</div>
						</form>
						<!-- 검색화면시 돌아가기 display:block-->
						<c:if test="${not empty param.notiTtl }">
							<button id="backBtn" type="button"
								class="js-search-back-button js-all-posts-back result-back-button d-none"
								style="display: block">
								<i class="icons-back"></i> 돌아가기
							</button>
						</c:if>
					</div>
				</div>

				<!-- 내 게시물 화면 -->
				<c:if test="${ empty param.notiTtl }">
					<div class="small-style-wrap-2" style="display: block;">
						<div class="feed-content me-content">
							<div class="search-title-area">
								<span id="allPostsFilterTitle" class="search-result-title">전체</span>
								<!--전체 + 갯수 카운트-->
								<span class="count-number">${fn:length(notices)}</span>
								<!-- 필터 선택 후 취소 버튼 노출 display: inline-block -->
								<span id="cancleFilter" class="js-filter-reset filter-reset"
									style="display: none;">취소</span>
								<!--필터-->
								<div id="allPostsFilter" class="me-filter-area"
									style="display: block;">
									<button id="filterBtn" type="button"
										class="js-all-posts-filter-button filter-button">필터</button>
									<ul id="filterSelect"
										class="js-all-posts-filter-layer check-menu-popup my-popup"
										style="display: none; position: absolute; top: 24px; right: 0;">
										<li>
											<div id="all"
												class="js-tmpl-type js-total-tmpl-type check-menu-item on"
												data-code="">전체</div>
										</li>
										<li>
											<div id="write" class="js-tmpl-type check-menu-item"
												data-code="1">글</div>
										</li>
										<li>
											<div id="task" class="js-tmpl-type check-menu-item"
												data-code="4">업무</div>
										</li>
										<li>
											<div id="sche" class="js-tmpl-type check-menu-item"
												data-code="3">일정</div>
										</li>
										<li>
											<div id="todo" class="js-tmpl-type check-menu-item"
												data-code="2">할일</div>
										</li>
									</ul>
								</div>
							</div>
							<ul id="myPostContentUl"
								class="all-seach-list-type-1 post-group scroll-mask">

								<!-- 반복 시작 -->
								<c:forEach var="notice" items="${notices}">
									<li
										class="js-all-post-item post-search-item post-list-wrapper ${notice.notiKnd}"
										data-notiid="${notice.notiId }" data-kind="${notice.notiKnd}">
										<div class="fixed-kind">
											<!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
											<c:if test="${notice.notiKnd=='text'}">
												<c:set var="notiKnd" value="icons-write2" />
											</c:if>
											<c:if test="${notice.notiKnd=='task'}">
												<c:set var="notiKnd" value="icons-task" />
											</c:if>
											<c:if test="${notice.notiKnd=='subtask'}">
												<c:set var="notiKnd" value="icons-task" />
											</c:if>
											<c:if test="${notice.notiKnd=='todo'}">
												<c:set var="notiKnd" value="icons-todo" />
											</c:if>
											<c:if test="${notice.notiKnd=='schedule'}">
												<c:set var="notiKnd" value="icons-schedule" />
											</c:if>
											<i class="${notiKnd }"></i> <span class="post-type">${notice.notiKnd}</span>
										</div>
										<div class="search-sub-text-wrap">
											<div class="contents-cmt">
												<p class="search-text-type-3 contents-tit">${notice.notiTtl }</p>
												<!-- 댓글 있으면 표시-->
												<div class="post-list comment" style="display: none">
													<i class="icons-comment2"></i><span
														class="js-post-comment-count">0</span>
												</div>
												<div class="post-list subtask" style="display: none">
													<em class="subtask-item"> <i class="icons-subtask"></i>
														<span class="subtask-number">0</span>
													</em>
												</div>
											</div>

											<p class="search-text-type-3 contents-project">
												<em class="ellipsis"><i class="seach-type-2"></i>${notice.prjTtl }</em>
											</p>
										</div>
										<div class="post-list-right">
											<div class="post-list name">${notice.name }</div>
											<div class="post-list date">
												<fmt:formatDate pattern="yyyy-MM-dd HH:mm"
													value="${notice.notiDttm}" />
											</div>

											<!-- 글 종류에 따라 display :block-->
											<div class="fixed-value">
												<c:if test="${notice.notiKnd=='task'}">
													<span class="js-task-state state d-none hold"
														style="display: none">보류</span>
													<span class="js-task-state state d-none progress"
														style="display: none">진행</span>
													<span class="js-task-state state d-none request"
														style="display: none">요청</span>
													<span class="js-task-state state d-none completion"
														style="display: none">완료</span>
													<span class="js-task-state state d-none feedback"
														style="display: none">피드백</span>
												</c:if>
												<c:if test="${notice.notiKnd=='schedule'}">
													<div class="p" style="display: inline-block">
														<em class="date"><fmt:formatDate pattern="MM/dd "
																value="${notice.notiDttm}" /></em> <span><fmt:formatDate
																pattern="HH:mm" value="${notice.notiDttm}" /></span>
													</div>
												</c:if>
												<c:if test="${notice.notiKnd=='todo'}">
													<span class="state request" style="display: inline-block">50%</span>
												</c:if>
												<!-- 할일 완료도  업무 진행상항 class="progress" 진행 /
												class="request" 요청 / class="completion"완료 /
												class="feedback"피드백  일정 -->
												<!--
									            <div class="fixed-value">
									                <span class="state request" style="display:none" data>-1%</span>
									                <span class="js-task-state state request" >요청</span>
									                <div class="date-time" style="display:none" data>
									                    <em class="date">-</em>
									                    <span>-</span>
									                </div>
									            </div>
									            -->
											</div>
										</div>
									</li>
								</c:forEach>
								<!-- 반복 끝 -->
							</ul>
						</div>
					</div>
				</c:if>

				<!-- 내 게시물 검색 화면 -->
				<!-- 검색시 display:block -->
				<c:if test="${not empty param.notiTtl }">
					<div id="myPostSearch"
						class="js-post-search-result all-search-section d-none me-post-wrap"
						style="display: block">
						<div class="all-search-container">
							<div class="all-search-content">
								<div id="postSearchArea" class="search-result-group">
									<div class="search-title-area">
										<span class="search-result-title">전체</span><span
											id="allPostsSearchCount"
											class="js-search-post-count search-result-count"
											style="display: inline-block">${fn:length(notices)}</span>
									</div>
									<ul id="allPostsSearchUl"
										class="js-search-post-ul all-seach-list-type-1 scroll-mask">

										<!-- 반복 시작 -->
										<c:forEach var="notices" items="${notices }">
											<c:if test="${notices.notiKnd=='text'}">
												<c:set var="notiKnd" value="icon-post-type write2" />
											</c:if>
											<c:if test="${notices.notiKnd=='task'}">
												<c:set var="notiKnd" value="icon-post-type task" />
											</c:if>
											<c:if test="${notices.notiKnd=='todo'}">
												<c:set var="notiKnd" value="icon-post-type todo" />
											</c:if>
											<c:if test="${notices.notiKnd=='schedule'}">
												<c:set var="notiKnd" value="icon-post-type schedule" />
											</c:if>
											<li id="allPostsSearchUl"
												class="js-all-post-item post-search-item js-search-item  ${notices.notiKnd}">
												<!-- icon 태그 : icon-post-type write2(글), icon-post-type todo(할일), icon-post-type schedule(일정)-->
												<i class="${notiKnd }"></i>
												<div class="search-sub-text-wrap">
													<a href="" class="search-text-type-3 contents-tit">
														<p>
															<span class="post-type">${notices.notiKnd }</span>${notices.notiTtl }
														</p>
													</a>
													<p class="search-text-type-3 contents-project">
														<span class="search-name ellipsis">${notices.name }</span><span
															class="date"><fmt:formatDate
																pattern="yyyy-MM-dd HH:mm" value="${notices.notiDttm}" /></span>
														<em class="project-title ellipsis"><i
															class="icons-project-1"></i>${notices.prjTtl }</em>
													</p>
												</div>
											</li>
										</c:forEach>
									</ul>
									<!-- 반복 끝 -->
								</div>
							</div>
						</div>
					</div>
				</c:if>
			</div>
		</div>
	</div>

	<!-- 내 게시물 모달창 JS -->
	<script>
		// 내 게시물 모달창 (팝업)
		$("#myPostContentUl > li").click(function(e) {
			if ($(e.currentTarget).hasClass("highlight")) {
				console.log("ddd===========================");
				console.log($(e.currentTarget));
				$(e.currentTarget).removeClass("highlight");
				$("#postPopup").css("display", "none");
			} else if (!$(e.currentTarget).hasClass("highlight")) {
				$("#myPostContentUl > li").removeClass("highlight");
				$(e.currentTarget).addClass("highlight");
				$("#postPopup").css("display", "block");

				popUpDatail($(this));

			}
		});

		// 모달창 호출 (ajax)
		function popUpDatail(li) {

			var notiKnd = li.data("kind");
			var notiId = li.data("notiid");

			if (notiKnd == "text") {
				$.ajax({
					url : "myPostTxt.do",
					type : 'POST',
					data : {
						notiId : notiId
					},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				});
			} else if (notiKnd == "task") {
				$.ajax({
					url : "myPostTsk.do",
					type : 'POST',
					data : {
						notiId : notiId
					},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				});
			} else if (notiKnd == "schedule") {
				$.ajax({
					url : "myPostSche.do",
					type : 'POST',
					data : {
						notiId : notiId
					},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				});
			} else if (notiKnd == "todo") {
				$.ajax({
					url : "myPostTodo.do",
					type : 'POST',
					data : {
						notiId : notiId
					},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				});
			}
		};
	</script>


</body>
</html>