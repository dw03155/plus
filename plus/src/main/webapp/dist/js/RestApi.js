var RestApi = (function () {
    return {
        getTotalCount: function () {
            //Note. 161개
            return Object.keys(RestApi.GET).length + Object.keys(RestApi.POST).length +
                Object.keys(RestApi.PUT).length + Object.keys(RestApi.DELETE).length;
        },
        //조회 및 체크
        GET: {
            //FLOW_A-Z
            FLOW_AUTH_NO_CHECK_R001: "FLOW_AUTH_NO_CHECK_R001", //이메일 인증번호 체크
            FLOW_AUTH_NO_CHECK_R002: "FLOW_AUTH_NO_CHECK_R002", //이메일 인증번호 전송
            FLOW_BUY_R007: "FLOW_BUY_R007",
            FLOW_BUY_R009: "FLOW_BUY_R009", //결제 정보 조회
            FLOW_CUR_TIME_R001: "FLOW_CUR_TIME_R001", //서버타임
            FLOW_CHAT_LOST_CHECK_R001: "FLOW_CHAT_LOST_CHECK_R001",
            FLOW_CHAT_SRCH_MSG_R001: "FLOW_CHAT_SRCH_MSG_R001",
            FLOW_DEVICE_ACCESS_R001: "FLOW_DEVICE_ACCESS_R001", //접속기기
            FLOW_DVSN_R003: "FLOW_DVSN_R003",
            FLOW_EXT_SERVICE_R001: "FLOW_EXT_SERVICE_R001",
            FLOW_EMPL_R001: "FLOW_EMPL_R001", // 회사 직원 조회
            FLOW_FAV_GROUP_R002: "FLOW_FAV_GROUP_R002", //미니 즐겨찾기 검색
            FLOW_GROUP_R001: "FLOW_GROUP_R001", //미니 즐겨찾기
            FLOW_JOIN_REQ_R001: "FLOW_JOIN_REQ_R001", //가입요청 프로젝트 수
            FLOW_JOIN_REQ_R002: "FLOW_JOIN_REQ_R002", //가입요청 프로젝트 리스트
            FLOW_LANG_PACK_R001: "FLOW_LANG_PACK_R001", //다국어 조회
            FLOW_PUB_CAT_R001: "FLOW_PUB_CAT_R001", //오픈프로젝트
            FLOW_PUB_PRJ_R001: "FLOW_PUB_PRJ_R001", // 전체 공개 프로젝트 조회
            FLOW_SUB_DOM_R001: "FLOW_SUB_DOM_R001",
            FLOW_SCHD_ATD_R02: "FLOW_SCHD_ATD_R02", //일정참석자
            FLOW_SENDIENCE_R001: "FLOW_SENDIENCE_R001", //프로젝트 초대 참여자 조회
            FLOW_SERVICE_CENTER_R001: "FLOW_SERVICE_CENTER_R001",
            FLOW_TAG_R001: "FLOW_TAG_R001", //프로젝트 해시태그
            FLOW_TASK_FILTER_R001: "FLOW_TASK_FILTER_R001",//모든업무 필터
            FLOW_TASK_COLUMN_R001: "FLOW_TASK_COLUMN_R001", //모든업무 정렬
            FLOW_UPDATE_R001: "FLOW_UPDATE_R001", //미니다운
            FLOW_USE_INTT_INFM_R001: "FLOW_USE_INTT_INFM_R001", //이용 기관 조회
            FLOW_VIEW_TYPE_U001: "FLOW_VIEW_TYPE_U001", //프로젝트 보기 타입 변경
            FLOW_ONE_PROJ: "FLOW_ONE_PROJ", //일대일 문의 번호 조회
            FLOW_USE_INTT_LINK_R001: "FLOW_USE_INTT_LINK_R001", //그룹웨어 url 조회
            //COLABO
            COLABO_USER_DUPLICATE_R001: "COLABO_USER_DUPLICATE_R001", //아이디 중복체크
            //COLABO2_A-Z
            COLABO2_ADM_R002: "COLABO2_ADM_R002",
            COLABO2_AT_ME_R101: "COLABO2_AT_ME_R101", // 내가 쓴 글 조회
            COLABO2_AUTO_LOGIN_R001: "COLABO2_AUTO_LOGIN_R001", //신규생성된 오토로그인키
            COLABO2_AUTO_LOGIN_R002: "COLABO2_AUTO_LOGIN_R002", //오토로그인 인증
            COLABO2_BUY_R001: "COLABO2_BUY_R001", //기관설정
            COLABO2_CHAT_SENDIENCE_R001: "COLABO2_CHAT_SENDIENCE_R001",
            COLABO2_CHAT_SENDIENCE_R002: "COLABO2_CHAT_SENDIENCE_R002",
            COLABO2_CHAT_SENDIENCE_R003: "COLABO2_CHAT_SENDIENCE_R003", //미니 채팅방 즐겨찾기
            COLABO2_CHAT_MSG_R001: "COLABO2_CHAT_MSG_R001", // 채팅방 메세지 리스트 / 채팅 이미지 조회
            COLABO2_CHAT_MSG_R002: "COLABO2_CHAT_MSG_R002",//채팅 1개 가져오기
            COLABO2_CHAT_CNPL_R001: "COLABO2_CHAT_CNPL_R001",
            COLABO2_CHAT_SOCKET_ID_LIST_R001: "COLABO2_CHAT_SOCKET_ID_LIST_R001",
            COLABO2_CHAT_NOTICE_R001: "COLABO2_CHAT_NOTICE_R001",
            COLABO2_CHAT_R001: "COLABO2_CHAT_R001",
            COLABO2_EMOTI_R001: "COLABO2_EMOTI_R001",
            COLABO2_EMOTI_R002: "COLABO2_EMOTI_R002",
            COLABO2_EMT_R001: "COLABO2_EMT_R001", //감정 리스트 조회
            COLABO2_FLD_L102: "COLABO2_FLD_L102", //라벨
            COLABO2_FILE_FLD_R001: "COLABO2_FILE_FLD_R001", //파일 폴더 (리스트, 상위)
            COLABO2_FILE_FLD_R003: "COLABO2_FILE_FLD_R003", //파일 폴더3
            COLABO2_FILE_FLD_R004: "COLABO2_FILE_FLD_R004", //파일 폴더 내부 조회
            COLABO2_FILESIZE_CONF_R001: "COLABO2_FILESIZE_CONF_R001",
            COLABO2_FILE_EXTENSION_BLOCK_R001: "COLABO2_FILE_EXTENSION_BLOCK_R001",
            COLABO2_FUNC_R003: "COLABO2_FUNC_R003",
            COLABO2_INVT_R001: "COLABO2_INVT_R001", //초대 정보 조회
            COLABO2_INVT_R003: "COLABO2_INVT_R003",//가입신청자 리스트
            COLABO2_LOGOUT_R001: "COLABO2_LOGOUT_R001", //로그아웃
            COLABO2_LOGIN_R003: "COLABO2_LOGIN_R003", //로그인
            COLABO2_L105: "COLABO2_L105", //미니 프로젝트 검색
            COLABO2_MNGR_R001: "COLABO2_MNGR_R001",
            COLABO2_NOTI_R101: "COLABO2_NOTI_R101", // 프로젝트 푸시 알림 설정 조회
            COLABO2_NOT_READ_CNT_R001: "COLABO2_NOT_READ_CNT_R001",
            COLABO2_PIN_R001: "COLABO2_PIN_R001", //프로젝트 상단고정
            COLABO2_PWD_R001: "COLABO2_PWD_R001",   //비밀번호 찾기
            COLABO2_R104: "COLABO2_R104", //프로젝트 포스트
            COLABO2_REMARK_R101: "COLABO2_REMARK_R101", // 댓글 조회
            COLABO2_SENDIENCE_R101: "COLABO2_SENDIENCE_R101", //프로젝트 참여자
            COLABO2_SET_R101: "COLABO2_SET_R101", //개인설정
            COLABO2_SCHD_R005: "COLABO2_SCHD_R005", //모든일정
            COLABO_TOOLTIP_LOG_R001: "COLABO_TOOLTIP_LOG_R001", //최초 툴팁 로그
            COLABO2_VIDEO_CONFERENCE_R001: "COLABO2_VIDEO_CONFERENCE_R001",
            COLABO2_USER_PRFL_R002: "COLABO2_USER_PRFL_R002", //유저정보
            COLABO_ZOOM_TOKEN_R001: "COLABO_ZOOM_TOKEN_R001",
        },
        //생성
        POST: {
            //FLOW_A-Z
            FLOW_GROUP_MEMBER_C001: "FLOW_GROUP_MEMBER_C001", //미니 즐겨찾기멤버
            COLABO2_GROUP_MEMBER_C004: "COLABO2_GROUP_MEMBER_C004", //미니 즐겨찾기 그룹추가
            FLOW_GROUP_C001: "FLOW_GROUP_C001", //즐겨찾기 그룹추가
            FLOW_JOIN_C001: "FLOW_JOIN_C001",
            FLOW_LANG_PACK_C001: "FLOW_LANG_PACK_C001", //다국어 등록
            FLOW_SUB_DOM_C001: "FLOW_SUB_DOM_C001", //비즈니스계정
            FLOW_SUBTASK_C001: "FLOW_SUBTASK_C001", // 하위 업무 생성
            FLOW_TEAM_INVT_C001: "FLOW_TEAM_INVT_C001",// 직원 초대 메일 발송
            //COLABO
            COLABO_TOOLTIP_LOG_C001: "COLABO_TOOLTIP_LOG_C001",
            COLABO_USER_HISTORY_C001: "COLABO_USER_HISTORY_C001",
            //COLABO2_A-Z
            COLABO2_ADM_C002: "COLABO2_ADM_C002",
            COLABO2_BRING_C001: "COLABO2_BRING_C001", //담아두기
            COLABO2_COMMT_C101: "COLABO2_COMMT_C101",
            COLABO2_C102: "COLABO2_C102", //프로젝트
            COLABO2_C103: "COLABO2_C103", // 라벨 설정
            COLABO2_C105: "COLABO2_C105", //프로젝트 숨기기 설정
            COLABO2_CHAT_C001: "COLABO2_CHAT_C001", //채팅
            COLABO2_CHAT_C002: "COLABO2_CHAT_C002",
            COLABO2_CHAT_MSG_C001: "COLABO2_CHAT_MSG_C001",
            COLABO2_CHAT_MSG_READ_C002: "COLABO2_CHAT_MSG_READ_C002", // 미니 채팅 모두읽기
            COLABO2_FILE_FLD_C001: "COLABO2_FILE_FLD_C001", //파일폴더
            COLABO2_FLD_C101: "COLABO2_FLD_C101", //라벨
            COLABO2_INVT_C001: "COLABO2_INVT_C001", //초대 링크
            COLABO2_PUSH_C001: "COLABO2_PUSH_C001",
            COLABO2_PIN_C001: "COLABO2_PIN_C001", // 상단고정
            COLABO2_REMARK_C101: "COLABO2_REMARK_C101", //댓글 생성
            COLABO2_REGISTER_C001: "COLABO2_REGISTER_C001", //게스트계쩡
            COLABO2_SMS_C001: "COLABO2_SMS_C001", //SMS 전송
            COLABO2_SENDIENCE_C001: "COLABO2_SENDIENCE_C001", //프로젝트 초대
            COLABO2_SENDIENCE_C002: "COLABO2_SENDIENCE_C002",
            //ETC
            IAMPORT_PAYMENT_C001: "IAMPORT_PAYMENT_C001", //카드 등록
        },
        //수정
        PUT: {
            //FLOW_A-Z
            FLOW_GROUP_U001: "FLOW_GROUP_U001", //미니 즐겨찾기 그룹수정 (이름수정 / 즐찾삭제 / 오픈상태)
            FLOW_TASK_WORKER_U002: "FLOW_TASK_WORKER_U002", //업무 담당자 수정
            FLOW_TASK_FILTER_U001: "FLOW_TASK_FILTER_U001", //모든업무 필터
            FLOW_TASK_COLUMN_U001: "FLOW_TASK_COLUMN_U001", //모든업무 보기설정
            FLOW_TASK_REPORT_U001: "FLOW_TASK_REPORT_U001",
            FLOW_SCHD_ATD_U001: "FLOW_SCHD_ATD_U001", //일정 담당자 수정
            FLOW_SCHD_ATD_U002: "FLOW_SCHD_ATD_U002", //일정참석자
            FLOW_SUBTASK_U001: "FLOW_SUBTASK_U001", // 하위 업무 수정
            //COLABO
            colabo_fld_u003: "colabo_fld_u003", //라벨 순서 변경
            COLABO_FLD_ITEM_U002: "COLABO_FLD_ITEM_U002",
            //COLABO2_A-Z
            COLABO2_ALAM_U002: "COLABO2_ALAM_U002", // 글 읽음 처리
            COLABO2_ALAM_U102: "COLABO2_ALAM_U102", // 글 모두 읽음 처리
            COLABO2_BG_COLOR_U001: "COLABO2_BG_COLOR_U001", //프로젝트 컬러
            COLABO2_COMMT_U101: "COLABO2_COMMT_U101",
            COLABO2_CHAT_U001: "COLABO2_CHAT_U001",
            COLABO2_CHAT_MSG_U001: "COLABO2_CHAT_MSG_U001",
            COLABO2_CHAT_MSG_READ_U002: "COLABO2_CHAT_MSG_READ_U002",
            COLABO2_CHAT_NOTICE_SEE_U001: "COLABO2_CHAT_NOTICE_SEE_U001",
            COLABO2_CHAT_SENDIENCE_U001: "COLABO2_CHAT_SENDIENCE_U001", //미니 채팅방 알람설정
            COLABO2_CHAT_SENDIENCE_U002: "COLABO2_CHAT_SENDIENCE_U002",
            COLABO2_CHAT_SENDIENCE_U005: "COLABO2_CHAT_SENDIENCE_U005", //미니 채팅방 상단고정
            COLABO2_CHAT_SENDIENCE_U006: "COLABO2_CHAT_SENDIENCE_U006", //미니 채팅방 즐겨찾기 해제
            COLABO2_FLD_U101: "COLABO2_FLD_U101", //라벨
            COLABO2_FILE_FLD_U001: "COLABO2_FILE_FLD_U001", //파일폴더
            COLABO2_FILE_FLD_U002: "COLABO2_FILE_FLD_U002", //파일폴더 2
            COLABO2_INVT_U001: "COLABO2_INVT_U001", //프로젝트 가입요청
            COLABO2_NOTI_U101: "COLABO2_NOTI_U101", //푸시알림 수정
            COLABO2_PWD_U001: "COLABO2_PWD_U001", //비밀번호 재설정(비밀번호 찾기)
            COLABO2_PWD_U002: "COLABO2_PWD_U002", //비밀번호 변경(마이설정)
            COLABO2_POST_EMT_U001: "COLABO2_POST_EMT_U001", //포스트 감정 수정
            COLABO2_REMARK_U101: "COLABO2_REMARK_U101", //댓글 수정
            COLABO2_REMARK_EMT_U001: "COLABO2_REMARK_EMT_U001", //댓글 감정 수정
            COLABO2_SET_U101: "COLABO2_SET_U101", //개인설정 (랜덤컬러, 뷰타입)
            COLABO2_SET_U102: "COLABO2_SET_U102",
            COLABO2_SENDIENCE_U001: "COLABO2_SENDIENCE_U001", //관리자 지정
            COLABO2_TODO_U101: "COLABO2_TODO_U101", //할일 업데이트
            COLABO2_TASK_U001: "COLABO2_TASK_U001", //업무 옵션 수정
            COLABO2_U001: "COLABO2_U001", //즐겨찾기
            COLABO2_U101: "COLABO2_U101", //프로젝트 수정
            COLABO2_USER_SET_U002: "COLABO2_USER_SET_U002", //채팅 전체알림설정
            COLABO2_USER_SET_U003: "COLABO2_USER_SET_U003", //개인설정 (줄겨찾기)
            COLABO2_USER_PRFL_U002: "COLABO2_USER_PRFL_U002", //유저정보
            COLABO_ZOOM_TOKEN_U001: "COLABO_ZOOM_TOKEN_U001", // Zoom update
        },
        //삭제
        DELETE: {
            //FLOW_A-Z
            FLOW_DEVICE_ACCESS_D001: "FLOW_DEVICE_ACCESS_D001", //접속기기
            FLOW_GROUP_MEMBER_D001: "FLOW_GROUP_MEMBER_D001", //미니 즐겨찾기멤버
            FLOW_SUBTASK_D001: "FLOW_SUBTASK_D001", // 하위 업무 삭제
            FLOW_EXT_SERVICE_D001: "FLOW_EXT_SERVICE_D001", // 줌 연동 해제
            //COLABO
            COLABO_D101: "COLABO_D101", //프로젝트
            //COLABO2_A-Z
            COLABO2_BRING_D001: "COLABO2_BRING_D001", //담아두기 취소
            COLABO2_COMMT_D101: "COLABO2_COMMT_D101",
            COLABO2_CHAT_SENDIENCE_D001: "COLABO2_CHAT_SENDIENCE_D001", //미니 채팅방 나가기
            COLABO2_FLD_D101: "COLABO2_FLD_D101", //라벨
            COLABO2_FILE_FLD_D001: "COLABO2_FILE_FLD_D001", //파일폴더
            COLABO2_PIN_D001: "COLABO2_PIN_D001", // 상단고정
            COLABO2_REMARK_D101: "COLABO2_REMARK_D101", // 댓글 삭제
            COLABO2_SENDIENCE_D001: "COLABO2_SENDIENCE_D001", //참여자
            COLABO2_USER_DELETE_001: "COLABO2_USER_DELETE_001", //회원 탈퇴
            COLABO_ZOOM_TOKEN_D001: "COLABO_ZOOM_TOKEN_D001",
        }
    }
})()