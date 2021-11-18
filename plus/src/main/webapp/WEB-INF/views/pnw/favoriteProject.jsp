<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<div class="main-container">

	<!-- 프로젝트 편집 -->
	<div id="favorProjectEditBar" class="top-banner-1 top-select"
		style="display: none">
		<div class="top-banner-2">
			<ul id="favorEditButton" class="total-edit-group">
				<li class="edit-button color"><a href="#"
					class="top-banner-icon-type-1"> <em></em>색상 설정
				</a></li>
				<li class="edit-button label"><a href="#"
					class="top-banner-icon-type-2"> <em></em>프로젝트 폴더 설정
				</a></li>
			</ul>
			<div id="favorEditSelect" class="menu-text-popup-1">
				<span class="select-count">0개 프로젝트가 선택되었습니다.</span> <em
					class="select-clear">선택취소</em>
			</div>
		</div>
		<a href="#" id="favorEditCloseButton"
			class="main-container-close-button-1"></a>
	</div>

	<!-- 프로젝트 홈 메인 -->
	<div id="topSettingBar" class="main-header">
		<div id="mainTop" class="title-1">즐겨찾기</div>

		<span id="allCollectionCount"
			class="js-collection-total-count js-collection-count top-task-num"></span>

		<div id="projectHomeTop" class="main-sub-header">
			<div class="home-menu clearfix">
				<div class="home-menu-left">
					<a href="#">
						<div id="favorBoardTypeButton"
							class="menu-select-icon-type-1 type-button js-mouseover on"
							mouseover-text="바둑판 타입"></div>
					</a> <a href="#">
						<div id="favorListTypeButton"
							class="menu-select-icon-type-2 type-button js-mouseover"
							mouseover-text="리스트 타입"></div>
					</a>
				</div>
				<div class="home-menu-right">
					<a href="#" id="favorProjectEditButton"
						class="project-edit-button">
						<div class="menu-select-icon-type-4"></div> <span
						class="menu-select-icon-type-4-text">설정</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 프로젝트 조회 -->
	<div id="mainContent" class="main-content scroll-mask"
		scroll-direction="0">
		<div id="favoriteProjectHomeLayer" class="project-home-wrap"
			style="display: block">
			<div class="small-style-wrap">
				<div class="section-wrap">

					<!-- 바둑판 타입 -->
					<div id="BoardArea" class="project-board-wr" style="display: block">
						<div class="section-1">
							<ul id="projectBoardUl" class="project-group clearfix">
								<c:if test="${not empty joinPrjs}">
									<div class="section-1 js-project-section js-label-section">
										<p class="project-class">참여한 프로젝트</p>
									</div>
									<c:forEach var="joinPrj" items="${joinPrjs}">
										<li class="project-item ui-state-default"><a href="#">
												<form action="prjHome.do" method="post">
													<input name="prjId" type="hidden" value="${joinPrj.prjId}" />
												</form> <!-- 체크버튼 flow-content-chk-1  li태그 active 추가(갯수 셀때, li 값 넘길때)-->
												<button class="edit-check flow-content-chk"
													style="display: none"></button>
												<div
													class="color-code left-menu-type-1 color-code-${joinPrj.prjColor}"></div>
												<div class="left-menu-type-con">
													<div
														class="project-star flow-content-star flow-content-star"></div>
													<div class="flow-content-txt project-ttl">${joinPrj.prjTtl}</div>
													<div class="flow-content-b-c">
														<div class="flow-content-hm-txt">
															<i class="icons-person-2"></i>
														</div>
														<span class="member-cnt">${joinPrj.partiCnt}</span>
														<div class="flow-content-fl-r">
															<c:if test="${joinPrj.prjKnd == 'N'}">
																<c:if test="${joinPrj.prjOpenPerm == 'part'}">
																	<div
																		class="project-stat-ico flow-content-jms-ico js-mouseover"
																		mouseover-text="일반 프로젝트 : 참여자공개"
																		style="display: block"></div>
																</c:if>
																<c:if test="${joinPrj.prjOpenPerm == 'all'}">
																	<div
																		class="project-stat-ico icon-open-project js-mouseover"
																		mouseover-text="일반 프로젝트 : 전체공개" style="display: block"></div>
																</c:if>
															</c:if>
															<c:if test="${joinPrj.prjKnd == 'C'}">
																<div class="project-stat-ico icon-company js-mouseover"
																	mouseover-text="회사 프로젝트" style="display: block"></div>
															</c:if>
														</div>
													</div>
												</div>
										</a></li>
									</c:forEach>
								</c:if>
								<c:if test="${not empty noJoinPrjs}">
									<div
										class="section-2 middle-line js-project-section js-label-section">
										<p class="project-class join">참여하지 않은 프로젝트</p>
									</div>
									<c:forEach var="noJoinPrj" items="${noJoinPrjs}">
										<li class="project-item ui-state-default"><a href="">
												<form action="prjHome.do" method="post">
													<input name="prjId" type="hidden" value="${noJoinPrj.prjId}" />
												</form> <!-- 업데이트된 글 개수 --> 
												<div
													class="color-code left-menu-type-1 color-code-${noJoinPrj.prjColor}"></div>
												<div class="left-menu-type-con">
													<div
														class="project-star flow-content-star flow-content-star"></div>
													<div class="flow-content-txt project-ttl">${noJoinPrj.prjTtl}</div>
													<div class="flow-content-b-c">
														<div class="flow-content-hm-txt">
															<i class="icons-person-2"></i>
														</div>
														<span class="member-cnt">${noJoinPrj.partiCnt}</span>
														<div class="flow-content-fl-r">
															<c:if test="${noJoinPrj.prjKnd == 'N'}">
																<c:if test="${noJoinPrj.prjOpenPerm == 'part'}">
																	<div
																		class="project-stat-ico flow-content-jms-ico js-mouseover"
																		mouseover-text="일반 프로젝트 : 참여자공개"
																		style="display: block"></div>
																</c:if>
																<c:if test="${noJoinPrj.prjOpenPerm == 'all'}">
																	<div
																		class="project-stat-ico icon-open-project js-mouseover"
																		mouseover-text="일반 프로젝트 : 전체공개" style="display: block"></div>
																</c:if>
															</c:if>
															<c:if test="${noJoinPrj.prjKnd == 'C'}">
																<div class="project-stat-ico icon-company js-mouseover"
																	mouseover-text="회사 프로젝트" style="display: block"></div>
															</c:if>
														</div>
													</div>
												</div>
										</a></li>
									</c:forEach>
								</c:if>
							</ul>
						</div>
					</div>

					<!-- 리스트 타입 -->
					<div id="ListArea" class="project-list-wr" style="display: none">
						<ul id="projectListUl" class="section-list-1">
							<c:if test="${not empty joinPrjs}">
								<div class="section-1 js-project-section js-label-section">
									<p class="project-class">참여한 프로젝트</p>
								</div>
								<c:forEach var="joinPrj" items="${joinPrjs}">
									<li class="project-item ui-state-default"><a href="">
											<form action="prjHome.do" method="post">
												<input name="prjId" type="hidden" value="${joinPrj.prjId}" />
											</form> <!-- 체크버튼 -->
											<button class="edit-check flow-content-chk d-none"
												style="display: none"></button>
											<div
												class="color-code flow-content-list flow-content-po-t color-code-${joinPrj.prjColor}"></div>
											<div
												class="project-star flow-content-po-t flow-content-star-2"></div>
											<span class="project-ttl">${joinPrj.prjTtl}</span>
											<div class="flow-content-hm-txt">
												<i class="icons-person-2"></i>
											</div> <span class="member-cnt">${joinPrj.partiCnt}</span> <!-- 업데이트된 글 개수 -->
											<strong class="project-badge" style="display: none">0</strong>
											<div class="flow-content-fl-r">
												<c:if test="${joinPrj.prjKnd == 'N'}">
													<c:if test="${joinPrj.prjOpenPerm == 'part'}">
														<div
															class="project-stat-ico flow-content-jms-ico js-mouseover"
															mouseover-text="일반 프로젝트 : 참여자공개" style="display: block"></div>
													</c:if>
													<c:if test="${joinPrj.prjOpenPerm == 'all'}">
														<div
															class="project-stat-ico icon-open-project js-mouseover"
															mouseover-text="일반 프로젝트 : 전체공개" style="display: block">
														</div>
													</c:if>
												</c:if>
												<c:if test="${joinPrj.prjKnd == 'C'}">
													<div class="project-stat-ico icon-company js-mouseover"
														mouseover-text="회사 프로젝트" style="display: block"></div>
												</c:if>
											</div>
									</a></li>
								</c:forEach>
							</c:if>
							<c:if test="${not empty noJoinPrjs}">
								<div
									class="section-2 middle-line js-project-section js-label-section">
									<p class="project-class join">참여하지 않은 프로젝트</p>
								</div>
								<c:forEach var="noJoinPrj" items="${noJoinPrjs}">
									<li class="project-item ui-state-default"><a href="">
											<form action="prjHome.do" method="post">
												<input name="prjId" type="hidden" value="${noJoinPrj.prjId}" />
											</form> <!-- 체크버튼 -->
											<button class="edit-check flow-content-chk d-none"
												style="display: none"></button>
											<div
												class="color-code flow-content-list flow-content-po-t color-code-${noJoinPrj.prjColor}"></div>
											<div
												class="project-star flow-content-po-t flow-content-star-2"></div>
											<span class="project-ttl">${noJoinPrj.prjTtl}</span>
											<div class="flow-content-hm-txt">
												<i class="icons-person-2"></i>
											</div> <span class="member-cnt">${noJoinPrj.partiCnt}</span> <!-- 업데이트된 글 개수 -->
											<strong class="project-badge" style="display: none">0</strong>
											<div class="flow-content-fl-r">
												<c:if test="${noJoinPrj.prjKnd == 'N'}">
													<c:if test="${noJoinPrj.prjOpenPerm == 'part'}">
														<div
															class="project-stat-ico flow-content-jms-ico js-mouseover"
															mouseover-text="일반 프로젝트 : 참여자공개" style="display: block"></div>
													</c:if>
													<c:if test="${noJoinPrj.prjOpenPerm == 'all'}">
														<div
															class="project-stat-ico icon-open-project js-mouseover"
															mouseover-text="일반 프로젝트 : 전체공개" style="display: block">
														</div>
													</c:if>
												</c:if>
												<c:if test="${noJoinPrj.prjKnd == 'C'}">
													<div class="project-stat-ico icon-company js-mouseover"
														mouseover-text="회사 프로젝트" style="display: block"></div>
												</c:if>
											</div>
									</a></li>
								</c:forEach>
							</c:if>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		// 바둑판 타입 리스트
		$("#favorBoardTypeButton").click(function() {
			$("#favorBoardTypeButton").addClass("on");
			$("#favorListTypeButton").removeClass("on");
			$("#BoardArea").css("display", "block");
			$("#ListArea").css("display", "none");
		});
		// 리스트 타입 리스트
		$("#favorListTypeButton").click(function() {
			$("#favorListTypeButton").addClass("on");
			$("#favorBoardTypeButton").removeClass("on");
			$("#ListArea").css("display", "block");
			$("#BoardArea").css("display", "none");
		});
	
		// 프로젝트 색상설정, 폴더설정 메뉴
		$("#favorProjectEditButton").click(function(e) { // 열기
			e.preventDefault();
			$("#favorProjectEditBar").css("display", "block");
			$(".edit-check").css("display", "block");
		});
	
		//별 클릭시 즐겨찾기 삭제
		$("#favoriteProjectHomeLayer .project-star").click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			$(e.target).toggleClass("flow-content-star-un");
			var $prjId = $(e.target).closest("li").find("input").val();
			$.ajax({
				url : "prjNoFavor.do?prjId="+$prjId+"&memId="+${sessionScope.memId},
				type : "delete",
				dataType : "json",
				success : function(data) {
					$("#successWrap").find("div:last").text("적용되었습니다.");
					$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
					location.reload();
				}
			});
		});
	
	
		// 프로젝트 설정 메뉴 열려있을 때 체크버튼 클릭하기 / 프로젝트 이동하기
		$("#favoriteProjectHomeLayer").find("li > a").click(function(e) {
			e.preventDefault();
			if ($("#favorProjectEditBar").css("display") == "block") { //프로젝트 색상설정, 폴더설정 메뉴 열려있을 때
				if ($(e.currentTarget).find(".edit-check").hasClass("flow-content-chk")) { // 체크 안했을 때
					$(e.currentTarget).find(".edit-check").removeClass("flow-content-chk");
					$(e.currentTarget).find(".edit-check").addClass("flow-content-chk-1");
					$(e.currentTarget).closest("li").addClass("active");
				} else { // 체크 했을 때
					$(e.currentTarget).find(".edit-check").addClass("flow-content-chk");
					$(e.currentTarget).find(".edit-check").removeClass("flow-content-chk-1");
					$(e.currentTarget).closest("li").removeClass("active");
				}
				$(".select-clear").click(function() { // 선택취소 클릭 시
					$(".edit-check").removeClass("flow-content-chk-1");
					$(".edit-check").addClass("flow-content-chk");
					$("#favoriteProjectHomeLayer").find("li").removeClass("active");
					
					$("#favorEditSelect span").empty();
					$("#favorEditSelect span").text("0개 프로젝트가 선택되었습니다.");
				});
				var checkCnt = $(".flow-content-chk-1").length; // 프로젝트 선택 후 개수세기
				$("#favorEditSelect span").empty();
				$("#favorEditSelect span").text(checkCnt + "개 프로젝트가 선택되었습니다.");
				
				$(".top-banner-icon-type-1").click(function(){ // 프로젝트 색상설정 팝업 열기
					if(checkCnt == 0){
						$("#errorWrap").find("div:last").text("프로젝트를 선택해주세요.");
						$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
					}else if(checkCnt > 0){
						$("#prjColorSet").css("display", "block");
						$("#overlay").css("display", "block");
						
						$("#selectColorTypes a").click(function(ev){ // 프로젝트 색상 선택
							ev.preventDefault();
							$("#selectColorTypes li").removeClass("project-color-check-active-1");
							$(ev.target).closest("li").toggleClass("project-color-check-active-1");
						
							// 색상 선택 후 색상 번호 가져오기
							var $prjColorPick = $(".project-color-check-active-1").val();
								
							$("#prjColorSet .submit-event").click(function(){ //프로젝트 색상설정 팝업 확인버튼 클릭
								if($prjColorPick == null){ // 색상 선택 X
									$("#errorWrap").find("div:last").text("색상을 선택해주세요.");
									$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
								}else{						// 색상 선택시
									for (i = 0; i < checkCnt; i++) {
										var $chkPrjId = $("#prjHomeLayer .active input").eq(i).val();
										$.ajax({
											url : "prjColorUpdate.do?memId="+$memId+"&prjId="+$chkPrjId+"&prjColor="+$prjColorPick,
											type : "put",
											dataType : "json",
											success : function(data) {
											}
										});
									}
									$("#successWrap").find("div:last").text("수정되었습니다.");
									$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
									location.reload();
								}
							});
						});
					}
				});
				
				$(".top-banner-icon-type-2").click(function(){ // 프로젝트 폴더설정 팝업 열기
					if(checkCnt == 0){
						$("#errorWrap").find("div:last").text("프로젝트를 선택해주세요.");
						$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
					}else if(checkCnt > 0){
						$("#prjFolderSet").css("display", "block");
						$("#overlay").css("display", "block");
						
						$(".js-check-label").click(function(ev){ // 프로젝트 폴더 선택
							e.preventDefault();
							$(".js-check-label").removeClass("flow-content-check-type-2");
							$(ev.target).addClass("flow-content-check-type-2");
							
							// 폴더 선택 후 폴더 번호 가져오기
							var $prjFolderPick = $(".flow-content-check-type-1").val();
							
							$("#prjFolderSet .submit-event").click(function(){ //프로젝트 폴더설정 팝업 확인버튼 클릭
								if($prjFolderPick == null){ // 폴더 선택 X
									$("#errorWrap").find("div:last").text("폴더를 선택해주세요.");
									$("#errorWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
								}else{						// 폴더 선택시
									for (i = 0; i < checkCnt; i++) {
										var $chkPrjId = $("#prjHomeLayer .active input").eq(i).val();
										$.ajax({
											url : "prjColorUpdate.do",
											type : "post",
											dataType : 'json',
											data : {
												foldId : $prjFolderPick,
												prjId : $chkPrjId
											},
											success : function(data) {
											}
										});
									}
									$("#successWrap").find("div:last").text("수정되었습니다.");
									$("#successWrap").children("div").fadeIn(1000).delay(1500).fadeOut(1000);
									location.reload();
								}
							});
						});
					}
				});
			} else if(!$(e.target).hasClass("project-star")) {
				$(e.currentTarget).children("form").submit(); // 프로젝트 홈 이동하기
			}
		});
			$("#favorEditCloseButton").click(function(e) { // 닫기
				e.preventDefault();
				$("#favorEditSelect span").text("0개 프로젝트가 선택되었습니다.");
				$("#favorProjectEditBar").css("display", "none");
				$(".edit-check").addClass("flow-content-chk").removeClass(
						"flow-content-chk-1");
				$("#selectColorTypes li").removeClass("project-color-check-active-1");
				$("#favoriteProjectHomeLayer li").removeClass("active");
				$(".edit-check").css("display", "none");
			});
	</script>