var PostCondition = (function () {

    return {
        isNewStyleByCntn: isNewStyleByCntn,
        isNewStyleByPopup: isNewStyleByPopup,
        getPopupMode: getPopupMode,
        getIamSubtaskByData: getIamSubtaskByData,
        getPostCodeByData: getPostCodeByData,
        getFuncCondition: getFuncCondition,
        getPostCondition: getPostCondition,
        getPostConditionByData: getPostConditionByData,
    }

    function isNewStyleByCntn(post) {
        var cntnJsonYn = Often.null2Void(post.CNTN_JSON_YN, "N");
        if (cntnJsonYn === "Y") return true;
        if (Often.null2Void(post.CNTN) !== "") return post.CNTN.indexOf('{"COMPS":') > -1;
        return false;
    }

    function isNewStyleByPopup($postPopup) {
        //팝업 바텀의 해시태그 툴바로 판단함
        return $postPopup.find(".js-bottom-item.hashtag-item").is(":visible");
    }

    /**
     * @param $postPopup
     * @returns {string} ADD|EDIT|VIEW|SHARE_POST|WRITE_ANYWHERE
     */
    function getPopupMode($postPopup) {
        return ($postPopup.attr("data-code"));
    }

    function getPostCodeByData(post) {
        if (post && Object.keys(post).length > 0) {
            var postCodeString = (
                post.SCHD_REC && post.SCHD_REC.length > 0 ? DetailCode.SCHEDULE :
                    post.TODO_REC && post.TODO_REC.length > 0 ? DetailCode.TODO :
                        post.TASK_REC && post.TASK_REC.length > 0 ? DetailCode.TASK : DetailCode.WRITE);
            var tmplType = post.TMPL_TYPE ? post.TMPL_TYPE : postCodeString;
            return Often.null2Void(tmplType, DetailCode.WRITE);
        } else {
            return PostPopup.getData().POST_CODE;
        }
    }

    function getIamSubtaskByData(post) {
        return post.UP_LINK_TASK_REC && post.UP_LINK_TASK_REC.length > 0;
    }

    /**
     * 포스트 내에 다양한 기능을 컨트롤하는 함수입니다.
     * @param [popupMode] {string} ADD|EDIT|VIEW|SHARE_POST|WRITE_ANYWHERE
     * @param [onePostData] {Object} 1개의 포스트 데이터 (조회,수정에만 들어옴)
     * @returns {{isHashTag: boolean, isMentionTag: boolean, isUpload: boolean, isGooglePlace: boolean, isStyleTag: boolean}}
     */
    function getFuncCondition(popupMode, onePostData) {

        //postPopup 그려진 후에 호출해야 맞는 popupMode 값을 가져옴
        popupMode = popupMode || getPopupMode($("#postPopup"));
        onePostData = onePostData || PostPopup.getOnePostData();

        var postCondition = getPostCondition(popupMode, onePostData);
        return {
            isUpload: postCondition.isWrite || postCondition.isTask || postCondition.isSchedule2,
            isGooglePlace: Often.isFunc(Func.ENTER.GOOGLE_MAP) && (postCondition.isWrite2 || postCondition.isTask2),
            isHashTag: !postCondition.isSharePost && (postCondition.isWrite2 || postCondition.isTask2 || postCondition.isSchedule2),
            isMentionTag: !postCondition.isSharePost && (postCondition.isWrite || postCondition.isTask || postCondition.isSchedule2),
            isStyleTag: (postCondition.isWrite2 || postCondition.isTask2 || postCondition.isSchedule2),
        }
    }

    /**
     * @param popupMode {string} ADD|EDIT|VIEW|SHARE_POST|WRITE_ANYWHERE
     * @param onePostData {Object} 1개의 포스트 데이터 (조회,수정에만 들어옴)
     * @returns {Object} 포스트가 어떤 템플릿(ex.업무,일정 등)을 가지는지, 어떤 상태(ex. 등록,수정,조히 등)인지
     */
    function getPostCondition(popupMode, onePostData) {
        popupMode = popupMode || getPopupMode($("#postPopup"));
        onePostData = onePostData || PostPopup.getOnePostData();
        var postCode = getPostCodeByData(onePostData);
        var isNewStyle = isNewStyleByCntn(onePostData);
        return getPostConditionByData(popupMode, postCode, isNewStyle);
    }

    /**
     * @param popupMode {string} ADD|EDIT|VIEW|SHARE_POST|WRITE_ANYWHERE
     * @param postCode {string} 업무,일정 등에 대응하는 넘버코드값
     * @param isNewStyle {boolean}
     * @returns {Object} 포스트가 어떤 템플릿(ex.업무,일정 등)을 가지는지, 어떤 상태(ex. 등록,수정,조히 등)인지
     */
    function getPostConditionByData(popupMode, postCode, isNewStyle) {
        popupMode = Often.null2Void(popupMode || getPopupMode($("#postPopup")), "VIEW");
        postCode = postCode || PostPopup.getData().POST_CODE;
        isNewStyle = isNewStyle || isNewStyleByCntn(PostPopup.getOnePostData()); //등록일땐 무시됨

        var isAdd = popupMode === "ADD";
        var isEdit = popupMode === "EDIT";
        var isView = popupMode === "VIEW";

        var isSharePost = popupMode === DetailCode.SHARE_POST.CODE;
        var isWrite = postCode === DetailCode.WRITE;
        var isTodo = postCode === DetailCode.TODO;
        var isSchedule = postCode === DetailCode.SCHEDULE;
        var isTask = postCode === DetailCode.TASK;

        var isTaskUpgrade = Often.isFunc(Func.CLOUD.TASK_UPGRADE);
        var isScheduleUpgrade = Often.isFunc(Func.CLOUD.SCHEDULE_UPGRADE);

        var defaultJson = {
            postCode: postCode,

            //팝업모드
            isAdd: isAdd,
            isEdit: isEdit,
            isView: isView,
            isSharePost: isSharePost,

            //포스트템플릿
            isWrite: isWrite,
            isTodo: isTodo,
            isSchedule: isSchedule,
            isTask: isTask,
        };

        //등록은 기능아이디 따라 업그레이드됨
        if (isAdd) {
            $.extend(defaultJson, {
                isWrite1: isWrite && false,
                isWrite2: isWrite && true,
                isTask1: isTask && !isTaskUpgrade,
                isTask2: isTask && isTaskUpgrade,
                isSchedule1: isSchedule && !isScheduleUpgrade,
                isSchedule2: isSchedule && isScheduleUpgrade,
            })
            $.extend(defaultJson, {
                isNewStyle: isWrite || defaultJson.isTask2 || defaultJson.isSchedule2
            })
            return defaultJson;
        }

        return {
            postCode: postCode,

            //팝업모드
            isAdd: isAdd,
            isEdit: isEdit,
            isView: isView,
            isSharePost: isSharePost,

            //포스트템플릿
            isWrite: isWrite,
            isTodo: isTodo,
            isSchedule: isSchedule,
            isTask: isTask,

            //조회 수정은 전문 아웃풋 값에 따라감
            isWrite1: isWrite && !isNewStyle && (isEdit || isView || isSharePost), //웹 구버전의 글작성1.0 수정에서만 케이스가 생김
            isWrite2: isWrite && isNewStyle && (isEdit || isView || isSharePost), //웹 신버전에서 등록은 무조건 글작성2.0 형태
            isTask1: isTask && !isNewStyle && (isEdit || isView || isSharePost),
            isTask2: isTask && isNewStyle && (isEdit || isView || isSharePost),
            isSchedule1: isSchedule && !isNewStyle && (isEdit || isView || isSharePost),
            isSchedule2: isSchedule && isNewStyle && (isEdit || isView || isSharePost),

            isNewStyle: isNewStyle,
        }
    }

})();