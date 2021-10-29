<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1" style="display: block">
				<div>전체 업무</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block">50</span>
		</div>


		<!-- 전체 업무 페이지 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: block;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">

					<div class="allTaskLayer full-width small-style-wrap-2 d-none"
						style="display: block;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="업무명을 검색하세요!" autocomplete="off" maxlength="20"
										class="js-task-search-input project-search-input">
								</div>
							</div>

							<ul class="btns-area">
								<li>
									<button id="taskSettingButton"
										class="task-nav-button task-setting js-alltask-setting-button">
										<i class="icon-setting"></i>
									</button>
									<ul class="js-alltask-setting-layer menu-popup-wrap"><!-- taskSettingButton 누르면 style="display:block" 추가-->
										<li id="bundleButton"
											class="js-task-bundle-button js-bundle-list"><span>묶어보기</span><i
											class="icons-right-3"></i></li>
										<li id="sortPopupButton"><span>보기 설정</span></li>
									</ul>
									<ul id="bundleLayer"
										class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
										<li class="js-bundle-li" view-gb="0">없음</li>
										<li class="js-bundle-li" view-gb="1">상태</li>
										<li class="js-bundle-li" view-gb="2">마감일</li>
										<li class="js-bundle-li" view-gb="3">프로젝트</li>
									</ul>
								</li>
							</ul>

						</div>
						<section class="all-task-seaction">
							<h3 class="blind">모든업무 목록</h3>
							<div id="taskSortHeader" class="all-task-header"></div>
							<ul id="taskContentUl"
								class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask">
							</ul>
						</section>
					</div>

				</div>
			</div>
		</div>
	</div>
</body>
</html>