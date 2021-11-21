<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<title>플러스(PLUS)</title>
<meta charset="UTF-8">
<meta http-equiv="Cache-Control" content="No-Cache">
<meta http-equiv="Pragma" content="No-Cache">

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport"
	content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
<meta name="format-detection" content="telephone=no">

<meta name="theme-color" content="#5f5ab9">

<meta name="subject" content="work tool">
<meta name="content-language" content="ko">

<link rel="SHORTCUT ICON" href="design2/favicon.ico">
<link rel="icon" type="image/x-icon" href="design2/favicon.ico">

<link rel="stylesheet" href="flow-renewal/assets/css/reset.css">
<link rel="stylesheet" href="flow-renewal/dist/css/common.min.css">
<link rel="stylesheet" href="flow-renewal/dist/css/calrendar.css">
<link rel="stylesheet" href="flow-renewal/dist/css/mini.min.css">

<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="flow-renewal/dist/js/commonLib.min.js"></script>
<script src="flow-renewal/dist/js/mainLib.min.js"></script>

<!-- oauth -->
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/common.js"></script>
<script type="text/javascript" charset="UTF-8"
	src="https://maps.googleapis.com/maps-api-v3/api/js/46/8/intl/ko_ALL/util.js"></script>


<style type="text/css">
@-webkit-keyframes rotate {
	from {-webkit-transform:rotate(0deg);}
	to {-webkit-transform: rotate(360deg);}
}
@keyframes rotate {
from {transform:rotate(0deg);}
to {transform: rotate(360deg);}
}
.category-name {
	positon: relative;
}
.category-name:hover {
	color: #6449FC;
}
</style>
</head>
<body>
	<!-- 성공 알림창 style-->
	<div id="successWrap">
		<div class="alert-wrap d-none" style="display: none">
			<div class="alert-type success">
				<div class="text">#####</div>
			</div>
		</div>
	</div>

	<!-- 실패 알림창 style-->
	<div id="errorWrap">
		<div class="alert-wrap d-none" style="display: none">
			<div class="alert-type error">
				<div class="text">#####</div>
			</div>
		</div>
	</div>

	<!-- 팝업창 화면 -->
	<div id="overlay" style="display: none">
		<!-- 새 프로젝트 -->
		<div id="prjMakeLayer" class="flow-all-background-1 d-none back-area"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area">
					<div class="input-main-layer flow-project-popup-1 d-block">
						<div class="flow-project-header-1">
							<span>새 프로젝트</span> <a href="#"
								class="js-project-make-close-btn flow-close-type-1 close-event"></a>
						</div>
						<div class="flow-content scroll-mask">
							<form id="prjInsert" name="prjInsert" action="myProject.do">
								<div class="flow-content-1">
									<input id="prjTtlInput" name="prjTtlInput" type="text"
										placeholder="제목 입력 (필수)" maxlength="50" autocomplete="off">
								</div>
								<div class="flow-content-2">
									<textarea id="prjCntnInput" name="prjCntnInput"
										placeholder="프로젝트에 관한 설명 입력 (옵션)"></textarea>
								</div>

								<div class="flow-content-3">옵션</div>
								<c:if test="${memPerm eq 'admin'}">
									<div id="cPrjSet" class="open-yn check-setting flow-content-4">
										<input type="hidden" id="prjKndSet" name="prjKndSet" value="N" />
										<a> <em></em> 회사 프로젝트 설정
										</a>
										<button class="js-sendience-service-helper js-mouseover"
											mouseover-text="전체에게 공개되며 모두 참여할 수 있도록 설정됩니다.">
											<i class="icons-question"></i>
										</button>
										<a href="#"> <!-- active 클래스로 제어  -->
											<button type="button"
												class="toggle-button check-area js-project-open-toggle">
												<i class="handle"></i>
											</button>
										</a>
									</div>
								</c:if>


								<div id="prjAllSet"
									class="manager-permit-yn check-setting flow-content-5">
									<input type="hidden" id="prjOpenPermSet" name="prjOpenPermSet"
										value="part" /> <a> <em></em> 프로젝트 전체공개 설정
									</a>
									<button class="js-sendience-service-helper js-mouseover"
										mouseover-text="회사 임직원 모두 볼 수 있도록 설정합니다.">
										<i class="icons-question"></i>
									</button>
									<a href="#">
										<button type="button"
											class="toggle-button check-area js-project-toggle">
											<!-- active 클래스로 제어  -->
											<i class="handle"></i>
										</button>
									</a>
								</div>
								<div class="open-category-setting flow-content-8">
									<em></em> 프로젝트 카테고리 설정
									<div class="flow-sub-content-1">
										<span class="category-name"> <select id="ctgryIdSet"
											name="ctgryIdSet" class="my-type-1">
												<option value="">선택</option>
										</select>
										</span> <i></i>
									</div>
								</div>
							</form>
						</div>
						<a href="#">
							<div class="project-submit flow-content-7 un-value">만들기</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- //새 프로젝트 -->

		<!-- 프로젝트 색상창 style-->
		<div id="prjColorSet" class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="color-popup flow-project-popup-3">
						<div class="flow-project-header-1">
							프로젝트 색상 <a href="#" class="close-event flow-close-type-1"></a>
						</div>
						<div class="flow-content">
							<div class="flow-category-option-3">
								<ul id="selectColorTypes" class="select-color-group">
									<!--선택시 li태그 project-color-check-active-1 추가 -->
									<li class="color-item project-color-type-5" value="5"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-11" value="11"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-1" value="1"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-10" value="10"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-2" value="2"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-7" value="7"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-9" value="9"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-6" value="6"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-3" value="3"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-4" value="4"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-8" value="8"><a href="#"><em></em></a></li>
									<li class="color-item project-color-type-0" value="0"><a href="#"><em></em></a></li>
								</ul>
							</div>
							<div class="flow-pop-button-type-1 margin-bottom-20">
								<button type="button" class="flow-pop-sub-button-1 cancel-event">취소</button>
								<button type="button" class="flow-pop-sub-button-2 submit-event">확인</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 프로젝트 폴더 만들기-->
		<div id=prjFolderMake
			class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="input-popup flow-project-popup-4">
						<div class="flow-project-header-1">
							<span class="popup-title">프로젝트 폴더 만들기</span> <a href="#"
								class="close-event flow-close-type-1"></a>
						</div>
						<div class="flow-content">
						<form id="prjFolderInsert" name="prjFolderInsert" action="prjFoldInsert.do">
							<div class="flow-content-input-1">
								<input id="foldTtlInsert" name="foldTtlInsert" class="popup-input" type="text"
									placeholder="프로젝트 폴더명 (필수)" maxlength="50" data-required-yn="Y"
									data-empty-msg="프로젝트 폴더명을 입력해주세요."
									data-over-msg="50자 이내로 입력하세요.">
							</div>
						</form>							
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="flow-pop-sub-button-1 cancel-event">취소</div>
								</a> <a href="#">
									<div class="flow-pop-sub-button-2 submit-event">확인</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 프로젝트 폴더명 수정하기 -->
		<div id=prjFolderUpdate
			class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="input-popup flow-project-popup-4">
						<div class="flow-project-header-1">
							<span class="popup-title">프로젝트 폴더명 수정하기</span> <a href="#"
								class="close-event flow-close-type-1"></a>
						</div>
						<div class="flow-content">
						<form id="prjFolderUpdate" name="prjFolderUpdate" action="prjFoldUpdate.do">
							<div class="flow-content-input-1">
								<input type="hidden" value="" id="prjFoldId" name="prjFoldId">
								<input id="foldTtlUpdate" name="foldTtlUpdate" class="popup-input" type="text" placeholder="프로젝트 폴더명 (필수)"
									maxlength="50" data-required-yn="Y"
									data-empty-msg="프로젝트 폴더명을 입력해주세요."
									data-over-msg="50자 이내로 입력하세요.">
							</div>
							</form>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="flow-pop-sub-button-1 cancel-event">취소</div>
								</a> <a href="#">
									<div class="flow-pop-sub-button-2 submit-event">확인</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 프로젝트 폴더 삭제 style-->
		<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div
						class="mini-confirm-popup flow-project-popup-3 popup-quit d-none"
						style="display: block">
						<p class="popup-cont contents">프로젝트 폴더를 삭제하시겠습니까? 프로젝트 폴더에 포함된
							프로젝트는 삭제되지 않습니다.</p>
						<div class="flow-pop-button-type-1">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event">취소</div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event">확인</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>




		<!-- 초대하기 클릭시 팝업 -->
		<div id="inviteLayer" class="flow-all-background-1 d-none"
			style="display: none">
			<div class="window_top rigVer">
				<!-- 우측정렬 class="rigVer" 추가 -->
				<div class="dragArea"
					style="display: list-item; -webkit-app-region: drag;"></div>
			</div>
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="inviteMainLayer" class="detail-popup-type-1"
						style="display: none; height: 220px;">
						<div class="detail-popup-header-1">
							<span id="inviteTitle" class="invite-title ellipsis"><i
								class="project-color color-code-${prjInfo.prjColor}"></i>${prjInfo.prjTtl}</span> <a
								class="closeInviteLayerBtn" href="#"><em></em></a>
						</div>
						<ul id="inviteUl">
							<li id="openTeamInvite"><a href="#">
									<div class="detail-popup-icon-1">
										<span></span>
									</div>
									<div class="detail-popuplist-type-1">
										<span>참여자 초대</span> <em>회사 직원을 초대할 수 있습니다.</em>
									</div>
							</a></li>
							<li id="openSendEml"><a href="#">
									<div class="detail-popup-icon-3">
										<span></span>
									</div>
									<div class="detail-popuplist-type-1">
										<span>게스트 초대</span> <em>초대장을 이메일로 발송할 수 있습니다.</em>
									</div>
							</a></li>
						</ul>
					</div>

					<!-- 게스트 이메일 초대장 발송 -->
					<div id="guestsendInviteEmlLayer"
						class="send-invite-email name-type-seach-popup-type-1"
						style="display: none">
						<div class="name-type-seach-popup-header-type-1 margin-bottom-20">
							<a href="#"><em class="returnMainBtn"></em></a> <span>이메일
								초대장 발송</span>
							<button class="btn-close closeInviteLayerBtn">
								<i id="guestLayerX" class="icons-close-1"></i>
							</button>
						</div>
						<div class="invite-email-area scroll-mask">
							<div class="invite-email-list " id="emailList">
								<div class="input-email-type-wrap-1 emailItem">
									<input id="guestEmail" type="text" class="input-email-type-1 emailItemInput"
										placeholder="example@plus.team" data-valid="email"
										maxlength="50" data-required-yn="Y"
										data-empty-msg="이메일을 작성해주세요!"
										data-over-msg="이메일은 50자이내로 작성해주세요!"
										data-un-valid-msg="올바른 이메일을 작성해주세요!"> <a
										class="deleteEmail" href="#"></a>
								</div>
							</div>
							<div class="flow-email-plus-type-1">초대내용 입력</div>
							<div class="flow-email-bottom-section-1">
								<div id="inviteMsg" contenteditable="true"
									class="flow-email-bottom-text-1">
									<textarea id="guestcontents" rows="30" cols="41" style="resize: none">플러스로 업무관리, 파일공유를 한 곳에서! 플러스로 초대합니다.</textarea>
								</div>
							</div>
						</div>
						<div class="flow-pop-button-type-1">
							<a href="#">
								<div id="cancleGuest" class="flow-pop-sub-button-1 returnMainBtn">취소</div>
							</a> <a href="#">
								<div id="guestsendInviteEmail" class="flow-pop-sub-button-2">초대</div>
							</a>
						</div>
					</div>


					<!-- 참여자 초대 -->
					<section id="invitePopup" class="js-dimmed-area imaginary-place js-new-invitation-popup" style="display: none;">
					    <div id="teamInviteLayer" class="project-invite-popup" style="display: block;">
					        <div class="project-invite-popup-header">
					            <a href="#"><em class="returnMainBtn js-back-menu" style="display: inline-block;"></em></a>
					            <span id="teamInviteHeader">참여자 초대</span>
					            <button class="btn-close closeInviteLayerBtn"><i class="icons-close-1"></i></button>
					        </div>
					        <div class="project-invite-popup-body clearfix">
					            <ul class="project-invite-popup-navi" style="display: inherit;">
					                <li class="js-employees on">임직원</li>
					                <li class="js-partners">외부인</li>
					            </ul>
					            <div id="teamInviteArea" class="group-tree-wrap-1 js-group-tree-wrap side-contents">
					
					                <div id="orgInviteSearch" class="project-invite-search">
					                    <i class="icons-search"></i>
					                    <input type="text" id="inviteSearchArea" autocomplete="off" class="project-invite-popup-search-input" placeholder="이름">
					                </div>
					
					                <div class="project-invite-employee-case d-none">
					                    <div class="group-tree-wrap-1 coperate-section-position-fix-1 js-group-tree-wrap d-none">
					                        <div class="loading-area scroll-mask d-none">
					                            <div class="loading type2">
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                            </div>
					                        </div>
					
					                        <ul id="inviteOrgChart" class="project-invite-orgChart scroll-mask" style="display: block !important"></ul>
					                    </div>
					
					                    <div class="group-list-wrap d-none">
					                        <div class="loading-area scroll-mask d-none">
					                            <div class="loading type2">
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                            </div>
					                        </div>
					
					                        <ul id="inviteGroup" class="group-list d-none">
					                        <li>안녕</li>
					                        </ul>
					                    </div>
					                </div>
					
					                <div class="project-invite-ouside-case scroll-mask">
					                    
					                        <div class="loading-area scroll-mask d-none">
					                            <div class="loading type2">
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                                <i class="circle"></i>
					                            </div>
					                        </div>
					
					                        <div class="project-invite-only-list-wrap sub-drag-picture-section-1">
					                        <div id="membersListForInvitation">
					                            <ul class="project-invite-choiceList layer-scroll padding-zero scroll-mask scroll-for-ie" scroll-direction="0">
					                             <c:forEach var="employ" items="${employs}">
												    <li class="js-member-item ">
												        <div class="my-check-2 js-select-Btn"></div>
												        <div class="post-author">
												            <span class="js-profile thumbnail size40 radius16" style="background-image:url(/flow-renewal/assets/images/profile-default.png), url(/flow-renewal/assets/images/profile-default.png)"></span>
												            <dl class="post-author-info">
												                <dt>
												                    <strong class="author">${employ.name}</strong>
												                    <em>${employ.wkpo}</em>
												                </dt>
												                <dd>
												                    <strong class="company">${employ.coUrl}</strong>
												                    <span class="team">${employ.dept}</span>
												                </dd>
												            </dl>
												        </div>
												    </li>
												    </c:forEach>
					                            </ul>
					                        </div>
					
					                        <div id="nullEmplData" class="null-empl-search" style="display: none;">
					                            <div class="null-wr">
					                                <div class="group-sub-null-type-1"></div>
					                                <span>검색 결과가 없습니다.</span>
					                            </div>
					                        </div>
					
					                        
					                        <p class="invite-blank-txt" style="margin-top: auto;margin-bottom: auto;">사용자가 존재하지 않습니다.</p>
					                    </div>
					                </div>
					            </div>
					
					            <div class="project-invite-memberList coperate-icon-list-type-1">
					                <div class="project-invite-selected-num" style="display: none;">
					                    <span id="countFinalElement"></span>
					                    <button id="removeAllElements">전체 삭제</button>
					                </div>
					                <p id="blankInviteTarget" class="right-blank-txt">대상을 선택해주세요.</p>
					
					                <ul id="inviteTargetList"></ul>
					            </div>
					
					        </div>
					        <div class="project-invite-popup-footer">
					            <div class="flow-pop-button-type-1">
					                <a href="#">
					                    <div class="flow-pop-sub-button-1 returnMainBtn">취소</div>
					                </a>
					                <a href="#">
					                    <div id="inviteMembers" class="flow-pop-sub-button-2">초대하기</div>
					                </a>
					            </div>
					        </div>
					
					    </div>
					</section>
				</div>
			</div>
		</div>



		<!-- 참여자 관리 popup-->
		<div id="allSendiencePopup" class="flow-all-background-1"
			style="display: none">
			<div class="flow-project-make-1">
				<div class="flow-project-make-2">
					<div id="allSendienceLayer" class="project-invite-popup-1">
						<div class="name-type-seach-popup-header-type-1">
							<span>참여자 관리</span>
							<button id="closeButton" class="btn-close">
								<i class="icons-close-1"></i>
							</button>
						</div>
						<div class="all-setup-type-2">
							<i class="icons-search"></i> <input type="text"
								id="allSendienceSearch" class="coperate-input-type-1"
								placeholder="참여자명으로 검색">
						</div>
						<div
							class="sub-drag-picture-section-1 overflow-scroll-type-1  scroll-mask">
							<ul id="allSendienceUl" class="all-sendience-ul">
							<c:forEach var="partici" items="${particis}">
							    <li class="js-participant-item">
							        <div class="post-author">
							            <span class="js-profile thumbnail size40 radius16"></span>
							            <dl class="post-author-info">
							                <dt>
							                    <strong id="name" class="author">${partici.name}</strong>
							                    <em></em>
							                </dt>
							                <dd style="display:block">
							                    <strong class="company">${partici.coUrl}</strong>
							                    <span class="team">${partici.dept}</span>
							                </dd>
							            </dl>
							        </div>
							        <c:if test="${partici.prjPerm == 'pm'}">
							   		<a href="#" class="admin-invite-button-1 manager-badge"><span>관리자</span></a>
							   		</c:if>
							        <div id="selectMemberBtn" class="my-check-2" style="display: none;"></div>
							        <c:if test="${sessionScope.memId == partici.memId and partici.prjPerm == 'pm'}">
							        <a id="plusBtn" href="#" class="project-invite-plus-1">
							            <div class="project-invite-plus-circle-1"></div>
							            <div class="project-invite-plus-circle-2"></div>
							            <div></div>
							        </a>
							        <div id="plusPopup" class="project-invite-sub-popup-1 plus-popup" style="display:none">
							            <a id="export" href="#">
							                <div class="invite-active-type-1">내보내기</div>
							            </a>
							            <a id="managerBtn" href="#">
							                <div>관리자로 지정</div>
							            </a>
							        </div>
							        </c:if>
							    </li>
							    </c:forEach>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 글 삭제 style-->
		<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="mini-confirm-popup flow-project-popup-3 popup-quit">
						<p class="popup-cont contents">글을 삭제하시겠습니까?</p>
						<div class="flow-pop-button-type-1">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event">취소</div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event">확인</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 두번창 띄우기 style-->
		<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="confirm-popup flow-project-popup-6">
						<div class="flow-content">
							<div class="flow-content-text">
								<p class="popup-cont"></p>
							</div>
							<div class="flow-pop-button-type-1">
								<a href="#">
									<div class="flow-pop-sub-button-1 cancel-event"></div>
								</a> <a href="#">
									<div class="flow-pop-sub-button-2 submit-event"></div>
								</a>
							</div>
							<a href="#">
								<div class="flow-secondary-submit secondary-submit-event"></div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--  프로젝트 폴더 설정-->
		<div id="prjFolderSet" class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="label-popup allProjLabel-popup flow-project-popup-8">
						<div class="flow-project-header-1">
							<span>프로젝트 폴더 설정</span> <a href="#"
								class="close-event flow-close-type-1"></a>
						</div>
						<ul class="js-label-ul label-set-group scroll-mask">
							
						</ul>
						<div class="flow-pop-button-type-2">
							<a href="#">
								<div class="flow-pop-sub-button-1 cancel-event">취소</div>
							</a> <a href="#">
								<div class="flow-pop-sub-button-2 submit-event">확인</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 로딩페이지(circle) style-->
		<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="loading-area">
						<div class="loading type2">
							<i class="circle"></i> <i class="circle"></i> <i class="circle"></i>
							<i class="circle"></i> <i class="circle"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 로딩페이지(straight) style-->
		<div class="flow-all-background-1 back-area temp-popup" tabindex="0"
			style="display: none">
			<div class="flow-project-make-1 back-area">
				<div class="flow-project-make-2 back-area contents">
					<div class="flow-all-background-1 zindex1000 js-loading-popup">
						<div class="flow-project-make-1">
							<div class="flow-project-make-2">
								<div class="loading-popup flow-project-popup-6">
									<div class="flow-project-header-1">
										<a href="#"
											class="js-cancel-btn loading-cancel flow-close-type-1"></a>
									</div>
									<div class="flow-content">
										<div class="flow-content-text">
											<p class="popup-cont">{contents}</p>
										</div>
										<div class="loading">
											<i class="circle"></i> <i class="circle"></i> <i
												class="circle"></i> <i class="circle"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- //팝업창 화면 -->





	<!-- 전체 화면 -->
	<div id="allMainContent" class="main-wrap">
		<!-- top바 메뉴 -->
		<div class="main-top">
			<tiles:insertAttribute name="top" />
		</div>

		<div id="mainBodyWrap" class="main-body-wrap">

			<!-- 왼쪽 메뉴 id="leftArea"-->
			<div id="leftMenu" class="main-header-1">
				<tiles:insertAttribute name="menu" />
			</div>

			<!-- //main-container  -->
			<tiles:insertAttribute name="main" />
			<!-- //main-container -->
		</div>

		<!-- 프로젝트의 참여자 관리 -->
		<!-- allSendiencePopup -->
		<!-- //allSendiencePopup -->

		<div id="imageViewerItem">
			<div class="image-viewer-wrap js-image-viewer-item d-none"
				tabindex="1" style="overflow: hidden">
				<div class="image-viewer-header">
					<div class="image-title-area">
						<div class="image- title-top" style="color: white">
							<span class="js-img-title image-title"></span> <span
								class="image-size"></span> <span class="image-resolution"></span>
							<span class="secret-image"></span>
						</div>
						<div class="image-title-bottom" style="color: #999">
							<span class="image-user-name"></span> <span
								class="image-upload-date"></span>
						</div>
					</div>
					<a href="#" role="button" class="viewer-close-button"> <span
						class="blind">close</span>
					</a>
				</div>
				<div class="js-container image-viewer-container">
					<a href="#" role="button" class="viewer-button left"
						data-img-idx="-1"> <span class="blind">left</span>
					</a>
					<div class="image-group">
						<div class="js-img-back image-bg"></div>
					</div>
					<a href="#" role="button" class="viewer-button right"
						data-img-idx="1"> <span class="blind">right</span>
					</a>
				</div>

				<div class="image-viewer-footer">
					<div class="btn-editbox left-fix" style="display: block">
						<span class="img-now">1</span>/<span class="js-total-count">2</span>
					</div>
					<div class="btn-editbox">
						<a href="#" role="button" class="image-edit-btn rotate"><span>회전</span></a>
						<a href="#" role="button" class="image-edit-btn plus"> <span>확대</span></a>
						<a href="#" role="button" class="image-edit-btn minus"> <span>축소</span></a>
						<a href="#" role="button" class="image-edit-btn autosize"> <span>초기화</span></a>
					</div>
					<div class="btn-editbox right-fix">
						<a href="#" id="btnDownPic" class="viewer-save"
							data-langcode="CT927">저장</a> <a href="#" role="button"
							class="viewer-save" id="btnAllDownPic"> 전체 저장 </a>
					</div>
				</div>
			</div>
		</div>
	</div>



<script type="text/javascript">
		var $memId = "${sessionScope.memId}";
		var $coUrl = "${sessionScope.coUrl}";

		//전체 메뉴
		//메뉴 클릭시 
		$("#leftTask").find("ul li a").click(function(e) { // 새 프로젝트 팝업창 열기
			$("#leftTask").find("ul li").removeClass("flow-active");
			$(e.target).parent("li").addClass("flow-active");
		});

		//새 프로젝트
		$("#prjMake").click(function(e) { // 새 프로젝트 팝업창 열기
			e.preventDefault();
			$("#overlay").css("display", "block");
			$("#prjMakeLayer").css("display", "block");

			// 카테고리 정보 가져오기
			$.ajax({
				url : "ctgryList.do",
				type : "post",
				dataType : 'json',
				data : {"coUrl" : $coUrl},
				success : function(data) {
					if (data != "") {
						$("#ctgryIdSet").empty();
						var $ctgryNull = $("<option>" + "선택" + "</option>").val("");
						$("#ctgryIdSet").append($ctgryNull);
						for (i = 0; i < data.length; i++) {
							var $ctgry = $("<option>" + data[i].ctgryName+ "</option>").val(data[i].ctgryId);
							$("#ctgryIdSet").append($ctgry);
						} //end of for
					} else if (data == "") {
						$("#errorWrap").find("div:last").text("카테고리가 없습니다.");
						$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
					} //end of elseif
				} //end of function
			}); //end of ajax
		});// 새 프로젝트 팝업창 열기 End
	
		$("#prjMakeLayer").find("button").on("click", function(e) { // 옵션 버튼 클릭시 active
			$(e.target).toggleClass("active");
	
			if ($("#cPrjSet").find("button").hasClass("active")) { 
				$("#prjKndSet").val("C"); // 회사프로젝트 설정
				$("#prjAllSet").find("button").addClass("active"); // 전체공개 설정
				$("#prjOpenPermSet").val("all");
			} else {
				$("#prjKndSet").val("N");	//일반 프로젝트 설정
				
				if ($("#prjAllSet").find("button").hasClass("active")) { // 전체공개 설정
					$("#prjOpenPermSet").val("all");
				} else {
					$("#prjOpenPermSet").val("part");
				}
				
			}
		});//옵션 버튼 클릭 End

		$(".project-submit").click(function(e) { // 프로젝트 만들기 버튼 클릭
			if ($("#prjTtlInput").val() == "") {
				$("#errorWrap").find("div:last").text("제목을 입력하세요.");
				$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
			} else {
				e.preventDefault();
				$.ajax({
					url : "prjInsert.do",
					type : "post",
					dataType : 'json',
					data : {
						"prjKnd" : $("#prjKndSet").val(),
						"prjTtl" : $("#prjTtlInput").val(),
						"prjCntn" : $("#prjCntnInput").val(),
						"prjOpenPerm" : $("#prjOpenPermSet").val(),
						"ctgryId" : $("#ctgryIdSet").val(),
						"coUrl" : $coUrl,
						"memId" : $memId
					},
					success : function(data) {
						$("#successWrap").find("div:last").text("프로젝트가 생성되었습니다.");
						$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);

						prjInsert.submit();
					} //end of function
				}); //end of ajax
			} //end of else
		});// 프로젝트 만들기 End
		//새 프로젝트 End

		//프로젝트 폴더
		$.ajax({ // 프로젝트 폴더 목록 부르기
			url : "folderMenu.do",
			type : "post",
			dataType : 'json',
			data : {"memId" : $memId},
			success : function(data) {
				if (data != "") {
					$("#allFolderUl").empty();
					for (i = 0; i < data.length; i++) {
						$("#allFolderUl").append( // 메뉴의 폴더
								$("<li />").addClass("label-item").append(
								$("<input />").attr("type","hidden").val(data[i].foldId),
								$("<i />").addClass("ico-label"),
								$("<span />").addClass("js-label-name js-mouseover ellipsis").text(data[i].foldName),
								$("<a />").data("fold-id", data[i].foldId).attr("href","javascript:void(0)").addClass("js-label-setting-button flow-dash-three").attr("onclick","FolderMenu(this)")
										.append($('<div />'),$('<div />'),$('<div />'))));
						
						$(".label-set-group").append( //팝업창 폴더
								$("<li />").addClass("label-item").append(
								$("<input />").attr("type","hidden").val(data[i].foldId),
								$("<div />").addClass("label-set-item").append(
									$("<span />").addClass("label-item-text ellipsis").text(data[i].foldName),
									$("<a />").attr("href","#").addClass("js-check-label flow-content-check-type-1"))));
					} //end of for
				} //end of if
			} //end of function
		}); //end of ajax
		
		$(".menu-accordion-button").click(function(e) { // 프로젝트 폴더 toggle
			$(e.target).toggleClass("active");
			$(e.target).next().toggle();
		});
		
		$(".cancel-event").click(function(e) { // 팝업 닫기1
			e.preventDefault();
			$("#overlay").css("display", "none");
			$("#overlay").children("div").css("display", "none");
		});

		$(".close-event").click(function(e) { // 팝업 닫기2
			e.preventDefault();
			$("#overlay").css("display", "none");
			$("#overlay").children("div").css("display", "none");
		});

		$(".btn-close").click(function(e) { // 팝업 닫기3
			e.preventDefault();
			$("#overlay").css("display", "none");
			$("#overlay").children("div").css("display", "none");
			$("#inviteLayer").css("display", "none");
			$("#inviteMainLayer").css("display", "none");
			$('#guestsendInviteEmlLayer').css("display","none");
			$('#teamInviteLayer').css("display","none");
			
		});
		
		$(".back-area").click(function(e) { // 팝업 닫기4(팝업창 외에 검은 바탕 클릭시)
			if ($(e.target).hasClass("back-area")) {
				$("#overlay").css("display", "none");
				$("#overlay").children("div").css("display", "none");
			}
		});

		$("#allLabelLeftButton button").click(function() { // 프로젝트 폴더 만들기 팝업 열기
			$("#overlay").css("display", "block");
			$("#prjFolderMake").css("display", "block");
		});

		$("#prjFolderMake .submit-event").click(function(e) { // 프로젝트 폴더 만들기
			e.preventDefault();
			if ($("#prjFolderMake input").val() == "") {
				$("#errorWrap").find("div:last").text("폴더명을 입력하세요.");
				$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
			} else {
				$.ajax({
					url: "prjFoldInsert.do",
					type: "post",
					datatype: "json",
					data: {
						"memId": $memId,
						"foldName" : $("#foldTtlInsert").val()
						},
					success: function(data){
						$("#successWrap").find("div:last").text("프로젝트 폴더가 생성되었습니다.");
						$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
						prjFolderInsert.submit();
						location.reload();
					}
				});
			}
		});
		//프로젝트 폴더 메뉴 End

		// 초대하기
		$("#openInviteLayerBtn").click(function() { // 초대하기 버튼 클릭
			$("#overlay").css("display", "block");
			$("#inviteLayer").css("display", "block");
			$("#inviteMainLayer").css("display", "block");
		});
		
		$("#openTeamInvite").click(function(e) { // 초대하기 > 회사 직원 초대
			e.preventDefault();
			$("#overlay").css("display", "block");
			$("#invitePopup").css("display", "block");
		});

		$("#openSendEml a").click(function(e) { // 초대하기 > 이메일 초대장 발송
			e.preventDefault();
			$("#overlay").css("display", "block");
			$("#sendInviteEmlLayer").css("display", "block");
		});
		
		$('#openSendEml').on("click", function(e){ // 초대메일 열기
			e.preventDefault();
			$('#guestsendInviteEmlLayer').css("display","block");
		});

		$(".returnMainBtn").on('click', function(e){ // 닫기
			e.preventDefault();
			$('#guestsendInviteEmlLayer').css("display","none");
			$('#teamInviteLayer').css("display","none");
		});
		
		$('.closeInviteLayerBtn').on('click', function(e){ // 초대장 다 닫기
			e.preventDefault();
			$("#overlay").css("display", "none");
			$("#inviteLayer").css("display", "none");
			$("#inviteMainLayer").css("display", "none");
		});
		
		$('#guestsendInviteEmail').click(function(){ //게스트 메일발송
			var email = $('#guestEmail').val();
			var contents = $('#guestcontents').val();
			$.ajax({
				type: "post",
				url: "guestEmailPost.do",
				data: {"email": email, "coUrl": $coUrl, "contents":contents},
				success: function(){
					$("#successWrap").find("div:last").text("초대메일을 발송했습니다.");
					$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
				}
			});
		});
	//게스트 초대 끝
	
	//프로젝트 홈
	$("#allSendienceBtn").click(function(e) { // 참여자 관리
		$("#overlay").css("display", "block");
		$("#allSendiencePopup").css("display", "block");
	});//참여자 전체보기
	</script>



	<script src="flow-renewal/dist/js/commonLib.min.js"></script>
	<script src="flow-renewal/dist/js/common.min.js"></script>
	<script src="flow-renewal/dist/js/module.min.js"></script>

	<script src="flow-renewal/dist/js/main.min.js"></script>
	<script src="flow-renewal/dist/js/mainLib.min.js"></script>

	<script src="flow-renewal/js/main.js"></script>
</body>
</html>