<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!-- 내 게시물 목록 -> 글 상세보기(팝업) -->
ffff
<label>${tasks.prjTtl }</label>
<table border="1">
	<tr>
		<td id="memId">${texts.name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
				value="${texts.notiDttm}" /></td>
		<td>${texts.notiId }</td>
	</tr>
	<tr>
		<td colspan="3" id="notiTtl">${texts.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="3" id="txtCntn">${texts.txtCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${texts.txtFile }파일<span><button>다운</button></span>
		</td>
	</tr>
	<tr>
		<td colspan="3" id="txtPl">${texts.txtPl }장소</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."> <span><button>입력</button></span>
		</td>
	</tr>
</table>


<!-- 내 게시물 상세보기 (모달창) -->

			<h3 class="card-popup-title">
				<i id="projectTitleColor" class="project-color color-code-4"></i> <span
					class="js-project-title-button">notices.prjTtl</span> <span
					class="subtask-title up-task-title js-up-task-button"
					=""="" data-up-task-project-srno="" data-up-task-post-srno=""
					data-up-task-srno=""> </span>
			</h3>
		
		
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
								<strong class="author ellipsis">notices.name</strong> <em
									class="position ellipsis" style="display: inline" data=""></em>
								<span class="date">notices.notiDttm</span> <span
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
						<h4 class="js-post-title post-title ">notices.notiTtl</h4>
						<div class="schedule-period-area d-none"=""="">
							<span class="schedule-period"></span> <span
								class="schedule-period"=""=""></span>
						</div>
					</div>
					<div class="post-state">
						<span class="task-number d-none" data-task=""> 업무번호 <em></em>
						</span>
					</div>
				</div>
				<div class="post-card-container">

					<div id="originalPost" class="post-card-content "
						style="display: block" data="">
						<div>ㄹㄹㄹ</div>
					</div>

					<div id="summaryPost" class="post-card-content hidden"
						style="display: none" data="">
						<div>ㄹㄹㄹ</div>
					</div>

					<button id="postMoreButton" type="button"
						class="js-contents-more-btn post-more-btn" style="display: none"
						data="">더보기</button>
					<div id="summaryFoldArea" class="content-fold"
						style="display: none" data=""></div>

					<div class="post-bottom-area">
						<div class="post-bottom-menu js-reaction-bookmark">
							<div class="js-emoji-group-layer emoji-area"=""="">
								<ul class="emoji-group"></ul>
								<span class="emoji-count-area"> <span class="emoji-count"></span>
								</span>
							</div>
							<div class="bottom-button-area">
								<button class="js-post-reaction post-bottom-button ">
									<i class="icon-reaction"></i> <span>좋아요</span>
								</button>
								<button class="js-post-bookmark post-bottom-button ">
									<i class="icon-bookmark"></i> <span>북마크</span>
								</button>
								<ul class="js-emoji-select-layer emoji-select-group"
									style="display: none;">
									<li class="add-reaction" data="1"><a href="#"
										role="button"> <i class="icon-emoji like"></i>
											<p class="emoji-text">좋아요</p>
									</a></li>
									<li class="add-reaction" data="2"><a href="#"
										role="button"> <i class="icon-emoji please"></i>
											<p class="emoji-text">부탁해요</p>
									</a></li>
									<li class="add-reaction" data="3"><a href="#"
										role="button"> <i class="icon-emoji sad"></i>
											<p class="emoji-text">힘들어요</p>
									</a></li>
									<li class="add-reaction" data="4"><a href="#"
										role="button"> <i class="icon-emoji great"></i>
											<p class="emoji-text">훌륭해요</p>
									</a></li>
									<li class="add-reaction" data="5"><a href="#"
										role="button"> <i class="icon-emoji thank"></i>
											<p class="emoji-text">감사해요</p>
									</a></li>
								</ul>
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

	</div>
	<!-- 모달창 끝 -->