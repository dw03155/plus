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
<style type="text/css">
#modal {
	display: none;
}

#modalBody {
	
}

#modal .modal_layer {
	
}
</style>
</head>
<body>
	<!-- 상세보기 -->
	<div id="modal">
		<div class="modal_content">
			<div id="subModal"></div>
			<div>
				<div align="right">
					<div class="js-post-nav card-item post-card-wrapper write2  side">
						<button type="button" class="post-popup-button left"></button>
						<div class="post-popup-header card-popup-header d-none"
							style="display: block;">
							<button id="modal_close_btn" class="btn-close card-popup-close">
								<i class="icons-close-1"></i>
							</button>
						</div>
					</div>
				</div>
				<div>
					<div id="modalBody"></div>
				</div>
				<div class="modal_layer"></div>
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
						<form id="frm" name="frm" method="post">
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
					<div id="myPostList" class="small-style-wrap-2"
						style="display: block;">
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
									<li id="myPcontent"
										class="js-all-post-item post-search-item post-list-wrapper">
										<div class="fixed-kind">
											<!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
											<c:if test="${notice.notiKnd=='text'}">
												<c:set var="notiKnd" value="icons-write2" />
											</c:if>
											<c:if test="${notice.notiKnd=='task'}">
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
												<div class="post-list comment" style="display: none" data>
													<i class="icons-comment2"></i><span
														class="js-post-comment-count">0</span>
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

											<!-- 글 종류에 따라 display : block-->
											<div class="fixed-value">
												할일 완료도 <span class="state request" style="display: none"
													data>50%</span> 업무 진행상항 class="progress" 진행 /
												class="request" 요청 / class="completion"완료 /
												class="feedback"피드백 <span
													class="js-task-state state d-none hold"
													style="display: inline-block">보류</span> 일정
												<div class="date-time" style="display: none" data>
													일정 날짜 <em class="date">11/03</em> 일정 시간 <span>오전
														10:00</span>
												</div>
											</div>

										</div>
									</li>
									<!-- 반복 끝 -->
								</c:forEach>
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
											<li id="allPostsSearchUl"
												class="js-all-post-item post-search-item js-search-item">
												<!-- icon 태그 : icon-post-type write2(글), icon-post-type todo(할일), icon-post-type schedule(일정)-->
												<c:if test="${notices.notiKnd=='text'}">
													<c:set var="notiKnd" value="icon-post-type write2" />
												</c:if> <c:if test="${notices.notiKnd=='task'}">
													<c:set var="notiKnd" value="icon-post-type task" />
												</c:if> <c:if test="${notices.notiKnd=='todo'}">
													<c:set var="notiKnd" value="icon-post-type todo" />
												</c:if> <c:if test="${notices.notiKnd=='schedule'}">
													<c:set var="notiKnd" value="icon-post-type schedule" />
												</c:if> <i class="${notiKnd }"></i>
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
		$("#myPostContentUl").click(function() { // 모달창 열고 닫기
			$("#modal").css("display", "block");
		   
			var tr = $(this);
			console.log(tr +"=======");
			var notiKnd = tr.data("target");
			console.log(notiKnd + "88888");
			
			if(notiKnd == "text"){
					$.ajax({
						url : "myPostTxt.do",
						type : 'GET',
						data : {notiId : tr.data("notiId"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			} else if (notiKnd == "task"){
					$.ajax({
						url : "myPostTsk.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			}else if (notiKnd == "schedule"){
				$.ajax({
					url : "myPostSche.do",
					type : 'GET',
					data : {notiId : tr.data("notiid"), notiKnd},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				}); 
			}else if (notiKnd == "todo"){
				$.ajax({
					url : "myPostTodo.do",
					type : 'GET',
					data : {notiId : tr.data("notiid"), notiKnd},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				}); 
			} 
		});
		$("#modal_close_btn").click(function() {
			$("#modal").css("display", "none");
		});
	</script>


	<!-- 필터 버튼 JS -->
	<script>
	
	
	$(document).ready(function() {
		$("#filterBtn").on("click",function(){
		 	$("#filterBtn").addClass("active");
			$("#filterSelect").toggle(); 
		});
	});
	
	$(document).ready(function(){
	    // 버튼 생성과 이벤트 핸들러 추가를 분리합니다.
		   $("#all").button();
		    $("#all").click(function(event) {
		        $("#all").toggleClass("on");
		    });
		    $("#write").button();
		    $("#write").click(function(event) {
		    	$("#write").toggleClass("on");
		    });
		    $("#task").button();
		    $("#task").click(function(event) {
		    	$("#task").toggleClass("on");
		    });
		    $("#sche").button();
		    $("#sche").click(function(event) {
		    	$("#sche").toggleClass("on");
		    });
		    $("#todo").button();
		    $("#todo").click(function(event) {
		    	$("#todo").toggleClass("on");
		    });
	});
	
	
	</script>
	<!-- 돌아가기 버튼 JS -->

	<!-- 전체 게시물 목록 -->
	<!-- <button type="button" onclick="location.href='totalNotice.do'">프로젝트
		상세목록</button> -->
</body>
</html>