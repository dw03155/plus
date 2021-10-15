var DocViewer = (function () {

    return {
        openDocViewer: openDocViewer,
    }

    function openDocViewer(fileJson) {
        if (!fileJson || fileJson.length === 0) return false;
        var fileJsonData = fileJson[0];
        FileUtil.checkFileOnServer(fileJson, "DOC-VIEWER",function (fileData) {
            var fileId = fileJsonData.RAND_KEY + "_" + fileJsonData.ATCH_SRNO;
            var docViewerData = Often.null2Void(fileData[0], {});
            var viewerUrl = Often.null2Void(docViewerData.VIEWER_URL);
            if ("" === viewerUrl || "null" === viewerUrl) return Often.toast("error", docViewerData.ERR_MSG);
            var filePath = replaceUrlHttps(docViewerData.FILE_PATH);
            var fileDownUrl = Often.null2Void(docViewerData.FILE_DOWN_URL);
            var tempJson = fileDownUrl === "" ? {} : {downloadUrl: fileDownUrl}
            Often.submitForm("viewer_form", viewerUrl, fileId, $.extend(tempJson, {
                fid: fileId,
                filePath: filePath,
                fileName: FileUtil.getFileName(fileJsonData),
                userId: _USER_ID,
            }));
        });
    }

    function replaceUrlHttps(fileUrl) {
        var flowFileIndex = fileUrl.indexOf("/FLOW_DOWNLOAD_R001.act");
        var locationOrigin = Often.getLocOrigin();
        var isLocal = (locationOrigin.indexOf("localhost") > -1);
        if (flowFileIndex === -1) return fileUrl;
        if (isLocal) {
            //return "https://flowtest.info/" + fileUrl.substr(flowFileIndex)
            return "http://localhost:8080" + fileUrl.substr(flowFileIndex)
        } else {
            return locationOrigin + "/" + fileUrl.substr(flowFileIndex)
        }
    }

})();