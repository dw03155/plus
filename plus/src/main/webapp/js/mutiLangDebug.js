var mutiLangDebug = (function () {
    return {
        remove: remove,
        activate: activate,
    }

    function remove() {
        $("#mutiLangPopup").remove();
        $("#mutiLangButton").remove();
    }

    function activate() {
        var $mutiLangPopup = $('#mutiLangPopup');
        $("#mutiLangButton").off('click').on('click', function () {
            $mutiLangPopup.removeClass('d-none').draggable();
        });

        $mutiLangPopup.off('click').on('click', addClickEvent);
        $mutiLangPopup.find("#noLangCode").prop("checked", "checked");
        $('#searchCategory').val('KO_VAL'); // Default
        var resultHtml = $('#mutiLangResultLi').html();
        noResult("Please Enter Your Word To Search Language Code")

        $('#searchWord').keypress(function (e) {
            var searchWord = $('#searchWord').val();
            var key = e.which;
            if (key === 13) {
                if (searchWord === "") {
                    Often.toast('error', 'Type your word to search');
                    return;
                }
                $('#langCodeResult').empty();
                var inputData = {
                    "USER_ID": _USER_ID,
                    "RGSN_DTTM": _RGSN_DTTM,
                    "PG_NO": 1,
                    "PG_PER_CNT": 10,
                    "SORT_DESC": "",
                    "SRCH_WORD": searchWord,
                    "SRCH_GB": $('#searchCategory').val(),
                    "DEVICE_GB": "COM"
                }
                Ajax.executeApi(RestApi.GET.FLOW_LANG_PACK_R001, inputData, function (data) {
                    if (data.LANG_REC.length === 0) {
                        noResult("No Result Found");
                        return;
                    }
                    $.each(data.LANG_REC, function (index, value) {
                        var langCode = value.LANG_CODE
                        var shorttenLangCode = langCode.length > 25 ? langCode.substring(0, 25) + "..." : langCode;

                        var resultData = {
                            "code": shorttenLangCode,
                            "fullCode": langCode,
                            "korean": value.KO_VAL,
                            "english": value.EN_VAL
                        }
                        $('#langCodeResult').append(ListHelper.replaceJson(resultHtml, resultData));

                        $('#langCodeResult li').hover(function () {
                            $(this).css('background', '#eee')
                        }, function () {
                            $(this).css('background', '#fff')
                        })
                    })
                })
            }
        })

        $('*').on('click', function (event) {
            debugLangCode($(this));
        });
    }

    function noResult(txt) {
        var noResultHtml = $('#noLanguageResult').html();
        var resultData = {"txt": txt}
        $('#langCodeResult').append(ListHelper.replaceJson(noResultHtml, resultData));
    }

    function addClickEvent(e) {
        var $eTarget = $(e.target);
        var $mutiLangPopup = $('#mutiLangPopup');

        if (isSearchOption($eTarget)) return;
        if (isSearchResult($eTarget)) return;

        if (isCancel($eTarget)) return;
        if (isAddOrEdit($eTarget)) return;
        if (isApplyToServer($eTarget)) return;
        if (isReset($eTarget)) return;
        if (isOption($eTarget)) return;
        if (isDevOption($eTarget)) return;


        function isSearchOption($eTarget) {
            var $optionButton = $eTarget.findUp('.search-option');
            if ($optionButton.length === 0) return false;

            if ($optionButton.attr('data-code') === 'editLang') {
                $('#mutiLangDebug').removeClass('d-none');
                $('#mutiLangSearch').addClass('d-none');
                return true; //다른 클릭 이벤트를 탈 경우 CSS가 겹치는 게 있어서 리턴 시킴
            }

            $eTarget.findUp('.section-name-list').find('a').css('background', '#eee');
            $eTarget.findUp('a').css('background', '#999')
            $('#searchCategory').val($optionButton.attr('data-code'))
        }

        function isSearchResult($eTarget) {
            var $isSearchResultLi = $eTarget.findUp('.js-file-type-search-filter');
            if ($isSearchResultLi.length === 0) return false;
            if (debugLangCode($isSearchResultLi)) return false;

            var langCode = $isSearchResultLi.find('.full_lang_code').text();
            copy(langCode);
            Often.toast("success", "Copied to your clipboard");
        }

        function isCancel($eTarget) {
            var $cancelButton = $eTarget.findUp(".cancel")
            if ($cancelButton.length === 0) return false;
            $mutiLangPopup.addClass('d-none')
        }

        function isAddOrEdit($eTarget) {
            var $addOrEditButton = $eTarget.findUp(".addOrEdit")
            if ($addOrEditButton.length === 0) return false;
            var originalCode = $('#orgLangCode').text();
            var isUpdate = originalCode !== "";
            var langCode = $('#editLanguageCode').val();

            var inputData = {
                "RGSN_DTTM": "FLOW_t9dzeXF%2B2P5LROljqw8rAA%3D%3D",
                "LANG_CODE": langCode,
                "ORG_LANG_CODE": originalCode,
                "KO_VAL": $('#editKorean').val(),
                "EN_VAL": $('#editEnglish').val(),
                "CN_VAL": $('#editChinese').val(),
                "JP_VAL": $('#editJapanese').val(),
                "DEVICE_GB": "COM",
                "RGSR_ID": "sjsh1623",
                "LANG_STTS": isUpdate ? "U" : "",
            }

            Ajax.executeApi(RestApi.POST.FLOW_LANG_PACK_C001, inputData, function () {
                copy(langCode);
                resetInputs();
                Often.toast("success", "Edit Complete & Copied to your clipboard");
            })
        }

        function isApplyToServer($eTarget) {
            var $applyButton = $eTarget.findUp(".apply")
            if ($applyButton.length === 0) return false;
            var inputData = {
                "RGSR_ID": _USER_ID,
                "RGSN_DTTM": _RGSN_DTTM,
                "LANG_STTS": "C"
            };

            Ajax.executeApi(RestApi.POST.FLOW_LANG_PACK_C001, inputData, function () {
                Often.toast("success", "Patch Complete");
            })
        }

        function isReset($eTarget) {
            var $resetButton = $eTarget.findUp('.condition-reset')
            if ($resetButton.length === 0) return false;
            resetInputs();
        }

        function isOption($eTarget) {
            var $optionButton = $eTarget.findUp('.js-search-section')
            if ($optionButton.length === 0) return false

            if ($optionButton.attr('data-code') === 'search') {
                $('#mutiLangDebug').addClass('d-none');
                $('#mutiLangSearch').removeClass('d-none');
                return true;
            }
            resetInputs();
            $('#editLanguageCode').val($optionButton.attr('data-code')).focus()
        }

        function isDevOption($eTarget) {
            var $devRadio = $eTarget.findUp('.js-devlang-type');
            if ($devRadio.length === 0) return false;
            $devRadio.prev().prop("checked", "checked");
        }


        function resetInputs() {
            $('#mutiLangPopup').find('.email-input').val('');
            $('#editLanguageCode').attr('disabled', false);
            $('#orgLangCode').text('');
        }

        function copy(langCode) {
            if (langCode === "") return;
            var devMode = $mutiLangPopup.find('input[name="langDevMode"]:checked').val();
            var copyText = ""
            switch (devMode) {
                case 'jstl':
                    copyText = '<fmt:message key="' + langCode + '"/>';
                    break;
                case 'javascript' :
                    copyText = "i18next.t('" + langCode + "')";
                    break;
                case 'java' :
                    break;
                default :
                    copyText = langCode
            }

            var el = document.createElement('textarea');
            el.value = copyText;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }

    function debugLangCode($target) {
        var dataLangcode = Often.null2Void($target.attr('data-langcode'), "");
        if (!event) return; //Note. 이벤트를 추적하지 못하는 이슈가 있으니 변수로 넘기는게 명확합니다.
        if ((event.ctrlKey || event.metaKey) && dataLangcode !== "") {
            $('#mutiLangDebug').removeClass('d-none');
            $('#mutiLangSearch').addClass('d-none');

            event.preventDefault();
            event.stopPropagation();
            var korean = Often.null2Void($target.attr('data-korean'), "");
            var english = Often.null2Void($target.attr('data-engilsh'), "");
            var langCode = Often.null2Void($target.attr('data-langcode'), "");

            var $editLanguageCodeInput = $('#editLanguageCode');
            $editLanguageCodeInput.val(langCode);
            $('#orgLangCode').text(langCode);
            $('#editKorean').val(korean);
            $('#editEnglish').val(english);

            return true;
        }
        return false;
    }
})
();