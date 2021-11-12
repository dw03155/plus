<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="main-container">
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="openProjectLayer" class="small-style-wrap d-none"
				style="display: block">
				<div class="open-search-area">
					<div class="project-search-area all-file-header-type-3">
						<div class="project-search">
							<i class="icons-search"></i> <input id="openProjectSearchInput"
								type="text" placeholder="프로젝트명으로 검색해주세요"
								class="project-search-input" autocomplete="off" maxlength="50">
						</div>
					</div>
				</div>
				<div class="main-sub-header">
					<div class="public-project-header">
						<button id="leftArrowButton" type="button"
							class="public-arrow-btn left" style="display: none"></button>
						<button id="rightArrowButton" type="button"
							class="public-arrow-btn right" style="display: none"></button>
						<div class="public-list-area">
							<ul id="openProjectCategory" class="public-list-group">
									<li>
										<button type="button" class="public-project-item active">전체</button>
									</li>
								<c:forEach var="ctgry" items="${ctgrys}">
									<li>
										<button type="button" class="public-project-item active">전체</button>
									</li>
								</c:forEach>
							</ul>
						</div>
					</div>
					<div class="section-wrap">
						<div class="section-2">
							<div class="public-title-area">
								<span id="openProjectCategoryName" class="public-project-title"></span><em
									id="openProjectTotalCount" class="public-count"></em>
							</div>
						</div>
						<div id="openProjectScroll" class="layer-scroll type4">
							<ul id="openProjectList"
								class="section-list-1 project-list-setion"></ul>
						</div>
					</div>
				</div>
			</div>
			<div id="categoryFirstItem" class="d-none">
				<li value="ALL" class="category-item">
					<button type="button" class="public-project-item active">전체</button>
				</li>
			</div>
			<div id="categoryItem" class="d-none">
				<li value="{category-srno}" class="category-item">
					<button type="button" class="public-project-item">{category-name}</button>
				</li>
			</div>
			<div id="projectItem" class="d-none">
				<li value="{project-srno}" class="project-item"
					data-project-info="{project-info}"><a href="#">
						<div class="project-wr">
							<span class="project-ttl">{project-name}</span>
							<div class="flow-content-hm-txt">
								<i class="icons-person-2"></i>
							</div>
							<em class="participant-count"> {project-participant} </em> <em
								class="manager">{project-manager}</em> <em class="manager-name">{project-manager-name}</em>
							<em class="badge-join" {join-display}="">참여중</em>
							<p class="project-ttl-sub">{CNTN}</p>
						</div>
				</a></li>
			</div>
		</div>
	</div>
</body>
</html>