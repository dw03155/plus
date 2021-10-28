<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<table border="1">
	<tr>
		<td id="memId"></td>
		<td id="notiDttm">${schedules.scheDttm }</td>
		<td>${schedules.notiId }</td>
	</tr>
	<tr>
		<td colspan="3" id="notiTtl">${schedules.notiTtl }</td>
	</tr>

	<tr>
		<td colspan="3">${schedules.schePl }</td>
	</tr>
	<tr>
		<td colspan="3" id="tskCntn">${schedules.scheCntn }</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>