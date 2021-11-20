<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
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
					<button id="chengebtn" class="formIn" type="button">변경</button>
				</div>
			</div>
			<div class="section-2 middle-line js-project-section js-label-section">
				<p class="project-class join">로고설정</p>
				<div class="coInput">
						<input id="logoInput" name="logoInput" type="file" class="coInputTag" accept="image/jpeg,image/png,image/jpg">
						<button id="logoIn" class="formIn" type="submit">로고등록</button>
				</div>
				<p style="color: silver; font-size: 12px; margin-top: 5px">권장사항-200*100px, 배경없는 PNG파일</p>
				<div id="showfiles"></div>
			</div>
			<div class="section-2 middle-line js-project-section js-label-section">
				<!-- <p class="project-class join">전용URL</p> -->
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
	$("#chengebtn").on("click", function(){
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
	
	//파일 업로드
	$("#logoIn").on("click",function(e){
		var formData = new FormData();
		var coLogo = null;
		var coUrl = "${sessionScope.coUrl}";
		var logoInput = $("#logoInput");
		var files = logoInput[0].files;
		console.log(files);
		for(var i= 0; i<files.length; i++){
			formData.append("logoInput", files[i]);
			coLogo = files[i].name;
		}
			$.ajax({
				url: 'uploadLogo.do',
				processData: false,
				contentType: false,
				data: formData,
				type: 'POST',
				success: function(result){
					var $coUrlUni = result.key +"_"+ coLogo;
					$("#logoInput").val();
					$("#showfiles").empty();//<div>리셋
					alert("Uploaded");
					var jsondata = {"coUrl": coUrl,"coLogo":$coUrlUni};
					$.ajax({
						url: 'companyLogoUpdate.do',
						type: 'put',
						data: JSON.stringify(jsondata),
						contentType: "application/json",
						dataType: "json",
						success: function(){
							alert("로고를 변경했습니다");
							var coUrl = "${sessionScope.coUrl}";
							$.ajax({
								url: "getLogo.do?coUrl="+coUrl,
								type: "get",
								datatype: "json",
								success: function(data){
									var $coLogo = data.coLogo;
									var logoPath = "/logo/"+$coLogo+ "?heigth=50";
									$("#coLogoImg").attr("src",logoPath);
									console.log($coLogo);
								}
							})
						},
						error:function(){
							alert(${message });
						}
					})
				},
				error: function(){
					alert("파일을 입력해주세요")
				}
			}); //end of $.ajax
		
		
	});
	//파일보기
	$().ready(function(){
		$("#logoInput").change(function(){
			$("#showfiles").empty();
			var tb = $("<table border='1'/>");
			var logoInput = $("input[name='logoInput']");
			var files = logoInput[0].files;
			for(var i= 0; i<files.length; i++){
				var row = $("<tr/>").append(
				$("<tb width='150'/>").text(files[i].name));
				tb.append(row);
			}
			
			$("#showfiles").append(tb);
		});
	});
	
	
</script>

</body>
</html>