<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>프로젝트 상세보기</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<script src="js/jquery-latest.min.js"></script>
<style type="text/css">
#modal {
	display: none;
}

#modalBody {
	
}

#modal .modal_content {
	width: 100%;
	max-width: 400px;
	overflow: hidden;
}

#modal .modal_layer {
	
}

.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content {
	display: none;
	position: fixed;
	border: 1px solid black;
	padding: 12px 16px;
	z-index: 1;
}

.dropdown:hover .dropdown-content {
	display: block;
}
</style>
<script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
</head>
<div>
	<h2>내 게시물</h2>
</div>
<body>
	<!-- 검색 -->
	<div>
		<form id="frm" name="frm" method="post">
			<input type="text" name="notiTtl" id="notiTtl" placeholder="게시물 명 입력">
		</form>
	</div>
	<br>
	<!-- 게시물 작성폼 호출 -->
	<div class="tab">
		<button class="tablinks" onclick="openForm(event, 'Text')">글</button>
		<button class="tablinks" onclick="openForm(event, 'Task')">업무</button>
		<button class="tablinks" onclick="openForm(event, 'Schedule')">일정</button>
		<button class="tablinks" onclick="openForm(event, 'Todo')">할
			일</button>
	</div>
	<!-- 게시물 목록 -->
	<table>
		<c:forEach var="notices" items="${notices }">
			<!-- 전체 목록 -->
			<tr data-notiid="${notices.notiId}" data-kind="${notices.notiKnd }">
				<td>${notices.notiKnd}</td>
				<td>${notices.notiTtl }</td>
				<td>${notices.memId}</td>
				<td>${notices.notiDttm}</td>
			</tr>
		</c:forEach>
	</table>
	<!-- 상세보기 -->
	<div id="modal">
		<div class="modal_content">
			<label>프로젝트명</label> <span id="modal_close_btn">&times;</span>
			<div id="subModal">
				<div align="right">
					<button type="button">핀셋</button>
					<div class="dropdown" align="left">
						<button type="button" id="more_btn">더보기</button>
						<div class="dropdown-content">
							<p id="retouch">수정
							<p>
							<p id="delete">삭제
							<p>
						</div>
					</div>
				</div>
				<div>
					<div id="modalBody"></div>
				</div>
				<div class="modal_layer"></div>
			</div>
		</div>
	</div>
	<!-- 모달창 JS -->
	<script>
		
		$("tr").click(function() { // 모달창 열고 닫기
			$("#modal").css("display", "block");
		   
			var tr = $(this);
			var notiKnd = tr.data("kind");
			
			if(notiKnd == "text"){
					$.ajax({
						url : "noticeWritingSelectTxt.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			} else if (notiKnd == "task"){
					$.ajax({
						url : "noticeWritingSelectTsk.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			}else if (notiKnd == "schedule"){
				$.ajax({
					url : "noticeWritingSelectSche.do",
					type : 'GET',
					data : {notiId : tr.data("notiid"), notiKnd},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				}); 
			}else if (notiKnd == "todo"){
				$.ajax({
					url : "noticeWritingSelectTodo.do",
					type : 'GET',
					data : {notiId : tr.data("notiid"), notiKnd},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				}); 
			}
		});
		$("#modal_close_btn").click(function() {
			$("#modal").css("display", "none");
		});
	</script>
</body>
</html>