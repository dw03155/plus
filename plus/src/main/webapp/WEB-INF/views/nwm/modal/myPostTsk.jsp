<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<p>여기는 모달창jsp로 넘겨준 값입니다.</p>
<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
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
						<strong class="author ellipsis">{memId}</strong> <em
							class="position ellipsis" style="display: inline" data=""></em> <span
							class="date">{notiDttm}</span> <span class="post-security">
							<i class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
						</span>
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
					<button class="js-setting-button set-btn" style="display: block"
						data="">
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
						<li class="js-setting-item" data-code="copy"><a href="#">
								<i class="icons-project-1"></i>다른 프로젝트에 복사
						</a></li>
						<li class="js-setting-item" data-code="url" style="display: block"
							data=""><a href="#"> <i class="icons-copy"></i>링크 복사
						</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="card-header-bottom ">

			<div class="post-title-area">
				<h4 class="js-post-title post-title ">{notiTtl}</h4>
				<div class="schedule-period-area d-none"=""="">
					<span class="schedule-period"></span> <span class="schedule-period"=""=""></span>
				</div>
			</div>
			<div class="post-state">
				<span class="task-number d-inline-block" data-task="2959835">
					업무번호 <em>{notiId}</em>
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
								<div class="js-task-state state-button-group clearfix request"
									data-status="request">
									<button type="button" class="js-stts task-state-button request"
										stts="request">요청</button>
									<button type="button"
										class="js-stts task-state-button progress" stts="progress">진행</button>
									<button type="button"
										class="js-stts task-state-button feedback" stts="feedback">피드백</button>
									<button type="button"
										class="js-stts task-state-button completion" stts="completion">완료</button>
									<button type="button" class="js-stts task-state-button hold"
										stts="hold">보류</button>
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
									data-worker-id="yuin3488@gmail.com" data-worker-profile=""
									data-worker-name="QR"> <span
										class="js-worker-profile thumbnail"
										style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"
										data=""></span> <span class="js-registration-name">QR</span>
										<button type="button" class="js-remove-worker remove-button"></button>
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
									<label type="button" class="js-date-label add-manager-button"
										style="display: inline-block" data=""> <input
										class="js-pickr-date flatpickr-input ie-pickr" tye="text"
										placeholder="시작일 추가" readonly="readonly" value="">
									</label>
									<div class="js-date-back-layer date-bg d-none"
										style="display: none" data="">
										<span class="js-pickr-text task-date"> <span
											class="js-date-text"></span>
										</span>
										<button type="button" class="js-remove-date remove-button"></button>
									</div>
								</div>
							</div>
						</li>
						<li class="js-date-layer js-end-date-layer js-more-task-li d-none"
							style="display: none" data="">
							<div class="create-content-cell title">
								<i class="icon-post-date"></i>
							</div>
							<div class="js-date-option create-content-cell">
								<div class="js-pickr-layer js-end-flatpickr">
									<label type="button" class="js-date-label add-manager-button"
										style="display: inline-block" data=""> <input
										class="js-pickr-date flatpickr flatpickr-input ie-pickr"
										type="text" placeholder="마감일 추가" readonly="readonly" value="">
									</label>
									<div class="js-date-back-layer date-bg d-none"
										style="display: none" data="">
										<span class="js-pickr-text task-date "> <span
											class="js-date-text"></span>
										</span>
										<button type="button" class="js-remove-date remove-button"></button>
									</div>
								</div>
							</div>
						</li>
						<li class="js-priority-layer js-more-task-li"
							style="display: none" data="">
							<div class="create-content-cell title">
								<i class="icon-post-rank"></i>
							</div>
							<div class="js-priority create-content-cell" data-priority="">
								<button id="priorityButton" type="button"
									class="js-priority-button js-priority-event add-manager-button"
									style="display: inline-block" data="">우선순위 추가</button>
								<div id="prioritySpan"
									class="js-priority-span js-priority-event rank-item"
									style="display: none" data="">
									<i class="icons- small"></i> <span class="js-priority-text"></span>
									<button type="button" class="js-remove-priority remove-button"></button>
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
				class="js-contents-more-btn post-more-btn" style="display: none"
				data="">더보기</button>
			<div id="summaryFoldArea" class="content-fold" style="display: block"
				data="">
				<div class="subtask-space">
					<div class="js-subtask-area subtask-wrap">
						<div class="subtask-header">
							<span class="subtask-title"> <i class="icons-subtask"></i>하위업무<em
								class="js-subtask-count subtask-count"></em>
							</span>
						</div>
						<ul class="js-subtask-ul subtask-list ui-sortable"
							style="display: block" data-project-srno="" data-post-srno="">

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
												<div class="js-status-setting-button subtask-status request"
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
												<div class="js-status-setting-button subtask-status hold"
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
									<div class="js-priority-setting-layer priority-group d-none"
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
						<button type="button" class="js-add-subtask-button add-button">
							<i class="icons-plus-7"></i>하위업무 추가
						</button>
					</div>
				</div>
			</div>

			<div class="post-bottom-area">
				<div class="post-bottom-menu js-reaction-bookmark">
					<div class="js-emoji-group-layer emoji-area"=""="">
						<ul class="emoji-group"></ul>
						<span class="emoji-count-area"> <span class="emoji-count"></span>
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
					class="js-remark-prev-button comment-more-button ">이전 댓글
					더보기</button>
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

<!-- 모달창 닫기 버튼 -->
<script type="text/javascript">
$(".btn-close").click(function() {
	$("#postPopup").css("display", "none");
});
</script>
