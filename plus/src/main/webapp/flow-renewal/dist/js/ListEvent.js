var ListEvent = function () {

    var $currentFocusItem, $nextTarget;

    return {
        arrowDownOnInput : arrowDownOnInput,
        arrowDownOnList : arrowDownOnList,
        arrowUpOnList : arrowUpOnList,
        enterOnList : enterOnList,
    }

    function arrowDownOnInput(listGb,$input, $targetUl){
        if(!listGb) return;
        $input.blur();

        if(listGb === "CHAT"){
            $targetUl.children('li').removeClass('on');
            $targetUl.children('li:first').addClass('on').focus();
        }
    }

    function arrowDownOnList(listGb, $input, $targetUl){
        if(!listGb) return;
        $input.blur();

        if(listGb === "CHAT"){
            $currentFocusItem = $targetUl.find('li.on');
            $currentFocusItem.length === 0 && $targetUl.children('li:first').addClass('on');
            $nextTarget = $currentFocusItem.next('li');
            if($nextTarget.length === 0) return;

            $currentFocusItem.removeClass('on');
            $nextTarget.addClass('on');
            adjustScroll($targetUl, $nextTarget, true);
        }

    }

    function arrowUpOnList(listGb, $input, $targetUl){
        if(!listGb) return;
        $input.blur();

        if(listGb === "CHAT"){
            $currentFocusItem = $targetUl.find('li.on')
            var prevTarget = $currentFocusItem.prev('li')
            if(prevTarget.length === 0) return;

            $currentFocusItem.removeClass('on');
            prevTarget.addClass('on');
            adjustScroll($targetUl, prevTarget, false);

        }
    }

    function enterOnList(listGb, $input, $targetUl) {
        if (!listGb) return;
        if (listGb === "CHAT") {
            $currentFocusItem = $targetUl.find('li.on')
            if($currentFocusItem.length === 0) return;
            if ($currentFocusItem.length === 0) return;

            var roomSrno = $currentFocusItem.attr('data-room-srno')
            Chatting.getRoomInfo(true, roomSrno, function (dat) {
                Chatting.readMessageAndOpenMessenger(dat.READ_OVER_YN !== 'N', roomSrno)
            })
        }
    }
    

    function adjustScroll($targetUl, $currentFocusItem, isDown) {
        var clientHeight = $targetUl.height();
        var targetTop = $currentFocusItem.offset().top;

        if (isDown && targetTop > clientHeight) $targetUl.moveToOffsetById($currentFocusItem.attr('id'), true, 'start')
        if (!isDown && targetTop < clientHeight * 0.2) $targetUl.moveToOffsetById($currentFocusItem.attr('id'), true, 'end')
    }

}();