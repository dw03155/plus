var KaKaoPixel = (function () {

    return {
        load: load
    }

    function load() {

        try {
            $.getScript("/flow-renewal/js/lib/kakaoPixel/kakaoPixel.min.js", function (data, textStatus, jqxhr) {
                if (jqxhr.status !== 200) return;
                kakaoPixel('6501044944766874017').pageView();
                kakaoPixel('6501044944766874017').completeRegistration();
            });
        } catch (e) {
            console.log('카카오픽셀 추적을 활용하지않습니다.');
        }

        //<script async src="/flow-renewal/js/lib/kakaoPixel/kakaoPixel.min.js?<%=version%>"></script>
    }

})()