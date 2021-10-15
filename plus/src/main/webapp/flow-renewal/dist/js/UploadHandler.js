var UploadHandler = (function () {

    var $fileErrorPopup;
    var currentUploadCount = 0;
    var failContentCount = 0;
    var uploadingFileList = {};
    var currentQueueNumber;

    return {
        setCurrentUploadCount: setCurrentUploadCount,
        getCurrentUploadCount: getCurrentUploadCount,
        getCurrentQueueNumber: getCurrentQueueNumber,
        loadStart: loadStart,
        progress: progress,
        abort: abort,
        error: error,
        finished: finished,
        isUploading: isUploading,
        isUploadingAndCallback: isUploadingAndCallback,
        stopUploading: stopUploading,
    };

    function stopUploading() {
        var $fileLoadingPopup = $("#fileLoadingPopup:visible");
        if ($fileLoadingPopup.length === 0) return;
        return $fileLoadingPopup.find(".btn_cancel").trigger("click");
    }

    function getFileName(fileOneData) {
        if (!fileOneData) return "";
        return fileOneData.FILENAME ? fileOneData.FILENAME : fileOneData.FILE.name;
    }

    function setCurrentUploadCount(count) {
        currentUploadCount = count;
    }

    function getCurrentUploadCount() {
        return currentUploadCount;
    }

    function getCurrentQueueNumber() {
        return currentQueueNumber;
    }

    function isUploading() {
        return $("#fileLoadingPopup:visible").length > 0;
    }

    function isUploadingAndCallback(callback) {
        if (isUploading()) {
            PopupDraw.drawConfirm({
                    contents: {main: "업로드 중입니다. 작업을 취소하고 올리시겠습니까?"},
                    callback: {
                        submit: function () {
                            UploadHandler.stopUploading();
                            callback();
                            PopupDraw.closePopup();
                        },
                        cancel: function () {
                            PopupDraw.closePopup();
                        }
                    }
                }
            )
            return true;
        }
        callback();
        return false;
    }

    function loadStart(fileJsonArray, i, cancelCallback) {
        if (Often.isMessenger()) return MessengerSend.initFirstTempDraw();
        if (!isUploading()) {
            $("body").append($(getFileLoadingPopupHtml()).attr("id", "fileLoadingPopup"));
        }
        drawLoadingBar(getFileName(fileJsonArray[i]), i, 0)
        cancelFunc(cancelCallback)
    }

    function progress(fileDataArray, i, percentage) {

        if (Often.isMessenger()) {
            MessengerSend.setPercentOnTempFile(percentage, fileDataArray[i].TEMP_CHAT_SRNO);
            return;
        }

        if (percentage === 100) return finished(fileDataArray, i);
        var fileName = getFileName(fileDataArray[i]);
        uploadingFileList[fileName] = percentage;
        drawLoadingBar(fileName, i, percentage)
    }

    function initUploadHandlerData() {
        currentUploadCount = 0;
        failContentCount = 0;
        uploadingFileList = {};
    }

    function abort() {
        initUploadHandlerData();
        $("#fileLoadingPopup").remove();
    }

    function error(fileDataArray, i) {
        if ($("#fileErrorPopup").length === 0) {
            $("body").append(getFileErrorPopupHtml())
            $fileErrorPopup = $("#fileErrorPopup");
        }
        var $tempLi = $($("#fileErrorLi").html());
        var tempFileJson = FileUtil.getFileNameAndExtension(getFileName(fileDataArray[i]));
        $tempLi.find(".file_name").text(tempFileJson.NAME)
        $tempLi.find("em").text(tempFileJson.EXT)
        $fileErrorPopup.find("ul").append($tempLi)
        failContentCount++;
    }

    function finished(fileDataArray, i) {
        var $fileLoadingPopup = $("#fileLoadingPopup");
        var isLastCycle = fileDataArray.length - 1 === i;
        var fileName = fileDataArray[i].name;
        delete uploadingFileList[fileName];
        if (isLastCycle) {
            initUploadHandlerData();
            $fileLoadingPopup.remove();
            (failContentCount > 0) && $fileErrorPopup.css('display', 'block')
        }
    }

    function drawLoadingBar(fileName, i, percentage) {
        var $fileLoadingPopup = $("#fileLoadingPopup");
        $fileLoadingPopup.find(".js-name").text(fileName);
        $fileLoadingPopup.find(".js-count").text((i + 1) + "/" + Upload.getQueueTotalCount());
        $fileLoadingPopup.find(".js-progress").css("width", percentage + "%");
    }

    function cancelFunc(cancelCallback) {
        var $fileLoadingPopupCancel = $("#fileLoadingPopup .btn_cancel");
        $fileLoadingPopupCancel.off('click').on('click', function () {
            $fileLoadingPopupCancel.remove();
            (typeof cancelCallback === "function") && cancelCallback();
        })
    }

    function getFileLoadingPopupHtml() {
        return $("#fileLoadingPopupDiv").html();
    }

    function getFileErrorPopupHtml() {
        return $("#fileErrorPopupDiv").html();
    }

})();