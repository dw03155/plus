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
		<!-- 전체 파일 -->
		<ul id="fileFilter"
			class="js-left-filter-ul menu-accordion-group scroll-mask d-none">
			<li>
				<div
					class="js-accordion-button menu-accordion-button active left-menu-item">
					파일유형 <i class="ico-arrow"></i>
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
</body>
</html>