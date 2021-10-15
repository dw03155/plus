var DatePicker = (function () {

    var $targetLayer, $startFlatPickr, $endFlatPicker;

    return {
        makeFlatPickr: makeFlatPickr,
        checkOverDate: checkOverDate,
    }

    /**
     * Note. 갖추어야할 형태
     * <div class="js-pickr-layer js-start-flatpickr">
     *     <span></span>
     *     <input type="hidden">
     *     <label class="filter-date-label">
     *         <i class="icon-date"></i>
     *     </label>
     * </div>
     */

    function makeFlatPickr(options) {
        set$element(options);
        if (isEmptyInput() || isActivePicker()) return false;
        DatePickerEvent.createDateFickr(options);
    }

    function set$element(options) {
        $targetLayer = $(event.target).findUp(".js-pickr-layer");
        $startFlatPickr = Often.null2Void(options.inputObj && options.inputObj.start);
        $endFlatPicker = Often.null2Void(options.inputObj && options.inputObj.end);
    }

    function checkOverDate($obj, date) {
        var isStartDate = $obj.findUp(".js-start-flatpickr").length > 0;
        var nowDate = Tz.momentConversion("convertOnly", "type19", moment());
        var isOver = (nowDate > date);
        if (isOver && !isStartDate) {
            $obj.addClass("deadline-exceeded");
        } else {
            $obj.removeClass("deadline-exceeded");
        }
    }

    function isActivePicker() {
        return $targetLayer.hasClass("active");
    }

    function isEmptyInput() {
        return (!$startFlatPickr || $startFlatPickr.length === 0) &&
            (!$endFlatPicker || $endFlatPicker.length === 0);
    }
})();

var DatePickerEvent = (function () {

    var $targetLayer, $cloneDatePicker, $startFlatPickr, $endFlatPickr, $calendarContainer;
    var datePickerJson;
    return {
        createDateFickr: createDateFickr,
    }

    function createDateFickr(options) {
        init(options);

        var $flatpickr = (datePickerJson.boolean.isStartDate ? $startFlatPickr : $endFlatPickr);
        flatpickr($flatpickr, $.extend({}, {
            onReady: onReady,
            onOpen: onOpen,
            onValueUpdate: onValueUpdate,
            onClose: onClose,
        }, getCalendarOption($targetLayer), options)).open();
        initKeyDownEvent();
    }

    function init(options) {
        set$element(options);
        datePickerJson = setJsonData(options);
        Internationalization.initDatePicker();
    }

    function set$element(options) {
        $targetLayer = $(event.target).findUp(".js-pickr-layer");
        $cloneDatePicker = $targetLayer.clone();
        $startFlatPickr = Often.null2Void(options.inputObj && options.inputObj.start);
        $endFlatPickr = Often.null2Void(options.inputObj && options.inputObj.end);
    }

    function setJsonData(options) {
        var isStartDate = $targetLayer.hasClass("js-start-flatpickr");
        var startDate = Often.null2Void(options.startDate, 0);
        var endDate = Often.null2Void(options.endDate, 0);
        return {
            option: {
                dateVer: (options.dateVer ? options.dateVer : false),
                allDay: (options.allDay ? options.allDay : false),
                rescheduling: (options.rescheduling ? options.rescheduling : false),
                enableTime: (options.enableTime ? options.enableTime : false),
            },
            data: {
                startDate: startDate,
                endDate: endDate,
            },
            callback: {
                closeCallback: (options.callback && options.callback.close),
                removeCallback: (options.callback && options.callback.remove),
            },
            boolean: {
                isStartDate: isStartDate,
                isNoneDate: (Tz.momentTimeZone(isStartDate ? startDate : endDate, undefined) === "-"),
                isFullDate: (isStartDate ? startDate.length > 8 : endDate.length > 8),
            },
        }
    }

    function getCalendarOption($targetLayer) {
        // $targetLayer가 카드형 포스트에 플랫픽커일 때는 스크롤시 해당 타겟을 따라가기 위해 타겟에 캘린더를 생성했습니다.
        var isCardLayerTarget = $targetLayer.findUp("#detailUl").hasClass("card");
        var isNoneDate = datePickerJson.boolean.isNoneDate;
        var isStartDate = datePickerJson.boolean.isStartDate;
        var startDate = datePickerJson.data.startDate;
        var endDate = datePickerJson.data.endDate;
        var calendarOption = {
            shorthandCurrentMonth: true,
            minuteIncrement: 1,
            defaultDate: (isNoneDate ? "" : Tz.momentConversion("convertOnly", "type19", isStartDate ? startDate : endDate)),
        };
        var calendarPosition = {
            appendTo: $targetLayer[0],
            position: function () {}
        };
        return $.extend({}, calendarOption, (isCardLayerTarget ? calendarPosition : {}));
    }

    function onReady(standardDate, selectDatePick, data) {
        $calendarContainer = $(data.calendarContainer);
        $calendarContainer.find(".flatpickr-time .numInput").prop("readonly", "readonly");

        var isStartDate = datePickerJson.boolean.isStartDate;
        var startDate = datePickerJson.data.startDate;
        var endDate = datePickerJson.data.endDate;
        data.config.minDate = (isStartDate ? "" : startDate);

        var $popupBefore = $targetLayer.parents(".js-popup-before");
        var isTask = $popupBefore.find(".js-post-nav:visible").hasClass("task")
        if(isTask && endDate) data.config.maxDate = (isStartDate ? endDate : "");

        if (datePickerJson.option.dateVer) {
            DatePickerHtml.addTimeButton($calendarContainer, datePickerJson.boolean.isFullDate);
        }
        if (datePickerJson.option.allDay) {
            $calendarContainer.find(".flatpickr-time").hide();
        }
        if (datePickerJson.callback.removeCallback) {
            DatePickerHtml.addRemoveButton($calendarContainer, $endFlatPickr, datePickerJson.callback.removeCallback);
        }
    }

    function onOpen() {
        if (datePickerJson.option.enableTime && Often.isFunc(Func.CLOUD.EDIT_TIME_TEXT)) initEditTimeText($calendarContainer);
    }

    function onValueUpdate(standardDate, selectDatePick, data) {
        var isStartDate = datePickerJson.boolean.isStartDate;
        var isDateVer = datePickerJson.option.dateVer;

        if (isStartDate) datePickerJson.data.startDate = Tz.momentConversion("convertOnly", "type19", selectDatePick);
        else datePickerJson.data.endDate = Tz.momentConversion("convertOnly", "type19", selectDatePick);

        if (isDateVer) {
            var isActive = $calendarContainer.hasClass("on-date");
            if (isStartDate) {
                datePickerJson.data.startDate = selectDatePick.substr(0, isActive ? 12 : 8);
            } else {
                datePickerJson.data.endDate = selectDatePick.substr(0, isActive ? 12 : 8);
            }
        }
        if (isCheckWrongDateAndAction(data)) return;

        if (isDateVer) {
            var $eTarget = $(event.target);
            var $eCurrentTarget = $(event.currentTarget);
            if (!$eCurrentTarget.hasClass("flatpickr-days") ||                         // 날짜 선택이 아닐때
                $eTarget.findUp(".flatpickr-time:visible").length > 0 ||            // 시간 선택이 아닐때
                $eTarget.findUp(".js-flatpickr-time-button").length > 0) return;
            data.close();
        }
    }

    function onClose(standardDate, selectDatePick, data) {
        clearDatePicker($cloneDatePicker);
        if (!selectDatePick || selectDatePick.length === 0) return;
        if (isCheckWrongDateAndAction(data)) return;
        finalFunction(data);
        setTimeout(function () {
            data.destroy();
        }, 200);
    }

    function initEditTimeText($calendarContainer) {
        var $hour = $calendarContainer.find(".flatpickr-time .flatpickr-hour");
        var $minute = $calendarContainer.find(".flatpickr-time .flatpickr-minute");
        initEditHourEvent($hour);
        initEditMinuteEvent($minute);
    }

    function initKeyDownEvent() {
        $calendarContainer.find(".flatpickr-hour, .flatpickr-minute").off('keydown').on('keydown', function (e) {
            if (!$calendarContainer.is(":visible")) return;
            if (KeyCheck.isKey(e, "ENTER")) {
                e.stopPropagation();
                e.preventDefault();
                $calendarContainer.find(".flatpickr-confirm").focus();
                $calendarContainer.find(".flatpickr-confirm").click();
            }
            if (KeyCheck.isKey(e, "ESC")) {
                e.stopPropagation();
                e.preventDefault();
                clearDatePicker($cloneDatePicker);
            }
        })
    }

    function initEditHourEvent(obj) {
        $(obj).removeAttr("readonly");
        $(obj).off("keydown").keydown(function (e) {
            if (e.keycode === 13) e.stopPropagation();
        });
        $(obj).off("keyup").keyup(function () {
            $(obj).val($(obj).val().replace(/[^0-9]/gi, ""));
            if ($(obj).val() > 23) $(obj).val("23");
            if ($(obj).val() < 0 || $(obj).val().length > 2) $(obj.val("00"));
        });
    }

    function initEditMinuteEvent(obj) {
        $(obj).removeAttr("readonly");
        $(obj).off("keydown").keydown(function (e) {
            if (e.keycode === 13) e.stopPropagation();
        });
        $(obj).off("keyup").keyup(function () {
            $(obj).val($(obj).val().replace(/[^0-9]/gi, ""));
            if ($(obj).val() > 59) $(obj).val("59");
            if ($(obj).val() < 0 || $(obj).val().length > 2) $(obj.val("00"));
        });
    }

    function isCheckWrongDateAndAction(data) {
        var startDate = datePickerJson.data.startDate;
        var endDate = datePickerJson.data.endDate;
        //Note. 일정은 시작일이 마감일 이후로 가더라도 그에 맞춰 마감일이 따라가게 되어있음
        if (PostPopup.getData().POST_CODE === DetailCode.SCHEDULE) return false;
        if (startDate.length === 0 || endDate.length === 0) return false;
        var startConvDate = Tz.momentConversion("convertOnly", "type19", startDate);
        var endConvDate = Tz.momentConversion("convertOnly", "type19", endDate);
        if (startConvDate > endConvDate) {
            data.setDate(data.config.defaultDate);
            Often.toast("error", i18next.t('front.datePicker.wrongDate'));
            return true;
        }
        return false;
    }

    function clearDatePicker($cloneDatePicker) {
        $targetLayer.after($cloneDatePicker);
        $targetLayer.remove();
        $(".flatpickr-calendar").remove(); // 캘린더 지움
    }

    function finalFunction(data) {
        var isStartDate = datePickerJson.boolean.isStartDate;
        var startDate = datePickerJson.data.startDate;
        var endDate = datePickerJson.data.endDate;

        var returnDate = (datePickerJson.option.rescheduling ? makeRescheduling(startDate, endDate, data.config.defaultDate, isStartDate) : (isStartDate ? startDate : endDate));
        var isSameDate = true;
        if (typeof data.config.defaultDate === 'object') {
            SentryMonitor.captureException(data.config.defaultDate);
        } else {
            isSameDate = ((isStartDate ? startDate : endDate) === data.config.defaultDate.substr(0, datePickerJson.boolean.isFullDate ? 12 : 8));
        }
        var closeCallback = datePickerJson.callback.closeCallback;
        if (typeof closeCallback === 'function') closeCallback($cloneDatePicker, returnDate, isSameDate);
    }

    function makeRescheduling(startDttm, endDttm, defaultDttm, isStartDate) {
        var thisDefaultDttm = new Date(Tz.momentConversion("convertOnly", 'type1', defaultDttm).replace(/-/ig, "/"));
        var thisStartDttm = new Date(Tz.momentConversion("convertOnly", 'type1', startDttm).replace(/-/ig, "/"));
        var thisEndDttm = new Date(Tz.momentConversion("convertOnly", 'type1', endDttm).replace(/-/ig, "/"));
        if (isStartDate) {
            thisEndDttm.setFullYear(thisEndDttm.getFullYear() - (thisDefaultDttm.getFullYear() - thisStartDttm.getFullYear()));
            thisEndDttm.setMonth(thisEndDttm.getMonth() - (thisDefaultDttm.getMonth() - thisStartDttm.getMonth()));
            thisEndDttm.setDate(thisEndDttm.getDate() - (thisDefaultDttm.getDate() - thisStartDttm.getDate()));
            thisEndDttm.setHours(thisStartDttm.getHours() + 1);
            thisEndDttm.setMinutes(thisStartDttm.getMinutes());
        }

        return {
            startDate: Often.getDateFormat(thisStartDttm),
            endDate: Often.getDateFormat(thisEndDttm),
        }
    }
})();

var DatePickerHtml = (function () {

    return {
        addTimeButton: addTimeButton,
        addRemoveButton: addRemoveButton,
    }

    function addTimeButton($calendarContainer, isFullDate) {
        var pickrTimeButton = "<div class='js-flatpickr-time-layer'>" +
            "<div class='js-flatpickr-date-button js-flatpickr-time-button'>" +
            "<button type='button' class='flatpickr-button'>" +
            "   <span class='create-icon-box small'>" +
            "       <i class='icons-clock'></i>" +
            "   </span>" +
            "</button>" +
            "<div class='flatpickr-text'>" + i18next.t("front.deviceManagement.setTime") + "</div></div></div>";

        var pickrTimeCloseButton = "<button type='button' class='js-flatpickr-close-button js-flatpickr-time-button' style='display: inline-block;' ></button>";

        $calendarContainer.find(".flatpickr-time").append(pickrTimeCloseButton);
        if (Often.isFunc(Func.CLOUD.TASK_START_TIME)) {
            $calendarContainer.find(".flatpickr-innerContainer").after(pickrTimeButton);
        }
        var $flatpickrTimeLayer = $calendarContainer.find(".js-flatpickr-time-layer");
        setTimeLayer($flatpickrTimeLayer, isFullDate)
        $calendarContainer.off("click").on("click", function (e) {
            e.stopPropagation();
            var $eTarget = $(e.target);
            var $timeButton = $eTarget.findUp(".js-flatpickr-time-button");
            var isAddButton = $eTarget.findUp(".js-flatpickr-date-button").length > 0;
            if (!$timeButton || $timeButton.length === 0) return;
            e.preventDefault();
            setTimeLayer($calendarContainer, isAddButton);
        });

        function setTimeLayer($flatpickrTimeLayer, isAddButton) {
            $calendarContainer.find(".time24hr").css("display", isAddButton ? "inline-block" : "none");
            $flatpickrTimeLayer.find(isAddButton ? ".js-flatpickr-date-button" : ".js-flatpickr-close-button").addClass("d-none");
            $flatpickrTimeLayer.find(!isAddButton ? ".js-flatpickr-date-button" : ".js-flatpickr-close-button").removeClass("d-none");
            if (isAddButton) return $calendarContainer.addClass("on-date");
            $calendarContainer.removeClass("on-date");
        }
    }

    function addRemoveButton($calendarContainer, $endFlatPickr, removeCallback) {
        var removeButton = "<div class='js-flatpickr-remove-button dueDate-remove-button' style='cursor: pointer'>"
            + "<i class='icons-calendar'></i>"
            + " 마감일 삭제"
            + "</div>";
        $calendarContainer.append(removeButton);
        (typeof removeCallback === "function") && removeCallback($calendarContainer, $endFlatPickr);
    }
})();