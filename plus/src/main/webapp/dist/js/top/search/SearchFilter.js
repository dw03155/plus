var SearchFilter = (function () {

    var checkingTimer;
    var isFilterChecking = false;

    return {
        getFilterJson: getFilterJson,
        getSearchWord: getSearchWord,
        getModeByAreaCode: getModeByAreaCode,

        initSearchMemory: initSearchMemory,
        initTongSearchMemory: initTongSearchMemory,

        initFilter: initFilter,
        addEventOnSearchFilter: addEventOnSearchFilter,

        drawSearchCount: drawSearchCount,
        checkCode: checkCode,

        setSearchFilter: setSearchFilter,

        controlOptionView: controlOptionView,
        setSearchFilterByData: setSearchFilterByData,

        isUnSearchableAndToast: isUnSearchableAndToast,
    }

    function getFilterJson($targetFilter, isSave, isScroll) {
        return new SearchData($targetFilter, isScroll).getFilterJson(isSave);
    }

    function getSearchWord(areaCode) {
        return new SearchData().getSearchWord(areaCode);
    }

    function getModeByAreaCode(areaCode) {
        return new SearchData().getMode(areaCode);
    }

    function getIsFilterTargetJsonByMode(mode) {
        return new SearchData().getIsFilterTargetJson(mode);;
    }

    function initSearchMemory() {
        SearchStore.init();
    }

    function initTongSearchMemory() {
        SearchStore.init(true);
    }

    function isUnSearchableAndToast(isSearchable) {
        if (isSearchable) return false
        Often.toast("error", i18next.t('front.common.SearchContext'));
        return true;
    }

    //Note. isAllowSubmitOnlyCallback = true => submit 되어야만 검색한다!
    function addEventOnSearchFilter($targetFilter, submitCallback, isAllowSubmitOnlyCallback) {

        $targetFilter.off("click").on("click", clickSearchFilterWithThrottling);
        $targetFilter.find(".js-register-name-search-filter").find("input").off("keyup").on("keyup", keydownEnterSearchResultByFilter);
        $targetFilter.find(".js-participant-name-search-filter").find("input").off("keyup").on("keyup", keydownEnterSearchResultByFilter);
        $targetFilter.find(".js-project-name-search-filter").find("input").off("keyup").on("keyup", keydownEnterSearchResultByFilter);

        function clickSearchFilterWithThrottling(e) {
            if (isFilterChecking) return;
            clickSearchFilter(e);
            isFilterChecking = true;
            checkingTimer = setTimeout(function () {
                isFilterChecking = false;
                clearTimeout(checkingTimer);
            }, 300);
        }

        function clickSearchFilter(e) {

            e.stopPropagation();
            e.preventDefault();

            var $eTarget = $(e.target);
            var $tmplType = $eTarget.findUp(".js-tmpl-type");
            var $fileType = $eTarget.findUp(".js-file-type");
            var $dateType = $eTarget.findUp(".js-date-type");
            var $periodType = $eTarget.findUp(".js-period-type")
            var $filterReset = $eTarget.findUp(".js-filter-reset");
            var $filterCancel = $eTarget.findUp(".js-filter-cancel");
            var $filterSearch = $eTarget.findUp(".js-filter-search");

            if ($filterCancel.length > 0) return $targetFilter.fadeOut(200);
            if ($filterReset.length > 0) return initSearchFilter($targetFilter, {init: true});
            if ($filterSearch.length > 0) return checkAndCallback();

            if ($periodType.length > 0) {
                var $periodTypeSearchFilter = $eTarget.findUp(".js-period-type-search-filter");
                var dataCode = Often.null2Void($periodType.attr("data-code"));
                $periodType.prev().prop("checked", true);
                $periodTypeSearchFilter.attr("data-code", dataCode);
                return;
            }

            if ($dateType.length > 0) {

                if ($eTarget.findUp(".flatpickr-calendar").length > 0) return;

                if ($dateType.find(".flatpickr-calendar").length > 0) {
                    $dateType.find(".flatpickr-calendar").remove();
                    return;
                }

                var $searchDateLayer = $eTarget.findUp(".js-search-pickr-layer");
                var $startDateType = $searchDateLayer.find(".js-start-flatpickr");
                var $endDateType = $searchDateLayer.find(".js-end-flatpickr");

                DatePicker.makeFlatPickr({
                    dateFormat: "YmdHi00",
                    startDate: $startDateType.find("input").val(),
                    endDate: $endDateType.find("input").val(),
                    inputObj: {
                        start: $startDateType,
                        end: $endDateType,
                    },
                    callback: {close: updateCallback}
                });

                function updateCallback($flatpickr, selectTime, isSameDate) {
                    if (isSameDate) return;
                    $searchDateLayer.attr("data-code", "select");
                    if (isAllowSubmitOnlyCallback) return setDateValue($flatpickr, selectTime);
                    checkAndCallback(function () {
                        setDateValue($flatpickr, selectTime);
                    })
                }

                return;
            }

            if ($(".loading-area:visible").length > 0) return Often.toast("info", i18next.t('front.common.wait'));

            if ($tmplType.length > 0) {
                if ($tmplType.prev().prop("checked")) return;
                var $tmplTypeSearchFilter = $tmplType.findUp(".js-tmpl-type-search-filter");
                if (isAllowSubmitOnlyCallback) return setCheckedData($tmplType, $tmplTypeSearchFilter);
                checkAndCallback(function () {
                    setCheckedData($tmplType, $tmplTypeSearchFilter);
                });
                return;
            }

            if ($fileType.length > 0) {
                if ($fileType.prev().prop("checked")) return;
                var $fileTypeSearchFilter = $fileType.findUp(".js-file-type-search-filter");
                if (isAllowSubmitOnlyCallback) return setCheckedData($fileType, $fileTypeSearchFilter);
                checkAndCallback(function () {
                    setCheckedData($fileType, $fileTypeSearchFilter);
                });
                return;
            }
        }

        function setCheckedData($type, $typeSearchFilter) {
            $type.prev().prop("checked", true);
            $typeSearchFilter.attr("data-code", Often.null2Void($type.attr("data-code")));
        }

        function checkAndCallback(checkCallback) {
            (typeof checkCallback === "function") && checkCallback();
            (typeof submitCallback === "function") && submitCallback();
        }

        function keydownEnterSearchResultByFilter(e) {
            if (KeyCheck.isKey(e, "ENTER")) checkAndCallback()
        }
    }

    function initSearchFilter($searchTarget, searchMemoryJson) {

        $searchTarget.find(".js-register-name-search-filter").find("input").val("");
        $searchTarget.find(".js-participant-name-search-filter").find("input").val("");
        $searchTarget.find(".js-project-name-search-filter").find("input").val("");

        //Note. check는 radio 방식이라 새로 그릴때 기존에 그려져 있는 것에 영향을 줌
        var $fileFilterUl = $searchTarget.find(".js-file-type-search-filter").find("ul");
        if ($fileFilterUl.is(":empty")) $fileFilterUl.html(SearchFilterHtml.getFileType("TOTAL"));
        else $fileFilterUl.find(".radio-input[data-code=0]").prop("checked", true);

        if ($searchTarget.parents(".allTaskLayer").length > 0) {
            $searchTarget.find(".js-period-type-search-filter").remove();
        } else {
            var $periodFilterUl = $searchTarget.find(".js-period-type-search-filter").find("ul");
            if ($periodFilterUl.is(":empty")) $periodFilterUl.html(SearchFilterHtml.getPeriodType(defaultPeriod));
            else $periodFilterUl.find(".radio-input[data-code=" + defaultPeriod + "]").prop("checked", true);
        }

        var $tmplFilterUl = $searchTarget.find(".js-tmpl-type-search-filter").find("ul");
        if ($tmplFilterUl.is(":empty")) $tmplFilterUl.html(SearchFilterHtml.getTmplType("TOTAL"));
        else $tmplFilterUl.find(".radio-input[data-code=0]").prop("checked", true);

        $searchTarget.find(".js-period-type-search-filter").attr("data-code", defaultPeriod);
        $searchTarget.find(".js-start-flatpickr").find("span").text(getStartTime(defaultPeriod, "type2"));
        $searchTarget.find(".js-start-flatpickr").find("input").val(getStartTime(defaultPeriod));
        $searchTarget.find(".js-end-flatpickr").find("span").text(getEndTime("type2"));
        $searchTarget.find(".js-end-flatpickr").find("input").val(getEndTime());

        //Note. 마지막 검색 필터로 로드함
        if (searchMemoryJson && Object.keys(searchMemoryJson).length > 0) {
            if (searchMemoryJson.init) {
                var $searchAreaCode = $searchTarget.closest("[data-search-area-code]");
                var areaCode = Often.null2Void($searchAreaCode.attr("data-search-area-code"));
                SearchStore.removeByAreaCode(areaCode);
                if (areaCode === searchAreaCode.IN_TONG) {
                    $searchAreaCode.find(".js-add-section").find("i").trigger("click");
                    $searchAreaCode.find(".js-search-del").find("i").trigger("click");
                }
            } else {
                setSearchFilterByData($searchTarget, searchMemoryJson);
            }
        }
    }

    function setSearchFilterByData($searchTarget, dataJson) {

        var registerName = Often.null2Void(dataJson.RGSR_NM);
        var participantsName = Often.null2Void(dataJson.RCVR_USER_NM);
        var projectName = Often.null2Void(dataJson.SEARCH_PROJECT_TITLE);
        var extensionName = Often.null2Void(dataJson.SEARCH_ETS, "0");
        var templateName = Often.null2Void(dataJson.TMPL_TYPE, "0");
        var periodName = Often.null2Void(dataJson.PERIOD_TYPE, defaultPeriod);
        var startDate = Often.null2Void(dataJson.START_DATE);
        var endDate = Often.null2Void(dataJson.END_DATE);

        if ("" !== registerName) $searchTarget.find(".js-register-name-search-filter").find("input").val(registerName);
        if ("" !== participantsName) $searchTarget.find(".js-participant-name-search-filter").find("input").val(participantsName);
        if ("" !== projectName) $searchTarget.find(".js-project-name-search-filter").find("input").val(projectName);
        $searchTarget.find(".js-file-type-search-filter").find("ul").find(".radio-input[data-code=" + extensionName + "]").prop("checked", true);
        $searchTarget.find(".js-tmpl-type-search-filter").find("ul").find(".radio-input[data-code=" + templateName + "]").prop("checked", true);
        $searchTarget.find(".js-period-type-search-filter").find("ul").find(".radio-input[data-code=" + periodName + "]").prop("checked", true);
        $searchTarget.find(".js-period-type-search-filter").attr("data-code", periodName);
        $searchTarget.find(".js-search-pickr-layer").attr("data-code", periodName);

        if (periodName === "select") {
            if ("" !== startDate) {
                $searchTarget.find(".js-start-flatpickr").find("span").text(Tz.momentConversion("convertOnly", "type2", startDate));
                $searchTarget.find(".js-start-flatpickr").find("input").val(Tz.momentConversion("convertOnly", "type17", startDate));
            } else {
                $searchTarget.find(".js-start-flatpickr").find("span").text(getStartTime(defaultPeriod, "type2"));
                $searchTarget.find(".js-start-flatpickr").find("input").val(getStartTime(defaultPeriod));
            }
            if ("" !== endDate) {
                $searchTarget.find(".js-end-flatpickr").find("span").text(Tz.momentConversion("convertOnly", "type2", endDate));
                $searchTarget.find(".js-end-flatpickr").find("input").val(Tz.momentConversion("convertOnly", "type17", endDate));
            } else {
                $searchTarget.find(".js-end-flatpickr").find("span").text(getEndTime("type2"));
                $searchTarget.find(".js-end-flatpickr").find("input").val(getEndTime());
            }
        } else {
            $searchTarget.find(".js-start-flatpickr").find("span").text(getStartTime(periodName, "type2"));
            $searchTarget.find(".js-start-flatpickr").find("input").val(getStartTime(periodName));
            $searchTarget.find(".js-end-flatpickr").find("span").text(getEndTime("type2"));
            $searchTarget.find(".js-end-flatpickr").find("input").val(getEndTime());
        }
    }

    function initFilter($targetFilter, mode, isMemory) {

        if (Often.null2Void($targetFilter) === "") return;

        //Note. 마지막 검색 필터 로드
        var areaCode = Often.null2Void($targetFilter.attr("data-search-area-code"));
        var searchMemoryJson = Often.null2Void(LocalUtil.getLocalJson(areaCode + "_SEARCH_MEMORY"));
        if (searchMemoryJson && Object.keys(searchMemoryJson).length > 1 && isMemory) {
            mode = searchMemoryJson.MODE;
            var searchWord = $.trim(searchMemoryJson.SEARCH_WORD);
            var isExistsWord = (searchWord !== "" && searchWord !== "-1");
            var isInTong = areaCode === searchAreaCode.IN_TONG;
            if (isInTong) {
                setSearchWordOnInputObj(isExistsWord ? searchWord : "");
            }
        }

        //Note. 통합검색의 경우에만 블루 탭 선택
        if (areaCode === searchAreaCode.IN_TONG) {
            SearchEvent.controlCategoryTab(mode);
        }

        //Note. 보여줘야할 검색필터 On-Off
        controlOptionView($targetFilter, mode);

        //Note. 필터세팅
        if (searchMemoryJson === "" && isMemory) {
            initSearchFilter($targetFilter);
        } else {
            initSearchFilter($targetFilter, searchMemoryJson);
        }

        //PlaceHolder 세팅
        $targetFilter.find(".js-project-name-search-filter").find("input").attr('placeholder',
            i18next.t('front.alert.enterWord', {val: Interpolation.addName('dictionary.project')}));

        $targetFilter.find(".js-register-name-search-filter").find("input").attr('placeholder',
            i18next.t('front.placeHolder.multipleInput', {val: Interpolation.addName('dictionary.author')}));

        $targetFilter.find(".js-participant-name-search-filter").find("input").attr('placeholder',
            i18next.t('front.placeHolder.multipleInput', {val: Interpolation.addName(mode === searchMode.TASK ? 'dictionary.manager' : 'dictionary.participant')}));
    }

    function controlOptionView($targetFilter, mode) {
        //Note. 보여줘야할 검색필터 On-Off
        var isFilterJson = getIsFilterTargetJsonByMode(mode);
        if ($targetFilter.parents("#detailLayer").length > 0) {
            isFilterJson["project-name"] = false;
        }
        if ($targetFilter.parents(".allFileLayer").length > 0) {
            isFilterJson["file-type"] = false;
        }

        for (var key in isFilterJson) {
            $targetFilter.find(".js-" + key + "-search-filter").css("display", isFilterJson[key] ? "block" : "none");
        }
    }

    //Note. $toFilter 에서 $fromFilter 로 조건을 옮긴다.
    function setSearchFilter($toFilter, $fromFilter, code, callback) {

        //Note. 검색화면에서 키워드 검색이라면 옮기지 않는다. (= 최초 검색 혹은 상세 검색은 옮김)
        if (Often.null2Void($toFilter) !== "" && !$toFilter.is(":visible")) return;

        var isExists$toFilter = Often.null2Void($toFilter) !== '';
        if (Often.null2Void($fromFilter) === '') return;
        var isFilterJson = getIsFilterTargetJsonByMode(code);
        if ($fromFilter.parents("#detailLayer").length > 0) {
            isFilterJson["project-name"] = false;
        }

        for (var key in isFilterJson) {
            $fromFilter.find(".js-" + key + "-search-filter").css("display", isFilterJson[key] ? "block" : "none");
        }

        if (isExists$toFilter) {
            for (var key in isFilterJson) {
                if (isFilterJson[key]) {
                    if (key.indexOf("period-type") > -1) moveFilterDateToRightFromTop(key);
                    else if (key.indexOf("-name") > -1) moveFilterValueToRightFromTop(key);
                    else if (key.indexOf("-type") > -1) moveFilterCheckToRightFromTop(key);
                }
            }
        }

        (typeof callback === "function") && callback();

        function moveFilterDateToRightFromTop(key) {

            var $toFilterChecked = $toFilter.find("[name=" + key + "]:checked");
            var dateType = Often.null2Void($.trim($toFilterChecked.next().attr("data-code")));

            var startValue, endValue;
            if (dateType === "select") {
                startValue = $toFilter.find(".js-start-flatpickr").find("input").val();
                endValue = $toFilter.find(".js-end-flatpickr").find("input").val();
            } else if (dateType === "") {
                startValue = Often.null2Void($fromFilter.find(".js-start-flatpickr").find("input").val(), getStartTime(defaultPeriod));
                endValue = Often.null2Void($fromFilter.find(".js-end-flatpickr").find("input").val(), getEndTime());
            } else {
                startValue = getStartTime(dateType);
                endValue = getEndTime();
            }
            $fromFilter.find(".js-search-pickr-layer").attr("data-code", dateType);
            setDateValue($fromFilter.find(".js-start-flatpickr"), startValue);
            setDateValue($fromFilter.find(".js-end-flatpickr"), endValue);
        }

        function moveFilterValueToRightFromTop(key) {
            var value = Often.null2Void($.trim($toFilter.find(".js-" + key + "-search-filter").find("input").val()));
            $fromFilter.find(".js-" + key + "-search-filter").find("input").val(value);
        }

        function moveFilterCheckToRightFromTop(key) {
            var $toFilterChecked = $toFilter.find("[name=" + key + "]:checked");
            var tmplType = Often.null2Void($toFilterChecked.next().attr("data-code"));
            $fromFilter.find(".js-" + key + "-search-filter").attr('data-code', tmplType);

            var tmplDataCode = Often.null2Void($toFilterChecked.attr("data-code"), "total");
            $fromFilter.find("[name=" + key + "][data-code=" + tmplDataCode + "]").prop("checked", true);
            $toFilterChecked.prop("checked", true);
        }
    }

    function drawSearchCount($target, count) {
        var strCount = (Number(count) >= 100 ? "99 +" : count);
        $target.text(strCount).css("display", Number(strCount) === 0 ? "none" : "inline-block");
    }

    function setSearchWordOnInputObj(searchWord) {
        if ("" === searchWord) {
            $("#allPostsSearchInput").val(searchWord);
            $("#projectSearchInput").val(searchWord);
            $("#detailLayer").find(".js-result-input-area").find("input").val(searchWord);
            $(".js-task-search-input").val(searchWord);
            $(".js-file-search-input").val(searchWord);
        } else {
            //통합검색 외에는 검색어 기록까지 가져오진 않는다.
        }
        $("#searchPopupInput").val(searchWord);
        SearchEvent.controlSearchDelIcon(searchWord);
    }

    function setDateValue($tartObject, value, callback) {
        $tartObject.find("span").text(Tz.momentConversion("convertOnly", "type2", value));
        $tartObject.find("input").val(value);
        (typeof callback === "function") && callback();
    }

    function checkCode(code) {
        return ((Often.null2Void(code, "-1") === "-1") ? searchMode.TOTAL : code);
    }

})()