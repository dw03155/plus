var Tooltip = (function () {

    return {
        isDrawToolTipAndAction: isDrawToolTipAndAction,
        isMoveToolTipAndAction: isMoveToolTipAndAction,
        isRemoveToolTipAndAction: isRemoveToolTipAndAction,
    }

    /**
     * Note. Tooltip Tag
     *
     * ex)
     * <button class="js-mouseover"
     *         mouseover-text="툴팁을<br>표현합니다"
     * ></button>
     *
     * attr - {String})
     * 1. class: js-mouseover 고정 | js-button-tooltip 선택 (버튼에 넣는 툴팁)
     * 2. mouseover-text : tooltip-text
     * - description : 개행은 <br>로 표기
     * - description : 'mouseover-text' 비어있으면, '태그 안의 text'를 툴팁으로 가져옴
     * - description : '태그 안의 text' 비어있으면, 'mouseover-text'를 툴팁으로 가져옴
     */

    function isDrawToolTipAndAction($eTarget) {

        // 툴팁 예외
        if ($eTarget.findUp(".flatpickr-calendar").length > 0) return false;

        //툴팁 체크
        var $toolTip = $("#detailToolTip");
        if ($toolTip && $toolTip.length > 0) $toolTip.remove();

        //객체 체크
        var $mouseoverObj = $eTarget.findUp(".js-mouseover");
        if (!$mouseoverObj || $mouseoverObj.length === 0) return false;

        //위쪽에 그리는 툴팁여부
        var isTopToolTip = $mouseoverObj.hasClass('js-top-tooltip')

        //텍스트 체크
        var toolTipText = getToolTipText($mouseoverObj);
        if ("" === toolTipText) return false;

        //오버 텍스트 체크
        if (!(isOverText($mouseoverObj) || $mouseoverObj.hasClass("js-button-tooltip")) && !_IsMini && !Often.isMessenger()) return false;

        //그리기
        $toolTip = $('<span class="tooltip-square"></span>');
        if (isTopToolTip) $toolTip.addClass('up-tooltip')
        $toolTip.html(toolTipText);
        $("body").prepend($toolTip);

        $toolTip.attr("id", "detailToolTip").css(calculatorToolTip($toolTip, event, isTopToolTip));

        return true;
    }

    function isMoveToolTipAndAction($eTarget) {
        var $toolTip = $("#detailToolTip");
        if (!$toolTip || $toolTip.length === 0) return false;

        var $mouseoverObj = $eTarget.findUp(".js-mouseover");
        var isTopToolTip = $mouseoverObj.hasClass('js-top-tooltip')
        $toolTip && $toolTip.css(calculatorToolTip($toolTip, event, isTopToolTip));
        return true;
    }

    function isRemoveToolTipAndAction($eTarget) {
        var $toolTip = $("#detailToolTip");
        var $removeObj = $eTarget.findUp(".js-mouseover");
        if ((!$removeObj || $removeObj.length === 0) && (!$toolTip || $toolTip.length === 0)) return false;
        $toolTip.remove();
        return true;
    }

    function getToolTipText($targetObj) {
        var tempToolTipText;

        //.attr("mouseover-text") 텍스트
        var mouseoverText = $.trim(TagUtil.removeAllTag(Often.null2Void($targetObj.attr("mouseover-text"))));
        var isExistMouseoverData = "" !== mouseoverText;
        if (isExistMouseoverData) tempToolTipText = mouseoverText;
        else if ($targetObj.is("input")) tempToolTipText = $targetObj.val();
        else tempToolTipText = "";

        //.text() 텍스트
        if (tempToolTipText === "") {
            var innerText = $.trim($targetObj.text());
            var isExistInnerData = "" !== innerText;
            if (isExistInnerData) tempToolTipText = innerText;
            else tempToolTipText = "";
        }

        var toolTipTextArray = tempToolTipText.split("<br>");
        toolTipTextArray.forEach(function (v, i) {
            toolTipTextArray[i] = TagUtil.tag2html(v);
        })
        return $.trim(toolTipTextArray.join("<br>"));
    }

    function calculatorToolTip($toolTip, event, isTopToolTip) {
        var toolTipWidth = $toolTip.outerWidth();
        var toolTipHeight = $toolTip.outerHeight();
        var toolTipPosition = (toolTipWidth / 2);
        return {
            "top": isTopToolTip ? (event.pageY - toolTipHeight - 10) : (event.pageY + 30),
            "left": event.pageX - toolTipPosition + 4,
            "position": "absolute",
            "z-index": 100000,
        }
    }

    //Note. '...' 줄임 활성화여부 체크
    function isOverText($mouseOverTarget) {
        var targetNodeName = $mouseOverTarget[0].nodeName;
        if (targetNodeName === 'INPUT') targetNodeName = 'SPAN';
        var $tempObj = $('<' + targetNodeName + '></' + targetNodeName + '>')
            .attr("class", "js-over-text-check")
            .html(getToolTipText($mouseOverTarget))
            .css(getTargetCss($mouseOverTarget));
        $('body').prepend($tempObj);
        var isOver = ($tempObj.width() > $mouseOverTarget.width());
        $(".js-over-text-check").remove();
        return isOver;
    }

    function getTargetCss($mouseOverTarget) {
        return {
            "z-index": -1,
            "font-size": $mouseOverTarget.css("font-size"),
            "font-weight": $mouseOverTarget.css("font-weight"),
            "text-align": $mouseOverTarget.css("text-align"),
            "position": "absolute"
        }
    }
})();