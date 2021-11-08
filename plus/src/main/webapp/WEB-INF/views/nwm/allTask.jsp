<%@page import="co.plus.prj.nwm.vo.NoticeWritingVO"%>
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

	<div class="back-area temp-popup" tabindex="0" id="postPopup"
		data-code="VIEW" style="display: none;">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<li id="post-11688041" class="js-popup-before detail-item back-area"
					data-read-yn="Y" data-project-srno="1088142"
					data-post-srno="11688041" data-remark-srno="-1"
					data-rgsr-id="yuin3488@gmail.com" mngr-wryn="" mngr-dsnc=""
					data-post-code="4" pin-yn="N" status="0" todo-done-percent=""
					time="" data-code="VIEW" data-post-url="https://flow.team/l/JPnJ">
					<div class="js-post-nav list-item post-list-wrapper"
						style="display: none;">
						<div class="fixed-list">
							<a href="#"> <i class="js-indication display-new-indication"
								style="display: none" data=""></i>
								<div class="fixed-kind">
									<i class="icons-task"></i> <span>업무</span>
								</div>
								<p class="js-post-title fixed-text ">{dtasks.notiTtl }</p>
								<div class="post-list comment" style="display: none" data="">
									<i class="icons-comment2"></i> <span class="js-remark-count">0</span>
								</div>
								<div class="post-list-right">
									<div class="post-list name">QR</div>
									<div class="post-list date">2021-11-01 14:16</div>
									<div class="fixed-value">
										<span class="js-todo-state state request d-none"
											style="display: none" data=""></span> <span
											class="js-task-state state d-none request"
											style="display: inline-block" data="">요청</span>
										<div class="js-schedule-state date-time d-none"=""="">
											<em class="date"></em> <span></span>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="js-post-nav card-item post-card-wrapper task  side">
						<button type="button" class="post-popup-button left"></button>
						<div class="post-popup-header card-popup-header d-none"
							style="display: block;">
							<h3 class="card-popup-title">
								<i id="projectTitleColor" class="project-color color-code-4"></i>
								<span class="js-project-title-button">{tasks.prjTtl}</span> <span
									class="subtask-title up-task-title js-up-task-button"
									=""="" data-up-task-project-srno="" data-up-task-post-srno=""
									data-up-task-srno=""> </span>
							</h3>
							<button class="btn-close card-popup-close">
								<i class="icons-close-1"></i>
							</button>
						</div>
						<div class="post-card-header">
							<div class="post-card-scroll">
								<div class="card-header-top">
									<div class="post-author js-post-author"
										data-author-id="yuin3488@gmail.com">
										<span class="thumbnail size40 radius16"
											style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"
											data=""></span>
										<dl class="post-author-info">
											<dt>
												<strong class="author ellipsis">QR</strong> <em
													class="position ellipsis" style="display: inline" data=""></em>
												<span class="date">2021-11-01 14:16</span> <span
													class="post-security"> <i
													class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i></span>
											</dt>
											<dd class="d-none">

												<span class="team"></span>
											</dd>
										</dl>
									</div>
									<div>
										<div class="post-option">
											<button id="movePost" class="btn-go d-none"
												style="display: inline-block;">게시글 바로가기</button>
											<button id="pinToTopBnt"
												class="js-pin-post fixed-btn js-pin-authority "
												style="display: block" data="">
												<!-- fixed-btn on class -->
												<span class="blind">상단 고정 등록</span>
											</button>
											<button class="js-setting-button set-btn"
												style="display: block" data="">
												<span></span> <span></span> <span></span>
											</button>
											<ul class="js-setting-ul js-setting-layer setup-group d-none">
												<li class="js-setting-item" data-code="modify"
													style="display: block" data=""><a href="#"> <i
														class="icons-write"></i>수정
												</a></li>
												<li class="js-setting-item" data-code="delete"
													style="display: block" data=""><a href="#"> <i
														class="icons-delete-3"></i>삭제
												</a></li>
												<li class="js-setting-item" data-code="copy"><a
													href="#"> <i class="icons-project-1"></i>다른 프로젝트에 복사
												</a></li>
												<li class="js-setting-item" data-code="url"
													style="display: block" data=""><a href="#"> <i
														class="icons-copy"></i>링크 복사
												</a></li>
											</ul>
										</div>
									</div>
								</div>

								<div class="card-header-bottom ">

									<div class="post-title-area">
										<h4 class="js-post-title post-title ">ddd</h4>
										<div class="schedule-period-area d-none"=""="">
											<span class="schedule-period"></span> <span
												class="schedule-period"=""=""></span>
										</div>
									</div>
									<div class="post-state">
										<span class="task-number d-inline-block" data-task="2959835">
											업무번호 <em>1</em>
										</span>
									</div>
								</div>
								<div class="post-card-container">

									<div id="originalPost" class="post-card-content "
										style="display: none" data=""></div>

									<div id="summaryPost" class="post-card-content "
										style="display: block" data="">
										<div class="js-task-option">
											<ul class="create-content-group">
												<li class="js-status-layer">
													<div class="create-content-cell title">
														<i class="icon-post-status"></i>
													</div>
													<div class="create-content-cell">
														<div
															class="js-task-state state-button-group clearfix request"
															data-status="request">
															<button type="button"
																class="js-stts task-state-button request" stts="request">
																요청</button>
															<button type="button"
																class="js-stts task-state-button progress"
																stts="progress">진행</button>
															<button type="button"
																class="js-stts task-state-button feedback"
																stts="feedback">피드백</button>
															<button type="button"
																class="js-stts task-state-button completion"
																stts="completion">완료</button>
															<button type="button"
																class="js-stts task-state-button hold" stts="hold">
																보류</button>
														</div>
													</div>
												</li>
												<li class="js-task-worker-layer js-more-task-li d-none"
													style="display: table" data="">
													<div class="create-content-cell title manager">
														<i class="icon-post-worker"></i>
													</div>
													<div class="create-content-cell manager-btn-group">
														<span class="js-workers manager-group"> <span
															class="js-registration manager-item"
															data-worker-id="yuin3488@gmail.com"
															data-worker-profile="" data-worker-name="QR"> <span
																class="js-worker-profile thumbnail"
																style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"
																data=""></span> <span class="js-registration-name">QR</span>
																<button type="button"
																	class="js-remove-worker remove-button"></button>
														</span>
														</span> <input type="text"
															class="js-worker-input worker-search-input d-none"
															placeholder="담당자 추가" style="display: none;">
														<button type="button"
															class="js-worker-button add-manager-button"
															style="display: inline-block;">담당자 변경</button>
													</div>
												</li>
												<li
													class="js-date-layer js-start-date-layer js-more-task-li d-none"
													style="display: none" data="">
													<div class="create-content-cell title">
														<i class="icon-post-date"></i>
													</div>
													<div class="js-date-option create-content-cell">
														<div class="js-pickr-layer js-start-flatpickr">
															<label type="button"
																class="js-date-label add-manager-button"
																style="display: inline-block" data=""> <input
																class="js-pickr-date flatpickr-input ie-pickr"
																tye="text" placeholder="시작일 추가" readonly="readonly"
																value="">
															</label>
															<div class="js-date-back-layer date-bg d-none"
																style="display: none" data="">
																<span class="js-pickr-text task-date"> <span
																	class="js-date-text"></span>
																</span>
																<button type="button"
																	class="js-remove-date remove-button"></button>
															</div>
														</div>
													</div>
												</li>
												<li
													class="js-date-layer js-end-date-layer js-more-task-li d-none"
													style="display: none" data="">
													<div class="create-content-cell title">
														<i class="icon-post-date"></i>
													</div>
													<div class="js-date-option create-content-cell">
														<div class="js-pickr-layer js-end-flatpickr">
															<label type="button"
																class="js-date-label add-manager-button"
																style="display: inline-block" data=""> <input
																class="js-pickr-date flatpickr flatpickr-input ie-pickr"
																type="text" placeholder="마감일 추가" readonly="readonly"
																value="">
															</label>
															<div class="js-date-back-layer date-bg d-none"
																style="display: none" data="">
																<span class="js-pickr-text task-date "> <span
																	class="js-date-text"></span>
																</span>
																<button type="button"
																	class="js-remove-date remove-button"></button>
															</div>
														</div>
													</div>
												</li>
												<li class="js-priority-layer js-more-task-li"
													style="display: none" data="">
													<div class="create-content-cell title">
														<i class="icon-post-rank"></i>
													</div>
													<div class="js-priority create-content-cell"
														data-priority="">
														<button id="priorityButton" type="button"
															class="js-priority-button js-priority-event add-manager-button"
															style="display: inline-block" data="">우선순위 추가</button>
														<div id="prioritySpan"
															class="js-priority-span js-priority-event rank-item"
															style="display: none" data="">
															<i class="icons- small"></i> <span
																class="js-priority-text"></span>
															<button type="button"
																class="js-remove-priority remove-button"></button>
														</div>
														<div
															class="js-priority-setting-layer js-priority-event priority-group d-none">
															<button type="button"
																class="js-priority-setting-button priority-button"
																data-priority-code="low">
																<span> <i class="icons-low"></i>
																</span>낮음
															</button>
															<button type="button"
																class="js-priority-setting-button priority-button"
																data-priority-code="normal">
																<span> <i class="icons-normal"></i>
																</span>보통
															</button>
															<button type="button"
																class="js-priority-setting-button priority-button"
																data-priority-code="high">
																<span> <i class="icons-high"></i>
																</span>높음
															</button>
															<button type="button"
																class="js-priority-setting-button priority-button"
																data-priority-code="argent">
																<span> <i class="icons-argent"></i>
																</span>긴급
															</button>
														</div>
													</div>
												</li>
												<li class="js-progress-layer js-more-task-li "
													style="display: none" data="">
													<div class="create-content-cell title">
														<i class="icon-post-progress"></i>
													</div>
													<div class="js-progress create-content-cell">
														<div class="js-progress-bar progress-graph-bar"
															style="width: 0%" =""="" data-progress="0"></div>
														<div class="progress-graph">
															<span class="js-progress-button" data-progress-value="0"><em>0%</em></span><span
																class="js-progress-button" data-progress-value="10"><em>10%</em></span><span
																class="js-progress-button" data-progress-value="20"><em>20%</em></span><span
																class="js-progress-button" data-progress-value="30"><em>30%</em></span><span
																class="js-progress-button" data-progress-value="40"><em>40%</em></span><span
																class="js-progress-button" data-progress-value="50"><em>50%</em></span><span
																class="js-progress-button" data-progress-value="60"><em>60%</em></span><span
																class="js-progress-button" data-progress-value="70"><em>70%</em></span><span
																class="js-progress-button" data-progress-value="80"><em>80%</em></span><span
																class="js-progress-button" data-progress-value="90"><em>90%</em></span><span
																class="js-progress-button" data-progress-value="100"><em>100%</em></span>
														</div>
														<span class="js-progress-text progress-txt">0 %</span>
													</div>
												</li>
											</ul>
											<button type="button" class="js-more-button add-button"
												style="display: block" data="">
												<i class="icons-plus-7"></i>항목추가입력
											</button>
										</div>
										<div>ddd</div>
									</div>

									<button id="postMoreButton" type="button"
										class="js-contents-more-btn post-more-btn"
										style="display: none" data="">더보기</button>
									<div id="summaryFoldArea" class="content-fold"
										style="display: block" data="">
										<div class="subtask-space">
											<div class="js-subtask-area subtask-wrap">
												<div class="subtask-header">
													<span class="subtask-title"> <i
														class="icons-subtask"></i>하위업무<em
														class="js-subtask-count subtask-count"></em>
													</span>
												</div>
												<ul class="js-subtask-ul subtask-list ui-sortable"
													style="display: block" data-project-srno=""
													data-post-srno="">

												</ul>
												<div class="subtask-bottom js-subtask-edit-layer">

													<div class="subtask-registered-area js-subtask-edit-area">
														<div class="subtask-input-area js-subtask-li">
															<div
																class="js-subtask-status-layer js-subtask-layer subtask-status-area">
																<button type="button"
																	class="js-subtask-status-button subtask-button subtask-status request"
																	data_status="0">요청</button>
																<ul
																	class="js-status-setting-layer js-subtask-layer subtask-status-list"
																	style="display: none">
																	<li>
																		<div
																			class="js-status-setting-button subtask-status request"
																			data_status_code="0">요청</div>
																	</li>
																	<li>
																		<div
																			class="js-status-setting-button subtask-status progress"
																			data_status_code="1">진행</div>
																	</li>
																	<li>
																		<div
																			class="js-status-setting-button subtask-status feedback"
																			data_status_code="4">피드백</div>
																	</li>
																	<li>
																		<div
																			class="js-status-setting-button subtask-status completion"
																			data_status_code="2">완료</div>
																	</li>
																	<li>
																		<div
																			class="js-status-setting-button subtask-status hold"
																			data_status_code="3">보류</div>
																	</li>
																</ul>
															</div>
															<input type="text" class="subtask-input js-subtask-input"
																tab-code="input" maxlength="50"
																data-empty-msg="하위 업무 제목을 입력하세요!" data-required-yn="Y"
																placeholder="업무명 입력 (Enter로 업무 연속 등록 가능)">
															<ul class="js-subtask-menu subtask-menu">
																<li
																	class="js-subtask-date-layer subtask-menu-date js-mouseover js-date-tooltip"
																	mouseover-text="마감일 추가" data_start_dt="" data_end_dt="">
																	<div class="js-pickr-layer">
																		<input type="hidden" class="js-subtask-date-input"
																			readonly="readonly">
																		<div class="subtask-date-input-div">
																			<button type="button"
																				class="js-subtask-date-button js-flatpicker subtask-button create-icon-box small"
																				tab-code="date">
																				<span> <i class="icons-calendar"></i>
																				</span>
																			</button>
																			<span
																				class="js-subtask-date-text js-flatpicker subtask-date d-none {dead-line-class}"></span>
																		</div>
																	</div>
																</li>
																<li
																	class="js-subtask-priority-layer js-subtask-layer subtask-menu-priority js-mouseover clearfix"
																	data_priority="" mouseover-text="우선 순위 추가">
																	<button type="button"
																		class="js-priority-level icon-subtask-level js-priority-button d-none">
																		<em class="blind"></em>
																	</button>
																	<button type="button"
																		class="js-priority-button js-subtask-priority subtask-button create-icon-box small"
																		tab-code="priority">
																		<span> <i class="icons-low"></i>
																		</span>
																	</button>

																</li>
																<li
																	class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
																	data_worker_id_list="" data_worker_name_list=""
																	data_worker_profile_list="" mouseover-text="담당자 추가">
																	<button type="button"
																		class="js-worker-button subtask-button manager js-worker-box create-icon-box small"
																		tab-code="worker">
																		<span> <i class="icons-person-6 small"></i>
																		</span>
																	</button>
																	<button type="button"
																		class="js-worker-button subtask-button manager js-worker-thumb create-icon-box small d-none"
																		tab-code="worker">
																		<span class="subtask-manager-area"> <span
																			class="js-thumb-image thumbnail"></span> <span
																			class="subtask-manager-number d-none">{worker_count}</span>
																		</span>
																	</button>
																</li>
															</ul>
															<button type="button"
																class="js-subtask-enter-button subtask-enter">
																<i class="icons-reply"></i>
															</button>
															<button type="button" class="subtask-register-btn off">
																<span class="blind">Register</span>
															</button>
															<div
																class="js-priority-setting-layer priority-group d-none"
																style="display: none;">
																<button type="button"
																	class="js-priority-setting-button js-subtask-priority priority-button"
																	data-key-index="0" data_priority_code="">
																	<span> <i class="icons-delete lv0"></i>
																	</span>취소
																</button>
																<button type="button"
																	class="js-priority-setting-button js-subtask-priority priority-button"
																	data-key-index="1" data_priority_code="0">
																	<span> <i class="icons-low lv1"></i>
																	</span>낮음
																</button>
																<button type="button"
																	class="js-priority-setting-button js-subtask-priority priority-button"
																	data-key-index="2" data_priority_code="1">
																	<span> <i class="icons-normal lv2"></i>
																	</span>보통
																</button>
																<button type="button"
																	class="js-priority-setting-button js-subtask-priority priority-button"
																	data-key-index="3" data_priority_code="2">
																	<span> <i class="icons-high lv3"></i>
																	</span>높음
																</button>
																<button type="button"
																	class="js-priority-setting-button js-subtask-priority priority-button"
																	data-key-index="4" data_priority_code="3">
																	<span> <i class="icons-argent lv4"></i>
																	</span>긴급
																</button>
															</div>
														</div>
														<p class="subtask-close-text subtask-reset-text"
															style="display: block">취소하려면 Esc 키를 누르세요.</p>
													</div>

												</div>
												<button type="button"
													class="js-add-subtask-button add-button">
													<i class="icons-plus-7"></i>하위업무 추가
												</button>
											</div>
										</div>
									</div>

									<div class="post-bottom-area">
										<div class="post-bottom-menu js-reaction-bookmark">
											<div class="js-emoji-group-layer emoji-area"=""="">
												<ul class="emoji-group"></ul>
												<span class="emoji-count-area"> <span
													class="emoji-count"></span>
												</span>
											</div>
											<div class="bottom-button-area">
												<button class="js-post-bookmark post-bottom-button ">
													<i class="icon-bookmark"></i> <span>북마크</span>
												</button>
											</div>
										</div>
										<div class="cmt-read-wr">
											<div class="comment-count-area">
												<span>댓글</span> <span class="comment-count">0</span>
											</div>
											<div class="js-read-check-button read-confirmation">
												<span>읽음</span> <span class="confirmation-number">2</span>
											</div>
										</div>

									</div>
									<!-- //post-card-container -->
								</div>
								<div class="post-card-footer js-comment-area">
									<div class="comment-header">
										<button type="button"
											class="js-remark-prev-button comment-more-button ">
											이전 댓글 더보기</button>
									</div>
									<ul class="post-comment-group"></ul>
								</div>
								<div class="js-remark-layer js-edit-layer comment-input-wrap">
									<div class="comment-thumbnail">
										<span class="thumbnail size40 radius16"
											style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"
											data=""></span>
									</div>
									<form class="js-remark-form comment-container on ">
										<fieldset>
											<legend class="blind">댓글 입력</legend>
											<div class="js-remark-area js-paste-layer comment-input"
												contenteditable="true"
												placeholder="줄바꿈은 Shift + Enter / 입력은 Enter 입니다."></div>
											<input type="hidden" class="comment-upload-input"> <label
												mouseover-text="파일 첨부"
												class="js-remark-upload-button comment-upload-button js-mouseover">
												<i class="icons-link"> <span class="blind">업로드 버튼</span>
											</i>
											</label>
											<div contenteditable="true"
												class="js-dimd-layer comment-upload-dimd d-none">
												<span class="dimd-text">첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</span>
											</div>
										</fieldset>
										<ul class="js-remark-upload-file upload-document-group"></ul>
										<ul class="js-remark-upload-img comment-upload-img"></ul>
									</form>
								</div>
							</div>
							<button type="button" class="post-popup-button right"></button>
						</div>

					</div>
				</li>
			</div>
		</div>
	</div>


	<!-- 전체 업무 (프로젝트 명) -->
	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1" style="display: block">
				<div>전체 업무</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block">${fn:length(tasks)}</span>
		</div>

		<!-- 전체 업무 페이지 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: block;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">

					<div class="allTaskLayer full-width small-style-wrap-2 d-none"
						style="display: block;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<form id="frm" name="frm" method="post">
										<i class="icons-search"></i> <input type="text" name="notiTtl"
											id="notiTtl" placeholder="업무명을 검색하세요!" autocomplete="off"
											maxlength="20"
											class="js-task-search-input project-search-input">
									</form>
								</div>
							</div>
							<ul class="btns-area">
								<li>
									<button id="taskSettingButton"
										class="task-nav-button task-setting js-alltask-setting-button">
										<i class="icon-setting"></i>
									</button>
									<ul class="js-alltask-setting-layer menu-popup-wrap">
										<!-- taskSettingButton 누르면 style="display:block" 추가-->
										<li id="sortPopupButton"><span>보기 설정</span></li>
									</ul>
								</li>
							</ul>
						</div>

						<section class="all-task-seaction">
							<h3 class="blind">모든업무 목록</h3>
							<div id="taskSortHeader" class="all-task-header scroll-for-ie">
								<div col-srno="1"
									class="js-task-sort-button task-header-cell task-task_num-cell">
									<span class="title js-task-sort-inner-button">번호</span>
								</div>
								<div col-srno="2"
									class="js-task-sort-button task-header-cell task-stts-cell">
									<span class="title js-task-sort-inner-button">상태</span>
								</div>
								<div col-srno="3"
									class="js-task-sort-button task-header-cell task-task_nm-cell task-name js-task-more">
									<span class="title js-task-sort-inner-button">업무명</span>
								</div>
								<div col-srno="4"
									class="js-task-sort-button task-header-cell task-worker_nm-cell">
									<span class="title js-task-sort-inner-button">담당자</span>
								</div>
								<div col-srno="5"
									class="js-task-sort-button task-header-cell task-rgsr_nm-cell">
									<span class="title js-task-sort-inner-button">작성자</span>
								</div>
								<div col-srno="6"
									class="js-task-sort-button task-header-cell task-start_dt-cell">
									<span class="title js-task-sort-inner-button">시작일</span>
								</div>
								<div col-srno="7"
									class="js-task-sort-button task-header-cell task-end_dt-cell">
									<span class="title js-task-sort-inner-button">마감일</span>
								</div>
								<div col-srno="8"
									class="js-task-sort-button task-header-cell task-rgsn_dt-cell">
									<span class="title js-task-sort-inner-button">등록일시</span>
								</div>
							</div>

							<!-- 전체 목록 화면 -->
							<ul id="taskListProjectItem"
								class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask scroll-for-ie">
								<c:forEach var="task" items="${tasks }" varStatus="status">
									<li class="js-gubun-li">
										<div id="main" class="js-gubun-button all-task-project">
											<!-- active 클래스 추가시  -->
											<span class="project-title">${task.prjTtl }</span>
											<!-- 갯수 -->
											<span class="project-task-count">${fn:length(task.taskDetail)}</span>
										</div> <!-- 프로젝트 안 업무 목록 -->
										<ul class="js-inner-task project-inner-task active"
											style="display: block">
											<c:forEach var="dtasks" items="${task.taskDetail}">
												<li class="task-item ">
													<div class="js-task_num task-task_num-cell task-item-cell">
														<div class="js-task_num-text  ellipsis">${dtasks.notiId }</div>
													</div>
													<div class="task-item-cell task-state task-stts-cell">
														<span class="js-task-state request">${dtasks.tskPrgs }</span>
													</div>
													<div class="js-priority task-item-cell task-priority-cell ">
														<div class="js-priority-span rank-span">
															<i class=" small"></i> <span
																class="js-priority-text priority-text-cell ellipsis">
																-</span>
														</div>
													</div>
													<div class="task-item-cell task-name task-task_nm-cell ">
														<div
															class="js-post-title task-title ellipsis js-mouseover"
															mouseover-text="하위 업무 위치 찾기">
															${dtasks.notiTtl } <em class="subtask-item"
																style="display: none" data=""> <i
																class="icons-subtask"></i> <span class="subtask-number">0</span>
															</em>
														</div>
														<div class="js-post-title project-title"
															style="display: none" data="">
															<i class="icons-project-1"></i>${dtasks.prjTtl }
														</div>
													</div>
													<div class="js-workers task-item-cell task-worker_nm-cell ">
														<span class="js-mouseover" mouseover-text=""> <span
															class="js-worker-name manager ellipsis">${dtasks.name}</span>
															<span class="js-worker-count"></span>
														</span>
													</div>
													<div class="js-workers task-item-cell task-worker_nm-cell ">
														<span class="js-mouseover" mouseover-text=""> <span
															class="js-worker-name manager ellipsis">${dtasks.name}</span>
															<span class="js-worker-count"></span>
														</span>
													</div>
													<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
														<div class="js-edtr_dt-text  ellipsis"=""="">
															<fmt:formatDate pattern="yyyy-MM-dd"
																value="${dtasks.tskBgnDt}" />
														</div>

													</div>
													<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
														<div class="js-edtr_dt-text  ellipsis"=""="">
															<fmt:formatDate pattern="yyyy-MM-dd"
																value="${dtasks.tskEndDt}" />
														</div>

													</div>
													<div class="js-edtr_dt task-edtr_dt-cell task-item-cell ">
														<div class="js-edtr_dt-text  ellipsis"=""="">
															<fmt:formatDate pattern="yyyy-MM-dd"
																value="${dtasks.notiDttm}" />
														</div>

													</div>
												</li>
											</c:forEach>
										</ul> <!-- style="display: none" --> <!-- li 태그 넣기 : 상세보기시에는 class="highlight" 추가-->
									</li>
								</c:forEach>
							</ul>




							<!-- li 태그 넣기 -->
							<ul id="taskListItem" class="d-none">
								<li id="allTask-{COLABO_COMMT_SRNO}" class="task-item {LI_STTS}"
									data-project-srno="{COLABO_SRNO}"
									data-post-srno="{COLABO_COMMT_SRNO}"
									data-task-srno="{TASK_SRNO}" data-post-code="4">업무 넣기</li>
							</ul>


							<!-- 전체 업무 > 설정 아이콘 > 보기설정 -->
							<div id="taskSortSettingPopupItem" style="display: none">
								<div class=" flow-all-background-1 back-area">
									<div class="flow-project-make-1 back-area">
										<div class="flow-project-make-2 back-area">
											<div id="sortLayer"
												class="project-invite-popup-1 task-view-popup">
												<div class="name-type-seach-popup-header-type-1">
													<span>보기 설정</span>
													<button class="flow-close-type-1"></button>
												</div>
												<p class="task-set-description">
													항목 순서 변경과 조회할 항목을 선택할 수 있습니다. <em>업무명은 필수 항목입니다.</em>
												</p>
												<ul id="taskSortList"
													class="invite-popup-list-type-2 ui-sortable scroll-mask">
													<li class="js-sort-li before_on" col-srno="1">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">번호</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<!-- active 클래스 추가시 on -->
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="2">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">상태</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="3">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">업무명</span>
															<button id="viewFinder" type="button"
																class="js-sort-button toggle-button js-sort-title active">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="4">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">담당자</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="5">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">작성자</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="6">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">시작일</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="7">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">마감일</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
													<li class="js-sort-li before_on" col-srno="8">
														<div class="task-set-item">
															<span class="task-set-move-handle"></span> <span
																class="task-set-title">등록일시</span>
															<button type="button"
																class="js-sort-button toggle-button {SORT_TITLE} {COL_CLASS}">
																<i class="handle"></i>
															</button>
														</div>
													</li>
												</ul>
												<div class="flow-pop-button-type-1">
													<a href="#">
														<div class="js-init-button flow-pop-sub-button-1">초기화</div>
													</a> <a href="#">
														<div class="js-save-button flow-pop-sub-button-2">저장</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 전체 업무 (목록 접고 펼치기) -->
	<script type="text/javascript">
		var main = document.querySelectorAll("#main");
		$(main).click(function(event) {
			console.log(event);
			var et = $(event.target);
			et.toggleClass("active");
			et.next("ul").toggle();

		});
	</script>

	<!-- 전체 업무 (보기 설정) -->
	<script>
		$(document).ready(function() {
			$("#taskSettingButton").click(function() {
				$("#taskSortSettingPopupItem").css("display", "block");
			});

			$(".flow-close-type-1").click(function() {
				$("#taskSortSettingPopupItem").css("display", "none");
			});
		});

		$("li > div > button").on("click", function() {
			$(this).toggleClass("active");
		});
	</script>

	<!-- highlight (상세보기 팝업)-->
	<script>
		$(".task-item").click(function() {
			$(this).toggleClass("highlight");
			$("#postPopup").toggle();
		});
	</script>

	<script type="text/javascript">
		
	</script>
</body>
</html>