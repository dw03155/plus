<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
.fileImg{
	width: 21px;
	margin-right: 9px;
	display: inline-block;
	height: 20px;
}

</style>
</head>
<body>
	<div id="leftTask" class="left-filter active">
	<a href="#" id="leftFilterBtn" class="left-btn-filter d-none close" style="display: block;">
		<i class="icon-filter"></i>
		<span>닫기</span>
	</a>
		<div class="logo-area">
			<a class="js-logo logo-box">
				<h1 class="logo-1">
					<img src="/img/plus.png?heigth:50" alt="flow" id="logoImg" />
				</h1>
			</a>
		</div>
		<div class="h">
						 <ul id="fileFilter" class="js-left-filter-ul menu-accordion-group scroll-mask">
            <li>
                <div class="filetype" style="padding: 11px 20px;">
                    파일유형
                </div>
                <div class="menu-accordion">
                    <ul class="menu-accordion-list">
                        <li class="filesLi">
                             <p>
                             	<img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-on.svg">
                                 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-all-file.png">
                                 <span class="file all">전체</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                                 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-cloud.png">
                                 <span class="file cloud">클라우드</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                                 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-pdf.png">
                                 <span class="file pdf">PDF</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                                 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-word.png">
                                 <span class="file word">워드</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-xlsx.png">
                                 <span class="file excel">엑셀</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-hancom.png">
                                 <span class="file hwp">한글</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-pawer.png">
                                 <span class="file power-point">파워포인트</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-img.png">
                                 <span class="file image">이미지</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-music.png">
                                 <span class="file music-media">음악・동영상</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                               	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-html.png">
                                 <span class="file html">HTML</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-cad.png">
                                 <span class="file cad">CAD</span>
                             </p>
                        </li>
                        <li class="filesLi">
                             <p>
                                 <img name="radio" class="radios" src="/flow-renewal/assets/images/icons/icon-radio-off.svg">
                              	 <img class="fileImg" src="/flow-renewal/assets/images/icons/icon-zip.png">
                                 <span class="file zip">압축파일</span>
                             </p>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <!-- // 전체 파일 -->
		</div>
	</div>
	<script>
		$('.filesLi').each(function(){
			var radioImg = $(this).find('.radios');
			console.log(radioImg);
			var srcName = radioImg.attr('src');
			
			$(this).hover(function(){
				$(this).find('.radios').attr('src','/flow-renewal/assets/images/icons/icon-radio-on.svg');
			}, function(){
				$(this).find('.radios').attr('src','/flow-renewal/assets/images/icons/icon-radio-off.svg');
			})
		})
	
		$(function(){
			var coUrl = "${sessionScope.coUrl}";
			$.ajax({
				url: "getLogo.do?coUrl="+coUrl,
				type: "get",
				datatype: "json",
				success: function(data){
					var $coLogo = data.coLogo;
					var logoPath = "/logo/"+$coLogo+ "?heigth=50";
					$("#logoImg").attr("src",logoPath);
					console.log($coLogo);
				}
			})
		})
	</script>
</body>
</html>