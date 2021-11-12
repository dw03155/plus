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
.ctgry_modal {
	padding: 14px;
	position: absolute;
	top: 580px;
	left: 64%;
	z-index: 999;
	background: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	color: #555;
	display: none;
}

.ctgryLi {
	min-width: 90px;
	padding: 3px;
	background: #fff;
	border: 0px;
	font-size: 14px;
	text-align: center;
}

.ctgryLi:hover {
	cursor: pointer;
	color: #6449FC;
}
</style>
</head>
<body>
	<!-- 팝업창 화면 -->

	<!-- 성공 알림창 style-->
	<div id="toastWrap">
		<div class="alert-wrap d-none" style="display: none">
			<div class="alert-type success">
				<div class="text">#####</div>
			</div>
		</div>
	</div>

	<!-- 실패 알림창 style-->
	<div id="toastWrap">
		<div class="alert-wrap d-none" style="display: none">
			<div class="alert-type error">
				<div class="text">#####</div>
			</div>
		</div>
	</div>


	<!-- 프로젝트 색상창 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="color-popup flow-project-popup-3">
					<div class="flow-project-header-1">
						프로젝트 색상 <a href="#" class="close-event flow-close-type-1"></a>
					</div>
					<div class="flow-content">
						<div class="flow-category-option-3">
							<ul id="selectColorTypes" class="select-color-group">
								<!--선택시 li태그 project-color-check-active-1 추가 -->
								<li class="color-item project-color-type-5"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-11"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-1"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-10"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-2"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-7"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-9"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-6"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-3"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-4"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-8"><a href="#"><em></em></a></li>
								<li class="color-item project-color-type-0"><a href="#"><em></em></a></li>
							</ul>
						</div>
						<div class="flow-pop-button-type-1 margin-bottom-20">
							<button type="button" class="flow-pop-sub-button-1 cancel-event">취소</button>
							<button type="button" class="flow-pop-sub-button-2 submit-event">확인</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 프로젝트 폴더명 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="input-popup flow-project-popup-4">
					<div class="flow-project-header-1">
						<span class="popup-title">프로젝트 만들기, 프로젝트 수정하기</span> <a href="#"
							class="close-event flow-close-type-1"></a>
					</div>
					<div class="flow-content">
						<div class="flow-content-input-1">
							<input class="popup-input" type="text" placeholder=""
								maxlength="50" data-required-yn="Y"
								data-empty-msg="프로젝트 폴더명을 입력해주세요."
								data-over-msg="50자 이내로 입력하세요.">
						</div>
						<div class="flow-pop-button-type-1">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event">취소</div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event">확인</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- 프로젝트 폴더 삭제 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div
					class="mini-confirm-popup flow-project-popup-3 popup-quit d-none"
					style="display: block;">
					<p class="popup-cont contents">프로젝트 폴더를 삭제하시겠습니까? 프로젝트 폴더에 포함된
						프로젝트는 삭제되지 않습니다.</p>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 cancel-event">취소</div>
						</a> <a href="#">
							<div class="flow-pop-sub-button-2 submit-event">확인</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- 글 삭제 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="mini-confirm-popup flow-project-popup-3 popup-quit">
					<p class="popup-cont contents">글을 삭제하시겠습니까?</p>
					<div class="flow-pop-button-type-1">
						<a href="#">
							<div class="flow-pop-sub-button-1 cancel-event">취소</div>
						</a> <a href="#">
							<div class="flow-pop-sub-button-2 submit-event">확인</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 두번창 띄우기 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="confirm-popup flow-project-popup-6">
					<div class="flow-content">
						<div class="flow-content-text">
							<p class="popup-cont"></p>
						</div>
						<div class="flow-pop-button-type-1">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event"></div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event"></div>
							</a>
						</div>
						<a href="#">
							<div class="flow-secondary-submit secondary-submit-event"></div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--  내프로젝트에서 프로젝트 폴더 설정 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="label-popup allProjLabel-popup flow-project-popup-8">
					<div class="flow-project-header-1">
						<span>프로젝트 폴더 설정</span> <a href="#"
							class="close-event flow-close-type-1"></a>
					</div>
					<ul class="js-label-ul label-set-group scroll-mask">
						<li class="label-item">
							<div class="label-set-item">
								<span class="label-item-text ellipsis">마케팅</span>
								<!--check시 class="flow-content-check-type-2" -->
								<a href="#" class="js-check-label flow-content-check-type-1"></a>
							</div>
						</li>
						<li class="label-item">
							<div class="label-set-item">
								<span class="label-item-text ellipsis">마케팅</span> <a href="#"
									class="js-check-label flow-content-check-type-1"></a>
							</div>
						</li>

						<li class="label-item">
							<div class="label-set-item">
								<span class="label-item-text ellipsis">디자인</span> <a href="#"
									class="js-check-label flow-content-check-type-1"></a>
							</div>
						</li>
					</ul>
					<div class="flow-pop-button-type-2">
						<a href="#">
							<div class="flow-pop-sub-button-1 cancel-event">취소</div>
						</a> <a href="#">
							<div class="flow-pop-sub-button-2 submit-event">확인</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>




	<!-- 사용자 프로필 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="profile-popup js-profile-popup d-none"
					style="display: block">
					<div class="profile-header">
						<div class="profile-header-dimmed-layer"></div>
						<button class="btn-close">
							<i class="icons-close-1"></i>
						</button>
					</div>
					<div class="name-card">
						<!--프로필 사진 미설정 시 default 클래스 추가-->
						<i class="profile-image js-profile-image default"></i>
						<div class="info">
							<p class="info-box">
								<span class="name ellipsis">{name}</span> <span class="position">{wkpo}</span>
							</p>
							<p class="info-box">
								<span class="company">{coUrl}</span> <span class="department">{dept}</span>
							</p>
						</div>
					</div>
					<div class="contact-section">
						<ul class="contact-contents">
							<li class="status js-user-status"><i class="icon-status"></i>
								상태 설정</li>
							<li><em><i class="profile-mail js-user-email"></i></em> <span>{email}</span>
							</li>
							<li><em><i class="profile-phone js-user-phone"></i></em> <span>{persTel}</span>
							</li>
							<li><em><i class="profile-tell js-user-call"></i></em> <span>{coTel}</span>
							</li>
						</ul>
					</div>
					<div class="btn-wr">
						<button class="btn-chat js-btn-chat">
							채팅 <i></i>
						</button>
						<button class="btn-modi js-btn-modi">
							정보수정 <i></i>
						</button>
						<button class="btn-video js-btn-video">
							화상 회의 <i></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>




	<!-- 로딩페이지(circle) style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="loading-area">
					<div class="loading type2">
						<i class="circle"></i> <i class="circle"></i> <i class="circle"></i>
						<i class="circle"></i> <i class="circle"></i>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 로딩페이지(straight) style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="flow-all-background-1 zindex1000 js-loading-popup">
					<div class="flow-project-make-1">
						<div class="flow-project-make-2">
							<div class="loading-popup flow-project-popup-6">
								<div class="flow-project-header-1">
									<a href="#"
										class="js-cancel-btn loading-cancel flow-close-type-1"></a>
								</div>
								<div class="flow-content">
									<div class="flow-content-text">
										<p class="popup-cont">{contents}</p>
									</div>
									<div class="loading">
										<i class="circle"></i> <i class="circle"></i> <i
											class="circle"></i> <i class="circle"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- 파일 업로드 style-->
	<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
		style="display: none">
		<div class="flow-project-make-1 back-area">
			<div class="flow-project-make-2 back-area contents">
				<div class="image-send-popup flow-project-popup-6">
					<div class="flow-project-header-1"></div>
					<div class="contents">
						<div class="flow-content-text">
							<p class="popup-cont">
								<em class="d-block">파일을 전송하시겠습니까?</em> <span class="file-info"
									id="fileInfo"></span> <span class="file-count" id="fileCount"></span>
							</p>
							<div class="js-checkbox-area check-box">
								<input class="js-checkbox-input" type="checkbox"> <label
									class="js-checkbox-label"></label> 이미지 묶어보내기
							</div>
						</div>
						<div class="flow-pop-button-type-1">
							<a href="#"><div
									class="js-cancel-btn flow-pop-sub-button-1 cancel-event">취소</div></a>
							<a href="#"><div
									class="js-submit-btn flow-pop-sub-button-2 submit-event">확인</div></a>
						</div>
						<div class="flow-secondary-submit secondary-submit-event"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- //팝업창 화면 -->

	<!-- 전체 화면 -->

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
	<div id="prjMakeLayer" class="flow-all-background-1 d-none back-area"
		style="display: none;">
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
						<a id="categoryName" href="#">
							<div class="open-category-setting flow-content-8">
								<em></em> 프로젝트 카테고리 설정
								<div class="flow-sub-content-1">
									<span class="category-name">선택</span><em></em> <i></i>
								</div>
							</div>
						</a>
					</div>
					<a href="#">
						<div class="project-submit flow-content-7 un-value">만들기</div>
					</a>
				</div>
				<!-- 카테고리 모달 -->
				<div id="ctgryModal" class="ctgry_modal">
					<ul id="ctgryUl">
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- //새 프로젝트 -->



	<script type="text/javascript">
		//새 프로젝트
		$("#prjMake").on('click', function(e) { // 새 프로젝트 팝업창 열기
			e.preventDefault();
			$("#prjMakeLayer").css("display", "block");
		});

		$("#closeProjectMake").on('click', function(e) { // 새 프로젝트 팝업창 닫기
			e.preventDefault();
			$("#prjMakeLayer").css("display", "none");
		});

		$("button").on('click', function(e) { // 옵션 버튼 클릭시 active
			$(e.target).toggleClass("active");
		});

		$("#categoryName").on(
				"click",
				function(e) { // 새 프로젝트 카테고리 설정
					e.preventDefault();

					// 카테고리 정보 가져오기
					var $coUrl = "${sessionScope.coUrl}";
					var jsonData = {
						"coUrl" : $coUrl
					};

					if ($("#ctgryModal").hide()) {
						$.ajax({
							url : "ctgryKnd.do",
							type : "post",
							dataType : 'json',
							data : jsonData,
							success : function(data) {
								if (data != "") {
									$("#ctgryUl").empty();
									for (i = 0; i < data.length; i++) {
										$("<li />").addClass("ctgryLi").append(
												$("<a />").text(
														data[i].ctgryName))
												.appendTo("#ctgryUl");
										$("<input />").attr("type", "hidden")
												.val(data[i].ctgryId).appendTo(
														"#ctgryUl");
									} //end of for
								} else if (data == "") {

								}
							} //end of success
						}); //end of ajax

						$("#ctgryModal").css("display", "block");

					} else {
						$("#ctgryModal").css("display", "none");
					}
				});
	</script>



	<script src="flow-renewal/dist/js/commonLib.min.js"></script>
	<script src="flow-renewal/dist/js/common.min.js"></script>
	<script src="flow-renewal/dist/js/module.min.js"></script>

	<script src="flow-renewal/dist/js/main.min.js"></script>
	<script src="flow-renewal/dist/js/mainLib.min.js"></script>

	<script src="flow-renewal/js/main.js"></script>
</body>
</html>