var MessengerJsonMaker = (function () {

    return {
        getAtchRecData: getAtchRecData,
        getUserJson: getUserJson,
        makeMsgRecJson: makeMsgRecJson,
        makeSpecialMsgRecJson: makeSpecialMsgRecJson,
    }

    function makeSpecialMsgRecJson(msgGb, roomChatSrno, dataJson) {

        var notReadCount = dataJson ? Often.null2Void(dataJson.NOT_READ_CNT) : "";
        var receiveNameRecord = dataJson ? Often.null2Void(dataJson.RECEIVE_NAME_RECORD) : "";
        var sendName = dataJson ? Often.null2Void(dataJson.SEND_NAME) : "";
        var rgsrId = dataJson ? Often.null2Void(dataJson.RGSR_ID) : "";

        var messageSetJson = {
            A: "back.langConvert.leftProject", // {USER_NM}님이 나갔습니다,
            A_INVITE: "back.langConvert.inviteProject", // {SEND_NAME}님이 {RECEIVE_NAME}을 초대하였습니다.
            C: "back.roomConvert.changeChatRoomName", // {USER_NM}님이 채팅방명을 변경하였습니다
            U: "front.common.setAnnouncement", // {USER_NM}님이 공지사항을 등록하였습니다
            X: "front.alert.deletedMessage", // 삭제된 메시지입니다
        }

        var cntn;
        if (Often.null2Void(receiveNameRecord) !== "" && receiveNameRecord.length > 0) {
            cntn = i18next.t(messageSetJson[msgGb + "_INVITE"], {
                inviteUser: sendName,
                invitedUser: makeReceiveNamesText(receiveNameRecord)
            })
        } else {
            cntn = i18next.t(messageSetJson[msgGb], {userName: Often.null2Void(sendName, _USER_NM)})
        }

        return makeMsgRecJson($.extend({}, getUserJson(), {
            ROOM_CHAT_SRNO: roomChatSrno,
            ROOM_SRNO: dataJson.ROOM_SRNO,
            MSG_GB: msgGb,
            CNTN: cntn,
            NOT_READ_CNT: notReadCount,
            RGSR_ID: rgsrId,
        }))
    }

    function makeReceiveNamesText(receiveNameRecord) {
        var returnStr = "";
        receiveNameRecord.forEach(function (v, idx) {
            var isLast = receiveNameRecord.length - 1 === idx
            returnStr += (isLast ? v.RCVR_USER_NM : i18next.t('front.common.sir', {userName: v.RCVR_USER_NM}) + ",");
        })
        return returnStr;
    }

    function getAtchRecData(fileData) {
        var returnJson = $.extend({}, fileData, {
            ORCP_FILE_NM: fileData.FILE_NM,
            FILE_NAME: fileData.FILE_NM,
            ATCH_URL: Often.null2Void(fileData.IMG_PATH, fileData.FILE_DOWN_URL),
            DOWNLOAD_URL: fileData.FILE_DOWN_URL,
            FILE_IDNT_ID: fileData.RAND_KEY,
        })
        return ImageUtil.isImageType(fileData) ? makeImgRecObj(returnJson) : makeFileRecObj(returnJson);
    }

    function makeFileRecObj(data) {
        var mergeData1 = {
            ATCH_SRNO: coalesce3(data.ATCH_SRNO, ""),
            ATCH_URL: coalesce3(data.ATCH_URL, ""),
            CLOUD_YN: coalesce3(data.CLOUD_YN, "Y"),
            DRM_MSG: coalesce3(data.DRM_MSG, ""),
            DRM_YN: coalesce3(data.DRM_YN, "N"),
            EXPRY_YN: coalesce3(data.EXPRY_YN, "N"),
            FILE_NAME: coalesce3(data.FILE_NAME, ""),
            FILE_SIZE: coalesce3(data.FILE_SIZE, "")
        }

        return [data, mergeData1].reduce(function (r, o) {
            Object.keys(o).forEach(function (k) {
                r[k] = o[k];
            });
            return r;
        }, {});

        function coalesce3(org, sub) {
            return (org == undefined ? sub : org);
        }
    }

    function makeImgRecObj(data) {
        var mergeData2 = {
            ATCH_SRNO: coalesce3(data.ATCH_SRNO, ""),
            ATCH_URL: coalesce3(data.ATCH_URL, ""),
            CLOUD_YN: coalesce3(data.CLOUD_YN, "Y"),
            DRM_MSG: coalesce3(data.DRM_MSG, ""),
            DRM_YN: coalesce3(data.DRM_YN, "N"),
            EXPRY_YN: coalesce3(data.EXPRY_YN, "N"),
            FILE_NAME: coalesce3(data.FILE_NAME, ""),
            FILE_SIZE: coalesce3(data.FILE_SIZE, ""),
            OTPT_SQNC: coalesce3(data.OTPT_SQNC, "")
        }

        return [data, mergeData2].reduce(function (r, o) {
            Object.keys(o).forEach(function (k) {
                r[k] = o[k];
            });
            return r;
        }, {});

        function coalesce3(org, sub) {
            return (org === undefined ? sub : org);
        }
    }

    function makeMsgRecJson(data) {

        var mergeData0 = {
            ATCH_DATA: checkUndefined(data.ATCH_DATA, ""),
            BOMB_TIMER: checkUndefined(data.BOMB_TIMER, "0"),
            BOMB_YN: checkUndefined(data.BOMB_YN, "N"),
            CHAT_PREVIEW_CNTN: checkUndefined(data.CHAT_PREVIEW_CNTN, null),
            CHAT_PREVIEW_GB: checkUndefined(data.CHAT_PREVIEW_GB, null),
            CHAT_PREVIEW_IMG: checkUndefined(data.CHAT_PREVIEW_IMG, null),
            CHAT_PREVIEW_LINK: checkUndefined(data.CHAT_PREVIEW_LINK, null),
            CHAT_PREVIEW_TTL: checkUndefined(data.CHAT_PREVIEW_TTL, null),
            CHAT_PREVIEW_TYPE: checkUndefined(data.CHAT_PREVIEW_TYPE, null),
            CHAT_PREVIEW_VIDEO: checkUndefined(data.CHAT_PREVIEW_VIDEO, null),
            CNTN: checkUndefined(data.CNTN, ""),
            CONVT_CNTN: checkUndefined(data.CNTN, ""),
            CONVT_DTTM: checkUndefined(data.CONVT_DTTM, ""),
            DVSN_CD: checkUndefined(data.DVSN_CD, ""),
            EMOTI_PATH: checkUndefined(data.EMOTI_PATH, null),
            FILE_REC: checkUndefined(data.FILE_REC, checkUndefined(data.FILE_CLOUD_REC, null)),
            IMG_REC: checkUndefined(data.IMG_REC, checkUndefined(data.IMG_CLOUD_REC, null)),
            JBCL_NM: checkUndefined(data.JBCL_NM, ""),
            LONG_YN: checkUndefined(data.LONG_YN, "N"),
            MSG_GB: checkUndefined(data.MSG_GB, ""),
            NOT_READ_CNT: "" + checkUndefined(data.NOT_READ_CNT, ""),
            OBJ_CNTS_NM: checkUndefined(data.OBJ_CNTS_NM, ""),
            PREVIEW_CNTN: checkUndefined(data.PREVIEW_CNTN, ""),
            PREVIEW_GB: checkUndefined(data.PREVIEW_GB, ""),
            PREVIEW_IMG: checkUndefined(data.PREVIEW_IMG, ""),
            PREVIEW_LINK: checkUndefined(data.PREVIEW_LINK, ""),
            PREVIEW_TTL: checkUndefined(data.PREVIEW_TTL, ""),
            PREVIEW_TYPE: checkUndefined(data.PREVIEW_TYPE, ""),
            PREVIEW_VIDEO: checkUndefined(data.PREVIEW_VIDEO, ""),
            PRFL_PHTG: checkUndefined(data.PRFL_PHTG, ""),
            RGSN_DTTM: checkUndefined(data.RGSN_DTTM, Tz.momentConversion('current')),
            RGSR_CORP_NM: checkUndefined(data.RGSR_CORP_NM, ""),
            RGSR_DVSN_NM: checkUndefined(data.RGSR_DVSN_NM, ""),
            RGSR_ID: checkUndefined(data.RGSR_ID, ""),
            RGSR_NM: checkUndefined(data.RGSR_NM, ""),
            RGSR_USE_INTT_ID: checkUndefined(data.RGSR_USE_INTT_ID, ""),
            ROOM_CHAT_SRNO: "" + checkUndefined(data.ROOM_CHAT_SRNO, ""),
            ROOM_SRNO: "" + checkUndefined(data.ROOM_SRNO, ""),
            RSPT_NM: checkUndefined(data.RSPT_NM, null),
            SELF_READ_YN: checkUndefined(data.SELF_READ_YN, ""),
            VC_SRNO: checkUndefined(data.VC_SRNO, '0')
        }

        return [data, mergeData0].reduce(function (r, o) {
            Object.keys(o).forEach(function (k) {
                r[k] = o[k];
            });
            return r;
        }, {});

        function checkUndefined(org, sub) {
            return (org === undefined ? sub : org);
        }
    }

    function getUserJson() {
        return {
            PRFL_PHTG: _PRFL_PHTG,
            RGSR_NM: _USER_NM,
            RGSR_ID: _USER_ID,
            RGSR_USE_INTT_ID: _USE_INTT_ID,
            RGSR_CORP_NM: _BSNN_NM,
            RGSR_DVSN_NM: _DVSN_NM,
        }
    }


})()

