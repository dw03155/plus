<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>플러스(Plus)</title>
</head>
<body>
	<div class="main-container">
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="openProjectLayer" class="small-style-wrap d-none"
				style="display: block">
				<div class="main-header">
					<div id="mainTop" class="title-1">전체 프로젝트</div>
				</div>
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
								<li class="category-item">
									<button type="button" class="public-project-item active">전체</button>
								</li>
								<c:forEach var="ctgry" items="${ctgrys}">
									<li class="category-item">
										<button type="button" class="public-project-item"
											ctgryId="${ctgry.ctgryId}">${ctgry.ctgryName}</button>
									</li>
								</c:forEach>
							</ul>
						</div>
					</div>
					<div class="section-wrap">
						<div class="section-2">
							<div class="public-title-area">
								<span id="openProjectCategoryName" class="public-project-title">전체
									프로젝트</span><em id="openProjectTotalCount" class="public-count">${fn:length(prjs)}</em>
							</div>
						</div>
						<div id="openProjectScroll" class="layer-scroll type4">
							<ul id="openProjectList"
								class="section-list-1 project-list-setion">
								<c:forEach var="prj" items="${prjs}">
									<form action="prjHome.do" method="post">
										<input name="prjId" type="hidden" value="${prj.prjId}" />
										<li class="project-item"><a href="#">
												<div class="project-wr">
													<span class="project-ttl">${prj.prjTtl}</span>
													<div class="flow-content-hm-txt">
														<i class="icons-person-2"></i>
													</div>
													<em class="participant-count"> ${prj.partiCnt} </em> <em
														class="manager">관리자</em> <em class="manager-name">${prj.name}/${prj.wkpo}</em>
													<c:if test="${prj.partiYn == '1'}">
														<em class="badge-join">참여중</em>
													</c:if>
													<p class="project-ttl-sub">${prj.prjCntn}</p>
												</div>
										</a></li>
									</form>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
		// 프로젝트 이동하기
		$("#openProjectLayer").find("li > a").click(function(e) {
			e.preventDefault();
			$(e.currentTarget).closest("form").submit();
		});

		// 프로젝트 카테고리
		$("#openProjectCategory").find("button").on("click", function(e) {
			$("#openProjectCategory").find("button").removeClass("active");
			$(e.target).addClass("active");
		});
	</script>
</body>
</html>