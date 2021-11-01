<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!-- 내 게시물 목록 -> 일정 상세보기(팝업) -->
<table border="1">
	<tr>
		<td id="memId">${schedules.name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${schedules.notiDttm}" /></td>
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