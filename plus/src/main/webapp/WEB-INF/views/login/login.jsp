<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<div align="center">
	<h1>로그인</h1>
		<div>
			<form action="login.do" method="post">
<%-- 			<input  type="hidden" name="${_csrf.parmeterName }" value="${_csrf.token }"><!-- csrf 고정값 --> --%>
				<h3>id</h3>
				<input type="text" name="username"><br/>
				<h3>password</h3>
				<input type="password" name="password">
				<div><br/>
				<button>로그인</button>
				</div>
			</form><br/>	
			<div>
				<a href="joinForm.do">회원가입</a>
				<a href="userMenu.do">환경설정</a>
			</div>
		</div>
</div>
</body>
</html>