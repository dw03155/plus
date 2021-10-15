var VideoConference = function () {

    return {
        getZoomToken: getZoomToken,
        updateZoomToken: updateZoomToken,
        deleteZoomToken: deleteZoomToken,
        getZoomUrl: getZoomUrl,
        warnAndSendMessage: warnAndSendMessage,
        OpenMessengerAndSend: OpenMessengerAndSend,
        alertRequiredZoomSync: alertRequiredZoomSync,
        checkOpenWithVCButton: checkOpenWithVCButton,
        createZoomConferenceRoom: createZoomConferenceRoom,
        syncZoom: syncZoom,
        unSyncZoom: unSyncZoom,

        isZoomSynchronized: isZoomSynchronized,
        isVC: isVC,
    };

    function isVC(vcSrno) {
        return Often.null2Void(vcSrno, "0") !== "0";
    }

    /**
     * 토큰 생성 및 토큰 정보 획등
     * @param payload
     * @param callback 콜백
     */
    function getZoomToken(payload, callback) {
        var isSchedule = payload.TYPE === "SCHEDULE";
        var vcStartDttm = isSchedule ? convertDttmForVideoConf("START") : moment().format('YYYY-MM-DDTHH:mm:ssZ');
        var vcEndDttm = isSchedule ? convertDttmForVideoConf("END") : moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ssZ');
        var zoomJsonData = {
            VC_TTL: payload.VC_TTL,
            VC_START_DTTM: vcStartDttm,
            VC_END_DTTM: vcEndDttm,
            CONF_TYPE: "2",
            CONF_TIMEZONE: moment.tz.guess(),
        };
        Ajax.executeApi(RestApi.GET.COLABO_ZOOM_TOKEN_R001, zoomJsonData, callback);
    }

    function updateZoomToken(payload, callback) {
        var vcStartDttm = convertDttmForVideoConf("START");
        var vcEndDttm = convertDttmForVideoConf("END");
        var zoomJsonData = {
            VC_TTL: payload.VC_TTL,
            VC_SRNO: payload.VC_SRNO,
            VC_START_DTTM: vcStartDttm,
            VC_END_DTTM: vcEndDttm,
            CONF_TIMEZONE: moment.tz.guess(),
        };

        Ajax.executeApi(RestApi.PUT.COLABO_ZOOM_TOKEN_U001, zoomJsonData, callback);
    }

    function deleteZoomToken(payload, callback) {
        var zoomJsonData = {
            VC_SRNO: payload.VC_SRNO
        }
        Ajax.executeApi(RestApi.DELETE.COLABO_ZOOM_TOKEN_D001, zoomJsonData, callback);
    }

    function convertDttmForVideoConf(type) {
        var $editDateTimeArea = $("#editDateTimeArea");
        var dateTime = type === "START" ? $editDateTimeArea.find("#START_DTTM").val() : $editDateTimeArea.find("#END_DTTM").val();
        var formatDateTime = dateTime.slice(0, 4) + "-" + dateTime.slice(4, 6) + "-" + dateTime.slice(6, 8) + "T"
            + dateTime.slice(8, 10) + ":" + dateTime.slice(10, 12) + ":" + dateTime.slice(12, 14)
        return moment(formatDateTime).format('YYYY-MM-DDTHH:mm:ssZ');
    }

    /**
     * Zoom의 교유번호룰 URL 취득 후 해당 URL로 줌 열기
     * @param {string} VC_SRNO Zoom 고유 번호
     * @param {boolean} isOpen 화상회의 방을 바로 열지 여부
     * @param {function} callback 콜백
     */
    function getZoomUrl(VC_SRNO, isOpen, callback) {
        if (!VideoConference.isVC(VC_SRNO)) return;
        Ajax.executeApi(RestApi.GET.COLABO2_VIDEO_CONFERENCE_R001, {VC_SRNO: VC_SRNO}, function (dat) {
            var result = JSON.parse(dat.RESULT_MSG)
            var url = result._VC_RGSR_ID === _USER_ID && isOpen ? result._START_URL : result._JOIN_URL;
            isOpen ? VideoConference.createZoomConferenceRoom(url) : callback(url);
        });
    }

    /**
     * 화상회의 메세지를 보낼지 경고한 후 sendMessage
     * 상황에 맞는 Alert -> 채팅창 열림 -> 화상회의 메세지 전송
     * @param type roomSrno | projectSrno | userID | groupCode | chat
     * @param value type에 대한 value
     */
    function warnAndSendMessage(type, value) {
        if (LimitGuest.isLimitGuest("video")) return;
        if (Often.isServerModeByHost("DEV_TEST")) {
            OpenMessengerAndSend(type, value);
            return;
        }
        alertUsingVideoConference(type, value);
    }


    // 게스트의 경우 업그레이드 권유
    function limitGuestPopup() {
        PopupDraw.drawBlock({
            class: 'videoConference',
            contents: BLOCK_TYPE.VIDEO,
            callback: {submit: Upgrade.showUpgradeLayer}
        })
    }

    // 엔터프라이즈 권한 Alert
    function enterpriseNoAuth() {
        PopupDraw.drawBlock({
            class: 'videoConference',
            contents: BLOCK_TYPE.AUTHENTICATION,
        })
    }

    // 화상회의 시작 Alert
    function alertUsingVideoConference(type, value) {
        PopupDraw.drawConfirm({
            contents: {main: i18next.t('front.videoConference.startVideoConference')},
            callback: {
                submit: function () {
                    OpenMessengerAndSend(type, value);
                }
            }
        })
    }

    function alertRequiredZoomSync(isMini) {
        if (LimitGuest.isLimitGuest("video", isMini)) return;
        PopupDraw.drawBlock({
            mini: isMini,
            class: "video",
            contents: {
                title: BLOCK_TYPE.ZOOM_CONNECT.title,
                main: BLOCK_TYPE.ZOOM_CONNECT.main,
                submit: BLOCK_TYPE.ZOOM_CONNECT.submit,
                link_text: BLOCK_TYPE.ZOOM_CONNECT.link_text,
            },
            linkUrl: 'https://support.flow.team/hc/ko/articles/4404603293197',
            callback: {submit: syncZoom}
        })
    }

    /**
     * 화상회의를 위한 채팅창 열고 보내는 기능
     * 채팅창 열림 -> 화상회의 메세지 전송
     * @param type roomSrno | projectSrno | userID | groupCode | chat
     * @param value type에 대한 value
     */
    function OpenMessengerAndSend(type, value) {
        LocalUtil.setLocal('ONLY_VIDEO_CONFERENCE', 'Y')

        switch (type) {
            case 'roomSrno':
                OpenUtil.openMessengerByRoomSrno(value)
                break;
            case 'projectSrno' :
                OpenUtil.openMessengerByProjectSrno(value);
                break;
            case 'userID' :
                OpenUtil.openMessengerByOneUserId(value);
                break;
            case 'groupCode' :
                OpenUtil.openMessengerByFavoriteGroupCode(value);
                break;
            case 'chat' :
                checkOpenWithVCButton();
                break;
        }
    }

    /**
     * 홈페이지에서 화면에서 화상회의를 타고 들어왔을떄를 감지 하기 위함
     * @description Messenger 에서만 사용가능
     */
    function checkOpenWithVCButton() {
        if ('Y' === LocalUtil.getLocal('ONLY_VIDEO_CONFERENCE')) {
            LocalUtil.removeLocal('ONLY_VIDEO_CONFERENCE');
            isZoomSynchronized(MessengerSend.sendVideoMessage, alertRequiredZoomSync, {isMini: true})
        }
    }

    /**
     * 줌 화상 회의를 처음 시작할때
     * @param zoomUrl Zoom URL (연동/ 화상회의)
     */
    function createZoomConferenceRoom(zoomUrl) {
        var popUpInfo = {
            'width': 500,
            'height': 700,
            'left': 100,
            'top': 100
        }
        var isElectron = Electron.isElectronApp();
        isElectron ? Electron.openWindow(zoomUrl, '_target', popUpInfo.width, popUpInfo.height, popUpInfo.left, popUpInfo.top)
            : OpenUtil.openPopup(zoomUrl, '_target', popUpInfo)
    }

    /**
     * 줌 연동이 되어있지 않을시 사용
     */
    function syncZoom() {
        var origin = Often.getLocOrigin() + (location.port ? ':' + location.port : '')
        var clientKey = 'k89F6GEhTJyf3s8xlFUEFA'
        var zoomUrl = "https://zoom.us/oauth/authorize?response_type=code&client_id=" + clientKey
            + "&redirect_uri=" + origin + "/zoom_oauth.act";
        LocalUtil.setLocal("vc_base_page", "vc_integration");

        window.open(zoomUrl, "_blank", "width=500,height=600");
    }

    /**
     * 줌 연동 해제
     * @param callBack 연동 해제후 실행되어야 할 Function
     */
    function unSyncZoom(callBack) {
        Ajax.executeApi(RestApi.DELETE.FLOW_EXT_SERVICE_D001, {"EXT_SERVICE_NM": "Zoom"}, callBack)
    }

    /**
     * Zoom 기능이 사용자 계정에 연동 되어있는지 확인
     * 없을 경우 연동 창을 띄어준다.
     * @param zoomExistcallBack 줌 기능이 연동이 되어있을때 실행되어야 할 Function
     * @param zoomNotExistcallBack 줌 기능 기능이 연동이 되어있지 않을때 실행되어야 할  Function
     */
    function isZoomSynchronized(zoomExistcallBack, zoomNotExistcallBack, dat) {
        Ajax.executeApi(RestApi.GET.FLOW_EXT_SERVICE_R001, {}, function (data) {
            var isDataEmpty = ((data.EXT_SERVICE_REC && data.EXT_SERVICE_REC.length === 0) || data.EXT_SERVICE_REC[0] === "");
            var isEnter = _ENTER_YN === "Y";
            var isZoomExist = Often.isServerModeByHost("DEV_TEST"); // 개발: True || 운영: False

            if (!isDataEmpty) {
                $.each(data.EXT_SERVICE_REC, function (i, v) {
                    isZoomExist = v.EXT_SERVICE_NM === "Zoom";
                })
            }

            var param = {}
            if (dat) param = {type: dat.type, val: dat.val, isMini: dat.isMini}
            isZoomExist ? zoomExistcallBack(param.type, param.val) : zoomNotExistcallBack(param.isMini);
        })
    }
}();