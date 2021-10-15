var Chatting = (function () {

    var searchTimer;

    var chattingPageData = {
        PG_NO: 1,
        PG_PER_CNT: 20,
        NEXT_YN: "Y",
    }

    return {
        getOneMessageData: getOneMessageData,
        getProfileRoomType: getProfileRoomType,
        getRoomInfo: getRoomInfo,

        toggleLayer: toggleLayer,
        closeLayer: closeLayer,

        drawTopNotReadCount: drawTopNotReadCount,
        drawOneChattingListItem: drawOneChattingListItem,
        removeChattingLayer: removeChattingLayer,
        changeContents: changeContents,

        updateChattingLayer: updateChattingLayer,
        readMessageAndOpenMessenger: readMessageAndOpenMessenger,
    }

    function updateChattingLayer(sendData) {

        var sendMessageData = getOneMessageData(sendData);
        var $chattingUl = $("#chattingUl");
        var $targetChattingItem = getChattingItem(sendData);

        //리스트상에 타겟채팅방이 없는 경우
        if (!$targetChattingItem) {
            updateDataNOrderOnChattingItem(sendData);
            return
        }

        var apiCode = Often.null2Void(sendData.CHAT_CODE);
        var isChangeMyRoomName = Often.null2Void(sendData.ROOM_NM) !== "";

        var firstRoomSrno = $chattingUl.find(".js-chatting-item:visible:first").attr('data-room_srno');
        var firstRoomSrnoExceptPin = getFirstRoomSrnoExceptPin();
        var isTargetPinned = $targetChattingItem.find(".pin").is(":visible");

        //이미지, 파일 아이콘 초기화
        $targetChattingItem.find(".js-image-icon, .js-file-icon").css("display", "none");

        //채팅방 읽음처리
        if (SocketAPI.READ_ALL_MESSAGE_BY_ROOM === apiCode) {
            updateBadgeOnChattingItem($targetChattingItem, 0);
            return;
        }
        //전체삭제/나만삭제 : 삭제는 순서/시간 갱신을 하지 않는다.
        if (SocketAPI.MAIN.DELETE_MESSAGE_ALL_VIEW === apiCode //전체삭제
            || (SocketAPI.MAIN.DELETE_MESSAGE_MY_VIEW === apiCode && sendData.WEB_USER_ID === sendData.ROOM_SRNO)) { //나만삭제
            $targetChattingItem.find(".js-cntn").text(i18next.t('front.alert.deletedMessage'));
            return;
        }

        //채팅방 이름변경
        if (isChangeMyRoomName) {
            $targetChattingItem.find(".js-title").text(sendData.ROOM_NM);
            $targetChattingItem.attr("room-nm", sendData.ROOM_NM);
            if (sendData.DEL_GB === 'T') { // 상대방 채팅방 이름도 함께 변경
                $targetChattingItem.find(".js-cntn").text(changeContents(sendData));
                $targetChattingItem.find(".js-date").text(Tz.momentTimeZone(moment(), "type8"));
                updateDataNOrderOnChattingItem(sendData, $targetChattingItem);
            }
            return;
        }

        // 알림, 상단고정 업데이트가 아니고 타겟이 상단고정 맨위 위치했거나 상단고정 제외 맨위 위치했으면
        if ((SocketAPI.MAIN.ALARM_N_PIN_UPDATE !== apiCode) &&
            (firstRoomSrno === sendMessageData.ROOM_SRNO && isTargetPinned) ||
            (firstRoomSrnoExceptPin === sendMessageData.ROOM_SRNO && !isTargetPinned)) {
            updateDataOnChattingItem($targetChattingItem, sendMessageData); //내용과 시간, 뱃지건수만 갱신
        } else {
            updateDataNOrderOnChattingItem(sendData, $targetChattingItem); //순서까지 갱신
        }
    }

    //데이터 업데이트도 하지만 순서 재정렬도 가는거지.
    function updateDataNOrderOnChattingItem(msgData, $targetChattingItem) {
        var sendData = msgData.MSG_REC ? getOneMessageData(msgData) : msgData
        sendData.ROOM_SRNO = sendData.CHATTING_ROOM_SRNO || sendData.ROOM_SRNO || msgData.CHATTING_ROOM_SRNO || msgData.ROOM_SRNO;

        //소켓 받아서 처리할때는 해당 방 값을 조회하여 보여줌
        getRoomInfo(true, sendData.ROOM_SRNO, function (dat) {

            //Todo. $targetChattingItem가 없을때도 있어서 dat 에서 꺼내올수 있어야함.
            sendData.BG_COLOR_CD = Often.null2Void($targetChattingItem && $targetChattingItem.attr("data-bg-color-cd"), "0");
            var isPinOrAlarmUpdate = SocketAPI.MAIN.ALARM_N_PIN_UPDATE === sendData.CHAT_CODE;

            var isSelfChat = dat.ROOM_GB === RoomType.SELF || (dat.ROOM_GB === RoomType.MULTI && dat.SENDIENCE_CNT === 1)
            sendData.SENDIENCE_PHTG = isSelfChat ? (Often.getLocOrigin() + _PRFL_PHTG) : dat.PRFL_PHTG;
            sendData.NOT_READ_CNT = dat.NOT_READ_CNT - 1; //Todo. DB에서 +1 상태로 내려온다.
            sendData = $.extend({}, dat, sendData);

            var $chattingUl = $("#chattingUl");
            if (isPinOrAlarmUpdate) {
                var targetRoomEl = $chattingUl.find("#chatting-" + sendData.ROOM_SRNO)
                sendData.CNTN = targetRoomEl.find(".js-cntn").text().trim();
            }
            var $chattingItem = getChattingItemsObj([sendData]);
            $targetChattingItem && $targetChattingItem.remove();

            var $chattingNull = $chattingUl.find('.js-project-null');
            $chattingNull && $chattingNull.remove()

            !$chattingUl.find("#chatting-" + sendData.ROOM_SRNO).is(":visible") && $chattingUl.prepend($chattingItem);
            !isPinOrAlarmUpdate && updateDataOnChattingItem($chattingItem, sendData);

            var isPin = dat.PIN_YN === "Y";
            !isPin && moveUnPinChattingElOnTop($chattingUl);
        })

        //상단고정이 아닌 채팅방이 상단고정 바로 아래에 붙도록함
        function moveUnPinChattingElOnTop($chattingUl) {
            var $pinLi = $chattingUl.find("li[pin-yn=Y]");
            if ($pinLi.length === 0) return;
            var pinLiArr = [];
            $pinLi.each(function (i, v) {
                pinLiArr.push(v);
            });
            $chattingUl.find("li[pin-yn=Y]").remove();
            for (var i = pinLiArr.length; i >= 0; i--) {
                $chattingUl.prepend(pinLiArr.pop());
            }
        }
    }

    function getOneMessageData(data) {
        if (data && data.MSG_REC && data.MSG_REC.length > 0) return data.MSG_REC[0]
        else return {}
    }

    function drawTopNotReadCount() {
        Ajax.executeApi(RenewalApi.GET.ACT_ROOM_LIST, {MODE: "COUNT"}, function (dat) {
            var $targetObj = $(_IsMini ? "#allChatAlarmCount" : "#chatTopCount");
            ListHelper.setCount($targetObj, dat.NOT_READ_CNT);
        })
    }

    function toggleLayer() {
        if (_IsMini) {
            drawChattingList();
            return;
        }
        var $chattingLayer = $("#chattingLayer");
        if ($chattingLayer.is(":visible")) return closeLayer();

        $chattingLayer.fadeIn(200);

        drawChattingList();
        setChattingAlarmState($chattingLayer);
        initChattingEvent();
    }

    function closeLayer() {
        var $chattingLayer = $("#chattingLayer");
        $chattingLayer.fadeOut(200, initToggleLayer);

        function initToggleLayer() {
            $chattingLayer.find('#chattingSearchInput').val('');
            $chattingLayer.find('#chatMemberList').addClass('d-none');
            $chattingLayer.find('#contactBtn span').removeClass('on');
            $chattingLayer.find('#chatBtn span').addClass('on');
            $chattingLayer.find('#chattingUl').removeClass('d-none');
        }
    }

    function initChattingEvent() {
        $("#chattingLayer").off("click").on("click", chatPopupClickEvent);
        $("#chattingSearchInput").off("keyup").on("keyup", chatPopupKeydownEvent);
        $("#chatCloseBtn").off('click').on('click', closeLayer);
    }

    function chatPopupKeydownEvent(e) {
        searchTimer && clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            if ($("#chatBtn span").hasClass("on")) return drawChattingList(true, e);
            drawContactList();
        }, 200);
    }

    function chatPopupClickEvent(e) {
        var $eTarget = $(e.target);
        if (isChatBtnAndAction()) return;
        if (isContactBtnAndAction()) return;
        if (isAlarmBtnAndAction()) return;
        if (isNewChatBtnAndAction()) return;

        function isChatBtnAndAction() {
            var $chatBtn = $eTarget.findUp("#chatBtn");
            if ($chatBtn.length === 0) return false;
            $('#chattingSearchInput').val('');
            ListHelper.initPageData(chattingPageData);
            drawChattingItems();
            $("#chatTabMenu").find("span").removeClass("on");
            $chatBtn.find("span").addClass("on");
            $(".chat-list-area").removeClass("d-none");
            $(".contact-area").addClass("d-none");
            return true;
        }

        function isContactBtnAndAction() {
            var $contactBtn = $eTarget.findUp("#contactBtn");
            if ($contactBtn.length === 0) return false;
            $('#chattingSearchInput').val('');
            drawContactList()
            $("#chatTabMenu").find("span").removeClass("on");
            $contactBtn.find("span").addClass("on");
            $(".chat-list-area").addClass("d-none");
            $(".contact-area").removeClass("d-none");
            return true;
        }

        function isAlarmBtnAndAction() {
            var $alarmBtn = $eTarget.findUp('.js-allChat-alarm');
            if ($alarmBtn.length === 0) return false;
            var isAlarmStateOn = $alarmBtn.hasClass("on");
            controlChattingAlarm($alarmBtn, isAlarmStateOn);
            Ajax.executeApi(RestApi.PUT.COLABO2_USER_SET_U002, {CHAT_ALAM_YN: isAlarmStateOn ? 'N' : 'Y'}, function () {
                LocalUtil.setLocalValue("ONLY_USER_SETTING", "CHAT_ALAM_YN", isAlarmStateOn ? 'N' : 'Y');
            })
            return true;
        }

        function isNewChatBtnAndAction() {
            var $newChatBtn = $eTarget.findUp('.js-new-chat');
            if ($newChatBtn.length === 0) return false;
            MessengerApi.createNewChatting(false);
            return true;
        }
    }

    function controlChattingAlarm($alarmBtn, isAlarmStateOn) {
        var addClass = isAlarmStateOn ? 'off' : 'on';
        var removeClass = isAlarmStateOn ? 'on' : 'off';
        var mouserOverMessage = i18next.t(isAlarmStateOn ? 'front.chatting.alarmOff' : 'front.chatting.alarmOn');
        $alarmBtn.removeClass(removeClass)
            .attr('mouseover-text', mouserOverMessage)
            .addClass(addClass)
            .html('<i class="icon-alarm"></i>');
    }

    function setChattingAlarmState($chattingLayer) {
        Ajax.executeApi(RestApi.GET.COLABO2_SET_R101, {}, function (dat) {
            var $alarmBtn = $chattingLayer.find(".js-allChat-alarm");
            var isAlarmStateOn = dat.CHAT_ALAM_YN === "N";
            controlChattingAlarm($alarmBtn, isAlarmStateOn);
        })
    }

    function drawChattingList(isInputKeyDown, e) {
        ListHelper.initPageData(chattingPageData);
        if (isInputKeyDown && KeyCheck.isKey(e, "DOWN")) {
            var $searchInput = $(_IsMini ? "#miniSearchInput" : "#chattingSearchInput");
            return ListEvent.arrowDownOnInput("CHAT", $searchInput, $('#chattingUl'));
        }
        drawChattingItems();
    }

    function drawContactList() {
        Member.initPage();
        Member.makeMemberList($("#chatMemberList"), $("#chattingSearchInput"), "", "contact", function () {
            var $chatMemberList = $("#chatMemberList");
            $chatMemberList.find(".participant-chat-button").removeClass("d-none");
            $chatMemberList.find(".my-check-2").addClass("d-none");
            $chatMemberList.off("click").on("click", Participant.clickParticipantsArea);
        });
    }

    function drawChattingItems() {
        if (chattingPageData.NEXT_YN === "N") return;
        var chattingSearchInput = $(_IsMini ? "#miniSearchInput" : "#chattingSearchInput");
        var chattingSearchValue = $.trim(chattingSearchInput.val());
        var $chattingUl = $("#chattingUl");
        Ajax.executeApi(RenewalApi.GET.ACT_ROOM_LIST, $.extend({}, chattingPageData, {
            SRCH_WORD: chattingSearchValue,
        }), function (dat) {
            if (chattingPageData.PG_NO === 1) {
                ListHelper.setCount($("#chatTopCount"), dat.NOT_READ_CNT, "inline-block");
            }
            $chattingUl.drawListHelper({
                pageData: chattingPageData,
                nextYn: dat["NEXT_YN"],
                noDataHtml: ListHelper.getNoDataHtml(chattingSearchValue ? "SEARCH" : "CHAT"),
                records: dat["LIST_REC"],
                targetObj: {
                    focus: chattingSearchInput,
                },
                callback: {
                    click: clickChattingUl,
                    dblclick: dblClickChattingUl,
                    item: getChattingItemsObj,
                    scroll: drawChattingItems,
                    final: function () {
                        var $targetObj = $(_IsMini ? "#allChatAlarmCount" : "#chatTopCount");
                        ListHelper.setCount($targetObj, dat.NOT_READ_CNT);
                    }
                }
            })
        })
    }

    function drawOneChattingListItem(data) {
        var $chattingUl = $("#chattingUl");
        var appendHtml = '';
        var chatting = data.CHAT_DATA;
        var memberCount = Number(chatting.SENDIENCE_CNT) === 1 ? 1 : Number(chatting.SENDIENCE_CNT) - 1;

        appendHtml += ListHelper.replaceJson($("#chattingItem").html(), $.extend({}, chatting, {
            'profile-display-type': getProfileRoomType(chatting.ROOM_GB, memberCount, chatting.BG_COLOR_CD),
            'sendience-cnt-display': ListHelper.setDisplay(Number(chatting.SENDIENCE_CNT) > 2),
            'profile': ListHelper.setProfileImg(chatting.ROOM_GB, getSendiencePhtg()),
            'no-alarm-display': ListHelper.setDisplay(false),
            'pin-display': ListHelper.setDisplay(false),
            'not-read-display': ListHelper.setDisplay(false),
            'CONVT_DTTM': Tz.momentTimeZone(moment(), "type11"),
            'CNTN': MessengerJsonMaker.makeSpecialMsgRecJson("A_INVITE", "", {
                SEND_NAME: _USER_NM,
                RECEIVE_NAME: chatting.ROOM_NM, //Todo. 방이름이 맞을까?
            }).CNTN
        }))
        $chattingUl.find('.js-chatting-item[pin-yn="Y"]').last().after(appendHtml);

        function getSendiencePhtg() {
            var sendiencePhtg = '';
            chatting.SENDIENCE_REC.forEach(function (v) {
                sendiencePhtg += v.PRFL_PHTG + ', ';
            });
            return sendiencePhtg;
        }
    }

    function clickChattingUl(e) {
        var $eTarget = $(e.target);
        var $chattingItem = $eTarget.findUp(".js-chatting-item");
        if ($chattingItem.length === 0) return;

        $('#miniSearchInput').blur();
        $('.js-chatting-item').removeClass('on');
        $chattingItem.toggleClass('on').focus();
        if (Electron.isElectronApp() && _IsMini) return;

        var roomSrno = $chattingItem.attr('data-room-srno');

        /**
         * @Note.
         * 열리고 있는 상태인 메신저는 두번 클릭이 안되도록 해야함.
         * 현재 localStorage에서 없어지지 않은 ONLY_MESSENGER 들이 있으면 로직상의 충돌이 있기때문에
         * 아래 코드는 해당 이슈 해결 이후 적용해야함.
         */
        // if(LocalUtil.getLocalJson("ONLY_MESSENGER-" + roomSrno)) return;
        getRoomInfo(true, roomSrno, function (dat) {
            readMessageAndOpenMessenger(dat.READ_OVER_YN !== 'N', roomSrno)
        })
    }

    function dblClickChattingUl(e) {
        var $eTarget = $(e.target);
        var $chattingItem = $eTarget.findUp(".js-chatting-item");
        if ($chattingItem.length === 0 || !Electron.isElectronApp()) return;

        var roomSrno = $chattingItem.attr('data-room-srno');
        getRoomInfo(true, roomSrno, function (dat) {
            readMessageAndOpenMessenger(dat.READ_OVER_YN !== 'N', roomSrno)
        })
    }

    /**
     * Note.
     * 읽음 처리가 모두 끝나기 전에 채팅방에서 메세지들을 조회할경우
     * 읽음목록/카운트에 문제가 발생할 수 있어 완전히 읽고난 후 창 오픈
     */
    function readMessageAndOpenMessenger(isReadOverExist, roomSrno) {
        if (!isReadOverExist) return OpenUtil.openMessengerByRoomSrno(roomSrno);
        MessengerApi.readMessage(false, roomSrno, '', function () {
            OpenUtil.openMessengerByRoomSrno(roomSrno);
        });
    }

    function getChattingItemsObj(chattingArray) {
        var returnHtml = "";
        var baseHtml = $("#chattingItem").html();

        $.each(chattingArray, function (i, chatting) {
            var isPin = ("Y" === Often.null2Void(chatting.PIN_YN, "N"));
            var isNoAlarm = ("N" === Often.null2Void(chatting.PUSH_ALAM_YN, "Y"));
            var isNotReadCount = (Number(Often.null2Void(chatting.NOT_READ_CNT, "0")) > 0);
            var memberCount = Number(chatting.SENDIENCE_CNT) === 1 ? 1 : Number(chatting.SENDIENCE_CNT) - 1;
            var isBomb = chatting.BOMB_YN === 'Y';
            returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, chatting, {
                'ROOM_NM': chatting.ROOM_NM,
                'BG_COLOR_CD': chatting.BG_COLOR_CD,
                'profile-display-type': getProfileRoomType(chatting.ROOM_GB, memberCount, chatting.BG_COLOR_CD),
                'sendience-cnt-display': ListHelper.setDisplay(chatting.SENDIENCE_CNT > 2),
                'profile': ListHelper.setProfileImg(Often.null2Void(chatting.ROOM_GB), Often.null2Void(chatting.SENDIENCE_PHTG)),
                'no-alarm-display': ListHelper.setDisplay(isNoAlarm, 'inline-block'),
                'pin-display': ListHelper.setDisplay(isPin, 'inline-block'),
                'not-read-display': ListHelper.setDisplay(isNotReadCount, 'inline-block'),
                'img-display': ListHelper.setDisplay(!isBomb && chatting.MSG_GB === 'I', 'inline-block'),
                'file-display': ListHelper.setDisplay(!isBomb && chatting.MSG_GB === 'F', 'inline-block'),
                'CNTN': chatting.CNTN,
                'date': chatListSetting(chatting.RGSN_DTTM),
            }))
        });
        return $(returnHtml);
    }

    function chatListSetting(lastChatTime) {
        var today = moment();
        var isToday = Tz.momentTimeZone(today, "type2") === Tz.momentTimeZone(lastChatTime, "type2");
        var isYesterDay = moment(today, 'YYYYMMDD').diff(moment(lastChatTime, "YYYYMMDD"), 'days') === 1
        return isYesterDay ? '어제' : Tz.momentTimeZone(lastChatTime, isToday ? "type8" : 'type2');
    }

    function getProfileRoomType(roomType, sendienceLength, bgColorCd) {
        var returnValue;
        if (roomType === RoomType.PROJECT) {
            returnValue = 'project-chat color-code-' + Often.null2Void(bgColorCd, "0");
        } else if (roomType === RoomType.MULTI) {
            returnValue = sendienceLength > 4 ? 'type4' : 'type' + sendienceLength;
        } else {
            returnValue = 'type1';
        }
        return returnValue;
    }

    /**
     * @param isExecute true - db에서 roomInfo 다시 갱신함.
     *                  false - local에서 꺼내와서 사용함. (default)
     *                  채팅창이 켜지기 전에 true로 읽음처리를 하고,
     *                  읽음처리 전의 end_room_chat이 읽음 이후에도 갱신되지 않게 해서 마지막 읽은 위치를 설정.
     * @param roomSrno
     * @param callback
     */
    function getRoomInfo(isExecute, roomSrno, callback) {
        if (!isExecute) {
            var roomInfoData = LocalUtil.getLocalJson("ONLY_MESSENGER-" + roomSrno);
            var isExistsRoomInfo = Often.null2Void(roomInfoData) !== "";
            if (isExistsRoomInfo) return (typeof callback === 'function') && callback(roomInfoData);
        }
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_R001, {
            ROOM_SRNO: roomSrno,
            PG_NO: 1,
        }, function (dat) {
            LocalUtil.setLocalJson("ONLY_MESSENGER-" + roomSrno, dat);
            (typeof callback === 'function') && callback(dat);
        }, function (err) {
            SentryMonitor.captureException("NOT_INCLUDED_CHAT ERROR : " + roomSrno + " / " + JSON.stringify(err))
        })
    }

    function removeChattingLayer(msgData) {
        var $targetChattingItem = getChattingItem(msgData);
        if (!$targetChattingItem) return;
        $targetChattingItem.remove();
        var $chattingUl = $("#chattingUl");
        $chattingUl.is(":empty") && $chattingUl.append(ListHelper.getNoDataHtml("CHAT"))
    }

    function getChattingItem(msgData) {
        var $chattingItem1 = $("#chatting-" + msgData.CHATTING_ROOM_SRNO);
        if ($chattingItem1.length > 0) return $chattingItem1;
        try {
            return $("#chatting-" + msgData.ROOM_SRNO);
        } catch (e) {
            return null
        }
    }

    function updateDataOnChattingItem($chattingItem, chatData) {
        var applyRgsnDttm = chatData.RGSN_DTTM;
        var applyRgsnId = chatData.RGSR_ID;
        var isAnotherUser = _USER_ID !== applyRgsnId;
        var isFile = chatData.MSG_GB === "F";
        var isImage = chatData.MSG_GB === "I";
        var contents = changeContents(chatData);
        var currentCount = Number(Often.null2Void($chattingItem.find(".not-read-count").text(), "0"));

        $chattingItem.find(".js-image-icon").css("display", isImage ? "inline-block" : "none");
        $chattingItem.find(".js-file-icon").css("display", isFile ? "inline-block" : "none");
        $chattingItem.find(".js-cntn").text(contents);
        $chattingItem.find(".js-date").text(chatListSetting(applyRgsnDttm));

        /**
         *  포커스된 채팅방은 깜빡거리지 않게 하기위해 body로 attr을 보내 판단기준으로 하려고 했으나,
         *  채팅방을 꺼도 attr이 바뀌지 않아 뱃지가 업데이트되지 않는 현상이 발생함.
         *  일단 채팅알림이 아얘 안온다고 느끼는 문제가 더 크리티컬하기 때문에 깜빡이더라도 attr로 판단하는 로직은 보류.
         */
        // var isFocusedChat = $("body").attr("data-focus-room-srno") === chatData.ROOM_SRNO;
        // if (isFocusedChat) $chattingItem.find('.not-read-count').css('display', 'none').text('0')
        isAnotherUser && updateBadgeOnChattingItem($chattingItem, currentCount + 1);

    }

    function updateBadgeOnChattingItem($chattingItem, count) {
        ListHelper.setCount($chattingItem.find(".not-read-count"), count);
    }

    //Note. RoomConvert.java 참고
    function changeContents(chatData, isOrigin, isLongText) {

        var isChangeRoomName = Often.null2Void(chatData.DEL_GB, '') === 'T';
        var applyCntn = chatData.CNTN;
        var applyMsgGb = chatData.MSG_GB;
        var applyBombYn = chatData.BOMB_YN
        var applyRgsnNm = Often.null2Void(chatData.RGSR_NM, chatData.SEND_USER_NM);
        var applyVcSrno = Often.null2Void(chatData.VC_SRNO, "0");
        var isLong = "Y" === Often.null2Void(chatData.LONG_YN, "N") || isLongText;
        var roomSrno = chatData.CHATTING_ROOM_SRNO ? chatData.CHATTING_ROOM_SRNO : chatData.ROOM_SRNO;

        applyCntn = (applyCntn === "()" ? "" : applyCntn);

        if (isOrigin) {
            if (applyMsgGb === 'X') return i18next.t('front.alert.deletedMessage');
            else return TagConvert.db2HtmlStringByChat(applyCntn, isLong);
        }

        var returnText = "";
        if (applyBombYn === "Y") returnText = i18next.t('front.common.chatSecret');
        else if (applyMsgGb === "I") returnText = i18next.t('dictionary.image')
        else if (applyMsgGb === "F") returnText = i18next.t('dictionary.attachment')
        else if (applyMsgGb === "E") returnText = i18next.t('dictionary.emoji');
        else if (applyMsgGb === "T") returnText = i18next.t('front.common.chatbot');
        else if ("0" !== applyVcSrno) returnText = i18next.t('front.common.userVideoConference', {user: applyRgsnNm});

        if ("" !== returnText) {
            returnText = ListHelper.replaceJson("({contents})", {contents: returnText});
            return returnText;
        }

        if (isChangeRoomName) returnText = getContents("C", {SEND_NAME: applyRgsnNm, ROOM_SRNO: roomSrno});
        else if (applyMsgGb === "X") returnText = getContents("X");
        else returnText = TagConvert.db2TwoStringByChatting(applyCntn);

        return returnText;

        function getContents(msgGb, dataJson) {
            return MessengerJsonMaker.makeSpecialMsgRecJson(msgGb, '', dataJson).CNTN;
        }
    }

    function getFirstRoomSrnoExceptPin() {
        var tmpRoomSrno = "";
        $("#chattingUl").find(".js-chatting-item").each(function (i, v) {
            if ($(v).find(".pin:visible").length === 0) {
                tmpRoomSrno = $(v).attr('data-room-srno');
                return false;
            }
        });
        return tmpRoomSrno
    }
})()