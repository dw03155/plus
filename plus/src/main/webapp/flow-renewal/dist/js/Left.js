var Left = (function() {

	var isClicking = false;
	var clickTimer;

	return {
		initView: initView,
		addClickEvent: addClickEvent,
		closeProjectMorePopup: closeProjectMorePopup,
		controlProjectMore: controlProjectMore,
	}

	function initView() {
		var $leftArea = $("#leftArea");
		$leftArea.find("#leftMenuGantt").css("display", Often.isFunc(Func.CLOUD.GANTT) ? "block" : "none");
		$leftArea.find("#RecentProjectButton").parent("li").css("display", Often.isFunc(Func.CLOUD.BLOCK_WEB_LNB_PROJ_LIST) ? "none" : "block");

		if (Often.isFunc(Func.CLOUD.BLOCK_WEB_LNB_EXCEPT_BOOKMARK)) {
			["task", "gantt", "schd", "file", "mention", "mypost"].forEach(function(v) {
				$leftArea.find(".left-menu-item[data-code=" + v + "]").css("display", "none");
			})
		}
	}

	function addClickEvent() {
		var $leftArea = $("#leftArea");
		$leftArea.off("click").on("click", clickLeftAreaWithThrottling);
		$leftArea.find("#leftFilterBtn").off("click").on("click", LeftFilter.toggleLeftFilter);
		var timer = setTimeout(function() {
			if (LocalUtil.getLeftFoldCollectYn() === "N") {
				$leftArea.find(".left-menu-item[data-code=collect-more]").trigger("click");
			}
			if (LocalUtil.getLeftFoldRecentYn() === "Y") {
				$leftArea.find("#RecentProjectButton").trigger("click");
			}
			if (LocalUtil.getLeftFoldLabelYn() === "Y") {
				$("#allLabelLeftButton").addClass("active");
				$("#allLabelUl").css("display", "block");
			}
			clearTimeout(timer);
		}, 500);
		$("#leftScroll").off("scroll").on("scroll", AllLabel.clearLayer);
	}

	function clickLeftArea(e) {

		/*e.preventDefault();*/
		hideProjectSettingMenu(e);

		var $eTarget = $(e.target);
		var $logo = $eTarget.findUp(".js-logo");
		var $projectMakeButton = $eTarget.findUp('#projectMakeButton');
		var isClickMoreLayerLi = $eTarget.findUp(".js-project-more-layer").length !== 0 && $eTarget.is("li");
		var $leftMenuItem = isClickMoreLayerLi ? $eTarget.find(".left-menu-item") : $eTarget.findUp('.left-menu-item');
		var isIamAdminUser = "Y" === LocalUtil.getBuyManger();
		var isSerp = (LocalUtil.getSerpYn() === "Y");
		var isGuest = "F" === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");

		if ($logo.length > 0) {
			ViewChanger.loadPageJson({ code: 'main' });
			RecentProject.reloadRecentProject();
			return;
		}

		if ($projectMakeButton.length > 0) return ProjectMake.openPopup(e);
		if ($leftMenuItem.length > 0) {
			var leftCode = $leftMenuItem.attr('data-code');
			switch (leftCode) {
				//case "main": //내프로젝트
					//ViewChanger.loadPageJson({code: leftCode});
					//RecentProject.reloadRecentProject();
					//break;
				//case "open": //전체공개프로젝트
					//ViewChanger.loadPageJson({code: leftCode});
					//break;
				//case "task": //전체업무
				//case "schd": //캘린더
				//case "file": //파일함
					//if (LimitGuest.isLimitGuest("collect")) return;
					//ViewChanger.loadPageJson({code: leftCode});
					//break;
				//case "bookmark": //북마크
				//case "mypost": //내게시물
					//ViewChanger.loadPageJson({code: leftCode});
					//break;
				case "hidden": //숨김	
				case "nokeep": //미분류
				case "star": //즐겨찾기
					Often.setCookie("LEFT_PROJECT_MORE", leftCode);
					controlProjectMore();
					closeProjectMorePopup();
					ViewChanger.loadPageJson({ code: leftCode });
					break;
				case "collect-more": //모아보기
					$leftMenuItem.toggleClass("active");
					$leftMenuItem.siblings('.menu-accordion').slideToggle();
					LocalUtil.setLocalValue("ONLY_LEFT_FOLD_SETTING", "COLLECT", $leftMenuItem.hasClass("active") ? "Y" : "N");
					break;
				case "label-more": //프로젝트폴더
					AllLabel.clickAllLabelLeftButton(e);
					break;
				case "project-more": //더보기
					controlProjectMore();
					$leftMenuItem.find(".js-project-more-layer").toggleClass("d-none");
					break;
				//case "gantt": //간트차트
					//OpenUtil.openGanttChart();
					//break;
				default:
					break;
			}
		}
	}

	function clickLeftAreaWithThrottling(e) {
		if (isClicking) return;
		clickLeftArea(e);
		isClicking = true;
		clickTimer = setTimeout(function() {
			isClicking = false;
			clearTimeout(clickTimer);
		}, 500);
	}

	function controlProjectMore() {
		var targetLeftCode = Often.null2Void(Often.getCookie("LEFT_PROJECT_MORE"));
		if (targetLeftCode === "") return;
		var $leftArea = $("#leftArea");
		$leftArea.find("li.left-menu-item[data-code=nokeep]").add("li.left-menu-item[data-code=unread]")
			.add("li.left-menu-item[data-code=star]").add("li.left-menu-item[data-code=hidden]").css("display", "none");
		$leftArea.find("li.left-menu-item[data-code=" + targetLeftCode + "]").css("display", "block");
		$leftArea.find("button.left-menu-item").parent().css("display", "block");
		$leftArea.find("button.left-menu-item[data-code=" + targetLeftCode + "]").parent().css("display", "none");
	}

	function closeProjectMorePopup() {
		$("#leftArea").find(".js-project-more-layer").addClass("d-none");
	}

	function hideProjectSettingMenu(e) {
		var $eTarget = $(e.target);
		if ($eTarget.findUp(".left-menu-item").length === 0 &&
			$eTarget.findUp(".recent-project-item").length === 0 &&
			$eTarget.findUp(".label-item").length === 0) return;
		($("#totalProjectEditBar").is(":visible")) && ProjectSetting.closeTotalProjectEditBar();
	}

})()