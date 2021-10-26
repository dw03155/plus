<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<title>Insert title here</title>
</head>
<body>


	<div align="center">


		<span style="color: green; font-weight: bold;">이메일 인증 (이메일을 인증
			받아야 다음 단계로 넘어갈 수 있습니다.)</span> <br> <br> <br> <br>



		<div id="di1">
			<table border="1" width="300" height="300">
				<div style="text-align: center;">
					<tr>
						<td>

							<form method="post">
								<br>
								<div>
									이메일 : <input type="email" name="email" id="email"
										placeholder="  이메일주소를 입력하세요. ">
								</div>
								<div>
									<br> <br>
									<button id="btn" type="button" name="submit">이메일 인증받기
										(이메일 보내기)</button>
								</div>
							</form>
						</td>
					</tr>
			</table>
		</div>
		<div id="di2" style="display: none">
			<table border="1" width="300" height="300">
				<div style="text-align: center;">
					<tr>
						<td>
							<form method="post">
								<br>
								<div>
									인증번호 : <input type="text" name="joinNum" id="joinNum">
								</div>
								<div id="divre">
									<br> <br>
									<span id="re"></span>
									<button id="join" type="button" name="join">확인</button>
								</div>
							</form>
						</td>
					</tr>

			</table>
		</div>
	</div>
	<script>
		$('#btn').on("click", function() {
			var email = $("#email").val();
			
			$('#di2').css("display", "block");
			$('#di1').css("display", "none");

			if (email == "") {
				alert("메일입력하시오");
			} else {
				$.ajax({
					type : "post",
					url : "joinMail.do",
					data : {
						email : email
					},
					/* dataType : "json", */
					success: function(key){
						
						alert(email + "로 인증메일이 발송되었습니다.");
						isCartification = true;
						console.log(key);
						
						$("#joinNum").on("change keyup paste", function(){
							if($("#joinNum").val() == key){
								$("#re").append("<span/>").text("인증");
								isCartification = true;
							}else{
								$("#re").append("<span/>").text("불일치");
								isCartification = false;
							}
						})
					}
				});
					
				
			}
		});
		

	</script>
</body>
</html>