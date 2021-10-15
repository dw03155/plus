var Kyungrinara = (function () {

    return {
        get: get,
        getVersionName: getVersionName,
    }

    function get(key) {
        return {
            FILE_GUEST_LIMIT_SIZE_B: 52428800,
            FILE_GUEST_LIMIT_SIZE_MB: 50,
        }[key];
    }

    function getVersionName(isGuest) {
        return i18next.t('front.company.kungrinaraVersion', {
            version: isGuest ? '$t(dictionary.free)' : '$t(dictionary.premium)'
        })
    }

})()