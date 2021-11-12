<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div>
		<ul id="leftScroll" class="menu-accordion-group scroll-mask">
            <li>
                <div class="menu-accordion-button active left-menu-item" data-code="collect-more" style="color: white; font-size: 13px">
                    회사
                </div>
                <div class="menu-accordion" style="display: block">
                    <ul class="menu-accordion-list">
                        <li data-code="task" class="left-menu-item">
                            <a href="companyInfo.do">&nbsp;&nbsp;&nbsp;회사 정보
                            </a>
                        </li>
                        <li data-code="schd" class="left-menu-item">
                            <a href="userManagement.do">&nbsp;&nbsp;&nbsp;사용자 관리</a>
                        </li>
                        <li data-code="file" class="left-menu-item">
                            <a  href="userInvite.do">&nbsp;&nbsp;&nbsp;사용자 초대 / 일괄 등록</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="menu-accordion-button active left-menu-item" data-code="collect-more" style="color: white; font-size: 13px">
                    프로젝트
                </div>
                <div class="menu-accordion" style="display: block">
                    <ul class="menu-accordion-list">
                        <li data-code="task" class="left-menu-item">
                            <a href="coPrjMangement.do">&nbsp;&nbsp;&nbsp;회사 프로젝트 관리</a>
                        </li>
                        <li data-code="schd" class="left-menu-item">
                            <a href="openPrjCategory.do">&nbsp;&nbsp;&nbsp;공개 프로젝트 카테고리</a>
                        </li>
                    </ul>
                </div>
            </li>
		</ul>
		</div>
	<script type="text/javascript">
		$('#dash-three').on(
				"click",
				function() {
					if ($leftScroll.next(".js-label-setting-layer").is(
							":visible")) {
						$('#labelSettingLayer').attr({
							label_srno : "",
							label_text : ""
						}).css({
							display : "none"
						});
					}
					$('#labelSettingLayer').css(
							{
								display : 'block',
								transform : 'translate(' + e.pageX + 'px, '
										+ e.pageY + 'px)',
								top : (-58 - Number($("#topBanner").css(
										"height").replace("px", "")))
										+ "px",
								left : '10px'
							});
					$('#labelSettingLayer').attr({
						label_srno : $labelItem.attr("label-srno"),
						label_text : $labelItem.find(".js-label-name").text(),
					})
				});

		function clickAllLabelArea(e) {
			var $eTarget = $(e.target);
			var $leftScroll = $eTarget.findUp("#leftScroll");
			var isThreeDot = $eTarget.hasClass("flow-dash-three");
			var isTargetSettingPopup = $eTarget.findUp(".setting-popup").length > 0;
			var $labelItem = $eTarget.findUp(".label-item");
			if (isTargetSettingPopup)
				return false;

			if (isThreeDot) {
				var isOnSettingPopup = $leftScroll.next(
						".js-label-setting-layer").is(":visible");
				var $labelSettingLayer = $leftScroll
						.next(".js-label-setting-layer");
				var isSameLabelTarget = $labelSettingLayer.attr("label_srno") === $labelItem
						.attr("label-srno");
				isOnSettingPopup = isOnSettingPopup && isSameLabelTarget;
				if (isOnSettingPopup) {
					$labelSettingLayer.attr({
						label_srno : "",
						label_text : ""
					}).css({
						display : "none"
					});
					return;
				}
			}

			if ($labelItem.length === 0)
				return;
			ViewChanger.loadPageJson({
				code : "label",
				first : $labelItem.attr('label-srno'),
				second : $labelItem.find(".js-label-name").text(),
			})
		}
	</script>
</body>
</html>