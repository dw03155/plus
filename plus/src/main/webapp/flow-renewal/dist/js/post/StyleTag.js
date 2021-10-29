var StyleTag = (function () {

    var $postPopup, $contentArea, $styleTagItem;

    return {
        mouseUpCheck: mouseUpCheck,
        mouseDownCheck: mouseDownCheck,
        keyUpCheck: keyUpCheck,
        keyDownCheck: keyDownCheck,
        hasStyleParents: hasStyleParents,
    }

    function mouseUpCheck(e) {
        //Note. setTimeout 감싸야 드래그해제 된 후 range를 제대로 잡음
        setTimeout(function () {
            controlStyleTagPop(e);
        })
    }

    function mouseDownCheck(e) {
        //pass
    }

    function keyUpCheck(e) {
        if (KeyCheck.isKey(e, "SHIFT")) return;
        if (!(e.shiftKey && KeyCheck.isKey(e, "ARROW"))) return closeStyleTagPopup();
        if (KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "DELETE")) return closeStyleTagPopup();
        controlStyleTagPop(e);
    }

    function keyDownCheck(e) {

        var isEditableDiv = $(e.target).findUp("[contenteditable=true]").length > 0; //입력부
        var isStyleCommand = KeyCheck.isStyleCommand(e); //스타일키입력

        if (!isStyleCommand) return; //스타일커맨드가 아니면 동작X
        if (isEditableDiv) e.preventDefault(); //스타일커맨드면서 입력부이면 contenteditable 디폴트 스타일동작 막기
        if (!PostCondition.getFuncCondition().isStyleTag) return; //포스트별 동작구분

        //수동 스타일동작 실행
        var KEY = e.key.toUpperCase();
        if (KEY === "S") return execStrikeThroughTag(e);
        else if (KEY === "B") return execBoldTag(e);
        else if (KEY === "I") return execItalicTag(e);
        else if (KEY === "U") return execUnderlineTag(e);
    }

    function controlStyleTagPop(e) {

        if (!PostCondition.getFuncCondition().isStyleTag) return; //포스트별 동작구분
        var selection = getSelected();
        var range = selection.getRangeAt(0);

        var ifJson = selection && {
            isInUpload: $(selection.focusNode).parents(".js-upload-area").length > 0,
            rangeCount: selection.rangeCount,
            isAvailable: isAvailable(selection),
            nodeType: selection.anchorNode.nodeType,
        } || {}

        //console.log('로그 찍기 좋게 조건 json', JSON.stringify(ifJson));

        if (!ifJson.isInUpload) return;

        if (ifJson.nodeType !== Node.TEXT_NODE || //3
            !(ifJson.rangeCount === 1 && ifJson.isAvailable)
        ) return closeStyleTagPopup();

        initStyleTagPopup();
        openStyleTagPopup(range);
    }

    function controlSelection(e) {

        $postPopup = $(e.currentTarget);
        var selection = getSelected();

        if ($(selection.focusNode).parents(".js-upload-area").length === 0) return;
        if (!selection) return;

        if (selection.removeAllRanges) {
            $postPopup.find("#styleTagItem").hide();
            selection.removeAllRanges();
        } else if (selection.empty) {
            $postPopup.find("#styleTagItem").hide();
            selection.empty();
        }
    }

    function set$element() {
        $postPopup = $("#postPopup");
        $styleTagItem = $postPopup.find("#styleTagItem");
        $contentArea = $postPopup.find("#postCntn");
    }

    function isAvailable(selection) {
        set$element();
        var rangeCount = selection.rangeCount;
        var $startElement, $endElement, $culElement;
        if (!selection) return false;
        if (selection.isCollapsed) return false;
        try {
            for (var i = 0; i < rangeCount; i++) {
                var range = selection.getRangeAt(i);
                var startElement = range.startContainer;
                var endElement = range.endContainer;
                $startElement = $(startElement);
                $endElement = $(endElement);
                if ($startElement[0] && $endElement[0]) {
                    if ($startElement[0] === $endElement[0]) {
                        $culElement = $startElement.parent();
                        while ($culElement[0]) {
                            if ($culElement[0] === $contentArea[0]) return true;
                            else $culElement = $culElement.parent();
                        }
                    } else {
                        var bFlag = false;
                        $culElement = $startElement.parent();
                        while ($culElement[0]) {
                            if ($culElement[0] === $contentArea[0]) {
                                bFlag = true;
                                break;
                            } else $culElement = $culElement.parent();
                        }
                        if (bFlag) {
                            $culElement = $endElement.parent();
                            while ($culElement[0]) {
                                if ($culElement[0] === $contentArea[0]) return true;
                                else $culElement = $culElement.parent();
                            }
                        }
                    }
                }
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    function initStyleTagPopup() {
        set$element();
        $styleTagItem.find("#styleTagBold").off("mousedown").on("mousedown", stopEvent);
        $styleTagItem.find("#styleTagItalic").off("mousedown").on("mousedown", stopEvent);
        $styleTagItem.find("#styleTagUnderLine").off("mousedown").on("mousedown", stopEvent);
        $styleTagItem.find("#styleTagLineThrough").off("mousedown").on("mousedown", stopEvent);
        $styleTagItem.find("#styleTagBold").off("mouseup").on("mouseup", execBoldTag);
        $styleTagItem.find("#styleTagItalic").off("mouseup").on("mouseup", execItalicTag);
        $styleTagItem.find("#styleTagUnderLine").off("mouseup").on("mouseup", execUnderlineTag);
        $styleTagItem.find("#styleTagLineThrough").off("mouseup").on("mouseup", execStrikeThroughTag);
    }

    function openStyleTagPopup(range) {
        set$element();
        var position = getSelectedPosition(range);
        $styleTagItem.css({top: (position.y + 15) + "px", left: position.x + "px"});
        findCurrentTags();
        $styleTagItem.fadeIn(200);
    }

    function closeStyleTagPopup() {
        set$element();
        $styleTagItem.fadeOut(200);
    }

    function getSelectedPosition(range) {
        set$element();
        var containerWidth = $contentArea.width();
        var containerOffset = $contentArea.offset();
        var itemHeight = $styleTagItem.height();
        var itemWidth = $styleTagItem.outerWidth();
        var position = {x: 0, y: 0};
        var intervalY = itemHeight + 20;
        var intervalX = itemWidth / 2
        if (range) {
            var rectList = range.getClientRects();
            if (rectList.length) {
                position.x = rectList[0].left - containerOffset.left + (rectList[0].width / 2);
                position.y = rectList[0].top - containerOffset.top;
            } else if (range.startContainer.getBoundingClientRect !== undefined) {
                position.x = range.startContainer.getBoundingClientRect().left - containerOffset.left + (range.startContainer.getBoundingClientRect().width / 2);
                position.y = range.startContainer.getBoundingClientRect().top - containerOffset.top;
            } else {
                position.x = range.getBoundingClientRect().left - containerOffset.left + (range.getBoundingClientRect().width / 2);
                position.y = range.getBoundingClientRect().top - containerOffset.top;
            }
            position.x -= intervalX;
            position.y -= intervalY;
            if (position.x < 0) position.x = 0;
            if (position.x > containerWidth - itemWidth) {
                position.x = containerWidth - itemWidth;
            }
        }
        return position;
    }

    function getSelected() {
        set$element();
        if (!$contentArea.is(":visible")) return false;
        if (document.getSelection) return document.getSelection();
        else if (window.getSelection) return window.getSelection();
        return false;
    }

    function findCurrentTags() {
        set$element();
        var rangeCount = window.getSelection().rangeCount;
        var rangeParentTags;
        var allRangesParentTags = [];
        var menuTags = !Often.isBrowser("ie") ? ['B', 'I', 'U', 'STRIKE'] : ['STRONG', 'EM', 'U', 'STRIKE'];
        var usedMenuTags = [];
        var $startElement, $endElement, $culElement;
        try {
            for (var i = 0; i < rangeCount; i++) {
                var startElement = window.getSelection().getRangeAt(i).startContainer;
                var endElement = window.getSelection().getRangeAt(i).endContainer;
                $startElement = $(startElement);
                $endElement = $(endElement);
                rangeParentTags = [];
                if ($startElement[0] && $endElement[0]) {
                    if ($contentArea[0] && ($contentArea[0] === $endElement[0])) {
                        allRangesParentTags.push([]);
                        continue;
                    }
                    $culElement = $startElement.parent();
                    while ($culElement[0] && !($contentArea[0] === $culElement[0])) {
                        var styleName = Often.null2Void($culElement.attr("style"));
                        if (styleName) {
                            (styleName.indexOf("line-through") > -1) && rangeParentTags.push("STRIKE");
                            (styleName.indexOf("underline ") > -1) && rangeParentTags.push("U");
                            (styleName.indexOf("italic") > -1) && rangeParentTags.push("I");
                        }
                        rangeParentTags.push($culElement.prop("tagName"));
                        $culElement = $culElement.parent();
                    }
                }
                var tempSet = new Set(rangeParentTags);
                rangeParentTags = [...tempSet];
                allRangesParentTags.push(rangeParentTags);
            }
            for (i = 0; i < menuTags.length; i++) {
                var isUsed = true;
                for (var j = 0; j < allRangesParentTags.length; j++) {
                    if (allRangesParentTags[j].indexOf(menuTags[i]) === -1) {
                        isUsed = false;
                        break;
                    }
                }
                isUsed && usedMenuTags.push(menuTags[i]);
            }
            if (usedMenuTags.indexOf('B') > -1 || usedMenuTags.indexOf('STRONG') > -1) $styleTagItem.find(".icons-font-style.bold").addClass("active");
            else $styleTagItem.find(".icons-font-style.bold").removeClass("active");
            if (usedMenuTags.indexOf('I') > -1 || usedMenuTags.indexOf('EM') > -1) $styleTagItem.find(".icons-font-style.italic").addClass("active");
            else $styleTagItem.find(".icons-font-style.italic").removeClass("active");
            if (usedMenuTags.indexOf('U') > -1) $styleTagItem.find(".icons-font-style.underline").addClass("active");
            else $styleTagItem.find(".icons-font-style.underline").removeClass("active");
            if (usedMenuTags.indexOf('STRIKE') > -1) $styleTagItem.find(".icons-font-style.line-through").addClass("active");
            else $styleTagItem.find(".icons-font-style.line-through").removeClass("active");
            (Often.isBrowser("ie") && $("#styleTagItem").find(":focus").blur());
        } catch (e) {
        }
    }

    function hasStyleParents(node) {
        var hasStyleTag = false;
        var $parents = $(node).parents();
        var styleTag = ["B", "U", "I", "STRIKE", "EM"];
        $.each($parents, function (i, node) {
            var nodeName = Often.null2Void(node.nodeName).toUpperCase();
            if (styleTag.indexOf(nodeName) > -1) {
                hasStyleTag = true;
                return false;
            }
        });
        return hasStyleTag;
    }

    function stopEvent(e) {
        e.stopPropagation();
    }

    function execBoldTag(e) {
        execTag(e, 'bold');
    }

    function execItalicTag(e) {
        execTag(e, 'italic');
    }

    function execUnderlineTag(e) {
        execTag(e, 'underline');
    }

    function execStrikeThroughTag(e) {
        execTag(e, 'strikeThrough');
    }

    function execTag(e, commandId) {
        stopEvent(e);
        document.execCommand(commandId);
        findCurrentTags();
    }
})();