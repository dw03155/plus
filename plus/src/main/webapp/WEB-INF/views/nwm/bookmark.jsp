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


	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1 d-none" data-code="bookmark"
				style="display: block;">
				<div>북마크</div>
			</div>
		</div>

		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allPostsLayer" class="me-post-wrap layer-scroll d-none"
				style="display: block;">

				<!-- 북마크 게시물 검색창 -->
				<div class="my-search-area">
					<div class="project-search-area all-file-header-type-3">
						<div class="project-search">
							<i class="icons-search"></i> <input id="allPostsSearchInput"
								type="text" placeholder="검색어를 입력해주세요!"
								class="project-search-input" autocomplete="off" maxlength="50">
							<!-- 검색화면시 돌아가기 display:block-->
							<button type="button"
								class="js-search-back-button js-all-posts-back result-back-button d-none"
								style="display: none;">
								<i class="icons-back"></i> 돌아가기
							</button>
						</div>
					</div>
				</div>

				<!-- 북마크 게시물 -->
				<div class="small-style-wrap-2">
					<div class="feed-content me-content">
						<div class="search-title-area">
							<span id="allPostsFilterTitle" class="search-result-title">전체</span>
							<!--전체 + 갯수 카운트-->
							<span id="postCount" class="count-number">${fn:length(bookmarks)}</span>
							<!--필터링 후 취소 버튼 노출 -->
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
							<c:forEach var="bookmarks" items="${bookmarks }">
								<li id="myPostContent"
									class="js-all-post-item post-search-item post-list-wrapper ${bookmarks.notiKnd}"
									data-notiid="${bookmarks.notiId }"
									data-kind="${bookmarks.notiKnd }">
									<div class="fixed-kind">
										<c:if test="${bookmarks.notiKnd=='text'}">
											<c:set var="notiKnd" value="icons-write2" />
										</c:if>
										<c:if test="${bookmarks.notiKnd=='task'}">
											<c:set var="notiKnd" value="icons-task" />
										</c:if>
										<c:if test="${bookmarks.notiKnd=='todo'}">
											<c:set var="notiKnd" value="icons-todo" />
										</c:if>
										<c:if test="${bookmarks.notiKnd=='schedule'}">
											<c:set var="notiKnd" value="icons-schedule" />
										</c:if>
										<i class="${notiKnd }"></i> <span class="post-type">${bookmarks.notiKnd}</span>
									</div>
									<div class="search-sub-text-wrap">
										<div class="contents-cmt">
											<p class="search-text-type-3 contents-tit">${bookmarks.notiTtl }</p>
											<div class="post-list comment" style="display: none">
												<i class="icons-comment2"></i> <span
													class="js-post-comment-count"></span>
											</div>
										</div>
										<p class="search-text-type-3 contents-project">
											<em class="ellipsis"><i class="seach-type-2"></i>${bookmarks.prjTtl}</em>
										</p>
									</div>
									<div class="post-list-right">
										<div class="post-list name">${bookmarks.name }</div>
										<div class="post-list date"><fmt:formatDate pattern="yyyy-MM-dd HH:mm"
													value="${bookmarks.notiDttm}" /></div>
										<!--
            <div class="fixed-value">
                <span class="state request" style="display:none" data>-1%</span>
                <span class="js-task-state state " ></span>
                <div class="date-time" style="display:none" data>
                    <em class="date">11/05</em>
                    <span>오전 04:40</span>
                </div>
            </div>
            -->
									</div>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>

			</div>
		</div>
	</div>

	<script>
		// 북마크 모달창 (팝업)
		$("#myPostContentUl > li").click(function(e) {
			if ($(e.currentTarget).hasClass("highlight")) {
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

		// 게시글 종류 필터
		$("#filterBtn").on("click", function() {
			$("#filterBtn").addClass("active");
			$("#filterSelect").toggle();
		});

		// 전체
		$("#all").button().click(function(event) {
			$("#write, #task, #sche, #todo").removeClass("on");
			$("#all").addClass("on");
			$(".text, .task, .schedule, .todo").show();
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "");
		});

		// 글
		$("#write").button();
		$("#write").click(function(event) {
			$("#all, #task, #sche, #todo").removeClass("on");
			$("#write").addClass("on");
			$(".text").show();
			$(".task, .schedule, .todo").hide();
			removeFiller();
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$(".count-number").html(count);

		});

		// 업무
		$("#task").button();
		$("#task").click(function(event) {
			$("#all, #write, #sche, #todo").removeClass("on");
			$("#task").addClass("on");
			$(".task").show();
			$(".text, .schedule, .todo").hide();
			removeFiller()
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$(".count-number").html(count);

		});

		// 일정
		$("#sche").button();
		$("#sche").click(function(event) {
			$("#all, #task, #write, #todo").removeClass("on");
			$("#sche").addClass("on");
			$(".schedule").show();
			$(".task, .text, .todo").hide();
			removeFiller()
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$(".count-number").html(count);
		});

		// 할일
		$("#todo").button();
		$("#todo").click(function(event) {
			$("#all, #task, #sche, #write").removeClass("on");
			$("#todo").addClass("on");
			$(".todo").show();
			$(".task, .schedule, .text").hide();
			removeFiller()
			var count = $("#myPostContentUl").find('li:visible').length;
			console.log(count + "====");
			$(".count-number").html(count);
		});

		// 필터 설정 취소
		function removeFiller() {
			$("#cancleFilter").show();
			$("#cancleFilter").click(function() {
				$("#all").addClass("on");
				$(".text, .task, .schedule, .todo").show();
				$("#cancleFilter").hide();
				$("#write, #task, #sche, #todo").removeClass("on");
				var count = $("#myPostContentUl").find('li:visible').length;
				console.log(count + "====");
				$(".count-number").html("${fn:length(bookmarks)}");
			});
		}

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