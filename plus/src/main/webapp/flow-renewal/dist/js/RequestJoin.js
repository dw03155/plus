var RequestJoin = (function () {

    var $requestJoinPopup;
    var pageData = {
        PG_NO: 1,
        NEXT_YN: "Y"
    }

    var projectSrno;

    return {
        openRequestJoinPopup: openRequestJoinPopup,
        closeRequestJoinPopup: closeRequestJoinPopup,
    }

    function openRequestJoinPopup(colaboSrno) {
        $requestJoinPopup = $("#requestJoinPopup");
        projectSrno = colaboSrno ? colaboSrno : Detail.getProjectSrno();
        ListHelper.initPageData(pageData, $("#joinParticipantUl"));
        drawJoinParticipant();
        addEvent();
    }

    function closeRequestJoinPopup() {
        $requestJoinPopup.fadeOut(200);
    }

    function addEvent() {
        $requestJoinPopup.find("#closeBtn").off("click").on("click", closeRequestJoinPopup);
    }

    function drawJoinParticipant() { //스크롤 처리 필요
        Ajax.executeApi(RestApi.GET.COLABO2_INVT_R003, $.extend({}, pageData, {
            COLABO_SRNO: projectSrno,
        }), function (dat) {
            $("#joinParticipantUl").drawListHelper({
                pageData: pageData,
                nextYn: dat["NEXT_YN"],
                records: dat.JOIN_REC,
                noDataHtml: ListHelper.getNoDataHtml(),
                callback: {
                    item: getJoinParticipantListHtml,
                    click: clickJoinParticipantUl,
                }
            });
            $requestJoinPopup.fadeIn(200);
        })
    }

    function getJoinParticipantListHtml(record) {
        var baseHtml = $("#joinParticipantItem").html();
        var returnHtml = "";
        $.each(record, function (i, participant) {
            var imageUrl = ImageUtil.removeDomain("PROFILE", participant.PRFL_PHTG);
            returnHtml += ListHelper.replaceJson(baseHtml, {
                "profile-image": 'style="background-image: url(' + imageUrl + ')"',
                "user-id": participant.USER_ID,
                "name": participant.USER_NM,
            })
        })
        return returnHtml;
    }

    function clickJoinParticipantUl(e) {
        var $eTarget = $(e.target);
        var $acceptBtn = $eTarget.findUp("#acceptBtn");
        var $rejectBtn = $eTarget.findUp("#rejectBtn");
        var $profileImage = $eTarget.findUp(".js-profile-image");

        if ($acceptBtn.length > 0) {
            changeJoinStatus(true);
            return;
        }

        if ($rejectBtn.length > 0) {
            changeJoinStatus(false);
            return;
        }

        if ($profileImage.length > 0) {
            var userId = $profileImage.findUp(".js-join-participant-item").attr("data-user-id");
            Profile.drawProfilePopup(userId);
            return;
        }

        function changeJoinStatus(isAccept) {
            var $targetItem = $eTarget.findUp(".js-join-participant-item");
            var userId = $targetItem.attr("data-user-id");
            var statusCode = isAccept ? JoinStatus.APPLY_JOIN_2 : JoinStatus.REJECT_JOIN_2;
            JoinProject.updateJoinStatus(projectSrno, userId, statusCode, function () {
                $targetItem.remove();
                Participant.drawProjectParticipantItems(projectSrno, true);
                Participant.drawJoinParticipantItem(projectSrno);

                if ($requestJoinPopup.find(".js-join-participant-item").length === 0) {
                    $requestJoinPopup.find("#joinParticipantUl").append(ListHelper.getNoDataHtml());
                }
            });
        }
    }
})();