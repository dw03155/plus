var SentryMonitor = (function () {

    return {
        init: init,
        setExtra: setExtra,
        captureException: captureException,
    };

    function init() {
        $("head").append('<script src="https://browser.sentry-cdn.com/6.13.2/bundle.tracing.min.js" integrity="sha384-XuDodOP4mgLWA8eRlqZJWs+mtmznHF6ES/nOotK0fE7SHjj0Ec3YMVIzjh5ytsKH" crossorigin="anonymous"></script>');

        setTimeout(function () {
            if (typeof Sentry === "undefined") return;
            Sentry.init({
                dsn: "https://53d44c5b820c4c7589f8a33bf6fdeec3@o292402.ingest.sentry.io/1535742",
                release: "my-project-name@2.3.12",
                integrations: [new Sentry.Integrations.BrowserTracing()], // Vue 설정
                tracingOptions: { // 하위 구성 요소를 추적하고 렌더링 프로세스에 대한 자세한 내용을 보기
                    trackComponents: true,
                },
                attachProps: true, // 로깅을 위해 모든 Vue 구성 요소의 props를 보기
                tracesSampleRate: 1.0,
            });
            try {
                Sentry.setExtra("USER_INFO", {
                    _USER_ID: _USER_ID,
                    _USER_NM: _USER_NM,
                    _USE_INTT_ID: _USE_INTT_ID,
                    _USE_INTT_NM: _USE_INTT_NM,
                    _CLIENT_IP: _CLIENT_IP,
                });
            } catch (e) {

            }
        }, 500)
    }

    function setExtra(key, val) {
        if (typeof Sentry === "undefined") return;
        Sentry.setExtra(key, val);
    }

    function captureException(message) {
        if (typeof Sentry === "undefined") return;
        Sentry.captureException(message)
    }

})();
