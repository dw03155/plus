var InvitationPopup = (function () {

    /**
     * @deprecated 팝업이 안정화 된 후에는 기능아이디 삭제 예정
     * 기능 아이디로 TeamInvite.js, InviteProject.js, Organization.js 보다 선행 되어야 JSP에 ID들이 겹치지 않습니다.
     * 프로젝트 초대의 경우 처음 뜨는 리스트도 변경 합니다.
     * 모든 Javascript, CSS는 신규 팝업을 기준으로 합니다.
     */
    const URLParameter = window.location.search;
    if (Often.isFunc('INVITATION_POPUP') && URLParameter.indexOf('FAVORITE') < 0) {
        $('.js-temporary-popup').remove()
    } else {
        $('.detail-popup-type-1').css('height', '368')
        $('.js-new-invitation-popup').remove()
    }

    const organizationExist = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "DVSN_TREE_YN") === "Y";
    const isGuest = StatusCode.UN_BFLOW.GUEST === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");

    const isChat = URLParameter.indexOf("CHAT") > -1; //현 페이지가 채팅인지의 여부 (상위 개념)
    const isNewChat = URLParameter.indexOf("NEW_CHAT") > -1; // 현 페이지가 새로운 채팅 만들기인지의 여부 (하위 개념)

    const $invitePopup = $('#invitePopup'); // 초대팝업의 최상위 영역 (Dimmed)
    const $inviteLayer = $("#teamInviteLayer"); // 초대팝업의 가장 상위 Layer
    const $detailLayer = $('#organizationDetailLayer'); // 조직도 Detail Layer
    const $detailName = $('#departmentName span') // 조직도 또는 그룹의 이름 출력부
    const $detailUl = $('#existEmplData ul'); // 조직도 또는 그룹의 상세 직원 출력 영역
    const $inviteSearchField = $("#inviteSearchArea"); //검색 영역
    const $inviteOrgChartUl = $("#inviteOrgChart"); // 조직도 영역
    const $inviteGroupUl = $("#inviteGroup"); // 그룹 영역
    const $listAreaUl = $("#membersListForInvitation ul"); // 리스트 영역 (조직도 X)
    const $resultField = $("#inviteTargetList"); // 오른편의 초대 될 목록
    const $title = $('#teamInviteHeader'); // 하단 리스트의 제목
    const $blankPage = $('#blankInviteTarget'); // 사용자가 존재 하지 않을때 덮는 페이지
    const $countField = $('#countFinalElement'); // 선택된 갯수표시

    let layerStatus = 'employee'; // 탭 상태를 나타낸다 (Default as 직원 탭)
    let timer = 0; // 검색 keydownEvent의 타이머
    let taskNumber = ''; // 업데이트 할 업무 번호
    let postNumber = ''; // 게시물 번호

    let selectedMembersInArray = []; // 초대 또는 사용할 사용자 배열 (ID)
    let selectedDepartmentsInArray = []; // 초대 또는 사용할 부서 배열 (ID)
    let selectedGroupInArray = []; // 초대 또는 사용할 그룹 배열 (GRP_CD)
    let temporaryMembersInArray = []; // FLOW_SCHD_ATD_U001을 위한 배열 (삭제 또는 추가 변경 변경분을 저장하기 위한 배열
    let popupType = ''; // 팝업의 종류 구분. (프로젝트 | 채팅 | 담당자)

    let pageData = {
        PG_NO: 1, // 페이지 번호 (Default as 1)
        NEXT_YN: 'Y' // 다음페이지가 존재하는지 유무 (Default as N)
    }

    const popupTitle = {
        chat: isNewChat ? '새 채팅' : '대화상대 초대',
        project: '참여자 초대',
        manager: '담당자 변경',
        participant: '참석자 변경'
    }

    const searchPlaceHolder = {
        chat: '이름, 소속, 전화번호 검색',
        project: '이름, 소속, 전화번호 검색',
        manager: '담당자명 검색',
        participant: '참석자명 검색'
    }

    const backButtonStyle = {
        chat: 'none',
        project: 'inline-block',
        manager: 'none',
        participant: 'none'
    }

    const confirmText = {
        chat: '초대하기',
        project: '초대하기',
        manager: '확인',
        participant: '확인'
    }

    return {
        openInvitationPopup: openInvitationPopup,
        openManagerPopup: openManagerPopup,
        openParticipantPopup: openParticipantPopup,
        closePopupLayout: closePopup,
        isIdExistInArray: isIdExistInArray,
        retrieveAllArray: retrieveAllArray,
        countElements: countElementsInAction
    }

    /**
     * Main Method
     * 초대 팝업 띄움
     * 각 파라미터의 조건에 맞게 팝업이 출력됩니다
     * 조직도가 존재하지 않는다면 직원 리스트를 출력하며 조직도가 있을 경우애는 조직조가 최초에 보여집니다.
     *
     * @param isDimmed {boolean=} 백그라운드 Dimmed 처리 여부
     * @param removeNavigation {boolean=} 상단 Navigation 탭 보이는지 여부
     * @param type {string=} project (프로젝트 초대) | chat (채팅) | manager (담당자)
     *
     * @description 추가또는 개선 부분이 있으면 Switch 구문이 있는곳을 중점으로 수정하여 사용
     */
    function openInvitationPopup(isDimmed, removeNavigation, type) {
        designatePopup(type);
        clearAllPopupInfo(true);
        isGuest ? guestMember() : businessMember(removeNavigation);
        controlDimmed(isDimmed);
        openPopupLayout();
        controlClassByPopupType();
    }

    /**
     * Main Method
     * 초대 팝업과 동일한 팝업이 출력되면서 담당자 지정 API를 호출 하여 출력합니다.
     *
     * @param postSrno {string} 게시글 고유번호
     * @param taskSrno {string} 고유 업무번호
     */
    function openManagerPopup(postSrno, taskSrno) {
        postNumber = postSrno;
        taskNumber = taskSrno;

        designatePopup('manager');
        clearAllPopupInfo(true);
        selectManager();
        controlDimmed(true);
        openPopupLayout();
        controlClassByPopupType();
    }

    /**
     * Main Method
     * 초대 팝업과 동일한 팝업이 출력됨
     * @param postSrno
     */
    function openParticipantPopup(postSrno) {
        postNumber = postSrno;

        designatePopup('participant');
        clearAllPopupInfo(true);
        selectParticipant();
        controlDimmed(true);
        openPopupLayout();
        controlClassByPopupType();
    }

    /**
     * 유료 회원의 경우 초대 팝업
     * @param removeNavigation {boolean} 상단 Navigation 탭 보이는지 여부
     */
    function businessMember(removeNavigation) {
        controlNavigation(removeNavigation ? 'remove' : 'employee');
        // 항상 처음엔 직원 탭이 열림
        organizationExist ? showOrganizationChart() : showEmployeeList();
    }

    // 게스트 회원의 경우 초대 팝업
    function guestMember() {
        controlNavigation('partner');
        $('.js-partners').text('연락처');
        $('.js-employees').remove();
        showPartnerForGuest();
    }

    // 담당자 지정 팝업
    function selectManager() {
        controlNavigation('remove');
        showManagerList();
    }

    // 참석자 지정 팝업
    function selectParticipant() {
        controlNavigation('remove');
        showParticipantList();
    }

    /**
     * 현재 팝업이 어떤 팝업인지 확인 (채팅 자동 설정)
     * @param type 지정된 팝업 타입
     */
    function designatePopup(type) {
        if (!!type) return popupType = type;
        if (isChat) return popupType = 'chat';
        else popupType = 'project';
    }

    /*****************************************************/
    /********* View controller start from here **********/
    /*****************************************************/

    //조직도 페이지 출력 부
    function showOrganizationChart() {
        layerStatus = "employeeOrg"
        clearAllPopupInfo();
        changePopupMode('chart')
        Organization.initPage($inviteOrgChartUl, $detailLayer, true, $inviteLayer, $inviteSearchField, $inviteSearchField, 142);
    }


    //직원들 리스트 출력 부
    function showEmployeeList() {
        layerStatus = "employeeList"
        clearAllPopupInfo();
        changePopupMode('list')
        drawMemberList("J");
    }

    //외부인 리스트 출력 부
    function showPartnerList() {
        layerStatus = "partner";
        clearAllPopupInfo();
        changePopupMode('list');
        drawMemberList("F");
    }

    //그룹 리스트 출력 부
    function showGroupList() {
        layerStatus = "group";
        clearAllPopupInfo();
        changePopupMode('group');
        drawGroupList();
    }

    //게스트용 연락처 출력 부
    function showPartnerForGuest() {
        layerStatus = "partner";
        clearAllPopupInfo();
        changePopupMode('list');
        drawMemberList();
    }

    // 담당자 지정 출력 부
    function showManagerList() {
        clearAllPopupInfo();
        changePopupMode('list');
        drawProjectMembersList();
    }

    function showParticipantList() {
        clearAllPopupInfo();
        changePopupMode('list');
        drawProjectMembersList();
    }

    /**
     * 출력되는 모드에 따라 조직도 또는 리스트형 레이어 교체
     * @param mode {string} chart (조직도) | list (일반 리스트) - ex.외부인  | listDetail (일반 리스트에 아래 Draggable 팝업)
     */
    function changePopupMode(mode) {
        var invitationLayerWithDetail = $inviteLayer.find('.project-invite-employee-case'); // 조직도, 그룹 상위 Div
        var listLayer = $inviteLayer.find(".project-invite-ouside-case"); // 리스트 상위 Div
        var $inviteGroup = $inviteGroupUl.parent();
        var $inviteOrgChart = $inviteOrgChartUl.parent();

        switch (mode) {
            case 'chart':
                invitationLayerWithDetail.removeClass('d-none');
                $inviteOrgChart.removeClass('d-none')
                $inviteGroup.addClass('d-none');
                listLayer.addClass('d-none');
                break;

            case 'list' :
                listLayer.removeClass('d-none');
                invitationLayerWithDetail.addClass('d-none');
                break;

            case 'group' :
                invitationLayerWithDetail.removeClass('d-none');
                $inviteGroup.removeClass('d-none');
                listLayer.addClass('d-none');
                $inviteOrgChart.addClass('d-none');
                $detailLayer.css('display', 'none').addClass('d-none');
                break;
        }
    }

    /**
     * 초대 팝업의 상단 navigation 제거 또는 탭 변경
     * @param mode remove | employee | partner | group
     */
    function controlNavigation(mode) {
        const $navigationTabUl = $inviteLayer.find('.project-invite-popup-navi');
        $navigationTabUl.css('display', 'inherit');
        switch (mode) {
            case 'remove' : // 탭 삭제
                $navigationTabUl.css('display', 'none');
                break;
            case 'employee' : // 직원 탭 열기
                $navigationTabUl.find('li').removeClass('on');
                $navigationTabUl.find('.js-employees').addClass('on');
                break;
            case 'partner' : // 외부인 탭 열기
                $navigationTabUl.find('li').removeClass('on');
                $navigationTabUl.find('.js-partners').addClass('on');
                break;
            case 'group' : // 그룹 열기
                $navigationTabUl.find('li').removeClass('on');
                $navigationTabUl.find('.js-groups').addClass('on');
                break;
        }
    }

    /*****************************************************/
    /****** Export API controller start from here *******/

    /*****************************************************/

    /**
     * 사용자의 정보를 타입에 맞게 출력 (READ)
     * @param type J (직원) | F (외부인) | '' (전체)
     */
    function drawMemberList(type) {
        $inviteSearchField.off('keydown').on('keydown', searchByKeyword);
        Ajax.executeApi(RestApi.GET.COLABO2_CHAT_CNPL_R001, $.extend({}, pageData, {
            FLOW_USER_YN: "Y",
            GUBUN: type,
            SRCH_WORD: $inviteSearchField.val(),
        }), function (membersInfo) {
            $listAreaUl.drawListHelper({
                pageData: pageData,
                nextYn: membersInfo["NEXT_YN"],
                records: membersInfo["CNPL_LIST"],
                callback: {
                    item: createMemberListToHtml,
                    scroll: function () {
                        drawMemberList(type)
                    },
                }
            })
        })
    }

    //그룹 정보 출력 (READ)
    function drawGroupList() {
        $inviteSearchField.off('keydown').off('keyup').on('keydown', searchByKeyword);
        Ajax.executeApi('FLOW_GROUP_R001', $.extend({}, pageData, {
            RENEWAL_YN: "Y"
        }), function (groupsInfo) {
            $inviteGroupUl.drawListHelper({
                pageData: pageData,
                nextYn: groupsInfo["NEXT_YN"],
                records: groupsInfo["GROUP_REC"],
                callback: {
                    item: createGroupListToHtml,
                }
            })
        })
    }

    /**
     * 해당 그룹의 사용자들 조회후 출력 (READ)
     * @param groupId 그룹에 대한 아이디 (GROUP_CD)
     */
    function drawGroupMemberList(groupId) {
        Ajax.executeApi('FLOW_GROUP_MEMBER_R001', $.extend({}, pageData, {
            GROUP_CD: groupId
        }), function (membersInfo) {
            const isDataExist = membersInfo["MEMBER_REC"].length !== 0
            $inviteLayer.find('#nullEmplData').css('display', isDataExist ? 'none' : 'block')
            $detailUl.drawListHelper({
                pageData: pageData,
                nextYn: membersInfo["NEXT_YN"],
                records: membersInfo["MEMBER_REC"],
                callback: {
                    item: createMemberListToHtml,
                    scroll: function () {
                        drawGroupMemberList(groupId)
                    },
                },
            })
        })
    }

    function searchGroupMember() {
        Ajax.executeApi('FLOW_FAV_GROUP_R002', $.extend({}, pageData, {
            SRCH_WD: $inviteSearchField.val(),
        }), function (membersInfo) {
            const isDataExist = membersInfo["FAV_GROUP_REC"].length !== 0
            $inviteLayer.find('#nullEmplData').css('display', isDataExist ? 'none' : 'block')
            openDetailLayer(true, $inviteSearchField.val())
            $detailUl.drawListHelper({
                pageData: pageData,
                nextYn: membersInfo["NEXT_YN"],
                records: membersInfo["FAV_GROUP_REC"],
                callback: {
                    item: createMemberListToHtml,
                    scroll: searchGroupMember,
                }
            })
        })
    }

    // 프로젝트에 존재하는 사람들 출력 (READ)
    function drawProjectMembersList() {
        $inviteSearchField.off('keydown').on('keydown', searchManagerByKeyword);
        const projectData = {
            packetOption: 2,
            COLABO_SRNO: getCurrentProjectNumber(),
            SRCH_WORD: $inviteSearchField.val(),
            SORT_DESC: "N"
        }

        Ajax.executeApi('COLABO2_SENDIENCE_R101', $.extend({}, projectData, pageData), function (membersInfo) {
            $listAreaUl.drawListHelper({
                pageData: pageData,
                nextYn: membersInfo["NEXT_YN"],
                records: membersInfo["SENDIENCE_REC"],
                callback: {
                    item: createMemberListToHtml,
                    scroll: drawProjectMembersList,
                    final: () => {
                        if (popupType === 'manager' && temporaryMembersInArray.length === 0) {
                            checkManagerList();
                        } else if (popupType === 'participant' && temporaryMembersInArray.length === 0) {
                            checkParticipantList();
                        } else {
                            checkSelectedManager(selectedMembersInArray, true)
                        }
                    }
                }
            })
        })
    }

    // 지정되어 있는 담당자들 불러와 체크 (READ)
    function checkManagerList() {
        const postData = {
            COLABO_SRNO: getCurrentProjectNumber(),
            COLABO_COMMT_SRNO: postNumber,
            TMPL_TYPE: 4,
        }

        WorkerPopup.getPostWorkerRecord(postData, checkSelectedManager);
    }

    // 지정되어 있는 참석자들 불러와 체러 (READ)
    function checkParticipantList() {
        const postData = {
            COLABO_SRNO: getCurrentProjectNumber(),
            COLABO_COMMT_SRNO: postNumber,
            TMPL_TYPE: 3,
        }

        WorkerPopup.getPostWorkerRecord(postData, checkSelectedManager);
    }

    // 선택된 참석자들 업데이트 (UPDATE)
    function updateParticipant() {
        const submitData = {
            COLABO_SRNO: getCurrentProjectNumber(),
            COLABO_COMMT_SRNO: postNumber,
            INSERT_ATD_REC: scheduleParticipantJsonConverter(selectedMembersInArray),
            DELETE_ATD_REC: scheduleParticipantJsonConverter(temporaryMembersInArray),
        }

        Ajax.executeApi('FLOW_SCHD_ATD_U001', submitData, function () {

            // 참석자 업데이트
            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: getCurrentProjectNumber(),
                POST_SRNO: postNumber,
                SCHEDULE_DATA: {
                    OBJECT: "ATTENDENCE",
                    ATTENDENCE_REC: scheduleParticipantJsonConverter(selectedMembersInArray),
                },
            });

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: getCurrentProjectNumber(),
                POST_SRNO: postNumber,
                REMARK_UPDATE: true,
            });
        })
        Often.toast("success", '참석자가 변경되었습니다.');
    }


    // 선택된 직원들을 프로젝트 초대 (INSERT)
    function inviteMembersToProject() {
        const myInfo = [{ // 본인의 정보가 앞에 들어가야 함
            id: _USER_ID,
            type: "U",
        }];

        const submitData = {
            COLABO_SRNO: getCurrentProjectNumber(),
            SENDIENCE_REC: participantJsonConverter(myInfo.concat(selectedMembersInArray, selectedDepartmentsInArray, selectedGroupInArray)),
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }

        Ajax.executeApi(RestApi.POST.COLABO2_SENDIENCE_C001, submitData, function () {
            Participant.drawProjectParticipantItems(getCurrentProjectNumber(), true, function () {
                UpdateElements.autoUpdateElem({ONLY_POST: true});
                Often.toast("success", i18next.t('front.alert.invitedToProject'));
            });
        })
    }

    // 선택된 직원들 채팅 초대 (INSERT)
    function inviteMembersToChat() {
        OpenUtil.openMessengerByInvite(
            Often.null2Void(ROOM_SRNO),
            chatJsonConverter(selectedMembersInArray, 'member'),
            chatJsonConverter(selectedDepartmentsInArray, 'dept'),
            chatJsonConverter(selectedGroupInArray, 'group'))
    }

    // 업무 담당자 업데이트 (UPDATE)
    function updateManager() {
        const submitData = {
            OBJECT: "WORKER",
            TASK_SRNO: taskNumber,
            WORKER_REC: managerJsonConverter(selectedMembersInArray)
        }

        Ajax.executeApi('FLOW_TASK_WORKER_U002', submitData, function () {
            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: getCurrentProjectNumber(),
                POST_SRNO: postNumber,
                TASK_DATA: submitData,
            });
        })

    }

    /*****************************************************/
    /********* HTML controller start from here **********/

    /*****************************************************/

    /**
     * 초대 팝업 오른쪽 레이아웃에 해당 사용자 또는 부서 추가 (HTML만 추가합니다)
     * 직원 즉, 프로필 사진이 없는 그룹 또는 부서일 경우 group-item 클래스를 넣어준다
     * @param info {profileImagePath: 프로필 이미지 경로, memberName: 사용자 이름, memberId: 사용자 ID} memberInfo 사용자 정보의 JSON
     */
    function addElementToResultField(info) {
        const template = $('#inviteTargetListElement').html();
        const exportedElement = ListHelper.replaceJson(template, $.extend({}, info, {
            image: ListHelper.setProfile(info.profileImagePath),
            groupClass: info.type !== 'member' ? 'group-item' : ''
        }));

        $resultField.append(exportedElement)
    }

    /**
     * 왼편 사용자 리스트를 HTML로 반환ㅜ
     * @param membersInfo 사용자의 정보
     * @returns {string} 사용자 리스트 HTML형식으로 반환
     */
    function createMemberListToHtml(membersInfo) {
        var template = $('#emplListItemForInvitation').html();
        var result = ""
        if (popupType === 'manager' || popupType === 'participant')
            membersInfo = projectMemberJsonConverter(membersInfo);

        $.each(membersInfo, function (i, memberInfo) {
            result += ListHelper.replaceJson(template, $.extend({}, memberInfo, {
                image: ListHelper.setProfile(memberInfo.PRFL_PHTG),
                status: _IsMini ? 'mini-mode-' + MiniState.getStatusName(memberInfo.STATUS) : '',
                id: Member.getIdentifier(memberInfo.USER_ID),
                active: isIdExistInArray(memberInfo.USER_ID, "member") ? 'active' : '',
                use_intt_id: memberInfo.USE_INTT_ID,
            }));
        });
        return result;
    }

    /**
     * 왼편 그룹 리스트를 HTML로 반환
     * @param groupsInfo 그룹들의 정보
     * @returns {string} 그룹 리스트를 HTML형식으로 반환
     */
    function createGroupListToHtml(groupsInfo) {
        var template = $('#groupListItemForInvitation').html();
        var result = "";
        $.each(groupsInfo, function (i, groupInfo) {
            result += ListHelper.replaceJson(template, $.extend({}, groupInfo, {
                GROUP_NM: groupInfo.GROUP_NM, GROUP_CD: groupInfo.GROUP_CD,
                active: isIdExistInArray(groupInfo.GROUP_CD, "group") ? 'coperate-check-type-2' : 'coperate-check-type-1'
            }));
        });
        return result;
    }

    /**
     * 설정되어있는 담당자 체크
     * @param selectedManagers 담당자들 List
     * @param isConverted JSON이 변환되어있는지 여부
     */
    function checkSelectedManager(selectedManagers, isConverted = false) {
        $.each(selectedManagers, function (i, selectedManager) {
            const managerInfo = isConverted ? selectedManager : {
                profileImagePath: selectedManager.PRFL_PHTG,
                id: selectedManager.USER_ID,
                name: selectedManager.USER_NM,
                type: 'member',
                identifyCode: selectedManager.USE_INTT_ID
            }

            if (isIdExistInArray(managerInfo.id, 'member')) return true;
            const managerElement = $listAreaUl.find(".js-member-item[data-id = '" + managerInfo.id + "']");
            managerElement.addClass('active')

            addToArray(managerInfo, 'member')
            addToArray(managerInfo, 'temp'); // 참석자 변경할때 변경되기 전 데이터가 있어야 함
            addElementToResultField(managerInfo);
        })
    }

    /**
     * 상세 팝업 (그룹 하단에 직원 상세 정보) 띄움
     * @param isSearch 검색으로 여는지의 여부
     * @param title 상세 팝업의 제목
     */
    function openDetailLayer(isSearch, title) {
        $detailLayer.css('display', 'block').removeClass('d-none')
        $detailUl.empty();

        if (title !== "") {
            $detailName.text(isSearch ? "'" + title + "' " + '검색결과' : title)
        } else {
            $detailName.text('')
        }
    }

    /**
     * 몇개의 요소가 선택되어있는지 출력합니다
     * 요소가 존재하지 않을시 선택해달라는 문구와 함께 결과 부분을 덮습니다.
     * 갯수가 없을시 아무것도 출력하지 않습니다
     * @param firmCount 강제 카운트 세팅 (초기화를 위함)
     */
    function countElementsInAction(firmCount) {
        const isFirmCountExist = !!firmCount;
        const prefix = (popupType === 'manager') ? 'front.common.countMembers' : 'front.common.selectedTarget';
        const $descriptionArea = $invitePopup.find('.project-invite-selected-num');
        let count = isFirmCountExist ? firmCount : countElement();

        $countField.text(count === 0 ? '' : i18next.t(prefix, {count: count})) // 상단 갯수 카운팅

        if (count === 0) {
            $blankPage.removeClass('d-none') // 선택된 요소 가 없을시 화면 전환
            $descriptionArea.css('display', 'none'); //
        } else {
            $blankPage.addClass('d-none')
            $descriptionArea.css('display', 'flex');
        }
    }

    // 몇개의 요소가 선택되어있는지 출력합니다
    function countElement() {
        return selectedMembersInArray.concat(selectedDepartmentsInArray, selectedGroupInArray).length;
    }

    /**
     * 초대 팝업 오른쪽 레이아웃에 해당 사용자 또는 부서 제거 (HTML만 제거합니다)
     * @param id 사용자의 ID
     */
    function removeElementToResultField(id) {
        const targetElement = $resultField.find("li[data-id='" + id + "']")
        targetElement.remove();
    }

    // 체크 표시가 되어있는 모든 li들의 체크 표시 해제
    function removeAllSelectedButton() {
        $invitePopup.find('.coperate-check-type-2').removeClass('coperate-check-type-2').addClass('coperate-check-type-1')
        $invitePopup.find('.js-member-item').removeClass('active')
    }

    /*****************************************************/
    /********* Array controller start from here **********/

    /*****************************************************/

    /**
     * 사용자 또는 부서 배열에 추가
     * @param info 사용자의 ID 혹은 부서 ID
     * @param target {string} 배열 구분값 member | dept
     */
    function addToArray(info, target) {
        if (isIdExistInArray(info, target)) return

        switch (target) {
            case 'member' :
                selectedMembersInArray.push({
                    id: info.id,
                    type: info.gubun,
                    name: info.name,
                    imagePath: info.profileImagePath,
                    identifyCode: info.use_intt_id
                });
                break;
            case 'dept' :
                selectedDepartmentsInArray.push({
                    id: info.id,
                    type: info.gubun,
                    name: info.name
                });
                break;
            case 'group' :
                selectedGroupInArray.push({
                    id: info.id,
                    type: info.gubun,
                    name: info.name
                });
                break;
            case 'temp' :
                temporaryMembersInArray.push({
                    id: info.id,
                    type: info.gubun,
                    name: info.name
                })
        }
        countElementsInAction();
    }

    /**
     * 사용자 /부서 / 그룹별 배열에서 삭제
     * @param id 사용자의 ID
     * @param target {string} 배열 구분값 member | dept
     */
    function removeFromArray(id, target) {
        switch (target) {
            case 'member' :
                selectedMembersInArray = deleteArrayById(selectedMembersInArray, id);
                break;
            case 'dept' :
                selectedDepartmentsInArray = deleteArrayById(selectedDepartmentsInArray, id);
                break;
            case 'group' :
                selectedGroupInArray = deleteArrayById(selectedGroupInArray, id);
                break;
        }
        countElementsInAction();
    }

    /**
     * 아이디를 기준으로 배열 요소 삭제 (removeFromArray 함수의 하위 함수)
     * @param array 삭제되어야하는 배열
     * @param id 배열의 요소
     * @returns {array} id 요소가 삭제된 배열
     */
    function deleteArrayById(array, id) {
        return array.filter(function (element) {
            return element['id'] !== id;
        })
    }

    /**
     * 배열안에 해당 사용자가 있는지 확인
     * @param id 사용자의 ID
     * @param target {string} 배열 구분값 member | dept | group
     * @returns {boolean} 사용자가 있을시 true 반환
     */
    function isIdExistInArray(id, target) {
        var targetArray;
        switch (target) {
            case 'member':
                targetArray = selectedMembersInArray;
                break;

            case 'dept' :
                targetArray = selectedDepartmentsInArray;
                break;

            case 'group' :
                targetArray = selectedGroupInArray;
                break;

            default : {
                return false;
            }
        }
        return targetArray.map(function (d) {
            return d['id'];
        }).indexOf(id) > -1;
    }

    function isArrayEquals(arr1, arr2) {
        let n = arr1.length;
        let m = arr2.length;

        if (n !== m) return false;

        arr1.sort();
        arr2.sort();
        for (let i = 0; i < n; i++)
            if (arr1[i] !== arr2[i]) return false;

        return true;
    }

    /*****************************************************/
    /********* Util controller start from here **********/

    /*****************************************************/

    /**
     * 뒤 배경 dimmed 처리
     * @param isDimmed {boolean} dimmed 처리 여부
     */
    function controlDimmed(isDimmed) {
        const $section = $inviteLayer.parents('.js-dimmed-area');
        isDimmed ? $section.addClass('dimmed').css('display', 'block') : $section.removeClass('dimmed').css('display', 'none')
        $invitePopup.off('click').on('click', invitationPopupDimmedClickEvent)
    }

    /**
     * 팝업을 fadeIn 으로 열어줍니다.
     * Click Event를 적용합니다.
     * 팝업을 열떄의 초기 세팅을 합니다.
     * @description 채팅일 경우에는 열기 동작 X, 닫을떄에 해당 창을 닫음
     */
    function openPopupLayout() {
        $title.text(popupTitle[popupType]) // 제목 제어
        $invitePopup.find('.js-back-menu').css('display', backButtonStyle[popupType]) // 뒤로가기 버튼 제어
        $('#inviteMembers').text(confirmText[popupType]) // 초대 또는 확인 버튼의 텍스트 제어
        $inviteSearchField.attr('placeholder', searchPlaceHolder[popupType]); // 검색 영역의 placeHolder

        $invitePopup.css('display', 'block')
        $inviteLayer.fadeIn(200).off('click').on('click', invitationPopupClickEvent)
    }

    /**
     * 팝업창 닫는 가장 상위 함수
     * 채팅일 경우 바로 self.close
     * 지정한 사람들이 존재한다면 경고가 뜬 후 닫음
     * @param closePopupOnly {boolean=} 초대팝업만 제거 (뒤로가기 시)
     * @param isSubmit {boolean=} 제출 인지 여부 확인
     */
    function closePopup(closePopupOnly = false, isSubmit = false) {
        let temporaryMembersId = [];
        let selectedMembersId = [];
        temporaryMembersInArray.forEach(element => temporaryMembersId.push(element.id))
        selectedMembersInArray.forEach(element => selectedMembersId.push(element.id))
        let isChanged = !isArrayEquals(temporaryMembersId, selectedMembersId);
        const isCountExistInRegister = (countElement() !== 0 && !isSubmit)
            && ((popupType === 'project' || popupType === 'chat'));

        const isManagerOrParticipant = (popupType === 'manager' || popupType === 'participant') && !isSubmit;

        const alertMessage = {
            manager: '변경된 담당자가 있습니다, 나가시겠습니까?',
            participant: '변경된 참석자가 있습니다. 나가시겠습니까?',
            chat: '선택된 참석자가 있습니다. 나가시겠습니까?',
            project: '선택된 참석자가 있습니다. 나가시겠습니까?'
        }


        if ((isChanged && isManagerOrParticipant) || isCountExistInRegister) {
            PopupDraw.drawConfirm({
                contents: {main: alertMessage[popupType]},
                callback: {
                    submit: function () {
                        removePopup(closePopupOnly, isSubmit)
                    }
                }
            })
        } else {
            removePopup(closePopupOnly, isSubmit)
        }
    }

    /**
     * 팝업을 fadeOut 하여 닫습니다. (closePopup 함수에서만 사용)
     * @param closePopupOnly {boolean} 초대팝업만 제거 (뒤로가기 시)
     * @param isSubmit {boolean=} 제출 인지 여부 확인
     */
    function removePopup(closePopupOnly = false, isSubmit) {
        if (isChat && !isSubmit) return self.close();
        if (isChat) return;
        $inviteLayer.fadeOut(200)
        $invitePopup.fadeOut(200)

        if (!closePopupOnly) {
            $('#inviteMainLayer').css('display', 'none'); // 뒤 레이어 까지 닫음
            $('#inviteLayer').fadeOut(200)
        }
    }

    /**
     * 팝업 모든 세팅을 리셋
     * @param isInit 초대 대상도 초기화하는지 여부 (최초실행일 경우)
     */
    function clearAllPopupInfo(isInit) {
        if (isInit) {
            $resultField.empty();
            selectedMembersInArray = [];
            selectedDepartmentsInArray = [];
            selectedGroupInArray = [];
            temporaryMembersInArray = [];
        }
        $listAreaUl.empty();
        $inviteGroupUl.empty();
        $inviteOrgChartUl.empty();
        $detailName.text('');
        $detailUl.empty();
        $inviteSearchField.val("").off('click');
        $inviteLayer.find('#nullEmplData').css("display", "none");
        $('.js-search-text').addClass('d-none');
        $blankPage.removeClass('d-none')
        ListHelper.initPageData(pageData);
        countElementsInAction(0);
        $detailLayer.css('height', '240px'); // 드래그 reset
        $inviteOrgChartUl.parent().css("height", "");
    }

    // 선택된 모든 부서/직원/그룹 삭제
    function removeAllElements() {
        $resultField.empty();
        selectedMembersInArray = []; // 초대 또는 사용할 사용자 배열 (ID)
        selectedDepartmentsInArray = []; // 초대 또는 사용할 부서 배열 (ID)
        selectedGroupInArray = []; // 초대 또는 사용할 그룹 배열 (GRP_CD)
    }

    //탭에 맞게 검색 (모든 직원 조회시에만 사용 ex) 프로젝트 초대 / 채팅 초대)
    function searchByKeyword() {
        ListHelper.initPageData(pageData);
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            switch (layerStatus) {
                case "employeeList" :
                    $listAreaUl.empty();
                    drawMemberList("J");
                    break;
                case "partner" :
                    $listAreaUl.empty();
                    drawMemberList("F");
                    break;
                case "group" :
                    $listAreaUl.empty();
                    $detailLayer.css('display', 'block');
                    searchGroupMember();
                    break;
            }
        }, 200);
    }

    // 프로젝트 내 직원들 찾기
    function searchManagerByKeyword() {
        ListHelper.initPageData(pageData);
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            $listAreaUl.empty();
            drawProjectMembersList()
        }, 200);
    }

    /**
     * 현재 사용하고 있는 프로젝트 번호를 가져옴
     * @returns {number} COLABO_SRNO
     */
    function getCurrentProjectNumber() {
        const isPopupMode = $("#postPopup").is(":visible");
        return isPopupMode ? LocalUtil.getLocalValue('POP_PROJECT_SETTING').COLABO_SRNO : Detail.getProjectSrno();
    }

    // 현재 초대될 대상 확인을 위함 (디버그)
    function retrieveAllArray() {
        console.log('************** Invitation Array ************')
        console.log("초대될 사용자")
        selectedMembersInArray.forEach(element => console.log(element));
        console.log("초대될 부서")
        selectedDepartmentsInArray.forEach(element => console.log(element));
        console.log("초대될 그룹 \n")
        selectedGroupInArray.forEach(element => console.log(element));
        console.log("임시 배열 \n")
        temporaryMembersInArray.forEach(element => console.log(element));
        console.log('************** Invitation Array End ************')

        console.log('************** Others ************')
        console.log('현재 레이어: ' + layerStatus)
        console.log('현재 팝업: ' + popupType)
        console.log('게스트 여부: ' + isGuest)
        console.log('업무번호: ' + taskNumber)
        console.log('게시글 번호: ' + postNumber)
        console.log('************ Others End ***********')
    }


    /**
     * 프로젝트 초대 | 채팅 초대 | 담당자 지정 팝업 제어
     * @param projectFunction {function} 프로젝트 초대 Function
     * @param chatFunction {function} 채팅 초대 Function
     * @param managerFunction {function} 담당자 지정 Function
     * @param participantFunction {function} 참석자 지정 Function
     */
    function typeController(projectFunction, chatFunction, managerFunction, participantFunction) {
        switch (popupType) {
            case 'project':
                projectFunction();
                break;
            case 'chat' :
                chatFunction();
                break;
            case 'manager':
                managerFunction();
                break;
            case 'participant':
                participantFunction();
                break;
            default :
                Often.toast('error', '오류가 발생했습니다.')
        }
    }

    function controlClassByPopupType() {
        $inviteLayer.removeClass('js-manager-layer').removeClass('js-participant-layer')

        if (popupType === 'manager') {
            $inviteLayer.addClass('js-manager-layer')
        } else if (popupType === 'participant') {
            $inviteLayer.addClass('js-participant-layer')
        }
    }

    /*****************************************************/
    /********* JSON converter start from here ************/

    /*****************************************************/

    /**
     * JSON을 COLABO2_SENDIENCE_C001에 맞게 변환
     * @param json 변환해야하는 JSON
     */
    function participantJsonConverter(json) {
        return json.map(obj => {
            return {
                'RCVR_ID': obj.id,
                'RCVR_NM': obj.name,
                'RCVR_GB': obj.type
            }
        })
    }

    /**
     * Json을 COLABO2_CHAT_C001에 맞게 반환
     * @param json {object} 변환되어야 하는 JSON
     * @param type {string} member | dept | group
     * @returns {object} 변환된 json
     */
    function chatJsonConverter(json, type) {
        return json.map(obj => {
            switch (type) {
                case 'member':
                    return {'IN_RCVR_USER_ID': obj.id};
                case 'dept' :
                    return {'DVSN_CD': obj.id}
                case 'group' :
                    return {'GROUP_CD': obj.id}
            }
        })
    }

    /**
     * COLABO2_SENDIENCE_R101의 API를 HTML converter에 맞게 변환
     * @param json COLABO2_SENDIENCE_R101의 SENDIENCE_REC
     */
    function projectMemberJsonConverter(json) {
        return json.map(obj => {
            return {
                'USER_ID': obj.RCVR_USER_ID,
                'PRFL_PHTG': obj.PRFL_PHTG,
                'FLNM': obj.RCVR_USER_NM,
                'USE_INTT_ID': obj.RCVR_USE_INTT_ID,
                'STATUS': obj.STATUS,
                'JBCL_NM': obj.JBCL_NM,
                'DVSN_NM': obj.RCVR_DVSN_NM,
                'CMNM': obj.RCVR_CORP_NM
            }
        })
    }

    function managerJsonConverter(json) {
        return json.map(obj => {
            return {
                "WORKER_ID": obj.id,
                "WORKER_NM": obj.name,
                "USE_INTT_ID": obj.use_intt_id,
                "PRFL_PHTG": obj.imagePath,
            }
        })
    }

    function scheduleParticipantJsonConverter(json) {
        return json.map(obj => {
            return {
                "ATTENDENCE_ID": obj.id,
                "ATTENDENCE_NM": obj.name,
                "PRFL_PHTG": obj.imagePath,
                "RQST_USE_INTT_ID": obj.use_intt_id,
            }
        })
    }

    /*****************************************************/
    /*********** Click event start from here *************/

    /*****************************************************/

    /**
     * Click Event (Main)
     * 초대 팝업에 대한 모든 클릭 이벤트
     * @param e targetEvent
     * @description 해당 함수는 기본적인 클릭 이벤트만 제공합니다. 주석은 해당 Function 에만 달려있습니다.
     */
    function invitationPopupClickEvent(e) {
        const $eTarget = $(e.target);
        if (isEmployeeTab($eTarget)) return; // 직원 탭 클릭시 이벤트
        if (isPartnerTab($eTarget)) return; // 외부인 탭 클릭시 이벤트
        if (isGroupTab($eTarget)) return; // 그룹 탭 클릭시 이벤트

        if (isMemberListChecked($eTarget)) return; // 사용자의 체크박스를 클릭했을때의 이벤트
        if (isDepartmentListChecked($eTarget)) return; // 부서의 체크박스를 클릭했을때의 이벤트
        if (isGroupListChecked($eTarget)) return; // 그룹의 체크박스를 클릭했을떄의 이벤트

        if (isCloseButton($eTarget)) return; // 팝업 상단 X 혹은 취소를 클릭했을때 display none
        if (isReturnButton($eTarget)) return; // 팝업 상단의 뒤로가기 버튼을 클릭했을때
        if (isDeleteButtonFromResult($eTarget)) return; //오른편 초대 할 사용자 또는 부서들중 삭제 버튼 클릭시 삭제 이벤트
        if (isDepartmentDetailListCloseButton($eTarget)) return; // 클릭된 부서 사람 리스트, 출력부 닫기 버튼

        if (isGroupListDetail($eTarget)) return; // 그룹의 li를 클릭했을때의 이벤트 (체크박스 X)
        if (isSelectAllMembers($eTarget)) return; // 사용자 전체 선택의 이벤트
        if (isRemoveAllMembers($eTarget)) return; // 사용자 전체 삭제 이벤트

        if (isSubmitInvitation($eTarget)) ; // 프로젝트 초대 이벤트
    }

    /**
     * Click Event (Dimmed)
     * 초대 팝업의 Dimmed 클릭 이벤트 (Dimmed 영역 클릭시 꺼지게 처리)
     * 해당 부분은 Dimmed가 켜진 상태에서만 동작합니다
     * 채팅에서는 동작하지 않습니다
     * @param e targetEvent
     */
    function invitationPopupDimmedClickEvent(e) {
        const $eTarget = $(e.target);
        const isMemberDeleteButtonExist = $eTarget.findUp(".removeMemberItem").length !== 0;
        const isPopupLayer = $eTarget.findUp("#teamInviteLayer").length !== 0;
        if (isPopupLayer || isMemberDeleteButtonExist || isChat) return false;
        closePopup();
        return true;
    }


    function isCloseButton($eTarget) {
        const isCloseInviteLayerBtnExist = $eTarget.findUp(".closeInviteLayerBtn").length !== 0;
        if (!isCloseInviteLayerBtnExist) return false;
        closePopup();
        return true;
    }

    function isReturnButton($eTarget) {
        const isCancelInviteLayerBtnExist = $eTarget.findUp(".returnMainBtn").length !== 0;
        if (!isCancelInviteLayerBtnExist) return false;
        closePopup(true);
        return true;
    }

    function isDepartmentDetailListCloseButton($eTarget) {
        const isDepartmentListCloseBtnExist = $eTarget.findUp(".project-invite-team_close").length !== 0;
        if (!isDepartmentListCloseBtnExist) return false;
        $inviteOrgChartUl.parent().css("height", "");
        $detailLayer.css("display", "none")
        return true;
    }

    function isMemberListChecked($eTarget) {
        const memberListElement = $eTarget.findUp(".js-member-item");
        const isMemberListElementExist = memberListElement.length !== 0;
        if (!isMemberListElementExist) return false;

        const memberId = memberListElement.attr('data-id');
        if (!isIdExistInArray(memberId, 'member')) {
            const memberInfo = {
                'id': memberId,
                'name': memberListElement.attr('data-name'),
                'gubun': memberListElement.attr('rcvr_gb'),
                'profileImagePath': memberListElement.attr('profile-image'),
                'use_intt_id': memberListElement.attr('use_intt_id'),
                'type': 'member'
            };

            memberListElement.addClass('active')
            addToArray(memberInfo, 'member')
            addElementToResultField(memberInfo);
        } else {
            memberListElement.removeClass('active')
            removeFromArray(memberId, 'member');
            removeElementToResultField(memberId);
        }
        return true;
    }

    function isDepartmentListChecked($eTarget) {
        const departmentListToggleButton = $eTarget.findUp(".js-dvsn-select");
        const isDepartmentListToggleButtonExist = departmentListToggleButton.length !== 0;
        if (!isDepartmentListToggleButtonExist) return false;

        const departmentListElement = $eTarget.findUp(".department-item");
        const deptId = departmentListElement.attr('dvsn-cd');
        if (!isIdExistInArray(deptId, 'dept')) {
            const departmentInfo = {
                'id': deptId,
                'name': departmentListElement.attr('dvsn-nm'),
                'gubun': 'ED',
                'type': 'dept'
            };

            departmentListToggleButton.removeClass('coperate-check-type-1').addClass('coperate-check-type-2')
            addToArray(departmentInfo, 'dept')
            addElementToResultField(departmentInfo)
        } else {
            departmentListToggleButton.removeClass('coperate-check-type-2').addClass('coperate-check-type-1')
            removeFromArray(deptId, 'dept');
            removeElementToResultField(deptId);
        }
        return true;
    }

    function isGroupListChecked($eTarget) {
        const groupListToggleButton = $eTarget.findUp(".js-group-select");
        const isGroupListToggleButtonExist = groupListToggleButton.length !== 0;
        if (!isGroupListToggleButtonExist) return false;

        const groupListElement = $eTarget.findUp(".js-group-item");
        const groupId = groupListElement.attr('data-groupCd');
        if (!isIdExistInArray(groupId, 'group')) {
            const groupInfo = {
                'id': groupId,
                'name': groupListElement.attr('data-name'),
                'type': 'group',
                'gubun': 'GP' // FLOW_GROUP_MEMBER 테이블 조회가능 하게 commColabo에 구분 값 추가
            };

            groupListToggleButton.removeClass('coperate-check-type-1').addClass('coperate-check-type-2')
            addToArray(groupInfo, 'group')
            addElementToResultField(groupInfo)
        } else {
            groupListToggleButton.removeClass('coperate-check-type-2').addClass('coperate-check-type-1')
            removeFromArray(groupId, 'group');
            removeElementToResultField(groupId);
        }
        return true;
    }

    function isGroupListDetail($eTarget) {
        const groupListLi = $eTarget.findUp(".js-group-item");
        const isGroupList = groupListLi.length !== 0;

        if (!isGroupList) return false;
        openDetailLayer(false, groupListLi.attr('data-name'))
        drawGroupMemberList(groupListLi.attr('data-groupCd'))
        return true;
    }

    function isDeleteButtonFromResult($eTarget) {
        const isMemberDeleteButtonExist = $eTarget.findUp(".removeMemberItem").length !== 0;
        if (!isMemberDeleteButtonExist) return false;

        // 오른편 선택된 초대 대상 리스트
        const inviteMemberListElement = $eTarget.findUp(".js-invite-target");
        // 추출한 사용자의 아이디
        const id = inviteMemberListElement.attr('data-id');
        // 사용자 혹은 부서인지 구분
        const type = inviteMemberListElement.attr('data-type');

        switch (type) {
            case 'member':
                const memberListElement = $(".project-invite-choiceList [data-id='" + id + "']");
                memberListElement.removeClass('active')
                break;
            case 'dept' :
                const deptListElement = $("#inviteOrgChart [dvsn-cd='" + id + "']").find('.js-dvsn-select');
                deptListElement.removeClass('coperate-check-type-2').addClass('coperate-check-type-1')
                break;
            case 'group':
                const groupListElement = $("#inviteGroup [data-groupcd='" + id + "']").find('.js-group-select');
                groupListElement.removeClass('coperate-check-type-2').addClass('coperate-check-type-1')
                break;
        }

        removeFromArray(id, type);
        removeElementToResultField(id);
        return true;
    }

    function isSelectAllMembers($eTarget) {
        const isSelectAllButtonExist = $eTarget.findUp('.js-select-all').length !== 0;
        if (!isSelectAllButtonExist) return false;

        const membersLi = $('#existEmplData li');

        membersLi.each(function (idx, li) {
            const memberId = $(li).attr('data-id');
            const memberName = $(li).attr('data-name');
            const memberType = $(li).attr('rcvr_gb')
            const memberProfileImage = $(li).attr('profile-image')
            const isMemberExistInArray = isIdExistInArray(memberId, 'member');
            $(li).addClass('active')

            if (!isMemberExistInArray) {
                var memberInfo = {
                    'id': memberId,
                    'name': memberName,
                    'gubun': memberType,
                    'type': 'member',
                    'profileImagePath': memberProfileImage,
                }
                addToArray(memberInfo, 'member')
                addElementToResultField(memberInfo)
            }
        })
        return true;
    }

    function isEmployeeTab($eTarget) {
        const isEmployeeTabExist = $eTarget.findUp('.js-employees').length !== 0;
        if (!isEmployeeTabExist) return false;

        controlNavigation('employee');
        organizationExist ? showOrganizationChart() : showEmployeeList();
        return true;
    }

    function isPartnerTab($eTarget) {
        const isPartnerTabExist = $eTarget.findUp('.js-partners').length !== 0;
        if (!isPartnerTabExist) return false;
        ListHelper.initPageData(pageData);
        controlNavigation('partner');
        showPartnerList();
        return true;
    }

    function isGroupTab($eTarget) {
        const isGroupTabExist = $eTarget.findUp('.js-groups').length !== 0;
        if (!isGroupTabExist) return false;
        ListHelper.initPageData(pageData);
        controlNavigation('group');
        showGroupList();
        return true;
    }

    function isRemoveAllMembers($eTarget) {
        const isRemoveAllButton = $eTarget.findUp('#removeAllElements').length !== 0;
        if (!isRemoveAllButton) return false;

        removeAllElements();
        removeAllSelectedButton();
        countElementsInAction(0);
    }

    function isSubmitInvitation($eTarget) {
        const isInvitationButtonExist = $eTarget.findUp('#inviteMembers').length !== 0;
        if (!isInvitationButtonExist) return false;

        // 담당자는  미선택 가능
        if (selectedMembersInArray.concat(selectedDepartmentsInArray, selectedGroupInArray).length === 0 && !(popupType === 'manager' || popupType === 'participant')) {
            Often.toast('error', '참여자를 선택해 주세요')
            return false;
        }

        typeController(
            inviteMembersToProject,
            inviteMembersToChat,
            updateManager,
            updateParticipant
        )

        closePopup(false, true);
        return true;
    }
})();