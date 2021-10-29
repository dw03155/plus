var Mention = (function () {

    var mentionPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
        COLABO_SRNO: '',
    }

    var $postItem;
    var $postPopup;
    var $postDetail;
    var $innerCommonPopup;
    var keyupTimer;
    var keyupTimer2;
    var caretPosition;

    var mentionStatus = false;

    var isMacAndIeKeyEventFlag = false;

    return {
        getStatus: getStatus,
        keyDownArrow: keyDownArrow,
        keyUpCheckMention: keyUpCheckMention,
        openProfile: openProfile,
        clearMention: clearMention,
    }

    function getStatus() {
        return mentionStatus;
    }

    function keyDownArrow(e) {
        e.stopPropagation();
        if (isMacAndIeKeyEventFlag){
            isMacAndIeKeyEventFlag = false;
            return;
        }
        var $eTarget = $(e.target);
        $postPopup = $eTarget.findUp("#postPopup");
        $postDetail = $eTarget.findUp(".detail-item");
        var isPostPopup = $postPopup.length > 0;
        $postItem = isPostPopup ? $postPopup : $postDetail;
        $innerCommonPopup = $postItem.find("#innerCommonPopup");
        //Arrow 이벤트 직전 마지막 keyEvent 한글일 경우 downArrow 이벤트 두번 발생 (IE & MAC)
        if(e.keyCode === 229 && (Often.getClientOSInfo().isMac || Often.isBrowser("ie"))){
            isMacAndIeKeyEventFlag = true;
        }
        if ($innerCommonPopup.isArrowSelect(e)) return;
        if (KeyCheck.isKey(e, "ENTER")) {
            var $mentionItem = $innerCommonPopup.find(".js-mention-item.select");
            if ($mentionItem.length === 0) return;
            e.preventDefault();
            selectMention($mentionItem, true);
        }
    }

    function keyUpCheckMention(e) {
        var isRemarkKeyup = $(e.target).hasClass("js-remark-area");
        var isMentionTag = PostCondition.getFuncCondition().isMentionTag;
        if (!isMentionTag && !isRemarkKeyup) return;
        if (HashTag.getStatus()) {
            mentionStatus = false;
            return;
        }
        var $eTarget = $(e.target);
        $postPopup = $eTarget.findUp("#postPopup");
        $postDetail = $eTarget.findUp(".detail-item");
        var isPostPopup = $postPopup.length > 0;
        var isPostDetail = $postDetail.hasClass("back-area");
        if (!isPostPopup && !isPostDetail) {
            mentionStatus = false;
            return;
        }

        $postItem = isPostPopup ? $postPopup : $postDetail;
        $innerCommonPopup = $postItem.find("#innerCommonPopup");

        if ($innerCommonPopup.length === 0) {
            var $commonPopup = $($("#mentionLayer").html()).attr({'id': 'innerCommonPopup', 'data-code': 'mention'});
            if (isPostPopup) $postItem.find(".js-popup-before").before($commonPopup);
            else $postDetail.prepend($commonPopup);
            $innerCommonPopup = $postItem.find("#innerCommonPopup");
        } else {
            //pass
        }

        var projectSrno = Often.null2Void($postDetail.attr("data-project-srno"), LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO"));
        $postItem = isPostPopup ? $postPopup : $eTarget.findUp(".js-popup-before");
        mentionPageData.COLABO_SRNO = projectSrno;

        if ((KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "ESC") || KeyCheck.isKey(e, "SPACE_BAR")) && mentionStatus) {
            clearMention();
        }

        if (isStartMention(e)) {
            mentionStatus = true;
            caretPosition = Caret.getPosition();
            keyupTimer2 && clearTimeout(keyupTimer2);
            keyupTimer2 = setTimeout(drawMention, 300);
            return;
        }

        keyupTimer && clearTimeout(keyupTimer);
        keyupTimer = setTimeout(function () {
            Caret.isTextInput(e) && drawMention();
        }, 300)

        function drawMention() {
            if (!mentionStatus) return;
            var $mentionUl = $innerCommonPopup.find(".mention-ul");
            Caret.captureIndex("@");
            ListHelper.initPageData(mentionPageData, $mentionUl);
            getMentionList();
            Caret.saveCaret();
        }
    }

    function clearMention() {
        mentionStatus = false;
        if(!$innerCommonPopup) return;
        $innerCommonPopup.find(".select").removeClass("select");
        $innerCommonPopup.css({'display': 'none'});
    }

    function isStartMention(e) {
        var inputCaret = Caret.getInput();
        var isNotExistsMention = (inputCaret.trim().indexOf('@') === 0);
        var isCaret = (inputCaret.trim() === '@');
        var case1 = (e.shiftKey && e.keyCode === 50 && isNotExistsMention);
        var case2 = (e.key === "@" && isNotExistsMention);
        var case3 = (e.shiftKey && e.key === "@" && isCaret);
        var case4 = (e.key === "2" && isCaret);
        var case5 = (KeyCheck.isKey(e, "BACK") && isNotExistsMention && inputCaret.trim().length === inputCaret.length);
        return case1 || case2 || case3 || case4 || case5;
    }

    function getMentionList() {
        var caretValue = Often.null2Void(Caret.getInput().trim());
        var matchMention = caretValue.match(/@/gi);
        if (!matchMention) return;
        var isOneMention = matchMention.length === 1;
        var searchWord = caretValue.replace((isOneMention ? '@' : /^@.*@/gi), "");
        $innerCommonPopup.css('display', 'none');
        drawMention();

        function drawMention() {
            if (mentionPageData.NEXT_YN === "N") return;
            Ajax.executeApi(RestApi.GET.COLABO2_SENDIENCE_R101, $.extend({
                packetOption: Ajax.OPTION.PREVENT_CALLBACK
            }, mentionPageData, {
                SRCH_WORD: searchWord,
                SORT_DESC: "N",
            }), function (dat) {
                var isFirst = mentionPageData.PG_NO === 1;
                var allMention = getDefaultMention(searchWord);
                if (allMention !== "") dat["SENDIENCE_REC"].unshift(allMention)

                $innerCommonPopup.find(".mention-ul").drawListHelper({
                    pageData: mentionPageData,
                    nextYn: dat["NEXT_YN"],
                    records: dat["SENDIENCE_REC"],
                    callback: {
                        click: clickMentionUl,
                        item: function (mentionArray) {
                            return getMentionItemsHtml(mentionArray);
                        },
                        scroll: drawMention,
                        final: function ($ul) {
                            callbackMention(dat["SENDIENCE_REC"]);
                            if (isFirst) {
                                $innerCommonPopup.attr('data-code', 'mention');
                                $innerCommonPopup.find(".mention-ul").scrollTop(0);
                                ListHelper.selectFirstItemByArrow($ul);
                            }
                        },
                    }
                })
            })
        }

        function clickMentionUl(e) {
            var $eTarget = $(e.target);
            var $mentionItem = $eTarget.findUp(".js-mention-item");
            if ($mentionItem.length === 0) return;
            selectMention($mentionItem);
        }

        function callbackMention(mentionData) {
            var $editItem = $postItem.find(".edit-item");
            var isPostInputMention = $editItem.length > 0;
            var isPostPopup = $postItem.findUp("#postPopup").length > 0;
            var cssJson;
            if (mentionData.length === 0 || mentionStatus === false) {
                cssJson = {display: 'none'}
            } else {
                var tempTop = isPostInputMention ? $editItem.offset().top : isPostPopup ? $postItem.find(".detail-item").offset().top : $postItem.offset().top;
                var tempLeft = isPostInputMention ? 0 : isPostPopup ? $postItem.find(".detail-item").offset().left : $postItem.offset().left;
                var top = caretPosition.y - tempTop + 20;
                var left = caretPosition.x - tempLeft;
                var isOverTop = ($innerCommonPopup.outerHeight() + caretPosition.y) > (window.innerHeight - 100);
                if (isOverTop) top = top - ($innerCommonPopup.outerHeight() + 20);
                cssJson = {
                    transform: 'translate(' + left + 'px, ' + top + 'px)',
                    display: 'block'
                }
            }
            $innerCommonPopup.css(cssJson);

        }

        // 전체 'All'에 대한 멘션
        function getDefaultMention(searchWord) {
            var allMentionJson = {
                RCVR_USER_ID: "ALL",
                RCVR_USER_NM: "ALL",
                DVSN_NM: i18next.t('front.common.projectAllParticipant'),
            };

            return 'all'.indexOf(searchWord.toLowerCase()) > -1 ? allMentionJson : "";
        }

        function getMentionItemsHtml(mentionArray) {
            var returnHtml = "";
            var baseHtml = $("#mentionItem").html();

            $.each(mentionArray, function (i, mention) {
                var companyName = Often.null2Void(mention.RCVR_CORP_NM, "");
                var teamName = Often.null2Void(mention.RCVR_DVSN_NM, "");
                var isPersonal = ("" === companyName && "" === teamName);
                returnHtml += ListHelper.replaceJson(baseHtml, {
                    'id': mention.RCVR_USER_ID,
                    'name': mention.RCVR_USER_NM,
                    'team': teamName,
                    'position': Often.null2Void(mention.JBCL_NM, ""),
                    'company': companyName,
                    'profile': ListHelper.setProfile(mention.PRFL_PHTG),
                    'personal-yn': (isPersonal ? "d-none" : "d-block"),
                })
            });
            return returnHtml;
        }
    }

    function selectMention($mentionItem, isEnterKey) {
        var name = $mentionItem.find(".author").text();
        var userId = $mentionItem.attr("data-user-id");
        var $mentionSpan = $('<span class="tag mention-span" contenteditable="false"></span>');
        $mentionSpan.attr('user-id', userId).text(name);
        clearMention();
        isEnterKey ? setTimeout(function () {
            Caret.changeAndFocusNode($mentionSpan)
        }, 0) : Caret.changeAndFocusNode($mentionSpan)
    }

    function openProfile(e) {
        var $eTarget = $(e.target);
        var $mention = $eTarget.findUp(".mention-span");
        var userId = $mention.attr("user-id");
        Profile.drawProfilePopup(userId);
        return true;
    }
})()