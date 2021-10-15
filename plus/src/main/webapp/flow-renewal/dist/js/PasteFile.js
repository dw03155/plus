var PasteFile = (function () {

    return {
        preventAll: preventAll,
        pasteFileEvent: pasteFileEvent,
        hideDimd: hideDimd,
        onUploadAreaPasteEvent: onUploadAreaPasteEvent,
        onUploadAreaDragEnterEvent: onUploadAreaDragEnterEvent,
        onDimdAreaDragOverEvent: onDimdAreaDragOverEvent,
        onDropEvent: onDropEvent,
    }

    /***
     * @author 임석현(sjsh1623@naver.com) , 장원종 수정
     * @description File Copy & Paste / Drag & Drop (유의 사항 dimdClass에 -contenteditable="true"- 가 있어야 합니다
     *
     */

    function onUploadAreaPasteEvent(e) {
        var $eTarget = $(e.target);
        var isRemark = $eTarget.findUp(".js-comment-area").length > 0;
        var $editLayer = isRemark ? $eTarget.parents(".js-remark-layer") : $eTarget.findUp(".js-popup-before");
        var $dimdLayer = $editLayer.find(".js-dimd-layer");
        if ($eTarget.is("input") || $eTarget.is("textarea")) return false;
        if ($dimdLayer.length === 0) {
            preventAll(e);
            return false;
        }
        pasteFileEvent(e, "paste");
        closeDimdLayer();
        return true;
    }

    function onUploadAreaDragEnterEvent(e) {
        if (!isPasteFiles(e)) return;
        var $eTarget = $(e.target);
        var $popupBefore = $eTarget.findUp(".js-popup-before");
        var dataCode = $popupBefore.attr("data-code");
        var isRemark = $eTarget.findUp(".js-remark-layer").length > 0;
        var $editLayer = isRemark ? $eTarget.parents(".js-remark-layer") : $eTarget.findUp(".js-popup-before");
        var $dimdLayer = $editLayer.find(".js-dimd-layer");
        if (dataCode === "VIEW" && !isRemark) return false;
        if ($dimdLayer.length === 0) return false;
        $dimdLayer.removeClass("d-none");
        return true;
    }

    function onDimdAreaDragOverEvent(e) {
        var $eTarget = $(e.target);
        var $dimdLayer = $eTarget.findUp(".js-dimd-layer");
        if ($dimdLayer.length > 0) return false;
        closeDimdLayer();
        return true;
    }

    function onDropEvent(e) {
        var $eTarget = $(e.target);
        var $dimdLayer = $eTarget.findUp(".js-dimd-layer:visible");
        if ($dimdLayer.length === 0) {
            preventAll(e);
            return false;
        }
        pasteFileEvent(e, "drop")
        closeDimdLayer();
        return true;
    }

    function closeDimdLayer() {
        $(".js-dimd-layer").addClass("d-none");
    }

    /**
     * @param e 이벤트
     * @param type paste/drag 여부 확인
     * @Description 파일,이미지 Drag & Drop/Copy & Paste
     * */

    function pasteFileEvent(e, type) {

        var isMessenger = Often.isMessenger();
        var clipBoardData = ClipBoard.getClipboardData(e);

        if ("" === Often.null2Void(clipBoardData)) return;

        // 이미지를 붙혀넣기 하는지 확인
        var isPasteImage = type === 'paste' && clipBoardData.getData("Text") === "";

        // 이미지 또는 파일 Paste일 경우 또는 drag & drop일 경우 prevent를 함
        if (isPasteImage || type === 'drop') preventAll(e);

        // Drag/Paste 여부 확인
        var fileData = type === 'drop' ? e.originalEvent.dataTransfer.files : clipBoardData.files;

        if (!fileData || fileData.length === 0) {
            if (isPasteImage && Often.isBrowser("whale")) return Often.toast("error", "웨일 브라우저에서는 현재 지원하지 않는 기능입니다.");   // whale 제한
            return;
        }

        if (isMessenger) {
            var fileCount = fileData.length;
            var nameText = fileCount > 1 ? i18next.t('front.pasteFile.fileCount', {
                name: fileData[0].name,
                count: fileCount
            }) : fileData[0].name;
            if (FileUtil.isFolder(nameText)) return;
            if (FileUtil.isLimitOnMultiUpload(fileCount, true)) return;

            //전송 팝업 이전에 사이즈 체크 선행
            for (var i = 0; i < fileData.length; i++) {
                if (FileUtil.isAvailableFileSize(fileData[i].size)) return;
            }

            PopupDraw.drawConfirm({
                contents: {main: i18next.t('front.alert.transferFile') + "\n" + nameText},
                callback: {
                    submit: submitCallback,
                    final: function ($popup) {
                        $popup.addClass("js-file-send");
                    }
                }
            })
            return;
        }

        submitCallback();

        function submitCallback() {
            Upload.putFilesAndSend("", fileData, function (data, queueNumber) {

                if (isMessenger) return MessengerSend.sendFile(data, queueNumber);

                var $eTarget = $(e.target);
                var $remarkLayer = $eTarget.findUp(".js-remark-layer");

                if ($remarkLayer.length > 0) {
                    var isAdminAuthority = $remarkLayer.find(".js-remark-form").hasClass("admin");
                    if (Authority.isAdminAuthorityCheckAndAction(isAdminAuthority)) return;
                    ItemRemark.drawUploadFile(data, $remarkLayer);
                    return;
                }

                PostAppend.appendFileOrImg($eTarget, data);
            }, finishCallback)
        }

        function finishCallback(queueFileNumber) {
            if (isMessenger) $("#message-" + queueFileNumber).find(".reload-wr").css("display", "none");
        }
    }

    function isPasteFiles(e) {
        var isFile = false;
        var clipboardData = ClipBoard.getClipboardData(e);
        if (!clipboardData) return false;
        if (!clipboardData.items) return false;
        if (clipboardData.items.length > 0) {
            $.each(clipboardData.items, function (i, v) {
                if (v.kind === "file") {
                    isFile = true;
                    return false;
                }
            })
        }
        return isFile;
    }

    function preventAll(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    /***
     *
     * @description 가독성을 위함
     * @param $eTarget
     */

    function hideDimd($eTarget) {
        var $dimdTarget = $eTarget.findUp(".js-dimd-layer");
        var isDimdTarget = $dimdTarget.length > 0;
        var $visibleDimdLayer = $(".js-dimd-layer:visible");
        var isDimdLayer = $visibleDimdLayer.length > 0;
        if (!isDimdLayer && !isDimdTarget) return;
        closeDimdLayer();
    }
})
();
