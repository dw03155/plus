<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
pageContext.setAttribute("replaceChar", "\n");
%>

<!-- 내 게시물 -> 글 상세보기(팝업) -->
<div class="post-popup-header card-popup-header d-none"
	style="display: block;">
	<h3 class="card-popup-title">
		<i id="projectTitleColor" class="project-color color-code-4"></i> <span
			class="js-project-title-button">${texts.prjTtl}</span> <span
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
						<strong class="author ellipsis">${texts.name}</strong> <em
							class="position ellipsis" style="display: inline"></em> <span
							class="date"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
								value="${texts.notiDttm}" /></span>
						
						<!-- 게시물 공개 여부 -->
						<c:if test="${texts.notiOpenPerm == 'all'}">
							<span class="post-security"> <i
								class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
							</span>
						</c:if>
						<c:if test="${texts.notiOpenPerm == 'pm'}">
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
							style="display: inline-block">게시글 바로가기
							</button>
						<input name="prjId" type="hidden" value="${texts.prjId }">
					</form>
					<button id="pinToTopBnt"
						class="js-pin-post fixed-btn js-pin-authority "
						style="display: block">
						<!-- fixed-btn on class -->
						<span class="blind">상단 고정 등록</span>
					</button>
					<button id="moreSettingMyTextBtn" class="js-setting-button set-btn"
						style="display: block">
						<span></span> <span></span> <span></span>
					</button>
					<ul id="groupSettingTxtBtn"
						class="js-setting-ul js-setting-layer setup-group d-none">
						<li class="js-setting-item" data-code="modify"
							style="display: block"><a href="textForm.do"> <i
								class="icons-write"></i>수정
						</a></li>
						<li class="js-setting-item" data-code="delete"
							style="display: block"><a href=""> <i
								class="icons-delete-3"></i>삭제
						</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="card-header-bottom ">

			<div class="post-title-area">
				<h4 class="js-post-title post-title ">${texts.notiTtl}</h4>
				<div class="schedule-period-area d-none">
					<span class="schedule-period"></span> <span class="schedule-period"></span>
				</div>
			</div>
			<div class="post-state">
				<span class="task-number d-none" data-task=""> 업무번호 <em>${texts.notiId }</em>
				</span>
			</div>
		</div>
		<div class="post-card-container">

			<div id="originalPost" class="post-card-content "
				style="display: block">
				<div>${fn:replace(texts.txtCntn, replaceChar, "<br/>")}</div>
			</div>

			<div id="summaryPost" class="post-card-content hidden"
				style="display: none">
				<div></div>
			</div>

			<button id="postMoreButton" type="button"
				class="js-contents-more-btn post-more-btn" style="display: none">더보기</button>
			<div id="summaryFoldArea" class="content-fold" style="display: none"></div>

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
<!-- 모달창 끝 -->

<script>
	// 모달창 닫기 버튼
	$(".btn-close").click(function() {
		$("#postPopup").css("display", "none");
		$(".task-item").removeClass("highlight");
	});
	
	// 더보기 버튼 (수정, 삭제)
	$(function() {
		$("#moreSettingMyTextBtn").click(function() {
			$("#groupSettingTxtBtn").toggle();
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