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
					<img src="/flow-renewal/assets/images/flow_logo.png?height=20"
						alt="flow" srcset="" />
				</h1>
			</a>
		</div>
		<!-- 전체 일정 -->
		<ul id="calendarFilter"
			class="js-left-filter-ul menu-accordion-group scroll-mask d-none">
			<li>
				<div
					class="menu-accordion-button active left-menu-item js-left-filter-item">
					일정 <i class="ico-arrow"></i>
				</div>
				<div id="scheduleFilter" class="menu-accordion">
					<ul class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="0,1">
								<p>
									<i class="js-common-radio"></i> <span>전체</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="1">
								<p>
									<i class="js-common-radio"></i> <span>내 일정</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="0">
								<p>
									<i class="js-common-radio"></i> <span>등록한 일정</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="-1">
								<p>
									<i class="js-common-radio"></i> <span>선택안함</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
			<li>
				<div
					class="menu-accordion-button active left-menu-item js-left-filter-item">
					업무 <i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul id="taskFilter" class="menu-accordion-list">
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="2">
								<p>
									<i class="js-common-radio"></i> <span>전체</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="0">
								<p>
									<i class="js-common-radio"></i> <span>내 업무</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="1">
								<p>
									<i class="js-common-radio"></i> <span>요청한 업무</span>
								</p>
							</div>
						</li>
						<li class="left-menu-item">
							<div class="js-filter-button seach-check-text" gubun="-1">
								<p>
									<i class="js-common-radio"></i> <span>선택안함</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- // 전체 일정 -->
	</div>
</body>
</html>