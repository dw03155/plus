<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<title>InsertMember2</title>
</head>
<body>
	<div align="center">
		<h1>회원가입</h1>
		<div>
			<form action="" name="frm" id="frm">
				<table>
					<tr>
						<th>이메일</th>
						<td><input type="text" id="email" name="email"></td>
					</tr>
					<tr>
						<th>이름</th>
						<td><input type="text" id="name" name="name"></td>
					</tr>
					<tr>
						<th>비밀번호</th>
						<td><input type="password" id="pwd" name="pwd"></td>
					</tr>
					<tr>
						<th>비밀번호 확인</th>
						<td><input type="password" id="pwdCheck" name="pwdCheck">
							<font name="check" size="2" color="red"></font></td>
					</tr>
					<tr>
						<th>회사명</th>
						<td><input type="text" id="coName" name="coName"></td>
					</tr>
					<tr>
						<th>회사URL</th>
						<td><input type="text" id="coUrl" name="coUrl"></td>
					</tr>
				</table>
				<div>
					<button type="button" id="joinBtn" name="btn">이동</button>
				</div>
			</form>
		</div>
	</div>
	<script>
 $(function(){
	 	
	 });
 $(function(){
  $('#pwd').keyup(function(){
   $('font[name=check]').text('');
  }); //#user_pass.keyup

  $('#pwdCheck').keyup(function(){
   if($('#pwd').val()!=$('#pwdCheck').val()){
    $('font[name=check]').text('');
    $('font[name=check]').css("color","red")
    $('font[name=check]').html("암호틀림");
   }else{
    $('font[name=check]').text('');
    $('font[name=check]').css("color","green")
    $('font[name=check]').html("암호맞음");
   }
  }); //#chpass.keyup 
 
 $("#joinBtn").on("click",function(e){
	 if($('#pwd').val()!=$('#pwdCheck').val()){
		 alert("비밀번호를 바르게 입력하세요")
	 }else{
		 memberInsert();
	 }
 });//memberInsert입력
 });
 
 function memberInsert(){
	 var email = $('input:text[name="email"]').val();
	 var name = $('input:text[name="name"]').val();
	 var pwd = $('input:text[name="pwd"]').val();
	 var coName = $('input:text[name="coName"]').val();
	 var coUrl = $('input:text[name="coUrl"]').val();
	 $.ajax({
		 url:"memberInsert.do",
		 method:"post",
		 /* data:JSON.stringify($("#frm").serializeObject()), */
		 data:JSON.stringify({email:email,name:name,pwd:pwd,coName:coName,coUrl:coUrl}),
		 contentType: "application/json",
		 dataType: "json",
		 success:function(data){
			 console.log(data);
			 //메일보내기
		 }
	
	 })
	 
 }
 </script>
</body>
</html>