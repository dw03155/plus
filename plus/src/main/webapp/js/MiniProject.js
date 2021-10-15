var MiniProject = function () {

    var $miniProjectLayer;
    var searchPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
    };

    return {
        initProject: initProject,
        openProjectPage: openProjectPage,
        showSearchResult: showSearchResult,
    }

    function initProject(isBadgeUpdate) {
        $miniProjectLayer = $('#miniProject');
        $miniProjectLayer.scrollTop(0);
        AllProject.showList({MODE: AllProject.getProjectMode().MAIN, BADGE_UPDATE: isBadgeUpdate});
        $('.js-non-search-item').css('display', 'block')
        $('.js-search-item').css('display', 'none')
    }

    function showSearchResult(searchWord) {
        var $jsNonSearchItem = $('.js-non-search-item')
        var $jsSearchItem = $('.js-search-item')
        if (searchWord.trim().length === 0) {
            $jsNonSearchItem.css('display', 'block')
            $jsSearchItem.css('display', 'none')
            $('#miniSearchListTtl').text(i18next.t('front.searchResult.searchResult'))
            return;
        }
        ListHelper.initPageData(searchPageData);
        drawSearchResult(searchWord)
    }

    function drawSearchResult(searchWord) {
        if (searchPageData.NEXT_YN === "N") return;
        var $projectUl = searchWord ? $('#searchProjectListUl') : $('#projectListUl');
        $projectUl.empty();
        if (searchPageData.PG_NO === 1 && "" !== searchWord) {
            $('#miniSearchListTtl').text("'" + searchWord);
        } else {
            //pass
        }
        Ajax.executeApi(RestApi.GET.COLABO2_L105, $.extend({}, searchPageData, {
            SRCH_GB: "M",
            SRCH_WORD: searchWord.replace(/'/g, "''").replace(/%/g, "\\%"),
        }), function (dat) {
            $projectUl.empty();
            $projectUl.drawListHelper({
                pageData: searchPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["COLABO_REC"],
                noDataHtml: ListHelper.getNoDataHtml(),
                targetObj: {
                    focus: $("#miniSearchInput"),
                },
                callback: {
                    click: AllProject.clickProjectItems,
                    dblclick: AllProject.clickProjectItems,
                    item: AllProject.getProjectItems,
                    final: function () {
                        $('.js-non-search-item').css('display', 'none')
                        $('.js-search-item').css('display', 'block')
                    }
                }
            })
        })
    }

    function openProjectPage(projectSrno, postSrno, remarkSrno, isInit) {
        var w = screen.availWidth;
        var h = screen.availHeight;
        var left = screenLeft + (screen.availWidth - w) / 2;
        var top = screenTop + (screen.availHeight - h) / 2;
        var url = "";
        if (!projectSrno) {
            url = Often.getLocOrigin() + '/main.act';
        } else {
            url = Often.getLocOrigin() + '/main.act?detail/' + projectSrno;
        }
        Electron.openElectronProject(url, projectSrno, postSrno, remarkSrno, left, top, isInit);
    }
}();