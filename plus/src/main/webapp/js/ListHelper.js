var SCROLL_RATIO = 0.8;
var SCROLL_RATIO_HALF = 0.5;

var ListHelper = (function () {

    var loadingTimer;

    return {
        initPageData: initPageData,

        getClassObj: getClassObj,
        getNoDataHtml: getNoDataHtml,

        setProfile: setProfile,
        setProfileImg: setProfileImg,
        setImage: setImage,
        setThumbnailImage: setThumbnailImage,
        setSrc: setSrc,
        setImageSrc: setImageSrc,
        setSpanTag: setSpanTag,
        setEmTag: setEmTag,
        setDisplay: setDisplay,
        setProgressBar: setProgressBar,
        setCount: setCount,
        addClickEventOnMoveTopButton: addClickEventOnMoveTopButton,

        initScrollEvent: initScrollEvent,
        initClickEvent: initClickEvent,
        initDBLClickEvent: initDBLClickEvent,
        replaceJson: replaceJson,

        //color
        removeAllColorClass: removeAllColorClass,
        getColorClassName: getColorClassName,
        getColorClassNameOnInviteBtn: getColorClassNameOnInviteBtn,

        getScrollDirection: getScrollDirection,

        limitNum2PlusNum: limitNum2PlusNum,

        selectFirstItemByArrow: selectFirstItemByArrow,
    }

    function setScrollDirection($scrollArea, direction) {
        //-1: UpScroll, 1: DownScroll, 0: first
        $scrollArea.attr("scroll-direction", direction);
    }

    function getScrollDirection($scrollArea) {
        return Number(Often.null2Void($scrollArea.attr("scroll-direction"), "0"));
    }

    function setCount($targetObj, count, blockKey, limitCount) {
        $targetObj.text(limitNum2PlusNum(count, limitCount));
        var isShowCount = (Number(Often.null2Void(count, "0")) === 0);
        //Note. 빈값으로 처리하면 d-none 클래스가 먹기도해서 'block'으로 명시적 처리
        $targetObj.css('display', isShowCount ? 'none' : Often.null2Void(blockKey, 'block'));
    }

    function limitNum2PlusNum(count, limitCount) {
        count = count || 0;
        var cnt = Number(count);
        var limitCnt = (limitCount && Number(limitCount)) ? Number(limitCount) : 1000;
        return (cnt >= limitCnt ? ((limitCnt - 1) + " +") : cnt);
    }

    function getColorClassName(colorCode) {
        return 'color-code-' + colorCode;
    }

    function getColorClassNameOnInviteBtn(colorCode) {
        if (Number(colorCode) === 0) return 'color-code-3'; //white => purple
        return getColorClassName(colorCode);
    }

    function removeAllColorClass($targetObj) {
        $targetObj.removeClass("color-code-0")
            .removeClass("color-code-1").removeClass("color-code-2").removeClass("color-code-3")
            .removeClass("color-code-4").removeClass("color-code-5").removeClass("color-code-6")
            .removeClass("color-code-7").removeClass("color-code-8").removeClass("color-code-9")
            .removeClass("color-code-10").removeClass("color-code-11");
    }

    function initPageData(pageData, $ulObj, isDirectLoading) {
        pageData && (pageData.PG_NO = (pageData.ZERO_FIRST ? 0 : 1)); //페이징에 안 쓰더라도 첫페이지 구분하기 위하여 써야함!
        pageData && pageData.PREV_YN && (pageData.PREV_YN = "Y");
        pageData && pageData.NEXT_YN && (pageData.NEXT_YN = "Y");
        pageData && pageData.CHECK_DTTM && (pageData.CHECK_DTTM = "");
        pageData && pageData.COMMT_RGSN_DTTM && (pageData.COMMT_RGSN_DTTM = "");
        pageData && pageData.ROOM_CHAT_SRNO && (pageData.ROOM_CHAT_SRNO = "");

        if ($ulObj) {
            $ulObj.empty();
            if (isDirectLoading) {
                $ulObj.prepend($("#commonLoading").html());
            } else {
                //NOTE. 0.5초이상 그리기가 늦어지는 경우에만 로딩바를 그림, 매번 그리면 로딩바가 깜빡거리면 노출됨
                loadingTimer = setTimeout(function () {
                    if ($ulObj.is(":empty")) {
                        $ulObj.prepend($("#commonLoading").html());
                    }
                    clearTimeout(loadingTimer);
                }, 500)
            }
        }
    }

    function setSpanTag(msg, boldName, isTooltip) {
        msg = TagUtil.tag2html(msg);
        return "<span" + setTooltipClassAndData(isTooltip, boldName) + ">" + boldName + "</span>" + msg.replace(boldName, '');

        /**
         * @Deprecated 툴팁을 사용하지 않음 (해당 부분 확인되면 삭제)
         */
        function setTooltipClassAndData(isTooltip, text) {
            if (Often.null2Void(text) === "") return "";
            return (Often.null2Void(isTooltip, false) ? " class='js-mouseover' mouseover-text='" + text + " '" : "");
        }
    }

    function setEmTag(msg, boldName) {
        msg = TagUtil.tag2html(msg);
        if (Often.null2Void(msg) === "") return "";
        var replaceName = boldName;

        // @임석현
        // DB에 "업무명"이 같이 들어감 (ex: "업무명: 환영합니다")
        // Note: 추후 전 다국어 코드 S1이 강제로 들어가는 부분 막아야 함 (Do not Translate)
        if (msg.indexOf('업무명') > -1) {
            replaceName = '업무명';
            boldName = i18next.t('front.common.taskTitle') + ":"
        }
        return "<em>" + boldName + "</em>" + TagUtil.tag2html(msg.replace(replaceName, '').replace(' : ', ''));
    }

    function setImageSrc(mode, url) {
        var defaultImage = ImageUtil.removeDomain(mode, "");
        if ("" === defaultImage) {
            return 'src="' + ImageUtil.removeDomain(mode, url) + '" data';
        } else {
            return 'src="' + ImageUtil.removeDomain(mode, url) + '" onerror="this.src=\'' + defaultImage + '\';" data';
        }
    }

    function setSrc(url) {
        if ("" === url) return "data";
        return 'src="' + url + '" data';
    }

    function setProfile(url) {
        var defaultURl = "/flow-renewal/assets/images/profile-default.png";
        return 'style="background-image:url(' + ImageUtil.removeDomain("PROFILE", url) + '), url(' + defaultURl + ')" data';
    }

    function setProfileImg(roomType, sendiencePrfl) {
        var profileArray = sendiencePrfl.split(',');
        var returnHtml = '';
        if (roomType === RoomType.PROJECT) {
            returnHtml += '<i class="icon-project"></i>'
        } else if (roomType === RoomType.MULTI) {
            $.each(profileArray, function (i, v) {
                returnHtml += '<div class="profile-img"' + setProfile(v) + '></div>'
            })
        } else {
            returnHtml += '<div class="profile-img"' + setProfile(sendiencePrfl) + '></div>'
        }
        return returnHtml;
    }

    function setImage(url) {
        return 'style="background-image:url(' + ImageUtil.removeDomain("POST", url) + ')" data';
    }

    function setThumbnailImage(url, thumbWidth, thumbHeight) {
        if (Often.null2Void(thumbWidth) !== "" || Often.null2Void(thumbHeight) !== "") {
            var widthQuery = "?width=" + Often.null2Void(thumbWidth, thumbHeight);  // width나 height 하나만 있을때는 정사각형 으로 만듦
            var heightQuery = "&height=" + Often.null2Void(thumbHeight, thumbWidth);
            url += (widthQuery + heightQuery);
        }
        return 'style="background-image:url(' + ImageUtil.removeDomain("ALLFILE", url) + ')" data';
    }

    function setProgressBar(progress) {
        if ('' === Often.null2Void(progress)) {
            return '';
        } else {
            return 'style="width:' + progress + '%" data';
        }
    }

    function replaceJson(str, replaceData) {
        if (typeof str !== "string") return "";
        return Often.null2Void(str, "").replace(/({[a-z-0-9A-Z_]+})/g, function (value) {
            var val = value.replace(/{|}/g, '');
            if (val === 'prfl_phtg') return Often.null2Void(replaceData && setProfile(replaceData[val.toUpperCase()]));
            //Note. 해당 케이스만 태그형태를 허용함
            var replaceValue = replaceData ? Often.null2Void(replaceData[val]) : "";
            if (!isNaN(Number(replaceValue))) return replaceValue;
            var isContainSearchTag = replaceValue.indexOf("<strong>") > -1 || replaceValue.indexOf("<b>") > -1;
            var isContainEmTag = replaceValue.indexOf("</em>") > -1;
            if (val.indexOf("-html") > -1 || val.indexOf("-tag") > -1 ||
                val.indexOf("-area") > -1 ||
                val === 'contents' || val === 'project-title' || val === 'label' ||
                val === 'todo-menu' || val === 'todo-ul' || val === 'todo-rgsr-info' ||
                val === 'content' || val === 'message-content' || val === 'message-cntn' || val === 'video-conference' ||
                val === 'image' || val === 'link' || val === 'file' || val === 'profile' ||
                val === 'workers' || val === 'task-name' || val === 'progress' || val === 'first-contents' ||
                val === 'emoji-icons' || val === 'select_div' ||
                val === 'COLUMN_LIST' || val === 'post-dimd-layer' || val === 'EDIT_LAYER' || val === 'SUBTASK_LIST' ||
                val === 'memo' || val === 'attendance' || val === 'schedule-header' || val === 'group-icon' ||
                (isContainEmTag && val === 'new') ||
                (isContainSearchTag && (val === 'ORCP_FILE_NM' || val === 'file_nm' || val === 'TTL' || val === 'TASK_NM' || val === 'TASK_NUM'))
            ) {
                return replaceValue;
            }
            return TagUtil.tag2html(replaceValue, value);
        });
    }

    function setDisplay(isShow, showStatus) {
        return 'style="display:' + (isShow ? Often.null2Void(showStatus, 'block') : 'none') + '" data';
    }

    function getClassObj($eTarget, className) {
        return ($eTarget.hasClass(className) ? $eTarget : $eTarget.parents("." + className));
    }

    function initScrollEvent($scrollArea, callback, reverseCallback, isDownScrollOnly) {
        if (!$scrollArea) return;
        if (!callback && !reverseCallback) return;
        var prevScrollOffset = 0;
        var isLoading = false;

        //Todo. scrollDirection 전역으로 1개가 관리되고 있어서 이슈가 있음 => $scrollArea 에 attr 로 관리해야될 것으로 보임
        setScrollDirection($scrollArea, 0); // 최초 실행시 전역변수를 초기화 해주기 위함
        setTimeout(function () {
            isDownScrollOnly && $scrollArea.scrollTop(0);  // 채팅과 같은 reverse 스크롤에서는 해당로직 x
        }, 0)
        $scrollArea.off("scroll").on("scroll", function (e) {
            if (isLoading) {
                prevScrollOffset = 0;
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            if (prevScrollOffset === 0) {
                prevScrollOffset = e.target.scrollTop;
                return;
            }

            var scrollDirection = e.target.scrollTop - prevScrollOffset > 0 ? 1 : -1;
            setScrollDirection($scrollArea, scrollDirection);
            prevScrollOffset = e.target.scrollTop;
            if (scrollDirection < 0) {
                if ((e.target.scrollTop / e.target.scrollHeight) < (1 - SCROLL_RATIO)) {
                    throttlingCallback(reverseCallback);
                }
                return;
            }

            if (0 < scrollDirection) {
                if ((SCROLL_RATIO) < ((e.target.scrollTop + e.target.clientHeight) / e.target.scrollHeight)) {
                    throttlingCallback(callback);
                }
                return;
            }

            function throttlingCallback(cb) {
                isLoading = true;
                setTimeout(function () {
                    isLoading = false;
                }, 500);
                (typeof cb === "function") && cb(e);
            }
        });
    }

    function initClickEvent(object, callback) {
        object.off('click').on('click', callback);
    }

    function initDBLClickEvent(object, callback) {
        object.off('dblclick').on('dblclick', callback);
    }

    function getNoDataHtml(ulCode) {

        if (ulCode === 'CHAT_SEARCH_START') {
            return '<div class="results-empty"><i></i><span>' +
                i18next.t('front.alert.searchChat', {nextLine: '<br>'}) + '</span></div>'
        }

        if (ulCode === 'CHAT_SEARCH') {
            return '<div class="results-empty"><i></i><span>' + i18next.t('front.common.noResult') + '</span></div>'
        }

        if (ulCode === 'POST') {
            var sendienceCnt = Number(LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "SENDIENCE_CNT"));
            var imageUrl = "/flow-renewal/assets/images/" + (sendienceCnt > 1 ? 'none_detail_data.png' : 'none_member.png');
            var mainText = sendienceCnt > 1 ? i18next.t('front.alert.noPost') : i18next.t('front.alert.noParticipant');
            var subText = sendienceCnt > 1 ? i18next.t('front.alert.noPostContext') : i18next.t('front.alert.noParticipantContext')
            var btnText = sendienceCnt > 1 ? i18next.t('front.common.uploadPost') : i18next.t('front.common.invite');
            var btnClass = sendienceCnt > 1 ? "write" : "invite"
            return '<div id="noDetailData" class="detail-data-none">\n' +
                '          <img src="' + imageUrl + '" alt="' + subText + '">\n' +
                '          <p class="none-text">' + mainText + '<br>\n' +
                '            ' + subText + '</p>\n' +
                '          <button id="noDetailDataBnt" type="button" class="data-none-button ' + btnClass + '">' + btnText + '</button>\n' +
                '        </div>'
        }

        var text, marginClass, isBaseline, addClass, projectNullClass;
        if (ulCode === 'SEARCH') {
            text = i18next.t('front.common.noResult');
            addClass = "search-null";
        } else if (ulCode === 'OPEN_SEARCH') {
            text = i18next.t('front.common.noResult');
            addClass = "search-null";
            marginClass = "mgt-200";
        } else if (ulCode === 'LABEL') {
            text = Interpolation.breakLine(i18next.t('front.alertNoProject'));
            marginClass = "mgt-200";
        } else if (ulCode === 'HIDDEN') { // 숨긴 프로젝트
            text = Interpolation.breakLine(i18next.t('front.noData.hiddenProject'));
            marginClass = "mgt-200";
        } else if (ulCode === 'TASK') {
            text = Interpolation.breakLine(i18next.t('front.noData.noTask'));
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (['FILE', 'IMAGE', 'LINK'].indexOf(ulCode) !== -1) { //Todo : es6 includes 사용 예정
            text = i18next.t('front.noData.registered', {val: '$t(dictionary.' + ulCode.toLowerCase() + ')'});
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (ulCode === 'ALARM') { //알림
            text = i18next.t('front.alert.checkAllAlarm');
            marginClass = "mgt--5";
        } else if (ulCode === 'CHAT') {
            projectNullClass = 'project-null-t-4';
            text = i18next.t('front.alert.inviteToChat');
            marginClass = "mgt--5";
        } else if (ulCode === 'ORGANIZATION') { // 조직도
            text = i18next.t('front.alert.Organization');
            marginClass = "mgt-200";
        } else if (ulCode === 'MENTION') { // 나를 언급한 글
            text = i18next.t('front.noData.mention');
            projectNullClass = 'project-null-t-4';
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (ulCode === 'BOOKMARK') { // 북마크
            text = Interpolation.breakLine(i18next.t('front.noData.noBookmarkExist'));
            projectNullClass = 'project-null-t-4';
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (ulCode === 'PROJECT_SEARCH') {
            text = Interpolation.breakLine(i18next.t('front.alert.noResultWithExplanation'));
            projectNullClass = 'project-null-t-4';
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (ulCode === 'SELF') {
            text = i18next.t('front.noData.noPost');
            projectNullClass = 'project-null-t-4'
        } else if (ulCode === 'READ-CHECKER') {
            text = i18next.t('front.alert.notExist', {val: '$t(front.searchResult.searchResult)'});
            marginClass = "mgt-200";
            isBaseline = true;
        } else if (ulCode === 'CHAT-COLLECTION') {
            text = i18next.t('front.common.noData');
            projectNullClass = 'project-null-t-4'
        } else if (ulCode === 'FAVORITE') {
            text = i18next.t('front.alert.addNewFavorite');
            marginClass = "mgt--5";
        } else if (ulCode === 'FAVORITE-MEMBER') {
            text = i18next.t('front.alert.addNewPersonToGroup');
            projectNullClass = "d-none"
            marginClass = "mgt-20";
        } else if (ulCode === 'UNREAD') { //읽지 않음
            text = i18next.t('front.alert.readProjectAlarm');
            marginClass = "mgt--5";
        } else if (ulCode === "OPEN_PROJECT_TAB") { // 회사 공개 프로젝트
            text = Interpolation.breakLine(i18next.t('front.noData.noPublicProject'));
            marginClass = "mgt--5";
        } else if (ulCode === "STAR") { // 즐겨찾기 (left)
            text = Interpolation.breakLine(i18next.t('front.noData.favorite'));
            marginClass = "mgt--5";
        } else {
            text = i18next.t('front.common.noData');
            marginClass = "mgt--5";
        }
        return '' +
            '<div class="js-project-null project-null-t-1 ' + marginClass + '">' +
            '   <div class="project-null-t-2 ' + (isBaseline ? "base" : "") + '">' +
            '       <div class="' + (projectNullClass ? projectNullClass : " project-null-t-3 ") + Often.null2Void(addClass, '') + '"></div>' +
            '       <span>' + text + '</span>' +
            '   </div>' +
            '</div>';
    }

    function selectFirstItemByArrow($ul) {
        $ul.children('li:first').addClass("select");
    }

    function addClickEventOnMoveTopButton($scrollObj) {
        //Note. 탑스크롤 버튼 예외처리 => 나중에 옵션화
        if (!$scrollObj.is("#RecentProjectUl") &&
            !$scrollObj.is("#joinParticipantsUl") &&
            !$scrollObj.is("#participantScrollArea") &&
            !$scrollObj.is("#quickGuideList")
        ) {
            var isTopMoveActive;
            $("#moveTopButton").off("click").on("click", function () {
                if (isTopMoveActive || $scrollObj.scrollTop() === 0) return;
                isTopMoveActive = true;
                $scrollObj.animate({scrollTop: 0}, 500, function () {
                    isTopMoveActive = false;
                });
            });
        }
    }

})()