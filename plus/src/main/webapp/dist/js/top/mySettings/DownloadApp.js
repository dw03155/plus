var DownloadApp = (function () {
    var $downloadAppLayer = $("#downloadAppLayer");

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
        desktopDownload: desktopDownload,
    }

    function openPopupLayer() {
        $downloadAppLayer.removeClass('d-none').addClass('d-block');
        addEvent();
    }

    function closePopupLayer() {
        $downloadAppLayer.removeClass('d-block').addClass('d-none');
    }

    function addEvent() {
        $("#iosDownloadBtn").off("click").on("click", iosDownload);
        $("#androidDownloadBtn").off("click").on("click", androidDownload);
        $("#windowDownloadBtn").off("click").on("click", function () {
            desktopDownload('WINDOWS');
        });
        $("#macDownloadBtn").off("click").on("click", function () {
            desktopDownload('OS_X')
        });
        $("#smsSendBtn").off("click").on("click", mobileAppSend);
    }

    function iosDownload() {
        window.open("https://itunes.apple.com/us/app/id939143477?mt=8", "_blank");
    }

    function androidDownload() {
        window.open("https://play.google.com/store/apps/details?id=com.webcash.bizplay.collabo", "_blank");
    }

    function userOsCheck() {
        var os = "";
        var ua = navigator.userAgent;

        if (ua.indexOf("Macintosh") > -1) {
            os = "OS_X";
        } else if (ua.indexOf("Linux") > -1) {
            os = "LINUX";
        } else {
            os = "WINDOWS";
        }
        return os;
    }

    function desktopDownload(userOs, isDirect) {
        var os = (userOs === 'WINDOWS' || userOs === 'OS_X') ? userOs : userOsCheck();
        var pckNm = "team.flow.flowMiniRenewal";

        if(Often.isFunc("MINI_SECURE_DOWNLOAD"/*Func.CLOUD.MINI_SECURE_DOWNLOAD*/)) pckNm = "secure.team.flow.flowMiniRenewal";
        var downloadData = {PCK_NM: pckNm, GB: os}
        isDirect && (downloadData.RGSN_DTTM = "NO-SESSION");
        Ajax.executeApi(RestApi.GET.FLOW_UPDATE_R001, downloadData, updateSuccessCallback);
    }

    function updateSuccessCallback(dat) {
        if (Often.null2Void(dat.flow_rec[0], "") === "") return;
        if(Electron.isElectronApp()) {
            Electron.downloadFile(dat.flow_rec[0].LINK_URL, '_blank');
        } else {
            window.open(dat.flow_rec[0].LINK_URL, '_blank');
        }
    }

    function mobileAppSend() {
        var $phoneNum = $downloadAppLayer.find("#phoneNumber");
        var $countryCode = $downloadAppLayer.find("#countryCode");

        if ($.trim($phoneNum.val()) === "") {
            alert(i18next.t('front.alert.enterWord'));
            $phoneNum.focus();
            return;
        }

        if ($.trim($phoneNum.val()).length < 10) {
            alert(i18next.t('front.alert.enterWord', {val: '$t(dictionary.phoneNumber)'}));
            $phoneNum.focus();
            return;
        }

        var appSendData = {
            CLPH_NO: Often.null2Void($.trim($phoneNum.val()), ""),
            CLPH_NTNL_CD: Often.null2Void($.trim($countryCode.val()), ""),
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }

        Ajax.executeApi(RestApi.POST.COLABO2_SMS_C001, appSendData, function () {
            alert(i18next.t('front.alert.downloadURLSent', {val: $.trim($phoneNum.val())}));
        });
    }
})()