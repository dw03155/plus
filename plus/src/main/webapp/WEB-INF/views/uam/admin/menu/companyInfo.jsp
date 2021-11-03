<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
		position: absolute;
	}
</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >회사 정보</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
		 
		</div><!-- project-detail-top end -->
		<div id="detailTimeline" class="project-detail-inner layer-scroll type2">
			<div class="section-2 middle-line js-project-section js-label-section">
				<p class="project-class join">회사명</p>
				<div class="coInput">
					<input id="coNameSer" name="coNameSer" type="text" required="required" class="coInputTag"/>
					<button id="btn" class="formIn" type="button">변경</button>
				</div>
			</div>
			<div class="section-2 middle-line js-project-section js-label-section">
				<p class="project-class join">로고설정</p>
				<div class="coInput">
						<input id="logoInput" name="logoInput" type="file" class="coInputTag" multiple>
						<button id="logoIn" class="formIn" type="submit">로고등록</button>
				</div>
				<div id="showfiles"></div>
			</div>
			<div class="section-2 middle-line js-project-section js-label-section">
				<p class="project-class join">전용URL</p>
			</div>
		 </div><!-- detailTimeline end -->
	</div><!-- main-container end -->
<script>
	$(function(){
		var coUrl = "${sessionScope.coUrl}";
		$.ajax({
			url: "getCompany.do?coUrl="+coUrl,
			type : "get",
			dataType : "json",
			success : function(data) {
				var $coName = data.coName;
				$('#coNameSer').val($coName);
			}
		})
		
	});
	
	//파일 업로드
	$("#logoIn").on("click",function(e){
		var formData = new FormData();
		var logoInput = $("#logoInput");
		var files = logoInput[0].files;
	});
	$("#logoInput").change(function(){
		$("#showfiles").empty();
		var tb = $("<table border='1'/>");
		var fileInput = $("input[name='uploadFile']");
		var files = fileInput[0].files;
		for(var i= 0; i<files.length; i++){
			var row = $("<tr/>").append(
			$("<tb width='150'/>").text(files[i].name));
			tb.append(row);
		}
		
		$("#showfiles").append(tb);
	});
		
	$("#btn").on("click", function(){
		var coUrl = "${sessionScope.coUrl}";
		var coName = $("#coNameSer").val();
		var jsondata = {"coUrl": coUrl,"coName":coName};
		if(coName == null){
			alert("회사이름을 입력해주세요.")
		}else{
			$.ajax({
				url: "coNameUpdate.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(data){
					alert("회사명을 업데이트 했습니다.")
				},
				error: function(){
					alert("회사명을 입력해주세요.")
				}
			});
		}
	});
</script>

</body>
</html>