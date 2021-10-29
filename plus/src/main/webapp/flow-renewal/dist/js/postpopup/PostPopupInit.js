var PostPopupInit = (function () {

    var $uploadArea, $popupBefore, $contentArea;

    return {
        initEditPopup: initEditPopup,
        initViewPopup: initViewPopup,
    }

    function set$element($postPopup) {
        $popupBefore = $postPopup.find(".js-popup-before"); //팝업=탭+콘텐츠+바텀
        $contentArea = $postPopup.find(".js-content-area"); //콘텐츠=제목+글입력부
        $uploadArea = $postPopup.find('.js-upload-area'); //글입력부
        /**
         *  <div id="postPopup" data-code="ADD|EDIT" data-before-view="NO_POP|POP">
         *      <div class="js-popup-before edit-item" data-code="ADD|EDIT|VIEW">
         *          <div class="js-dimd-layer" contenteditable="true"></div>
         *          <div class="js-post-nav write|write2|task|schedule|todo"></div>
         *          <div class="scroll-mask">
         *              <div id="postCntn" class="js-content-area">
         *                  <div class="js-upload-area js-paste-layer" contenteditable="true"><div>
         *              </div>
         *              <div id="postAttached"></div>
         *          </div>
         *      </div>
         *  </div>
         */
    }

    function initEditPopup($postPopup, onePostData, isOnTab) {

        var postCondition = PostCondition.getPostCondition(PostCondition.getPopupMode($postPopup), onePostData);
        var postCode = postCondition.postCode;
        var isIamSubtask = onePostData.SUBTASK_YN === "Y";
        var isExistsData = Object.keys(onePostData).length > 0;
        var isViewPost = $postPopup.attr("data-code") === "VIEW";
        var popupMode = PostCondition.getPopupMode($postPopup);

        set$element($postPopup);

        fillPopupByPostCode();
        initPostEditTabAndBottom($postPopup, onePostData, isOnTab);

        postCode === DetailCode.SCHEDULE && ItemSchedule.initEdit($postPopup, onePostData);
        postCode === DetailCode.TASK && ItemTask.initEdit($postPopup, onePostData);
        postCode === DetailCode.TODO && ItemTodo.initEdit($postPopup);
        postCode === DetailCode.TASK && !isIamSubtask && ItemSubtask.initEdit($postPopup, onePostData);

        //PopupEvent에서 innerPopup을 띄울 시 DetailEvent에서 innerPopup 종료시키는 이슈가 있어 DetailEvent 먼저 실행 처리
        $postPopup
            .off("click")
            .on("click", DetailEvent.clickDetailUl)
            .on("click", PostPopupEvent.clickPopupArea)
            .off("mousedown").on("mousedown", PostPopupEvent.mouseDownPopupArea)
            .off("mouseup").on("mouseup", PostPopupEvent.mouseUpPopupArea)
            .off("keyup").on("keyup", PostPopupEvent.keyupPopupArea)
            .off("keydown").on("keydown", PostPopupEvent.keydownPopupArea);

        $contentArea.off("keydown").on("keydown", PostPopupEvent.KeyDownContentsArea);

        $postPopup.find(".create-post-container").off("scroll").on("scroll", PostPopupEvent.scrollHideAndRemovePopupLayer);
        postCode !== DetailCode.TODO && $postPopup.find(".create-title-input").focus();

        function fillPopupByPostCode() {
            if (postCode === DetailCode.SCHEDULE) return $contentArea.append(ItemSchedule.getLookHtml());
            if (postCode === DetailCode.TODO) {
                $contentArea.append(ItemTodo.getLookHtml());
                isExistsData && fillPostByData();
                return;
            }

            $contentArea.append($("#uploadDiv").html());

            postCode === DetailCode.TASK && $contentArea.before(ItemTask.getLookHtml());
            postCode === DetailCode.TASK && !isIamSubtask && $contentArea.after(ItemSubtask.getLookHtml());

            $contentArea.after($("#postAttachedItem").html());
            set$element($postPopup); //$uploadArea 할당

            isExistsData && fillPostByData();
        }

        function fillPostByData() {

            fillTitle();
            fillContentEditable();
            fillRangeType();

            if (postCode === DetailCode.TODO) return ItemTodo.getTodoDataListHtml(onePostData);
            if (postCode === DetailCode.TASK) {
                ItemTask.changeTaskViewByData($postPopup, onePostData.TASK_REC[0]);
                Often.isFunc(Func.CLOUD.COPY_SUBTASK_CONTENTS) && $postPopup.find(".js-subtask-ul").append(ItemSubtask.getCompHtml(onePostData.SUBTASK_REC, !isViewPost));
            }

            function fillRangeType() {
                var rangeType = onePostData.RANGE_TYPE
                var privateBtnAddClass = (rangeType === 'A') ? 'full' : 'admin'
                var privateBtnAddText = rangeType === 'A' ? i18next.t('front.common.public') :
                    i18next.t('prefix.only', {val: '$t(front.common.projectManager)'})
                var privateBtnRemoveClass = (rangeType === 'A') ? 'admin' : 'full'
                $postPopup.find('.private-button').addClass(privateBtnAddClass)
                    .removeClass(privateBtnRemoveClass).text(privateBtnAddText)
            }

            function fillTitle() {
                $postPopup.find("#postTitle").val(TagUtil.html2tag(onePostData.COMMT_TTL));
            }

            function fillContentEditable() {

                var postContents = Often.null2Void(onePostData.CNTN);
                var isNewStyle = PostCondition.isNewStyleByCntn(onePostData);
                var componentsArray = JsonMaker.str2json(isNewStyle ? postContents : JsonMaker.convertJsonString(onePostData));

                if (componentsArray.length === 0) {
                    $uploadArea.append(TagConvert.db2HtmlStringByPost(postContents, popupMode));
                    return;
                }

                componentsArray.forEach(function (component) {
                    if (component.COMP_TYPE === "TEXT") {
                        $uploadArea.append(TagConvert.db2HtmlStringByPost(component.COMP_DETAIL.CONTENTS, popupMode));
                        return;
                    }

                    if (component.COMP_TYPE === "IMAGE" || component.COMP_TYPE === "FILE") {
                        PostAppend.appendFileOrImg($postPopup, component.COMP_DETAIL);
                        return;
                    }

                    if (component.COMP_TYPE === "LINK") {
                        PostAppend.appendLink($postPopup, component.COMP_DETAIL);
                        return;
                    }

                    if (component.COMP_TYPE === "MAP") {
                        PostAppend.appendMap($postPopup, component.COMP_DETAIL);
                    }
                })
            }
        }
    }

    function initPostEditTabAndBottom($postPopup, onePostData, isOnTab) {

        set$element($postPopup);

        var postCondition = PostCondition.getPostCondition(PostCondition.getPopupMode($postPopup), onePostData);
        var postCode = postCondition.postCode;
        var titleCode = DetailCode.POST._TEXT[postCode];

        var isExistsData = Object.keys(onePostData).length > 0;

        if (isExistsData || (!isExistsData && !isOnTab)) {
            $postPopup.find(".create-post-nav").addClass("no-tab");
            $postPopup.find(".create-post-title").text(i18next.t(titleCode) + " "
                + i18next.t(isExistsData ? "dictionary.edit" : "dictionary.write"));
            $postPopup.find(".create-post-submit").addClass(isExistsData ? '' : 'new-task');
        } else {
            $postPopup.find(".create-post-nav").on("click", clickPostTypeItems);
            $postPopup.find(".create-post-title").text(i18next.t("front.common.writePost"));
        }

        initPlaceholder();
        initPostEditBottom();
        if (!Often.isFunc(Func.ENTER.GOOGLE_MAP)) return;
        initGoogleMap();

        function clickPostTypeItems(e) {
            var $eTarget = $(e.target);
            var $postTypeItem = $eTarget.findUp(".js-post-type-item");
            if ($postTypeItem.length === 0) return;
            PostPopup.checkWritingAndShowPopup(function () {
                PostPopup.openRegistrationView(ViewChanger.getProjectSrno(), $postTypeItem.attr("data-post-code"), true);
            }, "ADD_TAB")
        }

        function initPlaceholder() {
            !isExistsData && $uploadArea.html("");
            $uploadArea.attr('placeholder', i18next.t("front.common.enterContext"))
        }

        function initPostEditBottom() {

            var funcCondition = PostCondition.getFuncCondition(PostCondition.getPopupMode($postPopup), onePostData);
            $postPopup.find("[data-code=upload-file]").css('display', funcCondition.isUpload ? 'inline-block' : 'none');
            $postPopup.find("[data-code=google-place]").css('display', funcCondition.isGooglePlace ? 'inline-block' : 'none');
            $postPopup.find("[data-code=hash-tag]").css('display', funcCondition.isHashTag ? 'inline-block' : 'none');
            $postPopup.find("[data-code=mention-tag]").css('display', funcCondition.isMentionTag ? 'inline-block' : 'none');
            $postPopup.find("[data-code=style-tag]").css('display', funcCondition.isStyleTag ? 'inline-block' : 'none');

            $postPopup.find(".js-editing-buttons").css('display', isExistsData ? 'inline-block' : 'none');
            $postPopup.find(".js-complete-btn.create-button").css('display', isExistsData ? 'none' : 'inline-block');
        }

        //Note. 구글맵 추가 경로는 하단 버튼 뿐이기에 버튼만 제어하면 모두 허용
        function initGoogleMap() {
            var $mapButton = $postPopup.find(".js-map-button");
            var $placeInput = $mapButton.next().find("input");
            GoogleMap.addSearchEvent($placeInput, searchPlaceCallback);

            function searchPlaceCallback(mapData) {
                PostAppend.appendMadeObj($uploadArea, PostComponent.getMapObj(mapData));
                $mapButton.removeClass('active');
                $mapButton.next().css('display', 'none');
            }
        }
    }

    function initViewPopup($postPopup, data, isPop, callback) {

        var upTaskSrno = Often.null2Void($postPopup.find(".js-up-task-button").attr("data-up-task-srno"));
        var isSubtask = upTaskSrno.length > 0;
        var isTask = $postPopup.find(".card-item").hasClass("task");

        $postPopup.find(".list-item").css("display", "none");
        $postPopup.find(".detail-item").addClass("back-area");
        $postPopup.find(".post-popup-header").css("display", "block");

        var $projectTitleColor = $("#projectTitleColor");
        ListHelper.removeAllColorClass($projectTitleColor);
        $projectTitleColor.addClass("color-code-" + LocalUtil.getPopProjectBgColorCd());

        changePopupMode(isPop ? "POP" : "SIDE");

        !isSubtask && $postPopup.find("#movePost").css("display", "inline-block");
        isTask && ItemTask.initEdit($postPopup, data);
        isTask && ItemSubtask.initEdit($postPopup);
        (!Electron.isElectronApp() && Often.isAct("subscreen")) && $postPopup.find(".btn-close").css("display", "none");

        (typeof callback === "function") && callback(data);

        $postPopup.off("mousedown").off("keyup").off("keydown").off("click")
            .on("click", PostPopupEvent.clickPopupArea).on("click", DetailEvent.clickDetailUl)
            .on({
                mousedown: PostPopupEvent.mouseDownPopupArea,
                keyup: PostPopupEvent.keyupPopupArea,
                keydown: PostPopupEvent.keydownPopupArea,
            });
        $postPopup.find(".post-card-scroll").off("scroll").on("scroll", function (e) {
            PostPopupEvent.scrollHideAndRemovePopupLayer(e);
            PostPopupEvent.addScrollFixed(e);
        });
        $postPopup.find(".js-remark-area").off("keydown").off("keyup")
            .on({
                keydown: ItemRemark.keyDownRemarkInput,
                keyup: ItemRemark.keyUpRemarkInput,
            });

        $(window).on("resize", function () {
            PostPopupEvent.addScrollFixed();
        });

        function changePopupMode(mode) {
            if (mode === "POP") { // 팝업 조회
                $postPopup.addClass("flow-all-background-1");
                $postPopup.find(".post-card-wrapper").removeClass("side")
            } else { // 사이드에서 상세 조회
                $postPopup.removeClass("flow-all-background-1");
                $postPopup.find(".post-card-wrapper").addClass("side")
            }
        }
    }

})();