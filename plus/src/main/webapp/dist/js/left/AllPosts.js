var AllPosts = (function () {

    var $allPostsLayer, $myPostContentUl, $allPostsSearchResult, $allPostsSearchFilter;
    var $allPostsDetailSearchLayer, $allPostsFilter, $allPostsSearchInput, $allPostsDetailSearchTopButton,
        $allPostsDetailSearchBackButton, $allPostsResetFilterButton;
    var postSrno, remarkSrno;

    var allPostsPageData = {
        PG_NO: 1,
        PG_PER_CNT: 20,
        NEXT_YN: "Y",
    }

    var allPostsSearchPageData = {
        CHECK_DTTM: '',
        PG_PER_CNT: 20,
        NEXT_YN: "Y",
    }

    var pageCode;

    return {
        openLayer: openLayer,
        getBookmarkNoDataHtml: getAllPostsNoDataHtml,
        closeAllPostsFilter: closeAllPostsFilter,
        closeAllPostsDetailSearchLayer: closeAllPostsDetailSearchLayer,
    }

    function set$element() {
        $allPostsLayer = $("#allPostsLayer");

        //top
        $allPostsSearchInput = $allPostsLayer.find("#allPostsSearchInput"); //상세검색 인풋
        $allPostsDetailSearchTopButton = $allPostsLayer.find("#allPostsDetailSearchTopButton"); //상세검색 버튼
        $allPostsDetailSearchLayer = $allPostsLayer.find("#allPostsDetailSearchLayer"); //상세검색 팝업
        $allPostsDetailSearchBackButton = $allPostsLayer.find(".js-search-back-button.js-all-posts-back"); //돌아가기 버튼
        $allPostsResetFilterButton = $allPostsLayer.find(".js-filter-reset");

        //view
        $myPostContentUl = $allPostsLayer.find("#myPostContentUl"); //조회영역
        $allPostsFilter = $allPostsLayer.find("#allPostsFilter"); //조회필터버튼

        //search
        $allPostsSearchResult = $allPostsLayer.find(".js-post-search-result"); //검색영역
        $allPostsSearchFilter = $allPostsLayer.find("#allPostsSearchFilter"); //검색필터영역
    }

    function openLayer(code, isUpdate) {
        set$element();
        pageCode = code;
        if (isUpdate && $allPostsSearchResult.is(":visible")) return searchAllPostsListByFilter();
        $allPostsSearchResult.css('display', 'none');
        $allPostsSearchResult.attr({
            "data-code": code,
            "data-search-area-code": "IN_POSTS",
        });
        initData(isUpdate);
        drawAllPostsList();
        addInitEvent();
    }


    function initData(isUpdate) {
        $myPostContentUl.off();
        ListHelper.initPageData(allPostsPageData, (isUpdate ? "" : $myPostContentUl));
        initAllPostsFilter();
        SearchFilter.drawSearchCount($allPostsLayer.find(".js-search-post-count"), 0);
    }

    function initAllPostsFilter() {
        $allPostsSearchInput.val("");
        var displayData = (pageCode === "BOOKMARK" ? "none" : "block");
        $allPostsDetailSearchLayer.find(".js-remark-tmpl-type").css('display', displayData);
        $allPostsFilter.find(".js-remark-tmpl-type").css('display', displayData);
        selectTmplType($allPostsFilter.find(".js-total-tmpl-type"));
        SearchFilter.initFilter($allPostsSearchResult, searchMode.POST);
        SearchFilter.initFilter($allPostsDetailSearchLayer, searchMode.POST);
        $allPostsDetailSearchBackButton.css("display", "none");
        $allPostsLayer.find(".js-filter-reset").css("display", "none");
    }

    function addInitEvent() {

        $allPostsFilter.off("click").on("click", clickAllPostsFilter);
        $allPostsDetailSearchTopButton.off("click").on("click", clickAllPostsDetailSearchTopButton);
        $allPostsDetailSearchBackButton.off("click").on("click", closeAllPostsSearchResult);
        $allPostsResetFilterButton.off("click").on("click", clickResetFilter)

        $allPostsSearchInput.off("keyup").on("keyup", keydownEnterSearchAllPostsList);

        function clickAllPostsDetailSearchTopButton() {
            if ($allPostsDetailSearchLayer.is(":visible")) {
                closeAllPostsDetailSearchLayer()
            } else {
                SearchFilter.initFilter($allPostsDetailSearchLayer, searchMode.POST, true);
                SearchFilter.addEventOnSearchFilter($allPostsDetailSearchLayer, searchAllPostsList, true);
                $allPostsDetailSearchLayer.fadeIn(200);
            }
        }

        function keydownEnterSearchAllPostsList(e) {
            if (KeyCheck.isKey(e, "ENTER")) searchAllPostsList();
            if (KeyCheck.isKey(e, "ESC")) closeAllPostsSearchResult();
        }

        function closeAllPostsSearchResult() {
            initAllPostsFilter();
            $allPostsSearchResult.fadeOut(200);
        }

        function clickAllPostsFilter(e) {
            var $eTarget = $(e.target);
            var $allPostsFilterButton = $eTarget.findUp(".js-all-posts-filter-button");
            var $tmplType = $eTarget.findUp(".js-tmpl-type");

            if ($allPostsFilterButton.length > 0) {
                var $allPostsFilterLayer = $allPostsFilterButton.next();
                if ($allPostsFilterLayer.is(":visible")) return closeAllPostsFilter();
                $allPostsFilterButton.addClass("active");
                $allPostsFilterLayer.fadeIn(200);
                return;
            }

            if ($tmplType.length > 0) {
                selectTmplType($tmplType);
                ListHelper.initPageData(allPostsPageData);
                drawAllPostsList();
                closeAllPostsFilter();
            } else {
                //pass
            }
        }

        function clickResetFilter() {
            $allPostsFilter.find(".js-tmpl-type").removeClass("on");
            $allPostsLayer.find(".js-all-posts-filter-button").removeClass("active");
            $allPostsFilter.find(".check-menu-item[data-code=\"\"]").addClass("on");
            ListHelper.initPageData(allPostsPageData);
            drawAllPostsList();
            $allPostsResetFilterButton.css("display", "none");
            $allPostsLayer.find("#allPostsFilterTitle").text(i18next.t('dictionary.all'));
        }
    }

    function closeAllPostsDetailSearchLayer($eTarget) {
        if ($eTarget && ($eTarget.attr("id") === "allPostsSearchInput")) return;
        if ($eTarget && $eTarget.parents(".flatpickr-calendar").length > 0) return;
        set$element();
        $allPostsDetailSearchLayer.fadeOut(200);
    }

    function selectTmplType($tmplType) {
        $allPostsFilter.find(".js-tmpl-type").removeClass("on");
        $tmplType.addClass("on");
        $allPostsLayer.find("#allPostsFilterTitle").text($tmplType.text());
        var isTotal = "" === $tmplType.attr("data-code");
        $allPostsLayer.find(".js-filter-reset").css("display", isTotal ? "none" : "inline-block");
        if (isTotal) $allPostsLayer.find(".js-all-posts-filter-button").removeClass("active");
        else $allPostsLayer.find(".js-all-posts-filter-button").addClass("active");
    }

    function closeAllPostsFilter() {
        set$element();
        $allPostsFilter.find(".js-all-posts-filter-layer").fadeOut(200);
    }

    function getAllPostsNoDataHtml() {
        return ListHelper.getNoDataHtml(pageCode);
    }

    function drawAllPostsList() {
        if (allPostsPageData.NEXT_YN === "N") return;
        allPostsPageData.PG_NO === 1 && $allPostsLayer.find("#postCount").text(0);
        var tmplType = Often.null2Void($allPostsFilter.find(".js-tmpl-type.on").attr("data-code"));
        Ajax.executeApi(RenewalApi.GET.ACT_POST_LIST, $.extend({
            GUBUN: pageCode,
            TMPL_TYPE: tmplType,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE
        }, allPostsPageData), function (dat) {
            $myPostContentUl.drawListHelper({
                pageData: allPostsPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["POST_RECORD"],
                noDataHtml: getAllPostsNoDataHtml(),
                targetObj: {
                    focus: $allPostsSearchInput,
                    scroll: $myPostContentUl,
                },
                callback: {
                    click: clickAllPostsSearchItems,
                    item: getAllPostsHtmByRecord,
                    scroll: drawAllPostsList,
                    final: function () {
                        getPostCount();
                        if ($myPostContentUl.hasVerticalScrollBar()) return;
                        drawAllPostsList();
                    },
                }
            })

            function getPostCount() {
                var postCount = Number($allPostsLayer.find("#postCount").text().replace("+", ""));
                $allPostsLayer.find("#postCount").text((postCount + dat.POST_RECORD.length) + (dat.NEXT_YN === "Y" ? "+" : ""));
            }
        })
    }

    function searchAllPostsList() {
        SearchFilter.setSearchFilter($allPostsDetailSearchLayer, $allPostsSearchResult, searchMode.POST);
        closeAllPostsDetailSearchLayer();
        $allPostsSearchResult.css("display", "block");
        ListHelper.initPageData(allPostsSearchPageData, $allPostsSearchResult.find(".js-search-post-ul"));
        initCheckSerialNumber();
        SearchFilter.drawSearchCount($allPostsLayer.find(".js-search-post-count"), 0);
        SearchFilter.addEventOnSearchFilter($allPostsSearchResult, searchAllPostsListByFilter, false);
        drawSearchAllPostsList();
    }

    function searchAllPostsListByFilter() {
        initCheckSerialNumber();
        ListHelper.initPageData(allPostsSearchPageData);
        drawSearchAllPostsList();
    }

    function drawSearchAllPostsList(isScroll) {
        if (Often.null2Void(allPostsSearchPageData.NEXT_YN, "Y") === "N") return;
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_POSTS);
        Ajax.executeApi(RenewalApi.GET.ACT_SEARCH_POST_N_REMARK_LIST, $.extend({
            packetOption: Ajax.OPTION.PREVENT_CALLBACK,
            GUBUN: pageCode,
            COLABO_COMMT_SRNO: Often.null2Void(postSrno),
            COLABO_REMARK_SRNO: Often.null2Void(remarkSrno),
            SEARCH_RECORD: [$.extend({
                SRCH_WORD: searchWord,
                ORDER_TYPE: "A", //A-정확도순, N-최신순
            }, SearchFilter.getFilterJson($allPostsSearchResult, $allPostsDetailSearchLayer.is(":visible")))]
        }, allPostsSearchPageData), function (dat) {
            var isFirstPage = (allPostsSearchPageData.PG_NO === 1);
            isFirstPage && $allPostsDetailSearchBackButton.css("display", "block");
            !isScroll && SearchFilter.drawSearchCount($allPostsLayer.find(".js-search-post-count"), dat.CNT);
            postSrno = dat["COLABO_COMMT_SRNO"];
            remarkSrno = dat["COLABO_REMARK_SRNO"];
            $allPostsSearchResult.find(".js-search-post-ul").drawListHelper({
                pageData: allPostsSearchPageData,
                checkDttm: dat["CHECK_DTTM"],
                nextYn: dat["NEXT_YN"],
                records: dat["RESULT_RECORD"],
                noDataHtml: ListHelper.getNoDataHtml("SEARCH"),
                targetObj: {
                    focus: $allPostsSearchInput,
                },
                callback: {
                    click: clickAllPostsSearchItems,
                    item: function (arr) {
                        return getAllPostsSearchHtmByRecord(arr, searchWord);
                    },
                    scroll: function () {
                        drawSearchAllPostsList(true);
                    },
                }
            })
        })
    }

    function clickAllPostsSearchItems(e) {
        var $eTarget = $(e.target);
        var $allPostItem = $eTarget.findUp(".js-all-post-item");
        if ($allPostItem.length === 0) return;
        if (LimitGuest.isSearchLimitGuest("post", $allPostItem.attr("rgsn_dttm"))) return;
        var baseJson = Often.getAttrs($allPostItem)[0];
        PostPopup.togglePostView(baseJson.COLABO_SRNO, baseJson.COLABO_COMMT_SRNO, baseJson.COLABO_REMARK_SRNO, function () {
            $myPostContentUl.find(".highlight").removeClass("highlight");
            $allPostItem.addClass("highlight");
        });
    }

    function getAllPostsHtmByRecord(allPostsArray) {
        var returnHtml = "";
        var baseHtml = $("#allPostItem").html();
        $.each(allPostsArray, function (i, allPostsItem) {
            returnHtml += ListHelper.replaceJson(baseHtml,
                $.extend(allPostsItem, JsonMaker.getListComponentInfo(allPostsItem)));
        });
        return returnHtml;
    }

    function getAllPostsSearchHtmByRecord(allPostsArray, searchWord) {
        var returnHtml = "";
        var baseHtml = $("#allPostSearchItem").html();
        $.each(allPostsArray, function (i, allPostsItem) {
            returnHtml += ListHelper.replaceJson(baseHtml,
                $.extend(allPostsItem, JsonMaker.getListComponentInfo(allPostsItem, searchWord)));
        });
        return returnHtml;
    }

    function initCheckSerialNumber() {
        postSrno = "";
        remarkSrno = "";
    }
})();
