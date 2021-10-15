var Tz = (function () {

    var KST = "Asia/Seoul";
    var timeFormat = "YYYYMMDDHHmmss"; //기준점

    return {
        momentTimeZone: momentTimeZone,
        momentConversion: momentConversion,
        roundMomentByMinutes: roundMomentByMinutes,
        convertMinToHourForLockMode: convertMinToHourForLockMode,
        isToday: isToday,
        isTimeExists: isTimeExists,
    }

    /**
     * TimeZone 반영 + 포맷
     * @param time {String} 변환할 source time ("" => 공백)
     * @param type {String} 변환되어야 하는 시간 타입 (다국어 코드 참고)
     * @param [mode] {String} input | fromNow
     *                      input : 사용자의 시간을 서울 시간으로 변환
     *                      fromNow : 사용자의 타임존에 맞게 몇 초 전.. 3분 전... 표현 /
     *                          ㄴ참고: https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/02-fromnow/
     *
     * @return result 변환된 시간 (값이 하나라도 없을때 현재 시간을 출력) | Relative Time
     * @description 참고: https://momentjs.com/
     */

    function momentTimeZone(time, type, mode) {
        if (Often.null2Void(time) === "") return "-";
        if (time.length > 14) time = time.substring(0, 14);
        if (type === "type8" && isAllDay(time)) return ""; //분일초가 000000인 경우 (=종일) time 빈값을 리턴함

        var currentTimezone = moment.tz.guess(); // 클라이언트 시스템의 공식 IANA timezone 명칭 사용
        var isInputMode = mode === "input"; //DB는 서울 시간을 기준으로함
        var isFromNowMode = mode === "fromNow"; // 현재 시간과의 차이를 구함

        // Input 모드일 경우에는 대한민국 기준 시간 포맷으로 변경한다
        var formatString = i18next.t('date.format.' + type, {lng: isInputMode ? 'ko' : ''});

        var sourceTimezone = isInputMode ? currentTimezone : KST;
        var targetTimezone = isInputMode ? KST : currentTimezone;
        var returnTime = adjustTimeFormat(time, sourceTimezone);
        var converted = moment.tz(returnTime, timeFormat, true, sourceTimezone);

        // moment.js를 사용하여 strict 모드로 time format 체크
        if (!converted.isValid()) return returnTime;
        var convertedTime = converted.tz(targetTimezone);
        if (Often.null2Void(type, "") === "") return convertedTime;

        // 예외사항 : 현재 시간 기준으로
        // if 하루가 되지 않은 알람, '..분 전' || '..시간 전' 출력
        // if 한국어일때 44초 전, '방금' 출력
        // Do not translate korean keyword "방금"
        if (isFromNowMode && moment().diff(convertedTime, 'second') < 44 &&
            Internationalization.getCurrentLanguage() === 'ko') return '방금';
        if (isFromNowMode && moment().diff(convertedTime, 'hours') < 22 &&
            moment().diff(convertedTime, 'days') === 0) return convertedTime.fromNow();
        return converted.tz(targetTimezone).format(formatString);
    }

    function isAllDay(dateTime) {
        return (dateTime.length === 14 && dateTime.substring(8, 14) === "000000");
    }

    /**
     * moment를 이용한 시간 출력 (주의: TimeZone Conversion을 하지 않습니다)
     * @param mode {String} current | currentInMilli | convertOnly
     *                      current : 현재 시간 (type이 없을때 "YYYYMMDDHHmmss" 포맷으로 출력")
     *                      currentInMilli : 현재 시간을 밀리 세컨 단위로 출력 ("YYYYMMDDHHmmssSSS")
     *                      convertOnly : time을 type에 맞게 변환
     *                      seoulCurrentTime : 서울 현재 시간 (DB 시간)
     * @param type {String} 변환되어야 하는 시간 타입 (다국어 코드 참고) || Optional
     * @param time {String} 변환할 source time ("" => 공백) || Optional
     * @return result 변환된 시간 (값이 하나라도 없을때 현재 시간을 출력)
     * @description 참고: https://momentjs.com/
     */
    function momentConversion(mode, type, time) {
        var formatString = !type ? "YYYYMMDDHHmmss" : i18next.t('date.format.' + type);

        switch (mode) {
            case "current":
                return moment().format(formatString);
            case "currentInMilli":
                return moment().format(formatString + "SSS");
            case "convertOnly" :
                if (time.length > 14) time = time.substring(0, 14);
                var adjustTime = moment(adjustTimeFormat(time), timeFormat)
                return !adjustTime.isValid() ? adjustTime : moment(adjustTime, timeFormat).format(formatString);
            case "seoulCurrentTime" :
                return moment().tz("Asia/Seoul").format(formatString);
            default :
                return "-";
        }
    }

    /**
     * 현재 시간을 duration 만큼 분을 반올림 한다
     * @param duration 반 올림할 수 (분 기준)
     */
    function roundMomentByMinutes(duration) {
        var currentTime = moment();
        var remainder = duration - (currentTime.minute() % duration);
        return moment(currentTime)
            .add(remainder, "minutes")
            .format("HH mm ss");
    }

    function adjustTimeFormat(time, sourceTimeZone) {
        var isTimeExist = Often.null2Void(time) === "";
        var isSourceTimeExist = Often.null2Void(sourceTimeZone) === "";

        if (typeof time === 'object') time = time.format(timeFormat);
        else if (isTimeExist && isSourceTimeExist) time = moment().format(timeFormat)
        else if (isTimeExist) time = moment.tz(sourceTimeZone).format(timeFormat);
        (12 === time.length) && (time = time + "00");
        (8 === time.length) && (time = time + "000000");
        time = (typeof time == "object" ? '' : time);
        return time;
    }

    /**
     * 분 -> 시간으로 변환 및 다국어 처리
     * 잠금 모드의 분 단위 수정을 위함
     * @param minutes 분 단위
     * @return 분 -> 시간으로 변환 후 다국어처리 한 String 반환
     */
    function convertMinToHourForLockMode(minutes) {
        if (minutes < 60) {
            return i18next.t("front.common.js-minute", {count: minutes});
        } else {
            var hours = minutes / 60;
            return i18next.t("front.common.js-hour", {count: hours});
        }
    }

    /**
     * 파라미터의 값이 오늘 또는 이번달 이번년도인지 판단
     * @param currentTime 현재 시간 (주의: 타임존 처리가 된 값 필요)
     * @param duration days | months | years <- 오늘 | 이번달 | 이번년도
     * @returns {boolean} Diff 결과를 boolean으로 반환
     */
    function isToday(currentTime, duration) {
        var todayMoment = moment(adjustTimeFormat(currentTime), "YYYYMMDD");
        var targetMoment = moment().format("YYYYMMDD");
        var momentDiff = todayMoment.diff(targetMoment, duration);
        return momentDiff === 0;
    }

    /**
     * 시간이 존재하는지 확인
     * @param time 시간 (시간은 8/12자리로 넘겨줘야 한다.)
     * @returns {boolean} 시간의 존재 여부
     */
    function isTimeExists(time) {
        var timeLength = time.length;
        return timeLength === 12 && time.substring(8) !== '0000';
    }

})();
