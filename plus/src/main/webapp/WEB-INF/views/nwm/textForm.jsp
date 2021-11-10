<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
	

<div class="js-popup-before edit-item create-post-wrap" data-code="EDIT">
            
    <div contenteditable="true" class="js-dimd-layer create-dimd d-none">
        <div class="dimd-content">
            <i class="upload-dimd"></i>
            <p>첨부할 파일, 이미지 등을 여기에 끌어다 놓으세요</p>
        </div>
    </div>

            <div class="create-post-header">
                <h4 class="create-post-title">글 수정</h4>
                <div id="selectedProject" class="js-project-selectable-header add-project-header d-none">
                    <h3 class="card-popup-title">
                        <i id="selectProjectIcon" class="project-color"></i>
                        <span id="selectedProjectNm" class="subtask-title">프로젝트 선택</span>
                        <input type="hidden" id="selectedProjectSrno" value="">
                    </h3>
                </div>
                <button type="button" class="btn-close">
                    <i class="icons-close-1"><span class="blind">닫기</span></i>
                </button>
            </div>
            <div class="share-header" style="display: none">
                <i class="btn-back"></i>
                <div class="color-code flow-content-list flow-content-po-t small-color" data-color="11"></div>
                <span class="project-ttl"></span>
                <button type="button" class="btn-close">
                    <i class="icons-close-1"><span class="blind">닫기</span></i>
                </button>
            </div>
            <ul class="js-post-nav create-post-nav write2  no-tab">
                <li class="js-post-type-item" data-post-code="1" style="display: table-cell;">
                    <button type="button" class="create-tab tab-write" role="tab">
                        <i class="icons-write2"></i><span>글</span>
                    </button>
                </li>
                <li class="js-post-type-item" data-post-code="4" style="display: table-cell;">
                    <button type="button" class="create-tab tab-task" role="tab">
                        <i class="icons-task"></i><span>업무</span>
                    </button>
                </li>
                <li class="js-post-type-item" data-post-code="3" style="display: table-cell;">
                    <button type="button" class="create-tab tab-schedule" role="tab">
                        <i class="icons-schedule"></i><span>일정</span>
                    </button>
                </li>
                <li class="js-post-type-item" data-post-code="2" style="display: table-cell;">
                    <button type="button" class="create-tab tab-todo" role="tab">
                        <i class="icons-todo"></i><span>할 일</span>
                    </button>
                </li>
            </ul>
            <div class="create-post-container scroll-mask">
                <div>
                    <fieldset>
                        <legend class="blind">게시물 작성 영역</legend>
                        <div class="">
                            <input id="postTitle" type="text" title="제목을 입력하세요." placeholder="제목을 입력하세요." autocomplete="off" data-required-yn="Y" class="js-post-title create-title-input" maxlength="100" data-empty-msg="제목을 입력하세요!">
                        </div>
                        <div id="postCntn" class="js-content-area create-content-area ">
                            <div id="styleTagItem" class="font-style-toolbar d-none">
                                <button id="styleTagBold" type="button" class="font-style-button">
                                    <i class="icons-font-style bold"></i>
                                </button>
                                <button id="styleTagItalic" type="button" class="font-style-button">
                                    <i class="icons-font-style italic"></i>
                                </button>
                                <button id="styleTagUnderLine" type="button" class="font-style-button">
                                    <i class="icons-font-style underline"></i>
                                </button>
                                <button id="styleTagLineThrough" type="button" class="font-style-button">
                                    <i class="icons-font-style line-through"></i>
                                </button>
                            </div>
                        
            <!-- Note. postCntn을 아이디로 주면 .js-content-area 영역과 id가 겹쳐짐-->
            <div class="js-upload-area js-paste-layer create-post-content" contenteditable="true" placeholder=" 내용을 입력하세요" spellcheck="false"><div>ㅇㅇㅇㅇㅇ</div></div> 
        </div>
    <div id="postAttached" class="post-attach">
        <div class="js-attached-url"></div>
        <div class="js-attached-image write1-wr"></div>
        <div class="js-attached-file"></div>
    </div>

                    </fieldset>
                </div>
            </div>
            <div class="create-post-footer clearfix">
                <ul class="js-bottom-ul create-button-group clearfix">
                    <li class="js-bottom-item" data-code="upload-file" style="display: inline-block;">
                        <button mouseover-text="파일 첨부" class="js-file-button js-mouseover">
                            <i class="icons-link"></i>
                        </button>
                        <div class="js-file-menu upload-menu d-none">
                            <button class="js-file-option" data-upload="pc">
                                <i class="icon-pc"></i>내 컴퓨터
                            </button>
                            <button class="js-file-option" data-upload="gdrive" style="display:block" data="">
                                <i class="icon-gdrive"></i>구글 드라이브
                            </button>
                            <button class="js-file-option" data-upload="dropbox" style="display:block" data="">
                                <i class="icon-dropbox"></i>드롭박스
                            </button>
                            <button class="js-file-option" data-upload="flowdrive" style="display:block" data="">
                                <i class="mini-flowdrive"></i>파일함
                            </button>
                        </div>
                    </li>
                    <li class="js-bottom-item" data-code="google-place" style="display: inline-block;">
                        <button mouseover-text="장소 첨부" class="js-map-button js-mouseover">
                            <i class="icons-map"></i>
                        </button>
                        <div class="js-map-menu upload-menu map-search d-none">
                            <input type="text" placeholder="장소를 입력하세요" class="js-map-input map-search-input pac-target-input" autocomplete="off">
                        </div>
                    </li>
                    <li class="js-bottom-item hashtag-item" data-code="hash-tag" style="display: inline-block;">
                        <button>
                            <i class="icons-tag"></i>
                        </button>
                        <div class="tooltip">해시태그 - ‘#’ 입력후 내용을 쓰고 스페이스 바로 설정</div>
                    </li>
                    <li class="js-bottom-item mention-item" data-code="mention-tag" style="display: inline-block;">
                        <button>
                            <i class="icons-mention"></i>
                        </button>
                        <div class="tooltip">멘션 - ‘@’ 입력후 이름을 쓰고 ↑,↓,Enter로 설정</div>
                    </li>
                    <li class="js-bottom-item text-item" data-code="style-tag" style="display: inline-block;">
                        <button>
                            <i class="icons-font"></i>
                        </button>
                        <div class="tooltip">굵게/기울임/밑줄/취소선 - 글내용을 드래그하여 설정</div>
                    </li>
                </ul>
                <div class="create-footer-menu">
                    <div class="private-button create-submit-option                     admin" style="display:inline-block" data="">프로젝트 관리자만</div>
                    <ul class="create-post-option" style="display: none">
                        <li>
                            <div class="js-private-option option-item full" data-private="full"><i class="icons-person-7"></i>전체 공개
                            </div>
                        </li>
                        <li>
                            <div class="js-private-option option-item admin" data-private="admin"><i class="icons-lock"></i>프로젝트 관리자만
                            </div>
                        </li>
                    </ul>
                    <button class="js-complete-btn create-button create-post-submit" style="display: none;">올리기</button>
                    <div class="js-editing-buttons d-none" style="display: inline-block;">
                        <button type="button" class="cancel-button create-post-button">취소</button>
                        <button type="button" class="js-complete-btn edit-button create-post-button confirm">
                            확인</button>
                    </div>
                </div>
            </div>
        </div>