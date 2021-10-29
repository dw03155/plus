var PinPost = (function () {

    return {
        drawProjectPinPostItems: drawProjectPinPostItems,
        controlPinElement: controlPinElement,
        unPinElement: unPinElement,
        drawProjectPinPostItemsByRecord: drawProjectPinPostItemsByRecord,
        updatePinCount: updatePinCount,
    }

    function drawProjectPinPostItems() {
        var $projectPinArea = $("#projectPinArea");
        $projectPinArea.css("display", "none");
        var $pinPostUl = $("#pinPostUl");
        Ajax.executeApi(RestApi.GET.COLABO2_PIN_R001, {
            COLABO_SRNO: Detail.getProjectSrno()
        }, function (dat) {
            $pinPostUl.empty()

            if (dat.PIN_REC.length === 0) return;

            $("#projectPinCount").text(dat.PIN_REC.length);
            $pinPostUl.append(getPinItemsHtml(dat.PIN_REC))
                .off('click').on('click', clickPinPostUl);
            $projectPinArea.css("display", "block");
        })
    }

    function drawProjectPinPostItemsByRecord(pinRecord) {
        var $projectPinArea = $("#projectPinArea");
        $projectPinArea.css("display", "none");
        var $pinPostUl = $("#pinPostUl");
        $pinPostUl.empty()
        if (pinRecord.length === 0) return;
        $("#projectPinCount").text(pinRecord.length);
        $pinPostUl.append(getPinItemsHtml(pinRecord, true)).off('click').on('click', clickPinPostUl);
        $projectPinArea.css("display", "block");
    }

    function getPinItemsHtml(pinArray, isNew) {
        var returnHtml = "";
        var baseHtml = $("#pinPostItem").html();
        $.each(pinArray, function (i, pin) {
            var tmplType = Often.null2Void(pin.TMPL_TYPE, "1");
            var tmplGb = Often.null2Void(pin.TEMP_GB, "1");
            var isSchedule = DetailCode.SCHEDULE === (isNew ? tmplType : tmplGb);
            var isTodo = DetailCode.TODO === (isNew ? tmplType : tmplGb);
            var isTask = DetailCode.TASK === (isNew ? tmplType : tmplGb);

            returnHtml += ListHelper.replaceJson(baseHtml, isNew ? {
                'title': convertTitleFirstLine(Often.null2Void(pin.COMMT_TTL, pin.CNTN)),
                'colabo-srno': pin.COLABO_SRNO,
                'post-srno': pin.COLABO_COMMT_SRNO,
                'post-gb': DetailCode.POST._GB[tmplType],
                'post-name': i18next.t(DetailCode.POST._TEXT[tmplType]),
                'status-code': convertTaskClass(isTodo ? 'request' : isTask ? DetailCode.STATUS._GB[pin.TASK_STTS] : ""),
                'status': i18next.t(isTodo ? pin.TODO_DONE_PERCENT + '%' : isTask ? DetailCode.STATUS._TEXT[pin.TASK_STTS] : ""),
                'complete-yn': (DetailCode.STATUS._GB[pin.TASK_STTS] === "completion" ? "complete" : (DetailCode.STATUS._GB[pin.TASK_STTS] === "hold") ? "hold" : ""),
                'schedule-yn': (isSchedule ? "d-block" : "d-none"),
                'start-date': Tz.momentTimeZone(pin.SCHD_STTG_DTTM, 'type4'),
                'start-time': Tz.momentTimeZone(pin.SCHD_STTG_DTTM, 'type8'),
            } : {
                'title': pin.TTL,
                'colabo-srno': pin.COLABO_SRNO,
                'post-srno': pin.COLABO_COMMT_SRNO,
                'post-gb': DetailCode.POST._GB[tmplGb],
                'post-name': i18next.t(DetailCode.POST._TEXT[tmplGb]),
                'status-code': convertTaskClass(isTodo ? 'request' : isTask ? DetailCode.STATUS._GB[pin.STTS] : ""),
                'status': i18next.t(isTodo ? pin.TODO_DONE_PERCENT : isTask ? DetailCode.STATUS._TEXT[pin.STTS] : ""),
                'complete-yn': (DetailCode.STATUS._GB[pin.STTS] === "completion" ? "complete" : DetailCode.STATUS._GB[pin.STTS] === "hold" ? "hold" : ""),
                'schedule-yn': (isSchedule ? "d-block" : "d-none"),
                'start-date': Tz.momentTimeZone(pin.STTG_DTTM, 'type4'),
                'start-time': Tz.momentTimeZone(pin.STTG_DTTM, 'type8'),
            })
        });
        return returnHtml;

        function convertTaskClass(gb) {
            return (("" === Often.null2Void(gb)) ? "d-none" : "state " + gb);
        }

        function convertTitleFirstLine(title) {
            var returnTitle = "";
            if (title.length === 0) return returnTitle;
            var titleArray = title.split("\n");
            $.each(titleArray, function (i, title) {
                if (title !== "") {
                    returnTitle = title;
                    return false;
                }
            })
            return returnTitle;
        }
    }

    function clickPinPostUl(e) {
        var $eTarget = $(e.target);
        var $pinItem = $eTarget.findUp(".js-pin-item");
        if ($pinItem.length === 0) return;
        PostPopup.togglePostView(Detail.getProjectSrno(), $pinItem.attr('data-post-srno'), "", function () {
            $("#pinPostUl").find(".highlight").removeClass("highlight");
            $pinItem.find("a").addClass("highlight");
        });
    }

    /**
     * @param isEdit 글이 수정되어 수정된 요소를 치환하기 위함
     * @description 현재 포스트의 정보를 가져와 HTML로 변환
     * */
    function controlPinElement(status, COLABO_SRNO, COLABO_COMMT_SRNO) {
        var $postData = $('#post-' + COLABO_COMMT_SRNO);
        var isPinned = $postData.attr('pin-yn');
        var $postItem = $("#post-" + COLABO_COMMT_SRNO);
        var $pinItem = $("#pin-" + COLABO_COMMT_SRNO);
        var isPinActive = ((status === "EDIT" && isPinned) || status === "PIN");
        var statusCode = Often.null2Void($postItem.find(".js-task-state.state-button-group").attr('data-status'));

        if (status === "DELETE") {
            $pinItem.remove();
            checkIfPinListExist();
            updatePinCount();
            return
        }
        if (!isPinActive) return;

        var postTitle = $postData.find('.post-title-area .post-title').text()
        var isExistPostTitle = postTitle !== "";

        var inputData = [{
            'TTL': isExistPostTitle ? postTitle : $postData.find("#summaryPost div:first").text(),
            'COLABO_SRNO': COLABO_SRNO,
            'COLABO_COMMT_SRNO': COLABO_COMMT_SRNO,
            'TEMP_GB': $postItem.attr('data-post-code'),
            'STTS': taskStatusCode[statusCode.toUpperCase()],
            'STTG_DTTM': $postItem.attr('time'),
            'TODO_DONE_PERCENT': $postItem.attr('todo-done-percent'),
        }]

        var pinItemHtml = getPinItemsHtml(inputData);
        if (status === "EDIT" && isPinned) {
            $pinItem.html($(pinItemHtml).find('a'))
        } else if (status === "PIN") {
            $('#pinPostUl').prepend(pinItemHtml).off('click').on('click', clickPinPostUl);
            removePinArea()
        } else {
            //pass
        }

        updatePinCount();
    }

    function unPinElement(COLABO_SRNO, COLABO_COMMT_SRNO) {
        var $postItem = $("#pin-" + COLABO_COMMT_SRNO);
        $postItem.remove();
        checkIfPinListExist();
    }

    function checkIfPinListExist() {
        if ($('#pinPostUl li').length === 0) $('#projectPinArea').css("display", "none");
    }

    function removePinArea() {
        var $projectPinArea = $('#projectPinArea');
        if ($projectPinArea.hasClass('d-none')) $projectPinArea.css("display", "block");
    }

    function updatePinCount() {
        $("#projectPinCount").text($("#pinPostUl li").length);
    }
})()
