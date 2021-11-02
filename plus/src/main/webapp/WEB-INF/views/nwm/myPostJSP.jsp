<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="main-container">

		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allPostsLayer" class="me-post-wrap layer-scroll d-none"
				style="display: block;">
				<div class="my-search-area">
					<div class="project-search-area all-file-header-type-3">
						<div class="project-search">
							<i class="icons-search"></i> <input id="allPostsSearchInput"
								type="text" placeholder="검색어를 입력해주세요!"
								class="project-search-input" autocomplete="off" maxlength="50">
						</div>
						<button type="button"
							class="js-search-back-button js-all-posts-back result-back-button d-none">
							<i class="icons-back"></i> 돌아가기
						</button>
					</div>
				</div>


				<div class="small-style-wrap-2">
					<div class="feed-content me-content">
						<div class="search-title-area">
							<span id="allPostsFilterTitle" class="search-result-title">전체</span>
							<span id="postCount" class="count-number">0</span>
							<!--전체 + 갯수 카운트-->
							<div id="allPostsFilter" class="me-filter-area"
								style="display: block;">
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
							<li id=""
								class="js-all-post-item post-search-item post-list-wrapper">
								<div class="fixed-kind">
									<i class="icons-task"></i> <span class="post-type">업무</span>
								</div>
								<div class="search-sub-text-wrap">
									<div class="contents-cmt">
										<p class="search-text-type-3 contents-tit">{업무 제목}</p>
										<!-- 댓글 있으면 표시-->
										<div class="post-list comment" style="display: none" data>
											<i class="icons-comment2"></i><span
												class="js-post-comment-count">0</span>
										</div>
									</div>
									<p class="search-text-type-3 contents-project">
										<em class="ellipsis"><i class="search-type-2">{프로젝트
												명}</i></em>
									</p>
								</div>
								<div class="post-list-right">
									<div class="post-list name">{글쓴이}</div>
									<div class="post-list date">{게시물 작성날짜}</div>

									<div class="fixed-value">
										<span class="state request" style="display: none" data>-1%</span>
										<span class="js-task-state state hold">보류</span>
										<div class="date-time" style="display: none" data>
											<em class="date">-</em> <span>-</span>
										</div>
									</div>
								</div>
							</li>
							---------------------------------------
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>