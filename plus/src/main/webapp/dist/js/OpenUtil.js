var windowChildren = {}

var OpenUtil = (function () {

    return {
        openMessengerByRoomSrno: openMessengerByRoomSrno,
        openMessengerByOneUserId: openMessengerByOneUserId,
        openMessengerByProjectSrno: openMessengerByProjectSrno,
        openMessengerByFavoriteGroupCode: openMessengerByFavoriteGroupCode,
        openMessengerByInvite: openMessengerByInvite,
        openMessengerByDvsnCode: openMessengerByDvsnCode,
        openMini: openMini,
        openWindow: openWindow,
        openSubScreen: openSubScreen,
        openGanttChart: openGanttChart,
        openPopup: openPopup,
        openUrlOnBrowser: openUrlOnBrowser,
    }

    function openGanttChart(projectSrno) {
        if (LimitGuest.isLimitGuest("timeline")) return; //간트 팝업 미존재 > 모아보기와 동일 처리 => left에서 위치 이동
        var target = "gantt_chart";
        if (!Electron.isElectronApp()) openPopup("", "_parent");
        projectSrno = Often.null2Void(projectSrno);
        Often.submitForm(target, "gantt_chart.act", target, {
            USER_ID: _USER_ID,
            PRFL_PHTG: _PRFL_PHTG,
            COLABO_SRNO: projectSrno,
            STTS: "S", // 비즈니스 업그레이드 설정 해야 됨
        });
        if (Electron.isElectronApp()) {
            var ganttWhljJson = getWhljJson("GANTT");
            var screenX = window.screenX ? window.screenX : window.screenLeft;
            var screenY = window.screenY ? window.screenY : window.screenTop;
            Electron.setWindowSize(target, ganttWhljJson.width, ganttWhljJson.height, screenX + 10, screenY + 10);
        }
    }

    function openSubScreen(dataJson) {
        var url;
        if (dataJson.GB === "GOOGLE_DRIVE") {
            url = "flow-renewal/view/subscreen_view.jsp?GB=GOOGLE_DRIVE";
        } else {
            url = "subscreen.act?GB=" + dataJson.GB;
        }
        var subScreenWhltJson = $.extend({}, getWhljJson(dataJson.GB));
        var openWindow = openPopup('', dataJson.GB, subScreenWhltJson);
        Often.submitForm(dataJson.GB, url, dataJson.GB, dataJson);
        return openWindow;
    }

    function openMini() {

        var checkCnt = 0;
        var downloadCheckInterval = setInterval(downLoadCheck, 500);

        location.href = ServerChecker.isReal ? 'flownew://' : 'flowRenewalAppLink://';

        $(window).on('blur', function () {
            clearInterval(downloadCheckInterval);
        });

        function downLoadCheck() {
            if (++checkCnt > 2) {
                clearInterval(downloadCheckInterval);
                PopupDraw.drawConfirm({
                    contents: {
                        main: i18next.t('front.alert.installFlow'),
                    },
                    callback: {
                        submit: DownloadApp.desktopDownload,
                    }
                })

            }
        }
    }

    /**
     * 프로젝트 번호로 메세지 창 열기
     * @param projectSrno 프로젝트 번호
     */
    function openMessengerByProjectSrno(projectSrno) {
        var jsonData = {COLABO_SRNO: projectSrno};
        jsonData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C001, jsonData, function (data) {
            openMessengerByRoomSrno(data.ROOM_SRNO);
        });
    }

    function openMessengerByOneUserId(userId) {
        var jsonData = {SENDIENCE_REC: [{IN_RCVR_USER_ID: userId}]};
        jsonData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C001, jsonData, function (data) {
            openMessengerByRoomSrno(data.ROOM_SRNO);
        });
    }

    function openMessengerByFavoriteGroupCode(groupCode) {
        var jsonData = {GROUP_CD: groupCode, RENEWAL_YN: 'Y'}
        jsonData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C002, jsonData, function (dat) {
            openMessengerByRoomSrno(dat.ROOM_SRNO);
        })
    }

    function openMessengerByDvsnCode(dvsnCode) {
        var jsonData = {DVSN_CD: dvsnCode}
        jsonData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C002, jsonData, function (dat) {
            openMessengerByRoomSrno(dat.ROOM_SRNO);
        })
    }

    function openMessengerByInvite(roomSrno, sendienceRec, dvsnRec, groupRec) {
        var jsonData = {
            SENDIENCE_REC: sendienceRec,
            DVSN_REC: dvsnRec,
            GROUP_REC: groupRec,
            ROOM_SRNO: roomSrno,
        };
        jsonData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C001, jsonData, function (data) {
            if (roomSrno === data.ROOM_SRNO) {
                MessengerApi.inviteMessenger(data, function () {
                    setTimeout(function () {
                        selfScreenClose();
                    }, 200);
                });
                return;
            }

            Chatting.getRoomInfo(true, data.ROOM_SRNO, function (dat) {
                openMessengerByRoomSrno(data.ROOM_SRNO);
                if (dat.READ_OVER_YN !== 'N') MessengerApi.readMessage(false, roomSrno);
                if (dat.ROOM_GB !== RoomType.ONE_TO_ONE) {
                    SocketControl.sendMessage({
                        CHAT_CODE: SocketAPI.CONNECT.MESSENGER.CREATE,
                        ROOM_SRNO: CONNECT_ID,
                        CHATTING_ROOM_SRNO: data.ROOM_SRNO,
                        CHAT_DATA: data,
                    }, selfScreenClose);
                } else {
                    selfScreenClose();
                }
            })

            /**
             * @description socket을 받기전에 close 될 수 있음
             */
            function selfScreenClose() {
                self.close();
            }
        });
    }

    /***
     * 채팅방 번호로 채팅방 열기
     * @param roomSrno 채팅 방 넘버
     */
    function openMessengerByRoomSrno(roomSrno) {

        var isInternetExplorer = Often.isBrowser().ie;
        var isSafari = Often.isBrowser().safari;
        var isFirefox = Often.isBrowser().firefox;

        var url = '/messenger.act?room=' + btoa(roomSrno) + '&time=' + new Date().getTime();
        var target = "POPUP_CHAT_" + roomSrno;
        var messengerWhltJson = $.extend({}, getWhljJson("MESSENGER"));

        if (isInternetExplorer || isSafari || isFirefox) return openPopup(url, target, messengerWhltJson, ELECTRON_OPEN.CHAT);
        if (windowChildren[target] && windowChildren[target].parent != null) {
            LocalUtil.removeLocal("ONLY_MESSENGER-" + roomSrno);
            windowChildren[target].focus();
            return
        }

        var isStepPopup = (Object.keys(windowChildren).length > 0);
        if (isStepPopup && !Electron.isElectronApp()) {
            for (var key in windowChildren) {
                var isSimilarPosition = Math.abs(windowChildren[key].screenLeft - messengerWhltJson.left) < 5 &&
                    Math.abs(windowChildren[key].screenTop - messengerWhltJson.top) < 5;
                if (isSimilarPosition) {
                    messengerWhltJson.top += 30;
                    messengerWhltJson.left += 30;
                }
            }
        }

        var isElectron = Electron.isElectronApp();
        var newWindow;
        if (url && isElectron) {
            newWindow = openPopup(url, target, messengerWhltJson, ELECTRON_OPEN.CHAT);
        } else {
            var messengerLocalValue = LocalUtil.getLocalJson("ONLY_MESSENGER-" + roomSrno)
            newWindow = openPopup("", target, messengerWhltJson, ELECTRON_OPEN.CHAT);
            Often.submitForm(target, '/messenger.act', target, {
                room: btoa(roomSrno),
                roomKind: messengerLocalValue ? LocalUtil.getLocalJson("ONLY_MESSENGER-" + roomSrno).ROOM_KIND : '',
                time: new Date().getTime(),
            });
        }

        windowChildren[target] = newWindow;
    }

    function getWhljJson(mode) {

        var isWindow7 = Often.getClientOSInfo().isWin7;
        var isChat = 'INVITE_CHAT' === mode || 'NEW_CHAT' === mode;
        var whltJson;
        if ('IMAGE_VIEWER' === mode || 'SIMPLE_IMAGE_VIEWER' === mode) {
            whltJson = {width: 820, height: 720}
        } else if ('CHAT_COLLECTION' === mode) {
            whltJson = {width: 640, height: 780}
        } else if ('GOOGLE_DRIVE' === mode || 'DROPBOX_DRIVE' === mode) {
            whltJson = {width: 620, height: 720}
        } else if ('MESSENGER' === mode) {
            whltJson = {width: 420, height: 640}
        } else if ('MINI' === mode) {
            whltJson = {width: 450, height: 660}
        } else if ('GANTT' === mode) {
            whltJson = {width: 1366, height: 768}
        } else if ('CHAT_LONG_TEXT' === mode || 'CHAT_NOTICE_TEXT' === mode) {
            whltJson = {width: 420, height: 640}
        } else if (isChat && Often.isFunc("INVITATION_POPUP")) {
            whltJson = {width: 640, height: 660, resizable: 'no'}
        } else if (isChat && !Often.isFunc("INVITATION_POPUP")) {
            whltJson = {width: 431, height: 660, resizable: 'no'}
        } else if ('FAVORITE' === mode) {
            whltJson = {width: 430, height: 660, resizable: 'no'}
        } else if ('PROFILE' === mode) {
            whltJson = {width: 350, height: 640, resizable: 'no'}
        } else if ('POST_LINK' === mode) {
            whltJson = {width: 674, height: 768, resizable: 'no'}
        } else if ("flowDrive" === mode) {
            whltJson = {width: 1100, height: 800}
        } else {
            //pass
        }

        // whltJson = {width: 431, height: 661, resizable: 'no'} 기존

        if ('CHAT_COLLECTION' === mode || 'INVITE_CHAT' === mode || 'NEW_CHAT' === mode || 'PROFILE' === mode ||
            'FAVORITE' === mode || mode.indexOf('_DRIVE') > -1 || 'IMAGE_VIEWER' === mode || 'SIMPLE_IMAGE_VIEWER' === mode ||
            'CHAT_LONG_TEXT' === mode || 'CHAT_NOTICE_TEXT' === mode || 'POST_LINK' === mode) {
            whltJson.left = convertMinZero(Number(window.screenLeft) + Number(window.outerWidth));
            whltJson.top = convertMinZero(window.screenTop);
        } else {
            whltJson.left = convertMinZero(window.screenLeft + ($(window).width() - whltJson.width) / 2);
            whltJson.top = convertMinZero(window.screenTop + ($(window).height() - whltJson.height) / 2);
        }
        return whltJson;

        function convertMinZero(value) {
            return (isWindow7 && value < -1) ? 0 : value;
        }
    }

    function openPopup(url, target, whltJson, gubun) {
        var isElectron = Electron.isElectronApp();
        if (url && isElectron) {
            url = Often.getLocOrigin() + url;
            if (ELECTRON_OPEN.CHAT === gubun) Electron.openElectronMessenger(url, target, whltJson.width, whltJson.height, whltJson.left, whltJson.top);
            else Electron.openWindow(url, target, whltJson.width, whltJson.height, whltJson.left, whltJson.top);
            return;
        }
        var specs = whltJson ? ("width=" + whltJson.width + "px, height=" + whltJson.height + "px, " +
            "top=" + whltJson.top + ", left=" + whltJson.left + ", resizable=" + Often.null2Void(whltJson.resizable, 'yes')) : "";
        return window.open(url, target, specs);
    }

    function openUrlOnBrowser(tempUrl, target) {
        target = target || tempUrl;
        if (Electron.isElectronApp()) return Electron.openExternalLink(tempUrl);
        openWindow(tempUrl, target);
    }

    function openWindow(url, target) {
        url = url.replace("https://", "").replace("http://", "")
        window.open((isNotSecure(url) ? "http://" : "https://") + url, target);
    }

    /**
     * @Note. http로 전송필요한 경우
     */
    function isNotSecure(url) {
        return url.indexOf("localhost") > -1 ||
            url.indexOf('gw.oto.kr') > -1 //네오오토 그룹웨어 알림봇
    }

})();