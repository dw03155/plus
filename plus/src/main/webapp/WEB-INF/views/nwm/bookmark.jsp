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
							<span id="postCount" class="count-number">${fn:length(bookmarks)}</span>
							<!--전체 + 갯수 카운트-->
							<span class="js-filter-reset filter-reset" style="display: none;">취소</span>
							<!--필터링 후 취소 버튼 노출 -->
							<!--필터-->
							<div id="allPostsFilter" class="me-filter-area"
								style="display: block;">
								<button type="button"
									class="js-all-posts-filter-button filter-button">필터</button>
								<ul class="js-all-posts-filter-layer check-menu-popup my-popup"
									style="display: none; position: absolute; top: 24px; right: 0;">
									<li>
										<div
											class="js-tmpl-type js-total-tmpl-type check-menu-item on"
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
										<div class="js-tmpl-type check-menu-item" data-code="2">할
											일</div>
									</li>
									<li>
										<div class="js-tmpl-type js-remark-tmpl-type check-menu-item"
											data-code="-1" style="display: none;">댓글</div>
									</li>
								</ul>
							</div>
						</div>

						<ul id="myPostContentUl"
							class="all-seach-list-type-1 post-group scroll-mask"
							scroll-direction="0">
							
							<!-- 반복 시작 -->
							<c:forEach var="bookmarks" items="${bookmark }">
							<li id="myPostContent"
								class="js-all-post-item post-search-item post-list-wrapper" data-kind="${bookmarks.notiKnd }">
								<div class="fixed-kind">
									<i class="icons-schedule"></i> <span class="post-type">일정</span>
								</div>
								<div class="search-sub-text-wrap">
									<div class="contents-cmt">
										<p class="search-text-type-3 contents-tit">${bookmarks.notiTtl }</p>
										<div class="post-list comment" style="display: none" data="">
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
									<div class="post-list date">${bookmarks.notiDttm }</div>
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
	$("#myPostContentUl > li").click(function(e) {
		if($(e.currentTarget).hasClass("highlight")){
			console.log("ddd===========================");
			console.log($(e.currentTarget));
			$(e.currentTarget).removeClass("highlight");
			$("#postPopup").css("display","none");
		}
		else if (!$(e.currentTarget).hasClass("highlight")){
			console.log("bbb===========================");
			$("#myPostContentUl > li").removeClass("highlight");
			$(e.currentTarget).addClass("highlight");
			$("#postPopup").css("display","block");
			 
			popUpDatail($(this));
			
		}
	 });

function popUpDatail(li){
	

	var notiKnd = li.data("kind");
	var notiId = li.data("notiid");
	
	if(notiKnd == "text"){
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
	} else if (notiKnd == "task"){
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
	}else if (notiKnd == "schedule"){
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
	}else if (notiKnd == "todo"){
		$.ajax({
			url : "myPostTodo.do",
			type : 'POST',
			data :{
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