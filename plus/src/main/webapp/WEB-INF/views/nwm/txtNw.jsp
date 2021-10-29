<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 내 게시물 메뉴에서 글 상세보기 팝업 -->
<table border="1">			
	<tr>
		<td id="memId">${texts.memName }작성자</td>
		<td id="notiDttm">${texts.notiDttm }작성일시</td>
		<td>${texts.notiId }</td>
	</tr>
	<tr>
		<td colspan="3" id="notiTtl">${texts.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="3" id="txtCntn">${texts.txtCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${texts.txtFile }파일</td>
	</tr>
	<tr>
		<td colspan="3" id="txtPl">${texts.txtPl }장소</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."></td>
	</tr>
</table>
