var TeamInvite = (function () {

    var searchTimer;
    var selectedDataArray;
    var $teamInviteSearch;

    return {
        openTeamInviteLayer: openTeamInviteLayer,
        isTeamInviteMenuAndAction: isTeamInviteMenuAndAction,
        isSubmitInviteAndAction: isSubmitInviteAndAction,
        isTeamInviteSearchAndAction: isTeamInviteSearchAndAction,
        clickMemberListUl: clickMemberListUl,
        clickDvsnSelect: clickDvsnSelect,
        getSelectedDataArray: getSelectedDataArray,
    }


    function openTeamInviteLayer(gubun, isSingle) {

        $teamInviteSearch = $("#teamInviteSearch");

        InviteProject.closeAllInviteLayer();
        selectedDataArray = [];

        var isInnerInvite = (gubun === InviteType.SENDIENCE);
        var isExistOrgChart = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "DVSN_TREE_YN") === "Y";
        var $inviteMemberList = $("#inviteMemberList");
        var $inviteOrgChart = $("#inviteOrgChart");
        var $teamInviteMenu = $("#teamInviteMenu");

        if (isInnerInvite || !isExistOrgChart) {
            $teamInviteMenu.css("display", "none");
        } else {
            $teamInviteMenu.css("display", "block");
        }
        setTextByGubun(gubun);

        $teamInviteSearch.val("");

        Member.initPage();
        Member.makeMemberList($inviteMemberList, $teamInviteSearch, clickMemberListUl, gubun, function () {
            $("#teamInviteLayer").css({
                display: "flex",
            });
        });

        $("#memberMenu").find("div").attr("class", "team-job-invite-type-2");
        $("#orgChartMenu").find("div").attr("class", "team-job-invite-type-1");

        if (isSingle) {
            var $inviteLayer = $("#inviteLayer");
            $inviteLayer.css('display', 'block');
            $inviteLayer.find(".returnMainBtn").css('display', 'none');
        }

        Often.isFunc("INVITATION_POPUP") && gubun !== 'favorite' ? InvitationPopup.openInvitationPopup(true) : $("#teamInviteArea").css("display", "block");
        if ($inviteOrgChart.hasClass("d-none")) return;
        $inviteOrgChart.addClass("d-none");
        $inviteMemberList.removeClass("d-none");
    }

    function setTextByGubun(gubun) {

        $("#teamInviteHeader").text(getInviteHeaderText(gubun)).attr('invite-type', gubun);
        $("#memberMenu").find("div").text(getInviteTabText(gubun));

        function getInviteHeaderText(gubun) {
            if (gubun === InviteType.SENDIENCE) return i18next.t('front.common.projectParticipant');
            else if (gubun === InviteType.TEAM) return i18next.t('front.InviteProject.inviteCompanyMember');
            else if (gubun === InviteType.NEWCHAT) return i18next.t('front.common.newChat');
            else if (gubun === InviteType.INVITECHAT) return "대화상대 초대";
            else if (gubun === InviteType.FAVORITE) return "즐겨찾기 구성원 추가";
            else return "";
        }

        function getInviteTabText(gubun) {
            if (gubun === InviteType.NEWCHAT || gubun === InviteType.INVITECHAT) return i18next.t('dictionary.contact');
            else return i18next.t('dictionary.member');
        }
    }

    function clickMemberListUl(e) {
        var $eTarget = $(e.target);
        var $participantItem = $eTarget.findUp(".js-participant-item");
        if ($participantItem.length === 0) return;

        var $profile = $eTarget.findUp(".js-profile");
        if ($profile.length !== 0) {
            var userId = $profile.parents(".js-participant-item").attr("data-id");
            Profile.drawProfilePopup(userId);
            return;
        }

        var isChecked = $participantItem.find("#selectMemberBtn").hasClass("my-check-2-1");
        $participantItem.find("#selectMemberBtn").attr("class", "my-check-2" + (isChecked ? "" : "-1"));
        $('.js-participant-item').removeClass('active');
        $participantItem.addClass('active');

        if (!isChecked) {
            var baseHtml = $("#selectMemberItem").html();
            var returnHtml;
            returnHtml = ListHelper.replaceJson(baseHtml, {
                "name": $participantItem.find("#name").text(),
                "rcvr-cd": $participantItem.attr("rcvr_cd"),
                "rcvr-gb": $participantItem.attr("rcvr_gb"),
                "id": $participantItem.attr("id"),
                "profile": ListHelper.setProfile($participantItem.attr("profile-image")),
            })
            $("#selectMemberList").append(returnHtml);
            selectedDataArray.push($participantItem.attr("id"));
            $(".deleteMemberItem").off("click").on("click", clickDeleteMemberItem);
        } else {
            selectedDataArray.splice(selectedDataArray.indexOf($participantItem.attr("id")));
            $("#selectMemberList").find("li[id=" + $participantItem.attr("id") + "]").remove();
        }
    }

    function clickDeleteMemberItem(e) {
        e.stopPropagation();
        var $eTarget = $(e.target);
        var isSelectDvsn = $eTarget.parents("li").attr("rcvr_gb") === "ED";
        $eTarget.parents("li").remove();
        if (!isSelectDvsn) {
            var id = Often.null2Void($eTarget.parents("li").attr("id"));
            $("#inviteMemberList").find("li[id=" + id + "]").find("#selectMemberBtn").attr("class", "my-check-2");
            $("#inviteEmplArea").find("li[id=" + id + "]").find("#selectMemberBtn").attr("class", "my-check-2");
            selectedDataArray.splice(selectedDataArray.indexOf(id));
        } else {
            var rcvrCd = $eTarget.parents("li").attr("rcvr_cd");
            $("#inviteOrgChart").find("li[dvsn-cd=" + rcvrCd + "]").find(".js-dvsn-select").attr("class", "js-dvsn-select coperate-check-type-1");
            selectedDataArray.splice(selectedDataArray.indexOf(rcvrCd));
        }
    }

    function inviteProject(memberArray) {
        var submitData = {
            COLABO_SRNO: Detail.getProjectSrno(),
            SENDIENCE_REC: memberArray,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }
        Ajax.executeApi(RestApi.POST.COLABO2_SENDIENCE_C001, submitData, function () {
            Participant.drawProjectParticipantItems(Detail.getProjectSrno(), true, function () {
                UpdateElements.autoUpdateElem({ONLY_POST: true});
                Often.toast("success", i18next.t('front.alert.invitedToProject'));
                InviteProject.closeInvite();
            });
        })
    }

    function clickTeamInviteMenu($eTarget) {

        var isMemberMenuClick = $eTarget.findUp("#memberMenu").length > 0;
        var $inviteMemberList = $("#inviteMemberList");
        var $inviteOrgChart = $("#inviteOrgChart");

        $("#teamInviteSearch").val("");
        Organization.closeEmplArea();
        $("#memberMenu").find("div").attr("class", "").attr("class", "team-job-invite-type-" + (isMemberMenuClick ? "2" : "1"));
        $("#orgChartMenu").find("div").attr("class", "").attr("class", "team-job-invite-type-" + (isMemberMenuClick ? "1" : "2"));
        $inviteMemberList.attr("class", "participants-list invite-member-list " + (isMemberMenuClick ? "" : "d-none"));
        $inviteOrgChart.attr("class", "").attr("class", isMemberMenuClick ? "d-none" : "");
        var currentGb = Often.null2Void($('#teamInviteHeader').attr('invite-type'), "team");

        if (isMemberMenuClick) {
            Member.initPage();
            Member.makeMemberList($inviteMemberList, $("#teamInviteSearch"), clickMemberListUl, currentGb, function () {
                selectedDataArray.forEach(function (element) {
                    $inviteMemberList.find('li[id="' + element + '"] #selectMemberBtn').toggleClass("my-check-2-1");
                });
            });
        } else {
            Organization.initPage($inviteOrgChart, $("#inviteEmplArea"), true);
        }
        $("#teamInviteArea").css("display", "block");
    }

    function isTeamInviteMenuAndAction($eTarget) {
        var $teamInviteMenu = $eTarget.findUp("#teamInviteMenu");
        if ($teamInviteMenu.length === 0) return false;
        clickTeamInviteMenu($eTarget)
        return true;
    }

    function isSubmitInviteAndAction($eTarget) {
        var $submitInvite = $eTarget.findUp("#submitInvite");
        if ($submitInvite.length === 0) return false;

        var inviteType = $('#teamInviteHeader').attr('invite-type');
        if (inviteType === InviteType.NEWCHAT || inviteType === InviteType.INVITECHAT) return submitInvite('CHAT');
        else if (inviteType === InviteType.FAVORITE) return submitInvite('FAV');
        else return submitInviteTeam();
    }

    /**
     * @param gubun 'CHAT', 'FAV'
     */
    function submitInvite(gubun) {
        var sendienceArray = [];
        var dvsnArray = [];
        var groupArray = [];    //@TODO 즐겨찾기 초대 기획/디자인 진행중
        $("#selectMemberList").find("li").each(function (i, sendienceData) {
            var rcvrGb = $(sendienceData).attr('rcvr_gb');
            if (rcvrGb === INVITEGB.PERSON) sendienceArray.push({IN_RCVR_USER_ID: $(sendienceData).attr("rcvr_cd")});
            else if (rcvrGb === INVITEGB.DVSN) dvsnArray.push({DVSN_CD: $(sendienceData).attr("rcvr_cd")});
            // else if(rcvrGb === INVITEGB.GROUP) dvsnArray.push({ GROUP_CD: $(sendienceData).attr("rcvr_cd")});
        });
        if (sendienceArray.length === 0 && dvsnArray.length === 0) {
            Often.toast("error", "초대대상을 선택해주세요!")
            return;
        }
        if (gubun === 'CHAT') OpenUtil.openMessengerByInvite(Often.null2Void(ROOM_SRNO), sendienceArray, dvsnArray, groupArray);
        else if (gubun === 'FAV') MiniFavorite.insertFavoriteMember(GROUP_ID, sendienceArray, dvsnArray, groupArray);
    }

    function submitInviteTeam() {
        var memberArray = [];
        memberArray.push({
            "RCVR_ID": _USER_ID,
            "RCVR_GB": "U"
        });
        $("#selectMemberList").find("li").each(function (i, sendienceData) {
            memberArray.push({
                "RCVR_ID": $(sendienceData).attr("rcvr_cd"),
                "RCVR_GB": $(sendienceData).attr("rcvr_gb"),
                "RCVR_NM": $(sendienceData).find("span").text(),
            });
        });
        inviteProject(memberArray)
    }

    function isTeamInviteSearchAndAction(e) {
        var $eTarget = $(e.target);
        var $teamInviteSearch = $eTarget.findUp("#teamInviteSearch");
        var gubun = $("#teamInviteHeader").attr('invite-type');
        if ($teamInviteSearch.length === 0) return false;
        if ($("#inviteMemberList").is(":visible")) {
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                Member.initPage();
                Member.makeMemberList($("#inviteMemberList"), $("#teamInviteSearch"), clickMemberListUl, gubun, function () {
                    selectedDataArray.forEach(function (element) {
                        $("#inviteMemberList").find('li[id="' + element + '"] #selectMemberBtn').toggleClass("my-check-2-1");
                    });
                });
            }, 200);
        } else {
            Organization.searchEmpl(e);
        }
        return true;
    }

    function clickDvsnSelect($eTarget, isInvitationPopup) {
        var isTopDepartmentElement = $eTarget.findUp(".department-item").attr('depth') === '0';
        if (isInvitationPopup && isTopDepartmentElement) return false;
        var $departmentItem = $eTarget.findUp(".department-item");
        var isChecked = $eTarget.hasClass("coperate-check-type-2");

        var id = "dvsn_ED" + $departmentItem.attr("dvsn-cd");
        if (!isChecked) {
            $eTarget.removeClass("coperate-check-type-1").addClass("coperate-check-type-2");
            var baseHtml = $("#selectDvsnItem").html();
            var returnHtml;
            returnHtml = ListHelper.replaceJson(baseHtml, {
                "dvsn_name": $departmentItem.find(".department-name").text(),
                "rcvr-cd": $departmentItem.attr("dvsn-cd"),
                "rcvr-gb": "ED",
                "id": id,
            })
            $("#selectMemberList").append(returnHtml);
            if (!isInvitationPopup) selectedDataArray.push(id);
            $(".deleteMemberItem").off("click").on("click", clickDeleteMemberItem);
        } else {
            $eTarget.removeClass("coperate-check-type-2").addClass("coperate-check-type-1");
            if (!isInvitationPopup) selectedDataArray.splice(selectedDataArray.indexOf(id));
            $("#selectMemberList").find("li[id=" + id + "]").remove();
        }
    }

    function getSelectedDataArray() {
        return selectedDataArray
    }
})();