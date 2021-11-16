<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
pageContext.setAttribute("replaceChar", "\n");
%>



<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
<div class="post-popup-header card-popup-header d-none"
	style="display: block;">

	<!-- 게시물 제목 -->
	<h3 class="card-popup-title">
		<i id="projectTitleColor" class="project-color color-code-4"></i> <span
			class="js-project-title-button">${tasks.prjTtl}</span> <span
			class="subtask-title up-task-title js-up-task-button"> </span>
	</h3>
	<button class="btn-close card-popup-close">
		<i class="icons-close-1"></i>
	</button>
</div>

<div class="post-card-header">
	<div class="post-card-scroll">
		<div class="card-header-top">
			<div class="post-author js-post-author">
				<span class="thumbnail size40 radius16"
					style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
				<dl class="post-author-info">
					<dt>
						<strong class="author ellipsis">${tasks.name}</strong> <em
							class="position ellipsis" style="display: inline-block"></em> <span
							class="date"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
								value="${tasks.notiDttm}" /></span>

						<!-- 게시물 공개 여부 -->
						<c:if test="${tasks.notiOpenPerm == 'all'}">
							<span class="post-security"> <i
								class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
							</span>
						</c:if>
						<c:if test="${tasks.notiOpenPerm == 'pm'}">
							<span class="post-security"> <i
								class="icons-lock js-mouseover" mouseover-text="프로젝트 관리자만"></i></span>
						</c:if>
					</dt>
					<dd class="d-none">
						<span class="team"></span>
					</dd>
				</dl>
			</div>
			<div id="postOptions">
				<div class="post-option">
					<form action="prjHome.do" method="post">
						<button id="movePost" class="btn-go d-none"
							style="display: inline-block">게시글 바로가기</button>
						<input name="prjId" type="hidden" value="${tasks.prjId }">
					</form>
					<button id="pinToTopBnt"
						class="js-pin-post fixed-btn js-pin-authority"
						style="display: block">
						<!-- fixed-btn on class -->
						<span class="blind">상단 고정 등록</span>
					</button>
					<button id="moreSettingMyPostBtn" class="js-setting-button set-btn"
						style="display: block">
						<span></span> <span></span> <span></span>
					</button>
					<ul id="groupSettingBtn"
						class="js-setting-ul js-setting-layer setup-group d-none"
						style="display: none">
						<li class="js-setting-item" data-code="modify"
							style="display: block"><a href="#"> <i
								class="icons-write"></i>수정
						</a></li>
						<li class="js-setting-item" data-code="delete"
							style="display: block"><a href="#"> <i
								class="icons-delete-3"></i>삭제
						</a></li>
					</ul>
				</div>
			</div>
		</div>

		<!-- 게시물 내용 -->
		<div class="card-header-bottom ">
			<div class="post-title-area">
				<h4 class="js-post-title post-title ">${tasks.notiTtl}</h4>
				<div class="schedule-period-area d-none">
					<span class="schedule-period"></span> <span class="schedule-period"></span>
				</div>
			</div>
			<div class="post-state">
				<span class="task-number d-inline-block"> 업무번호 <em>${tasks.notiId}</em>
				</span>
			</div>
		</div>

		<div class="post-card-container">
			<div id="originalPost" class="post-card-content "
				style="display: none"></div>

			<div id="summaryPost" class="post-card-content "
				style="display: block">

				<div class="js-task-option">
					<ul class="create-content-group">
						<li class="js-status-layer">
							<div class="create-content-cell title">
								<i class="icon-post-status"></i>
							</div>
							<div id="tskPrgsSetting" class="create-content-cell">
								<c:if test="${tasks.tskPrgs == 'request'}">
									<c:set var="tskPrgs" value="request" />
								</c:if>
								<c:if test="${tasks.tskPrgs == 'progress'}">
									<c:set var="tskPrgs" value="progress" />
								</c:if>
								<c:if test="${tasks.tskPrgs == 'feedback'}">
									<c:set var="tskPrgs" value="feedback" />
								</c:if>
								<c:if test="${tasks.tskPrgs == 'complete'}">
									<c:set var="tskPrgs" value="completion" />
								</c:if>
								<c:if test="${tasks.tskPrgs == 'withhold'}">
									<c:set var="tskPrgs" value="hold" />
								</c:if>
								<div
									class="js-task-state state-button-group clearfix ${tskPrgs}">
									<button type="button" class="js-stts task-state-button request">요청</button>
									<button type="button"
										class="js-stts task-state-button progress">진행</button>
									<button type="button"
										class="js-stts task-state-button feedback">피드백</button>
									<button type="button"
										class="js-stts task-state-button completion">완료</button>
									<button type="button" class="js-stts task-state-button hold">보류</button>
								</div>
							</div>
						</li>

						<!-- 업무 항목 추가입력 사항 -->

						<!-- 담당자 설정 -->
						<li class="js-task-worker-layer js-more-task-li d-none"
							style="display:">
							<div class="create-content-cell title manager">
								<i class="icon-post-worker"></i>
							</div>
							<div class="create-content-cell manager-btn-group">
								<span class="js-workers manager-group"> <span
									class="js-registration manager-item"> <span
										class="js-worker-profile thumbnail"
										style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
										<span class="js-registration-name">${tasks.memId }</span>
								</span>
								</span> 
							</div>
						</li>

						<!-- 시작일 설정 -->
						<li
							class="js-date-layer js-start-date-layer js-more-task-li d-none"
							style="display: block">
							<div class="create-content-cell title">
								<i class="icon-post-date"></i>
							</div>
							<div class="js-date-option create-content-cell">
								<div class="js-pickr-layer js-start-flatpickr">
									<!-- <label id="addBgnDateBtn" type="button" class="js-date-label add-manager-button"
										style="display: inline-block"> <input id="datepicker"
										class="js-pickr-date flatpickr-input ie-pickr" type="text"
										placeholder="시작일 추가" readonly="readonly" value="">
									</label> -->
									<div class="js-date-back-layer date-bg d-none"
										style="display: inline-block">
										<span class="js-pickr-text task-date"> <span
											class="js-date-text"><fmt:formatDate
													pattern="yyyy-MM-dd (E)" value="${tasks.tskBgnDt}" /></span>
										</span>
									</div>
								</div>
							</div>

						</li>
						<!-- 마감일 설정 -->
						<li class="js-date-layer js-end-date-layer js-more-task-li d-none"
							style="display: block">
							<div class="create-content-cell title">
								<i class="icon-post-date"></i>
							</div>
							<div class="js-date-option create-content-cell">
								<div class="js-pickr-layer js-end-flatpickr">
									<!-- <label id="addEndDateBtn" type="button" class="js-date-label add-manager-button"
										style="display: inline-block"> <input
										class="js-pickr-date flatpickr flatpickr-input ie-pickr"
										type="text" placeholder="마감일 추가" readonly="readonly" value="">
									</label> -->
									<div class="js-date-back-layer date-bg d-none"
										style="display: inline-block">
										<span class="js-pickr-text task-date "> <span
											class="js-date-text"><fmt:formatDate
													pattern="yyyy-MM-dd (E)" value="${tasks.tskEndDt}" /></span>
										</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<button id="addTskDetail" type="button"
						class="js-more-button add-button" style="display: none">
						<i class="icons-plus-7"></i>항목추가입력
					</button>
				</div>

				<!-- 업무 내용 -->
				<div>${fn:replace(tasks.tskCntn, replaceChar, "<br/>")}</div>
			</div>

			<button id="postMoreButton" type="button"
				class="js-contents-more-btn post-more-btn" style="display: none">더보기</button>


			<!-- 하위 업무 목록 -->
			<div class="content-fold" style="display: block">
				<div class="subtask-space">
					<div class="js-subtask-area subtask-wrap">
						<div class="subtask-header">

							<span class="subtask-title"> <i class="icons-subtask"></i>하위업무<em
								class="js-subtask-count subtask-count">1</em>
							</span>


						</div>
						<ul class="js-subtask-ul subtask-list ui-sortable"
							style="display: block">
						</ul>
						<div class="subtask-bottom js-subtask-edit-layer"
							style="display: block">
							<div class="subtask-registered-area js-subtask-edit-area">
									<c:if test="${not empty tasks.subtskTtl }">
								<div class="subtask-input-area js-subtask-li">
										<div
											class="js-subtask-status-layer js-subtask-layer subtask-status-area">
											<div
												class="js-task-state state-button-group clearfix ${tasks.subtskPrgs }">
											</div>
											<c:if test="${tasks.subtskPrgs == 'request'}">
												<c:set var="subtskPrgs" value="request" />
												<button
													class="js-subtask-status-button subtask-button subtask-status request">요청</button>
											</c:if>
											<c:if test="${tasks.subtskPrgs == 'progress'}">
												<c:set var="subtskPrgs" value="progress" />
												<button
													class="js-subtask-status-button subtask-button subtask-status progress">진행</button>
											</c:if>
											<c:if test="${tasks.subtskPrgs == 'feedback'}">
												<c:set var="subtskPrgs" value="feedback" />
												<button
													class="js-subtask-status-button subtask-button subtask-status feedback">피드백</button>
											</c:if>
											<c:if test="${tasks.subtskPrgs == 'complete'}">
												<c:set var="subtskPrgs" value="completion" />
												<button
													class="js-subtask-status-button subtask-button subtask-status completion">완료</button>
											</c:if>
											<c:if test="${tasks.subtskPrgs == 'withhold'}">
												<c:set var="subtskPrgs" value="hold" />
												<button
													class="js-subtask-status-button subtask-button subtask-status hold">보류</button>
											</c:if>
										</div>
										<div>
											<button id="subtskDetailBtn">${tasks.subtskTtl }</button>
										</div>
										<ul class="js-subtask-menu subtask-menu">
											<li><span> <fmt:formatDate
														pattern="yyyy-MM-dd (E)" value="${tasks.subtskEndDt}" /></span></li>
											<li><span class="thumbnail size40 radius16"
												style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
											</li>
										</ul>
								</div>
									</c:if>
							</div>
						</div>

						<!-- 하위 업무 추가 (하위업무 없는 경우) -->
						<c:if test="${empty tasks.subtskTtl}">
							<div id="addSubtsk" class="subtask-bottom js-subtask-edit-layer"
								style="display: none">
								<div class="subtask-registered-area js-subtask-edit-area">
									<div class="subtask-input-area js-subtask-li">
										<div
											class="js-subtask-status-layer js-subtask-layer subtask-status-area">
											<button id="subtskStatusBtn" type="button"
												class="js-subtask-status-button subtask-button subtask-status request">요청</button>
											<ul id="subtskChange"
												class="js-status-setting-layer js-subtask-layer subtask-status-list"
												style="display: none">
												<li>
													<div
														class="js-status-setting-button subtask-status request">요청</div>
												</li>
												<li>
													<div
														class="js-status-setting-button subtask-status progress">진행</div>
												</li>
												<li>
													<div
														class="js-status-setting-button subtask-status feedback">피드백</div>
												</li>
												<li>
													<div
														class="js-status-setting-button subtask-status completion">완료</div>
												</li>
												<li>
													<div class="js-status-setting-button subtask-status hold">보류</div>
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
												mouseover-text="마감일 추가">
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
												class="subtask-menu-worker js-subtask-worker-layer js-mouseover"
												mouseover-text="담당자 추가">
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

										<button type="button" class="subtask-register-btn off">
											<span class="blind">Register</span>
										</button>
									</div>
									<p class="subtask-close-text subtask-reset-text"
										style="display: block">취소하려면 Esc 키를 누르세요.</p>
								</div>
							</div>

							<!-- 하위업무 추가버튼 -->
							<button id="addSubtskBtn" type="button"
								class="js-add-subtask-button add-button">
								<i class="icons-plus-7"></i>하위업무 추가
							</button>
						</c:if>
					</div>
				</div>
			</div>

			<div class="post-bottom-area">
				<div class="post-bottom-menu js-reaction-bookmark">
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

		<!-- 댓글 작성-->
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
					style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
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
			

<script>
	// 모달창 닫기 버튼
	$(".btn-close").click(function() {
		$("#postPopup").css("display", "none");
		$(".task-item").removeClass("highlight");
	});

	//더보기 버튼 (수정, 삭제)
	$(function() {
		$("#moreSettingMyPostBtn").click(function() {
			$("#groupSettingBtn").toggle();
		});
	});

	//업무  항목추가입력 버튼 누르면 나오는 것
	$("#addTskDetail")
			.click(
					function() {
						$(this).css("display", "none");
						$(".js-more-task-li d-none").css("display", "block");
						$(".js-start-date-layer js-more-task-li d-none").css(
								"display", "block");
						$(".js-end-date-layer js-more-task-li d-none").css(
								"display", "block");
						$(".js-priority-layer js-more-task-li").css("display",
								"block");
						$(".js-more-task-li").css("display", "block");
					});

	// 하위업무 생성
	$("#addSubtskBtn").click(function() {
		$("#addSubtsk").toggle();

	});

	// 업무 자세히 보기
	$("#postOptions").find("div > button").click(function(e) {
		e.preventDefault();

		$(e.currentTarget).closest('form').submit();
	});

	// 하위 업무 상세보기 (팝업)
	$("#subtskDetailBtn").click(function() {

		$.ajax({
			url : "myPostSubtsk.do",
			type : "POST",
			data : "JSON",
			dataType : "html",
			success : function(data) {
				$("#modalBody").html(data);
			}
		});
	});
</script>