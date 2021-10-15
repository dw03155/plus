var OpenProject = (function () {

    var openProjectPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: 'Y',
    };

    var $openProjectSearchInput;
    var $categoryListUl = '';
    var $categoryNameDiv = '';
    var $projectTotalCountDiv = '';
    var $projectListUl = '';

    var $scrollDivId = '';
    var $LeftArrowButtonId = '';
    var $RightArrowButtonId = '';
    var $moveTopButtonId = '';

    var selectedCategory = ''
    var searchWord = '';

    var categoryWidth = 0;
    var categoryTotalWidth = 0;
    var categoryCursorNowPosition = 0;
    var categoryCursorMaxPosition = 0;

    return {
        getOpenCategory: getOpenCategory,
        openLayer: openLayer
    }

    function getOpenCategory(firstCallback, doneCallback) {
        (typeof firstCallback === "function") && firstCallback();
        Ajax.executeApi(RestApi.GET.FLOW_PUB_CAT_R001, {}, function (dat) {
            (typeof doneCallback === "function") && doneCallback(dat.CATG_REC);
        })
    }

    function openLayer() {
        openProjectHtmlSetting();
        openProjectSetting();
    }

    function openProjectHtmlSetting() {
        setHtmlId();
    }

    function setHtmlId() {
        $openProjectSearchInput = $('#openProjectSearchInput');
        $categoryListUl = $('#openProjectCategory');
        $categoryNameDiv = $('#openProjectCategoryName');
        $projectListUl = $('#openProjectList');
        $projectTotalCountDiv = $('#openProjectTotalCount');
        $scrollDivId = $('#mainContent');
        $moveTopButtonId = $('#moveTopButton');
        $LeftArrowButtonId = $('#leftArrowButton');
        $RightArrowButtonId = $('#rightArrowButton');
    }

    function openProjectSetting() {
        setPageData();
        addSearchEvent();
        setCategoryList();
        setProjectList();
    }

    function setPageData() {
        ListHelper.initPageData(openProjectPageData, $projectListUl);
        initSearchData();
    }

    function addSearchEvent() {
        $openProjectSearchInput.off("keyup").on("keyup", function (e) {
            if (KeyCheck.isKey(e, "ENTER")) {
                searchOpenProjectList();
            }
        })
    }

    function setCategoryList() {
        drawCategoryList();
        setEventCategoryList();
    }

    function drawCategoryList() {
        Ajax.executeApi(RestApi.GET.FLOW_PUB_CAT_R001, {}, function (responseCategoryData) {
            var returnHtml = '';
            var getDataArr = responseCategoryData['CATG_REC'];
            var firstHtml = $('#categoryFirstItem').html();
            var baseHtml = $('#categoryItem').html();
            $.each(getDataArr, function (index, item) {
                if (index === 0) {
                    returnHtml += firstHtml
                }
                returnHtml += ListHelper.replaceJson(baseHtml, {
                    'category-srno': item.CNTS_CATG_SRNO,
                    'category-name': item.CNTS_CATG_NM
                })
            });
            appendCategoryListHtml(returnHtml);
        });
    }

    function appendCategoryListHtml(getCategoryListHtml) {
        categoryTotalWidth = 0;
        $categoryListUl.empty();
        $categoryListUl.append(getCategoryListHtml);
        $categoryListUl.find('li').each(function(index, element) {
            categoryTotalWidth += $(element).width();
        });

        setVisibleCategoryArrowButton();

        $(window).resize(function () {
            categoryWidth = $categoryListUl.width();
            setVisibleCategoryArrowButton();

            categoryCursorMaxPosition = Math.abs(Math.ceil((categoryTotalWidth - categoryWidth) / (categoryTotalWidth/ $categoryListUl.find('li').length)));
        })
    }

    function setVisibleCategoryArrowButton() {
        if(categoryTotalWidth > $categoryListUl.width() - Math.abs(Number.parseInt($categoryListUl.css('left')))){                
            $LeftArrowButtonId.hide();
            $RightArrowButtonId.show();

            if(categoryCursorNowPosition > 0) $LeftArrowButtonId.show();
        } else {                
            $LeftArrowButtonId.hide();
            $RightArrowButtonId.hide();
            
            if(categoryCursorNowPosition > 0) $LeftArrowButtonId.show();
        }
    }

    function setEventCategoryList() {
        clickedCategoryItem();
        clickedCategoryArrowButton();
    }

    function clickedCategoryItem() {
        $categoryListUl.off('click').on('click', function (e) {
            var $eTarget = $(e.target);
            var $clickedCategoryItem = $eTarget.findUp(".category-item");
            if ($clickedCategoryItem.length === 0) {
                $LeftArrowButtonId.hide();
                $RightArrowButtonId.hide();
                return;
            }
            setPageData();
            selectedCategory = ($clickedCategoryItem.prop('value') === 0 ? '' : $clickedCategoryItem.prop('value'));
            drawProjectList();
            changeCategoryStatus($clickedCategoryItem);
        });
    }

    function initSearchData() {
        $openProjectSearchInput.val('');
        searchWord = '';
        selectedCategory = '';
    }

    function clickedCategoryArrowButton() {
        categoryWidth = $categoryListUl.width();
        if (categoryWidth > 900) {
            $LeftArrowButtonId.off('click').on('click', function () {
                
                if (categoryCursorNowPosition <= 0) return;
                categoryCursorNowPosition--;
                if(categoryCursorNowPosition === 0 ) $LeftArrowButtonId.hide();
                $categoryListUl.css('left', categoryCursorNowPosition * -300);
                $RightArrowButtonId.show();
            });
            $RightArrowButtonId.off('click').on('click', function () {

                categoryCursorMaxPosition = Math.abs(Math.ceil((categoryTotalWidth - categoryWidth) / (categoryTotalWidth/ $categoryListUl.find('li').length)));                
                if (categoryCursorNowPosition >= categoryCursorMaxPosition) return;
                if(categoryCursorNowPosition === categoryCursorMaxPosition ) $RightArrowButtonId.hide();
                categoryCursorNowPosition++;
                $categoryListUl.css('left', categoryCursorNowPosition * -300)
                $LeftArrowButtonId.show();
            });
        }
    }

    function changeCategoryStatus($clickedCategoryItem) {
        $categoryListUl.find('.active').removeClass('active');
        $clickedCategoryItem.children('button').addClass('active');
    }

    function setProjectList() {
        drawProjectList();
    }

    function searchOpenProjectList() {
        ListHelper.initPageData(openProjectPageData);
        searchWord = $.trim($openProjectSearchInput.val());
        drawProjectList();
    }

    function drawProjectList() {
        var isSearchMode = '' !== searchWord;
        Ajax.executeApi(RestApi.GET.FLOW_PUB_PRJ_R001, $.extend({}, openProjectPageData, {
            'CNTS_CATG_SRNO': selectedCategory,
            'SRCH_WORD': searchWord,
        }), function (responseData) {
            if (openProjectPageData.PG_NO === 1) setProjectNameAndCount(Often.null2Void(responseData["TOT_CNT"], ""));
            $projectListUl.drawListHelper({
                pageData: openProjectPageData,
                nextYn: responseData["NEXT_YN"],
                records: responseData["PRJ_REC"],
                noDataHtml: ListHelper.getNoDataHtml(isSearchMode ? 'OPEN_SEARCH' : 'OPEN_PROJECT_TAB'),
                targetObj: {
                    scroll: $scrollDivId,
                },
                callback: {
                    item: makeProjectListItem,
                    scroll: drawProjectList,
                    click: setEventProjectList,
                    final: function () {
                    }
                }
            })
        });
    }

    function makeProjectListItem(responseData) {
        var baseHtml = $('#projectItem').html();
        var returnHtml = '';
        $.each(responseData, function (index, item) {
            returnHtml += ListHelper.replaceJson(baseHtml, {
                'project-srno': Often.null2Void(item.COLABO_SRNO, ""),
                'project-name': TagUtil.escapeHtml(Often.null2Void(item.TTL, "")),
                'project-participant': Often.null2Void(item.SENDIENCE_CNT, ""),
                'project-manager': i18next.t('dictionary.administrator'),
                'project-manager-name': Often.null2Void(item.ADMIN_NM, ""),
                'CNTN': TagUtil.escapeHtml(item.CNTN),
                'join-display': ListHelper.setDisplay(item.JOIN_YN === "Y", "inline-block"),
                'project-info': JSON.stringify(item).replace(/\'/ig, "#&39;").replace(/"/ig, "'"), //JSON parse 홑따옴표 replace 이슈로 특정 문자로 치환
            })
        });
        return returnHtml;
    }

    function setProjectNameAndCount(projectTotalCount) {
        drawProjectCount(projectTotalCount);
    }

    function drawProjectCount(projectTotalCount) {
        $categoryNameDiv.text($categoryListUl.find('.active').text() + ' ' + i18next.t('front.common.publicProject'));
        $projectTotalCountDiv.text(projectTotalCount);
    }

    function setEventProjectList(e) {
        var $eTarget = $(e.target);
        var $clickedProjectItem = $eTarget.findUp('.project-item');
        if ($clickedProjectItem.length === 0) return;
        var projectInfoJson = getProjectInfoByObj();
        projectInfoJson.PASS_YN = Often.null2Void($clickedProjectItem.attr("PASS_YN"), projectInfoJson.JOIN_YN);
        projectInfoJson.PRFL_PHTG = projectInfoJson.ADMIN_PRFL_PHTG;
        projectInfoJson.FLNM = projectInfoJson.ADMIN_NM;
        InvitePopup.makeInvitePopup(projectInfoJson);

        //openClickedProject($clickedProjectItem);

        function getProjectInfoByObj() {
            try {
                //특정문자 홑따옴표로 replace 후 JSON parse (좋은 방법은 아닌거 같긴함..)
                return JSON.parse($clickedProjectItem.attr("data-project-info").replace(/'/ig, '"').replace(/#&39;/ig, "'"));
            } catch (e) {
                return {};
            }
        }
    }

})()
