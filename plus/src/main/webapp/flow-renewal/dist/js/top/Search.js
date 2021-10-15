var Search = (function () {

    var clickTimer;
    var isClicking = false;

    var isInit = true; //최초 로드

    var $searchPopupLayer, $searchPopupInput, $detailSearchArea;
    var $searchResult, $searchWord, $searchTab, $searchEventArea, $searchResultClose, $searchFilter;
    var postSrno, remarkSrno;

    var searchData = {
        project: {PG_NO: 1, PG_PER_CNT: 5, NEXT_YN: 'Y'},
        post: {PG_NO: 1, PG_PER_CNT: 5, NEXT_YN: 'Y', CHECK_DTTM: ""},
        file: {PG_NO: 1, PG_PER_CNT: 5, NEXT_YN: 'Y'},
    }

    var codeBundle = {
        project: {apiKey: RenewalApi.GET.ACT_PROJECT_LIST, recordName: "PROJECT_RECORD", totalPaging: 5},
        post: {apiKey: RenewalApi.GET.ACT_SEARCH_POST_N_REMARK_LIST, recordName: "RESULT_RECORD", totalPaging: 5},
        file: {apiKey: RenewalApi.GET.ACT_SEARCH_FILE_LIST, recordName: "RESULT_RECORD", totalPaging: 5}
    }

    return {
        fillTopSearchBar: fillTopSearchBar,
        drawSearchResult: drawSearchResult,
        moveSearchResultPage: moveSearchResultPage,
        closeTopSearchPopup: closeTopSearchPopup,
    }

    function set$element() {
        $searchPopupLayer = $("#searchPopupLayer"); //통합검색팝업
        $searchPopupInput = $searchPopupLayer.find("#searchPopupInput") //통합검색팝업 인풋
        $detailSearchArea = $searchPopupLayer.find("#detailSearchArea") //통합검색팝업 상세영역

        $searchResult = $("#searchResult"); //통합검색결과
        $searchWord = $searchResult.find("#searchWord"); //상단 검색어 표기
        $searchResultClose = $searchResult.find("#searchResultClose"); //닫기
        $searchTab = $searchResult.find("#searchTab"); //탭영역
        $searchEventArea = $searchResult.find("#searchEventArea"); //콘텐츠영역
        $searchFilter = $searchResult.find("#searchFilter"); //우측 필터영역
    }

    function fillTopSearchBar() {
        var searchMemoryJson = LocalUtil.getLocalJson("IN_TONG_SEARCH_MEMORY");
        var searchWord = "";
        var $searchPopupTopButton = $("#searchPopupTopButton");
        if (searchMemoryJson && Object.keys(searchMemoryJson).length > 1 &&
            searchMemoryJson.SEARCH_WORD && "" !== $.trim(searchMemoryJson.SEARCH_WORD)) {
            searchWord = i18next.t('dictionary.search') + " : " + $.trim(searchMemoryJson.SEARCH_WORD);
            $searchPopupTopButton.find(".js-top-search-delete").addClass("active");
        }
        $searchPopupTopButton.find("input").val(searchWord);
    }

    //Note. ViewChanger로 호출됨
    function moveSearchResultPage(filterCode, searchWord) {

        set$element();
        filterCode = SearchFilter.checkCode(filterCode);
        var methodCode = (isInit ? 'F5' : 'DIRECT');

        if (isInit) {
            isInit = false;

            //값 초기화
            SearchFilter.initFilter($searchPopupLayer, filterCode, true);
            SearchFilter.initFilter($searchFilter, filterCode, true);

            //이벤트 초기화
            $searchTab.off("click").on("click", clickSearchTabWithThrottling);
            $searchEventArea.off("click").on("click", SearchEvent.clickSearchEventArea);
            $searchResultClose.off("click").on("click", closeSearchResult);
            SearchFilter.addEventOnSearchFilter($searchFilter, function () {
                drawSearchResultByFilter('RIGHT-FILTER');
            }, false);
        }

        $searchPopupInput.val(searchWord); //drawSearchResult 선행
        $searchWord.text(searchWord);

        //검색팝업으로 넘어가는 경우와 바로 넘어가는 경우
        if ($searchPopupLayer.is(":visible")) {
            drawSearchResult(filterCode, searchWord, $searchPopupLayer, $searchFilter, 'SEARCH');
            $searchPopupLayer.fadeOut(200);
            $searchResult.fadeIn(200);
            return;
        }

        drawSearchResult(filterCode, searchWord, '', $searchFilter, methodCode);
        $searchResult.fadeIn(200);

        function drawSearchResultByFilter(methodCode) {
            var filterCode = $searchTab.find(".js-tab-item.active").attr("data-code");
            var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_TONG);
            drawSearchResult(filterCode, searchWord, '', $searchFilter, methodCode);
        }

        function clickSearchTabWithThrottling(e) {
            if (isClicking) return;
            clickSearchTab(e);
            isClicking = true;
            clickTimer = setTimeout(function () {
                isClicking = false;
                clearTimeout(clickTimer);
            }, 300);

            function clickSearchTab(e) {
                var $eTarget = $(e.target);
                var $tabItem = $eTarget.findUp(".js-tab-item");
                if ($tabItem.length > 0) {
                    $tabItem.parent().find(".js-tab-item").removeClass("active");
                    $tabItem.addClass("active");
                    drawSearchResultByFilter("TAB");
                }
            }
        }

        function closeSearchResult() {
            ViewChanger.loadPage("skip");
            fillTopSearchBar();
            $("#searchPopupInput").val("");
        }
    }

    /**
     * Note. methodCode = 검색 방식
     * 0. 'SEARCH' - 검색
     * 1. 'F5' - 새로고침
     * 2. 'DIRECT' - 검색바 눌러서 바로 이동
     * 3. 'TAB' - 탭이동
     * 4. 'MORE' - 전체에서 더보기
     * 5. 'RIGHT-FILTER' - 우측 필터 작동
     */
    function drawSearchResult(filterCode, searchWord, $searchPopupLayer, $searchFilter, methodCode) {
        selectSearchTab(filterCode);
        var searchFilterJson = getSearchFilterJson();
        var $searchEventArea = $("#searchEventArea");

        $searchFilter.find(".js-search-pickr-layer").css("display", filterCode === searchMode.PROJECT ? "none" : "block");
        if (filterCode !== searchMode.TOTAL) {
            $searchEventArea.removeClass('total')
            ListHelper.initPageData(searchData[filterCode], $("#" + filterCode + "SearchResult"), true);
            initCheckSerialNumber();
            drawSearchResultByCode(filterCode, searchWord, false, false, searchFilterJson);
            return;
        }

        $searchEventArea.off("scroll");
        $searchEventArea.addClass('total')

        ListHelper.initPageData(searchData.project, $("#projectSearchResult"));
        ListHelper.initPageData(searchData.post, $("#postSearchResult"));
        ListHelper.initPageData(searchData.file, $("#fileSearchResult"));
        initCheckSerialNumber();

        var $searchAreas = $searchResult.find("#projectSearchArea, #postSearchArea, #fileSearchArea");
        $searchResult.find("#projectSearchMore, #postSearchMore, #fileSearchMore").css("display", "none");
        $searchAreas.find(".search-title-area").css("display", "none");
        $searchAreas.css("display", "none");

        drawSearchResultByCode("project", searchWord, true, false, searchFilterJson, function () {
            isSelectTotalTab() && drawSearchResultByCode("post", searchWord, true, false, searchFilterJson, function () {
                isSelectTotalTab() && drawSearchResultByCode("file", searchWord, true, false, searchFilterJson);
            });
        });

        function isSelectTotalTab() {
            return ($searchTab.find(".js-tab-item.active").attr("data-code") === "total");
        }

        function getSearchFilterJson() {
            var searchFilterJson;
            if ('SEARCH' === methodCode) {
                //Note. 검색의 경우, 상세팝업 => 우측필터갱신 (온오프, 체크) => 데이터 가져옴!
                SearchFilter.setSearchFilter($searchPopupLayer, $searchFilter, filterCode);
                searchFilterJson = SearchFilter.getFilterJson($searchFilter, true);
            } else if ('TAB' === methodCode || 'MORE' === methodCode || 'RIGHT-FILTER' === methodCode) {
                //Note. 탭, 우측필터 변경의 경우, 상세팝업 => 우측필터갱신 (온오프) => 데이터 가져옴!
                SearchFilter.setSearchFilter($searchPopupLayer, $searchFilter, filterCode);
                searchFilterJson = SearchFilter.getFilterJson($searchFilter, false);
            } else if ('F5' === methodCode || 'DIRECT' === methodCode) {
                //Note. 새로고침의 경우, 데이터가져옴 => 우측필터갱신(체크)
                var searchMemoryJson = LocalUtil.getLocalJson("IN_TONG_SEARCH_MEMORY");
                if (searchMemoryJson && Object.keys(searchMemoryJson).length > 1) {
                    searchFilterJson = searchMemoryJson;
                    SearchFilter.setSearchFilterByData($searchFilter, searchMemoryJson);
                } else {
                    searchFilterJson = SearchFilter.getFilterJson($searchFilter, false);
                }
            }
            fillTopSearchBar();
            return searchFilterJson;
        }

        function drawSearchResultByCode(filterCode, searchWord, isTotal, isScroll, searchFilterJson, finalCallback) {

            if ("N" === Often.null2Void(searchData[filterCode].NEXT_YN, "Y")) return;

            var isScrolling = isScroll || false;
            var $codeSearchArea = $("#" + filterCode + "SearchArea");
            var $codeSearchResult = $("#" + filterCode + "SearchResult");

            searchData[filterCode].PG_PER_CNT = (isTotal ? codeBundle[filterCode].totalPaging : 20);

            $codeSearchArea.find(".search-title-area").css("display", "block");
            $codeSearchArea.css("display", "block");

            !isScroll && !isTotal && showInitArea(filterCode);

            var searchFilterJsonByCode = $.extend({}, searchFilterJson);
            if (filterCode === searchMode.PROJECT) {
                searchFilterJsonByCode["START_DATE"] = "";
                searchFilterJsonByCode["END_DATE"] = "";
            }

            Ajax.executeApi(codeBundle[filterCode].apiKey, $.extend({}, searchData[filterCode], {
                packetOption: Ajax.OPTION.PREVENT_CALLBACK,
            }, {
                SORT_DESC: LocalUtil.getProjectOrder(),
                COLABO_COMMT_SRNO: Often.null2Void(postSrno),
                COLABO_REMARK_SRNO: Often.null2Void(remarkSrno),
                SEARCH_RECORD: [$.extend({
                    SRCH_WORD: searchWord,
                    ORDER_TYPE: "A", //A-정확도순, N-최신순
                }, searchFilterJsonByCode)]
            }), function (dat) {
                postSrno = Often.null2Void(dat["COLABO_COMMT_SRNO"]);
                remarkSrno = Often.null2Void(dat["COLABO_REMARK_SRNO"]);
                var drawJson = {
                    pageData: searchData[filterCode],
                    checkDttm: Often.null2Void(dat["CHECK_DTTM"]),
                    nextYn: dat["NEXT_YN"],
                    records: dat[codeBundle[filterCode].recordName],
                    noDataHtml: ListHelper.getNoDataHtml("SEARCH"),
                    callback: {
                        item: getHtmlByCode,
                        final: finalCallback,
                    }
                }
                if (isTotal) {
                    drawCountAndMore(filterCode, dat.CNT, searchData[filterCode].PG_PER_CNT);
                } else {
                    !isScrolling && drawCountAndMore(filterCode, dat.CNT, searchData[filterCode].PG_PER_CNT);
                    drawJson.callback.scroll = drawSearchResultScrollByCode;
                }
                $codeSearchResult.drawListHelper(drawJson);
            })

            function getHtmlByCode(array) {
                var returnHtml = "";
                var baseHtml = $("#" + filterCode + "SearchResultItem").html();
                $.each(array, function (i, item) {
                    returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, item, {
                        ORCP_FILE_NM: text2light(TagUtil.tag2html(item.ORCP_FILE_NM)),
                        data_file_name: item.ORCP_FILE_NM,
                        TTL: text2light(item.TTL),
                        BG_COLOR_CD: Often.null2Void(item.BG_COLOR_CD, "0"),
                        title: text2light(getTitle(item)),
                        contents: text2light(getContents(item)),
                        date: Tz.momentTimeZone(item.RGSN_DTTM, "type1"),
                        size: FileUtil.getFileSize(item.FILE_SIZE),
                        post_class: getPostClassName(item.TMPL_TYPE),
                        post_name: getPostName(item.TMPL_TYPE),
                        unstar_class: (item.IMPT_YN === "Y" ? "" : "unstar"),
                        file_class: FileUtil.getIconClassNameByFullName(item.RAND_KEY, item.ORCP_FILE_NM),
                    }));
                });
                return returnHtml;

                function text2light(text) {
                    return TagUtil.text2highlight("SEARCH", TagUtil.removeAllTag(text), searchWord);
                }

                function getContents(item) {
                    var isSearchMode = ("" !== searchWord);
                    return TagConvert.db2OneString(item.TMPL_TYPE === "-1" ? item.CNTN :
                        Often.null2Void(item.COMMT_TTL, item.CNTN), isSearchMode);
                }

                function getTitle(item) {
                    return ((item.TMPL_TYPE === "-1") ? item.CNTN : Often.null2Void(item.COMMT_TTL, item.CNTN));
                }
            }

            function drawSearchResultScrollByCode() {
                drawSearchResultByCode(filterCode, searchWord, isTotal, true, searchFilterJson);
            }

            function showInitArea(code) {
                drawCountAndMore(code, 0, searchData[code].PG_PER_CNT);
                for (var tempCode in searchData) {
                    if (tempCode === code) {
                        $("#" + tempCode + "SearchArea").css("display", "block");
                    } else {
                        $("#" + tempCode + "SearchResult").empty();
                        $("#" + tempCode + "SearchArea").css("display", "none");
                    }
                }
            }

            function drawCountAndMore(code, count, pagePerCount) {
                ListHelper.setCount($("#" + code + "SearchCount"), count, "inline-block", 100);
                $("#" + code + "SearchMore").css("display", ((Number(pagePerCount) < Number(count) && isTotal) ? "block" : "none"));
            }
        }

        function selectSearchTab(code) {
            var $tabItem = $searchTab.find(".js-tab-item[data-code=" + SearchFilter.checkCode(code) + "]");
            if ($tabItem.length > 0) {
                $searchTab.find(".js-tab-item").removeClass("active");
                $tabItem.addClass("active");
            }
        }
    }

    //Note. TopSearchPopup 끄기
    function closeTopSearchPopup($eTarget) {
        if ($eTarget.parents(".flatpickr-calendar").length > 0) return;
        var $flatpickrCalendar = $(".flatpickr-calendar");
        if ($flatpickrCalendar.is(":visible")) return $flatpickrCalendar.remove();
        set$element();
        $searchPopupLayer.fadeOut(200);
    }

    function getPostClassName(tmplType) {
        if (Often.null2Void(tmplType) === "") return "write";
        return {"-1": "comment", "1": "write", "2": "todo", "3": "schedule", "4": "task"}[tmplType];
    }

    function getPostName(tmplType) {
        if (Often.null2Void(tmplType) === "") return i18next.t('dictionary.article');
        return {
            "-1": i18next.t('dictionary.comment'),
            "1": i18next.t('dictionary.article'),
            "2": i18next.t('dictionary.todo'),
            "3": i18next.t('dictionary.schedule'),
            "4": i18next.t('dictionary.task')
        }[tmplType];
    }

    function initCheckSerialNumber() {
        postSrno = "";
        remarkSrno = "";
    }
})()