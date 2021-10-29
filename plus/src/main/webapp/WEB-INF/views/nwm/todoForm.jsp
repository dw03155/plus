<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="Todo" class="tabcontent">
		<input type="text" placeholder="제목을 입력하세요.">
		<div>
			<input type="text">
			<button type="button">달력</button>
			<button type="button">참석자</button>
			<button type="button">추가</button>
			<button type="button">삭제</button>
		</div>
		<select>
			<option>전체공개</option>
			<option>프로젝트 관리자만</option>
		</select>
		<button type="button"
			onclick="location.href='noticeWritingSelectList.do'">올리기</button>
	</div>
</body>
</html>