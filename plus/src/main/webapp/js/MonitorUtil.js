var MonitorUtil = (function () {

    return {
        load: load
    }

    function load() {
        if (_INNER_NETWORK_YN === "Y") return;
        if (Often.isServerModeByHost("REAL") || Often.isServerModeByHost("REAL_TEST")) {
            if (Often.isFunc(Func.CLOUD.SENTRY_MONITOR)) SentryMonitor.init();
            KaKaoPixel.load();
            GoogleAnalytics.load();
            DaumTracking.load();
        }
    }

})()