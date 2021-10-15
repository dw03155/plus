var LocalUtil = (function () {

    return {
        getLocal: getLocal,
        setLocal: setLocal,
        getLocalValue: getLocalValue,
        setLocalValue: setLocalValue,
        getLocalJson: getLocalJson,
        setLocalJson: setLocalJson,
        removeLocal: removeLocal,
        removeAllLocal: removeAllLocal,
        getSubPath: function () {
            return Often.null2Void(getLocal("SUB_PATH"), "main");
        },
        getDeviceId: function () {
            return Often.null2Void(getLocal("ONLY_DEVICE_ID"), "")
        },
        getDesktopNotiPopup: function () {
            return Often.null2Void(getLocal("ONLY_DESKTOP_NOTI_POPUP"), "Y");
        },
        getAlarmSearchFilter: function () {
            return Often.null2Void(getLocal("ALARM_SEARCH_FILTER"), "0,1,2,");
        },
        getVideoConference: function () {
            return Often.null2Void(getLocal("ONLY_VIDEO_CONFERENCE"), "N");
        },
        getTaskFilter: function () {
            return Often.null2Void(getLocal("TASK_FILTER"), "ON");
        },
        getElectronYn: function () {
            return Often.null2Void(getLocal("ONLY_ELECTRON_YN"), "N");
        },
        getFeedType: function () {
            return Often.null2Void(getLocal("FEED_TYPE"), "card");
        },
        getFileSetting: function () {
            return Often.null2Void(getLocal("FILE_SETTING"), "list");
        },
        getFileFilter: function () {
            return Often.null2Void(getLocal("FILE_FILTER"), "ON");
        },
        getAutoLogin: function () {
            return Often.null2Void(getLocal("ONLY_AUTO_LOGIN_YN"), "N");
        },
        getProjectFilter: function () {
            return Often.null2Void(getLocal("ONLY_PROJECT_FILTER"), "0");
        },
        getProjectOrder: function () {
            return Often.null2Void(getLocal("ONLY_PROJECT_ORDER"), "0");
        },
        getProjectOpenYn: function () {
            return Often.null2Void(getLocalValue("CURRENT_PROJECT_SETTING", "OPEN_YN"), "N");
        },
        getProjectHiddenYn: function () {
            return Often.null2Void(getLocalValue("CURRENT_PROJECT_SETTING", "HIDDEN_YN"), "N");
        },
        getProjectManagerYn: function () {
            var key = $("#postPopup").is(":visible") ? "POP" : "CURRENT";
            return Often.null2Void(getLocalValue(key + "_PROJECT_SETTING", "MNGR_DSNC"), "N");
        },
        getProjectSrchAuthYn: function () {
            var key = $("#postPopup").is(":visible") ? "POP" : "CURRENT";
            return Often.null2Void(getLocalValue(key + "_PROJECT_SETTING", "SRCH_AUTH_YN"), "N");
        },
        getProjectBgColorCd: function () {
            return Often.null2Void(getLocalValue("CURRENT_PROJECT_SETTING", "BG_COLOR_CD"), "0");
        },
        getPopProjectBgColorCd: function () {
            return Often.null2Void(getLocalValue("POP_PROJECT_SETTING", "BG_COLOR_CD"), "0");
        },
        getBuyManger: function () {
            return Often.null2Void(getLocalValue("ONLY_BUY_SETTING", "MNGR_DSNC"), "N");
        },
        getBuyGrcDt: function () {
            return Often.null2Void(getLocalValue("ONLY_BUY_SETTING", "GRC_DT"), "7");
        },
        getBuyPrjMkLmtYn: function () {
            return Often.null2Void(getLocalValue("ONLY_BUY_SETTING", "PRJ_MK_LMT_YN"), "N");
        },
        getSerpYn: function () {
            return Often.null2Void(getLocalValue("ONLY_BUY_SETTING", "SERP_YN"), "N");
        },
        getLeftFoldCollectYn: function () {
            return Often.null2Void(Often.null2Void(getLocalJson("ONLY_LEFT_FOLD_SETTING")).COLLECT, "Y")
        },
        getLeftFoldRecentYn: function () {
            return Often.null2Void(Often.null2Void(getLocalJson("ONLY_LEFT_FOLD_SETTING")).RECENT, "Y")
        },
        getLeftFoldLabelYn: function () {
            return Often.null2Void(Often.null2Void(getLocalJson("ONLY_LEFT_FOLD_SETTING")).LABEL, "Y")
        },
    };

    //같은 계정으로 두 가지 탭을 켜는 경우에 발생할 수 있는 이슈를 해결하기 위함
    function convertKeyByTabId(k) {
        if (k.indexOf("ONLY_") === 0) return "N_" + k; //같은 계정이라면 하나만 보관
        return "N_" + k + "_" + _TAB_ID; //같은 계정이라도 탭 별로 정보를 달리 보관
    }

    function setLocal(k, v) {
        localStorage.setItem(convertKeyByTabId(k), v);
    }

    function getLocal(k) {
        return localStorage.getItem(convertKeyByTabId(k));
    }

    function setLocalJson(k, json) {
        localStorage.setItem(convertKeyByTabId(k), JSON.stringify(json));
    }

    function getLocalJson(k) {
        return getLocalValue(k);
    }

    function setLocalValue(k, key, value) {
        try {
            var tempJson = $.extend({}, JSON.parse(getLocal(k)));
            tempJson[key] = value;
            setLocal(k, JSON.stringify(tempJson));
        } catch (e) {
            //pass
        }
    }

    function getLocalValue(k, key) {
        try {
            if (key) {
                return JSON.parse(getLocal(k))[key];
            } else {
                return JSON.parse(getLocal(k));
            }
        } catch (e) {
            return Often.null2Void(getLocal(k));
        }
    }

    function removeLocal(k) {
        localStorage.removeItem(convertKeyByTabId(k));
    }

    function removeAllLocal() {
        Object.keys(localStorage).forEach(function (key) {
            localStorage.removeItem(key);
        });
    }

})();
