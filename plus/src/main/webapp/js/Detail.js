var Detail = (function () {

    var $detailLayer, $detailTimeline, $postTimeline, $createPostArea, $detailUl,
        $projectFeedArea, $postMoreBtn;

    var detailPageData = {
        PG_NO: 1,
        PG_PER_CNT: 30, // 임시 30개 | list 20, board 10
        PREV_YN: "Y",
        NEXT_YN: "Y",
        COLABO_SRNO: 0,
        RENEWAL_YN: "Y",
        MORE_BUTTON: false
    }

    var detailPostRecord = [];
    var isMoveDirectPost = false;

    return {
        showDetailView: showDetailView,

        drawPostInfo: drawPostInfo,
        drawPostList: drawPostList,
        drawHashtagPostList: drawHashtagPostList,

        closeSettingUl: closeSettingUl,
        closeFeedFilter: closeFeedFilter,

        updateOnePostElement: updateOnePostElement,

        clickPostMore: clickPostMore,
        executeProjectSettingInfo: executeProjectSettingInfo,

        getProjectSrno: getProjectSrno,
        setProjectSrno: setProjectSrno,
        getPostRecord: getPostRecord,
        getPostStatus: getPostStatus,

        setFeedType: setFeedType,

        togglePostFilter: togglePostFilter,
    }

    function set$element() {
        $detailLayer = $("#detailLayer");
        $detailTimeline = $detailLayer.find("#detailTimeline");
        $postTimeline = $detailTimeline.find("#postTimeline")
        $createPostArea = $detailTimeline.find("#createPostArea");
        $projectFeedArea = $detailTimeline.find("#projectFeedArea");
        $detailUl = $projectFeedArea.find("#detailUl");
        $postMoreBtn = $projectFeedArea.find("#postMoreBtn");
        /**
         * <div id="detailLayer">
         *     <div id="detailTimeline">
         *          <div id="postTimeline">
         *              <div>
         *                  <div id="createPostArea"></div> //포스트 작성
         *              </div>
         *              <div>
         *                  <ul id="hashtagUl"></ul>
         *              </div>
         *              <div id="projectFeedArea">
         *                  <div class="feed-content">
         *                      <button id="postMoreBtn"></div>
         *                      <ul id="detailUl"></ul> //포스트
         *                  </div>
         *              </div>
         *              <div class="participants-section">
         *                  <div id="projectParticipants"></div>
         *              </div>
         *          </div>
         *      </div>
         *  </div>
         */
    }

    function showDetailView(projectSrno, postSrno, remarkSrno) {

        var isComeTinyUrl = Number(remarkSrno) === TINY_URL_MOVE.POST;

        CONNECT_PROJECT_SRNO = Often.null2Void(projectSrno);
        CONNECT_POST_SRNO = isComeTinyUrl ? "" : Often.null2Void(postSrno);
        CONNECT_REMARK_SRNO = isComeTinyUrl ? "" : Often.null2Void(remarkSrno);

        detailPageData.COLABO_SRNO = CONNECT_PROJECT_SRNO;
        detailPageData.SEARCH_COMMT_SRNO = CONNECT_POST_SRNO;
        detailPageData.SRCH_COLABO_REMARK_SRNO = CONNECT_REMARK_SRNO;

        set$element();

        DetailHeader.drawTempProjectHeaderItem(projectSrno)
        drawPostInfo(projectSrno, function () {
            drawPostList()
            isComeTinyUrl && PostPopup.togglePostView(projectSrno, postSrno, '', '', true);
        }); //프로젝트 정보 가져온 이후 그리기(ViewType 이슈)

        DetailEvent.resetFilter($projectFeedArea);
        ProjectSearch.hideSearchProjectList();
        Participant.drawProjectParticipantItems(projectSrno, true);
        RecentProject.reloadRecentProject();


    }

    function drawPostInfo(projectSrno, successCallback) {

        if (!ViewChanger.isPage("detail")) return;

        set$element();

        $postMoreBtn.css("display", "none");
        $postTimeline.scrollTop(0).css("z-index", "-1");
        Ajax.executeApi(RenewalApi.GET.ACT_PROJECT_INFO, detailPageData, function (infoData) {

            var projectSettingRecord = Often.null2Void(infoData["PROJECT_SETTING"] && infoData["PROJECT_SETTING"][0], {});
            var pinRecord = Often.null2Void(infoData["PIN_RECORD"], []);
            var tagRecord = Often.null2Void(infoData["TAG_RECORD"], []);
            var taskReportRecord = Often.null2Void(infoData["TASK_REPORT_RECORD"], []);
            var alarmRecord = Often.null2Void(infoData["ALARM_RECORD"], "");
            var alarmCount = Often.null2Void(infoData["ALARM_COUNT"], 0);
            var viewType = Often.null2Void(projectSettingRecord["VIEW_TYPE"], "F");

            //전문 리턴값으로 프로젝트의 라벨 리스트를 따로 넣어줌
            projectSettingRecord['LABEL_SRNOS'] = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "LABEL_SRNOS");

            LocalUtil.setLocalJson("CURRENT_PROJECT_SETTING", projectSettingRecord);
            LocalUtil.setLocalJson("POP_PROJECT_SETTING", projectSettingRecord);
            LocalUtil.setLocal("FEED_TYPE", viewType === "F" ? "card" : "list");
            successCallback && setInitFeedType();

            (typeof successCallback === "function") && successCallback();

            DetailHeader.drawProjectHeaderItem(projectSettingRecord);
            Alarm.drawProjectAlarmItems(projectSrno, alarmRecord, alarmCount, true);
            PinPost.drawProjectPinPostItemsByRecord(pinRecord);
            HashTag.drawProjectHashtagItemsByRecord(tagRecord);
            TaskReport.drawTaskReport(taskReportRecord);
            changeCreatePostArea($createPostArea, projectSettingRecord.TMPL_TYPE);
            Participant.drawJoinParticipantItem(projectSrno, true);
            $postTimeline.css("z-index", "");

            DetailEvent.addClickEventOnDetailView();
            stackProjectHistory(projectSettingRecord["COLABO_SRNO"], projectSettingRecord["BG_COLOR_CD"], projectSettingRecord["TTL"])
        })
    }

    function changeCreatePostArea($createPostArea, tmplType) {
        togglePostFilter($createPostArea.find("#createPostUl"), tmplType)
        Authority.changeCreatePostAreaByAuthority($createPostArea);
    }

    function togglePostFilter($ul, tmplType) {
        tmplType = tmplType || LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "TMPL_TYPE");
        var $targetLi = $ul.find(".post-filter, .js-post-type-item");
        if (tmplType === "") return $targetLi.css('display', 'block');

        var bundleArray = [
            {code: 'todo', text: i18next.t('dictionary.todo')},
            {code: 'schedule', text: i18next.t('dictionary.schedule')},
            {code: 'task', text: i18next.t('dictionary.task')},
            {code: 'write2', text: i18next.t('dictionary.article')},
        ]

        var isCreatePostArea = $ul.attr("id") === "createPostUl";
        var isCreatePostNav = $ul.hasClass("create-post-nav");
        var resultHtml = "";
        tmplType.split(",").forEach(function (v) {
            if (Number(v) === 1) return; //글작성1.0 제외
            var idx = Number(v) - 2;
            var tempJson = $.extend({"v": v}, bundleArray[idx]);
            var tempHtml = "";
            if (isCreatePostArea) {
                tempHtml += '<li class="post-filter" data-post-code="{v}"><i class="icons-{code}"></i><span>{text}</span></li>';
            } else if (isCreatePostNav) {
                tempHtml += '<li class="js-post-type-item" data-post-code="{v}">' +
                    '<button type="button" class="create-tab tab-{code}" role="tab"><i class="icons-{code}"></i><span>{text}</span></button>' +
                    '</li>';
            }
            if (Number(v) === 5) tempJson.v = 1; //colabo 테이블의 tmpl_type 으로 템플릿을 결정하는데, 그때 글작성2.0은 5로 매칭되는 이슈
            resultHtml += ListHelper.replaceJson(tempHtml, tempJson)
        })
        $ul.empty().html(resultHtml);
    }

    function drawPostList(isUpdate) {
        set$element();
        if (isUpdate) {
            ListHelper.initPageData(detailPageData, "");
        } else {
            ListHelper.initPageData(detailPageData, $detailUl);
            AlarmUpdate.removeNewUpdate();
        }
        detailPageData.ORDER_TYPE = "N";
        drawDetailItems();
    }

    function drawDetailItems() {

        var isClickMorePost = detailPageData.MORE_BUTTON;

        if ((isClickMorePost && detailPageData.PREV_YN === "N") ||
            (!isClickMorePost && detailPageData.NEXT_YN === "N")) return;

        isMoveDirectPost = !isClickMorePost && detailPageData.SEARCH_COMMT_SRNO !== "";
        var isList = "list" === LocalUtil.getFeedType();
        var apiJson = $.extend({}, detailPageData, getDetailJson(isMoveDirectPost || isClickMorePost));
        apiJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;

        Ajax.executeApi(apiJson.API_KEY, apiJson, function (dat) {

            var isFirstPage = (detailPageData.PG_NO === 1);
            var outputArray = dat[apiJson.RECORD_NAME];
            var prevPostExistsYn = outputArray.length > 0 && (!isList || isMoveDirectPost) ? outputArray[0].MORE_YN : "N";

            $detailUl.drawListHelper({
                pageData: detailPageData,
                prevYn: isFirstPage ? prevPostExistsYn : isClickMorePost ? dat["NEXT_YN"] : detailPageData.PREV_YN,
                nextYn: isClickMorePost ? detailPageData.NEXT_YN : dat["NEXT_YN"],
                records: outputArray,
                noDataHtml: ListHelper.getNoDataHtml("POST"),
                reverse: isClickMorePost,
                targetObj: {
                    scroll: $detailTimeline,
                },
                callback: {
                    click: DetailEvent.clickDetailUl,
                    item: function (postArray) {
                        return PostComponent.getHtmlByPostRecord(postArray, isClickMorePost);
                    },
                    scroll: function () {
                        detailPageData.ORDER_TYPE = "N";
                        var lastDetailRecord = detailPostRecord[detailPostRecord.length - 1];
                        if (!lastDetailRecord) return SentryMonitor.captureException(detailPostRecord);
                        var lastRegisterDateTime = Often.null2Void(lastDetailRecord.COMMT_RGSN_DTTM, lastDetailRecord.RGSR_DTTM);
                        if (detailPostRecord.length > 0) detailPageData.COMMT_RGSN_DTTM = lastRegisterDateTime;
                        drawDetailItems();
                    },
                    final: callbackFinal
                }
            })

            function callbackFinal($ul) {

                setPostRecord(isFirstPage, outputArray, isClickMorePost);
                DetailEvent.applySummarySlickImage();
                ItemRemark.addEventOnRemarkInput();
                ItemSubtask.initEdit($detailUl);

                if (isClickMorePost) {
                    detailPageData.MORE_BUTTON = false;
                    detailPageData.SEARCH_COMMT_SRNO = "";
                    $postMoreBtn.css("display", detailPageData.PREV_YN === "Y" ? "block" : "none");
                }

                if (!isFirstPage) return;

                if (detailPostRecord.length !== 0 && !$detailUl.hasClass("list") && isList) {
                    $detailUl.addClass("list");
                } else if (detailPostRecord.length === 0) {
                    $detailUl.removeClass("list");
                } else {
                    //pass
                }

                $detailUl.css("display", "block");
                $postMoreBtn.css("display", isMoveDirectPost && prevPostExistsYn === "Y" ? "block" : "none");
                detailUlKeyEvent($ul)

                if (isMoveDirectPost) {

                    //초기화
                    isMoveDirectPost = false;
                    detailPageData.SEARCH_COMMT_SRNO = "";
                    detailPageData.SRCH_COLABO_REMARK_SRNO = "";
                    if (outputArray && outputArray.length === 10) detailPageData.NEXT_YN = "Y"; //Todo. 디비쪽 문제로 임시방편 처리

                    //하이라이트 이동
                    setPostPosition(true);

                    //팝업 오픈
                    isList && PostPopup.togglePostView(CONNECT_PROJECT_SRNO, CONNECT_POST_SRNO, CONNECT_REMARK_SRNO, DetailEvent.applySummarySlickImage);
                }

                //Todo. 디비쪽 문제로 임시방편 처리 => 이것과 연락이 있어보이네
                var postLength = $detailUl.find(".detail-item").length;
                if (detailPostRecord.length > 0 && detailPageData.NEXT_YN === "N" && postLength === 0) {
                    $ul.prepend(ListHelper.getNoDataHtml("POST"));
                }
            }

            function setPostPosition(isHighlight) {
                var $firstPost = $detailUl.children("li.detail-item:first");
                isHighlight && $firstPost.find(".js-post-nav").addClass("highlight");
                var offsetTop = $firstPost.offset() && $firstPost.offset().top;
                var headerHeight = $(window).innerHeight() - $detailTimeline.outerHeight(true);
                var scrollTop = offsetTop - headerHeight - 46; //46은 ... 까지
                $detailTimeline.animate({scrollTop: scrollTop}, 400, 'swing');
            }
        });
    }

    function getProjectSrno() {
        if ("" !== Often.null2Void(detailPageData.COLABO_SRNO)) return detailPageData.COLABO_SRNO
        detailPageData.COLABO_SRNO = LocalUtil.getLocalValue('CURRENT_PROJECT_SETTING', 'COLABO_SRNO');
        return LocalUtil.getLocalValue('CURRENT_PROJECT_SETTING', 'COLABO_SRNO');
    }

    function setProjectSrno(projectSrno) {
        detailPageData.COLABO_SRNO = projectSrno;
    }

    function getPostRecord() {
        return detailPostRecord;
    }

    function setPostRecord(isFirstPage, record, isMorePost) {
        if (isFirstPage) detailPostRecord = record;
        else if (isMorePost) detailPostRecord = record.reverse().concat(detailPostRecord);
        else detailPostRecord = detailPostRecord.concat(record);
    }

    function detailUlKeyEvent($ul) {
        $ul.off("keyup").on("keyup", function (e) {
            if (SubtaskKeyEvent.keyUpSubtaskInput(e)) return;
        })
        $ul.off("keydown").on("keydown", function (e) {
            if (SubtaskKeyEvent.KeyDownSubtaskInput(e)) return;
        })

    }

    function closeSettingUl() {
        $(".js-setting-ul").fadeOut(200);
    }

    function setInitFeedType() {
        var isPostViewFunc = Often.isFunc(Func.CLOUD.POST_VIEW_SELECT);
        var feedType = isPostViewFunc ? LocalUtil.getFeedType() : "card";
        setFeedType(feedType);
        var $feedTypeButton = $("#feedTypeButton");
        if (isPostViewFunc) {
            $feedTypeButton.find(".feed-type-button.card").css("display", "inline-block");
            $feedTypeButton.find(".feed-type-button.list").css("display", "inline-block");
        } else {
            $feedTypeButton.find(".feed-type-button.card").css("display", "none");
            $feedTypeButton.find(".feed-type-button.list").css("display", "none");
        }
        $feedTypeButton.find(".check-menu-item").removeClass("on");
        $feedTypeButton.find(".check-menu-item:eq(0)").addClass("on");
        $feedTypeButton.find(".js-feed-filter-button").removeClass("active");
    }

    function closeFeedFilter() {
        var $feedTypeButton = $("#feedTypeButton");
        $feedTypeButton.find(".js-feed-filter-layer").fadeOut(200);
    }

    function setFeedType(feedType) {
        var $feedTypeButton = $("#feedTypeButton");
        $feedTypeButton.find(".feed-type-button").removeClass("on");
        $feedTypeButton.find(".feed-type-button." + feedType).addClass("on");
        $("#detailUl").attr("class", "post-group " + feedType);
        // detailPageData.PG_PER_CNT = (feedType === "list" ? 20 : 10);
    }

    function getPostStatus() {
        return $("#postPopup").find(".js-popup-before").attr("data-code")
    }

    function drawHashtagPostList() {
        set$element();
        ListHelper.initPageData(detailPageData, $detailUl);
        drawHashtagDetailItem();
    }

    function drawHashtagDetailItem() {
        if (detailPageData.NEXT_YN === "N") return;
        var detailJson = getDetailJson();
        Ajax.executeApi(detailJson.API_KEY, $.extend({}, detailPageData, detailJson), function (dat) {
            $detailUl.drawListHelper({
                pageData: detailPageData,
                nextYn: dat['NEXT_YN'],
                records: dat[detailJson.RECORD_NAME],
                targetObj: {
                    scroll: $detailTimeline,
                },
                callback: {
                    click: DetailEvent.clickDetailUl,
                    item: PostComponent.getHtmlByPostRecord,
                    scroll: drawHashtagDetailItem,
                    final: callbackFinal,
                }
            })
            $detailUl.removeClass("d-none");

            function callbackFinal() {
                ItemRemark.addEventOnRemarkInput();
            }
        })
    }

    function getDetailJson(isMoveDirectPost) {

        /**
         * Note. 복잡해진 이유
         * 1. ACT_POST_LIST 에는 MoveDirectPost 기능이 아직 없어 기존 COLABO2_R104 를 활용해야함.
         * 2. ACT_POST_LIST 에는 해시태그 필터가 있으나 COLABO2_R104는 없어 COLABO2_AT_ME_R101과 같이 활용해야함.
         */

        var tagName = Often.null2Void($detailTimeline.find("#hashtagUl").find(".hashtag.on:eq(0)").text(),
            $detailTimeline.find("#allPostsFilterTitle").text());
        tagName = tagName.indexOf("#") > -1 ? tagName.replace("#", "") : "";
        var isHashTag = "" !== tagName;
        var isList = "list" === LocalUtil.getFeedType();
        var tmplTypeCode = Often.null2Void($projectFeedArea.find(".js-feed-filter-layer").find(".check-menu-item.on").attr("data-code"));
        var projectSrno = getProjectSrno();
        var openYn = LocalUtil.getProjectOpenYn();
        var apiKey, gb, recordName;

        if (isHashTag) {
            if (isList) {
                apiKey = RenewalApi.GET.ACT_POST_LIST;
                gb = "DETAIL";
                recordName = "POST_RECORD";
            } else {
                apiKey = RestApi.GET.COLABO2_AT_ME_R101;
                gb = "HASH";
                recordName = "COMMT_REC"; //Todo. ACT_POST_FEED 신규 작업
            }
        } else if (isMoveDirectPost || detailPageData.COMMT_RGSN_DTTM) {
            if (isList) {
                apiKey = RestApi.GET.COLABO2_R104;
                gb = "NEWLIST";
                recordName = "LIST_REC"; //Todo. ACT_POST_LIST 수정 작업 (이동가능한)
            } else {
                apiKey = RestApi.GET.COLABO2_R104;
                gb = "";
                recordName = "COMMT_REC"; //Todo. ACT_POST_FEED 신규 작업
            }
        } else {
            if (isList) {
                apiKey = RenewalApi.GET.ACT_POST_LIST;
                gb = "DETAIL";
                recordName = "POST_RECORD";
            } else {
                apiKey = RestApi.GET.COLABO2_R104;
                gb = "";
                recordName = "COMMT_REC"; //Todo. ACT_POST_FEED 신규 작업
            }
        }

        return {
            API_KEY: apiKey,
            GUBUN: gb,
            TMPL_TYPE: tmplTypeCode,
            TAG_NM: tagName,
            COLABO_SRNO: projectSrno,
            RECORD_NAME: recordName,
            OPEN_YN: openYn,
        }
    }

    function updateOnePostElement(status, COLABO_SRNO, COLABO_COMMT_SRNO) {

        var $detailUl = $('#detailUl');
        var $currentPostItem = $detailUl.find('#post-' + COLABO_COMMT_SRNO);

        if (status === 'POST' || status === 'EDIT') {
            PostPopup.getPostData(COLABO_SRNO, COLABO_COMMT_SRNO, "", false, function () {
                var tmplTypeCode = Often.null2Void($projectFeedArea.find(".js-feed-filter-layer").find(".check-menu-item.on").attr("data-code"));
                var postDataRecord = PostPopup.getData().POST_RECORD;
                if (tmplTypeCode !== "" && postDataRecord[0].TMPL_TYPE !== tmplTypeCode) return;
                var $newPostItem = $(PostComponent.getHtmlByPostRecord(postDataRecord));
                $detailUl.find("#noDetailData").remove();
                $newPostItem.find(".js-remark-area").off("keydown keyup").on({
                    keydown: ItemRemark.keyDownRemarkInput,
                    keyup: ItemRemark.keyUpRemarkInput,
                });
                ItemSubtask.initEdit($newPostItem);

                if (status === 'POST') {
                    $detailUl.prepend($newPostItem);
                    DetailEvent.applySummarySlickImage();
                } else {
                    $currentPostItem.after($newPostItem);
                    DetailEvent.applySummarySlickImage();
                    $currentPostItem.remove();
                }
            });
        } else if (status === 'DELETE') {
            PostPopup.removePopup();
            UpdateElements.autoUpdateElem();
        } else {
            //pass
        }
    }

    function clickPostMore() {
        if ("list" === LocalUtil.getFeedType()) {
            detailPageData.SEARCH_COMMT_SRNO = Often.null2Void(detailPostRecord[0].COLABO_COMMT_SRNO);
        }
        detailPageData.COMMT_RGSN_DTTM = Often.null2Void(detailPostRecord[0].COMMT_RGSN_DTTM, detailPostRecord[0].RGSR_DTTM);
        detailPageData.ORDER_TYPE = "P";
        detailPageData.MORE_BUTTON = true;
        $detailLayer.find(".highlight").removeClass("highlight");
        drawDetailItems();
    }

    function executeProjectSettingInfo(projectSrno, callback) {
        Ajax.executeApi(RenewalApi.GET.ACT_PROJECT_INFO, {
            COLABO_SRNO: projectSrno,
            GUBUN: "SETTING",
        }, function (infoData) {
            var projectSettingRecord = Often.null2Void(infoData["PROJECT_SETTING"] && infoData["PROJECT_SETTING"][0], {});
            LocalUtil.setLocalJson("POP_PROJECT_SETTING", projectSettingRecord);
            (typeof callback === "function") && callback(projectSettingRecord);
        })
    }

    function stackProjectHistory(projectNumber, backGroundColor, title) {
        Ajax.executeApi(RestApi.POST.COLABO_USER_HISTORY_C001, {
            COLABO_SRNO: projectNumber,
            BG_COLOR_CD: backGroundColor,
            TTL: Often.null2Void(title, '-')
        })
    }

})();