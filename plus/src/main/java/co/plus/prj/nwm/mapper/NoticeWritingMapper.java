package co.plus.prj.nwm.mapper;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;

public interface NoticeWritingMapper {

	List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo);		// 내 게시뮬 메뉴
	
	NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo); 			// 내 게시물 글 상세보기
	NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo); 			// 내 게시글 업무 상세보기
	NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo); 			// 내 게시글 하위업무 상세보기
	NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo); 			// 내 게시글 일정 상세보기
	NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo); 			// 내 게시글 할일 상세보기
	
	 public int noticeCount(NoticeWritingVO vo); 							// 내 게시물 개수 
	
	 List<NoticeWritingVO> totalNotice(NoticeWritingVO vo);					// (임시) 전체 게시물 목록조회

}
