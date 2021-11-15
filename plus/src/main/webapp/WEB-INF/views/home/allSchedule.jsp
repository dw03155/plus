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
				<div>캘린더</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block">50</span>
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
		$.ajax({
			url : "allSchedule.do",
			type : "post",
			dataType : 'json',
			data : jsonData,
			success : function(data) {
				if (data != "") {
					for (i=0; i<data.length; i++) {
						data[i].d
					}
					$('#calendar').fullCalendar({

						events : [ {
							title : 'all',
							start : '2021-11-12'
						}, {
							title : 'all',
							start : '2021-11-12',
							end : '2021-11-13'
						}, {
							title : 'all',
							start : '2021-11-12',
							end : '2021-11-14'
						} ]
					});
				}
			}
		});
	</script>
</body>
</html>