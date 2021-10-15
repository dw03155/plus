var FileUtil = (function () {

    return {
        openFlowDrive: openFlowDrive,

        //only-get
        getFileSize: getFileSize,
        getFileNameAndExtension: getFileNameAndExtension,
        getStandardExtension: getStandardExtension,
        getFileName: getFileName,
        getSearchDate: getSearchDate,
        getAtchSrno: getAtchSrno,
        getRandKey: getRandKey,
        getUseInttId: getUseInttId,
        getIconClassNameByExt: getIconClassNameByExt,
        getIconClassNameByFullName: getIconClassNameByFullName,

        //etc
        isAvailableFileSize: isAvailableFileSize,
        checkAndConvertDriveExtClass: checkAndConvertDriveExtClass,
        convertDriveSize: convertDriveSize,
        initSetting: initSetting,
        isAtchAccessible: isAtchAccessible,
        saveFile: saveFile,
        checkFileOnServer: checkFileOnServer,
        checkViewerExtension: checkViewerExtension,
        isFolder: isFolder,
        isLimitOnMultiUpload: isLimitOnMultiUpload,

        openFile: openFile,
        downFile: downFile,
    }

    /** Note. openFile
     * mode
     * 1. SAVE
     * 2. DOC-VIEWER
     * fileJsonArray
     * 1. ATCH_SRNO : 파일 존재 체크 (필수값 )
     * 2. RAND_KEY : 파일 존재 체크 (필수값 )
     * 3. USE_INTT_ID : 파일의 이용기관 아이디 ( 다운로드 ) (필수값)
     * 4. FILE_NM : 파일 원본 이름 (문서 뷰어) (필수값)
     * 5. COLABO_SRNO : 프로젝트 존재 여부 및 권한 체크 (선택값)
     * 6. COLABO_COMMT_SRNO : 글 존재 여부 및 권한 체크 (선택값)
     * 7. ROOM_SRNO : 채팅방 존재 여부 (선택값)
     * 8. ROOM_CHAT_SRNO : 채팅 메세지 존재 여부 (선택값)
     */

    function openFile(mode, fileJsonArray) {
        var isDocViewerExtension = checkViewerExtension(getFileName(fileJsonArray[0]));
        if (mode === "SAVE" || !isDocViewerExtension) return saveFile(fileJsonArray);
        if (mode === "DOC-VIEWER") return DocViewer.openDocViewer(fileJsonArray);
    }

    function saveFile(fileArray) {
        if (!fileArray || fileArray.length === 0)
            return Often.null2Void("error", i18next.t('front.alert.select', {val: '$t(dictionary.file)'}));
        checkFileOnServer(fileArray, "SAVE", downFiles);
    }

    function checkFileOnServer(fileArray, mode, callback) {
        Ajax.executeApi(RenewalApi.GET.ACT_FILE_CHECK, $.extend({MODE: mode}, {ATCH_REC: fileArray}), function (fileData) {
            /**
             * fileData["FILE_REC"]
             * 1. FILE_PATH : 다운로드 URL
             * 2. VIEWER_URL : 문서뷰어 URL
             * 3. ERR_MSG : 파일 제한 메세지
             * */
            if (fileData.ERR_MSG.length > 0) return Often.toast("error", fileData.ERR_MSG);
            (typeof callback === "function") && callback(fileData["FILE_REC"]);
        });
    }

    function downFiles(fileRecord) {
        var t = 1;
        var errorFileMessage = "";
        $.each(fileRecord, function (i, file) {
            if (file.ERR_MSG) return (errorFileMessage = file.ERR_MSG);
            var isExternalFile = file.EXTERNAL_FILE_URL && file.EXTERNAL_FILE_URL.length > 0;
            var filePath = Often.null2Void(isExternalFile ? file.EXTERNAL_FILE_URL : file.FILE_PATH);
            if (filePath === "") return Often.toast("error", i18next.t('front.alert.filePath'));
            setTimeout(function () {
                downFile(filePath, isExternalFile)
            }, 500 * t);
            t++;
        });
        (errorFileMessage && Often.toast("error", errorFileMessage));
    }

    function replaceDomain(filePath) {
        filePath = filePath.replace('http:', 'https:');
        filePath = filePath.replace(/(https:\/\/)(staging.|develop.|)(flow.team)/ig, location.protocol + '//' + location.host);
        return filePath;
    }

    function downFile(filePath, isExternalFile) {
        var fileDownPath = replaceDomain(filePath);
        if (Electron.isElectronApp()) {
            if (isExternalFile) return Electron.openExternalLinkforElectron(fileDownPath)
            Often.isMessenger() ? Electron.downloadFileForChat(fileDownPath, '', '', _ROOM_SRNO) : Electron.downloadFile(fileDownPath);
            return;
        }
        window.open(fileDownPath, isExternalFile ? "_blank" : "_parent");
        session2local(); // window.open : _parent 옵션은 beforeunload 이벤트를 발생시키므로 local teb 데이터를 설정 해줘야 합니다.
    }

    function openFlowDrive(responseType) {
        var isPost = (responseType === "POST");
        OpenUtil.openSubScreen({
            GB: "flowDrive",
            CURRENT_PROJECT_SRNO: (isPost ? ViewChanger.getProjectSrno() : ''),
            RESPONSE_TYPE: responseType,
            CONNECT_ID: SocketControl.getRoomConnectId(),
        });
    }

    function getFileName(fileJson) {
        return (fileJson.ORCP_FILE_NM ? $.trim(fileJson.ORCP_FILE_NM) :
            fileJson.FILE_NAME ? $.trim(fileJson.FILE_NAME) :
                fileJson.FILE_NM ? $.trim(fileJson.FILE_NM) : i18next.t('dictionary.unTitled'));
    }

    /**
     * @param {string} fileByteSize
     * @returns {string} - 소수점 둘째짜리까지 표기됨
     */
    function getFileSize(fileByteSize) {
        if (fileByteSize && isNaN(Number(fileByteSize))) return fileByteSize;
        if (!fileByteSize || Number(fileByteSize) === 0) return "-";
        var isOver1MB = fileByteSize > 1024 * 1024;
        var isOver1KB = fileByteSize > 1024;
        if (isOver1MB) return (Math.round((fileByteSize / (1024 * 1024) * 100)) / 100.0) + " MB";
        if (isOver1KB) return (Math.round((fileByteSize / (1024) * 100)) / 100.0) + " KB";
        return fileByteSize + " B";
    }

    function getFileNameAndExtension(fullName) {
        if (!fullName) return {NAME: "", EXT: ""}
        var startIndex = fullName.lastIndexOf(".");
        var lastIndex = fullName.length;
        var fileName = startIndex === -1 ? fullName : fullName.substring(0, startIndex);
        var fileExt;
        try {
            fileExt = startIndex === -1 ? "" : fullName.substring(startIndex + 1, lastIndex).toLowerCase();
        } catch (e) {
            fileExt = "";
        }
        return {NAME: fileName, EXT: fileExt}
    }

    function getIconClassNameByExt(randKey, ext) {
        return checkAndConvertDriveExtClass(randKey, getStandardExtension(ext));
    }

    function getIconClassNameByFullName(randKey, nameExt) {
        return checkAndConvertDriveExtClass(randKey, getStandardExtension(getFileNameAndExtension(nameExt).EXT));
    }

    function checkAndConvertDriveExtClass(randKey, extensionClass) {
        return (randKey === "CLOUD" ? "cloud" :
            randKey === "GOOGLEDRIVE" ? "google-drive" :
                randKey === "DROPBOX" ? "dropbox" :
                    extensionClass)
    }

    function convertDriveSize(randKey, size) {
        var returnValue;
        if (randKey === "GOOGLEDRIVE") {
            returnValue = i18next.t('front.fileUtil.fileFrom', {val: "Google Drive"})
        } else if (randKey === "DROPBOX") {
            returnValue = i18next.t('front.fileUtil.fileFrom', {val: "Dropbox"})
        } else {
            returnValue = size;
        }
        return returnValue;
    }

    function getStandardExtension(ext) {
        if (Often.null2Void(ext) === "") return "ETC";
        var EXTENSION = {
            DEFAULT: ['default'],
            CLOUD: ['googleDrive', 'dropbox'],
            PDF: ['pdf'],
            WORD: ['doc', 'docx'],
            EXCEL: ['xlsx', 'xlsm', 'xlsb', 'xltx', 'xltxm', 'xls', 'xlt', 'xls', 'xlam'],
            HWP: ['hwp'],
            PPT: ['ppt', 'pptx'],
            IMAGE: ['png', 'jpeg', 'jpg', 'bmp', 'rle', 'gif', 'pddv', 'tif', 'tiff', 'raw', 'al', 'eps', 'svg', 'svgz',
                'iff', 'fpxv', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst'],
            MEDIA: ['avi', 'mpg', 'mpeg', 'mpe', 'wmv', 'asf', 'asx', 'flv', 'rm', 'mov', 'dat', 'mpeg1', 'mpeg2', 'mpeg4',
                'mp3', 'mp4', 'ogg', 'wma', 'wav', 'au', 'rm', 'mid'],
            HTML: ['html'],
            AUTOCAD: ['dwgc', 'dws', 'dxf', 'dwt', 'plt', 'lsp'],
            ZIP: ['alz', 'ace', 'arc', 'arj', 'b64', 'bh', 'bhx', 'bin', 'bz2', 'cab', 'ear', 'enc', 'gz', 'ha', 'hqx',
                'ice', 'img', 'jar', 'lha', 'lzh', 'mim', 'pak', 'rar', 'sit', 'tar', 'tgz', 'uue', 'war', 'xxe', 'z',
                'zip', 'zoo', '001'],
            //Todo. 필터없음
            TXT: ['txt'],
            PSD: ['psd'],
            AI: ['ai'],
        }
        var returnKey;
        for (var key in EXTENSION) {
            if (EXTENSION[key].join('|').indexOf(ext.toLowerCase()) > -1) {
                returnKey = key;
            }
        }
        return Often.null2Void(returnKey, "ETC").toLowerCase();
    }

    function checkViewerExtension(fileName) {
        var DOC_EXTENSION = ["DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX", "PDF", "TXT", "GIF", "PNG", "TIF", "TIFF", "JPG", "JPEG", "BMP", "EML", "HWP", "MSG", "HTML"];
        var tempExtension = $.trim(fileName.split(".").pop());
        var extension = tempExtension.toUpperCase();
        var isDocViewerExtension = DOC_EXTENSION.indexOf(extension) > -1;
        return isDocViewerExtension;
    }

    function initSetting() {
        setFileExtensionBlockList();
        setFileLimitSize();
    }

    function setFileLimitSize() {
        if (!Often.isFunc(Func.CLOUD.AD_FILE_UPLOAD)) return;
        Ajax.executeApi(RestApi.GET.COLABO2_FILESIZE_CONF_R001, {
            PTL_ID: _PTL_ID,
            CHNL_ID: _CHNL_ID,
            USE_INTT_ID: _USE_INTT_ID,
        }, function (dat) {
            LocalUtil.setLocalJson("ONLY_FILE_LIMIT_SIZE", {
                WEB_PROJ_SIZE: Often.null2Void(dat.WEB_PROJ_SIZE, "0"),
                WEB_CHAT_SIZE: Often.null2Void(dat.WEB_CHAT_SIZE, "0"),
                MB_PROJ_SIZE: Often.null2Void(dat.MB_PROJ_SIZE, "0"),
                MB_CHAT_SIZE: Often.null2Void(dat.MB_CHAT_SIZE, "0"),
            });
        })
    }

    function isAvailableFileSize(size) {

        var DEFAULT_MAX_SIZE = 524288000; //500MB
        var GUEST_LIMIT_SIZE = 10485760; //10MB

        var buyCode = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "BUY_YN");
        var sizeNumber = Number(size);
        var DB_LIMIT_SIZE = Number(LocalUtil.getLocalValue("ONLY_FILE_LIMIT_SIZE", "WEB_" + (Often.isAct("main") ? "PROJ" : "CHAT") + "_SIZE"));
        var isUpgradePopup = false;

        var currentLimitSize;
        if (Often.isFunc(Func.CLOUD.AD_FILE_UPLOAD) && !isNaN(DB_LIMIT_SIZE) && DB_LIMIT_SIZE > 0) currentLimitSize = (DB_LIMIT_SIZE * 1024 * 1024);
        else if (ServerChecker.isZoomok) currentLimitSize = Zoomok.get("FILE_LIMIT_SIZE_B");
        else if (ServerChecker.isHyundaicar) currentLimitSize = Hyundaicar.get("FILE_LIMIT_SIZE_B");
        else if (ServerChecker.isDbfi) currentLimitSize = Dbfi.get("FILE_LIMIT_SIZE_B");
        else if (ServerChecker.isBgf) currentLimitSize = Bgf.get("FILE_LIMIT_SIZE_B");
        else if (buyCode !== BuyCode.FREE) currentLimitSize = DEFAULT_MAX_SIZE;
        else {
            isUpgradePopup = true;
            currentLimitSize = ServerChecker.isKyungrinara ? Kyungrinara.get("FILE_GUEST_LIMIT_SIZE_B") : GUEST_LIMIT_SIZE;
        }
        if (currentLimitSize === 0) currentLimitSize = DEFAULT_MAX_SIZE;
        if (sizeNumber < currentLimitSize) return false;
        if (!isUpgradePopup) {
            var inputFileSize = getFileSize(currentLimitSize);
            if (inputFileSize === '0 B') Often.toast("error", i18next.t('front.alert.adminRestriction'));
            else Often.toast("error", i18next.t('front.alert.uploadSize'));
            return true;
        }
        var limitType = "data" + (ServerChecker.isKyungrinara ? Kyungrinara.get("FILE_GUEST_LIMIT_SIZE_MB") : "10");
        LimitGuest.isLimitGuest(limitType, Often.isMessenger());
        return true;
    }

    function setFileExtensionBlockList() {
        if (!Often.isFunc(Func.CLOUD.FILE_EXTENSION_BLOCK)) return;
        //Todo. 사용처가 없어 주석해둠

        // Ajax.executeApi(RestApi.GET.COLABO2_FILE_EXTENSION_BLOCK_R001, {}, function (dat) {
        //     var returnArray = [];
        //     dat.FILE_EXTENSION_LIST.forEach(function (v) {
        //         returnArray.push(v.EXTENSION);
        //     })
        //     LocalUtil.setLocal("ONLY_EXTENSION_BLOCK_LIST", returnArray);
        // })
    }

    function isAtchAccessible(projectAuthYn, writerYn, managerYn, expryYn) {
        if (Often.null2Void(expryYn, "Y") === "Y") return false;
        if (Often.null2Void(projectAuthYn, "N") === "N") return true; // 프로젝트에 다운로드가 전체 허용이거나
        if (Often.null2Void(managerYn, "N") === "Y") return true; // 본인이 관리자거나
        if (Often.null2Void(writerYn, "Y") === "Y") return true; // 본인이 글을 섰을때 true
        return false;
    }

    function getSearchDate(dateCode) {
        var today = new Date();
        var returnJson = {
            START_DT: "",
            FNSH_DT: "",
        }
        returnJson.FNSH_DT = Tz.momentTimeZone(today, 'type12') + "999999";     // 종료날짜
        if (dateCode === "7") {
            today.setDate(today.getDate() - dateCode);
        } else if (dateCode === "99") {

        } else {
            today.setMonth(today.getMonth() - dateCode);
        }
        returnJson.START_DT = Tz.momentTimeZone(today, 'type12') + "000000";    // 시작날짜

        return returnJson;
    }

    function getAtchSrno(data) {
        var array = [];
        if (Array.isArray(data)) {
            return Often.toast("error", i18next.t('front.alert.listUnavailable'));
        } else if (typeof data === "string") {
            array = (data.split(":"));
        } else if (typeof data === "object") {
            if (Object.keys(data).length === 0) return "";
            if (!data.ATCH_SRNO) return "";
            array = (data.ATCH_SRNO.split(":"));
        }
        var isRandKeySumAtchSrno = ((array.length > 2 && (array[1].indexOf("FLOW_") > -1 || array[1].indexOf("GOOGLE") > -1 || array[1].indexOf("DROP") > -1)) || array.length === 3);
        var isTagSumAtchSrno = (array.length === 2);
        return (array[(isRandKeySumAtchSrno ? 2 : isTagSumAtchSrno ? 1 : 0)])
    }

    function getRandKey(data) {
        var array = [];
        if (Array.isArray(data)) {
            return Often.toast("error", i18next.t('front.alert.listUnavailable'));
        } else if (data && (data.RAND_KEY && data.RAND_KEY.length > 0)) {
            return data.RAND_KEY;
        } else if (data && (data.FILE_IDNT_ID && data.FILE_IDNT_ID.length > 0)) {
            return data.FILE_IDNT_ID;
        } else if (typeof data === "string") {
            array = (data.split(":"));
        } else if (typeof data === "object") {
            if (Object.keys(data).length === 0) return;
            if (!data.ATCH_SRNO) return "";
            array = (data.ATCH_SRNO.split(":"));
        }
        var isRandKeySumAtchSrno = (array.length > 1);
        return (isRandKeySumAtchSrno ? array[1] : "");
    }

    function getUseInttId(data) {
        var url1 = getUseInttIdByUrl(data.ATCH_URL);
        if (url1 !== "") return url1;
        var url2 = getUseInttIdByUrl(data.DOWNLOAD_URL);
        return url2;

        function getUseInttIdByUrl(atchUrl) {
            if (!atchUrl) return "";
            var keyword = "&USE_INTT_ID=";
            var idIndex = atchUrl.indexOf(keyword);
            if (idIndex === -1) return "";
            var nextIndex = atchUrl.indexOf("&", idIndex + 1);
            if (nextIndex === -1) {
                return atchUrl.substring(idIndex + keyword.length);
            } else {
                return atchUrl.substring(idIndex + keyword.length, nextIndex);
            }
        }
    }

    function isFolder(fileName) {
        var isFolder = fileName.indexOf(".") == "-1";
        if (isFolder) Often.toast("error", i18next.t('front.alert.uploadFolder'));
        return isFolder;
    }

})()

function isLimitOnMultiUpload(fileCount, isTry) {
    if (isTry && fileCount > 30) {
        Often.toast("info", "한번에 30개까지 보낼 수 있습니다");
        return true;
    }
    return false;
}