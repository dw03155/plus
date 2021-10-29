<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="Task" class="tabcontent">
		<input type="text" placeholder="제목을 입력하세요.">
		<div>
			<button type="button">요청</button>
			<button type="button">진행</button>
			<button type="button">피드백</button>
			<button type="button">완료</button>
			<button type="button">보류</button>
		</div>
		<div>
			<a href="#">담당자 추가</a><br> <a href="#">시작일 추가</a><br> <a
				href="#">마감일 추가</a>
		</div>
		<div>
			<textarea placeholder="내용을 입력하세요."></textarea>
		</div>
		<div>
			<h4>하위업무</h4>
			<button type="button">+ 하위업무 추가</button>
		</div>
		<button type="button">클립</button>
		<select>
			<option>전체공개</option>
			<option>프로젝트 관리자만</option>
		</select>
		<input type="submit" onclick="location.href='noticeWritingSelectList.do'" value="올리기">
			
	</div>

</body>
</html>