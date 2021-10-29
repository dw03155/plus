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
		<!-- 프로젝트 상세페이지 Top -->
		<div id="topSettingBar" class="main-header">
			<div id="detailTop" class="project-detail title-1 d-none">
				<div class="project-detail-header">
					<div class="project-color-area">
						<i id="projectColor" class="project-color color-code-2"></i>
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
										<span>프로젝트 번호</span> <em id="detailSettingProjectSrno"></em>
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
								mouseover-text=""></h3>
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
								<li id="unalarmIcon" class="d-none"><i
									class="sprite-detail icon-unalarm js-icon-un-alarm"><span
										class="blind">푸시 알림 OFF</span></i>
									<div class="tooltip-square">
										<em class="tooltip-title">푸시 알림 OFF</em>
										<p class="tooltip-text">휴대폰 푸시 또는 브라우저에 알림이 가지 않습니다. 프로젝트
											[알림 설정]메뉴에서 변경할 수 있습니다.</p>
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
							<button id="allPostsDetailSearchTopButton" type="button"
								class="search-set-button">옵션</button>
							<div id="allPostsDetailSearchLayer"
								class="name-type-seach-popup d-none"
								data-search-area-code="IN_POSTS" style="top: 40px; left: 0px;">
								<p>옵션</p>
								<div class="detail-search-conditions">
									<ul class="conditions-group">
										<li class="js-project-name-search-filter">
											<div class="condition-cell title">프로젝트</div>
											<div class="condition-cell">
												<input type="text" placeholder="프로젝트명 입력">
											</div>
										</li>
										<li class="js-register-name-search-filter">
											<div class="condition-cell title">작성자</div>
											<div class="condition-cell">
												<input type="text" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)">
											</div>
										</li>
										<li class="js-period-type-search-filter">
											<div class="condition-cell title">검색기간</div>
											<div class="condition-cell">
												<ul class="target-select-group"></ul>
											</div>
										</li>
										<li class="js-tmpl-type-search-filter">
											<div class="condition-cell title">대상</div>
											<div class="condition-cell">
												<ul class="target-select-group"></ul>
											</div>
										</li>
									</ul>
									<div class="condition-button-area">
										<div class="condition-left">
											<button type="button" class="js-filter-reset condition-reset">초기화</button>
										</div>
										<div class="condition-right">
											<button class="js-filter-cancel condition-button cancel">취소</button>
											<button class="js-filter-search condition-button search">검색</button>
										</div>
									</div>
								</div>
							</div>
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
							<span class="js-filter-reset filter-reset">취소</span>
							<!--필터링 후 취소 버튼 노출 -->
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
									<li>
										<div class="js-tmpl-type js-remark-tmpl-type check-menu-item"
											data-code="-1">댓글</div>
									</li>
								</ul>
							</div>
						</div>
						<ul id="myPostContentUl"
							class="all-seach-list-type-1 post-group scroll-mask"></ul>
					</div>
				</div>


				<div
					class="js-post-search-result all-search-section d-none me-post-wrap"
					data-search-area-code="">
					<div class="all-search-container">
						<div class="all-search-content">
							<div
								class="js-result-input-area project-search-area all-file-header-type-3"
								style="margin-top: 20px; display: none">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="검색어를 입력해주세요!" class="project-search-input"
										autocomplete="off" maxlength="50">
									<button id="projectDetailSearchTopButton" type="button"
										class="js-detail-search-filter-button search-set-button">옵션</button>
									<div
										class="js-detail-search-filter-layer name-type-seach-popup d-none"
										style="top: 28px; left: 0px;">

										<p>옵션</p>
										<div class="detail-search-conditions">
											<ul class="conditions-group">
												<li class="js-project-name-search-filter">
													<div class="condition-cell title">프로젝트</div>
													<div class="condition-cell">
														<input type="text" placeholder="프로젝트명 입력">
													</div>
												</li>
												<li class="js-register-name-search-filter">
													<div class="condition-cell title">작성자</div>
													<div class="condition-cell">
														<input type="text" placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
													</div>
												</li>
												<li class="js-participant-name-search-filter d-none">
													<div class="condition-cell title">담당자</div>
													<div class="condition-cell">
														<input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
													</div>
												</li>
												<li class="js-period-type-search-filter">
													<div class="condition-cell title">검색기간</div>
													<div class="condition-cell">
														<ul class="target-select-group"></ul>
													</div>
												</li>
												<li class="js-tmpl-type-search-filter">
													<div class="condition-cell title">대상</div>
													<div class="condition-cell">
														<ul class="target-select-group"></ul>
													</div>
												</li>
												<li class="js-file-type-search-filter" style="display: none">
													<div class="condition-cell title">파일종류</div>
													<div class="condition-cell">
														<ul class="target-select-group"></ul>
													</div>
												</li>
											</ul>
											<div class="condition-button-area">
												<div class="condition-left">
													<button type="button"
														class="js-filter-reset condition-reset">초기화</button>
												</div>
												<div class="condition-right">
													<button class="js-filter-cancel condition-button cancel">취소</button>
													<button class="js-filter-search condition-button search">검색</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button type="button"
								class="js-search-back-button js-detail-back result-back-button d-none">
								<i class="icons-back"></i> 돌아가기
							</button>
							<div id="postSearchArea" class="search-result-group">
								<div class="search-title-area">
									<span class="search-result-title">전체</span> <span
										id="allPostsSearchCount"
										class="js-search-post-count search-result-count"
										style="display: inline-block"></span>
								</div>
								<ul id="allPostsSearchUl"
									class="js-search-post-ul all-seach-list-type-1 scroll-mask"></ul>
							</div>
						</div>
						
						<div class="all-search-filter">
							<form action="">
								<fieldset>
									<legend class="blind">통합검색 필터 폼</legend>
									<dl class="search-filter-group">
										<dt>검색 필터</dt>
										<dd class="search-filter-item js-search-pickr-layer">
											<p>검색기간</p>
											<div
												class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
												<span></span><input type="hidden"> <label
													class="filter-date-label"><i class="icon-date"></i></label>
											</div>
											<div
												class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
												<span></span><input type="hidden"> <label
													class="filter-date-label"><i class="icon-date"></i></label>
											</div>
										</dd>
										<dd
											class="js-project-name-search-filter d-none search-filter-item">
											<p>프로젝트</p>
											<div class="filter-input-box">
												<input class="" placeholder="프로젝트명 입력" type="text">
											</div>
										</dd>
										<dd
											class="js-register-name-search-filter d-none search-filter-item">
											<p>작성자</p>
											<div class="filter-input-box">
												<input class="" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)"
													type="text">
											</div>
										</dd>
										<dd
											class="js-participant-name-search-filter d-none search-filter-item">
											<p>참여자</p>
											<div class="filter-input-box">
												<input class="" placeholder="참여자명 입력 (여러명 입력시, 콤마로 구분)"
													type="text">
											</div>
										</dd>
										<dd
											class="js-tmpl-type-search-filter d-none search-filter-item">
											<p>대상</p>
											<ul class="target-select-group"></ul>
										</dd>
									</dl>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>