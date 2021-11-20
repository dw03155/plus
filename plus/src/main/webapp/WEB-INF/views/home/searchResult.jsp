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
		<div id="searchResult" class="all-search-section d-none"
			style="display: none;">
			<div id="topSettingBar" class="main-header">
				<div class="title-1" style="display: block">
					"<em id="searchWord"></em>" 검색 결과
				</div>
				<button id="searchResultClose" type="button" class="close-button">
					<span class="blind">닫기</span>
				</button>
			</div>
		</div>
		<!-- 프로젝트 검색 -->
		<div id="projectSearchResultItem" class="d-none">
			<li class="project-search-item js-search-item" data-code="project"
				colabo_srno="{COLABO_SRNO}">
				<div class="search-project color-code-{BG_COLOR_CD}"></div> <a
				href="#" class="js-star-button">
					<div class="js-star-icon seach-star-type-1 {unstar_class}"></div>
			</a> <a href="#" class="search-tit"> <em class="seach-text-type-1">{TTL}</em>
			</a>
			</li>
		</div>
		<!-- 글 검색 -->
		<div id="postSearchResultItem" class="d-none">
			<li class="post-search-item js-search-item" data-code="post"
				colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
				<i class="icon-post-type {post_class}"></i>
				<div class="search-sub-text-wrap">
					<a href="#" class="search-text-type-3 contents-tit">
						<p>
							<span class="post-name-txt">{post_name}</span>{contents}
						</p>
					</a>
					<p class="search-text-type-3 contents-project">
						<span class="search-name ellipsis">{RGSR_NM}</span> <span
							class="date">{date}</span><em class="project-title ellipsis"><i
							class="seach-type-2"></i>{TTL}</em>
					</p>
				</div>

			</li>
		</div>
		<!-- 파일 검색 -->
		<div id="fileSearchResultItem" class="d-none">
			<li class="file-search-item js-search-item" data-code="file"
				colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}"
				use_intt_id="{USE_INTT_ID}" atch_srno="{ATCH_SRNO}"
				rand_key="{RAND_KEY}" file_type="{FILE_TYPE}"
				orcp_file_nm="{data_file_name}" file_size="{FILE_SIZE}"
				file_strg_path="{FILE_STRG_PATH}" img_path="{FILE_STRG_PATH}"
				thum_img_path="{THUM_IMG_PATH}" height="{HEIGHT}" width="{WIDTH}"
				rgsr_nm="{RGSR_NM}" rgsn_dttm="{RGSN_DTTM}"><i
				class="icon-file-type {file_class}"></i>
				<div class="search-sub-text-wrap">
					<a href="#" class="search-text-type-3 contents-tit">
						<p>
							{ORCP_FILE_NM}<em class="file-size-txt">{size}</em>
						</p>
					</a>
					<p class="search-text-type-3 contents-project">
						<span class="search-name ellipsis">{RGSR_NM}</span> <span
							class="date">{date}</span><em class="project-title ellipsis"><i
							class="seach-type-2"></i>{TTL}</em>
					</p>
				</div>
				<button type="button" class="js-download all-search-download">
					<i></i> <span>다운로드</span>
				</button></li>
		</div>
		<!-- 전체 게시물 -->
		<div id="allPostItem" class="d-none">
			<li id="allPosts-{COLABO_COMMT_SRNO}"
				class="js-all-post-item post-search-item post-list-wrapper"
				tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
				colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
				<div class="fixed-kind">
					<i class="icons-{post-gb}"></i> <span class="post-type">{post-name}</span>
				</div>
				<div class="search-sub-text-wrap">
					<div class="contents-cmt">
						<p class="search-text-type-3 contents-tit">{first-contents}</p>
						<div class="post-list comment" {remark-display}="">
							<i class="icons-comment2"></i> <span
								class="js-post-comment-count">{REMARK_CNT}</span>
						</div>
					</div>
					<p class="search-text-type-3 contents-project">
						<em class="ellipsis"><i class="seach-type-2"></i>{COLABO_TTL}</em>
					</p>
				</div>
				<div class="post-list-right">
					<div class="post-list name">{name}</div>
					<div class="post-list date">{date}</div>
					<!--
            <div class="fixed-value">
                <span class="state request" {todo-display}>{TODO_DONE_PERCENT}</span>
                <span class="js-task-state state {status-code}" {task-display}>{status}</span>
                <div class="date-time" {schedule-display}>
                    <em class="date">{start-date}</em>
                    <span>{start-time}</span>
                </div>
            </div>
            -->
				</div>
			</li>
		</div>

		<!-- 전체 게시물 검색 -->
		<div id="allPostSearchItem" class="d-none">
			<li class="js-all-post-item post-search-item js-search-item"
				tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
				colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
				<i class="icon-post-type {post-gb}"></i>
				<div class="search-sub-text-wrap">
					<a href="#" class="search-text-type-3 contents-tit">
						<p>
							<span class="post-type">{post-name}</span>{first-contents}
						</p>
					</a>
					<p class="search-text-type-3 contents-project">
						<span class="search-name ellipsis">{name}</span> <span
							class="date">{date}</span><em class="project-title ellipsis"><i
							class="icons-project-1"></i>{COLABO_TTL}</em>
					</p>
				</div>

			</li>
		</div>
		<div id="allPostItem" class="d-none">
			<li id="allPosts-{COLABO_COMMT_SRNO}"
				class="js-all-post-item post-search-item post-list-wrapper"
				tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
				colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
				<div class="fixed-kind">
					<i class="icons-{post-gb}"></i> <span class="post-type">{post-name}</span>
				</div>
				<div class="search-sub-text-wrap">
					<div class="contents-cmt">
						<p class="search-text-type-3 contents-tit">{first-contents}</p>
						<div class="post-list comment" {remark-display}="">
							<i class="icons-comment2"></i> <span
								class="js-post-comment-count">{REMARK_CNT}</span>
						</div>
					</div>
					<p class="search-text-type-3 contents-project">
						<em class="ellipsis"><i class="seach-type-2"></i>{COLABO_TTL}</em>
					</p>
				</div>
				<div class="post-list-right">
					<div class="post-list name">{name}</div>
					<div class="post-list date">{date}</div>
					<!--
            <div class="fixed-value">
                <span class="state request" {todo-display}>{TODO_DONE_PERCENT}</span>
                <span class="js-task-state state {status-code}" {task-display}>{status}</span>
                <div class="date-time" {schedule-display}>
                    <em class="date">{start-date}</em>
                    <span>{start-time}</span>
                </div>
            </div>
            -->
				</div>
			</li>
		</div>
		<div id="allPostSearchItem" class="d-none">
			<li class="js-all-post-item post-search-item js-search-item"
				tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}"
				colabo_commt_srno="{COLABO_COMMT_SRNO}"
				colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
				<i class="icon-post-type {post-gb}"></i>
				<div class="search-sub-text-wrap">
					<a href="#" class="search-text-type-3 contents-tit">
						<p>
							<span class="post-type">{post-name}</span>{first-contents}
						</p>
					</a>
					<p class="search-text-type-3 contents-project">
						<span class="search-name ellipsis">{name}</span> <span
							class="date">{date}</span><em class="project-title ellipsis"><i
							class="icons-project-1"></i>{COLABO_TTL}</em>
					</p>
				</div>

			</li>
		</div>
	</div>
</body>
</html>