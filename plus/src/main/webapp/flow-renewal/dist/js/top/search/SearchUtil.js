var SearchUtil = (function () {

    var defaultPeriod = "sixthMonth"; //getStartTime 참고

    return {
        getDefaultPeriod: getDefaultPeriod,
        n2v: n2v,
        getStartTime: getStartTime,
        getEndTime: getEndTime,
    }

    function getDefaultPeriod() {
        return defaultPeriod;
    }

    function n2v(contents, defaultValue) {
        if (contents === "null" || contents === "undefined") return contents;
        return $.trim(Often.null2Void(contents, defaultValue));
    }

    function getStartTime(code, type) {
        type = type || "type17";
        var startDateTime = {
            unlimit: Tz.momentTimeZone(moment().add(-10, 'years'), type),
            today: Tz.momentTimeZone(moment(), type),
            week: Tz.momentTimeZone(moment().add(-7, 'days'), type),
            month: Tz.momentTimeZone(moment().add(-1, 'month'), type),
            thirdMonth: Tz.momentTimeZone(moment().add(-3, 'month'), type),
            sixthMonth: Tz.momentTimeZone(moment().add(-6, 'month'), type),
            year: Tz.momentTimeZone(moment().add(-1, 'years'), type),
        }
        return startDateTime[code];
    }

    function getEndTime(type) {
        type = type || "type18";
        return Tz.momentTimeZone(moment(), type);
    }

})()

var defaultPeriod = SearchUtil.getDefaultPeriod();

function n2v(contents, defaultValue) {
    return SearchUtil.n2v(contents, defaultValue);
}

function getStartTime(code, type) {
    return SearchUtil.getStartTime(code, type);
}

function getEndTime(type) {
    return SearchUtil.getEndTime(type);
}