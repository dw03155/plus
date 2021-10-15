var UrlCatcher = (function () {

    return {
        isPostUrlAncAction: isPostUrlAncAction,
        isProjectInviteUrlAndAction: isProjectInviteUrlAndAction,
    }

    function isPostUrlAncAction(url) {
        var PREFIX = "/l/";
        var idx = url.indexOf(PREFIX)
        if (idx === -1) return false;
        Ajax.executeApi("ACT_POST_BY_TINY_URL", {
            LINK_URL: url.substring(idx + PREFIX.length)
        }, function (dat) {
            if (dat.RETURN_MSG !== '') return Often.toast("error", dat.RETURN_MSG);
            if (Often.isAct("messenger")) {
                OpenUtil.openSubScreen($.extend({GB: "POST_LINK"}, dat));
            } else {
                PostPopup.togglePostView(dat.COLABO_SRNO, dat.COLABO_COMMT_SRNO, '', '', true);
            }
        });
        return true;
    }

    function isProjectInviteUrlAndAction(url) {
        var myOrigin = '(' + Often.getLocOrigin() + ')';
        var flowCloudServiceOrigin = '((https:\/\/)([a-zA-Z0-9_-].)*(flow.team))';
        var isInvite = url.indexOf("Invite") > -1;
        var inviteRegexp = isInvite ? '(\/Invite\/([a-zA-Z0-9])+)' : '(\/Invitation\/([a-zA-Z0-9])+)';
        var flowProjectInviteUrlRegexp;
        var cloudServiceOriginRegexp = /((https:\/\/)([a-zA-Z0-9_-].)*(flow.team))/;
        if (cloudServiceOriginRegexp.test(Often.getLocOrigin())) {
            flowProjectInviteUrlRegexp = "((" + flowCloudServiceOrigin + "|" + myOrigin + ")" + inviteRegexp + ")";
        } else {
            flowProjectInviteUrlRegexp = "(" + myOrigin + inviteRegexp + ")";
        }
        var flowInviteUrlRegexp = new RegExp(flowProjectInviteUrlRegexp, 'gi');
        if (!flowInviteUrlRegexp.test(url)) return false;
        CONNECT_INVITE_KEY = (url.split("Invitation/")[1] || url.split("Invite/")[1]);
        InvitePopup.openInvitePopup();
        return true;
    }

})()