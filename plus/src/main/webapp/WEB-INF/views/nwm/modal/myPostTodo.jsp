<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- 내 게시물 목록 -> 할일 상세보기(팝업) -->
<table border="1">
	<tr>
		<td id="memId">${todos[0].name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
				value="${todos[0].todoEndDate}" /></td>
		<td>${todos[0].notiId }</td>
	</tr>
<c:forEach var="todos" items="${todos }">
	<tr>
		<td colspan="3" id="notiTtl">${todos.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="3" id="tskCntn">${todos.todoCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${todos.todoId }</td>
	</tr>
</c:forEach>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>