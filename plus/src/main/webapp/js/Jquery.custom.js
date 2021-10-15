$.fn.isBottom = function () {
    return (this.prop('scrollTop') + this.prop('clientHeight')) / this.prop('scrollHeight') > SCROLL_RATIO;
}

$.fn.isBottom2 = function () {
    return (this[0].scrollTop + this.outerHeight()) / this[0].scrollHeight > SCROLL_RATIO;
}

$.fn.existScrollBar = function () {
    var scrollHeight = this.prop('scrollHeight');
    var clientHeight = this.prop('clientHeight');
    if (scrollHeight <= 0 && clientHeight <= 0) return true;
    return (scrollHeight !== clientHeight);
}

$.fn.moveToOffsetByClassName = function (className, isAnimate) {
    var findObject = this.find('.' + className);
    var offset = findObject.offset();
    if (!offset || !offset.top) return;
    var temp = this.scrollTop() + (offset.top - 50);
    this.moveToOffset(temp, isAnimate);
}

$.fn.moveToOffsetById = function (id, isAnimate, block) {
    var findObject = this.find('#' + id);
    var offset = findObject.offset();
    if (!offset || !offset.top) return;
    document.getElementById(id).scrollIntoView({block: block});
}

$.fn.moveToOffset = function (offset, isAnimate) {
    this.animate({scrollTop: offset}, isAnimate ? 500 : 0);
}

$.fn.moveToTop = function (isAnimate) {
    this.moveToOffset(0, isAnimate);
}

$.fn.moveToBottom = function (isAnimate) {
    var offset = this.prop('scrollHeight');
    this.moveToOffset(offset, isAnimate);
}

$.fn.isArrowSelect = function (e) {

    var $this = $(this);
    var $ul = $this.find("ul");
    var $scrollArea = ($this.attr("id") === "workerPopup") ? $ul.parents(".js-worker-list") : $ul;

    var $lis = $ul.children('li');
    var scrollOffset = $scrollArea.offset();
    var isDown = KeyCheck.isKey(e, "DOWN");
    var isUp = KeyCheck.isKey(e, "UP");

    if (!$this.is(":visible")) return false;
    if (!isUp && !isDown) return false;

    e.preventDefault();

    var itemPrevNumber = Number($this.find('.select').index());
    var itemLength = $lis.length;

    if ((isUp && itemPrevNumber === 0) || (isDown && itemPrevNumber === (itemLength - 1))) return true;

    $lis.removeClass('select');

    var itemNextNumber = itemPrevNumber + (isDown ? 1 : -1);
    var $targetLi = $ul.children('li:eq(' + (itemNextNumber) + ')');
    $targetLi.addClass('select');

    var targetBottom = $targetLi.offset() ? ($targetLi.offset().top + $targetLi.height()) : 0;
    var topBase = scrollOffset.top;
    var bottomBase = scrollOffset.top + $scrollArea.height();

    if (targetBottom !== 0 && (targetBottom >= bottomBase || targetBottom <= topBase)) {
        var step = itemNextNumber * ($targetLi.outerHeight());
        $scrollArea.scrollTop(step);
    }
    return true;
}

$.fn.findUp = function (sizzleName) {
    return ($(this).is(sizzleName) ? $(this) : $(this).parents(sizzleName));
}

$.fn.findSiblingsClass = function (className) {
    return ($(this).hasClass(className) ? $(this) : $(this).siblings("." + className));
}

$.fn.hasVerticalScrollBar = function () {
    if (!($(this).css("overflow") === "auto" ||
        $(this).css("overflow") === "scroll" ||
        $(this).css("overflow-y") === "auto" ||
        $(this).css("overflow-y") === "scroll")) return true; // 스크롤 바가 없어서 무한루프 이슈 생김.
    return $(this).get(0) ? $(this).get(0).scrollHeight > $(this).innerHeight() : false;
}

$.fn.drawListHelper = function (drawData) {

    var $this = $(this);

    var pageData = drawData.pageData || {};
    var prevYn = drawData.prevYn ? drawData.prevYn : 'N';
    var nextYn = drawData.nextYn ? drawData.nextYn : 'N';
    var checkDttm = drawData.checkDttm ? drawData.checkDttm : '';
    var records = drawData.records;
    var noDataHtml = drawData.noDataHtml;
    var reverse = drawData.reverse ? drawData.reverse : false;
    var notEmpty = drawData.notEmpty ? drawData.notEmpty : false;
    var isFirstDraw = (pageData && pageData.PG_NO === (pageData.ZERO_FIRST ? 0 : 1)); //Note. firstPage가 0인 경우가 있어 별도 처리
    var isNotDataByFileNFolder = records && records.length === 1 &&
        records[0].FOLDER && (records[0].FOLDER.length === 0) &&
        records[0].FILE && (records[0].FILE.length === 0);
    var isNotData = records && (records.length === 0 || isNotDataByFileNFolder);
    var $scrollObj = $this;
    var $focusObj;
    var ulDblClickFunc, ulDrawFunc, ulClickFunc, scrollFunc, scrollReverseFunc, finalFunc;

    if (drawData.targetObj) {
        $scrollObj = drawData.targetObj.scroll ? drawData.targetObj.scroll : $this;
        $focusObj = drawData.targetObj.focus;
    }

    if (drawData.callback) {
        ulDrawFunc = drawData.callback.item;
        ulClickFunc = drawData.callback.click;
        ulDblClickFunc = drawData.callback.dblclick;
        scrollFunc = drawData.callback.scroll;
        scrollReverseFunc = drawData.callback.scrollReverse;
        finalFunc = drawData.callback.final;
    }

    var isExistFunc = {
        ulDraw: (typeof ulDrawFunc === "function"),
        scroll: (typeof scrollFunc === "function"),
        scrollReverse: (typeof scrollReverseFunc === "function"),
        final: (typeof finalFunc === "function"),
    }

    pageData.PREV_YN !== undefined && (pageData.PREV_YN = prevYn);
    pageData.NEXT_YN !== undefined && (pageData.NEXT_YN = nextYn);
    pageData.CHECK_DTTM !== undefined && (pageData.CHECK_DTTM = checkDttm);

    if (isFirstDraw) {
        if (!notEmpty) $this.empty();
        if ($focusObj) $focusObj.focus();
        ListHelper.initClickEvent($this, ulClickFunc);
        ListHelper.initDBLClickEvent($this, ulDblClickFunc);
        ListHelper.initScrollEvent($scrollObj, scrollFunc, scrollReverseFunc,
            isExistFunc.scroll && !isExistFunc.scrollReverse && !reverse);
        ListHelper.addClickEventOnMoveTopButton($scrollObj);
    }

    if (isNotData) {
        pageData.NEXT_YN = "N";
        if (isFirstDraw) $this.prepend(noDataHtml);
        isExistFunc.final && finalFunc($this);
        return;
    }

    if (!isExistFunc.ulDraw) return;

    if (reverse) {
        $this.prepend(ulDrawFunc(records));
    } else {
        $this.append(ulDrawFunc(records));
    }

    pageData.PG_NO++;
    isExistFunc.final && finalFunc($this);

    /**
     * 스크롤을 마우스 잡아 강제로 끝으로 가져갈때 생기는 이슈를 해결하기 위한 로직
     * 페이징이 끝나고 0.3초 후에 위로 맨끝에 도달했을때 || 아래로 맨끝에 도달했을때를 체킹하여 로직 진행
     */

    var direction = ListHelper.getScrollDirection($scrollObj);
    if (direction === 0) {
        if (!$scrollObj.existScrollBar()) {
            if (reverse && pageData.PREV_YN !== 'N') {
                isExistFunc.scrollReverse && scrollReverseFunc();
            } else if (pageData.NEXT_YN !== 'N') {
                isExistFunc.scroll && scrollFunc();
            }
        }
    } else if (direction < 0 && isExistFunc.scrollReverse) {
        setTimeout(function () {
            if ($scrollObj.scrollTop() === 0) scrollReverseFunc();
        }, 300);
    } else if (direction > 0 && isExistFunc.scroll) {
        setTimeout(function () {
            if ($scrollObj.scrollTop() + $scrollObj.prop('clientHeight') === $scrollObj.prop('scrollHeight')) {
//                 $scrollObj.scrollTop(scrollTop - 1); //Todo. 스크롤 맨위일때 내려주는 로직 따로 추가후 삭제 예정
                scrollFunc();
            }
        }, 300);
    }
}