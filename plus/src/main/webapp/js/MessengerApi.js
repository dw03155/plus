var MessengerApi = (function () {

    var messengerPageData = {
        ROOM_CHAT_SRNO: '',
        PG_NO: 1,
        PG_PER_CNT: 20,
        NEXT_YN: 'Y',
        PREV_YN: 'Y',
    }

    var $messengerHeader, $messengerUl;
    var $messengerBottomArea, $messengerInput;

    return {
        drawRoomInfo: drawRoomInfo,
        drawRoomFirstContents: drawRoomFirstContents,
        drawTempMessage: drawTempMessage,
        drawNotReadCount: drawNotReadCount,

        readMessage: readMessage,
        quitSelfMessenger: quitSelfMessenger,

        setChatAlarm: setChatAlarm,
        setChatPin: setChatPin,

        openLongMessagePopup: openLongMessagePopup,

        createNewChatting: createNewChatting,

        getMessengerPageData: getMessengerPageData,

        inviteMessenger: inviteMessenger,
        reloadMessages: reloadMessages,

        isSendingMessage: isSendingMessage,
        adjustBottomArea: adjustBottomArea,
        isReceiveAndAction: isReceiveAndAction,
        adjustBalloonPosition: adjustBalloonPosition,
    }

    function set$element() {
        $messengerHeader = $("#messengerHeader");
        $messengerUl = $("#messengerUl");
        $messengerBottomArea = $("#messengerBottomArea");
        $messengerInput = $messengerBottomArea.find(".js-messenger-text-input");
        /**
         * <section id="messengerHtml"></section>
         * <ul id="messengerUl"></ul>
         * <section id="messengerBottomArea">
         *     <ul class="js-messenger-text-input"></ul>
         *     <div>
         *         <input class="js-messenger-text-input">
         *     </div>
         * </section>
         */
    }

    function isReceiveAndAction(apiCode, data) {
        var receiverId = Often.null2Void(data.IN_RCVR_USER_ID);
        if (SocketAPI.MESSENGER.MESSAGE_UPDATE === apiCode) {
            updateMessage(data);
            return true;
        }
        if (SocketAPI.MESSENGER.READ_UPDATE === apiCode) {
            if (BotUtil.isBotRoom()) return;
            if (data.NOT_READ_CNT_REC) return drawNotReadCount(data.NOT_READ_CNT_REC);
            Ajax.executeApi(RestApi.GET.COLABO2_NOT_READ_CNT_R001, {ROOM_SRNO: _ROOM_SRNO}, function (data) {
                drawNotReadCount(data.NOT_READ_CNT_REC);
            });
            return true;
        }
        if (SocketAPI.MESSENGER.ALARM_N_PIN_UPDATE === apiCode && receiverId === _USER_ID) {
            var isPinMode = ("" !== Often.null2Void(data.PIN_YN));
            var modeKey = (isPinMode ? "PIN" : "ALARM");
            var afterValue = (isPinMode ? data.PIN_YN : data.PUSH_ALAM_YN);
            updateChatAlarmNPin(modeKey, _ROOM_SRNO, afterValue);
            return true;
        }
        if (SocketAPI.MESSENGER.PREVIEW === apiCode) {
            updateUrlMessage(data);
            return true;
        }
        return false;
    }

    function adjustBottomArea() {
        set$element()
        $messengerUl.css("bottom", $messengerBottomArea.height());
    }

    function reloadMessages() {
        ListHelper.initPageData(messengerPageData);
        roomInfo.READ_OVER_YN = 'N';
        messengerPageData.CHAT_SRCH_GB = loadMode.FIRST_LOAD;
        messengerPageData.ROOM_CHAT_SRNO = '';
        drawMessages();
    }

    function getMessengerPageData() {
        return messengerPageData;
    }

    function drawRoomFirstContents(roomInfoData) {
        roomInfo = roomInfoData;
        var $body = $('body');
        Electron.isElectronApp() && $body.addClass('electron-chat');
        $body.attr(roomInfo);
        LocalUtil.removeLocal("ONLY_MESSENGER-" + _ROOM_SRNO);
        set$element();

        drawRoomInfo(roomInfo.ROOM_NM, roomInfo.SENDIENCE_CNT);

        if (BotUtil.isBotRoom()) {
            MessengerApi.adjustBottomArea();
            MessengerEvent.addEventOnWindow();
            ChatBot.isChatBotRoom() && ChatBot.initSetting();
        } else {
            var isExistsNotice = '' !== Often.null2Void(roomInfo.NOTICE_SRNO);
            isExistsNotice && MessengerNotice.drawNoticeByData();
            MessengerEvent.initMessenger();
        }

        //roomInfo.READ_OVER_YN => Y - 안읽음건수가 페이징건수를 넘음, E - 안읽음건수가 1건 이상임, N - 안읽은건수가 없음
        //채팅로드 후 화상 회의 체크 해서 메세지 전송
        var readOverYn = roomInfo.READ_OVER_YN === 'Y';
        if (roomInfo.READ_OVER_YN !== 'N') readMessage(true, _ROOM_SRNO, roomInfo.ROOM_CHAT_SRNO);
        messengerPageData.CHAT_SRCH_GB = readOverYn ? loadMode.FIRST_OVER_LOAD : loadMode.FIRST_LOAD;
        messengerPageData.ROOM_CHAT_SRNO = readOverYn ? Often.null2Void(roomInfo.END_ROOM_CHAT_SRNO, "-1") : "";

        if (ChatBot.isChatBotRoom()) return ChatBot.getChatBotInfo(_ROOM_SRNO, drawMessages)
        drawMessages();
    }

    function drawRoomInfo(name, count) {
        set$element();
        $messengerHeader.find(".js-room-name").text(name);
        if (count > 2) $messengerHeader.find(".js-member-count").text("(" + count + ")");
        document.title = name + " - " + i18next.t("dictionary.chat") + (count > 3 ? " (" + count + ")" : "");
    }

    function drawNotReadCount(notReadCntRec) {
        if (BotUtil.isBotRoom()) return;
        set$element();
        var $messageList = $messengerUl.find("li.message-item").get().reverse();
        $($messageList).each(function (i, message) {
            var $message = $(message);
            var liRoomChatSrno = Number($message.attr("ROOM_CHAT_SRNO"));
            notReadCntRec.forEach(function (v) {
                var startRoomChatSrno = Number(v.START_ROOM_CHAT_SRNO);
                var endRoomChatSrno = Number(v.END_ROOM_CHAT_SRNO);
                if (startRoomChatSrno < liRoomChatSrno && liRoomChatSrno <= endRoomChatSrno) {
                    ListHelper.setCount($message.find(".btn-not-read"), v.NOT_READ_CNT);
                }
            })
        })
    }

    /**
     * 메세지를 그린다
     */
    function drawMessages() {
        if (messengerPageData.CHAT_SRCH_GB === loadMode.UP_SCROLL && messengerPageData.PREV_YN === 'N') return;
        if (messengerPageData.CHAT_SRCH_GB === loadMode.DOWN_SCROLL && messengerPageData.NEXT_YN === 'N') return;

        set$element();
        var endRoomChatSrno = messengerPageData.PG_NO === 1 ? $('body').attr('room_chat_srno') : ''
        var apiJson = $.extend({}, {
            ROOM_SRNO: _ROOM_SRNO,
            ROOM_CHAT_SRNO: endRoomChatSrno,
            useSyncAjax: false
        }, messengerPageData);
        if (apiJson.ROOM_CHAT_SRNO && isSendingMessage(apiJson.ROOM_CHAT_SRNO)) return;
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_MSG_R001, apiJson, function (dat) {
            VideoConference.checkOpenWithVCButton();
            if (!dat["MSG_REC"] || dat["MSG_REC"].length === 0) return;
            var isFirstLoad = messengerPageData.PG_NO === 1;
            var isReverse = false;
            var prevYN = 'Y';
            var nextYN = 'Y';
            switch (messengerPageData.CHAT_SRCH_GB) {
                case loadMode.FIRST_LOAD:
                    isReverse = false;
                    nextYN = dat["NEXT_YN"];
                    break;
                case loadMode.FIRST_OVER_LOAD:
                    isReverse = false;
                    nextYN = dat["NEXT_YN"];
                    break;
                case loadMode.UP_SCROLL:
                    isReverse = true;
                    prevYN = dat["NEXT_YN"];
                    break;
                case loadMode.DOWN_SCROLL:
                    isReverse = false;
                    nextYN = dat["NEXT_YN"];
                    break;
            }

            messengerPageData.NEXT_YN = nextYN;
            messengerPageData.PREV_YN = prevYN;

            $messengerUl.drawListHelper({
                pageData: messengerPageData,
                records: dat["MSG_REC"],
                prevYn: prevYN,
                nextYn: nextYN,
                reverse: isReverse,
                callback: {
                    item: function (dat) {
                        return MessengerHtml.getMessageItemsHtml(dat, isReverse, false);
                    },
                    scroll: function () {
                        if (!isReverse && messengerPageData.NEXT_YN === 'N' && $messengerUl.isBottom()) {
                            $messengerBottomArea.find("#balloonMessage").remove();
                        }
                        messengerPageData.CHAT_SRCH_GB = loadMode.DOWN_SCROLL;
                        messengerPageData.ROOM_CHAT_SRNO = $messengerUl.find(".message-item:visible:last").attr('ROOM_CHAT_SRNO');
                        drawMessages();
                    },
                    scrollReverse: function () {
                        if (prevYN === 'Y' && $messengerUl.scrollTop() < $messengerUl.height() * SCROLL_RATIO) {
                            $messengerUl.scrollTop($messengerUl.height() * SCROLL_RATIO_HALF);
                        }
                        messengerPageData.CHAT_SRCH_GB = loadMode.UP_SCROLL;
                        messengerPageData.ROOM_CHAT_SRNO = $messengerUl.find(".message-item:visible:first").attr('ROOM_CHAT_SRNO');
                        drawMessages();
                    },
                    final: function ($ul) {
                        MessengerSecret.findSecretTimer(dat["MSG_REC"]);
                        setLastMessageRead();
                        if (!isFirstLoad) return;
                        if (apiJson.CHAT_SRCH_GB === loadMode.FIRST_OVER_LOAD) {
                            drawReadLine();
                            $ul.moveToOffsetById('message-' + roomInfo.END_ROOM_CHAT_SRNO, false, 'start');
                            if (!$ul.isBottom()) drawBalloonMessage();
                            return;
                        }
                        if (apiJson.CHAT_SRCH_GB === loadMode.FIRST_LOAD) $ul.moveToBottom(false);
                        if (ChatBot.isChatBotRoom()) ChatBot.settingAfterMessageLoad(_ROOM_SRNO, roomInfo.CHATBOT_ROOM_CHAT_SRNO);
                        if (AlarmBot.isAlarmBotRoom()) AlarmBotEvent.addClickEvent($ul, dat["MSG_REC"][0]);
                    }
                }
            });
        });

        function drawReadLine() {
            var readLineHtml = '<div class="chat-date"><span>' + i18next.t('front.messengerApi.readUntilHere') + '</span></div>';
            $("#message-" + roomInfo.END_ROOM_CHAT_SRNO).after(readLineHtml);
        }

        function drawBalloonMessage() {
            if (MessengerApi.isSendingMessage(roomInfo.ROOM_CHAT_SRNO)) return;
            Ajax.executeApi(RestApi.GET.COLABO2_CHAT_MSG_R001, {
                ROOM_SRNO: _ROOM_SRNO,
                ROOM_CHAT_SRNO: roomInfo.ROOM_CHAT_SRNO,
                CHAT_SRCH_GB: loadMode.EQUAL_LOAD,
            }, function (dat) {
                updateBalloonMessage(Chatting.getOneMessageData(dat));
            })
        }
    }

    function updateUrlMessage(data) {
        var $previewContainer = $('#message-' + data.ROOM_CHAT_SRNO);
        if (VideoConference.isVC($previewContainer.attr("VC_SRNO"))) return;

        if ($previewContainer.find('.chat-btns').length > 0) {
            $previewContainer.find('.chat-btns')[0].remove(); //기존 시간 + 읽음카운트 없앰.
        }

        var $previewBox = $previewContainer.find('.js-preview-box');
        if ($previewBox.find('.js-url-thumb').length === 0) {
            var $urlPreviewHtml = MessengerHtml.getUrlPreviewHtml(data);
            $previewContainer.hasClass('left-section') ? $previewBox.prepend($urlPreviewHtml) : $previewBox.append($urlPreviewHtml);
            $previewBox.find('.chat-btns').addClass('chat-btn-position')
        }
        $messengerUl.moveToBottom(false);
        var previewJson = data && data.CHAT_PREVIEW_REC ? {
            CHAT_PREVIEW_LINK: data.CHAT_PREVIEW_REC.CHAT_PREVIEW_LINK,
            CHAT_PREVIEW_TTL: data.CHAT_PREVIEW_REC.CHAT_PREVIEW_TTL,
            CHAT_PREVIEW_CNTN: data.CHAT_PREVIEW_REC.CHAT_PREVIEW_CNTN,
            CHAT_PREVIEW_IMG: data.CHAT_PREVIEW_REC.CHAT_PREVIEW_IMG
        } : {}
        if (previewJson.CHAT_PREVIEW_IMG === '') $previewBox.find('.url-image').css('display', 'none')
        if (_USER_ID !== data.WEB_USER_ID) return;
        Ajax.executeApi(RestApi.PUT.COLABO2_CHAT_MSG_U001, $.extend({
            ROOM_SRNO: data.ROOM_SRNO,
            ROOM_CHAT_SRNO: data.ROOM_CHAT_SRNO,
        }, previewJson));
    }

    /**
     *
     * @param isChatOpened 채팅목록에서 읽음처리할때 false, 채팅창안에서 읽음처리할때 true
     * @param roomChatSrno 값이 들어오면 한개만 읽음, 빈값이면 전체 읽음 (default = -1)
     */

    function readMessage(isChatOpened, roomSrno, roomChatSrno, callback) {
        if (isChatOpened && MessengerEvent.isNonActiveMessengerState()) return;
        roomSrno = roomSrno ? roomSrno : (typeof _ROOM_SRNO !== "undefined") ? _ROOM_SRNO : "";
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_MSG_READ_C002, {
            ROOM_SRNO: roomSrno,
            ROOM_CHAT_SRNO: Often.null2Void(roomChatSrno, "-1"),
        }, function (dat) {

            if (isChatOpened) {
                drawNotReadCount(dat.NOT_READ_CNT_REC);
                setLastMessageRead();
                MessengerSecret.findSecretTimerWhenFocus();
            }

            if (typeof callback === 'function') callback();

            var END_SRNO = Number(Often.null2Void(dat.END_ROOM_CHAT_SRNO, 0));
            var START_SRNO = Number(Often.null2Void(dat.START_ROOM_CHAT_SRNO, 0));

            SocketControl.sendMessage({
                CHAT_CODE: SocketAPI.MAIN.READ_ALL_MESSAGE_BY_ROOM,
                ROOM_SRNO: _USER_ID,
                CHATTING_ROOM_SRNO: roomSrno,
            });

            if (START_SRNO > END_SRNO) return;

            SocketControl.sendMessage({
                CHAT_CODE: SocketAPI.MESSENGER.READ_UPDATE,
                ROOM_SRNO: roomSrno,
                USER_ID: _USER_ID,
                NOT_READ_CNT_REC: dat.NOT_READ_CNT_REC,
                //for mobile
                ROOM_CHAT_SRNO: String(START_SRNO),
                START_ROOM_CHAT_SRNO: String(START_SRNO),
                END_ROOM_CHAT_SRNO: String(END_SRNO),
            });

        });
    }

    function setLastMessageRead() {
        $messengerUl.children('li.message-item').last().attr('self-read-yn', 'Y');
    }

    function drawTempMessage(tempJson) {
        $messengerUl.append(MessengerHtml.getMessageItemsHtml([tempJson], false, true));
        $messengerUl.moveToBottom(false);
        setLastMessageRead();
    }

    function updateMessage(data) {
        var oneMessageData = Chatting.getOneMessageData(data);
        var roomChatSrno = oneMessageData.ROOM_CHAT_SRNO;
        oneMessageData.NOT_READ_CNT = roomInfo.SENDIENCE_CNT - 1; //이론상 작성자 읽음

        //본인메시지가 소켓으로 올때
        if (oneMessageData.RGSR_ID === _USER_ID) {
            var $messageItem = $("#message-" + roomChatSrno);
            if (Often.null2Void($messageItem.selector, "") !== "") {
                MessengerSend.clearTimeoutBySending(roomChatSrno);
                MessengerSend.updateNotReadCountArea(roomChatSrno, "COMPLETE");
                // return; //기기 두개일때 채팅 안들어옴
            }
        } else {
            //타인메시지가 소켓으로 올때, 바로 읽음처리
            var isFocusIn = document.hasFocus();
            if (isFocusIn) {
                oneMessageData.NOT_READ_CNT = roomInfo.SENDIENCE_CNT - 2; //이론상 작성자와 내가 읽음
                readMessage(true, _ROOM_SRNO, roomChatSrno);
            }
        }

        if (ChatBot.isChatBotRoom()) return ChatBot.updateMessageAndSettingAfterLoad(oneMessageData);
        updateOrderMessage(oneMessageData);
        adjustLayout();

        //메세지 수신 이후 이모티콘창, 새 메세지말풍선, 스크롤 등 레이아웃 조정
        function adjustLayout() {
            var isEmotiListLayerOpened = $('.js-emoti-section-layer').is(":visible");
            var isOneEmotiLayerOpened = $('.js-emoti-send-layer').is(":visible");
            if ($messengerUl.isBottom() && !isEmotiListLayerOpened && !isOneEmotiLayerOpened) {
                $messengerUl.moveToBottom(false);
            } else {
                updateBalloonMessage(oneMessageData, data.WEB_USER_ID);
                adjustBalloonPosition();
            }
        }
    }

    //비동기 소켓 통신에 따른 순서 보장 로직
    function updateOrderMessage(oneRoomData) {

        //초대문구 예외처리
        if (oneRoomData.ROOM_CHAT_SRNO === "" && oneRoomData.MSG_GB === "A") {
            $messengerUl.append(MessengerHtml.getMessageItemsHtml([oneRoomData], false, true));
            return;
        }

        //아래에서 다섯개 정도는 비교에서 순서에 맞추어 채팅을 붙여줌
        for (var i = 1; i <= 5; i++) {
            var orderMessage = $messengerUl.find(".message-item").eq(-1 * i);
            var orderMessageNumber = Number(orderMessage.attr("room_chat_srno"));
            var targetMessageNumber = Number(oneRoomData.ROOM_CHAT_SRNO);
            if (orderMessageNumber < targetMessageNumber) {
                orderMessage.after(MessengerHtml.getMessageItemsHtml([oneRoomData], false, true));
                if (oneRoomData.BOMB_YN === 'Y') MessengerSecret.startSecretTimerIfFocus(oneRoomData.BOMB_TIMER, targetMessageNumber);
                break;
            }
        }
    }

    //스크롤이 하단이 아닐때 , 이모티콘 레이어 떠있을 때
    function updateBalloonMessage(oneRoomData, sendUserId) {
        if (oneRoomData.MSG_GB === MessageType.CHANGED && sendUserId === _USER_ID) return;
        $messengerBottomArea.find("#balloonMessage").remove();
        $messengerBottomArea.prepend(MessengerHtml.getBalloonMessageHtml(oneRoomData));
    }

    function adjustBalloonPosition() {
        var $jsEmotiSectionLayer = $('.js-emoti-section-layer');
        var $jsEmotiSendLayer = $('.js-emoti-send-layer');
        var $balloonMesssage = $("#balloonMessage");
        var isEmotiListLayerOpened = $jsEmotiSectionLayer.is(":visible");
        var isEmotiSendLayerOpened = $jsEmotiSendLayer.is(":visible");
        if (isEmotiListLayerOpened && !isEmotiSendLayerOpened) $balloonMesssage.css('bottom', $jsEmotiSectionLayer.height());
        else if (isEmotiListLayerOpened && isEmotiSendLayerOpened) $balloonMesssage.css('bottom', $jsEmotiSectionLayer.height() - $jsEmotiSendLayer.height());
        else $balloonMesssage.css('bottom', 0);
    }

    function quitSelfMessenger(roomSrno, successCallback, roomGb) {
        var isProjectChat = RoomType.PROJECT === (roomGb ? roomGb : roomInfo.ROOM_GB);
        if (isProjectChat) return Often.toast("info", '프로젝트 채팅방에서는 나갈 수 없습니다!');

        PopupDraw.drawConfirm({
            contents: {main: Interpolation.breakLine(i18next.t('front.chatting.leave'))},
            callback: {submit: deleteParticipant}
        });

        function deleteParticipant() {
            Ajax.executeApi(RestApi.DELETE.COLABO2_CHAT_SENDIENCE_D001, {
                IN_RCVR_USER_ID: _USER_ID,
                ROOM_SRNO: roomSrno,
            }, function (dat) {

                MessengerNotice.applyNoticeStatus(noticeCode.NONE, roomSrno);

                SocketControl.sendMessage({
                    CHAT_CODE: SocketAPI.MAIN.ROOM_LEAVE,
                    ROOM_SRNO: _USER_ID,
                    CHATTING_ROOM_SRNO: roomSrno,
                });

                (typeof successCallback === "function") && successCallback(roomSrno);

                var roomChatSrno = Often.null2Void(dat.ROOM_CHAT_SRNO, "");
                if (roomChatSrno === "") return;

                SocketControl.sendMessage({
                    CHAT_CODE: SocketAPI.MESSENGER.MESSAGE_UPDATE,
                    ROOM_SRNO: roomSrno,
                    MSG_REC: [MessengerJsonMaker.makeSpecialMsgRecJson("A", roomChatSrno, {ROOM_SRNO: roomSrno})],
                });

                SocketControl.sendMessage({
                    CHAT_CODE: SocketAPI.MESSENGER.JOIN_N_LEAVE,
                    ROOM_SRNO: roomSrno,
                    DEL_USER_REC: [{IN_RCVR_USER_ID: _USER_ID, RCVR_USER_NM: _USER_NM}]
                });
            });
        }
    }

    function setChatAlarm(roomSrno) {
        var isNoAlarm = _IsMini ? $('#chatting-' + roomSrno).find('.no-alarm').is(':visible') : roomInfo.PUSH_ALAM_YN === 'N';
        var afterAlarmValue = isNoAlarm ? "Y" : "N";
        Ajax.executeApi(RestApi.PUT.COLABO2_CHAT_SENDIENCE_U001, {
            PUSH_ALAM_YN: afterAlarmValue,
            ROOM_SRNO: roomSrno,
        }, function () {
            var alarmMessage = i18next.t(isNoAlarm ? 'front.chatting.alarmOn' : 'front.chatting.alarmOff');
            $('#detailToolTip').text(alarmMessage);
            Often.toast("info", alarmMessage);
            SocketControl.sendAlarmAndPinUpdate(true, afterAlarmValue, roomSrno);
        });
    }

    function setChatPin(roomSrno) {
        var pinYn = _IsMini ? $('#miniChatPlusArea').find('ul').attr('pin_yn') : roomInfo.PIN_YN;
        var afterPinValue = (pinYn === 'Y' ? 'N' : 'Y');
        Ajax.executeApi(RestApi.PUT.COLABO2_CHAT_SENDIENCE_U005, {
            ROOM_SRNO: roomSrno,
            PIN_YN: afterPinValue,
        }, function (dat) {
            if (dat.RESULT_CD !== "RUN") return Often.toast('info', i18next.t('front.alert.maximumPinned', {count: 5}));
            var pinMessage = i18next.t('front.alert.successfullyChange',
                {status: (afterPinValue === "N") ? '$t(dictionary.unPin)' : '$t(dictionary.pin)'})
            Often.toast("info", pinMessage);
            SocketControl.sendAlarmAndPinUpdate(false, afterPinValue, roomSrno);
        });
    }

    function updateChatAlarmNPin(mode, roomSrno, afterValue) {
        if (mode === "ALARM") {
            if (!_IsMini) roomInfo.PUSH_ALAM_YN = afterValue
            else MiniChatting.changeAlarmIconState(roomSrno);
            MessengerMenu.changeAlarmIconState(afterValue);
        } else {
            if (!_IsMini) roomInfo.PIN_YN = afterValue;
            else MiniChatting.initMiniChatting();
            MessengerMenu.changePinIconState(afterValue);
        }
    }

    function openLongMessagePopup(roomSrno, roomChatSrno) {
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_MSG_R002, {
            ROOM_SRNO: roomSrno,
            ROOM_CHAT_SRNO: roomChatSrno,
        }, function (dat) {
            var contents = "T" === ROOM_KIND ? getContentsByChatBot(dat.CNTN) : dat.CNTN;
            var longPopupHtml = ListHelper.replaceJson($('#messengerLongItem').html(), $.extend({}, dat, {
                'message-date': Tz.momentTimeZone(dat.RGSN_DTTM, "type2"),
                'message-cntn': TagConvert.db2HtmlStringByChat(contents),
            }));
            var $messengerLongPopup = $('#messengerLongPopup');
            $messengerLongPopup.append(longPopupHtml).removeClass('d-none');
            $messengerLongPopup.find('.js-long-copy').off('click').on('click', copyLongMessage);
        });


        function getContentsByChatBot(jsonContents) {
            if ("" === Often.null2Void(jsonContents)) return;

            var rexSafeTag1 = /(<safetag>(.*?)<\/safetag>)/ig
            var rexSafeTag2 = /(<safetag>|<\/safetag>)/ig
            var returnContents = "";

            try {
                var convertStr = jsonContents2cntn(jsonContents).replace(/<br>/ig, wrapSafeTag("<br>"))
                convertStr.split('<tagsplit>').forEach(function (v) {
                    if (Often.null2Void(v) === "") return;
                    returnContents += rexSafeTag1.test(v) ? v.replace(rexSafeTag2, "") : TagUtil.html2tag(v);
                })
                return returnContents;
            } catch (e) {
                return jsonContents;
            }

            function wrapSafeTag(str) {
                return "<tagsplit><safetag>" + str + "</safetag><tagsplit>";
            }

            function jsonContents2cntn(strJson) {
                return ("T" === ROOM_KIND && "" !== LINE_NUM && "" !== CARD_NUM)
                    ? JSON.parse(strJson).lines[LINE_NUM].cards[CARD_NUM].contents[0].text : strJson;
            }
        }
    }

    function copyLongMessage() {
        ClipBoard.copyTextData($('#messengerLongPopup').find('.js-long-content').html())
    }

    function createNewChatting(isInvite) {
        OpenUtil.openSubScreen({
            CONNECT_ID: SocketControl.getRoomConnectId(),
            GB: isInvite ? 'INVITE_CHAT' : 'NEW_CHAT',
            ROOM_SRNO: isInvite ? _ROOM_SRNO : '',
        })
    }

    function inviteMessenger(data, callback) {

        SocketControl.sendMessage({
            CHAT_CODE: SocketAPI.MESSENGER.MESSAGE_UPDATE,
            ROOM_SRNO: data.ROOM_SRNO,
            MSG_REC: [MessengerJsonMaker.makeSpecialMsgRecJson("A", "", {
                RECEIVE_NAME_RECORD: data.SENDIENCE_REC,
                SEND_NAME: _USER_NM,
                ROOM_SRNO: data.ROOM_SRNO
            })]
        });

        SocketControl.sendMessage({
            CHAT_CODE: SocketAPI.MESSENGER.JOIN_N_LEAVE,
            ROOM_SRNO: data.ROOM_SRNO,
            ADD_USER_REC: data.SENDIENCE_REC
        });
        if (typeof callback === 'function') callback();
    }

    function isSendingMessage(roomChatSrno) {
        return (String(Often.null2Void(roomChatSrno)).indexOf("Q") === 0);
    }

})()

