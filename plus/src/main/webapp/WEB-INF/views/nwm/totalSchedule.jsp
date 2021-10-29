<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset="UTF-8">
<title>캘린더 메뉴</title>
</head>
<body>
	<div>
		<h1>캘린더</h1>
	</div>
	<!-- 검색 -->
	<div>
		<form id="frm" name="frm" method="post">
			<input type="text" name="notiTtl" id="notiTtl"
				placeholder="일정제목을 검색헤주세요!">
		</form>
	</div>

	<!-- 전체 일정 조회 -->
	<div>
		<table border="1">
		<c:forEach var="sches" items="${sches }">
			<tr>
				<td>${sches.notiTtl }</td>
			</tr>
		</c:forEach>
		</table>
	</div>

</body>
</html>