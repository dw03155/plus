<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
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

<script async="" src="flow-renewal/js/main.js"></script><!-- 제일 밑에 있던 js -->

<style type="text/css">
@-webkit-keyframes rotate {
from { -webkit-transform:rotate(0deg);}
to { -webkit-transform: rotate(360deg);}
}
@keyframes rotate{
from { transform:rotate(0deg);}
to { transform: rotate(360deg);}
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
	<div id="bottomToolList" class="bottom-tool-list">
		<div class="js-tool-item tool-item" id="quickGuideMenu"
			data-code="quick" style="display: none;"></div>
	</div>

	<div id="quickGuideItem" class="d-none"></div>

	<!-- 여기서부터 시작 -->

	<div class="d-none"></div>

	<div id="inviteItem" class="d-none"></div>

	<div id="postItem" class="d-none"></div>

	<div id="detailItemPack" class="d-none"></div>

	<div id="postAttachedItem"></div>

	<div id="postDimdItem" class="d-none"></div>

	<ul id="workerListItem" class="d-none"></ul>
	<div id="workersPopup" class="d-none"></div>
	<div id="workerSelectCount" class="d-none"></div>
	<div id="taskSelectedWorkerItem" class="d-none"></div>
	<div id="projectSelectableLayer" class="d-none"></div>
	<div id="reactionCheckPopup" class="d-none"></div>
	<div id="reactionCheckItem" class="d-none"></div>
	<div id="readCheckPopup" class="d-none"></div>
	<div id="readCheckItem" class="d-none"></div>
	<div id="subTaskAreaItem" class="d-none"></div>
	<div id="subTaskItem" class="d-none"></div>
	<div id="subtaskInputItem" class="d-none"></div>
	<div id="selectableProjectItem" class="d-none"></div>
	<div id="requestJoinPopup" class="flow-all-background-1 d-none"></div>
	<div id="joinParticipantItem" class="d-none"></div>
	<div id="memberItem" style="display: none"></div>

	<script src="flow-renewal/dist/js/commonLib.min.js"></script>
	<script src="flow-renewal/dist/js/common.min.js"></script>
	<script src="flow-renewal/dist/js/module.min.js"></script>

	<script src="flow-renewal/dist/js/main.min.js"></script>
	<script src="flow-renewal/dist/js/mainLib.min.js"></script>

	<div id="popupDraw" class="d-none"></div>
	<div id="itemComponent" class="d-none"></div>

	<script async src="flow-renewal/js/main.js"></script>
</body>
</html>