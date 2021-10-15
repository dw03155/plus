var JoinProject = (function () {

    var joinProjectPageData = {
        PG_NO: 1,
        PG_PER_CNT: 50,
        NEXT_YN: "Y",
    }

    var $joinArea, $joinProjectLayer, $joinProjectUl;

    return {
        drawJoinProjectCount: drawJoinProjectCount,
        showJoinProjectBar: showJoinProjectBar,
        updateJoinStatus: updateJoinStatus,
        closeJoinProjectBar: closeJoinProjectBar,
    }

    function set$element() {
        $joinArea = $("#joinArea");
        $joinProjectLayer = $("#joinProjectLayer");
        $joinProjectUl = $("#joinProjectUl");
    }

    function drawJoinProjectCount() {
        set$element();
        Ajax.executeApi(RestApi.GET.FLOW_JOIN_REQ_R001, {}, function (dat) {
            var isExistCount = (Often.null2Void(dat.JOIN_REQ_CNT, "0") !== "0");
            $joinArea.find(".badge-count").text(dat.JOIN_REQ_CNT);
            showJoinProjectBar(isExistCount);
        })
    }

    function showJoinProjectBar(isExistCount) {
        set$element();
        $joinArea.css('display', (isExistCount ? 'block' : "none"));
        isExistCount && $joinArea.off('click').on('click', clickJoinProjectBar);
    }

    function clickJoinProjectBar() {
        set$element();
        if ($joinProjectLayer.is(":visible")) closeJoinProjectBar();
        else drawJoinProjectItems();
    }

    function closeJoinProjectBar() {
        set$element();
        $joinProjectLayer.fadeOut(200);
    }

    function drawJoinProjectItems() {
        ListHelper.initPageData(joinProjectPageData, $joinProjectUl);
        Ajax.executeApi(RestApi.GET.FLOW_JOIN_REQ_R002, joinProjectPageData, function (dat) {
            if (dat.INVT_REC.length === 0) {
                Often.toast("error", "가입 요청중인 프로젝트가 없습니다!");
                $joinArea.css("display", "none");
                return;
            }
            $joinProjectUl.drawListHelper({
                pageData: joinProjectPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["INVT_REC"],
                callback: {
                    click: clickJoinProjectItems,
                    item: getJoinProjectItem,
                }
            })
            $joinProjectUl.addClass('section-list-1');
            $joinProjectLayer.css("display", "block");
        })

        function getJoinProjectItem(record) {
            return AllProject.getProjectItems(record, true, false);
        }
    }

    function clickJoinProjectItems(e) {
        var $eTarget = $(e.target);
        var $projectItem = $eTarget.findUp(".project-item");
        if ($projectItem.length === 0) return;
        var projectSrno = $projectItem.attr('project-srno');

        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.common.requestingToJoin'),
                cancel: i18next.t('front.common.cancelApplication'),
            },
            callback: {
                cancel: cancelJoinProject
            }
        })

        function cancelJoinProject() {
            updateJoinStatus(projectSrno, _USER_ID, JoinStatus.CANCEL_REQUEST_JOIN, PopupDraw.closePopup());
        }
    }

    function updateJoinStatus(projectSrno, targetUserId, statusCode, callback) {
        Ajax.executeApi(RestApi.PUT.COLABO2_INVT_U001, {
            COLABO_SRNO: projectSrno,
            IN_RCVR_USER_ID: targetUserId,
            STTS: statusCode
        }, function () {
            (typeof callback === "function") && callback()
            if (statusCode === JoinStatus.APPLY_JOIN) { // 초대
                ViewChanger.loadPageJson({code: "detail", first: projectSrno});
            } else if (statusCode === JoinStatus.REQUEST_JOIN) { // 가입 신청
                Often.toast("success", i18next.t('front.alert.requestedToJoin'))
                JoinProject.drawJoinProjectCount();
            } else if (statusCode === JoinStatus.APPLY_JOIN_2) {
                Often.toast("success", i18next.t('back.langConvert.approveInvitation'));
            } else if (statusCode === JoinStatus.REJECT_JOIN_2) {
                Often.toast("success", i18next.t('back.langConvert.declineInvitation'));
            } else if (statusCode === JoinStatus.CANCEL_REQUEST_JOIN) {
                Often.toast("success", i18next.t('front.alert.inviteCancel'));
                JoinProject.drawJoinProjectCount();
            } else {
                //pass
            }
        })
    }
})();