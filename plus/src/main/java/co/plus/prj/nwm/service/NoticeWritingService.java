package co.plus.prj.nwm.service;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;

public interface NoticeWritingService {
	
	// 내 게시물 메뉴
	List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo);		
	
	NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo); 		// 내 게시글 글 상세보기
	NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo); 		// 내 게시글 업무 상세보기
	NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo); 		// 내 게시글 하위업무 상세보기
	NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo); 		// 내 게시글 일정 상세보기
	NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo); 		// 내 게시글 할일 상세보기
										
	 public int noticeCount(NoticeWritingVO vo);						// 내 게시글 개수 
	 
	 List<NoticeWritingVO> totalNotice(NoticeWritingVO vo);				// 전체 게시물 목록조회
	 
	 List<NoticeWritingVO> totalTask(NoticeWritingVO vo); 			// 전체 업무 메뉴
	 NoticeWritingVO taskSelect(NoticeWritingVO vo);					// 업무 상세조회 (팝업)
	 
	 // 캘린더 메뉴
	 List<NoticeWritingVO> totalSchedule(NoticeWritingVO vo);			// 전제 일정 조회
	 
	 // 파일함 메뉴
	 List<NoticeWritingVO> scheSelectList(NoticeWritingVO vo); 			// 전체 파일 조회
	 NoticeWritingVO scheduleSelect(NoticeWritingVO vo);				// 파일 상세 조회 (팝업)
	 
	 // 북마크 메뉴
	 List<NoticeWritingVO> bookMarkSelectList(NoticeWritingVO vo);		// 전체 프로젝트의 북마크한 게시물 조회
	 NoticeWritingVO bookMarkSelect(NoticeWritingVO vo);				// 북마크 상세보기 (팝업)
	 
	 // 프로젝트 상세보기 메뉴
	 	// 글 자세히 보기 (아코디언)
		 NoticeWritingVO txtSelect(NoticeWritingVO vo);    	// 글 자세히보기(아코디언)
		 NoticeWritingVO insertTxt(NoticeWritingVO vo);		// 글 입력
		 NoticeWritingVO UpdateTxt(NoticeWritingVO vo);		// 글 수정
		 NoticeWritingVO DeleteTxt(NoticeWritingVO vo);		// 글 삭제
		 
		 // 업무 자세히 보기 (아코디언)
		 NoticeWritingVO tskSelect(NoticeWritingVO vo);		// 업무 자세히보기(아코디언)
		 NoticeWritingVO insertTsk(NoticeWritingVO vo);		// 업무 입력
		 NoticeWritingVO UpdateTsk(NoticeWritingVO vo);		// 업무 수정
		 NoticeWritingVO DeleteTsk(NoticeWritingVO vo);		// 업무 삭제
		 
		 // 일정 자세히 보기 (아코디언)
		 NoticeWritingVO scheSelect(NoticeWritingVO vo);		// 일정 자세히보기(아코디언)
		 NoticeWritingVO insertSche(NoticeWritingVO vo);		// 일정 입력
		 NoticeWritingVO UpdateSche(NoticeWritingVO vo);		// 일정 수정
		 NoticeWritingVO DeleteSche(NoticeWritingVO vo);		// 일정 삭제
		 
		 // 할일 자세히 보기 (아코디언)
		 NoticeWritingVO todoSelect(NoticeWritingVO vo);		// 할일 자세히보기(아코디언)
		 NoticeWritingVO insertTodo(NoticeWritingVO vo);		// 할일 입력
		 NoticeWritingVO UpdateTodo(NoticeWritingVO vo);		// 할일 수정
		 NoticeWritingVO DeleteTodo(NoticeWritingVO vo);		// 할일 삭제
		 
	

}
