var ReactionCheck = (function () {

    var $reactionCheckPopup;

    return {
        showReactionCheckPopup: showReactionCheckPopup,
        closePopup: closePopup
    };

    function showReactionCheckPopup($eTarget, projectSrno, postSrno) {
        $reactionCheckPopup = PopupDraw.getPopupWrapObj().attr('id', 'reactionCheckPopup');
        $reactionCheckPopup.find(".contents").html($("#reactionCheckPopup").html());
        if ($reactionCheckPopup.is(":visible")) return;
        $('body').append($reactionCheckPopup); //환경 설정 팝업 뒤쪽에 배치하기 위해 append -> prepend 수정
        $reactionCheckPopup.fadeIn(200);

        var settingData = {
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
        };
        var isRemarkLike = $eTarget.findUp(".js-remark-like").length > 0;
        if (isRemarkLike) {
            var remarkSrno = $eTarget.findUp(".remark-item").attr("remark-srno");
            settingData.COLABO_REMARK_SRNO = remarkSrno;
        }
        Ajax.executeApi(RestApi.GET.COLABO2_EMT_R001, settingData, function (data) {
            updateReactionElements($reactionCheckPopup, data);
            addEventOnReactionCheckPopup();

        });
    }

    function updateReactionElements($reactionCheckPopup, data) {
        var array = DetailCode.EMOJI._GB;
        var $reactionCheckLayer = $reactionCheckPopup.find(".js-reaction-check-layer");
        var $totalReaction = $reactionCheckLayer.find(".js-total-reaction");
        $.each(array, function (i,text){
            var isEmpty = (data["EMT_CD_"+(i+1)] === "0")
            if(isEmpty) return;
            $totalReaction.find(".icon-emoji."+text).findUp(".reaction-emoji-item").addClass("on");
            $totalReaction.find(".icon-emoji."+text).next(".js-emoji-count").text(data["EMT_CD_"+(i+1)]);
        });

        $reactionCheckLayer.find(".js-total-emoji-count").text(data.EMT_CNT);
        drawReactionParticipantsItem($reactionCheckLayer, data.EMT_REC);
        // var reactionInfo = {
        //     'like-cnt': data.EMT_CD_1, //좋아요
        //     'please-cnt': data.EMT_CD_2, //부탁해요
        //     'sad-cnt': data.EMT_CD_3, //힘들어요
        //     'great-cnt': data.EMT_CD_4, // 훌륭해요
        //     'thank-cnt': data.EMT_CD_5, //감사해요
        //     'total-emt-cnt': data.EMT_CNT,
        // }
        // var $reactionCheckLayer = $reactionCheckPopup.find(".js-reaction-check-layer");
        // var $totalReaction = $reactionCheckLayer.find(".js-total-reaction");
        // $totalReaction.find(".icon-emoji.like").next(".js-emoji-count").text(reactionInfo['like-cnt']);
        // $totalReaction.find(".icon-emoji.please").next(".js-emoji-count").text(reactionInfo['please-cnt']);
        // $totalReaction.find(".icon-emoji.sad").next(".js-emoji-count").text(reactionInfo['sad-cnt']);
        // $totalReaction.find(".icon-emoji.great").next(".js-emoji-count").text(reactionInfo['great-cnt']);
        // $totalReaction.find(".icon-emoji.thank").next(".js-emoji-count").text(reactionInfo['thank-cnt']);
        // $reactionCheckLayer.find(".js-total-emoji-count").text(reactionInfo['total-emt-cnt']);
    }

    function drawReactionParticipantsItem($reactionCheckLayer, reactionArray) {
        if (reactionArray === undefined) return '';
        var returnHtml = "";
        var baseHtml = $("#reactionCheckItem").html();
        $.each(reactionArray, function (i, reactionData) {
            returnHtml += ListHelper.replaceJson(baseHtml, {
                'RCVR_USER_ID': reactionData.RCVR_USER_ID,
                'EMT_CD': DetailCode.EMOJI._GB[reactionData.EMT_CD - 1] + " on",
                'EMOJI_TEXT': i18next.t(DetailCode.EMOJI._TEXT[reactionData.EMT_CD - 1]),
                'profile_url': ListHelper.setProfile(reactionData.PRFL_PHTG),
                'RCVR_USER_NM': reactionData.RCVR_USER_NM,
                'JBCL_NM': reactionData.JBCL_NM, //직책명
                'RCVR_CORP_NM': reactionData.RCVR_CORP_NM, //회사명
                'RCVR_DVSN_NM': reactionData.RCVR_DVSN_NM, //부서명
            });
        });
        $reactionCheckLayer.find(".js-reaction-participants").append(returnHtml);
    }

    function closePopup(e) {
        if ($('.js-profile-popup').is(':visible')) return PopupDraw.closePopup();
        $reactionCheckPopup.fadeOut(200, function () {
            $reactionCheckPopup.remove();
        });
    }

    function addEventOnReactionCheckPopup() {
        $reactionCheckPopup.off("click").on("click", clickReactionCheckPopup)
            .off('keydown').on('keydown', function (e) {
            if (!KeyCheck.isKey(e, "BACK")) return;
            closePopup();
        });
    }

    function clickReactionCheckPopup(e) {

        e.stopPropagation();

        var $eTarget = $(e.target);

        if (isReactionCheckItemAndAction($eTarget)) return;
        if (isCloseButtonAndAction($eTarget)) return;
        if (isBackClickAndAction($eTarget)) return;

        function isReactionCheckItemAndAction($eTarget) {
            var $reactionCheckItem = $eTarget.findUp(".js-reaction-check-item");
            if ($reactionCheckItem.length === 0) return;
            Profile.drawProfilePopup($reactionCheckItem.attr("data-user-id"));
        }

        function isCloseButtonAndAction($eTarget) {
            var $closeButton = $eTarget.findUp(".js-close-event");
            if ($closeButton.length === 0) return false;
            closePopup();
            return true;
        }

        function isBackClickAndAction($eTarget) {
            var $readCheckLayer = $eTarget.findUp(".js-reaction-check-layer");
            if ($readCheckLayer.length !== 0) return false;
            closePopup();
            return true;
        }
    }

})();