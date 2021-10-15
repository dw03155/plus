var Participant = (function () {

    var participantPageData = {
        PG_NO: 1,
        PG_PER_CNT: 20,
        NEXT_YN: "Y"
    }

    var joinParticipantPageData = {
        PG_NO: 1,
        NEXT_YN: "Y"
    }

    var participantCntJson = {};

    var isMngrParticipantsArea;
    var isInnerParticipantsArea;
    var isOuterParticipantsArea;

    return {
        adjustPosition: adjustPosition,
        drawJoinParticipantItem: drawJoinParticipantItem,
        drawProjectParticipantItems: drawProjectParticipantItems,
        clickParticipantsArea: clickParticipantsArea,
    }

    function adjustPosition() {
        var $projectParticipants = $('#projectParticipants');
        if (!$projectParticipants.is(":visible")) return;
        $projectParticipants.css('transform', 'translateX(' + (0 - $(document).scrollLeft()) + 'px');
    }

    function drawProjectParticipantItems(projectSrno, isFirst, callback) {

        var $participantArea = $("#participantArea");

        if (isFirst) {
            var $videoChat = $(".participants-menu").find(".js-video-chat");
            Often.showOrHideByFunc("VIDEO_CONFERENCE", $videoChat);
            ListHelper.initPageData(participantPageData);
            $participantArea.addClass("d-none");
            isMngrParticipantsArea = false;
            isInnerParticipantsArea = false;
            isOuterParticipantsArea = false;
        } else {
            //pass
        }

        if (participantPageData.NEXT_YN === "N") return;
        Ajax.executeApi(RestApi.GET.COLABO2_SENDIENCE_R101, $.extend({}, participantPageData, {
            COLABO_SRNO: projectSrno
        }), function (dat) {

            if (isFirst) {
                participantCntJson.manager = dat.MNGR_CNT;
                participantCntJson.outer = dat.OUT_SENDIENCE_CNT;
                participantCntJson.inner = dat.IN_SENDIENCE_CNT;
                $("#participantCount").text(Often.numberWithCommas(dat.SENDIENCE_CNT));
                const isPaidCompanyUser = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "BUY_YN") === BuyCode.PAID_COMPANY;
                const isExternal = isPaidCompanyUser && Number(dat.OUT_SENDIENCE_CNT) > 0;
                $("#detailTop").find("#externalIcon").css('display', isExternal ? 'inline-block' : 'none')
                LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "SENDIENCE_CNT", dat.SENDIENCE_CNT);
            }

            $("#participantsUl").drawListHelper({
                pageData: participantPageData,
                nextYn: dat["NEXT_YN"],
                records: dat.SENDIENCE_REC,
                targetObj: {
                    scroll: $(".participants-content-group"),
                },
                callback: {
                    item: getSendienceListHtml,
                    scroll: function () {
                        return drawProjectParticipantItems(projectSrno);
                    },
                    click: clickParticipantsArea,
                }
            })

            $("#participantArea").off('click').on('click', clickOptionArea).removeClass("d-none");
            adjustPosition();

            (typeof callback === "function") && callback();
        })
    }

    function getSendienceListHtml(record) {
        var returnHtml = "";
        var baseHtml = $("#participantItem").html();

        $.each(record, function (i, participant) {
            var companyName = Often.null2Void(participant.RCVR_CORP_NM, "");
            var teamName = Often.null2Void(participant.RCVR_DVSN_NM, "");
            var isPersonal = ("" === companyName && "" === teamName);

            if (participant.STATUS === ParticipantCode.MANAGER && !isMngrParticipantsArea) {
                isMngrParticipantsArea = true;
                returnHtml += getParticipantTitleHtml(participant.STATUS);
            }

            if (participant.STATUS === ParticipantCode.OUTER && !isOuterParticipantsArea) {
                isOuterParticipantsArea = true;
                returnHtml += getParticipantTitleHtml(participant.STATUS);
            }

            if (participant.STATUS === ParticipantCode.INNER && !isInnerParticipantsArea) {
                isInnerParticipantsArea = true;
                returnHtml += getParticipantTitleHtml(participant.STATUS);
            }

            var participantId = Often.null2Void((participant.RCVR_USER_ID ? participant.RCVR_USER_ID : participant.USER_ID), "")
            var isMe = _USER_ID === participantId;

            returnHtml += ListHelper.replaceJson(baseHtml, {
                'name': Often.null2Void(participant.RCVR_USER_NM, participant.USER_NM) + (isMe ? " (나) " : ""),
                'team': Often.null2Void(participant.RCVR_DVSN_NM, ""),
                'position': Often.null2Void(participant.JBCL_NM, ""),
                'company': Often.null2Void(participant.RCVR_CORP_NM, ""),
                'profile': ListHelper.setProfile(participant.PRFL_PHTG),
                'personal-display': ListHelper.setDisplay(Often.isFunc(Func.CLOUD.PARTICIPANTS_INFO) && !isPersonal, "flex"),
                'worker-id': participantId,
            });
        })

        return returnHtml;
    }

    function getJoinParticipantItemHtml(record) {
        var returnHtml = "";
        var baseHtml = $("#participantItem").html();
        var firstJoinParticipant = record[0]

        var companyName = Often.null2Void(firstJoinParticipant.RCVR_CORP_NM, "");
        var teamName = Often.null2Void(firstJoinParticipant.RCVR_DVSN_NM, "");
        var isPersonal = ("" === companyName && "" === teamName);

        returnHtml += ListHelper.replaceJson(baseHtml, {
            'name': Often.null2Void(firstJoinParticipant.USER_NM) + (record.length > 1 ? ("외 " + (record.length - 1) + "명") : ""),
            'team': Often.null2Void(teamName, ""),
            'position': Often.null2Void(firstJoinParticipant.JBCL_NM, ""),
            'company': Often.null2Void(companyName, ""),
            'profile': ListHelper.setProfile(firstJoinParticipant.PRFL_PHTG),
            'personal-display': ListHelper.setDisplay(Often.isFunc(Func.CLOUD.PARTICIPANTS_INFO) && !isPersonal, "flex"),
            'worker-id': firstJoinParticipant.USER_NM,
        });

        return returnHtml;
    }

    function getParticipantTitleHtml(status) {
        var title;
        if (status === ParticipantCode.MANAGER) {
            title = i18next.t('front.common.projectManager');
        } else if (status === ParticipantCode.OUTER) {
            title = i18next.t('dictionary.partner');
        } else {
            title = i18next.t('dictionary.employee');
        }

        var id = status === ParticipantCode.MANAGER ? "manager" : status === ParticipantCode.OUTER ? "outer" : "inner";

        return '<span class="participants-title">' +
            '<em>' + title + '</em>' +
            '<span id="' + id + 'ParticipantsCount" class="number-of-participants">' + participantCntJson[id] + '</span>' +
            '</span>';
    }

    function drawJoinParticipantItem(projectSrno) { //스크롤 처리 추가 필요
        var $joinParticipantsUl = $("#joinParticipantsUl");
        ListHelper.initPageData(joinParticipantPageData);
        Ajax.executeApi(RestApi.GET.COLABO2_INVT_R003, $.extend({packetOption: Ajax.OPTION.PREVENT_EXECUTE}, joinParticipantPageData, {
            COLABO_SRNO: projectSrno,
        }), function (joinData) {
            var joinParticipantsCount = joinData.JOIN_REC.length;
            $("#joinParticipantsCount").text(joinParticipantsCount);
            $("#joinParticipantsUl").drawListHelper({
                pageData: joinParticipantPageData,
                nextYn: joinData["NEXT_YN"],
                records: joinData.JOIN_REC,
                callback: {
                    item: getJoinParticipantItemHtml,
                    click: clickJoinParticipantsArea,
                    final: function () {
                        var newTagHtml = '<img id="new" src="/design3/img_rn/ico/ico_new3.png" alt="" style="margin-bottom: 5px; display: inline;">';
                        $joinParticipantsUl.find(".js-participant-chat").remove();
                        $joinParticipantsUl.find(".js-participant-name").after(newTagHtml);
                    }
                }
            })
            var isManager = Authority.isAuthorityCheck("ADMIN", projectSrno);
            $("#joinParticipantsArea").css("display", (isManager && joinParticipantsCount !== 0 ? "block" : "none"));
        })
    }

    function clickParticipantsArea(e) {
        var $eTarget = $(e.target);
        var $participantItem = $eTarget.findUp(".js-participant-item");
        var $participantChat = $eTarget.findUp(".js-participant-chat");
        var $projectChat = $eTarget.findUp(".js-project-chat");
        var $videoChat = $eTarget.findUp(".js-video-chat");
        var participantId = $participantItem.attr("data-id")
        if ($participantChat.length > 0) return OpenUtil.openMessengerByOneUserId(participantId);
        if ($projectChat.length > 0) return OpenUtil.openMessengerByProjectSrno(Detail.getProjectSrno())
        if ($videoChat.length > 0) return VideoConference.sendMessage();
        if ($participantItem.length > 0) return Profile.drawProfilePopup(participantId);
    }

    function clickJoinParticipantsArea(e) {
        var $eTarget = $(e.target);
        var $participantItem = $eTarget.findUp(".js-participant-item");
        if ($participantItem.length === 0) return;
        RequestJoin.openRequestJoinPopup();
    }

    /**
     * 참가자 아래의 있는 채팅과 화상회의 버튼 클릭 이벤트 제어
     * @param e Event
     */
    function clickOptionArea(e) {
        var $eTarget = $(e.target);
        var $projectChat = $eTarget.findUp(".js-project-chat");
        var $videoChat = $eTarget.findUp(".js-video-chat");

        if ($projectChat.length > 0) return OpenUtil.openMessengerByProjectSrno(Detail.getProjectSrno());
        if ($videoChat.length > 0) return VideoConference.isZoomSynchronized(
            VideoConference.warnAndSendMessage,
            VideoConference.alertRequiredZoomSync,
            {type: 'projectSrno', val: Detail.getProjectSrno(), isMini: false}
        );
    }
})()