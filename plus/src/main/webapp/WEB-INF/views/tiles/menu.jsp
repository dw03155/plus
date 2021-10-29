<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="leftTask" class="left-task active">
		<div class="logo-area">
			<a class="js-logo logo-box">
				<h1 class="logo-1">
					<img src="flow-renewal/assets/images/flow_logo.png?height=20"
						alt="flow" srcset="" />
				</h1>
			</a>
		</div>
		<a href="#" class="js-left-menu">
			<div id="projectMakeButton" class="new-project-1">
				<div class="button-suport-1"></div>
				새 프로젝트
			</div>
		</a>
		<ul id="leftMenuUl" class="menu-group js-left-menu mgt-20">
			<li class="left-menu-item"><a
				href="myProject.do"> <i class="ico-home"></i>내 프로젝트 <em
					id="leftProjectHomeCount"
					class="js-project-home-count project-total-count d-none"></em>
			</a></li>
			<li data-code="open" class="left-menu-item"><a href="#"> <i
					class="ico-search"></i>회사 공개 프로젝트
			</a></li>
			<li data-code="nokeep" class="left-menu-item d-none"><a href="#"><i
					class="ico-not-kept"></i>미분류</a></li>
			<li data-code="star" class="left-menu-item d-none"><a href="#"><i
					class="ico-favorite"></i>즐겨찾기</a></li>
			<li data-code="hidden" class="left-menu-item d-none"><a href="#"><i
					class="ico-hide"></i>숨김</a></li>
			<li class="js-project-more-button left-menu-item"
				data-code="project-more"><a href="#"> <i class="ico-more"></i>더보기
			</a>
				<ul
					class="js-project-more-layer check-menu-popup left-more-menu d-none">
					<li>
						<button data-code="nokeep" type="button" class="left-menu-item">
							<i class="ico-not-kept"></i>미분류
						</button>
					</li>
					<li>
						<button data-code="star" type="button" class="left-menu-item">
							<i class="ico-favorite"></i>즐겨찾기
						</button>
					</li>
					<li>
						<button type="button" data-code="hidden" class="left-menu-item">
							<i class="ico-hide"></i>숨김
						</button>
					</li>
				</ul></li>
		</ul>
		<ul id="leftScroll" class="menu-accordion-group scroll-mask">
			<li>
				<div class="menu-accordion-button active left-menu-item"
					data-code="collect-more">
					모아보기<i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion" style="display: block">
					<ul class="menu-accordion-list">
						<li><a href="allTask.do"><i class="ico-task"></i>전체
								업무 </a></li>
						<li id="leftMenuGantt"><a href="#"><i
								class="ico-ganttchart"></i>간트차트</a></li>
						<li><a href="#"><i class="ico-schedule"></i>캘린더</a></li>
						<li><a href="#"><i class="ico-filebox"></i>파일함</a></li>
						<li><a href="#"><i class="ico-bookmark"></i>북마크</a></li>
						<li><a href="nwList.do"><i
								class="ico-my-write"></i>내 게시물</a></li>
					</ul>
				</div>
			</li>
			<li>
				<div id="allLabelLeftButton"
					class="menu-accordion-button left-menu-item active"
					data-code="label-more" data-select-label-srno=""
					data-select-label-name="">
					프로젝트 폴더
					<button class="js-label-add label-add-button">
						<i class="ico-plus"></i>
					</button>
					<i class="ico-arrow"></i>
				</div>
				<div class="menu-accordion">
					<ul id="allLabelUl" class="menu-accordion-list d-none ui-sortable"
						style="display: block;">
						<li id="label-1" label-srno="1" class="label-item "><i
							class="ico-label"></i> <span
							class="js-label-name js-mouseover ellipsis" mouseover-text="마케팅">마케팅</span>
							<a href="#" id="dash-three" class="js-label-setting-button flow-dash-three">
								<div></div>
								<div></div>
								<div></div>
						</a></li>

						<li id="label-2" label-srno="2" class="label-item "><i
							class="ico-label"></i> <span
							class="js-label-name js-mouseover ellipsis" mouseover-text="디자인">디자인</span>
							<a href="#" id="dash-three" class="js-label-setting-button flow-dash-three">
								<div></div>
								<div></div>
								<div></div>
						</a></li>

						<li id="label-3" label-srno="3" class="label-item "><i
							class="ico-label"></i> <span
							class="js-label-name js-mouseover ellipsis"
							mouseover-text="엔지니어링">엔지니어링</span> <a href="#" id="dash-three"
							class="js-label-setting-button flow-dash-three">
								<div></div>
								<div></div>
								<div></div>
						</a></li>
					</ul>
				</div>
			</li>
		</ul>
		<div
			class="js-label-setting-layer setting-popup flow-small-layer-1 cursor-pointer" id="folderMenu"
			style="display: none">
			<div class="label-edit flow-name-size">
				<i></i><a href="#"><span>수정</span></a>
			</div>
			<div class="label-delete flow-dash-icon">
				<i></i><a href="#"><span>삭제</span></a>
			</div>
		</div>
		<ul id="leftBottomUl" class="menu-group admin">
			<li data-code="invite-member"
				class="d-none js-invite-employee-button left-menu-item"
				style="display: block;"><a href="#"><i class="ico-invite"></i>직원
					초대</a></li>
			<li data-code="manager-admin" class="d-none left-menu-item"
				style="display: block;"><a href="#"><i class="ico-admin"></i>어드민</a>
			</li>
		</ul>
	</div>
	
<script type="text/javascript">
$('#dash-three').on("click",function(){
	if($leftScroll.next(".js-label-setting-layer").is(":visible")){
		$('#labelSettingLayer').attr({label_srno: "", label_text: ""}).css({display: "none"});
	}
	$('#labelSettingLayer').css({
        display: 'block',
        transform: 'translate(' + e.pageX + 'px, ' + e.pageY + 'px)',
        top: (-58 - Number($("#topBanner").css("height").replace("px", ""))) + "px",
        left: '10px'
    });
	$('#labelSettingLayer').attr({
        label_srno: $labelItem.attr("label-srno"),
        label_text: $labelItem.find(".js-label-name").text(),
    })
});


function clickAllLabelArea(e) {
    var $eTarget = $(e.target);
    var $leftScroll = $eTarget.findUp("#leftScroll");
    var isThreeDot = $eTarget.hasClass("flow-dash-three");
    var isTargetSettingPopup = $eTarget.findUp(".setting-popup").length > 0;
    var $labelItem = $eTarget.findUp(".label-item");
    if (isTargetSettingPopup) return false;

    if (isThreeDot) {
        var isOnSettingPopup = $leftScroll.next(".js-label-setting-layer").is(":visible");
        var $labelSettingLayer = $leftScroll.next(".js-label-setting-layer");
        var isSameLabelTarget = $labelSettingLayer.attr("label_srno") === $labelItem.attr("label-srno");
        isOnSettingPopup = isOnSettingPopup && isSameLabelTarget;
        if (isOnSettingPopup) {
            $labelSettingLayer.attr({label_srno: "", label_text: ""}).css({display: "none"});
            return;
        }
    }

    if ($labelItem.length === 0) return;
    ViewChanger.loadPageJson({
        code: "label",
        first: $labelItem.attr('label-srno'),
        second: $labelItem.find(".js-label-name").text(),
    })
}
</script>
</body>
</html>