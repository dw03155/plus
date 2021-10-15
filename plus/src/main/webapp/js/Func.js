var Func = (function () {

    return {
        init: function () {
            if ("Y" !== Often.getCookie("FIRST_MAIN_BASE") &&
                !Often.isFunc("FLOW_S_BLOCK_MAIN_BASE") &&
                Often.isFunc("FLOW_S_MAIN_BASE")) {

                //최초 한번 실행
                Often.setCookie("RENEWAL_SLIDE_NOTICE_HIDE_YN", "N", 30 * 12 * 10);
                Often.setCookie("FIRST_MAIN_BASE", "Y", 30 * 12 * 10);
            }

            $("#detailTab").find("[data-code=history]").css('display', Often.isFunc("ALARM_HISTORY") ? 'inline-block' : 'none');
        },
        //A-Z
        CLOUD: {
            APPLE_LOGIN: "APPLE_LOGIN", // 애플 로그인
            AD_FILE_UPLOAD: "AD_FILE_UPLOAD", //DB 값으로 파일업로드 사이즈 제한
            CHAT_MOA_VIEW: "CHAT_MOA_VIEW", // 채팅 모아보기 버튼
            CHAT_LINK_MOA_VIEW: "CHAT_LINK_MOA_VIEW", // 링크 모아버기 버튼
            CHAT_SRCH: "CHAT_SRCH", // 채팅 검색
            CHAT_NOTICE: "CHAT_NOTICE", // 채팅 공지사항
            DROPBOX_UPLOAD_PREVENT: "DROPBOX_UPLOAD_PREVENT", // dropbox off
            DROPBOX_UPLOAD: "DROPBOX_UPLOAD", // dropbox on
            FILE_EXTENSION_BLOCK: "FILE_EXTENSION_BLOCK", //DB 값으로 파일업로드 확장자 제한
            GOOGLEDRIVE_UPLOAD: "GOOGLEDRIVE_UPLOAD", // google drive on
            GOOGLEDRIVE_UPLOAD_PREVENT: "GOOGLEDRIVE_UPLOAD_PREVENT", // google drive off
            GANTT: "GANTT", // 간트 차트
            GUEST_LIMIT: "GUEST_LIMIT", //게스트 제한
            GUEST_STORAGE_LIMIT: "GUEST_STORAGE_LIMIT",
            IMPORT_FILE_BOX: "IMPORT_FILE_BOX", // 파일함 첨부
            NOTDISTURB: "NOTDISTURB", // 방해금지모드 요일 설정
            PROFILE_THUMBNAIL: "PROFILE_THUMBNAIL", //프로필 썸네임
            POST_VIEW_SELECT: "POST_VIEW_SELECT", // 프로젝트 포스트 뷰 선택
            QUICK_GUIDE: "QUICK_GUIDE", // 퀵 가이드
            RESTRICT_POPUP_MANAGER: "RESTRICT_POPUP_MANAGER", //제한팝업에 관리자 이름표기
            SHOW_SLOGAN: "SHOW_SLOGAN", // 프로필 슬로건
            TASK_START_TIME: "TASK_START_TIME", // 업무 시작,종료시각 추가
            UPLOAD_PREVENT: "UPLOAD_PREVENT", // 업로드 방지
            VOUCHER_BANNER: "VOUCHER_BANNER", //바우처배너
            WRITE_AUTHORITY_SEPARATE: "WRITE_AUTHORITY_SEPARATE", //글/댓글 작성 권한 구분
            VIDEO_CONFERENCE: "VIDEO_CONFERENCE", //화상회의
            DOWNLOAD_PREVENT: "DOWNLOAD_PREVENT", //다운로드 방지
            BLOCK_WEB_LNB_EXCEPT_BOOKMARK: "BLOCK_WEB_LNB_EXCEPT_BOOKMARK", //왼쪽 모아보기 제거 (북마크빼고)
            BLOCK_WEB_LNB_PROJ_LIST: "BLOCK_WEB_LNB_PROJ_LIST", //왼쪽 프로젝트 리스트 제어
            CHAT_JBCL_VIEW: "CHAT_JBCL_VIEW", // (채팅) 직급 + 부서 정보 출력
            PARTICIPANTS_INFO: "PARTICIPANTS_INFO", // (프로젝트) 직급 + 부서 정보 출력
            TASK_UPGRADE: "TASK_UPGRADE", // 업무 2.0
            SCHEDULE_UPGRADE: "SCHEDULE_UPGRADE", // 일정 2.0
            MINI_TOOLTIP: "MINI_TOOLTIP", // 미니모드 툴팁사용여부
            EDIT_TIME_TEXT: "EDIT_TIME_TEXT", //(일정, 업무) 시간 키보드 입력 가능여부
            MINI_CONTACT: "MINI_CONTACT", //미니모드 연락처 보이도록.
            CHAT_PROJECT_PARTI: "CHAT_PROJECT_PARTI", //프로젝트 채팅방 참여자 구분여부
            ELECTRON_NAVI: "ELECTRON_NAVI", //일렉트론 네이베이션 사용여부
            MESSENGER_TOOLTIP: "MESSENGER_TOOLTIP", //메신저 툴팁
            EXTEND_TASK_FILTER: "EXTEND_TASK_FILTER", //업무 모아보기 필터 확장 ( 마감일, 수정일 )
            USE_CHANNEL_TAB: "USE_CHANNEL_TAB", //미니 그룹웨어탭 사용여부
            MINI_BANNER: "MINI_BANNER", //미니 배너 노출여부
            MINI_SECURE_DOWNLOAD: "MINI_SECURE_DOWNLOAD", //시큐어 다운로드 기업
            ALARM_COUNT_SOCKET: "ALARM_COUNT_SOCKET", //알람카운트 소켓으로 연결
            STOP_FLOWNEW: "STOP_FLOWNEW", //flow new 사용중지 팝업
            SENTRY_MONITOR: "SENTRY_MONITOR", // 센트리 모니터링 활성화 유무
            INVITATION_POPUP: "INVITATION_POPUP", // 담당자 팝업
        },
        KT_BIZWORKS: {
            KT_QNA: "KT_QNA",
        },
        ENTER: {
            GOOGLE_MAP: "GOOGLE_MAP", // 구글 맵 사용 여부
        },
        DEVELOP: {
            URL_COPY: "URL_COPY", //포스트 URL 복사
        },
        LOG: {
            LOCK: "LOCK_TOAST" //잠금모드 60초 전부터 토스트 알림이 나옴
        }
    }
})()