var Ajax = (function () {

    var returnJson = {};

    return {
        initData: initData,
        getData: getData,
        getOutData: getOutData,
        executeApi: executeApi,

        OPTION: {
            ALLOW_EXECUTE: 0, // 중복 실행 허용 && 중복 콜백 허용
            PREVENT_EXECUTE: 1, // 중복 실행 방지( = 첫번째 실행이 종료될때까지 방지)
            PREVENT_CALLBACK: 2,  // 중복 콜백 무시 ( = 마지막 콜백이 실행 )
        },
    };

    function initData() {
        returnJson = {};
    }

    function getData(apiKey) {
        if (apiKey === undefined) {
            return returnJson;
        } else {
            return returnJson[apiKey];
        }
    }

    function getOutData(apiKey, dataKey) {
        if (returnJson && returnJson[apiKey] && returnJson[apiKey].response && returnJson[apiKey].response[dataKey]) {
            return returnJson[apiKey].response[dataKey];
        } else {
            return "";
        }
    }

    function executeApi(apiKey, inputJson, successCallback, errorCallback) {

        inputJson = inputJson || {}

        var nowMilliSecond = Date.now();
        var packetOption;
        var asyncStatus = (inputJson.useSyncAjax === undefined ? true : Boolean(Often.null2Void(inputJson.useSyncAjax, true)))
        if (inputJson.packetOption === undefined) {
            packetOption = Ajax.OPTION.ALLOW_EXECUTE;
        } else {
            packetOption = inputJson.packetOption;
        }

        // 중복 실행 방지
        if (packetOption === Ajax.OPTION.PREVENT_EXECUTE &&
            returnJson[apiKey] && returnJson[apiKey].isExecute) {
            return;
        }

        if (!returnJson[apiKey]) {
            returnJson[apiKey] = {};
        }
        returnJson[apiKey].request = inputJson;

        var ajaxJson = {
            "_JSON_": encodeURIComponent(JSON.stringify($.extend({}, {
                USER_ID: _USER_ID,
                RGSN_DTTM: _RGSN_DTTM,
                USE_INTT_ID: LocalUtil.getLocalValue("ONLY_USER_SETTING", "USE_INTT_ID"),
            }, inputJson)))
        }

        var queryString = "";
        if ("" !== Often.null2Void(inputJson.MODE)) {
            queryString = "&mode=" + inputJson.MODE
        } else if ("" !== Often.null2Void(inputJson.GUBUN)) {
            queryString = "&gubun=" + inputJson.GUBUN
        }
        if ("" !== queryString) {
            queryString = "?" + queryString.slice(1, queryString.length);
        }

        return $.ajax({
            type: "POST",
            url: "/" + apiKey + ".jct" + queryString,
            data: ajaxJson,
            cache: true,
            async: asyncStatus,
            beforeSend: function () {
                returnJson[apiKey].isExecute = true;
                returnJson[apiKey].finalResMilliSecond = nowMilliSecond;
            },
            error: function (e) {
                console.error(e);
                returnJson[apiKey].isExecute = false;
            },
            success: function (res) {
                try {
                    if (packetOption === Ajax.OPTION.PREVENT_CALLBACK && !isFinalExecuteBySameApi()) {
                        Often.clog("중복콜백무시", apiKey);
                        return;
                    }

                    if (!res || !res['COMMON_HEAD']) {
                        (typeof errorCallback === 'function') && errorCallback(res);
                        return;
                    }

                    var commonHead = res['COMMON_HEAD'];
                    var isError = commonHead['ERROR'];
                    var errorCode = commonHead['CODE'];
                    var errorMsg = commonHead['MESSAGE'];

                    if (isError) {

                        var returnErrorMsg = i18next.t('front.alert.errorTryAgain');

                        //참여 권한이 없는 경우 || 권한이 없습니다.
                        if (errorCode === 'S0139' || errorCode === 'S0002') {
                            LocalUtil.removeLocal("SUB_PATH");
                            location.reload();
                            return;
                        }

                        if (errorCode === 'WCB010') {
                            Often.toast("error", i18next.t('front.alert.deletedPost'));
                            return;
                        }

                        if (errorCode === "S0029") {
                            (typeof errorCallback === 'function') && errorCallback(res);
                            return Often.toast("error", "업무 제목을 입력해주세요.");
                        }

                        if ("" !== errorMsg) {
                            returnErrorMsg += '\nERROR : ' + errorMsg;
                            "NO_ALERT" !== errorMsg && Often.toast("error", errorMsg);
                            (typeof errorCallback === 'function') && errorCallback(res);
                        }

                        if (Often.isServerModeByHost("DEV_TEST")) {
                            errorPopup({
                                response: res,
                                error: returnErrorMsg,
                                apiKey: apiKey,
                                inputJson: inputJson
                            });
                        }

                        if ("" !== errorCode) return;
                    }

                    returnJson[apiKey].response = res;
                    (typeof successCallback === 'function') && successCallback(returnJson[apiKey].response);
                } catch (e) {
                    console.error(e);
                } finally {
                    returnJson[apiKey].isExecute = false;
                }
            }
        });

        function isFinalExecuteBySameApi() {
            var lastRequestInputJson = $.extend({}, returnJson[apiKey].request);
            var currentRequestInputJson = $.extend({}, inputJson);
            skipData(["PG_PER_CNT", "FIL_STTS", "FIL_PRIORITY", "SRCH_WORD", "SEARCH_RECORD"]);
            return !((JSON.stringify(lastRequestInputJson) === JSON.stringify(currentRequestInputJson)) &&
                (returnJson[apiKey].finalResMilliSecond !== nowMilliSecond));

            /**
             * Note. 중복콜백 체크시 해당 keyArray 는 예외하고 진행한다.
             * Ex1. 전체업무 상태 필터를 빠른 속도로 OnOff 할때 INPUT 에서 FIL_STTS, FIL_PRIORITY 빼고 비교해야함
             * Ex2. 담당자 검색을 빠른 속도로 OnOff 할때 SRCH_WORD 빼고 비교해야함
             */
            function skipData(keyArray) {
                keyArray.forEach(function (key) {
                    lastRequestInputJson[key] = "";
                    currentRequestInputJson[key] = "";
                })
            }
        }
    }

    function errorPopup(message) {
        var errorMessage = message.apiKey + "/" +
            JSON.stringify(message.inputJson) + "/" +
            JSON.stringify(message.response);
        if (!Often.isServerModeByHost("ALL_TEST")) {
            console.error(errorMessage);
            return;
        }
        PopupDraw.drawConfirm({
            contents: {
                main: message.error
            },
            callback: {
                final: function ($popup) {
                    $popup.find(".cancel-event").remove();
                    var $errorCont = $("<div></div>").addClass("error-cont");
                    $errorCont.text(errorMessage);
                    $popup.find(".popup-cont").after($errorCont);
                }
            }
        });
    }
})();
