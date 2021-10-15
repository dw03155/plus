var RenewalApi = (function () {
    return {
        getTotalCount: function () {
            //Note. 16개
            return Object.keys(RenewalApi.GET).length + Object.keys(RenewalApi.POST).length +
                Object.keys(RenewalApi.PUT).length;
        },
        //조회 및 체크
        GET: {
            ACT_ALARM_LIST: "ACT_ALARM_LIST",
            ACT_FILE_CHECK: "ACT_FILE_CHECK", // 파일 권한 체크
            ACT_ORG_USERLIST: "ACT_ORG_USERLIST",
            ACT_POST_LIST: "ACT_POST_LIST",
            ACT_PROJECT_LIST: "ACT_PROJECT_LIST",
            ACT_POST_WORKER_LIST: "ACT_POST_WORKER_LIST", // 포스트 담당자 조회
            ACT_SEARCH_FILE_LIST: "ACT_SEARCH_FILE_LIST",
            ACT_SEARCH_POST_N_REMARK_LIST: "ACT_SEARCH_POST_N_REMARK_LIST",
            ACT_PROJECT_INFO: "ACT_PROJECT_INFO",
            ACT_ROOM_LIST: "ACT_ROOM_LIST",
            ACT_TASK_LIST: "ACT_TASK_LIST",
            ACT_FILE_LIST: "ACT_FILE_LIST",
            ACT_EXIST_YN_BY_POST_N_REMARK: "ACT_EXIST_YN_BY_POST_N_REMARK",
            ACT_ONE_TASK_STATE: "ACT_ONE_TASK_STATE",   // 단일 업무 상태 조회
        },
        //생성
        POST: {
            COLABO2_C104: "COLABO2_C104", // 라벨 설정(record)
        },
        //수정
        PUT: {
            COLABO2_BG_COLOR_U002: "COLABO2_BG_COLOR_U002", // 프로젝트 일괄 컬러 수정
            COLABO2_NOTI_U102: "COLABO2_NOTI_U102", //푸시알림 수정(record)
        }
    }
})();