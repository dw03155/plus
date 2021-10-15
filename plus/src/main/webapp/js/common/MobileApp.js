var MobileApp = (function () {

    var mobileSchemeJson = {
        "N": "bizplaycollabo",
        "Y": "bizplaycollaboent", //엔터
        "G": "bizplaycollabogtalk", //지톡
        "J": "joinsflow", //조인스
        "K": "ktworks", //케이티
    }

    var appStoreJson = {
        "N": "https://itunes.apple.com/kr/app/%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%89%AC%EC%9A%B4-%ED%98%91%EC%97%85%ED%88%B4/id939143477?mt=8",
        "Y": "https://itunes.apple.com/kr/app/kollabo-hyeob-eob!-ijebuteo/id1280834744?l=ko&ls=1&mt=8", //엔터
        "G": "https://itunes.apple.com/kr/app/gtalk-%EC%A7%80%ED%86%A1/id1334605799?mt=8", //지톡
        "J": "https://apps.apple.com/kr/app/id1484802560", //조인스
        "K": "https://apps.apple.com/us/app/id1530166948", //케이티
    }

    var playStoreJson = {
        "N": "com.webcash.bizplay.collabo",
        "Y": "team.flow.flowEnt", //엔터
        "G": "team.flow.GTalkEnt", //지톡
        "J": "com.joins.flow2", //조인스
        "K": "team.flow.ktflow", //케이티
    }

    return {
        executeApp: executeApp,
        goAppStoreOrPlayStore: goAppStoreOrPlayStore,
        goPostByTinyUrl: goPostByTinyUrl,
    }

    function executeApp(json, enterCode) {
        enterCode = enterCode || _ENTER_YN;
        location.href = makeQueryString(mobileSchemeJson[enterCode] + "://open", json);
    }

    function goAppStoreOrPlayStore(gb, enterCode) {
        gb = gb || GUBUN;
        enterCode = enterCode || _ENTER_YN;

        if ("IPHONE" === gb || "IPAD" === gb) return location.href = appStoreJson[enterCode];
        location.href = makeQueryString("market://details", {
            id: playStoreJson[enterCode],
            referer: INVT_KEY,
        });
    }

    function makeQueryString(url, json) {
        var returnUrl = url;
        var i = 0;
        for (var key in json) {
            returnUrl += (i === 0 ? "?" : "&") + n2v(key) + "=" + n2v(json[key]);
            i++;
        }
        return returnUrl;
    }

    function goPostByTinyUrl(_tinyUrl) {
        if (_tinyUrl === "") return;
        var tinyUrlArr = _tinyUrl.split("/");
        var projectSrno = n2v(tinyUrlArr.length > 1 ? tinyUrlArr[1] : "");
        var postSrno = n2v(tinyUrlArr.length > 2 ? tinyUrlArr[2] : "");
        executeApp({
            colabo_srno: projectSrno,
            colabo_commt_srno: postSrno,
        })
    }

    function n2v(value, str) {
        if (value == null || value === "" || typeof (value) === undefined ||
            value === "null" || value === "undefined" || value === undefined) {
            return (typeof (str) == "string") ? str : "";
        } else {
            return value;
        }
    }

})()