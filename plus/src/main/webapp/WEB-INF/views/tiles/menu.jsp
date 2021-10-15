<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="inviteEmployeeLayer" class="flow-all-background-1"
		style="display: none;">
		<div class="flow-project-make-1">
			<div class="flow-project-make-2">
				<div id="firstInvitePopup"
					class="js-invite-employee-layer popup-notice-employee"
					style="display: none">
					<div class="contents">
						<strong class="tit">직원 초대</strong> <a
							class="close-invite-layer-btn js-close-btn" href="#"><em></em></a>
						<p class="txt">플로우에서 직원들과 협업을 시작해보세요.</p>
						<img src="/flow-renewal/assets/images/invite_url.png">
						<div class="url-area">
							<span class="invite-url js-link-text"></span>
							<button id="copyLinkBtn" type="button" class="copy-url-button">
								링크 복사</button>
						</div>
						<a id="otherInviteBtn" class="other-invite">다른 방법으로 초대하기 (이메일,
							엑셀 등록)</a>
					</div>
					<div id="popupBottom" class="bottom">
						<div id="notViewToday" class="check-box">
							<input type="checkbox" id="chk3"> <label for="chk3"></label>
							오늘 하루 다시 보지 않기
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="leftArea" class="main-header-1">

		<!--
         *** 클래스 left-btn-filter 디폴트값 open
         *** 클릭 이벤트 시 클래스 close로 변경
         *** 클릭 이벤트 시 span 텍스트 닫기로 변경
         -->
		<a href="#" id="leftFilterBtn" class="left-btn-filter open d-none"
			style="display: none;"> <i class="icon-filter"></i> <span>열기</span>
		</a>


		<!--
         *** 클래스 left-task 디폴트값 active
         *** left-btn-filter 클릭 이벤트 시 left-task 클래스 active 삭제
         *** left-filter 클래스 active 추가
         -->
		<div id="leftTask" class="left-task active">
			<div class="logo-area">
				<a class="js-logo logo-box">
					<h1 class="logo-1">
						<img src="/flow-renewal/assets/images/flow_logo.png?height=20"
							alt="flow" srcset="">
					</h1>
				</a>
			</div>
			<a href="#" class="js-left-menu">
				<div id="projectMakeButton" class="new-project-1">
					<div class="button-suport-1"></div>
					새 프로젝트
				</div>
			</a>
			<ul id="leftMenuUl" class="menu-group js-left-menu mgt-20">
				<li data-code="main" class="left-menu-item flow-active"><a
					href="#"> <i class="ico-home"></i>내 프로젝트 <em
						id="leftProjectHomeCount"
						class="js-project-home-count project-total-count d-none"
						style="display: none;">0</em>
				</a></li>
				<li data-code="open" class="left-menu-item d-none"
					style="display: none;"><a href="#"> <i class="ico-search"></i>회사
						공개 프로젝트
				</a></li>
				<li data-code="nokeep" class="left-menu-item d-none"><a
					href="#"><i class="ico-not-kept"></i>미분류</a></li>
				<li data-code="unread" class="left-menu-item d-none"><a
					href="#"><i class="ico-letter"></i>미확인 <em
						id="unreadProjectHomeCount"
						class="js-project-home-count project-total-count d-none"
						style="display: none;">0</em> </a></li>
				<li data-code="star" class="left-menu-item d-none"><a href="#"><i
						class="ico-favorite"></i>즐겨찾기</a></li>
				<li data-code="hidden" class="left-menu-item d-none"><a
					href="#"><i class="ico-hide"></i>숨김</a></li>
				<li class="js-project-more-button left-menu-item"
					data-code="project-more"><a href="#"> <i class="ico-more"></i>더보기
				</a>
					<ul
						class="js-project-more-layer check-menu-popup left-more-menu d-none">
						<li>
							<button data-code="nokeep" type="button" class="left-menu-item">
								<i class="ico-not-kept"></i>미분류
							</button>
						</li>
						<li>
							<button data-code="unread" type="button" class="left-menu-item">
								<i class="ico-letter"></i>미확인 <em id="unreadProjectHomeCount"
									class="js-project-home-count project-total-count d-none"
									style="display: none;">0</em>
							</button>
						</li>
						<li>
							<button data-code="star" type="button" class="left-menu-item">
								<i class="ico-favorite"></i>즐겨찾기
							</button>
						</li>
						<li>
							<button type="button" data-code="hidden" class="left-menu-item">
								<i class="ico-hide"></i>숨김
							</button>
						</li>
					</ul></li>
			</ul>
			<ul id="leftScroll" class="menu-accordion-group scroll-mask">
				<li>
					<div class="menu-accordion-button active left-menu-item"
						data-code="collect-more">
						모아보기<i class="ico-arrow"></i>
					</div>
					<div class="menu-accordion">
						<ul class="menu-accordion-list">
							<li data-code="task" class="left-menu-item"><a href="#"><i
									class="ico-task"></i>전체 업무 </a></li>
							<li data-code="gantt" class="left-menu-item" id="leftMenuGantt"
								style="display: block;"><a href="#"><i
									class="ico-ganttchart"></i>간트차트</a></li>
							<li data-code="schd" class="left-menu-item"><a href="#"><i
									class="ico-schedule"></i>캘린더</a></li>
							<li data-code="file" class="left-menu-item"><a href="#"><i
									class="ico-filebox"></i>파일함</a></li>
							<li data-code="bookmark" class="left-menu-item"><a href="#"><i
									class="ico-bookmark"></i>북마크</a></li>
							<li data-code="mention" class="left-menu-item"><a href="#"><i
									class="ico-mention"></i>나를 언급</a></li>
							<li data-code="mypost" class="left-menu-item"><a href="#"><i
									class="ico-my-write"></i>내 게시물</a></li>
						</ul>
					</div>
				</li>
				<li class="d-none" style="display: block;">
					<div id="RecentProjectButton"
						class="menu-accordion-button left-menu-item active"
						data-code="recent-project-more">
						최근 업데이트 <i class="ico-arrow"></i>
					</div>
					<div class="menu-accordion">
						<ul id="RecentProjectUl" class="menu-accordion-list d-none"
							style="display: block;">
							<li class="recent-project-item" data-project-srno="1072161"
								data-color-code="2">
								<div class="squre-type color-code-2 ">
									<div class=""></div>
								</div> <span class="js-mouseover ellipsis" mouseover-text="1:1 문의하기">1:1
									문의하기</span>
							</li>

							<li class="recent-project-item" data-project-srno="1072160"
								data-color-code="0">
								<div class="squre-type color-code-0 ">
									<div class=""></div>
								</div> <span class="js-mouseover ellipsis" mouseover-text="플로우 이용 가이드">플로우
									이용 가이드</span>
							</li>
						</ul>

						<!-- active 추가시 접기로 단어 변경 -->
					</div>
				</li>
				<li>
					<div id="allLabelLeftButton"
						class="menu-accordion-button left-menu-item active"
						data-code="label-more" data-select-label-srno=""
						data-select-label-name="">
						프로젝트 폴더
						<button class="js-label-add label-add-button">
							<i class="ico-plus"></i>
						</button>
						<i class="ico-arrow"></i>
					</div>
					<div class="menu-accordion">
						<ul id="allLabelUl" class="menu-accordion-list d-none ui-sortable"
							style="display: block;">
							<li id="label-1" label-srno="1" class="label-item "><i
								class="ico-label"></i> <span
								class="js-label-name js-mouseover ellipsis" mouseover-text="마케팅">마케팅</span>
								<a href="#" class="js-label-setting-button flow-dash-three">
									<div></div>
									<div></div>
									<div></div>
							</a></li>

							<li id="label-2" label-srno="2" class="label-item "><i
								class="ico-label"></i> <span
								class="js-label-name js-mouseover ellipsis" mouseover-text="디자인">디자인</span>
								<a href="#" class="js-label-setting-button flow-dash-three">
									<div></div>
									<div></div>
									<div></div>
							</a></li>

							<li id="label-3" label-srno="3" class="label-item "><i
								class="ico-label"></i> <span
								class="js-label-name js-mouseover ellipsis"
								mouseover-text="엔지니어링">엔지니어링</span> <a href="#"
								class="js-label-setting-button flow-dash-three">
									<div></div>
									<div></div>
									<div></div>
							</a></li>
						</ul>
					</div>
				</li>
			</ul>
			<div
				class="js-label-setting-layer setting-popup flow-small-layer-1 cursor-pointer"
				style="display: none">
				<div class="label-edit flow-name-size">
					<i></i><a href="#"><span>수정</span></a>
				</div>
				<div class="label-delete flow-dash-icon">
					<i></i><a href="#"><span>삭제</span></a>
				</div>
			</div>
			<ul id="leftBottomUl" class="menu-group admin">
				<li data-code="invite-member"
					class="d-none js-invite-employee-button left-menu-item"
					style="display: none;"><a href="#"><i class="ico-invite"></i>직원
						초대</a></li>
				<li data-code="manager-admin" class="d-none left-menu-item"
					style="display: none;"><a href="#"><i class="ico-admin"></i>어드민</a>
				</li>
				<li data-code="service-upgrade" class="d-none left-menu-item"
					style="display: block;"><a href="#"> <span
						class="ico-flow"><span class="path1"></span><span
							class="path2"></span><span class="path3"></span><span
							class="path4"></span><span class="path5"></span><span
							class="path6"></span><span class="path7"></span><span
							class="path8"></span></span>서비스 업그레이드
				</a></li>
			</ul>
		</div>

		<div id="leftFilter" class="left-filter">
			<div class="logo-area">
				<a class="js-logo logo-box">
					<h1 class="logo-1">
						<img src="/flow-renewal/assets/images/flow_logo.png?height=20"
							alt="flow" srcset="">
					</h1>
				</a>
			</div>
			<!-- 전체 업무 -->
			<ul id="allTaskFilter"
				class="menu-accordion-group scroll-mask js-left-filter-ul d-none"
				style="display: none;">
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
										<i class="js-search-checkbox"></i> <span
											class="state progress">진행</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" status-filter="4">
									<p>
										<i class="js-search-checkbox"></i> <span
											class="state feedback">피드백</span>
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
				<li id="taskEndDateFilter" class="js-filter-type"
					filter-type="radio">
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

			<!-- 전체 일정 -->
			<ul id="calendarFilter"
				class="js-left-filter-ul menu-accordion-group scroll-mask d-none"
				style="display: none;">
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

			<!-- 전체 파일 -->
			<ul id="fileFilter"
				class="js-left-filter-ul menu-accordion-group scroll-mask d-none"
				style="display: none;">
				<li>
					<div
						class="js-accordion-button menu-accordion-button active left-menu-item">
						파일종류 <i class="ico-arrow"></i>
					</div>
					<div class="menu-accordion">
						<ul class="menu-accordion-list">
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="TOTAL">
									<p>
										<i class="js-common-radio all-checked"></i> <span
											class="file all">전체</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="CLOUD">
									<p>
										<i class="js-common-radio"></i> <span class="file cloud">클라우드</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="PDF">
									<p>
										<i class="js-common-radio"></i> <span class="file pdf">PDF</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="WORD">
									<p>
										<i class="js-common-radio"></i> <span class="file word">워드</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="EXCEL">
									<p>
										<i class="js-common-radio"></i> <span class="file excel">엑셀</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="HWP">
									<p>
										<i class="js-common-radio"></i> <span class="file hwp">한글</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="PPT">
									<p>
										<i class="js-common-radio"></i> <span class="file power-point">파워포인트</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="IMG">
									<p>
										<i class="js-common-radio"></i> <span class="file image">이미지</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="MEDIA">
									<p>
										<i class="js-common-radio"></i> <span class="file music-media">음악・동영상</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="HTML">
									<p>
										<i class="js-common-radio"></i> <span class="file html">HTML</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text"
									file-type="AUTOCAD">
									<p>
										<i class="js-common-radio"></i> <span class="file cad">CAD</span>
									</p>
								</div>
							</li>
							<li class="left-menu-item">
								<div class="js-filter-button seach-check-text" file-type="ZIP">
									<p>
										<i class="js-common-radio"></i> <span class="file zip">압축파일</span>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</li>
			</ul>
			<!-- // 전체 파일 -->
		</div>
	</div>
</body>
</html>