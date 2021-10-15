var DaumTracking = (function () {

    return {
        load: load
    }

    function load() {
        //다음
        var DaumConversionDctSv = "type=M,orderID=,amount=";
        var DaumConversionAccountID = "vm23n-obXlpSYtOySbWDtA00";
        if (typeof DaumConversionScriptLoaded == "undefined" && location.protocol !== "file:") {
            var DaumConversionScriptLoaded = true;
            $("head").append('<script type="text/javascript" src="https://t1.daumcdn.net/cssjs/common/cts/vr200/dcts.js"></script>');
        }
    }

})()