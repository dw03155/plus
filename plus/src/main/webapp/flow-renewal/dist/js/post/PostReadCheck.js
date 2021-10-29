var PostReadCheck = (function () {

    var readCheckPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
        COLABO_SRNO: 0,
        COLABO_COMMT_SRNO: 0,
        SRCH_WORD: "",
        MODE: "READ",
    }

    var $readCheckLayer, $postReadCount;
    var searchTimer;

    return {
        showReadCheckPopUp: showReadCheckPopUp,
        closePopup: closePopup
    };

    function showReadCheckPopUp(projectSrno, postSrno, $postReadArea) {
        $readCheckLayer = PopupDraw.getPopupWrapObj().attr('id', 'readCheckPopup');
        $readCheckLayer.find(".contents").html($("#readCheckPopup").html());
        $postReadCount = $postReadArea.find(".confirmation-number");
        ListHelper.initPageData(readCheckPageData, $readCheckLayer.find(".participants-list"));
        readCheckPageData.COLABO_SRNO = projectSrno;
        readCheckPageData.COLABO_COMMT_SRNO = postSrno;
        readCheckPageData.SRCH_WORD = "";
        drawReadCheckList("READ");
        addEventOnReadCheckPopup();
    }


    function drawReadCheckList(mode) {
        if (readCheckPageData.NEXT_YN === "N") return;
        readCheckPageData.MODE = mode;
        Ajax.executeApi(RestApi.GET.COLABO2_SENDIENCE_R101, $.extend({CUR_DTTM: mode}, readCheckPageData), function (dat) {
            $readCheckLayer.find(".participants-list").drawListHelper({
                pageData: readCheckPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["SENDIENCE_REC"],
                noDataHtml: ListHelper.getNoDataHtml("READ-CHECKER"),
                callback: {
                    click: clickReaderItem,
                    item: getHtmlByRecord,
                    scroll: function () {
                        drawReadCheckList(mode)
                    },
                    final: function () {
                        callbackFinal(dat);
                    },
                }
            })
        })
    }
    function getHtmlByRecord(readerArray) {
        var isReadMode = readCheckPageData.MODE === "READ";
        var returnHtml = "";
        var baseHtml = $("#readCheckItem").html();
        $.each(readerArray, function (i, reader) {
            var dataJson = {};
            dataJson['profile-url'] = ListHelper.setProfile(reader.PRFL_PHTG);
            isReadMode && (dataJson['read-text'] = i18next.t('dictionary.read'));
            isReadMode && (dataJson['read-time'] = Tz.momentTimeZone(reader.READ_DTTM, "type1"));
            returnHtml += ListHelper.replaceJson(baseHtml, $.extend(dataJson, reader));
        });
        return returnHtml;
    }

    function clickReaderItem(e) {
        var $eTarget = $(e.target);
        var $readerItem = $eTarget.findUp(".reader-item");

        if ($readerItem.length > 0) {
            Profile.drawProfilePopup($readerItem.attr("data-user-id"));
            return;
        }
    }

    function callbackFinal(dat) {
        if ($readCheckLayer.is(":visible")) return;
        drawReadCount();
        $('body').append($readCheckLayer); //환경 설정 팝업 뒤쪽에 배치하기 위해 append -> prepend 수정
        $readCheckLayer.fadeIn(200);

        function drawReadCount() {
            var $readTab = $readCheckLayer.find(".js-read-tab-item[data-code=READ]");
            var $unreadTab = $readCheckLayer.find(".js-read-tab-item[data-code=UNREAD]");
            $readTab.text($readTab.text() + " (" + dat.READ_CNT + ")");
            $postReadCount.text(dat.READ_CNT);
            $unreadTab.text($unreadTab.text() + " (" + (Number(dat.SENDIENCE_CNT) - Number(dat.READ_CNT)) + ")");
        }
    }

    function closePopup() {
        $readCheckLayer.fadeOut(200, function () {
            $readCheckLayer.remove();
        });
    }

    function addEventOnReadCheckPopup() {
        $readCheckLayer.off("click").on("click", clickReadCheckPopup)
            .off("keyup").on("keyup", keyupReadCheckPopup);
    }

    function clickReadCheckPopup(e) {

        e.stopPropagation();

        var $eTarget = $(e.target);
        var $eCurrentTarget = $(e.currentTarget);

        if (isReadTabAndAction($eTarget, $eCurrentTarget)) return;
        if (isCloseButtonAndAction($eTarget)) return;
        if (isBackClickAndAction($eTarget)) return;

        function isReadTabAndAction($eTarget, $eCurrentTarget) {
            var toggleName = "team-job-invite-type-";
            var $readTabItem = $eTarget.findUp(".js-read-tab-item");
            if ($readTabItem.length === 0) return false;
            if ($readTabItem.hasClass(toggleName + "2")) return true;
            $eCurrentTarget.find(".js-read-tab-item").toggleClass(toggleName + "1").toggleClass(toggleName + "2");
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                ListHelper.initPageData(readCheckPageData, $readCheckLayer.find(".participants-list"));
                drawReadCheckList($readTabItem.attr("data-code"));
            }, 200);
            return true;
        }

        function isCloseButtonAndAction($eTarget) {
            var $closeButton = $eTarget.findUp(".js-close-event");
            if ($closeButton.length === 0) return false;
            closePopup();
            return true;
        }

        function isBackClickAndAction($eTarget) {
            var $readCheckLayer = $eTarget.findUp(".js-read-check-layer");
            if ($readCheckLayer.length !== 0) return false;
            closePopup();
            return true;
        }
    }

    function keyupReadCheckPopup(e) {
        e.stopPropagation();

        if (isSearchInputAndAction(e)) return;

        function isSearchInputAndAction(e) {
            var $eTarget = $(e.target);
            var $searchInput = $eTarget.findUp(".project-search-input");
            var searchWord = $.trim($searchInput.val());
            if ($searchInput.length === 0) return false;
            if (KeyCheck.isKey(e, "ESC")) return false;
            readCheckPageData.SRCH_WORD = searchWord;
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                ListHelper.initPageData(readCheckPageData, $readCheckLayer.find(".participants-list"));
                drawReadCheckList($readCheckLayer.find(".team-job-invite-type-2").attr("data-code"));
            }, 200);
            return true;
        }
    }

})();