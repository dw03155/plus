<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {
	box-sizing: border-box
}

/* Set height of body and the document to 100% */
body, html {
	height: 100%;
	margin: 0;
	font-family: Arial;
}

/* Style tab links */
.tablink {
	background-color: #fffff;
	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	font-size: 17px;
	width: 10%;
}

.tablink:hover {
	background-color: #6449fc;
}

/* Style the tab content (and add height:100% for full page content) */
.tabcontent {
	display: none;
	padding: 20px 20px;
	height: 100%;
}
</style>
</head>

<body>
	<div>
		<h1>프로젝트명</h1>
	</div>
	<!-- 프로젝트 목록에서 선택 -->
	<div>

		<button class="tablink" onclick="openPage('Home', this)"
			id="defaultOpen">홈</button>
		<button class="tablink" onclick="openPage('News', this)">업무</button>
		<button class="tablink" onclick="openPage('Contact', this)">캘린더</button>
		<button class="tablink" onclick="openPage('About', this)">파일</button>
	</div>
	
	<!-- 프로젝트 상세조회 홈 전체 게시물 -->
	<div id="Home" class="tabcontent">
	<div>
		<form id="frm" name="frm" method="post">
			<input type="text" name="notiTtl" id="notiTtl" placeholder="게시물 명 입력">
		</form>
	</div>
		<div align="center">
		<!-- 검색 -->
			<h3>전체</h3>
				<table border="1">
					<c:forEach var="total" items="${totals }">
						<tr>
							<td>${totals.notiKnd }</td>
						</tr>
					</c:forEach>
				</table>
				<table border="1">
					
						<tr>
							<td>dd</td>
							<td>dd</td>
							<td>dd</td>
							<td>dd</td>
							<td>dd</td>
						</tr>
					
				</table>
			</div>
		</div>
	

	<div id="News" class="tabcontent">
		<h3>News</h3>
		<p>Some news this fine day!</p>	
	</div>

	<div id="Contact" class="tabcontent">
		<h3>Contact</h3>
		<p>Get in touch, or swing by for a cup of coffee.</p>
	</div>

	<div id="About" class="tabcontent">
		<h3>About</h3>
		<p>Who we are and what we do.</p>
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