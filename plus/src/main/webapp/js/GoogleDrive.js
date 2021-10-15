var GoogleDrive = function () {

    var keyAndId = GoogleOAuth.getKey(ServerChecker.isReal);
    var clientId = keyAndId.clientId;
    var appId = keyAndId.appId;
    var pickerApiLoaded = false;
    var oauthToken;
    var loadCallback;
    var successCallback;

    return {
        load: load,
        openGoogleDrive: openGoogleDrive,
        OpenPickerAfterSign: OpenPickerAfterSign,
    }

    function load() {
        $("head").append('<script async src="https://apis.google.com/js/platform.js?google-drive"></script>');
    }

    function openGoogleDrive(_loadCallback, _successCallback) {
        if (typeof gapi == "undefined" || gapi == null) return;
        if (parseInt(Often.getIEVersion(), 10) < 9) {
            Often.toast("error", i18next.t('front.alert.unSupportIE'));
            return
        }
        loadCallback = _loadCallback;
        successCallback = _successCallback;
        gapi.load('auth', {callback: onAuthApiLoad});
        gapi.load('picker', {callback: onPickerApiLoad});
    }

    function onAuthApiLoad() {
        gapi.auth.authorize({
            client_id: clientId,
            scope: GoogleOAuth.getScope("Drive"),
            immediate: true,
            cookie_policy: 'none'
        }, handleAuthResult);
    }

    function onPickerApiLoadForOnlyPicker() {
        onPickerApiLoad();
        createPicker();
    }

    function onPickerApiLoad() {
        pickerApiLoaded = true;
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createPicker();
        } else {
            Often.isMessenger() ? loadGoogleSignInDriveApi() : showAuthConfirm();
        }
    }

    function showAuthConfirm() {
        PopupDraw.drawConfirm({
            contents: {main: i18next.t('front.alert.googleLoginRequired')},
            callback: {submit: loadGoogleSignInDriveApi}
        })
    }

    function loadGoogleSignInDriveApi() {
        new GoogleSignInDriveApi(OpenPickerAfterSign).load();
    }

    function OpenPickerAfterSign(token) {
        oauthToken = token;
        gapi.load('picker', {callback: onPickerApiLoadForOnlyPicker});
    }

    function createPicker() {
        if (!(pickerApiLoaded && oauthToken)) return;
        var lang = Often.null2Void(Often.getCookie("FLOW_LANG"), "ko");
        var docsView = new google.picker.DocsView(google.picker.ViewId.DOCS).setIncludeFolders(true).setOwnedByMe(true);
        var picker = new google.picker.PickerBuilder()
            .disableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .setOrigin(Often.getLocOrigin())
            .setLocale(lang)
            .addView(docsView)
            .addView(google.picker.ViewId.DOCUMENTS)
            .addView(google.picker.ViewId.SPREADSHEETS)
            .addView(google.picker.ViewId.PRESENTATIONS)
            .addView(google.picker.ViewId.PDFS)
            .addView(google.picker.ViewId.DOCS_IMAGES)
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
        $(".picker-dialog").css('z-index', '99999');
        (typeof loadCallback === "function") && loadCallback();
    }

    function pickerCallback(data) {
        if (data.action !== google.picker.Action.PICKED) return;
        var fileArray = [];
        var randKey = "GOOGLEDRIVE";
        data.docs.forEach(function (googleDriveFile) {
            var googleDocsExt = "";
            //Note. 구글독스는 확장자를 표시할 수도 있으나 과거 데이터와 싱크 문제가 있어 잠시 보류
            // var googleDocsExt = googleDriveFile.serviceId === "pres" ? ".presentation" :
            //     googleDriveFile.serviceId === "doc" ? ".doc" :
            //         googleDriveFile.serviceId === "freebird" ? ".form" :
            //             googleDriveFile.serviceId === "spread" ? ".spreadsheet" : "";
            var tempFileName = randKey + "_" + Tz.momentConversion('currentInMilli');
            var fileName = Often.null2Void(googleDriveFile.name, tempFileName) + googleDocsExt;
            var f_info = {
                RAND_KEY: randKey,
                FILE_IDNT_ID: randKey,
                ATCH_URL: googleDriveFile.url,
                IMG_PATH: googleDriveFile.url,
                FILE_DOWN_URL: googleDriveFile.url,
                FILE_NM: fileName,
                FILE_NAME: fileName,
                FILE_SIZE: Often.null2Void(googleDriveFile.sizeBytes, 0),
                CLOUD_YN: "Y",
                ATCH_SRNO: "0",
                USE_INTT_ID: _USE_INTT_ID,
            };
            fileArray.push(f_info);
        });
        (typeof successCallback === "function") && successCallback(fileArray);
    }

}();