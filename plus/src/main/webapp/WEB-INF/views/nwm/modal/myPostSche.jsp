<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
pageContext.setAttribute("replaceChar", "\n");
%>

<!-- 내 게시물 목록 -> 일정 상세보기(팝업) -->
<div class="post-popup-header card-popup-header d-none"
	style="display: block;">
	<h3 class="card-popup-title">
		<i id="projectTitleColor" class="project-color color-code-4"></i> <span
			class="js-project-title-button">${schedules.prjTtl}</span> <span
			class="subtask-title up-task-title js-up-task-button"
			data-up-task-project-srno="" data-up-task-post-srno=""
			data-up-task-srno=""> </span>
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
						<strong class="author ellipsis">${schedules.name }</strong> <em
							class="position ellipsis" style="display: inline"></em> <span
							class="date"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
								value="${schedules.notiDttm}" /></span>

						<!-- 게시물 공개 여부 -->
						<c:if test="${schedules.notiOpenPerm == 'all'}">
							<span class="post-security"> <i
								class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
							</span>
						</c:if>
						<c:if test="${schedules.notiOpenPerm == 'pm'}">
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
						<input name="prjId" type="hidden" value="${schedules.prjId }">
					</form>
					<button id="pinToTopBnt"
						class="js-pin-post fixed-btn js-pin-authority "
						style="display: block">
						<!-- fixed-btn on class -->
						<span class="blind">상단 고정 등록</span>
					</button>
					<button id="moreSettingMyScheBtn" class="js-setting-button set-btn"
						style="display: block">
						<span></span> <span></span> <span></span>
					</button>
					<ul id="groupSettingScheBtn"
						class="js-setting-ul js-setting-layer setup-group d-none">
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

		<div class="card-header-bottom ">
			<div class="schedule-date">
				<strong class="schedule-month"><fmt:formatDate
						pattern="yyyy-MM" value="${schedules.notiDttm}" /></strong><strong
					class="schedule-day"><fmt:formatDate pattern="dd"
						value="${schedules.notiDttm}" /></strong>
			</div>
			<div class="post-title-area">
				<h4 class="js-post-title post-title ">${schedules.notiTtl}</h4>
				<div class="schedule-period-area d-none" style="display: block">
					<span class="schedule-period"><fmt:formatDate
							pattern="yyyy-MM-dd (E) HH:mm:ss" value="${schedules.scheBgnDt}" /></span>
					<span class="schedule-period" style="display: inline-block"><fmt:formatDate
							pattern="yyyy-MM-dd (E) HH:mm:ss" value="${schedules.scheEndDt }" /></span>
				</div>
			</div>
			<div class="post-state">
				<span class="task-number d-inline-block"> 업무번호 <em>${schedules.notiId}</em>
				</span>
			</div>
		</div>


		<div class="post-card-container">

			<div id="originalPost" class="post-card-content "
				style="display: block">
				<div class="post-card-content js-schedule-comp" spellcheck="true">
					<ul class="create-content-group">
						<li class="schedule-date-li">
							<div id="editDateTimeArea" class="d-none js-schedule-date-layer">
								<div class="create-content-cell title">
									<i class="icons-calendar"></i>
								</div>
								<div class="create-content-cell">
									<div class="schedule-time">
										<div class="js-pickr-layer js-start-flatpickr">
											<input type="hidden" class="js-pickr-date" id="START_DTTM">
											<input class="js-pickr-text schedule-input" type="text"
												disabled="disabled">
										</div>
										<div class="js-pickr-layer js-end-flatpickr">
											<input type="hidden" class="js-pickr-date" id="END_DTTM">
											<input class="js-pickr-text schedule-input" type="text"
												disabled="disabled">
										</div>
										<div class="oneday">
											<input type="checkbox" id="ondDay" class="d-none"> <label
												for="ondDay">종일</label>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li class="js-attendance-layer"><input
							class="js-attendance-input"
							data-attendance="[{'ATTENDENCE_ID':'yuin3488@gmail.com','STATUS':'1','PRFL_PHTG':'','CMNM':null,'JBCL_NM':null,'ATTENDENCE_NM':'QR','DVSN_NM':null}]"
							style="display: none">
							<div class="create-content-cell title manager">
								<i class="icon-post-worker"></i>
							</div>
							<div class="create-content-cell manager-btn-group">
								<span class="js-manager-group manager-group"></span> <span
									class="js-registration participant-thumbnail attendee participate js-mouseover"
									style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)">
								</span>
							</div></li>
						<li style="display: table">
							<div class="create-content-cell title manager">
								<i class="icon-post-place"></i>
							</div>
							<div class="create-content-cell">
								<input id="placeInput" type="text"
									class="place-input js-close-check d-none" data-required-yn="Y"
									autocomplete="off" placeholder="장소를 입력하세요">
								<div id="urlPreview" class="url-preview-content schedule">
									<em class="url-preview-title"> <span class="ellipsis">대한민국
											대구광역시 복현2동</span>
										<button type="button" class="js-place-span map-button"
											data-map-link="https://www.google.co.kr/maps/place/35.900017,128.619996?q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B3%B5%ED%98%842%EB%8F%99"
											style="display: inline-block">지도보기</button>
									</em>
								</div>
								<div id="placeSpan" class="js-place-span url-preview map"
									data-map-link="https://www.google.co.kr/maps/place/35.900017,128.619996?q=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B3%B5%ED%98%842%EB%8F%99"
									style="display: inline-block">
									<div>
										<img id="mapImage"
											src="https://maps.googleapis.com/maps/api/staticmap?center=35.900017,128.619996&amp;zoom=14&amp;size=646x220&amp;markers=color:blue|35.900017,128.619996&amp;key=AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw"
											alt="게시물 이미지">
									</div>
									<input id="LOCATION" type="hidden">
								</div>
							</div>
						</li>
						<li id="videoLi" style="display: block">
							<div class="create-content-cell title">
								<i class="icon-post-video"></i>
							</div>
							<div class="create-content-cell">
								<!-- <button id="videoButton" type="button"
									class="add-manager-button ">화상 회의 추가</button> -->
								<span id="videoSpan" data-vc-srno="0">
								
									<div id="zoomButton" class="video-conference-join" tabindex="0">
										Zoom으로 참여하기
										<button type="button" class="remove-button d-none">
											<i class="icon-post-cancel"></i>
										</button>
									</div>
								</span>
							</div>
						</li>
						<li style="display: none">
							<div class="create-content-cell title">
								<i class="icon-post-alarm"></i>
							</div>
							<div class="create-content-cell">
								<span id="alarmSpan" class="alarm-text">없음</span> <select
									id="alarmButton" class="alarm-select d-none"></select>
							</div>
						</li>
						<li style="display: block">
							<div class="create-content-cell title manager memo">
								<i class="icon-post-memo"></i>
							</div>
							<div class="create-content-cell memo">
								<p class="memo-span" id="memoSpan">${fn:replace(schedules.scheCntn, replaceChar, "<br/>")}</p>
								<div id="memoButton"
									class="js-upload-area js-paste-layer memo d-none"
									contenteditable="true" data-required-yn="Y"
									placeholder="메모를 입력하세요."></div>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="post-bottom-area">
				<div class="post-bottom-menu js-reaction-bookmark">
					<div class="js-emoji-group-layer emoji-area">
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
					</label> <label mouseover-text="음성 녹음" style="display: none"
						class="js-remark-recording-button comment-recording-button js-mouseover">
						<i class="icons-write-2"> <span class="blind">음성 녹음 버튼</span>
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
<!-- 모달창 끝 -->

<script>
	// 모달창 닫기 버튼
	$(".btn-close").click(function() {
		$("#postPopup").css("display", "none");
		$(".task-item").removeClass("highlight");
	});

	// 더보기 버튼 (수정, 삭제)
	$(function() {
		$("#moreSettingMyScheBtn").click(function() {
			$("#groupSettingScheBtn").toggle();
		});
	});

	// 글 자세히 보기 
	$("#postOptions").find("div > button").click(function(e) {
		e.preventDefault();
		console.log(e.currentTarget);
		console.log($(e.currentTarget).parent('form'));
		console.log($(e.currentTarget).parents('form'));
		console.log($(e.currentTarget).closest('form'));
		$(e.currentTarget).closest('form').submit();
	});
</script>
