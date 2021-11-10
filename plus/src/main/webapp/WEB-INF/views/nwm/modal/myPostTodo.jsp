<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 내 게시물 목록 -> 할일 상세보기(팝업) -->
<table border="1">
	<c:forEach var="todos" items="${todos }">
	<tr>
		<td id="memId">${todos.name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
				value="${todos.todoEndDate}" /></td>
		<td>${todos.notiId }</td>
	</tr>

	<tr>
		<td colspan="3" id="notiTtl"></td>
	</tr>
	<tr>
		<td colspan="3" id="tskCntn">${todos.todoCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${todos.todoId }</td>
	</tr>
	</c:forEach>

	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>
 
<%-- <div class="js-post-nav card-item post-card-wrapper todo  side">
	<button type="button" class="post-popup-button left"></button>
	<div class="post-popup-header card-popup-header d-none"
		style="display: block;">
		<h3 class="card-popup-title">
			<i id="projectTitleColor" class="project-color color-code-4"></i> <span
				class="js-project-title-button">todos[0].prjId </span> <span
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
							<strong class="author ellipsis">todos[0].name </strong> <em
								class="position ellipsis" style="display: inline"></em> <span
								class="date">todos[0].notiDttm </span>

							<!-- 게시물 공개 여부 -->
							<c:if test="${todos.notiOpenPerm == 'all'}">
								<span class="post-security"> <i
									class="icons-person-7 js-mouseover" mouseover-text="전체 공개"></i>
								</span>
							</c:if>
							<c:if test="${todos.notiOpenPerm == 'pm'}">
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
							<input name="prjId" type="hidden" value="${todos.prjId }">
						</form>
						<button id="pinToTopBnt"
							class="js-pin-post fixed-btn js-pin-authority "
							style="display: block">
							<!-- fixed-btn on class -->
							<span class="blind">상단 고정 등록</span>
						</button>
						<button class="js-setting-button set-btn" style="display: block">
							<span></span> <span></span> <span></span>
						</button>
						<ul class="js-setting-ul js-setting-layer setup-group d-none">
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

				<div class="post-title-area">
					<h4 class="js-post-title post-title ">todos.notiTtl </h4>
					<div class="schedule-period-area d-none">
						<span class="schedule-period"></span> <span
							class="schedule-period"></span>
					</div>
				</div>
				<div class="post-state">
					<span class="task-number d-none" data-task=""> 업무번호 <em>todos.notiId </em>
					</span>
				</div>
			</div>
			
			
			<div class="post-card-container">
				<div id="originalPost" class="post-card-content "
					style="display: block">
					<div class="todo-progress-area">
						<div class="todo-progress-header">
							<div class="progress-header-left">
								<span id="progressCount" class="progress-count">0</span> <span
									id="progressTotalCount" class="progress-total">3</span>
							</div>
							<div class="progress-header-right">
								<span class="progress-percent">0%</span>
							</div>
						</div>
						<div class="todo-progress-bar">
							<span style="width: 0%"></span>
							<!-- style="width:20%" -->
						</div>
					</div>
					<ul id="todoUl" class="js-todo-component todo-group">
						<li class="todo-item">
							<div class="subtask-input-area todo-area ">
								<i class="drag-button" style="display: none"></i>
								<p class="todo-text">
									<a href="#" class="icon-checkbox js-todo-checkbox"> <i
										class="icons-check-2"></i>
									</a> <span class="js-todo-text-area js-mouseover"
										mouseover-text="테스트">테스트</span> <input
										class="todoContents js-mouseover js-close-check js-todo-content-input"
										data-gubun="newTodo" placeholder="할일을 입력하세요." value="테스트"
										type="text" autocomplete="off" maxlength="60"
										data-required-yn="Y" data-empty-msg="할일 내용을 입력해주세요!"
										data-over-msg="할일 내용이 60자가 넘었습니다!" style="display: none">
								</p>
								<div class="todo-menu">

									<span class="js-pickr-layer js-datepick-button subtask-button"
										style="display: none;"> <input type="hidden"
										class="flatpickr flatpickr-input js-pickr-date"
										readonly="readonly"> <span
										class="create-icon-box js-pickr-icon"><i
											class="icons-calendar"></i></span> <span class="js-pickr-text"></span>
									</span>
									<button id="todoWorkerButton" type="button"
										class="js-worker-button subtask-button" style="display: none;">
										<span class="create-icon-box"><i class="icons-person-6"></i></span>
									</button>

									<span id="todoDateSpan"
										class="js-pickr-layer todo-date js-mouseover " select-date=""
										mouseover-text="마감일 추가"></span> <span id="participantData"
										class="js-worker-button js-registration js-mouseover thumbnail size36 radius14"
										style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)">
									</span>

								</div>
								<button type="button" class="js-todo-remove-btn remove-button"
									style="display: none"></button>
							</div>
						</li>

						<li class="todo-item">
							<div class="subtask-input-area todo-area ">
								<i class="drag-button" style="display: none"></i>
								<p class="todo-text">
									<a href="#" class="icon-checkbox js-todo-checkbox"> <i
										class="icons-check-2"></i>
									</a> <span class="js-todo-text-area js-mouseover"
										mouseover-text="출력 화면 확인">출력 화면 확인</span> <input
										class="todoContents js-mouseover js-close-check js-todo-content-input"
										data-gubun="newTodo" placeholder="할일을 입력하세요." value="출력 화면 확인"
										type="text" autocomplete="off" maxlength="60"
										data-required-yn="Y" data-empty-msg="할일 내용을 입력해주세요!"
										data-over-msg="할일 내용이 60자가 넘었습니다!" style="display: none">
								</p>
								<div class="todo-menu">

									<span class="js-pickr-layer js-datepick-button subtask-button"
										style="display: none;"> <input type="hidden"
										class="flatpickr flatpickr-input js-pickr-date"
										readonly="readonly"> <span
										class="create-icon-box js-pickr-icon"><i
											class="icons-calendar"></i></span> <span class="js-pickr-text"></span>
									</span>
									<button id="todoWorkerButton" type="button"
										class="js-worker-button subtask-button" style="display: none;">
										<span class="create-icon-box"><i class="icons-person-6"></i></span>
									</button>

									<span id="todoDateSpan"
										class="js-pickr-layer todo-date js-mouseover "
										mouseover-text="마감일 추가"></span> <span id="participantData"
										class="js-worker-button js-registration js-mouseover thumbnail size36 radius14"
										data-worker-id="madrascheck" data-use-intt-id="UTLZ_226"
										mouseover-text="플로우 운영자"
										style="background-image: url(https://flow.team/flowImg/FLOW_202111085603616_19c29c0b-7b09-47d5-8707-a332c271b981.png?width=400&amp;amp;height=400), url(/flow-renewal/assets/images/profile-default.png)">
									</span>

								</div>
								<button type="button" class="js-todo-remove-btn remove-button"
									style="display: none"></button>
							</div>
						</li>

						<li class="todo-item">
							<div class="subtask-input-area todo-area ">
								<i class="drag-button" style="display: none"></i>
								<p class="todo-text">
									<a href="#" class="icon-checkbox js-todo-checkbox"> <i
										class="icons-check-2"></i>
									</a> <span class="js-todo-text-area js-mouseover"
										mouseover-text="수정 후 확인">수정 후 확인</span> <input
										class="todoContents js-mouseover js-close-check js-todo-content-input"
										data-gubun="newTodo" placeholder="할일을 입력하세요." value="수정 후 확인"
										type="text" autocomplete="off" maxlength="60"
										data-required-yn="Y" data-empty-msg="할일 내용을 입력해주세요!"
										data-over-msg="할일 내용이 60자가 넘었습니다!" style="display: none">
								</p>
								<div class="todo-menu">

									<span class="js-pickr-layer js-datepick-button subtask-button"
										style="display: none;"> <input type="hidden"
										class="flatpickr flatpickr-input js-pickr-date"
										readonly="readonly"> <span
										class="create-icon-box js-pickr-icon"><i
											class="icons-calendar"></i></span> <span class="js-pickr-text"></span>
									</span>
									<button id="todoWorkerButton" type="button"
										class="js-worker-button subtask-button" style="display: none;">
										<span class="create-icon-box"><i class="icons-person-6"></i></span>
									</button>

									<span id="todoDateSpan"
										class="js-pickr-layer todo-date js-mouseover "
										mouseover-text="마감일 추가"></span> <span id="participantData"
										class="js-worker-button js-registration js-mouseover thumbnail size36 radius14"
										data-worker-id="yuin3488@gmail.com"
										data-use-intt-id="GMAIL_211027181438"
										style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)">
									</span>

								</div>
								<button type="button" class="js-todo-remove-btn remove-button"
									style="display: none"></button>
							</div>
						</li>
					</ul>

					<span id="todoRgsrInfo" style="display: none"></span>
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
					<div class="cmt-read-wr">
						<div class="comment-count-area">
							<span>댓글</span> <span class="comment-count">1</span>
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
				<ul class="post-comment-group">
					<li class="remark-item">
						<div class="comment-thumbnail js-comment-thumbnail">
							<span class="thumbnail size40 radius16"
								style="background-image: url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
						</div>
						<div class="js-remark-view comment-container on ">
							<div class="comment-user-area">
								<div class="comment-user">
									<span class="user-name js-comment-user-name">QR</span> <span
										class="user-position"></span> <span class="record-date">2021-11-03
										13:47</span>
									<div class="js-remark-like comment-like ">
										<span class="js-remark-like-button"><em
											class="txt-like">좋아요</em></span> <span
											class="js-remark-like-count comment-like-count ">0</span>
									</div>
								</div>
								<div class="comment-writer-menu">
									<button type="button"
										class="js-remark-update js-remark-edit-button comment-writer-button on">
										수정</button>
									<button type="button"
										class="js-remark-delete js-remark-edit-button comment-writer-button on">
										삭제</button>
								</div>
							</div>
							<div class="js-remark-layer comment-content">
								<div class="comment-text-area">
									<div class="js-remark-text comment-text">
										<div>댓글이랑 팝업 해야지</div>
									</div>
								</div>
								<ul class="js-remark-upload-file upload-document-group"></ul>
								<ul class="js-remark-upload-img comment-upload-img"></ul>
							</div>
						</div>
						<div class="js-remark-edit comment-container">
							<div class="js-remark-layer comment-content modify">
								<form class="js-remark-form comment-text-area">
									<fieldset>
										<legend class="blind">댓글 입력</legend>
										<div class="js-remark-area js-paste-layer comment-input"
											contenteditable="true"
											placeholder="줄바꿈은 Shift + Enter / 입력은 Enter 입니다."></div>
										<div contenteditable="true"
											class="js-dimd-layer comment-upload-dimd d-none">
											<span class="dimd-text">첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</span>
										</div>
										<input type="hidden" class="comment-upload-input"> <label
											mouseover-text="파일 첨부"
											class="js-remark-upload-button comment-upload-button js-mouseover">
											<i class="icons-link"> <span class="blind">업로드 버튼</span>
										</i>
										</label> <label mouseover-text="음성 녹음" style="display: none"
											class="js-remark-recording-button comment-recording-button js-mouseover">
											<i class="icons-write-2"> <span class="blind">음성
													녹음 버튼</span>
										</i>
										</label>
									</fieldset>
								</form>
								<ul class="js-remark-upload-file upload-document-group"></ul>
								<ul class="js-remark-upload-img comment-upload-img"></ul>
							</div>
							<div class="comment-like-area d-none">
								<div class="js-remark-like comment-like ">
									<span class="js-remark-like-button"><em class="txt-like">좋아요</em></span>
									<span class="js-remark-like-count comment-like-count ">0</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
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

</div>

<script>
	// 모달창 닫기 버튼
	$(".btn-close").click(function() {
		$("#postPopup").css("display", "none");
		$(".task-item").removeClass("highlight");
	});

	// 더보기 버튼 (수정, 삭제)
	$(function() {
		$("#moreSettingMyTodoBtn").click(function() {
			$("#groupSettingTodoBtn").toggle();
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
</script> --%>