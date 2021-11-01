<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!-- 내 게시물 목록 -> 글 상세보기(팝업) -->
<label>${tasks.prjTtl }</label>
<table border="1">
	<tr>
		<td id="memId">${texts.name }</td>
		<td id="notiDttm"><fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss"
				value="${texts.notiDttm}" /></td>
		<td>${texts.notiId }</td>
	</tr>
	<tr>
		<td colspan="3" id="notiTtl">${texts.notiTtl }</td>
	</tr>
	<tr>
		<td colspan="3" id="txtCntn">${texts.txtCntn }</td>
	</tr>
	<tr>
		<td colspan="3">${texts.txtFile }파일<span><button>다운</button></span>
		</td>
	</tr>
	<tr>
		<td colspan="3" id="txtPl">${texts.txtPl }장소</td>
	</tr>
	<tr>
		<td colspan="4"><input placeholder="줄바꿈은 Enter 입니다."> <span><button>입력</button></span>
		</td>
	</tr>
</table>
