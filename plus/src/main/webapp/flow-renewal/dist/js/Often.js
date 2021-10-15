const Often = (function () {

    const toast = (type, msg) => PopupDraw.drawToast({type, msg})
    const getLocOrigin = () => location.protocol + "//" + location.host;
    const isAct = (key) => location.pathname.includes(key);
    const isCookieExist = (value) => document.cookie.includes(null2Void(value));
    const isMadras = () => _USE_INTT_ID === "UTLZ_1608261809693"
    const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return {
        toast, getLocOrigin, isAct, isCookieExist, isMadras, numberWithCommas,

        //cookie
        getCookie,
        setCookie,

        local2session,
        session2local,

        //only-get
        getDeviceJson,
        getIEVersion,
        getClientOSInfo,
        getUUID,
        getRandomDeviceId,
        getJsonToParse,
        getDateFormat,
        getAttrs,

        //convert
        null2Void,
        undefined2Obj,

        //isBoolean
        isFunc,
        isServerModeByHost,
        isBrowser,
        isMessenger,
        isDeadlineExceeded,
        isSameDay,

        //etc
        submitForm,

        clog,
        elog,
        copyUrl,
        tryLogout,
        logoutDirect,
        diffSeconds,
        showOrHideByFunc,

    }

    function local2session() {
        if (!isAct("main") && !isAct("miniMain")) return;
        Object.keys(localStorage).forEach(v => {
            if (v.indexOf(_TAB_ID) === -1) return;
            sessionStorage[v] = localStorage.getItem(v);
            localStorage.removeItem(v);
        });
    }

    function session2local() {
        if (!isAct("main") && !isAct("miniMain")) return;
        Object.keys(sessionStorage).forEach(v => {
            if (v.indexOf(_TAB_ID) === -1) return;
            localStorage.setItem(v, sessionStorage[v]);
            sessionStorage.removeItem(v);
        });
    }


    function getClientOSInfo() {
        const ua = navigator.userAgent.toLowerCase();
        return {
            isWin: ua.indexOf("windows") > -1,
            isMac: ua.indexOf("macintosh") > -1,
            isWin7: ua.indexOf("windows nt 6.1") > -1,
            isWin8: ua.indexOf("windows nt 6.2") > -1,
            isWin10: ua.indexOf("windows nt 10.0") > -1,
        };
    }

    function isBrowser(key) {
        const lowUA = navigator.userAgent.toLowerCase();
        const browser = {
            ie6: lowUA.includes('msie 6'),
            ie7: lowUA.includes('msie 7'),
            ie8: lowUA.includes('msie 8'),
            ie9: lowUA.includes('msie 9'),
            ie10: lowUA.includes('msie 10'),
            ie11: lowUA.includes('msie 11'),
            ie: lowUA.includes('netscape') || lowUA.includes('trident') || lowUA.includes('msie'),
            edge: lowUA.includes('edge'),
            opera: !!window.opera,
            safari: lowUA.includes('safari') && !lowUA.includes('chrome'),
            safari3: lowUA.includes('applewebkir/5'),
            mac: lowUA.includes('mac'),
            chrome: lowUA.includes('chrome'),
            firefox: lowUA.includes('firefox'),
            whale: lowUA.includes("whale"),
        }
        return key ? browser[key] : browser;
    }

    function getDateFormat(date, type) {
        let division;
        if (type === "HOURS") division = 60;
        else if (type === "MINUTES") division = 10;
        division && date.setMinutes(Math.ceil((date.getMinutes() / division)) * division);

        return (date.getFullYear() + '' +
            (((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '' +
            ((date.getDate() < 10) ? ("0" + date.getDate()) : (date.getDate())) + '' +
            ((date.getHours() < 10) ? ("0" + date.getHours()) : (date.getHours())) + '' +
            ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : (date.getMinutes())) + '' + "00");
    }

    function getIEVersion() {
        let word;
        let version = "N/A";
        const agent = navigator.userAgent.toLowerCase();
        const name = navigator.appName;
        if (name === "Microsoft Internet Explorer") word = "msie ";
        else if (agent.search("trident") > -1) word = "trident/.*rv:";
        else if (agent.search("edge/") > -1) word = "edge/";
        const reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
        if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;
        return version;
    }

    function isFunc(nm) {
        const funcList = LocalUtil.getLocal("ONLY_FUNC_LIST");
        return (null2Void(funcList).length > 0) && ("" !== null2Void(nm) && ("" !== null2Void(JSON.parse(funcList)[nm])));
    }

    function diffSeconds(t1, t2) {
        const format = "YYYYMMDDHHmmss";
        const tt1 = t1 ? moment(t1, format) : moment();
        const tt2 = t2 ? moment(t2, format) : moment();
        return moment.duration(tt2.diff(tt1)).asSeconds();
    }

    function setCookie(name, value, expireDays, expireTime) {
        const todayDate = new Date();
        let strExpOpt = "", strExpDt = "";
        if (null2Void(expireDays) !== "" || null2Void(expireTime) !== "") {
            expireDays ? todayDate.setDate(todayDate.getDate() + expireDays) : todayDate.setTime(todayDate.getTime() + expireTime);
            strExpOpt = "expires=";
            strExpDt = todayDate.toGMTString() + ";";
        }
        document.cookie = name + "=" + escape(value) + "; path=/; " + strExpOpt + strExpDt + ((location.protocol === "http:") ? "" : "; secure");
    }

    function getCookie(name) {
        var cookieKey = name + "=";
        var result = "";
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i][0] === " ") (cookieArr[i] = cookieArr[i].substring(1));
            if (cookieArr[i].indexOf(cookieKey) === 0) {
                result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
                return unescape(result);
            }
        }
        return result;
    }

    function null2Void(value, str) {
        return null2Type(value, str, "string");
    }

    function undefined2Obj(value, obj) {
        return null2Type(value, obj, "object");
    }

    function null2Type(value, str, type) {
        if (value == null || value === "" || typeof (value) === undefined || value === "null" || value === "undefined" || value === undefined) {
            return (typeof (str) === type) ? str : "";
        }
        return value;
    }

    function clog(a, b, c, d, e, f, g) {
        if (!isServerModeByHost("DEV_TEST")) return;
        console.log('console', a, b, c, d, e, f, g);
    }

    function elog(a, b, c, d, e, f, g) {
        console.log('error', a, b, c, d, e, f, g);
    }

    function isServerModeByHost(serverMode = "DEV_TEST") {
        const lHost = location.host;
        const isReal = () => lHost.includes("flow.team") && !isRealTest() && !isDevTest() && !isSpecialSubDom();
        const isSpecialSubDom = () => lHost.includes("seco.flow.team") || lHost.includes("zoomok.flow.team");
        const isRealTest = () => lHost.includes("develop.flow.team") || lHost.includes("staging.flow.team")
        const isDevTest = () => lHost.includes("localhost") || lHost.includes("flowdev.info") || lHost.includes("flowteam.info") || lHost.includes("flowtest.info")
        return {
            "REAL": isReal(),
            "ALL_TEST": (isRealTest() || isDevTest()),
            "REAL_TEST": isRealTest(),
            "DEV_TEST": isDevTest(),
        } [serverMode]
    }

    function getDeviceJson(clientIp) {
        const mobileFlag = /Mobile|iP(hone|od)|Windows (CE|Phone)|Minimo|Opera M(obi|ini)|BlackBerry|Nokia/;
        const isMobile = navigator.userAgent.match(mobileFlag) && !navigator.userAgent.match(/iPad/);
        const isTablet = navigator.userAgent.match(/iPad|Android/);
        const deviceNm = Electron.isElectronApp() ? "DESKTOP" : isMobile ? "MWEB" : isTablet ? "TABLET" : "PC_" + getAgentName();
        let deviceId = LocalUtil.getDeviceId();
        deviceId = ("" !== deviceId) ? deviceId :
            (ServerChecker.isMobis && Mobis.isInnerIp(clientIp)) ? clientIp : getRandomDeviceId();

        LocalUtil.setLocal("ONLY_DEVICE_ID", deviceId);
        LocalUtil.setLocal("ONLY_DEVICE_NM", deviceNm + "_" + deviceId);

        return {
            "DUID": deviceId,
            "DUID_NM": deviceNm + "_" + deviceId,
        }

        function getAgentName() {
            const agent = navigator.userAgent.toLowerCase();
            if (agent.includes("chrome")) return "CHROME";
            if (agent.includes("opera")) return "OPERA";
            if (agent.includes("firefox")) return "FIREFOX";
            if (agent.includes("safari")) return "SAFARI";
            else return "IE";
        }
    }

    function getRandomDeviceId() {
        return Math.round(Math.random() * 1000000) + "-" + Math.round(Math.random() * 1000) + "-"
            + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000000);
    }

    function submitForm(id, url, target, dataJson, attrJson) {
        const $tempForm = $("<form></form>").attr($.extend({}, null2Void(attrJson, {}), {
            'id': id,
            'name': id,
            'method': dataJson && Electron.isElectronApp() ? 'get' : 'post',
            'action': url,
            'target': target
        }))

        if (dataJson) {
            for (const key in dataJson) {
                if (dataJson.hasOwnProperty(key)) {
                    const inputValue = (dataJson[key] instanceof Object) ?
                        JSON.stringify(dataJson[key]).replaceAll("\"", "\'") : dataJson[key];
                    const submitInput = $("<input>").attr($.extend({}, {
                        'type': 'hidden',
                        'name': key,
                        'value': inputValue,
                    }));
                    $tempForm.append(submitInput);
                }
            }
        }
        $('body').append($tempForm);
        $tempForm.submit();
        $tempForm.remove();
    }

    function copyUrl(url) {
        const tempUrlObj = $('<input id="tempUrlCopyInput" type="text" style="position:absolute;top:-9999em;">').val(url);
        $("body").append(tempUrlObj);
        const $tempUrlCopyInput = $("#tempUrlCopyInput");
        $tempUrlCopyInput.select();
        try {
            document.execCommand('copy');
            toast('info', i18next.t('front.alert.copiedToClipboard'));
            $tempUrlCopyInput.remove();
        } catch (err) {
            toast('error', i18next.t('front.alert.errorTryAgain'));
            $tempUrlCopyInput.remove();
        }
    }

    function getJsonToParse(inputData) {
        try {
            return JSON.parse(inputData);
        } catch (e) {
            if (Array.isArray(inputData)) return [];
            return "";
        }
    }

    function tryLogout() {
        const isElectronLoginView = Electron.isElectronApp() && (isAct('signin.act') || isAct('signIn.act'));
        if (isElectronLoginView) return;
        const isGoogleAuth = "Y" === Often.getCookie("googleLoginYn");
        $("#accountLayer").fadeOut(200);
        const confirmJson = {};
        confirmJson.contents = ({
            main: i18next.t("front.alert.logout"),
            secondarySubmit: isGoogleAuth ? "front.common.googleLogoutWarning" : "",
        })
        confirmJson.callback = {
            submit: logoutDirect,
            secondarySubmit: isGoogleAuth ? googleLogout : "",
        }
        PopupDraw.closePopup();
        PopupDraw.drawConfirm(confirmJson);
    }

    /**
     * 크롬 환경 또는 브라우저에 구글을 강제로 로그아웃 (브라우저 전체 구글 로그아웃)
     */
    function googleLogout() {
        const googleLogoutUrl = "https://accounts.google.com/Logout?continue=http://google.com";
        let newWindow;

        if (Electron.isElectronApp()) {
            newWindow = window.open(googleLogoutUrl, 'Google Logout', "top=" + screen.height + ", left=" + screen.width);
        } else {
            newWindow = window.open(googleLogoutUrl);
        }

        window.setTimeout(function () {
            newWindow.close();
            logoutDirect();
        }, 100)
    }


    function logoutDirect(isNoRedirect) {
        var isElectron = Electron.isElectronApp();
        if (Electron.isElectronApp()) {
            MiniState.sendStatusSocket(ProfileState.OFFLINE);
            MiniState.updateUserStateData(ProfileState.OFFLINE, setLogOut);
        } else {
            setLogOut();
        }

        async function setLogOut() {
            const isLogoutToLoginAct = Often.isFunc("FLOW_S_LOGOUT_ON_NEW");
            const data = await Ajax.executeApi(RestApi.GET.COLABO2_LOGOUT_R001);
            LocalUtil.removeAllLocal();
            Often.setCookie('flowLogin', '');
            setCookie("miniflowLogin", "", 30 * 12);
            setCookie("googleLoginYn", "", 30 * 12);
            if (typeof isNoRedirect === "boolean" && isNoRedirect) return;
            if (isElectron) {
                SocketControl.closeExpiredWindows(isElectron);
                Electron.logout(data);
                if (_IsMini) return;
            }
            const redirectUrl = SUB_DOM !== "" ? '/corpsignin.act' : '/signin.act'
            location.replace(isLogoutToLoginAct ? "/login.act" : null2Void(data['REDIRECT_URI'], redirectUrl));
        }
    }

    function getUUID() {
        return _USER_ID + "_" + LocalUtil.getLocalValue("ONLY_DEVICE_ID") + '_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function isMessenger() {
        if (location.href.includes("flowDrive") && typeof _RESPONSE_TYPE !== "undefined") return _RESPONSE_TYPE === "CHAT";
        if (location.href.includes("GOOGLE_DRIVE") && isAct("subscreen")) return true;
        return isAct("messenger");
    }

    function showOrHideByFunc(funcName, $element) {
        isFunc(funcName) ? $element.show() : $element.hide();
    }

    function isDeadlineExceeded(date) {
        if (null2Void(date) === "") return false;
        return Tz.momentConversion("convertOnly", "type19", date) < Tz.momentConversion("convertOnly", "type19", moment());
    }

    function isSameDay(date) {
        if (null2Void(date) === "") return false;
        return Tz.momentConversion("convertOnly", "type12", date) === Tz.momentConversion("convertOnly", "type12", moment());
    }

    function getAttrs($targetObj) {
        const objAttrArray = []
        const objLen = $targetObj.length;
        for (let len = 0; len < objLen; len++) {
            let att;
            const atts = $targetObj[len].attributes;
            const n = atts.length;
            const objJson = {};
            for (let i = 0; i < n; i++) {
                att = atts[i];
                const key = att.nodeName.toUpperCase().replace(/[-]/ig, "_");
                const isAdd = !(key === 'ID' || key === 'CLASS' || key === 'CONTENTEDITABLE' ||
                    key === 'STYLE' || key === 'DATA')
                isAdd && (objJson[key] = att.nodeValue);
            }
            objAttrArray.push(objJson);
        }
        return objAttrArray;
    }

})()

