var LimitGuest = (function () {

    var isChat;

    return {
        isLimitGuest: isLimitGuest,
        isStorageFullGuest: isStorageFullGuest,
        isSearchLimitGuest: isSearchLimitGuest,
    }

    function getPostLinkUrl(limitType) {
        //게시물 링크번호
        var linkJson = {
            collect: isChat ? "4403656215565" : "4406865263885", // 모아보기
            search: "4403668441997", // 채팅 메세지 검색
            secret: "4403686296205", // 시크릿 메세지
            flowdrive: "4406865269901", //파일함
            video: "4404603293197", //화상회의
            timeline: "4403927194637", // 간트 차트
            subtask: "4403997608845", // 하위 업무
        }
        return "https://support.flow.team/hc/ko/articles/" + (linkJson[limitType] ? linkJson[limitType] : "234707747");
    }

    function isLimitGuest(limitType, isMini) {
        isChat = isMini;
        var isGuest = StatusCode.UN_BFLOW.GUEST === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");
        if (isGuest && Often.isFunc(Func.CLOUD.GUEST_LIMIT)) {
            drawLimitGuestPopup(limitType, isMini);
            return true;
        }
        return false;
    }

    function isStorageFullGuest(limitType, isMini) {
        if (Often.isFunc(Func.CLOUD.GUEST_LIMIT) && Often.isFunc(Func.CLOUD.GUEST_STORAGE_LIMIT)) {
            var storageFullYn = LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STORAGE_FULL_YN");
            if (storageFullYn === "Y") {
                drawLimitGuestPopup(limitType, isMini);
                return true;
            }
        }
        return false;
    }

    function isSearchLimitGuest(limitType, writeDate) {
        var isGuest = StatusCode.UN_BFLOW.GUEST === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");
        var now = new Date();
        now.setMonth(now.getMonth() - 1)
        var dataAMonthAgo = Often.getDateFormat(now);
        if (isGuest && Often.isFunc(Func.CLOUD.GUEST_LIMIT)) {
            if (dataAMonthAgo > writeDate) {
                drawLimitGuestPopup(limitType);
                return true;
            }
        }
        return false;
    }

    function drawLimitGuestPopup(limitType, isMini) {
        PopupDraw.closePopup();
        PopupDraw.drawBlock({
            await: (isMini && limitType === "data500"),
            mini: isMini,
            class: limitType,
            contents: BLOCK_TYPE[limitType.toUpperCase()],
            linkUrl: getPostLinkUrl(limitType),
            callback: {
                submit: function () {

                    var isIamAdminUser = (LocalUtil.getBuyManger() === "Y");
                    var isSerp = (LocalUtil.getSerpYn() === "Y");

                    //todo - serp 일 경우에는 제한팝업이 뜨고, 회사관리자문의하기가 존재해야하기에 아래 부분추가
                    if( isSerp ) {
                        if(isIamAdminUser) {
                            Payment.openPaymentLayer("business");
                        }else{
                            Often.toast("info", i18next.t('front.alert.askAdmin'));
                        }
                    }else if (isMini) {
                        window.open(Often.getLocOrigin() + '/main.act?upgrade', "_blank");
                    } else {
                        Upgrade.showUpgradeLayer();
                    }
                }
            }
        })
    }
})();