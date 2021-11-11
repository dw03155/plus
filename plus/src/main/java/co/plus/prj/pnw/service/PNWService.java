package co.plus.prj.pnw.service;

import java.util.List;
import java.util.Map;

import co.plus.prj.pnw.vo.PNWVO;

public interface PNWService { //mapper합치기
	
		// 전체메뉴
		int prjInsert(PNWVO vo);			// 새 프로젝트
		List<PNWVO> ctgryList(PNWVO vo);	// 새 프로젝트 : 카테고리 목록 가져오기
		List<PNWVO> favorMyPrj(PNWVO vo);	// 내 프로젝트(즐겨찾기)
		List<PNWVO> noMyPrj(PNWVO vo);		// 내 프로젝트(즐겨찾기x)
		List<PNWVO> openProject(PNWVO vo);	// 회사 프로젝트(전체공개 프로젝트)
		
		List<PNWVO> folderMenu(PNWVO vo);	// 프로젝트 폴더 메뉴
		List<PNWVO> prjFolder(PNWVO vo);	// 프로젝트 폴더 조회
		int prjFoldInsert(PNWVO vo);		// 프로젝트 폴더 생성
		int prjFoldUpdate(PNWVO vo);		// 프로젝트 폴더 수정(폴더명)
		int prjFoldDelete(PNWVO vo);		// 프로젝트 폴더 삭제
		
		// 프로젝트
		int prjUpdate(PNWVO vo);			// 프로젝트 수정(프로젝트명, 색깔, 공개권한)
		int prjDelete(PNWVO vo);			// 프로젝트 삭제
		
		Map<String, Object> prjHome (PNWVO vo); //프로젝트 홈
		
		PNWVO prjInfo(PNWVO vo);			// 프로젝트 홈탭 : 프로젝트 정보
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
		List<PNWVO> prjFile(PNWVO vo);		// 프로젝트 파일탭
		
		int txtInsert(PNWVO vo);			// 글 입력
		int txtUpdate(PNWVO vo);			// 글 생성
		int tskInsert(PNWVO vo);			// 업무 생성
		int tskUpdate(PNWVO vo);			// 업무 수정
		int scheInsert(PNWVO vo);			// 일정 생성
		int scheUpdate(PNWVO vo);			// 일정 수정
		int todoInsert(PNWVO vo);			// 할일 생성
		int todoUpdate(PNWVO vo);			// 할일 수정
		int nwDelete(PNWVO vo);				// 게시글 삭제
		
		int replyInsert(PNWVO vo);			// 댓글 생성
		int replyUpdate(PNWVO vo);			// 댓글 수정
		int replyDelete(PNWVO vo);			// 댓글 삭제

}
