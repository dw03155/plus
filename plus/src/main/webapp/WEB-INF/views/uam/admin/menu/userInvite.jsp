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
	table{
		width: 100%;
		border: 1px solid #D8D8D8;
		border-collapse : collapse;
        left: 30px;
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
	td{
		text-align: center;
		height: 25px;
	}
	#btnDiv{
		padding-top: 10px;
		padding-bottom: 10px;
		float: right;
		width: 210px;
		right: 10%;
	}
	#xlxsInfo{
		padding-top: 10px;
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
				<p>ㆍ1회 최대 100명까지 등록할 수 있습니다.</p>
				<p> (관리자 설정 -> 회사정보 -> 전용URL -> 직원 참여 옵션)</p>
				<p>ㆍ이메일 초대를 통해 이메일을 수신한 직원은 직접 계정 가입 후 바로 이용 가능합니다.<button id="helpBtn" type="button" >도움말 보기</button></p>
			</div>
			<div class="contentsBox">
				<h2>전용 URL</h2>
				<p>전용 URL 주소를 전달하여 회사 직원들을 참여시킬 수 있습니다.</p>
				<div class="coInput">
					<input id="coNameSer" name="coNameSer" type="text" required="required" class="coInputTag"/>
					<button id="btn" class="formIn" type="button">변경</button>
				</div>
			</div>
			<div class="contentsBox">
				<div class="emailSendingForm">
				<h2>이메일 초대</h2>
				<p>직원들의 이메일 주소를 입력하여 바로 초대할 수 있습니다.</p>
					<input type="text" class="emailInput" placeholder="example@gmail.com"/>
					<input type="text" class="emailInput" placeholder="example@gmail.com"/>
					<input type="text" class="emailInput" placeholder="example@gmail.com"/>
					<input type="text" class="emailInput" placeholder="example@gmail.com"/>
					<input type="text" class="emailInput" placeholder="example@gmail.com"/>
					<button id="emailInputBtn" class="blueBtn" type="button">변경</button>
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
				<p>xlxs 파일만 업로드 가능합니다.</p>	
				<input id="xlxsFileUp" type="file">
				<button id="xlxsDoun" class="whiteBtn" type="button" style="width: 180px">엑셀파일 양식 다운로드</button>
			</div>
			<div class="contentsBox">
			<div id="xlxsInfo">
			<span>전체 (갯수)개 ((갯수)개 등록가능, </span><em style="color: red">(갯수)개</em><span> 등록 불가능)</span>
			<span><input type="checkbox">등록 불가능한 행 모아보기</span>
			<div id="btnDiv">
				<button class="whiteBtn" id="lineBtn">전체선택</button>
				<button class="whiteBtn" id="lineDelBtn">삭제</button>
				<button class="blueBtn" id="inBtn">등록</button>
			</div>
			</div>
				<table id="usingMemberList" border="1">
					<thead class="memberthead">
						<tr>
							<th><input type='checkbox'></th>
							<th>이름</th>
							<th>이메일</th>
							<th>휴대폰</th>
							<th>부서</th>
							<th>직책</th>
							<th>회사연락처</th>
						</tr>
					</thead>
					<tbody id="usinglist" >
					</tbody>
				</table>
			</div>
		</div>
		
		<div >
		
		</div>
		</div><!-- main-container end -->
	
	<script>
	
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
			
			
			
	
	</script>
</body>
</html>