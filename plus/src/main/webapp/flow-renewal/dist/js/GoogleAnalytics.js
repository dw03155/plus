var GoogleAnalytics = (function () {

    return {
        load: load
    }

    function load() {
        try {
            //구글애널리틱스 - 운영 : GTM-PJMHRLW , 개발 : GTM-5rwln3j
            (function (a, s, y, n, c, h, i) {
                s.className += ' ' + y;
                h.end = i = function () {
                    s.className = s.className.replace(RegExp(' ?' + y), '')
                };
                (a[n] = a[n] || []).hide = h;
                setTimeout(function () {
                    i();
                    h.end = null
                }, c);
            })(window, document.documentElement, 'async-hide', 'dataLayer', 4000, {'GTM-PJMHRLW': true});
        } catch (e) {
            console.log('구글애널리틱스 추적을 활용하지않습니다.');
        }
    }

})()
