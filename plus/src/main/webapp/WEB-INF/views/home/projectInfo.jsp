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
				class="project-invite-button color-type-1">
				<i class="icons-invite"></i>초대하기
			</button>
		</div>
	</div>





	<div id="mainContent" class="main-content scroll-mask"
		scroll-direction="0">
		<div id="detailLayer"
			class="main-sub-header project-detail-wrap d-none"
			style="display: none;">
			<div class="project-detail-top clearfix">
				<ul id="detailTab" class="project-detail-menu">
					<li class="js-tab-item" data-code="home"><a>홈</a></li>
					<li class="js-tab-item" data-code="task"><a>업무</a></li>
					<li class="js-tab-item gantt" data-code="gantt"><a>간트차트</a> <span
						class="tooltip-square">클릭 시, 새 창으로 이동합니다.</span></li>
					<li class="js-tab-item" data-code="calendar"><a>캘린더</a></li>
					<li class="js-tab-item" data-code="file"><a>파일</a></li>
					<!-- <li class="js-tab-item" data-code="history">
                <a>히스토리</a>
            </li> -->
				</ul>

				<div id="projectCollectionCount"
					class="js-collection-count project-num-wrap" style="display: none;">
					<span>건수 : </span> <span class="js-collection-total-count"></span>
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
			<div id="detailCollectView"
				class="detail-collect-view background-white d-none"
				style="display: none;">
				<div id="mainScroll"
					class="detail-collect-group type3 padding-left-right-30">










					<div class="allTaskLayer full-width small-style-wrap-2 d-none"
						style="display: none;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="업무명 또는 업무번호를 검색하세요!" autocomplete="off"
										maxlength="20"
										class="js-task-search-input project-search-input">
									<button type="button"
										class="js-task-detail-search-button search-set-button">옵션</button>
									<div
										class="js-task-detail-search-layer name-type-seach-popup d-none"
										data-search-area-code="IN_TASK" style="top: 40px; left: 0px;">










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

							<ul class="btns-area">
								<li>
									<button id="excelDownButton"
										class="task-nav-button task-excel-down">
										<i class="icon-excel-download"></i> 다운로드
									</button>
								</li>
								<li>
									<button
										class="js-task-add-btn collect-add-button task-add-button"></button>
								</li>
								<li>
									<button id="taskSettingButton"
										class="task-nav-button task-setting js-alltask-setting-button">
										<i class="icon-setting"></i>
									</button>
									<ul class="js-alltask-setting-layer menu-popup-wrap">
										<li id="bundleButton"
											class="js-task-bundle-button js-bundle-list"><span>묶어보기</span><i
											class="icons-right-3"></i></li>
										<li id="sortPopupButton"><span>보기 설정</span></li>
									</ul>
									<ul id="bundleLayer"
										class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
										<li class="js-bundle-li" view-gb="0">없음</li>
										<li class="js-bundle-li" view-gb="1">상태</li>
										<li class="js-bundle-li" view-gb="2">마감일</li>
										<li class="js-bundle-li" view-gb="3">프로젝트</li>
									</ul>
								</li>
							</ul>

						</div>
						<section class="all-task-seaction">
							<h3 class="blind">모든업무 목록</h3>
							<div id="taskSortHeader" class="all-task-header"></div>
							<ul id="taskContentUl"
								class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask"></ul>
						</section>
					</div>











					<div class="allFileLayer full-width small-style-wrap-2 d-none"
						style="display: none;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="파일명을 검색해주세요!" autocomplete="off" maxlength="20"
										class="js-file-search-input project-search-input">
									<button type="button"
										class="js-file-detail-search-button search-set-button">옵션</button>
									<div
										class="js-file-detail-search-layer name-type-seach-popup d-none"
										data-search-area-code="IN_FILE" style="top: 40px; left: 0px;">










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
							<div class="btns-area">
								<button id="allFileMoveButton">
									<i class="icon-move"></i> 이동
								</button>
								<button id="fileDownloadButton">
									<i class="icon-download"></i> 다운로드
								</button>
								<button id="allFileDeleteButton" class="task-setting">
									<i class="icon-delete"></i> 폴더 삭제
								</button>
								<button id="addFolder"
									class="js-file-add-button collect-add-button"></button>
								<a href="#" id="changeListTypeButton"
									class="js-view-change-button">
									<div class="js-all-file-type all-file-header-right-icon-type-5">
										<span class="tooltip-square">리스트형</span>
									</div>
								</a> <a href="#" id="changeBoardTypeButton"
									class="js-view-change-button all-file-board-margin">
									<div class="js-all-file-type all-file-header-right-icon-type-4">
										<span class="tooltip-square">바둑판형</span>
									</div>
								</a>
							</div>
						</div>
						<div id="fileItemArea" class="all-file-area board">
							<div id="allFileSort"
								class="js-sort-layer all-file-list-setup-type-1">
								<div id="fileUploadSort"
									class="js-sort-file all-file-list-setup-1 check"
									data-sort-code="EDTR_DTTM">
									<span>최근 업로드순</span><em></em>
								</div>
								<div id="fileNameSort"
									class="js-sort-file all-file-list-setup-1"
									data-sort-code="ITEM_NM">
									<span>파일명 순</span><em></em>
								</div>
							</div>
							<ul id="fileItemUlHead" class="js-sort-layer file-item-head">
								<li>
									<div class="js-sort-file all-file-list-name-type-1"
										data-sort-code="ITEM_NM">
										<span class="all-file-list-sort ">파일명<em></em></span>
									</div>
									<div class="js-sort-file all-file-list-name-type-4"
										data-sort-code="SIZE">
										<span class="all-file-list-sort">용량<em></em></span>
									</div>
									<div class="js-sort-file all-file-list-name-type-2"
										data-sort-code="RGSR_NM">
										<span class="all-file-list-sort">등록자<em></em></span>
									</div>
									<div class="js-sort-file all-file-list-name-type-3 check"
										data-sort-code="EDTR_DTTM">
										<span class="all-file-list-sort">등록일시<em></em></span>
									</div>
									<div
										class="js-sort-file all-file-list-sort all-file-list-name-type-5"></div>
								</li>
							</ul>
							<ul id="fileLayerUl"
								class="js-file-list-layer layer-scroll file-select-wrap scroll-mask"></ul>
						</div>
						<div id="fileLayerProjectMenu" class="all-file-header-left-type-1"></div>

						<ul id="boardTypeFileItem" style="display: none;">
							<li class="js-file-board js-selectable ui-selectee {download_yn}"
								rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
								width="{WIDTH}" height="{HEIGHT}"
								orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}"
								colabo_commt_srno="{COLABO_COMMT_SRNO}" img_path="{IMG_PATH}"
								atch_srno="{ATCH_SRNO}" use_intt_id="{USE_INTT_ID}"
								rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}"
								file_type="{FILE_TYPE}" file_size="{data_file_size}"
								rgsn_dttm="{rgsn_dttm}" file_index_code="{file_index_code}">
								<a href="#" class="all-file-type-check position-check-fix"></a>
								<a href="#"
								class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
								<a href="#">
									<div class="file-extension {view_type_class_name}"
										{thumbnail_url}=""></div>
							</a>
								<div
									class="all-file-name all-file-round-bottom-section-1 js-mouseover"
									mouseover-text="{mouseover-text}">{ORCP_FILE_NM}</div>
							</li>
						</ul>
						<ul id="boardTypeFolderItem" style="display: none;">
							<li class="js-file-board js-folder js-selectable ui-selectee"
								colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
								up-file-fld-srno="{up-file-fld-srno}"><a href="#"
								class="all-file-type-check position-check-fix"></a> <a href="#"
								class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
								<a href="#">
									<div class="file-extension {view-type-class-name}"></div>
							</a>
								<div class="all-file-name all-file-round-bottom-section-1">{file-name}</div>
							</li>
						</ul>

						<ul id="listTypeFileItem" style="display: none;">
							<li class="js-file-list js-selectable ui-selectee {download_yn}"
								rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}"
								width="{WIDTH}" height="{HEIGHT}"
								orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}"
								colabo_commt_srno="{COLABO_COMMT_SRNO}" atch_srno="{ATCH_SRNO}"
								img_path="{IMG_PATH}" use_intt_id="{USE_INTT_ID}"
								rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}"
								file_type="{FILE_TYPE}" file_size="{data_file_size}"
								rgsn_dttm="{RGSN_DTTM}" file_index_code="{file_index_code}"
								project_title="{PROJECT_TITLE}">
								<div class="all-file-list-name-type-1-1 ellipsis">
									<em class="all-file-type-check"></em>
									<div class="all-file-type-icon-wrap-1">
										<div class="file-extension {view_type_class_name}"></div>
									</div>
									<div class="all-file-name js-mouseover"
										mouseover-text="{mouseover-text}">
										<div class="all-file-file-name">
											<span>{ORCP_FILE_NM}</span>
										</div>
										<div class="all-file-project-title">
											<i class="icons-project-1"></i> {PROJECT_TITLE}
										</div>
									</div>


								</div>

								<div class="all-file-list-name-type-4-1">
									<strong class="js-list-file-size">{file_size}</strong>
								</div>
								<div class="all-file-list-name-type-2-1">
									<strong class="js-mouseover" mouseover-text="{RGSR_NM}">{RGSR_NM}</strong>
								</div>
								<div class="all-file-list-name-type-3-1">
									<strong class="js-all-file-dttm">{date}</strong>
								</div>
								<div class="js-file-menu all-file-plus-icon-image-type-1"
									style="display: none;"></div>
							</li>
						</ul>
						<ul id="listTypeFolderItem" style="display: none;">
							<li id="list-{folder-key}"
								class="js-file-list js-folder js-selectable ui-selectee"
								colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
								up-file-fld-srno="{up-file-fld-srno}">
								<div class="all-forder-list-name-type-1-1">
									<em class="all-file-type-check"></em>
									<div class="all-file-type-icon-wrap-1">
										<div class="file-extension {view-type-class-name}"></div>
									</div>
									<span class="all-file-name">{file-name}</span>
								</div>
								<div class="all-file-list-name-type-4-1">
									<strong>-</strong>
								</div>
								<div class="all-file-list-name-type-2-1">
									<strong>{rgsr-nm}</strong>
								</div>
								<div class="all-file-list-name-type-3-1">
									<strong>{rgsn-dttm}</strong>
								</div>
								<div class="js-file-menu all-file-plus-icon-image-type-1"
									style="display: none;"></div>
							</li>
						</ul>

						<div id="fileMenuPopupItem" style="display: none;">
							<div
								class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
								<a href="#" id="downloadFile" class="js-file-menu-button">
									<div class="download-file-button">
										<i></i> <span>다운로드</span>
									</div>
								</a> <a href="#" id="viewerFile" class="js-file-menu-button">
									<div class="viewer-file-button">
										<i></i> <span>열기</span>
									</div>
								</a> <a href="#" id="moveFile" class="js-file-menu-button">
									<div class="flow-name-move">
										<i></i> <span>이동</span>
									</div>
								</a> <a href="#" id="nameChange" class="js-file-menu-button">
									<div class="flow-name-size">
										<i></i> <span>이름 변경</span>
									</div>
								</a> <a href="#" id="deleteFolder" class="js-file-menu-button">
									<div class="flow-dash-icon">
										<i></i> <span>삭제</span>
									</div>
								</a> <a href="#" id="detailFileView" class="js-file-menu-button">
									<div class="detail-file-button">
										<i></i> <span>상세보기</span>
									</div>
								</a>
							</div>
						</div>

						<ul id="fileLayerTitleItem" class="js-file-items-class">
							<a href="#" class="js-file-header" project-srno="{project-srno}"
								file-fld-srno="{file-fld-srno}"> <em
								class="flow-content-circle-type-1 project-color {project-color}"
								{project-color-display}=""></em> <span
								class="js-all-file-project-title">{project-title}</span>
							</a>
						</ul>

						<ul id="headerFolderItem" class="js-file-items-class">
							<a href="#" id="folder-{file-fld-srno}" class="js-file-header"
								colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
								folder-depth="{folder-depth}"> <em
								class="all-file-header-left-icon-type-3"></em> <span>{folder-name}</span>
							</a>
						</ul>

						<ul id="headerMoreItem" class="js-file-items-class">
							<a class="js-file-more-button">
								<div id="moreFolderButton"
									class="js-file-header all-file-plus-type-1">
									<span>...</span>
								</div>
								<div id="moreFolderLayer" class="all-file-popup-type-1">
									<ul clss="js-file-more-ul file-more-ul">
										{more-folder-list}
									</ul>
								</div>
							</a>

						</ul>

						<ul id="headerMorePopupLiItme" class="js-file-items-class">
							<li id="{file-fld-srno}"
								class="js-file-header all-file-popup-type-{folder-depth-class}"
								colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
								folder-depth="{folder-depth}"><i></i><em></em><span>{folder-name}</span></li>
						</ul>

						<div id="fileMovePopupItem" class="d-none">
							<div class="flow-all-background-1">
								<div class="flow-project-make-1">
									<div class="flow-project-make-2">
										<div class="flow-project-popup-8 js-file-move-popup">
											<div class="flow-project-header-1">
												<span>이동</span> <a href="#"
													class="js-class-button flow-close-type-1"></a>
											</div>
											<div class="flow-content-type-2">
												<ul id="moveFilePopupUl">
													<li id="movePopupProject"
														class="js-move-file-li file-move-project"
														colabo-srno="{colabo-srno}" file-fld-srno="-1">
														<div class="file-folder-div">
															<em class="flow-content-circle-type-1 {project-color}"></em>
															{project-title} <a href="#"
																class="js-file-move-check check-file-button"></a>
														</div>
													</li>
												</ul>
											</div>
											<div class="flow-pop-button-type-2">
												<a href="#">
													<div class="js-class-button flow-pop-sub-button-1">취소</div>
												</a> <a href="#">
													<div class="js-move-file-success flow-pop-sub-button-2">확인</div>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id="fileMovePopupLiItem" class="d-none">
							<li
								class="file-folder js-move-file-li {popup-depth-class} {current-folder}"
								colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}"
								up-file-fld-srno="{up-file-fld-srno}"
								data-depth="{folder-depth}">
								<div class="file-folder-div">
									<i class="js-more-folder {last-fld}"></i> <em></em> <span>{folder-name}</span>
									<a href="#" class="js-file-move-check check-file-button"></a>
								</div>
								<ul></ul>
							</li>
						</div>

						<div id="countLayerItem" class="d-none">
							<div class="js-file-count-layer all-file-alert-type-2">
								<span><span class="js-count-text">{count}</span>개 파일/폴더를
									선택되었습니다.</span><em class="js-all-cancle-button">선택 취소</em>
							</div>
						</div>
					</div>











					<div class="allCalendarLayer full-width small-style-wrap-2 d-none"
						style="display: none;">
						<div class="all-schedule">
							<div class="btns-wr">
								<div class="project-search-area all-file-header-type-3">
									<div class="project-search">
										<i class="icons-search"></i> <input type="text"
											placeholder="일정 제목을 검색해주세요!"
											class="js-calendar-search-input project-search-input">
									</div>
								</div>
								<div class="btns-area">



									<button id="scheduleAdd" type="button"
										class="collect-add-button" data-post-code="2"></button>
								</div>
							</div>
							<div class="all-calendar-wrap">
								<!-- calendar -->
								<div id="calendar"
									class="all-calendar all-calendar-nav layer-scroll"></div>
								<!-- calendar-popup -->
							</div>
						</div>
					</div>








					<div class="allHistoryLayer full-width small-style-wrap-2 d-none"
						style="display: none;">
						<div class="history-container">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="일정 제목을 검색해주세요!"
										class="js-calendar-search-input project-search-input"
										readonly="readonly">
								</div>
							</div>
							<ul class="history-group">
								<li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}"
									colabo_srno="{COLABO_SRNO}"
									colabo_commt_srno="{COLABO_COMMT_SRNO}"
									colabo_remark_srno="{COLABO_REMARK_SRNO}">
									<div class="all-setup-picture-type-1"
										style="background-image: url(flow-renewal/assets/images/profile-default.png)"
										data=""></div> <!-- <div class="all-setup-picture-type-1" {profile}></div> -->
									<div class="all-text-wrap-type-1">
										<div class="all-text-wrap-type-2">
											<i class="{emojiIcon}"></i>{msg}
										</div>
										<div class="all-text-wrap-type-3">{contents}</div>
										<div class="all-text-wrap-type-3">
											<span><em class="all-setup-icon-type-1 {img-yn}"></em>이미지</span><span><em
												class="all-setup-icon-type-2 {file-yn}"></em>파일</span>
										</div>
									</div>
									<div class="all-setup-section-type-1">
										<em>2021-05-11</em>
									</div>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
			<div id="detailTimeline"
				class="project-detail-inner layer-scroll type2"
				style="display: none;">
				<div class="js-detail-wrap-area small-style-wrap">
					<!-- project-detail-container-->
					<section id="postTimeline" class="project-detail-container">
						<div class="project-search-area all-file-header-type-3">
							<div class="project-search">
								<i class="icons-search"></i> <input id="projectSearchInput"
									type="text" placeholder="검색어를 입력해주세요"
									class="project-search-input" autocomplete="off" maxlength="50">
								<button id="projectDetailSearchTopButton" type="button"
									class="js-detail-top-search-button search-set-button">
									옵션</button>
								<div id="projectDetailSearchLayer"
									class="name-type-seach-popup d-none"
									data-search-area-code="IN_PROJECT" style="top: 38px; left: 0px">










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
						<div class="project-detail-content">
							<div id="taskReportArea"></div>

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

							<!-- 해시태그 -->
							<div id="projectHashtagArea"
								class="detail-section hashtag-section">
								<!--hashtag-section에 active class로 제어  -->
								<ul id="hashtagUl" class="hashtag-group"></ul>
								<button id="hashtagMoreButton" type="button"
									class="hashtag-more-btn d-none">
									<i class="ico-arrow"></i>
								</button>
							</div>
							<!-- //해시태그 -->

						</div>
						<!-- 미확인 -->
						<div id="projectAlarmArea"
							class="detail-section unidentified-alert-section d-none">
							<div class="section-title-area">
								<h4 class="section-title">
									<span>미확인</span> <span id="projectNotReadCount"
										class="section-number alarm"></span>
								</h4>
								<button id="readAllPostBnt" type="button" class="read-all-btn">모두읽음</button>
							</div>
							<div class="unidentified-content">
								<!--unidentified-content active 클래스 제어 -->
								<ul id="notReadAlarmUl" class="unidentified-list"></ul>
								<button id="notReadAlarmMore" type="button"
									class="unidentified-more-btn d-none">
									더보기 <span class="blind">더보기</span>
								</button>
							</div>
						</div>
						<!-- //미확인 -->
						<!-- 상단고정 -->
						<div id="projectPinArea" class="detail-section fix-section d-none">
							<div class="section-title-area">
								<h4 class="section-title">
									<span>상단고정</span> <span id="projectPinCount"
										class="section-number"></span>
								</h4>
							</div>
							<ul id="pinPostUl" class="pin-list fixed-list"></ul>
						</div>
						<!-- //상단고정 -->

						<!-- 전체피드 -->
						<div id="projectFeedArea" class="detail-section feed-section">
							<div class="section-title-area">
								<h4 id="allPostsFilterTitle" class="section-title">전체</h4>
								<span class="filter-reset js-filter-reset">취소</span>
								<!--필터링 후 취소 버튼 노출 -->
								<div id="feedTypeButton" class="feed-type-area">
									<button type="button"
										class="js-feed-filter-button filter-button">
										<i class="icons-filter"></i> <span>필터</span>
									</button>
									<button type="button" class="feed-type-button card">
										<i class="icons-feed"></i> <span class="tooltip-square">피드형</span>
									</button>
									<button type="button" class="feed-type-button list">
										<i class="icons-list"></i> <span class="tooltip-square">리스트형</span>
									</button>
									<ul class="js-feed-filter-layer check-menu-popup d-none">
										<li>
											<div class="check-menu-item on" data-code="">전체</div>
										</li>
										<li>
											<div class="check-menu-item" data-code="1">글</div>
										</li>
										<li>
											<div class="check-menu-item" data-code="4">업무</div>
										</li>
										<li>
											<div class="check-menu-item" data-code="3">일정</div>
										</li>
										<li>
											<div class="check-menu-item" data-code="2">할 일</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="feed-content">
								<button id="postMoreBtn" type="button" class="more-btn"
									style="display: none">
									<i></i><i></i><i></i>
								</button>
								<ul id="detailUl" class="post-group list"></ul>
							</div>
						</div>
					</section>
					<!-- //project-detail-container-->
					<div class="participants-section">
						<div id="projectParticipants"
							class="project-participants-wrap feed-section">
							<div class="section-title-area">
								<h4 class="section-title">
									<span>참여자</span> <span id="participantCount"></span>
								</h4>
								<div class="feed-type-area">
									<button id="allSendienceBtn" type="button">전체 보기</button>
								</div>
							</div>

							<div id="participantArea" class="participants-container d-none">
								<div id="participantScrollArea"
									class="participants-content-group scroll-mask">
									<div id="joinParticipantsArea"
										class="participants-content d-none">
										<span class="participants-title"> <em>가입 신청자</em> <span
											id="joinParticipantsCount" class="number-of-participants"></span>
										</span>
										<ul id="joinParticipantsUl" class="participants-list"></ul>
									</div>
									<ul id="participantsUl" class="participants-list"></ul>
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
			<div id="hashTagItem" class="d-none">
				<li><a href="#none" class="hashtag-item"> <em
						class="hashtag-item-title">{tagName}</em>
						<div class="hashtag-item-text">{refCount}개의 게시물</div>
				</a></li>
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
			<div id="participantItem" class="d-none">
				<li class="js-participant-item" data-id="{worker-id}">
					<div class="post-author">
						<span class="js-participant-profile thumbnail size40 radius16"
							{profile}=""></span>
						<dl class="post-author-info">
							<dt>
								<strong class="js-participant-name author ellipsis">{name}</strong>
								<em class="position ellipsis" {personal-display}="">{position}</em>
							</dt>
							<dd {personal-display}="">
								<strong class="company">{company}</strong> <span class="team">{team}</span>
							</dd>
						</dl>
					</div>
					<button type="button"
						class="js-participant-chat participant-chat-button">
						<i class="icons-chat"><span class="blind">채팅</span></i>
					</button>
				</li>
			</div>
			<div id="inviteItem" class="d-none">
				<div class="invite-text-area">
					<span>{first-contents}</span> <span>{date}</span> <span
						class="invite-time">{rgsn-dttmdate}</span>
				</div>
			</div>
		</div>
		<!-- projectList에서 Hastag가로 List-->
		<div id="hastTagTransverseItem" class="d-none">
			<li id="{tag-name}" class="hashtag-item"><a href="#"
				class="hashtag">#{tag-name}</a></li>
		</div>
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
							<li><span class="task-chart-info request" data-code="0">
									<i class="chart-info-label"></i> <span class="chart-info-text">{REQ_NAME}<em>{REQ}</em></span>
									<span class="chart-info-percent">{REQ_PER}%</span>
							</span> <span class="task-chart-info progress" data-code="1"> <i
									class="chart-info-label"></i> <span class="chart-info-text">{PROG_NAME}<em>{PROG}</em></span>
									<span class="chart-info-percent">{PROG_PER}%</span>
							</span> <span class="task-chart-info feedback" data-code="4"> <i
									class="chart-info-label"></i> <span class="chart-info-text">{FEDBK_NAME}<em>{FEDBK}</em></span>
									<span class="chart-info-percent">{FEDBK_PER}%</span>
							</span></li>
							<li><span class="task-chart-info complete" data-code="2">
									<i class="chart-info-label"></i> <span class="chart-info-text">{COMP_NAME}<em>{COMP}</em></span>
									<span class="chart-info-percent">{COMP_PER}%</span>
							</span> <span class="task-chart-info hold" data-code="3"> <i
									class="chart-info-label"></i> <span class="chart-info-text">{HOLD_NAME}<em>{HOLD}</em></span>
									<span class="chart-info-percent">{HOLD_PER}%</span>
							</span></li>
						</ul>
					</div>
				</div>
				<!-- //원형차트 -->
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
						<li id="openSendienceInvite"><a href="#">
								<div class="detail-popup-icon-2">
									<span></span>
								</div>
								<div class="detail-popuplist-type-1">
									<span>프로젝트 참여자</span> <em>프로젝트를 함께 했던 사람을 초대할 수 있습니다.</em>
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
						<li id="copyInviteLink"><a href="#">
								<div class="detail-popup-icon-4">
									<span></span>
								</div>
								<div class="detail-popuplist-type-1">
									<span>초대 링크 복사</span> <em id="inviteLink"></em>
								</div>
						</a></li>
					</ul>
				</div>
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
	</div>
	
	
	
	
	
	<!-- 참여자 관리 -->
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