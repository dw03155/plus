<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script>
<!-- Id가 없을때 로그인화면으로 돌아감 -->
	var memId = "${sessionScope.memId}";
	$(document).ready(function() {
		if (memId == null) {
			sessionNo.submit();
		}
	});
</script>
</head>
<body>
	<div class="main-container">
		<form id="sessionNo" action="home.do"></form>

		<!-- 새글 업데이트 팝업, 동작시 ::before -->
		<div id="newUpdate" class="post-update-button-area d-none"
			style="display: none">
			<button type="button" class="post-update-button">새 글 업데이트</button>
		</div>


		<!-- 프로젝트 편집 -->
		<div id="totalProjectEditBar" class="top-banner-1 top-select"
			style="display: none">
			<div class="top-banner-2">
				<ul id="totalEditButton" class="total-edit-group">
					<li class="edit-button color"><a href="#"
						class="top-banner-icon-type-1"> <em></em>색상 설정
					</a></li>
					<li class="edit-button label"><a href="#"
						class="top-banner-icon-type-2"> <em></em>프로젝트 폴더 설정
					</a></li>
					<li class="edit-button push"><a href="#"
						class="top-banner-icon-type-3"> <em></em>알림 설정
					</a></li>
					<li class="edit-button hidden js-hidden"><a href="#"
						class="top-banner-icon-type-4"> <em></em>숨김
					</a></li>
					<li class="edit-button hidden js-cancel-hidden"><a href="#"
						class="top-banner-icon-type-4"> <em></em>숨김 취소
					</a></li>
				</ul>
				<div id="totalEditSelect" class="menu-text-popup-1">
					<span class="select-count"></span> <em class="select-clear">선택취소</em>
				</div>
			</div>
			<a href="#" id="editBarCloseButton"
				class="main-container-close-button-1"></a>
		</div>


		<!-- 프로젝트 홈 메인 -->
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1">프로젝트 홈</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"></span>

			<div id="projectHomeTop" class="main-sub-header">
				<div class="home-menu clearfix">
					<div class="home-menu-left">
						<a href="#">
							<div id="BoardTypeButton"
								class="menu-select-icon-type-1 type-button js-mouseover"
								mouseover-text="바둑판형"></div>
						</a> <a href="#">
							<div id="ListTypeButton"
								class="menu-select-icon-type-2 type-button js-mouseover"
								mouseover-text="리스트형"></div>
						</a>
					</div>
					<div class="home-menu-right">
						<a href="#" id="projectOrderButton"
							class="js-project-order-button project-order-button">
							<div id="projectOrderList"
								class="js-project-order-layer menu-popup-layer-1"
								style="display: none;">
								<ul class="menu-popup-t-1">
									<li class="order-item" code="0"><i></i><span>최신
											순(글/댓글)</span></li>
									<li class="order-item" code="1"><i></i><span>내가 작성한
											순 (글/댓글)</span></li>
									<li class="order-item" code="2"><i></i><span>오름차순(ㄱ~ㅎ)</span></li>
									<li class="order-item" code="3"><i></i><span>내림차순
											(ㅎ~ㄱ)</span></li>
								</ul>
								<ul class="menu-popup-t-2">
									<li class="filter-item" code="0"><i></i><span>내가
											참여중인 프로젝트</span></li>
									<li class="filter-item" code="1"><i></i><span>내가
											관리자인 프로젝트</span></li>
								</ul>
							</div> <i class="menu-select-icon-type-3"></i>
							<div class="menu-select-icon-type-4-text">정렬</div>
						</a> <a href="#" id="totalProjectEditButton"
							class="project-edit-button">
							<div class="menu-select-icon-type-4"></div> <span
							class="menu-select-icon-type-4-text">설정</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- 프로젝트 조회 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="projectHomeLayer" class="project-home-wrap"
				style="display: block">
				<div class="small-style-wrap">
					<div class="section-wrap">
						<div id="BoardArea" class="project-board-wr"
							style="display: block">
							<div class="section-1">
								<ul id="projectBoardUl" class="project-group clearfix">
									<c:if test="${not empty favorPrjs}">
										<div class="section-1 js-project-section js-label-section">
											<p class="project-class">즐겨찾기</p>
										</div>
									<c:forEach var="favorPrj" items="${favorPrjs}">
										<li id="project" class="project-item ui-state-default"><a
											href="#"> <!-- 업데이트된 글 개수 -->
												<div class="flow-content-ct project-badge"
													style="display: none">0</div> <!-- 체크버튼 -->
												<button class="edit-check flow-content-chk"
													style="display: none"></button>
												<div
													class="color-code left-menu-type-1 color-code-${favorPrj.prjColor}"></div>
												<div class="left-menu-type-con">
													<div
														class="project-star flow-content-star flow-content-star"></div>
													<div class="flow-content-txt project-ttl">${favorPrj.prjTtl}</div>
													<div class="flow-content-b-c">
														<div class="flow-content-hm-txt">
															<i class="icons-person-2"></i>
														</div>
														<span class="member-cnt">${favorPrj.partiCnt}</span>
														<div class="flow-content-fl-r">
															<div
																class="project-stat-ico flow-content-jms-ico js-mouseover"
																mouseover-text="관리자 승인 필요" style="display: none"></div>
															<div
																class="project-stat-ico flow-content-bl-ico js-mouseover"
																mouseover-text="푸시 알림 OFF" style="display: none"></div>
															<div
																class="project-stat-ico icon-open-project js-mouseover"
																mouseover-text="회사 공개 프로젝트" style="display: none"></div>
															<div class="project-stat-ico icon-company js-mouseover"
																mouseover-text="회사 프로젝트" style="display: none"></div>
														</div>
													</div>
												</div>
										</a></li>
									</c:forEach>
									</c:if>

									<div
										class="section-2 middle-line js-project-section js-label-section">
										<p class="project-class join">참여중</p>
									</div>
									<c:forEach var="noPrj" items="${noPrjs}">
										<li id="project" class="project-item ui-state-default"><a
											href="#"> <!-- 업데이트된 글 개수 -->
												<div class="flow-content-ct project-badge"
													style="display: none">0</div> <!-- 체크버튼 -->
												<button class="edit-check flow-content-chk"
													style="display: none"></button>
												<div
													class="color-code left-menu-type-1 color-code-${noPrj.prjColor}"></div>
												<div class="left-menu-type-con">
													<div
														class="project-star flow-content-star flow-content-star-un"></div>
													<div class="flow-content-txt project-ttl">${noPrj.prjTtl}</div>
													<div class="flow-content-b-c">
														<div class="flow-content-hm-txt">
															<i class="icons-person-2"></i>
														</div>
														<span class="member-cnt">${noPrj.partiCnt}</span>
														<div class="flow-content-fl-r">
															<div
																class="project-stat-ico flow-content-jms-ico js-mouseover"
																mouseover-text="관리자 승인 필요" style="display: none"></div>
															<div
																class="project-stat-ico flow-content-bl-ico js-mouseover"
																mouseover-text="푸시 알림 OFF" style="display: none"></div>
															<div
																class="project-stat-ico icon-open-project js-mouseover"
																mouseover-text="전체 공개 프로젝트" style="display: none"></div>
															<div class="project-stat-ico icon-company js-mouseover"
																mouseover-text="회사 프로젝트" style="display: none"></div>
														</div>
													</div>
												</div>
										</a></li>
									</c:forEach>
								</ul>
							</div>
						</div>
						<div id="ListArea" class="project-list-wr" style="display: none">
							<ul id="projectListUl"></ul>
						</div>
					</div>




					<ul id="allProjectBoardItem" style="display: none">
						{label}
						<li id="project-{project-number1}"
							class="project-item ui-state-default" label-srnos="{label_srnos}"
							project-srno="{project-number1}"><a href="#">
								<div class="flow-content-ct project-badge" {badge-display}="">{badge-count}</div>
								<button class="edit-check flow-content-chk"
									style="display: none"></button>
								<div class="color-code left-menu-type-1 color-code-${prjColor}"
									data-color="{color-code}"></div>
								<div class="left-menu-type-con">
									<div class="project-star flow-content-star {star-class}"></div>
									<div class="flow-content-txt project-ttl">{title}</div>
									<div class="flow-content-b-c">
										<div class="flow-content-hm-txt">
											<i class="icons-person-2"></i>
										</div>
										<span class="member-cnt">{member-count}</span>
										<div class="flow-content-fl-r">
											<div
												class="project-stat-ico flow-content-jms-ico js-mouseover"
												mouseover-text="관리자 승인 필요" {manager-display}=""></div>
											<div
												class="project-stat-ico flow-content-bl-ico js-mouseover"
												mouseover-text="푸시 알림 OFF" {push-display}=""></div>
											<div class="project-stat-ico icon-open-project js-mouseover"
												mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
											<div class="project-stat-ico icon-company js-mouseover"
												mouseover-text="회사 프로젝트" {company-display}=""></div>
										</div>
									</div>
								</div>
						</a></li>
					</ul>

					<ul id="allProjectListItem" style="display: none">
						{label}
						<li id="project-{project-number2}"
							class="project-item ui-state-default"
							project-srno="{project-number2}" label-srnos="{label_srnos}">
							<a href="#">
								<button class="edit-check flow-content-chk d-none"></button>
								<div
									class="color-code flow-content-list flow-content-po-t color-code-{color-code}"
									data-color="{color-code}"></div>
								<div class="project-star flow-content-po-t {star2-class}"></div>
								<span class="project-ttl">{title}</span>
								<div class="flow-content-hm-txt">
									<i class="icons-person-2"></i>
								</div> <span class="member-cnt">{member-count}</span> <strong
								class="project-badge" {badge-display}="">{badge-count}</strong>
								<div class="flow-content-fl-r">
									<div class="project-stat-ico flow-content-jms-ico js-mouseover"
										mouseover-text="관리자 승인 필요" {manager-display}=""></div>
									<div class="project-stat-ico flow-content-bl-ico js-mouseover"
										mouseover-text="푸시 알림 OFF" {push-display}=""></div>
									<div class="project-stat-ico icon-open-project js-mouseover"
										mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
									<div class="project-stat-ico icon-company js-mouseover"
										mouseover-text="회사 프로젝트" {company-display}=""></div>
								</div>
						</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</body>
</html>