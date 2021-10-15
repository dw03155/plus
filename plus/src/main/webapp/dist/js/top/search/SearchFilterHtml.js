var SearchFilterHtml = (function () {

    return {
        getFileType: getFileType,
        getTmplType: getTmplType,
        getPeriodType: getPeriodType,
    }

    function getFileType(targetKey) {

        var fileType = {
            TOTAL: "dictionary.all",
            CLOUD: "dictionary.cloud",
            PDF: "PDF",
            WORD: "dictionary.word",
            EXCEL: "dictionary.excel",
            HWP: "HWP",
            PPT: "dictionary.powerpoint",
            IMG: "dictionary.image",
            MEDIA: "front.common.audioAndVideo",
            HTML: "HTML",
            CAD: "CAD",
            ZIP: "front.common.zip",
        }

        var returnHtml = '';
        for (var key in fileType) {
            returnHtml += ListHelper.replaceJson($("#fileLi").html(), {
                uuid: Often.getUUID(),
                key: (key === "TOTAL" ? "0" : key),
                keyClass: key.toLowerCase(),
                value: i18next.t(fileType[key]),
                checked: (targetKey === key ? "checked" : "data"),
            })
        }
        return returnHtml;
    }

    function getTmplType(targetKey) {
        var tmplType = {
            TOTAL: "dictionary.all",
            WRITE: "dictionary.article",
            TASK: "dictionary.task",
            SCHEDULE: "dictionary.schedule",
            TODO: "dictionary.todo",
            REMARK: "dictionary.comment",
        }
        var returnHtml = '';
        for (var key in tmplType) {
            returnHtml += ListHelper.replaceJson($("#tmplLi").html(), {
                uuid2: Often.getUUID(),
                key: (key === "WRITE" ? "1" : key === "TASK" ? "4" : key === "SCHEDULE" ? "3" :
                    key === "TODO" ? "2" : key === "REMARK" ? "-1" : "0"),
                value: i18next.t(tmplType[key]),
                checked: (targetKey === key ? "checked" : "data"),
            })
        }
        return returnHtml;
    }

    function getPeriodType(targetKey) {
        var periodType = {
            unlimit: i18next.t('dictionary.all'),
            today: i18next.t('dictionary.today'),
            week: i18next.t('front.common.day', {count: 7}),
            month: i18next.t('front.common.month', {count: 1}),
            thirdMonth: i18next.t('front.common.month', {count: 3}),
            sixthMonth: i18next.t('front.common.month', {count: 6}),
            year: i18next.t('front.common.year', {count: 1}),
            select: i18next.t('front.common.selectRange'),
        }
        var returnHtml = '';
        for (var key in periodType) {
            returnHtml += ListHelper.replaceJson($("#periodLi").html(), {
                uuid: Often.getUUID(),
                key: key,
                value: periodType[key],
                checked: (targetKey === key ? "checked" : "data"),
                select_div: ('select' === key ? $("#periodSelectDiv").html() : ""),
                select_class: ('select' === key ? "js-date-select-input" : ""),
            })
        }
        return returnHtml;
    }

})()