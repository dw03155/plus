<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!--
     *** 클래스 left-btn-filter 디폴트값 open
     *** 클릭 이벤트 시 클래스 close로 변경
     *** 클릭 이벤트 시 span 텍스트 닫기로 변경
     -->
		<a href="#" id="leftFilterBtn" class="left-btn-filter open d-none">
			<i class="icon-filter"></i> <span>열기</span>
		</a>


		<!--
     *** 클래스 left-task 디폴트값 active
     *** left-btn-filter 클릭 이벤트 시 left-task 클래스 active 삭제
     *** left-filter 클래스 active 추가
     -->
     
	<div id="leftFilter" class="left-filter">
		<div class="logo-area">
			<a class="js-logo logo-box">
				<h1 class="logo-1">
					<img src="flow-renewal/assets/images/flow_logo.png?height=20"
						alt="flow" srcset="" />
				</h1>
			</a>
		</div>
		<!-- 전체 업무 -->
		<ul id="allTaskFilter"
			class="menu-accordion-group scroll-mask js-left-filter-ul d-none">
			<li id="taskGroupFilter" class="js-filter-type" filter-type="radio">
				<div
					class="js-accordion-button menu-accordion-button active left-menu-item">
					업무 구분 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" filter-gb="1">
								<p>
									<i class="js-common-radio"></i> <span>내 업무</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" filter-gb="2">
								<p>
									<i class="js-common-radio"></i> <span>요청한 업무</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text on" filter-gb="3">
								<p>
									<i class="js-common-radio all-checked"></i> <span>전체</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li id="taskStatusFilter" class="js-filter-type" filter-type="check">
				<div
					class="js-accordion-button menu-accordion-button left-menu-item">
					상태 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" status-filter="0">
								<p>
									<i class="js-search-checkbox all-checked"></i> <span
										class="state request">요청</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" status-filter="1">
								<p>
									<i class="js-search-checkbox"></i> <span class="state progress">진행</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" status-filter="4">
								<p>
									<i class="js-search-checkbox"></i> <span class="state feedback">피드백</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" status-filter="2">
								<p>
									<i class="js-search-checkbox"></i> <span
										class="state completion">완료</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" status-filter="3">
								<p>
									<i class="js-search-checkbox"></i> <span class="state hold">보류</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li id="taskPriorityFilter" class="js-filter-type"
				filter-type="check">
				<div
					class="js-accordion-button menu-accordion-button left-menu-item">
					우선순위 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								priority-filter="3">
								<p>
									<i class="js-search-checkbox all-checked"></i> <span
										class="rank emergency">긴급</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								priority-filter="2">
								<p>
									<i class="js-search-checkbox"></i> <span class="rank high">높음</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								priority-filter="1">
								<p>
									<i class="js-search-checkbox"></i> <span class="rank normal">보통</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								priority-filter="0">
								<p>
									<i class="js-search-checkbox"></i> <span class="rank low">낮음</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								priority-filter="4">
								<p>
									<i class="js-search-checkbox"></i> <span class="rank empty">없음</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li id="taskStartDateFilter" class="js-filter-type"
				filter-type="radio">
				<div
					class="js-accordion-button menu-accordion-button left-menu-item">
					시작일 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text on"
								start-gb-filter="0">
								<p>
									<i class="js-common-radio all-checked"></i> <span>전체</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								start-gb-filter="1">
								<p>
									<i class="js-common-radio"></i> <span>오늘</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								start-gb-filter="2">
								<p>
									<i class="js-common-radio"></i> <span>이번 주</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								start-gb-filter="3">
								<p>
									<i class="js-common-radio"></i> <span>이번 달</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text"
								start-gb-filter="4">
								<p>
									<i class="js-common-radio"></i> <span>미정</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li id="taskEndDateFilter" class="js-filter-type" filter-type="radio">
				<div
					class="js-accordion-button menu-accordion-button left-menu-item">
					마감일 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text on"
								end-gb-filter="0">
								<p>
									<i class="js-common-radio all-checked"></i> <span>전체</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" end-gb-filter="5">
								<p>
									<i class="js-common-radio"></i> <span>지연</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" end-gb-filter="1">
								<p>
									<i class="js-common-radio"></i> <span>오늘</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" end-gb-filter="2">
								<p>
									<i class="js-common-radio"></i> <span>이번 주</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" end-gb-filter="3">
								<p>
									<i class="js-common-radio"></i> <span>이번 달</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" end-gb-filter="4">
								<p>
									<i class="js-common-radio"></i> <span>미정</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item js-extend-task-filter d-none">
							<div
								class="js-filter-button extend-task-check-text seach-check-text"
								end-gb-filter="6">
								<p>
									<i class="js-common-radio"></i> <span>기간설정</span>
								</p>
							</div>
							<div class="extend-task-calendar com-calendar d-none">
								<div class="search-filter-group">
									<div class="search-filter-item js-search-pickr-layer"
										data-code="thirdMonth">
										<div
											class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box active flatpickr-input"
											readonly="readonly">
											<span></span><input type="hidden" value=""> <label
												class="filter-date-label"><i class="icon-date"></i></label>
										</div>
										<div
											class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
											<span></span><input type="hidden" value=""> <label
												class="filter-date-label"><i class="icon-date"></i></label>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li id="taskEditFilter"
				class="js-filter-type js-extend-task-filter d-none"
				filter-type="radio">
				<div
					class="js-accordion-button menu-accordion-button left-menu-item">
					수정일 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text on">
								<p>
									<i class="js-common-radio all-checked"></i> <span>전체</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text">
								<p>
									<i class="js-common-radio"></i> <span>오늘</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text">
								<p>
									<i class="js-common-radio"></i> <span>이번 주</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text">
								<p>
									<i class="js-common-radio"></i> <span>이번 달</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div
								class="js-filter-button extend-task-check-text seach-check-text">
								<p>
									<i class="js-common-radio"></i> <span>기간설정</span>
								</p>
							</div>
							<div class="extend-task-calendar com-calendar d-none">
								<div class="search-filter-group">
									<div class="search-filter-item js-search-pickr-layer"
										data-code="thirdMonth">
										<div
											class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box active flatpickr-input"
											readonly="readonly">
											<span></span><input type="hidden" value=""> <label
												class="filter-date-label"><i class="icon-date"></i></label>
										</div>
										<div
											class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
											<span></span><input type="hidden" value=""> <label
												class="filter-date-label"><i class="icon-date"></i></label>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- // 전체 업무 -->
	</div>
</body>
</html>