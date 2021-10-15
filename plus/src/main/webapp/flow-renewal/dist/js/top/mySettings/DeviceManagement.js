var DeviceManagement = (function () {

    var $deviceManagementLayer, deviceInfoHtml;
    var isInit;

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
    }

    function init() {
        $deviceManagementLayer = $("#deviceManagementLayer");
        deviceInfoHtml = $("#deviceList").html();
        isInit = true;
        showOrHideLockMenu()
    }

    function showOrHideLockMenu() {
        Electron.isElectronApp() && $deviceManagementLayer.find('ul.lock-list').css('display', 'none');
    }

    function openPopupLayer() {
        getAccessDeviceList();
        Preferences.getPreferences();
        $deviceManagementLayer.removeClass('d-none').addClass('d-block');
        addEvent();
    }

    function addEvent() {
        $("#lockModeSetting").off("click").on("click", Preferences.changeSetting);
        $("#lockTime").off("change").on("change", Preferences.savePreferences);
    }

    function closePopupLayer() {
        if (!isInit) {
            init();
        }

        $deviceManagementLayer.removeClass('d-block').addClass('d-none');
    }

    function clickRemoveBtn(e) {
        var $eTarget = $(e.target);

        if ($eTarget.hasClass("remove-btn") || $eTarget.parents(".remove-btn").length > 0) {
            var removeBtn = $eTarget.hasClass("remove-btn") ? $eTarget : $eTarget.parents(".remove-btn");
            removeDevice(removeBtn.attr("duid"), removeBtn);
        }
    }

    function getAccessDeviceList() {
        var deviceData = {
            SRCH_USER_ID: _USER_ID,
            DUID: LocalUtil.getDeviceId(),
        }

        Ajax.executeApi(RestApi.GET.FLOW_DEVICE_ACCESS_R001, deviceData, function (dat) {
            var $deviceList = $("#deviceList");
            $deviceList.empty();
            $.each(dat.DUID_REC, function (i, v) {
                makeAccessDevice($deviceList, v);
            });
            $deviceList.removeClass("d-none").addClass("d-block");
            $(".remove-btn").off("click").on("click", clickRemoveBtn);
        })
    }

    function makeAccessDevice(deviceList, data) {
        if ("" === Often.null2Void(data.DUID, "")) return;

        var $tempDeviceInfo = deviceInfoHtml;
        var isCurrentDevice = (Often.null2Void(data.CONN_YN, "N") === "Y") || (Often.null2Void(data.DUID_NM, "0000") === LocalUtil.getLocal("N_ONLY_DEVICE_NM"));
        var accessDeviceData = {
            DUID: data.DUID,
            DUID_NM: data.DUID_NM,
            LAST_DATE: Tz.momentTimeZone(Often.null2Void(data.ACCESS_DTTM, data.RGSN_DTTM), "type1"),
            FIRST_DATE: Tz.momentTimeZone(data.RGSN_DTTM, "type1"),
            DISPLAY_REMOVE: isCurrentDevice ? "d-none" : "d-block",
            DISPLAY_CURRENT: isCurrentDevice ? "d-block" : "d-none",
        }

        $tempDeviceInfo = ListHelper.replaceJson($tempDeviceInfo, accessDeviceData);

        deviceList.append($tempDeviceInfo);
    }

    /**
     * DUID에 따른 Device 삭제
     * @param duid Device 고유 ID
     * @param removeBtn {Object} 삭제 버튼 객체
     */
    function removeDevice(duid, removeBtn) {
        var removeData = {
            SRCH_USER_ID: _USER_ID,
            DUID: duid,
        }

        Ajax.executeApi(RestApi.DELETE.FLOW_DEVICE_ACCESS_D001, removeData, function () {
            removeBtn.parents('li').remove();
            SocketControl.sendMessage({
                CHAT_CODE: 'OVERLAPLOGOUT0001',
                ROOM_SRNO: _USER_ID,
                DUID: duid,
            });
        });
    }
})()