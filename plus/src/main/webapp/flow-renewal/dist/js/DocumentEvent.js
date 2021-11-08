var DocumentEvent = (function () {

    var isMousedownActive = false;

    return {
        addEvent: addEvent,
        addEventOnMessenger: addEventOnMessenger,
        addEventOnMini: addEventOnMini,
        closeAllPopup: closeAllPopup,
        closeStepByStep: closeStepByStep,
    }

    function addEvent() {
        $(document).on({
            keydown: keydownDocumentEvent,
            mousedown: mouseDownDocumentEventOnMain,
            mouseover: actionToolTip,
            mousemove: actionToolTip,
            mouseout: actionToolTip,
            paste: pasteDoc,
            scroll: Participant.adjustPosition,
            dragenter: PasteFile.onUploadAreaDragEnterEvent,
            dragover: PasteFile.onDimdAreaDragOverEvent,
            drop: PasteFile.onDropEvent,
        });
    }

    function pasteDoc(e) {
        PasteFile.onUploadAreaPasteEvent(e);
        PasteText.pasteTextEvent(e);
    }

    function addEventOnMini() {
        $(document).on({
            mousedown: mouseDownDocumentEventOnMiniMain,
            keydown: keydownDocumentEventOnMini,
        });

        if (Often.isFunc(Func.CLOUD.MINI_TOOLTIP)) {
            $(document).on({
                mouseover: actionToolTip,
                mousemove: actionToolTip,
                mouseout: actionToolTip,
            });
        }

        $(window).resize(resizeDocumentEventOnMiniOrgan);
    }

    function addEventOnMessenger() {
        $(document).on({
            keydown: keydownDocumentEventOnMessenger,
            mousedown: mouseDownDocumentEventOnMessenger,
        });

        if (Often.isFunc(Func.CLOUD.MESSENGER_TOOLTIP)) {
            $(document).on({
                mouseover: actionToolTip,
                mousemove: actionToolTip,
                mouseout: actionToolTip,
            });
        }
    }

    function actionToolTip(e) {
        var $eTarget = $(e.target);
        if (e.type === "mouseover") Tooltip.isDrawToolTipAndAction($eTarget);
        if (e.type === "mouseout") Tooltip.isRemoveToolTipAndAction($eTarget);
        if (e.type === "mousemove") {
            Tooltip.isMoveToolTipAndAction($eTarget);
            PasteFile.hideDimd($eTarget);
        }
    }

    function initMousedownActive() {
        isMousedownActive = false;
    }

    function keydownDocumentEventOnMessenger(e) {
        if ((e.ctrlKey || e.metaKey) && KeyCheck.isKey(e, "F")) {
            e.preventDefault();
            MessengerSearch.openSearchLayer();
            return;
        }
        if (KeyCheck.isKey(e, "ESC")) {
            var $whiteBack = $(".flow-all-background-1");
            if ($whiteBack.is(":visible")) return $whiteBack.trigger('click');
            $(document).trigger('mousedown');
            if (MessengerEvent.closeNonActiveLayer()) return;
            window.close();
            return;
        }
        if (KeyCheck.isKey(e, "ENTER")) {
            if ($("#messengerSearchLayer").is(":visible")) return MessengerSearch.searchMessage();
            var $fileSend = $(".js-file-send");
            if ($fileSend.is(":visible")) return $fileSend.find(".submit-event").trigger("click");
        }
    }

    function keydownDocumentEvent(e) {

        initMousedownActive();

        if (KeyCheck.isKey(e, "RELOAD_WINDOW") && Electron.isElectronApp()) {
            location.reload();
            return;
        }

        if (e.ctrlKey) {
            if (KeyCheck.isKey(e, "SPACE_BAR") && !Often.isBrowser("mac")) {
                e.preventDefault();
                return SearchEvent.clickTopSearchBar(e);
            }

            if (Electron.isElectronApp()) {
                KeyCheck.isKey(e, "RELOAD_WINDOW") && !Often.isBrowser("mac") && window.location.reload(true);
                KeyCheck.isKey(e, "RELOAD_MAC") && KeyCheck.isKey(e, "SHIFT") && Often.isBrowser("mac") && window.location.reload(true);
                return;
            }
        }

        if (e.altKey) {
            var $searchPopupLayer = $("#searchPopupLayer");
            var upperEKey = e.key.toUpperCase();
            if ($searchPopupLayer.is(":visible")) {
                if (upperEKey === "P") $searchPopupLayer.find(".js-search-section[data-code=project]").trigger('click');
                if (upperEKey === "W") $searchPopupLayer.find(".js-search-section[data-code=post]").trigger('click');
                if (upperEKey === "F") $searchPopupLayer.find(".js-search-section[data-code=file]").trigger('click');
                e.preventDefault();
                return;
            }

            if (upperEKey === "N") {
                e.preventDefault();
                return $("#projectMakeButton").trigger("click");
            }

            if (ViewChanger.isPage("detail") && (upperEKey === "1" || upperEKey === "2" || upperEKey === "3" || upperEKey === "4")) {
                e.preventDefault();
                var code = {1: "WRITE", 2: "TASK", 3: "SCHEDULE", 4: "TODO"}
                return PostPopup.openRegistrationViewOnAnywhere(DetailCode[code[upperEKey]]);
            }
        }

        if (KeyCheck.isKey(e, "ESC")) {
            if (closeStepByStep()) return;
            $(document).trigger('mousedown');
            if (isMousedownActive) return;
            if (ViewChanger.isPage("search")) {
                ViewChanger.loadPage("skip");
            }
            return;
        }

        var $eTarget = $(e.target);
        var isAvailableWrite = $eTarget.is("input") || $eTarget.is("textarea") || $eTarget.is("[contenteditable=true]");
        if (KeyCheck.isKey(e, "BACK") && !isAvailableWrite) {
            history.back()
        }

        /**
         * @Note. 기획요청은 채팅목록에 arrow/enter키 추가.
         * 현재는 채팅목록에서만 작동하지만 추후 확장성 고려하여 listGb넣음.
         */
        if (KeyCheck.isArrowVertical(e) || KeyCheck.isKey(e, "ENTER")) {
            var listGb;
            var $chattingUl = $('#chattingUl');
            if ($chattingUl.is(":visible")) listGb = "CHAT";
            if (!listGb) return;

            e.preventDefault();
            var $input = _IsMini ? $('#miniSearchInput') : $('#chattingSearchInput')
            if (KeyCheck.isKey(e, "DOWN")) ListEvent.arrowDownOnList("CHAT", $input, $chattingUl);
            if (KeyCheck.isKey(e, "UP")) ListEvent.arrowUpOnList("CHAT", $input, $chattingUl);
            if (KeyCheck.isKey(e, "ENTER")) ListEvent.enterOnList("CHAT", $input, $chattingUl);
        }

    }

    function mouseDownDocumentEventOnMessenger(e) {

        var $eTarget = $(e.target);

        //1레벨
        var idButton = {}

        //2레벨
        var classButton = {
            "emoti-section": MessengerEmoti.closeEmotiListLayer,
            "message-more": MessengerMore.closeAllMorePop,
            "chat-files": MessengerEvent.closeFilePop,
            "secret-timer": MessengerSecret.closeSecretTimePop,
        }

        //3레벨 - 백그라운드 흰색으로 다 덮는거
        for (var id in idButton) {
            closeLayerById($eTarget, id, idButton[id]);
        }

        for (var className in classButton) {
            closeLayerByClassName($eTarget, className, classButton[className]);
        }
    }

    function mouseDownDocumentEventOnMiniMain(e) {
        var $eTarget = $(e.target);
        //1레벨
        var idButton = {
            "organization": Organization.closeLayer,
            "chatting": Chatting.closeLayer,
            "alarm": Alarm.closeLayer,
            "alarmSearchFilter": Alarm.closeAlarmSearchFilter,
        }

        //2레벨
        var classButton = {
            "setting": Detail.closeSettingUl,
        }

        //3레벨 - 백그라운드 흰색으로 다 덮는거
        for (var id in idButton) {
            closeLayerById($eTarget, id, idButton[id]);
        }

        for (var className in classButton) {
            closeLayerByClassName($eTarget, className, classButton[className]);
        }
    }

    function keydownDocumentEventOnMini(e) {
        var listGb;
        var isLockMode = $('#miniLock').is(':visible');

        if (isLockMode) return keydownEventOnMiniLock;
        if (!KeyCheck.isArrowVertical(e) && !KeyCheck.isKey(e, "ENTER")) return;

        if ($('#miniChatting').is(":visible")) listGb = "CHAT";
        if (!listGb) return;

        e.preventDefault();
        if (KeyCheck.isKey(e, "DOWN")) ListEvent.arrowDownOnList(listGb, $('#miniSearchInput'), $('#chattingUl'));
        if (KeyCheck.isKey(e, "UP")) ListEvent.arrowUpOnList(listGb, $('#miniSearchInput'), $('#chattingUl'));
        if (KeyCheck.isKey(e, "ENTER")) ListEvent.enterOnList(listGb, $('#miniSearchInput'), $('#chattingUl'));
    }

    function keydownEventOnMiniLock() {
        if (e.ctrlKey) {
            if (KeyCheck.isKey(e, "RELOAD_WINDOW") && !Often.isBrowser("mac")
                || KeyCheck.isKey(e, "RELOAD_MAC") && Often.isBrowser("mac")) {
                e.preventDefault();
            }
        }
        if (KeyCheck.isKey(e, "RELOAD_WINDOW")) e.preventDefault();
    }

    function resizeDocumentEventOnMiniOrgan(e) {
        var afterHeight;
        afterHeight = $('#miniOrganization').innerHeight() - $("#emplArea").innerHeight()
        $('#organizationChart').parent().css({height: afterHeight})
    }

    function mouseDownDocumentEventOnMain(e) {

        var $eTarget = $(e.target);

        var isMouseDownRightTopMenu = $eTarget.parents("#rightTopMenu").length > 0;
        var isCenterOnPostPopup = $("#postPopup:visible").hasClass("flow-all-background-1");
        if (!isMouseDownRightTopMenu && isCenterOnPostPopup) return;

        if ($eTarget.findUp("#tempPopup").length > 0) return;

        //1레벨
        var idButton = {
            "organization": Organization.closeLayer,
            "chatting": Chatting.closeLayer,
            "alarm": Alarm.closeLayer,
            "account": Top.closeacconutModal,
            "helpCenter": Top.closeHelpCenterLayer,
            "detailSetting": DetailSetting.closeDetailSettingLayer,
            "alarmSearchFilter": Alarm.closeAlarmSearchFilter,
            "searchPopup": Search.closeTopSearchPopup,
            "allPostsDetailSearch": AllPosts.closeAllPostsDetailSearchLayer,
            "projectDetailSearch": ProjectSearch.closeProjectDetailSearchLayer,
            "joinProject": JoinProject.closeJoinProjectBar,
            "electronReload": ElectronEvent.closeReloadLayer,
        }

        //2레벨
        var classButton = {
            "bottom-quick": QuickGuide.closeQuickGuide,
            "label-setting": AllLabel.clearLayer,
            "project-order": ProjectSetting.clearOrderPopup,
            "emoji-select": ItemReaction.closeAllReactionPopup,
            "task-bundle": AllTask.closeBundleLayer,
            "alltask-setting": AllTask.closeSettingLayer,
            "setting": Detail.closeSettingUl,
            "file-menu": FileMenu.removeFileMenu,
            "popup-menu": FileMenu.removeFileMenu,
            "feed-filter": Detail.closeFeedFilter,
            "project-more": Left.closeProjectMorePopup,
            "invite-employee": InviteEmployee.closeInviteEmployeeLayer,
            "all-posts-filter": AllPosts.closeAllPostsFilter,
            "worker": WorkerPopup.closeWorkerPopup,
            "mention": Mention.clearMention,
            "hashtag": HashTag.clearHashTag,
            "task-detail-search": TaskSearch.closeDetailSearchLayer,
            "file-detail-search": FileSearch.closeDetailSearchLayer,
            "status-setting": ItemSubtask.closeSubtaskPopup,
            "priority-setting": ItemSubtask.closeSubtaskPopup,
        }

        //3레벨 - 백그라운드 흰색으로 다 덮는거
        for (var id in idButton) {
            if (id.indexOf('electron') > -1 && !Electron.isElectronApp()) break;
            closeLayerById($eTarget, id, idButton[id]);
        }

        for (var className in classButton) {
            closeLayerByClassName($eTarget, className, classButton[className]);
        }

    }

    function closeLayerById($eTarget, code, callback) {
        var $upLayer = $eTarget.findUp("#" + code + "Layer");
        var $upTopButton = $eTarget.findUp("#" + code + "TopButton");
        if (!($upLayer.length > 0 || $upTopButton.length > 0) && $("#" + code + "Layer").is(":visible")) {
            callback($eTarget);
            isMousedownActive = true;
        } else {
            //pass
        }
    }

    function closeLayerByClassName($eTarget, code, callback) {
        var $upLayer = $eTarget.findUp(".js-" + code + "-layer");
        var $upTopButton = $eTarget.findUp(".js-" + code + "-button");
        if (!($upLayer.length > 0 || $upTopButton.length > 0) && $(".js-" + code + "-layer").is(":visible")) {
            callback($eTarget);
            isMousedownActive = true;
        } else {
            //pass
        }
    }

    function closeStepByStep() {

        var $flatpickrCalendar = $(".flatpickr-calendar");
        if ($flatpickrCalendar.is(":visible")) {
            $flatpickrCalendar.remove();
            return true;
        }

        var sizzleArray = {
            "#tempPopup.flow-all-background-1": PopupDraw.closePopup,
            "#readCheckPopup.flow-all-background-1": removeObj,
            "#reactionCheckPopup.flow-all-background-1": ReactionCheck.closePopup,
            "#requestJoinPopup.flow-all-background-1": RequestJoin.closeRequestJoinPopup,
            "#confirmationPopup.flow-all-background-1": ItemSchedule.closeAttendancePopup,
            "#mySettingPopup.flow-all-background-1": MySettings.closePopup,
            "#sortSettingPopup.flow-all-background-1": TaskSort.closeSortPopup,
            "#teamInviteLayer.name-type-seach-popup-type-1": InviteProject.backInviteMain, // Deprecated
            "#teamInviteLayer" : InvitationPopup.closePopupLayout,
            "#sendInviteEmlLayer.name-type-seach-popup-type-1": InviteProject.backInviteMain,
            "#inviteLayer.flow-all-background-1": InviteProject.closeInvite,
            "#mainInvitePopup.flow-all-background-1": InvitePopup.clearInvitePopup,
            "#allSendiencePopup.flow-all-background-1": AllSendience.closeAllSendiencePopup,

            "#projectMakeLayer.flow-all-background-1": function () {
                ProjectMake.checkWritingMakePopup(ProjectMake.closePopup);
            },

            "#postPopup": function () {
                PostPopup.checkWritingAndShowPopup(PostPopup.removePopup)
            },
        }

        var isFirst = true;

        for (var sizzleId in sizzleArray) {
            var $sizzle = $(sizzleId + ":visible");
            if ($sizzle.length > 0) {
                if (isFirst) {
                    sizzleArray[sizzleId]($sizzle);
                    isFirst = false;
                }
            }
        }

        return !isFirst

        function removeObj($obj) {
            $obj.remove();
        }
    }

    function closeAllPopup(isAlarm, isChangePostView) {
        var sizzleArray = {
            "#tempPopup.flow-all-background-1": PopupDraw.closePopup,
            "#readCheckPopup.flow-all-background-1": removeObj,
            "#reactionCheckPopup.flow-all-background-1": ReactionCheck.closePopup,
            "#postPopup.flow-all-background-1": function () {
                !isChangePostView && PostPopup.removePopup()
            },
            "#projectMakeLayer.flow-all-background-1": ProjectMake.closePopup,
            "#mySettingPopup.flow-all-background-1": MySettings.closePopup,
            "#allSendiencePopup.flow-all-background-1": AllSendience.closeAllSendiencePopup,
        }

        if (isAlarm) {
            sizzleArray["organizationLayer"] = Organization.closeLayer;
            sizzleArray["alarmLayer"] = Alarm.closeLayer;
            sizzleArray["chattingLayer"] = Chatting.closeLayer;
        }

        for (var sizzleId in sizzleArray) {
            var $sizzle = $(sizzleId + ":visible");
            if ($sizzle.length > 0) {
                sizzleArray[sizzleId]($sizzle);
            }
        }

        function removeObj($obj) {
            $obj.remove();
        }
    }

})();