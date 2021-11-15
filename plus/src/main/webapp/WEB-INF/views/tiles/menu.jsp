<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div id="leftTask" class="left-task active">
		<div class="logo-area">
			<a href="myProject.do" class="js-logo logo-box">
				<h1 class="logo-1">
					<img src="/img/plus.png?heigth:50" alt="flow" id="logoImg" />
				</h1>
			</a>
		</div>
		<a id="prjMake" href="" class="js-left-menu ">
			<div id="projectMakeButton" class="new-project-1">
				<div class="button-suport-1"></div>
				새 프로젝트
			</div>
		</a>
		<ul id="leftMenuUl" class="menu-group js-left-menu mgt-20">
			<li data-code="main" class="left-menu-item"><a
				href="myProject.do"> <i class="ico-home"></i>내 프로젝트 <em
					id="leftProjectHomeCount"
					class="js-project-home-count project-total-count d-none"></em>
			</a></li>
			<c:if test="${memPerm ne 'GUEST'}">
				<li data-code="open" class="left-menu-item"><a
					href="openProject.do"><i class="ico-search"></i>전체 프로젝트 </a></li>
			</c:if>
			<li data-code="star" class="left-menu-item"><a href="#"><i
					class="ico-favorite"></i>즐겨찾기</a></li>
		</ul>
		<ul id="leftScroll" class="menu-accordion-group scroll-mask">
			<li>
				<div class="menu-accordion-button active left-menu-item">
					모아보기<i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion" style="display: block">
					<ul class="menu-accordion-list">
						<c:if test="${memPerm ne 'GUEST'}">
							<li data-code="task" class="left-menu-item"><a
								href="allTask.do"><i class="ico-task"></i>전체 업무</a></li>
							<li data-code="schd" class="left-menu-item"><a
								href="allSchedule.do"><i class="ico-schedule"></i>캘린더</a></li>
							<li data-code="file" class="left-menu-item"><a
								href="allFile.do"><i class="ico-filebox"></i>파일함</a></li>
						</c:if>
						<li data-code="bookmark" class="left-menu-item"><a
							href="bookmark.do"><i class="ico-bookmark"></i>북마크</a></li>
						<li data-code="mypost" class="left-menu-item"><a
							href="myPost.do"><i class="ico-my-write"></i>내 게시물</a></li>
					</ul>
				</div>
			</li>

			<li>
				<div id="allLabelLeftButton"
					class="menu-accordion-button left-menu-item active">
					프로젝트 폴더
					<button class="js-label-add label-add-button">
						<i class="ico-plus"></i>
					</button>
					<i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul id="allFolderUl" class="menu-accordion-list d-none ui-sortable"
						style="display: block">
						<li class="label-item "><i class="ico-label"></i> <span
							class="js-label-name js-mouseover ellipsis">마케팅</span>
							<a href="#"
							class="js-label-setting-button flow-dash-three">
								<div style="height: "></div>
								<div></div>
								<div></div>
						</a></li>

						<li class="label-item "><i class="ico-label"></i> <span
							class="js-label-name js-mouseover ellipsis">디자인</span>
							<a href="#"
							class="js-label-setting-button flow-dash-three">
								<div></div>
								<div></div>
								<div></div>
						</a></li>

					</ul>
				</div>
			</li>
		</ul>
		<!-- 프로젝트 폴더 설정창(수정, 삭제) -->
		<div
			class="js-label-setting-layer setting-popup flow-small-layer-1 cursor-pointer"
			id="folderSetting" style="display: none">
			<div class="label-edit flow-name-size">
				<i></i><a href="#"><span>수정</span></a>
			</div>
			<div class="label-delete flow-dash-icon">
				<i></i><a href="#"><span>삭제</span></a>
			</div>
		</div>
		<!-- 관리자 메뉴 -->
		<c:if test="${memPerm eq 'ADMIN'}">
			<ul id="leftBottomUl" class="menu-group admin">
				<li data-code="manageradmin" class="d-none left-menu-item"
					style="display: block"><a id="managerAdmin"
					href="companyInfo.do"><i class="ico-admin"></i>어드민</a></li>
			</ul>
		</c:if>
	</div>
	<script>
		$(function(){
			var coUrl = "${sessionScope.coUrl}";
			$.ajax({
				url: "getLogo.do?coUrl="+coUrl,
				type: "get",
				datatype: "json",
				success: function(data){
					var $coLogo = data.coLogo;
					var logoPath = "/logo/"+$coLogo+ "?heigth=50";
					$("#logoImg").attr("src",logoPath);
					console.log($coLogo);
				}
			})
		})
	</script>
</body>
</html>