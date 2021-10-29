var HashTag = (function () {

    var hashtagPageData = {
        PG_NO: 1,
        PG_PER_CNT: 100,
        NEXT_YN: "Y",
        COLABO_SRNO: '',
    }

    var $postPopup, $innerCommonPopup;
    var keyupTimer, keyupTimer2;
    var caretPosition;
    var $projectHashtagArea, $hashtagUl, $hashtagMoreButton;
    var $commonPopup, $HashTagSpan;
    var clickedHashtagName = '';
    var hashtagMoreButtonStatus = false
    var hashTagStatus = false;

    return {
        setUnHashtagView: setUnHashtagView,
        getStatus: getStatus,
        keyDownArrow: keyDownArrow,
        keyUpCheckHashTag: keyUpCheckHashTag,
        clearHashTag: clearHashTag,
        drawProjectHashtagItemsByRecord: drawProjectHashtagItemsByRecord,
        changeHashtagListStatusAndView: changeHashtagListStatusAndView,
    }

    function getStatus() {
        return hashTagStatus;
    }

    function keyDownArrow(e) {
        e.stopPropagation();
        var $eTarget = $(e.target);
        $postPopup = $eTarget.findUp("#postPopup");
        $innerCommonPopup = $postPopup.find("#innerCommonHashTagPopup");
        if ($innerCommonPopup.isArrowSelect(e)) return;
        if (hashTagStatus && KeyCheck.isKey(e, "SPACE_BAR")) return e.preventDefault();
        if (hashTagStatus && KeyCheck.isKey(e, "ENTER")) {
            var $hashTagItem = $innerCommonPopup.find(".hashtag-popup").find(".select");
            if ($hashTagItem.length === 0) return;
            e.preventDefault();
            selectHashTag($hashTagItem.find('.hashtag-item-title').text(), true);
        }
    }

    function drawProjectHashtagItemsByRecord(tagRecord) {

        initHashTagSetting();
        $hashtagUl.empty();
        if (tagRecord.length === 0) return $projectHashtagArea.addClass("d-none");
        $hashtagUl.append(makeHashTagListItem(tagRecord));
        setTimeout(controlMoreButton, 200);
        setHashtagInDetailEvent();
        $projectHashtagArea.removeClass("d-none");

        function initHashTagSetting() {
            setHtmlId();
            setHtmlCode();
            hashTagMoreButtonEvent();
        }

        function setHtmlId() {
            $projectHashtagArea = $("#projectHashtagArea");
            $hashtagUl = $("#hashtagUl");
            $hashtagMoreButton = $("#hashtagMoreButton");
        }

        function setHtmlCode() {
            $commonPopup = $($("#hashTagLayer").html());
            $HashTagSpan = $('<span class="tag hashtag-span" contenteditable="false"></span>');
        }

        function hashTagMoreButtonEvent() {
            $hashtagMoreButton.off('click').on('click', function () {
                if (hashtagMoreButtonStatus === '' || hashtagMoreButtonStatus === false) {
                    $hashtagUl.css('height', 'auto');
                    $hashtagUl.css('overflow', 'visible');
                    $hashtagMoreButton.removeClass('active');
                    hashtagMoreButtonStatus = true;
                } else {
                    $hashtagUl.css('height', '40px');
                    $hashtagUl.css('overflow', 'hidden');
                    $hashtagMoreButton.addClass('active');
                    hashtagMoreButtonStatus = false;
                }
            });
        }
    }

    function makeHashTagListItem(responseHashTagData) {
        var baseHtml = $('#hastTagTransverseItem').html();
        var returnHtml = '';
        $.each(responseHashTagData, function (index, item) {
            returnHtml += ListHelper.replaceJson(baseHtml, {
                'tag-name': Often.null2Void(item.TAG_NM, ""),
            })
        });
        return returnHtml;
    }

    function keyUpCheckHashTag(e) {
        if (!PostCondition.getFuncCondition().isHashTag) return;
        if (Mention.getStatus()) {
            hashTagStatus = false;
            return;
        }
        var $eTarget = $(e.target);
        $postPopup = $eTarget.findUp("#postPopup");
        var $popupBefore = $eTarget.findUp(".js-popup-before");
        if ($popupBefore.length === 0) return;

        $innerCommonPopup = $postPopup.find("#innerCommonHashTagPopup");
        if ($postPopup.length === 0) {
            hashTagStatus = false;
            return;
        }

        if ($innerCommonPopup.length === 0 && $commonPopup) {
            $popupBefore.before($commonPopup.attr({'id': 'innerCommonHashTagPopup', 'data-code': 'hashTag'}));
            $innerCommonPopup = $postPopup.find("#innerCommonHashTagPopup");
        }

        hashtagPageData.COLABO_SRNO = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO");
        modifyHashTagListCss($innerCommonPopup);

        if ((KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "ESC"))) {
            clearHashTag();
        } else if (hashTagStatus && (KeyCheck.isKey(e, "SPACE_BAR") || KeyCheck.isKey(e, "ENTER"))) {
            e.preventDefault();
            clearHashTag();
            var value = Caret.getInput().trim();
            if (value === "#") return;
            if (value.indexOf("[") > -1 || value.indexOf("]") > -1) return Often.toast("error", "[, ]는 사용할 수 없습니다.");
            afterSpaceMakeHashTag(value);
            return;
        }

        if (isStartHashTag(e)) {
            hashTagStatus = true;
            caretPosition = Caret.getPosition();
            keyupTimer2 && clearTimeout(keyupTimer2);
            keyupTimer2 = setTimeout(drawHashTag, 100); //0.1초로 하지 않으면 글자가 남음
            return;
        }

        keyupTimer && clearTimeout(keyupTimer);
        keyupTimer = setTimeout(function () {
            Caret.isTextInput(e) && drawHashTag();
        }, 100) //0.1초로 하지 않으면 글자가 남음

        function drawHashTag() {
            if (!hashTagStatus) return;
            var $hashTagPopupUl = $innerCommonPopup.find(".hashtag-popup");
            Caret.captureIndex("#");
            ListHelper.initPageData(hashtagPageData, $hashTagPopupUl);
            getHashTagList();
            Caret.saveCaret();
            clearTimeout(keyupTimer2);
        }

    }

    function clearHashTag() {
        hashTagStatus = false;
        if (!$innerCommonPopup || $innerCommonPopup.length === 0) return;
        $innerCommonPopup.find(".select").removeClass("select");
        $innerCommonPopup.css({'display': 'none'});
    }

    function isStartHashTag(e) {
        var inputCaret = Caret.getInput();
        var isNotExistsHashTag = (inputCaret.trim().indexOf('#') === 0);
        var isCaret = (inputCaret.trim() === '#');
        var case1 = (e.shiftKey && e.keyCode === 51 && isNotExistsHashTag);
        var case2 = (e.key === '#' && isNotExistsHashTag);
        var case3 = (e.shiftKey && e.key === "#" && isCaret);
        var case4 = (e.key === '3' && isCaret);
        var case5 = (KeyCheck.isKey(e, "BACK") && isNotExistsHashTag && inputCaret.trim().length === inputCaret.length);
        return case1 || case2 || case3 || case4 || case5;
    }

    function getHashTagList() {
        var caretValue = Often.null2Void(Caret.getInput().trim());
        var matchHashTag = caretValue.match(/#/gi);
        if (!matchHashTag) return;
        var isOneJHashTag = matchHashTag.length === 1;
        var searchWord = caretValue.replace((isOneJHashTag ? '#' : /^#.*#/gi), "");
        $innerCommonPopup.css('display', 'none');

        Ajax.executeApi(RestApi.GET.FLOW_TAG_R001, $.extend({}, hashtagPageData, {
            SRCH_WD: searchWord,
            SORT_DESC: "N",
        }), function (responseHashTagData) {
            drawHashTagList(responseHashTagData['TAG_REC'], responseHashTagData['NEXT_YN'])
        })

        function drawHashTagList(hashTagData, nextYn) {
            var isFirst = hashtagPageData.PG_NO === 1;
            $innerCommonPopup.find(".hashtag-popup").drawListHelper({
                pageData: hashtagPageData,
                nextYn: nextYn,
                records: hashTagData,
                callback: {
                    click: clickHashTagUl,
                    item: getHashTagItemsHtml,
                    final: callbackHashTag,
                }
            })

            function clickHashTagUl(e) {
                var $eTarget = $(e.target);
                var $hashTagItem = $eTarget.findUp('.hashtag-item');
                if ($hashTagItem.length === 0) return;
                e.preventDefault();
                selectHashTag($hashTagItem.find('.hashtag-item-title').text());
            }

            function callbackHashTag($ul) {
                var $editItem = $postPopup.find(".edit-item")
                var cssJson;
                if (hashTagData.length === 0) {
                    cssJson = {display: 'none'}
                } else {
                    var tempTop = caretPosition.y - $editItem.offset().top + 20;
                    var tempLeft = caretPosition.x;
                    cssJson = {
                        transform: 'translate(' + tempLeft + 'px, ' + tempTop + 'px)',
                        display: 'block'
                    }
                }
                $innerCommonPopup.css(cssJson);
                if (isFirst) {
                    $innerCommonPopup.attr('data-code', 'hashTag');
                    $ul.scrollTop(0);
                    ListHelper.selectFirstItemByArrow($ul);
                }
            }
        }

        function getHashTagItemsHtml(hashTagPopupListItems) {
            var returnHtml = "";
            var baseHtml = $("#hashTagItem").html();
            $.each(hashTagPopupListItems, function (index, item) {
                returnHtml += ListHelper.replaceJson(baseHtml, {
                    'tagName': Often.null2Void(item['TAG_NM'], ''),
                    'refCount': Often.null2Void(item['REF_CNT'], ''),
                })
            });
            return returnHtml;
        }
    }

    function selectHashTag(getText, isEnterKey) {
        clearHashTag();
        var $HashTagSpanClone = $HashTagSpan.clone();
        $HashTagSpanClone.text('#' + getText);
        isEnterKey ? setTimeout(function () {
            Caret.changeAndFocusNode($HashTagSpanClone)
        }, 0) : Caret.changeAndFocusNode($HashTagSpanClone)

    }

    function afterSpaceMakeHashTag(getText) {
        var $HashTagSpanClone = $HashTagSpan.clone();
        var hashTagText = getHashTagText(getText);
        $HashTagSpanClone.text(hashTagText);
        Caret.captureIndex("#");
        setTimeout(function () {
            Caret.changeAndFocusNode($HashTagSpanClone);
        }, 0);
        clearHashTag();
    }

    function getHashTagText(hashTagText) {
        var hashTagTextIndex = (Often.null2Void(hashTagText).replace(/(#[^\[\]\s]*$)/ig, "")).length;
        var returnHashTagText = hashTagText.substring(hashTagTextIndex)
        return returnHashTagText.length > 1 ? returnHashTagText : "#";
    }

    function modifyHashTagListCss($HastTagWrapper) {
        $HastTagWrapper.css('width', '256px');
    }

    function setHashtagInDetailEvent() {
        $('#hashtagUl').off('click').on('click', function (e) {
            var $eTarget = $(e.target);
            var $clickedHashTagItem = $eTarget.findUp(".hashtag-item");
            if ($clickedHashTagItem.length === 0) return;
            changeHashtagListStatusAndView($clickedHashTagItem);
        });
    }

    function changeHashtagListStatusAndView($selectedHashTagItem) {
        var selectedHashTagItemText = $selectedHashTagItem.children().text();
        if (Often.null2Void(clickedHashtagName) === '') {
            DetailEvent.resetFilter($("#projectFeedArea"))
            clickedHashtagName = Often.null2Void(selectedHashTagItemText, '');
            setHashtagView(clickedHashtagName);
            Detail.drawHashtagPostList();
        } else if (clickedHashtagName !== selectedHashTagItemText) {
            clickedHashtagName = Often.null2Void(selectedHashTagItemText, '');
            setHashtagView(clickedHashtagName);
            Detail.drawHashtagPostList();
        } else if (clickedHashtagName === selectedHashTagItemText) {
            setUnHashtagView()
            Detail.drawPostList();
        }
    }

    function setHashtagView(keyword) {
        var $projectFeedArea = $("#projectFeedArea");
        $("#projectPinArea").css("display", "none");
        $projectFeedArea.find("#allPostsFilterTitle").text(keyword);
        $projectFeedArea.find(".js-filter-reset").css("display", "block");
        $projectFeedArea.find(".js-feed-filter-button").css("display", "none");
    }

    function setUnHashtagView() {
        var $projectFeedArea = $("#projectFeedArea");
        $("#projectPinArea").css("display", "block");
        $projectFeedArea.find("#allPostsFilterTitle").text(i18next.t('dictionary.all'));
        $projectFeedArea.find(".js-filter-reset").css("display", "none");
        $projectFeedArea.find(".js-feed-filter-button").css("display", "inline-block");
        clickedHashtagName = '';
    }

    function controlMoreButton() {
        var $hashtagItems = $hashtagUl.find(".hashtag-item");
        var firstOffset = $hashtagItems.first().offset();
        var lastOffset = $hashtagItems.last().offset();
        if (firstOffset && lastOffset && firstOffset.top !== lastOffset.top) {
            $hashtagMoreButton.css("display", "block").addClass("active");
        } else {
            $hashtagMoreButton.css("display", "none").removeClass("active");
        }
    }

})()