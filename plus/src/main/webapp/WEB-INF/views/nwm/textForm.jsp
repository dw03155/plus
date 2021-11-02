<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
	<div id="Text" class="tabcontent">
		<div>
			<input type="text" placeholder="제목을 입력하세요.">
		</div>
		<div>
			<textarea placeholder="내용을 입력하세요."></textarea>
		</div>
		
		<form action="upload" id="uploadForm" method="post"
			enctype="multipart/form-data">
			<input type="file" name="file" id="file" style="display: none" />클립
			<div class="button" onclick="onclick=document.all.file.click()">사진추가</div>
		</form>
		<button type="button" onclick="OpneInput()">장소</button>
		<div id="map" style="width:500px;height:400px;"></div>
		<select>
			<option>전체공개</option>
			<option>프로젝트 관리자만</option>
		</select>
		<button type="button"
			onclick="location.href='noticeWritingSelectList.do'">올리기</button>
	</div>
