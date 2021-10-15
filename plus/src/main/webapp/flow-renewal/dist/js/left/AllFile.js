var AllFile = (function () {

    var isProjectFiles;
    var viewTypeClass, fileLayerTypeId;
    var $fileLayer, $fileTypeFilter, $fileLayerUl, $fileLayerProjectMenu, $fileItemArea, $fileItemUlHead;

    var fileProjectSrno;
    var lastFileFolderSrno, folderDepth;
    var fileMode;
    var isNewFileRecord;
    var isSearch;

    var filePageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
    }

    var folderPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
    }

    return {
        openLayer: openLayer,

        //FileMenu.js
        cudFolder: cudFolder,
        isProjectFile: isProjectFile,
        checkedFolder: checkedFolder,
        getCheckedFileJson: getCheckedFileJson,
        getCheckedDownloadFileJson: getCheckedDownloadFileJson,

        //MoveFile.js
        checkEmptyFileLayerUl: checkEmptyFileLayerUl,
        getFileProjectData: getFileProjectData,

        //FileSearch.js
        searchFileList: searchFileList,

        //FileFilter.js
        drawInitList: drawInitList,
        getFileMode: getFileMode,
        drawListByFilter: drawListByFilter,

        //AllFileEvent.js
        setLastFileFolderSrno: setLastFileFolderSrno,
        getLastFileFolderSrno: getLastFileFolderSrno,
        getFileProjectSrno: getFileProjectSrno,
        setIsNewFileRecord: setIsNewFileRecord,
        getFolderDepth: getFolderDepth,
        setViewTypeClass: setViewTypeClass,
        getViewTypeClass: getViewTypeClass,

    }

    function set$element() {
        $fileLayer = $("#" + (isProjectFiles ? "detail" : "all") + "CollectView .allFileLayer");
        $fileTypeFilter = $fileLayer.find("#fileTypeFilter");
        $fileItemArea = $fileLayer.find("#fileItemArea");
        $fileLayerUl = $fileLayer.find("#fileLayerUl");
        $fileLayerProjectMenu = $fileLayer.find("#fileLayerProjectMenu");
        $fileItemUlHead = $fileLayer.find("#fileItemUlHead");
        /**
         * <div class="allFileLayer">
         *     <div class="js-file-filter-area">
         *         <ul id="allFileFilterItems">
         *              <li id="fileTypeFilter"></li> 파일확장자필터
         *         </ul>
         *     <div>
         *     <div id="fileItemArea">
         *         <ul id="fileItemUlHead"></ul> 정렬 바
         *         <ul id="fileLayerUl"></ul> 폴더 & 파일 목록
         *     </div>
         *     <div id="fileLayerProjectMenu"></div> 프로젝트네비게이션
         * </div>
         */
    }

    function openLayer(projectSrno) {
        fileProjectSrno = projectSrno;
        initSetting();
        initFileFolderNavigation();
        $('body').attr('oncontextmenu', 'return false');
        drawInitList(false);
    }

    function initSetting() {
        isProjectFiles = ("" !== Often.null2Void(fileProjectSrno));
        isProjectFiles && DetailHeader.drawInitProjectHeader("file", fileProjectSrno);
        lastFileFolderSrno = "-1";
        isNewFileRecord = true;
        set$element();
        $fileLayer.find("#addFolder")
            .text('+ ' + i18next.t('front.common.add', {val: '$t(dictionary.folder)'}))
            .css("display", isProjectFiles ? "inline-block" : "none");
        $fileLayerProjectMenu.css("display", isProjectFiles ? "inline-block" : "none");
        $fileLayer.find('.all-file-file-name').css('margin-bottom', isProjectFiles ? "0px" : "-34px");
        $fileLayer.find('.all-file-project-title').css('display', isProjectFiles ? "none" : "block");

        setViewType();
        setFileMode();

        FileSearch.initSetting($fileLayer);
        FileFilter.initFileFilter($("#leftArea"));
        AllFileEvent.initSetting();
    }

    /**
     * drawList["mode"]
     * 1. UP_DIRECTORY : 헤더 폴더 그리기
     * 2. DOWN_ONE_DEPTH : 폴더 및 파일 그리기
     * */
    function drawList(mode) {
        isSearch = true;
        if (isProjectFiles && FileFilter.isTotalFilter($fileTypeFilter)) {
            return drawFolderAndFile(Often.null2Void(mode, "DOWN_ONE_DEPTH"));
        }
        drawFileList();
    }

    function drawInitList(isLoadDirectory) {
        initPageJson();
        isLoadDirectory && drawList("UP_DIRECTORY");
        drawList("DOWN_ONE_DEPTH");
    }

    function drawListByFilter() {
        initPageJson();
        if (isProjectFiles && FileFilter.isTotalFilter($fileTypeFilter)) {
            var apiJson = $.extend({}, folderPageData, getModeJson("DOWN_ONE_DEPTH"), FileSearch.getFileFilterJson($fileLayer, true),getFilterSortJson());
            Ajax.executeApi(RestApi.GET.COLABO2_FILE_FLD_R001, apiJson, function (folderData) {
                drawFileList(folderData.FLD_REC);
            });
            return;
        }
        drawFileList();
    }

    function drawFolderAndFile(mode) {
        var apiJson = $.extend({}, folderPageData, getModeJson(mode), FileSearch.getFileFilterJson($fileLayer, true),getFilterSortJson());
        Ajax.executeApi(RestApi.GET.COLABO2_FILE_FLD_R001, apiJson, function (folderData) {
            if (mode === "UP_DIRECTORY") return getHeaderFolderList(folderData.FLD_REC);
            drawFileList(folderData.FLD_REC);
        });
    }

    function drawFileList(folderArray) {
        folderArray = Array.isArray(folderArray) ? folderArray : [];
        if (filePageData.NEXT_YN === 'N') return;
        isNewFileRecord = true;
        //fileSearchFilterJson : 상세검색필터에서 확장자를 선택했다면 json 가져옴과 동시에 상단필터에 체크되고
        //filterSortJson : 상단필터 기준으로 확장자 필터가 걸려 작동한다.
        var fileSearchFilterJson = FileSearch.getFileFilterJson($fileLayer, false, filePageData.PG_NO > 1);
        var filterSortJson = getFilterSortJson();
        var apiJson = $.extend({}, filePageData, getModeJson(), fileSearchFilterJson, filterSortJson);

        Ajax.executeApi(RenewalApi.GET.ACT_FILE_LIST, apiJson, function (fileData) {

            if (filePageData.PG_NO === 1) {
                FileDragAndDrop.addFileDragAndDrop($fileLayerUl, isProjectFiles);
            }

            $fileLayerUl.drawListHelper({
                pageData: filePageData,
                noDataHtml: ListHelper.getNoDataHtml(isSearch ? "SEARCH" : "FILE"),
                nextYn: fileData["NEXT_YN"],
                records: [{
                    FOLDER: folderArray,
                    FILE: fileData && fileData.ATCH_REC,
                }],
                callback: {
                    item: getFolderAndFileItem,
                    scroll: drawFileList, //스크롤시에는 폴더목록이 필요없음
                    click: AllFileEvent.clickFile,
                    dblclick: AllFileEvent.doubleClick,
                }
            })
        });
    }

    function getFolderAndFileItem(drawJsonRecord) {
        if (!drawJsonRecord || drawJsonRecord.length === 0) return;
        var folderAndFileHtml = "";
        var drawJsonArray = drawJsonRecord[0];
        var folderData = drawJsonArray.FOLDER;
        var fileData = drawJsonArray.FILE;
        folderAndFileHtml += getFolderItem(folderData);
        folderAndFileHtml += getFileItem(fileData);
        return folderAndFileHtml;
    }

    function getFolderItem(folderData) {
        if (!folderData || folderData.length === 0) return "";
        var returnHtml = "";
        var folderBaseHtml = $("#" + (viewTypeClass === "board" ? "boardTypeFolderItem" : "listTypeFolderItem")).html();
        $.each(folderData, function (i, folder) {
            returnHtml += ListHelper.replaceJson(folderBaseHtml, {
                "view-type-class-name": ("all-file-folder-type-" + (viewTypeClass === "board" ? "1" : "2")),
                "colabo-srno": fileProjectSrno,
                "file-fld-srno": folder.FILE_FLD_SRNO,
                "up-file-fld-srno": Often.null2Void(folder.UP_FILE_FLD_SRNO, "-1"),
                "file-name": Often.null2Void(folder.FILE_FLD_NM),
                "file-size": "-",
                "rgsr-nm": folder.RGSR_NM,
                "rgsn-dttm": Tz.momentTimeZone(Often.null2Void(folder.EDTR_DTTM, folder.RGSN_DTTM), "type1"),
            });
        })
        return returnHtml;
    }

    function getFileItem(fileData) {
        if (!fileData || fileData.length === 0) return "";
        var returnHtml = "";
        var fileBaseHtml = $fileLayer.find("#" + fileLayerTypeId).html();
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_FILE);
        $.each(fileData, function (i, file) {
            var thumbUrl = Often.null2Void(file.THUM_IMG_PATH, "");
            var cssClassName = "all-file-extension-";
            var isNoThumbnail = (file.FILE_SIZE > 524288 && file.RAND_KEY.indexOf("FLOW_") === -1);
            returnHtml += ListHelper.replaceJson(fileBaseHtml, $.extend({}, file, {
                "view_type_class_name": getFileTypeCheck(file, cssClassName, isNoThumbnail),
                "file_fld_srno": Often.null2Void(file.FILE_FLD_SRNO, "-1"),
                "thumbnail_url": (ImageUtil.isImageType(file) && !isNoThumbnail) ? ListHelper.setThumbnailImage(thumbUrl) : "",
                "data_file_size": file.FILE_SIZE,
                "file_size": FileUtil.getFileSize(file.FILE_SIZE),
                "date": Tz.momentTimeZone(file.RGSN_DTTM, "type1"),
                "file_index_code": getRecordIndex(i, filePageData),
                "mouseover-text": FileUtil.getFileName(file),
                "DATA_ORCP_FILE_NM": FileUtil.getFileName(file),
                "ORCP_FILE_NM": TagUtil.text2highlight("SEARCH2", TagUtil.tag2html(file.ORCP_FILE_NM), searchWord),
                "IMG_PATH": file.ATCH_URL,
                "PROJECT_TITLE": Often.null2Void(file.TTL, "EMPTY POST NAME"),
                "download_yn": (file.RAND_KEY !== "GOOGLEDRIVE" && file.RAND_KEY !== "DROPBOX") ? "no-external" : "external"
            }));
        });
        return returnHtml;
    }

    function searchFileList() {
        ListHelper.initPageData(folderPageData);
        ListHelper.initPageData(filePageData);
        drawList("DOWN_ONE_DEPTH");
    }

    function setViewType() {
        viewTypeClass = LocalUtil.getFileSetting()
        fileLayerTypeId = (viewTypeClass === "board" ? "boardTypeFileItem" : "listTypeFileItem");
    }

    function initPageJson() {
        ListHelper.initPageData(folderPageData, $fileLayerUl);
        ListHelper.initPageData(filePageData, $fileLayerUl);
        isSearch = false;
    }

    function checkEmptyFileLayerUl($ul) {
        if ($ul.find(".js-file-" + viewTypeClass).length === 0) {
            $ul.prepend(ListHelper.getNoDataHtml("FILE"));
            return;
        }
        var isExistsNodataObj = $ul.find(".js-project-null").is(":visible");
        isExistsNodataObj && $ul.find(".js-project-null").remove();
    }

    function getRecordIndex(index, fileJson) {
        if (isNewFileRecord) return Number(index) + ((Number(fileJson.PG_NO) - 1) * Number(fileJson.PG_PER_CNT));
        return index;
    }

    function getHeaderFolderList(folderDataList) {
        initFileFolderNavigation(fileProjectSrno);
        folderDepth = folderDataList.length;
        var tempHtml = $fileLayer.find("#headerFolderItem").html();
        var tempHeaderHtml = "";
        var tempMoreListHtml = "";
        var tempMoreLiHtml = "";
        if (folderDepth > 1) {
            tempHeaderHtml += $fileLayer.find("#headerMoreItem").html();
            tempMoreLiHtml = $fileLayer.find("#headerMorePopupLiItme").html();
        }

        $.each(folderDataList, function (i, folder) {
            var folderJson = {
                "folder-depth-class": i + 2,
                "folder-depth": folder.DEPTH,
                "colabo-srno": fileProjectSrno,
                "file-fld-srno": folder.FILE_FLD_SRNO,
                "folder-name": TagUtil.tag2html(folder.FILE_FLD_NM),
            }
            var isLastFolder = (folderDepth - 1) === i;
            if (!isLastFolder && folderDepth > 1) {
                tempMoreListHtml += ListHelper.replaceJson(tempMoreLiHtml, folderJson);
            } else {
                tempHeaderHtml += ListHelper.replaceJson(tempHtml, folderJson);
            }
        })
        var $headerMoreLayer = $(tempHeaderHtml.replace("{more-folder-list}", tempMoreListHtml));
        $headerMoreLayer.find("#moreFolderLayer").css("top", -(35 * folderDepth))
        return $fileLayerProjectMenu.append($headerMoreLayer);
    }

    function initFileFolderNavigation() {
        var projectHtml = $("#fileLayerTitleItem").html();
        $fileLayerProjectMenu.empty();
        $fileLayerProjectMenu.append(ListHelper.replaceJson(projectHtml, {
            "project-title": (isProjectFiles ? TagUtil.tag2html($("#projectTitle").text()) : '<fmt:message key="dictionary.all"/>'),
            "project-color": $("#projectColor").attr("class"),
            "project-color-display": ListHelper.setDisplay(isProjectFiles, "inline-block"),
            "project-srno": ViewChanger.getProjectSrno(),
            "file-fld-srno": "-1",
        }));
    }

    function checkedFolder() {
        var returnArray = []
        var folders = $fileLayer.find(".js-folder.on")
        $.each(folders, function (i, folder) {
            returnArray.push({FILE_FLD_SRNO: $(folder).attr("file-fld-srno")});
        });
        return returnArray;
    }

    function getCheckedFileJson($file) {
        var isEmptyFile = Often.null2Void($file, "") === "";
        var $fileArray = isEmptyFile ? $fileLayer.find(".js-file-" + viewTypeClass + ".on") : $file;
        return Often.getAttrs($fileArray);
    }

    function getCheckedDownloadFileJson() {
        var $fileArray = $fileLayer.find(".js-file-" + viewTypeClass + ".on.no-external");
        return Often.getAttrs($fileArray);
    }

    function cudFolder(mode, folderData, callback) {
        var isCreate = (mode === "C");
        var isDelete = (mode === "D");
        var apiKey = isCreate ? RestApi.POST.COLABO2_FILE_FLD_C001 :
            isDelete ? RestApi.DELETE.COLABO2_FILE_FLD_D001 :
                RestApi.PUT.COLABO2_FILE_FLD_U001;
        folderData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(apiKey, folderData, function (data) {
            if (isCreate) {
                var folderArray = [$.extend({}, folderData, {
                    FILE_FLD_SRNO: data.FILE_FLD_SRNO,
                    RGSR_NM: _USER_NM,
                    RGSN_DTTM: data.RGSN_DTTM
                })];
                $fileLayerUl.prepend(getFolderItem(folderArray));
            } else if (isDelete) {
                drawInitList(false);
            }
            checkEmptyFileLayerUl($fileLayerUl);
            (typeof callback === "function") && callback();
        });
    }

    function getFileTypeCheck(file, className, isNoThumbnail) {
        if (!isNoThumbnail && viewTypeClass === "board" && file.THUM_IMG_PATH) return className + "thumbnail";
        var isLockType = ('Y' === Often.null2Void(file.DRM_YN, 'N')/* || Often.isFunc(Func.CLOUD.DOWNLOAD_PREVENT)*/);
        var fileName = FileUtil.getFileName(file);
        return className + (isLockType ? "lock-" : "") + FileUtil.getIconClassNameByFullName(Often.null2Void(file.RAND_KEY, file.FILE_TYPE), fileName);
    }

    function getFolderDepth() {
        return folderDepth;
    }

    function setIsNewFileRecord(booleanVal) {
        isNewFileRecord = booleanVal;
    }

    function getFileProjectSrno() {
        return fileProjectSrno
    }

    function setLastFileFolderSrno(srno) {
        lastFileFolderSrno = srno;
    }

    function getLastFileFolderSrno() {
        return Often.null2Void(lastFileFolderSrno, "-1");
    }

    function isProjectFile() {
        return isProjectFiles;
    }

    function getFileProjectData() {
        return {COLABO_SRNO: fileProjectSrno, FILE_FLD_SRNO: lastFileFolderSrno}
    }

    function getFileMode() {
        return fileMode;
    }

    function setFileMode() {
        fileMode = {SEARCH_ETS: "", SRCH_REC: []}
    }

    function getSortData() {
        var $sortButton = $fileItemArea.find(".js-sort-file.check:visible");
        var sortCode = $sortButton.attr("data-sort-code");
        var sortDesc = $sortButton.hasClass("on") ? "1" : "0";
        return sortCode + "," + sortDesc;
    }

    function getFilterSortJson() {
        var returnJson = {SORT_DESC: getSortData()};
        var checkedFileType = FileFilter.getFileTypeOnFilter($fileTypeFilter);
        returnJson.SEARCH_ETS = FileSearch.getTotalFileType(Often.null2Void(checkedFileType, "TOTAL"));
        return returnJson
    }

    function getModeJson(mode) {
        return {
            MODE: Often.null2Void(mode, "DOWN_ONE_DEPTH"),
            COLABO_SRNO: fileProjectSrno,
            FILE_FLD_SRNO: Often.null2Void(lastFileFolderSrno, "-1"),
        }
    }

    function setViewTypeClass(typeName) {
        viewTypeClass = typeName;
        fileLayerTypeId = viewTypeClass + "TypeFileItem";
    }

    function getViewTypeClass() {
        return viewTypeClass;
    }

})();
