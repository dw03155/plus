package co.plus.prj.nwm.mapper;

import java.util.List;

import co.plus.prj.nwm.vo.NoticeWritingVO;

public interface NoticeWritingMapper {

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
		 
		 List<NoticeWritingVO> bookMarkList(NoticeWritingVO vo);			// 전체 메뉴 -> 북마크
		 NoticeWritingVO bookMarkSelect(NoticeWritingVO vo);				// 북마크 -> 북마크 상세보기(팝업)
	 
}
