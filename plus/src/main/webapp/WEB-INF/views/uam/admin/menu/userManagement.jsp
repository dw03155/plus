<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<head>
<style type="text/css">
	table{
		width: 95%;
		border: 1px solid #D8D8D8;
		border-collapse : collapse;
		position: absolute;
        top: 150px;
        left: 30px;
	}
	#memBtn2{
		width: 50px;
		border: 1px solid gray;
		top: 80px;
		left: 90%;
	}
	.memberthead{
		height: 30px; 
		background-color: #F9F8FD
	}
	td{
		text-align: center;
		height: 25px;
	}
	.blueBtn{
		position: absolute;
		padding: 6px 15px 6px 15px;
		background-color: #5882FA;
		color: white;
		border-radius: 3px;
		margin-left: 5px;
		top: 86px;
	}
	.ctgry_del_modal{
		width: 400px;
		height: 200px;
	    position: absolute;
	    top: 35%;
	    right: 45%;
	    z-index: 13;
	    background: #fff;
	    border: 1px solid #777;
	    border-radius: 8px;
	    font-size: 13px;
	    text-align: left;
	    color: #555;
	    display: none;
	    align-content: center;
	    box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.model_heard{
		height: 30px;
		padding: 10px;
		
	}
	.ctgry_model_x{
		float: right;
		width: 15px;
	}
</style>
</head>
<body>
	<div class="main-container">
		<div id="topSettingBar" class="main-header" style="height: 54px">
			<div id="menuName" class="project-detail-header">
				<h3 id="projectTitle" class="project-title ellipsis js-mouseover" >사용자 관리</h3>
			</div>
		</div><!-- topSettionBar end -->
		<div class="project-detail-top clearfix">
			<ul id="detailTab" class="project-detail-menu">
				<li class="js-tab-item active" id="using"><a>정상<span id="usingCount">(${fn:length(using) })</span></a></li>
				<li class="js-tab-item" id="notused"><a>이용중지<span id="notusedCount">(${fn:length(notused) })</span></a></li>
				<li class="js-tab-item" id="outstand"><a>가입대기<span id="outstantCount">(${fn:length(outstand) })</span></a></li>
				<li class="js-tab-item" id="guest"><a>게스트<span id="guestCount">(${fn:length(guest) })</span></a></li>
			</ul>
			<div id="detailTopSearch"
				class="project-search-area all-file-header-type-3">
				<i class="icons-search"></i>
				<div class="project-search">
					<input id="projectSearchInput" type="text"
						placeholder="검색어를 입력해주세요" class="project-search-input"
						autocomplete="off" maxlength="50" />
					<div id="projectDetailSearchLayer"
						class="name-type-seach-popup d-none"
						data-search-area-code="IN_PROJECT" style="top: 38px; right: 0px">
					</div>
				</div>
				
			</div><!-- ditailTopSearch end -->
		</div><!-- project-detail-top end -->
		
		<!-- 정상사용자 -->
			<div id="usingMember" class="project-detail-inner layer-scroll type2">
			<div id="btnDiv" style="margin-left: 94%; margin-top: 29px;">
				<button id="memBtn2">삭제</button>
			</div>
				<table id="usingMemberList" border="1">
					<thead class="memberthead">
						<tr>
							<th>이름</th>
							<th>부서</th>
							<th>직책</th>
							<th>이메일</th>
							<th>휴대폰</th>
							<th>관리자</th>
							<th>삭제&nbsp;<input type="checkbox" id="allCheckBox"></th>
						</tr>
					</thead>
					<tbody id="usinglist" >
						<c:if test="${empty using }">
							<tr>
								<td colspan="8">NODATA</td>
							</tr>
						</c:if>
						<c:forEach var="usings" items="${using }">
						<tr>
							<td>${usings.name }</td>
							<td>${usings.dept }</td>
							<td>${usings.wkpo }</td>
							<td>${usings.email }</td>
							<td>${usings.persTel }</td>
							<c:if test="${usings.memPerm eq 'admin'}">
							<td>관리자<em class="adminDel" style="color: red; cursor: pointer;">[관리자해제]</em></td>
							</c:if>
							<c:if test="${usings.memPerm eq 'user'}">
							<td>사용자<em class="userDel" style="color: blue;  cursor: pointer;">[관리자지정]</em></td>
							</c:if>
							<td><input type='checkbox' name="usingCheck" value="${usings.memId }"></td>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			 </div><!-- usingMember end -->
			 
			 <!-- 관리자 해제 모달-->
			 <div id="AdminModal" class="ctgry_del_modal" >	
				<div class="model_heard">
					<a href="#"><img class="ctgry_model_x" src="/img/ico/x_icn.png"></a>
				</div>
				<div align="center" style="margin: 25px; 0px;">
					<h2>관리자를 해제하시겠습니까?</h2>
					<p></p>
				</div>
				<div align="center">
					<button type="button" id="adminDelete" class="blueBtn" style="position: static;">확인</button>
				</div>
			</div>
			
			<!-- 관리자 지정 모달-->
			 <div id="UserModal" class="ctgry_del_modal" >	
				<div class="model_heard">
					<a href="#"><img class="ctgry_model_x" src="/img/ico/x_icn.png"></a>
				</div>
				<div align="center" style="margin: 25px; 0px;">
					<h2>관리자로 지정하시겠습니까?</h2>
					<p></p>
				</div>
				<div align="center">
					<button type="button" id="userDelete" class="blueBtn" style="position: static;">확인</button>
				</div>
			</div>
			
			 <!-- 사용중지 -->
			 <div id="notUsedMember" class="project-detail-inner layer-scroll type2" style="display: none">
				<table id="notUsedMemberList" border="1">
					<thead class="memberthead">
					<tr>
						<th></th>
						<th>이름</th>
						<th>이메일</th>
						<th>휴대폰</th>
						<th>권한</th>
					</tr>
					</thead>
					<tbody id="notUsedlist">
						<c:if test="${empty notused }">
							<tr>
								<td colspan="5">NODATA</td>
							</tr>
						</c:if>
						<c:forEach var="notuseds" items="${notused }">
						<tr>
							<td><input type="hidden" value="${notuseds.memId }"></td>
							<td>${notuseds.name }</td>
							<td>${notuseds.email }</td>
							<td>${notuseds.persTel }</td>
							<c:if test="${notuseds.memPerm eq 'user' }">
							<td>사원</td>
							</c:if>
							<c:if test="${notuseds.memPerm eq 'admin' }">
							<td>관리자</td>
							</c:if>
							<c:if test="${notuseds.memPerm eq 'guest' }">
							<td>게스트</td>
							</c:if>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			 </div><!-- notUsedMember end -->
			 
			 <!-- 가입대기 -->
			 <div id="outstandMember" class="project-detail-inner layer-scroll type2" style="display: none">
				<table id="outstandMemberList" border="1">
					<thead class="memberthead">
					<tr>
						<th></th>
						<th>이름</th>
						<th>이메일</th>
						<th>휴대폰</th>
						<th>설정</th>
					</tr>
					</thead>
					<tbody id="outstandlist">
						<c:if test="${empty outstand }">
							<tr>
								<td colspan="5">NODATA</td>
							</tr>
						</c:if>
						<c:forEach var="outstands" items="${outstand }">
						<tr>
							<td><input type="hidden" value="${outstands.memId }"></td>
							<td>${outstands.name }</td>
							<td>${outstands.email }</td>
							<td>${outstands.persTel }</td>
							<td><a href="#"><span class='memin' style="color: green;">[가입승인]</span></a> &nbsp;
							<a href="#"><span class='memout' style="color: red">[가입거절]</span></a></td>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			 </div><!-- outstandMember end -->
			 
			 <!-- 게스트 -->
			 <div id="guestMember" class="project-detail-inner layer-scroll type2" style="display: none">
				<table id="guestMemberList" border="1">
					<thead class="memberthead">
					<tr>
						<th></th>
						<th>이름</th>
						<th>이메일</th>
						<th>휴대폰</th>
						<th>설정</th>
					</tr>
					</thead>
					<tbody id="guestlist">
						<c:if test="${empty guest }">
						<tr>
							<td colspan="5">NODATA</td>
						</tr>
						</c:if>
						<c:forEach var="guests" items="${guest }">
						<tr>
							<td><input type="hidden" value="${guests.memId }"></td>
							<td>${guests.name }</td>
							<td>${guests.email }</td>
							<td>${guests.persTel }</td>
							<c:if test="${guests.accSt eq 'using' }">
							<td><a href="#"><span class='guestDel' >삭제</span></a></td>
							</c:if>
							<c:if test="${guests.accSt eq 'outstand' }">
							<td><a href="#"><span class='guestIn' style="color: green;">[가입승인]</span></a>&nbsp;
							<a href="#"><span class='guestOut' style="color: red">[가입거절]</span></a></td>
							</c:if>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			 </div><!-- outstandMember end -->
		</div><!-- main-container end -->
	
	<script>
	//관리자 사용자로 변경
	$(".adminDel").click(function(){
		var adminDel = $(this);
		var td = adminDel.parent();
		var memId = adminDel.parent().parent().children().eq(6).children().val();
		var jsondata = {"memId": memId};
		$('#AdminModal').css("display","block");
		$('#adminDelete').click(function(){
			$.ajax({
				url: "adminDel.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(){
					td.empty();
					td.append("사용자")
					  .append($('<em class="admindel" style="color: blue;  cursor: pointer;">').html("[관리자지정]"));
					$('#AdminModal').css("display","none");
				}
			})//ajax end
		})
	});
	//
	$(".userDel").click(function(){
		var userDel = $(this);
		var td = userDel.parent();
		var memId = userDel.parent().parent().children().eq(6).children().val();
		var jsondata = {"memId": memId};
		console.log(jsondata);
		$('#UserModal').css("display","block");
		$('#userDelete').click(function(){
			$.ajax({
				url: "userDel.do",
				method: "put",
				data: JSON.stringify(jsondata),
				contentType: "application/json",
				dataType: "json",
				success: function(){
					td.empty();
					td.append("관리자")
					  .append($('<em class="adminDel" style="color: red;  cursor: pointer;">').html("[관리자해제]"));
					$('#UserModal').css("display","none");
				}
			})//ajax end
		})
	});
	
	
	
	//정상사용자 가입중지
	$('#memBtn2').click(function(){
			var usingCheck = $("input:checkbox[name='usingCheck']:checked");
			var tr = usingCheck.parent().parent();
			
			usingCheck.each(function(i){
				var usingMemId = $(this).val();
				var jsondata = {"memId": usingMemId};
			
				$.ajax({
					url: "usingOut.do",
					method: "put",
					data: JSON.stringify(jsondata),
					contentType: "application/json",
					dataType: "json",
					success: function(data){
						tr.remove();
						memberLengthChange();
					}
				})
			});
			
	});
	
	
	//가입대기 사용자 승인
	$('.memin').click(function(){
		var inBtn = $(this);
		var tr = inBtn.parent().parent().parent();
		var td = tr.children();
		
		var memId = td.eq(0).children().val();
		var jsondata = {"memId":memId};
		 $.ajax({
			url:"outstandIn.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				tr.remove();
				memberLengthChange();
			}
		}) 
	});
	//가입대기 사용자 거절
	$('.memout').click(function(){
		var outBtn = $(this);
		var tr = outBtn.parent().parent().parent();
		var td = tr.children();
		
		var memId = td.eq(0).children().val();
		var jsondata = {"memId":memId};
		$.ajax({
			url:"outstandOut.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				tr.remove();
				memberLengthChange();
			}
		})
	});
	//게스트 사용자 승인
	$('.guestIn').click(function(){
		var inBtn = $(this);
		var tr = inBtn.parent().parent().parent();
		var td = tr.children();
		
		var memId = td.eq(0).children().val();
		console.log(memId);
		var jsondata = {"memId":memId};
		 $.ajax({
			url:"guestIn.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				memberLengthChange();
			}
		}) 
	});
	//게스트 사용자 거절
	$('.guestOut').click(function(){
		var outBtn = $(this);
		var tr = outBtn.parent().parent().parent();
		var td = tr.children();
		
		var memId = td.eq(0).children().val();
		var jsondata = {"memId":memId};
		$.ajax({
			url:"guestOut.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				tr.remove();
				memberLengthChange();
			}
		})
	});
	//게스트 사용자 삭제
	$('.guestDel').click(function(){
		var delBtn = $(this);
		var tr = delBtn.parent().parent().parent();
		var td = tr.children();
		
		var memId = td.eq(0).children().val();
		var jsondata = {"memId":memId};
		$.ajax({
			url:"guestOut.do",
			method: "put",
			data: JSON.stringify(jsondata),
			contentType: "application/json",
			dataType: "json",
			success: function(data){
				tr.remove();
				memberLengthChange();
			}
		})
	});
				
			$("#using").on("click", function(){
				$('#using').attr("class","js-tab-item active");
				$('#notused').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#usingMember').css("display","block");
				$('#notUsedMember').css("display","none");
				$('#outstandMember').css("display","none");
				$('#guestMember').css("display","none");
			});
			$("#notused").on("click", function(){
				$('#notused').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#notUsedMember').css("display","block");
				$('#usingMember').css("display","none");
				$('#outstandMember').css("display","none");
				$('#guestMember').css("display","none");
			});
			$("#outstand").on("click", function(){
				$('#outstand').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#notused').attr("class","js-tab-item");
				$('#guest').attr("class","js-tab-item");
				$('#outstandMember').css("display","block");
				$('#notUsedMember').css("display","none");
				$('#usingMember').css("display","none");
				$('#guestMember').css("display","none");
			});
			$("#guest").on("click", function(){
				$('#guest').attr("class","js-tab-item active");
				$('#using').attr("class","js-tab-item");
				$('#notused').attr("class","js-tab-item");
				$('#outstand').attr("class","js-tab-item");
				$('#guestMember').css("display","block");
				$('#outstandMember').css("display","none");
				$('#notUsedMember').css("display","none");
				$('#usingMember').css("display","none");
			});
			
			$('.ctgry_model_x').on("click",function(){
				$('.ctgry_del_modal').css("display","none");
			});
			
			$("#usingMember #allCheckBox").on('click',function(){
				if($("#allCheckBox").prop("checked")){
					$("input[type=checkbox]").prop("checked",true);
				}else{
					$("input[type=checkbox]").prop("checked",false);
				}
			});
	
			function memberLengthChange(){
				var coUrl = "${sessionScope.coUrl}";
				//정상사용자
				$.ajax({
					url: "getUsingMemberList.do?coUrl="+coUrl,
					type : "get",
					dataType : "json",
					success : function(data) {
						$('#usingCount').text('('+data.length+')');
					}
				});	
				//이용중지 사용자
				$.ajax({
					url: "getNotusedMemberList.do?coUrl="+coUrl,
					type : "get",
					dataType : "json",
					success : function(result) {
						$('#notusedCount').text('('+result.length+')');
					}
				});
				//가입대기
				$.ajax({
					url: "getOutstandMemberList.do?coUrl="+coUrl,
					type : "get",
					dataType : "json",
					success : function(re) {
						$('#outstantCount').text('('+re.length+')');
					}
				});
				//게스트
				$.ajax({
					url: "getGuestMemberList.do?coUrl="+coUrl,
					type : "get",
					dataType : "json",
					success : function(req) {
						$('#guestCount').text('('+req.length+')');
					}
				});
		};
	 
	
			
			
	
	</script>
</body>
</html>