var SearchStore = (function () {

    return {
        init: init,
        initValueByAreaCode: initValueByAreaCode,
        saveByAreaCode: saveByAreaCode,
        removeByAreaCode: removeByAreaCode
    }

    function init(isSearchTong) {
        if (isSearchTong) {
            if (LocalUtil.getSubPath().indexOf("search") > -1) return;
            LocalUtil.removeLocal("IN_TONG_SEARCH_MEMORY");
            return;
        }
        LocalUtil.removeLocal("IN_PROJECT_SEARCH_MEMORY");
        LocalUtil.removeLocal("IN_TASK_SEARCH_MEMORY");
        LocalUtil.removeLocal("IN_FILE_SEARCH_MEMORY");
        LocalUtil.removeLocal("IN_POSTS_SEARCH_MEMORY");
    }

    function initValueByAreaCode(areaCode, key) {
        var searchMemoryJson = LocalUtil.getLocalJson(areaCode + "_SEARCH_MEMORY");
        if (searchMemoryJson && Object.keys(searchMemoryJson).length > 1) {
            LocalUtil.setLocalValue(areaCode + "_SEARCH_MEMORY", key, "");
        }
    }

    function saveByAreaCode(areaCode, returnFilterJson) {
        var searchWord = SearchFilter.getSearchWord(areaCode);
        switch (true) {
            case (areaCode === searchAreaCode.IN_TONG) :
            case (areaCode === searchAreaCode.IN_PROJECT) :
                isExistsWord(searchWord) && save(areaCode, returnFilterJson);
                break;
            case (areaCode === searchAreaCode.IN_TASK) :
            case (areaCode === searchAreaCode.IN_FILE) :
            case (areaCode === searchAreaCode.IN_POSTS) :
                (
                    isExistsWord(searchWord) ||
                    isExistsWord(returnFilterJson.RGSR_NM) ||
                    isExistsWord(returnFilterJson.RCVR_USER_NM) ||
                    isExistsWord(returnFilterJson.SEARCH_PROJECT_TITLE)
                ) && save(areaCode, returnFilterJson);
                break;
            default:
                break;
        }
    }

    function removeByAreaCode(areaCode) {
        LocalUtil.removeLocal(areaCode + "_SEARCH_MEMORY");
    }

    function save(areaCode, returnFilterJson) {
        LocalUtil.setLocalJson(areaCode + "_SEARCH_MEMORY", returnFilterJson);
    }

    function isExistsWord(word) {
        return ("" !== n2v(word));
    }
})()