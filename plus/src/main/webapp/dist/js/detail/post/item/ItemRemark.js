var ItemRemark = (function () {

    var $remarkArea;
    var macKeyEventFlag = false;
    var preKeyCode = 0;

    return {
        clickFileUpload: clickFileUpload,
        getRemarkItemHtml: getRemarkItemHtml,
        getRemarkDataHtml: getRemarkDataHtml,
        addEventOnRemarkInput: addEventOnRemarkInput,
        drawUploadFile: drawUploadFile,
        updateRemarkData: updateRemarkData,

        getRemarkWriteConditionJson: getRemarkWriteConditionJson,

        isCommentWriterButtonAndAction: isCommentWriterButtonAndAction,
        isShowPrevRemarkButtonAndAction: isShowPrevRemarkButtonAndAction,
        isShowMoreRemarkButtonAndAction: isShowMoreRemarkButtonAndAction,
        isPostCommentGroup: isPostCommentGroup,
        keyDownRemarkInput: keyDownRemarkInput,
        keyUpRemarkInput: keyUpRemarkInput,
        isRemarkLikeButtonAndAction: isRemarkLikeButtonAndAction,
        isRemarkLikeCountButtonAndAction: isRemarkLikeCountButtonAndAction,
        isRemarkDeleteFileButtonAndAction: isRemarkDeleteFileButtonAndAction,
        isRemarkImgAndAction: isRemarkImgAndAction,
        isRemarkFileAndAction: isRemarkFileAndAction,
        isStickyRemarkAreaAndAction: isStickyRemarkAreaAndAction,
    }

    function clickFileUpload($remarkLayer) {
        Upload.uploadFile("any", function (fileData) {
            drawUploadFile(fileData, $remarkLayer);
        })
    }

    function drawUploadFile(fileData, $currentArea) {
        fileData.FILE_NAME = fileData.FILE_NM;
        var isImage = ImageUtil.isImageType(fileData);
        var returnHtml = isImage ? PostComponent.getImgHtml("<li>" + $("#imageComponent").html() + "</li>", fileData) :
            PostComponent.getFileHtml("<li>" + $("#fileComponent").html() + "</li>", fileData);
        var uploadType = isImage ? "img" : "file";

        var isFileExceeded = $currentArea.find(".js-post-file").length >= 20;
        var isImageExceeded = $currentArea.find(".js-post-img").length >= 20;

        if ((isFileExceeded && uploadType === "file") || (isImageExceeded && uploadType === "img")) {
            Often.toast("error", i18next.t('front.alert.uploadWarning', {
                val: isImage ? "$t(dictionary.image)" : "$t(dictionary.file)",
                count: 20
            }));
            return true;
        }

        var $uploadArea = $currentArea.find(".js-remark-upload-" + uploadType);
        ("" === $uploadArea.html() && isImage) && $uploadArea.append("<div>&nbsp;</div>\n") //이미지 첨부 시 한 줄 띄어주기 위해
        var $uploadObj = $(returnHtml)
        $uploadArea.append($uploadObj).focus();
        if ($uploadObj.offset().top > window.innerHeight) {
            var isPopup = $currentArea.parents("#postPopup").length > 0;
            var $scrollObj = isPopup ? $currentArea.parents(".post-card-scroll") : $currentArea.parents(".layer-scroll");
            var scrollTop = $scrollObj.scrollTop();
            var remarkHeight = 200; // 첨부파일 element만큼 스크롤 이동
            $scrollObj.scrollTop(scrollTop + remarkHeight + ($uploadObj.offset().top - window.innerHeight));
        }
        $uploadArea.find(".js-down-btn").css('display', 'none');
        $uploadArea.find(".js-del-btn").css('display', 'block');
    }

    function getRemarkItemHtml(remarkArray) {
        if (remarkArray === undefined) return '';
        var baseHtml = $("#remarkItem").html();
        var isWriteRemarkOk = Authority.isAuthorityCheck("REMARK");

        var returnHtml = "";
        $.each(remarkArray, function (i, remarkData) {
            var isExistsLikeCount = ("0" !== Often.null2Void(remarkData.EMT_CNT, "0"));
            var fileData = remarkData.ATCH_REC ? remarkData.ATCH_REC : remarkData.REMARK_ATCH_REC;
            var imgData = remarkData.IMG_ATCH_REC ? remarkData.IMG_ATCH_REC : remarkData.REMARK_IMG_ATCH_REC;
            if (remarkData.REMARK_CNTN[remarkData.REMARK_CNTN.length - 1] === "\n") {
                remarkData.REMARK_CNTN = remarkData.REMARK_CNTN.slice(0, -1);
            }
            var isSelfEmoticon = Often.null2Void(remarkData.EMT_SELF_YN, "N") === "Y";
            returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, {
                'data-remark-srno': remarkData.COLABO_REMARK_SRNO,
                'position': '', // 전문에서 보내줘야 함!
                'name': remarkData.RGSR_NM,
                'date': Tz.momentTimeZone(remarkData.RGSN_DTTM, 'type1'),
                'contents': TagConvert.db2HtmlStringByRemark(remarkData.REMARK_CNTN),
                'like-count': remarkData.EMT_CNT,
                'profile': ListHelper.setProfile(remarkData.PRFL_PHTG),
                'like-yn': isExistsLikeCount ? "on" : "",
                'file-area': getRemarkFileItemHtml(fileData),
                'image-area': getRemarkImageItemHtml(imgData),
                'modify-yn': (Often.null2Void(remarkData.MODIFY_YN, "N") === "Y") ? "on" : "",
                'delete-yn': (Often.null2Void(remarkData.DELETE_YN, "N") === "Y") ? "on" : "",
                'emt-self-yn': (Often.null2Void(remarkData.EMT_SELF_YN, "N") === "Y") ? "on" : "",
                'emt-button-text': i18next.t(isSelfEmoticon ? "front.common.unDoLike" : "dictionary.like"),
                'admin-write-yn': isWriteRemarkOk ? "" : "admin",
                'comment-user-id': remarkData.RGSR_ID,
            }, getRemarkWriteConditionJson(isWriteRemarkOk)))
        })
        return returnHtml;
    }

    function getRemarkWriteConditionJson(isWriteRemarkOk) {
        var placeHolderText;
        if (isWriteRemarkOk) {
            placeHolderText = i18next.t('front.common.textLine');
        } else {
            placeHolderText = i18next.t('front.common.adminWriteOnly', {type: '$t(dictionary.comment)'});
        }
        return {
            'remark-placeholder': placeHolderText,
            'remark-contenteditable': isWriteRemarkOk
        }
    }

    function getRemarkFileItemHtml(fileDataArray) {
        if (fileDataArray === undefined || fileDataArray.length === 0) return '';
        var baseHtml = $("#fileComponent").html();
        var returnHtml = "";
        $.each(fileDataArray, function (i, fileData) {
            returnHtml += PostComponent.getFileHtml("<li>" + baseHtml + "</li>", fileData);
        })
        return returnHtml
    }

    function getRemarkImageItemHtml(imageDataArray) {
        if (imageDataArray === undefined) return '';
        var baseHtml = $("#imageComponent").html();
        var returnHtml = "";
        $.each(imageDataArray, function (i, imageData) {
            returnHtml += PostComponent.getImgHtml("<li>" + baseHtml + "</li>", imageData);
        })
        return returnHtml
    }

    function isCommentWriterButtonAndAction($eTarget) {
        var $remarkEditButton = $eTarget.findUp(".js-remark-edit-button");
        var isRemarkUpdateButton = $remarkEditButton.hasClass("js-remark-update");
        var isRemarkDeleteButton = $remarkEditButton.hasClass("js-remark-delete");
        if (!isRemarkUpdateButton && !isRemarkDeleteButton) return false;
        var $detailItem = $eTarget.findUp(".detail-item");
        var $remarkItem = $eTarget.findUp(".remark-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        var remarkSrno = $remarkItem.attr("remark-srno");

        var isAdmin = Authority.isAuthorityCheck("ADMIN", projectSrno);
        var isWriteRemarkOk = Authority.isAuthorityCheck("REMARK", projectSrno);

        if (isRemarkUpdateButton) {
            if (!isAdmin && !isWriteRemarkOk) {
                Often.toast("error", i18next.t('front.common.adminWriteOnly', {type: '$t(dictionary.comment)'}));
                return;
            }

            showEdit($remarkItem);
            return true;
        }
        if (isRemarkDeleteButton) {
            removeRemark($remarkItem, projectSrno, postSrno, remarkSrno);
            return true;
        }
    }

    function removeRemark($remarkItem, projectSrno, postSrno, remarkSrno) {
        PopupDraw.drawConfirm({
            await: true,
            contents: {
                main: i18next.t('front.common.ask', {
                    val: '$t(dictionary.comment)',
                    status: '$t(dictionary.delete)'
                })
            },
            callback: {submit: submitRemoveRemark}
        })
        $("#tempPopup").focus();

        function submitRemoveRemark() {
            PopupDraw.closePopup();
            Ajax.executeApi(RestApi.DELETE.COLABO2_REMARK_D101, {
                COLABO_SRNO: projectSrno,      //프로젝트넘버
                COLABO_COMMT_SRNO: postSrno,    //포스트넘버
                COLABO_REMARK_SRNO: remarkSrno
            }, function (dat) {
                $remarkItem.findUp(".detail-item").find(".comment-count").text(dat.TOT_CNT);
                $remarkItem.fadeOut(200, function () {
                    $remarkItem.remove();
                });
                var $detailItem = $remarkItem.findUp(".detail-item");
                if ($detailItem.find(".js-remark-prev-button").hasClass("on") && $detailItem.find(".remark-item").length < 3) {
                    var $commentArea = $detailItem.find(".js-comment-area");
                    $commentArea.find(".remark-item").remove();
                    getRemarkDataHtml($commentArea, {
                        MODE: OftenCode.DELETE,
                        ORDER_TYPE: OftenCode.DELETE,
                        COLABO_SRNO: projectSrno,
                        COLABO_COMMT_SRNO: postSrno,
                    });
                }
                $detailItem.findUp("#postPopup").length !== 0 && UpdateElements.autoUpdateElem();

                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.delete)'}));
            });
        }

    }

    function addEventOnRemarkInput() {
        $(".js-remark-area").off("keydown").off("keyup")
            .on("keydown", keyDownRemarkInput)
            .on("keyup", keyUpRemarkInput);
    }

    function keyUpRemarkInput(e) {
        Mention.keyUpCheckMention(e);

        // 댓글 영역에 html태그가(<br>) 남아 있으면 placeholder가 안보이기 때문에 비워주기 위함.
        if (KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "DELETE")) {
            var $remarkInput = $(e.target).findUp(".js-remark-area");
            var isEmptyText = $remarkInput.text();
            if (isEmptyText === "") $remarkInput.empty();
            return;
        }

        if ((e.shiftKey && KeyCheck.isKey(e, "ENTER")) || !KeyCheck.isKey(e, "ENTER")) {
            if ($(e.target).findUp(".js-edit-layer").length === 0) return;
            var $postPopup = $(e.target).findUp("#postPopup");
            var $postScroll = $postPopup.find(".post-card-scroll");
            $postScroll.moveToBottom(false);
            return;
        }
    }

    function keyDownRemarkInput(e) {

        KeyCheck.isStyleCommand(e) && e.preventDefault();

        $remarkArea = $(e.target);

        var $remarkForm = $remarkArea.parents(".js-remark-form");
        var isAdminAuthority = $remarkForm.hasClass("admin");
        if (Authority.isAdminAuthorityCheckAndAction(isAdminAuthority, e)) return;

        var $postPopup = $remarkArea.findUp("#postPopup");
        var $postDetail = $remarkArea.findUp("#detailUl");

        e.stopPropagation();

        var isCtrl = e.ctrlKey;
        var isShift = e.shiftKey;
        var isEnter = KeyCheck.isKey(e, "ENTER");
        var isEscape = KeyCheck.isKey(e, "ESC");

        var isEdit = $remarkArea.findUp(".js-remark-edit").length > 0;

        if (isEdit && isEscape) {
            if(isCheckEditRemark($remarkArea)){
                PopupDraw.drawConfirm({
                    contents: {main: i18next.t('front.alert.leaveWriting')},
                    callback: {
                        submit: function () {
                            cancelEdit($remarkArea.findUp(".remark-item"));
                            PopupDraw.closePopup();
                        },
                        cancel: function () {
                            PopupDraw.closePopup();
                            $remarkArea.focus();
                        }
                    }
                })
                $("#tempPopup").focus();
            } else {
                cancelEdit($remarkArea.findUp(".remark-item"));
            }
            return;
        }

        var $remarkLayer = $remarkArea.findUp(".js-remark-layer");
        var $uploadFiles = $remarkLayer.find(".js-remark-upload-file li");
        var $uploadImages = $remarkLayer.find(".js-remark-upload-img li");

        // submitRemark 선행
        if ($postPopup.find("#innerCommonPopup[data-code=mention]").is(":visible")
            || $postDetail.find("#innerCommonPopup[data-code=mention]").is(":visible")) {
            if (isEnter && preKeyCode === 229 && (Often.getClientOSInfo().isMac || Often.isBrowser("ie"))) macKeyEventFlag = true;
            preKeyCode = e.keyCode;
            Mention.keyDownArrow(e);
            return;
        }

        if (!isCtrl && !isShift && isEnter) {
            e.preventDefault();
            preKeyCode = 0;
            if(macKeyEventFlag) {
                macKeyEventFlag = false;
                return;
            }
            var isExistsFile = $uploadFiles.length > 0;
            var isExistsImage = $uploadImages.length > 0;
            if ($.trim($remarkArea.text()) === "" && !isExistsFile && !isExistsImage) {
                Often.toast("error", i18next.t('front.common.enterContext', {val: '$t(dictionary.comment)'}));
                return;
            }
            UploadHandler.isUploadingAndCallback(function () {
                submitRemark($remarkArea, isEdit)
            })
            return;
        }

        // submitRemark 후행
        if ($remarkLayer.hasClass("sticky")) {
            if ($(e.target).findUp(".js-edit-layer").length === 0) return;
            var $postScroll = $postPopup.find(".post-card-scroll");
            $postScroll.moveToBottom(true);
            $remarkLayer.removeClass("sticky");
            return;
        }
    }

    function submitRemark($remarkArea, isEdit) {
        var returnText = "";
        var childNodeLength = $($remarkArea[0].childNodes).length;
        if (isEdit) {
            var preNode = "";
            $.each($($remarkArea[0].childNodes), function (index, node) {
                var $currentNode = $(node);
                var isNewLine = index === 0 || (preNode.nodeName !== "#text" && preNode.innerHTML.indexOf("\n") > -1);
                var isNotLastBr = (index !== childNodeLength - 1) && node.innerHTML === "<br>";
                if ($currentNode.hasClass("js-hidden-component")) return;
                (node.nodeName === 'DIV' && returnText !== "" && !isNewLine) && (returnText += '\n');
                !isNotLastBr && (returnText += TagConvert.html2DbStringByPost(node.outerHTML || node.innerHTML || node.textContent));
                preNode = node;
            })
        }

        var remarkCntn = TagConvert.html2DbStringByRemark(isEdit ? returnText : $remarkArea.html());
        remarkCntn += (remarkCntn[remarkCntn.length - 1] === "\n") ? "" : "\n";

        var $detailItem = $remarkArea.findUp(".detail-item");
        var $remarkInputLayer = $remarkArea.findUp(".js-remark-layer");
        var $uploadImg = $remarkInputLayer.find(".js-post-img");
        var $uploadFile = $remarkInputLayer.find(".js-post-file");
        var flowSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        var remarkSrno = "";
        var serviceId = "";
        var mode = "";

        if (isEdit) {
            serviceId = RestApi.PUT.COLABO2_REMARK_U101;
            remarkSrno = $remarkArea.findUp(".remark-item").attr("remark-srno");
            mode = OftenCode.EDIT;
        } else {
            serviceId = RestApi.POST.COLABO2_REMARK_C101;
            remarkSrno = "";
            mode = OftenCode.CREATE;
        }

        var settingData = {
            COLABO_SRNO: flowSrno,
            COLABO_COMMT_SRNO: postSrno,
            COLABO_REMARK_SRNO: remarkSrno,
            CNTN: remarkCntn,
            COMMT_ATCH_REC: Often.getAttrs($uploadFile),
            COMMT_EDITOR_REC: Often.getAttrs($uploadImg),
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }

        Mention.clearMention();
        //사진, 이미지 정보가 미리보기 화면에 존재하면 이를 data로 치환 후 해당 정보를 settingData로 보내줘야 함!
        Ajax.executeApi(serviceId, settingData, function (dat) {
            // 댓글 등록 후 화면 갱신
            $remarkArea.text("");
            getRemarkDataHtml($remarkArea, $.extend({}, settingData, {
                MODE: mode,
                ORDER_TYPE: OftenCode.EQUAL,
                SRCH_COLABO_REMARK_SRNO: dat.COLABO_REMARK_SRNO,
            }));

            if (mode !== OftenCode.CREATE) return;

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: settingData.COLABO_SRNO,
                POST_SRNO: settingData.COLABO_COMMT_SRNO,
                REMARK_SRNO: dat.COLABO_REMARK_SRNO,
                REMARK_UPDATE: true,
            });
        });

    }

    /**
     *            mode  C: CREATE, E: EDIT, M: MORE
     *            baseRemarkSrno 기준이 되는 remark srno
     *            orderType P: Prev, N: Next
     *
     * @returns {object} remark list data and total count (dat)
     * @param $eTarget
     * @param inputData
     */
    function getRemarkDataHtml($eTarget, inputData, callback) {
        Ajax.executeApi(RestApi.GET.COLABO2_REMARK_R101, inputData, function (data) {
            var remarks = data.COLABO_REMARK_REC;
            var isExistsData = (remarks && remarks.length > 0);
            var isMore = inputData.MODE === OftenCode.MORE;
            var isNoNext = Often.null2Void(data.NEXT_YN, "N") === "N";
            var isOverTwo = Number(data.TOT_CNT) > 2;
            var overYn = isMore ? (isNoNext ? "" : "on") : (isOverTwo ? "on" : "");
            var remarkInfo = {
                'remark-count': isExistsData ? data.TOT_CNT : '0',
                'remark-over-yn': overYn,
                'remark-area': isExistsData ? getRemarkItemHtml(remarks) : '',
            }
            updateRemarkElements(inputData.MODE, $eTarget, remarkInfo);
            (typeof callback === "function") && callback();
        });
    }

    function updateRemarkData(projectSrno, postSrno, remarkSrno) {
        var $postPopup = $("#postPopup:visible");
        var $detailUl = $("#detailUl:visible");
        var $postPopupRemark = $postPopup.find("#post-" + postSrno).find(".js-remark-area:visible");
        var $detailUlRemark = $detailUl.find("#post-" + postSrno).find(".js-remark-area:visible");

        var isPopupUpdate = ($postPopupRemark.length > 0);
        var isDetailUpdate = false;

        if ($detailUl.length > 0) {
            if ($detailUl.hasClass("list")) {
                var $postItem = $detailUl.find("#post-" + postSrno);
                if ($postItem.length > 0) {
                    updateRemarkCountByOneListItem($postItem.find(".js-remark-count"));
                }
            } else {
                isDetailUpdate = ($detailUlRemark.length > 0);
            }
        }

        if (!isPopupUpdate && !isDetailUpdate) return;

        findByRemark();

        function updateRemarkCountByOneListItem($remarkCount) {
            $remarkCount.parents(".comment").css("display", "inline-block");
            $remarkCount.text(Number($remarkCount.text()) + 1);
        }

        function findByRemark() {
            Ajax.executeApi(RestApi.GET.COLABO2_REMARK_R101, {
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: postSrno,
                SRCH_COLABO_REMARK_SRNO: remarkSrno,
                ORDER_TYPE: "N",
            }, function (data) {
                var remarks = data.COLABO_REMARK_REC;
                var isExistsData = (remarks && remarks.length > 0);
                var isOverTwo = Number(data.TOT_CNT) > 2;
                var remarkInfo = {
                    'remark-count': isExistsData ? data.TOT_CNT : '0',
                    'remark-over-yn': (isOverTwo ? "" : "on"),
                    'remark-area': isExistsData ? getRemarkItemHtml(remarks) : '',
                }
                if (ItemSubtask.setSubtaskRemarkCount(postSrno, data.TOT_CNT));
                isPopupUpdate && updateRemarkElements("UPDATE", $postPopupRemark, remarkInfo);
                isDetailUpdate && updateRemarkElements("UPDATE", $detailUlRemark, remarkInfo);
            });
        }
    }

    function updateRemarkElements(mode, $eTarget, remarkInfo) {

        var $detailItem = $eTarget.findUp(".detail-item");
        var isMore = mode === OftenCode.MORE;
        var isEdit = mode === OftenCode.EDIT;
        var isDelete = mode === OftenCode.DELETE;

        if (isMore || isDelete) {
            $detailItem.find(".js-remark-prev-button").removeClass("on").addClass(remarkInfo["remark-over-yn"]);
            $detailItem.find(".post-comment-group").prepend(remarkInfo["remark-area"]);
            return;
        }

        if (isEdit) {
            $eTarget.findUp(".remark-item").replaceWith(remarkInfo["remark-area"]);
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
            return;
        }

        var $remarkInputLayer = $eTarget.findUp(".js-remark-form");
        if (mode !== "UPDATE") {
            $remarkInputLayer.find(".js-remark-upload-file").empty();
            $remarkInputLayer.find(".js-remark-upload-img").empty();
        } else {
            //pass
        }
        $detailItem.find(".comment-count").text(remarkInfo["remark-count"]);
        $detailItem.find(".post-comment-group").append(remarkInfo["remark-area"]);
    }

    function showEdit($remarkItem) {
        var $remarkViewLayer = $remarkItem.find(".js-remark-view");
        var $remarkEditLayer = $remarkItem.find(".js-remark-edit");
        var $remarkText = $remarkViewLayer.find(".js-remark-text");
        var $remarkArea = $remarkEditLayer.find(".js-remark-area");

        $remarkArea.html(TagConvert.html2HtmlStringByRemark($remarkText.html()));
        $remarkEditLayer.find(".js-remark-upload-file").html($remarkViewLayer.find(".js-remark-upload-file").html());
        $remarkEditLayer.find(".js-remark-upload-img").html($remarkViewLayer.find(".js-remark-upload-img").html());
        $remarkViewLayer.removeClass("on");
        $remarkEditLayer.addClass("on");
        $remarkEditLayer.find(".js-del-btn").css('display', 'block');
        $remarkEditLayer.find(".js-down-btn").css('display', 'none');

        $remarkArea.off("keydown").on("keydown", ItemRemark.keyDownRemarkInput)
            .off("keyup").on("keyup", ItemRemark.keyUpRemarkInput);
        $remarkArea.focus();

        var focusNode = window.getSelection().focusNode;
        focusNode = focusNode.hasChildNodes() ? focusNode.lastChild : focusNode.parentNode.lastChild;
        if (focusNode.nodeName !== "#text") {
            //focusNode.parentNode.appendChild(document.createTextNode("\u00A0")); //마지막 공백 추가 제거
            focusNode = focusNode.parentNode.lastChild;
        }
        Caret.focusNextCaret(focusNode, focusNode.length)
    }

    function cancelEdit($remarkItem) {
        $remarkItem.find(".js-remark-view").addClass("on");
        $remarkItem.find(".js-remark-edit").removeClass("on");
    }

    function isPostCommentGroup($eTarget) {
        if ($eTarget.findUp(".js-comment-thumbnail").length > 0 ||
            $eTarget.findUp(".js-comment-user-name").length > 0) {
            var commentUserId = $eTarget.findUp(".remark-item").attr("data-user-id");
            Profile.drawProfilePopup(commentUserId);
            return true
        }
        return false
    }

    function isShowPrevRemarkButtonAndAction($eTarget) {
        var $remarkPrevButton = $eTarget.findUp(".js-remark-prev-button");
        if ($remarkPrevButton.length === 0) return false;
        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        var firstRemarkSrno = $detailItem.find("li.remark-item:first").attr("remark-srno");
        getRemarkDataHtml($eTarget, {
            MODE: OftenCode.MORE,
            ORDER_TYPE: OftenCode.PREV,
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
            SRCH_COLABO_REMARK_SRNO: firstRemarkSrno,
        }, function () {
            PostPopup.addScrollSticky()
        });
        return true;
    }

    function isShowMoreRemarkButtonAndAction($eTarget) {
        var $remarkMoreButton = $eTarget.findUp(".js-remark-more-button");
        if ($remarkMoreButton.length === 0) return false;
        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        var lastRemarkSrno = $detailItem.find("li.remark-item:last").attr("remark-srno");
        getRemarkDataHtml($eTarget, {
            MODE: OftenCode.NEXT,
            ORDER_TYPE: OftenCode.NEXT,
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
            SRCH_COLABO_REMARK_SRNO: lastRemarkSrno,
            RENEWAL_YN: "Y",
        });
        return true;
    }

    // 댓글 리액션 업데이트
    function isRemarkLikeButtonAndAction($eTarget) {
        var $remarkLikeButton = $eTarget.findUp(".js-remark-like-button");
        if ($remarkLikeButton.length === 0) return false;

        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");

        var $remarkItem = $remarkLikeButton.findUp(".remark-item");
        var remarkSrno = $remarkItem.attr("remark-srno");
        var $remarkLikeLayer = $eTarget.findUp(".js-remark-like");
        var emtCd = $remarkLikeLayer.hasClass("on") ? 0 : 1;

        var settingData = {
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
            COLABO_REMARK_SRNO: remarkSrno,
            EMT_CD: emtCd,
        }

        Ajax.executeApi(RestApi.PUT.COLABO2_REMARK_EMT_U001, settingData, function (dat) {
            UpdateElements.autoUpdateElem({
                POST_SRNO: postSrno,
                REMARK_SRNO: remarkSrno,
                REACTION_REMARK_DATA: dat,
            })
        });
        return true;
    }

    function isRemarkLikeCountButtonAndAction($eTarget) {
        var $emojiGroup = $eTarget.findUp(".js-remark-like-count");
        if ($emojiGroup.length === 0) return false;
        var $detailItem = $eTarget.findUp(".detail-item");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        ReactionCheck.showReactionCheckPopup($eTarget, projectSrno, postSrno);
        return true;
    }

    // 댓글 첨부파일 삭제
    function isRemarkDeleteFileButtonAndAction($eTarget) {
        var $deleteRemarkFileButton = $eTarget.findUp(".js-del-btn");
        var isRemarkFile = $eTarget.findUp(".js-remark-layer").length > 0;
        if ($deleteRemarkFileButton.length === 0 || !isRemarkFile) return false;

        var isImage = $deleteRemarkFileButton.findUp(".js-post-img").length > 0;
        var isFile = $deleteRemarkFileButton.findUp(".js-post-file").length > 0;
        var uploadType = isImage ? "img" : isFile ? "file" : "";
        if (uploadType === "") return true;
        var $uploadItem = $deleteRemarkFileButton.findUp(".js-post-" + uploadType).parent("li");
        $uploadItem.remove();
        return true;
    }

    // 댓글 첨부파일 이미지뷰어
    function isRemarkImgAndAction($eTarget) {
        var $remarkImgItem = $eTarget.findUp(".image-item");
        var isRemarkViewType = $remarkImgItem.findUp(".js-remark-view");
        if (!isRemarkViewType || isRemarkViewType.length === 0) return false;
        var $remarkImgLayer = $remarkImgItem.findUp(".js-remark-upload-img");
        var isRemarkImg = $remarkImgLayer.length > 0;
        if ($remarkImgItem.length === 0 || !isRemarkImg) return false;
        var $popupBefore = $remarkImgItem.findUp(".js-popup-before");
        var imgInfoArray = Often.getAttrs($remarkImgLayer.find('.image-item'));
        var idx = $remarkImgLayer.find("li").index($eTarget.findUp("li"));
        $.each(imgInfoArray, function (i, image) {
            image.COLABO_SRNO = $popupBefore.attr("data-project-srno");
            image.COLABO_COMMT_SRNO = $popupBefore.attr("data-post-srno");
        })
        ImageViewer.openImage("POST", imgInfoArray, idx);
        return true;
    }

    function isRemarkFileAndAction($eTarget) {
        var $remarkFileItem = $eTarget.findUp(".js-post-file");
        if (!$remarkFileItem || $remarkFileItem.length === 0) return false;
        var isRemarkViewType = $remarkFileItem.findUp(".js-remark-view");
        if (!isRemarkViewType || isRemarkViewType.length === 0) return false;
        var $popupBefore = $remarkFileItem.findUp(".js-popup-before");
        var isDownLoadButton = $eTarget.findUp(".js-down-btn").length > 0;
        var fileJson = Often.getAttrs($remarkFileItem);
        fileJson[0].FILE_NAME = $.trim($remarkFileItem.find(".js-file-title").text());
        fileJson[0].COLABO_SRNO = $popupBefore.attr("data-project-srno");
        fileJson[0].COLABO_COMMT_SRNO = $popupBefore.attr("data-post-srno");
        var fileMode = isDownLoadButton ? "SAVE" : "DOC-VIEWER";
        FileUtil.openFile(fileMode, fileJson);
    }

    function isStickyRemarkAreaAndAction($eTarget) {
        var $postPopup = $eTarget.findUp("#postPopup");
        var $remarkArea = $eTarget.findUp(".js-edit-layer");
        if ($remarkArea.length === 0 || $postPopup.length === 0) return false;
        if (!$remarkArea.hasClass("sticky")) return false;
        var $postScroll = $postPopup.find(".post-card-scroll");
        $postScroll.moveToBottom(true);
    }

    function isCheckEditRemark($remarkArea){
        var $remarkItem = $remarkArea.findUp(".remark-item")
        var $remarkView = $remarkItem.find(".js-remark-view");
        var $remarkEdit = $remarkItem.find(".js-remark-edit");

        //파일 체크
        var viewFileData = Often.getAttrs($remarkView.find(".js-post-file"));
        var editFileData =  Often.getAttrs($remarkEdit.find(".js-post-file"));
        var isEditFile = JSON.stringify(viewFileData) !== JSON.stringify(editFileData);

        //이미지 체크
        var viewImageData = Often.getAttrs($remarkView.find(".js-post-img"));
        var editImageData =  Often.getAttrs($remarkEdit.find(".js-post-img"));
        var isEditImage = JSON.stringify(viewImageData) !== JSON.stringify(editImageData);

        //텍스트 체크
        var viewText = $remarkView.find(".js-remark-text").html();
        var editText = $remarkArea.html();
        var isEditText = viewText !== editText;
        
        return (isEditFile || isEditImage || isEditText);
    }

})()





