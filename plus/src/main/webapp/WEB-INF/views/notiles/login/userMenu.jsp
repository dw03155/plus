<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
</head>
<body>
	<div align="center">
	<h2>Modal Example</h2>
	
	<!-- Trigger/Open The Modal -->
	<button id="myBtn">Open Modal</button>
	
	<!-- The Modal -->
	<div id="myModal" class="modal">
	
	  <!-- Modal content -->
	  <div class="modal-content">
	    <span class="close">&times;</span>
	    <div>
	    <ui>
			<li id="myPageMenu">환경설정</li>
			<li id="signMenu">회원상태</li>
			<li id="lookMenu">로그아웃</li>
		</ui>
		</div>
	  </div>
	
		
	</div>
	
	<div id="myPageModal" class="modal">
	  <!-- Modal content -->
	  <div class="modal-content">
	    <span class="close">&times;</span>
	   
	    <!-- 마이페이지 -->
		<div>
		    <table border="1" style="width: 700px; height: 600px;">
		    	<tr >
		    		<th colspan="2" height="50px;">환경설정</th>
		    	</tr>
		    	<tr>
		    		<td>
		    			<span>마이페이지</span><br/>
		    			<span>알림</span><br/>
		    			<span>잠금설정</span><br/>
		    		</td>
		    		<td>
		    			<span>이름</span>
		    			<input type="text" id="name" name="name"><br/><br>
		    			<span>회사명</span>
		    			<input type="text" id="coName" name="coName" readonly="readonly"><br/><br>
		    			<span>부서명</span>
		    			<input type="text" id="dept" name="dept" ><br/><br>
		    			<span>직책</span>
		    			<input type="text" id="wkpo" name="wkpt" ><br/><br>
		    			<span>휴대폰번호</span>
		    			<input type="text" id="persTel" name="persTel" ><br/><br>
		    			<span>회사연락처</span>
		    			<input type="text" id="coTel" name="coTel" readonly="readonly"><br/><br>
		    			<button type="button" id="pwdBtn" name="pwdBtn" >비밀번호 변경</button>
		    		</td>
		    	</tr>
		    </table>
		</div>
	  </div>
	 </div> 
	 
	  <div id="pwdUpdate" class="modal">
		  <!-- Modal content -->
		  <div class="modal-content">
		    <span class="close">&times;</span>
		   
		    <!-- 마이페이지 -->
			<div>
			    <table border="1" style="width: 700px; height: 600px;">
			    	<tr>
			    		<th colspan="2" height="50px;">비밀번호 변경</th>
			    	</tr>
			    	<tr>
			    		<td>
			    			<span>현재 비밀번호</span>
			    			<input type="password" id="pwd" name="pwd" ><br/><br>
			    			<span>변경 할 비밀번호</span>
			    			<input type="text"><br/><br>
			    		</td>
			    	</tr>
			    </table>
			</div>
		  </div>
		</div>
		
	</div>
<script>

$("#myPageMenu").on("click", function(){
	$("#myPageModal").css("display","block");
});

var pwdUpdate = document.getElementById("pwdUpdate");
var pwdBtn = document.getElementById("pwdBtn");
pwdBtn.onclick = function(){
	pwdUpdate.style.display = "block";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span = document.getElementsByClassName("close")[0];
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

</script>

</body>
</html>