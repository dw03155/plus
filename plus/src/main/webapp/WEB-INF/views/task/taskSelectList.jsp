<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://code.jquery.com/jquery-latest.js"></script>
<title>Insert title here</title>
<script src="js/jquery-latest.min.js"></script>
<style type="text/css">
#modal {
	display: none;
}
</style>
</head>
<body>
	<h2>전체 업무</h2>
	<!-- 검색 -->
	<div>
		<form id="frm" name="frm" method="post">
			<input type="text" name="notiTtl" id="notiTtl"
				placeholder="업무명 검색하세요!">
			<button type="button">&#9881;</button>
		</form>
	</div>
	<div>
		<form action="">
			<div>
				<table>
					<tr>
						<td>상태</td>
						<td>업무명</td>
						<td>담당자</td>
						<td>마감일</td>
						<td>등록일</td>
					</tr>
					<c:forEach var="tasks" items="${tasks }">
						<tr>
							<td>${tasks.tskPrgs }</td>
							<td>${tasks.notiTtl }</td>
							<td>${tasks.name }</td>
							<td>${tasks.tskEndDt }</td>
							<td>${tasks.notiDttm }</td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</form>
	</div>
	<!-- 상세보기 -->
	<div id="modal">
		<div class="modal_content">
			<span id="modal_close_btn">&times;</span>
				<div>
					<div id="modalBody"></div>
				</div>
				<div class="modal_layer"></div>
			
		</div>
	</div>
	
	<script>
		
		$("tr").click(function() { // 모달창 열고 닫기
			$("#modal").css("display", "block");
			$("#modal_close_btn").click(function() {
				$("#modal").css("display", "none");
			});
		</script>
</body>
</html>