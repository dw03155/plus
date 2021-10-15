var ProjectSearch = (function () {

    var projectSearchPageData = {
        CHECK_DTTM: '',
        PG_PER_CNT: 20,
        NEXT_YN: "Y",
    }

    var $projectDetailSearchLayer;
    var $detailLayer, $projectSearchOuterInput, $projectSearchResult, $projectSearchUl;
    var postSrno, remarkSrno;

    return {
        clickProjectDetailSearchTopButton: clickProjectDetailSearchTopButton,
        keydownProjectSearchInput: keydownProjectSearchInput,
        closeProjectDetailSearchLayer: closeProjectDetailSearchLayer,
        hideSearchProjectList: hideSearchProjectList,
    }

    function set$element() {
        $detailLayer = $("#detailLayer"); //프로젝트 홈 전체영역

        $projectSearchResult = $detailLayer.find(".js-post-search-result");
        $projectSearchOuterInput = $detailLayer.find("#projectSearchInput");
        $projectDetailSearchLayer = $detailLayer.find("#projectDetailSearchLayer");
        $projectSearchUl = $projectSearchResult.find(".js-search-post-ul");

        /**
         * <div id="detailLayer">
         *      <div class="js-post-search-result">
         *          <div>
         *             <input class="project-search-input"> 검색결과 검색인풋
         *          </div>
         *          <div>
         *              <ul class="js-search-post-ul"></ul> 검색결과 리스트
         *          </div>
         *      </div>
         *      <div id="detailTimeline">
         *          <input id="projectSearchInput"> 타임라인 검색인풋
         *          <div id="projectDetailSearchLayer"></div> 검색상세팝업
         *      </div>
         * </div>
         * */
        $projectSearchResult.attr({"data-search-area-code": "IN_PROJECT"});
    }

    function clickProjectDetailSearchTopButton(e) {
        e.preventDefault();
        set$element();
        if ($projectDetailSearchLayer.is(":visible")) {
            closeProjectDetailSearchLayer();
        } else {
            SearchFilter.initFilter($projectDetailSearchLayer, searchMode.POST, true);
            SearchFilter.addEventOnSearchFilter($projectDetailSearchLayer, searchProjectList, true);
            $projectDetailSearchLayer.prev().addClass("active");
            if ($projectSearchResult.is(":visible")) {
                $detailLayer.find("#detailTimeline").addClass("js-project-search")
            } else {
                $detailLayer.find("#detailTimeline").removeClass("js-project-search")
            }
            $projectDetailSearchLayer.fadeIn(200);
        }
    }

    function keydownProjectSearchInput(e) {
        if (KeyCheck.isKey(e, "ENTER")) searchProjectList();
        if (KeyCheck.isKey(e, "ESC")) closeProjectSearchResult();
    }

    function closeProjectDetailSearchLayer($eTarget) {
        if ($eTarget && ($eTarget.attr("id") === "projectSearchInput" || $eTarget.hasClass("project-search-input"))) return true;
        $detailLayer.find("#detailTimeline").removeClass("js-project-search");
        if ($eTarget && $eTarget.parents(".flatpickr-calendar").length > 0) return;
        var $flatpickrCalendar = $(".flatpickr-calendar");
        if ($flatpickrCalendar.is(":visible")) return $flatpickrCalendar.remove();
        set$element();
        $projectDetailSearchLayer.css("display", "none");
        $projectDetailSearchLayer.prev().removeClass("active");
    }

    function closeProjectSearchResult() {
        set$element();
        $projectSearchOuterInput.val("");
        $projectSearchResult.fadeOut(200);
    }

    function searchProjectList() {
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_PROJECT);
        if (SearchFilter.isUnSearchableAndToast("" !== searchWord)) return;
        initSettingOnResultArea();
        SearchFilter.setSearchFilter($projectDetailSearchLayer, $projectSearchResult, searchMode.POST);
        ListHelper.initPageData(projectSearchPageData, $projectSearchUl);
        initCheckSerialNumber();
        SearchFilter.drawSearchCount($projectSearchResult.find(".js-search-post-count"), 0);
        drawSearchProjectList();
        closeProjectDetailSearchLayer(); //Note. drawSearchProjectList 후행
        SearchFilter.addEventOnSearchFilter($projectSearchResult, searchProjectListByFilter, false);
    }

    function searchProjectListByFilter() {
        initCheckSerialNumber();
        ListHelper.initPageData(projectSearchPageData, $projectSearchUl);
        drawSearchProjectList();
    }

    /**
     * Note. 검색 결과 PAGING 처리시 CHECK_DTTM과 RGSN_DTTM이 동일한 잔여데이터를 가지고 오지 못하는 이슈가 생겨
     * postSrno와 remarkSrno를 함께 비교하여 처리
     */

    function drawSearchProjectList(isScroll) {
        if (Often.null2Void(projectSearchPageData.NEXT_YN, "Y") === "N") return;
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_PROJECT);
        if (SearchFilter.isUnSearchableAndToast("" !== searchWord)) return;
        var filterJson = SearchFilter.getFilterJson($projectSearchResult, $projectDetailSearchLayer.is(":visible"));

        console.log("filterJson", filterJson)

        var isRightSearch = $.trim(Often.null2Void(filterJson.RGSR_NM)) !== "" ||
            $.trim(Often.null2Void(filterJson.SEARCH_PROJECT_TITLE)) !== "" ||
            $.trim(Often.null2Void(filterJson.RCVR_USER_NM)) !== "";

        Ajax.executeApi(RenewalApi.GET.ACT_SEARCH_POST_N_REMARK_LIST, $.extend({
            packetOption: Ajax.OPTION.PREVENT_CALLBACK,
            COLABO_SRNO: Detail.getProjectSrno(),
            GUBUN: "DETAIL",
            COLABO_COMMT_SRNO: Often.null2Void(postSrno),
            COLABO_REMARK_SRNO: Often.null2Void(remarkSrno),
            SEARCH_RECORD: [$.extend({
                SRCH_WORD: searchWord,
                ORDER_TYPE: "A", //A-정확도순, N-최신순
            }, filterJson)]
        }, projectSearchPageData), function (dat) {
            var isFirstPage = projectSearchPageData.PG_NO === 1;
            isFirstPage && $projectSearchResult.find(".js-search-back-button.js-detail-back").css("display", "block");
            !isScroll && SearchFilter.drawSearchCount($projectSearchResult.find(".js-search-post-count"), dat.CNT);
            postSrno = dat["COLABO_COMMT_SRNO"];
            remarkSrno = dat["COLABO_REMARK_SRNO"];
            $projectSearchUl.drawListHelper({
                pageData: projectSearchPageData,
                checkDttm: dat["CHECK_DTTM"],
                nextYn: dat["NEXT_YN"],
                records: dat["RESULT_RECORD"],
                noDataHtml: ListHelper.getNoDataHtml("PROJECT_SEARCH"),
                targetObj: {
                    focus: isRightSearch ? null : $projectSearchOuterInput,
                },
                callback: {
                    click: clickProjectSearchItems,
                    item: function (arr) {
                        return getProjectSearchHtmByRecord(arr, searchWord);
                    },
                    scroll: function () {
                        drawSearchProjectList(true);
                    },
                }
            })
        })
    }

    function clickProjectSearchItems(e) {
        var $eTarget = $(e.target);
        var $allPostItem = $eTarget.findUp(".js-all-post-item");
        if ($allPostItem.length === 0) return;
        if (LimitGuest.isSearchLimitGuest("post", $allPostItem.attr("rgsn_dttm"))) return;
        var baseJson = Often.getAttrs($allPostItem)[0];
        PostPopup.togglePostView(baseJson.COLABO_SRNO, baseJson.COLABO_COMMT_SRNO, "", function () {
            $projectSearchUl.find(".highlight").removeClass("highlight");
            $allPostItem.addClass("highlight");
        });
    }

    function getProjectSearchHtmByRecord(postArray, searchWord) {
        var returnHtml = "";
        var baseHtml = $("#allPostSearchItem").html();
        $.each(postArray, function (i, allPostsItem) {
            returnHtml += ListHelper.replaceJson(baseHtml, $.extend(allPostsItem, JsonMaker.getListComponentInfo(allPostsItem, searchWord)));
        });
        return returnHtml;
    }

    function hideSearchProjectList() {
        set$element();
        closeProjectDetailSearchLayer();
        SearchFilter.initFilter($projectSearchResult, searchMode.POST);
        SearchFilter.initFilter($projectDetailSearchLayer, searchMode.POST);
        $projectSearchOuterInput.val("");
        $projectSearchResult.css("display", "none");
    }

    function initSettingOnResultArea() {
        $projectSearchResult.css({display: "block", top: "120px"});
        $projectSearchOuterInput.val(SearchFilter.getSearchWord(searchAreaCode.IN_PROJECT));
        $projectSearchOuterInput.off("keyup").on("keyup", keydownProjectSearchInput);
        $detailLayer.find(".js-detail-search-filter-button").off("click").on("click", clickProjectDetailSearchTopButton);
    }

    function initCheckSerialNumber() {
        postSrno = "";
        remarkSrno = "";
    }
})();