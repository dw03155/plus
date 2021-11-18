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
<style>
.open-back-button {
    position: absolute;
    top: 87px;
    left: 410px;
    font-weight: 500;
    font-size: 13px;
    color: #777;
}
</style>
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
						<form name="openProject" method="post">
						<div class="project-search">
							<i class="icons-search"></i> <input id="openProjectSearchInput" name="prjTtl"
								type="text" placeholder="프로젝트명으로 검색해주세요"
								class="project-search-input" autocomplete="off" maxlength="50">
								<input type="hidden" id="memId" value="${sessionScope.memId}">
								<input type="hidden" id="coUrl" value="${sessionScope.coUrl}">
						</div>
						</form>
						<c:if test="${not empty param.prjTtl }">
							<button type="button"
								class="js-search-back-button js-all-posts-back open-back-button d-none"
								style="display: block">
								<i class="icons-back"></i> 돌아가기
							</button>
						</c:if>
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
										<input type="hidden" value="${ctgry.ctgryId}">
										<button type="button" class="public-project-item">${ctgry.ctgryName}</button>
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
									<input type="hidden" name="memId" value="${sessionScope.memId}">
									<input type="hidden" name="coUrl" value="${sessionScope.coUrl}">
										<input name="prjId" type="hidden" value="${prj.prjId}" />
										<input type="hidden" name="prjCtgryId" value="${prj.ctgryId}">
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

		// 프로젝트 카테고리 선택
		$("#openProjectCategory").find("button").on("click", function(e) {
			$("#openProjectCategory").find("button").removeClass("active");
			$(e.target).addClass("active");
			var $ctgryId = $(e.target).prev("input").val();
			var $allPrj = $("#allCtgry");
			console.log($(e.target));
			console.log($allPrj);
			if($(e.target).text() == "전체"){
				$(".project-item").show();
			}else {
				for(i=0; i<$(".project-item").length; i++) {
					var $prjCtgryId = $("input[name='prjCtgryId']").eq(i).val();
					if($prjCtgryId == $ctgryId){
						$("input[name='prjCtgryId']").eq(i).next().show();
					}else{
						$("input[name='prjCtgryId']").eq(i).next().hide();
					}
				}
			}
			$("#openProjectTotalCount").empty();
			$("#openProjectTotalCount").html($("#openProjectList").find('li:visible').length);
		});
		
		//검색결과 돌아가기
		$(".open-back-button").click(function(){
			window.location.reload();
		});
	</script>
</body>
</html>