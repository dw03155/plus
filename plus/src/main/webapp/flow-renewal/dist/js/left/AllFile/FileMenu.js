var FileMenu = (function () {

    var $targetFile, $fileLayer, $fileMenu;

    return {
        openFileMenu: openFileMenu,
        removeFileMenu: removeFileMenu,
    }

    function openFileMenu($fileLi, event) {
        removeFileMenu();
        $targetFile = $fileLi;
        $fileLayer = $targetFile.findUp(".allFileLayer");
        var $fileMenu = getFileMenuObj(event);
        $fileLayer.find(".js-file-list-layer").append($fileMenu);
        var menuPosition = getFileMenuPopupPosition(event, $fileMenu);
        $fileMenu.css({"left": menuPosition.left, "top": menuPosition.top, "display": "block"});
    }

    function getFileMenuObj() {
        var fileMenuHtml = $fileLayer.find('#fileMenuPopupItem').html();
        $fileMenu = $(fileMenuHtml).attr("id", "allFileMenuPopup");
        $fileMenu.off("click").on("click", clickFileMenuPopup);
        controlFilePopup();
        return $fileMenu;
    }

    function removeFileMenu() {
        $("#allFileMenuPopup").remove();
    }

    function clickFileMenuPopup(e) {
        var $eTarget = $(e.target);
        if ($eTarget.findUp("#allFileMenuPopup").length === 0) return;

        if (isDownloadAndAction($eTarget)) return removeFileMenu();
        if (isFileViewerAndAction($eTarget)) return removeFileMenu();
        if (isMoveFileAndAction($eTarget)) return removeFileMenu();
        if (isChangeFolderNameAndAction($eTarget)) return removeFileMenu();
        if (isDeleteFolderAndAction($eTarget)) return removeFileMenu();
        if (isDetailFilePostButtonAndAction($eTarget)) return removeFileMenu();
    }

    function isDetailFilePostButtonAndAction($eTarget) {
        if (!$eTarget.findUp("#detailFileView").length > 0) return false;
        var fileJson = Often.getAttrs($targetFile);
        PostPopup.togglePostView(fileJson[0].COLABO_SRNO, fileJson[0].COLABO_COMMT_SRNO, "", DetailEvent.applySummarySlickImage);
        return true;
    }

    function isDeleteFolderAndAction($eTarget) {
        if (!$eTarget.findUp("#deleteFolder").length > 0) return false;
        if (Often.null2Void($targetFile).length === 0) return false;
        AllFileEvent.folderCheckAndDelete({
            COLABO_SRNO: Detail.getProjectSrno(),
            FLD_REC: Often.getAttrs($targetFile),
        });
    }


    function isChangeFolderNameAndAction($eTarget) {
        if (!$eTarget.findUp("#nameChange").length > 0) return false;
        var folderName = $targetFile.find(".all-file-name");
        PopupDraw.drawInputConfirm({
            contents: {
                title: i18next.t('front.common.change', {val: Interpolation.addName('dictionary.folder')}),
                holder: i18next.t('front.alert.enterWord', {val: Interpolation.addName('dictionary.folder')}),
                value: folderName.text(),
            },
            callback: {submit: submitChangeFolderName}
        })

        function submitChangeFolderName(popupObj) {
            var inputVal = $.trim(popupObj.find(".popup-input").val());
            AllFile.cudFolder("U", {
                COLABO_SRNO: Often.null2Void($targetFile.attr("colabo-srno"), ""),
                FILE_FLD_SRNO: Often.null2Void($targetFile.attr("file-fld-srno"), "-1"),
                FILE_FLD_NM: inputVal,
            }, PopupDraw.closePopup);
            folderName.text(inputVal);
        }
    }

    function isMoveFileAndAction($eTarget) {
        if (!$eTarget.findUp("#moveFile").length > 0) return false;
        MoveFilePopup.moveFile("POPUP", $fileLayer, $targetFile);
    }

    function isFileViewerAndAction($eTarget) {
        if (!$eTarget.findUp("#viewerFile").length > 0) return false;
        event.stopPropagation();
        var viewerFile = AllFile.getCheckedFileJson($targetFile);
        var isImage = ImageUtil.isImageType(viewerFile[0]);
        isImage ? ImageViewer.openImage("POST", viewerFile, 0) : FileUtil.openFile("DOC-VIEWER", viewerFile);
    }

    function isDownloadAndAction($eTarget) {
        if (!$eTarget.findUp("#downloadFile").length > 0) return false;
        var fileArray = AllFile.getCheckedFileJson($targetFile);
        FileUtil.saveFile(fileArray);
    }

    function getFileMenuPopupPosition(event, $fileMenu) {
        var topPos = event.pageY;
        var leftPos = event.pageX;
        var menuHeight = $fileMenu.outerHeight();
        var menuWidth = $fileMenu.outerWidth();
        var isOverTop = window.innerHeight < (topPos + menuHeight);
        var isOverLeft = window.innerWidth < (leftPos + menuWidth + 60);
        var fileLayerOffset = $fileLayer.find(".js-file-list-layer").offset();
        var fileLayerScrollTop = $fileLayer.find(".js-file-list-layer").scrollTop();

        return {
            "top": (event.pageY + fileLayerScrollTop) - (fileLayerOffset.top + (isOverTop ? menuHeight : 0)),
            "left": event.pageX - (fileLayerOffset.left + (isOverLeft ? menuWidth : 0)),
        }
    }

    function controlFilePopup() {
        var isFolder = $targetFile.hasClass("js-folder");
        var isExternalFile = $targetFile.hasClass("external");
        var isExistProjectSrno = AllFile.isProjectFile();
        $fileMenu.find("#downloadFile").css("display", isFolder ? "none" : isExternalFile ? "none" : "block");
        $fileMenu.find("#viewerFile, #detailFileView").css("display", isFolder ? "none" : "block");
        $fileMenu.find("#nameChange, #deleteFolder").css("display", isFolder ? "block" : "none");
        $fileMenu.find("#moveFile").css("display", isExistProjectSrno ? "block" : "none");
    }

})();