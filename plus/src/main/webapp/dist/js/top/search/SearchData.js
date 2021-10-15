var SearchData = (function ($targetFilter, isScroll) {

    $targetFilter = $targetFilter || $();
    isScroll = isScroll || false;

    var SAC = searchAreaCode;
    var SM = searchMode;

    var isFilterVisible = $targetFilter.is(":visible");
    var areaCode = n2v($targetFilter.attr("data-search-area-code"), SAC.IN_TONG); //검색 영역 : 통검, 플젝, 북마크, 멘션, 내게시물, 업무, 파일 택 1
    var searchWord = getSearchWordByAreaCode(areaCode); //검색어
    var mode = getModeByAreaCode(areaCode); //검색 모드 : 포스트, 파일, 업무, 프로젝트, 전체 택 1
    var isFilterTargetJson = getIsFilterTargetJsonByMode(mode); //검색 필터 대상 : 플젝이름, 작성자, 담당자, 기간, 글종류, 파일종류
    var filterAction = getFilterAction(isScroll); //검색 필터 위치 : 팝업, 다이렉트, 스크롤, 우측

    return {
        getSearchWord: getSearchWord,
        getFilterJson: getFilterJson,
        getMode: getMode,
        getIsFilterTargetJson: getIsFilterTargetJson,
    }

    function getSearchWord(areaCode) {
        if (!areaCode) return searchWord;
        return getSearchWordByAreaCode(areaCode);
    }

    function getFilterJson(isSave) {
        var returnFilterJson = getExistFilterJson(searchWord);
        isSave && SearchStore.saveByAreaCode(areaCode, returnFilterJson)
        return returnFilterJson;
    }

    function getMode(areaCode) {
        if (!areaCode) return mode;
        return getModeByAreaCode(areaCode);
    }

    function getIsFilterTargetJson(mode){
        if (!areaCode) return isFilterTargetJson;
        return getIsFilterTargetJsonByMode(mode);
    }

    function getFilterAction(isScroll) {
        //'통합검색 우측필터 || 프로젝트,북마크,멘션,내게시물 우측 필터'에서 검색
        if ($targetFilter.is("#searchFilter") || $targetFilter.is(".js-post-search-result")) return "RIGHT";
        if (isScroll) return "SCROLL"; //스크롤
        if ("" !== searchWord && !isFilterVisible) return "DIRECT"; //바로 검색
    }

    function getModeByAreaCode(areaCode) {
        if (areaCode === SAC.IN_PROJECT || areaCode === SAC.IN_POSTS) return SM.POST;
        if (areaCode === SAC.IN_FILE) return SM.FILE;
        if (areaCode === SAC.IN_TASK) return SM.TASK;
        var $searchPopupLayer = $("#searchPopupLayer");
        if ($searchPopupLayer.is(":visible")) return Often.null2Void($searchPopupLayer.find(".js-add-section").attr("data-code"), SM.TOTAL);
        return Often.null2Void($("#searchTab").find(".js-tab-item.active").attr("data-code"), SM.TOTAL);
    }

    function getSearchWordByAreaCode(areaCode) {
        if (areaCode === SAC.IN_POSTS) return n2v($("#allPostsSearchInput").val());
        if (areaCode === SAC.IN_PROJECT) return n2v($("#projectSearchInput").val(), $("#detailLayer").find(".js-result-input-area").find("input").val());
        if (areaCode === SAC.IN_TASK) return n2v($(".js-task-search-input:visible").val());
        if (areaCode === SAC.IN_FILE) return n2v($(".js-file-search-input:visible").val());
        var searchPopupInputVal = $("#searchPopupInput").val();
        if (areaCode === SAC.IN_TONG) return n2v(searchPopupInputVal);
        return n2v(searchPopupInputVal, $("#searchWord").text());
    }

    function getExistFilterJson(searchWord) {
        if (filterAction === "DIRECT") return {};
        var returnJson = {MODE: mode, SEARCH_WORD: (areaCode === SAC.IN_TONG ? searchWord : "")};
        var isFilter = isFilterTargetJson;

        if (isFilter["project-name"]) returnJson.SEARCH_PROJECT_TITLE = getFilterVal($targetFilter, "project-name");
        if (isFilter["register-name"]) returnJson.RGSR_NM = getFilterVal($targetFilter, "register-name");
        if (isFilter["participant-name"]) returnJson.RCVR_USER_NM = getFilterVal($targetFilter, "participant-name");
        if (isFilter["tmpl-type"]) returnJson.TMPL_TYPE = getFilterCode($targetFilter, "tmpl-type");
        if (isFilter["file-type"]) returnJson.SEARCH_ETS = getFilterCode($targetFilter, "file-type");
        if (isFilter["period-type"]) $.extend(returnJson, getDateJson($targetFilter));
        if ("" === searchWord && isNotSearchData(returnJson)) return {};
        return returnJson;
    }

    function getDateJson($targetFilter) {
        var dateJson = {}

        if (filterAction === "RIGHT") {
            dateJson.PERIOD_TYPE = n2v($targetFilter.find(".js-search-pickr-layer:visible").attr("data-code"), "select");
        } else {
            dateJson.PERIOD_TYPE = n2v(getFilterObj($targetFilter, "period-type").attr("data-code"), defaultPeriod);
        }

        if (dateJson.PERIOD_TYPE === "select") {
            dateJson.START_DATE = dateTime2date($targetFilter.find(".js-start-flatpickr:visible").find("input").val());
            dateJson.END_DATE = dateTime2date($targetFilter.find(".js-end-flatpickr:visible").find("input").val());
        } else {
            dateJson.START_DATE = getStartTime(dateJson.PERIOD_TYPE);
            dateJson.END_DATE = getEndTime();
        }
        return dateJson;
    }

    function getIsFilterTargetJsonByMode(mode) {
        var isMyPost = ViewChanger.isPage("mypost");
        return {
            "project-name": (mode === searchMode.POST || mode === searchMode.FILE || mode === searchMode.TASK),
            "register-name": ((mode === searchMode.POST && !isMyPost) || mode === searchMode.FILE || mode === searchMode.TASK),
            "participant-name": (mode === searchMode.PROJECT || mode === searchMode.TASK),
            "period-type": (mode !== searchMode.PROJECT),
            "tmpl-type": (mode === searchMode.POST),
            "file-type": (mode === searchMode.FILE),
        };
    }

    function dateTime2date(dateTime) {
        if (!dateTime) return "";
        if (dateTime.length === 14) return dateTime.substring(0, 8);
        return dateTime
    }

    function getFilterObj($targetFilter, key) {
        //Note1. 비슷한 클래스가 많고 안 보이는 경우도 있어 보일때만 객체를 가져옴이 맞음
        //Note2. 보일때만 객체를 가져오게 되면 검색 결과 스크롤 페이징 시 못가져오는 이슈로 제거
        var allFilterCount = $targetFilter.find(".js-" + key + "-search-filter").length;
        var visibleFilterCount = $targetFilter.find(".js-" + key + "-search-filter:visible").length;

        //필터가 하나면 그대로 ex) 업무 검색
        if (allFilterCount === 1) return $targetFilter.find(".js-" + key + "-search-filter");

        //필터가 여러개이면 보이는것만 ex) 상세 검색에서 오른쪽 작성자 기입 후 검색 시도
        if (visibleFilterCount === 1) return $targetFilter.find(".js-" + key + "-search-filter:visible");

        //필터가 여러개 보이면 그중에 팝업에 해당하는것만 ex) 상세 검색 화면에서 팝업 옵션으로 검색 시도
        return $targetFilter.find("li.js-" + key + "-search-filter:visible");
    }

    function getFilterVal($targetFilter, key) {
        return n2v(getFilterObj($targetFilter, key).find("input").val());
    }

    function getFilterCode($targetFilter, key) {
        var dataCode = n2v(getFilterObj($targetFilter, key).find("[name=" + key + "]:checked").attr("data-code"));
        if ("tmpl-type" === key) return (dataCode === "0" ? "" : dataCode);
        if ("file-type" === key) return FileSearch.getTotalFileType(dataCode);
        return dataCode;
    }

    function isNotSearchData(searchData) {
        return "" === n2v(searchData.SEARCH_PROJECT_TITLE)
            && "" === n2v(searchData.RGSR_NM) && "" === n2v(searchData.RCVR_USER_NM)
            && ("" === n2v(searchData.START_DATE) || "" === n2v(searchData.END_DATE))
            && "" === n2v(searchData.TMPL_TYPE) && "" === n2v(searchData.SEARCH_ETS);
    }

})