/**
 * 구글 oauth key 가져오기
 * @param {string} serverNum
 * @param {string} devOrReal
 * @returns {object} developerKey, clientId, appId
 */
function getGoogleOAuthKey(serverNum, devOrReal) {	        

	// 플로우 웹 api
	var developerKey = 'HddwNpZ_0QQclS7AGTJMGrhT';
	var clientId = '37387137807-39m3vmoo1o6ktlm4k0d1cmajamm2gkhi.apps.googleusercontent.com';

	// 플로우 웹 api_dev
	var devDeveloperKey = 'JaoC4XDgXDBa5jWmiyyjEca7';
	var devClientId = '37387137807-6kmhqldqos2op49mrfaofapt4pl71101.apps.googleusercontent.com';
	
	// JOINS 웹 api_dev	
	var joinsDeveloperKey = 'ZK_HyMRRXwUyR61z0wotg2Hl';
	var joinsClientId = '1020012817568-qnk6lru6t13hk6mnk2v2kolrm3ih28bn.apps.googleusercontent.com';

	if (devOrReal == "DEV") {
		var appId = '37387137807';
		return {
			'developerKey': devDeveloperKey,
			'clientId': devClientId,
			'appId': appId
		}
	} else if (devOrReal == "REAL") {
		var appId = '37387137807';
		return {
			'developerKey': developerKey,
			'clientId': clientId,
			'appId': appId
		}
	} else if (devOrReal == "JOINS") {
		appId = "1020012817568";
		return {
			'developerKey': joinsDeveloperKey,
			'clientId': joinsClientId,
			'appId': appId
		}
	}
}

/**
 * @param {string} api 사용하는 구글 API 종류 [signIn | drivePost | driveChat]
 */
function getGoogleOauthRedirectUri(api) {
	var secondPhrase = "";
	if (api === "signIn") {
		secondPhrase = "/collabo/inc/googleSignIn_view.jsp";
	} else if (api === "drivePost") {
		secondPhrase = "/collabo/inc/googleDrivePost_view.jsp";
	} else if (api === "driveChat") {
		secondPhrase = "/collabo/inc/googleDriveChat_view.jsp";
	}
	return location.origin + secondPhrase;
};

function getGoogleOauthScope(api) {
	var scope = "";
	if (api === "signIn") {
		clog('signin 2');
		scope = "https://www.googleapis.com/auth/userinfo.profile";
	} else if (api === "drivePost" || api === "driveChat") {
		scope = "https://www.googleapis.com/auth/drive";
	}
	return scope;
}

function isGoogleOauthUseable() {
	if (parseInt(cmf_get_version_of_IE(), 10) < 9) {
		alert(cnts_Null2Void(i18n('DCC438'),"IE 8버전 이하는 구글 드라이브 api가 지원되지 않습니다."));
		return false;
	} else {
		return true;
	}
}

/**
 * 구글지도 이미지 가져오기
 * @param {string} location 
 * @param {object} options 
 * @returns {string}
 */
function cmf_getGoogleStaticMapImage(location, options) {

	var key = "AIzaSyADjbtMn46r9DGFyo_ZRz3c6fOXzuOKWCw";
	var opt = {
		width: "646",
		height: "220",
		zoom: "14",
		markers: "color:blue",
	};
	if (options) {
		if (options.width) {
			opt.width = options.width;
		}
		if (options.height) {
			opt.height = options.height;
		}
		if (options.zoom) {
			opt.zoom = options.zoom;
		}
		if (options.markers) {
			opt.markers = options.markers;
		}

	}
	return "https://maps.googleapis.com/maps/api/staticmap?center=" + location + "&zoom=" + opt.zoom + "&size=" + opt.width + "x" + opt.height + "&markers=" + opt.markers + "|" + location + "&key=" + key;
}

/**
 * 구글지도 링크(url) 가져오기
 * @param {string} location 
 * @returns {string}
 */
function cmf_getGoogleStaticMapUrl(location, place) {
	return "https://www.google.co.kr/maps/place/" + location + "?q=" + encodeURIComponent(place);
}

//@유민호 : 구글 쿠키 리무브 190926
function cmf_removeGoogleCookie(b_gmail, b_electron, CALLBACK){
	if(!b_gmail){
		CALLBACK();
		return;
	} else {
		if(b_electron){
			var openNewWindow1 = window.open("https://accounts.google.com/Logout?continue=http://google.com", 'googlelogout', "top="+screen.height+", left="+screen.width);
			window.setTimeout(function(){
				openNewWindow1.close();
				CALLBACK();
			},'1000')
		} else {
			var openNewWindow1 = window.open("https://accounts.google.com/Logout?continue=http://google.com");
			window.setTimeout(function(){
				openNewWindow1.close();
				CALLBACK();
			},'500');
		}
	}
}