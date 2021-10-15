var AlarmUpdate = (function () {

    return {
        updateUnReadElementBySocketReceive: updateUnReadElementBySocketReceive,
        updateUnReadElementBySelf: updateUnReadElementBySelf,

        drawTopNotReadCount: drawTopNotReadCount,
        readAlarmAndAction: readAlarmAndAction,
        readAllAlarm: readAllAlarm,
        readAllProjectAlarm: readAllProjectAlarm,

        removeNewUpdate: removeNewUpdate,
        setBadgeCount: setBadgeCount,
        executeReadApi: executeReadApi,
    }

    /**
     * 실제 동작으로 구분하는 것이 아닌 결과적으로 상태 구분
     * isWritePostResult : 글 작성 || 댓글 작성
     * isAllReadResult : 전체읽음 || 이 프로젝트만 안읽음건이 있었는데 프로젝트전체읽음으로 전체 읽어짐 || 전체 안읽은게 1건인데 포스트읽음으로 전체 읽어짐
     * isNotAllReadResult : 프로젝트 전체 혹은 포스트 1개 읽었더니 아직 전체 건수가 남음 (애매한 지점)
     * ㄴ Todo. 배치로 1개 알림 읽음 시도시 어떤 알림들이 읽혔는지 체크는 못한다! = 같은 계정의 다른 화면은 포스트 읽음 로직 불가
     */
    function updateUnReadElementBySocketReceive(dataJson) {

        var isElectron = Electron.isElectronApp();
        var isNonFullElectron = isElectron && !Electron.getElectronConfig().b_fullMode;
        var totalBadgeCount = Number(dataJson.FLOW_CNT);

        if (Number($("#alarmTopCount").text()) === totalBadgeCount) return;

        var projectSrno = Number(Often.null2Void(dataJson.COLABO_SRNO, "-1"));
        var postSrno = Number(Often.null2Void(dataJson.COLABO_COMMT_SRNO, "-1"));
        var remarkSrno = Number(Often.null2Void(dataJson.COLABO_REMARK_SRNO, "-1"));

        var isWritePostResult = (totalBadgeCount > 0 && projectSrno > 0 && postSrno > 0);
        var isAllReadResult = totalBadgeCount === 0;
        var isNotAllReadResult = (totalBadgeCount > 0 && projectSrno > 0 && postSrno === -1 && remarkSrno === -1);

        if (isWritePostResult) {
            !isNonFullElectron && BrowserNoti.showAlarmNotification(dataJson);
            updateUnReadElementByWritePost(projectSrno);
            return
        }

        if (isAllReadResult) {
            isElectron && Electron.hideNoti();
            updateUnReadElementByAllRead();
            return;
        }

        if (isNotAllReadResult) {
            updateUnReadElementByProjectAllRead(projectSrno, true);
        }
    }

    /**
     * 결과적으로 상태로 구분하는 것이 아닌 실제 동작으로 상태 구분
     * ALARM_POST_WRITE : 글 작성 || 댓글 작성
     * ALARM_POST_READ : 1개 포스트 읽음 클릭
     * ALARM_ALL_READ : 전체 읽음버튼 클릭 || projectSrno 예 따라 프로젝트 전체 읽음버튼 클릭
     */
    function updateUnReadElementBySelf(dataJson) {
        var projectSrno = Often.null2Void(dataJson.PROJECT_SRNO);
        var postSrno = Often.null2Void(dataJson.POST_SRNO);
        if (dataJson.ALARM_POST_WRITE) return updateUnReadElementByWritePost(projectSrno);
        if (dataJson.ALARM_POST_READ) return updateUnReadElementByPostRead(projectSrno, postSrno);
        if (dataJson.ALARM_ALL_READ && Number(projectSrno) > 0) return updateUnReadElementByProjectAllRead(projectSrno, false);
        if (dataJson.ALARM_ALL_READ) return updateUnReadElementByAllRead();
    }

    /**
     * 메인 포스트 순서, 뱃지 갱신 x
     * 디테일 포스트, 포스트내 뱃지 갱신 x
     * 오직, [새글 업데이트] 버튼을 눌러야만 함
     *
     * @param projectSrno
     */
    function updateUnReadElementByWritePost(projectSrno) {
        if (isAdjustProjectOnDetail(projectSrno) || ViewChanger.isPage("main") || _IsMini) {
            drawNewUpdate();
        }
        updateRecentProjectBadge("WRITE_POST", projectSrno);
        updateTopAlarmListNCount("WRITE_POST");
        isAdjustProjectOnDetail(projectSrno) && getProjectAlarmData(projectSrno, function (infoData) {
            if (!infoData.ALARM_RECORD || infoData.ALARM_RECORD.length === 0) return;
            var projectAlarmCount = infoData.ALARM_COUNT;
            Alarm.initProjectAlarmList();
            Alarm.drawProjectAlarmItems(projectSrno, infoData.ALARM_RECORD, projectAlarmCount, true);
        })
    }

    function updateUnReadElementByAllRead() {
        var alarmMode = "READ_ALL";
        updateTopAlarmListNCount(alarmMode);
        updateRecentProjectBadge(alarmMode);
        updateProjectBadgeByMain(alarmMode);
        updatePartialUnReadItemByDetailPost(alarmMode);
        hideProjectAlarmArea(ViewChanger.isPage("detail"));
    }

    /**
     * 뱃지갱신 로직과 즉시 실행 로직이 있음.
     * 그 중, 뱃지갱신은 프로젝트 모두 읽음인줄 알았는데 따져보니 아닐수도 있음.
     * 즉시 실행하는 로직은 카운트 체크 이후 나 자신만 소켓으로 보내서 제어.
     *
     * @param projectSrno
     * @param isCheck - 프로젝트모두읽음 아닐수도 있으니 한번더 따져보기 (배치에서 올떄 )
     */
    function updateUnReadElementByProjectAllRead(projectSrno, isCheck) {
        var isAdjustProject = isAdjustProjectOnDetail(projectSrno);
        if (!isCheck) return updateLogic();
        getProjectAlarmData(projectSrno, function (infoData) {
            var projectAlarmCount = Number(Often.null2Void(infoData.ALARM_COUNT));
            if (projectAlarmCount === 0) return updateLogic();
            updateTopAlarmListNCount("READ_POST", projectSrno); //postSrno 없어서 갱신
            !_IsMini && updateRecentProjectBadge("READ_POST", projectSrno, projectAlarmCount);
            updateProjectBadgeByMain("READ_POST", projectSrno, projectAlarmCount);
            //Todo. 같은 계정의 다른 화면은 포스트 읽음 로직 불가하여 리로드
            //Note. 로직을 넣었는데 같은 프로젝트에서 읽음을 여러번 시도하면 배치 속도차에 따라 reload 되는 현상 있어 주석
            //if (!isAdjustProject) return;
            //ViewChanger.reloadPage();
        })

        function updateLogic() {
            var alarmMode = "READ_PROJECT";
            updateTopAlarmListNCount(alarmMode, projectSrno);
            !_IsMini && updateRecentProjectBadge(alarmMode, projectSrno);
            updateProjectBadgeByMain(alarmMode, projectSrno);
            if (!isAdjustProject) return;
            updatePartialUnReadItemByDetailPost(alarmMode, projectSrno);
            hideProjectAlarmArea(true);
        }
    }

    function updateUnReadElementByPostRead(projectSrno, postSrno) {
        
        updateTopAlarmListNCount("READ_POST", projectSrno, postSrno);

        getProjectAlarmData(projectSrno, function (infoData) {
            var projectAlarmCount = infoData.ALARM_COUNT;
            updateRecentProjectBadge("READ_POST", projectSrno, projectAlarmCount);
            updateProjectBadgeByMain("READ_POST", projectSrno, projectAlarmCount);
            if (!isAdjustProjectOnDetail(projectSrno)) return;
            updatePartialUnReadItemByDetailPost("READ_POST", projectSrno, postSrno);
            if (!infoData.ALARM_RECORD || infoData.ALARM_RECORD.length === 0) {
                hideProjectAlarmArea(true);
                return;
            }
            Alarm.initProjectAlarmList();
            Alarm.drawProjectAlarmItems(projectSrno, infoData.ALARM_RECORD, projectAlarmCount, true);
            /**
             * TODO
             * 포스트에 따라 1개 초과의 알림이 지워질 수도 있고
             * 새로운 데이터를 가져올때 PG_NO에 의한 페이징이 문제가 될 수 있음!
             * 추후 히스토리 생기면 넘기는 방향
             */
        })
    }

    function isAdjustProjectOnDetail(projectSrno) {
        return ViewChanger.isPage("detail") && Number(projectSrno) === Number(Detail.getProjectSrno());
    }

    function hideProjectAlarmArea(isOk) {
        isOk && $("#projectAlarmArea").css('display', "none");
    }

    function updateProjectBadgeByMain(mode, projectSrno, count) {
        if (!ViewChanger.isPage("main") && !ViewChanger.isPage("miniProject")) return;
        projectSrno = Number(Often.null2Void(projectSrno));
        var $projectHomeLayer = _IsMini? $("#miniProject") : $('#projectHomeLayer');
        var $targetProject = $projectHomeLayer.find("#project-" + projectSrno);
        if (mode === "READ_POST") return setBadgeCount($targetProject.find('.project-badge'), count, "inline-block");
        if (projectSrno > 0) return $targetProject.find('.project-badge').css('display', 'none');
        return $projectHomeLayer.find(".project-item").find('.project-badge').css('display', 'none');
    }

    function updateRecentProjectBadge(mode, projectSrno, count) {
        var isProjectData = Number(Often.null2Void(projectSrno)) > 0;
        var $RecentProjectUl = $("#RecentProjectUl");
        var attrName = isProjectData ? "[data-project-srno=" + projectSrno + "]" : "";
        var $targetItem = $RecentProjectUl.find(".recent-project-item" + attrName);
        if (mode === "WRITE_POST") return $targetItem.find(".squre-type").addClass("new");
        if (mode === "READ_POST") {
            if (count > 0) return $targetItem.find(".squre-type").addClass("new");
            return $targetItem.find(".squre-type").removeClass("new");
        }
        $targetItem.find(".new").removeClass("new");
    }

    //리스트형 미확인알림 빨간점 + 피드형 읽음건수 갱신
    function updatePartialUnReadItemByDetailPost(mode, projectSrno, postSrno) {
        if (!isAdjustProjectOnDetail) return;
        var $detailUl = $("#detailUl");
        var $targetItem;
        if (mode === "READ_ALL") {
            $targetItem = $detailUl.find(".detail-item[data-read-yn=N]");
        } else if (mode === "READ_PROJECT") {
            $targetItem = $detailUl.find(".detail-item[data-read-yn=N][data-project-srno=" + projectSrno + "]");
        } else {
            $targetItem = $detailUl.find(".detail-item[data-read-yn=N][data-project-srno=" + projectSrno + "][data-post-srno=" + postSrno + "]");
        }
        var isList = LocalUtil.getFeedType() === "list";
        if (isList) {
            //미확인알림 빨간점
            $targetItem.find(".js-indication").css("display", "none");
        } else {
            //읽음건수 +1
            $.each($targetItem.find(".confirmation-number"), function (i, element) {
                var $element = $(element);
                $element.text(Number($element.text()) + 1);
            })
        }
        $targetItem.attr("data-read-yn", "Y");
    }

    //상단 알람 리스트
    function updateTopAlarmListNCount(mode, projectSrno, postSrno) {
        var $alarmUl = $("#alarmUl");

        if (!$alarmUl.is(":visible")) {
            drawTopNotReadCount(false);
            return;
        }

        if (mode === "WRITE_POST") {
            //Todo. 보고 있던 상단 알림 목록이 갱신되는게 어색함 => 부분적으로 리스트 상단에 붙도록 작업 필요
            //Alarm.drawAlarmList(false);
            return;
        }

        if (mode === "READ_ALL") {
            drawTopNotReadCount(true);
            $alarmUl.children(".js-alarm-item.on").removeClass("on");
            return;
        }

        var $targetItem;
        if (mode === "READ_PROJECT") {
            $targetItem = $alarmUl.children(".js-alarm-item[colabo_srno=" + projectSrno + "]");
        } else {
            $targetItem = $alarmUl.children(".js-alarm-item[colabo_srno=" + projectSrno + "][colabo_commt_srno=" + postSrno + "]");
        }
        $targetItem.removeClass("on");
        drawTopNotReadCount(false);
    }

    // 상단 알림 COUNT 업데이트
    function drawTopNotReadCount(isAllRead) {
        var $alarmTopBadge = _IsMini ? $('#allProjectTopAlarmCount') : $("#alarmTopCount");
        if (isAllRead) return setBadgeCount($alarmTopBadge, "")
        Ajax.executeApi(RenewalApi.GET.ACT_ALARM_LIST, {MODE: "COUNT"}, function (dat) {
            setBadgeCount($alarmTopBadge, dat.ALARM_COUNT);
        })
    }

    // 알람 읽기
    function readAlarmAndAction(dataSet) {
        var projectSrno = dataSet.COLABO_SRNO;
        var postSrno = dataSet.COLABO_COMMT_SRNO;
        var remarkSrno = dataSet.COLABO_REMARK_SRNO;
        var isOpenPopup = dataSet.OPEN_POP;
        executeReadApi(dataSet, function () {
            var alarmAction = dataSet.ALARM_ACTION;
            if (alarmAction === "MOVE_ADMIN") return moveUserAdmin();
            if (alarmAction === "APPROVE_POP") return RequestJoin.openRequestJoinPopup(projectSrno);
            if (alarmAction === "TOAST") return Often.toast("info", dataSet.TOAST_MSG);
            if (alarmAction === "TOAST_CNTN") return Often.toast("info", dataSet.TOAST_CNTN);
            if (alarmAction === "INVITE_CANCEL") return Often.toast("info", i18next.t("front.alert.inviteCancel"))
            if (alarmAction === "INVITE_PROJECT") {
                Ajax.executeApi(RestApi.GET.COLABO2_INVT_R001, {COLABO_SRNO: projectSrno}, function (dat) {
                    var isPass = "Y" === Often.null2Void(dat.PASS_YN, "N");
                    if (isPass) return ViewChanger.loadPageJson({code: "detail", first: dat.COLABO_SRNO});
                    Often.toast("error", i18next.t('front.common.unavailableInvitation'));
                })
                return;
            }
            if (alarmAction === "MOVE_PROJECT") {
                ViewChanger.loadPageJson({code: "detail", first: dataSet.COLABO_SRNO});
                return;
            }
            Ajax.executeApi(RenewalApi.GET.ACT_EXIST_YN_BY_POST_N_REMARK, dataSet, function (dat) {
                if (dat.EXIST_YN === 'NOT_EXISTS_POST') return Often.toast("error", i18next.t('front.alert.deletedPost'));
                if (dat.EXIST_YN === 'NOT_EXISTS_REMARK') return Often.toast("error", "삭제된 댓글입니다.");
                if (Electron.isElectronApp() && _IsMini) return MiniProject.openProjectPage(projectSrno, postSrno, remarkSrno, false);
                if (isOpenPopup) return PostPopup.togglePostView(projectSrno, postSrno, remarkSrno);
            });
        })
    }

    function executeReadApi(dataSet, callback) {
        var projectSrno = dataSet.COLABO_SRNO;
        var postSrno = dataSet.COLABO_COMMT_SRNO;
        var remarkSrno = dataSet.COLABO_REMARK_SRNO;
        Ajax.executeApi(RestApi.PUT.COLABO2_ALAM_U002, dataSet, function () {
            UpdateElements.autoUpdateElem({
                ALARM_POST_READ: true,
                PROJECT_SRNO: projectSrno,
                POST_SRNO: postSrno,
                REMARK_SRNO: remarkSrno
            });
            (typeof callback === "function") && callback();
        });
    }

    // 모두 읽음 처리
    function readAllAlarm() {
        var $alarmUl = $("#alarmUl");
        var isTopAlarmNotExists = $alarmUl.children("li.on").length === 0;
        if (isTopAlarmNotExists) return Often.toast("success", '읽을 알림이 존재하지 않습니다');
        Ajax.executeApi(RestApi.PUT.COLABO2_ALAM_U102, {}, function () {
            Often.toast("success", i18next.t('front.alert.checkAllAlarm'));
            if ($("#notReadFilter").find(".js-alarm.on").hasClass("js-unread")) {
                $alarmUl.empty().html(ListHelper.getNoDataHtml("ALARM"))
            } else {
                updateUnReadElementByAllRead();
            }
            sendAllReadSocket();
        })
    }

    // 모두 읽음 이후 웹/미니/플젝창 알림처리
    function sendAllReadSocket() {
        SocketControl.sendMessage({
            CHAT_CODE: SocketAPI.MAIN.BADGE_UPDATE,
            COLABO_SRNO: "0",
            FLOW_CNT: "0",
            ROOM_SRNO: _USER_ID,
        });
    }

    // 프로젝트 모두 읽음 처리
    function readAllProjectAlarm() {
        var isProjectAlarmNotExists = $("#notReadAlarmUl li").length === 0;
        if (isProjectAlarmNotExists) return Often.toast("success", '읽을 글이 존재하지 않습니다');
        Ajax.executeApi(RestApi.PUT.COLABO2_ALAM_U102, {COLABO_SRNO: Detail.getProjectSrno()}, function () {
            Often.toast("success", i18next.t('front.alert.readProjectAlarm'));
            UpdateElements.autoUpdateElem({ALARM_ALL_READ: true, PROJECT_SRNO: Detail.getProjectSrno()})
        })
    }

    function removeNewUpdate() {
        $("#newUpdate").css('display', 'none');
    }

    function drawNewUpdate() {
        var $newUpdate = $("#newUpdate");
        $newUpdate.fadeIn(200).off("click").on("click", movePost);

        function movePost() {
            PostPopup.checkWritingAndShowPopup(function () {
                $newUpdate.fadeOut(200);
                ViewChanger.reloadPage();
            })
        }
    }

    function getProjectAlarmData(projectSrno, successCallback) {
        Ajax.executeApi(RenewalApi.GET.ACT_PROJECT_INFO, {
            COLABO_SRNO: projectSrno,
            GUBUN: "NOT_READ_YN",
            MODE: "UNREAD",
        }, successCallback);
    }

    function setBadgeCount($Badge, count, blockKey) {
        ListHelper.setCount($Badge, count, blockKey);
        if ($Badge.attr("id") !== "alarmTopCount" && $Badge.attr("id") !== "allProjectTopAlarmCount") return;
        ListHelper.setCount(_IsMini ? $("#allProjectAlarmCount") : $(".js-project-home-count"), count, "inline-block");
    }

    function moveUserAdmin() {
        Often.submitForm("flow_admin", "flow_admin.act", "flow_admin", {MENU: "flow-user", TAB: "USER-WAIT"});
    }

})()