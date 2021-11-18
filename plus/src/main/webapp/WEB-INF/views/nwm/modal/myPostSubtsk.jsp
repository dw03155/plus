<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
pageContext.setAttribute("replaceChar", "\n");
%>



<p>하위업무 모달창</p>
<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
<div class="post-popup-header card-popup-header d-none"
	style="display: block;">

	<!-- 게시물 제목 -->
	<h3 class="card-popup-title">
		<i id="projectTitleColor" class="project-color color-code-4"></i> <span
			class="js-project-title-button">${subtasks.prjTtl}</span> <span
			class="subtask-title up-task-title js-up-task-button"> </span>
	</h3>
	<button id="subtskCloseBtn"  class="btn-close card-popup-close">
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
						<strong class="author ellipsis">${subtasks.name}</strong> <em
							class="position ellipsis" style="display: inline-block"></em> <span
							class="date">subtasks.notiDttm</span>

						<%-- <!-- 게시물 공개 여부 -->
						<c:if test="${subtasks.notiOpenPerm == 'all'}">
							<span class="post-security"> <i
								class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
							</span>
						</c:if>
						<c:if test="${bookmarks.notiOpenPerm == 'pm'}">
							<span class="post-security"> <i
								class="icons-lock js-mouseover" mouseover-text="프로젝트 관리자만"></i></span>
						</c:if> --%>
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
						<input name="prjId" type="hidden" value="subtasks.prjId ">
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
				<h4 class="js-post-title post-title ">subtasks.notiTtl</h4>
				<div class="schedule-period-area d-none">
					<span class="schedule-period"></span> <span class="schedule-period"></span>
				</div>
			</div>
			<div class="post-state">
				<span class="task-number d-inline-block"> 업무번호 <em>subtasks.notiId</em>
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
							<%-- <div id="tskPrgsSetting" class="create-content-cell">
								<c:if test="${subtasks.subtskPrgs == 'request'}">
									<c:set var="tskPrgs" value="request" />
								</c:if>
								<c:if test="${subtasks.subtskPrgs == 'progress'}">
									<c:set var="tskPrgs" value="progress" />
								</c:if>
								<c:if test="${subtasks.subtskPrgs == 'feedback'}">
									<c:set var="tskPrgs" value="feedback" />
								</c:if>
								<c:if test="${subtasks.subtskPrgs == 'complete'}">
									<c:set var="tskPrgs" value="completion" />
								</c:if>
								<c:if test="${subtasks.subtskPrgs == 'withhold'}">
									<c:set var="tskPrgs" value="hold" />
								</c:if>
								<div
									class="js-task-state state-button-group clearfix ${subtskPrgs}">
									<button type="button" class="js-stts task-state-button request">요청</button>
									<button type="button"
										class="js-stts task-state-button progress">진행</button>
									<button type="button"
										class="js-stts task-state-button feedback">피드백</button>
									<button type="button"
										class="js-stts task-state-button completion">완료</button>
									<button type="button" class="js-stts task-state-button hold">보류</button>
								</div>
							</div> --%>
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
										<span class="js-registration-name">ubtasks.memId </span>
										<button type="button" class="js-remove-worker remove-button"></button>
								</span>
								</span> <input type="text"
									class="js-worker-input worker-search-input d-none"
									placeholder="담당자 추가" style="display: none;">
								<button id="addManagerBtn" type="button"
									class="js-worker-button add-manager-button"
									style="display: inline-block">담당자 변경</button>
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
									<%-- <div class="js-date-back-layer date-bg d-none"
										style="display: inline-block">
										<span class="js-pickr-text task-date"> <span
											class="js-date-text"><fmt:formatDate
													pattern="yyyy-MM-dd (E)" value="${bookmarks.tskBgnDt}" /></span>
										</span>
										<button type="button" class="js-remove-date remove-button"></button>
									</div> --%>
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
									<%-- <div class="js-date-back-layer date-bg d-none"
										style="display: inline-block">
										<span class="js-pickr-text task-date "> <span
											class="js-date-text"><fmt:formatDate
													pattern="yyyy-MM-dd (E)" value="${tasks.tskEndDt}" /></span>
										</span>
										<button type="button" class="js-remove-date remove-button"></button>
									</div> --%>
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
				<%-- <div>${fn:replace(subtasks.subtskCntn, replaceChar, "<br/>")}</div> --%>
			</div>

			<button id="postMoreButton" type="button"
				class="js-contents-more-btn post-more-btn" style="display: none">더보기</button>
</div>
</div>
</div>

<script>
	// 모달창 닫기 버튼
	$("#subtskCloseBtn").click(function() {
		$("#postPopup").css("display", "none");
		$(".task-item").removeClass("highlight");
	});

	//더보기 버튼 (수정, 삭제)
	$(function() {
		$("#moreSettingMyPostBtn").click(function() {
			$("#groupSettingBtn").toggle();
		});
	});

	
</script>



