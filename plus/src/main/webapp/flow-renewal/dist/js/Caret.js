var Caret = (function () {

    var range, eraseEnd, eraseStart, node;
    var caretInfo = {};
    var lastFocusNode;

    return {
        focusBeforeCaret: focusBeforeCaret,
        focusNextCaret: focusNextCaret,
        getNode: getNode,
        changeAndFocusNode: changeAndFocusNode,
        getPosition: getPosition,
        getInput: getInput,
        collapse: setCaretCollapse,
        setCaretPositionAfterTag: setCaretPositionAfterTag,
        getCaretOffset: getCaretOffset,
        saveCaret: saveCaret,
        loadCaret: loadCaret,
        captureIndex: captureIndex,
        isTextInput: isTextInput,

        setLastFocusNode: setLastFocusNode,
        getLastFocusNode: getLastFocusNode,
        initLastFocusNode: initLastFocusNode,
    };

    function setLastFocusNode(focusNode) {
        focusNode = focusNode || window.getSelection().focusNode;
        if (focusNode === undefined || focusNode === null) return;
        if ($(focusNode).hasClass('js-hidden-component')) return;
        lastFocusNode = focusNode
    }

    function getLastFocusNode() {
        return lastFocusNode;
    }

    function initLastFocusNode() {
        lastFocusNode = "";
    }

    function focusBeforeCaret() {
        var focusNode = window.getSelection().focusNode;
        var focusRange = window.getSelection().getRangeAt(0);
        var newRange = document.createRange();
        newRange.setStart(focusNode, focusRange.startOffset);
        var selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(newRange);
    }

    function focusNextCaret(focusNode, offset) {
        if (!focusNode) return;
        var newRange = document.createRange();
        newRange.setStart(focusNode, offset);
        var selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(newRange);
    }

    function getNode() {
        return {
            range: range,
            eraseStart: eraseStart,
            eraseEnd: eraseEnd,
            node: node,
        }
    }

    /**
     * Note.
     * changeAndFocusNode 실행 시점에 따라 가비지 텍스트 처리 안되는 경우있음.
     * settimeout(fn,0) 으로 항상 마지막에 실행되도록 함.
     */
    function changeAndFocusNode($changeSpan) {
        var textNode = getNode();
        if (textNode.node.nodeName !== "#text") return;
        /**
         * Note. 노드의 기준이 한칸 뒤가 되는 경우가 있음. 첫 스타트가 -1일때를 기준으로 더해줌.
         *  ex) 맥/일렉트론/특정 브라우저
         *
         */
        var isAdjustNeed = textNode.eraseStart === -1
        var eraseStart = isAdjustNeed ? textNode.eraseStart + 1 : textNode.eraseStart;
        var eraseEnd = isAdjustNeed ? textNode.eraseEnd + 1 : textNode.eraseEnd;
        
        var afterTextNode = textNode.node.splitText(eraseStart); //텍스트노드일때만 splitText 가능
        afterTextNode.deleteData(0, eraseEnd - eraseStart + 1);
        textNode.node.parentNode.insertBefore($changeSpan[0], afterTextNode);
        textNode.node.parentNode.insertBefore(document.createTextNode("\u00A0"), afterTextNode);

        /**
         * Note. 간헐적으로 가비지 텍스트가 남아서 임의로 처리해줌
         *  ex) "안녕하세요" => "<TAG>안녕하세요</TAG> 세요"
         *      불필요한 "세요"를 지워준다.
         */

        var temptText = $changeSpan.text();
        var nextNextEl = $changeSpan[0].nextSibling.nextSibling;
        var garbageText = Often.null2Void(nextNextEl && nextNextEl.textContent);
        if (garbageText !== " " &&
            (garbageText.indexOf('@') > -1 ||
                garbageText.indexOf(temptText.substr(-1)) > -1 ||
                garbageText.indexOf(temptText.substr(-2)) > -1 ||
                garbageText.indexOf(temptText.substr(-3)) > -1) && Often.isBrowser("mac")) {
            nextNextEl.remove();
        }

        focusNextCaret($changeSpan[0].nextSibling, 1);
    }

    function getPosition() {
        var sel, range, rects, rect;
        var x = 0,
            y = 0;
        sel = window.getSelection();
        if (!sel.rangeCount) return {x: 0, y: 0}
        range = sel.getRangeAt(0).cloneRange();
        range.collapse(true);
        rects = range.getClientRects();
        rect = rects.length > 0 ? rects[0] : "";
        x = Often.null2Void(rect.left, 0);
        y = Often.null2Void(rect.top, 0);
        return {x: x, y: y}
    }

    function getCaretOffset() {
        return window.getSelection().anchorOffset;
    }

    function setCaretPositionAfterTag() {
        var sel = window.getSelection();
        var range = document.createRange();
        if (Browser.ieYn && this.value) return range.move('character', this.value.length);
        range.setStart(sel.focusNode, 1);
        range.setEnd(sel.focusNode, 1);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        $(sel.focusNode).parents("div.editable").focus();
        if (Browser.chrome) {
            var korReg = /[ㄱ-힣ㅏ-ㅣ]/;
            setTimeout(function () {
                if (korReg.test(sel.focusNode.substringData(1, 1))) {
                    var cutLength = OS.isWin ? 2 : 1;
                    sel.focusNode.deleteData(1, cutLength);
                }
            })
        }
    }

    function setCaretCollapse() {
        var sel = window.getSelection();
        sel.rangeCount && sel.getRangeAt(0).collapse(true)
    }

    function getInput() {
        var inputValue = Often.null2Void(Often.null2Void(window.getSelection().focusNode).data);
        if (inputValue === "") return ""
        var allInputWords = inputValue.substring(0, window.getSelection().focusOffset + 1).split(" ");
        var result = "";
        while (allInputWords.length > 0) {
            result = allInputWords.pop();
            if (Often.null2Void(result) !== "") return result;
        }
        return "";
    }

    function getFocusedInput() {
        return $(document.getSelection().focusNode).parents("div[contenteditable=true]");
    }

    function getFocusedElement() {
        var result = null;
        var sel = document.getSelection();
        if (sel.focusNode) {
            if (sel.focusNode.constructor === Text) {
                result = sel.focusNode
            }
        }
        return result;
    }

    function saveCaret() {
        caretInfo = {
            range: window.getSelection().getRangeAt(0).cloneRange(),
            offset: getCaretOffset(),
            focusElement: getFocusedElement(),
            inputObject: getFocusedInput(),
            inputLength: getInput().length,
        };
        return caretInfo;
    }

    function loadCaret() {
        var sel = document.getSelection();
        try {
            if (caretInfo.focusElement.constructor === Text) {
                caretInfo.range.setStart(caretInfo.focusElement.nextSibling.nextSibling, 1);
                caretInfo.range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(caretInfo.range);
            }
        } catch (e) {
            console.error('error!', e);
        }
        caretInfo.inputObject.focus();
        caretInfo = null;
    }

    //key = @,#
    function captureIndex(key) {
        var sel = window.getSelection();
        try {
            range = sel.getRangeAt(0).cloneRange();
            var focusNodeData = sel.focusNode.data;
            try {
                if (fn_ElectronVersionCheck() && Often.getClientOSInfo().isWin && (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(focusNodeData.charAt(focusNodeData.length - 1)))) {
                    eraseEnd = sel.focusOffset + 1;
                }
            } catch (e) {
                eraseEnd = sel.focusOffset;
            }

            if (focusNodeData != null) {
                var tmpStr = focusNodeData.substring(0, eraseEnd);
                eraseStart = tmpStr.lastIndexOf(key);
            }

            node = sel.focusNode;
        } catch (e) {
            //pass
        }
    }

    function isChangeTextInput(e) {
        return (KeyCheck.isKey(e, "SPACE_BAR") || KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "DELETE"));
    }

    function isTextInput(e) {
        return !(isChangeTextInput(e) ||
            e.key === "Shift" || e.key === "Alt" || e.key === "Control" || e.key === "Meta" || e.key === "Fn" ||
            e.key === "ScrollLock" || e.key === "NumLock" || e.key === "CapsLock" ||
            KeyCheck.isKey(e, "ENTER") || KeyCheck.isKey(e, "TAB") || KeyCheck.isKey(e, "ESC") ||
            KeyCheck.isKey(e, "UP") || KeyCheck.isKey(e, "RIGHT") ||
            KeyCheck.isKey(e, "DOWN") || KeyCheck.isKey(e, "LEFT") ||
            e.key === "End" || e.key === "Home" || e.key === "PageDown" || e.key === "PageUp" ||
            e.key === "Clear" || e.key === "Insert" || e.key === "PrintScreen" || e.key === "Pause" ||
            e.key === "Win" || e.key === "Apps" || e.key === "KanjiMode" ||
            e.key === "KanaMode" || e.key === "Standby");
    }

})();
