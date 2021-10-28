package co.plus.prj.nwm.mapper;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;

public interface NoticeWritingMapper {

	List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo);		// 내 게시뮬 메뉴
	
	// 상세보기 팝업
	NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo); 			// 내 게시물 글 상세보기
	NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo); 			// 내 게시글 업무 상세보기
	NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo); 			// 내 게시글 하위업무 상세보기
	NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo); 			// 내 게시글 일정 상세보기
	NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo); 			// 내 게시글 할일 상세보기
	
	 public int noticeCount(NoticeWritingVO vo); 							// 내 게시물 개수 
	
	 List<NoticeWritingVO> totalNotice(NoticeWritingVO vo);					// (임시) 전체 게시물 목록조회
	 
	 // 글 자세히 보기 (아코디언)
	 NoticeWritingVO txtSelect(NoticeWritingVO vo);    	// 글 자세히보기(펼침)
	 NoticeWritingVO insertTxt(NoticeWritingVO vo);		// 글 입력
	 NoticeWritingVO UpdateTxt(NoticeWritingVO vo);		// 글 입력
	 NoticeWritingVO DeleteTxt(NoticeWritingVO vo);		// 글 삭제
	 
	 // 업무 자세히 보기 (아코디언)
	 NoticeWritingVO tskSelect(NoticeWritingVO vo);		// 업무 자세히보기(펼침)
	 NoticeWritingVO insertTsk(NoticeWritingVO vo);		// 업무 입력
	 NoticeWritingVO UpdateTsk(NoticeWritingVO vo);		// 업무 수정
	 NoticeWritingVO DeleteTsk(NoticeWritingVO vo);		// 업무 삭제
	 
	 // 일정 자세히 보기 (아코디언)
	 NoticeWritingVO scheSelect(NoticeWritingVO vo);		// 일정 자세히보기(펼침)
	 NoticeWritingVO insertSche(NoticeWritingVO vo);		// 일정 입력
	 NoticeWritingVO UpdateSche(NoticeWritingVO vo);		// 일정 수정
	 NoticeWritingVO DeleteSche(NoticeWritingVO vo);		// 일정 삭제
	 
	 // 할일 자세히 보기 (아코디언)
	 NoticeWritingVO todoSelect(NoticeWritingVO vo);		// 할일 자세히보기(펼침)
	 NoticeWritingVO insertTodo(NoticeWritingVO vo);		// 할일 입력
	 NoticeWritingVO UpdateTodo(NoticeWritingVO vo);		// 할일 수정
	 NoticeWritingVO DeleteTodo(NoticeWritingVO vo);		// 할일 삭제
	 
	 
}
