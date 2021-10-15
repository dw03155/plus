var Organization = (function () {

    var $departmentItem, $orgChartTarget, $emplArea, $searchLayer, $organizationLayer, $inviteLayer;

    var pageNumber;
    var nextYn;
    var searchTimer;
    var departmentCode;
    var detailClickEvent;
    var reduceDraggableHeight;

    var numClicks = 0;
    var timeOut;
    var inputField;
    var searchField;
    var status;

    return {
        initPage: initPage,
        toggleLayer: toggleLayer,
        closeLayer: closeLayer,
        getClickedOrganizationData: getClickedOrganizationData,
        getInitOrganizationData: getInitOrganizationData,
        searchEmpl: searchEmpl,

        startClick: startClick,
        clickOrganizationChartEvent: clickOrganizationChartEvent,
        dbClickOrganizationChartEvent: dbClickOrganizationChartEvent,

        closeEmplArea: closeEmplArea,
        initPageData: initPageData,
        drawEmployeeListData: drawEmployeeListData,
        openMessenger: openMessenger,
        openEmplArea: openEmplArea,
        setEmployeeSearchArea: setEmployeeSearchArea,
        setDragEvent: setDragEvent,
    }

    function toggleLayer() {
        setVariable();
        $organizationLayer.find('.js-group-tree-wrap').css("height", "")
        if ($organizationLayer.is(":visible")) return closeLayer();
        $organizationLayer.find("#companyName").text(_USE_INTT_NM);
        initPage();
        $organizationLayer.fadeIn(200);
        inputField.focus();
    }

    function setVariable() {
        inputField = $("#organizationInput");
        searchField = $("#orgSearch");
        $organizationLayer = $("#organizationLayer");
        detailClickEvent = "";
        $inviteLayer = $('#inviteLayer');
    }

    function closeLayer() {
        $organizationLayer.fadeOut(200, function () {
            $emplArea.css("height", "");
            $emplArea.css("display", "none");
        });
    }

    /**
     * 조직도 출력
     * @param targetArea {object} 조직도 출력되는 영역
     * @param emplTargetArea {object} 조직도 상세 직원 출력 영역
     * @param isFirstDvsnStart {boolean} 내 조직도 우선 출력 여부
     * @param layer {object} Default는  $("#organizationLayer") 이며 인자가 존재 할 경우 치환
     * @param organizationInputField {object} Default는 $("#organizationInput") 이며 인자가 존재 할 경우 치환
     * @param orgSearchField {object} Default는 $("#orgSearch") 이며 인자가 존재 할 경우 치환
     * @param reduceDragHeight {number=} 조직도 하단 드래그 maxHeight 에서 줄일 px
     * @description 해당 Function은 초대팝업에서 사용을 위해 수정되었습니다..
     */

    function initPage(targetArea, emplTargetArea, isFirstDvsnStart, layer, organizationInputField, orgSearchField, reduceDragHeight) {
        setVariable();
        initPageData(targetArea, emplTargetArea);
        if (!!layer) $organizationLayer = layer;
        if (!!organizationInputField) inputField = organizationInputField;
        if (!!orgSearchField) searchField = orgSearchField;
        reduceDraggableHeight = reduceDragHeight ? reduceDragHeight : 0;

        $orgChartTarget.empty();
        $emplArea.find("#organizationChart-emplList").empty();
        $emplArea.find("#emplList-dvsnName").text("");
        inputField.val("").focus();

        isFirstDvsnStart ? getClickedOrganizationData() : getInitOrganizationData()
        addEvent();
    }

    function initPageData($targetArea, $emplTargetArea) {
        $orgChartTarget = $targetArea ? $targetArea : $("#organizationChart");
        $emplArea = $emplTargetArea ? $emplTargetArea : $("#emplArea");
        $emplArea.css("display", "none");
        pageNumber = 1;
        nextYn = "Y";
        $departmentItem = "";
    }

    function addEvent() {
        inputField.off("keyup").on("keyup", searchEmpl);
        $("#organizationChartCloseBtn").off("click").on("click", closeLayer);
        $orgChartTarget.off("click").on("click", clickOrganizationChartEvent);
        $orgChartTarget.off("dblclick").on("dblclick", dbClickOrganizationChartEvent);
        $emplArea.find("#emplAreaCloseBtn").off("click").on("click", closeEmplArea);
    }

    function openEmplArea() {
        if ($emplArea.css("display") === "none") {
            $emplArea.css("display", "block");
            adjustOrgArea(false);
        }
    }

    function adjustOrgArea(isClose) {
        if (isClose) {
            $organizationLayer = _IsMini ? $("#miniOrganization") : $organizationLayer
            $organizationLayer.find('.js-group-tree-wrap').css("height", "")
            return;
        }

        var miniFixTopHeight = 120
        var afterHeight = _IsMini ? $('#miniWrap').innerHeight() - miniFixTopHeight - $emplArea.innerHeight()
            : $organizationLayer.find('.side-contents').height() - searchField.innerHeight() - $emplArea.innerHeight()

        $('#organizationChart').parent().css({height: afterHeight});
        $('#inviteOrgChart').parent().css({height: afterHeight - 15});
        $('#existEmplData').css({height: $emplArea.innerHeight() - 80})
    }

    function closeEmplArea(e) {
        if (!$emplArea) return;
        $emplArea.css("height", "");
        $emplArea.css("display", "none");
        if (e && $(e.target).findUp("#inviteLayer").length !== 0) {
            $("#teamInviteArea").css("display", "block");
        }

        adjustOrgArea(true);
        $(".department-item").find("span").removeClass(orgChartClassData.enableEmployeeList);
    }

    function openMessenger(e) {
        var $eTarget = $(e.target);
        var chatSendienceRec = [];
        var chatSendienceValue = {};
        chatSendienceValue["IN_RCVR_USER_ID"] = $eTarget.closest('li').attr('user-id');
        chatSendienceRec.push(chatSendienceValue);
        createChatRoom(chatSendienceRec);
    }

    function createChatRoom(chatSendienceRec) {
        var insertValue = {SENDIENCE_REC: chatSendienceRec}
        insertValue.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
        Ajax.executeApi(RestApi.POST.COLABO2_CHAT_C001, insertValue, function (data) {
            OpenUtil.openMessengerByRoomSrno(data.ROOM_SRNO);
        });
    }

    function startClick(e) {
        var $eTarget = $(e.target);
        var isInviteLayer = $eTarget.findUp('#inviteLayer').length > 0;

        numClicks++;
        if (numClicks > 1) numClicks = 0 && clearTimeout(timeOut)
        else if (numClicks === 1) timeOut = setTimeout(function () {
            clearTimeout(timeOut);
            numClicks = 0;

            $('.department-name').removeClass(orgChartClassData.enableEmployeeList);
            $('.department-item').removeClass('active');
            $departmentItem.addClass('active');
            $departmentItem.find('.department-name').addClass(orgChartClassData.enableEmployeeList);
            setEmployeeSearchArea(isInviteLayer ? 'Invite' : 'Organization');
            drawEmployeeListData();
        }, 500);
    }

    function clickOrganizationChartEvent(e) {
        var $eTarget = $(e.target);
        var isInvitationPopup = $organizationLayer.is("#teamInviteLayer");
        $departmentItem = $eTarget.findUp(".department-item");
        if ($departmentItem.length === 0) return false;

        if (_IsMini) MiniLeft.closeAllPopup($eTarget);
        if ($eTarget.hasClass("subDepartmentOpenBtn")) return openSubDepartment(e);
        if ($eTarget.hasClass("js-dvsn-select")) return TeamInvite.clickDvsnSelect($eTarget, isInvitationPopup);
        startClick(e, $eTarget);
    }

    function dbClickOrganizationChartEvent(e) {
        var $eTarget = $(e.target);
        var isGroupName = $eTarget.findUp('.department-name')
        if (isGroupName.length === 0) return false;

        openSubDepartment(e);
    }

    function openSubDepartment(e) {
        var $eTarget = $(e.target).findUp('.department-item');
        var isPlusButton = $eTarget.find('.' + orgChartClassData.enableExistSubDepartment).length > 0;

        if (isPlusButton) {
            var departmentCode = $departmentItem.attr("dvsn-cd");
            getClickedOrganizationData(departmentCode);
        } else {
            var nextDepartmentItem = $departmentItem.next('.department-item');
            while (nextDepartmentItem.attr("depth") > $departmentItem.attr("depth")) {
                nextDepartmentItem.remove();
                nextDepartmentItem = $departmentItem.next('.department-item');
            }
            $departmentItem.find("." + orgChartClassData.subDepartmentConnectLine).remove();
        }
        togglePlusAndMinus();

        function togglePlusAndMinus() {
            var toggleButton = $eTarget.find('.subDepartmentOpenBtn');
            toggleButton.toggleClass(orgChartClassData.enableExistSubDepartment)
                .toggleClass(orgChartClassData.disableExistSubDepartment);
        }
    }

    function getClickedOrganizationData(departmentCode) {
        Ajax.executeApi(RestApi.GET.FLOW_DVSN_R003, {
            DVSN_CD: departmentCode,
            packetOption: Ajax.OPTION.PREVENT_CALLBACK,
        }, function (data) {
            makeClickedOrganizationChart(data)
        });
    }

    function getInitOrganizationData() {
        Ajax.executeApi(RenewalApi.GET.ACT_ORG_USERLIST, {
            DVSN_CD: _DVSN_CD,
            packetOption: Ajax.OPTION.PREVENT_CALLBACK,
        }, makeFirstOrganizationChart);
    }

    function makeFirstOrganizationChart(data) {

        if (data.DVSN_REC.length === 0) {
            setDragEvent();
            getClickedOrganizationData();
            return;
        }
        var departmentObj = data.DVSN_REC[0];
        var isLastDepartment = departmentObj.LAST_DVSN_YN === "Y";
        var buttonClassType = isLastDepartment ? orgChartClassData.notExistsubDepartment
            : (departmentObj.USER_DVSN_YN === "Y" ? orgChartClassData.disableExistSubDepartment
            : orgChartClassData.enableExistSubDepartment) + " subDepartmentOpenBtn";
        var firstDvsnHtml = ListHelper.replaceJson($("#organizationItem").html(), {
            'dvsn-cd': departmentObj.DVSN_CD,
            'depth': 0,
            'hgrn-dvsn-cd': '',
            'group-icon': getDepthLineHtml(orgChartClassData.notLastSequenceLine, 0),
            'button-class': buttonClassType,
            'last-code': '1',
            'dvsn-nm': departmentObj.DVSN_NM,
            'root-dvsn-line': departmentObj.USER_DVSN_YN === 'N' ? 'd-none' : orgChartClassData.subDepartmentConnectLine,
        })
        $orgChartTarget.append(firstDvsnHtml);
        $departmentItem = $orgChartTarget.find(".department-item");

        _DVSN_CD && makeOrganizationChart(data);

        //내 부서 인원 목록 불러오기
        var isInviteLayer = $('#inviteLayer').is(":visible");
        if (!isInviteLayer) {
            if (_DVSN_CD) {
                $departmentItem = $orgChartTarget.find(".department-item[dvsn-cd=" + _DVSN_CD + "]");
                setEmployeeSearchArea('Organization');
                setEmplArea(_IsMini ? $('#miniOrganization #emplArea') : $('#organizationLayer #emplArea'));
                drawEmployeeListData();
            }
            setDragEvent();
            return;
        }

    }

    function makeClickedOrganizationChart(data) {
        var departmentObj = data.DVSN_REC;
        if (departmentObj.length === 0) return $organizationLayer.find("#nullDvsnData").css("display", "block");
        var isDepartmentItem = Often.null2Void($departmentItem, "") !== "";
        var depth = isDepartmentItem ? Number($departmentItem.attr("depth")) + 1 : 0;
        var returnHtml = "";

        for (var i = 0; i < departmentObj.length; i++) {
            var isLastDepartment = departmentObj[i].LAST_DVSN_YN === "Y";
            var lastSequenceClassType = ((i === departmentObj.length - 1) ? orgChartClassData.lastSequenceLine
                : orgChartClassData.notLastSequenceLine);
            var buttonClassType = isLastDepartment ? orgChartClassData.notExistsubDepartment
                : orgChartClassData.enableExistSubDepartment + " subDepartmentOpenBtn";
            returnHtml += makeDepartmentHtml(departmentObj, i, depth, lastSequenceClassType, buttonClassType);
        }

        if (isDepartmentItem) {
            $departmentItem.append('<em class="' + orgChartClassData.subDepartmentConnectLine + '"></em>');
            $departmentItem.after(returnHtml);
        } else {
            $orgChartTarget.append(returnHtml);
        }

        setDragEvent()
        showDvsnSelectButton();
    }

    function makeOrganizationChart(data) {

        var departmentObj = data.DVSN_REC;
        if ($departmentItem.length === 0) $departmentItem = $('#organizationChart')
        if (departmentObj.length === 0) return $departmentItem.append(ListHelper.getNoDataHtml('ORGANIZATION'));
        var depth = Number(Often.null2Void($departmentItem.attr("depth"), 0));
        var returnHtml = "";
        var beforeHgrnDvsn = departmentObj[1].HGRN_DVSN_CD;
        var beforeDepth = Often.null2Void(departmentObj[1].DEPTH, "1");
        var isUserDvsn, isLastDepth, isLastDepartment;
        var index = -1;
        var nextIndex = 0;

        $.each(departmentObj, function (i, element) {
            if (isDifferentDepth(element, i)) {
                nextIndex = i;
                return false;
            }
        });

        //하위부서로 그릴때만 depth 늘림.
        if (beforeHgrnDvsn !== _USE_INTT_ID) depth++;

        for (var i = 1; i < departmentObj.length; i++) {
            index = i;
            isLastDepth = beforeDepth === '1';
            isLastDepartment = departmentObj[i].LAST_DVSN_YN === "Y";
            isUserDvsn = Often.null2Void(departmentObj[i].USER_DVSN_YN, "N") === 'Y';
            beforeHgrnDvsn = Often.null2Void(departmentObj[i].HGRN_DVSN_CD, "0");
            var groupLineType = getGroupLineType(i);
            var buttonClassType = getButtonType();

            beforeDepth = Often.null2Void(departmentObj[i].DEPTH, "0");
            if (i === nextIndex) {
                depth++;
                $.each(departmentObj, function (i, element) {
                    if (isDifferentDepth(element, i)) {
                        nextIndex = i;
                        return false;
                    }
                });
                $departmentItem.after(returnHtml);
                $departmentItem.parent().find("li:last i").removeClass().addClass(orgChartClassData.lastSequenceLine);
                drawInnerDepartment(i);
            } else {
                returnHtml += makeDepartmentHtml(departmentObj, i, depth, groupLineType, buttonClassType);
                beforeHgrnDvsn = Often.null2Void(departmentObj[i].HGRN_DVSN_CD, "0");
                i === departmentObj.length - 1 && $departmentItem.after(returnHtml);
            }
        }
        showDvsnSelectButton();

        function isDifferentDepth(element, i) {
            var isFirstFindAndExistNext = index === 1 && Often.null2Void(element.DEPTH, '0') !== beforeDepth;
            var isExistNext = index !== 1 && Often.null2Void(element.DEPTH, '0') !== beforeDepth && i > nextIndex;
            if (isFirstFindAndExistNext || isExistNext) return true;
        }

        function drawInnerDepartment(index) {
            var hgrnDvscCd = departmentObj[index].HGRN_DVSN_CD;
            var $hgrnDvsn = $departmentItem.parent().find('li[dvsn-cd="' + hgrnDvscCd + '"]')

            $departmentItem = $hgrnDvsn
            $hgrnDvsn.append('<em class="' + orgChartClassData.subDepartmentConnectLine + '"></em>');
            $hgrnDvsn.after(makeDepartmentHtml(departmentObj, index, depth, groupLineType, buttonClassType));

            $departmentItem = $hgrnDvsn.next();
            beforeHgrnDvsn = Often.null2Void(departmentObj[index].HGRN_DVSN_CD, "0");
            returnHtml = "";
        }

        function getGroupLineType(index) {
            var isLastOrganization = index === (departmentObj.length - 1) || index === nextIndex - 1;
            if (isLastOrganization) return orgChartClassData.lastSequenceLine
            else return orgChartClassData.notLastSequenceLine;
        }

        function getButtonType() {
            if (isLastDepartment) return orgChartClassData.notExistsubDepartment;
            else if (isUserDvsn) return orgChartClassData.disableExistSubDepartment + " subDepartmentOpenBtn"
            else return orgChartClassData.enableExistSubDepartment + " subDepartmentOpenBtn";
        }
    }

    function makeDepartmentHtml(departmentObj, index, depth, lastSequenceClassType, buttonClassType) {
        var baseHtml = $("#organizationItem").html();
        var isDeptChecked = InvitationPopup.isIdExistInArray(departmentObj[index].DVSN_CD, 'dept');
        return ListHelper.replaceJson(baseHtml, {
            'dvsn-cd': departmentObj[index].DVSN_CD,
            'depth': depth,
            'hgrn-dvsn-cd': departmentObj[index].HGRN_DVSN_CD,
            'margin-style': 'style="margin-left:' + (depth * 18) + 'px"',
            'right-style': 'style="right:' + (depth * 18) + 'px"',
            'group-icon': getDepthLineHtml(lastSequenceClassType, depth),
            'button-class': buttonClassType,
            'last-code': (departmentObj[index].LAST_DVSN_YN === "Y" ? '2' : '1'),
            'dvsn-nm': departmentObj[index].DVSN_NM,
            'active': departmentObj[index].DVSN_CD === _DVSN_CD ? orgChartClassData.enableEmployeeList : "",
            'root-dvsn-line': 'd-none',
            'checked': isDeptChecked ? "coperate-check-type-2" : "coperate-check-type-1"
        })
    }

    function getDepthLineHtml(lastSequenceClassType, depth) {
        var returnHtml = '';
        var baseHtml = $("#chartDepthLineItem").html();
        var depthLineLeft = -29;
        var upperDepartment = $departmentItem;

        returnHtml += depth !== 0 ? '<i class="' + lastSequenceClassType + '"></i>' : "";
        for (var i = 0; i < depth - 1; i++) {
            var isLastSequenceUpperDepartment = Number(upperDepartment.find('i').attr('class').split('-')[3]) === 3;
            if (!isLastSequenceUpperDepartment) {
                returnHtml += ListHelper.replaceJson(baseHtml, {
                    'depth-line-left': 'style="left:' + depthLineLeft + 'px"',
                });
            }
            depthLineLeft = depthLineLeft - 18;
            upperDepartment = $('li[dvsn-cd="' + upperDepartment.attr('hgrn-dvsn-cd') + '"]');
        }

        return returnHtml;
    }

    function searchEmpl(e) {
        searchTimer && clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            openEmplArea();
            var isInviteLayer = $(e.target).findUp('#inviteLayer').length > 0;
            setEmployeeSearchArea(isInviteLayer ? 'Invite' : 'Organization');
            var searchWord = $(e.target).val();
            drawEmployeeListData(searchWord);
        }, 200);
    }

    function setEmployeeSearchArea(searchArea) {

        if (searchArea === 'Chatting') {
            departmentCode = $('#miniOrganization .department-item').attr("dvsn-cd");
            $searchLayer = $('#miniChatting');
        } else if (searchArea === 'Invite') {
            departmentCode = $departmentItem && $departmentItem.attr("dvsn-cd");
            $searchLayer = $('#inviteLayer');
        } else if (searchArea === 'Organization') {
            $searchLayer = _IsMini ? $('#miniOrganization') : $('#organizationLayer');
            departmentCode = $departmentItem && $departmentItem.attr("dvsn-cd");
        }
    }

    function drawEmployeeListData(searchWord) {
        var isSearch = Often.null2Void(searchWord, "") !== "";
        var departmentSearchCode = !isSearch ? departmentCode : "";
        var departmentName = $departmentItem ? $departmentItem.text().trim()
            : $orgChartTarget.find('span.department-name.flow-color-type-1 em').text();
        var $searchResultTitle = $searchLayer.find("#emplList-dvsnName");
        var $resultSearch = $searchLayer.find("#resultSearch");
        var $departmentName = $emplArea.find('#departmentName');
        var textOnResultField = isSearch ? ("'" + searchWord + "' 검색결과") : departmentName;
        $departmentName.find('span').text(textOnResultField)
        $searchResultTitle.text(isSearch ? ("'" + searchWord + "'") : departmentName);
        $resultSearch.css("display", isSearch ? "inline-block" : "none");
        openEmplArea()
        var emplData = {
            PG_NO: 1,
            PG_PER_CNT: "20",
            NEXT_YN: "Y",
            DVSN_CD: departmentSearchCode,
        }

        drawEmployeeList(searchWord, emplData)
    }

    function drawEmployeeList(searchWord, pageData) {
        var $existEmplData = $searchLayer.find("#existEmplData");
        var $nullEmplData = $emplArea.find("#nullEmplData");
        var $emplList = $emplArea.find("#organizationChart-emplList");
        var isInvitePopup = $organizationLayer && $organizationLayer.is('#teamInviteLayer');
        var baseHtml = $(isInvitePopup ? "#emplListItemForInvitation" : "#emplListItem").html();

        Ajax.executeApi(RestApi.GET.FLOW_EMPL_R001, $.extend({}, pageData, {
            SRCH_WD: Often.null2Void(searchWord, ""),
            packetOption: Ajax.OPTION.PREVENT_CALLBACK,
            ROOM_SRNO: Often.null2Void(ROOM_SRNO, ""),
        }), (data) => {
            $emplList.drawListHelper({
                pageData: pageData,
                nextYn: data["NEXT_YN"],
                records: data.EMPL_REC,
                callback: {
                    item: () => {
                        var returnHtml = '';
                        var emplObj = data.EMPL_REC;
                        $.each(emplObj, function (i, emplData) {
                            returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, emplData, {
                                image: ListHelper.setProfile(emplData.PRFL_PHTG),
                                status: _IsMini ? 'mini-mode-' + MiniState.getStatusName(emplObj[i].STATUS) : '',
                                id: Member.getIdentifier(emplObj[i].USER_ID),
                                active: InvitationPopup.isIdExistInArray(emplObj[i].USER_ID, "member") ? 'active' : '',
                            }));
                        });
                        return returnHtml;
                    },
                    scroll: function () {
                        drawEmployeeList(searchWord, pageData)
                    },
                    final: () => {
                        var isEmptyData = data.EMPL_REC.length === 0;
                        $existEmplData.css("display", isEmptyData ? "none" : "block");
                        $nullEmplData.css("display", isEmptyData ? "inherit" : "none");
                    },
                    click: Participant.clickParticipantsArea,
                }
            })
        });
    }

    function setEmplArea(emplLayer) {
        $emplArea = emplLayer;
    }

    function setDragEvent() {
        $organizationLayer = _IsMini ? $('#miniWrap') : $organizationLayer;
        var $dragPoint = $emplArea.find('#drag');
        var minHeight = $emplArea.height();
        var maxHeight = $organizationLayer.height() - (_IsMini ? 0 : searchField.outerHeight(true)) - reduceDraggableHeight;
        var bottomHeight;
        var changeHeight;

        $dragPoint.draggable({
            containment: $organizationLayer,

            start: function () {
                $dragPoint.css("position", "static")
                bottomHeight = $emplArea.height();
            },

            drag: function (event, ui) {
                var offset = ui.originalPosition.top - ui.position.top;
                changeHeight = bottomHeight + offset;
                if (changeHeight <= minHeight) changeHeight = minHeight;
                else if (changeHeight > maxHeight) changeHeight = maxHeight;
                $emplArea.height(changeHeight);
            },

            stop: function () {
                $dragPoint.css({top: 0, position: "sticky"});
                adjustOrgArea(false)
            }
        });

        $dragPoint.css("position", "sticky")
    }

    function showDvsnSelectButton() {
        if ($orgChartTarget.selector !== "#inviteOrgChart") return;
        $orgChartTarget.find(".js-dvsn-select").css("display", "block");
    }
})();

var orgChartClassData = {
    subDepartmentConnectLine: "group-line-type-1",
    notLastSequenceLine: "group-line-type-2",
    lastSequenceLine: "group-line-type-3",
    enableExistSubDepartment: "group-line-type-4",
    disableExistSubDepartment: "group-line-type-11",
    notExistsubDepartment: "group-circle-type-1",
    enableEmployeeList: "flow-color-type-1",
}