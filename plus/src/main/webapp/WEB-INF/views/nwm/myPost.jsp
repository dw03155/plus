<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>전체 메뉴 -> 내 게시물 목록</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">


<style type="text/css">
#modal {
	z-index: 2000;
	display: none;
}

#modalBody {
	
}

#modal .modal_content {
	max-width: 400px;
	background-color: #fefefe;
	margin: auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
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

</head>
<body>
	<div>
		<h1>내 게시물</h1>
	
	<!-- 상세보기 -->
	<div id="modal">
		<div class="modal_content">
			<span id="modal_close_btn">&times;</span>
			<div id="subModal">
				<div align="right">
					<button type="button">핀셋</button>
					<div class="dropdown" align="left">
						<button type="button" id="more_btn">더보기</button>
						<div class="dropdown-content">
							<button type="button" id="modify" onclick="location.href='textForm.do'">수정</button>
							<button type="button" id="delect">삭제</button>
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
	<!-- 검색 -->
	<div>
		<form id="frm" name="frm" method="post">
			<input type="text" name="notiTtl" id="notiTtl" placeholder="게시물 명 입력">
			<input type="hidden" value="" name="mId" id="memId">
		</form>
	</div>
	<br>
	<!--내 게시물 목록 -->
	<div>
		<table border="1">
			<c:forEach var="notices" items="${notices }">
				<!-- 전체 목록 -->
				<tr data-notiId="${notices.notiId}" data-kind="${notices.notiKnd }">
					<td>${notices.notiKnd}</td>
					<td>${notices.notiTtl }</td>
					<td>${notices.name }</td>
					<td><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
							value="${notices.notiDttm}" /></td>
				</tr>
			</c:forEach>
		</table>
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
						url : "myPostTxt.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			} else if (notiKnd == "task"){
					$.ajax({
						url : "myPostTsk.do",
						type : 'GET',
						data : {notiId : tr.data("notiid"), notiKnd},
						dataType : "html",
						success : function(data) {
							$("#modalBody").html(data);
						}
					}); 
			}else if (notiKnd == "schedule"){
				$.ajax({
					url : "myPostSche.do",
					type : 'GET',
					data : {notiId : tr.data("notiid"), notiKnd},
					dataType : "html",
					success : function(data) {
						$("#modalBody").html(data);
					}
				}); 
			}else if (notiKnd == "todo"){
				$.ajax({
					url : "myPostTodo.do",
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

	<!-- 전체 게시물 목록 -->
	<button type="button" onclick="location.href='totalNotice.do'">프로젝트
		상세목록</button>


</body>
</html>