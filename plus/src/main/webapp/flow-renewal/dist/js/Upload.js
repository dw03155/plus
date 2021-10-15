var Upload = (function () {

    var formDataArray;
    var fileJsonArray;
    var queueTotalCount;

    var profileCondition = {
        BASE_SIZE: 102400,
        COMP_SIZE: 102400,
        MAX_SIZE: 200
    }

    var isUploading = false;

    return {
        getQueueTotalCount: getQueueTotalCount,
        uploadFile: uploadFile,
        putFilesAndSend: putFilesAndSend,
    }

    function getQueueTotalCount() {
        return queueTotalCount;
    }

    function initUploadData() {
        formDataArray = [];
        fileJsonArray = [];
        queueTotalCount = 0;
        isUploading = false;
    }

    function uploadFile(type, finishCallback) {
        if (Often.isFunc(Func.CLOUD.UPLOAD_PREVENT)) {
            return Often.toast('info', i18next.t('front.alert.adminRestriction'));
        }

        var $fileUploadInput = type === "profile" ? getFileUploadObj(false, true) :
            getFileUploadObj(true, false);
        $fileUploadInput.on("change", function (e) {
            var element = e.srcElement ? e.srcElement : e.target;
            $fileUploadInput.remove();
            putFilesAndSend(type, element.files, finishCallback);
        });
        $('body').append($fileUploadInput)
        $fileUploadInput.click();
    }

    function putFilesAndSend(type, fileList, successCallback, finishCallback) {
        if (Often.isFunc(Func.CLOUD.UPLOAD_PREVENT)) {
            return Often.toast('info', i18next.t('front.alert.adminRestriction'));
        }

        if (fileList.length === 0) return;
        if (FileUtil.isLimitOnMultiUpload(fileList.length, Often.isMessenger())) return;

        if (type !== "profile") {
            if (LimitGuest.isStorageFullGuest("data500", Often.isAct("messenger"))) return; // &&로 if조건 묶을 시 제한 팝업 우선 띄움
        }
        UploadHandler.setCurrentUploadCount(UploadHandler.getCurrentUploadCount() + 1);
        (UploadHandler.getCurrentUploadCount() === 1) && initUploadData();

        if (fileJsonArray.length > 10) {
            Often.toast("error", i18next.t('front.upload.fileInQueue'));
            return;
        }

        var isAvailableUpload = true;
        for (var i = 0; i < fileList.length; i++) {
            if (FileUtil.isAvailableFileSize(fileList[i].size)) {
                isAvailableUpload = false;
                break;
            }

            if (FileUtil.isFolder(fileList[i].name)) {
                isAvailableUpload = false;
                break;
            }
        }
        if (!isAvailableUpload) return;

        for (var i = 0; i < fileList.length; i++) {
            var isImage = ImageUtil.isImageExtension(fileList[i].name) && ImageUtil.isImageSize(fileList[i].size);
            var isProfile = type === "profile";
            if (type === "profile" && !isImage) {
                Often.toast("2", i18next.t('front.alert.imageOnly'));
                return;
            }

            var fileQueue = Often.isMessenger() && MessengerSend.getQueueNumber();
            if (type === "file") putFile(null, fileList[i], fileQueue)
            else if (isImage || isProfile) putImageFiles(isProfile ? 0 : i, fileQueue, isProfile);
            else putFile(null, fileList[i], fileQueue);
        }

        function putImageFiles(index, fileQueueNumber, isProfile) {
            readImageFromUrl(index).subscribe(function (imageObject) {
                putFile(imageObject.image, fileList[imageObject.index], fileQueueNumber, isProfile);
            });

            function readImageFromUrl(index) {
                return Rx.Observable.create(function (observer) {
                    var reader = new FileReader();
                    var image = new Image();
                    reader.onload = function () {
                        image.onload = function () {
                            observer.next({image: image, index: index})
                        }
                        image.src = reader.result;
                    }
                    reader.readAsDataURL(fileList[index]);
                })
            }
        }

        function putFile(currentImage, currentFile, _fileQueue, isProfile) {

            currentImage = Often.null2Void(currentImage);
            var isFile = currentImage === "";
            var isProfileThumb = isProfile && Often.isFunc(Func.CLOUD.PROFILE_THUMBNAIL);
            var thumbFile = isFile ? "" : ImageUtil.getThumbImgFile(currentImage, currentFile, (isProfileThumb ? profileCondition : null));
            var originalFile = isFile ? currentFile : isProfileThumb ? thumbFile : currentFile;
            var fileName = currentFile.name;
            var isCaptureImage = (fileName === "image.png");
            fileName = (isCaptureImage ? ImageUtil.getFileNameByClipboard() : fileName);

            var fileJson = {
                USER_ID: _USER_ID,
                RGSN_DTTM: _RGSN_DTTM,
                NOW: new Date().getTime(),
                FILE: originalFile,
                WIDTH: Often.null2Void(currentImage.width, ""),
                HEIGHT: Often.null2Void(currentImage.height, ""),
                THUMB_IMG_FILE: thumbFile,
                FILE_NAME: fileName,
            }

            if (Often.isMessenger()) {
                fileJson.TEMP_CHAT_SRNO = _fileQueue;
                MessengerSend.drawTempFile(_fileQueue, originalFile.name, originalFile.size, (isFile ? "" : currentImage.src));
            }

            fileJsonArray.push(fileJson);
            formDataArray.push(json2formData(fileJson));
            queueTotalCount = formDataArray.length;

            if (!isUploading && fileList.length === queueTotalCount) {
                sendFileListToServer(successCallback, finishCallback);
            }
        }

        function json2formData(json) {
            var formData = new FormData();
            for (var key in json) {
                formData.append(key, json[key]);
            }
            return formData;
        }
    }

    function sendFileListToServer(successCallback, abortCallback) {

        isUploading = true;

        var xhr = [];
        var responseLength = 1;
        var uploadURL = "/FLOW_UPLOAD_C001.jct";

        awaitFileToServer(0);

        function awaitFileToServer(fileIndex) {

            var tempChatSrno = fileJsonArray[fileIndex].TEMP_CHAT_SRNO;

            xhr[fileIndex] = new XMLHttpRequest();
            xhr[fileIndex].upload.addEventListener('loadstart', onLoadStart, false);
            xhr[fileIndex].upload.addEventListener('progress', onProgress, false);
            xhr[fileIndex].upload.addEventListener('abort', onAbort, false);
            xhr[fileIndex].upload.addEventListener('error', onError, false);
            xhr[fileIndex].open("POST", uploadURL, true);
            xhr[fileIndex].onreadystatechange = xhrOnReadyStateChange;
            xhr[fileIndex].send(formDataArray[fileIndex]);

            function xhrOnReadyStateChange() {
                var xhrThis = this;
                var isOk = xhrThis.readyState === 4 && xhrThis.status === 200;
                isOk && nextStep(function () {
                    var result = JSON.parse(xhrThis.responseText);
                    if (result.COMMON_HEAD && result.COMMON_HEAD.ERROR) {
                        Often.toast('info', result.COMMON_HEAD.MESSAGE);
                    } else {
                        successCallback(JSON.parse(xhrThis.responseText).FILE_REC[0], tempChatSrno);
                    }
                }, function () {
                    UploadHandler.setCurrentUploadCount(0);
                });
            }

            function onLoadStart() {
                UploadHandler.loadStart(fileJsonArray, fileIndex, function () {
                    xhr[fileIndex].abort();
                    UploadHandler.abort();
                })
            }

            function onProgress(e) {
                if (e.lengthComputable) {
                    var percent = Math.ceil(((e.loaded || e.position) / e.total) * 100);
                    UploadHandler.progress(fileJsonArray, fileIndex, percent);
                }
            }

            function onAbort() {
                (typeof abortCallback === "function") && abortCallback(fileJsonArray[fileIndex].TEMP_CHAT_SRNO);
                UploadHandler.abort();
            }

            function onError() {
                nextStep(function () {
                    UploadHandler.error(fileJsonArray, fileIndex)
                }, function () {
                    UploadHandler.finished(fileJsonArray, fileIndex)
                })
            }

            function nextStep(stepCallback, lastCallback) {
                (typeof stepCallback === "function") && stepCallback()
                if (responseLength < queueTotalCount) {
                    responseLength++;
                    awaitFileToServer(fileIndex + 1);
                } else {
                    isUploading = false;
                    (typeof lastCallback === "function") && lastCallback();
                }
            }
        }
    }

    // 업로드 할 파일 찾기
    function getFileUploadObj(isMulti, isImage) {
        var fileUploadObj = $('<input type="file" style="display: none;">');
        fileUploadObj.attr({
            'id': 'fileUploadInput',
            'multiple': (isMulti ? 'multiple' : ''),
            'accept': (isImage ? 'image/*' : ''),
        })
        return fileUploadObj
    }

})();