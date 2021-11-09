<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
.searchBox{
	width: 480px;
	height: 100px;
	padding-top: 30px;
}
#categorySeach{
	top: 11%;
	left: 41px;
	z-index: 10;
	position: absolute;
	width: 15px;
}
table{
	width: 40%;
	border: 1px solid #D8D8D8;
	border-collapse : collapse;
	position: absolute;
       top: 150px;
       left: 30px;
}
.memberthead{
	height: 30px; 
	background-color: #F9F8FD
}
td{
	text-align: center;
	height: 25px;
}
.blueBtn{
		position: absolute;
		padding: 6px 15px 6px 15px;
		background-color: #5882FA;
		color: white;
		border-radius: 3px;
		margin-left: 5px;
		top: 86px;
	}
.ctgry_del_modal{
	width: 400px;
	height: 200px;
    position: absolute;
    top: 35%;
    right: 45%;
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
	height: 30px;
	padding: 10px;
	
}
#ctgry_model_x{
	float: right;
	width: 15px;
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
</style>
</head>
<body>
<div class="main-container">
	<div id="topSettingBar" class="main-header" style="height: 54px">
		<div id="menuName" class="project-detail-header">
			<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >공개 프로젝트 카테고리</h3>
		</div>
	</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix" style="padding-bottom: 10px">
		</div><!-- project-detail-top end -->
		<div id="sendLayer" class="project-detail-inner layer-scroll type2">
			<div class="searchBox">	
				<div id="detailTopSearch" class="project-search-area all-file-header-type-3">
					<div class="project-search">
						<input id="categoryInput" type="text"
							placeholder="추가할 카테고리명을 입력해주세요." class="categoty-input"
							 maxlength="50" />
						<div id="projectDetailSearchLayer"
							class="name-type-seach-popup d-none"
							data-search-area-code="IN_PROJECT" style="top: 38px; right: 0px">
						</div>
					</div>
					<button id="categoryIn" class="blueBtn">추가</button>
				</div><!-- ditailTopSearch end -->
		 	</div>
		 </div>
		 <div id="openCategory" class="project-detail-inner layer-scroll type2">
				<table id="openCategoryList" border="1">
					<thead class="memberthead">
						<tr>
							<th>
							<th>카테고리</th>
							<th width="100px">프로젝트수</th>
							<th width="100px">삭제</th>
						</tr>
					</thead>
					<tbody id="categoryList" >
							<c:forEach var="ctgry" items="${ctgrys }">
							<tr>
								<td><input type="hidden" value="${ctgry.ctgryId }"></td>
								<td>${ctgry.ctgryName }</td>
								<td>${ctgry.cnt }</td>
								<td><a href="#" class="ctgryDelete">[삭제]</a></td>
							</tr>
							</c:forEach>
					</tbody>
				</table>
			 </div><!-- usingMember end -->
		<div id="ctgModal" class="ctgry_del_modal" >	
			<div class="model_heard">
				<a href="#"><img id="ctgry_model_x" src="/img/ico/x_icn.png"></a>
			</div>
			<div align="center" style="margin: 25px; 0px;">
				<h2>카테고리를 삭제하시겠습니까?</h2>
				<p>카테고리에 포함된 프로젝트는 삭제되지 않습니다.</p>
			</div>
			<div align="center">
				<button type="button" id="ctgDel" class="blueBtn" style="position: static;">확인</button>
			</div>
		</div>
</div><!-- main-container end -->
<script>
	
	$('#ctgry_model_x').on("click",function(){
		$('#ctgModal').css("display","none");
	});
	
	
	$("#categoryIn").click(function(){
		var ctgryName = $('#categoryInput').val();
		var coUrl = "${sessionScope.coUrl}";
		var jsondata = {"ctgryName":ctgryName,"coUrl":coUrl};
		$.ajax({
			url: "categoryInsert.do",
			method: "post",
			data: JSON.stringify(jsondata),
			contentType : "application/json",
			dataType : "json",
			success : function(data) {
				$('#categoryInput').val("");
				getCategoryList();
			}
		})
	});
	
	
	function getCategoryList(data){
		var coUrl = "${sessionScope.coUrl}";
		$.ajax({
			url: "getCategoryList.do?coUrl=" + coUrl,
			method: "Get",
			datatype: "json",
			success: function(result){
				$('#categoryList tr').remove();
				for(i=0; i<result.length; i++){
				var $ctgryId = result[i].ctgryId;
				var $ctgryName = result[i].ctgryName;
				console.log($ctgryName + $ctgryId + $cnt);
				var $cnt = result[i].cnt;
					$('<tr>').append($('<td>').append($('<input type=\'hidden\'>').val($ctgryId)))
						.append($('<td>').html($ctgryName))
						.append($('<td>').html($cnt))
						.append($('<td>').append($('<a href=\'#\' class=\'ctgryDelete\'>').html("[삭제]")))
				 		.appendTo($('#categoryList'));
				}
				$(".ctgryDelete").on("click",function(){

					var checkBtn = $(this);
					
					var tr = checkBtn.parent().parent();
					var td = tr.children();
					
					var ctgryId = td.eq(0).children().val();
					console.log(ctgryId);
					var jsondata = {"ctgryId":ctgryId};
					$('#ctgModal').css("display","block");
					$('#ctgDel').click(function(){
						 $.ajax({
							url: "prjCategoryUpdate.do",
							method: "put",
							data: JSON.stringify(jsondata),
							contentType: "application/json",
							dataType: "json",
							success: function(){
								checkBtn.parent().parent().remove();
								$('#ctgModal').css("display","none");
							}
						}); 
					});	
				});
				
			}
		});
	}
	$(".ctgryDelete").on("click",function(){

		var checkBtn = $(this);
		
		var tr = checkBtn.parent().parent();
		var td = tr.children();
		
		var ctgryId = td.eq(0).children().val();
		console.log(ctgryId);
		var jsondata = {"ctgryId":ctgryId};
		$('#ctgModal').css("display","block");
		$('#ctgDel').click(function(){
			 $.ajax({
				url: "prjCategoryUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(){
					checkBtn.parent().parent().remove();
					$('#ctgModal').css("display","none");
				}
			}); 
		});	
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</script>
</body>
</html>