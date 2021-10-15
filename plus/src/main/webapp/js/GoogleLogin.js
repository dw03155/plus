var GoogleLogin = (function () {

    var googleSignIn = null;
    var isElectron;

    return {
        clickGoogleLoginButton: clickGoogleLoginButton,
        googleMiniLoginCallback: googleMiniLoginCallback,
    }

    function clickGoogleLoginButton() {

        isElectron = Electron.isElectronApp();
        googleSignIn = new GoogleSignInApi(googleLoginCallback);

        if (isElectron && Electron.getVersion() < "1_0_6") {
            alert(c18n('DL163', "구글 정책 변경으로 인하여 구글 로그인은 브라우저를 통해서만 이용할 수 있습니다."));
            return;
        }

        if (isElectron) {
            googleSignIn.loadOnDesktopApp();
            return;
        }

        GoogleOAuth.isUsable() && googleSignIn.loadOnWebBrowser();

    }

    function googleLoginCallback(googleBasicProfile) {
        CommonLogin.goLogin({
            "USER_ID": googleBasicProfile.getEmail(),
            "ID_GB": SignCode.TYPE.GOOGLE,
            "OBJ_CNTS_NM": (isElectron ? "desktop" : ""),
            "EMAIL": googleBasicProfile.getEmail(),
            "USER_NM": googleBasicProfile.getName(),
            "PRFL_PHTG": Often.null2Void(googleBasicProfile.getImageUrl()),
        })
    }

    function googleMiniLoginCallback(token) {
        gapi.client.setToken(token);
        gapi.client.init({
            clientId: GoogleOAuth.getKey(ServerChecker.isReal).clientId,
            scope: 'profile'
        }).then(function () {
            var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
            if (profile) {
                googleLoginCallback(profile);
            } else {

            }
        });
    }

})();

var GoogleSignInDriveApi = function (loadCallback) {

    var googleUser;
    var reloadTimer;
    var auth2;

    this.load = function(){
        gapi.load('auth2', onAuthApiLoad);
    }

    function onAuthApiLoad() {

        auth2 = gapi.auth2.init(getGoogleAuthConfig());


        auth2.isSignedIn.listen(signInChanged);
        auth2.currentUser.listen(userChanged);
        if (auth2.isSignedIn.get()) {
            auth2.signIn();
        } else {
            reloadTimer = setTimeout(function () {
                gapi.auth2.getAuthInstance().signIn();
            }, 1000);
        }
        refreshValues();
    }

    function refreshValues() {
        auth2 && userChanged(auth2.currentUser.get());
    }

    function userChanged(user) {
        googleUser = user;
        user && auth2.isSignedIn.get() && clearTimeout(reloadTimer);
    }

    function signInChanged(val) {
        if (!val) return;
        var isElectron = Electron.isElectronApp();
        var accessToken = googleUser.getAuthResponse().access_token;
        if (isElectron) {
            Electron.openGoogleDrivePost(accessToken);
            return;
        }
        (typeof loadCallback === "function") && loadCallback(accessToken)
    }

    function getGoogleAuthConfig() {
        var googleAuthConfig = {
            client_id: GoogleOAuth.getKey(ServerChecker.isReal).clientId,
            scope: GoogleOAuth.getScope("Drive"),
        }
        if (Often.isMessenger()) {
            googleAuthConfig["ux_mode"] = "redirect"
            googleAuthConfig["redirect_uri"] = Often.getLocOrigin() + "/flow-renewal/view/subscreen_view.jsp?GB=GOOGLE_DRIVE"
        }
        return googleAuthConfig;
    }
}

var GoogleSignInApi = function (loginCallback) {

    var auth2;

    this.loadOnWebBrowser = function () {
        gapi.load('auth2', function () {
            auth2 = gapi.auth2.init({
                client_id: GoogleOAuth.getKey(ServerChecker.isReal).clientId,
                scope: 'profile'
            });

            auth2.signIn().then(function () {
                successSignIn(loginCallback);
                Often.setCookie("ONLY_CHATBOT_ID_LIST", "Y");
            });
        });
    }

    this.loadOnDesktopApp = function () {
        gapi.load("auth", {
            callback: onAuthApiLoad
        });
    };

    var onAuthApiLoad = function () {
        try {
            gapi.auth.authorize({
                'client_id': GoogleOAuth.getKey(ServerChecker.isReal).clientId,
                'scope': GoogleOAuth.getScope("SignIn"),
                'immediate': true
            }, handleAuthResult)
        } catch (e) {

        }
    };

    var handleAuthResult = function () {
        Often.setCookie("googleLoginYn", "Y");
        Electron.openGoogleSignIn(GoogleOAuth.getRedirectUri("SignIn"), "Google");
    };

    function successSignIn(loginCallback) {

        var isEnterLogin = $("#enterpriseLoginDiv").is(":visible");
        var isBusinessLogin = $("#businessLoginDiv").is(":visible");

        if (isBusinessLogin) return;

        var GoogleUser = auth2.currentUser.get();
        var profile = GoogleUser.getBasicProfile();
        GoogleUser.disconnect();
        signOut();
        if (isEnterLogin) {
            //entLogin.fn_goLogin("3");
        } else {
            if (typeof loginCallback === "function") {
                loginCallback(profile);
            }
        }

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then();
            auth2.disconnect();
        }

    }
};