var Authority = (function () {

    //프로젝트 내 글/댓글 작성 권한
    return {
        isAuthorityCheck: isAuthorityCheck,
        isAdminAuthorityCheckAndAction: isAdminAuthorityCheckAndAction,
        changeCreatePostAreaByAuthority: changeCreatePostAreaByAuthority,
    }

    /**
     * 글/댓글 작성권한 체크
     * @param {string} checkMode - ADMIN, WRITE, REMARK
     * @param {string} [projectSrno] - 존재하지 않으면 postPopup의 projectSrno로 처리
     * @returns {boolean}
     */
    function isAuthorityCheck(checkMode, projectSrno) {
        projectSrno = projectSrno || getCurrentProjectSrno();
        var popProjectSettingJson = Often.null2Void(LocalUtil.getLocalValue("POP_PROJECT_SETTING"));
        var curProjectSettingJson = Often.null2Void(LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING"));
        var targetProjectSettingJson;
        if (popProjectSettingJson.COLABO_SRNO === projectSrno) {
            targetProjectSettingJson = popProjectSettingJson;
        } else if (curProjectSettingJson.COLABO_SRNO === projectSrno) {
            targetProjectSettingJson = curProjectSettingJson;
        } else {
            SentryMonitor.captureException("isAuthorityCheck ERROR");
            return true;
        }
        var isWriteAuthority = Often.isFunc(Func.CLOUD.WRITE_AUTHORITY_SEPARATE);
        var isLimitWriteRemark = targetProjectSettingJson[isWriteAuthority ? "MNGR_WR_CM_YN" : "MNGR_WR_YN"] === "Y";
        if (checkMode === "ADMIN") return targetProjectSettingJson.MNGR_DSNC === "Y";
        if (checkMode === "WRITE") return !(targetProjectSettingJson.MNGR_DSNC === "N" && targetProjectSettingJson.MNGR_WR_YN === "Y");
        if (checkMode === "REMARK") return !(targetProjectSettingJson.MNGR_DSNC === "N" && isLimitWriteRemark);

        function getCurrentProjectSrno() {
            var $postPopup = $("#postPopup");
            var isVisible$PostPopup = $postPopup.is(":visible");
            if (!isVisible$PostPopup) return Detail.getProjectSrno();
            return Often.null2Void($postPopup.find(".detail-item").attr("data-project-srno"));
        }
    }

    function isAdminAuthorityCheckAndAction(isAdminAuthority, event) {
        if (isAdminAuthority && !isAuthorityCheck("ADMIN")) {
            event && event.preventDefault();
            Often.toast("error", i18next.t('front.alert.adminRestriction'));
            return true;
        }
        return false;
    }

    function changeCreatePostAreaByAuthority($createPostArea) {
        var $createText = $createPostArea.find(".work-desing-text");
        if (isAuthorityCheck("WRITE")) {
            $createPostArea.removeClass("admin");
            $createText.text(i18next.t('front.detail.placeholderWritePost'));
        } else {
            $createPostArea.addClass("admin");
            $createText.text(i18next.t('front.common.adminWriteOnly', {type: '$t(dictionary.article)'}));
        }
    }


})();