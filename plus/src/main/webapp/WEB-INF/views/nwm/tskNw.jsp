<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- 내 게시물 목록 -> 업무 상세보기(팝업) -->
<table border="1">
	<tr>
		<td id="memId">작성자명</td>
		<td id="notiDttm">작성일시</td>
		<td>${tasks.notiId }</td>
		<td><span><button type="button">핀셋</button><button type="button" id="moreBtn">더보기</button></span></td>
	</tr>
	<tr>
		<td colspan="4" id="notiTtl">${tasks.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.tskPrgs }</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.memId }담당자</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.tskBgnDt }</td>
	</tr>
	<tr>
		<td colspan="4" id="">${tasks.tskEndDt }</td>
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