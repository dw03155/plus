<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
<table border="1">
	<tr>
		<td id="memId">${tasks.name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${tasks.notiDttm}" /></td>
		<td>
			<span>
				<button type="button">핀셋</button>
				<button type="button" id="moreBtn">더보기</button>
			</span>
		</td>
	</tr>
	<tr>
		<td colspan="4" id="notiTtl">${tasks.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.tskPrgs }</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.memId }</td>
	</tr>
	<tr>
		<td colspan="4" id=""><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${tasks.tskBgnDt}" /></td>
	</tr>
	<tr>
		<td colspan="4" id=""><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${tasks.tskEndDt}" /></td>
	</tr>

	<tr>
		<td colspan="4" id="tskCntn">${tasks.tskCntn }</td>
	</tr>
	<tr>
		<td colspan="4">${tasks.tskFile }파일</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>