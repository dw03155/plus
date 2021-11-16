<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
	.inviteInfo{
		padding: 20px;
		background-color: #F9F8FD;
		margin-top: 20px;
	}
	#helpBtn{
		float: right;
		background-color: gray;
		color: white;
		width: 100px;
		height: 30px;
		font-size: 16px;
	}
	.contentsBox{
		margin-top: 10px;
	}
	.coInput{
		width: 370px;
		height: 50px;
		border: 1px solid gray;
		border-radius: 10px;
		margin-top: 15px; 
	}
	.coInputTag{
		width: 200px;
		height: 40px;
		margin: 5px 30px 5px 30px;
	}
	.formIn{
		width: 100px;
		height: 40px;
		border-left: 1px solid gray;
		float: right;
		margin-top: 3px;
	}
	.emailSendingForm{
		width: 400px;
	}
	.emailInput{
		width: 350px;
		height: 40px;
		border: 2px solid #BDBDBD;
		margin-top: 10px;
	}
	.blueBtn{
		padding: 6px 15px 6px 15px;
		background-color: #5882FA;
		color: white;
		border-radius: 2px;
		margin-top: 10px;
	}
	.whiteBtn{
		padding: 6px 15px 6px 15px;
		border: 1px solid gray;
		background-color: white;
		border-radius: 2px;
		margin-top: 10px;
	}
	#insertMemberList{
		width: 100%;
		border: 1px solid #D8D8D8;
		border-collapse : collapse;
        left: 30px;
        padding-bottom: 20px;
	}
	#memBtn{
		height: 15px;
		border: 1px solid gray;
	}
	#memBtn2{
		height: 15px;
		border: 1px solid gray;
	}
	.memberthead{
		height: 30px; 
		background-color: #F9F8FD
	}
	#insertMemberList td{
		text-align: center;
		height: 25px;
	}
	#invitebtnDiv{
		padding-top: 10px;
		padding-bottom: 10px;
		float: right;
		width: 118px;
		right: 10%;
	}
	#xlxsInfo{
		padding-top: 10px;
		vertical-align: bottom;
	}
	#checkth{
		width: 50px;
	}
	.redBox{
		border: 1px solid red;
	}
	.blueBox{
		border: 1px solid blue;
	}
	.normalBox{
	}
	
</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >사용자 초대 / 일괄 등록</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
			<ul id="detailTab" class="project-detail-menu">
				<li class="js-tab-item active" id="send"><a>초대</a></li>
				<li class="js-tab-item" id="allSend"><a>일괄 등록</a></li>
			</ul>
		</div><!-- project-detail-top end -->
		<div id="sendLayer" class="project-detail-inner layer-scroll type2">
			<div class="inviteInfo">
				<p>ㆍ이메일 초대를 통해 이메일을 수신한 직원은 직접 계정 가입 후 바로 이용 가능합니다.<button id="helpBtn" type="button" >도움말 보기</button></p>
			</div>
			<div class="contentsBox">
				<h2>전용 URL</h2>
				<p>전용 URL 주소를 전달하여 회사 직원들을 참여시킬 수 있습니다.</p>
				<div class="coInput">
					<input id="coNameSer" name="coNameSer" type="text" required="required" class="coInputTag" readonly="readonly"/>
					<button id="copybtn" class="formIn" type="button">복사</button>
				</div>
			</div>
			<div class="contentsBox">
				<div class="emailSendingForm">
				<h2>이메일 초대</h2>
				<p>직원들의 이메일 주소를 입력하여 바로 초대할 수 있습니다.</p>
					<input type="text" id="emailInput1" class="emailInput" placeholder="example@gmail.com"/>
					<button id="emailInputBtn" class="blueBtn" type="button">전송</button>
				</div>
			</div>
		</div>
		
		<div id="allSendLayer" class="project-detail-inner layer-scroll type2" style="display: none;">
			<div class="inviteInfo">
				<p>ㆍ1회 최대 100명까지 등록할 수 있습니다.</p>
				<p>ㆍ"등록 불가능한 행 모아보기" 체크박스 체크시, 관렴된 행만 모아볼 수 있습니다.</p>
				<p>ㆍ등록 완료 시, 사용자가 비밀번호를 설정하고 서비스를 시작할 수 있도록 안내 메일을 발송합니다.</p>
				<p>ㆍ등록된 사용자는 최종 "사용자관리" 메뉴에서 확인할 수 있습니다.<button id="helpBtn" type="button" >도움말 보기</button></p>
			</div>
			<div class="contentsBox">
				<p style="color: silver;">xls 파일만 업로드 가능합니다.</p>	
				<form id="excelUploadForm" name="excelUploadForm" action="xlsxUplord.do" method="post" enctype="multipart/form-data" style="display: inline;">
				<input id="file" name="file" type="file" style="border: 1px;">
				</form>
				<button type="submit" id="fileUp" class="blueBtn" onclick="check()">추가</button>
				<button id="xlsxDoun" onclick="location.href='/xlsxFile/xlsxdownload/플러스 회원일괄초대 엑셀입력 양식.xls'" value="플러스 회원일괄초대 엑셀입력 양식.xls" class="whiteBtn" type="button" style="width: 180px">엑셀파일 양식 다운로드</button>
			</div>
			<div class="contentsBox">
			<div id="xlsxInfo">
			<span>전체&nbsp;'<em id="allcnt"></em>'개 ('
			<em id="okcnt"></em>'개 등록가능,&nbsp;'
			<em id="nocnt" style="color: red"></em>'개 등록 불가능, '
			<em id="dulcnt"  style="color: blue"></em>'개 중복)</span>
			<!-- <span><input type="checkbox">등록 불가능한 행 모아보기</span> -->
			<div id="invitebtnDiv">
				<button class="whiteBtn" id="lineDelBtn">삭제</button>
				<button class="blueBtn" id="inBtn">등록</button>
			</div>
			</div>
				<table id="insertMemberList" border="1">
					<thead class="memberthead">
						<tr>
							<th id="checkth"><input type='checkbox' id="allCheckBox" style="max-width: 50px; min-width: 50px;"></th>
							<th>이름</th>
							<th>이메일</th>
							<th>휴대폰</th>
							<th>부서</th>
							<th>직책</th>
							<th>회사연락처</th>
						</tr>
					</thead>
					<tbody id="insertlist">
						<!-- <tr>
							<td><input type="checkbox" class="fileCheck"></td>
							<td><span><input name="view" value="박지민"></span></td>
							<td><span><input name="view" value="riri@naver.com"></span></td>
							<td><span><input name="view" value="01066568889"></span></td>
							<td><span><input name="view" value="지각대장"></span></td>
							<td><span><input name="view" value="대장"></span></td>
							<td><span><input name="view" value="2105"></span></td>
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>
		
		<div >
		
		</div>
		</div><!-- main-container end -->
	
	<script>
	$(function(){
		var courl = "${sessionScope.coUrl}";
		var url = "http://192.168.0.3/userJoin.do?newCoUrl=" + courl;
		$("#coNameSer").val(url);
	})
	
	$("#copybtn").click(function(){
		$("#coNameSer").select();
		var success = document.execCommand("copy");
		if(success) {
			alert("링크복사").fadeOut(1000);
		}
	})
	
	$('#lineDelBtn').click(function(){
		if(confirm("회원을 삭제하시겠습니까?")){
			var fileCheck = $(".fileCheck:checked");
			fileCheck.each(function(i){
				var tr = fileCheck.parent().parent();
				tr.remove();
				
			})
		}
	});
			
	$('#inBtn').click(function(){
		if(confirm("회원을 입력하시겠습니까?")){
			var fileCheck = $(".fileCheck:checked");
			var coUrl = "${sessionScope.coUrl}";
			fileCheck.each(function(i){
				var tr = fileCheck.parent().parent().eq(i);
				var td = tr.children();
				var emailVal = td.eq(2).children().children().val();
				var name = td.eq(1).children().children().val();
				var email = td.eq(2).children().children().val();
				var persTel = td.eq(3).children().children().val();
				var dept = td.eq(4).children().children().val();
				var wkpo = td.eq(5).children().children().val();
				var coTel = td.eq(6).children().children().val();
				var jsondata = {"coUrl":coUrl,"name":name,"email":email,"persTel":persTel,"dept":dept,"wkpo":wkpo,"coTel":coTel};
					
				$.ajax({
					url: "AllMemberInsert2.do",
					method: "put",
					data: JSON.stringify(jsondata),
					contentType: "application/json",
					dataType: "json",
					success: function(data){
						tr.remove();
					}
				})
					
			})
		}
		
	})
	
	function checkFileType(filePath){
		var fileFormat = filePath.split(".");
		
		if(fileFormat.indexOf("xls") > -1){
			return true;
		} else {
			return false;
		}
	}

	
	function check(){
		var file = $('#file').val();
		if (file == "" || file == null){
			alert("파일을 선택해주세요.");
			return false;
		}else if (!checkFileType(file)){
			alert("엑셀(xls)파일만 업로드하세요.");
			return false;
		}
		if (confirm("업로드하시겠습니까?")){
			var formData = new FormData(document.excelUploadForm);
			$.ajax({
				url: "xlsxUplord.do",
				processData: false,
				contentType: false,
				data: formData,
				type: 'post',
				success: function(data){
				
					alert("업로드")
					if(data != ""){
						$('#insertlist').empty();
						fileView(data);
						
					}else{
						alert("파일에 데이터가 없습니다.")
					}
				},
				error:function(){
					alert("파일오류")
				}
			})
		}
	};
	
	function fileView(data){
			console.log(data);
		for(i=0; i<data.length; i++){
			var $email = data[i]["email"];
			var $name = data[i]["name"];
			var $persTel = data[i]["persTel"];
			var $dept = data[i]["dept"];
			var $wkpo = data[i]["wkpo"];
			var $coTel = data[i]["coTel"];
				if($email == 0 && $name == 0 && $persTel == 0 && $dept == 0 && $wkpo == 0 && $coTel == 0){
				}else{				
				$('<tr>').append($('<td>').append($('<input type="checkbox" class="fileCheck">')))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($name))))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($email))))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($persTel))))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($dept))))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($wkpo))))
						 .append($('<td>').append($('<span>').append($('<input name="view">').val($coTel))))
						 .appendTo($('#insertlist'));
				
				var fileTd = $('.fileCheck').parent().nextAll();
				var fileTr = $('#insertlist').children();
				var filevalue = $('input[name=view]');
				
					for(j=0; j<fileTd.length; j++){		
						for(k=0; k<fileTr.length; k++){
							var fileVal = filevalue.eq(j).val();
							//console.log(fileVal);
							var fileSpan = $('input[name=view]').parent().eq(j);
							var fileCheckBox = fileSpan.parents('tr').find('.fileCheck').eq(k);
								if(fileVal == ''){
									fileSpan.attr("class","redBox");
									fileCheckBox.attr("disabled",true);
							}else{
								fileSpan.attr("class","normalBox");
							}							
						}
					}
				}
			}
				emailDuplicateCheck();
				count();
		
		
		
		
		$('input[name=view]').on("change",function(){
			var fileInput = $(this);
			var checkBox = fileInput.parents('tr').find('.fileCheck');
			var fileIn = fileInput.val();
			var filenameval = fileInput.parents('tr').children().eq(1).children().children().val();
			var fileemailval = fileInput.parents('tr').children().eq(2).children().children().val();
			var filepersTelval = fileInput.parents('tr').children().eq(3).children().children().val();
			var filedeptval = fileInput.parents('tr').children().eq(4).children().children().val();
			var filewkpoval = fileInput.parents('tr').children().eq(5).children().children().val();
			var filecoTelval = fileInput.parents('tr').children().eq(6).children().children().val();
			if(fileIn == ""){
				checkBox.attr("disabled",true);
			}else if( fileIn != "" && filenameval != "" && fileemailval != "" && filepersTelval != "" && filedeptval != "" && filewkpoval != "" && filecoTelval != ""){
				checkBox.attr("disabled",false);
			}
			
			
			$('input[name=view]').on("change",function(){
				var fileInput = $(this);
				var checkBox = fileInput.parents('tr').find('.fileCheck');
				var fileIn = fileInput.val();
				if(fileIn == ""){
					fileInput.parent().attr("class","redBox");
				}else{
					fileInput.parent().attr("class","normalBox");
					
				}
			});

			
			var arr = new Array();
			var tr = $('#insertlist').children();
			var answer = false;
				result = [];
			for(i=0; i<tr.length; i++){
				
				var emails = $('#insertlist').children().eq(i).children().eq(2).children().children().val();
				arr.push(emails);
				var data = arr;
			}
			
			emailDuplicateCheck();
			
			count();
		});

		$("#checkth #allCheckBox").on('click',function(){
			if($('#allCheckBox').prop("checked")){
				$(".fileCheck:not(:disabled)").prop("checked",true);
			}else{
				$(".fileCheck:not(:disabled)").prop("checked",false);
			}
		});
		
		
	};
	
	function emailDuplicateCheck(){
		var arr = new Array();
		var tr = $('#insertlist').children();
		var answer = false;
		var	result = [];
		for(i=0; i<tr.length; i++){
			var emails = $('#insertlist').children().eq(i).children().eq(2).children().children().val();
			arr.push(emails);
			var data = arr;
		}
		function getData(arr){
			for(i=0; i<arr.length; i++){
			var value = data[i];
			var chk = 0;
				for(j=0; j<data.length; j++){
					if(data[j].indexOf(value) != -1) chk++
				}
				if(chk> 1){
					result.push(value);
					for(m=0; m<tr.length; m++){
						var emailDup = $('#insertlist').children().eq(m).children().eq(2).children().children();
						var checkbox = emailDup.parents('tr').children().eq(0).children();
						
						for(n=0; n<result.length; n++){
							if(result[n] == emailDup.val()){
								console.log(result[n]);
 								emailDup.parent().attr("class","blueBox");
								checkbox.attr("disabled",true);
							}
						}
						
					}
					
				}
			}
		return result;
		}
		
		answer = getData(data).length > 0? true : false;
	};
		
	function count(){			
			var allcnt = $('#insertlist').children().length;
			var nocnt = $(".redBox").parent().parent().length;
			var dulcnt =$(".blueBox").parent().parent().length;
			$('#allcnt').text(allcnt);
			$("#nocnt").text(nocnt);
			$("#okcnt").text(allcnt-nocnt);
			$("#dulcnt").text(dulcnt);
		
		}
	$("#checkth #allCheckBox").on('click',function(){
		if($('#allCheckBox').prop("checked")){
			$(".fileCheck:not(:disabled)").prop("checked",true);
		}else{
			$(".fileCheck:not(:disabled)").prop("checked",false);
		}
	});
	
			$("#send").on("click", function(){
				$('#send').attr("class","js-tab-item active");
				$('#allSend').attr("class","js-tab-item");
				$('#sendLayer').css("display","block");
				$('#allSendLayer').css("display","none");
			});
			$("#allSend").on("click", function(){
				$('#allSend').attr("class","js-tab-item active");
				$('#send').attr("class","js-tab-item");
				$('#allSendLayer').css("display","block");
				$('#sendLayer').css("display","none");
			});
			
			$('#emailInputBtn').click(function(){
				var coUrl = "${sessionScope.coUrl}";
				var email = $("#emailInput1").val();
					$.ajax({
						type: "post",
						url: "userInviteMail.do",
						data:{"email":email, "coUrl":coUrl},
						success:function(){
							alert(email + "로 인증메일이 발송되었습니다.");
						}
					})
			})
			
	
	</script>
</body>
</html>