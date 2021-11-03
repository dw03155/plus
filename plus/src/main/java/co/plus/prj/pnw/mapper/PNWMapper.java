package co.plus.prj.pnw.mapper;

import java.util.List;

import co.plus.prj.pnw.vo.PNWVO;

public interface PNWMapper {

		// 전체메뉴
		int prjInsert(PNWVO vo);			// 새 프로젝트
		List<PNWVO> myProject();			// 내 프로젝트
		List<PNWVO> openProject();			// 회사 프로젝트(전체공개 프로젝트)
	
		List<PNWVO> prjFolder();			// 프로젝트 폴더 메뉴
		int prjFoldInsert(PNWVO vo);		// 프로젝트 폴더 생성
		int prjFoldUpdate(PNWVO vo);		// 프로젝트 폴더 수정(폴더명)
		int prjFoldDelete(PNWVO vo);		// 프로젝트 폴더 삭제
		
		// 프로젝트
		
		List<PNWVO> tskPrgList();
		int prjUpdate(PNWVO vo);			// 프로젝트 수정(프로젝트명, 색깔, 공개권한)
		int prjDelete(PNWVO vo);			// 프로젝트 삭제
		List<PNWVO> pnwList();				// 프로젝트 홈탭 (게시글 목록)
		List<PNWVO> partiList();			// 프로젝트 홈탭 (참여자 목록)
		List<PNWVO> tskList();				// 프로젝트 업무탭
		List<PNWVO> scheList();				// 프로젝트 일정탭
		List<PNWVO> fileList();				// 프로젝트 파일탭
	
		int txtInsert(PNWVO vo);			// 글 입력
		int txtUpdate(PNWVO vo);			// 글 수정
		int tskInsert(PNWVO vo);			// 업무 입력
		int tskUpdate(PNWVO vo);			// 업무 수정
		int scheInsert(PNWVO vo);			// 일정 입력
		int scheUpdate(PNWVO vo);			// 일정 수정
		int todoInsert(PNWVO vo);			// 할일 입력
		int todoUpdate(PNWVO vo);			// 할일 수정
		int nwDelete(PNWVO vo);				// 게시글 삭제
		
		List<PNWVO> replyList();			// 댓글 목록
		int replyInsert(PNWVO vo);			// 댓글 생성
		int replyUpdate(PNWVO vo);			// 댓글 수정
		int replyDelete(PNWVO vo);			// 댓글 삭제


}
