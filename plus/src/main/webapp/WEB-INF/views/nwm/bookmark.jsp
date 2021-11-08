<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="../js/jquery-latest.min.js"></script>
<title>Insert title here</title>

</head>
<body>
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
							<span id="postCount" class="count-number">1</span>
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

							<li id="myPostContent"
								class="js-all-post-item post-search-item post-list-wrapper">
								<div class="fixed-kind">
									<i class="icons-schedule"></i> <span class="post-type">일정</span>
								</div>
								<div class="search-sub-text-wrap">
									<div class="contents-cmt">
										<p class="search-text-type-3 contents-tit">시간</p>
										<div class="post-list comment" style="display: none" data="">
											<i class="icons-comment2"></i> <span
												class="js-post-comment-count">0</span>
										</div>
									</div>
									<p class="search-text-type-3 contents-project">
										<em class="ellipsis"><i class="seach-type-2"></i>플로우 이용
											가이드</em>
									</p>
								</div>
								<div class="post-list-right">
									<div class="post-list name">QR</div>
									<div class="post-list date">2021-11-07 15:44</div>
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
						</ul>
					</div>
				</div>

			</div>
		</div>
	</div>

	<script>
		$("#myPostContent").click(function() {
			$(this).toggleClass("highlight");
		});
	</script>
</body>
</html>