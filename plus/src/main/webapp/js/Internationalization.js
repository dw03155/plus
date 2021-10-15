var Internationalization = (function () {

    return {
        initSetting: initSetting,
        initDatePicker: initDatePicker,
        languageCodeDebug: languageCodeDebug,
        getCurrentLanguage: getCurrentLanguage,
        setMomentLocale: setMomentLocale,
        changeLangTemporarily: changeLangTemporarily,
    }

    function initSetting(callback) {
        i18next.use(i18nextHttpBackend).init({
            lng: getCurrentLanguage(),
            debug: Often.isServerModeByHost("DEV_TEST"),
            fallbackLng: 'ko',
            cleanCode: true,
            interpolation: {
                format: function (value, format, lng) {
                    if (format === 'lowerCase') return Interpolation.validateI18nextCode(value);
                    if (format === 'koreanPrefixEL') return Interpolation.koreanPrefix(value, "을", "를");
                    if (format === 'koreanPrefixIG') return Interpolation.koreanPrefix(value, "이", "가");
                    if (format === 'pastTense') return Interpolation.getPastTense(value);
                    if (format === 'name') return Interpolation.addName(value);
                    if (value instanceof Date) return moment(value).format(format);
                    return value;
                }
            },
            backend: {
                loadPath: '/js/collabo/messageV2/message_{{lng}}.json',
            },
        }).then(function () {
            preI18next();
            setMomentLocale();
            callback();
        }).catch(function (error) {
            if (error && Often.isServerModeByHost("DEV_TEST")) {
                // 에러 처리 및 개발 전용 로그
                console.log("다국어에서 에러가 발생했습니다")
            }
            callback();
        });
    }

    // Date Picker Plugin Localization
    // i18next 처리 불가
    function initDatePicker() {
        getCurrentLanguage() === "en" ? flatpickr.localize(flatpickr.l10ns.en) : flatpickr.localize(flatpickr.l10ns.ko);
    }

    function changeLangTemporarily(language, callback) {
        i18next.changeLanguage(language).then(callback);
    }

    function languageCodeDebug() {
        // 다국어 코드 출력
        if (Often.isFunc("DEBUG_LANG_CODE")) {
            Often.setCookie('FLOW_LANG', 'debug', 30 * 12 * 10);
            mutiLangDebug.activate();
        } else {
            mutiLangDebug.remove();
        }
    }

    function getCurrentLanguage() {
        var currentLang = Often.null2Void(Often.getCookie("FLOW_LANG"), "ko");
        return currentLang === "debug" ? "en" : currentLang;
    }

    function setMomentLocale() {
        moment.locale('ko', {
            relativeTime: {
                h: '%d시간',
            }
        });

        moment.locale(getCurrentLanguage());
    }

    function preI18next() {
        $('#priorityButton').append(i18next.t('front.common.add', {val: '$t(front.common.priority)'}));
        $('#videoButton').append(i18next.t('front.common.add', {val: '$t(front.common.videoConference)'}));
        $('#addEmail span').text(i18next.t('front.common.add', {val: '$t(dictionary.email)'}));

    }
})();

var Interpolation = (function () {
    return {
        koreanPrefix: koreanPrefix,
        addName: addName,
        breakLine: breakLine,
        getPastTense: getPastTense,
        validateI18nextCode: validateI18nextCode,
    }

    /**
     * 한글 단어 뒤의 종성을 붙혀 출력
     * @param 다국어 처리 된 값
     * @param firstValue (첫번째 종성)
     * @param secondValue (두번쨰 종성)
     * @description This is for Korean Only
     * @returns {String} 단어 + 종성
     */
    function koreanPrefix(word, firstValue, secondValue) {
        word = validateI18nextCode(word)
        var lastChar = word.charCodeAt(word.length - 1);

        // 한국어가 아닐경우 반환
        if (lastChar < 0xAC00 || lastChar > 0xD7A3) return word;
        var jongSung = (lastChar - 0xAC00) % 28 > 0 ? firstValue : secondValue; // 종성 판단
        return word + jongSung;
    }

    /**
     * 다국어 단어 뒤 ... 명 처리 (ex- 관리자 + 명)
     * @description i18next interpolation으로 가능하지만 확장성이 떨어져 Function으로 변경
     *              또한 불필요한 다국어 코드를 줄이기 위함
     * @param i18nextCode 다국어 코드 (Interpolation이 없는 dictionary Code)
     * @returns 다국어 처리 된 단어와 + 명 처리 한 결과 값
     */
    function addName(i18nextCode) {
        var word = i18next.t(i18nextCode);
        return i18next.t('front.common.name', {val: word})
    }

    /**
     * 개행이 Paragraph (<p> <\p> Tag) 내에서 이루어 질때 변환
     * @returns \n => <br> 변경
     */
    function breakLine(word) {
        return word.replace(/\n/g, '<br/>');
    }


    /**
     * 현재형을 과거 형으로 변경 하여 처리
     * @param verb 영어 동사 (다국어 처리 된 영어 동사)
     * @returns 현재형 -> 과거형 동사
     * @description This is for English Only
     */
    function getPastTense(verb) {
        verb = validateI18nextCode(verb);
        if (Internationalization.getCurrentLanguage() !== "en") return verb;

        // Past tense Exception
        var exceptions = {
            "are": "were",
            "have": "had",
            "is": "was",
            "apply": "applied"
        }
        verb = validateI18nextCode(verb);

        if (exceptions[verb]) {
            return exceptions[verb];
        }
        if ((/e$/i).test(verb)) {
            return verb + 'd';
        }
        if ((/[aeiou]c$/i).test(verb)) {
            return verb + 'ked';
        }
        // for american english only
        if ((/el$/i).test(verb)) {
            return verb + 'ed';
        }
        if ((/[aeio][aeiou][dlmnprst]$/).test(verb)) {
            return verb + 'ed';
        }

        /* Edit After test for performance
        if ((/[aeiou][bdglmnprst]$/i).test(verb)) {
            return verb.replace(/(.+[aeiou])([bdglmprst])/, '$1$2$2ed');
        }
        */
        return verb + 'ed';
    }


    function validateI18nextCode(code) {
        code = Often.null2Void(code, "");
        if (code.indexOf('$t(') > -1) {
            var i18nextCode =  code.substring(3, code.length - 1);
            return i18next.t(i18nextCode).toLowerCase();
        }
        else return code;
    }
})();

var LinkControl = (function () {
    return {
        controlZendesk: controlZendesk,
    }

    /**
     * Zendesk 기능 아이디로 모든 "?"제거
     * Todo: 영문일 경우 영문으로 나올 수 있게 처리 해야함
     */
    function controlZendesk() {
        if(Often.isFunc('ZENDESK_URL_CONTROL')) $(".icons-help").remove();
    }
})();

/**
 * @description 해당 Function 은 일시적인 사용을 위해 추후에 Deprecate 할 Function 들 입니다.
 */
var TemporaryTranslation = (function () {
    return {
        koreanHolidaysFilter: koreanHolidaysFilter
    }

    /**
     * 공휴일을 한글 -> 영어로 변환 (추후에 클라우드만 RSS 적용 예정)
     * @param holiday 한국의 "한글" 공휴일
     * @returns {String} 사용자의 언어에 따른 공휴일
     */
    function koreanHolidaysFilter (holiday) {
        var isKorean = Internationalization.getCurrentLanguage() === "ko";
        if(isKorean) return holiday;

        var koreanHolidays = getKoreanHolidaysInEnglish();
        var isHolidayExist = koreanHolidays.hasOwnProperty(holiday);
        if(!isHolidayExist) return holiday;
        return koreanHolidays[holiday];
    }

    /*
    한국 공유일의 영문 JSON
     */
    function getKoreanHolidaysInEnglish () {
        return {
            "신정" : "New Year's Day",
            "3·1절" : "Independence Day",
            "식목일" : "Arbor Day",
            "제헌절" : "Constitution Day",
            "추석" : "Thanksgiving Day",
            "개천절" : "National Foundation Day",
            "한글날" : "Hangul Proclamation Day",
            "국제 연합일" : "United Nations Day",
            "성탄절" : "Christmas",
            "대체 휴일" : "Substitute Holiday"
        }
    }
})();
