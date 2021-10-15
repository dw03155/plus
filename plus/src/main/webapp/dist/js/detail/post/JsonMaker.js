var JsonMaker = (function () {

    return {
        convertJsonString: convertJsonString,
        getPostJson: getPostJson,
        getSettingAttrs: getSettingAttrs,
        getPostContentsInfo: getPostContentsInfo,
        getEmojiInfo: getEmojiInfo,
        getListComponentInfo: getListComponentInfo,
        str2json: str2json,
    }

    function convertJsonString(post) {
        var postCode = PostCondition.getPostCodeByData(post);
        var isNewStyle = PostCondition.isNewStyleByCntn(post);
        var newStyleComponentArray = [];
        if (isNewStyle) {
            newStyleComponentArray = getComponentSyncJsonArray(post);
        } else {
            newStyleComponentArray.push(getCompJson(post, "TEXT"));
        }
        var returnArray = [];
        var taskComp = getCompJson(post, "TASK");
        var todoComp = getCompJson(post, "TODO");
        var scheduleComp = getCompJson(post, "SCHEDULE");
        !isNewStyle && newStyleComponentArray.push(getCompJson(post, "LINK"));
        !isNewStyle && $.extend(returnArray, getFileCompJsonArray(post));

        if (postCode === DetailCode.TASK) {
            returnArray = newStyleComponentArray.concat(returnArray);
            returnArray = [taskComp].concat(returnArray);
            if (!ItemSubtask.isSubtask(post)) {
                returnArray.push({
                    COMP_TYPE: "SUBTASK",
                    COMP_DETAIL: post.SUBTASK_REC,
                })
            }
        } else if (postCode === DetailCode.SCHEDULE) {
            returnArray = newStyleComponentArray.concat(returnArray);
            returnArray = [scheduleComp].concat(returnArray);
        } else if (postCode === DetailCode.TODO) {
            returnArray.push(todoComp);
        } else {
            returnArray = newStyleComponentArray.concat(returnArray);
        }

        return JSON.stringify({COMPS: returnArray})
    }

    function getComponentSyncJsonArray(post) {
        var compArray = str2json(post.CNTN);
        var tempPostFile = post.ATCH_REC && post.ATCH_REC.slice();
        var tempPostImage = post.IMG_ATCH_REC && post.IMG_ATCH_REC.slice();
        if (tempPostFile.length > 0 || tempPostImage.length > 0) {
            $.each(compArray, function (i, comp) {
                $.each(tempPostFile, function (i, file) {
                    if (comp.COMP_TYPE !== "FILE") return false;
                    if (FileUtil.getAtchSrno(file.ATCH_SRNO) === comp.COMP_DETAIL.ATCH_SRNO) {
                        $.extend(comp.COMP_DETAIL, file);
                    }
                });
                $.each(tempPostImage, function (i, image) {
                    if (comp.COMP_TYPE !== "IMAGE") return false;
                    if (FileUtil.getAtchSrno(image.ATCH_SRNO) === comp.COMP_DETAIL.ATCH_SRNO) {
                        $.extend(comp.COMP_DETAIL, image);
                    }
                });
            })
        }
        return compArray;
    }

    function getFileCompJsonArray(post) {
        var extractRecord = [];
        $.each(post["ATCH_REC"], function (i, fileData) {
            extractRecord.push({
                COMP_TYPE: "FILE",
                COMP_DETAIL: fileData
            });
        });
        $.each(post["IMG_ATCH_REC"], function (i, fileData) {
            extractRecord.push({
                COMP_TYPE: "IMAGE",
                COMP_DETAIL: fileData
            });
        });
        return extractRecord;
    }

    //html => DB JSON
    function getPostJson($post) {
        var $postPopup = $("#postPopup");
        var postTitle = $.trim($postPopup.find("#postTitle").val()); //운영에서 텍스트 깨짐 이슈로 tag2html 제거
        var isOnlyProjectManger = $postPopup.find(".private-button").hasClass("admin");
        var postCondition = PostCondition.getPostConditionByData(
            PostCondition.getPopupMode($postPopup),
            PostPopup.getData().POST_CODE,
            PostCondition.isNewStyleByPopup($postPopup)
        );

        var defaultJson = {
            COLABO_SRNO: PostPopup.getData().PROJECT_SRNO,
            COLABO_COMMT_SRNO: PostPopup.getData().POST_SRNO,
            RANGE_TYPE: isOnlyProjectManger ? "M" : "A",
            SCRN_NO: (postCondition.isWrite2 ? "1" : "0"),
        }

        if (postCondition.isWrite2 || postCondition.isTask2 || postCondition.isSchedule2) {
            return addJsonByPostCode($.extend({}, defaultJson, {
                COMMT_TTL: postTitle,
                CNTN: pullPostContents(),
            }));
        }

        if (postCondition.isWrite1 || postCondition.isTask1) {
            return addJsonByPostCode($.extend({}, defaultJson, getOriginalPostContentsJson()));
        }

        return addJsonByPostCode(defaultJson);

        function addJsonByPostCode(passJson) {
            passJson = passJson || {}
            return $.extend({}, passJson,
                (postCondition.isTask ? {
                    TASK_REC: ItemTask.makeTaskJson($postPopup),
                    SUBTASK_REC: ItemSubtask.makeSubtaskRecord($postPopup),
                } : postCondition.isSchedule ? {
                    SCHD_REC: getSchdRecJson($postPopup),
                } : postCondition.isTodo ? {
                    TODO_TTL: postTitle,
                    TODO_REC: ItemTodo.makeTodoJson($postPopup),
                    CNTN: "",
                    TODO_YN: "Y",
                } : {}));
        }
    }

    function getOriginalPostContentsJson() {
        var $postPopup = $("#postPopup");
        var $uploadArea = $postPopup.find(".js-upload-area");
        var $postAttached = $postPopup.find("#postAttached");
        if ($uploadArea.length === 0 && $postAttached.length === 0) return {};

        return $.extend({
            CNTN: getOriginalTextJson(),
            COMMT_ATCH_REC: getOriginalFileJson("FILE", $postAttached.find(".js-attached-file")),
            COMMT_EDITOR_REC: getOriginalFileJson("IMAGE", $postAttached.find(".js-attached-image")),
        }, getOriginalLinkJson($postAttached.find(".js-attached-url")))

        function getOriginalTextJson() {
            var postContent = "";
            $.each($($uploadArea[0].childNodes), function (index, node) {
                var isTextNode = node.nodeType === Node.TEXT_NODE;
                var isBr = node.innerHTML && node.innerHTML === "<br>";
                var $currentNode = $(node);
                (node.nodeName === 'DIV' && postContent !== "") && (postContent += '\n');
                var dataCode = Often.null2Void($currentNode.attr("data-code"));
                if (isTextNode || "" === dataCode) {
                    if (!isBr) postContent += TagConvert.html2DbStringByPost(node.outerHTML || node.innerHTML || node.textContent);
                }
            });
            return postContent;
        }

        function getOriginalFileJson(mode, $area) {
            var fileJsonArray = [];
            $.each($($area[0].childNodes), function (index, node) {
                var $currentNode = $(node);
                var dataCode = Often.null2Void($currentNode.attr("data-code"));
                if (mode !== dataCode) return;
                var fileJson = Often.getAttrs($currentNode)[0];
                fileJson.ATCH_SRNO = FileUtil.getAtchSrno(fileJson);
                fileJsonArray.push(fileJson);
            });
            return fileJsonArray;
        }

        function getOriginalLinkJson($linkArea) {
            var urlJson = {};
            $.each($($linkArea[0].childNodes), function (index, node) {
                var $currentNode = $(node);
                var dataCode = Often.null2Void($currentNode.attr("data-code"));
                if ("LINK" !== dataCode) return;
                urlJson = Often.getAttrs($currentNode)[0];
            });
            return urlJson;
        }
    }

    function pullPostContents() {
        var $postPopup = $("#postPopup");
        var $uploadArea = $postPopup.find(".js-upload-area");
        if ($uploadArea.length === 0) return "";
        var contentsJsonArray = []
        var returnText = "";
        $.each($($uploadArea[0].childNodes), function (index, node) {
            var isTextNode = node.nodeType === Node.TEXT_NODE;
            var isBr = node.innerHTML && node.innerHTML === "<br>";
            var $currentNode = $(node);
            if ($currentNode.hasClass("js-hidden-component")) return;
            (node.nodeName === 'DIV' && returnText !== "") && (returnText += '\n');
            var dataCode = Often.null2Void($currentNode.attr("data-code"));
            if ((isTextNode || "" === dataCode)) {
                if (!isBr) returnText += TagConvert.html2DbStringByPost(node.outerHTML || node.innerHTML || node.textContent);
            } else {
                returnText = pushPostTextComponent(contentsJsonArray, returnText);
                contentsJsonArray.push({COMP_TYPE: dataCode, COMP_DETAIL: Often.getAttrs($currentNode)[0]})
            }
        })
        pushPostTextComponent(contentsJsonArray, returnText);
        return JSON.stringify({COMPS: contentsJsonArray});
    }

    function pushPostTextComponent(contentsJsonArray, textComp) {
        var textCompJson = text2json(textComp);
        if (!textCompJson) return textComp;
        contentsJsonArray.push(textCompJson);
        return "";
    }

    function text2json(textComp) {
        if (textComp === "") return false;
        return {
            COMP_TYPE: "TEXT",
            COMP_DETAIL: {
                CONTENTS: textComp,
                HASHTAGS: TagUtil.extractHashtags(textComp),
                MENTIONS: TagUtil.extractMentionedUsers(textComp),
            }
        }
    }

    function getSchdRecJson($postPopup) {
        var title = $.trim($postPopup.find("#postTitle").val());
        var isCheckedAllDay = $postPopup.find("#ondDay").prop("checked");
        var startDateTime = Often.null2Void($postPopup.find(".js-start-flatpickr .js-pickr-date").val(), "");
        var endDateTime = Often.null2Void($postPopup.find(".js-end-flatpickr .js-pickr-date").val(), "");
        var preAlam = $postPopup.find("#alarmButton").val();
        var location = $postPopup.find("#LOCATION").val();
        var place = $postPopup.find("#placeInput").val();
        var memo = TagConvert.html2DbStringByPost($postPopup.find("#memoButton").html());
        var attendenceRec = $postPopup.find(".js-attendance-input").attr("data-attendance");
        var insetAtdRec = $postPopup.find(".js-attendance-input").attr("data-attendance-insert");
        var deleteAtdRec = $postPopup.find(".js-attendance-input").attr("data-attendance-delete");
        var vcSrno = $postPopup.find("#videoSpan").attr("data-vc-srno");
        return [{
            TTL: title,
            ALL_DAY_YN: isCheckedAllDay ? "Y" : "N",
            STTG_DTTM: Tz.momentConversion("convertOnly", (isCheckedAllDay ? "type17" : "type19"), startDateTime),
            FNSH_DTTM: Tz.momentConversion("convertOnly", (isCheckedAllDay ? "type17" : "type19"), endDateTime),
            PRE_ALAM: preAlam,
            VC_SRNO: vcSrno,
            MEMO: memo,
            LOCATION: location,
            PLACE: place,
            ATTENDENCE_REC: (!SpaceSelectable.isSharePost($postPopup) && attendenceRec) ? parseJson(attendenceRec) : [],
            INSERT_ATD_REC: (!SpaceSelectable.isSharePost($postPopup) && insetAtdRec) ? parseJson(insetAtdRec) : [],
            DELETE_ATD_REC: (!SpaceSelectable.isSharePost($postPopup) && deleteAtdRec) ? parseJson(deleteAtdRec) : [],
        }]
    }

    function getSettingAttrs(mode, json) {
        if (mode === "MAP") {
            return $.extend({}, {
                PLACE_TITLE: json["TITLE"],
                LOCATION: json["LOCATION"],
                PLACE: json["PLACE"],
                URL: json["URL"],
            })
        } else {
            return json;
        }
    }

    function getCompJson(post, type) {
        var extractData = {}
        switch (type) {
            case "TITLE" :
                extractData = (post && post.COMMT_TTL) ? post.COMMT_TTL : "";
                break;
            case "TEXT" :
            case "CONTENTS" :
                extractData = (post && post.CNTN) ? post.CNTN : "";
                break;
            case "IMAGE" :
                extractData = (post && post.IMG_ATCH_REC && post.IMG_ATCH_REC.length > 0) ? post.IMG_ATCH_REC[0] : {};
                break;
            case "FILE" :
                extractData = (post && post.ATCH_REC && post.ATCH_REC.length > 0) ? post.ATCH_REC[0] : {};
                break;
            case "TASK" :
                extractData = (post && post.TASK_REC && post.TASK_REC.length > 0) ? post.TASK_REC[0] : {};
                break;
            case "TODO" :
                extractData = (post && post.TODO_REC) ? post.TODO_REC : {};
                break;
            case "SCHEDULE" :
                extractData = (post && post.SCHD_REC && post.SCHD_REC.length > 0) ? post.SCHD_REC[0] : {};
                break;
            case "LINK" :
                if (!post || "" === Often.null2Void(post.PREVIEW_LINK)) extractData = {}
                else extractData = {
                    PREVIEW_TTL: post.PREVIEW_TTL,
                    PREVIEW_IMG: post.PREVIEW_IMG,
                    PREVIEW_LINK: post.PREVIEW_LINK,
                    PREVIEW_CNTN: post.PREVIEW_CNTN,
                    PREVIEW_VIDEO: post.PREVIEW_VIDEO,
                    PREVIEW_TYPE: post.PREVIEW_TYPE,
                };
                break;
            default :
                break;
        }
        extractData = ((type === "TEXT" || type === "TODO" || type === "CONTENTS") ? {CONTENTS: extractData} : extractData);
        if (Object.keys(extractData).length === 0) return {}
        return {COMP_TYPE: type, COMP_DETAIL: extractData}
    }

    function getPostContentsInfo(post) {
        var userInfo = getUserInfo(post);
        var postInfo = getPostInfo(post);
        var taskInfo = getTaskInfo(post);
        var scheduleInfo = getScheduleInfo(post);
        var subtaskInfo = getSubtaskInfo(post);
        var remarkInfo = getRemarkInfo(post);
        var emojiInfo = getEmojiInfo(post);
        var todoInfo = getTodoInfo(post);
        return $.extend({}, userInfo, postInfo, taskInfo, scheduleInfo, subtaskInfo, remarkInfo, emojiInfo, todoInfo);
    }

    function getPostInfo(data) {
        var isIamSubtask = PostCondition.getIamSubtaskByData(data);
        var postCondition = PostCondition.getPostCondition("VIEW", data);
        var postCode = postCondition.isWrite1 ? "0" : postCondition.postCode;
        var projectColor = LocalUtil.getProjectBgColorCd();

        var oneTaskData = data.TASK_REC && data.TASK_REC.length > 0 ? data.TASK_REC[0] : {};
        var postTitle = $.trim((isIamSubtask || postCondition.isTask) ? oneTaskData.TASK_NM : data.COMMT_TTL);
        var isNoTitle = "" === postTitle;

        return {
            'COLABO_TTL': data.COLABO_TTL,
            'COLABO_SRNO': data.COLABO_SRNO,
            'COLABO_COMMT_SRNO': data.COLABO_COMMT_SRNO,
            'COLABO_REMARK_SRNO': data.COLABO_REMARK_SRNO,
            'CNTN': data.CNTN,
            'READ_YN': Often.null2Void(data.READ_YN, "Y"),
            'no-title': (!postCondition.isSchedule && isNoTitle ? "no-title" : ""),
            'COMMT_TTL': postCondition.isSchedule && isNoTitle ? 'COMMT_TTL' : postTitle,
            'PIN_YN': data.PIN_YN,
            'PIN_USE_YN': ((data.MNGR_DSNC === "Y" || data.PIN_USE_YN === "Y") ? "js-pin-authority" : ""),
            'PINNED': data.PIN_YN === "Y" ? "on" : "",
            'pin-btn-display': ListHelper.setDisplay((data.PIN_YN === "N" && data.PIN_USE_YN === "Y") || data.PIN_YN === "Y"),
            'BG_COLOR_CD': projectColor,
            'menu-button-display': ListHelper.setDisplay(Authority.isAuthorityCheck("WRITE", data.COLABO_SRNO) || data.RGSR_ID === _USER_ID, "block"),
            'menu-modify-display': ListHelper.setDisplay((data.RGSR_ID === _USER_ID && data.MODIFY_YN === "Y"), "block"),
            'menu-delete-display': ListHelper.setDisplay((data.RGSR_ID === _USER_ID || data.DELETE_YN === "Y"), "block"),
            'menu-url-display': ListHelper.setDisplay(Often.isFunc(Func.DEVELOP.URL_COPY), "block"),
            'author-id': data.RGSR_ID,
            'post-code': postCode,
            'post-gb': DetailCode.POST._GB[postCode],
            'subtask-gb': (isIamSubtask ? "subtask" : ""),
            'post-name': i18next.t(DetailCode.POST._TEXT[postCode]),
            'first-contents': getFirstContents(data),
            'date': Tz.momentTimeZone(data.RGSN_DTTM ? data.RGSN_DTTM : data.COMMT_RGSN_DTTM ? data.COMMT_RGSN_DTTM : data.RGSR_DTTM, 'type1'),
            'private-display': ListHelper.setDisplay(data.RANGE_TYPE === "M", "inline-block"),
            'read-count': Often.null2Void(data.READ_USER_CNT, 1),
            'bookmark-display': (data.BRING_YN === "Y" ? "on" : ""),
            'post-url': data.CONNECT_URL,
            'alarm-display': ListHelper.setDisplay(Often.null2Void(data.READ_YN, "Y") === "N", "block"),
            'security-class': data.RANGE_TYPE === "A" ? "icons-person-7" : "icons-lock",
            'security-text': data.RANGE_TYPE === "A" ? i18next.t("front.common.public") :
                i18next.t('prefix.only', {val: '$t(front.common.projectManager)'}),
        }
    }

    function getUserInfo(data) {
        var companyName = Often.null2Void(data.RGSR_CORP_NM, "");
        var teamName = Often.null2Void(data.RGSR_DVSN_NM, "");
        var isActivePrflDvsnKey = Often.isFunc("PRFL_DVSN_SHOW");
        var isPersonal = ("" === companyName && "" === teamName);
        return {
            'RGSR_ID': data.RGSR_ID,
            'name': data.RGSR_NM,
            'team': teamName,
            'position': Often.null2Void(data.RGSR_JBCL_NM, ""),
            'company': companyName,
            'profile': ListHelper.setProfile(data.PRFL_PHTG),
            'prfl-dvsn-display': ListHelper.setDisplay(isActivePrflDvsnKey, "inline"),
            'personal-yn': (isActivePrflDvsnKey && !isPersonal ? "d-block" : "d-none")
        }
    }

    function getTaskInfo(data) {
        var isExistsData = (data.TASK_REC && data.TASK_REC.length > 0 || data["TASK_STTS"]);
        if (!isExistsData) return {
            'task-yn': "d-none",
            'task-display': ListHelper.setDisplay(false),
            'todo-display': ListHelper.setDisplay(false)
        }
        var taskOneData = (data.TASK_REC && data.TASK_REC.length > 0 ? data.TASK_REC[0] : data);
        var taskStatus = Often.null2Void(taskOneData.STTS, data["TASK_STTS"]);
        var taskNumber = taskOneData.TASK_NUM;
        var taskSrno = taskOneData.TASK_SRNO;
        var isCompletion = (DetailCode.STATUS._GB[taskStatus] === "completion");
        var isHold = (DetailCode.STATUS._GB[taskStatus] === "hold");
        return {
            'task-display': ListHelper.setDisplay(isExistsData, "inline-block"),
            'task-srno': taskSrno,
            'task-yn': "d-inline-block",
            'task-number': taskNumber,
            'status-code': DetailCode.STATUS._GB[taskStatus],
            'status': i18next.t(DetailCode.STATUS._TEXT[taskStatus]),
            'status-raw': taskStatus,
            'complete-yn': (isCompletion ? "complete" : isHold ? "hold" : ""),
            'todo-display': ListHelper.setDisplay(false),
        }
    }

    function getScheduleInfo(data) {
        var isExistsData = ((data.SCHD_REC && data.SCHD_REC.length > 0) || (data["SCHD_STTG_DTTM"]));
        if (!isExistsData) return {'schedule-yn': "d-none", 'start-date': "", 'start-time': ""}
        var schdOneData = (data.SCHD_REC && data.SCHD_REC.length > 0 ? data.SCHD_REC[0] : "");
        var startDatetime = Often.null2Void(schdOneData.STTG_DTTM, data["SCHD_STTG_DTTM"]);
        var endDatetime = schdOneData.FNSH_DTTM;
        var isAllday = schdOneData.ALL_DAY_YN === "Y";
        var startYearMonth = Tz.momentTimeZone(startDatetime, 'type10');
        var startDate = Tz.momentTimeZone(startDatetime, 'type12');
        var endDate = Tz.momentTimeZone(endDatetime, 'type12');
        var isSameDate = startDate === endDate;
        var startDay = Tz.momentTimeZone(startDatetime, 'type9');
        var headerHtml = '<div class="schedule-date"><strong class="schedule-month">' + startYearMonth + '</strong>' +
            '<strong class="schedule-day">' + startDay + '</strong></div>'
        return {
            'COMMT_TTL': schdOneData.TTL,
            'start-date': Tz.momentTimeZone(startDatetime, 'type4'),
            'start-time': Tz.momentTimeZone(startDatetime, 'type8'),
            'start-date-time': !isAllday ? Tz.momentTimeZone(startDatetime, "type6")
                : Tz.momentTimeZone(startDatetime, "type5") + (isSameDate ? ", " + i18next.t('front.common.allDay') : ""),
            'start-date-time-raw': startDatetime,
            'end-date-time': !isAllday ? Tz.momentTimeZone(endDatetime, (isSameDate ? "type20" : "type6"))
                : isSameDate ? "" : Tz.momentTimeZone(endDatetime, "type5") + ", " + i18next.t('front.common.allDay'),
            "end-date-display": ListHelper.setDisplay(!(isAllday && isSameDate), 'inline-block'),
            'schedule-display': ListHelper.setDisplay(true, 'block'),
            'schedule-header': headerHtml,
            'schedule-period-display': ListHelper.setDisplay(true, 'block'),
        }
    }

    function getTodoInfo(data) {
        var isExistsData = (data.TODO_REC && data.TODO_REC.length > 0 || (data["TODO_DONE_PERCENT"]));
        if (!isExistsData) return {}

        var isTodo = false;
        var todoPercent = Often.null2Void(data["TODO_DONE_PERCENT"], ItemTodo.getTodoPercentJson(data.TODO_REC).PERCENT + "");
        if ((data.TODO_REC && data.TODO_REC.length > 0) || data.TMPL_TYPE === "2") isTodo = true;

        return {
            'todo-display': ListHelper.setDisplay(isTodo, 'inline-block'),
            'TODO_DONE_PERCENT': todoPercent === '0' ? '0%' : Often.null2Void(todoPercent + "%"),
            'todo-srno': Often.null2Void(data.TODO_REC && data.TODO_REC.length > 0 && data.TODO_REC[0].COLABO_TODO_SRNO, ""),
            'mngr-wryn': Often.null2Void(data.MNGR_WR_YN, ""),
            'mngr-dsnc': Often.null2Void(data.MNGR_DSNC, ""),
        }
    }

    function getSubtaskInfo(data) {
        var isExistsData = (data.UP_LINK_TASK_REC && data.UP_LINK_TASK_REC.length > 0);
        if (!isExistsData) return {};
        var subtaskData = data.UP_LINK_TASK_REC[0];
        return {
            "UP_TASK_TTL": subtaskData.UP_LINK_TASK_NM,
            "data-up-task-project-srno": subtaskData.COLABO_SRNO,
            "data-up-task-post-srno": subtaskData.COLABO_COMMT_SRNO,
            "data-up-task-srno": subtaskData.UP_LINK_TASK_SRNO,
            "up-task-display": ListHelper.setDisplay(true, "inline-block"),
        }
    }

    function getRemarkInfo(data) {
        var isExistsData = (data.REMARK_REC && data.REMARK_REC.length > 0) || data.REMARK_CNT > 0;
        var isWriteRemarkOk = Authority.isAuthorityCheck("REMARK", data.COLABO_SRNO);
        return $.extend({
            'remark-count': isExistsData ? data.REMARK_CNT : '0',
            'remark-display': ListHelper.setDisplay(isExistsData, "inline-block"),
            'remark-over-yn': (Number(data.REMARK_CNT) > 2 ? "on" : ""),
            'remark-area': isExistsData ? ItemRemark.getRemarkItemHtml(data.REMARK_REC) : '',
            'self-profile-url': ListHelper.setProfile(_PRFL_PHTG),
            'admin-write-yn': isWriteRemarkOk ? "" : "admin",
        }, ItemRemark.getRemarkWriteConditionJson(isWriteRemarkOk))
    }

    function getEmojiInfo(data) {
        var codes = data.EMT_CDS;
        var firstName = data.EMT_VIEW1;
        var plusCount = data.EMT_VIEW2;
        var myReactionInCode, reactionDisplay, isHtmlExist, reactionText;
        var likeText = i18next.t(DetailCode.EMOJI._TEXT[0]);

        if (!codes) return {'reaction-text': likeText};
        var returnHtml = "";
        codes.split(", ").forEach(function (code) {
            if (!myReactionInCode) myReactionInCode = code;
            returnHtml += '<li><i class="icon-emoji ' + DetailCode.EMOJI._GB[code - 1] + '">' +
                '<span class="blind">' + i18next.t(DetailCode.EMOJI._TEXT[code - 1]) + '</span></i></li>'
        })

        isHtmlExist = (returnHtml !== "");
        reactionDisplay = isHtmlExist && firstName !== "" ? "on" : "";
        reactionText = reactionDisplay ? i18next.t(DetailCode.EMOJI._TEXT[myReactionInCode - 1]) : likeText;
        return {
            'emoji-display': ListHelper.setDisplay(isHtmlExist, "block"),
            'reaction-display': reactionDisplay,
            'emoji-icons': returnHtml,
            'emoji-text': firstName + " " + plusCount,
            'my-reaction': myReactionInCode,
            'reaction-text': reactionText,
        }
    }

    function getListComponentInfo(data, searchWord) {

        var tmplType = Often.null2Void(data.TMPL_TYPE, "1");
        var isTodo = tmplType === "2";
        var isTask = tmplType === "4";
        var isRemark = tmplType === "-1";

        var isExistsRemarkCount = (Number(data.REMARK_CNT) > 0);
        var taskStatus = Often.null2Void(data["TASK_STTS"]);
        var scheduleStartDatetime = Often.null2Void(data["SCHD_STTG_DTTM"]);
        var todoDonePercent = Often.null2Void(data["TODO_DONE_PERCENT"] + "%");

        return {
            'COLABO_TTL': Often.null2Void(data.COLABO_TTL, data.TTL),
            'post-gb': (isRemark ? "comment2 comment" : DetailCode.POST._GB[tmplType]),
            'post-name': (isRemark ? i18next.t("dictionary.comment") : i18next.t(DetailCode.POST._TEXT[tmplType])),

            'first-contents': getFirstContents(data, searchWord, isRemark),
            'remark-display': ListHelper.setDisplay(!isRemark && isExistsRemarkCount, "inline-block"),
            'name': data.RGSR_NM,
            'date': Tz.momentTimeZone(data.RGSN_DTTM, "type1"),

            'status-display': ListHelper.setDisplay(isTask, 'inline-block'),
            'status-code': Often.null2Void(DetailCode.STATUS._GB[taskStatus]),
            'status': i18next.t(DetailCode.STATUS._TEXT[taskStatus]),

            'schedule-display': ListHelper.setDisplay(false, 'inline-block'),
            'start-date': Tz.momentTimeZone(scheduleStartDatetime, "type4"),
            'start-time': Tz.momentTimeZone(scheduleStartDatetime, "type8"),

            'todo-display': ListHelper.setDisplay(isTodo, 'inline-block'),
            'TODO_DONE_PERCENT': todoDonePercent,
        }
    }

    function getFirstContents(data, searchWord, isRemark) {
        var isSearchMode = Often.null2Void(searchWord) !== "";

        var contents = Often.null2Void(TagConvert.db2OneString(data.CNTN, isSearchMode), data.CNTN_FIRST_LINE);
        if (!isRemark) contents = Often.null2Void(TagConvert.db2OneString(data.COMMT_TTL), contents);
        if (!isSearchMode) return contents;
        return TagUtil.text2highlight("SEARCH", contents, searchWord);
    }

    function str2json(str) {
        var postJson;
        try {
            postJson = JSON.parse(str);
        } catch (e) {
        }
        return (postJson && postJson.COMPS) ? postJson.COMPS : [];
    }

    function parseJson(str) {
        var replaceJson = str.replace(/\'/, '\"');
        try {
            return JSON.parse(replaceJson);
        } catch (e) {
            return [];
        }
    }

})()
