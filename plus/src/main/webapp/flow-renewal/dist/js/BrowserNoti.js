var BrowserNoti = (function () {

    var browserNotiStatus = 0; // 0:초기값, 1:팝업여부1단계, 2:팝업여부2단계, 3:팝업여부 안물음
    var browserNotification = null;
    var currentNotiSrno = null;
    var notificationJson = {};

    return {
        initSetting: initSetting,
        showChattingNotification: showChattingNotification,
        showAlarmNotification: showAlarmNotification,
        requestNotificationPermission: requestNotificationPermission,
        closeAlarmBanner: closeAlarmBanner,
    }

    function requestNotificationPermission() {
        Notification.requestPermission(function (result) {
            if (result === 'default') return;
            if (result === 'denied') return closeAlarmBanner();
            if (result === 'granted') {
                closeAlarmBanner();
                Ajax.executeApi(RestApi.PUT.COLABO2_SET_U102, {DESKTOP_ALAM: "Y"});
            } else {

            }
        });
    }

    function closeAlarmBanner(isNeverShow) {
        Top.removeBanner('alarm-step-all');
        browserNotiStatus = 3;
        isNeverShow && LocalUtil.setLocal("ONLY_DESKTOP_NOTI_POPUP", "N");
    }

    /**
     * 배치의 data는 오직 트리거로만 쓰고 있고,
     * 안읽은알림 중 가장 최신의 알림을 가져와 노티를 날려주기때문에
     * 배치 트리거가 오랜만에 왔다면 누락이 될 수도 있다.
     * */
    function showAlarmNotification(data) {
        //Todo. 배치에서 내려오는 data.{COLABO_SRNO, COLABO_COMMT_SRNO, COLABO_REMARK_SRNO}를 활용하기
        var userSetting = LocalUtil.getLocalJson("ONLY_USER_SETTING");
        if (!userSetting) {
            //Todo. USER_SETTING 값이 없으면 리로드말고, 다시 API 호출하는 방식으로 변환하기
            location.reload();
            return;
        }
        if (userSetting.FLOW_ALAM_YN === "N" || userSetting.COMMT_ALAM === "N") return; //전체알림 || 프로젝트 알림 off
        if (!isSupportedNotification()) return; //알림 지원하지 않는 브라우저
        if (Notification.permission !== "granted") return;

        Alarm.getRecentAlarmData(function (dat) {
            var oneAlarmData = Alarm.getOneAlarmData(dat);
            if (checkSendedNoti(oneAlarmData)) return;  //이미 보낸 알람
            //Todo. oneAlarmData.RGSN_DTTM 활용 5분 이내의 알람만 허용한다는 방어로직
            if (Object.keys(oneAlarmData).length === 0) return;
            if (_USER_ID === oneAlarmData.RGSR_ID) return;
            showBrowserNoti('ALARM', oneAlarmData, true);
        })
    }

    function showChattingNotification(data) {
        var userSetting = LocalUtil.getLocalJson("ONLY_USER_SETTING");
        if (!userSetting || userSetting.CHAT_ALAM_YN === "N" || userSetting.COMMT_ALAM === "N") return; //전체알림 || 채팅 알림 off
        if (!isSupportedNotification()) return; //알림 지원하지 않는 브라우저
        if (Notification.permission !== "granted") return;

        var oneMessageData = Chatting.getOneMessageData(data);
        var roomSrno = Often.null2Void(oneMessageData.ROOM_SRNO, data.CHATTING_ROOM_SRNO);
        if ($("body").attr("data-focus-room-srno") === roomSrno) return; //채팅 포커스 상태
        if (Object.keys(oneMessageData).length === 0) return;
        if (_USER_ID === oneMessageData.RGSR_ID) return; //본인
        var roomInfo = LocalUtil.getLocalJson("ONLY_MESSENGER-" + roomSrno);
        if (roomInfo !== null) return showBrowserNoti('CHATTING', oneMessageData, ("Y" === roomInfo.PUSH_ALAM_YN));
        Chatting.getRoomInfo(false, roomSrno, function (dat) {
            showBrowserNoti('CHATTING', oneMessageData, ("Y" === dat.PUSH_ALAM_YN))
        })
    }

    function checkSendedNoti(param) {
        if (Often.isCookieExist("ALARM_" + param.COLABO_COMMT_SRNO + "_" + param.COLABO_REMARK_SRNO)) return true;
        Often.setCookie("ALARM_" + param.COLABO_COMMT_SRNO + "_" + param.COLABO_REMARK_SRNO, 'Y', 1, '');
        return false;
    }

    function showBrowserNoti(code, data, isNotification) {

        var isChatting = code === "CHATTING";
        var isAlarm = code === "ALARM";
        var isElectron = Electron.isElectronApp();
        var isLockMode = LockControl.isLockMode() || MiniLock.isLockMode();
        var notiSrno = isChatting ? data.ROOM_SRNO : 'noti_post';
        var isInit = (browserNotification != null && currentNotiSrno != null && currentNotiSrno !== notiSrno);

        if (!isNotification) return;

        isInit && initNotification();
        if (isLockMode) {
            notificationJson.ICON = ImageUtil.removeDomain("PROFILE", "");
            notificationJson.BODY = i18next.t('front.alert.unlockToViewMessage');
            if (isChatting) {
                notificationJson.TITLE = i18next.t('front.alert.newAlert', {val: '$t(dictionary.message)'});
            } else if (isAlarm) {
                notificationJson.TITLE = i18next.t('front.alert.newAlert', {val: '$t(dictionary.notification)'});
            } else {
                //pass
            }
        } else {
            notificationJson.ICON = ImageUtil.removeDomain("PROFILE", data.PRFL_PHTG);
            if (isChatting) {
                notificationJson.TITLE = i18next.t('front.alert.userMessage', {
                    user: data.RGSR_NM,
                    interpolation: {escapeValue: false}
                });
                notificationJson.BODY = Chatting.changeContents(data);
            } else if (isAlarm) {
                notificationJson.TITLE = TagUtil.html2tag(data.ALAM_MSG);
                notificationJson.BODY = TagUtil.shortContent(data.TASK_NM, 25) + TagUtil.html2tag(data.ALAM_CNTN) + addFileAndImage(data)
            } else {
                //pass
            }
        }

        isElectron && Electron.showNoti(notiSrno);
        isElectron && Electron.showDenyNoti(notificationJson);

        currentNotiSrno = notiSrno;
        browserNotification = new Notification(notificationJson.TITLE, {
            icon: notificationJson.ICON,
            body: notificationJson.BODY,
            tag: notiSrno,
            renotify: true
        });
        browserNotification.onclick = function () {
            event.preventDefault();
            window.focus();
            isElectron && Electron.focusBrowser()
            initNotification();
            if (isLockMode) return;

            if (isChatting) {
                OpenUtil.openMessengerByRoomSrno(notiSrno);
                return;
            }

            if (isAlarm) {
                Alarm.closeLayer();
                AlarmUpdate.readAlarmAndAction({
                    COLABO_SRNO: data.COLABO_SRNO,
                    COLABO_COMMT_SRNO: data.COLABO_COMMT_SRNO,
                    COLABO_REMARK_SRNO: data.COLABO_REMARK_SRNO,
                    ALARM_ACTION: data.ALARM_ACTION,
                    OPEN_POP: true,
                })
            }
        };
    }

    function initNotification() {
        browserNotification.close();
        currentNotiSrno = null;
    }

    function initSetting() {
        if (!isSupportedNotification()) return;
        var isBrowserNotiRequestPopup = LocalUtil.getDesktopNotiPopup() === "Y";
        if (Notification.permission === "default" && isBrowserNotiRequestPopup) {
            // 0:초기값, 1:팝업여부1단계, 2:팝업여부2단계, 3:팝업여부 안물음
            if (browserNotiStatus === 0 || browserNotiStatus === 1) {
                Top.setBanner('alarm-step-1');
                browserNotiStatus = 1;
            } else if (browserNotiStatus === 2) {
                Top.setBanner('alarm-step-2');
                browserNotiStatus = 2;
            } else {
                //pass
            }
        } else {

        }
    }

    function isSupportedNotification() {
        return (typeof Notification !== "undefined");
    }

    function addFileAndImage(data) {
        var isExistsFile = data.ATCH_YN === "Y";
        var isExistsImage = data.IMG_ATCH_YN === "Y"
        var returnText = "\n(";
        if (isExistsFile && isExistsImage) returnText += i18next.t('dictionary.attachment') + ", " + i18next.t('dictionary.image');
        else if (isExistsFile) returnText += i18next.t('dictionary.attachment');
        else if (isExistsImage) returnText += i18next.t('dictionary.image');
        returnText += ")";
        return (!isExistsFile && !isExistsImage) ? "" : returnText;
    }

})()