var MiniState = (function () {

    return {
        updateUserStateData: updateUserStateData,
        getStatusNumber: getStatusNumber,
        getStatusName: getStatusName,
        sendStatusSocket: sendStatusSocket,
        setProfileStatus: setProfileStatus,
    }

    function updateUserStateData(dataCode, callback) {
        Ajax.executeApi(RestApi.PUT.COLABO2_USER_PRFL_U002, {STATUS: getStatusNumber(dataCode)}, callback);
    }

    function getStatusNumber(dataCode) {
        if (dataCode === ProfileState.ONLINE) return '0'
        else if (dataCode === ProfileState.OFFLINE) return '1'
        else if (dataCode === ProfileState.OUT) return '2'
        else if (dataCode === ProfileState.BUSINESS) return '3'
        else return ''
    }

    function getStatusName(code) {
        if (code === '0') return ProfileState.ONLINE
        else if (code === '1') return ProfileState.OFFLINE
        else if (code === '2') return ProfileState.OUT
        else if (code === '3') return ProfileState.BUSINESS
        else return ProfileState.OFFLINE
    }


    function setProfileStatus(STATUS, userId) {
        var $miniFavorite = $('#miniFavorite');
        if (_USER_ID === userId) $("#profileState").removeClass().addClass("mini-mode-" + STATUS);
        if ($miniFavorite.is(':visible')) {
            var $memberChatDiv = $miniFavorite.find('.js-favorite-member-chat .user-id[user-id="' + userId + '"]').closest('.js-favorite-member-chat')
            $memberChatDiv.find('.js-mini-state').removeClass('mini-mode-online mini-mode-offline mini-mode-out mini-mode-business').addClass('mini-mode-' + STATUS);
        }
    }

    function sendStatusSocket(STATUS) {
        SocketControl.sendMessage({
            CHAT_CODE: SocketAPI.MAIN.CHANGE_STATE,
            ROOM_SRNO: _USE_INTT_ID,
            USER_ID: _USER_ID,
            STATUS: String(STATUS),
            WEB_USER_ID: _USER_ID,
        })
    }


}());