<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
 .fileInfo{
 	display: inline-block;
 	max-height: 53.6px;
 	padding-left: 20px;
 	padding-right: 20px;
 	text-overflow: ellipsis;
 }
</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header">
			<div id="mainTop" class="title-1" style="display: block">
				<div>파일함</div>
			</div>

			<span id="allCollectionCount"
				class="js-collection-total-count js-collection-count top-task-num"
				style="display: block"></span>
		</div>


		<!-- 파일함 페이지 -->
		<div id="mainContent" class="main-content scroll-mask"
			scroll-direction="0">
			<div id="allCollectView" class="all-collect-wrap d-none"
				style="height: 100%; display: block;">
				<div id="mainScroll" class="main-scroll padding-left-right-30 type3">
				
					<div class="allFileLayer full-width small-style-wrap-2 d-none"
						style="display: block;">
						<div class="btns-wr">
							<div class="project-search-area all-file-header-type-3">
								<div class="project-search">
									<i class="icons-search"></i> <input type="text"
										placeholder="파일명을 검색해주세요!" autocomplete="off" maxlength="20"
										class="js-file-search-input project-search-input">
									<div class="js-file-detail-search-layer name-type-seach-popup d-none"
										data-search-area-code="IN_FILE" style="top: 40px; left: 0px;">
									</div>
								</div>
							</div>
						</div>
						<div id="fileItemArea" class="all-file-area list" >
								<ul id="fileItemUlHead" class="js-sort-layer file-item-head">
									<li>
										<div class="js-sort-file all-file-list-name-type-4" style="width: 25%">
											<span class="all-file-list-sort ">프로젝트명<em></em></span>
										</div>
										<div class="js-sort-file all-file-list-name-type-4" style="width: 49%">
											<span class="all-file-list-sort ">파일명<em></em></span>
										</div>
										<div class="js-sort-file all-file-list-name-type-2" style="width: 23%;">
											<span class="all-file-list-sort">등록자<em></em></span>
										</div>
									</li>
								</ul>
								<ul id="fileLayerUl" class="js-file-list-layer layer-scroll file-select-wrap scroll-mask">
									
								</ul>
									
						</div>

						<div id="fileMenuPopupItem" style="display: none;">
							<div
								class="js-file-menu-layer flow-small-layer-1 all-file-popup-position-fix-1">
								<a href="#" id="downloadFile" class="js-file-menu-button">
									<div class="download-file-button">
										<i></i> <span>다운로드</span>
									</div>
								</a> 
								<a href="#" id="viewerFile" class="js-file-menu-button">
									<div class="viewer-file-button">
										<i></i> <span>열기</span>
									</div>
								</a> 
								<a href="#" id="moveFile" class="js-file-menu-button">
									<div class="flow-name-move">
										<i></i> <span>이동</span>
									</div>
								</a> 
								<a href="#" id="nameChange" class="js-file-menu-button">
									<div class="flow-name-size">
										<i></i> <span>이름 변경</span>
									</div>
								</a> 
								<a href="#" id="deleteFolder" class="js-file-menu-button">
									<div class="flow-dash-icon">
										<i></i> <span>삭제</span>
									</div>
								</a> 
								<a href="#" id="detailFileView" class="js-file-menu-button">
									<div class="detail-file-button">
										<i></i> <span>상세보기</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		$(function(){
			var memId = "${sessionScope.memId}";
			$.ajax({
				url: "taskFileList.do?memId="+memId,
				type: "get",
				dataType: "json",
				success: function(data){
					if(data != ""){
						for(i=0; i<data.length; i++){
						var $tskFile = data[i].tskFile;
						var $notiId = data[i].notiId;
						var $name = data[i].name;
						var $memId = data[i].memId;
						var $prjId = data[i].prjId;
						var $prjTtl = data[i].prjTtl;
					console.log(data);
							$('<li class="js-file-list js-selectable ui-selectee no-external">')
									 .append($('<div class="fileInfo" align="center" style="width: 25%;">').text($prjTtl))
									 .append($('<div name="filesDown" class="fileInfo" align="center" style="width: 49%;">').text($tskFile)
											 .append($('<a class="fileslocation" >')))
									 .append($('<div class="fileInfo" align="center" style="width: 23%;">').text($name))
									 .appendTo("#fileLayerUl")
						}
					}
					
				}
			});//taskFileList
			
			$.ajax({
				url: "textFileList.do?memId="+memId,
				type: "get",
				dataType: "json",
				success: function(result){
					if(result != ""){
						for(i=0; i<result.length; i++){
						var $txtFile = result[i].txtFile;
						var $notiId = result[i].notiId;
						var $name = result[i].name;
						var $memId = result[i].memId;
						var $prjId = result[i].prjId;
						var $prjTtl = result[i].prjTtl;
							console.log(result);
							console.log(location);
							$('<li class="js-file-list js-selectable ui-selectee no-external">')
									 .append($('<div class="fileInfo" align="center" style="width: 25%;">').text($prjTtl))
									 .append($('<div name="filesDown" class="fileInfo" align="center" style="width: 49%;">').text($txtFile)
											 .append($('<a class="fileslocation" >')))
									 .append($('<div class="fileInfo" align="center" style="width: 23%;">').text($name))
									 .appendTo("#fileLayerUl")
							console.log($('.fileslocation')); 
							
						}
						
					}
					
				}
			});//textFileList
			
			$.ajax({
				url: "subTaskFileList.do?memId="+memId,
				type: "get",
				dataType: "json",
				success: function(value){
					if(value != ""){
						for(i=0; i<result.length; i++){
						var $tskFile = data[i].subtskFile;
						var $notiId = data[i].notiId;
						var $name = data[i].name;
						var $memId = data[i].memId;
						var $prjId = data[i].prjId;
						var $prjTtl = data[i].prjTtl;
							$('<li class="js-file-list js-selectable ui-selectee no-external">')
									 .append($('<div class="fileInfo" align="center" style="width: 25%;">').text($prjTtl))
									 .append($('<div name="filesDown" class="fileInfo" align="center" style="width: 49%;">').text($subtskFile)
											 .append($('<a class="fileslocation" >')))
									 .append($('<div class="fileInfo" align="center" style="width: 23%;">').text($name))
									 .appendTo("#fileLayerUl")
						}
						
					}
					
				}
			});//subTaskFileList
			
		$('.fileInfo').click(function(){
			var fileInfo = $(this);
			console.log(location);
			var link = fileInfo.children();
			link.herf = /uploadFiles/+fileInfo.text();
			link.click();
			
		});
		})// list end
		

	</script>
</body>
</html>