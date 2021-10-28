<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<table border="1">
	<tr>
		<td id="memId"></td>
		<td id="notiDttm">${todos.todoEndDate }</td>
		<td>${todos.notiId }</td>
	</tr>
	<tr>
		<td colspan="3" id="notiTtl">${todos.notiTtl }</td>
	</tr>

	<tr>
		<td colspan="3" id="tskCntn">${todos.todoCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${todos.todoId }</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>