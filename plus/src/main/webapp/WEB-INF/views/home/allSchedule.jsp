<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
				<div>캘린더</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block"> ${fn:length(nwLists)}</span>
		</div>


		<!-- 캘린더 페이지 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: block;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">

					<div class="allCalendarLayer full-width small-style-wrap-2 d-none"
						style="display: block">
						<div class="all-schedule">
							<div class="btns-wr">
								<div class="project-search-area all-file-header-type-3">
									<div class="project-search">
										<i class="icons-search"></i> <input type="text"
											placeholder="일정 제목을 검색해주세요!"
											class="js-calendar-search-input project-search-input">
									</div>
								</div>
							</div>
							<div class="all-calendar-wrap">
								<div class="all-calendar-wrap">
									<!-- calendar -->
									<div id="calendar"
										class="all-calendar all-calendar-nav layer-scroll"></div>
									<!-- calendar-popup -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$('#calendar').fullCalendar({
			events : [
			<c:forEach var="nwList" items="${nwLists}">
				{
				title : '[${nwList.prjTtl}] ${nwList.notiTtl}',
				<c:if test="${nwList.prjColor == }">
				<c:set var="prjCol" value="" />
				</c:if>
				<c:if test="${nwList.prjColor == }">
				<c:set var="prjCol" value="" />
				</c:if>
				<c:if test="${nwList.prjColor == }">
				<c:set var="prjCol" value="" />
				</c:if>
				<c:if test="${nwList.prjColor == }">
				<c:set var="prjCol" value="" />
				</c:if>
				<c:if test="${nwList.prjColor == }">
				<c:set var="prjCol" value="" />
				</c:if>
				color : ${prjCol}
				start : '<fmt:formatDate value="${nwList.notiBgnDt}" pattern="yyyy-MM-dd" />',
				end : '<fmt:formatDate value="${nwList.notiEndDt}" pattern="yyyy-MM-dd" />'
			},
			</c:forEach>
			]
		});
	</script>
</body>
</html>