var PostComponent = (function () {

    return {
        getHtmlByPostRecord: getHtmlByPostRecord,
        getFileHtml: getFileHtml,
        getImgHtml: getImgHtml,
        getFileAndImgObj: getFileAndImgObj,
        getLinkObj: getLinkObj,
        getMapObj: getMapObj,
    }

    /**
     * @param {array} postArray
     * @param {boolean} [isClickMorePost]
     * @returns {string}
     */
    function getHtmlByPostRecord(postArray, isClickMorePost) {
        var returnHtml = "";
        var basePostHtml = $("#postItem").html();
        var baseInviteHtml = $("#inviteItem").html();
        $.each(postArray, function (i, post) {
            var isInvite = (post.COMMT_GB === "A" || post.TMPL_TYPE === "A");
            if (isInvite && LocalUtil.getFeedType() === "list") return;
            var baseHtml = (isInvite ? baseInviteHtml : basePostHtml);
            var lookHtml = getHtmlByOnePostData(post);
            var addHtml = ListHelper.replaceJson(baseHtml, $.extend({
                'contents': lookHtml,
                'data-code': "VIEW"
            }, JsonMaker.getPostContentsInfo(post)));
            returnHtml = (isClickMorePost ? (addHtml + returnHtml) : (returnHtml + addHtml));
        });
        return returnHtml;
    }

    function getHtmlByOnePostData(onePostData) {

        var originHtml = "", summaryHtml = "", summaryFoldHtml = "",
            onlyTextHtml = "", imgHtml = "", fileHtml = "", mapHtml = "", linkHtml = "",
            taskHtml = "", subtaskHtml = "";

        var htmlWrap = $("#postWrap").html();
        var foldWrapHtml = $("#foldWrap").html();
        var imageCompTemplate = $("#imageComponent").html();
        var fileCompTemplate = $("#fileComponent").html();
        var mapCompTemplate = $("#mapComponent").html();
        var bigMapCompTemplate = $("#bigMapComponent").html();
        var linkCompTemplate = $("#linkComponent").html();

        var inlineImageCount = 0;
        var attachViewCount = 0;
        var attachFileCount = 0;

        var postCondition = PostCondition.getPostCondition("VIEW", onePostData);
        var isPost1 = postCondition.isWrite1 || postCondition.isTask1 || postCondition.isSchedule1;

        var postComponentsJson = JsonMaker.str2json(JsonMaker.convertJsonString(onePostData));
        postComponentsJson.forEach(function (component) {
            switch (component.COMP_TYPE) {
                case "TEXT" :
                    var textCompHtml = getTextComponentHtml(component.COMP_DETAIL);
                    onlyTextHtml += textCompHtml;
                    originHtml += postCondition.isTask1 ? "" : textCompHtml;
                    break;
                case "IMAGE" :
                    var imageCompHtml = getImgHtml(imageCompTemplate, component.COMP_DETAIL);
                    imgHtml += imageCompHtml;
                    originHtml += (isPost1 ? "" : imageCompHtml);
                    inlineImageCount++;
                    break;
                case "FILE" :
                    var fileCompHtml = getFileHtml(fileCompTemplate, component.COMP_DETAIL);
                    fileHtml += "<li>" + fileCompHtml + "</li>";
                    originHtml += (isPost1 ? "" : fileCompHtml);
                    attachFileCount++;
                    break;
                case "MAP" :
                    mapHtml += getMapComponentHtml(mapCompTemplate, component.COMP_DETAIL);
                    originHtml += (isPost1 ? "" : getMapComponentHtml(bigMapCompTemplate, component.COMP_DETAIL));
                    attachViewCount++;
                    break;
                case "LINK" :
                    linkHtml += getLinkComponentHtml(linkCompTemplate, component.COMP_DETAIL);
                    var isOverWidth = ScrapMetaData.isOverWidthMetaImageByDbData(component.COMP_DETAIL);
                    var bigLinkCompTemplate = $(isOverWidth ? "#overBigLinkComponent" : "#bigLinkComponent").html();
                    originHtml += (isPost1 ? "" : getLinkComponentHtml(bigLinkCompTemplate, component.COMP_DETAIL))
                    attachViewCount++;
                    break;
                case "TASK" :
                    var taskCompHtml = postCondition.isTask ? ItemTask.getLookHtml(component.COMP_DETAIL) : "";
                    originHtml += postCondition.isTask1 ? "" : taskCompHtml;
                    taskHtml += taskCompHtml;
                    break;
                case "TODO" :
                    originHtml += postCondition.isTodo ? ItemTodo.getLookHtml(component.COMP_DETAIL) : "";
                    break;
                case "SCHEDULE" :
                    originHtml += postCondition.isSchedule ? ItemSchedule.getLookHtml(component.COMP_DETAIL) : "";
                    break;
                case "SUBTASK" :
                    originHtml += postCondition.isTask1 ? "" : ItemSubtask.getLookHtml(component.COMP_DETAIL);
                    subtaskHtml += ItemSubtask.getLookHtml(component.COMP_DETAIL);
                    break;
                default :
                    break;
            }
        });

        var textHeight = getTextBoxHeight($.trim(onlyTextHtml), 612, 'line-height:25px;');
        var isMore = (postCondition.isWrite2 || postCondition.isTask2 || postCondition.isSchedule2) && (
            textHeight > 248 ||
            inlineImageCount > 1 ||
            (inlineImageCount > 0 && attachViewCount > 0) ||
            (inlineImageCount > 0 && attachFileCount > 0) ||
            (attachViewCount > 0 && attachFileCount > 0));

        var isSummaryPost = isPost1 || isMore; // 포스트1.0 || (포스트2.0 && 더보기 조건) => 서머리 영역 오픈, 오리지날 영역 하이드
        var isOnlyOriginalPost = postCondition.isSchedule1 || postCondition.isTodo;

        originHtml = ListHelper.replaceJson(htmlWrap, {
            'id': 'originalPost',
            'contents': $.trim(originHtml),
            'display': ListHelper.setDisplay(!isSummaryPost || isOnlyOriginalPost)
        });

        if (isOnlyOriginalPost) return originHtml;

        summaryHtml += ListHelper.replaceJson(htmlWrap, {
            'id': 'summaryPost',
            'contents': taskHtml + $.trim(onlyTextHtml),
            'add-class': isPost1 ? "" : "hidden", // 포스트1.0 => 글 영역 축소 X
            'display': ListHelper.setDisplay(isSummaryPost),
        });

        (imgHtml !== "") && (summaryFoldHtml += '<div class="js-post-img post-upload-img">' + imgHtml + '</div>');
        (mapHtml !== "") && (summaryFoldHtml += mapHtml);
        (linkHtml !== "") && (summaryFoldHtml += linkHtml);
        (fileHtml !== "") && (summaryFoldHtml += '<ul class="upload-document-group">' + fileHtml + '</ul>');
        (subtaskHtml !== "") && (summaryFoldHtml += subtaskHtml);

        summaryHtml += ListHelper.replaceJson(foldWrapHtml, {
            "more-btn-display": ListHelper.setDisplay(isMore), // (포스트2.0 && 더보기 조건)
            "fold-area": summaryFoldHtml,
            "fold-area-display": ListHelper.setDisplay(isSummaryPost),
        })

        return originHtml + summaryHtml;
    }

    function getTextBoxHeight(innerHTMLData, boxWidth, style) {
        var phantom = $("<div id='textPhantom' style='width:" + boxWidth + "px;position:absolute;display: none;" + style + "'></div>");
        var body = $("body");
        phantom.html(innerHTMLData);
        body.append(phantom);
        var boxHeight = body.find("#textPhantom").height();
        body.find("#textPhantom").remove();
        return boxHeight;
    }

    function getTextComponentHtml(data) {
        if (!data || !data.CONTENTS) return "";
        return TagConvert.db2HtmlStringByPost(data.CONTENTS, postMode.VIEW);
    }

    function getFileAndImgObj(fileData, isFileFix) {
        fileData.FILE_NAME = FileUtil.getFileName(fileData);
        var isImage = ImageUtil.isImageType(fileData) && !isFileFix;
        var returnHtml = isImage ? getImgHtml($("#imageComponent").html(), fileData) :
            getFileHtml($("#fileComponent").html(), fileData);
        return $(returnHtml);
    }

    function getFileHtml(html, data) {
        if (!data) return "";
        var fileName = FileUtil.getFileName(data)
        var fileNameJson = FileUtil.getFileNameAndExtension(fileName);
        var fileRandKey = FileUtil.getRandKey(data);

        var isExternalFile = (fileRandKey === "GOOGLEDRIVE" || fileRandKey === "DROPBOX");

        return ListHelper.replaceJson(html, {
            "ATCH_SRNO": FileUtil.getAtchSrno(data.ATCH_SRNO),
            "RAND_KEY": fileRandKey,
            "USE_INTT_ID": Often.null2Void(data.ATCH_USE_INTT_ID, data.USE_INTT_ID),
            "WIDTH": data.WIDTH,
            "HEIGHT": data.HEIGHT,
            "FILE_NM": fileName,
            "RGSR_NM": Often.null2Void(data.RGSR_NM, _USER_NM),
            "FILE_SIZE": data.FILE_SIZE,
            "RGSN_DTTM": data.RGSN_DTTM,
            "FILE_DOWN_URL": data.FILE_DOWN_URL,
            "ATCH_URL": isExternalFile ? Often.null2Void(data.ATCH_URL, data.FILE_DOWN_URL) : "",
            'name': fileName,
            'ext-class': FileUtil.checkAndConvertDriveExtClass(fileRandKey, FileUtil.getStandardExtension(fileNameJson.EXT)),
            'lock-icon-display': ListHelper.setDisplay('Y' === Often.null2Void(data.DRM_YN, 'N') || Often.isFunc(Func.CLOUD.DOWNLOAD_PREVENT)),
            'size': FileUtil.convertDriveSize(fileRandKey, FileUtil.getFileSize(data.FILE_SIZE)),
            'download-button-display': ListHelper.setDisplay(!isExternalFile, "block"),
        });
    }

    function getImgHtml(html, data) {
        if (!data) return "";
        var fileLimitImgUrl = "https://platform.bizplay.co.kr/wecloud/20161227_a7e3f5c1-d9f4-4638-b23c-b6ed797cd026.png";
        var isFileLimit = data.THUM_IMG_PATH === fileLimitImgUrl;
        if (isFileLimit) data.THUM_IMG_PATH = "/flow-renewal/assets/images/file_limit.png";
        return ListHelper.replaceJson(html, {
            "ATCH_SRNO": FileUtil.getAtchSrno(data.ATCH_SRNO),
            "RAND_KEY": FileUtil.getRandKey(data),
            "WIDTH": data.WIDTH,
            "HEIGHT": data.HEIGHT,
            "ATCH_URL": Often.null2Void(data.ATCH_URL, data.IMG_PATH),
            "FILE_DOWN_URL": Often.null2Void(data.FILE_DOWN_URL),
            "IMG_PATH": Often.null2Void(data.IMG_PATH, data.ATCH_URL),
            "THUM_IMG_PATH": data.THUM_IMG_PATH,
            "FILE_NM": FileUtil.getFileName(data),
            "RGSR_NM": data.RGSR_NM,
            "FILE_SIZE": data.FILE_SIZE,
            "RGSN_DTTM": data.RGSN_DTTM,
            "image_style": ListHelper.setImage(data.THUM_IMG_PATH),
            "image_src": ListHelper.setImageSrc('POST', data.THUM_IMG_PATH),
            "image_class": isFileLimit ? "image-limit" : "",
        });
    }

    function getMapObj(mapData) {
        var returnMapHtml = getMapComponentHtml($("#bigMapComponent").html(), mapData);
        var $returnMapNode = $(returnMapHtml);
        $returnMapNode.attr(JsonMaker.getSettingAttrs("MAP", mapData));
        return $returnMapNode;
    }

    function getMapComponentHtml(html, data) {
        if (!data) return "";
        return ListHelper.replaceJson(html, {
            'src': ListHelper.setImageSrc("POST", GoogleMap.convertGoogleMapImage(data.LOCATION)),
            'title': Often.null2Void(data.PLACE_TITLE, data.TITLE),
            'place': data.PLACE,
            'URL': data.URL,
        });
    }

    function getLinkObj(linkData) {
        var isOverLinkImage = ("" !== linkData.PREVIEW_IMG && linkData.PREVIEW_GB === "size1");
        var baseHtml = $(isOverLinkImage ? "#overBigLinkComponent" : "#bigLinkComponent").html();
        var returnLinkHtml = getLinkComponentHtml(baseHtml, linkData);
        var $returnLinkNode = $(returnLinkHtml);
        $returnLinkNode.attr(JsonMaker.getSettingAttrs("LINK", linkData));
        return $returnLinkNode;
    }

    function getLinkComponentHtml(html, data) {
        if (!data) return "";
        var isExistsImage = ("" !== Often.null2Void(data.PREVIEW_IMG));
        var isExistsVideo = ("" !== Often.null2Void(data.PREVIEW_VIDEO));
        var image;
        if (isExistsImage) {
            if (!isExistsVideo) {
                image = ListHelper.setImage(data.PREVIEW_IMG);
            }
        } else {
            image = "";
        }
        return ListHelper.replaceJson(html, {
            'title': TagUtil.escapeHtml(data.PREVIEW_TTL),
            'url': data.PREVIEW_LINK,
            'image': image,
            'contents': TagUtil.escapeHtml(data.PREVIEW_CNTN),
            'link-gb': (isExistsVideo ? "video" : "file"),
            'src-video-url': "",
            'src-image-url': ListHelper.setSrc(data.PREVIEW_IMG),
            'link-image-display': ListHelper.setDisplay(!isExistsVideo, "block"),
            'link-video-display': ListHelper.setDisplay(isExistsVideo, "block"),
        });
    }

})()

