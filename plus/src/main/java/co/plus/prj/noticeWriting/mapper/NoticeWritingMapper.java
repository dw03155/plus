package co.plus.prj.noticeWriting.mapper;

import java.util.List;

import co.plus.prj.noticeWriting.vo.NoticeWritingVO;

public interface NoticeWritingMapper {

	List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo);		// 게시글 목록 조회
	
	NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo); 				// 게시글 글 상세보기
	NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo); 				// 게시글 업무 상세보기
	NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo); 				// 게시글 하위업무 상세보기
	NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo); 				// 게시글 일정 상세보기
	NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo); 				// 게시글 할일 상세보기
	
	 public int noticeCount(NoticeWritingVO vo); 									// 게시글 개수 표기
	
}
