var ThirdPartyUtil = (function () {

    return {
        load: load,
    }

    /**
     * @param {string} mode - main, messenger
     */
    function load(mode) {
        if (_INNER_NETWORK_YN === "Y") return;
        if (Often.isServerModeByHost("REAL") || Often.isServerModeByHost("REAL_TEST")) {
            GoogleDrive.load();
            DropboxDrive.load();
            if (mode === "main") {
                GoogleMap.load();
            }
        }
    }

})()