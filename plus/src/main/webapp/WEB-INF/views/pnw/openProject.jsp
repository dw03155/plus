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
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="openProjectLayer" class="small-style-wrap d-none"
				style="display: none;">
				<div class="open-search-area">
					<div class="project-search-area all-file-header-type-3">
						<div class="project-search">
							<i class="icons-search"></i> <input id="openProjectSearchInput"
								type="text" placeholder="검색어를 입력해주세요"
								class="project-search-input" autocomplete="off" maxlength="50">
							<div id="" class="name-type-seach-popup d-none"
								style="top: 28px; left: 300px;">
								<p>옵션</p>
								<div class="detail-search-conditions">
									<ul class="conditions-group">
										<li class="js-project-name-search-filter">
											<div class="condition-cell title">프로젝트</div>
											<div class="condition-cell">
												<input type="text" placeholder="프로젝트명 입력">
											</div>
										</li>
										<li class="js-register-name-search-filter">
											<div class="condition-cell title">작성자</div>
											<div class="condition-cell">
												<input type="text" placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)">
											</div>
										</li>
										<li class="js-period-type-search-filter">
											<div class="condition-cell title">검색기간</div>
											<div class="condition-cell">
												<ul class="target-select-group">
													<li><input type="radio" name="period-type"
														id="searchToday" class="radio-input"> <label
														for="searchToday"
														class="js-period-type radio-label-checkbox"
														data-code="today">오늘</label></li>
													<li><input type="radio" name="period-type"
														id="searchOneWeek" class="radio-input"> <label
														for="searchOneWeek"
														class="js-period-type radio-label-checkbox"
														data-code="week"> 7일 </label></li>
													<li><input type="radio" name="period-type"
														id="searchOneMonth" class="radio-input"> <label
														for="searchOneMonth"
														class="js-period-type radio-label-checkbox"
														data-code="month"> 1개월 </label></li>
													<li><input type="radio" name="period-type"
														id="searchThreeMonth" class="radio-input"> <label
														for="searchThreeMonth"
														class="js-period-type radio-label-checkbox"
														data-code="thirdMonth"> 3개월 </label></li>
													<li><input type="radio" name="period-type"
														id="searchSixMonth" class="radio-input"> <label
														for="searchSixMonth"
														class="js-period-type radio-label-checkbox"
														data-code="sixthMonth"> 6개월 </label></li>
													<li><input type="radio" name="period-type"
														id="searchOneYear" class="radio-input"> <label
														for="searchOneYear"
														class="js-period-type radio-label-checkbox"
														data-code="year"> 1년 </label></li>
													<!--
                                        <li>
                                            <input type="radio" name="search-period" id="dateSelect"
                                                   class="radio-input"/>
                                            <label for="dateSelect" class="radio-label-checkbox"></label>
                                            <label class="search-date-select">
                                                <label class="search-date-select delete">
                                                <input
                                                        type="text"
                                                        name="search-period"
                                                        class="flatpickr flatpickr-input"
                                                        placeholder="기간선택"
                                                        readonly="readonly"
                                                />
                                            </label>
                                        </li>
                                        -->
												</ul>
											</div>
										</li>
										<li class="js-tmpl-type-search-filter">
											<div class="condition-cell title">대상</div>
											<div class="condition-cell">
												<ul class="target-select-group">
													<li class="js-total-tmpl-type"><input type="radio"
														name="tmpl-type" id="searchTargetTotalTmplType"
														class="radio-input"> <label
														for="searchTargetTotalTmplType"
														class="js-tmpl-type radio-label-checkbox" data-code="">전체</label>
													</li>
													<li><input type="radio" name="tmpl-type"
														id="searchTargetWrite" class="radio-input"> <label
														for="searchTargetWrite"
														class="js-tmpl-type radio-label-checkbox" data-code="1">글</label>
													</li>
													<li><input type="radio" name="tmpl-type"
														id="searchTargetTask" class="radio-input"> <label
														for="searchTargetTask"
														class="js-tmpl-type radio-label-checkbox" data-code="4">업무</label>
													</li>
													<li><input type="radio" name="tmpl-type"
														id="searchTargetCalendar" class="radio-input"> <label
														for="searchTargetCalendar"
														class="js-tmpl-type radio-label-checkbox" data-code="3">일정</label>
													</li>
													<li><input type="radio" name="tmpl-type"
														id="searchTargetTodo" class="radio-input"> <label
														for="searchTargetTodo"
														class="js-tmpl-type radio-label-checkbox" data-code="2">할
															일</label></li>
												</ul>
											</div>
										</li>
									</ul>
									<div class="condition-button-area">
										<div class="condition-left">
											<button type="button" class="js-filter-reset condition-reset">초기화</button>
										</div>
										<div class="condition-right">
											<button class="js-filter-cancel condition-button cancel">취소</button>
											<button class="js-filter-search condition-button search">검색</button>
										</div>
									</div>
								</div>
							</div>
						</div>
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
								<li>
									<button type="button" class="public-project-item active">전체</button>
								</li>
							</ul>
						</div>
					</div>
					<div class="section-wrap">
						<div class="section-2">
							<div class="public-title-area">
								<span id="openProjectCategoryName" class="public-project-title"></span><em
									id="openProjectTotalCount" class="public-count"></em>
							</div>
						</div>
						<div id="openProjectScroll" class="layer-scroll type4">
							<ul id="openProjectList"
								class="section-list-1 project-list-setion"></ul>
						</div>
					</div>
				</div>
			</div>
			<div id="categoryFirstItem" class="d-none">
				<li value="ALL" class="category-item">
					<button type="button" class="public-project-item active">전체</button>
				</li>
			</div>
			<div id="categoryItem" class="d-none">
				<li value="{category-srno}" class="category-item">
					<button type="button" class="public-project-item">{category-name}</button>
				</li>
			</div>
			<div id="projectItem" class="d-none">
				<li value="{project-srno}" class="project-item"
					data-project-info="{project-info}"><a href="#">
						<div class="project-wr">
							<span class="project-ttl">{project-name}</span>
							<div class="flow-content-hm-txt">
								<i class="icons-person-2"></i>
							</div>
							<em class="participant-count"> {project-participant} </em> <em
								class="manager">{project-manager}</em> <em class="manager-name">{project-manager-name}</em>
							<em class="badge-join" {join-display}="">참여중</em>
							<p class="project-ttl-sub">{CNTN}</p>
						</div>
				</a></li>
			</div>
		</div>
	</div>
</body>
</html>