var SocketControl = (function () {

    var socketObject;
    var strSocketUserIds;
    var isCompleteMatch = false;
    var roomConnectId;

    return {
        getSocket: getSocket,
        getSocketIdList: getSocketIdList,
        getRoomConnectId: getRoomConnectId,
        getStrSocketUserIds: getStrSocketUserIds,
        setStrSocketUserIds: setStrSocketUserIds,
        isDisconnectAndConnect: isDisconnectAndConnect,
        connectSocket: connectSocket,
        sendMessage: sendMessage,
        sendMessageByUserIds: sendMessageByUserIds,
        sendAlarmAndPinUpdate: sendAlarmAndPinUpdate,
        closeExpiredWindows: closeExpiredWindows,
        addDefaultEvent: addDefaultEvent,
    }

    function getRoomConnectId(){
        return roomConnectId;
    }

    function getSocket() {
        return socketObject;
    }

    function getStrSocketUserIds() {
        return strSocketUserIds;
    }

    function setStrSocketUserIds(str) {
        strSocketUserIds = str;
    }

    function isDisconnectAndConnect(code, dataJson, callback) {
        var isExistsCb = (typeof callback === "function");
        if (socketObject.disconnected) {
            SentryMonitor.setExtra("DISCONNECT", dataJson);
            SentryMonitor.captureException('[DISCONNECT] ' + code);
            setTimeout(function () {
                if (isExistsCb && socketObject.connected) callback();
            }, 5000)
            return true;
        } else {
            if (isExistsCb) callback();
            return false;
        }
    }

    function connectSocket(callback) {
        var socketUrl;
        if (typeof _CHAT_URL === "undefined" || Often.null2Void(_CHAT_URL) === "") {
            if (ServerChecker.isReal && !ServerChecker.isEnter) {
                socketUrl = "https://flowchat.appplay.co.kr:7820";
            } else {
                socketUrl = "https://flowtest.info:8082";
            }
        } else {
            socketUrl = _CHAT_URL;
        }
        // WebSocket 업그레이드한 내역이 있으면 폴링처리 없이
        // 바로 웹소켓으로 붙도록 설정하는 부분 (SSL 처리된 경우만 사용)
        socketObject = io.connect(socketUrl, {rememberUpgrade: true});
        roomConnectId = Often.getUUID();

        addDefaultEvent();
        addReceiveEvent();

        (typeof callback === "function") && callback();
    }

    function joinSocketRoom() {
        if (Often.isAct("messenger")) {
            socketObject.emit("requestRandomChat", {ROOM_SRNO: _USER_ID});
            socketObject.emit("requestRandomChat", {ROOM_SRNO: _ROOM_SRNO});
            socketObject.emit("requestRandomChat", {ROOM_SRNO: roomConnectId});
        } else if (Often.isAct("miniMain")) {
            socketObject.emit("requestRandomChat", {ROOM_SRNO: _USER_ID});
            socketObject.emit("requestRandomChat", {ROOM_SRNO: roomConnectId});
            socketObject.emit('electronSession', {
                USER_ID: _USER_ID,
                RGSN_DTTM: _RGSN_DTTM,
                USE_INTT_ID: _USE_INTT_ID,
                // EMAIL: _EMAIL,
                WEB_USER_ID: _USER_ID
            });
        } else {
            socketObject.emit("requestRandomChat", {ROOM_SRNO: _USER_ID});
            socketObject.emit("requestRandomChat", {ROOM_SRNO: roomConnectId});
        }
    }

    /**
     *
     * @param messageJson
     * @param sendCallback - 유일하게 쓰는 곳이 OpenUtil.openMessengerByInvite
     */

    function sendMessage(messageJson, sendCallback) {
        var emitJson;
        if (Often.isFunc("CHAT_ENCRYPT")) {
            emitJson = $.extend({
                WEB_USER_ID: _USER_ID,
                MC_USER_ID: _USER_ID,
                ENCRYPT_YN: "Y",
                ROOM_SRNO: chatLike(messageJson.ROOM_SRNO, _USER_ID),
                GUBUN: (Electron.isElectronApp() ? "DESKTOP" : "WEB"),
            }, messageJson)
        } else {
            emitJson = $.extend({WEB_USER_ID: _USER_ID, TAB_ID: _TAB_ID}, messageJson);
        }

        if (isDisconnectAndConnect('socketMessageEmit : emitJson', emitJson)) return;
        socketMessageEmit();

        function socketMessageEmit() {
            socketObject.emit('sendMessage', emitJson);
            (typeof sendCallback === "function") && sendCallback();
        }
    }

    function sendMessageByUserIds(messageJson) {
        if (BotUtil.isBotRoom()) return;
        if (!messageJson.CHATTING_ROOM_SRNO) messageJson.CHATTING_ROOM_SRNO = _ROOM_SRNO;
        if ("" !== Often.null2Void(strSocketUserIds)) return sendUserIds();
        getSocketIdList(sendUserIds, messageJson.CHATTING_ROOM_SRNO);

        function sendUserIds() {
            // 나를 처음 처리
            messageJson.ROOM_SRNO = _USER_ID;
            sendMessage(messageJson);
            strSocketUserIds.split(",").forEach(function (sendId) {
                var isPass = ("" === Often.null2Void(sendId) || _USER_ID === sendId);
                if (isPass) return;
                messageJson.ROOM_SRNO = sendId;
                sendMessage(messageJson);
            });
        }
    }

    function getSocketIdList(callback, roomSrno) {
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_SOCKET_ID_LIST_R001, {ROOM_SRNO: roomSrno}, function (dat) {
            strSocketUserIds = dat.SOCKET_ID_LIST;
            (typeof callback === "function") && callback();
        })
    }

    function addDefaultEvent() {

        socketObject.on("connect", logSocketData);
        socketObject.on("reconnect", logSocketData);
        socketObject.on("disconnect", joinSocketRoom);

        socketObject.on("connected", joinSocketRoom);
        socketObject.on("reconnecting", logSocketData);
        socketObject.on("completeMatch", completeMatchEvent);

        function logSocketData(data) {

        }

        function completeMatchEvent() {
            if (isCompleteMatch) return;
            isCompleteMatch = true;
            if (!Often.isAct("messenger")) return;
            var lostTimer = setTimeout(function () {
                MessengerLost.lostLastMessage();
                clearTimeout(lostTimer);
            }, 3000)
        }

    }

    function closeExpiredWindows(isElectron) {
        try {
            socketObject.emit('sendMessage', {
                CHAT_CODE: "POPUP0001",
                ROOM_SRNO: _USER_ID,
                WEB_USER_ID: _USER_ID,
                isELECTRON: isElectron,
            });
        } catch (e) {
        }
    }

    function addReceiveEvent() {
        if (Often.isAct("subscreen")) return;
        if (Often.isAct("messenger")) socketObject.on("receiveMessage", receiveEventOnMessengerView);
        if (Often.isAct("main") || Often.isAct("/l/")) socketObject.on("receiveMessage", receiveEventOnMainView);
        if (Often.isAct("miniMain")) socketObject.on("receiveMessage", receiveEventOnMiniView);
    }

    function receiveEventOnMainView(data) {

        var apiCode = Often.null2Void(data.CHAT_CODE);
        var isShowChattingLayer = $("#chattingLayer").is(":visible");
        var roomSrno = Often.null2Void(data.CHATTING_ROOM_SRNO);
        var deviceId = LocalUtil.getDeviceId();
        var isElectron = Electron.isElectronApp();
        var isMiniModeElectron = isElectron && !Electron.getElectronConfig().b_fullMode;

        if (apiCode !== SocketAPI.COMM.MOUSE_MOVE &&
            apiCode !== SocketAPI.MAIN.FOCUS_IN &&
            apiCode !== SocketAPI.MAIN.FOCUS_OUT) {
            Often.clog('메인 소켓', apiCode, data);
        }

        if (SocketAPI.MAIN.BADGE_UPDATE === apiCode) {
            AlarmUpdate.updateUnReadElementBySocketReceive(data);
            Chatting.drawTopNotReadCount();
            return;
        }

        if (SocketAPI.CONNECT.MESSENGER.CREATE === apiCode) {
            Chatting.updateChattingLayer(data)
            return;
        }

        if (SocketAPI.MAIN.READ_ALL_MESSAGE_BY_ROOM === apiCode) {
            ListHelper.setCount($('#chatting-' + roomSrno).find('.not-read-count'), 0);
            Electron.isElectronApp() && Electron.hideNoti(roomSrno);
            Chatting.drawTopNotReadCount();
            return;
        }

        if (SocketAPI.MAIN.CHAT_UPDATE === apiCode) {
            Chatting.drawTopNotReadCount();
            isShowChattingLayer && Chatting.updateChattingLayer(data);
            !isMiniModeElectron && BrowserNoti.showChattingNotification(data);
            return;
        }

        if (SocketAPI.MAIN.ROOM_NAME_UPDATE === apiCode ||
            SocketAPI.MAIN.ALARM_N_PIN_UPDATE === apiCode ||
            SocketAPI.MAIN.DELETE_MESSAGE_MY_VIEW === apiCode ||
            SocketAPI.MAIN.DELETE_MESSAGE_ALL_VIEW === apiCode
        ) {
            isShowChattingLayer && Chatting.updateChattingLayer(data);
            return;
        }

        if (SocketAPI.MAIN.ROOM_LEAVE === apiCode) {
            isShowChattingLayer && Chatting.removeChattingLayer(data);
            return;
        }

        if (SocketAPI.COMM.LOGOUT === apiCode && data.DUID === deviceId) {
            Often.toast("info", i18next.t('front.alert.terminateDevice'))
            Often.logoutDirect();
            return;
        }

        if (SocketAPI.COMM.TEMP_LOGOUT === apiCode) {
            if (data.LOGOUT_CODE === LogoutCode.STOP) {
                Company.drawServiceBlock(BLOCK_TYPE.SERVICE_USER, Often.logoutDirect, function () {
                    var logOutConfirm = confirm(i18next.t('front.alert.redirectLogin'));
                    if (logOutConfirm) Often.logoutDirect();
                });
                return;
            }
            if (data.DUID !== deviceId) return;

            var isLogoutToLoginAct = Often.isFunc("FLOW_S_LOGOUT_ON_NEW")
            var minutes = Often.null2Void(data.MINS, 0);
            var timeText = Tz.convertMinToHourForLockMode(minutes);
            Often.logoutDirect(true);
            PopupDraw.drawBlock({
                class: 'service',
                contents: {
                    title: i18next.t('front.common.lockMode'),
                    main: i18next.t('front.alert.autoLogout', {time: timeText}),
                    submit: i18next.t('dictionary.login'),
                },
                callback: {
                    submit: goLogin,
                    close: goLogin,
                }
            });

            function goLogin() {
                location.replace(isLogoutToLoginAct ? "/login.act" : '/signin.act');
            }

            return;
        }

        if (SocketAPI.COMM.OVERLAP_LOGOUT === apiCode) {
            if (data.DUID !== LocalUtil.getDeviceId()) return;
            Often.toast("info", i18next.t('front.alert.terminateDevice'))
            Often.logoutDirect();
            return;
        }

        if (SocketAPI.COMM.MOUSE_MOVE === apiCode) {
            if (data.TAB_ID === _TAB_ID) return;
            if (data.DUID !== LocalUtil.getDeviceId()) return;
            LockControl.startLockModeAfterMinutes();
            return;
        }

        if (SocketAPI.MAIN.FOCUS_IN === apiCode) {
            $('body').attr('data-focus-room-srno', data.FOCUS_ROOM_SRNO);
            return;
        }

        if (SocketAPI.MAIN.FOCUS_OUT === apiCode) {
            $('body').attr('data-focus-room-srno', '');
            return;
        }

        if (SocketAPI.MAIN.FLOW_DRIVE_FILE_IMPORT === apiCode) {
            var $postPopup = $("#postPopup:visible");
            $.each(data.FILE_REC, function (i, file) {
                PostAppend.appendFileOrImg($postPopup, file);
            })
        }

        if (SocketAPI.MAIN.BADGE_SELF_UPDATE === apiCode) {
            if (!Often.isFunc(Func.CLOUD.ALARM_COUNT_SOCKET)) return;
            AlarmUpdate.updateUnReadElementBySelf(data.ALARM_DATA);
            return;
        }

    }

    function receiveEventOnMessengerView(data) {

        var apiCode = Often.null2Void(data.CHAT_CODE);
        var deviceId = LocalUtil.getDeviceId();
        var isElectron = Electron.isElectronApp();
        var isDifferentDevice = data.DUID !== deviceId;

        if (apiCode !== SocketAPI.COMM.MOUSE_MOVE &&
            apiCode !== SocketAPI.MAIN.FOCUS_IN &&
            apiCode !== SocketAPI.MAIN.FOCUS_OUT) {
            Often.clog('채팅 소켓', apiCode, data);
        }

        if (MessengerApi.isReceiveAndAction(apiCode, data)) return; //메시지, 읽음, 알람, 상단고정, 스크랩 갱신
        if (MessengerMenu.isReceiveAndAction(apiCode, data)) return; //메시지, 읽음, 알람, 상단고정, 스크랩 갱신
        if (MessengerDelete.isReceiveAndAction(apiCode, data)) return; //메시지, 읽음, 알람, 상단고정, 스크랩 갱신
        if (MessengerNotice.isReceiveAndAction(apiCode, data)) return; //메시지, 읽음, 알람, 상단고정, 스크랩 갱신
        if (SocketAPI.MESSENGER.JOIN_N_LEAVE === apiCode) return MessengerSendience.joinNLeaveRoom(data);
        if (SocketAPI.COMM.POPUP_CLOSE === apiCode) {
            if (data.isELECTRON === Electron.isElectronApp()) return Often.toast("error", "POPUP_CLOSE");
        }

        if (SocketAPI.COMM.TEMP_LOGOUT === apiCode) {
            if (data.LOGOUT_CODE !== LogoutCode.STOP && isDifferentDevice) return;
            window.close();
            return;
        }

        if (SocketAPI.COMM.MOUSE_MOVE === apiCode) {
            if (data.TAB_ID === _TAB_ID) return;
            if (isDifferentDevice) return;
            LockControl.startLockModeAfterMinutes();
            return;
        }

        if (SocketAPI.COMM.OVERLAP_LOGOUT === apiCode) {
            if (isDifferentDevice) return;
            if (isElectron) window.open('', '_self', '');
            window.close();
            self.close();
            return;
        }

        if (SocketAPI.CONNECT.MESSENGER.FILE === apiCode) {
            data.FILE_REC.forEach(MessengerSend.sendFile)
            return;
        }

        if (SocketAPI.CONNECT.MESSENGER.CREATE === apiCode) {
            if (roomConnectId !== data.ROOM_SRNO) return;
            self.close();
        }
    }

    function sendAlarmAndPinUpdate(isAlarm, ynValue, roomSrno) {
        var key = isAlarm ? "PUSH_ALAM_YN" : "PIN_YN";
        var mainApiJson = {
            CHAT_CODE: SocketAPI.MAIN.ALARM_N_PIN_UPDATE,
            ROOM_SRNO: roomSrno,
            IN_RCVR_USER_ID: _USER_ID,
            CHATTING_ROOM_SRNO: roomSrno,
        }
        mainApiJson[key] = ynValue;
        var messengerApiJson = {
            CHAT_CODE: SocketAPI.MAIN.ALARM_N_PIN_UPDATE,
            ROOM_SRNO: _USER_ID,
            CHATTING_ROOM_SRNO: roomSrno,
        }
        var messengerApiJsonSelf = {
            CHAT_CODE: SocketAPI.MESSENGER.ALARM_N_PIN_UPDATE,
            ROOM_SRNO: _USER_ID,
            CHATTING_ROOM_SRNO: roomSrno,
            IN_RCVR_USER_ID: _USER_ID,
        }
        messengerApiJsonSelf[key] = ynValue;
        messengerApiJson[key] = ynValue;
        sendMessage(mainApiJson);
        sendMessage(messengerApiJson);
        sendMessage(messengerApiJsonSelf);
    }

    function receiveEventOnMiniView(data) {
        var apiCode = Often.null2Void(data.CHAT_CODE);
        var isShowChattingLayer = $("#miniChatting").is(":visible");
        var isShowProjectLayer = $("#miniProject").is(":visible");
        var roomSrno = Often.null2Void(data.CHATTING_ROOM_SRNO);
        var projectSrno = Often.null2Void(data.COLABO_SRNO, "-1");
        var isElectron = Electron.isElectronApp();
        var deviceId = LocalUtil.getDeviceId();

        if (apiCode !== SocketAPI.COMM.MOUSE_MOVE &&
            apiCode !== SocketAPI.MAIN.FOCUS_IN &&
            apiCode !== SocketAPI.MAIN.FOCUS_OUT) {
            Often.clog('미니 소켓', apiCode, data);
        }

        if (SocketAPI.COMM.TEMP_LOGOUT === apiCode) {
            if (data.LOGOUT_CODE === LogoutCode.STOP) {
                Company.drawServiceBlock(BLOCK_TYPE.SERVICE_USER, Often.logoutDirect, function () {
                    var logOutConfirm = confirm(i18next.t('front.alert.redirectLogin'));
                    if (logOutConfirm) Often.logoutDirect();
                });
                return;
            }
            if (data.DUID !== deviceId || isElectron) return;

            var minutes = Often.null2Void(data.MINS, 0);
            var timeText = Tz.convertMinToHourForLockMode(minutes);
            Often.logoutDirect(true);
            PopupDraw.drawBlock({
                mini: true,
                class: 'service',
                contents: {
                    title: i18next.t('front.common.lockMode'),
                    main: i18next.t('front.alert.autoLogout', {time: timeText}),
                    submit: i18next.t('dictionary.login'),
                },
                callback: {
                    submit: goLogin,
                    close: goLogin,
                }
            });

            function goLogin() {
                location.href = "miniSignin.act";
            }

            return;
        }

        if (SocketAPI.COMM.OVERLAP_LOGOUT === apiCode) {
            if (data.DUID !== LocalUtil.getDeviceId()) return;
            Often.toast("info", i18next.t('front.alert.terminateDevice'))
            Often.logoutDirect();
            return;
        }

        if (SocketAPI.CONNECT.MESSENGER.CREATE === apiCode) {
            Chatting.updateChattingLayer(data)
            return;
        }

        if (SocketAPI.MAIN.ROOM_LEAVE === apiCode) {
            isShowChattingLayer && MiniChatting.removeMessengerList(roomSrno);
            return;
        }

        if (SocketAPI.MAIN.CHANGE_STATE === apiCode) {
            MiniState.setProfileStatus(data.STATUS, data.USER_ID)
            return;
        }

        if (SocketAPI.CONNECT.INVITE.FAVORITE === apiCode) {
            MiniFavorite.showFavoriteGroupData(false);
            return;
        }

        if (SocketAPI.MAIN.CHAT_UPDATE === apiCode) {
            BrowserNoti.showChattingNotification(data)
            Chatting.drawTopNotReadCount();
            isShowChattingLayer && Chatting.updateChattingLayer(data);
            return;
        }

        if (SocketAPI.MAIN.READ_ALL_MESSAGE_BY_ROOM === apiCode) {
            ListHelper.setCount($('#chatting-' + roomSrno).find('.not-read-count'), 0);
            Chatting.drawTopNotReadCount();
            Electron.isElectronApp() && Electron.hideNoti(roomSrno);
            return;
        }

        if (SocketAPI.MAIN.BADGE_UPDATE === apiCode) {
            var isAllRead = (projectSrno === "0" && data.FLOW_CNT === "0" && data.CHAT_CNT !== "0");
            Chatting.drawTopNotReadCount();
            MiniLeft.setProjectBadgeCount(isAllRead);
            BrowserNoti.showAlarmNotification(data);
            isAllRead && Electron.isElectronApp() && Electron.hideNoti();
            isShowProjectLayer && MiniProject.initProject(true)
            return;
        }

        if (SocketAPI.MAIN.ROOM_NAME_UPDATE === apiCode ||
            SocketAPI.MAIN.ALARM_N_PIN_UPDATE === apiCode ||
            SocketAPI.MAIN.DELETE_MESSAGE_MY_VIEW === apiCode ||
            SocketAPI.MAIN.DELETE_MESSAGE_ALL_VIEW === apiCode
        ) {
            isShowChattingLayer && Chatting.updateChattingLayer(data);
            return;
        }

        if (SocketAPI.MAIN.BADGE_SELF_UPDATE === apiCode) {
            if (!Often.isFunc(Func.CLOUD.ALARM_COUNT_SOCKET)) return;
            AlarmUpdate.updateUnReadElementBySelf(data.ALARM_DATA);
            return;
        }

        if (SocketAPI.MAIN.FOCUS_IN === apiCode) {
            $('body').attr('data-focus-room-srno', data.FOCUS_ROOM_SRNO);
            return;
        }

        if (SocketAPI.MAIN.FOCUS_OUT === apiCode) {
            $('body').attr('data-focus-room-srno', '');
            return;
        }
    }
})()