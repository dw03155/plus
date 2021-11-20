package co.plus.prj.pnw.mapper;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;
import co.plus.prj.pnw.vo.PNWVO;

public interface PNWMapper {

		// 전체메뉴
		int prjInsert(PNWVO vo);			// 새 프로젝트
		int prjPMInsert(PNWVO vo);			// 새 프로젝트 : PM 입력
		List<PNWVO> ctgryList(PNWVO vo);	// 새 프로젝트 : 카테고리 목록 가져오기
		List<PNWVO> favorMyPrj(PNWVO vo);	// 내 프로젝트(즐겨찾기)
		List<PNWVO> noMyPrj(PNWVO vo);		// 내 프로젝트(즐겨찾기x)
		int prjFavorite(PNWVO vo);			// 즐겨찾기 추가
		int prjNoFavor(PNWVO vo);			// 즐겨찾기 삭제
		int prjColorUpdate(PNWVO vo);		// 프로젝트 색상 변경
		int prjFolderSet(PNWVO vo);			// 프로젝트 폴더 설정
		List<PNWVO> openProject(PNWVO vo);	// 회사 프로젝트(전체공개 프로젝트)
		List<PNWVO> joinPrj(PNWVO vo);		// 즐겨찾기(참여)
		List<PNWVO> noJoinPrj(PNWVO vo);	// 즐겨찾기(참여X)
		List<PNWVO> allSchedule(PNWVO vo);	// 스케줄
	
		List<PNWVO> folderMenu(PNWVO vo);	// 프로젝트 폴더 메뉴
		List<PNWVO> prjFolder(PNWVO vo);	// 프로젝트 폴더 조회
		int prjFoldInsert(PNWVO vo);		// 프로젝트 폴더 생성
		int prjFoldUpdate(PNWVO vo);		// 프로젝트 폴더 수정(폴더명)
		int prjFoldDelete(PNWVO vo);		// 프로젝트 폴더 삭제
		
		// 프로젝트
		int prjColor(PNWVO vo);				// 프로젝트 색상 설정
		int prjFoldSet(PNWVO vo);			// 프로젝트 폴더 설정
		int prjUpdate(PNWVO vo);			// 프로젝트 수정(프로젝트명, 색깔, 공개권한)
		int prjDelete(PNWVO vo);			// 프로젝트 삭제
		PNWVO prjInfo(PNWVO vo);			// 프로젝트 홈탭 : 프로젝트 정보
		int prjTskAllCount(PNWVO vo);		// 프로젝트 홈탭 : 업무(+하위업무) 갯수
		List<PNWVO> prjTskCount(PNWVO vo);	// 프로젝트 홈탭 : 업무 상태별 갯수
		List<PNWVO> pnwPinList(PNWVO vo);	// 프로젝트 홈탭 : 상단고정 게시글 목록
		List<PNWVO> pnwAllList(PNWVO vo);	// 프로젝트 홈탭 : 전체 게시글 목록
		List<PNWVO> allEmploys(PNWVO vo);	// 프로젝트 참여자 초대
		int prjPartiCnt(PNWVO vo);			// 프로젝트 홈탭 : 전체 참여자 수
		List<PNWVO> prjPartiList(PNWVO vo);	// 프로젝트 홈탭 : 전체 참여자 목록
		List<PNWVO> partiPM(PNWVO vo);		// 프로젝트 홈탭 : PM 참여자 목록
		List<PNWVO> partiUser(PNWVO vo);	// 프로젝트 홈탭 : USER 참여자 목록
		List<PNWVO> partiGuest(PNWVO vo);	// 프로젝트 홈탭 : GUEST 참여자 목록
		List<PNWVO> tskPrgList(PNWVO vo);	// 프로젝트 업무탭 (업무 진행상태 리스트)
		List<PNWVO> tskNWList(PNWVO vo);	// 프로젝트 업무탭 (업무 게시글 리스트(아코디언))
		List<PNWVO> scheList(PNWVO vo);		// 프로젝트 일정탭
	
		PNWVO txtNW(PNWVO vo); 			// 프로젝트 홈탭 : 글 상세보기
		PNWVO tskNW(PNWVO vo); 			// 프로젝트 홈탭 : 업무 상세보기
		PNWVO subtskNW(PNWVO vo); 		// 프로젝트 홈탭 : 하위업무 상세보기
		PNWVO scheNW(PNWVO vo); 		// 프로젝트 홈탭 : 일정 상세보기
		List<PNWVO> TodoNW(PNWVO vo); 	// 프로젝트 홈탭 : 할일 상세보기
		
		
		int txtInsert(PNWVO vo);			// 글 입력
		int txtUpdate(PNWVO vo);			// 글 수정
		int tskInsert(PNWVO vo);			// 업무 입력
		int tskUpdate(PNWVO vo);			// 업무 수정
		int scheInsert(PNWVO vo);			// 일정 입력
		int scheUpdate(PNWVO vo);			// 일정 수정
		int todoInsert(PNWVO vo);			// 할일 입력
		int todoUpdate(PNWVO vo);			// 할일 수정
		int nwDelete(PNWVO vo);				// 게시글 삭제

}
