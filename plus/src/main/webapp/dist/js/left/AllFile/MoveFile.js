var MoveFilePopup = (function () {

    var $mainBodyWrap, $fileLayer, $movePopup, $checkedLi, $targetFile;
    var checkedJson, sameCheckArray;
    var projectData;
    var isUpdating = false;

    return {
        openMovePopup: openMovePopup,
        moveFile: moveFile,
    }

    /**
     * Note. moveFile
     *
     * mode
     * 1. DRAG
     * 2. POPUP
     *
     * $allFilelayer ( 필수값 )
     * 1. 전체 파일 모아보기
     * 2. 프로젝트 파일 모아보기
     *
     * $fileLi ( 선택값 )
     * 1. $(.js-file-board) | $(.js-file-list)
     */

    function moveFile(mode, $allFilelayer, $fileLi) {
        initMoveFileSetting($allFilelayer, $fileLi);
        if (mode === "DRAG") dragMoveFile();
        else if (mode === "POPUP") openMovePopup();
    }

    function initMoveFileSetting($allFilelayer, $fileLi) {
        $mainBodyWrap = $("#mainBodyWrap");
        $fileLayer = $allFilelayer;
        $targetFile = $fileLi;
        $checkedLi = [];
        sameCheckArray = [];
        projectData = AllFile.getFileProjectData();

    }

    function dragMoveFile() {
        checkedJson = checkedFolderOrFiles();
        if (isSameRelationFolder($targetFile)) return;
        updateMoveFolderAndFile($targetFile);
    }

    function openMovePopup() {
        checkedJson = checkedFolderOrFiles($targetFile);
        drawMovePopup();
    }

    function removeMovePopup() {
        $mainBodyWrap.find("#moveFilePopup").remove();
    }

    function drawMovePopup() {
        var projectTitle = $("#projectTitle").text();
        var projectColor = $("#projectColor").attr("class");
        var movePopupHtml = $fileLayer.find("#fileMovePopupItem").html();
        var tempMovePopup = ListHelper.replaceJson(movePopupHtml, {
            "colabo-srno": projectData.COLABO_SRNO,
            "project-color": projectColor,
            "project-title": TagUtil.tag2html(projectTitle),
        })
        $movePopup = $(tempMovePopup).attr("id", "moveFilePopup");
        $mainBodyWrap.append($movePopup);
        getMoveFolderList("DOWN_ONE_DEPTH", projectData);
    }

    function getMoveFolderList(mode, folderJson) {

        var movePopupJson = {
            PG_NO: 1,
            PG_PER_CNT: 30,
            NEXT_YN: "Y",
        }

        Ajax.executeApi(RestApi.GET.COLABO2_FILE_FLD_R001, $.extend({}, movePopupJson, {
            MODE: mode,
            COLABO_SRNO: folderJson.COLABO_SRNO,
            FILE_FLD_SRNO: "-1",
        }), function (folderData) {
            $movePopup.find("#moveFilePopupUl").drawListHelper({
                pageData: movePopupJson,
                nextYn: folderData["NEXT_YN"],
                records: folderData["FLD_REC"],
                notEmpty: true,
                callback: {
                    item: getFileMoveList,
                    click: clickMovePopup,
                    final: function () {
                        addMovePopupEvent();
                        disabledFolder();
                    }
                }
            })
        })
    }

    function addMovePopupEvent() {
        $mainBodyWrap.find("#moveFilePopup").off("click").on("click", function (e) {
            var $eTarget = $(e.target);
            var $movePopupLayer = $eTarget.findUp(".js-file-move-popup");
            var $closeButton = $eTarget.findUp(".js-class-button");
            if ($movePopupLayer.length === 0 || $closeButton.length > 0) removeMovePopup();

            var $successButton = $eTarget.findUp(".js-move-file-success");
            if ($successButton.length > 0) {
                var selectFolder = $(this).find(".js-move-file-li.active");
                updateMoveFolderAndFile(selectFolder);
            }
        })
    }

    function disabledFolder() { // 현재 폴더 위치
        var $currentFolder = $(".js-move-file-li[file-fld-srno=" + projectData.FILE_FLD_SRNO + "]:visible");
        $currentFolder.addClass("current disabled");
    }

    function updateMoveFolderAndFile(folderToMove) {
        if (Often.null2Void(folderToMove).length === 0) return Often.toast("error", "이동할 폴더를 선택해주세요.")
        isUpdating = true;
        Ajax.executeApi(RestApi.PUT.COLABO2_FILE_FLD_U002, $.extend({}, checkedJson, {
            COLABO_SRNO: folderToMove.attr("colabo-srno"),
            UP_FILE_FLD_SRNO: folderToMove.attr("file-fld-srno"),
            UP_FILE_FLD_SRNO_PARENT: folderToMove.attr("up-file-fld-srno"),
        }), function () {
            $.each($checkedLi, function (i, $li) {
                $($li).remove();
            })
            $checkedLi = [];
            removeMovePopup();
            $(".js-file-count-layer:visible").remove();
            AllFile.checkEmptyFileLayerUl($fileLayer.find("#fileLayerUl"));
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.update)'}))
            isUpdating = false;
        })
    }

    function clickMovePopup(e) {

        var $eTarget = $(e.target);
        var $movePopupUl = $eTarget.findUp("#moveFilePopupUl");
        var $folderButton = $eTarget.findUp(".js-move-file-li:first");
        if ($folderButton.length === 0) return;

        $folderButton.toggleClass("on");
        var isEmptyDownFolder = $folderButton.find(".js-move-file-li").length === 0;
        var isOnFolderButton = $folderButton.hasClass("on");

        $folderButton.find("ul:first").css("display", isOnFolderButton ? "block" : "none");
        isEmptyDownFolder && drawDownDepthFolder($folderButton, {
            MODE: "DOWN_ONE_DEPTH",
            COLABO_SRNO: $folderButton.attr("colabo-srno"),
            FILE_FLD_SRNO: $folderButton.attr("file-fld-srno"),
        })

        if (isSameRelationFolder($folderButton)) return;
        if (isUpdating) return Often.toast("info", "잠시만 기다려주세요!");
        $movePopupUl.find(".js-move-file-li").removeClass("active");
        $folderButton.addClass("active");
        return;
    }


    function isSameRelationFolder($folderButton) {
        var isSameRelation = false;
        var errorMessage = "";
        var isLimitDepth = AllFile.getFolderDepth() === 5;
        var isImpossible = $folderButton.attr("data-depth") === "5";
        var $parentsFolder = $folderButton.parents(".js-move-file-li:first").length > 0 ? $folderButton.parents(".js-move-file-li:first") : $folderButton;
        $.each($checkedLi, function (i, $li) {
            var folderSrno = $($li).attr("file-fld-srno");
            var upFolderSrno = $($li).attr("up-file-fld-srno");
            var ownFolderSrno = $folderButton.attr("file-fld-srno");

            if ((isImpossible || isLimitDepth) && $li.hasClass("js-folder")) {
                isSameRelation = true;
                errorMessage = "폴더 구조는 최대 5 Depth까지만 가능합니다.";
                return false;
            }

            if (ownFolderSrno === upFolderSrno) {
                isSameRelation = true;
                errorMessage = "현재 위치 입니다.";
                return false;
            }

            if (projectData.FILE_FLD_SRNO === ownFolderSrno || folderSrno === ownFolderSrno) {
                isSameRelation = true;
                errorMessage = "동일 폴더로 이동할 수 없습니다.";
                return false;
            }
            

            if ($movePopup && $movePopup.is(":visible")) {
                var $selectFolder = $movePopup.find(".js-move-file-li[file-fld-srno=" + folderSrno + "]");
                var $childFolder = $selectFolder.find(".js-move-file-li[file-fld-srno=" + ownFolderSrno + "]");

                if ($childFolder.length > 0) {
                    isSameRelation = true;
                    errorMessage = "하위 폴더로 이동할 수 없습니다.";
                    return false;
                }
            }

        })
        if (isSameRelation) Often.toast("error", errorMessage);
        return isSameRelation;
    }

    function drawDownDepthFolder($folderButton, folderJson) {

        var movePopupJson = {
            PG_NO: 1,
            PG_PER_CNT: 30,
            NEXT_YN: "Y",
        }
        Ajax.executeApi(RestApi.GET.COLABO2_FILE_FLD_R001, $.extend({}, movePopupJson, folderJson),
            function (folderData) {
                var parentDepth = Number($folderButton.attr("data-depth")) + 1;
                $folderButton.find("ul").append(getFileMoveList(folderData["FLD_REC"], parentDepth));
                disabledFolder();
            })
    }

    function getFileMoveList(folderData, folderDepth) {
        var returnHtml = "";
        var movePopupLiHtml = $fileLayer.find("#fileMovePopupLiItem").html();
        $.each(folderData, function (i, folder) {
            var isCurrentFolder = projectData.FILE_FLD_SRNO === folder.FILE_FLD_SRNO; // 현재 위치
            var isDisabledFolder = $(".js-folder.on[file-fld-srno="+folder.FILE_FLD_SRNO+"]").is(":visible"); // 해당 폴더가 체크되어 있는지
            var isCurrentChild = $(".js-move-file-li[file-fld-srno="+folder.UP_FILE_FLD_SRNO+"]").findUp(".current").length > 0; // 부모중에 해당 폴더가 있는지
            var isParentDisabledFolder = $(".js-move-file-li[file-fld-srno="+folder.UP_FILE_FLD_SRNO+"]").findUp(".disabled").length > 0; // 부모가 제한된 폴더인지
            returnHtml += ListHelper.replaceJson(movePopupLiHtml, {
                "colabo-srno": projectData.COLABO_SRNO,
                "file-fld-srno": folder.FILE_FLD_SRNO,
                "up-file-fld-srno": folder.UP_FILE_FLD_SRNO,
                "folder-name": folder.FILE_FLD_NM,
                "last-fld": folder.LAST_FLD_YN === "Y" ? "" : "js-not-folder",
                "folder-depth": Often.null2Void(folderDepth, "1"),
                "popup-depth-class": "depth" + Often.null2Void(folderDepth, "1"),
                "current-folder": (isDisabledFolder || isCurrentFolder || isCurrentChild || isParentDisabledFolder) ? "disabled" : "",
            })
        })
        return returnHtml;
    }

    function checkedFolderOrFiles($fileLi) {
        var viewType = LocalUtil.getFileSetting();
        var isEmptyTargetFile = (!$fileLi || $fileLi.length === 0);
        var $fileLayerLi = isEmptyTargetFile ? $fileLayer.find(".js-file-" + viewType + ".on") : $fileLi;
        var returnJson = {
            FLD_REC: [],
            EDITOR_REC: [],
        };
        $.each($fileLayerLi, function (i, $li) {
            if ($($li).hasClass("js-folder")) {
                returnJson["FLD_REC"].push({
                    "FILE_FLD_SRNO": $($li).attr("file-fld-srno"),
                    "UP-FILE-FLD-SRNO": $($li).attr("up-file-fld-srno"),
                })
            } else {
                returnJson["EDITOR_REC"].push({
                    "EDITOR_SRNO": $($li).attr("editor_srno"),
                })
            }
            $checkedLi.push($($li));
        })
        return returnJson;
    }

})();