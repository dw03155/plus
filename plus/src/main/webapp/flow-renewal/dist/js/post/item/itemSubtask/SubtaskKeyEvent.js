var SubtaskKeyEvent = (function () {

    var enterTimer;
    var subtaskData;

    return {
        keyUpSubtaskInput: keyUpSubtaskInput,
        KeyDownSubtaskInput: KeyDownSubtaskInput,
    }

    function KeyDownSubtaskInput(e) {
        var $eTarget = $(e.target);
        var $subtaskContentInput = $eTarget.findUp(".js-subtask-input");
        var $editLayer = $eTarget.findUp(".js-subtask-edit-layer");
        var $subtaskArea = $eTarget.findUp(".js-subtask-area");
        if (!$subtaskArea || $subtaskArea.length === 0) return false;

        if (KeyCheck.isKey(e, "ESC")) {
            if ($subtaskContentInput && $subtaskContentInput.length > 0 && $editLayer) {
                e.stopPropagation();
                if (!isEmptyEditLayer()) {
                    PopupDraw.drawConfirm({
                        contents: {main: "하위 업무를 작성중 입니다. 중단하시겠습니까?"},
                        callback: {
                            submit: closeAndCallback,
                            cancel: PopupDraw.closePopup,
                        },
                    });
                } else {
                    closeAndCallback();
                }
                return true;
            }
        }

        return false;

        function closeAndCallback() {
            $subtaskArea.removeClass("on");
            ItemSubtask.initEditSubtask($editLayer)
        }

        function isEmptyEditLayer() {
            var _subtaskData = Often.null2Void(ItemSubtask.makeSubtaskRecord($editLayer, true)[0]);
            return _subtaskData === "" || (
                _subtaskData.STTS === "0" &&
                _subtaskData.END_DT === "" &&
                _subtaskData.PRIORITY === "" &&
                _subtaskData.WORKER_REC.length === 0 &&
                _subtaskData.TASK_NM === ""
            );
        }
    }

    function keyUpSubtaskInput(e) {
        if ($.isTarget(e, ".js-subtask-area")) return isSubtaskContentInputAndAction(e);
    }

    function isSubtaskContentInputAndAction(e) {
        var $eTarget = $(e.target);
        var $subtaskArea = $eTarget.findUp(".js-subtask-area");
        if (!$subtaskArea || $subtaskArea.length === 0) return false;
        e.stopPropagation();

        var $subtaskLi = $eTarget.findUp(".js-subtask-li");
        var $subtaskContentInput = $eTarget.findUp(".js-subtask-input");
        var $subtaskPriorityButton = $eTarget.findUp(".js-priority-setting-button");
        var $editLayer = $eTarget.findUp(".js-subtask-edit-layer");
        var subTaskCurrentCount = Number($eTarget.parents(".subtask-space").find(".subtask-count").text());

        if (KeyCheck.isKey(e, "ENTER")) {
            if ($subtaskContentInput.length > 0) {
                //Note. IE 엔터 이슈로 인한 디바운싱 처리
                clearTimeout(enterTimer);
                enterTimer = setTimeout(function () {
                    var checkJson = Validation.checkInput($subtaskContentInput);
                    if (Object.keys(checkJson).length > 0) {
                        Often.toast("error", checkJson.errorMessage);
                        checkJson.errorObj.focus();
                        return;
                    }

                    if (subTaskCurrentCount >= 50) {
                        Often.toast("error", i18next.t('front.alert.limitSubTask'));
                        return;
                    }

                    $eTarget.parents(".subtask-space").find(".subtask-count").text(subTaskCurrentCount + 1)
                    subtaskData = ItemSubtask.makeSubtaskRecord($editLayer, true);
                    ItemSubtask.addAndDrawSubtask(addSubtaskCallback, subtaskData, $eTarget);
                    ItemSubtask.initEditSubtask($editLayer);
                }, 100);
            }
        }

        if (KeyCheck.isKey(e, "TAB")) {
            var nextItem = {
                input: ".js-subtask-date-button:visible",
                date: ".js-priority-button:visible",
                priority: ".js-worker-button:visible",
                worker: ".js-subtask-input",
            }
            var $focurTarget = $subtaskLi.find(nextItem[$eTarget.attr("tab-code")])
            $focurTarget.focus();
            return;
        }

        if (KeyCheck.isKey(e, "UP") || KeyCheck.isKey(e, "DOWN")) {
            if ($subtaskPriorityButton.length > 0) {
                var $priorityButton = $subtaskLi.find(".js-priority-setting-button");
                var buttonIndex = Number($subtaskPriorityButton.attr("data-key-index"));
                var nextKeyIndex;
                if (KeyCheck.isKey(e, "DOWN")) {
                    nextKeyIndex = (buttonIndex === 0 ? 4 : buttonIndex - 1);
                } else {
                    nextKeyIndex = (buttonIndex === 4 ? 0 : buttonIndex + 1);
                }
                $priorityButton[nextKeyIndex].focus();
            }
        }

        function addSubtaskCallback(callbackData) {
            ItemSubtask.drawSubtaskLi($editLayer, $.extend(subtaskData, callbackData));
            ItemSubtask.getSubtaskCount($eTarget);
            var isViewType = $editLayer.parents(".js-popup-before").attr("data-code") === "VIEW";
            (isViewType && ViewChanger.isPage("task")) && UpdateElements.autoUpdateElem();
        }
    }
})();
