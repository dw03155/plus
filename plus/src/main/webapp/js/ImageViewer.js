var ImageViewer = (function () {

    var mode; //모드
    var nowImgInfoJsonArray; //현 이미지 뷰어 모든 데이터 [{}]
    var nowImgInfoJson = {}; //이미지 뷰어에 출력되고 있는 이미지 정보
    var $imageViewerLayer;
    var prevClass = "";	//off,"" 이전 화살표
    var NextClass = "";	//off,"" 다음 화살표
    var ctrlDown = false;
    var cmdKey = 91
    var degreeImg = 0; //각도
    var scaleUp = 1; //배수
    var totIdx; //총 사진 수
    var nowIdx = 0;
    var MAX_SCALE_UP = 8; //배율
    var MIN_SCALE_DOWN = 0.5; //배율

    return {
        openImage: openImage,
        openSimpleImage: openSimpleImage,
        drawImageViewer: drawImageViewer,
        closeImageViewer: closeImageViewer,
        drawSimpleImageViewer: drawSimpleImageViewer,
    }

    /** NOTE openImage
     *  viewerMode
     *  1. CHAT : dataJsonArray.length === 1
     *  2. POST : dataJsonArray.length >= 1
     *  dataJsonArray
     *  1. THUM_IMG_PATH : 이미지 URL ( 필수값 )
     *  2. FILE_NAME : 파일명 ( 필수값 )
     *  3. WIDTH : 길이 ( 필수값 )
     *  4. HEIGHT : 높이 ( 필수값 )
     *  5. RGSR_NM : 작성자 ( 필수값 )
     *  6. RGSN_DTTM : 작성일 ( 필수값 )
     *  7. FILE_SIZE : 파일 크기 ( 필수값 )
     *  8. ATCH_SRNO : 파일 존재 체크 (필수값 )
     *  9. RAND_KEY : 파일 존재 체크 (필수값 )
     *  10. COLABO_SRNO : 프로젝트 존재 여부 및 권한 체크 (선택값)
     *  11. COLABO_COMMT_SRNO : 글 존재 여부 및 권한 체크 (선택값)
     *  12. ROOM_SRNO : 채팅방 존재 여부 (선택값)
     *  13. ROOM_CHAT_SRNO : 채팅 메세지 존재 여부 (선택값)
     *  idx : 이미지 인덱스 번호
     */

    function openImage(viewerMode, dataJsonArray, idx) {
        FileUtil.checkFileOnServer(dataJsonArray, "DOC-VIEWER", function (dat) {
            if (dat[0].ERR_MSG && dat[0].ERR_MSG.length > 0) return Often.toast("error", dat[0].ERR_MSG);
            if (viewerMode === "CHAT") return openImageViewOnNewWindow(dataJsonArray[0]);
            if (viewerMode === "POST") return drawImageViewer(viewerMode, dataJsonArray, idx);
        })
    }

    /**
     * @param imgJson {Object}
     * @returns {Window}
     */
    function openSimpleImage(imgJson) {
        return OpenUtil.openSubScreen({
            GB: 'SIMPLE_IMAGE_VIEWER',
            IMG_DATA: JSON.stringify(imgJson),
        });
    }

    function openImageViewOnNewWindow(dataOneJson) {
        if (Often.null2Void(dataOneJson.SRC) !== "") {
            dataOneJson.THUM_IMG_PATH = dataOneJson.SRC;
            dataOneJson.IMG_PATH = dataOneJson.SRC;
        } else {
            //pass
        }
        return OpenUtil.openSubScreen({
            GB: 'IMAGE_VIEWER',
            IMG_DATA: JSON.stringify(dataOneJson),
        });
    }

    function drawImageViewer(viewerMode, dataJsonArray, idx) {
        mode = viewerMode; //모드 저장
        nowImgInfoJsonArray = dataJsonArray || []; // 이미지 데이터 저장

        if (mode !== "CHAT" && mode !== "POST") return Often.toast("error", i18next.t('front.alert.errorTryAgain'))
        if (nowImgInfoJsonArray.length === 0) return Often.toast("error", i18next.t('front.alert.invalidInformation', {val: '$t(dictionary.image)'}));

        var $viewer = $("#imageViewerItem .js-image-viewer-item");
        $imageViewerLayer = $viewer.clone();
        $imageViewerLayer.attr("id", "imageViewerLayer");
        if (mode === "CHAT") $imageViewerLayer.find(".left-fix, .viewer-close-button, #btnAllDownPic").css("display", "none");
        $viewer.after($imageViewerLayer);

        totIdx = (nowImgInfoJsonArray.length === 0 ? nowImgInfoJsonArray : nowImgInfoJsonArray.length); //전체 길이 따로 저장

        setViewerInfo(idx); //첫번째이미지로 화면 저장
        addMouseEvent();
        addResizeEvent();
        addKeyEvent();
    }

    /**
     *
     * @param {Object} imgJson
     */
    function drawSimpleImageViewer(imgJson) {
        var imageName = Often.null2Void(imgJson.IMG_NAME, "image.png");
        var registerName = Often.null2Void(imgJson.REGISTER_NAME, "No Register Name!");
        var registerTime = Tz.momentTimeZone(imgJson.REGISTER_DTTM, "type1");
        var $viewer = $("#imageViewerItem .js-image-viewer-item");
        $imageViewerLayer = $viewer.clone();
        $imageViewerLayer.attr("id", "imageViewerLayer");
        $imageViewerLayer.find(".left-fix, .viewer-close-button, .viewer-button, #btnDownPic, #btnAllDownPic").css("display", "none");
        $viewer.after($imageViewerLayer);
        setImageSrc($imageViewerLayer, imgJson);
        var $imageViewerHeader = $imageViewerLayer.find(".image-viewer-header");
        $imageViewerHeader.find(".image-size, .image-resolution, .secret-image").css("display", "none");
        $imageViewerHeader.find(".image-title").text(imageName);
        $imageViewerHeader.find(".image-user-name").text(registerName);
        $imageViewerHeader.find(".image-upload-date").text(registerTime);
        initSize();
        $imageViewerLayer.css("display", "block");
        $imageViewerLayer.focus();
        setImgDragging($imageViewerLayer.find('img'), scaleUp, degreeImg);
        addMouseEvent();
    }

    function closeImageViewer() {
        $("#imageViewerLayer").remove();
    }

    function isEmptyIndex(idx) {
        if (typeof idx === "number" && idx >= 0) return true;
        return false;
    }

    function setViewer(idx) {

        isEmptyIndex(idx) && (nowIdx = idx);
        nowImgInfoJson = nowImgInfoJsonArray[nowIdx];
        setImageSrc($imageViewerLayer, nowImgInfoJson);
        setTop();
        setButton();
        setBottom();
        initSize();

        if (mode !== "CHAT") return;

        //앞뒤 정보가 있다면 조회하지 않기
        if (nowImgInfoJsonArray[nowIdx + 1] && nowImgInfoJsonArray[nowIdx - 1]) return;

        //현재기준 앞뒤 이미지 정보를 가져와놓기
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_MSG_R001, $.extend({}, nowImgInfoJson, {
            CHAT_SRCH_GB: "IC",
            PG_PER_CNT: "0",
        }), function (data) {
            var isExistPrevData = data.PREV_YN === "Y";
            var isFirstOrOneData = nowIdx === 0;
            var isLastOrOneData = nowIdx === totIdx - 1;
            var prevImageData = isExistPrevData ? setApiResult(data, 0) : {};
            var nextImageData = setApiResult(data, isExistPrevData ? 1 : 0);
            if (data.PREV_YN === 'Y' && isFirstOrOneData) {
                nowImgInfoJsonArray.unshift(prevImageData);
                nowIdx = nowIdx + 1;
                totIdx = totIdx + 1;
            }
            if (data.NEXT_YN === 'Y' && isLastOrOneData) {
                nowImgInfoJsonArray.push(nextImageData);
                totIdx = totIdx + 1;
            }
            setButton();
        });

        function setTop() {
            var width = Often.null2Void(nowImgInfoJson['WIDTH'], "0");
            var height = Often.null2Void(nowImgInfoJson['HEIGHT'], "0");
            var size = Often.null2Void(FileUtil.getFileSize(nowImgInfoJson['FILE_SIZE']), "0 B");
            var fullName = Often.null2Void(FileUtil.getFileName(nowImgInfoJson));
            var registerName = Often.null2Void(nowImgInfoJson['RGSR_NM'], "No Register Name!");
            var registerTime = Tz.momentTimeZone(nowImgInfoJson['RGSN_DTTM'], "type1");
            var isSecretMessage = Often.null2Void(nowImgInfoJson['SECRET_TIME'], "") !== '';
            var $imageViewerHeader = $imageViewerLayer.find(".image-viewer-header");
            $imageViewerHeader.find(".image-title").text(fullName);
            $imageViewerHeader.find(".image-size").text(size);
            $imageViewerHeader.find(".image-resolution").text(width + "X" + height);
            $imageViewerHeader.find(".image-user-name").text(registerName);
            $imageViewerHeader.find(".image-upload-date").text(registerTime);
            $imageViewerHeader.find(".secret-image").text(isSecretMessage ? i18next.t('front.common.chatSecret') : '');
        }

        function setButton() {
            var isSecretMessage = Often.null2Void(nowImgInfoJson['SECRET_TIME'], "") !== '';
            $imageViewerLayer.find(".left").attr("data-img-idx", nowIdx - 1);
            $imageViewerLayer.find(".right").attr("data-img-idx", nowIdx + 1);
            if (totIdx === 1 || isSecretMessage) {
                NextClass = "off";
                prevClass = "off";
            } else if (Number(nowIdx) === 0) {
                NextClass = "";
                prevClass = "off";
            } else if (Number(totIdx) === Number(nowIdx) + 1) {
                NextClass = "off";
                prevClass = "";
            } else {
                NextClass = "";
                prevClass = "";
            }
            var btnImgArr = {".left": prevClass, ".right": NextClass};
            for (var key in btnImgArr) {
                var $btnObj = $imageViewerLayer.find(key);
                if (btnImgArr[key] === "") $btnObj.removeClass("off");
                else $btnObj.addClass(btnImgArr[key]);
                $btnObj.css("display", $btnObj.hasClass('off') ? "none" : "block");
            }
        }

        function setBottom() {
            var idxNow = (Number($imageViewerLayer.find(".left").attr("data-img-idx"))
                + Number($imageViewerLayer.find(".right").attr("data-img-idx"))) / 2;
            $imageViewerLayer.find(".js-total-count").text(totIdx);
            $imageViewerLayer.find(".img-now").text(idxNow + 1);
        }


        function setApiResult(data, idx) {
            var oneMessageData = getIdxData(data, "MSG_REC", idx);
            var oneImageData = getIdxData(oneMessageData, "IMG_REC", 0);
            var infoJsonArray = $.extend({}, oneImageData, {
                ATCH_SRNO: FileUtil.getAtchSrno(oneImageData),
                RAND_KEY: FileUtil.getRandKey(oneImageData),
                IMG_PATH: oneImageData.DOWNLOAD_URL,
                RGSN_DTTM: oneImageData.RGSN_DTTM || oneMessageData.RGSN_DTTM,
                RGSR_NM: oneMessageData.RGSR_NM,
                ROOM_SRNO: oneMessageData.ROOM_SRNO,
                ROOM_CHAT_SRNO: oneMessageData.ROOM_CHAT_SRNO,
                BOMB_YN: oneMessageData.BOMB_YN,
            });
            return infoJsonArray;

            function getIdxData(dat, key, idx) {
                if (dat && dat[key] && dat[key].length > idx) return dat[key][idx]
                else return {}
            }
        }
    }

    function setImageSrc($imageViewerLayer, imgInfo) {

        var imgPath = ImageUtil.removeDomain("IMAGE-VIEWER", path2url());
        var thumbPath = ImageUtil.removeDomain("IMAGE-VIEWER", imgInfo.THUM_IMG_PATH);
        var fullName = Often.null2Void(FileUtil.getFileName(imgInfo), imgPath);

        createImage(thumbPath, fullName, function () {
            createImage(imgPath, fullName);
        });

        function createImage(path, fullName, loadCb) {
            if (!path) return;
            var thumbObj = new Image();
            thumbObj.onload = function (loadData) {
                addImgObj(loadData.target);
                (typeof loadCb === "function") && loadCb()
            }
            thumbObj.src = path;
            thumbObj.alt = fullName;
        }

        function addImgObj(imgEl) {
            var $img = $(imgEl);
            $img.addClass("js-image image current");
            $img.attr({width: "100%", height: "100%"})
            var $imgBack = $imageViewerLayer.find(".js-img-back");
            $imgBack.next(".js-image").remove();
            $imgBack.after($img);
            setImgResizing(imgEl.width, imgEl.height)
        }

        function path2url(){
            if(imgInfo.IMG_PATH.indexOf("_thumb.") > -1) return imgInfo.ATCH_URL;
            return imgInfo.IMG_PATH;
        }
    }

    function setViewerInfo(idx) {
        setViewer(idx);
        $imageViewerLayer.css("display", "block");
        $imageViewerLayer.focus();
        setImgDragging($imageViewerLayer.find('img'), scaleUp, degreeImg);
        setImgResizing(nowImgInfoJson['WIDTH'], nowImgInfoJson['HEIGHT']);
    }

    function addKeyEvent() {

        $imageViewerLayer.off('keydown').on('keydown', onKeyDownImgControl);
        $imageViewerLayer.off('keyup').on('keyup', function (e) {
            if (e.key === "Control" || e.keyCode === cmdKey) ctrlDown = false;
        })

        function onKeyDownImgControl(e) {
            if (mode === 'CHAT') {
                if (e.key === "ArrowLeft" && !$imageViewerLayer.find('.left').hasClass("off")) {
                    nowIdx = nowIdx - 1;
                    setViewerInfo();
                    return
                }
                if (e.key === "ArrowRight" && !$imageViewerLayer.find('.right').hasClass("off")) {
                    nowIdx = nowIdx + 1;
                    setViewerInfo();
                    return
                }
                if (e.key === "Escape") {
                    window.close();
                    return
                }
            } else {
                if (e.key === "Escape") {
                    e.stopPropagation();
                    closeImageViewer();
                    return;
                }
                if (e.key === "ArrowLeft") {
                    if (nowIdx <= 0 || (totIdx - 1) <= 0) return;
                    var $leftButton = $imageViewerLayer.find('.viewer-button.left');
                    var prevIdx = Number($leftButton.attr("data-img-idx"));
                    setViewerInfo(prevIdx);
                    return;
                }
                if (e.key === "ArrowRight") {
                    if (nowIdx >= totIdx - 1) return;
                    var $rightButton = $imageViewerLayer.find('.viewer-button.right')
                    var nextIdx = Number($rightButton.attr("data-img-idx"));
                    setViewerInfo(nextIdx);
                    return;
                }
            }
            if (e.key === '+' || e.keyCode === 187) {
                if (scaleUp >= MAX_SCALE_UP) return Often.toast("error", i18next.t('front.imageViewer.cannotExpand'));
                scaleUp = scaleUp + 0.25;
                $imageViewerLayer.find('img').css('transform', getTransform(degreeImg, scaleUp));
            }
            if (e.key === '-' || e.keyCode === 189) {
                if (scaleUp <= MIN_SCALE_DOWN) return Often.toast("error", i18next.t('front.imageViewer.cannotReduce'));
                scaleUp = scaleUp - 0.25;
                $imageViewerLayer.find('img').css('transform', getTransform(degreeImg, scaleUp));
                if (scaleUp <= 1.75) $imageViewerLayer.find('img').css({'left': 0, 'top': 0});
            }
        }

    }

    function addMouseEvent() {
        $imageViewerLayer.find(".js-container")[0].ondragstart = (function () {
            return true;
        });
        $imageViewerLayer.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', onMouseWheelImgControl);
        $imageViewerLayer.find('.image-viewer-footer').off('click').on('click', clickFooter);
        $imageViewerLayer.find('.image-viewer-footer').find(".right-fix").off('click').on('click', clickDownBtn);
        $imageViewerLayer.find(".viewer-button").off('click').on('click', clickArrowBtn);

        if (mode === "POST") {
            $imageViewerLayer.on('click', clickOutside);           //영역 외 클릭 이벤트
            $imageViewerLayer.find('.viewer-close-button').off('click').on('click', closeImageViewer);
            document.body.style.overflow = 'hidden';           //영역 외 클릭 이벤트
        } else {
            //done
        }
    }

    function addResizeEvent() {
        $(window).on("resize", function () {
            initSize();
            setImgResizing(nowImgInfoJson['WIDTH'], nowImgInfoJson['HEIGHT']);
        })
    }

    function clickArrowBtn(e) {
        var $eTarget = $(e.target);
        if (mode === "CHAT") {
            if ($eTarget.hasClass("left")) nowIdx = nowIdx - 1;
            else if ($eTarget.hasClass("right")) nowIdx = nowIdx + 1;
            setViewerInfo();
        } else {
            if ($eTarget.hasClass("off")) return;
            var currentIdx = Number($(e.target).attr("data-img-idx"));
            setViewerInfo(currentIdx);
        }
    }

    function clickDownBtn(e) {

        var $eTarget = $(e.target);
        var $btnDownPic = $eTarget.findUp("#btnDownPic");
        var $btnAllDownPic = $eTarget.findUp("#btnAllDownPic");

        if ($btnDownPic.length > 0) {
            e.stopPropagation();
            nowImgInfoJson["FILE_TYPE"] = "IMAGE"
            saveImage(nowImgInfoJson);
            return;
        }

        if ($btnAllDownPic.length > 0) {
            e.stopPropagation();
            nowImgInfoJsonArray.forEach(function (v, i) {
                (function (x) {
                    setTimeout(function () {
                        v["FILE_TYPE"] = "IMAGE";
                        saveImage(v);
                    }, 500 * x);
                })(i);
            });
        }
    }

    function clickOutside(e) {
        if ($imageViewerLayer.length === 0) return
        if (!(e.target.tagName !== "IMG" //이미지가 아닐 때
            && $(e.target).attr("id") !== "btnDownPic" //동일
            && $(e.target).attr("id") !== "btnAllDownPic" //동일
            && !$(e.target).hasClass("viewer-button")
            && !$(e.target).hasClass("image-edit-btn") //아래 도구 버튼을 image-edit-btn으로 묶음
            && !$(e.target).parents().hasClass("image-title-area")
        )) return;
        closeImageViewer();
    }

    function onMouseWheelImgControl(e) {
        e.preventDefault()
        e.stopPropagation()
        var eWheelDelta = e.originalEvent.wheelDelta; // event 값이 -100이면 휠 업, 100이면 휠 다운
        if (eWheelDelta > 0) {
            if (scaleUp >= MAX_SCALE_UP) return Often.toast("error", i18next.t('front.imageViewer.cannotExpand'));
            scaleUp = scaleUp + 0.25;
            $imageViewerLayer.find('img').css('transform', getTransform(degreeImg, scaleUp));
        } else {
            if (scaleUp <= MIN_SCALE_DOWN) return Often.toast("error", i18next.t('front.imageViewer.cannotReduce'));
            scaleUp = scaleUp - 0.25;
            $imageViewerLayer.find('img').css('transform', getTransform(degreeImg, scaleUp));
            if (scaleUp <= 1.75) {
                $imageViewerLayer.find('img').css({'left': 0, 'top': 0});
            }
        }
        setImgDragging($imageViewerLayer.find('img:visible'), scaleUp, degreeImg);
        setImgResizing(nowImgInfoJson['WIDTH'], nowImgInfoJson['HEIGHT']);
    }

    function clickFooter(e) {

        var $eTarget = $(e.target);
        var h = nowImgInfoJson['HEIGHT'];
        var w = nowImgInfoJson['WIDTH'];
        var sh = screen.height;
        var sw = screen.width;
        var isLongWidth = (h < w);
        var heightWidthRatio = (h / w);
        var ratio2 = ((sh - 100) / sw);

        if ($eTarget.hasClass('rotate')) {
            degreeImg = degreeImg + 90;
            if (degreeImg % 180 !== 0) {
                //가로가 길때
                if (isLongWidth) {
                    scaleUp = (heightWidthRatio < ratio2 ? heightWidthRatio / ratio2 : heightWidthRatio);
                    //세로가 길떄
                } else {
                    if (heightWidthRatio < ratio2) {
                        scaleUp = Math.max(heightWidthRatio, (w / sw));
                    } else {
                        scaleUp = heightWidthRatio * ratio2;
                        if (scaleUp < 1) {
                            scaleUp = 1;
                        }
                    }
                }
            } else {
                scaleUp = 1;
                $imageViewerLayer.find('.js-image').css('transform', getTransform(degreeImg, scaleUp));
                $imageViewerLayer.find('.js-image').css({'left': 0, 'top': 0});
            }
            $imageViewerLayer.find('.js-image').css('transform', getTransform(degreeImg, scaleUp));
        } else if ($eTarget.hasClass('plus')) {
            if (scaleUp >= MAX_SCALE_UP) return Often.toast("error", i18next.t('front.imageViewer.cannotExpand'));
            scaleUp = scaleUp + 0.25;
            $imageViewerLayer.find('.js-image').css('transform', getTransform(degreeImg, scaleUp));

        } else if ($eTarget.hasClass('minus')) {
            if (scaleUp <= MIN_SCALE_DOWN) return Often.toast("error", i18next.t('front.imageViewer.cannotReduce'));
            scaleUp = scaleUp - 0.25;
            $imageViewerLayer.find('.js-image').css('transform', getTransform(degreeImg, scaleUp));
            if (scaleUp <= 1.75) {
                $imageViewerLayer.find('.js-image').css({'left': 0, 'top': 0});
            }
        } else if ($eTarget.hasClass('autosize')) {
            initSize();
        }
    }

    function fn_draggable(obj, sc, dg) {
        var areaH = $imageViewerLayer.height(); /*window.innerHeight*/
        var areaW = $imageViewerLayer.width();  /*window.innerWidth*/
        var objH = obj.height() * sc;
        var objW = obj.width() * sc;
        var isHorizontalImage = (dg % 180 !== 0);
        var option = {};
        var isOverWidth = isHorizontalImage ? (objH > areaW) : (objW > areaW);
        var isOverHeight = isHorizontalImage ? (objW > areaH) : (objH > areaH);
        if (obj.hasClass('ui-draggable')) {
            obj.draggable("destroy");

            isOverWidth && (option.axis = "x"); // width 넘으면 가로만 드래그
            isOverHeight && (option.axis = "y"); // height 넘으면 세로만 드래그
            (isOverWidth && isOverHeight) && (option.axis = false); // 모두 넘으면 드래그 제한 x
            option.scrollSensitivity = 100;
        }
        (isOverWidth || isOverHeight) && obj.draggable(option);
    }

    function setImgDragging(object, scale, degree) {

        var b_180 = (degree % 180 === 0);
        fn_draggable(object, scale, degree);
        var ow = object.width();
        var oh = object.height();
        var areaH = $imageViewerLayer.height(); /*window.innerHeight*/
        var areaW = $imageViewerLayer.width();  /*window.innerWidth*/
        //@유민호 : 뷰에 따른 드래깅 위치 재설정 190806
        var dragSpaceX = b_180 ? (ow * scale - areaW) / 2 : (oh * scale - areaW) / 2;
        var dragSpaceY = b_180 ? (oh * scale - areaH) / 2 : (ow * scale - areaH) / 2;

        var topLeftObj = {"top": dragSpaceY, "left": dragSpaceX}

        object.off('drag').on('drag', function () {
            for (var key in topLeftObj) {
                if (topLeftObj[key] > 0) {
                    if (topLeftObj[key] < Math.abs(Number(object.css(key).replace('px', '')))) {
                        if (object.hasClass('ui-draggable')) {
                            return false;
                        }
                    }
                } else {
                    //done
                }
            }
        });

        object.off('mouseup').on('mouseup', function () {
            for (var key in topLeftObj) {
                if (topLeftObj[key] > 0) {
                    if (topLeftObj[key] < Math.abs(Number(object.css(key).replace('px', '')))) {
                        if (Number(object.css(key).replace('px', '')) > 0) {
                            object.css(key, topLeftObj[key] + 'px');
                        } else {
                            object.css(key, -1 * topLeftObj[key] + 'px');
                        }
                        fn_draggable(object, scale, degree);
                    }
                } else {
                }
            }
        });

        object.on('mousedown', function () {
            if (!object.hasClass('ui-draggable')) {
                for (var key in topLeftObj) {
                    if (topLeftObj[key] > 0) {
                        if (topLeftObj[key] < Math.abs(Number(object.css(key).replace('px', '')))) {
                            if (Number(object.css(key).replace('px', '')) > 0) {
                                object.css(key, topLeftObj[key] + 'px');
                            } else {
                                object.css(key, -1 * topLeftObj[key] + 'px');
                            }
                            fn_draggable(object, scale, degree);
                        }
                    } else {
                        //done
                    }
                }
            }
        });
    }


    function setImgResizing(w, h) {
        var tmpDom = $imageViewerLayer;
        var areaH = tmpDom.height();
        var areaW = tmpDom.width();
        var maxH, maxW, ogH, ogW = "";

        if (w < 300 && h < 300) {
            maxH = "300px";
            maxW = "300px";
        } else {
            maxH = areaH + "px";
            maxW = areaW + "px";
        }
        ogH = "auto";
        ogW = "auto";
        tmpDom.css({height: ogH, width: ogW});
        tmpDom.find(".js-image:visible").css({
            width: ogW,
            height: ogH,
            maxHeight: maxH,
            maxWidth: maxW,
        });
    }

    function initSize() {
        degreeImg = 0;
        scaleUp = 1;
        $imageViewerLayer.find('.js-image').css({
            'transform': 'rotate(0deg) scale(1)',
            'left': '0',
            'top': '0',
        });
        if ($imageViewerLayer.find('img').hasClass('ui-draggable')) {
            $imageViewerLayer.find('img').draggable("destroy");
        }
    }

    function saveImage(data) {
        /**
         * rand_key에 FLOW가 없는 파일은 웹캐시 서버에 있는 파일 입니다.
         *
         */
        // var f_RandKey = data['RAND_KEY'];
        // if (f_RandKey.indexOf("FLOW") > -1) return FileUtil.saveFile([data])
        // return Often.toast("error", i18next.t('front.common.invalidURL'));
        return FileUtil.saveFile([data]);
    }

    function getTransform(degreeImg, scaleUp) {
        return 'rotate(' + degreeImg + 'deg) scale(' + scaleUp + ')'
    }

})();