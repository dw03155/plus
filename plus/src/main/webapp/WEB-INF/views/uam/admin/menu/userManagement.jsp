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
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >사용자 관리</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
			<ul id="detailTab" class="project-detail-menu">
				<li class="js-tab-item" data-code="home"><a>정상</a></li>
				<li class="js-tab-item" data-code="task"><a>이용중지</a></li>
				<li class="js-tab-item" data-code="calendar"><a>가입대기</a></li>
				<li class="js-tab-item" data-code="file"><a>게스트</a></li>
			</ul>
			<div id="detailTopSearch"
				class="project-search-area all-file-header-type-3">
				<i class="icons-search"></i>
				<div class="project-search">
					<input id="projectSearchInput" type="text"
						placeholder="검색어를 입력해주세요" class="project-search-input"
						autocomplete="off" maxlength="50" />
					<div id="projectDetailSearchLayer"
						class="name-type-seach-popup d-none"
						data-search-area-code="IN_PROJECT" style="top: 38px; right: 0px">
					</div>
				</div>
			</div><!-- ditailTopSearch end -->
		</div><!-- project-detail-top end -->
		<div id="detailTimeline" class="project-detail-inner layer-scroll type2">
			
		 </div><!-- detailTimeline end -->
	</div><!-- main-container end -->
</body>
</html>