var FileSearch = (function () {

    var $fileDetailSearchLayer;

    return {
        initSetting: initSetting,
        showDetailSearchLayer: showDetailSearchLayer,
        closeDetailSearchLayer: closeDetailSearchLayer,
        keydownSearchInput: keydownSearchInput,
        getFileFilterJson: getFileFilterJson,
        getTotalFileType: getTotalFileType,
    }

    function showDetailSearchLayer($FileDetailSearchButton) {
        $fileDetailSearchLayer = $FileDetailSearchButton.next();
        if ($fileDetailSearchLayer.is(":visible")) {
            closeDetailSearchLayer();
        } else {
            SearchFilter.initFilter($fileDetailSearchLayer, searchMode.FILE, true);
            SearchFilter.addEventOnSearchFilter($fileDetailSearchLayer, searchFileList, true);
            $FileDetailSearchButton.addClass("active");
            $fileDetailSearchLayer.fadeIn(200);
        }
    }

    function searchFileList() {
        closeDetailSearchLayer();
        AllFile.searchFileList();
    }

    function keydownSearchInput(e) {
        if (KeyCheck.isKey(e, "ENTER")) searchFileList();
        if (KeyCheck.isKey(e, "ESC")) closeDetailSearchLayer();
    }

    function closeDetailSearchLayer($eTarget) {
        if ($eTarget && ($eTarget.hasClass("js-file-search-input") || $eTarget.parents(".flatpickr-calendar").length > 0)) return;
        $fileDetailSearchLayer && $fileDetailSearchLayer.fadeOut(200);
        $fileDetailSearchLayer && $fileDetailSearchLayer.prev().removeClass("active");
    }

    function initSetting($allTaskLayer) {
        $fileDetailSearchLayer = $allTaskLayer.find(".js-file-detail-search-layer");
        SearchFilter.initFilter($fileDetailSearchLayer, searchMode.FILE);
        $allTaskLayer.find(".js-file-search-input").val("");
    }

    function getFileFilterJson($allFileLayer, isFolder, isScroll) {

        var $fileDetailSearch = $allFileLayer.find(".js-file-detail-search-layer");
        var filterJson = SearchFilter.getFilterJson($fileDetailSearch, true, isScroll);
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_FILE);

        var srchRec = [];
        var finalJson = {};

        if ("" !== searchWord) {
            srchRec.push({SRCH_GB: "ITEM_NM", SRCH_WORD: searchWord});
            if (isFolder) {
                finalJson.MODE = "SRCH_ALL";
            }
        }

        if (isFolder) {
            finalJson.SRCH_REC = srchRec;
            return finalJson;
        }

        if ("" !== Often.null2Void(filterJson.START_DATE)) {
            finalJson.START_DT = filterJson.START_DATE;
        }

        if ("" !== Often.null2Void(filterJson.END_DATE)) {
            finalJson.FNSH_DT = filterJson.END_DATE;
        }

        if ("" !== Often.null2Void(filterJson.SEARCH_PROJECT_TITLE)) {
            srchRec.push({SRCH_GB: "PROJ_NM", SRCH_WORD: filterJson.SEARCH_PROJECT_TITLE});
        }

        if ("" !== Often.null2Void(filterJson.RGSR_NM)) {
            srchRec.push({SRCH_GB: "RGSR_NM", SRCH_WORD: filterJson.RGSR_NM});
        }

        var $fileTypeFilter = $("#fileTypeFilter");
        if ("" !== Often.null2Void(filterJson.SEARCH_ETS)) {
            finalJson.SEARCH_ETS = getTotalFileType(filterJson.SEARCH_ETS);
            FileFilter.setFileFilter($fileTypeFilter.find(".js-search-type[file-type=" + filterJson.SEARCH_ETS + "]"));
        } else {
            //pass
        }

        finalJson.SRCH_REC = srchRec;

        return finalJson;
    }

    function getTotalFileType(fileType) {
        return (fileType === "TOTAL" || fileType === "0" ? "" : fileType)
    }


})();