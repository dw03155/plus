var ElectronEvent = (function () {

    return {
        clickNaviBar: clickNaviBar,
        setHistoryButton: setHistoryButton,
        addReloadMouseDownEvent: addReloadMouseDownEvent,
        closeReloadLayer: closeReloadLayer,
    }

    function clickNaviBar($eTarget) {

        if (isBackBtnAndAction()) return;
        if (isForwardBtnAndAction()) return;
        if (isReloadBtnAndAction()) return;
        if (isReloadMenuAndAction()) return;

        function isBackBtnAndAction() {
            var $backBtn = $eTarget.closest('.js-history-back');
            if($backBtn.length === 0) return false;

            if(!$backBtn.find('i').hasClass('on')) return true;
            history.go(-1);
            return true;
        }

        function isForwardBtnAndAction() {
            var $forwardBtn = $eTarget.closest('.js-history-forward');
            if($forwardBtn.length === 0) return false;

            if(!$forwardBtn.find('i').hasClass('on')) return true;
            history.go(1);
            return true;
        }

        function isReloadBtnAndAction() {
            var $reloadBtn = $eTarget.closest('.js-reload-btn');
            if($reloadBtn.length === 0) return false;

            window.location.reload(true);
            return true;
        }

        function isReloadMenuAndAction() {
            var $reloadMenu = $eTarget.closest('.js-reload-menu');
            if($reloadMenu.length === 0) return false;

            var dataCode = $reloadMenu.attr('data-code');
            if(dataCode === 'reload') window.location.reload();
            else if (dataCode === 'reload-force') window.location.reload(true);
            return true;
        }
    }

    function setHistoryButton(isBack, isPageExist, isNextPageMain) {
        var $electronNavi = $('#electronNavi');
        var $historyButton = isBack ? $electronNavi.find('.js-history-back') : $electronNavi.find('.js-history-forward')
        isPageExist && !isNextPageMain && !ViewChanger.isPage('main')?
            $historyButton.find('i').addClass('on') : $historyButton.find('i').removeClass('on')
    }

    function addReloadMouseDownEvent() {
        var $reloadButton = $('#electronNavi .js-reload-btn');
        $reloadButton.off("mousedown").on("mousedown", function (e) {
            if (e.button !== 2) return;
            e.stopPropagation();
            showReloadMenu();
        })
    }

    function showReloadMenu() {
        var $reloadBtn = $("#electronReloadLayer");
        $reloadBtn.find('#js-reload').text(Often.isBrowser("mac")? 'Cmd + R' : 'F5');
        $reloadBtn.find('#js-reload-force').text(Often.isBrowser("mac")? 'Shift + Cmd + R' : 'Ctrl + F5');
        $reloadBtn.removeClass('d-none').css('display', 'block');
        $('.header').attr('oncontextmenu', 'return false');
    }

    function closeReloadLayer() {
        $("#electronReloadLayer").css('display', 'none');
    }


})();