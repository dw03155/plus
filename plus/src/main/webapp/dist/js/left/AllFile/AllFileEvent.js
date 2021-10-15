var AllFileEvent = (function () {

    var $fileLayer, $fileLayerUl;

    return {
        initSetting: initSetting,
        addClickFileLayerEvent: addClickFileLayerEvent,
        addSelectable: addSelectable,
        clickFile: clickFile,
        addRightClickEvent: addRightClickEvent,
        doubleClick: doubleClick,
        changeView: changeView,
        folderCheckAndDelete: folderCheckAndDelete,
    }

    function set$element() {
        $fileLayer = $("#" + (AllFile.isProjectFile() ? "detail" : "all") + "CollectView .allFileLayer");
        $fileLayerUl = $fileLayer.find("#fileLayerUl");
    }

    function initSetting() {
        changeView(LocalUtil.getFileSetting());
        addSelectable();
        addClickFileLayerEvent();
    }

    function addClickFileLayerEvent() {

        set$element();

        $fileLayer.find(".js-file-search-input").off("keydown").on("keydown", FileSearch.keydownSearchInput);
        $fileLayer.find("#fileFilterButton, .js-filter-area").off("click").on("click", FileFilter.toggleFilterButton);
        $("#fileFilter").off("click").on("click", FileFilter.clickFileFilterItem);

        $fileLayer.off("click").on("click", function (e) {
            var $eTarget = $(e.target);
            if (!$eTarget.findUp(".allFileLayer").length > 0) return;

            hideAllFileLayer();
            if (isFileMenuPopupAndRemove($eTarget)) return;
            if (isAddFolderButtonAndAction($eTarget)) return;
            if (isProjectOrFolderAndAction($eTarget)) return;
            if (isFileMoveAndAction($eTarget)) return;
            if (isFileDeleteAndAction($eTarget)) return;
            if (isFileDownloadAndAction($eTarget)) return;
            if (isViewChangeButtonAndAction($eTarget)) return;
            if (isSortButtonAndAction($eTarget)) return;
            if (isCountPopupAndAction($eTarget)) return;
            if (isFileDetailSearchTopButtonAndAction($eTarget)) return;
        })

        function hideAllFileLayer() {
            $fileLayer.find("#moreFolderLayer").css("display", "none");
        }

        function isFileDetailSearchTopButtonAndAction($eTarget) {
            var $FileDetailSearchButton = $eTarget.findUp(".js-file-detail-search-button");
            if ($FileDetailSearchButton.length > 0) {
                FileSearch.showDetailSearchLayer($FileDetailSearchButton);
                return true;
            }
            return false;
        }

        function isFileMenuPopupAndRemove($eTarget) {
            var isVisibleMenuPopup = $("#allFileMenuPopup").length > 0;
            var $fileMenu = $eTarget.findUp(".js-file-menu-layer");
            if ((!$fileMenu || $fileMenu.length === 0) && !isVisibleMenuPopup) return false;
            FileMenu.removeFileMenu();
        }

        function isCountPopupAndAction($eTarget) {
            var viewTypeClass = AllFile.getViewTypeClass();
            var $cancelButton = $eTarget.findUp(".js-all-cancle-button");
            if ($cancelButton.length === 0) return false;
            $fileLayerUl.find(".js-file-" + viewTypeClass).removeClass("all-file-active-type-1 on");
            drawCountLayer();
            controlLayerDisplay();
            return true;
        }

        function isEmptyCheckFile() {
            var viewTypeClass = AllFile.getViewTypeClass();
            return ($fileLayerUl.find(".js-file-" + viewTypeClass + ".on").length === 0);
        }

        function isOnlyExternalFile() {
            var $fileArray = $fileLayer.find(".js-file-" + AllFile.getViewTypeClass() + ".on")
            var onlyExternal = true;
            $.each($fileArray, function(i, file) {
                var randKey = $(file).attr("rand_key")
                if (randKey !== "GOOGLEDRIVE" && randKey !== "DROPBOX") {
                    onlyExternal = false;
                }
            })
            return onlyExternal;
        }

        function isFileMoveAndAction($eTarget) {
            var $allFileMoveButton = $eTarget.findUp("#allFileMoveButton");
            if (!$allFileMoveButton || $allFileMoveButton.length === 0) return false;
            if (isEmptyCheckFile()) return Often.toast("error", i18next.t('front.alert.noFileSelected'));
            MoveFilePopup.moveFile("POPUP", $fileLayer);
        }

        function isFileDeleteAndAction($eTarget) {
            var $allFileDeleteButton = $eTarget.findUp("#allFileDeleteButton");
            if (!$allFileDeleteButton || $allFileDeleteButton.length === 0) return false;
            if (isEmptyCheckFile()) {
                Often.toast("error", i18next.t('front.alert.noFileSelected'));
                return true
            }
            folderCheckAndDelete({
                COLABO_SRNO: Detail.getProjectSrno(),
                FLD_REC: AllFile.checkedFolder(),
            });
            return true;
        }

        function isFileDownloadAndAction($eTarget) {
            var $fileDownloadButton = $eTarget.findUp("#fileDownloadButton");
            if ($fileDownloadButton.length === 0) return false;
            if (isEmptyCheckFile()) return Often.toast("error", i18next.t('front.alert.noFileSelected')); // 모든 타입의 파일이 있을 때
            if (isOnlyExternalFile()) return Often.toast("error", "해당 파일은 다운로드 할 수 없습니다."); // 외부 파일만 있을 때
            var fileArray = AllFile.getCheckedDownloadFileJson();
            if (fileArray.length > 10) return Often.toast("error", "선택된 파일이 10개 초과되면 다운로드가 불가능합니다.");
            FileUtil.saveFile(fileArray);
            return true;
        }

        function isProjectOrFolderAndAction($eTarget) {
            var $headerProjectButton = $eTarget.findUp(".js-file-header")
            if (!$headerProjectButton.length > 0) return false;

            var $headerMoreButton = $eTarget.findUp("#moreFolderButton");
            if ($headerMoreButton.length > 0) {
                var $moreFolderLayer = $fileLayer.find("#moreFolderLayer");
                var isVisiblePopup = $moreFolderLayer.is(":visible");
                $moreFolderLayer.css("display", isVisiblePopup ? "none" : "block");
                return true;
            }

            AllFile.setLastFileFolderSrno($headerProjectButton.attr("file-fld-srno"));
            AllFile.drawInitList(true);
            return true;
        }

        function isSortButtonAndAction($eTarget) {
            var $sortButton = $eTarget.findUp(".js-sort-file");
            if ($sortButton.length === 0) return;
            var $sortLayer = $sortButton.findUp(".js-sort-layer");
            var isCheckedButton = $sortButton.hasClass("check");

            if (!isCheckedButton) {
                $sortLayer.find(".js-sort-file").removeClass("check on");
                $sortButton.addClass("check on");
            } else {
                $sortButton.toggleClass("on");
            }
            AllFile.drawListByFilter();
            return true;
        }

        function isViewChangeButtonAndAction($eTarget) {

            if ($eTarget.findUp(".js-view-change-button").length === 0) return false;
            var isBoardType = $eTarget.findUp(".js-view-change-button").is("#changeBoardTypeButton");
            var viewTypeClass = (isBoardType ? "board" : "list")
            LocalUtil.setLocal("FILE_SETTING", viewTypeClass);
            AllFile.setViewTypeClass(viewTypeClass);
            changeView(viewTypeClass);

            set$element();
            AllFile.setIsNewFileRecord(false);
            AllFile.drawInitList(false);
            return true;
        }

        function isAddFolderButtonAndAction($eTarget) {
            if (!$eTarget.findUp("#addFolder").length > 0) return false;
            if (!AllFile.isProjectFile()) {
                Often.toast("error", "폴더는 프로젝트 모아보기에서 생성 가능합니다.");
                return true;
            }
            if (AllFile.getFolderDepth() === 5) {
                Often.toast("error", "폴더는 최대 5 Depth 까지만 생성 가능합니다.");
                return true;
            }

            PopupDraw.drawInputConfirm({
                contents: {
                    title: i18next.t('front.common.add', {val: '$t(dictionary.folder)'}),
                    holder: i18next.t('front.alert.enterWord', {val: Interpolation.addName('dictionary.folder')}),
                    empty: i18next.t('front.alert.enterWord', {val: Interpolation.addName('dictionary.folder')}),
                    over: i18next.t('front.placeHolder.lengthLimit', {
                        count: 50
                    }),
                },
                callback: {submit: submitCudFolder}
            })

            function submitCudFolder(popupObj) {
                var $input = popupObj.find(".popup-input");
                var checkJson = Validation.checkInput($input);
                if (Object.keys(checkJson).length > 0) {
                    Often.toast("error", checkJson.errorMessage);
                    checkJson.errorObj.focus();
                    return;
                }

                var inputVal = $.trim($input.val());
                AllFile.cudFolder("C", $.extend({}, {
                    FILE_FLD_NM: inputVal,
                    COLABO_SRNO: AllFile.getFileProjectSrno(),
                    UP_FILE_FLD_SRNO: AllFile.getLastFileFolderSrno(),
                }), PopupDraw.closePopup)
            }

            return true;
        }
    }

    function addSelectable() {
        set$element();
        var viewTypeClass = AllFile.getViewTypeClass();
        $fileLayer.selectable({
            distance: 5,
            filter: (".js-selectable"),
            stop: function () {
                $fileLayerUl.css({"overflow":"auto", "overflow-y":"auto", "padding-right": ""})
                $(".selector").selectable("destroy");
            },
            start: function () {
                $fileLayerUl.css({"overflow":"hidden", "overflow-y":"hidden", "padding-right": "7px"})
                $fileLayerUl.find(".js-file-" + viewTypeClass)
                    .removeClass("ui-selected all-file-active-type-1 on");
            },
            selecting: function (e, ui) {
                $(".ui-selectable-helper").css("display", "block");
                clickFileOrFolderActive($(ui.selecting))
            },
            unselecting: function (e, ui) {
                clickFileOrFolderActive($(ui.unselecting))
            }
        });
    }

    function clickFileOrFolderActive($fileLi) {
        var activeClass = "all-file-active-type-1 on";
        var isChecked = $fileLi.hasClass("on");
        isChecked ? $fileLi.removeClass(activeClass) : $fileLi.addClass(activeClass)
        drawCountLayer();
        controlLayerDisplay();
    }

    function drawCountLayer() {
        var viewTypeClass = AllFile.getViewTypeClass();
        var countLayerHtml = $("#countLayerItem").html();
        var liCount = $fileLayerUl.find(".js-file-" + viewTypeClass + ".on").length;
        var $countLayer = $fileLayerUl.find(".js-file-count-layer");
        if ($countLayer.is(":visible")) {
            return (liCount === 0 ? $countLayer.remove() : $countLayer.find(".js-count-text").text(liCount));
        }
        $fileLayerUl.append(countLayerHtml.replace("{count}", liCount));
    }

    function controlLayerDisplay() {
        var viewTypeClass = AllFile.getViewTypeClass();
        var $checkedFileLi = $fileLayerUl.find(".js-file-" + viewTypeClass + ".on");
        var isFile = false;
        var isFolder = false;
        $.each($checkedFileLi, function (i, li) {
            if (isFolder && isFile) return false;
            else if ($(li).hasClass("js-folder")) isFolder = true;
            else isFile = true;
        });
        $fileLayer.find("#fileDownloadButton").css("display", (isFile && !isFolder) ? "inline-block" : "none");
        $fileLayer.find("#allFileDeleteButton").css("display", (!isFile && isFolder) ? "inline-block" : "none");
        $fileLayer.find("#allFileMoveButton").css("display", ((isFile || isFolder) && AllFile.isProjectFile()) ? "inline-block" : "none");
    }

    function clickFile(e) {
        set$element();
        var viewTypeClass = AllFile.getViewTypeClass();
        var $eTarget = $(e.target);
        var $fileLi = $eTarget.findUp(".js-file-" + viewTypeClass);
        var $fileMenu = $eTarget.findUp(".js-file-menu");
        if ($fileMenu.length > 0) {
            e.stopPropagation();
            FileMenu.openFileMenu($fileLi, e);
            return;
        }

        if ($fileLi.length > 0) {
            clickFileOrFolderActive($fileLi);
        }
    }

    function addRightClickEvent() {
        set$element();
        $fileLayerUl.off("mousedown").on("mousedown", rightClick);
    }

    function rightClick(e) {
        var viewTypeClass = AllFile.getViewTypeClass();
        var $eTarget = $(e.target);
        var $fileLi = $eTarget.findUp(".js-file-" + viewTypeClass);
        if (!(e.button === 2 && $fileLi.length > 0)) return;
        e.stopPropagation();
        FileMenu.openFileMenu($fileLi, e);
    }

    function doubleClick(e) {

        set$element();
        var viewTypeClass = AllFile.getViewTypeClass();
        var $eTarget = $(e.target);
        var $fileLi = $eTarget.findUp(".js-file-" + viewTypeClass);
        if (!$fileLi.length > 0) return;

        var isFolder = $fileLi.hasClass("js-folder")
        if (isFolder) {
            AllFile.setLastFileFolderSrno($fileLi.attr("file-fld-srno"));
            AllFile.drawInitList(true);
            return;
        }
        var viewerFile = Often.getAttrs($fileLi);
        var isImage = ImageUtil.isImageType(viewerFile[0]);
        isImage ? ImageViewer.openImage("POST", viewerFile, 0) : FileUtil.openFile("DOC-VIEWER", viewerFile);
    }

    function changeView(viewTypeClass) {
        set$element();
        var $fileItemArea = $fileLayer.find("#fileItemArea");
        var $fileItemUlHead = $fileLayer.find("#fileItemUlHead");
        $fileLayer.find(".js-all-file-type").removeClass("on");
        if (viewTypeClass === "board") {
            $fileItemArea.attr("class", "all-file-area board");
            $fileLayer.find(".all-file-header-right-icon-type-4").addClass("on");
            $fileItemUlHead.css("display", "none");
        } else if (viewTypeClass === "list") {
            $fileItemArea.attr("class", "all-file-area list");
            $fileLayer.find(".all-file-header-right-icon-type-5").addClass("on");
            $fileItemUlHead.css("display", "block");
        }
    }

    function folderCheckAndDelete(folderJson) {
        Ajax.executeApi(RestApi.GET.COLABO2_FILE_FLD_R004, folderJson, function (data) {
            var isEmptyFolder = (data.CNT === "0");
            var deleteFolderMessage = i18next.t('front.common.ask', {
                val: '$t(dictionary.folder)',
                status: '$t(dictionary.delete)'
            })
            var dataExistInFolderMessage = i18next.t('front.alert.dataExistInFolderError')
            PopupDraw.drawConfirm({
                contents: {main: isEmptyFolder ? deleteFolderMessage : dataExistInFolderMessage},
                callback: {submit: submitDelete}
            })

            function submitDelete() {
                AllFile.cudFolder("D", folderJson, PopupDraw.closePopup);
            }
        })
    }

})();