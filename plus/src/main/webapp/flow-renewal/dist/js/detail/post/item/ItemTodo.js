var ItemTodo = (function () {

    var isTabKeyPressed = false;

    return {
        initEdit: initEdit,
        keydownTodoInput: keydownTodoInput,
        keyUpTodoInput: keyUpTodoInput,
        isTodoClickOnDetail: isTodoClickOnDetail,
        isTodoClickOnPostPopup: isTodoClickOnPostPopup,

        getLookHtml: getLookHtml,
        getTodoDataListHtml: getTodoDataListHtml,
        getTodoPercentJson: getTodoPercentJson,
        makeTodoLiHtml: makeTodoLiHtml,
        makeTodoJson: makeTodoJson,
        checkTodoValue: checkTodoValue,
    }

    function initEdit() {
        var $postPopup = $("#postPopup");
        $postPopup.find("#postTitle").focus();
        $postPopup.find(".js-registration[data-worker-id='']").remove();
        addSortableAction();
    }

    function addSortableAction() {
        var todoList = $("#postPopup").find("#todoEditUl");
        var copyHelper;
        todoList.sortable({
            handle: ".drag-button",
            item: "li",
            containment: todoList,
            axis: "y",
            cursorAt: {top: 5, left: 5},
            scroll: false,
            plugins: [new confirmDatePlugin({confirmText: i18next.t('dictionary.select'), showAlways: true,})],
            tolerance: "pointer",
            placeholder: "document-item-highlight",
            opacity: 0.6,
            start: function () {
                todoList.sortable("refreshPositions");
            },
            stop: function (e, ui) {
                var $item = $(ui.item);
                $item.css('transform', 'scale(1)');
                $item.css('display', '');
                copyHelper && copyHelper.remove();
            },
            helper: function (e, li) {
                var cloneLi = li.clone();
                $(cloneLi).css('opacity', '0.3');
                copyHelper = cloneLi.insertAfter(li);

                var $item = $(li);
                $item.find()
                $item.css('transform', 'scale(0.8) translate(-10%, -10%)');
                $item.css('display', '');

                return li.clone();
            },

        });
    }

    function keydownTodoInput(e) {
        isTabKeyPressed = (KeyCheck.isKey(e, "TAB"));
        if (!isTabKeyPressed) return;
        var $eTarget = $(e.target);
        var $postTitle = $eTarget.findUp("#postTitle");
        if ($postTitle.length !== 0) {
            isTabKeyPressed = false;
            var $postPopup = $postTitle.findUp("#postPopup");
            var $todoItem = $postPopup.find("#todoEditUl .todo-item");
            if ($todoItem.length > 0) $($todoItem[0]).find(".todoContents").focus();
            else $postPopup.find("#todoContent").focus();
        } else {
            //pass
        }
        e.preventDefault();
    }

    function keyUpTodoInput(e) {
        var $eTarget = $(e.target);
        if (isTodoContentInputAndAction($eTarget)) return;
    }

    function isTodoClickOnPostPopup($eTarget) {

        if (isTodoAddButtonAndAction($eTarget)) return true;
        if (isTodoRemoveButtonAndAction($eTarget)) return true;

        function isTodoAddButtonAndAction($eTarget) {
            var $addBtn = $eTarget.findUp(".add-todo-button");
            if ($addBtn.length === 0) return false;
            var todoList = $eTarget.parents().find(".js-content-area #todoEditUl");
            var $todoInputLayer = $eTarget.parent().find('.js-todo-edit-layer .todo-menu');
            var todoLiObj = makeTodoLiHtml($todoInputLayer, "");
            todoList.append(todoLiObj);
            $todoInputLayer.find('#todoContent').focus()
            removeAndAddNewDatePickr();
            return true;
        }

        function isTodoRemoveButtonAndAction($eTarget) {
            var $removeBtn = $eTarget.findUp(".remove-button");
            if ($removeBtn.length === 0) return false;
            var $todoItem = $eTarget.findUp('.todo-item');
            $todoItem.remove();
            return true;
        }
    }

    function isTodoClickOnDetail($eTarget) {
        var $postPopup = $("#postPopup");
        var $detailUl = $('#detailUl');
        var isViewMode = $postPopup.attr('data-code') === 'VIEW' || ($detailUl.hasClass('card') && $postPopup.length === 0);
        var $beforeLayer = $eTarget.findUp(".js-popup-before");
        var isTodoPost = $beforeLayer.find(".js-post-nav").hasClass("todo");
        if (!isTodoPost) return false;
        if (isParticipateRequestAndAction($eTarget)) return true;
        if (isTodoDateButtonAndAction($eTarget)) return true;
        if (isViewProfileAndAction($eTarget)) return true;
        if (isCheckboxAndAction($eTarget)) return true;

        function isParticipateRequestAndAction($eTarget) {
            var $requestButton = $eTarget.findUp(".js-worker-button");
            var $todoMenu = $eTarget.findUp(".todo-menu");
            if ((!$requestButton.length > 0) || isViewMode) return false;
            var isSharePost = $postPopup.attr("data-code") === "SHARE_POST";
            if (isSharePost) {
                Often.toast("error", "다른 프로젝트 올리기 중에는 담당자 선택이 불가능합니다.");
                return true;
            }
            var $popupBefore = $eTarget.findUp(".js-popup-before");
            WorkerPopup.toggleWorkerPopup($popupBefore, submitInRequestPopup, $requestButton)
            return true;

            function submitInRequestPopup(submitRec) {
                if (submitRec.length !== 0 && !$requestButton.hasClass('js-registration')) $requestButton.css('display', 'none');
                if ($todoMenu.find('#participantData').length > 0) $todoMenu.find('#participantData').remove()

                $todoMenu.append(getTodoMenuHtmlByData($('#participantData'), (submitRec.length === 0) ? "" : submitRec[0], "ADD"))
                if (submitRec.length === 0) $todoMenu.find("#todoWorkerButton").css("display", "inline-block");

            }
        }

        function isViewProfileAndAction($eTarget) {
            var isParticipantBtn = $eTarget.hasClass('js-worker-button');
            if (!isParticipantBtn) return false;
            if (isViewMode) {
                var userId = $eTarget.attr('data-worker-id')
                Profile.drawProfilePopup(userId);
            }
            return true;
        }

        function isCheckboxAndAction($eTarget) {
            var $popupBefore = $eTarget.findUp(".js-popup-before");
            var $todoCheckButton = $eTarget.findUp(".js-todo-checkbox");
            if (!$todoCheckButton.length > 0) return false;
            var originalPostLayer = $todoCheckButton.closest('#originalPost')
            var rgsrId = originalPostLayer.find('#todoRgsrInfo').attr('rgsr-id');
            var mngrWryn = $popupBefore.attr('mngr-wryn');
            var mngrDsnc = $popupBefore.attr('mngr-dsnc');
            var isRgsrUser = _USER_ID === rgsrId || "N" === mngrWryn || "Y" === mngrDsnc;
            var $todoArea = $eTarget.findUp('.todo-area')
            var todoListSrno = $todoArea.parent().attr('todo-list-srno')
            var todoSrno = $todoArea.parent().attr('todo-srno')
            var isChecked = $todoArea.hasClass('checked')

            if (!isRgsrUser) {
                Often.toast("error", i18next.t('front.detail.adminWriteOnly'));
                return true;
            }

            isChecked ? $todoArea.removeClass('checked') : $todoArea.addClass('checked')

            if (isChecked) {
                Often.isDeadlineExceeded($todoArea.find("#todoDateSpan").attr("select-date")) ? $todoArea.find("#todoDateSpan").addClass('deadline-exceeded') : "";
            } else {
                Often.isDeadlineExceeded($todoArea.find("#todoDateSpan").attr("select-date")) ? $todoArea.find("#todoDateSpan").removeClass('deadline-exceeded') : "";
            }

            updateTodoData(todoListSrno, todoSrno, isChecked, originalPostLayer.findUp('.detail-item'));
            return true;
        }

        function isTodoDateButtonAndAction($eTarget) {
            if (isViewMode) return false;
            var $todoMenu = $eTarget.findUp(".todo-menu");
            if (!$todoMenu || $todoMenu.length === 0) return false;
            var $pickr = $eTarget.findUp(".js-pickr-layer");
            if (!$pickr || $pickr.length === 0) return false;
            addDatePickerOnTodo($pickr);

            return true;
        }
    }

    function isTodoContentInputAndAction($eTarget) {
        var $todoContentInput = $eTarget.hasClass("js-todo-content-input");
        if (!$todoContentInput) return false;

        var $postPopup = $("#postPopup");
        var keyCode = event.keyCode || event.which;
        var content = $.trim($eTarget.val());
        var todoList = $eTarget.parents().find(".js-content-area #todoEditUl");
        var checkJson = Validation.checkInput($eTarget);
        if (Object.keys(checkJson).length > 0 && isTabKeyPressed) {
            Often.toast("error", checkJson.errorMessage);
            checkJson.errorObj.focus();
            return true;
        }
        if (keyCode === 13 || isTabKeyPressed) {
            isTabKeyPressed = false;
            if (content === "") return Often.toast('error', i18next.t('front.alert.enterWord', {val: '$t(dictionary.todo)'}))
            var isNewTodo = $eTarget.attr("data-gubun") === "newTodo";
            var $todoEditLayer = !isNewTodo ? $eTarget.findUp(".js-todo-edit-layer") : $postPopup.find(".js-todo-edit-layer");
            var todoLiObj = makeTodoLiHtml($todoEditLayer.find('.todo-menu'), isNewTodo ? $todoEditLayer.find(".js-todo-content-input").val() : content);
            emptyEditLayer($postPopup);
            removeAndAddNewDatePickr();
            todoList.append(todoLiObj);
            if (isNewTodo) return;
            $eTarget.val('');
        }

        return true;
    }

    function removeAndAddNewDatePickr() {
        var todoList = $("#postPopup").find(".js-content-area #todoEditUl");
        var lastTodoLi = todoList.find('li').eq(-1);
        lastTodoLi.find('.form-control').remove();
    }


    function getTodoDataListHtml(todoPostData) {
        var $postPopup = $("#postPopup");
        var $todoInputLayer = $postPopup.find(".js-todo-edit-layer .todo-menu");
        var todoList = $postPopup.find(".js-content-area #todoEditUl");
        var resultHtml = "";
        todoPostData.TODO_REC.forEach(function (todoOneData) {
            resultHtml += makeTodoLiHtml($todoInputLayer, todoOneData.TODO_CNTN, todoOneData);
        })
        todoList.append(resultHtml);
    }

    function getLookHtml(todoData) {

        if (!todoData || Object.keys(todoData.CONTENTS).length === 0) {
            return ListHelper.replaceJson($("#todoEditComponent").html())
        }

        var totalTodoLength = todoData.CONTENTS.length;
        var checkedTodoLength = 0;
        todoData.CONTENTS.forEach(function (v) {
            (v.STTS === "Y") && checkedTodoLength++;
        })
        var todoPercent = getTodoPercentJson(todoData.CONTENTS);

        return ListHelper.replaceJson($("#todoComponent").html(), {
            'total-count': totalTodoLength,
            'checked-count': checkedTodoLength,
            'percent': todoPercent.PERCENT,
            'percent-style': 'style="width:' + todoPercent.PERCENT + '%"',
            'todo-ul': fillTodoComponentHtml(todoData.CONTENTS),
            'todo-rgsr-info': fillTodoRgsrInfoHtml(todoData.CONTENTS[0])
        });
    }

    function getTodoPercentJson(toodRecord) {
        if (!toodRecord) return {};
        var totalTodoLength = toodRecord.length;
        var checkedTodoLength = 0;
        toodRecord.forEach(function (v) {
            (v.STTS === "Y") && checkedTodoLength++;
        })
        return {
            PERCENT: (parseInt((checkedTodoLength / totalTodoLength) * 100)),
            CHECKED_LENGTH: checkedTodoLength,
            TOTAL_LENGTH: totalTodoLength,
        }
    }

    function fillTodoRgsrInfoHtml(todo) {
        var baseHtml = $("#todoRgsrComponent").html();
        var returnHtml = "";
        returnHtml += ListHelper.replaceJson(baseHtml, {
            'rgsr-id': todo.RGSR_ID,
            'self-yn': todo.SELF_YN,
            'mngr-wr-yn': todo.MNGR_WR_YN,
            'mngr-dsnc': todo.MNGR_DSNC,
        });
        return returnHtml;
    }

    function fillTodoComponentHtml(todoArray) {
        var baseHtml = $("#todoItemComponent").html();
        var returnHtml = "";
        todoArray.forEach(function (todo) {
            var isExistsWorker = ("" !== Often.null2Void(todo.PRFL_PHTG, ""))
            var isExistsReqTime = (Often.null2Void(todo.RQST_DTTM, "").length === 8)
            var isChecked = (todo.STTS === 'Y');
            returnHtml += ListHelper.replaceJson(baseHtml, {
                'contents-value': todo.TODO_CNTN,
                'contents': TagUtil.LinkData2Tag(Often.null2Void(todo.TODO_CNTN)),
                'todo-list-srno': todo.COLABO_TODO_LIST_SRNO,
                'todo-srno': todo.COLABO_TODO_SRNO,
                'checked': isChecked ? 'checked' : '',
                'profile': (isExistsWorker ? ListHelper.setProfile(todo.PRFL_PHTG) : 'd-none'),
                'req-time': (isExistsReqTime ? todoDttm2Form(todo.RQST_DTTM) : ''),
                'todo-menu': getTodoMenuHtmlByData($('#todoEditComponent .js-todo-edit-layer .todo-menu'), todo, 'VIEW'),
                'contents-display': ListHelper.setDisplay(false, "none"),
                'drag-button-display': ListHelper.setDisplay(false, "none"),
                'remove-button-display': ListHelper.setDisplay(false, "none"),
                'mouseover-title': todo.TODO_CNTN,
            });
        })
        return returnHtml;
    }

    function makeTodoLiHtml($todoInputLayer, content, todoOneData) {
        var baseHtml = $("#todoItemComponent").html();
        var returnHtml = "";
        returnHtml += ListHelper.replaceJson(baseHtml, {
            'contents-value': content.replace(/"/ig, "&quot;"),
            'todo-text-display': ListHelper.setDisplay(false),
            'icon-checkbox-display': ListHelper.setDisplay(false),
            'todo-menu': todoOneData ? getTodoMenuHtmlByData($todoInputLayer, todoOneData, 'EDIT') : getTodoMenuHtmlByData($todoInputLayer, '', 'ADD'),
            'todo-list-srno': todoOneData ? todoOneData.COLABO_TODO_LIST_SRNO : "",
            'todo-srno': todoOneData ? todoOneData.COLABO_TODO_SRNO : "",
            'rgst-dttm': todoOneData ? todoOneData.RQST_DTTM : ""
        })
        return returnHtml;
    }

    function getTodoMenuHtmlByData($todoMenu, todoData, menuMode) {
        var $cloneTodoMenu = $todoMenu.clone();
        var isSharePost = $("#postPopup").attr("data-code") === "SHARE_POST";
        var baseHtml = menuMode === 'ADD' ? $('#todoParticipantComponent').html() : $('#todoMenuComponent').html()
        var tempRequestHtml;
        var isSelectUserExist = Often.null2Void($cloneTodoMenu.find(".js-registration").attr("data-worker-id"), "").length !== 0;
        if (isSelectUserExist || isSharePost) return $cloneTodoMenu.html();

        var isDateExist = todoData ? Often.null2Void(todoData.RQST_DTTM, "") !== "" : "";
        var isParticipantExist = todoData ? Often.null2Void(todoData.RQST_USER_ID, "") !== "" : "";
        var todoDateText = Often.null2Void(todoDttm2Form(todoData.RQST_DTTM), "");
        var isEndSameDate = isDateExist ? Often.isSameDay(todoData.RQST_DTTM) : false;

        tempRequestHtml = ListHelper.replaceJson(baseHtml, {
            "id": todoData ? todoData.RQST_USER_ID : _USER_ID,
            "use-intt-id": todoData ? todoData.RQST_USE_INTT_ID : _USE_INTT_ID,
            "profile": todoData ? ListHelper.setProfile(todoData.PRFL_PHTG) : _PRFL_PHTG,
            "req-time": isDateExist ? (isEndSameDate ? i18next.t('dictionary.today') : todoDateText) : "",
            "select-date": isDateExist ? Often.null2Void(Tz.momentTimeZone(todoData.RQST_DTTM, "type14"), "") : "",
            "todoDate-data-display": ListHelper.setDisplay(isDateExist, "inline-block"),
            "participant-data-display": ListHelper.setDisplay(isParticipantExist, "inline-block"),
            "mouseover-title": "",
            "mouseover-date": isDateExist ? todoDttm2Form(todoData.RQST_DTTM) : i18next.t('front.common.add', {val: '$t(front.common.dueDate)'}),
            "mouseover-worker": isParticipantExist ? todoData.RQST_USER_NM : i18next.t('front.common.add', {val: '$t(dictionary.request)'}),
            'dead-line-class': todoData.STTS === 'Y' ? "" : (Often.isDeadlineExceeded(todoData.RQST_DTTM) ? "deadline-exceeded" : ""),
        })

        if (menuMode === 'VIEW') {
            $cloneTodoMenu.find(".js-datepick-button").css("display", "none")
            $cloneTodoMenu.find(".js-worker-button").css("display", "none")
        }
        if (menuMode === 'EDIT' && isDateExist) {
            $cloneTodoMenu.find(".js-pickr-icon").css("display", "none")
            $cloneTodoMenu.find(".todo-date").css("display", "none")
        }
        if (isParticipantExist) $cloneTodoMenu.find(".js-worker-button").css("display", "none")
        $cloneTodoMenu.append(tempRequestHtml);

        return $cloneTodoMenu.html();
    }

    function makeTodoJson() {
        var todoRec = [];
        var $postPopup = $("#postPopup");
        var $todoInputArea = $postPopup.find("#todoContent");
        var todoContentInputVal = $todoInputArea.val();

        $postPopup.find(".todo-item").each(function (i, todoLi) {
            todoRec.push(getTodoJson(true, todoLi));
        });
        if (todoContentInputVal && todoContentInputVal.length !== 0) todoRec.push(getTodoJson(false));
        return todoRec;

        function getTodoJson(isListData, todoLi) {
            var todoCntn = isListData ? $(todoLi).find('.todoContents').val() : todoContentInputVal;
            var rqstDttm = isListData ? $(todoLi).find('#todoDateSpan').attr('select-date') : $todoInputArea.parent().find('#todoDateSpan').attr('select-date');
            var colaboTodoListSrno = isListData ? $(todoLi).attr('todo-list-srno') : '';
            var rqstUserId = isListData ? Often.null2Void($(todoLi).find('#participantData').attr('data-worker-id'), _USER_ID) : Often.null2Void($todoInputArea.parent().find('#participantData').attr('data-worker-id'), _USER_ID);
            var rqstUseInttId = isListData ? Often.null2Void($(todoLi).find('#participantData').attr('data-use-intt-id'), _USE_INTT_ID) : Often.null2Void($todoInputArea.parent().find('#participantData').attr('data-use-intt-id'), _USE_INTT_ID);

            return {
                TODO_CNTN: todoCntn,
                RQST_DTTM: Often.null2Void(rqstDttm, ""),
                COLABO_TODO_LIST_SRNO: colaboTodoListSrno,
                RQST_USER_ID: rqstUserId,
                RQST_USE_INTT_ID: rqstUseInttId,
            };
        }
    }

    function changeProgressArea($todoProgressArea, isChecked) {
        var checkedTodoLength = $todoProgressArea.find('#progressCount').text();
        var totalTodoLength = $todoProgressArea.find('#progressTotalCount').text();

        isChecked ? checkedTodoLength-- : checkedTodoLength++;
        var todoPercent = parseInt((checkedTodoLength / totalTodoLength) * 100);
        $todoProgressArea.find('#progressCount').text(checkedTodoLength)
        $todoProgressArea.find('#progressTotalCount').text(totalTodoLength)
        $todoProgressArea.find('.progress-percent').text(todoPercent + "%")
        $todoProgressArea.find('.todo-progress-bar span').animate({width: todoPercent + '%'}, 100)

    }

    function updateTodoData(todoListSrno, todoSrno, isChecked, popupPostLayer) {
        var updateValue = {
            COLABO_SRNO: popupPostLayer.attr('data-project-srno'),
            COLABO_COMMT_SRNO: popupPostLayer.attr('data-post-srno'),
            COLABO_TODO_SRNO: todoSrno,
            COLABO_TODO_LIST_SRNO: todoListSrno,
            STTS: (isChecked ? "N" : "Y")
        }
        Ajax.executeApi(RestApi.PUT.COLABO2_TODO_U101, updateValue, function () {
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
            var updateTodoJson = {
                OBJECT: "TODO_STATUS",
                STATUS: updateValue,
            }

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: updateValue.COLABO_SRNO,
                POST_SRNO: updateValue.COLABO_COMMT_SRNO,
                TODO_DATA: updateTodoJson,
            });

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: updateValue.COLABO_SRNO,
                POST_SRNO: updateValue.COLABO_COMMT_SRNO,
                REMARK_SRNO: popupPostLayer.find(".remark-item:last").attr("remark-srno"),
                REMARK_UPDATE: true,
            });
        })

    }

    function todoDttm2Form(strDateTime) {
        return Tz.momentTimeZone(strDateTime, "type13")
    }

    function addDatePickerOnTodo($flatPickrLayer) {

        var endDate = Often.null2Void($flatPickrLayer.find(".js-pickr-date").val(), $flatPickrLayer.attr("select-date"));

        DatePicker.makeFlatPickr({
            dateFormat: "Ymd",
            inputObj: {
                end: $flatPickrLayer,
            },
            endDate: endDate,
            callback: {
                close: setDateComponent,
                remove: removeDate,
            }
        });

        function setDateComponent($flatPickr, selectDate, isSameDate) {
            if (isSameDate) return;
            var todoDate = Tz.momentTimeZone(selectDate, "type12", "input");
            $flatPickr.find(".js-pickr-icon").css("display", "none");
            $flatPickr.find(".js-pickr-date").val(todoDate);

            var $todoMenu = $flatPickr.parents(".todo-menu");
            $todoMenu.find(".todo-date").remove();

            var flatPickrHtml = $("#todoDateComponent #todoDateSpan").clone();
            flatPickrHtml.attr({
                "select-date": todoDate,
                "mouseover-text": Tz.momentTimeZone(selectDate, "type4")
            });
            var isEndSameDate = Often.isSameDay(selectDate);
            flatPickrHtml.text(isEndSameDate ? i18next.t('dictionary.today') : Tz.momentTimeZone(selectDate, "type4"));
            $todoMenu.find("#todoWorkerButton").before(flatPickrHtml); //TODO display로 제어로 수정해야됨
            DatePicker.checkOverDate(flatPickrHtml, selectDate.substr(0, 8))
        }

        function removeDate($calendarContainer, $flatPickr){
            var $pickrDate = $flatPickr.find(".js-pickr-date");
            var $removeButton = $calendarContainer.find(".js-flatpickr-remove-button");
            if($flatPickr.nextAll("#todoDateSpan:visible").length === 0 ||
                $flatPickr.nextAll("#todoDateSpan:visible").attr("select-date") === "") {
                $removeButton.css("display", "none");
                return;
            }
            $removeButton.off("click").on("click", function(){
                $flatPickr.nextAll("#todoDateSpan").remove();
                $flatPickr.find(".js-pickr-icon").css("display", "inline-block");
                $pickrDate.val("");
                $calendarContainer.remove();
            })
        }
    }

    function emptyEditLayer($postPopup) {
        var $editLayer = $postPopup.find(".js-todo-edit-layer");
        $editLayer.empty();
        $editLayer.append($("#todoEditComponent .js-todo-edit-layer").html());
        $editLayer.find('#todoContent').focus();
    }

    function checkTodoValue($contentArea) {
        var $todoContentsInput = $contentArea.find('.todoContents');
        var $editContentsInput = $contentArea.find(".js-todo-edit-layer .js-todo-content-input");
        var isEmptyUl = $contentArea.find('#todoEditUl li').length === 0;
        var isEmptyEditInput = $editContentsInput && $editContentsInput.val().length === 0;
        if (isEmptyUl && isEmptyEditInput) {
            Often.toast('error', i18next.t('front.alert.enterWord', {val: '$t(dictionary.todo)'}))
            return true;
        }
        $todoContentsInput.each(function () {
            var checkJson = Validation.checkInput($(this));
            if (Object.keys(checkJson).length > 0) {
                $(this).closest('li[class="todo-item"]').remove();
            }
        });
        return false;
    }

})()
