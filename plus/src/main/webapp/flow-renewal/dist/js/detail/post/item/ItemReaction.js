var ItemReaction = (function () {

    return {
        isReactionButtonAndAction: isReactionButtonAndAction,
        isEmojiIconAndAction: isEmojiIconAndAction,
        closeAllReactionPopup: closeAllReactionPopup,
        isEmojiGroupAreaAndAction: isEmojiGroupAreaAndAction,
        updateReactionElements: updateReactionElements,
    }

    function isReactionButtonAndAction($eTarget) {
        var $reactionButton = $eTarget.findUp(".js-post-reaction");
        if ($reactionButton.length === 0) return false;
        if ($reactionButton.hasClass("on")) {
            updateReaction("0", $eTarget);
        } else {
            showReactionPopup($reactionButton);
        }
        return true;
    }

    function isEmojiIconAndAction($eTarget) {
        var $emojiGroup = $eTarget.findUp(".js-emoji-select-layer");
        if ($emojiGroup.length === 0) {
            closeAllReactionPopup();
            return false;
        }
        if ($eTarget.findUp(".add-reaction").length !== 0) {
            updateReaction($eTarget.findUp(".add-reaction").attr("data"), $eTarget);
            hideReactionPopup($eTarget);
        }
        return true;
    }

    function isEmojiGroupAreaAndAction($eTarget) {
        var $emojiGroup = $eTarget.findUp(".js-emoji-group-layer");
        if ($emojiGroup.length === 0) return false;
        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        ReactionCheck.showReactionCheckPopup($eTarget, projectSrno, postSrno);
        return true;
    }

    function showReactionPopup($reactionButton) {
        $reactionButton.nextAll('.js-emoji-select-layer').fadeIn(200);
    }

    function hideReactionPopup($eTarget) {
        $eTarget.findUp(".js-emoji-select-layer").fadeOut(200);
    }

    function closeAllReactionPopup() {
        $(".js-emoji-select-layer").fadeOut(200);
    }

    function updateReaction(emtCd, $eTarget) {
        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        var settingData = {
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
            EMT_CD: emtCd
        }
        Ajax.executeApi(RestApi.PUT.COLABO2_POST_EMT_U001, settingData, function (dat) {
            UpdateElements.autoUpdateElem({POST_SRNO: postSrno, REACTION_POST_DATA: dat})
        });
    }

    function updateReactionElements(mode, postSrno, remarkSrno, data) {

        var $pop = $("#postPopup:visible").find("#post-" + postSrno);
        var $li = $("#detailUl:visible").find("#post-" + postSrno);

        if (mode === "POST") {
            controlEmotionElements($pop, data);
            controlEmotionElements($li, data);
        } else if (mode === "REMARK") {
            controlRemarkEmotionElements($pop.find(".remark-item[remark-srno='" + remarkSrno + "']"), data);
            controlRemarkEmotionElements($li.find(".remark-item[remark-srno='" + remarkSrno + "']"), data);
        } else {
            //pass
        }

        function controlEmotionElements($detailItem, dat) {
            var emojiInfo = JsonMaker.getEmojiInfo(dat);
            var isEmpty = Object.keys(emojiInfo).length < 2;
            var $postReaction = $detailItem.find(".js-post-reaction");
            var $emojiCount = $detailItem.find(".emoji-count");
            var $emojiGroup = $detailItem.find(".emoji-group");
            var $emojiArea = $detailItem.find(".emoji-area");
            var $reactionTextField = $detailItem.find(".js-post-reaction span")
            $emojiCount.text(isEmpty ? "" : emojiInfo["emoji-text"]);
            $emojiGroup.html(isEmpty ? "" : emojiInfo["emoji-icons"]);
            $postReaction.attr("class", isEmpty ? "" : emojiInfo["reaction-display"]);
            $postReaction.addClass("js-post-reaction").addClass("post-bottom-button");
            $emojiArea.css("display", isEmpty ? "none" : "block");
            $reactionTextField.text(emojiInfo["reaction-text"]);
        }

        function controlRemarkEmotionElements($remarkItem, dat) {
            var isSelfLike = dat.EMT_SELF_YN === "Y";
            if (isSelfLike) {
                $remarkItem.find(".js-remark-like").addClass("on");
                $remarkItem.find(".js-remark-like-button .txt-like").text(i18next.t('front.common.unDoLike'));
                dat.EMT_CNT === "1" && $remarkItem.find(".js-remark-like-count").addClass("on");
            } else {
                $remarkItem.find(".js-remark-like").removeClass("on");
                $remarkItem.find(".js-remark-like-button .txt-like").text(i18next.t('dictionary.like'));
                dat.EMT_CNT === "0" && $remarkItem.find(".js-remark-like-count").removeClass("on");
            }
            $remarkItem.find(".js-remark-like-count").text(dat.EMT_CNT);
        }
    }

})()

