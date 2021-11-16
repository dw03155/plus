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
				style="display: block">${fn:length(nwLists)}</span>
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
			<c:if test="${nwList.prjColor == 0}">
			<c:set var="prjCol" value="#DDDDDD" />
			</c:if>
			<c:if test="${nwList.prjColor == 1}">
			<c:set var="prjCol" value="#F4BB40" />
			</c:if>
			<c:if test="${nwList.prjColor == 2}">
			<c:set var="prjCol" value="#EB493F" />
			</c:if>
			<c:if test="${nwList.prjColor == 3}">
			<c:set var="prjCol" value="#7F17E1" />
			</c:if>
			<c:if test="${nwList.prjColor == 4}">
			<c:set var="prjCol" value="#999999" />
			</c:if>
			<c:if test="${nwList.prjColor == 5}">
			<c:set var="prjCol" value="#4FAE9C" />
			</c:if>
			<c:if test="${nwList.prjColor == 6}">
			<c:set var="prjCol" value="#2A64F6" />
			</c:if>
			<c:if test="${nwList.prjColor == 7}">
			<c:set var="prjCol" value="#EC67A8" />
			</c:if>
			<c:if test="${nwList.prjColor == 8}">
			<c:set var="prjCol" value="#111111" />
			</c:if>
			<c:if test="${nwList.prjColor == 9}">
			<c:set var="prjCol" value="#4FAFF8" />
			</c:if>
			<c:if test="${nwList.prjColor == 10}">
			<c:set var="prjCol" value="#EC8031" />
			</c:if>
			<c:if test="${nwList.prjColor == 11}">
			<c:set var="prjCol" value="#4EAD3A" />
			</c:if>
			
			{
				title : '[${nwList.prjTtl}] ${nwList.notiTtl}',
				color : '${prjCol}',
				start : '<fmt:formatDate value="${nwList.notiBgnDt}" pattern="yyyy-MM-dd" />',
				end : '<fmt:formatDate value="${nwList.notiEndDt}" pattern="yyyy-MM-dd" />'
			},
			</c:forEach>
			{
				title : '',
				start : '',
				end : ''
			}]
		});
	</script>
</body>
</html>