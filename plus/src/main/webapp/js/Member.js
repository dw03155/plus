var Member = (function () {

    var pageData = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y",
    }

    return {
        initPage: initPage,
        makeMemberList: makeMemberList,
        getIdentifier: getIdentifier,
    }

    function initPage() {
        ListHelper.initPageData(pageData);
    }

    function makeMemberList($targetUl, $searchInput, clickEvent, gubun, finalCallback) {

        if (pageData.NEXT_YN === "N") return;

        var memberJson = getMemberJson(gubun);
        var apiKey = memberJson.API_KEY;
        var memberSearchValue = $searchInput ? Often.null2Void($.trim($searchInput.val()), "") : "";
        var targetObjJson = {};
        var isScrollTarget = gubun === InviteType.ALLSENDIENCE || $('#chattingLayer').is(":visible")
        if (!isScrollTarget) targetObjJson["scroll"] = $targetUl.closest('div'); //Note. closest('div') 안 쓰는게 좋음
        if ($targetUl.is("#allSendienceUl")) targetObjJson["scroll"] = $targetUl.findUp('.scroll-mask');
        var apiInputJson = $.extend({}, pageData, {
            SRCH_WD: memberSearchValue,
            SRCH_WORD: memberSearchValue,
            COLABO_SRNO: gubun === InviteType.ALLSENDIENCE ? Detail.getProjectSrno() : "",
        })

        if (gubun === InviteType.INVITECHAT) {
            apiInputJson.FLOW_USER_YN = "Y";
            apiInputJson.ROOM_SRNO = ROOM_SRNO; //해당 채팅방 참여자는 제외함
        }

        Ajax.executeApi(apiKey, apiInputJson, function (data) {
            $targetUl.drawListHelper({
                pageData: pageData,
                nextYn: data["NEXT_YN"],
                noDataHtml: ListHelper.getNoDataHtml(memberSearchValue ? "SEARCH" : ""),
                records: data[memberJson.RECORD_NAME],
                targetObj: targetObjJson,
                callback: {
                    item: function (record) {
                        return getMemberListHtml(gubun, record);
                    },
                    scroll: function () {
                        return makeMemberList($targetUl, $searchInput, clickEvent, gubun, finalCallback);
                    },
                    click: clickEvent,
                    final: finalCallback,
                },
            })
        })

        function getMemberListHtml(gubun, record) {
            var returnHtml = "";
            var baseHtml = $("#memberItem").html();
            $.each(record, function (i, recordItem) {
                var profileImage = ImageUtil.removeDomain("PROFILE", recordItem.PRFL_PHTG);
                var userJson = getUserJson(gubun, recordItem);
                returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, userJson, {
                    "rcvr-gb": "U",
                    "id": getIdentifier(userJson["rcvr-cd"]),
                    "profile-image": profileImage,
                    "sendience-gb": Often.null2Void(recordItem.SENDIENCE_GB, ""),
                    "profile": ListHelper.setProfile(profileImage),
                }))
            })
            return returnHtml;
        }
    }

    //프로젝트 초대가 아닌 다른곳에서 호출 시 예외처리 필요
    function getIdentifier(rcvr_cd) {
        if (!rcvr_cd) return "";
        var inviteSelectorIdRegExp = /[\@\.\^]/g;
        return "person_" + rcvr_cd.replace(inviteSelectorIdRegExp, "");
    }

    function getMemberJson(gubun) {
        if (gubun === InviteType.TEAM || gubun === InviteType.FAVORITE) {
            return {
                API_KEY: RestApi.GET.FLOW_EMPL_R001,
                RECORD_NAME: "EMPL_REC",
            }
        } else if (gubun === InviteType.SENDIENCE) {
            return {
                API_KEY: RestApi.GET.FLOW_SENDIENCE_R001,
                RECORD_NAME: "SENDIENCE_REC",
            }
        } else if (gubun === InviteType.ALLSENDIENCE) {
            return {
                API_KEY: RestApi.GET.COLABO2_SENDIENCE_R101,
                RECORD_NAME: "SENDIENCE_REC",
            }
        } else if (gubun === InviteType.NEWCHAT || gubun === InviteType.INVITECHAT || gubun === InviteType.CONTACT) {
            return {
                API_KEY: "COLABO2_CHAT_CNPL_R001",
                RECORD_NAME: "CNPL_LIST",
            }
        } else {
            return {}
        }
    }

    function getUserJson(gubun, data) {
        if (gubun === InviteType.TEAM || gubun === InviteType.NEWCHAT || gubun === InviteType.FAVORITE) {
            return {
                "rcvr-cd": data.USER_ID,
                "name": data.FLNM,
                "position": data.JBCL_NM,
                "team": data.DVSN_NM,
                "company": data.CMNM,
            }
        } else if (gubun === InviteType.SENDIENCE) {
            return {
                "rcvr-cd": data.IN_RCVR_USER_ID,
                "name": data.FLNM,
                "position": data.JBCL_NM,
                "team": data.DVSN_NM,
                "company": data.CMNM,
            }
        } else if (gubun === InviteType.ALLSENDIENCE) {
            var isExistTeamOrCompany = (data.RCVR_DVSN_NM !== "" || data.RCVR_CORP_NM !== "");
            return {
                "rcvr-cd": data.RCVR_USER_ID,
                "name": data.RCVR_USER_NM,
                "position": data.JBCL_NM,
                "team": data.RCVR_DVSN_NM,
                "company": data.RCVR_CORP_NM,
                "personal-yn": ListHelper.setDisplay(isExistTeamOrCompany, "flex"),
            }
        } else if (gubun === InviteType.NEWCHAT || gubun === InviteType.INVITECHAT || gubun === InviteType.CONTACT) {
            return {
                "rcvr-cd": data.USER_ID,
                "name": data.FLNM,
                "position": data.JBCL_NM,
                "team": data.DVSN_NM,
                "company": data.CMNM,
            }
        } else {
            return {}
        }
    }

})();