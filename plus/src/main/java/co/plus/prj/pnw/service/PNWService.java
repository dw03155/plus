package co.plus.prj.pnw.service;

import java.util.List;
import java.util.Map;

import co.plus.prj.pnw.vo.PNWVO;

public interface PNWService {
	
	// 전체메뉴
	int prjInsert(PNWVO vo);			// 새 프로젝트
	List<PNWVO> ctgryList(PNWVO vo);	// 새 프로젝트 : 카테고리 목록 가져오기
	List<PNWVO> favorMyPrj(PNWVO vo);	// 내 프로젝트(즐겨찾기)
	List<PNWVO> noMyPrj(PNWVO vo);		// 내 프로젝트(즐겨찾기x)
	int prjFavorite(PNWVO vo);			// 즐겨찾기 추가
	int prjNoFavor(PNWVO vo);			// 즐겨찾기 삭제
	int prjColorUpdate(PNWVO vo);		// 프로젝트 색상 변경
	int prjFolderSet(PNWVO vo);			// 프로젝트 폴더 변경
	List<PNWVO> openProject(PNWVO vo);	// 회사 프로젝트(전체공개 프로젝트)
	List<PNWVO> joinPrj(PNWVO vo);		// 즐겨찾기 (참여)
	List<PNWVO> noJoinPrj(PNWVO vo);	// 즐겨찾기 (참여X)
	
	List<PNWVO> folderMenu(PNWVO vo);	// 프로젝트 폴더 메뉴
	List<PNWVO> prjFolder(PNWVO vo);	// 프로젝트 폴더 조회
	int prjFoldInsert(PNWVO vo);		// 프로젝트 폴더 생성
	int prjFoldUpdate(PNWVO vo);		// 프로젝트 폴더 수정(폴더명)
	int prjFoldDelete(PNWVO vo);		// 프로젝트 폴더 삭제
	
	List<PNWVO> allSchedule(PNWVO vo);	// 전체일정,전체업무

	// 프로젝트
	int prjUpdate(PNWVO vo);			// 프로젝트 수정(프로젝트명, 색깔, 공개권한)
	int prjDelete(PNWVO vo);			// 프로젝트 삭제
	
	Map<String, Object> prjHome (PNWVO vo); //프로젝트 홈
	
	PNWVO prjInfo(PNWVO vo);			// 프로젝트 홈탭 : 프로젝트 정보
	List<PNWVO> allEmploys(PNWVO vo);	// 프로젝트 홈탭 : 참여자초대
	List<PNWVO> prjTskCount(PNWVO vo);	// 프로젝트 홈탭 : 업무 상태에 따른 게시글 갯수
	List<PNWVO> prjHomePin(PNWVO vo);	// 프로젝트 홈탭 : 게시글 목록(상단고정)
	List<PNWVO> prjHomeNW(PNWVO vo);	// 프로젝트 홈탭 : 게시글 목록
	int prjPartiCnt(PNWVO vo);			// 프로젝트 홈탭 : 전체 참여자 수
	List<PNWVO> prjPartiList(PNWVO vo);	// 프로젝트 홈탭 : 전체 참여자 목록
	List<PNWVO> partiPM(PNWVO vo);		// 프로젝트 홈탭 : PM 참여자 목록
	List<PNWVO> partiUser(PNWVO vo);	// 프로젝트 홈탭 : USER 참여자 목록
	List<PNWVO> partiGuest(PNWVO vo);	// 프로젝트 홈탭 : GUEST 참여자 목록
	List<PNWVO> prjTsk(PNWVO vo);		// 프로젝트 업무탭
	List<PNWVO> prjSche(PNWVO vo);		// 프로젝트 일정탭
	
	PNWVO txtNW(PNWVO vo); 			// 프로젝트 홈탭 : 글 상세보기
	PNWVO tskNW(PNWVO vo); 			// 프로젝트 홈탭 : 업무 상세보기
	PNWVO subtskNW(PNWVO vo); 		// 프로젝트 홈탭 : 하위업무 상세보기
	PNWVO scheNW(PNWVO vo); 		// 프로젝트 홈탭 : 일정 상세보기
	List<PNWVO> TodoNW(PNWVO vo); 	// 프로젝트 홈탭 : 할일 상세보기

	
	int txtInsert(PNWVO vo);			// 글 생성
	int txtUpdate(PNWVO vo);			// 글 수정
	int tskInsert(PNWVO vo);			// 업무 생성
	int tskUpdate(PNWVO vo);			// 업무 수정
	int scheInsert(PNWVO vo);			// 일정 생성
	int scheUpdate(PNWVO vo);			// 일정 수정
	int todoInsert(PNWVO vo);			// 할일 생성
	int todoUpdate(PNWVO vo);			// 할일 수정
	int nwDelete(PNWVO vo);				// 게시글 삭제

}
