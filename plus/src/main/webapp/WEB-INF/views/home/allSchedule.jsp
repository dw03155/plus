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
						style="display: block;">
						<div class="all-schedule">
							<div class="btns-wr">
								<div class="project-search-area all-file-header-type-3">
									<div class="project-search">
										<i class="icons-search"></i> <input type="text"
											placeholder="일정 제목을 검색해주세요!"
											class="js-calendar-search-input project-search-input">
									</div>
								</div>
								<div class="btns-area">

									<button id="scheduleAdd" type="button"
										class="collect-add-button" data-post-code="2"></button>
								</div>
							</div>
							<div class="all-calendar-wrap">
								<!-- calendar -->
								<div id="calendar"
									class="all-calendar all-calendar-nav layer-scroll fc fc-unthemed fc-ltr">
									<div class="fc-toolbar fc-header-toolbar">
										<div class="fc-left">
											<div>
												<button type="button"
													class="fc-prev-button fc-button fc-state-default"
													aria-label="prev">
													<span class="fc-icon fc-icon-left-single-arrow"></span>
												</button>
												<h2>2021년 11월</h2>
												<button type="button"
													class="fc-next-button fc-button fc-state-default"
													aria-label="next">
													<span class="fc-icon fc-icon-right-single-arrow"></span>
												</button>
											</div>
										</div>
										<div class="fc-right">
											<div class="fc-button-group">
												<button type="button"
													class="fc-today-button fc-button fc-state-default fc-corner-right fc-state-disabled"
													disabled>오늘</button>
											</div>
										</div>
										<div class="fc-center"></div>
										<div class="fc-clear"></div>
									</div>
									<div class="fc-view-container" style="">
										<div class="fc-view fc-month-view fc-basic-view" style="">
											<table>
												<thead>
													<tr>
														<td class="fc-head-container fc-widget-header">
															<!-- table 1 -->
															<div class="fc-row fc-widget-header">
																<table>
																	<thead>
																		<tr>
																			<th class="fc-day-header fc-widget-header fc-sun" style="border:0"><span>일</span></th>
																			<th class="fc-day-header fc-widget-header fc-mon" style="border:0"><span>월</span></th>
																			<th class="fc-day-header fc-widget-header fc-tue" style="border:0"><span>화</span></th>
																			<th class="fc-day-header fc-widget-header fc-wed" style="border:0"><span>수</span></th>
																			<th class="fc-day-header fc-widget-header fc-thu" style="border:0"><span>목</span></th>
																			<th class="fc-day-header fc-widget-header fc-fri" style="border:0"><span>금</span></th>
																			<th class="fc-day-header fc-widget-header fc-sat" style="border:0"><span>토</span></th>
																		</tr>
																	</thead>
																</table>
															</div>
														</td>
													</tr>
												</thead>
												<tbody class="fc-body">
													<tr>
														<td class="fc-widget-content">
															<div class="fc-scroller fc-day-grid-container"
																style="overflow: hidden; height: 679px">
																<!-- 전체 일때는 height: 679px 값 추가, 화면에 따라 달라짐 -->
																<div class="fc-day-grid fc-unselectable">
																	<div class="fc-row fc-week fc-widget-content fc-rigid"
																		style="overflow: hidden; height: 113px">
																		<!-- 전체 일때는 height: 113px 값 추가, 화면에 따라 달라짐 -->
																		<!-- table 2 -->
																		<div class="fc-bg">
																			<table class="">
																				<tbody>
																					<tr>
																						<td
																							class="fc-day fc-widget-content fc-sun fc-other-month fc-past"
																							data-date="2021-10-31"></td>
																						<td
																							class="fc-day fc-widget-content fc-mon fc-today"
																							data-date="2021-11-01"></td>
																						<td
																							class="fc-day fc-widget-content fc-tue fc-future"
																							data-date="2021-11-02"></td>
																						<td
																							class="fc-day fc-widget-content fc-wed fc-future"
																							data-date="2021-11-03"></td>
																						<td
																							class="fc-day fc-widget-content fc-thu fc-future"
																							data-date="2021-11-04"></td>
																						<td
																							class="fc-day fc-widget-content fc-fri fc-future"
																							data-date="2021-11-05"></td>
																						<td
																							class="fc-day fc-widget-content fc-fri fc-future"
																							data-date="2021-11-06"></td>

																					</tr>
																				</tbody>
																			</table>
																		</div>

																		<!-- table 3 -->
																		<div class="fc-content-skeleton">
																			<table>
																				<thead>
																					<tr>
																						<td
																							class="fc-day-top fc-sun fc-other-month fc-past"
																							data-date="2021-10-31"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-10-31',type:'day'}">31</a></td>
																						<td class="fc-day-top fc-mon fc-today"
																							data-date="2021-10-01"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-01',type:'day'}">01</a></td>
																						<td class="fc-day-top fc-mon fc-future"
																							data-date="2021-10-02"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-02',type:'day'}">02</a></td>
																						<td class="fc-day-top fc-mon fc-future"
																							data-date="2021-10-03"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-03',type:'day'}">03</a></td>
																						<td class="fc-day-top fc-mon fc-future"
																							data-date="2021-10-04"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-04',type:'day'}">04</a></td>
																						<td class="fc-day-top fc-mon fc-future"
																							data-date="2021-10-05"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-05',type:'day'}">05</a></td>
																						<td class="fc-day-top fc-mon fc-future"
																							data-date="2021-10-06"><a
																							class="fc-day-number"
																							data-goto="{date:'2021-11-06',type:'day'}">06</a></td>
																					</tr>
																				</thead>
																				<tbody>
																					<tr>
																						<td rowspan="3"></td>
																						<td rowspan="3"></td>
																						<td rowspan="3"></td>
																						<td class="fc-event-container" colspan="3"><a
																							class="fc-day-grid-event fc-h-event fc-event fc-start fc-end color-code-6">
																								<div class="fc-content">
																									<span class="fc-title js-mouseover">[tskProgress]
																										tskTtl</span>
																								</div>
																						</a></td>
																						<td rowspan="2">
																							<div>
																								<a class="fc-more">+1개</a>
																							</div>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</div>
																	</div>
																</div>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<!-- calendar-popup -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- table 1 -->
	<!--<div class="fc-row fc-widget-header">
		<table class="">
			<thead>
				<tr>
					<th class="fc-day-header fc-widget-header fc-sun"><span>일</span></th>
					<th class="fc-day-header fc-widget-header fc-mon"><span>월</span></th>
					<th class="fc-day-header fc-widget-header fc-tue"><span>화</span></th>
					<th class="fc-day-header fc-widget-header fc-wed"><span>수</span></th>
					<th class="fc-day-header fc-widget-header fc-thu"><span>목</span></th>
					<th class="fc-day-header fc-widget-header fc-fri"><span>금</span></th>
					<th class="fc-day-header fc-widget-header fc-sat"><span>토</span></th>
				</tr>
			</thead>
		</table>
	</div>-->

	<!-- table 2 -->
	<!--<div class="fc-bg">
		<table class="">
			<tbody>
				<tr>
					<td class="fc-day fc-widget-content fc-sun fc-other-month fc-past"
						data-date="2021-10-31"></td>
					<td class="fc-day fc-widget-content fc-mon fc-today"
						data-date="2021-11-01"></td>
					<td class="fc-day fc-widget-content fc-tue fc-future"
						data-date="2021-11-02"></td>
					<td class="fc-day fc-widget-content fc-wed fc-future"
						data-date="2021-11-03"></td>
					<td class="fc-day fc-widget-content fc-thu fc-future"
						data-date="2021-11-04"></td>
					<td class="fc-day fc-widget-content fc-fri fc-future"
						data-date="2021-11-05"></td>
					<td class="fc-day fc-widget-content fc-fri fc-future"
						data-date="2021-11-06"></td>

				</tr>
			</tbody>
		</table>
	</div>-->

	<!-- table 3 -->
	<!--<div class="fc-content-skeleton">
		<table>
			<thead>
				<tr>
					<td class="fc-day-top fc-sun fc-other-month fc-past"
						data-date="2021-10-31"><a class="fc-day-number"
						data-goto="{date:'2021-10-31',type:'day'}">31</a></td>
					--<td class="fc-day-top fc-mon fc-today" data-date="2021-10-01"><a
						class="fc-day-number" data-goto="{date:'2021-11-01',type:'day'}">01</a></td>
					<td class="fc-day-top fc-mon fc-future" data-date="2021-10-02"><a
						class="fc-day-number" data-goto="{date:'2021-11-02',type:'day'}">02</a></td>
					<td class="fc-day-top fc-mon fc-future" data-date="2021-10-03"><a
						class="fc-day-number" data-goto="{date:'2021-11-03',type:'day'}">03</a></td>
					<td class="fc-day-top fc-mon fc-future" data-date="2021-10-04"><a
						class="fc-day-number" data-goto="{date:'2021-11-04',type:'day'}">04</a></td>
					<td class="fc-day-top fc-mon fc-future" data-date="2021-10-05"><a
						class="fc-day-number" data-goto="{date:'2021-11-05',type:'day'}">05</a></td>
					<td class="fc-day-top fc-mon fc-future" data-date="2021-10-06"><a
						class="fc-day-number" data-goto="{date:'2021-11-06',type:'day'}">06</a></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td rowspan="3"></td>
					<td rowspan="3"></td>
					<td rowspan="3"></td>
					<td class="fc-event-container" colspan="3"><a
						class="fc-day-grid-event fc-h-event fc-event fc-start fc-end color-code-6">
							<div class="fc-content">
								<span class="fc-title js-mouseover">[tskProgress] tskTtl</span>
							</div>
					</a></td>
					<td rowspan="2">
						<div>
							<a class="fc-more">+1개</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>-->
</body>
</html>