var WorkerPopup = (function () {

    var checkedWorkerRecord, submitWorkerRecord, todoWorkerId;

    var projectSrno, postCode, isTodo, isSubtask, isInput;
    var $workerPopup, $workerUl, $workerTarget, $workerInput;
    var searchTimer;
    var inputCallback;

    var workerPopupPageData = {
        PG_NO: 1,
        PG_PER_CNT: 20,
        NEXT_YN: "Y"
    }

    var popupId = "workerPopup";

    return {
        toggleWorkerPopup: toggleWorkerPopup,
        addInputWorkerEvent: addInputWorkerEvent,
        setSubmitRecord: setSubmitRecord,
        getPostWorkerRecord: getPostWorkerRecord,
        closeWorkerPopup: closeWorkerPopup,
    }

    function set$element() {
        $workerPopup = $("#workerPopup");
        $workerInput = $workerPopup.find("#workerInput")
        $workerUl = $workerPopup.find("ul");
        /**
         * <div id="workerPopup">
         *      <input id="workerInput">
         *      <ul></ul>
         * </div>
         * */
    }

    function toggleWorkerPopup($popupBefore, submitInRequestPopup, $button, getRecordCallback) {
        set$element();
        $workerTarget = $button;
        if ($workerPopup.length > 0) {
            closeWorkerPopup();
        } else {
            openWorkerPopup($popupBefore, submitInRequestPopup, getRecordCallback)
        }
    }

    function closeWorkerPopup() {
        set$element();
        $workerPopup.remove();
    }

    function setSubmitRecord(setJson) {
        submitWorkerRecord = setJson;
    }

    function openWorkerPopup($popupBefore, submitWorkerCallback, getRecordCallback) {

        var isPostPopup = $workerTarget.findUp("#postPopup").length > 0;
        projectSrno = isPostPopup ? PostPopup.getData().PROJECT_SRNO : Detail.getProjectSrno();
        postCode = Often.null2Void($popupBefore.attr("data-post-code"), PostPopup.getData().POST_CODE);
        if (!projectSrno || projectSrno.length === 0) return Often.toast('error', i18next.t('front.alert.select', {val: '$t(dictionary.project)'}));
        setPostType();
        drawWorkerPopupAndPosition($popupBefore); //전체 팝업을 그리고 포지션맞춰
        set$element();
        drawWorkerPopupByPostRecord();

        if (isTodo) todoWorkerId = $workerTarget.attr('data-worker-id');
        var isSchedule = postCode === DetailCode.SCHEDULE;
        $workerPopup.find("#workerInput").attr("placeholder",
            i18next.t('front.alert.enterWord', {val: isSchedule ? '$t(back.LangConvert.participant)' : '$t(dictionary.manager)'}));

        function drawWorkerPopupByPostRecord() {
            setSubmitRecord([]);
            if (Detail.getPostStatus() === "ADD" ||
                Detail.getPostStatus() === "EDIT" ||
                Detail.getPostStatus() === "SHARE_POST") return drawWorkerPopup();
            if (isSubtask && $workerTarget.parents(".js-subtask-edit-layer").length > 0) return drawWorkerPopup();
            getPostWorkerRecord({
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: getWorkerPostSrno(),
                TMPL_TYPE: postCode,
            }, drawWorkerPopup);
        }

        function drawWorkerPopup(workerRecord) {
            initPopup();
            var isExistData = Often.null2Void(workerRecord).length > 0;
            if (isExistData) {
                var recordId = ParticipantCode._ID[postCode - 2];
                var postNm = ParticipantCode._NAME[postCode - 2];
                var postWorkerRecord = [];
                $.each(workerRecord, function (i, worker) {
                    var tempJson = {};
                    tempJson[recordId] = worker.USER_ID;
                    tempJson[postNm] = worker.USER_NM;
                    tempJson["USE_INTT_ID"] = worker.USE_INTT_ID;
                    tempJson["PRFL_PHTG"] = worker.PRFL_PHTG;
                    postWorkerRecord.push(tempJson);
                })
                setSubmitRecord(postWorkerRecord)
            } else {
                //바닥에 선택된 담당자를 체크
                (typeof getRecordCallback === "function") && setSubmitRecord(getRecordCallback());
            }
            checkedWorkerRecord = $.extend([], submitWorkerRecord);
            fillWorkers();
            $workerInput.focus();
            addPopupEvent($workerPopup, submitWorkerCallback);
        }

        function getWorkerPostSrno() {
            var isEdit = "EDIT" === Detail.getPostStatus();
            return isEdit ? PostPopup.getData().POST_SRNO
                : isSubtask ? $workerTarget.parents(".js-subtask-li").attr("data-post-srno")
                    : $popupBefore.attr("data-post-srno");
        }
    }

    function addPopupEvent($workerPopup, submitWorkerCallback) {
        $workerPopup.off("click").on("click", clickWorkerPopup);
        $workerPopup.off("keydown").on("keydown", addKeyDownEvent);
        $workerPopup.find("#workerInput").off("keyup").on("keyup", keyupWorkerInput);

        function keyupWorkerInput(e) {
            if (KeyCheck.isKey(e, "ENTER")) return;
            if (KeyCheck.isAvailable(e)) return;
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                ListHelper.initPageData(workerPopupPageData, $workerUl);
                fillWorkers()
            }, 500); //오토컴플리트는 최소 0.5초를 가짐
        }

        function clickWorkerPopup(e) {
            var $eTarget = $(e.target);
            var $selectCancel = $eTarget.findUp(".js-select-cancel");
            var $selectWorker = $eTarget.findUp(".js-select-worker");

            if ($selectCancel.length > 0) {
                initSelect();
                selectWorkers();
                $workerPopup.find(".js-registration").removeClass("active");
                return;
            }

            if ($selectWorker.length > 0) {
                submitWorkerRecord = checkedWorkerRecord;
                (typeof submitWorkerCallback === 'function') && submitWorkerCallback(submitWorkerRecord);
                $workerPopup.remove();
            }
        }
    }

    function addKeyDownEvent(e) {
        var $selectOneWorker = $workerPopup.find(".js-worker-list").find(".select");
        if (KeyCheck.isKey(e, "ENTER") && $selectOneWorker.length > 0) {
            $selectOneWorker.find(".js-registration").trigger("click", [true]);
            $workerPopup.find(".js-select-worker:visible").trigger("click");
            return;
        }
        if (KeyCheck.isKey(e, "ESC")) {
            e.stopPropagation();
            e.preventDefault();
            closeWorkerPopup();
            return;
        }
        $workerPopup && $workerPopup.isArrowSelect(e);
    }

    function addInputWorkerEvent($postPopup, callback) {
        var $input = $postPopup.find(".js-worker-input");
        projectSrno = PostPopup.getData().PROJECT_SRNO;
        postCode = Often.null2Void($postPopup.attr("data-post-code"), PostPopup.getData().POST_CODE);
        inputCallback = callback;

        $input.off("click").on("click", function (e) {
            e.stopPropagation();
            setPostStatus();
            $workerInput = $(e.target);
            openInputWorkerPopup(e);
            ListHelper.initPageData(workerPopupPageData, $workerPopup.find(".js-worker-list>ul"));
            fillWorkers();
        });

        $input.off("keyup").on("keyup", function (e) {
            e.stopPropagation();
            var isComposing = (!Often.isBrowser("ie") && !e.originalEvent.isComposing);
            if (KeyCheck.isKey(e, "ENTER")) return;
            if (KeyCheck.isAvailable(e) || isComposing) return;
            closeWorkerPopup();
            setPostStatus();
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                $workerInput = $(e.target);
                openInputWorkerPopup(e);
                ListHelper.initPageData(workerPopupPageData, $workerPopup.find(".js-worker-list>ul"));
                fillWorkers();
            }, 500); //오토컴플리트는 최소 0.5초를 가짐
        });

        $input.off("keydown").on("keydown", function (e) {
            e.stopPropagation();
            setPostStatus();
            $workerInput = $(e.target);
            if ($workerPopup.is(":visible")) addKeyDownEvent(e);
        });

        function openInputWorkerPopup(e) {
            $workerTarget = $(e.target);
            var $popupBefore = $workerTarget.findUp(".js-popup-before");
            $workerPopup = drawWorkerPopupAndPosition($popupBefore);
            $workerUl = $workerPopup.find("ul");
        }

        function setPostStatus() {
            isInput = true;
            isSubtask = false;
            isTodo = false;
        }
    }

    /**
     *
     * @param postJson {
     *     COLABO_SRNO: 프로젝트 번호
     *     COLABO_COMMT_SRNO: 포스트 번호
     *     TMPL_TYPE: 포스트 타입
     * }
     * @param callback: ( 선택값 )
     */
    function getPostWorkerRecord(postJson, callback) {
        Ajax.executeApi(RenewalApi.GET.ACT_POST_WORKER_LIST, postJson, function (workerData) {
            callback(Often.null2Void(workerData.WORKER_RECORD, []));
        })
    }

    function setPostType() {
        isInput = false;
        isTodo = (postCode === DetailCode.TODO);
        isSubtask = $workerTarget.findUp(".js-subtask-area").length > 0;
    }

    //checkArray ==> activeObject
    function selectWorkers() {

        var $allWorkerItem = $workerPopup.find(".js-registration");
        var matchingCount = 0;
        var recordId = ParticipantCode._ID[postCode - 2];

        drawSelectWorkerCount($workerPopup, getWorkerCount($allWorkerItem));

        if (isTodo) {
            if ('' === todoWorkerId) {
                $allWorkerItem.removeClass("active");
            } else {
                selectMatchingWorkerId(todoWorkerId);
            }
            return;
        }

        if (checkedWorkerRecord.length === 0) {
            $allWorkerItem.removeClass("active")
        } else {
            checkedWorkerRecord.forEach(function (checkedWorker) {
                selectMatchingWorkerId(Often.null2Void(checkedWorker[recordId], checkedWorker["USER_ID"]));
            })
        }

        function selectMatchingWorkerId(workerId) {

            $.each($allWorkerItem, function (i, workerEl) {
                var isSameId = $(workerEl).attr("data-worker-id") === workerId;
                if (isTodo) {
                    isSameId && $(workerEl).addClass("active");
                    return;
                }
                if (checkedWorkerRecord.length <= matchingCount) return false;
                if (isSameId) {
                    $(workerEl).addClass("active");
                    matchingCount++;
                }
            })
        }
    }

    function getWorkerCount() {
        if (isTodo) return (todoWorkerId ? 1 : 0);
        return checkedWorkerRecord.length;
    }

    function drawSelectWorkerCount($workerPopup, count) {
        var $selectAlert = $workerPopup.find(".js-select-alert");
        if ($selectAlert.length > 0) {
            $selectAlert.css("display", (count === 0) ? "none" : "block");
            $workerPopup.find(".js-select-count").text(i18next.t('front.common.selectCountMembers', {count: count}))
            return;
        }
        $selectAlert = $($("#workerSelectCount").html());
        $selectAlert.find(".js-select-count").text(i18next.t('front.common.selectCountMembers', {count: count}))
        $selectAlert.find(".js-select-cancel").text(i18next.t('dictionary.cancel'))
        $selectAlert.css("display", (count === 0) ? "none" : "block");
        $workerPopup.append($selectAlert);
    }

    function initSelect() {
        submitWorkerRecord = [];
        checkedWorkerRecord = [];
        todoWorkerId = '';
    }

    function initPopup() {
        initSelect();
        ListHelper.initPageData(workerPopupPageData);
    }

    function drawWorkerPopupAndPosition($popupBefore) {
        var isViewPost = ($popupBefore.findUp("#projectFeedArea").length > 0 ||
            $popupBefore.findUp("#postPopup").attr("data-code") === "VIEW");
        var buttonHeight = 40;
        var popupHeight = 290;
        var popupWidth = 250;
        var targetOffset = $workerTarget.offset();
        var layerOffset = $popupBefore.offset();
        var layerPos = $popupBefore.position();
        var topPosition = layerPos.top + (targetOffset.top - layerOffset.top);
        var leftPosition = layerPos.left + (targetOffset.left - layerOffset.left);
        var calculateTop = (isViewPost ? topPosition : targetOffset.top - layerOffset.top);
        var isOverPositionTop = window.innerHeight < targetOffset.top + popupHeight;
        var isOverPositionLeft = window.innerWidth < targetOffset.left + popupWidth;
        var topCss = isOverPositionTop ? -(popupHeight) : buttonHeight;
        var leftCss = isOverPositionLeft ? -(popupWidth) : 0;
        var cssJson = {
            top: calculateTop + topCss,
            left: leftPosition + leftCss,
            transform: 'none',
        };
        var $tempWorkerPopup = $($("#workersPopup").html());
        $tempWorkerPopup.attr({
            'id': popupId,
            'data-code': 'worker',
            'data-subtask-yn': isSubtask ? 'Y' : 'N'
        }).css(cssJson);

        if (Often.isFunc(Func.CLOUD.INVITATION_POPUP)) {
            var isTask = $popupBefore.find(".js-post-nav:visible").hasClass("task");
            var isSchedule = $popupBefore.find(".js-post-nav:visible").hasClass("schedule");
            var isInputWorkerPopup = ((isTask && !isSubtask) || isSchedule);
            if (isInputWorkerPopup) {
                $tempWorkerPopup.addClass("input-popup");
                $tempWorkerPopup.css("display", "none");
            }
        }
        $popupBefore.append($tempWorkerPopup);

        return $popupBefore.find("#" + popupId);
    }

    function fillWorkers() {
        Ajax.executeApi(RestApi.GET.COLABO2_SENDIENCE_R101, $.extend({
            packetOption: Ajax.OPTION.PREVENT_CALLBACK
        }, workerPopupPageData, {
            COLABO_SRNO: projectSrno,
            SRCH_WORD: $.trim($workerInput.val()),
            SORT_DESC: "N"
        }), function (participantData) {
            if (workerPopupPageData.PG_NO === 1) {
                setTimeout(function () {
                    ListHelper.selectFirstItemByArrow($workerUl);
                }, 0)
            }
            $workerUl.drawListHelper({
                pageData: workerPopupPageData,
                nextYn: participantData["NEXT_YN"],
                records: participantData["SENDIENCE_REC"],
                noDataHtml: ListHelper.getNoDataHtml("SEARCH"),
                targetObj: {
                    scroll: $workerUl.parents(".js-worker-list"),
                    focus: $workerInput,
                },
                callback: {
                    item: getHtmlByWorkerRecord,
                    click: isInput ? clickInputWorkerUl : clickWorkerUl,
                    scroll: fillWorkers,
                    final: isInput ? showWorkerPopup : selectWorkers,
                }
            })
        });

        function showWorkerPopup() {
            $workerPopup.css("display", "block");
        }

        function clickInputWorkerUl(e, isEnterKey) {
            var $eTarget = $(e.target);
            var $popupBefore = $eTarget.parents(".js-popup-before");
            var $workerItem = $eTarget.findUp(".js-registration");
            if ($workerItem.length === 0) return;
            var workerArray = []
            workerArray.push(makeCommonPostJson($workerItem));
            $workerInput.val("");
            $workerInput.focus();
            (typeof inputCallback === "function") && inputCallback(workerArray);
            closeWorkerPopup();
            $workerTarget = $popupBefore.find(".js-worker-input:visible");
            if (isEnterKey) {
                ListHelper.initPageData(workerPopupPageData);
                $workerPopup = drawWorkerPopupAndPosition($popupBefore);
                $workerUl = $workerPopup.find("ul");
                fillWorkers();
            }
        }

        function clickWorkerUl(e) {
            var $eTarget = $(e.target);
            var $workerItem = $eTarget.findUp(".js-registration");

            if ($workerItem.length > 0) {
                selectOneWorker($workerItem);
                drawSelectWorkerCount($workerPopup, getWorkerCount(isTodo))
            } else {
                //pass
            }

            function selectOneWorker($workerButton) {

                var workerId = $workerButton.attr("data-worker-id");
                $workerButton.toggleClass("active");
                if (!$workerButton.hasClass("active")) return removeOneWorker(checkedWorkerRecord, workerId);

                if (isTodo) {
                    checkRadioButton();
                    selectWorkers();
                } else {
                    //pass
                }

                checkedWorkerRecord.push(makeCommonPostJson($workerButton));

                function checkRadioButton() {
                    checkedWorkerRecord = [];
                    todoWorkerId = workerId;
                    $workerPopup.find(".js-registration").removeClass("active");
                }

                function removeOneWorker(jsonArray, targetId) {
                    if (isTodo) {
                        todoWorkerId = '';
                        $workerPopup.find(".js-select-alert").css("display", "none");
                        return;
                    }
                    jsonArray.forEach(function (jsonItem, idx) {
                        var isOk = jsonItem[ParticipantCode._ID[postCode - 2]] === targetId;
                        isOk && jsonArray.splice(idx, 1);
                    })
                }
            }
        }
    }

    function makeCommonPostJson($workerButton) {
        var returnCommonJson = {}
        var postId = ParticipantCode._ID[postCode - 2];
        var postNm = ParticipantCode._NAME[postCode - 2];
        returnCommonJson[postId] = $workerButton.attr("data-worker-id");
        returnCommonJson[postNm] = $workerButton.find(".js-registration-name").text();
        returnCommonJson["PRFL_PHTG"] = $workerButton.attr("profile-data");
        returnCommonJson["RQST_USE_INTT_ID"] = $workerButton.attr("data-use-intt-id");
        if (DetailCode.SCHEDULE === postCode) {
            returnCommonJson["RCVR_CORP_NM"] = $workerButton.find(".js-registration-company").text();
            returnCommonJson["RCVR_DVSN_NM"] = $workerButton.find(".js-registration-team").text();
            returnCommonJson["JBCL_NM"] = $workerButton.find(".js-registration-position").text();
        }
        return returnCommonJson;
    }

    function getHtmlByWorkerRecord(record) {
        var baseHtml = $("#workerListItem").html();
        var isInvitationPopupFunc = Often.isFunc(Func.CLOUD.INVITATION_POPUP);
        var returnHtml = "";
        $.each(record, function (i, participant) {
            var companyName = Often.null2Void(participant.CORP_NM, "");
            var teamName = Often.null2Void(participant.CORP_NM, "");
            var isPersonal = ("" === companyName && "" === teamName);
            var tempHtml = ListHelper.replaceJson(baseHtml, {
                'name': participant.RCVR_USER_NM,
                'team': Often.null2Void(participant.RCVR_DVSN_NM, ""),
                'position': Often.null2Void(participant.JBCL_NM, ""),
                'company': Often.null2Void(participant.RCVR_CORP_NM, ""),
                'profile': ListHelper.setProfile(participant.PRFL_PHTG),
                'profile-data': participant.PRFL_PHTG,
                'personal-yn': (isPersonal ? "d-none" : "d-block"),
                'worker-id': Often.null2Void(participant.RCVR_USER_ID, ""),
                'use-intt-id': Often.null2Void(participant.RCVR_USE_INTT_ID, ""),
            });
            returnHtml += tempHtml;
        })
        return returnHtml;
    }
})()