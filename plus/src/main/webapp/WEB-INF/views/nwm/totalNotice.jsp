<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<title>프르젝트 상세목록</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>
	<div>
		<h1>프로젝트명</h1>

		<!-- 프로젝트 목록에서 선택 -->

		<button class="tablink" onclick="openPage('Home', this)"
			id="defaultOpen">홈</button>
		<button class="tablink" onclick="openPage('Task', this)">업무</button>
		<button class="tablink" onclick="openPage('Calendar', this)">캘린더</button>
		<button class="tablink" onclick="openPage('File', this)">파일</button>

		<!-- 프로젝트 상세조회 홈 전체 게시물 -->
		<div id="Home" class="tabcontent">
			<!-- 검색 -->
			<div>
				<form id="frm" name="frm" method="post">
					<input type="text" name="notiTtl" id="notiTtl"
						placeholder="게시물 명 입력">
				</form>
			</div>

			<!-- 작성 폼 호출 -->
			<div>
				<button type="button">글</button>
				<button type="button">업무</button>
				<button type="button">일정</button>
				<button type="button">할일</button>
			</div>

			<!-- 프로젝트 내 전체 게시물 목록 -->
			<div>
				<h3>전체</h3>
			</div>
			<div>
				<table border="1">
					<c:forEach var="totals" items="${totals }">
						<tr>
							<td>${totals.notiKnd}</td>
							<td>${totals.notiTtl}</td>
							<td>${totals.name}</td>
							<td><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
									value="${totals.notiDttm}" /></td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>

		<!-- 프로젝트 선택 후 -> 업무 (1개 프로젝트) -->
		<div id="Task" class="tabcontent">
			<div>
				<h3>프로젝트 내 업무</h3>
			</div>
			<div>
				<table border="1">

					<tr>
						<td>${tsk.notiTtl }</td>
						<td>tsk.notiTtl</td>
						<td>${tsk.notiTtl }</td>
					</tr>

				</table>
			</div>
		</div>

		<div id="Calendar" class="tabcontent">
			<h3>프로젝트 내 일정</h3>
		</div>

		<div id="File" class="tabcontent">
			<h3>프레적트 내 파일함</h3>
		</div>
	</div>


	<script>
		function openPage(pageName, elmnt) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablink");

			document.getElementById(pageName).style.display = "block";
			elmnt.style.backgroundColor = color;
		}

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();
	</script>
</body>
</html>