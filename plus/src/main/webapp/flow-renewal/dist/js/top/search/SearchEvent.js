var SearchEvent = (function () {

    var $searchPopupLayer, $searchPopupInput, $searchSectionDiv, $detailSearchArea;
    var $searchResult, $searchWord, $searchEventArea;

    return {
        clickSearchEventArea: clickSearchEventArea,
        clickTopSearchBar: clickTopSearchBar,
        controlSearchDelIcon: controlSearchDelIcon,
        controlCategoryTab: controlCategoryTab
    }

    function set$element() {
        $searchPopupLayer = $("#searchPopupLayer"); //통합검색팝업
        $searchPopupInput = $searchPopupLayer.find("#searchPopupInput") //통합검색팝업 인풋
        $searchSectionDiv = $searchPopupLayer.find(".js-search-section-div") //통합검색팝업 검색카테고리영역
        $detailSearchArea = $searchPopupLayer.find("#detailSearchArea") //통합검색팝업 상세영역

        $searchResult = $("#searchResult"); //통합검색결과
        $searchWord = $searchResult.find("#searchWord"); //상단 검색어 표기
        $searchEventArea = $searchResult.find("#searchEventArea"); //콘텐츠영역
    }

    function clickSearchEventArea(e) {

        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_TONG);

        var $eTarget = $(e.target);
        var $searchResult = $eTarget.findUp("#searchResult");
        var $searchFilter = $searchResult.find("#searchFilter");
        var $searchItem = $eTarget.findUp(".js-search-item");
        var $searchMore = $eTarget.findUp(".js-search-more");
        var $movePage = $eTarget.findUp(".js-move-page");
        var $download = $eTarget.findUp(".js-download");

        var projectSrno = $searchItem.attr("COLABO_SRNO");
        var postSrno = $searchItem.attr("COLABO_COMMT_SRNO");
        var remarkSrno = $searchItem.attr("COLABO_REMARK_SRNO");
        var fileJsonArray = Often.getAttrs($searchItem);

        if ($download.length > 0) {
            return FileUtil.saveFile(fileJsonArray);
        }

        if ($searchMore.length > 0) {
            var codeByMore = $searchMore.attr("data-code");
            Search.drawSearchResult(codeByMore, searchWord, '', $searchFilter, 'MORE');
            return;
        }

        if ($movePage.length > 0) {
            return movePage(projectSrno, postSrno, remarkSrno);
        }

        if ($searchItem.length > 0) {
            var writeDate = $searchItem.attr("rgsn_dttm");
            if (LimitGuest.isSearchLimitGuest("post", writeDate)) return;
            var codeByItem = $searchItem.attr("data-code");
            if (codeByItem === searchMode.PROJECT) {
                var $starButton = $eTarget.findUp(".js-star-button");
                if ($starButton.length === 0) return movePage(projectSrno);
                var $starIcon = $starButton.find(".js-star-icon");
                var isUnStar = $starIcon.hasClass("unstar");
                ProjectSetting.setProjectStar(projectSrno, !isUnStar, function () {
                    if (isUnStar) $starIcon.removeClass("unstar");
                    else $starIcon.addClass("unstar");
                })
            }
            if (codeByItem === searchMode.POST) {
                return PostPopup.togglePostView(projectSrno, postSrno, remarkSrno, function () {
                    $("#searchResult").find(".highlight").removeClass("highlight")
                    $searchItem.addClass("highlight");
                });
            }
            if (codeByItem === searchMode.FILE) {
                if (ImageUtil.isImageType(fileJsonArray[0])) ImageViewer.openImage("POST", fileJsonArray, 0);
                else FileUtil.openFile("DOC-VIEWER", fileJsonArray);
            }
        }

        function movePage(projectSrno, postSrno, remarkSrno) {
            ViewChanger.loadPageJson({code: "detail", first: projectSrno, second: postSrno, third: remarkSrno});
        }
    }

    //Note. topSearchBar 누르기
    function clickTopSearchBar(e) {

        var $eTarget = $(e.target);

        if ($eTarget.findUp(".js-top-search-delete").length > 0) {
            var $searchPopupTopButton = $("#searchPopupTopButton");
            $searchPopupTopButton.find("input").val("");
            $searchPopupTopButton.find(".js-top-search-delete").removeClass("active");
            SearchStore.initValueByAreaCode("IN_TONG", "SEARCH_WORD");
            Search.fillTopSearchBar();
            return;
        }

        if (!ViewChanger.isPage("search")) {
            var searchMemoryJson = LocalUtil.getLocalJson("IN_TONG_SEARCH_MEMORY");
            if (searchMemoryJson && Object.keys(searchMemoryJson).length > 1) {
                var searchWord = $.trim(Often.null2Void(searchMemoryJson.SEARCH_WORD));
                if (searchWord !== "" && searchWord !== "-1") {
                    if ($("#tempPopup").find(".confirm-popup").is(":visible")) return;
                    PostPopup.checkWritingAndShowPopup(function () {
                        ViewChanger.setVal("PREV_VIEW");
                        LeftFilter.closeLeftFilter();
                        $("#leftFilterBtn").css("display", "none");
                        openSearchPopup(); //선행 set$element
                        $searchResult.css("display", "block");
                    })
                    return;
                }
            }
        }

        DocumentEvent.closeAllPopup();
        openSearchPopup();

        function openSearchPopup() {
            set$element();
            openTopSearchPopup();
            var $detailSearch = $eTarget.findUp(".js-detail-search");
            var isExistsSearchCategory = "" !== Often.null2Void($searchPopupLayer.find(".js-add-section").attr("data-code"))
            $detailSearchArea.css("display", (isExistsSearchCategory || $detailSearch.length > 0 ? "block" : "none")); //openTopSearchPopup 후행
        }

        function openTopSearchPopup() {

            SearchFilter.initFilter($searchPopupLayer, searchMode.TOTAL, true);
            SearchFilter.addEventOnSearchFilter($detailSearchArea, loadSearchPage, true);
            var selectedCode = Often.null2Void(LocalUtil.getLocal("SEARCH_CATEGORY"), searchMode.TOTAL);
            controlCategoryTab(selectedCode);
            SearchFilter.controlOptionView($searchPopupLayer, selectedCode);

            $searchPopupLayer.off("click").on("click", clickTopSearchArea);
            $searchPopupInput.off("keyup").on({
                keyup: keyupTopSearchArea,
                keydown: keydownTopSearchArea
            });
            $searchPopupLayer.fadeIn(200, function () {
                $searchPopupInput.focus();
            })

            function keyupTopSearchArea(e) {
                var searchWord = $.trim($searchPopupInput.val());
                if (KeyCheck.isKey(e, "ENTER")) return loadSearchPageByData();
                controlSearchDelIcon(searchWord);
            }

            function keydownTopSearchArea(e) {
                if (KeyCheck.isKey(e, "BACK")) {
                    var searchWord = $.trim($searchPopupInput.val());
                    var $addSection = $searchPopupInput.prev(".js-add-section");
                    if (searchWord !== "" || $addSection.length === 0) return;
                    e.preventDefault();
                    $addSection.find("i").trigger("click");
                }
            }

            function loadSearchPageByData() {
                var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_TONG);
                controlSearchDelIcon(searchWord);
                loadSearchPage();
            }

            function loadSearchPage() {
                var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_TONG);
                var filterCode = SearchFilter.getModeByAreaCode(searchAreaCode.IN_TONG);
                if (SearchFilter.isUnSearchableAndToast("" !== searchWord)) return;
                ViewChanger.loadPageJson({code: "search", first: filterCode, second: searchWord});
            }

            function clickTopSearchArea(e) {

                var $eTarget = $(e.target);
                var $searchSection = $eTarget.findUp(".js-search-section");
                var $detailSearch = $eTarget.findUp(".js-detail-search");
                var $searchDel = $eTarget.findUp(".js-search-del");
                var targetCode = SearchFilter.checkCode($searchSection.attr('data-code'));

                if ($searchDel.length > 0) {
                    $searchPopupInput.val("");
                    $searchDel.hide();
                    SearchStore.initValueByAreaCode("IN_TONG", "SEARCH_WORD");
                    Search.fillTopSearchBar();
                }

                if ($detailSearch.length > 0) {
                    if ($detailSearchArea.is(":visible")) $detailSearchArea.slideUp();
                    else $detailSearchArea.slideDown();
                    $searchPopupInput.focus();
                    return;
                }

                if ($searchSection.length > 0) {
                    var $addSection = $searchPopupLayer.find(".js-add-section");
                    $addSection.empty();
                    selectTag(e, targetCode);
                    $searchPopupInput.focus();
                } else {
                    //pass
                }
            }
        }
    }

    function controlSearchDelIcon(searchWord) {
        var $searchPopupLayer = $("#searchPopupLayer");
        if ("" === searchWord) {
            $searchPopupLayer.find(".js-search-del").css('display', 'none');
            $searchPopupLayer.find(".js-search-icon").removeClass("on");
        } else {
            $searchPopupLayer.find(".js-search-del").css('display', 'block');
            $searchPopupLayer.find(".js-search-icon").addClass("on");
        }
    }

    //Note. CategoryTab 제어
    function controlCategoryTab(searchFilterCode) {
        set$element();
        var $addSection = $searchPopupLayer.find(".js-add-section");
        if (searchFilterCode === "" || searchFilterCode === searchMode.TOTAL) {
            $addSection.empty();
            $addSection.attr({"data-code": ""});
            SearchStore.initValueByAreaCode("IN_TONG", "MODE");
            Search.fillTopSearchBar();
            $searchSectionDiv.css("display", "block");
            $detailSearchArea.css("display", "none");
        } else {
            var $searchSection = $searchPopupLayer.find(".js-search-section[data-code=" + searchFilterCode + "]");
            var name = $searchSection.find(".js-section-name").text();
            $addSection.attr({"class": "js-add-section project-blue-button", "data-code": searchFilterCode});
            $addSection.addClass(searchFilterCode);
            $addSection.empty().append(getSearchTagObj($searchPopupLayer, name));
            $searchSectionDiv.css("display", "none");
            $detailSearchArea.css("display", "block");
        }

        function getSearchTagObj($searchPopupLayer, name) {
            var $searchTag = $('<a href="#"><em></em>' + name + '<i></i></a>');
            $searchTag.find("i").on("click", selectTag);
            return $searchTag;
        }
    }

    function selectTag(event, code) {
        event && event.stopPropagation();
        var selectCode = Often.null2Void(code, searchMode.TOTAL);
        LocalUtil.setLocal("SEARCH_CATEGORY", selectCode);
        controlCategoryTab(selectCode);
        SearchFilter.controlOptionView($searchPopupLayer, selectCode);
    }

})()