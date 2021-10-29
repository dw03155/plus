<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="Schedule" class="tabcontent">
		<input type="text" placeholder="제목을 입력하세요.">
		<p>
			날짜설정<input type="checkbox"><label>종일</label>
		</p>
		<div>
			<a href="#">참석자 추가</a><br>
		</div>
		<input type="text" placeholder="장소를 입력하세요.">
		<div>
			<textarea placeholder="내용을 입력하세요."></textarea>
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