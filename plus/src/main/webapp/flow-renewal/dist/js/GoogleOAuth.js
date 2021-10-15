
var GoogleOAuth = (function () {

    return {
        logoutSecurity: logoutSecurity,
        getKey: getKey,
        getScope: getScope,
        getRedirectUri: getRedirectUri,
        isUsable: isUsable,
    }

    function logoutSecurity(callback) {
        var isElectron = Electron.isElectronApp();
        var initUrl = "https://accounts.google.com/Logout?continue=http://google.com";
        var tempWindow;
        if (isElectron) {
            tempWindow = window.open(initUrl, '_blank', "top=" + screen.height + ", left=" + screen.width);
        } else {
            tempWindow = window.open(initUrl);
        }
        var timer = setTimeout(function () {
            tempWindow.close();
            (typeof callback === 'function') && callback();
            clearTimeout(timer);
        }, 1000);
    }

    function getKey(isReal) {
        var appId = '37387137807';
        var developerKey = 'HddwNpZ_0QQclS7AGTJMGrhT';
        var clientId = '37387137807-39m3vmoo1o6ktlm4k0d1cmajamm2gkhi.apps.googleusercontent.com';
        var devDeveloperKey = 'JaoC4XDgXDBa5jWmiyyjEca7';
        var devClientId = '37387137807-6kmhqldqos2op49mrfaofapt4pl71101.apps.googleusercontent.com';
        return {
            'developerKey': isReal ? developerKey : devDeveloperKey,
            'clientId': isReal ? clientId : devClientId,
            'appId': appId
        }
    }

    function getScope(apiKey) {
        return "https://www.googleapis.com/auth/" + (apiKey === "SignIn" ? "userinfo.profile" : "drive");
    }

    function getRedirectUri(apiKey) {
        return Often.getLocOrigin() + "/collabo/inc/google" + apiKey + "_view.jsp";
    }

    function isUsable() {
        if (parseInt(Often.getIEVersion(), 10) < 9) {
            Often.toast('error', i18next.t('front.alert.unSupportIE'));
            return false; 
        } else {
            return true;
        }
    }

})()