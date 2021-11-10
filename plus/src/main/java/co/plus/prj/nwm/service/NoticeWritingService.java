package co.plus.prj.nwm.service;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;

public interface NoticeWritingService {
	
	// 전체 메뉴
	List<NoticeWritingVO> myPost(NoticeWritingVO vo);	// 전체 메뉴 -> 내 게시물 목록	
	
	NoticeWritingVO myPostTxt(NoticeWritingVO vo); 		// 내 게시물 목록 -> 글 상세보기(팝업)
	NoticeWritingVO myPostTsk(NoticeWritingVO vo); 		// 내 게시물 목록 -> 업무 상세보기(팝업)
	NoticeWritingVO myPostSubtsk(NoticeWritingVO vo); 		// 내 게시물 목록 -> 하위업무 상세보기(팝업)
	NoticeWritingVO myPostSche(NoticeWritingVO vo); 		// 내 게시물 목록 -> 일정 상세보기(팝업)

	List<NoticeWritingVO> myPostTodo(NoticeWritingVO vo); 		// 내 게시물 목록 -> 할일 상세보기(팝업)
										
			// 내 게시물 개수 
	 
	 List<NoticeWritingVO> allTask(NoticeWritingVO vo); 				// 전체 메뉴 -> 전체 업무 (프로젝트 항목)
	 List<NoticeWritingVO> detailTaskList(NoticeWritingVO vo);				// 임시) 전체 업무 
	 NoticeWritingVO taskSelect(NoticeWritingVO vo);					// 전체 업무 -> 업무 상세보기(팝업)
	 
	 List<NoticeWritingVO> allSche(NoticeWritingVO vo);					// 전체 메뉴 -> 캘린더
	 
	 List<NoticeWritingVO> allFile(NoticeWritingVO vo); 				// 전체 메뉴 -> 파일
	 NoticeWritingVO fileSelect(NoticeWritingVO vo);					// 파일 -> 파일 상세보기(팝업)
	 
	 List<NoticeWritingVO> bookMarkList(NoticeWritingVO vo);			// 전체 메뉴 -> 북마크
	 NoticeWritingVO bookMarkSelect(NoticeWritingVO vo);				// 북마크 -> 북마크 상세보기(팝업)
	 
	 
	 // 프로젝트 선택 후 메뉴 
	 List<NoticeWritingVO> totalNotice(NoticeWritingVO vo);				// 프로젝트 선택 -> 홈 (게시물 목록 조회)
	 	
		 NoticeWritingVO txtSelect(NoticeWritingVO vo);    	// 글 자세히보기(아코디언)
		 int insertTxt(NoticeWritingVO vo);		// 글 입력
		 int UpdateTxt(int notiId);		// 글 수정
		 int DeleteTxt(NoticeWritingVO vo);		// 글 삭제
		 
		 NoticeWritingVO tskList(NoticeWritingVO vo);		// 프로젝트 선택 후 -> 업무 (1개 프로젝트)
		 NoticeWritingVO tskSelect(NoticeWritingVO vo);		// 업무 자세히보기(아코디언)
		 int insertTsk(NoticeWritingVO vo);		// 업무 생성
		 int UpdateTsk(NoticeWritingVO vo);		// 업무 수정
		 int DeleteTsk(NoticeWritingVO vo);		// 업무 삭제
		 
		 NoticeWritingVO scheList(NoticeWritingVO vo);		// 프로젝트 선택 후 -> 일정 (1개 프로젝트)
		 NoticeWritingVO scheSelect(NoticeWritingVO vo);	// 일정 자세히보기(아코디언)
		 int insertSche(NoticeWritingVO vo);	// 일정 생성
		 int UpdateSche(NoticeWritingVO vo);	// 일정 수정
		 int DeleteSche(NoticeWritingVO vo);	// 일정 삭제
		 
		 NoticeWritingVO todoSelect(NoticeWritingVO vo);	// 할일 자세히보기(아코디언)
		 int insertTodo(NoticeWritingVO vo);	// 할일 생성
		 int UpdateTodo(NoticeWritingVO vo);	// 할일 수정
		 int DeleteTodo(NoticeWritingVO vo);	// 할일 삭제
		 
		// 프로젝트 선택 후
		 int replyInsert(NoticeWritingVO vo);   // 댓글 생성		 
		 int replyUpdate(NoticeWritingVO vo);   // 댓글 수정		 
		 int replyDelete(NoticeWritingVO vo);   // 댓글 삭제		 
	

}
