<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
#modal {
	z-index: 2000;
	display: none;
}

#modalBody {
	
}

#modal .modal_content {
	max-width: 400px;
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

#modal .modal_layer {
	
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content {
	display: none;
	position: fixed;
	border: 1px solid black;
	padding: 12px 16px;
	z-index: 1;
}

.dropdown:hover .dropdown-content {
	display: block;
}
</style>
</head>
<body>
	<!-- 상세보기 -->
	<div id="modal">
		<div class="modal_content">
			<span id="modal_close_btn">&times;</span>
			<div id="subModal">
				<div align="right">
					<button type="button">핀셋</button>
					<div class="dropdown" align="left">
						<button type="button" id="more_btn">더보기</button>
						<div class="dropdown-content">
							<button type="button" id="modify"
								onclick="location.href='textForm.do'">수정</button>
							<button type="button" id="delect">삭제</button>
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
						<button type="button"
							class="js-search-back-button js-all-posts-back result-back-button d-none"
							style="display: none">
							<i class="icons-back"></i> 돌아가기
						</button>
					</div>
				</div>

				<!-- 내 게시물 화면 -->
				<div class="small-style-wrap-2">
					<div class="feed-content me-content">
						<div class="search-title-area">
							<span id="allPostsFilterTitle" class="search-result-title">전체</span>
							<!--전체 + 갯수 카운트-->
							<span id="postCount" class="count-number">0</span>
							<!-- 필터 선택 후 취소 버튼 노출 display: inline-block -->
							<span class="js-filter-reset filter-reset" style="display: none">취소</span>
							<!--필터-->
							<div id="allPostsFilter" class="me-filter-area"
								style="display: block">
								<button type="button"
									class="js-all-posts-filter-button filter-button">필터</button>
								<ul class="js-all-posts-filter-layer check-menu-popup my-popup"
									style="display: none; position: absolute; top: 24px; right: 0;">
									<li>
										<div class="js-tmpl-type js-total-tmpl-type check-menu-item"
											data-code="">전체</div>
									</li>
									<li>
										<div class="js-tmpl-type check-menu-item" data-code="1">글</div>
									</li>
									<li>
										<div class="js-tmpl-type check-menu-item" data-code="4">업무</div>
									</li>
									<li>
										<div class="js-tmpl-type check-menu-item" data-code="3">일정</div>
									</li>
									<li>
										<div class="js-tmpl-type check-menu-item" data-code="2">할일</div>
									</li>
								</ul>
							</div>
						</div>
						<ul id="myPostContentUl"
							class="all-seach-list-type-1 post-group scroll-mask">

							<!-- 반복 시작 -->
							<c:forEach var="notices" items="${notices }">
								<li id=""
									class="js-all-post-item post-search-item post-list-wrapper">
									<div class="fixed-kind">
									<!-- 글 class="icons-write2" 할일 class="icons-todo" 일정 class="icons-schedule"-->
										<i class="icons-task"></i> <span class="post-type">${notices.notiKnd}</span>
									</div>
									<div class="search-sub-text-wrap">
										<div class="contents-cmt">
											<p class="search-text-type-3 contents-tit">${notices.notiTtl }</p>
											<!-- 댓글 있으면 표시-->
											<div class="post-list comment" style="display: none" data>
												<i class="icons-comment2"></i><span
													class="js-post-comment-count">0</span>
											</div>
										</div>
										<p class="search-text-type-3 contents-project">
											<em class="ellipsis"><i class="search-type-2"></i>{프로젝트
												명}</em>
										</p>
									</div>
									<div class="post-list-right">
										<div class="post-list name">${notices.name }</div>
										<div class="post-list date">
											<fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
												value="${notices.notiDttm}" />
										</div>
									</div>
								</li>
								<!-- 반복 끝 -->
							</c:forEach>
						</ul>
					</div>
				</div>

				<!-- 내 게시물 검색 화면 -->
				<!-- 검색시 display:block -->
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
										style="display: inline-block"></span>
								</div>
								<ul id="allPostsSearchUl"
									class="js-search-post-ul all-seach-list-type-1 scroll-mask">
									<li id="allPostsSearchUl"
										class="js-all-post-item post-search-item js-search-item">
										<!-- icon 태그 : icon-post-type write2(글), icon-post-type todo(할일), icon-post-type schedule(일정)-->
										<i class="icon-post-type task"></i>
										<div class="search-sub-text-wrap">
											<a href="" class="search-text-type-3 contents-tit"><p>
													<span class="post-type">{업무}</span>
												</p>{업무 제목}</a>
											<p class="search-text-type-3 contents-project">
												<span class="search-name ellipsis">{작성자}</span><span
													class="date">{작성일자}</span> <em
													class="project-title ellipsis"><i
													class="icons-project-1"></i>{프로젝트 제목}</em>
											</p>
										</div>
									<li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
	<!-- 모달창 JS -->
		$("tr").click(function() { // 모달창 열고 닫기
			$("#modal").css("display", "block");
		   
			var tr = $(this);
			var notiKnd = tr.data("kind");
			
			if(notiKnd == "text"){
					$.ajax({
						url : "myPostTxt.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
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

	<!-- 전체 게시물 목록 -->
	<!-- <button type="button" onclick="location.href='totalNotice.do'">프로젝트
		상세목록</button> -->
</body>
</html>