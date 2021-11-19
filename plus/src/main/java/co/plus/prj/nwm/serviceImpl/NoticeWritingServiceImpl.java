package co.plus.prj.nwm.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.nwm.mapper.NoticeWritingMapper;
import co.plus.prj.nwm.service.NoticeWritingService;
import co.plus.prj.nwm.vo.NoticeWritingVO;
import co.plus.prj.pnw.vo.PNWVO;

@Service
public class NoticeWritingServiceImpl implements NoticeWritingService {
	@Autowired
	private NoticeWritingMapper map;
	
	
	// 전체 메뉴
	@Override
	public List<NoticeWritingVO> myPost(NoticeWritingVO vo) {
		// 전체 메뉴 -> 내 게시물 목록
		return map.myPost(vo);
	}
	@Override
	public List<NoticeWritingVO> allTask(NoticeWritingVO vo) {
		// 전체 메뉴 -> 전체 업무
		return map.allTask(vo);
	}
	@Override
	public List<NoticeWritingVO> detailTaskList(NoticeWritingVO vo) {
		// 전체 업무 -> 프로젝트 내 업무 목록
		return map.detailTaskList(vo);
	}

	@Override
	public List<NoticeWritingVO> bookMarkList(NoticeWritingVO vo) {
		// 전체 메뉴 -> 북마크
		return map.bookMarkList(vo);
	}
	@Override
	public NoticeWritingVO bookMarkSelect(NoticeWritingVO vo) {
		// 북마크 -> 북마크 상세보기(팝업)
		return map.bookMarkSelect(vo);
	}
	
	// 팝업
	@Override
	public NoticeWritingVO myPostTxt(NoticeWritingVO vo) {			
		// 내 게시물 목록 -> 글 상세보기(팝업)
		return map.myPostTxt(vo);
	}
	@Override
	public NoticeWritingVO myPostTsk(NoticeWritingVO vo) {			
		// 내 게시물 목록 -> 업무 상세보기(팝업)
		return map.myPostTsk(vo);
	}
	@Override
	public NoticeWritingVO myPostSubtsk(NoticeWritingVO vo) {		
		//  내 게시물 목록 -> 하위업무 상세보기(팝업)
		return map.myPostSubtsk(vo);
	}
	@Override
	public NoticeWritingVO myPostSche(NoticeWritingVO vo) {		
		// 내 게시물 목록 -> 일정 상세보기(팝업)
		return map.myPostSche(vo);
	}
	@Override
	public List<NoticeWritingVO> myPostTodo(NoticeWritingVO vo) {		
		// 내 게시물 목록 -> 할일 상세보기(팝업)
		return map.myPostTodo(vo);
	}
	@Override public PNWVO prjColorMyPost(NoticeWritingVO vo) { 
		// 프로젝트 제목 -> 색 (팝업)
		return map.prjColorMyPost(vo);
	}
	
	 

}
