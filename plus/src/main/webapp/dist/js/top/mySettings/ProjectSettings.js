var ProjectSettings = (function () {

    var $projectSettingsLayer;

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
    }

    function init() {
        $projectSettingsLayer = $("#projectSettingsLayer");
    }

    function openPopupLayer() {
        getProjectSetting();
        $("#langSetting").val(Often.null2Void(Often.getCookie("FLOW_LANG"), "ko"));
        $projectSettingsLayer.removeClass('d-none').addClass('d-block');
        addEvent();
    }

    function closePopupLayer() {
        init();
        $projectSettingsLayer.removeClass('d-block').addClass('d-none');
    }

    function addEvent() {
        $("#randomColorSetting").off("click").on("click", clickRandomColorSetting);
        $("#whiteColorSetting").off("click").on("click", clickWriteColorSetting);
        $("#useFavoritesSetting").off("click").on("click", clickUseFavoritesSetting);
        $("#notUseFavoritesSetting").off("click").on("click", clickNotUseFavoritesSetting);
        //$("#timezoneSetting").off("change").on("change", changeTimezone);
        $("#langSetting").off("change").on("change", changeLanguage);
        $("#resetBtn").off("click").on("click", clickResetBtn);
    }

    function getProjectSetting() {
        Ajax.executeApi(RestApi.GET.COLABO2_SET_R101, "", makeProjectSettingsLayer);
    }

    function makeProjectSettingsLayer(dat) {
        var isFavorites = Often.null2Void(dat.IMPT_USE_YN, "N") === "Y";
        var isProjectColor = Often.null2Void(dat.RANDOM_COLOR_YN, "N") === "Y";

        $(isFavorites ? "#useFavoritesSetting" : "#notUseFavoritesSetting").attr("class", "").attr("class", "my-check-2-1");
        $(isProjectColor ? "#randomColorSetting" : "#whiteColorSetting").attr("class", "").attr("class", "my-check-2-1");
    }

    function clickRandomColorSetting() {
        if ($(this).hasClass("my-check-2")) {
            $(this).attr("class", "").attr("class", "my-check-2-1");
            $("#whiteColorSetting").attr("class", "").attr("class", "my-check-2");
            saveProjectColorSetting();
        }
    }

    function clickWriteColorSetting() {
        if ($(this).hasClass("my-check-2")) {
            $(this).attr("class", "").attr("class", "my-check-2-1");
            $("#randomColorSetting").attr("class", "").attr("class", "my-check-2");
            saveProjectColorSetting();
        }
    }

    function clickUseFavoritesSetting() {
        if ($(this).hasClass("my-check-2")) {
            $(this).attr("class", "").attr("class", "my-check-2-1");
            $("#notUseFavoritesSetting").attr("class", "").attr("class", "my-check-2");
            saveFavoritesSetting();
        }
    }

    function clickNotUseFavoritesSetting() {
        if ($(this).hasClass("my-check-2")) {
            $(this).attr("class", "").attr("class", "my-check-2-1");
            $("#useFavoritesSetting").attr("class", "").attr("class", "my-check-2");
            saveFavoritesSetting();
        }
    }

    function clickResetBtn() {
        PopupDraw.drawConfirm({
            contents: {main: Often.c18n('DFA568', "프로젝트에 표기한 모든 별표 표기를 초기화합니다.\n(복구 되지 않습니다)")},
            callback: {submit: resetFavoritesProject}
        })
    }

    function resetFavoritesProject() {
        Ajax.executeApi(RestApi.PUT.COLABO_FLD_ITEM_U002, {
            COLABO_FLD_KIND: "1",
            COLABO_FLD_SRNO: "3",
        }, function () {
            AllProject.showList();
        })
    }

    function saveProjectColorSetting() {
        var settingData = {
            RANDOM_COLOR_YN: $("#randomColorSetting").hasClass("my-check-2-1") ? "Y" : "N",
        }

        Ajax.executeApi(RestApi.PUT.COLABO2_SET_U101, settingData, function () {
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}));
        });
    }

    function saveFavoritesSetting() {
        var imptUseYn = $("#useFavoritesSetting").hasClass("my-check-2-1") ? "Y" : "N";
        var settingData = {
            IMPT_USE_YN: imptUseYn,
        }

        Ajax.executeApi(RestApi.PUT.COLABO2_USER_SET_U003, settingData, function () {
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}));
            LocalUtil.setLocalValue("ONLY_USER_SETTING", "IMPT_USE_YN", imptUseYn)
            AllProject.showList();
        });
    }

    // 페이지 언어 변경
    function changeLanguage(e) {
        var $langSetting = $(e.currentTarget);
        Internationalization.changeLangTemporarily($langSetting.val(), function () {
            PopupDraw.drawConfirm({
                contents: {main: i18next.t('front.alert.pageRestart')},
                callback: {
                    submit: submitLanguage,
                    close: cancelLanguage,
                }
            })
        })

        function submitLanguage() {
            Often.setCookie("FLOW_LANG", $langSetting.val(), 30 * 12 * 10);
            location.href = "/main.act";
        }

        function cancelLanguage() {
            $langSetting.val(Often.null2Void(Often.getCookie("FLOW_LANG"), "ko"));
            Internationalization.changeLangTemporarily(Internationalization.getCurrentLanguage());
        }
    }
})()