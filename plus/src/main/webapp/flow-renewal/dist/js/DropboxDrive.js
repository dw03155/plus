var DropboxDrive = (function () {

    var successCallback;

    return {
        load: load,
        openDropboxDrive: openDropboxDrive,
        dropboxSuccessCallback: dropboxSuccessCallback,
        dropboxCancelCallback: dropboxCancelCallback,
    }

    function load() {
        $("head").append('<script async src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="mby426ffrxlv4qn"></script>');
    }

    function openDropboxDrive(_successCallback) {

        if (typeof Dropbox == "undefined" || Dropbox == null) return;

        if (!Dropbox.isBrowserSupported()) {
            Often.toast(i18next.t('front.alert.unSupportIE'));
            return;
        }

        successCallback = _successCallback;
        if (Electron.isElectronApp()) {
            Electron.openDropbox();
        } else {
            Dropbox.choose({
                success: dropboxSuccessCallback,
                cancel: dropboxCancelCallback,
                linkType: "preview",
                multiselect: true,
                extensions: ['']
            });
        }
    }

    function dropboxSuccessCallback(dropboxFiles) {
        var fileArray = [];
        var randKey = "DROPBOX";
        dropboxFiles.forEach(function (dropboxFile) {
            var tempFileName = randKey + "_" + Tz.momentConversion("currentInMilli");
            var f_info = {
                RAND_KEY: randKey,
                FILE_IDNT_ID: randKey,
                IMG_PATH: dropboxFile.link,
                FILE_DOWN_URL: dropboxFile.link,
                ATCH_URL: dropboxFile.link,
                FILE_NM: Often.null2Void(dropboxFile.name, tempFileName),
                FILE_NAME: Often.null2Void(dropboxFile.name, tempFileName),
                FILE_SIZE: Often.null2Void(dropboxFile.bytes, 0),
                USE_INTT_ID: _USE_INTT_ID,
                CLOUD_YN: "Y",
                ATCH_SRNO: "0",
            }
            fileArray.push(f_info);
        });
        (typeof successCallback === "function") && successCallback(fileArray);
    }

    function dropboxCancelCallback() {
        //pass
    }

})()