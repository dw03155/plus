var PostAppend = (function () {

    return {
        appendFileOrImg: appendFileOrImg,
        appendLink: appendLink,
        appendMap: appendMap,
        appendMadeObj: appendMadeObj,
    }

    /**
     *
     * @param $eTarget - postPopup or contenteditable
     * @param fileData - 한개의 파일 데이터 json
     */
    function appendFileOrImg($eTarget, fileData) {
        appendFileOrImgOrLink($eTarget, fileData, PostComponent.getFileAndImgObj);
    }

    /**
     *
     * @param $eTarget - postPopup or contenteditable
     * @param linkData - 한개의 링크 데이터 json
     */
    function appendLink($eTarget, linkData) {
        appendFileOrImgOrLink($eTarget, linkData, PostComponent.getLinkObj);
    }

    function appendFileOrImgOrLink($eTarget, data, getObjCallback) {
        var postCondition = PostCondition.getPostConditionByData();
        if (postCondition.isSchedule1) return;
        var $editItem = $eTarget.is("#postPopup") ? $eTarget.find(".edit-item") : $eTarget.findUp(".edit-item");
        var $pasteLayer = $editItem.find(".js-upload-area.js-paste-layer:first"); //Todo. 두개가 존재할 수 있나?
        var $attachArea = (postCondition.isNewStyle ? $pasteLayer : $editItem.find("#postAttached"));
        appendMadeObj($attachArea, getObjCallback(data));
    }

    /**
     *
     * @param $eTarget - postPopup or contenteditable
     * @param mapData
     */
    function appendMap($eTarget, mapData) {
        if (!PostCondition.getFuncCondition().isGooglePlace) return;
        var $editItem = $eTarget.is("#postPopup") ? $eTarget.find(".edit-item") : $eTarget.findUp(".edit-item");
        var $uploadArea = $editItem.find(".js-upload-area.js-paste-layer:first"); //Todo. 두개가 존재할 수 있나?
        appendMadeObj($uploadArea, PostComponent.getMapObj(mapData));
    }

    function appendMadeObj($uploadArea, $madeObj) {

        var isEmptyArea = "" === $.trim($uploadArea.text());
        firstNodeWrapDiv();
        var isPost1 = $uploadArea.is("#postAttached");
        var $newComponent = $madeObj.attr('id', 'newComponent');
        var nbspHtml = '<div class="js-hidden-component hidden-component" contenteditable="false">&nbsp;</div>';
        initComp($madeObj);

        //포스트1.0은 별도 영역에 첨부
        if (isPost1) {
            $madeObj.hasClass("image-item") && $uploadArea.find(".js-attached-image").append($madeObj);
            $madeObj.hasClass("file-item") && $uploadArea.find(".js-attached-file").append($madeObj);
            $madeObj.hasClass("url-link") && $uploadArea.find(".js-attached-url").append($madeObj);
            focusNext();
            return;
        }

        if (!isEmptyArea) {
            var lastFocusNode = Caret.getLastFocusNode(); //히든 DIV, null, undefined 거름
            if (isTextFocusAndAction($(lastFocusNode))) return; //포커스가 있다면 그 바로 다음으로 애프터
            if (isTextFocusAndAction($(lastFocusNode).parent())) return; //한개 더 벗겨서 포커스가 있다면 그 바로 다음으로 애프터
        }

        appendStartEndPoint($uploadArea, $newComponent);
        focusNext();

        function firstNodeWrapDiv() {
            var uploadAreaNodes = $uploadArea[0].childNodes;
            if (uploadAreaNodes.length > 0) {
                var nodeArray = [];
                $.each($(uploadAreaNodes), function (i, el) {
                    if (el.nodeName !== "DIV") nodeArray.push(el);
                })
                if (nodeArray.length > 0) $(nodeArray).wrapAll("<div></div>");
            }
        }

        function appendStartEndPoint($targetComponent, $newComponent) {
            if ($targetComponent.hasClass("js-upload-area")) {
                $uploadArea.append($newComponent);
            } else {
                $targetComponent.after($newComponent);
            }
            if (isMovableObj($newComponent.prev())) $newComponent.before(nbspHtml); //위가 이동객체면 히든 DIV
            if (isMovableObj($newComponent.next())) $newComponent.after(nbspHtml);  //아래가 이동객체면 히든 DIV
            setTimeout(function () { //위, 아래가 없으면 빈 DIV - 연속적으로 그리는 경우에는 스킵하기 위하여 setTimeout 활용!
                if ($newComponent.prev().length === 0) $newComponent.before(nbspHtml);
                if ($newComponent.next().length === 0) $newComponent.after("<div><br></div>");
            }, 0);

            function isMovableObj($madeObj) {
                return $madeObj.hasClass("js-post-file") || $madeObj.hasClass("js-post-img") ||
                    $madeObj.hasClass("js-map-item") || $madeObj.hasClass("url-link");
            }
        }

        function isTextFocusAndAction($sideComponent) {
            if ($sideComponent.hasClass('js-hidden-component')) return false; //히든영역에 포커스 가있으면 스킵
            if (!$sideComponent.parent().hasClass('js-upload-area')) return false;
            appendStartEndPoint($sideComponent, $newComponent)
            focusNext();
            return true;
        }

        function focusNext() {
            var $newComponent = $("#newComponent");
            Caret.focusNextCaret($newComponent.next()[0], 0);
            $newComponent.attr('id', '');
        }

        function initComp($returnNode) {
            $returnNode.attr('contentEditable', 'false').addClass('create-box').css('cursor', 'pointer')
            $returnNode.find(".js-down-btn").css('display', 'none')
            $returnNode.find(".js-del-btn").css('display', 'block')
            $returnNode.on("mouseenter", mouseenterPopupArea).on("mouseleave", mouseleavePopupArea);
            return $returnNode;

            function mouseenterPopupArea(e) {
                var $documentItem = $(e.currentTarget);
                var $uploadArea = $documentItem.parents(".js-upload-area");
                textNode2Div($uploadArea);
                sortableArea($uploadArea);
            }

            function mouseleavePopupArea(e) {
                var $documentItem = $(e.currentTarget);
                var $uploadArea = $documentItem.parents(".js-upload-area");
                var isDragging = $uploadArea.find(".document-item-highlight").length > 0;
                !isDragging && $uploadArea.sortable("destroy");
            }

            function sortableArea($uploadArea) {
                var isSortable = $uploadArea.hasClass("ui-sortable");
                var copyHelper;
                !isSortable && $uploadArea.sortable({
                    //axis: "y", //x축 튀지않게
                    //opacity: 0.6, //소팅시 투명도
                    cursorAt: {top: 5, left: 5}, //커서지점에 정렬중객체를 놓는데 아래오른쪽커서 이동시 겹쳐서 이벤트 발생않도록
                    scroll: false, //스크롤이동않게
                    tolerance: "pointer", //좀더 민감하게 소팅
                    placeholder: "document-item-highlight", //하이라이트선긋게
                    start: function (e, ui) {
                        $uploadArea.sortable("refreshPositions"); //팝업 작을시 커서 위치 제대로 못잡는 현상 방지
                    },
                    helper: function (e, li) {
                        var cloneLi = li.clone(); //바닥복사객체
                        $(cloneLi).css('opacity', '0.3'); //투명도
                        copyHelper = cloneLi.insertAfter(li);
                        //정렬중 객체의 뷰 제어
                        var $item = $(li);
                        !$item.hasClass('file-item') && $item.css('transform', 'scale(0.5) translate(-50%, -50%)');
                        $item.css('display', 'inline-block');
                        $item.find(".move-button").css('display', 'none')
                        $item.find(".js-del-btn").css('display', 'none')
                        return li.clone();
                    },
                    stop: function (e, ui) {
                        var $item = $(ui.item);
                        !$item.hasClass('file-item') && $item.css('transform', 'scale(1)');
                        $item.css('display', 'block');
                        $item.find(".move-button").css('display', '');
                        $item.find(".js-del-btn").css('display', 'block');

                        // component를 이동할 때 앞 뒤로 hidden component가 있으면 지움
                        copyHelper.prev(".js-hidden-component").length > 0 && copyHelper.prev().remove();
                        copyHelper.next(".js-hidden-component").length > 0 && copyHelper.next().remove();
                        copyHelper && copyHelper.remove();

                        // component를 이동할 때 앞 뒤로 hidden component가 있으면 생성
                        $item.prev().hasClass("create-box") && $item.before("<div class='js-hidden-component hidden-component' contenteditable='false'><br></div>");
                        $item.next().hasClass("create-box") && $item.after("<div class='js-hidden-component hidden-component' contenteditable='false'><br></div>");

                        // component를 이동할 때 앞 뒤로 아무것도 없으면 지움 div 여백 생성
                        ($item.prev().length === 0) && $item.before("<div><br></div>");
                        ($item.next().length === 0) && $item.after("<div><br></div>");
                    }
                });
            }

            function textNode2Div($uploadArea) {
                if ($uploadArea.length === 0) return;
                for (var i = 0; i++; $uploadArea[0].childNodes.length) {
                    var node = $uploadArea[0].childNodes[i];
                    var isTextNode = node.nodeType === Node.TEXT_NODE;
                    var textValue = $(node).text();
                    var isExistTextValue = $.trim(textValue) !== "";
                    if (isTextNode) {
                        isExistTextValue && $(node).after('<div>' + textValue + '</div>');
                        $(node).remove();
                    }
                }
            }
        }
    }

})()