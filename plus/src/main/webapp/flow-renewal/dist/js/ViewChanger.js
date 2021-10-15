var ViewChanger = (function () {

    var viewArr = [];			// [1,2,3] 1이 직전 뷰, 3이 최초뷰
    var splitSign = "/";
    var topText = {};

    var pageJson = {
        search: "search",
        main: "main",
        miniProject: "miniProject",
        nokeep: "nokeep",
        unread: "unread",
        star: "star",
        task: "task",
        schd: "schd",
        file: "file",
        history: "history",
        bookmark: "bookmark",
        mention: "mention",
        mypost: "mypost",
        open: "open",
        offc: "offc",
        label: "label",
        hidden: "hidden",
        detail: "detail",
        upgrade: "upgrade",
    }

    var layerJson = {
        v_search: "#searchResult",
        v_main_top: "#mainTop",
        v_detail_top: "#detailTop",
        v_detail_top_search: "#detailTopSearch",
        v_main: "#projectHomeLayer",
        v_mini_project: "#miniProject",
        v_join: "#joinArea",
        v_main_home_top: "#projectHomeTop",
        v_all_collect: "#allCollectView",
        v_detail_collect: "#detailCollectView",
        v_task: ".allTaskLayer",
        v_schd: ".allCalendarLayer",
        v_file: ".allFileLayer",
        v_history: ".allHistoryLayer",
        v_detail: "#detailLayer",
        v_detail_timeline: "#detailTimeline",
        v_all_post: "#allPostsLayer",
        v_open: "#openProjectLayer",
    };

    return {
        //OLD
        setVal: setVal,
        getVal: getVal,
        getPageJson: getPageJson,

        //NEW
        getCurrentPageId: getCurrentPageId,
        isPage: isPage,
        getPageCode: getPageCode,
        getProjectSrno: getProjectSrno,
        loadFirstPage: loadFirstPage,
        loadPage: loadPage,
        loadPageJson: loadPageJson,
        loadPageById: loadPageById,
        addBackEvent: addBackEvent,
        reloadPage: reloadPage,
    }

    function reloadPage() {
        loadPage(getCurrentPageId());
    }

    function loadFirstPage() {
        var isConnectPostLink = (CONNECT_PROJECT_SRNO !== "" && CONNECT_POST_SRNO !== "");
        if (isConnectPostLink) {
            loadPageJson({
                code: "detail",
                first: CONNECT_PROJECT_SRNO,
                second: CONNECT_POST_SRNO,
                remark: CONNECT_REMARK_SRNO
            });
            return;
        }
        var pageCode = location.search.replace(/(\#|\?)/, "");
        pageCode = ("" !== pageCode ? pageCode : _SUB_PATH_BY_TINY_URL);
        pageCode = ("" !== pageCode ? pageCode : LocalUtil.getSubPath());
        pageCode = ("" !== pageCode ? pageCode : "main");
        if (pageCode === "INVT_KEY=&T_COLABO_SRNO=&T_COLABO_COMMT_SRNO=&T_COLABO_REMARK_SRNO=&SUB_DOM=") {
            pageCode = "main";
        }
        loadPage(pageCode);
    }

    /**
     * 상단 타이틀 출력부 (다국어 처리)
     * @param key 상단 출력 키
     * @return value 상단 출력 값
     */
    function getTopText(key) {
        topText = {
            main: i18next.t('front.common.my', {val: '$t(dictionary.project)'}),
            task: i18next.t('front.common.all', {val: '$t(dictionary.task)'}),
            schd: i18next.t('dictionary.calendar'),
            file: i18next.t('front.common.filesStorage'),
            bookmark: i18next.t('dictionary.bookMark'),
            mention: i18next.t('dictionary.mention'),
            mypost: i18next.t('front.common.myPosts'),
            open: i18next.t('front.common.publicProject'),
            label: i18next.t('front.common.projectFolder'),
            hidden: i18next.t('dictionary.hide'),
            nokeep: i18next.t('front.common.unclassified'),
            unread: i18next.t('dictionary.unread'),
            star: i18next.t('dictionary.favorite'),
        }
        return topText[key];
    }

    function addBackEvent() {
        try {
            window.onpopstate = function () {
                var url = location.href;
                if (url.indexOf("#") > -1) {
                    Electron.isElectronApp() && ElectronEvent.setHistoryButton(true, true);
                    //pass
                } else {
                    loadPage();
                }
            };
            history.pushState({page: 'main'}, "main", location.href);
        } catch (e) {
            Often.elog('back event error');
        }
    }

    function getPageJson() {
        return pageJson;
    }

    function isPage(pageId) {
        return (getCurrentPageId().indexOf(pageId) > -1);
    }

    function getProjectSrno() {
        var currentPageId = getCurrentPageId();
        if (currentPageId.indexOf(pageJson.detail) > -1 ||
            currentPageId.indexOf(pageJson.task) > -1 ||
            currentPageId.indexOf(pageJson.schd) > -1 ||
            currentPageId.indexOf(pageJson.file) > -1 ||
            currentPageId.indexOf(pageJson.history) > -1) {
            var tmpArr = currentPageId.split(splitSign);
            return (tmpArr.length > 1 ? tmpArr[1] : "");
        } else {
            return "";
        }
    }

    //값세팅하기
    function setVal(key, val) {
        if (Often.null2Void(key) === "") return;
        var tmpVal = Often.null2Void(val, getCurrentPageId());
        (key === "PREV_VIEW") && (viewArr.unshift(tmpVal));
    }

    //값가져오기
    function getVal(key) {
        if (Often.null2Void(key) === "") return viewArr;
        if (key === "PREV_VIEW") return viewArr[0];
    }

    //로드
    function loadPageJson(pageIdJson, callback) {
        PostPopup.checkWritingAndShowPopup(function () {
            PostPopup.removePopup();
            var pageId = pageIdJson.code + addVal(pageIdJson.first) + addVal(pageIdJson.second) + addVal(pageIdJson.third)
            loadPageById(pageId, callback);
        })
    }

    //로드
    /**
     *  일렉트론에서도 사용중. 수정시 공유필
     */
    function loadPage(pageId, callback) {
        PostPopup.checkWritingAndShowPopup(function () {
            loadPageById(pageId, callback);
        })
    }

    //로드페이지
    function loadPageById(nextPageId, callbackLoadPageById) {

        var CompJson = Often.null2Void(LocalUtil.getLocalJson('ONLY_COMPANY_JSON'));

        if ((nextPageId !== pageJson.main) &&
            (CompJson !== "") &&
            (CompJson.statusCode === StatusCode.BFLOW.END_ADMIN ||
                CompJson.statusCode === StatusCode.BFLOW.END_USER ||
                !CompJson.isAvailableService)) {
            /**
             * Todo.
             가장 좋은 방법은 백엔드 로직으로
             이용기간 만료시 유저들은 로그인 페이지로 리다이렉션 시키며
             이용기간 만료시 관리자들은 바로 결제 페이지로 이동시키는 것이다.
             메인 화면을 공개하는 시점에 개발자는 프론트 단에서 뚫을 수 있다. ex) html, script 조작 등
             */
            return;
        }

        AlarmUpdate.removeNewUpdate();
        SearchFilter.initSearchMemory();

        if (Often.null2Void(nextPageId) === "skip") {
            var tempViewArr = []
            viewArr.forEach(function (v) {
                if (v.indexOf("search/") > -1) {
                    //pass
                } else {
                    tempViewArr.push(v);
                }
            })
            viewArr = tempViewArr;
            nextPageId = Often.null2Void(getVal("PREV_VIEW"), "main")
            getVal().shift();
        } else if (Often.null2Void(nextPageId) === "") {
            nextPageId = Often.null2Void(getVal("PREV_VIEW"), "main")
            Electron.isElectronApp() && ElectronEvent.setHistoryButton(true, false, nextPageId);
            getVal().shift();
        } else {
            var prevPageId = getCurrentPageId();
            Electron.isElectronApp() && ElectronEvent.setHistoryButton(true, true, nextPageId);
            setVal("PREV_VIEW", prevPageId);
        }

        var tmpArr = getArrByPageId(nextPageId);
        var nextPageGubun = tmpArr[0];
        if (nextPageGubun === "file") {
            $('body').attr('oncontextmenu', 'return false');
        } else {
            $('body').removeAttr('oncontextmenu');
            document.oncontextmenu = function () {
                return true;
            }
        }

        var pageCode = tmpArr.length > 0 ? tmpArr[0] : "";
        var tmpFirstSrno = (tmpArr.length > 1 ? tmpArr[1] : "-1");			//colabo-srno, room-srno
        var tmpSecondSrno = (tmpArr.length > 2 ? tmpArr[2] : "-1");			//colabo-commt-srno, room-chat-srno, task-stts
        var tmpThirdSrno = (tmpArr.length > 3 ? tmpArr[3] : "-1");			//colabo-remark-srno

        setLeftMenu(pageCode, tmpFirstSrno);
        hideAllView();

        openPageByPageCode(pageCode);
        setInfo(pageCode, tmpSecondSrno);
        eventByPageCode(pageCode);
        PostPopup.removePopup();

        (typeof callbackLoadPageById === 'function') && callbackLoadPageById();

        function setLeftMenu(pageCode, tmpFirstSrno) {

            (pageCode === pageJson.detail || pageCode === pageJson.search) && (pageCode = "main");

            checkLeftMenuAndAction($("#leftMenuUl"));
            checkLeftMenuAndAction($("#leftScroll"));
            checkLeftMenuAndAction($("#leftBottomUl"));

            var $labelUl = $("#allLabelUl");
            var $labelItems = $labelUl.find(".label-item")
            var $selectedLabelItem = $labelUl.find(".label-item[label-srno=" + tmpFirstSrno + "]");
            checkLisAndAction($labelItems, $selectedLabelItem);
            checkLeftFilterPageAndAction();
            $(".js-collection-count").css("display", "none");


            $("#allLabelLeftButton").attr({
                "data-select-label-srno": (tmpFirstSrno === "-1" ? "" : tmpFirstSrno),
                "data-select-label-name": (tmpSecondSrno === "-1" ? "" : tmpSecondSrno),
            })

            function checkLeftMenuAndAction($targetUl) {
                var $$targetItems = $targetUl.find(".left-menu-item")
                var $selectedTargetItem = $targetUl.find(".left-menu-item[data-code=" + pageCode + "]");
                checkLisAndAction($$targetItems, $selectedTargetItem);
            }

            function checkLisAndAction($totalLi, $selectLi) {
                $totalLi.removeClass("flow-active");
                if ($selectLi.length > 0 && tmpFirstSrno === "-1") {
                    $selectLi.addClass("flow-active");
                    return true;
                }
                return false;
            }

            function checkLeftFilterPageAndAction() {
                var $leftFilterBtn = $("#leftFilterBtn");
                var isLeftFilterPage = pageCode === pageJson.schd || pageCode === pageJson.file || pageCode === pageJson.task;
                $leftFilterBtn.css("display", isLeftFilterPage ? "block" : "none");
                LeftFilter.closeLeftFilter();
                if (!isLeftFilterPage) return;
                $leftFilterBtn.removeClass("open").addClass("close");
                $leftFilterBtn.find("span").text(i18next.t("dictionary.close"));
            }
        }

        function setInfo(pageCode, tmpSecondSrno) {
            var isAllPost = (pageCode === pageJson.bookmark || pageCode === pageJson.mypost || pageCode === pageJson.mention);
            if (isAllPost) $(layerJson.v_all_post).attr('data-code', pageCode);
            var labelName = (tmpSecondSrno === "-1" ? "" : " - [" + decodeName(tmpSecondSrno) + "]");
            var $titleIcon = $('<div></div>').text(Often.null2Void(getTopText(pageCode), getTopText('main')) + labelName);
            $("#hashtagUl").find(".hashtag").removeClass("on");
            $(layerJson.v_main_top).html($titleIcon).attr('data-code', pageCode);
        }

        function openPageByPageCode(pageCode) {
            var openPageCodeArray = []
            var isPost = pageCode === pageJson.detail;
            var isProject = (pageCode === pageJson.label || pageCode === pageJson.hidden ||
                pageCode === pageJson.star || pageCode === pageJson.unread || pageCode === pageJson.nokeep);
            var isCollect = (pageCode === pageJson.task || pageCode === pageJson.schd || pageCode === pageJson.file || pageCode === pageJson.history);
            var isAllPost = (pageCode === pageJson.bookmark || pageCode === pageJson.mypost || pageCode === pageJson.mention);
            var isDetailCollect = tmpFirstSrno !== "-1";

            if (isPost) {
                openPageCodeArray.push("v_detail_top");
                openPageCodeArray.push("v_detail_top_search");
                openPageCodeArray.push("v_detail_timeline");
            } else {
                if (isCollect && isDetailCollect) {
                    openPageCodeArray.push("v_detail_top");
                } else {
                    openPageCodeArray.push("v_main_top");
                }
            }

            if (isCollect) {
                if (isDetailCollect) {
                    openPageCodeArray.push("v_detail");
                    openPageCodeArray.push("v_detail_collect");
                } else {
                    openPageCodeArray.push("v_all_collect");
                }
            } else {
                //pass
            }

            if (isProject) {
                openPageCodeArray.push("v_main");
            } else if (isAllPost) {
                openPageCodeArray.push("v_all_post");
            } else {
                openPageCodeArray.push("v_" + pageCode);
            }

            if (pageCode === pageJson.main ||
                pageCode === pageJson.nokeep ||
                pageCode === pageJson.unread ||
                pageCode === pageJson.star ||
                pageCode === pageJson.hidden ||
                pageCode === pageJson.label) {
                openPageCodeArray.push("v_main_home_top");
            } else {
                //pass
            }

            if (pageCode === pageJson.main) {
                //openPageCodeArray.push("v_join"); //Note. 깜빡거림이 거슬려서
            } else {
                //pass
            }

            showSelectedView(openPageCodeArray);
        }

        function eventByPageCode(pageCode) {
            var projectMode = AllProject.getProjectMode();
            tmpFirstSrno = tmpFirstSrno === "-1" ? "" : tmpFirstSrno
            switch (pageCode) {
                case pageJson.history :
                    AlarmHistory.openView(tmpFirstSrno);
                    break;
                case pageJson.search :
                    Search.moveSearchResultPage(tmpFirstSrno, decodeName(tmpSecondSrno));
                    break;
                case pageJson.task :
                    AllTask.openLayer(tmpFirstSrno);
                    break;
                case pageJson.schd :
                    AllCalendar.openLayer(tmpFirstSrno);
                    break;
                case pageJson.file :
                    AllFile.openLayer(tmpFirstSrno);
                    break;
                case pageJson.bookmark :
                    AllPosts.openLayer("BOOKMARK");
                    break;
                case pageJson.mypost :
                    AllPosts.openLayer("SELF");
                    break;
                case pageJson.mention :
                    AllPosts.openLayer("MENTION");
                    break;
                case pageJson.open :
                    OpenProject.openLayer();
                    break;
                case pageJson.detail :
                    Detail.showDetailView(tmpFirstSrno, minus2empty(tmpSecondSrno), minus2empty(tmpThirdSrno));
                    break;
                case pageJson.nokeep :
                    AllProject.showList({MODE: projectMode.NOKEEP});
                    break;
                case pageJson.unread :
                    AllProject.showList({MODE: projectMode.UNREAD});
                    break;
                case pageJson.star :
                    AllProject.showList({MODE: projectMode.STAR});
                    break;
                case pageJson.hidden :
                    AllProject.showList({MODE: projectMode.HIDDEN});
                    break;
                case pageJson.label :
                    AllProject.showList({MODE: projectMode.LABEL, LABEL_SRNO: tmpFirstSrno});
                    break;
                case pageJson.upgrade:
                    Upgrade.showUpgradeLayer();
                    break;
                default :
                    AllProject.showList({MODE: projectMode.MAIN});
                    break;
            }

            var currentPageId = getCurrentPageId();
            var subPath = (currentPageId !== 'main' ? currentPageId : '').replace("#", "");
            LocalUtil.setLocal("SUB_PATH", subPath);
            history.pushState({page: subPath}, subPath, Often.getLocOrigin() + "/main.act");

            //Todo. electron에서 i18next로 바로 title지정이 안되는 이슈가 있음. 원인파악 더 필요하나 비우고 넣는 것으로 임시조치.
            document.title = '';
            document.title = i18next.t('front.common.flowTitle');
        }

        //ex1) detail/204352/553125/36386
        //ex2) search/total/http://
        function getArrByPageId(nextPageId) {
            var tmpArr = Often.null2Void(nextPageId).split(splitSign);
            var pageCode = tmpArr[0];
            if (pageCode === pageJson.search) {
                var searchWord = nextPageId.replace(pageCode + splitSign + tmpArr[1] + splitSign, "");
                return [pageCode, tmpArr[1], searchWord];
            }
            return tmpArr;
        }
    }

    //선택한 뷰 보이기
    function showSelectedView(selectedArr) {
        selectedArr.forEach(function (layerJsonCode) {
            var isCollection = layerJsonCode === "v_task" || layerJsonCode === "v_schd" || layerJsonCode === "v_file" ||
                layerJsonCode === "v_detail_collect";
            $(layerJson[layerJsonCode]).css('display', isCollection ? 'flex' : 'block')
        });
    }

    //모든 뷰 숨기기
    function hideAllView() {
        for (var key in layerJson) {
            $(layerJson[key]).css('display', 'none')
        }
    }

    function getPageCode() {
        var currentStatus = getCurrentStatus();
        var pageCode = "";
        for (var key in currentStatus) {
            var isPermit = ("" === pageCode && currentStatus[key]);
            isPermit && (pageCode = pageJson[key]);
        }
        return pageCode;
    }

    //현재 페이지 아이디
    function getCurrentPageId() {
        var currentStatus = getCurrentStatus();
        var pageCode = "";
        for (var key in currentStatus) {
            var isPermit = ("" === pageCode && currentStatus[key]);
            isPermit && (pageCode = pageJson[key]);
        }

        if (currentStatus.search) {
            pageCode += addVal(currentStatus.searchTab) + addVal(currentStatus.totalSearchWord);
        } else if (currentStatus.detail) {
            pageCode += addVal(currentStatus.projectSrno) + addVal(currentStatus.postSrno) + addVal(currentStatus.remarkSrno);
        } else if (currentStatus.task || currentStatus.schd || currentStatus.file || currentStatus.history) {
            pageCode += addVal(currentStatus.projectSrno)
        } else if (currentStatus.label) {
            pageCode += addVal(currentStatus.labelSrno) + addVal(currentStatus.labelName);
        } else if (currentStatus.open) {
            pageCode += addVal(currentStatus.openSrno);
        } else {
            //pass
        }
        return Often.null2Void(pageCode);
    }

    //현재 상태
    function getCurrentStatus() {
        var isSearchVisible = $(layerJson.v_search).is(":visible");
        var isDetailVisible = $(layerJson.v_detail).is(":visible");
        var isMainVisible = $(layerJson.v_main).is(":visible");
        var isMiniProjectVisible = $(layerJson.v_mini_project).is(":visible");
        var $allCollect = $(layerJson.v_all_collect);
        var $detailCollect = $(layerJson.v_detail_collect);
        var $allPost = $(layerJson.v_all_post);

        var totalSearchWord = $.trim($("#searchPopupInput").val());
        var allPostCode = $allPost.attr('data-code');
        var projectCode = $(layerJson.v_main_top).attr('data-code');
        var projectSrno = isDetailVisible ? Detail.getProjectSrno() : CONNECT_PROJECT_SRNO;
        var postSrno = Often.null2Void($("#postPopup").attr("data-post-srno"), CONNECT_POST_SRNO);
        var remarkSrno = CONNECT_REMARK_SRNO;
        var $allLabelLeftButton = $("#allLabelLeftButton");
        var labelSrno = Often.null2Void($allLabelLeftButton.attr("data-select-label-srno"), "");
        var labelName = encodeName($.trim(Often.null2Void($("#allLabelUl .label-item.flow-active").find(".js-label-name").text(),
            $allLabelLeftButton.attr("data-select-label-name")), ""));
        var searchTab = Often.null2Void($("#searchTab").find(".js-tab-item.active").attr("data-code"), "");

        var CurrentStatus = {
            search: isSearchVisible,
            main: isMainVisible && labelSrno === "" && (projectCode !== pageJson.unread) && (projectCode !== pageJson.nokeep) &&
                (projectCode !== pageJson.star) && (projectCode !== pageJson.hidden),
            miniProject: isMiniProjectVisible,
            label: isMainVisible && labelSrno !== "",
            unread: isMainVisible && (projectCode === pageJson.unread),
            nokeep: isMainVisible && (projectCode === pageJson.nokeep),
            star: isMainVisible && (projectCode === pageJson.star),
            hidden: isMainVisible && (projectCode === pageJson.hidden),
            task: ($allCollect.find(layerJson.v_task).is(":visible") || $detailCollect.find(layerJson.v_task).is(":visible")),
            schd: ($allCollect.find(layerJson.v_schd).is(":visible") || $detailCollect.find(layerJson.v_schd).is(":visible")),
            file: ($allCollect.find(layerJson.v_file).is(":visible") || $detailCollect.find(layerJson.v_file).is(":visible")),
            bookmark: $allPost.is(":visible") && allPostCode === pageJson.bookmark,
            mention: $allPost.is(":visible") && allPostCode === pageJson.mention,
            mypost: $allPost.is(":visible") && allPostCode === pageJson.mypost,
            open: $(layerJson.v_open).is(":visible"),
            detail: isDetailVisible,
            totalSearchWord: totalSearchWord,
            projectSrno: ($allCollect.is(":visible") ? "" : projectSrno),
            postSrno: postSrno,
            remarkSrno: remarkSrno,
            openSrno: "",
            labelSrno: labelSrno,
            labelName: labelName,
            searchTab: searchTab,
        }
        return CurrentStatus;
    }

    function encodeName(name) {
        if (name.indexOf("%25") > -1) return name;
        return encodeURI(name);
    }

    function decodeName(name) {
        if (name.indexOf("%25") > -1) return decodeURI(decodeURI(name));
        return decodeURI(name);
    }

    function addVal(val) {
        if (!val || val === '-1') return '';
        return splitSign + val;
    }

    function minus2empty(val) {
        return (Number(val) < 0 && Number(val) !== TINY_URL_MOVE.POST ? "" : val);
    }

})();
