var PasteText = (function () {

    /**
     * Todo
     * 1. 크롬 복사 => 크롬 붙여넣기 개행 이상없음
     * 2. 크롬 복사 => IE 붙여넣기 개행 이상없음
     * 3. IE 복사 => 크롬 붙여넣기 개행 2배 적용
     * 4. IE 복사 => IE 붙여넣기 개행 2배 적용
     *
     * IE에서 DIV 태그로 감싸진 태그를 복사할때 이상현상이 생기는 것으로 보임
     * IE일때만 전역에서 특수하게 처리해줘야할 것으로 보임
     *
     * Note
     * IE는 드래그앤드랍, 컨트롤씨브이 복사 모두 안 된다. 오직 텍스트만!
     * Copy 태그를 다 뗴도 좋지만, Paste는 태그를 떼서는 안 된다.
     * PPT와 EXCEL 복붙은 이미지와 텍스트 둘다 붙이게 만든다.
     * */

    return {
        pasteTextEvent: pasteTextEvent,
    }

    //Note.
    function pasteTextEvent(e) {
        var $eTarget = $(e.target);
        var $contentEditable = $eTarget.findUp("[contenteditable=true]");
        if ($contentEditable.length === 0) return;
        e.preventDefault();
        var clipBoardData = ClipBoard.getClipboardData(e);

        if (Often.isBrowser("ie")) {
            pasteTextContentsByIE(clipBoardData.getData("text"));
            return;
        }

        if (!clipBoardData.items || clipBoardData.items.length === 0) return;
        if (!document.queryCommandSupported('insertText')) return;
        var tempHtml = TagConvert.html2HtmlStringByCopy(clipBoardData.getData("text"));
        if(tempHtml.length === 0) return; 
        document.execCommand('insertHTML', false, tempHtml);

        //Note. IE >= 9
        function pasteTextContentsByIE(html) {

            var sel = window.getSelection();
            if (!(sel.getRangeAt && sel.rangeCount)) return;

            var range = sel.getRangeAt(0);
            range.deleteContents();

            var frag = document.createDocumentFragment();
            var el = document.createElement("div");
            el.innerHTML = Often.null2Void(html);

            var node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            if (!lastNode) {
                Often.toast("error", i18next.t('front.top.IEwarning'));
                return;
            }

            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

})();
