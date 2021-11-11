<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
	#coNameUpdateBtn{
		width: 80px;
		position: absolute;
		right: -1px;
    	top: -2px;
	}
	.coInputTag{
		width: 200px;
		height: 40px;
		margin: 5px 30px 5px 30px;
	}
	.coInput{
		width: 370px;
		height: 50px;
		border: 1px solid gray;
		border-radius: 10px;
		margin-top: 15px; 
	}
	.formIn{
		width: 100px;
		height: 40px;
		border-left: 1px solid gray;
		float: right;
		margin-top: 3px;
	}
	.searchBox{
	width: 480px;
	height: 100px;
	padding-top: 30px;
	}
	.blueBtn{
		position: absolute;
		padding: 6px 15px 6px 15px;
		background-color: #5882FA;
		color: white;
		border-radius: 3px;
		margin-left: 5px;
		top: 85px;
	}
	.categoty-input{
	width: 100%;
    height: 34px;
    padding: 0 62px 0 38px;
    background: #fff;
    border: 1px solid #ddd;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    text-align: left;
    font-size: 13px;
    font-weight: 700;
    color: #6449fc;
	}	
	table{
		width: 95%;
		border: 1px solid #D8D8D8;
		border-collapse : collapse;
		/* position: absolute;
       top: 150px;
       left: 30px; */
	}
	#memBtn{
		width: 75px;
		border: 1px solid gray;
	}
	#memBtn2{
		width: 50px;
		border: 1px solid gray;
	}
	.prjthead{
		height: 30px; 
		background-color: #F9F8FD
	}
	td{
		text-align: center;
		height: 25px;
	}
	#btnDiv{
		padding-top: 2%;
		float: right;
		width: 130px;
	}
	.prj_modal{
	width: 700px;
	height: 400px;
    position: absolute;
    top: 22%;
    right: 28%;
    z-index: 13;
    background: #fff;
    border: 1px solid #777;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
    color: #555;
    display: none;
    align-content: center;
	}
	.model_heard{
		height: 40px;
		padding: 10px;
		
	}
	#prj_model_x{
		float: right;
		width: 15px;
	}
	#inputBorder{
		border: 1px solid silver;
	}
	#adminAdd{
		border: 1px solid silver;
		padding: 3px 7px 3px 7px;
		background-color: white;
	}
	#prjlist{
		cursor: pointer;
	}
</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" style="margin-bottom: 10px;">회사 정보</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
		</div><!-- project-detail-top end -->
		<div id="sendLayer" class="project-detail-inner layer-scroll type2">
			<div class="searchBox">	
				<div id="detailTopSearch" class="project-search-area all-file-header-type-3">
					<div class="project-search">
						<input id="categoryInput" type="text"
							placeholder="프로젝트명을 입력해주세요." class="categoty-input"
							 maxlength="50" />
						<div id="projectDetailSearchLayer"
							class="name-type-seach-popup d-none"
							data-search-area-code="IN_PROJECT" style="top: 38px; right: 0px">
						</div>
					</div>
					<button id="categoryIn" class="blueBtn">검색</button>
				</div><!-- ditailTopSearch end -->
		 	</div>
		 </div>
		 <div id="project" class="project-detail-inner layer-scroll type2">
				<table id="projectList" border="1" 
				style="position: absolute; top: 150px; left: 30px;">
					<thead class="prjthead">
						<tr>
							<th></th>
							<th>프로젝트</th>
							<th>관리자수</th>
							<th>참여자수</th>
							<th>게시물수</th>
						</tr>
					</thead>
					<tbody id="prjlist" >
					<c:forEach var="coPrj" items="${coPrjs }">
						<tr  class="pmList">
							<td><input type="hidden" value="${coPrj.prjId }"></td>
							<td>${coPrj.prjTtl }</td>
							<td>${coPrj.pmCnt }</td>
							<td>${coPrj.memCnt }</td>
							<td>${coPrj.notiCnt }</td>
						</tr>
					</c:forEach>
					</tbody>
				</table>
			 </div><!-- usingMember end -->
			 <div id="prjModal" class="prj_modal">	
			<div class="model_heard">
				<span style="font-size: 18px; font-weight: bold;">&nbsp;회사 프로젝트 정보</span>
				<a href="#"><img id="prj_model_x" src="/img/ico/x_icn.png"></a>
			</div>
			<div align="center" style="margin-left: 10px; margin-right: 10px; height: 300px; overflow: scroll;">
			<hr>
				<table style="border: 1px solid; border-color: white; margin: 10px 0 10px 0;">
					<tr>
						<td style="text-align: left;">프로젝트명</td>
						<td style="text-align: left;"><span id="inputBorder">
						<input type="text" id="prjTTL" name="prjTTL" style="width: 450px"></span></td>
					</tr>
					<tr>
						<td style="text-align: left;">관리자</td>
						<td style="text-align: left;"><input type="button" id="adminAdd" name="adminAdd" value="추가"></td>
					</tr>
				</table>
				<div>
					<table id="projectInfoList" border="1">
					<thead class="prjInfothead">
						<tr>
							<th></th>
							<th>관리자명</th>
							<th>이메일</th>
							<th>부서</th>
							<th>휴대폰번호</th>
							<th>관리자</th>
						</tr>
					</thead>
					<tbody id="prjAdmin" >
					</tbody>
				</table>
				</div>
			</div>
			<div align="center">
				<button type="button" id="ctgDel" class="blueBtn" style="position: static; top: 500px">확인</button>
				<button type="button" id="ctgCancel" class="blueBtn" 
				style="position: static; top: 500px; background-color: white; color: black; border: 1px solid silver;">취소</button>
			</div>
		</div>
	</div><!-- main-container end -->
<script>

function PMlist(data){
	for(i=0; i<data.length; i++){
		var $prjId = data[i].prjId;
		var $prjTtl = data[i].prjTtl;
		var $name = data[i].name;
		var $memId = data[i].memId;
		var $email = data[i].email;
		var $dept = data[i].dept;
		var $persTel = data[i].persTel;
		$('#prjTTL').val($prjTtl);
		$('<tr>').append($('<td>').append($('<input type=\'hidden\'>').val($memId)))
				.append($('<td>').html($name))
				.append($('<td>').html($email))
				.append($('<td>').html($dept))
				.append($('<td>').html($persTel))
				.append($('<td>').append($('<a href="#" class="pmDel">').html("[해제]")))
				.append($('<td>').append($('<input type=\'hidden\'>').val($prjId)))
		 		.appendTo($('#prjAdmin'));
	}//for end
};

	$('.pmList').click(function(){
		var tr = $(this);
		var prjId = tr.children().children().val();

		$.ajax({
			url: "getCoPrjInfo.do?prjId="+ prjId,
			method: "get",
			datatype: "json",
			success: function(data){
				$('#prjAdmin').empty();
				if(data == ""){
					$('<tr>').append($('<td style="colspan: 7">').html("관리자가 없습니다."))
				}else{
					PMlist(data);
				}
				$("#prjModal").css("display","block");
				
				$(".pmDel").click(function(){
					var pmdel = $(this);
					var tr = pmdel.parent().parent();
					var memId = tr.children().first().children().val();
					var prjId = pmdel.parent().next().children().val();
					var jsondata = {"memId":memId, "prjId": prjId};
					$.ajax({
						url: "coPrjPMChange.do",
						method: "put",
						data: JSON.stringify(jsondata),
						contentType: "application/json",
						dataType: "json",
						success: function(){
							tr.remove();
						}
					})
				});
			}
		})
		
	});
	
	
	$("#prj_model_x").click(function(){
		$("#prjModal").css("display","none")
	});
	$("#ctgCancel").click(function(){
		$("#prjModal").css("display","none")
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</script>

</body>
</html>