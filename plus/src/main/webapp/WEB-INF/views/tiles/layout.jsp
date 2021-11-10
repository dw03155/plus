<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="theme-color" content="#5f5ab9">

<meta name="subject" content="work tool">
<meta name="content-language" content="ko">

<link rel="SHORTCUT ICON" href="design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="design2/favicon.ico">

<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">
<link rel="stylesheet" href="flow-renewal/dist/css/calrendar.css">
<link rel="stylesheet" href="flow-renewal/dist/css/mini.min.css">

<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="flow-renewal/dist/js/commonLib.min.js"></script>
<script src="flow-renewal/dist/js/mainLib.min.js"></script>

<!-- oauth -->
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/common.js"></script>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/util.js"></script>

<script async="" src="flow-renewal/js/main.js"></script>
<!-- 제일 밑에 있던 js -->

<style type="text/css">
@
-webkit-keyframes rotate {from { -webkit-transform:rotate(0deg);
	
}

to {
	-webkit-transform: rotate(360deg);
}

}
@
keyframes rotate {from { transform:rotate(0deg);
	
}

to {
	transform: rotate(360deg);
}

}
.ctgry_model {
	min-width: 115px;
	padding: 14px;
	position: absolute;
	top: 160px;
	right: 238px;
	z-index: 13;
	background: #fff;
	border: 1px solid #777;
	border-radius: 8px;
	font-size: 13px;
	text-align: left;
	color: #555;
	display: none;
}
</style>
</head>
<body>

	<div id="allMainContent" class="main-wrap">
		<!-- top바 메뉴 -->
		<div class="main-top">
			<tiles:insertAttribute name="top" />
		</div>

		<div id="mainBodyWrap" class="main-body-wrap">

			<!-- 왼쪽 메뉴 id="leftArea"-->
			<div id="leftMenu" class="main-header-1">
				<tiles:insertAttribute name="menu" />
			</div>

			<!-- //main-container  -->
			<tiles:insertAttribute name="main" />
			<!-- //main-container -->
		</div>

		<!-- 프로젝트의 참여자 관리 -->
		<!-- allSendiencePopup -->
		<!-- //allSendiencePopup -->

		<div id="imageViewerItem">
			<div class="image-viewer-wrap js-image-viewer-item d-none"
				tabindex="1" style="overflow: hidden;">
				<div class="image-viewer-header">
					<div class="image-title-area">
						<div class="image- title-top" style="color: white;">
							<span class="js-img-title image-title"></span> <span
								class="image-size"></span> <span class="image-resolution"></span>
							<span class="secret-image"></span>
						</div>
						<div class="image-title-bottom" style="color: #999;">
							<span class="image-user-name"></span> <span
								class="image-upload-date"></span>
						</div>
					</div>
					<a href="#" role="button" class="viewer-close-button"> <span
						class="blind">close</span>
					</a>
				</div>
				<div class="js-container image-viewer-container">
					<a href="#" role="button" class="viewer-button left"
						data-img-idx="-1"> <span class="blind">left</span>
					</a>
					<div class="image-group">
						<div class="js-img-back image-bg"></div>
					</div>
					<a href="#" role="button" class="viewer-button right"
						data-img-idx="1"> <span class="blind">right</span>
					</a>
				</div>

				<div class="image-viewer-footer">
					<div class="btn-editbox left-fix" style="display: block;">
						<span class="img-now">1</span>/<span class="js-total-count">2</span>
					</div>
					<div class="btn-editbox">
						<a href="#" role="button" class="image-edit-btn rotate"><span>회전</span></a>
						<a href="#" role="button" class="image-edit-btn plus"> <span>확대</span></a>
						<a href="#" role="button" class="image-edit-btn minus"> <span>축소</span></a>
						<a href="#" role="button" class="image-edit-btn autosize"> <span>초기화</span></a>
					</div>
					<div class="btn-editbox right-fix">
						<a href="#" id="btnDownPic" class="viewer-save"
							data-langcode="CT927">저장</a> <a href="#" role="button"
							class="viewer-save" id="btnAllDownPic"> 전체 저장 </a>
					</div>
				</div>
			</div>
		</div>
	</div>




	<!-- 새 프로젝트 -->
	<div id="projectMakeLayer"
		class="flow-all-background-1 d-none back-area" style="display: none;">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area">
				<div class="input-main-layer flow-project-popup-1 d-block">
					<div class="flow-project-header-1">
						<span id="projectMakePopupTitle">새 프로젝트</span> <a
							id="closeProjectMake" href="#"
							class="js-project-make-close-btn flow-close-type-1 close-event"></a>
					</div>
					<div class="flow-content scroll-mask">
						<div class="flow-content-1">
							<input id="projectTitleInput" type="text"
								placeholder="제목 입력 (필수)" maxlength="50" autocomplete="off">
						</div>
						<div class="flow-content-2">
							<textarea id="projectContentsInput"
								placeholder="프로젝트에 관한 설명 입력 (옵션)"></textarea>
						</div>

						<div class="flow-content-3">옵션</div>
						<c:if test="${memPerm eq 'ADMIN'}">

							<div class="open-yn check-setting flow-content-4">
								<a> <em></em> 회사 프로젝트 설정
								</a>
								<button class="js-sendience-service-helper js-mouseover"
									mouseover-text="전체에게 공개되며 모두 참여할 수 있도록 설정됩니다.">
									<i class="icons-question"></i>
								</button>
								<a href="#"> <!-- active 클래스로 제어  -->
									<button type="button"
										class="toggle-button check-area js-project-open-toggle">
										<i class="handle"></i>
									</button>
								</a>
							</div>
						</c:if>


						<div class="manager-permit-yn check-setting flow-content-5">
							<a> <em></em> 프로젝트 전체공개 설정
							</a>
							<button class="js-sendience-service-helper js-mouseover"
								mouseover-text="회사 임직원 모두 볼 수 있도록 설정합니다.">
								<i class="icons-question"></i>
							</button>
							<a href="#">
								<button type="button"
									class="toggle-button check-area js-project-toggle">
									<!-- active 클래스로 제어  -->
									<i class="handle"></i>
								</button>
							</a>
						</div>
						<a href="#">
							<div class="open-category-setting flow-content-8">
								<em></em> 프로젝트 카테고리 설정
								<div class="flow-sub-content-1">
									<span id="categoryName" class="category-name">선택</span><em></em>
									<i></i>
								</div>
							</div>
						</a>

						<div class="flow-category-option-1">
							<ul id="ctgryModal" class="ctgry_modal">
									<li><a href="#">${ctgryKnd}</a></li>
							</ul>
						</div>

					</div>
					<a href="#">
						<div class="project-submit flow-content-7 un-value">만들기</div>
					</a>
				</div>
			</div>
		</div>
	</div>
	<!-- //새 프로젝트 -->


	<script type="text/javascript">
	// 카테고리 정보 가져오기
	var $coUrl = "${sessionScope.coUrl}";
	var jsonData = {
		"coUrl" : $coUrl
	};

	$.ajax({
		url : "ctgryKnd.do",
		type : "post",
		dataType : 'json',
		data : jsonData,
		success : function(data) {
			if (data != "") {
				for (i = 0; i < data.length; i++) {
					$("#ctgryModal").text();
				} //end of for

			} else {
			}

		} //end of success
	}); //end of ajax
	
	
	
		//새 프로젝트
		$("#prjMake").on('click', function(e) { // 새 프로젝트 팝업창 열기
			e.preventDefault();
			$("#projectMakeLayer").css("display", "block");

		});

		$("#closeProjectMake").on('click', function(e) { // 새 프로젝트 팝업창 닫기
			e.preventDefault();
			$("#projectMakeLayer").css("display", "none");
		});

		$("button").on('click', function(e) { // 옵션 버튼 클릭시 active
			$(e.target).toggleClass("active");
		});

		$("#categoryName").on('click', function(e) { // 새 프로젝트 카테고리 설정
			e.preventDefault();
			
			$("#ctgryModal").css("display", "block");
		});
	
	</script>



	<script src="flow-renewal/dist/js/commonLib.min.js"></script>
	<script src="flow-renewal/dist/js/common.min.js"></script>
	<script src="flow-renewal/dist/js/module.min.js"></script>

	<script src="flow-renewal/dist/js/main.min.js"></script>
	<script src="flow-renewal/dist/js/mainLib.min.js"></script>

	<script async src="flow-renewal/js/main.js"></script>




</body>
</html>