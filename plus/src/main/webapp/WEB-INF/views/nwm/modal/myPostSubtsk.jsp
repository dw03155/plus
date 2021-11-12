<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<p>하위업무 모달창</p>
<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
<div class="post-popup-header card-popup-header d-none"
	style="display: block;">

	<!-- 게시물 제목 -->
	<h3 class="card-popup-title">
		<i id="projectTitleColor" class="project-color color-code-4"></i> <span
			class="js-project-title-button">${tasks.prjTtl}</span> <span
			class="subtask-title up-task-title js-up-task-button"> </span>
	</h3>
	<button  class="btn-close card-popup-close">
		<i class="icons-close-1"></i>
	</button>
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

	
</script>



