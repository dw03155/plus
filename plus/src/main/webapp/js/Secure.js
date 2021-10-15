var Secure = (function () {

    return {
        preventOverlapLogin: preventOverlapLogin,
    }

    //이중방지 로그인
    function preventOverlapLogin() {
        var deviceJson = Often.getDeviceJson(_CLIENT_IP);
        var deviceId = deviceJson.DUID;
        var deviceName = deviceJson.DUID_NM;
        Ajax.executeApi(RestApi.GET.FLOW_USE_INTT_INFM_R001, {}, function (dat) {
            var overLapYn = Often.null2Void(dat.MULTIPLE_LOGIN_YN, "N");
            if (overLapYn === "N") return;
            Ajax.executeApi(RestApi.GET.FLOW_DEVICE_ACCESS_R001, {
                SRCH_USER_ID: _USER_ID,
                DUID: deviceId,
            }, function (dat) {
                $.each(dat.DUID_REC, function (i, v) {
                    var duidnm1 = deviceName.split("_")[0] + ""
                    var duidnm2 = v.DUID_NM.split("_")[0] + ""
                    if (deviceId === v.DUID || duidnm1.indexOf(duidnm2) < 0) return;
                    SocketControl.sendMessage({
                        CHAT_CODE: "OVERLAPLOGOUT0001",
                        ROOM_SRNO: _USER_ID,
                        DUID: v.DUID
                    })
                });
            });
        })
    }

})()