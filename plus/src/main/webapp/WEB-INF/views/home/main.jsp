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
                <div id="newUpdate" class="post-update-button-area d-none" style="display: none;">
                    <button type="button" class="post-update-button">새 글 업데이트</button>
                </div>
                
    
    
    
    
    
    
    
    
    
    <div id="searchResult" class="all-search-section d-none" style="display: none;">
        <div id="topSettingBar" class="main-header">
            <div class="title-1" style="display: block">"<em id="searchWord"></em>" 검색 결과</div>
            <button id="searchResultClose" type="button" class="close-button">
                <span class="blind">닫기</span>
            </button>
        </div>
        <div class="project-detail-top clearfix">
            <ul id="searchTab" class="project-detail-menu">
                <li class="js-tab-item active" data-code="total">
                    <a>전체</a>
                </li>
                <li class="js-tab-item" data-code="project">
                    <a>프로젝트</a>
                </li>
                <li class="js-tab-item" data-code="post">
                    <a>글 · 댓글</a>
                </li>
                <li class="js-tab-item" data-code="file">
                    <a>파일</a>
                </li>
            </ul>
        </div>
        <div class="all-search-container">
            <div id="searchEventArea" class="all-search-content scroll-mask">
                <div id="projectSearchArea" class="search-result-group ">
                    <div class="search-title-area">
                        <span class="search-result-title">프로젝트</span>
                        <span id="projectSearchCount" class="search-result-count"></span>
                    </div>
                    <ul id="projectSearchResult" class="scroll-mask all-seach-list-type-1"></ul>
                    <button id="projectSearchMore" type="button" class="js-search-more search-result-more" data-code="project">더보기
                    </button>
                </div>
                <div id="postSearchArea" class="search-result-group">
                    <div class="search-title-area">
                        <span class="search-result-title">글 · 댓글</span>
                        <span id="postSearchCount" class="search-result-count"></span>
                    </div>
                    <ul id="postSearchResult" class="scroll-mask all-seach-list-type-1"></ul>
                    <button id="postSearchMore" type="button" class="js-search-more search-result-more" data-code="post">
                        더보기
                    </button>
                </div>
                <div id="fileSearchArea" class="search-result-group">
                    <div class="search-title-area">
                        <span class="search-result-title">파일</span>
                        <span id="fileSearchCount" class="search-result-count"></span>
                    </div>
                    <ul id="fileSearchResult" class="scroll-mask all-seach-list-type-1"></ul>
                    <button id="fileSearchMore" type="button" class="js-search-more search-result-more" data-code="file">
                        더보기
                    </button>
                </div>
            </div>
            <div id="searchFilter" class="all-search-filter" data-search-area-code="IN_TONG">
                <form action="">
                    <fieldset>
                        <legend class="blind">Search Form</legend>
                        <dl class="search-filter-group">
                            <dt>검색 필터</dt>
                            <dd class="search-filter-item js-search-pickr-layer">
                                <p>검색기간</p>
                                <div class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                                <div class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                            </dd>
                            <dd class="js-project-name-search-filter d-none search-filter-item">
                                <p>프로젝트</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="프로젝트명 입력" type="text">
                                </div>
                            </dd>
                            <dd class="js-register-name-search-filter d-none search-filter-item">
                                <p>작성자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="작성자 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-participant-name-search-filter d-none search-filter-item">
                                <p>참여자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="참여자 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-tmpl-type-search-filter d-none search-filter-item">
                                <p>대상</p>
                                <ul class="target-select-group"></ul>
                            </dd>
                            <dd class="js-file-type-search-filter d-none search-filter-item">
                                <p>파일종류</p>
                                <ul class="target-select-group"></ul>
                            </dd>
                        </dl>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <div id="projectSearchResultItem" class="d-none">
        <li class="project-search-item js-search-item" data-code="project" colabo_srno="{COLABO_SRNO}">
            <div class="search-project color-code-{BG_COLOR_CD}"></div>
            <a href="#" class="js-star-button">
                <div class="js-star-icon seach-star-type-1 {unstar_class}"></div>
            </a>
            <a href="#" class="search-tit">
                <em class="seach-text-type-1">{TTL}</em>
            </a>
        </li>
    </div>
    <div id="postSearchResultItem" class="d-none">
        <li class="post-search-item js-search-item" data-code="post" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
            <i class="icon-post-type {post_class}"></i>
            <div class="search-sub-text-wrap">
                <a href="#" class="search-text-type-3 contents-tit">
                    <p><span class="post-name-txt">{post_name}</span>{contents}</p>
                </a>
                <p class="search-text-type-3 contents-project">
                    <span class="search-name ellipsis">{RGSR_NM}</span> <span class="date">{date}</span><em class="project-title ellipsis"><i class="seach-type-2"></i>{TTL}</em>
                </p>
            </div>
    
        </li>
    </div>
    <div id="fileSearchResultItem" class="d-none">
        <li class="file-search-item js-search-item" data-code="file" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" colabo_remark_srno="{COLABO_REMARK_SRNO}" use_intt_id="{USE_INTT_ID}" atch_srno="{ATCH_SRNO}" rand_key="{RAND_KEY}" file_type="{FILE_TYPE}" orcp_file_nm="{data_file_name}" file_size="{FILE_SIZE}" file_strg_path="{FILE_STRG_PATH}" img_path="{FILE_STRG_PATH}" thum_img_path="{THUM_IMG_PATH}" height="{HEIGHT}" width="{WIDTH}" rgsr_nm="{RGSR_NM}" rgsn_dttm="{RGSN_DTTM}">
            <i class="icon-file-type {file_class}"></i>
            <div class="search-sub-text-wrap">
                <a href="#" class="search-text-type-3 contents-tit">
                    <p>{ORCP_FILE_NM}<em class="file-size-txt">{size}</em></p>
                </a>
                <p class="search-text-type-3 contents-project">
                    <span class="search-name ellipsis">{RGSR_NM}</span> <span class="date">{date}</span><em class="project-title ellipsis"><i class="seach-type-2"></i>{TTL}</em>
                </p>
            </div>
            <button type="button" class="js-download all-search-download">
                <i></i>
                <span>다운로드</span>
            </button>
    
        </li>
    </div>
    <div id="allPostItem" class="d-none">
        <li id="allPosts-{COLABO_COMMT_SRNO}" class="js-all-post-item post-search-item post-list-wrapper" tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
            <div class="fixed-kind">
                <i class="icons-{post-gb}"></i>
                <span class="post-type">{post-name}</span>
            </div>
            <div class="search-sub-text-wrap">
                <div class="contents-cmt">
                    <p class="search-text-type-3 contents-tit">{first-contents}</p>
                    <div class="post-list comment" {remark-display}="">
                        <i class="icons-comment2"></i>
                        <span class="js-post-comment-count">{REMARK_CNT}</span>
                    </div>
                </div>
                <p class="search-text-type-3 contents-project">
                    <em class="ellipsis"><i class="seach-type-2"></i>{COLABO_TTL}</em>
                </p>
            </div>
            <div class="post-list-right">
                <div class="post-list name">{name}</div>
                <div class="post-list date">{date}</div>
                <!--
                <div class="fixed-value">
                    <span class="state request" {todo-display}>{TODO_DONE_PERCENT}</span>
                    <span class="js-task-state state {status-code}" {task-display}>{status}</span>
                    <div class="date-time" {schedule-display}>
                        <em class="date">{start-date}</em>
                        <span>{start-time}</span>
                    </div>
                </div>
                -->
            </div>
        </li>
    </div>
    <div id="allPostSearchItem" class="d-none">
        <li class="js-all-post-item post-search-item js-search-item" tmpl_type="{TMPL_TYPE}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" colabo_remark_srno="{COLABO_REMARK_SRNO}" rgsn_dttm="{RGSN_DTTM}">
            <i class="icon-post-type {post-gb}"></i>
            <div class="search-sub-text-wrap">
                <a href="#" class="search-text-type-3 contents-tit">
                    <p><span class="post-type">{post-name}</span>{first-contents}</p>
                </a>
                <p class="search-text-type-3 contents-project">
                    <span class="search-name ellipsis">{name}</span> <span class="date">{date}</span><em class="project-title ellipsis"><i class="icons-project-1"></i>{COLABO_TTL}</em>
                </p>
            </div>
    
        </li>
    </div>
                
    
    
    
    
    
    
    
    
    <div id="totalProjectEditBar" class="top-banner-1 top-select" style="display: none">
        <div class="top-banner-2">
            <ul id="totalEditButton" class="total-edit-group">
                <li class="edit-button color"><a href="#" class="top-banner-icon-type-1">
                    <em></em>색상 설정</a></li>
                <li class="edit-button label"><a href="#" class="top-banner-icon-type-2">
                    <em></em>프로젝트 폴더 설정</a></li>
                <li class="edit-button push"><a href="#" class="top-banner-icon-type-3">
                    <em></em>알림 설정</a></li>
                <li class="edit-button hidden js-hidden"><a href="#" class="top-banner-icon-type-4">
                    <em></em>숨김</a></li>
                <li class="edit-button hidden js-cancel-hidden"><a href="#" class="top-banner-icon-type-4">
                    <em></em>숨김 취소</a></li>
            </ul>
            <div id="totalEditSelect" class="menu-text-popup-1">
                <span class="select-count"></span>
                <em class="select-clear">선택취소</em>
            </div>
        </div>
        <a href="#" id="editBarCloseButton" class="main-container-close-button-1"></a>
    </div>
    <div id="topSettingBar" class="main-header">
        <div id="mainTop" class="title-1 d-none" data-code="main" style="display: block;"><div>내 프로젝트</div></div>
    
        
        <span id="allCollectionCount" class="js-collection-total-count js-collection-count top-task-num" style="display: none;"></span>
        
    
        <div id="projectHomeTop" class="main-sub-header d-none" style="display: block;">
            <div class="home-menu clearfix">
                <div class="home-menu-left">
                    <a href="#">
                        <div id="BoardTypeButton" class="menu-select-icon-type-1 type-button js-mouseover on" mouseover-text="바둑판형">
                        </div>
                    </a>
                    <a href="#">
                        <div id="ListTypeButton" class="menu-select-icon-type-2 type-button js-mouseover" mouseover-text="리스트형">
                        </div>
                    </a>
                </div>
                <div class="home-menu-right">
                    <a href="#" id="projectOrderButton" class="js-project-order-button project-order-button">
                        <div id="projectOrderList" class="js-project-order-layer menu-popup-layer-1" style="display: none;">
                            <ul class="menu-popup-t-1">
                                <li class="order-item" code="0"><i></i><span>최신 순(글/댓글)</span></li>
                                <li class="order-item" code="1"><i></i><span>내가 작성한 순 (글/댓글)</span></li>
                                <li class="order-item" code="2"><i></i><span>오름차순(ㄱ~ㅎ)</span></li>
                                <li class="order-item" code="3"><i></i><span>내림차순 (ㅎ~ㄱ)</span></li>
                            </ul>
                            <ul class="menu-popup-t-2">
                                <li class="filter-item" code="0"><i></i><span>내가 참여중인 프로젝트</span></li>
                                <li class="filter-item" code="1"><i></i><span>내가 관리자인 프로젝트</span></li>
                            </ul>
                        </div>
                        <i class="menu-select-icon-type-3"></i>
                        <div class="menu-select-icon-type-4-text">정렬</div>
                    </a>
                    <a href="#" id="totalProjectEditButton" class="project-edit-button">
                        <div class="menu-select-icon-type-4"></div>
                        <span class="menu-select-icon-type-4-text">설정</span>
                    </a>
                </div>
            </div>
        </div>
        <div id="detailTop" class="project-detail title-1 d-none" style="display: none;">
            <div class="project-detail-header">
                <div class="project-color-area">
                    <i id="projectColor" class="project-color color-code-2"></i>
                </div>
                <div class="project-header-group">
                    <div class="project-title-area">
                        <div class="project-option-area">
                            <button id="projectStar" class="bookmark-button unstar">
                                <span class="blind">즐겨찾기</span>
                            </button>
                            <button id="detailSettingTopButton" class="set-btn">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <div id="detailSettingLayer" class="project-setup-wrap" style="display: none">
                                <div class="project-setup-header">
                                    <span>프로젝트 번호</span>
                                    <em id="detailSettingProjectSrno"></em>
                                </div>
                                <ul id="detailSettingGroup" class="setup-group">
                                    <li id="detailSettingColorBtn">
                                        <a href="#"> <i class="icon-set-color"></i>색상 설정</a>
                                    </li>
                                    <li id="detailSettingLabelBtn">
                                        <a href="#"> <i class="icon-set-label"></i>프로젝트 폴더 설정
                                        </a>
                                    </li>
                                    <li id="detailSettingPushAlarmBtn">
                                        <a href="#"> <i class="icon-set-alarm"></i>알림 설정</a>
                                    </li>
                                    <li id="detailSettingHideBtn">
                                        <a id="hideText" href="#"> <i class="icon-set-hide"></i></a>
                                    </li>
                                    <li id="detailSettingProjectExitBtn">
                                        <a href="#"> <i class="icon-set-out"></i>프로젝트 나가기</a>
                                    </li>
                                    <li id="detailSettingProjectUpdateBtn">
                                        <a href="#"> <i class="icon-set-modify"></i>프로젝트 수정</a>
                                    </li>
                                    <li id="detailSettingProjectDeleteBtn">
                                        <a href="#"> <i class="icon-set-delete"></i>프로젝트 삭제</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h3 id="projectTitle" class="project-title ellipsis js-mouseover" mouseover-text=""></h3>
                        <ul class="project-status-group">
                            <li id="lockIcon" class="d-none">
                                <i class="sprite-detail icon-locked js-icon-locked"><span class="blind">관리자 승인 필요</span></i>
                                <div class="tooltip-square">
                                    <em class="tooltip-title">관리자 승인 필요</em>
                                    <p class="tooltip-text">프로젝트 관리자의 승인 후 참여가 가능한 프로젝트입니다.</p>
                                </div>
                            </li>
                            <li id="companyIcon" class="d-none">
                                <i class="sprite-detail icon-company js-icon-company"><span class="blind">회사 프로젝트</span></i>
                                <div class="tooltip-square">
                                    <em class="tooltip-title">회사 프로젝트</em>
                                    <p class="tooltip-text">회사 직원 모두가 자동 참여되는 프로젝트로 임의로 참여자를 내보내거나 외부 직원을 초대할 수 없습니다.</p>
                                </div>
                            </li>
                            <li id="openProjIcon" class="d-none">
                                <i class="sprite-detail icon-open-project js-icon-open-project"><span class="blind">회사 공개 프로젝트</span></i>
                                <div class="tooltip-square">
                                    <em class="tooltip-title">회사 공개 프로젝트</em>
                                    <p class="tooltip-text">우리 회사 직원이라면 누구나 직접 참여를 요청할 수 있습니다.</p>
                                </div>
                            </li>
                            <li id="unalarmIcon" class="d-none">
                                <i class="sprite-detail icon-unalarm js-icon-un-alarm"><span class="blind">푸시 알림 OFF</span></i>
                                <div class="tooltip-square">
                                    <em class="tooltip-title">푸시 알림 OFF</em>
                                    <p class="tooltip-text">휴대폰 푸시 또는 브라우저에 알림이 가지 않습니다. 프로젝트 [알림 설정]메뉴에서 변경할 수 있습니다.</p>
                                </div>
                            </li>
                            <li style="display:none">
                                <i class="icons-public"></i>
                            </li>
                            <li id="" style="display:none">
                                <span class="icon-out-display">외부</span>
                            </li>
                        </ul>
                    </div>
                    <div class="project-description">
                        <p id="projectContents" class="description-text">...</p>
                        <!--<div class="tooltip-square"></div>-->
                    </div>
                </div>
            </div>
            <button id="openInviteLayerBtn" type="button" class="project-invite-button color-type-1">
                <i class="icons-invite"></i>초대하기
            </button>
        </div>
    </div>
                <div id="mainContent" class="main-content scroll-mask" scroll-direction="0">
                    
    
    
    
    
    
    
    
    
    
    
    <div id="projectHomeLayer" class="project-home-wrap" style="display: block;">
        <div class="small-style-wrap">
            <div id="joinArea" style="display: none">
                <a href="#" id="joinProjectTopButton" class="content-group join-list-wr">
                    <span>가입요청</span><strong class="badge-count">0</strong>
                    <div class="givc-ico-1 down"></div>
                </a>
                <div id="joinProjectLayer" class="popup-group-1" style="display: none">
                    <div class="group-header"></div>
                    <div class="content-group-1">
                        <span>가입요청</span><strong class="badge-count">0</strong>
                        <div class="givc-ico-1"></div>
                    </div>
                    <ul id="joinProjectUl"></ul>
                </div>
            </div>
            <div class="section-wrap">
                <div id="BoardArea" class="project-board-wr" style="display: block;">
                    <div class="section-1">
                        <ul id="projectBoardUl" class="project-group clearfix">
                <div class="section-2 middle-line js-project-section js-label-section"><p class="project-class join">참여중</p></div>
                <li id="project-1072161" class="project-item ui-state-default" label-srnos="" project-srno="1072161">
                    <a href="#">
                        <div class="flow-content-ct project-badge" style="display:none" data="">0</div>
                        <button class="edit-check flow-content-chk" style="display: none"></button>
                        <div class="color-code left-menu-type-1 color-code-2" data-color="2"></div>
                        <div class="left-menu-type-con">
                            <div class="project-star flow-content-star flow-content-star-un"></div>
                            <div class="flow-content-txt project-ttl">1:1 문의하기</div>
                            <div class="flow-content-b-c">
                                <div class="flow-content-hm-txt"><i class="icons-person-2"></i></div>
                                <span class="member-cnt">2</span>
                                <div class="flow-content-fl-r">
                                    <div class="project-stat-ico flow-content-jms-ico js-mouseover" mouseover-text="관리자 승인 필요" style="display:none" data=""></div>
                                    <div class="project-stat-ico flow-content-bl-ico js-mouseover" mouseover-text="푸시 알림 OFF" style="display:none" data=""></div>
                                    <div class="project-stat-ico icon-open-project js-mouseover" mouseover-text="회사 공개 프로젝트" style="display:none" data=""></div>
                                    <div class="project-stat-ico icon-company js-mouseover" mouseover-text="회사 프로젝트" style="display:none" data=""></div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            
                
                <li id="project-1072160" class="project-item ui-state-default" label-srnos="" project-srno="1072160">
                    <a href="#">
                        <div class="flow-content-ct project-badge" style="display:none" data="">0</div>
                        <button class="edit-check flow-content-chk" style="display: none"></button>
                        <div class="color-code left-menu-type-1 color-code-0" data-color="0"></div>
                        <div class="left-menu-type-con">
                            <div class="project-star flow-content-star flow-content-star-un"></div>
                            <div class="flow-content-txt project-ttl">플로우 이용 가이드</div>
                            <div class="flow-content-b-c">
                                <div class="flow-content-hm-txt"><i class="icons-person-2"></i></div>
                                <span class="member-cnt">2</span>
                                <div class="flow-content-fl-r">
                                    <div class="project-stat-ico flow-content-jms-ico js-mouseover" mouseover-text="관리자 승인 필요" style="display:none" data=""></div>
                                    <div class="project-stat-ico flow-content-bl-ico js-mouseover" mouseover-text="푸시 알림 OFF" style="display:none" data=""></div>
                                    <div class="project-stat-ico icon-open-project js-mouseover" mouseover-text="회사 공개 프로젝트" style="display:none" data=""></div>
                                    <div class="project-stat-ico icon-company js-mouseover" mouseover-text="회사 프로젝트" style="display:none" data=""></div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
                    </div>
                </div>
                <div id="ListArea" class="project-list-wr" style="display: none">
                    <ul id="projectListUl"></ul>
                </div>
            </div>
            <ul id="allProjectBoardItem" style="display: none">
                {label}
                <li id="project-{project-number1}" class="project-item ui-state-default" label-srnos="{label_srnos}" project-srno="{project-number1}">
                    <a href="#">
                        <div class="flow-content-ct project-badge" {badge-display}="">{badge-count}</div>
                        <button class="edit-check flow-content-chk" style="display: none"></button>
                        <div class="color-code left-menu-type-1 color-code-{color-code}" data-color="{color-code}"></div>
                        <div class="left-menu-type-con">
                            <div class="project-star flow-content-star {star-class}"></div>
                            <div class="flow-content-txt project-ttl">{title}</div>
                            <div class="flow-content-b-c">
                                <div class="flow-content-hm-txt"><i class="icons-person-2"></i></div>
                                <span class="member-cnt">{member-count}</span>
                                <div class="flow-content-fl-r">
                                    <div class="project-stat-ico flow-content-jms-ico js-mouseover" mouseover-text="관리자 승인 필요" {manager-display}=""></div>
                                    <div class="project-stat-ico flow-content-bl-ico js-mouseover" mouseover-text="푸시 알림 OFF" {push-display}=""></div>
                                    <div class="project-stat-ico icon-open-project js-mouseover" mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
                                    <div class="project-stat-ico icon-company js-mouseover" mouseover-text="회사 프로젝트" {company-display}=""></div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <ul id="allProjectListItem" style="display: none">
                {label}
                <li id="project-{project-number2}" class="project-item ui-state-default" project-srno="{project-number2}" label-srnos="{label_srnos}">
                    <a href="#">
                        <button class="edit-check flow-content-chk d-none"></button>
                        <div class="color-code flow-content-list flow-content-po-t color-code-{color-code}" data-color="{color-code}"></div>
                        <div class="project-star flow-content-po-t {star2-class}"></div>
                        <span class="project-ttl">{title}</span>
                        <div class="flow-content-hm-txt"><i class="icons-person-2"></i></div>
                        <span class="member-cnt">{member-count}</span>
                        <strong class="project-badge" {badge-display}="">{badge-count}</strong>
                        <div class="flow-content-fl-r">
                            <div class="project-stat-ico flow-content-jms-ico js-mouseover" mouseover-text="관리자 승인 필요" {manager-display}=""></div>
                            <div class="project-stat-ico flow-content-bl-ico js-mouseover" mouseover-text="푸시 알림 OFF" {push-display}=""></div>
                            <div class="project-stat-ico icon-open-project js-mouseover" mouseover-text="회사 공개 프로젝트" {open-project-display}=""></div>
                            <div class="project-stat-ico icon-company js-mouseover" mouseover-text="회사 프로젝트" {company-display}=""></div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
                    <div id="allCollectView" class="all-collect-wrap d-none" style="height: 100%; display: none;">
                        <div id="mainScroll" class="main-scroll padding-left-right-30 type3">
                            
    
    
    
    
    
    
    
    
    
    <div class="allTaskLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="btns-wr">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input type="text" placeholder="업무명 또는 업무번호를 검색하세요!" autocomplete="off" maxlength="20" class="js-task-search-input project-search-input">
                    <button type="button" class="js-task-detail-search-button search-set-button">옵션</button>
                    <div class="js-task-detail-search-layer name-type-seach-popup d-none" data-search-area-code="IN_TASK" style="top: 40px; left: 0px;">
                        
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
            
            <ul class="btns-area">
                <li>
                    <button id="excelDownButton" class="task-nav-button task-excel-down">
                        <i class="icon-excel-download"></i>
                        다운로드
                    </button>
                </li>
                <li>
                    <button class="js-task-add-btn collect-add-button task-add-button"></button>
                </li>
                <li>
                    <button id="taskSettingButton" class="task-nav-button task-setting js-alltask-setting-button">
                        <i class="icon-setting"></i>
                    </button>
                    <ul class="js-alltask-setting-layer menu-popup-wrap">
                        <li id="bundleButton" class="js-task-bundle-button js-bundle-list">
                            <span>묶어보기</span><i class="icons-right-3"></i>
                        </li>
                        <li id="sortPopupButton">
                            <span>보기 설정</span>
                        </li>
                    </ul>
                    <ul id="bundleLayer" class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
                        <li class="js-bundle-li" view-gb="0">없음</li>
                        <li class="js-bundle-li" view-gb="1">상태</li>
                        <li class="js-bundle-li" view-gb="2">마감일</li>
                        <li class="js-bundle-li" view-gb="3">프로젝트</li>
                    </ul>
                </li>
            </ul>
            
        </div>
        <section class="all-task-seaction">
            <h3 class="blind">모든업무 목록</h3>
            <div id="taskSortHeader" class="all-task-header"></div>
            <ul id="taskContentUl" class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask"></ul>
        </section>
    </div>
                            
    
    
    
    
    
    
    
    
    
    
    <div class="allFileLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="btns-wr">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input type="text" placeholder="파일명을 검색해주세요!" autocomplete="off" maxlength="20" class="js-file-search-input project-search-input">
                    <button type="button" class="js-file-detail-search-button search-set-button">옵션</button>
                    <div class="js-file-detail-search-layer name-type-seach-popup d-none" data-search-area-code="IN_FILE" style="top: 40px; left: 0px;">
                        
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
            <div class="btns-area">
                <button id="allFileMoveButton">
                    <i class="icon-move"></i>
                    이동
                </button>
                <button id="fileDownloadButton">
                    <i class="icon-download"></i>
                    다운로드
                </button>
                <button id="allFileDeleteButton" class="task-setting">
                    <i class="icon-delete"></i>
                    폴더 삭제
                </button>
                <button id="addFolder" class="js-file-add-button collect-add-button"></button>
                <a href="#" id="changeListTypeButton" class="js-view-change-button">
                    <div class="js-all-file-type all-file-header-right-icon-type-5">
                        <span class="tooltip-square">리스트형</span>
                    </div>
                </a>
                <a href="#" id="changeBoardTypeButton" class="js-view-change-button all-file-board-margin">
                    <div class="js-all-file-type all-file-header-right-icon-type-4">
                        <span class="tooltip-square">바둑판형</span>
                    </div>
                </a>
            </div>
        </div>
        <div id="fileItemArea" class="all-file-area board">
            <div id="allFileSort" class="js-sort-layer all-file-list-setup-type-1">
                <div id="fileUploadSort" class="js-sort-file all-file-list-setup-1 check" data-sort-code="EDTR_DTTM">
                    <span>최근 업로드순</span><em></em></div>
                <div id="fileNameSort" class="js-sort-file all-file-list-setup-1" data-sort-code="ITEM_NM">
                    <span>파일명 순</span><em></em></div>
            </div>
            <ul id="fileItemUlHead" class="js-sort-layer file-item-head">
                <li>
                    <div class="js-sort-file all-file-list-name-type-1" data-sort-code="ITEM_NM">
                        <span class="all-file-list-sort ">파일명<em></em></span>
                    </div>
                    <div class="js-sort-file all-file-list-name-type-4" data-sort-code="SIZE">
                        <span class="all-file-list-sort">용량<em></em></span></div>
                    <div class="js-sort-file all-file-list-name-type-2" data-sort-code="RGSR_NM"><span class="all-file-list-sort">등록자<em></em></span>
                    </div>
                    <div class="js-sort-file all-file-list-name-type-3 check" data-sort-code="EDTR_DTTM"><span class="all-file-list-sort">등록일시<em></em></span></div>
                    <div class="js-sort-file all-file-list-sort all-file-list-name-type-5"></div>
                </li>
            </ul>
            <ul id="fileLayerUl" class="js-file-list-layer layer-scroll file-select-wrap scroll-mask"></ul>
        </div>
        <div id="fileLayerProjectMenu" class="all-file-header-left-type-1"></div>
    
        <ul id="boardTypeFileItem" style="display:none;">
            <li class="js-file-board js-selectable ui-selectee {download_yn}" rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}" width="{WIDTH}" height="{HEIGHT}" orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" img_path="{IMG_PATH}" atch_srno="{ATCH_SRNO}" use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}" file_size="{data_file_size}" rgsn_dttm="{rgsn_dttm}" file_index_code="{file_index_code}">
                <a href="#" class="all-file-type-check position-check-fix"></a>
                <a href="#" class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
                <a href="#">
                    <div class="file-extension {view_type_class_name}" {thumbnail_url}=""></div>
                </a>
                <div class="all-file-name all-file-round-bottom-section-1 js-mouseover" mouseover-text="{mouseover-text}">{ORCP_FILE_NM}
                </div>
            </li>
        </ul>
        <ul id="boardTypeFolderItem" style="display:none;">
            <li class="js-file-board js-folder js-selectable ui-selectee" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}">
                <a href="#" class="all-file-type-check position-check-fix"></a>
                <a href="#" class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
                <a href="#">
                    <div class="file-extension {view-type-class-name}"></div>
                </a>
                <div class="all-file-name all-file-round-bottom-section-1">{file-name}</div>
            </li>
        </ul>
    
        <ul id="listTypeFileItem" style="display:none;">
            <li class="js-file-list js-selectable ui-selectee {download_yn}" rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}" width="{WIDTH}" height="{HEIGHT}" orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" atch_srno="{ATCH_SRNO}" img_path="{IMG_PATH}" use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}" file_size="{data_file_size}" rgsn_dttm="{RGSN_DTTM}" file_index_code="{file_index_code}" project_title="{PROJECT_TITLE}">
                <div class="all-file-list-name-type-1-1 ellipsis">
                    <em class="all-file-type-check"></em>
                    <div class="all-file-type-icon-wrap-1">
                        <div class="file-extension {view_type_class_name}"></div>
                    </div>
                    <div class="all-file-name js-mouseover" mouseover-text="{mouseover-text}">
                        <div class="all-file-file-name">
                              <span>{ORCP_FILE_NM}</span>
                        </div>
                        <div class="all-file-project-title">
                             <i class="icons-project-1"></i> {PROJECT_TITLE}
                        </div>
                    </div>
    
    
                </div>
    
                <div class="all-file-list-name-type-4-1"><strong class="js-list-file-size">{file_size}</strong></div>
                <div class="all-file-list-name-type-2-1"><strong class="js-mouseover" mouseover-text="{RGSR_NM}">{RGSR_NM}</strong></div>
                <div class="all-file-list-name-type-3-1"><strong class="js-all-file-dttm">{date}</strong></div>
                <div class="js-file-menu all-file-plus-icon-image-type-1" style="display: none;"></div>
            </li>
        </ul>
        <ul id="listTypeFolderItem" style="display:none;">
            <li id="list-{folder-key}" class="js-file-list js-folder js-selectable ui-selectee" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}">
                <div class="all-forder-list-name-type-1-1">
                    <em class="all-file-type-check"></em>
                    <div class="all-file-type-icon-wrap-1">
                        <div class="file-extension {view-type-class-name}"></div>
                    </div>
                    <span class="all-file-name">{file-name}</span>
                </div>
                <div class="all-file-list-name-type-4-1"><strong>-</strong></div>
                <div class="all-file-list-name-type-2-1"><strong>{rgsr-nm}</strong></div>
                <div class="all-file-list-name-type-3-1"><strong>{rgsn-dttm}</strong></div>
                <div class="js-file-menu all-file-plus-icon-image-type-1" style="display: none;"></div>
            </li>
        </ul>
    
        <div id="fileMenuPopupItem" style="display: none;">
            <div class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
                <a href="#" id="downloadFile" class="js-file-menu-button">
                    <div class="download-file-button">
                        <i></i>
                        <span>다운로드</span>
                    </div>
                </a>
                <a href="#" id="viewerFile" class="js-file-menu-button">
                    <div class="viewer-file-button">
                        <i></i>
                        <span>열기</span>
                    </div>
                </a>
                <a href="#" id="moveFile" class="js-file-menu-button">
                    <div class="flow-name-move">
                        <i></i>
                        <span>이동</span>
                    </div>
                </a>
                <a href="#" id="nameChange" class="js-file-menu-button">
                    <div class="flow-name-size">
                        <i></i>
                        <span>이름 변경</span>
                    </div>
                </a>
                <a href="#" id="deleteFolder" class="js-file-menu-button">
                    <div class="flow-dash-icon">
                        <i></i>
                        <span>삭제</span>
                    </div>
                </a>
                <a href="#" id="detailFileView" class="js-file-menu-button">
                    <div class="detail-file-button">
                        <i></i>
                        <span>상세보기</span>
                    </div>
                </a>
            </div>
        </div>
    
        <ul id="fileLayerTitleItem" class="js-file-items-class">
            <a href="#" class="js-file-header" project-srno="{project-srno}" file-fld-srno="{file-fld-srno}">
                <em class="flow-content-circle-type-1 project-color {project-color}" {project-color-display}=""></em>
                <span class="js-all-file-project-title">{project-title}</span>
            </a>
        </ul>
    
        <ul id="headerFolderItem" class="js-file-items-class">
            <a href="#" id="folder-{file-fld-srno}" class="js-file-header" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" folder-depth="{folder-depth}">
                <em class="all-file-header-left-icon-type-3"></em>
                <span>{folder-name}</span>
            </a>
        </ul>
    
        <ul id="headerMoreItem" class="js-file-items-class">
            <a class="js-file-more-button">
                <div id="moreFolderButton" class="js-file-header all-file-plus-type-1">
                    <span>...</span>
                </div>
                <div id="moreFolderLayer" class="all-file-popup-type-1">
                    <ul clss="js-file-more-ul file-more-ul">
                        {more-folder-list}
                    </ul>
                </div>
            </a>
    
        </ul>
    
        <ul id="headerMorePopupLiItme" class="js-file-items-class">
            <li id="{file-fld-srno}" class="js-file-header all-file-popup-type-{folder-depth-class}" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" folder-depth="{folder-depth}">
                <i></i><em></em><span>{folder-name}</span></li>
        </ul>
    
        <div id="fileMovePopupItem" class="d-none">
            <div class="flow-all-background-1">
                <div class="flow-project-make-1">
                    <div class="flow-project-make-2">
                        <div class="flow-project-popup-8 js-file-move-popup">
                            <div class="flow-project-header-1">
                                <span>이동</span>
                                <a href="#" class="js-class-button flow-close-type-1"></a>
                            </div>
                            <div class="flow-content-type-2">
                                <ul id="moveFilePopupUl">
                                    <li id="movePopupProject" class="js-move-file-li file-move-project" colabo-srno="{colabo-srno}" file-fld-srno="-1">
                                        <div class="file-folder-div">
                                            <em class="flow-content-circle-type-1 {project-color}"></em>
                                            {project-title}
                                            <a href="#" class="js-file-move-check check-file-button"></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="flow-pop-button-type-2">
                                <a href="#">
                                    <div class="js-class-button flow-pop-sub-button-1">취소</div>
                                </a>
                                <a href="#">
                                    <div class="js-move-file-success flow-pop-sub-button-2">확인</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="fileMovePopupLiItem" class="d-none">
            <li class="file-folder js-move-file-li {popup-depth-class} {current-folder}" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}" data-depth="{folder-depth}">
                <div class="file-folder-div">
                    <i class="js-more-folder {last-fld}"></i>
                    <em></em>
                    <span>{folder-name}</span>
                    <a href="#" class="js-file-move-check check-file-button"></a>
                </div>
                <ul></ul>
            </li>
        </div>
    
        <div id="countLayerItem" class="d-none">
            <div class="js-file-count-layer all-file-alert-type-2"><span><span class="js-count-text">{count}</span>개 파일/폴더를 선택되었습니다.</span><em class="js-all-cancle-button">선택
                취소</em></div>
        </div>
    </div>
                            
    
    
    
    
    
    
    
    
    
    
    <div class="allCalendarLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="all-schedule">
            <div class="btns-wr">
                <div class="project-search-area all-file-header-type-3">
                    <div class="project-search">
                        <i class="icons-search"></i>
                        <input type="text" placeholder="일정 제목을 검색해주세요!" class="js-calendar-search-input project-search-input">
                    </div>
                </div>
                <div class="btns-area">
                    
                    
                    
                    <button id="scheduleAdd" type="button" class="collect-add-button" data-post-code="2"></button>
                </div>
            </div>
            <div class="all-calendar-wrap">
                <!-- calendar -->
                <div id="calendar" class="all-calendar all-calendar-nav layer-scroll"></div>
                <!-- calendar-popup -->
            </div>
        </div>
    </div>
                        </div>
                    </div>
                    
    
    
    
    
    
    
    
    
    <div id="openProjectLayer" class="small-style-wrap d-none" style="display: none;">
        <div class="open-search-area">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input id="openProjectSearchInput" type="text" placeholder="검색어를 입력해주세요" class="project-search-input" autocomplete="off" maxlength="50">
                    <div id="" class="name-type-seach-popup d-none" style="top: 28px; left: 300px;">
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
                                            <li>
                                                <input type="radio" name="period-type" id="searchToday" class="radio-input">
                                                <label for="searchToday" class="js-period-type radio-label-checkbox" data-code="today">오늘</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="period-type" id="searchOneWeek" class="radio-input">
                                                <label for="searchOneWeek" class="js-period-type radio-label-checkbox" data-code="week">
                                                    7일
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="period-type" id="searchOneMonth" class="radio-input">
                                                <label for="searchOneMonth" class="js-period-type radio-label-checkbox" data-code="month">
                                                     1개월
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="period-type" id="searchThreeMonth" class="radio-input">
                                                <label for="searchThreeMonth" class="js-period-type radio-label-checkbox" data-code="thirdMonth">
                                                      3개월
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="period-type" id="searchSixMonth" class="radio-input">
                                                <label for="searchSixMonth" class="js-period-type radio-label-checkbox" data-code="sixthMonth">
                                                      6개월
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" name="period-type" id="searchOneYear" class="radio-input">
                                                <label for="searchOneYear" class="js-period-type radio-label-checkbox" data-code="year">
                                                     1년
                                                </label>
                                            </li>
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
                                            <li class="js-total-tmpl-type">
                                                <input type="radio" name="tmpl-type" id="searchTargetTotalTmplType" class="radio-input">
                                                <label for="searchTargetTotalTmplType" class="js-tmpl-type radio-label-checkbox" data-code="">전체</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="tmpl-type" id="searchTargetWrite" class="radio-input">
                                                <label for="searchTargetWrite" class="js-tmpl-type radio-label-checkbox" data-code="1">글</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="tmpl-type" id="searchTargetTask" class="radio-input">
                                                <label for="searchTargetTask" class="js-tmpl-type radio-label-checkbox" data-code="4">업무</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="tmpl-type" id="searchTargetCalendar" class="radio-input">
                                                <label for="searchTargetCalendar" class="js-tmpl-type radio-label-checkbox" data-code="3">일정</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="tmpl-type" id="searchTargetTodo" class="radio-input">
                                                <label for="searchTargetTodo" class="js-tmpl-type radio-label-checkbox" data-code="2">할 일</label>
                                            </li>
                                            <li class="js-remark-tmpl-type">
                                                <input type="radio" name="tmpl-type" id="searchTargetRemark" class="radio-input">
                                                <label for="searchTargetRemark" class="js-tmpl-type radio-label-checkbox" data-code="-1">댓글</label>
                                            </li>
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
                <button id="leftArrowButton" type="button" class="public-arrow-btn left" style="display: none">
                </button>
                <button id="rightArrowButton" type="button" class="public-arrow-btn right" style="display: none">
                </button>
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
                        <span id="openProjectCategoryName" class="public-project-title"></span><em id="openProjectTotalCount" class="public-count"></em>
                    </div>
                </div>
                <div id="openProjectScroll" class="layer-scroll type4">
                    <ul id="openProjectList" class="section-list-1 project-list-setion"></ul>
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
        <li value="{project-srno}" class="project-item" data-project-info="{project-info}">
            <a href="#">
                <div class="project-wr">
                    <span class="project-ttl">{project-name}</span>
                    <div class="flow-content-hm-txt"><i class="icons-person-2"></i></div>
                    <em class="participant-count">
                        {project-participant}
                    </em>
                    <em class="manager">{project-manager}</em>
                    <em class="manager-name">{project-manager-name}</em>
                    <em class="badge-join" {join-display}="">참여중</em>
                    <p class="project-ttl-sub">{CNTN}</p>
                </div>
            </a>
        </li>
    </div>
    
                    
    
    
    
    
    
    
    
    <div id="allPostsLayer" class="me-post-wrap layer-scroll d-none" style="display: none;">
        <div class="my-search-area">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input id="allPostsSearchInput" type="text" placeholder="검색어를 입력해주세요!" class="project-search-input" autocomplete="off" maxlength="50">
                    <button id="allPostsDetailSearchTopButton" type="button" class="search-set-button">옵션</button>
                    <div id="allPostsDetailSearchLayer" class="name-type-seach-popup d-none" data-search-area-code="IN_POSTS" style="top: 40px; left: 0px;">
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
                                        <input type="text" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)">
                                    </div>
                                </li>
                                <li class="js-period-type-search-filter">
                                    <div class="condition-cell title">검색기간</div>
                                    <div class="condition-cell">
                                        <ul class="target-select-group"></ul>
                                    </div>
                                </li>
                                <li class="js-tmpl-type-search-filter">
                                    <div class="condition-cell title">대상</div>
                                    <div class="condition-cell">
                                        <ul class="target-select-group"></ul>
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
                <button type="button" class="js-search-back-button js-all-posts-back result-back-button d-none"><i class="icons-back"></i> 돌아가기</button>
            </div>
        </div>
        <div class="small-style-wrap-2">
            <div class="feed-content me-content">
                <div class="search-title-area">
                    <span id="allPostsFilterTitle" class="search-result-title">전체</span>
                    <span id="postCount" class="count-number">0</span> <!--전체 + 갯수 카운트-->
                    <span class="js-filter-reset filter-reset">취소</span> <!--필터링 후 취소 버튼 노출 -->
                    <div id="allPostsFilter" class="me-filter-area" style="display: block;">
                        <button type="button" class="js-all-posts-filter-button filter-button">
                            필터
                        </button>
                        <ul class="js-all-posts-filter-layer check-menu-popup my-popup" style="display: none; position: absolute; top: 24px; right: 0;">
                            <li>
                                <div class="js-tmpl-type js-total-tmpl-type check-menu-item" data-code="">전체</div>
                            </li>
                            <li>
                                <div class="js-tmpl-type check-menu-item" data-code="1">글</div>
                            </li>
                            <li>
                                <div class="js-tmpl-type check-menu-item" data-code="4">업무</div>
                            </li>
                            <li>
                                <div class="js-tmpl-type check-menu-item" data-code="3">일정</div>
                            </li>
                            <li>
                                <div class="js-tmpl-type check-menu-item" data-code="2">할 일</div>
                            </li>
                            <li>
                                <div class="js-tmpl-type js-remark-tmpl-type check-menu-item" data-code="-1">댓글</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul id="myPostContentUl" class="all-seach-list-type-1 post-group scroll-mask"></ul>
            </div>
        </div>
        
    
    
    
    
    
    
    
    
    <div class="js-post-search-result all-search-section d-none me-post-wrap" data-search-area-code="">
        <div class="all-search-container">
            <div class="all-search-content">
                <div class="js-result-input-area project-search-area all-file-header-type-3" style="margin-top: 20px; display: none">
                    <div class="project-search">
                        <i class="icons-search"></i>
                        <input type="text" placeholder="검색어를 입력해주세요!" class="project-search-input" autocomplete="off" maxlength="50">
                        <button id="projectDetailSearchTopButton" type="button" class="js-detail-search-filter-button search-set-button">옵션</button>
                        <div class="js-detail-search-filter-layer name-type-seach-popup d-none" style="top: 28px; left: 0px;">
                            
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
                <button type="button" class="js-search-back-button js-detail-back result-back-button d-none"><i class="icons-back"></i> 돌아가기</button>
                <div id="postSearchArea" class="search-result-group">
                    <div class="search-title-area">
                        <span class="search-result-title">전체</span>
                        <span id="allPostsSearchCount" class="js-search-post-count search-result-count" style="display: inline-block"></span>
                    </div>
                    <ul id="allPostsSearchUl" class="js-search-post-ul all-seach-list-type-1 scroll-mask"></ul>
                </div>
            </div>
            <div class="all-search-filter">
                <form action="">
                    <fieldset>
                        <legend class="blind">통합검색 필터 폼</legend>
                        <dl class="search-filter-group">
                            <dt>검색 필터</dt>
                            <dd class="search-filter-item js-search-pickr-layer">
                                <p>검색기간</p>
                                <div class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                                <div class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                            </dd>
                            <dd class="js-project-name-search-filter d-none search-filter-item">
                                <p>프로젝트</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="프로젝트명 입력" type="text">
                                </div>
                            </dd>
                            <dd class="js-register-name-search-filter d-none search-filter-item">
                                <p>작성자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-participant-name-search-filter d-none search-filter-item">
                                <p>참여자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="참여자명 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-tmpl-type-search-filter d-none search-filter-item">
                                <p>대상</p>
                                <ul class="target-select-group"></ul>
                            </dd>
                        </dl>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    </div>
    
                    
    
    
    
    
    
    
    
    
    <div id="detailLayer" class="main-sub-header project-detail-wrap d-none" style="display: none;">
        <div class="project-detail-top clearfix">
            <ul id="detailTab" class="project-detail-menu">
                <li class="js-tab-item" data-code="home">
                    <a>홈</a>
                </li>
                <li class="js-tab-item" data-code="task">
                    <a>업무</a>
                </li>
                <li class="js-tab-item gantt" data-code="gantt">
                    <a>간트차트</a>
                    <span class="tooltip-square">클릭 시, 새 창으로 이동합니다.</span>
                </li>
                <li class="js-tab-item" data-code="calendar">
                    <a>캘린더</a>
                </li>
                <li class="js-tab-item" data-code="file">
                    <a>파일</a>
                </li>
                <!-- <li class="js-tab-item" data-code="history">
                    <a>히스토리</a>
                </li> -->
            </ul>
            
            <div id="projectCollectionCount" class="js-collection-count project-num-wrap" style="display: none;">
                <span>건수 : </span>
                <span class="js-collection-total-count"></span>
            </div>
            
        </div>
        
    
    
    
    
    
    
    
    
    <div class="js-post-search-result all-search-section d-none me-post-wrap" data-search-area-code="">
        <div class="all-search-container">
            <div class="all-search-content">
                <div class="js-result-input-area project-search-area all-file-header-type-3" style="margin-top: 20px; display: none">
                    <div class="project-search">
                        <i class="icons-search"></i>
                        <input type="text" placeholder="검색어를 입력해주세요!" class="project-search-input" autocomplete="off" maxlength="50">
                        <button id="projectDetailSearchTopButton" type="button" class="js-detail-search-filter-button search-set-button">옵션</button>
                        <div class="js-detail-search-filter-layer name-type-seach-popup d-none" style="top: 28px; left: 0px;">
                            
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
                <button type="button" class="js-search-back-button js-detail-back result-back-button d-none"><i class="icons-back"></i> 돌아가기</button>
                <div id="postSearchArea" class="search-result-group">
                    <div class="search-title-area">
                        <span class="search-result-title">전체</span>
                        <span id="allPostsSearchCount" class="js-search-post-count search-result-count" style="display: inline-block"></span>
                    </div>
                    <ul id="allPostsSearchUl" class="js-search-post-ul all-seach-list-type-1 scroll-mask"></ul>
                </div>
            </div>
            <div class="all-search-filter">
                <form action="">
                    <fieldset>
                        <legend class="blind">통합검색 필터 폼</legend>
                        <dl class="search-filter-group">
                            <dt>검색 필터</dt>
                            <dd class="search-filter-item js-search-pickr-layer">
                                <p>검색기간</p>
                                <div class="js-date-type js-pickr-layer js-start-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                                <div class="js-date-type js-pickr-layer js-end-flatpickr filter-input-box">
                                    <span></span><input type="hidden">
                                    <label class="filter-date-label"><i class="icon-date"></i></label>
                                </div>
                            </dd>
                            <dd class="js-project-name-search-filter d-none search-filter-item">
                                <p>프로젝트</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="프로젝트명 입력" type="text">
                                </div>
                            </dd>
                            <dd class="js-register-name-search-filter d-none search-filter-item">
                                <p>작성자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="작성자명 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-participant-name-search-filter d-none search-filter-item">
                                <p>참여자</p>
                                <div class="filter-input-box">
                                    <input class="" placeholder="참여자명 입력 (여러명 입력시, 콤마로 구분)" type="text">
                                </div>
                            </dd>
                            <dd class="js-tmpl-type-search-filter d-none search-filter-item">
                                <p>대상</p>
                                <ul class="target-select-group"></ul>
                            </dd>
                        </dl>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
        <div id="detailCollectView" class="detail-collect-view background-white d-none" style="display: none;">
            <div id="mainScroll" class="detail-collect-group type3 padding-left-right-30">
                
    
    
    
    
    
    
    
    
    
    <div class="allTaskLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="btns-wr">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input type="text" placeholder="업무명 또는 업무번호를 검색하세요!" autocomplete="off" maxlength="20" class="js-task-search-input project-search-input">
                    <button type="button" class="js-task-detail-search-button search-set-button">옵션</button>
                    <div class="js-task-detail-search-layer name-type-seach-popup d-none" data-search-area-code="IN_TASK" style="top: 40px; left: 0px;">
                        
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
            
            <ul class="btns-area">
                <li>
                    <button id="excelDownButton" class="task-nav-button task-excel-down">
                        <i class="icon-excel-download"></i>
                        다운로드
                    </button>
                </li>
                <li>
                    <button class="js-task-add-btn collect-add-button task-add-button"></button>
                </li>
                <li>
                    <button id="taskSettingButton" class="task-nav-button task-setting js-alltask-setting-button">
                        <i class="icon-setting"></i>
                    </button>
                    <ul class="js-alltask-setting-layer menu-popup-wrap">
                        <li id="bundleButton" class="js-task-bundle-button js-bundle-list">
                            <span>묶어보기</span><i class="icons-right-3"></i>
                        </li>
                        <li id="sortPopupButton">
                            <span>보기 설정</span>
                        </li>
                    </ul>
                    <ul id="bundleLayer" class="js-task-bundle-layer js-alltask-setting-layer menu-popup-wrap">
                        <li class="js-bundle-li" view-gb="0">없음</li>
                        <li class="js-bundle-li" view-gb="1">상태</li>
                        <li class="js-bundle-li" view-gb="2">마감일</li>
                        <li class="js-bundle-li" view-gb="3">프로젝트</li>
                    </ul>
                </li>
            </ul>
            
        </div>
        <section class="all-task-seaction">
            <h3 class="blind">모든업무 목록</h3>
            <div id="taskSortHeader" class="all-task-header"></div>
            <ul id="taskContentUl" class="js-all-task-ul all-task-content layer-scroll padding-zero scroll-mask"></ul>
        </section>
    </div>
                
    
    
    
    
    
    
    
    
    
    
    <div class="allFileLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="btns-wr">
            <div class="project-search-area all-file-header-type-3">
                <div class="project-search">
                    <i class="icons-search"></i>
                    <input type="text" placeholder="파일명을 검색해주세요!" autocomplete="off" maxlength="20" class="js-file-search-input project-search-input">
                    <button type="button" class="js-file-detail-search-button search-set-button">옵션</button>
                    <div class="js-file-detail-search-layer name-type-seach-popup d-none" data-search-area-code="IN_FILE" style="top: 40px; left: 0px;">
                        
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
            <div class="btns-area">
                <button id="allFileMoveButton">
                    <i class="icon-move"></i>
                    이동
                </button>
                <button id="fileDownloadButton">
                    <i class="icon-download"></i>
                    다운로드
                </button>
                <button id="allFileDeleteButton" class="task-setting">
                    <i class="icon-delete"></i>
                    폴더 삭제
                </button>
                <button id="addFolder" class="js-file-add-button collect-add-button"></button>
                <a href="#" id="changeListTypeButton" class="js-view-change-button">
                    <div class="js-all-file-type all-file-header-right-icon-type-5">
                        <span class="tooltip-square">리스트형</span>
                    </div>
                </a>
                <a href="#" id="changeBoardTypeButton" class="js-view-change-button all-file-board-margin">
                    <div class="js-all-file-type all-file-header-right-icon-type-4">
                        <span class="tooltip-square">바둑판형</span>
                    </div>
                </a>
            </div>
        </div>
        <div id="fileItemArea" class="all-file-area board">
            <div id="allFileSort" class="js-sort-layer all-file-list-setup-type-1">
                <div id="fileUploadSort" class="js-sort-file all-file-list-setup-1 check" data-sort-code="EDTR_DTTM">
                    <span>최근 업로드순</span><em></em></div>
                <div id="fileNameSort" class="js-sort-file all-file-list-setup-1" data-sort-code="ITEM_NM">
                    <span>파일명 순</span><em></em></div>
            </div>
            <ul id="fileItemUlHead" class="js-sort-layer file-item-head">
                <li>
                    <div class="js-sort-file all-file-list-name-type-1" data-sort-code="ITEM_NM">
                        <span class="all-file-list-sort ">파일명<em></em></span>
                    </div>
                    <div class="js-sort-file all-file-list-name-type-4" data-sort-code="SIZE">
                        <span class="all-file-list-sort">용량<em></em></span></div>
                    <div class="js-sort-file all-file-list-name-type-2" data-sort-code="RGSR_NM"><span class="all-file-list-sort">등록자<em></em></span>
                    </div>
                    <div class="js-sort-file all-file-list-name-type-3 check" data-sort-code="EDTR_DTTM"><span class="all-file-list-sort">등록일시<em></em></span></div>
                    <div class="js-sort-file all-file-list-sort all-file-list-name-type-5"></div>
                </li>
            </ul>
            <ul id="fileLayerUl" class="js-file-list-layer layer-scroll file-select-wrap scroll-mask"></ul>
        </div>
        <div id="fileLayerProjectMenu" class="all-file-header-left-type-1"></div>
    
        <ul id="boardTypeFileItem" style="display:none;">
            <li class="js-file-board js-selectable ui-selectee {download_yn}" rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}" width="{WIDTH}" height="{HEIGHT}" orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" img_path="{IMG_PATH}" atch_srno="{ATCH_SRNO}" use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}" file_size="{data_file_size}" rgsn_dttm="{rgsn_dttm}" file_index_code="{file_index_code}">
                <a href="#" class="all-file-type-check position-check-fix"></a>
                <a href="#" class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
                <a href="#">
                    <div class="file-extension {view_type_class_name}" {thumbnail_url}=""></div>
                </a>
                <div class="all-file-name all-file-round-bottom-section-1 js-mouseover" mouseover-text="{mouseover-text}">{ORCP_FILE_NM}
                </div>
            </li>
        </ul>
        <ul id="boardTypeFolderItem" style="display:none;">
            <li class="js-file-board js-folder js-selectable ui-selectee" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}">
                <a href="#" class="all-file-type-check position-check-fix"></a>
                <a href="#" class="js-file-menu-button js-file-menu all-file-type-plus-1"></a>
                <a href="#">
                    <div class="file-extension {view-type-class-name}"></div>
                </a>
                <div class="all-file-name all-file-round-bottom-section-1">{file-name}</div>
            </li>
        </ul>
    
        <ul id="listTypeFileItem" style="display:none;">
            <li class="js-file-list js-selectable ui-selectee {download_yn}" rand_key="{RAND_KEY}" thum_img_path="{THUM_IMG_PATH}" width="{WIDTH}" height="{HEIGHT}" orcp_file_nm="{DATA_ORCP_FILE_NM}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" atch_srno="{ATCH_SRNO}" img_path="{IMG_PATH}" use_intt_id="{USE_INTT_ID}" rgsr_nm="{RGSR_NM}" editor_srno="{EDITOR_SRNO}" file_type="{FILE_TYPE}" file_size="{data_file_size}" rgsn_dttm="{RGSN_DTTM}" file_index_code="{file_index_code}" project_title="{PROJECT_TITLE}">
                <div class="all-file-list-name-type-1-1 ellipsis">
                    <em class="all-file-type-check"></em>
                    <div class="all-file-type-icon-wrap-1">
                        <div class="file-extension {view_type_class_name}"></div>
                    </div>
                    <div class="all-file-name js-mouseover" mouseover-text="{mouseover-text}">
                        <div class="all-file-file-name">
                              <span>{ORCP_FILE_NM}</span>
                        </div>
                        <div class="all-file-project-title">
                             <i class="icons-project-1"></i> {PROJECT_TITLE}
                        </div>
                    </div>
    
    
                </div>
    
                <div class="all-file-list-name-type-4-1"><strong class="js-list-file-size">{file_size}</strong></div>
                <div class="all-file-list-name-type-2-1"><strong class="js-mouseover" mouseover-text="{RGSR_NM}">{RGSR_NM}</strong></div>
                <div class="all-file-list-name-type-3-1"><strong class="js-all-file-dttm">{date}</strong></div>
                <div class="js-file-menu all-file-plus-icon-image-type-1" style="display: none;"></div>
            </li>
        </ul>
        <ul id="listTypeFolderItem" style="display:none;">
            <li id="list-{folder-key}" class="js-file-list js-folder js-selectable ui-selectee" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}">
                <div class="all-forder-list-name-type-1-1">
                    <em class="all-file-type-check"></em>
                    <div class="all-file-type-icon-wrap-1">
                        <div class="file-extension {view-type-class-name}"></div>
                    </div>
                    <span class="all-file-name">{file-name}</span>
                </div>
                <div class="all-file-list-name-type-4-1"><strong>-</strong></div>
                <div class="all-file-list-name-type-2-1"><strong>{rgsr-nm}</strong></div>
                <div class="all-file-list-name-type-3-1"><strong>{rgsn-dttm}</strong></div>
                <div class="js-file-menu all-file-plus-icon-image-type-1" style="display: none;"></div>
            </li>
        </ul>
    
        <div id="fileMenuPopupItem" style="display: none;">
            <div class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
                <a href="#" id="downloadFile" class="js-file-menu-button">
                    <div class="download-file-button">
                        <i></i>
                        <span>다운로드</span>
                    </div>
                </a>
                <a href="#" id="viewerFile" class="js-file-menu-button">
                    <div class="viewer-file-button">
                        <i></i>
                        <span>열기</span>
                    </div>
                </a>
                <a href="#" id="moveFile" class="js-file-menu-button">
                    <div class="flow-name-move">
                        <i></i>
                        <span>이동</span>
                    </div>
                </a>
                <a href="#" id="nameChange" class="js-file-menu-button">
                    <div class="flow-name-size">
                        <i></i>
                        <span>이름 변경</span>
                    </div>
                </a>
                <a href="#" id="deleteFolder" class="js-file-menu-button">
                    <div class="flow-dash-icon">
                        <i></i>
                        <span>삭제</span>
                    </div>
                </a>
                <a href="#" id="detailFileView" class="js-file-menu-button">
                    <div class="detail-file-button">
                        <i></i>
                        <span>상세보기</span>
                    </div>
                </a>
            </div>
        </div>
    
        <ul id="fileLayerTitleItem" class="js-file-items-class">
            <a href="#" class="js-file-header" project-srno="{project-srno}" file-fld-srno="{file-fld-srno}">
                <em class="flow-content-circle-type-1 project-color {project-color}" {project-color-display}=""></em>
                <span class="js-all-file-project-title">{project-title}</span>
            </a>
        </ul>
    
        <ul id="headerFolderItem" class="js-file-items-class">
            <a href="#" id="folder-{file-fld-srno}" class="js-file-header" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" folder-depth="{folder-depth}">
                <em class="all-file-header-left-icon-type-3"></em>
                <span>{folder-name}</span>
            </a>
        </ul>
    
        <ul id="headerMoreItem" class="js-file-items-class">
            <a class="js-file-more-button">
                <div id="moreFolderButton" class="js-file-header all-file-plus-type-1">
                    <span>...</span>
                </div>
                <div id="moreFolderLayer" class="all-file-popup-type-1">
                    <ul clss="js-file-more-ul file-more-ul">
                        {more-folder-list}
                    </ul>
                </div>
            </a>
    
        </ul>
    
        <ul id="headerMorePopupLiItme" class="js-file-items-class">
            <li id="{file-fld-srno}" class="js-file-header all-file-popup-type-{folder-depth-class}" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" folder-depth="{folder-depth}">
                <i></i><em></em><span>{folder-name}</span></li>
        </ul>
    
        <div id="fileMovePopupItem" class="d-none">
            <div class="flow-all-background-1">
                <div class="flow-project-make-1">
                    <div class="flow-project-make-2">
                        <div class="flow-project-popup-8 js-file-move-popup">
                            <div class="flow-project-header-1">
                                <span>이동</span>
                                <a href="#" class="js-class-button flow-close-type-1"></a>
                            </div>
                            <div class="flow-content-type-2">
                                <ul id="moveFilePopupUl">
                                    <li id="movePopupProject" class="js-move-file-li file-move-project" colabo-srno="{colabo-srno}" file-fld-srno="-1">
                                        <div class="file-folder-div">
                                            <em class="flow-content-circle-type-1 {project-color}"></em>
                                            {project-title}
                                            <a href="#" class="js-file-move-check check-file-button"></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="flow-pop-button-type-2">
                                <a href="#">
                                    <div class="js-class-button flow-pop-sub-button-1">취소</div>
                                </a>
                                <a href="#">
                                    <div class="js-move-file-success flow-pop-sub-button-2">확인</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="fileMovePopupLiItem" class="d-none">
            <li class="file-folder js-move-file-li {popup-depth-class} {current-folder}" colabo-srno="{colabo-srno}" file-fld-srno="{file-fld-srno}" up-file-fld-srno="{up-file-fld-srno}" data-depth="{folder-depth}">
                <div class="file-folder-div">
                    <i class="js-more-folder {last-fld}"></i>
                    <em></em>
                    <span>{folder-name}</span>
                    <a href="#" class="js-file-move-check check-file-button"></a>
                </div>
                <ul></ul>
            </li>
        </div>
    
        <div id="countLayerItem" class="d-none">
            <div class="js-file-count-layer all-file-alert-type-2"><span><span class="js-count-text">{count}</span>개 파일/폴더를 선택되었습니다.</span><em class="js-all-cancle-button">선택
                취소</em></div>
        </div>
    </div>
                
    
    
    
    
    
    
    
    
    
    
    <div class="allCalendarLayer full-width small-style-wrap-2 d-none" style="display: none;">
        <div class="all-schedule">
            <div class="btns-wr">
                <div class="project-search-area all-file-header-type-3">
                    <div class="project-search">
                        <i class="icons-search"></i>
                        <input type="text" placeholder="일정 제목을 검색해주세요!" class="js-calendar-search-input project-search-input">
                    </div>
                </div>
                <div class="btns-area">
                    
                    
                    
                    <button id="scheduleAdd" type="button" class="collect-add-button" data-post-code="2"></button>
                </div>
            </div>
            <div class="all-calendar-wrap">
                <!-- calendar -->
                <div id="calendar" class="all-calendar all-calendar-nav layer-scroll"></div>
                <!-- calendar-popup -->
            </div>
        </div>
    </div>
                 
    
    
    
    
    
    
    
    <div class="allHistoryLayer full-width small-style-wrap-2 d-none" style="display: none;">
      <div class="history-container">
        <div class="project-search-area all-file-header-type-3">
          <div class="project-search">
            <i class="icons-search"></i>
            <input type="text" placeholder="일정 제목을 검색해주세요!" class="js-calendar-search-input project-search-input" readonly="readonly">
          </div>
        </div>
        <ul class="history-group">
          <li class="alarm-{COLABO_COMMT_SRNO} js-alarm-item {not-read}" colabo_srno="{COLABO_SRNO}" colabo_commt_srno="{COLABO_COMMT_SRNO}" colabo_remark_srno="{COLABO_REMARK_SRNO}">
            <div class="all-setup-picture-type-1" style="background-image: url(/flow-renewal/assets/images/profile-default.png)" data=""></div>
            <!-- <div class="all-setup-picture-type-1" {profile}></div> -->
            <div class="all-text-wrap-type-1">
              <div class="all-text-wrap-type-2"><i class="{emojiIcon}"></i>{msg}</div>
              <div class="all-text-wrap-type-3">{contents}</div>
              <div class="all-text-wrap-type-3">
                <span><em class="all-setup-icon-type-1 {img-yn}"></em>이미지</span><span><em class="all-setup-icon-type-2 {file-yn}"></em>파일</span>
              </div>
            </div>
            <div class="all-setup-section-type-1"><em>2021-05-11</em></div>
          </li>
        </ul>
      </div>
    </div>
    
            </div>
        </div>
        <div id="detailTimeline" class="project-detail-inner layer-scroll type2" style="display: none;">
            <div class="js-detail-wrap-area small-style-wrap">
                <!-- project-detail-container-->
                <section id="postTimeline" class="project-detail-container">
                    <div class="project-search-area all-file-header-type-3">
                        <div class="project-search">
                            <i class="icons-search"></i>
                            <input id="projectSearchInput" type="text" placeholder="검색어를 입력해주세요" class="project-search-input" autocomplete="off" maxlength="50">
                            <button id="projectDetailSearchTopButton" type="button" class="js-detail-top-search-button search-set-button">
                                옵션
                            </button>
                            <div id="projectDetailSearchLayer" class="name-type-seach-popup d-none" data-search-area-code="IN_PROJECT" style="top: 38px; left: 0px">
                                
    
    
    
    
    
    
    
    
    
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
            <li class="js-participant-name-search-filter d-none">
                <div class="condition-cell title">담당자</div>
                <div class="condition-cell">
                    <input type="text" placeholder="담당자 입력 (여러명 입력시, 콤마로 구분)">
                </div>
            </li>
            <li class="js-period-type-search-filter">
                <div class="condition-cell title">검색기간</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-tmpl-type-search-filter">
                <div class="condition-cell title">대상</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
                </div>
            </li>
            <li class="js-file-type-search-filter" style="display: none">
                <div class="condition-cell title">파일종류</div>
                <div class="condition-cell">
                    <ul class="target-select-group"></ul>
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
                    <div class="project-detail-content">
                        <div id="taskReportArea"></div>
    
                        <div id="createPostArea" class="work-design-wrapper">
                            <ul id="createPostUl" class="work-design-group">
                                <li class="post-filter" data-post-code="1">
                                    <i class="icons-write2"></i><span>글</span>
                                </li>
                                <li class="post-filter" data-post-code="4">
                                    <i class="icons-task"></i><span>업무</span>
                                </li>
                                <li class="post-filter" data-post-code="3">
                                    <i class="icons-schedule"></i><span>일정</span>
                                </li>
                                <li class="post-filter" data-post-code="2">
                                    <i class="icons-todo"></i><span>할 일</span>
                                </li>
                            </ul>
                            <div class="work-desing-element">
                                <p class="work-desing-text"><i class="cursor"></i>내용을 입력하세요.</p>
                                <div class="work-icon-group">
                                    <i class="icons-file"></i>
                                    <i class="icons-picture"></i>
                                    <i class="icons-map"></i>
                                    <i class="icons-tag"></i>
                                    <i class="icons-mention"></i>
                                    <i class="icons-font"></i>
                                </div>
                            </div>
                        </div>
    
                        <!-- 해시태그 -->
                        <div id="projectHashtagArea" class="detail-section hashtag-section">
                            <!--hashtag-section에 active class로 제어  -->
                            <ul id="hashtagUl" class="hashtag-group"></ul>
                            <button id="hashtagMoreButton" type="button" class="hashtag-more-btn d-none">
                                <i class="ico-arrow"></i>
                            </button>
                        </div>
                        <!-- //해시태그 -->
    
                    </div>
                    <!-- 미확인 -->
                    <div id="projectAlarmArea" class="detail-section unidentified-alert-section d-none">
                        <div class="section-title-area">
                            <h4 class="section-title">
                                <span>미확인</span>
                                <span id="projectNotReadCount" class="section-number alarm"></span>
                            </h4>
                            <button id="readAllPostBnt" type="button" class="read-all-btn">모두읽음</button>
                        </div>
                        <div class="unidentified-content">
                            <!--unidentified-content active 클래스 제어 -->
                            <ul id="notReadAlarmUl" class="unidentified-list"></ul>
                            <button id="notReadAlarmMore" type="button" class="unidentified-more-btn d-none">
                                더보기
                                <span class="blind">더보기</span>
                            </button>
                        </div>
                    </div>
                    <!-- //미확인 -->
                    <!-- 상단고정 -->
                    <div id="projectPinArea" class="detail-section fix-section d-none">
                        <div class="section-title-area">
                            <h4 class="section-title">
                                <span>상단고정</span>
                                <span id="projectPinCount" class="section-number"></span>
                            </h4>
                        </div>
                        <ul id="pinPostUl" class="pin-list fixed-list"></ul>
                    </div>
                    <!-- //상단고정 -->
    
                    <!-- 전체피드 -->
                    <div id="projectFeedArea" class="detail-section feed-section">
                        <div class="section-title-area">
                            <h4 id="allPostsFilterTitle" class="section-title">전체</h4>
                            <span class="filter-reset js-filter-reset">취소</span>
                            <!--필터링 후 취소 버튼 노출 -->
                            <div id="feedTypeButton" class="feed-type-area">
                                <button type="button" class="js-feed-filter-button filter-button">
                                    <i class="icons-filter"></i>
                                    <span>필터</span>
                                </button>
                                <button type="button" class="feed-type-button card">
                                    <i class="icons-feed"></i>
                                    <span class="tooltip-square">피드형</span>
                                </button>
                                <button type="button" class="feed-type-button list">
                                    <i class="icons-list"></i>
                                    <span class="tooltip-square">리스트형</span>
                                </button>
                                <ul class="js-feed-filter-layer check-menu-popup d-none">
                                    <li>
                                        <div class="check-menu-item on" data-code="">전체</div>
                                    </li>
                                    <li>
                                        <div class="check-menu-item" data-code="1">글</div>
                                    </li>
                                    <li>
                                        <div class="check-menu-item" data-code="4">업무</div>
                                    </li>
                                    <li>
                                        <div class="check-menu-item" data-code="3">일정</div>
                                    </li>
                                    <li>
                                        <div class="check-menu-item" data-code="2">할 일</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="feed-content">
                            <button id="postMoreBtn" type="button" class="more-btn" style="display: none"><i></i><i></i><i></i></button>
                            <ul id="detailUl" class="post-group list"></ul>
                        </div>
                    </div>
                </section>
                <!-- //project-detail-container-->
                <div class="participants-section">
                    <div id="projectParticipants" class="project-participants-wrap feed-section">
                        <div class="section-title-area">
                            <h4 class="section-title">
                                <span>참여자</span>
                                <span id="participantCount"></span>
                            </h4>
                            <div class="feed-type-area">
                                <button id="allSendienceBtn" type="button">
                                     전체 보기
                                </button>
                            </div>
                        </div>
    
                        <div id="participantArea" class="participants-container d-none">
                            <div id="participantScrollArea" class="participants-content-group scroll-mask">
                                <div id="joinParticipantsArea" class="participants-content d-none">
                                    <span class="participants-title">
                                        <em>가입 신청자</em>
                                        <span id="joinParticipantsCount" class="number-of-participants"></span>
                                    </span>
                                    <ul id="joinParticipantsUl" class="participants-list"></ul>
                                </div>
                                <ul id="participantsUl" class="participants-list"></ul>
                            </div>
                            <div class="participants-menu">
                                <button class="js-project-chat participant-button">
                                    <i class="icons-chat small"></i>채팅
                                </button>
                                <button class="js-video-chat participant-button">
                                    <i class="icons-video"></i> 화상 회의
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="pinPostItem" class="d-none">
            <li id="pin-{post-srno}" class="js-pin-item" data-post-srno="{post-srno}" data-project-srno="{colabo-srno}">
                <a href="#">
                    <div class="fixed-kind">
                        <i class="icons-{post-gb}"></i>
                        <span>{post-name}</span>
                    </div>
                    <p class="js-post-title fixed-text {complete-yn}">{title}</p>
                    <div class="fixed-value">
                        <span class="js-task-state js-todo-state {status-code}">{status}</span>
                        <div class="date-time {schedule-yn}">
                            <em class="date">{start-date}</em>
                            <span>{start-time}</span>
                        </div>
                    </div>
                </a>
            </li>
        </div>
        <div id="hashTagItem" class="d-none">
            <li>
                <a href="#none" class="hashtag-item">
                    <em class="hashtag-item-title">{tagName}</em>
                    <div class="hashtag-item-text">{refCount}개의 게시물</div>
                </a>
            </li>
        </div>
        <div id="mentionItem" class="d-none">
            <li id="{id}-mention" class="js-mention-item participant-item" data-user-id="{id}">
                <div class="post-author">
                    <span class="thumbnail size40 radius16" {profile}=""></span>
                    <dl class="post-author-info">
                        <dt>
                            <strong class="author">{name}</strong>
                            <em>{position}</em>
                        </dt>
                        <dd class="{personal-yn}">
                            <strong class="company">{company}</strong>
                            <span class="team">{team}</span>
                        </dd>
                    </dl>
                </div>
            </li>
        </div>
        <div id="participantItem" class="d-none">
            <li class="js-participant-item" data-id="{worker-id}">
                <div class="post-author">
                    <span class="js-participant-profile thumbnail size40 radius16" {profile}=""></span>
                    <dl class="post-author-info">
                        <dt>
                            <strong class="js-participant-name author ellipsis">{name}</strong>
                            <em class="position ellipsis" {personal-display}="">{position}</em>
                        </dt>
                        <dd {personal-display}="">
                            <strong class="company">{company}</strong>
                            <span class="team">{team}</span>
                        </dd>
                    </dl>
                </div>
                <button type="button" class="js-participant-chat participant-chat-button">
                    <i class="icons-chat"><span class="blind">채팅</span></i>
                </button>
            </li>
        </div>
        <div id="inviteItem" class="d-none">
            <div class="invite-text-area">
                <span>{first-contents}</span> <span>{date}</span>
                <span class="invite-time">{rgsn-dttmdate}</span>
            </div>
        </div>
    </div>
    <!-- projectList에서 Hastag가로 List-->
    <div id="hastTagTransverseItem" class="d-none">
        <li id="{tag-name}" class="hashtag-item"><a href="#" class="hashtag">#{tag-name}</a></li>
    </div>
    <div id="taskReportItem" class="d-none">
        <div class="detail-section reports-section">
            <div class="section-title-area">
                <h4 class="section-title">
                    <span>업무리포트</span>
                    <span class="section-number">{TOTAL_CNT}</span>
                </h4>
                <button id="taskReportToggleButton" type="button" class="js-report-btn reports-button">
                    <i class="ico-arrow"></i>
                </button>
            </div>
            <!-- 원형차트 -->
            <div class="js-task-report-layer d-none">
                <div class="taks-report">
                    <!--display:none-->
                    <!-- chart -->
                    <div class="donut-chart-area">
                        <div class="donut-chart" id="TASK_DONUT_CHART"></div>
                        <div class="task-count" id="TaskCnt">{TOTAL_CNT}</div>
                    </div>
                    <ul id="taskReportLayer" class="donut-chart-list">
                        <li>
                            <span class="task-chart-info request" data-code="0">
                                <i class="chart-info-label"></i>
                                <span class="chart-info-text">{REQ_NAME}<em>{REQ}</em></span>
                                <span class="chart-info-percent">{REQ_PER}%</span>
                            </span>
                            <span class="task-chart-info progress" data-code="1">
                                <i class="chart-info-label"></i>
                                <span class="chart-info-text">{PROG_NAME}<em>{PROG}</em></span>
                                <span class="chart-info-percent">{PROG_PER}%</span>
                            </span>
                            <span class="task-chart-info feedback" data-code="4">
                                <i class="chart-info-label"></i>
                                <span class="chart-info-text">{FEDBK_NAME}<em>{FEDBK}</em></span>
                                <span class="chart-info-percent">{FEDBK_PER}%</span>
                            </span>
                        </li>
                        <li>
                            <span class="task-chart-info complete" data-code="2">
                                <i class="chart-info-label"></i>
                                <span class="chart-info-text">{COMP_NAME}<em>{COMP}</em></span>
                                <span class="chart-info-percent">{COMP_PER}%</span>
                            </span>
                            <span class="task-chart-info hold" data-code="3">
                                <i class="chart-info-label"></i>
                                <span class="chart-info-text">{HOLD_NAME}<em>{HOLD}</em></span>
                                <span class="chart-info-percent">{HOLD_PER}%</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- //원형차트 -->
        </div>
    </div>
    
                </div>
            </div>
</body>
</html>