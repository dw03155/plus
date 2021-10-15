var MessengerEvent = (function () {

    var $messengerLayer;
    var $currentMoveObj;
    var focusTimer, inputHeightBefore, isClick;

    return {
        initMessenger: initMessenger,

        closeFilePop: closeFilePop,
        closeNonActiveLayer: closeNonActiveLayer,
        closeMenuLayer: closeMenuLayer,

        textInputResize: textInputResize,

        focusInput: focusInput,
        checkReadAvailAndFocusInput: checkReadAvailAndFocusInput,
        isNonActiveMessengerState: isNonActiveMessengerState,
        addEventOnWindow: addEventOnWindow,

        sendFocusRoomSrnoToMain: sendFocusRoomSrnoToMain,
        changeSendBtn: changeSendBtn
    }

    function initMessenger() {

        DocumentEvent.addEventOnMessenger();
        addEventOnWindow();

        $messengerLayer = $('#messengerLayer');
        $currentMoveObj = $messengerLayer;

        $messengerLayer.off('dragenter dragleave keydown drop paste click mousedown mousemove').on({
            dragenter: PasteFile.preventAll,
            dragleave: PasteFile.preventAll,
            drop: dropMessengerDoc,
            paste: pasteMessengerDoc,
            click: clickEventMessenger,
            mousedown: function () {
                isClick = true;
            },
            mousemove: function () {
                isClick = false
            },
        });

        $messengerLayer.find(".js-messenger-text-input").off('keyup keypress focus').on({
            keypress: keyPressEventSendInput,
            keyup: function () {
                textInputResize();
                changeSendBtn();
            },
        });

        focusInput();
    }

    function addEventOnWindow() {
        $messengerLayer = $('#messengerLayer');
        $(window).on({
            mousemove: function (e) {
                $currentMoveObj = $(e.target);
            },
            focus: function () {
                clearTimeout(focusTimer);
                MessengerLost.lostInterMessage();
                sendFocusRoomSrnoToMain(false);
                isExistUnreadMessage() && MessengerApi.readMessage(true);
                if (isNearTextComponent()) return;
                !isNonActiveMessengerState() && focusInput();
            },
            blur: function () {
                $messengerLayer.find(".js-messenger-text-input").blur();
                sendFocusRoomSrnoToMain(true)
            }
        })
    }

    function checkReadAvailAndFocusInput() {
        isExistUnreadMessage() && MessengerApi.readMessage(true);
        isClick && !isNonActiveMessengerState() && focusInput();
    }

    function isNearTextComponent() {
        return $currentMoveObj && $currentMoveObj.parents(".chat-txt-wr").length > 0
    }

    function focusInput() {
        if ($currentMoveObj &&
            ($currentMoveObj.findUp(".left-btns").length > 0 ||
                $currentMoveObj.findUp(".js-contents").length > 0 ||
                $currentMoveObj.findUp(".js-message-more-layer").length > 0 ||
                $currentMoveObj.findUp(".js-messenger-menu-btn").length > 0)) {
            return;
        }
        focusTimer = setTimeout(function () {
            $messengerLayer.find(".js-messenger-text-input").focus();
            clearTimeout(focusTimer);
        }, 300)
    }

    function sendFocusRoomSrnoToMain(isOut) {
        var key = isOut ? 'FOCUS_OUT' : 'FOCUS_IN';
        SocketControl.sendMessage({
            CHAT_CODE: SocketAPI.MAIN[key],
            ROOM_SRNO: _USER_ID,
            FOCUS_ROOM_SRNO: _ROOM_SRNO
        })
    }

    function isExistUnreadMessage() {
        return ($('#messengerUl li.message-item:last').attr('self-read-yn') !== 'Y')
            || roomInfo.NOT_READ_CNT !== "0";
    }

    function dropMessengerDoc(event) {
        PasteFile.pasteFileEvent(event, 'drop');
    }

    function pasteMessengerDoc(e) {
        PasteFile.pasteFileEvent(e, 'paste');
        PasteText.pasteTextEvent(e);
        $(this).find(".js-messenger-text-input").moveToBottom(false);
    }

    //윈도우에 포커스가 있어도 채팅을 읽고있지 않은 것으로 간주해야 하는 레이어들
    function isNonActiveMessengerState() {
        var isNonActiveLayer = $("#messengerMenuLayer").is(":visible") 	//참여자, 설정창
            || $("#messengerSearchLayer").is(":visible") //검색창
            || $("#messengerReaderLayer").is(":visible") //읽음확인
        return isNonActiveLayer;
    }

    function closeNonActiveLayer() {
        $(document).trigger('mousedown');
        var isNonActiveState = isNonActiveMessengerState();
        if (isNonActiveState) {
            $('.js-chat-menu').fadeOut(200, function () {
                $(".js-messenger-text-input").focus();
            });
            return true;
        }
    }

    function clickEventMessenger(e) {
        var $eTarget = $(e.target);

        //top
        if (isSearchBtnAndAction()) return;
        if (isMenuBtnAndAction()) return;

        //contents
        if (isLongTextBtnAndAction()) return;
        if (isImageAndAction()) return;
        if (isMessageMoreAndAction()) return;
        if (isFileAndAction()) return;
        if (isVideoConference()) return;
        if (isProfileAndAction()) return;
        if (isNotReadCountAndAction()) return;
        if (isUrlAndAction()) return;

        //bottom
        if (isBalloonMessageAndAction()) return;
        if (isFileUploadBtnAndAction()) return;
        if (isFileOptionAndAction()) return;
        if (isMeetsUploadBtnAndAction()) return;
        if (isSecretBtnAndAction()) return;
        if (isTimerBtnAndAction()) return;
        if (isTimeValueAndAction()) return;
        if (isEmojiBtnAndAction()) return;
        if (isSendBtnAndAction()) return;

        //right
        if (isCollectionBtnAndAction()) return;
        if (isInviteButtonAndAction()) return;
        if (isParticipantsListAndAction()) return;
        if (isProjectMoveBtnAndAction()) return;
        if (isBottomMenuAndAction()) return;
        if (isBackgroundAndAction()) return;

        //right-setting
        if (isChangeTitleBtnAndAction()) return;
        if (isCloseLayerBtnAndAction()) return;

        function isNotReadCountAndAction() {
            var $btnNotRead = $eTarget.findUp(".btn-not-read");
            if ($btnNotRead.length === 0) return false;
            var roomChatSrno = $btnNotRead.parents('.message-item').attr("room_chat_srno");
            MessengerReader.openMessengerReader(roomChatSrno);
            return true;
        }

        function isUrlAndAction() {
            var $hyperButton = $eTarget.findUp(".js-hyper-button");
            var $urlThumb = $eTarget.findUp(".js-url-thumb");
            if ($hyperButton.length === 0 && $urlThumb.length === 0) return false;

            e.preventDefault();
            var $quickGuideLi = $eTarget.findUp("a");
            if (!$quickGuideLi || $quickGuideLi.length === 0) return false;
            var url = $quickGuideLi.attr('href');

            if (Often.isFunc("ONLY_VIEW_BY_POST_LINK_ON_CHAT") && UrlCatcher.isPostUrlAncAction(url)) return;

            if (Electron.isElectronApp()) {
                Electron.openExternalLinkforElectron(url);
            } else {
                OpenUtil.openWindow(url, "_blank");
            }
            return true;
        }

        function isProfileAndAction() {
            var $userPicture = $eTarget.findUp(".js-user-picture");
            var $userTitle = $eTarget.findUp(".js-user-title");
            if ($userPicture.length === 0 && $userTitle.length === 0) return false;
            var userId = $userTitle.length === 0 ? $userPicture.parent().attr("rgsr_id")
                : $userTitle.parents(".message-item").attr("rgsr_id");
            Profile.drawProfilePopup(userId);
            return true;
        }

        function isCollectionBtnAndAction() {
            var $collectionItem = $eTarget.findUp(".js-collection-item");
            if ($collectionItem.length === 0) return false;
            if (LimitGuest.isLimitGuest("collect", true)) return;

            var gb = Often.null2Void($collectionItem.attr("data-code"), "CI");
            OpenUtil.openSubScreen({
                GB: "CHAT_COLLECTION",
                ROOM_SRNO: _ROOM_SRNO,
                SRCH_GB: gb
            });
            return true;
        }

        function isBalloonMessageAndAction() {
            var $balloonMessage = $eTarget.findUp('#balloonMessage');
            if ($balloonMessage.length === 0) return false;
            var lastRoomChatSrno = $("#messengerUl").find(".message-item:last").attr("ROOM_CHAT_SRNO");
            var $messengerBottomArea = $("#messengerBottomArea");
            $messengerBottomArea.find("#balloonMessage").remove();
            $("#messengerUl").moveToBottom(false);
            if ($balloonMessage.attr("ROOM_CHAT_SRNO") === lastRoomChatSrno) return true;
            MessengerApi.reloadMessages();
            return true;
        }

        function isMessageMoreAndAction() {
            var $messageMoreButton = $eTarget.findUp('.js-message-more-button');
            if ($messageMoreButton.length === 0) return false;
            MessengerMore.openMorePop($messageMoreButton);
            return true;
        }

        function isSearchBtnAndAction() {
            var $searchBtn = $eTarget.findUp('.js-messenger-search-btn');
            if ($searchBtn.length === 0) return false;
            if (LimitGuest.isLimitGuest("search", true)) return;
            MessengerSearch.openSearchLayer();
            return true;
        }

        function isFileAndAction() {
            var $fileButton = $eTarget.findUp(".js-messenger-file");
            if (!$fileButton || $fileButton.length === 0) return false;
            if (isTempMessageAndToast($fileButton.findUp(".message-item"))) return true;
            var isFileDownLoadButton = $eTarget.findUp(".js-download-button").length > 0;
            var fileArray = getFileCheckArray($eTarget)
            var isExternalFile = fileArray[0].RAND_KEY === "GOOGLEDRIVE" || fileArray[0].RAND_KEY === "DROPBOX";
            var fileMode = (isFileDownLoadButton || isExternalFile) ? "SAVE" : "DOC-VIEWER";
            FileUtil.openFile(fileMode, fileArray);
            return true;
        }

        function isImageAndAction() {
            var $imgTarget = $eTarget.findUp(".js-messenger-image");
            if ($imgTarget.length === 0) return false;
            if (isTempMessageAndToast($imgTarget.findUp(".message-item"))) return true;
            var isSendingState = $imgTarget.parents('.chat-txt').find('.reload-wr').is(':visible');
            if (isSendingState) return true;
            var imgInfoJson = Often.getAttrs($imgTarget)[0];
            var msgInfoJson = Often.getAttrs($eTarget.findUp(".message-item"))[0];
            var imgViewerData = $.extend({}, imgInfoJson, msgInfoJson);
            var isSecretMsg = $imgTarget.findUp('.message-item').attr('bomb_yn') === 'Y'
            if (isSecretMsg) MessengerSecret.setSecretMessageWindow(ImageViewer.openImage("CHAT", [imgViewerData], '', 'Y'));
            else ImageViewer.openImage("CHAT", [imgViewerData])
            return true;
        }

        function isMenuBtnAndAction() {
            var $menuBtn = $eTarget.findUp('.js-messenger-menu-btn');
            if ($menuBtn.length === 0) return false;
            MessengerMenu.drawSettingMenu();
            return true;
        }

        function isBackgroundAndAction() {
            var $menuBackground = $eTarget.findUp('.js-menu-background');
            var isNotMenuArea = $eTarget.findUp('.js-menu-area').length === 0;
            if ($menuBackground.length === 0 && !isNotMenuArea) return false;
            closeMenuLayer();
            return true;
        }

        function isEmojiBtnAndAction() {
            var $emojiBtn = $eTarget.findUp('.js-emoji-btn');
            if ($emojiBtn.length === 0) return false;

            var isEmotiActive = $emojiBtn.hasClass('active');
            var isEmotiSendVisible = $('.emo-send').is(':visible');
            $emojiBtn.addClass(isEmotiActive && !isEmotiSendVisible ? '' : 'active')
                .removeClass(isEmotiActive && !isEmotiSendVisible ? 'active' : '');
            if (!isEmotiActive) {
                MessengerEmoti.setEmotiThumbList($messengerLayer);
            } else if (isEmotiActive) {
                MessengerEmoti.closeEmotiListLayer()
            } else {
                $messengerLayer.find('.emo-section').css('display', isEmotiSendVisible ? '' : 'none');
            }
            return true;
        }

        function isSendBtnAndAction() {
            var $sendBtn = $eTarget.findUp('#sendMessageButton');
            if ($sendBtn.length === 0) return false;

            MessengerSend.sendMessengerMessage();
            $sendBtn.removeClass('on')
            return true;
        }

        function isSecretBtnAndAction() {
            var $secretBtn = $eTarget.findUp('.js-secret-btn');
            if ($secretBtn.length === 0) return false;
            MessengerSecret.setSecretMode($secretBtn);
            return true;
        }

        function isTimerBtnAndAction() {
            var $timerBtn = $eTarget.findUp('.btn-timer');
            if ($timerBtn.length === 0) return false;
            $(".time-list").toggleClass("on");
            return true;
        }

        function isTimeValueAndAction() {
            var $timeList = $eTarget.findUp('.js-time-value');
            if ($timeList.length === 0) return false;
            MessengerSecret.setSecretTimer($timeList);
            return true;
        }

        function isFileUploadBtnAndAction() {
            var $filesBtn = $eTarget.findUp('.js-chat-files-btn');
            if ($filesBtn.length === 0) return false;
            var $filesModal = $('#MessengerFileModal');
            var isModalVisible = $filesModal.is(":visible");
            if (isModalVisible) $filesModal.fadeOut(200) && $filesBtn.removeClass('on');
            else $filesModal.fadeIn(200) && $filesBtn.addClass('on');
            var isUploadGoogleDrive = Often.isFunc(Func.CLOUD.GOOGLEDRIVE_UPLOAD_PREVENT) ? false : Often.isFunc(Func.CLOUD.GOOGLEDRIVE_UPLOAD);
            var isUploadDropbox = Often.isFunc(Func.CLOUD.DROPBOX_UPLOAD_PREVENT) ? false : Often.isFunc(Func.CLOUD.DROPBOX_UPLOAD);
            var isUploadImportFile = Often.isFunc(Func.CLOUD.IMPORT_FILE_BOX);
            $filesModal.find("#uploadGoogleDrive").css("display", isUploadGoogleDrive ? "block" : "none");
            $filesModal.find("#uploadDropbox").css("display", isUploadDropbox ? "block" : "none");
            $filesModal.find("#uploadImportFile").css("display", isUploadImportFile ? "block" : "none");
            return true;
        }

        function isFileOptionAndAction() {
            var $fileOption = $eTarget.findUp(".js-file-option");
            if ($fileOption.length === 0) return false;

            if (Often.isFunc(Func.CLOUD.UPLOAD_PREVENT)) {
                Often.toast('info', i18next.t('front.alert.adminRestriction'));
                return true;
            }

            var uploadCode = Often.null2Void($fileOption.attr('data-upload'));

            if ("pc" === uploadCode) {
                Upload.uploadFile("any", MessengerSend.sendFile);
            } else if ("gdrive" === uploadCode) {
                OpenUtil.openSubScreen({CONNECT_ID: SocketControl.getRoomConnectId(), GB: 'GOOGLE_DRIVE'});
            } else if ("dropbox" === uploadCode) {
                DropboxDrive.openDropboxDrive(function (fileArray) {
                    if (FileUtil.isLimitOnMultiUpload(fileArray.length, true)) return;
                    fileArray.forEach(MessengerSend.sendFile);
                });
            } else if ("flowdrive" === uploadCode) {
                if (LimitGuest.isLimitGuest("flowdrive", true)) return true;
                FileUtil.openFlowDrive("CHAT");
            } else {
                //pass
            }

            closeFilePop();
            return true;
        }

        function isMeetsUploadBtnAndAction() {
            var $meetsBtn = $eTarget.findUp('.js-chat-meets-btn');
            if ($meetsBtn.length === 0) return false;
            if (LimitGuest.isLimitGuest("video", true)) return;
            VideoConference.isZoomSynchronized(
                VideoConference.warnAndSendMessage,
                VideoConference.alertRequiredZoomSync,
                {isMini: true, type: 'chat'})
            return true;
        }

        function isParticipantsListAndAction() {
            var $participantList = $eTarget.findUp('.js-participant-list');
            if ($participantList.length === 0) return false;

            var participantId = $participantList.attr('data-user-id');
            var isChatBtn = $eTarget.findUp('.js-participant-chat').length !== 0;
            var isMenuBtn = $eTarget.findUp('.js-participant-menu').length !== 0;
            isChatBtn ? OpenUtil.openMessengerByOneUserId(participantId) :
                isMenuBtn ? Often.toast('info', '참여자 내보내기 개발중') : Profile.drawProfilePopup(participantId)

            return true;
        }

        function isBottomMenuAndAction() {
            var $bottomSettingBtn = $eTarget.findUp('.js-bottom-setting');
            if ($bottomSettingBtn.length === 0) return false;
            var code = $bottomSettingBtn.attr('data-code');
            var roomSrno = _ROOM_SRNO;
            $bottomSettingBtn.hasClass('on') ? $bottomSettingBtn.removeClass('on') : $bottomSettingBtn.addClass('on')
            if (code === 'update-pin') return MessengerApi.setChatPin(roomSrno);
            if (code === 'chat-alarm') return MessengerApi.setChatAlarm(roomSrno);
            if (code === 'chat-quit') return MessengerApi.quitSelfMessenger(roomSrno, leaveMessenger);
            if (code === 'messenger-setting') return MessengerMenu.showSecondSettingLayer();
            return true;
        }

        function isInviteButtonAndAction() {
            var $inviteButton = $eTarget.findUp('#inviteButton');
            if ($inviteButton.length === 0) return false;
            MessengerApi.createNewChatting($inviteButton.attr("data-code") === "INVITE_CHAT");
            return true;
        }

        function isProjectMoveBtnAndAction() {
            var $projectMoveBtn = $eTarget.findUp('#projectMoveButton');
            if ($projectMoveBtn.length === 0) return false;
            var projectSrno = roomInfo.COLABO_SRNO;

            if (Electron.isElectronApp()) {
                MiniProject.openProjectPage(projectSrno);
            } else {
                var url = Often.getLocOrigin() + '/main.act?detail/' + projectSrno;
                OpenUtil.openPopup(url);
            }
            return true;
        }

        function isChangeTitleBtnAndAction() {
            var $changeTitleBtn = $eTarget.findUp('.js-change-title');
            if ($changeTitleBtn.length === 0) return false;
            MessengerMenu.drawChangeTitlePopup(_ROOM_SRNO);
            return true;
        }

        function isLongTextBtnAndAction() {
            var $longTextBtn = $eTarget.findUp('.js-long-text');
            if ($longTextBtn.length === 0) return false;

            var $messageListObj = $longTextBtn.closest('li.message-item');
            if (isTempMessageAndToast($messageListObj)) return;

            OpenUtil.openSubScreen({
                ROOM_SRNO: _ROOM_SRNO,
                ROOM_CHAT_SRNO: $messageListObj.attr('room_chat_srno'),
                GB: 'CHAT_LONG_TEXT',
            });
            return true;
        }

        function isCloseLayerBtnAndAction() {
            var $closeLayerBtn = $eTarget.findUp('.js-close-button');
            if ($closeLayerBtn.length === 0) return false;
            closeNonActiveLayer();
        }

        function isVideoConference() {
            var $videoConferenceButton = $eTarget.findUp('.js-videoConf-button');
            if ($videoConferenceButton.length === 0) return false;
            var VC_SRNO = $videoConferenceButton.attr('data-vcsrno');
            VideoConference.getZoomUrl(VC_SRNO, true)
        }
    }

    function closeMenuLayer() {
        $('#messengerMenuLayer').css('display', 'none');
        MessengerEvent.checkReadAvailAndFocusInput();
    }

    function leaveMessenger() {
        self.close();
    }

    function isTempMessageAndToast($message) {
        var isTempMessage = $message.attr("id").indexOf("message-Q") > -1;
        if (isTempMessage) Often.toast("error", i18next.t('front.common.wait'));
        return isTempMessage;
    }

    function keyPressEventSendInput(e) {
        if (e.shiftKey && KeyCheck.isKey(e, "ENTER")) {
            //줄바꿈
        } else if (KeyCheck.isKey(e, "ENTER")) {
            e.preventDefault();
            MessengerSend.sendMessengerMessage();
        }
    }

    function textInputResize() {
        var $messengerUl = $("#messengerUl");
        var $inputLayer = $("#messengerInput").find('.js-messenger-text-input');
        var inputHeight = $inputLayer.prop('scrollHeight');
        var bottomPosition = $(".write-bottom").innerHeight();

        // 인풋크기 변할때만 리사이즈
        if (inputHeightBefore === inputHeight) return;
        else inputHeightBefore = inputHeight;

        $inputLayer.css("overflow", inputHeight > 180 ? "scroll" : "auto");
        $messengerUl.css("bottom", bottomPosition).moveToBottom(false);
        $(".js-messenger-popup").css("bottom", bottomPosition - 38);

        // @210723 복다빈 텍스트 붙여넣고 지웠을 때 엘리멘트가 남아있어 placeholder 미노출 이슈
        if (!$inputLayer.text()) $inputLayer.empty();
    }

    function changeSendBtn() {
        var isTextExist = $('.js-messenger-text-input').text().trim().length !== 0;
        var isEmotiExist = $('.js-emoti-send-layer').css('display') !== "none";
        var $sendBtn = $('#sendMessageButton');
        (isTextExist || isEmotiExist) ? $sendBtn.addClass('on') : $sendBtn.removeClass('on')
    }

    function closeFilePop() {
        $('#MessengerFileModal').fadeOut(200);
    }

    function getFileCheckArray($eTarget) {
        var $file = $eTarget.findUp(".js-messenger-attachments");
        var messageJson = Often.getAttrs($eTarget.findUp(".message-item"));
        var fileArray = Often.getAttrs($file);
        var fileName = $file.find(".file-tit").text();
        return [{
            ATCH_SRNO: fileArray[0].ATCH_SRNO,
            RAND_KEY: fileArray[0].RAND_KEY,
            USE_INTT_ID: fileArray[0].USE_INTT_ID,
            ROOM_SRNO: messageJson[0].ROOM_SRNO,
            ROOM_CHAT_SRNO: messageJson[0].ROOM_CHAT_SRNO,
            FILE_NM: fileName,
            RGSN_DTTM: messageJson[0].RGSN_DTTM,
        }]
    }

})()

