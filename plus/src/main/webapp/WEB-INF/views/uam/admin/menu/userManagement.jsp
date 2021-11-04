<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
	table{
		width: 80%;
		border: 1px solid #D8D8D8;
		border-collapse : collapse;
		position: absolute;
        top: 150px;
        left: 100px;
	}
	#memBtn{
		width: 80px;
		border: 1px solid gray;
		border-collapse : collapse;
        position: absolute;
        top: 120px;
        right: 290px;
	}
	#memBtn2{
		width: 80px;
		border: 1px solid gray;
		border-collapse : collapse;
        position: absolute;
        top: 120px;
        right: 200px;
	}
	.memberthead{
		height: 30px; 
		background-color: #F9F8FD
	}
	td{
		text-align: center;
		height: 25px;
	}

</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >사용자 관리</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
			<ul id="detailTab" class="project-detail-menu">
				<li class="js-tab-item active" id="using"><a>정상<span id="usingCount"></span></a></li>
				<li class="js-tab-item" id="notused"><a>이용중지<span id="notusedCount"></span></a></li>
				<li class="js-tab-item" id="outstand"><a>가입대기<span id="outstantCount"></span></a></li>
				<li class="js-tab-item" id="guest"><a>게스트<span id="guestCount"></span></a></li>
			</ul>
			<div id="detailTopSearch"
				class="project-search-area all-file-header-type-3">
				<i class="icons-search"></i>
				<div class="project-search">
					<input id="projectSearchInput" type="text"
						placeholder="검색어를 입력해주세요" class="project-search-input"
						autocomplete="off" maxlength="50" />
					<div id="projectDetailSearchLayer"
						class="name-type-seach-popup d-none"
						data-search-area-code="IN_PROJECT" style="top: 38px; right: 0px">
					</div>
				</div>
				
			</div><!-- ditailTopSearch end -->
		</div><!-- project-detail-top end -->
		
		<!-- 정상사용자 -->
		<div id="usingMember" class="project-detail-inner layer-scroll type2">
			<button id="memBtn">전체선택</button>
			<button id="memBtn2">삭제</button>
			<table id="usingMemberList" border="1">
				<thead class="memberthead">
				<tr>
					<th>이름</th>
					<th>부서</th>
					<th>직책</th>
					<th>이메일</th>
					<th>휴대폰</th>
					<th>관리자</th>
					<th>삭제</th>
				</tr>
				</thead>
				<tbody id="usinglist" >
				</tbody>
			</table>
		 </div><!-- usingMember end -->
		 
		 <!-- 사용중지 -->
		 <div id="notUsedMember" class="project-detail-inner layer-scroll type2" style="display: none">
			<table id="notUsedMemberList" border="1">
				<thead class="memberthead">
				<tr>
					<th>이름</th>
					<th>이메일</th>
					<th>휴대폰</th>
				</tr>
				</thead>
				<tbody id="notUsedlist">
				</tbody>
			</table>
		 </div><!-- notUsedMember end -->
		 
		 <!-- 가입대기 -->
		 <div id="outstandMember" class="project-detail-inner layer-scroll type2" style="display: none">
			<table id="outstandMemberList" border="1">
				<thead class="memberthead">
				<tr>
					<th>이름</th>
					<th>이메일</th>
					<th>휴대폰</th>
					<th>설정</th>
				</tr>
				</thead>
				<tbody id="outstandlist">
				</tbody>
			</table>
		 </div><!-- notUsedMember end -->
		 
	</div><!-- main-container end -->
	
	<script>
	$(function(){
			var coUrl = "${sessionScope.coUrl}";
			//정상사용자
			$.ajax({
				url: "getUsingMemberList.do?coUrl="+coUrl,
				type : "get",
				dataType : "json",
				success : function(data) {
					for(i=0; i<data.length; i++){
						var item = data[i];
						$('<tr>').append($('<td>').html(item.name))
				 				.append($('<td>').html(item.dept))
								.append($('<td>').html(item.wkpo))
							 	.append($('<td>').html(item.email))
							 	.append($('<td>').html(item.persTel))
							 	.append($('<td>').html(item.memPerm))
							 	.append($('<td>').html('<input type=\'checkbox\'>'))
							 	.append($('<input type=\'hidden\' id=\'usingMemId\'>').val(item.memId))
							 	.appendTo($('#usinglist'))
								 
					}
					$('#usingCount').text('('+data.length+')');
				}
			});	
			//이용중지 사용자
			$.ajax({
				url: "getNotusedMemberList.do?coUrl="+coUrl,
				type : "get",
				dataType : "json",
				success : function(result) {
					if(result != null){
						for(i=0; i<result.length; i++){
							var user = result[i];
							$('<tr>').append($('<td>').html(user.name))
									.append($('<td>').html(user.email))
									.append($('<td>').html(user.persTel))
									.append($('<input type=\'hidden\' id=\'notusedMemId\'>').val(user.memId))
									.appendTo($('#notUsedlist'))
									 
						}
						$('#notusedCount').text('('+result.length+')');
					}else{
						$('<tr>').append($('<td colspan=\'3\'>').html("NODATE"))
								 .appendTo($('#notUsedlist'))
					}
				},
				error: function(){
					$('<tr>').append($('<td colspan=\'3\'>').html("ERROR"))
					 .appendTo($('#notUsedlist'))
				}
			});
			//가입대기
			$.ajax({
				url: "getOutstandMemberList.do?coUrl="+coUrl,
				type : "get",
				dataType : "json",
				success : function(re) {
					if(re != null){
						for(i=0; i<re.length; i++){
							var member = re[i];
							$('<tr>').append($('<td>').html(member.name))
									.append($('<td>').html(member.email))
									.append($('<td>').html(member.persTel))
									.append($('<input type=\'hidden\' id=\'outstandMemId\'>').val(member.memId))
									.appendTo($('#outstandlist'))	 
						}//for end
					}else{
						$('<tr>').append($('<td colspan=\'3\'>').html("NODATE"))
								 .appendTo($('#outstandlist'))
					}
					$('#outstantCount').text('('+re.length+')');
				},
				error: function(){
					$('<tr>').append($('<td colspan=\'3\'>').html("ERROR"))
					 .appendTo($('#outstandlist'))
				}
			});
	});
				
			$("#using").on("click", function(){
				$('#using').attr("class","js-tab-item active");
				$('#notused').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#usingMember').css("display","block");
				$('#notUsedMember').css("display","none");
				$('#outstandMember').css("display","none");
			});
			$("#notused").on("click", function(){
				$('#notused').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#notUsedMember').css("display","block");
				$('#usingMember').css("display","none");
				$('#outstandMember').css("display","none");
			});
			$("#outstand").on("click", function(){
				$('#outstand').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#notused').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#outstandMember').css("display","block");
				$('#notUsedMember').css("display","none");
				$('#usingMember').css("display","none");
			});
			$("#guest").on("click", function(){
				$('#guest').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#notused').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
			});
			
			
	
	</script>
</body>
</html>