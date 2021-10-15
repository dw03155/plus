var ScrapMetaData = (function () {

    return {
        addUrlPreview: addUrlPreview,
        addMessengerUrlPreview: addMessengerUrlPreview,
        getMetaData: getMetaData,
        drawUrlPreview: drawUrlPreview,
        getCurrentWord: getCurrentWord,
        adjustMetaData: adjustMetaData,
        checkURL: checkURL,
        isOverWidthMetaImageByDbData: isOverWidthMetaImageByDbData,
    }

    var callback = null; //함수 내 콜백을 쉽게 사용하기 위함
    var $writingArea = null; //함수 내 작성하는 부분의 요소를 쉽게 사용하기 위함
    var counterID = null; //타임 아웃을 주기 위함
    var urlDuplicateCheck = 'Y';

    /***
     * 글/ 댓글/ 채팅 작성 중 url 입력(keyup/paste)을 확인하여 입력한 url에 대한 메타 정보를 출력
     * @param {object} $writtingArea 글이 작성되는 부분 (REQUIRED)
     * @param {object} drawUrlPreviewCallBack MetaData를 가져온 후 실행될 함수 (REQUIRED)
     * @author 임석현 (sjsh1623@flow.team)
     */

    function addUrlPreview($writingAreaParam, drawUrlPreviewCallBack) {
        callback = drawUrlPreviewCallBack;
        $writingArea = $writingAreaParam;

        $writingArea.on('keyup', function (e) {
            // backSpace 했을때 불필요하게 작동을 방지하기 위함
            if (KeyCheck.isKey(e, "BACK")) return;
            var currentWord = getCurrentWord(e); // 현재 작성하고 있는 텍스트 가져옴
            drawUrlPreview(currentWord)
        }).on('paste', function (e) {
            var pasteElement = ClipBoard.getClipboardData(e).getData("Text");
            drawUrlPreview(pasteElement)
        });
    }

    function addMessengerUrlPreview(inputUrl, drawUrlPreviewCallBack, duplicateCheckYn) {
        urlDuplicateCheck = duplicateCheckYn;
        callback = drawUrlPreviewCallBack;
        drawUrlPreview(inputUrl)
    }

    /***
     * 메타데이터의 정보 출력 (NODE_URL_PREVIEW는 내부망일때 노드를 사용해 메타데이터를 가져온다)
     * @param {string} url 메타 데이터를 가져와야 하는 url (REQUIRED)
     * @param {object} callbackFunc 실행되어야 하는 콜백 함수 (OPTIONAL / 외부에서 호출시 REQUIRED)
     * @author 임석현 (sjsh1623@flow.team)
     */
    function getMetaData(url) {
        if (Often.isFunc("NODE_URL_PREVIEW")) {
            nodeUrlPrev(url)
        } else {
            regularUrlPrev(url);
        }
    }


    /**
     * ============================================================
     * ====================== 하위 Functions ======================
     * ============================================================
     * */


    /***
     * URL을 확인하여 Preview를 그려준다
     * @param element 사용자의 input
     */
    function drawUrlPreview(element) {
        var isURL = checkURL(element); // 현재 작성하고 있는 텍스트가 URL인지 확인
        if (!isURL) return;
        counterID && clearTimeout(counterID); //URL일 경우에만 clear 한다 (URL 작성중 사용자가 의도 하지 않은 URL이 출력 될 수 있기 떄문)
        counterID = setTimeout(function () {
            getMetaData(adjustURL(element));
        }, 500);
    }

    /***
     * NODE_URL_PREVIEW 기능키가 켜져 있을때 (내부망일때 노드를 사용해 메타데이터를 가져온다)
     * @param url 메타 데이터를 가져와야 하는 url
     * @author 임석현 (sjsh1623@flow.team)
     */
    function nodeUrlPrev(url) {
        if (checkDuplicate(url)) return; // 중복 확인
        var sendObj = {};
        sendObj["ROOM_SRNO"] = _USER_ID;
        sendObj["URL"] = scrapUrlConversion(url);
        SocketControl.getSocket().emit('sendURL', sendObj);
        SocketControl.getSocket().off("receiveMetadata").on("receiveMetadata", receiveMetadataEvent);

        function receiveMetadataEvent(res) {
            //TODO : www.nate.com, www.coupang.com CHECK
            //console.log(res, res.data, Object.keys(res.data).length)
            //res로 내려올때가 있고 res.data로 감싸져서 내려올때가 있어서 체크
            var returnData = res.data === undefined ? res : res.data;
            adjustMetaData(url, returnData, true);
        }
    }


    /***
     * 메타데이터를 가져오는 일반적인 방법
     * @param url {string} 메타 데이터를 가져와야 하는 url
     * @author 임석현 (sjsh1623@naver.com)
     */
    function regularUrlPrev(url) {
        if (checkDuplicate(url)) return; // 중복 확인
        var metaDataUrl = '/url_scrap.act?URL=';
        metaDataUrl += encodeURIComponent(url);
        var metaData = "";
        var req = new XMLHttpRequest();
        req.open('GET', encodeURI(metaDataUrl), true);
        req.onreadystatechange = function (e) {
            if (req.readyState === 4 && req.status === 200) {
                metaData = JSON.parse(req.response.trim());
                adjustMetaData(url, metaData);
            }
        };
        req.send(null);
    }


    /***
     * 메타 데이터를 가져와 콜백 함수를 실행 시킴
     * @param url 메타 데이터의 제목이 없을 경우 url 경로로 대체 하기 위함
     * @param metaData 호출한 메타데이터
     * @param isNode node로 호출이 되었는지 여부
     * @return metaData가 존재 하지 않을때 리턴
     */
    function adjustMetaData(url, metaData, isNode) {
        if ($.isEmptyObject(metaData)) return;
        var title = isNode ? Often.null2Void(metaData.ogTitle, url) : Often.null2Void(metaData.title, url);
        var link = url;
        var cntn = isNode ? metaData.ogDescription : metaData.description;

        //json Object 의 Depth가 2 이상이여서 null check
        var img, video;
        if (isNode) {
            img = getMetaUrl(metaData, "IMAGE");
            video = getMetaUrl(metaData, "VIDEO");
        } else {
            img = metaData.image;
            video = Often.null2Void(metaData.video_url, "");
        }
        // 내용/ 이미지/ 비디오 3가지 모두 없다면 출력하지 않음
        if (isEmpty([cntn, img, video])) return;

        var data = {
            PREVIEW_TTL: title,
            PREVIEW_LINK: link,
            PREVIEW_IMG: img,
            PREVIEW_CNTN: cntn,
            PREVIEW_VIDEO: video,
            PREVIEW_GB: (isOverWidthMetaImage(metaData) ? "size1" : "size2"),
        };
        (typeof callback === "function") && callback(data);
    }


    /***
     * url인지 체크
     * @param 현재 작성중인 텍스트
     * @return url인지 판단하여 Boolean 타입 리턴
     * @author 임석현 (sjsh1623@flow.team)
     */
    function checkURL(text) {
        var regexp = /(((?:(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[-a-zA-Z0-9+&@#/%?=~_|$!:,.;ㄱ-ㅎㅏ-ㅣㄱ-힣()]*[-a-zA-Z0-9+&@#/%=~_|ㄱ-ㅎㅏ-ㅣㄱ-힣$?]|((?:mailto:)?[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%-]+\\.[a-zA-Z]{2,4})\\b)|"(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[^\\"\\r\\n]+\\"?|\\'(?:(?:https?|ftp|file):\/\/|www\\.|ftp\\.)[^'\\r\\n]+'?|(http(s)?:\/\/.)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)\\b([-a-zA-Z0-9@:%_+.~#?&/=]*))|((www\.)[0-9a-zA-z_\-?=%/.&#;()ㄱ-ㅎㅏ-ㅣㄱ-힣?]*[-a-zA-Z0-9+&@#/%=~_|ㄱ-ㅎㅏ-ㅣㄱ-힣$?]+))/ig;
        return regexp.test(text);
    }


    /***
     * http/https가 없는 url일 경우 포함된 url 을 만들어준다
     * @param url 사용자가 적은 URL
     * @return 사용가능한 URL
     * @author 임석현 (sjsh1623@flow.team)
     */
    function adjustURL(url) {
        var cleanUrl = url.trim();
        var regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/i;
        var result = !regexp.test(url) ? 'http://' + cleanUrl : cleanUrl;
        return result;
    }


    /***
     * URL 중복됨을 막기 위해 현재 preview 처리된 URL 리스트를 찾아 출력
     * @return getCurrentUrlList preview가 있는 URL 리스트
     * @author 임석현 (sjsh1623@flow.team)
     */
    function getCurrentUrlList() {
        var $popupBefore = $writingArea.parents(".js-popup-before:visible");
        var currentUrlList = [];
        var currentURL = $popupBefore.find('.url-link');
        for (var i = 0; i < currentURL.length; i++) {
            currentUrlList.push(currentURL[i].getAttribute('preview_link'));
        }
        return currentUrlList;
    }


    /***
     * 현재 사용자가 작성하고 있는 단어를 찾아 출력한다.
     * @param event 해당 이벤트
     * @return List 현재 작성하고 있는 단어룰 출력한다
     * @author 임석현 (sjsh1623@flow.team)
     */
    function getCurrentWord(event) {
        // 현재 작성하고 있는 줄을 텍스트 형식으로 가져옴
        var currentLineText = getNodeData();

        // 작성하고 있는 줄의 단어들을 Array로 만들기 위해 split (없다면 빈 array를 출력)
        var currentLineList = Often.null2Void(currentLineText, "") === "" ?
            [] : currentLineText.substring(0, window.getSelection().focusOffset).split(" ");

        // Array의 가장 마지막 요소를 출력
        return Often.null2Void(currentLineList[currentLineList.length - 1], "");

        function getNodeData() {
            try {
                return window.getSelection().focusNode.data;
            } catch (e) {
                return "";
            }
        }
    }

    /**
     * URL 중복 확인
     * @param url 중복 체크가 필요한 url
     */
    function checkDuplicate(url) {
        if (urlDuplicateCheck === 'N') return false;
        var currentUrl = getCurrentUrlList();
        var pureUrl = getPureUrl(url);
        for (var i = 0; i < currentUrl.length; i++) {
            var pureCurrentUrl = getPureUrl(currentUrl[i]);
            if (pureUrl.indexOf(pureCurrentUrl) > -1 || pureCurrentUrl.indexOf(pureUrl) > -1) return true;
        }
        return false;
    }

    /**
     * URL 주소 host 확인
     * @param url 추출해야하는 URL
     * @return url host
     * @description URL 중복 확인중 같은 URL임에도 불구하고 https 와 http가 달라 다른 URL로 인식하여 같은 URL이 출력됨
     */

    function getPureUrl(url) {
        return new URL(url).host;
    }

    /**
     * 모든 value가 Empty인지 확인
     * @param {array} values 체크해야 할 값
     **/

    function isEmpty(values) {
        for (var i = 0; i < values.length; i++) {
            if (!(values[i] === undefined || values[i] === "")) return false
        }
        return true
    }

    /**
     * @param metaData Scrap 데이터
     * @param type video or image 타입
     * @returns {string} url
     */
    function getMetaUrl(metaData, type) {
        var isEmptyData;
        var isArray;
        var ogType = metaData.ogType ? metaData.ogType : metaData.ogImage ? metaData.ogImage.type : false;
        var isVideo = ogType && ogType.indexOf("video") > -1;
        if ("VIDEO" === type && isVideo) {
            var jsonData = Often.undefined2Obj(metaData.ogVideo, metaData.ogImage);
            isArray = Array.isArray(jsonData);
            isEmptyData = Often.null2Void(jsonData).length === 0;
            return isEmptyData ? "" : isArray ? jsonData[0].url : jsonData.url;
        } else if ("IMAGE" === type) {
            isArray = Array.isArray(metaData.ogImage);
            isEmptyData = Often.null2Void(metaData.ogImage).length === 0;
            return isEmptyData ? "" : isArray ? metaData.ogImage[0].url : metaData.ogImage.url;
        }
    }

    /**
     * @param metaData Scrap 데이터
     */
    function isOverWidthMetaImage(metaData) {
        var isEmptyData = Often.null2Void(metaData.ogImage).length === 0;
        var isArray = Array.isArray(metaData.ogImage);
        var naturalWidth = (isEmptyData ? "" : isArray ? metaData.ogImage[0].width : metaData.ogImage.width);
        return naturalWidth > 400;
    }

    function isOverWidthMetaImageByDbData(linkData) {
        return ("" !== linkData.PREVIEW_IMG && linkData.PREVIEW_GB === "size1");
    }

    /**
     *
     * @param url 주소
     * @description 특정 url 주소를 scrap 하기 위해서 conversion
     */
    function scrapUrlConversion(url) {
        var bitLyUrl = ":\/\/bit.ly";   // 단축 url 주소
        var gooGlUrl = ":\/\/goo.gl";   // 단축 url 주소

        if ((url.indexOf(bitLyUrl) > -1) || (url.indexOf(gooGlUrl) > -1)) url += "!"; // 단축 url > 원본 url에 대한 데이터

        return url;
    }

})();