var PostPopupEvent = (function () {

    return {
        mouseUpPopupArea: mouseUpPopupArea,
        mouseDownPopupArea: mouseDownPopupArea,
        clickPopupArea: clickPopupArea,

        keydownPopupArea: keydownPopupArea,
        keyupPopupArea: keyupPopupArea,
        KeyDownContentsArea: KeyDownContentsArea,

        hideAllInnerPopup: hideAllInnerPopup,
        scrollHideAndRemovePopupLayer: scrollHideAndRemovePopupLayer,
        addScrollFixed: addScrollFixed,
    }

    function clickPopupArea(e) {
        e.stopPropagation();
        hideAllInnerPopup(e);
        if ($.isTarget(e, ".js-complete-btn[data-wait-yn=Y]")) {
            return Often.toast("error", i18next.t('front.common.wait'));
        }
        Caret.setLastFocusNode();
        PostPopupClickEvent.clickPopupArea(e);
    }

    function mouseUpPopupArea(e) {
        PostPopupClickEvent.mouseUpPopupArea(e);
    }

    function mouseDownPopupArea(e) {
        PostPopupClickEvent.mouseDownPopupArea(e);
    }

    function keydownPopupArea(e) {
        var $eTarget = $(e.target);
        var $postPopup = $(e.currentTarget);
        var focusSelection = window.getSelection();
        var $focusNode = $(focusSelection.focusNode);
        var $parentNode = $focusNode.parent();

        var isEnterKey = KeyCheck.isKey(e, "ENTER");

        if (isEnterKey && $eTarget.is("#postTitle")) {
            e.preventDefault();
            return;
        }

        if (KeyCheck.isSelectAllCommand(e) && $eTarget.closest(".js-upload-area").length > 0) {
            selectTextNode(e, $eTarget.closest(".js-upload-area:visible"), "create-box");
            return;
        }

        // 포커스가 contenteditable html태그로 잡히게 될 경우 태그 자체를 지워버리는 이슈
        if ($focusNode.hasClass("create-box") && $parentNode.hasClass("js-upload-area")) return false;
        if (KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "DELETE")) {
            if (isCreateBoxAndAction()) return e.preventDefault();
            if (Often.isBrowser("ie")) return isHashAndMentionAndRemove();
        }

        if (SubtaskKeyEvent.KeyDownSubtaskInput(e)) return;
        StyleTag.keyDownCheck(e);

        if ($postPopup.find("#innerCommonHashTagPopup").is(":visible")) {
            return HashTag.keyDownArrow(e);
        } else if (isEnterKey) { // 태그 팝업이 없고, Enter를 눌렀을 때
            HashTag.clearHashTag();
        }

        // 멘션 팝업이 있을 때
        if ($postPopup.find("#innerCommonPopup[data-code=mention]").is(":visible")) {
            return Mention.keyDownArrow(e);
        } else if (isEnterKey) { // 멘션 팝업이 없고, Enter를 눌렀을 때
            Mention.clearMention();
        }
        ItemTodo.keydownTodoInput(e);
        ItemSchedule.keyDownScheduleInput(e);

        if (KeyCheck.isKey(e, "TAB")) {

            if ($eTarget.is("#postTitle")) {
                $postPopup.find(".js-upload-area").focus();
                return;
            }

            if ($eTarget.closest(".js-upload-area").length > 0) {
                //Todo. 탭 동작에 따른 두칸 띄기를 만들어보자.
                return;
            }
        }

        if (KeyCheck.isKey(e, "ESC")) {
            if (DocumentEvent.closeStepByStep()) return;
            var isHiding = hideAllInnerPopup(e);
            var isHidingScheduleMap = ItemSchedule.keyDownCheckPlaceInput(e);
            var isSubtaskInputFocus = ItemSubtask.isSubtaskInputFocus(e);
            if (!isHiding && !isHidingScheduleMap && !isSubtaskInputFocus) {
                PostPopup.checkWritingAndShowPopup(PostPopup.removePopup);
            }
        }

        function isCreateBoxAndAction() {
            if (!focusSelection.focusNode) return;
            var nodeName = Often.null2Void(focusSelection.focusNode.nodeName, "");
            var $targetNode = (nodeName === "#text" ? $parentNode : $focusNode);

            var isEmptyText = $.trim($targetNode.text()).length === 0;
            var isCreateBoxAfter = isCreateComponent();
            var isEmptyNodeAfter = isNoComponent();
            var isExistNodeAfter = isExistComponent();
            var isCreateBoxAfterOffset = isTargetOffset();
            if ((isCreateBoxAfter || isEmptyNodeAfter)) {
                if (isEmptyText) {
                    $targetNode.attr({
                        "class": "js-hidden-component hidden-component",
                        "contenteditable": "false"
                    }).html("&nbsp;"); // component 사이 공백 지울때 사용
                } else if (isCreateBoxAfterOffset) {
                    return true;
                }
            } else if (isExistNodeAfter) {
                if (isEmptyText) {
                    $targetNode.remove();
                    return true;
                } else if (isCreateBoxAfterOffset) {
                    return true;
                }
            }

            // 앞 뒤로 create box 있을 때
            function isCreateComponent() {
                var isTextNode = nodeName === "#text";
                var isDivNode = nodeName === "DIV";
                return (isTextNode && isCreateBox($parentNode) || (isDivNode && isCreateBox($focusNode)))

                function isCreateBox($target) {
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box");
                    return (isBeforeCreateBoxClass && isAfterCreateBoxClass);
                }
            }

            // 한 쪽은 no component 한 쪽은 create box 일 때
            function isNoComponent() {
                return (isNoComponentAndCreateBox($parentNode)) || (isNoComponentAndCreateBox($focusNode));

                function isNoComponentAndCreateBox($target) {
                    var isBeforeNoComponent = ($target.prev().length === 0);
                    var isAfterNoComponent = ($target.next().length === 0);
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box")
                    return (isBeforeNoComponent && isAfterCreateBoxClass) || (isAfterNoComponent && isBeforeCreateBoxClass);
                }
            }

            // 한 족은 div component 한 쪽은 create box 일 때
            function isExistComponent() {
                return (isExistComponentAndCreateBox($parentNode) || isExistComponentAndCreateBox($focusNode));

                function isExistComponentAndCreateBox($target) {
                    var isBeforeExistComponent = ($target.prev().length > 0);
                    var isAfterExistComponent = ($target.next().length > 0);
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box")
                    return (isAfterExistComponent && isBeforeCreateBoxClass) || (isBeforeExistComponent && isAfterCreateBoxClass);
                }
            }

            // targetNode의 시작점과 끝점 찾기
            function isTargetOffset() {
                var isBackKey = KeyCheck.isKey(e, "BACK");
                var isDelKey = KeyCheck.isKey(e, "DELETE");
                var anchorOffset = focusSelection.anchorOffset;
                var focusOffset = focusSelection.focusOffset;
                var isNotDragText = focusSelection.isCollapsed;
                return isNotDragText && ((isBackKey && focusOffset === 0) || (isDelKey && anchorOffset === $targetNode.text().length))
            }
        }

    }

    function keyupPopupArea(e) {
        var $postPopup = $(e.currentTarget);
        var $eTarget = $(e.target);
        var $contentEditable = $eTarget.closest(".js-upload-area[contenteditable=true]")

        ItemSchedule.keyUpScheduleInput(e);
        ItemTodo.keyUpTodoInput(e);
        SubtaskKeyEvent.keyUpSubtaskInput(e);

        if (!$contentEditable || $contentEditable.length === 0) return;
        if (SpaceSelectable.isSharePost($postPopup)) return;

        HashTag.keyUpCheckHashTag(e);
        Mention.keyUpCheckMention(e);
        StyleTag.keyUpCheck(e);
    }

    function scrollHideAndRemovePopupLayer() {
        var $workerPopup = $("#workerPopup:visible");
        var $flatpickrCalendar = $(".flatpickr-calendar:visible");
        var $taskPrioritySettingLayer = $(".js-priority-setting-layer:visible");

        $workerPopup && $workerPopup.remove();
        $flatpickrCalendar && $flatpickrCalendar.remove();
        $taskPrioritySettingLayer && $taskPrioritySettingLayer.css("display", "none");
        ItemSubtask.closeSubtaskPopup();
    }

    function addScrollFixed(e) {
        var $postPopup = $("#postPopup");
        if (!$postPopup.is(":visible")) return;
        var $eTarget = e ? $(e.target) : $postPopup.find(".post-card-scroll"); //resize에서 호출시 false
        var scrollTop = $eTarget.scrollTop();
        var innerHeight = $eTarget.innerHeight();
        var scrollHeight = $eTarget.prop('scrollHeight');
        var $remarkLayer = $postPopup.find(".js-edit-layer");

        if (scrollTop + innerHeight >= scrollHeight) {
            $remarkLayer.removeClass("sticky");
        } else {
            if (!isEmptyRemarkContents($remarkLayer)) return;
            $remarkLayer.addClass("sticky");
        }

        function isEmptyRemarkContents($remarkLayer) {
            var $remarkUploadFile = $remarkLayer.find(".js-remark-upload-file li");
            var $remarkUploadImg = $remarkLayer.find(".js-remark-upload-img li");
            var $remarkInput = $remarkLayer.find(".js-remark-area");

            return $remarkUploadFile.length === 0 &&
                $remarkUploadImg.length === 0 &&
                $.trim($remarkInput.text()) === "";
        }
    }

    function KeyDownContentsArea(e) {

        var $uploadArea = $(e.currentTarget).find(".js-upload-area");
        if ($uploadArea.length === 0) return;
        wrapFirstNodes(e, $uploadArea);

        if (KeyCheck.isKey(e, "DELETE")) return checkFocusNodeAndDelete(e);


    }

    /**
     * @param $uploadArea
     *
     * @description
     *      ContentEditable 에서 첫문자는 textNode 여서 간혹 태그가 깨지는 이슈가 있어서 첫번째 자식노드가 div가 아니면 감싸줌
     */
    function wrapFirstNodes(e, $uploadArea) {
        if (Often.isBrowser("ie")) return;

        var uploadAreaNodes = $uploadArea[0].childNodes;
        if (uploadAreaNodes.length === 0) return;

        var isFirstDivNode = uploadAreaNodes[0].nodeName !== "DIV";
        var isRitsrBrNode = uploadAreaNodes[0].nodeName !== "BR";
        if (isFirstDivNode && isRitsrBrNode) {
            if (!e.originalEvent.isComposing) return $(uploadAreaNodes[0]).wrap("<div></div>");
        }
    }

    /**
     * @description ContentEditable에서 빈 문자열을 Delete로 지우면 다음 열에 개행이 추가되기 때문에 개행 삭제 처리
     * Ex)
     *     $ = Delete Focus
     *
     *     1. Delete 전
     *     <div><br> $ </div>
     *     <div>Text</div>
     *
     *     2. Delete 후
     *     <div>Text<br></div>
     */
    function checkFocusNodeAndDelete(e) {
        var node = window.getSelection();
        var isAnotherNode = node.focusNode !== node.anchorNode;
        if (isAnotherNode) return;
        var isFocusContentArea = $(node.focusNode).hasClass("js-upload-area");
        if (isFocusContentArea) return e.preventDefault();
        var isDiv = node.focusNode && node.focusNode.nodeName === "DIV";
        if (isDiv) {
            Caret.changeRemoveNode2FocusSibling(e, node, "create-box")
        }
    }

    function isHashAndMentionAndRemove() {
        var focusNode = window.getSelection().focusNode;
        if (!focusNode) return;
        var isTextNode = (focusNode.nodeName === "#text")
        if (isTextNode && (Often.null2Void(focusNode.innerText) === "" && focusNode.parentNode.getAttribute("contenteditable") !== "false")) return;
        var focusParentNode = focusNode.parentNode;
        if ((isTextNode && ($(focusNode).hasClass("mention-span") || $(focusNode).hasClass("hashtag-span"))) ||
            (focusParentNode.nodeName === "SPAN") && ($(focusParentNode).hasClass("mention-span") || $(focusParentNode).hasClass("hashtag-span"))) {
            return $(focusNode.parentNode).remove();
        }
    }

    function selectTextNode(e, $current, exceptClass) {
        var focusSelection = window.getSelection();
        var $focusNode = $(focusSelection.focusNode);
        var $parentNode = ($focusNode.context && $focusNode.context.nodeType === 3) ? $focusNode.parents("div") : $focusNode;

        var currentArea = $current[0];
        var focusIndex = -1;
        var exceptNodeArray = [];

        $.each(currentArea.childNodes, function (e, node) {
            if (node === $parentNode[0]) focusIndex = e;
            if ($(node).hasClass(exceptClass)) {
                exceptNodeArray.push(e);
                if (focusIndex > -1) return false;                  // FocusNode의 위치 다음 ExceptNode면 반복문 종료
            }
        });
        // ExceptNode가 없을 때는 Document.execCommand() 실행
        if (exceptNodeArray.length === 0) return;
        e.stopPropagation();
        e.preventDefault();
        var isFinalFocusNode = exceptNodeArray[exceptNodeArray.length - 1] < focusIndex;
        var startOffset;
        var endOffset;
        if (isFinalFocusNode) {                                  // 시작점이 ExceptNode이고, 끝까지 블록 지정
            startOffset = exceptNodeArray[exceptNodeArray.length - 1] + 1;
            endOffset = currentArea.childNodes.length;
        } else {
            if (exceptNodeArray.length > 1) {                    // 시작점이 ExceptNode이고, 다음 ExceptNode까지 블록 지정
                startOffset = exceptNodeArray[exceptNodeArray.length - 2] + 1;
                endOffset = exceptNodeArray[exceptNodeArray.length - 1];
            } else {                                             // currentArea 처음부터 첫번째 ExceptNode까지 블록 지정
                startOffset = 0;
                endOffset = exceptNodeArray[0];
            }
        }
        var currentRnage = document.createRange();
        currentRnage.setStart(currentArea, startOffset);
        currentRnage.setEnd(currentArea, endOffset);
        focusSelection.removeAllRanges();
        focusSelection.addRange(currentRnage);
    }

    function hideAllInnerPopup(e) {

        var eventType = e.type;
        var $postPopup = $(e.currentTarget);
        var isHiding = false;

        if ("click" === eventType) {
            if (!$.isTarget(e, "#innerCommonPopup")) hideObj("#innerCommonPopup");
            if (!$.isTarget(e, ".js-file-button")) hideObj(".js-file-menu");
            if (!$.isTarget(e, ".js-image-button")) hideObj(".js-image-menu");
            if (!$.isTarget(e, [".js-map-button", ".js-map-menu"])) {
                var $mouseDownStartObj = PostPopupClickEvent.getMouseDownStartObj();
                if ($mouseDownStartObj.closest(".js-map-button").length > 0 || $mouseDownStartObj.closest(".js-map-menu").length > 0) return;
                hideObj(".js-map-menu");
            }
            if (!$.isTarget(e, ".js-setting-button")) hideObj(".js-setting-ul");
            if (!$.isTarget(e, [".js-worker-layer", ".js-worker-button"])) {
                $postPopup.find(".js-worker-layer[data-subtask-yn=Y]").remove();
                $postPopup.find(".js-worker-layer[data-subtask-yn=N]").remove();
            }
            if (!$.isTarget(e, ".js-priority-event")) hideObj(".js-priority-layer .js-priority-setting-layer");
            if (!$.isTarget(e, [".js-subtask-menu", ".subtask-button"])) ItemSubtask.closeSubtaskPopup();

            hideObj(".create-post-option");
        } else if ("keydown" === eventType) {
            var $innerPopup = $postPopup.find("#innerCommonPopup");
            if ($innerPopup.is(":visible") && $innerPopup.attr('data-code') !== 'mention') {
                $innerPopup.css('display', 'none');
                isHiding = true;
            }
            [".js-file-menu", ".js-image-menu", ".js-map-menu", ".js-setting-ul", ".create-post-option"].forEach(hideObj)
        }
        return isHiding;

        function hideObj(sizzleName) {
            var $targetObj = $postPopup.find(sizzleName);
            sizzleName = sizzleName.replace("-menu", "-button");
            if ($targetObj.is(":visible")) {
                $targetObj.css('display', 'none');
                var $tempObj = $postPopup.find(sizzleName);
                ($tempObj.length > 0) && $tempObj.removeClass('active')
                isHiding = true;
            }
        }
    }

})()

