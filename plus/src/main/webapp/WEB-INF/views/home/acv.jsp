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
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: none;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">

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
									<ul clss="js-file-more-ul file-more-ul">{more-folder-list}
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
				</div>
			</div>
		</div>
	</div>
</body>
</html>