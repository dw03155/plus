var SignCode = {
    TYPE: {
        NORMAL: "1",
        KAKAO: "2",
        GOOGLE: "3",
        APPLE: "11",
    },
    ENCRYPT: {
        SIMPLE: "Y",
        SERVER_TIME_CHECK: "YC"
    },
    ERROR: {
        NO_PROBLEM: '0000',
        PASSWORD_ERROR: '1000',
        ACCOUNT_LOCKED:'1002',
        ID_ERROR: '3002',
        NOT_EXISTS_ID: '2000',
        NOT_EXISTS_DOMAIN: '5001',
        WAIT_JOIN: '4001',
        REJECT_JOIN: '4006',
        BIZPLAY_PASSWORD_ERROR: '5510',
    }
}

var ParticipantCode = {
    MANAGER: "M",
    INNER: "I",
    OUTER: "O",
    _ID: ["RQST_USER_ID", "ATTENDENCE_ID", "WORKER_ID"],
    _NAME: ["RQST_USER_NM", "ATTENDENCE_NM", "WORKER_NM"],
}

var TaskCode = {
    OPTION: {
        _TEXT: [
            "dictionary.number",
            "dictionary.status",
            "front.common.priority",
            "front.common.taskTitle",
            "front.common.progressAsNoun",
            "dictionary.manager",
            "dictionary.author",
            "dictionary.from",
            "dictionary.to",
            "front.common.registeredDate",
            "front.common.editDate"
        ],
        _ITEM: ["Nomal", "Status", "Priority", "Title", "Progress", "Worker", "Nomal", "Nomal", "Nomal", "Nomal", "Nomal"],
        _REPLACE: ["TASK_NUM", "", "", "TASK_NM", "", "", "RGSR_NM", "START_DT", "END_DT", "RGSN_DT", "EDTR_DT"],
        _SORT: ["TASK_NUM", "STTS", "PRIORITY", "TASK_NM", "PROGRESS", "WORKER_NM", "RGSR_NM", "START_DT", "END_DT", "RGSN_DT", "EDTR_DT"],
        _COLUMN_REC: [],
        _GB: ["request", "progress", "completion", "hold", "feedback"],
        _GB_NM: ["dictionary.request", "dictionary.progress", "dictionary.complete", "dictionary.hold", "dictionary.feedback"]
    },
}

var ScheduleCode = {
    HOLIDAY: 'H',
    GENERAL: 'G',
    TASK: 'T',
    STATUS: {
        _GB: ["participate", "absence", "undetermined"],
        _TEXT: ["dictionary.attend", "dictionary.notAttend", "dictionary.maybeAttend"]
    },
}

var DetailCode = {
    WRITE1: "0", //글작성1.0
    WRITE: "1", //글작성2.0
    TODO: "2",
    SCHEDULE: "3",
    TASK: "4",
    POST: {
        _NUMBER: [0, 1, 2, 3, 4],
        _GB: ["write", "write2", "todo", "schedule", "task"],
        _TEXT: ["dictionary.article", "dictionary.article", "dictionary.todo", "dictionary.schedule", "dictionary.task"]
    },
    STATUS: {
        _NUMBER: [0, 1, 2, 3, 4],
        _GB: ["request", "progress", "completion", "hold", "feedback"],
        _TEXT: ["dictionary.request", "dictionary.progress", "dictionary.complete", "dictionary.hold", "dictionary.feedback"]
    },
    PRIORITY: {
        _NUMBER: [0, 1, 2, 3],
        _GB: ["low", "normal", "high", "argent"],
        _TEXT: ["dictionary.low", "dictionary.normal", "dictionary.high", "dictionary.argent"],
        _ALL_TEXT:["dictionary.low", "dictionary.normal", "dictionary.high", "dictionary.argent",'dictionary.none'],
        _CLASS: ["lv1", "lv2", "lv3", "lv4"]
    },
    EMOJI: {
        _NUMBER: [0, 1, 2, 3, 4],
        _GB: ["like", "please", "sad", "great", "thank"],
        _TEXT: ["dictionary.like", "dictionary.please", "dictionary.oops", "dictionary.awesome", "dictionary.thanks"]
    },
    SHARE_POST: {
        CODE: "SHARE_POST",
        TEXT: "front.common.selectProject"
    },
    WRITE_ANYWHERE: {
        CODE: "WRITE_ANYWHERE",
        TEXT: "게시물 작성 중 프로젝트 선택",
    },
};

var taskStatusCode = {
    REQUEST : 0,
    PROGRESS : 1,
    COMPLETION : 2,
    HOLD : 3,
    FEEDBACK : 4,
}

var SocketAPI = {
    COMM: {
        LOGOUT: "LOGOUT0001",
        TEMP_LOGOUT: "LOGOUT0002",
        OVERLAP_LOGOUT: "OVERLAPLOGOUT0001",
        MOUSE_MOVE: "MOUSEMOVE0001",
        POPUP_CLOSE: "POPUP0001",
    },
    MAIN: {
        FOCUS_IN: "FOCUS_IN",
        FOCUS_OUT: "FOCUS_OUT",
        BADGE_UPDATE: "USER0000",
        CHAT_UPDATE: "USER0001",
        ROOM_NAME_UPDATE: "USER0002",
        ALARM_N_PIN_UPDATE: "USER0003",
        ROOM_LEAVE: "USER0004",
        READ_ALL_MESSAGE_BY_ROOM: "USER0005",
        ROOM_FOCUS: "USER0006",
        DELETE_MESSAGE_ALL_VIEW: "USER0007",
        DELETE_MESSAGE_MY_VIEW: "USER0008",
        CHANGE_STATE: "USE_INTT_ID_0001",
        FLOW_DRIVE_FILE_IMPORT: "USER0019",
        BADGE_SELF_UPDATE: "BADGE_SELF",
    },
    MESSENGER: {
        CONNECT: "INNER_CONNECT",
        MESSAGE_UPDATE: "CHAT0001",
        READ_UPDATE: "CHAT0002",
        JOIN_N_LEAVE: "CHAT0003",
        ROOM_NAME_UPDATE: "CHAT0004",
        ROOM_NAME_UPDATE_SELF: "CHAT0013",
        ALARM_N_PIN_UPDATE: "CHAT0005",
        DELETE_MESSAGE_ALL_VIEW: "CHAT0007",
        DELETE_MESSAGE_MY_VIEW: "CHAT0008",
        PREVIEW: "CHAT0009",
        NOTICE: "CHAT0010",
        NOTICE_STATUS_UPDATE: "CHAT0011",
    },
    CONNECT: {
        MESSENGER: {
            FILE: "MESSENGER_FILE",
            CREATE: "MESSENGER_CREATE", //대화하기, 대화상대초대
        },
        INVITE: {
            FAVORITE: "INVITE_FAVORITE"
        }
    },
}


var RoomType = {
    PROJECT: '3',
    MULTI: '2',
    ONE_TO_ONE: '1',
    SELF: '0',
}

var InviteType = {
    SENDIENCE: 'sendience',
    ALLSENDIENCE: 'all-sendience',
    TEAM: 'team',
    NEWCHAT: 'NEW_CHAT',
    INVITECHAT: 'INVITE_CHAT',
    FAVORITE: 'favorite',
    CONTACT: 'contact'
}

var MiniFavoriteData = {
    DefaultGroup: '3'
}

var OftenCode = {
    PREV: "P",
    NEXT: "N",
    EQUAL: "E",
    MORE: "M",
    CREATE: "C",
    EDIT: "E",
    DELETE: "D",
}

var BuyCode = {
    PAID_COMPANY: "Y",
    FREELANCER: "P",
    FREE: "N",
}

var LogoutCode = {
    STOP : "S", //사용자 이용중지
    LOCK : "", //잠금모드로 로그아웃
}

var StatusCode = {
    NO_LIMIT: "S",
    BFLOW: {
        END_ADMIN: "E2", //비플로우 1개월 무료체험 끝난 관리자 고객
        END_USER: "E3", //비플로우 1개월 무료체험 끝난 팀원 고객
        REMAIN_WEEK: "P1", //비플로우 1개월 무료체험 끝나기 7일 남은 고객
        NO_LIMIT: "S", //비플로우 유료 | 비플로우 1개월 무료체험 끝나기 8~30일 남아 제한없는 고객
    },
    ENTER: "S", //엔터 고객
    UN_BFLOW: { //UTLZ | 프리랜서
        MULTI: { //무료고객중 1명 초과한 고객.
            REMAIN_USER: "P", // 1개월 무료체험 0~30일 남아있는 고객
            END_USER: "R", // 1개월 무료체험 끝난 남아있는 고객
        },
        GUEST: "F", //무료
        NO_LIMIT: "S", // 언비플로우 유료
    }
}

var BLOCK_TYPE = {
    SERVICE_ADMIN: {
        title: 'front.alert.serviceUserTitle',
        main: 'front.alert.serviceAdminMain',
        submit: 'front.alert.serviceAdminSubmit',
    },
    SERVICE_USER: {
        title: 'front.alert.serviceUserTitle',
        main: 'front.common.alertAskAdmin',
        submit: 'dictionary.logout',
    },
    USE: {
        title: 'front.alert.serviceUserTitle',
        main: 'front.common.alertAskAdmin'
    },
    EXPERIENCE: {
        title: 'front.alert.experienceTitle',
        main: 'front.alert.experienceMain',
        submit: 'front.alert.experienceSubmit',
    },
    DATA10: {
        title: 'front.alert.data10Title',
        main: 'front.alert.data10Main',
        submit: 'front.common.upgradeService',
    },
    PROJECT: {
        title: 'front.alert.projcetMakeTitle',
        main: 'front.alert.projectMakeMain',
        submit: 'front.common.upgradeService',
    },
    INVITE: {
        title: 'front.InviteProject.inviteCompanyMember',
        main: 'front.alert.inviteMain',
        submit: 'front.common.upgradeService',
    },
    SEARCH: {
        title: 'front.common.chatSearch',
        main: 'front.alert.chatSearchMain',
        submit: 'front.common.upgradeService',
    },
    SECRET: {
        title: 'front.common.chatSecret',
        main: 'front.alert.chatSecretMain',
        submit: 'front.common.upgradeService',
    },
    VIDEO: {
        title: 'front.alert.videoConferenceTitle',
        main: 'front.alert.videoConferenceMain',
        submit: 'front.common.upgradeService',
    },
    AUTHENTICATION: {
        title: 'front.common.videoConference',
        main: 'front.common.noAuth',
        submit: 'dictionary.confirm',
    },
    COLLECT: {
        title: 'dictionary.content',
        main: 'front.alert.listViewMain',
        submit: 'front.common.upgradeService',
    },
    SUBTASK: {
        title: "front.common.writeSubTasks",
        main: 'front.alert.subtaskMain',
        submit: 'front.common.upgradeService',
    },
    FLOWDRIVE: {
        title: "front.alert.flowDriveTitle",
        main: "front.alert.flowFileMain",
        submit: 'front.common.upgradeService',
    },
    DATA500: {
        title: "front.alert.storageFullTitle",
        main: "front.alert.storageFullMain",
        submit: 'front.common.upgradeService',
    },
    POST: {
        title: "front.postAccessLimitTitle",
        main: "front.postAccessLimitMain",
        submit: 'front.common.upgradeService',
    },
    TIMELINE: {
        title: "dictionary.ganttChart",
        main: "front.alert.timeLineMain",
        submit: 'front.common.upgradeService',
    },
    ZOOM_CONNECT: {
        title: 'front.alert.videoConferenceTitle',
        main: "Zoom을 연동하여 플로우에서\n 화상회의 서비스를 이용해 보세요!",
        submit: 'dictionary.connect',
        link_text: "Zoom 무료가입 및 이용방법 안내",
    },
    DATA50: {
        title: '1회 업로드 용량 초과(50MB)',
        main: 'front.alert.data10Main',
        submit: 'front.common.upgradeService',
    },
    STOP_FLOWNEW: {
        title: 'PC 앱 정식 버전 출시',
        main: '테스트 버전 지원 종료로 \n' +
            '정식 버전 이용 부탁드립니다.',
        submit: 'PC 앱 다운로드',
    },
}

//Note. 필터카테고리
var searchMode = {
    TOTAL: "total", //전체 카테고리
    PROJECT: "project", //프로젝트 카테고리
    POST: "post", //글 카테고리
    FILE: "file", //파일 카테고리
    TASK: "task", //업무 카테고리
    SCHD: "schedule", //일정 카테고리
}

//Note. 필터영역
var searchAreaCode = {
    IN_TONG: "IN_TONG", //통합
    IN_PROJECT: "IN_PROJECT", //프로젝트내
    IN_TASK: "IN_TASK", //업무모아보기
    IN_FILE: "IN_FILE", //파일모아보기
    IN_POSTS: "IN_POSTS", //북마크,멘션,내가쓴글
}

var MessageType = {
    INFO: 'A',
    INVITE: 'A_INVITE',
    NOTIFICATION: 'U',
    NEW: 'D',
    DELETE: 'X',
    CHANGED: 'C',
    IMAGE: 'I',
    FILE: 'F',
    EMOTI: 'E',
    GENERAL: '',
}

var SendienceGb = {
    INNER: "1",
    OUTER: "2",
    MANAGER: "3",
}

var loadMode = {
    UP_SCROLL: 'P',
    DOWN_SCROLL: 'N',
    FIRST_LOAD: 'I',
    EQUAL_LOAD: 'E',
    FIRST_OVER_LOAD: 'FIRST_OVER_LOAD',
    SEARCH_LOAD: 'SP'
}

var JoinStatus = {
    APPLY_JOIN: 1,
    REJECT_JOIN: 2,
    REQUEST_JOIN: 3,
    DELETE_JOIN_LOG: 4,
    APPLY_JOIN_2: 5,
    REJECT_JOIN_2: 6,
    CANCEL_REQUEST_JOIN: 7,
}

//채팅공지
var noticeCode = {
    DEFAULT: 'D', //Default (2줄 나와있는 상태)
    FOLD: 'F', //다 펼처져 있는상태
    MINI: 'M', //접혀져서 아이콘만 있는상태
    NONE: 'N',
}

var ELECTRON_OPEN = {
    CHAT: 'C',
    PROJECT: 'P',
    FILE: 'F',
    INVITE: 'I',
}

var UpdateElementsTarget = {
    POPUP: {
        ID: "#postPopup #post-",
        TITLE_CLASS: "js-post-title post-title ",
        STATUS_CLASS: "js-task-state state-button-group clearfix ",
    },
    CARD: {
        ID: "#detailUl #post-",
        TITLE_CLASS: "js-post-title post-title ",
        STATUS_CLASS: "js-task-state state-button-group clearfix ",
    },
    LIST: {
        ID: "#detailUl #post-",
        TITLE_CLASS: "js-post-title fixed-text ",
        STATUS_CLASS: "js-task-state state ",
    },
    PIN: {
        ID: "#pinPostUl #pin-",
        TITLE_CLASS: "js-post-title fixed-text ",
        STATUS_CLASS: "js-task-state js-todo-state state  ",
    },
    TASK: {
        ID: ".js-all-task-ul:visible #allTask-",
        TITLE_CLASS: "",
        STATUS_CLASS: "js-task-state task-state ",
    },
    ALLPOSTS: {
        ID: "#myPostContentUl:visible #allPosts-",
        TITLE_CLASS: "",
        STATUS_CLASS: "js-task-state state ",
    },
    SUBTASK: {
        ID: "#subtask-",
        STATUS_CLASS: "js-subtask-status-button js-task-state subtask-button subtask-status ",
    }
}

var ProfileState = {
    ONLINE: 'online',
    OUT: 'out',
    BUSINESS: 'business',
    OFFLINE: 'offline',
}

var FlowServiceHelper = {
    ZOOM: "https://support.flow.team/hc/ko/articles/4404603293197",
    SENDIENCE: "https://support.flow.team/hc/ko/articles/4403686292877",
    PUSH_SETTING: "https://support.flow.team/hc/ko/articles/216566367",
    ALARM_SETTING: "https://support.flow.team/hc/ko/articles/360021715712",
    NOTIFICATION: "https://support.flow.team/hc/ko/articles/4404185955981",
    CREATE_PROJECT: "https://support.flow.team/hc/ko/articles/4403611187085",
    CREATE_PROJECT_OPTION: "https://support.flow.team/hc/ko/articles/4404585678861"
}

var INVITEGB = {
    PERSON: "U",
    DVSN: "ED",
}

var TINY_URL_MOVE = {
    POST : -9
}