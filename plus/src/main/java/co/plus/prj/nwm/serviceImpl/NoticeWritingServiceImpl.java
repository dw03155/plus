package co.plus.prj.nwm.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.nwm.mapper.NoticeWritingMapper;
import co.plus.prj.nwm.service.NoticeWritingService;
import co.plus.prj.nwm.vo.NoticeWritingVO;

@Service("nwDao")
public class NoticeWritingServiceImpl implements NoticeWritingService {
	@Autowired
	private NoticeWritingMapper map;
	

	@Override
	public List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo) {
		// 내 게시물 메뉴
		return map.noticeWritingSelectList(vo);
	}


	@Override
	public NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo) {			
		// 내 게시물 상세보기
		return map.noticeWritingSelectTxt(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo) {			
		// 내 게시물 업무 상세보기
		return map.noticeWritingSelectTsk(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo) {		
		// 내 게시물 하위업무 상세보기
		return map.noticeWritingSelectSubtsk(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo) {		
		// 내 게시물 일정 상세보기
		return map.noticeWritingSelectSche(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo) {		
		// 내 게시물 할일 상세보기
		return map.noticeWritingSelectTodo(vo);
	}
	@Override
	public int noticeCount(NoticeWritingVO vo) {								
		// 내 게시물 개수
		return map.noticeCount(vo);
	}
	
	
	@Override
	public List<NoticeWritingVO> totalNotice(NoticeWritingVO vo) {				
		// 전체 게시물 목록
		return map.totalNotice(vo);
	}


	@Override
	public NoticeWritingVO txtSelect(NoticeWritingVO vo) {
		// 글 자세히보기(아코디언)
		return null;
	}
	@Override
	public NoticeWritingVO insertTxt(NoticeWritingVO vo) {
		// 글 입력
		return null;
	}
	@Override
	public NoticeWritingVO UpdateTxt(NoticeWritingVO vo) {
		// 글 입력
		return null;
	}
	@Override
	public NoticeWritingVO DeleteTxt(NoticeWritingVO vo) {
		// 글 삭제
		return null;
	}


	@Override
	public NoticeWritingVO tskSelect(NoticeWritingVO vo) {
		// 업무 자세히보기(아코디언)
		return null;
	}
	@Override
	public NoticeWritingVO insertTsk(NoticeWritingVO vo) {
		// 업무 입력
		return null;
	}
	@Override
	public NoticeWritingVO UpdateTsk(NoticeWritingVO vo) {
		// 업무 수정
		return null;
	}
	@Override
	public NoticeWritingVO DeleteTsk(NoticeWritingVO vo) {
		// 업무 삭제
		return null;
	}
	
	
	@Override
	public NoticeWritingVO scheSelect(NoticeWritingVO vo) {
		// 일정 자세히보기(아코디언)
		return null;
	}
	@Override
	public NoticeWritingVO insertSche(NoticeWritingVO vo) {
		// 일정 입력
		return null;
	}
	@Override
	public NoticeWritingVO UpdateSche(NoticeWritingVO vo) {
		// 일정 수정
		return null;
	}
	@Override
	public NoticeWritingVO DeleteSche(NoticeWritingVO vo) {
		// 일정 삭제
		return null;
	}


	@Override
	public NoticeWritingVO todoSelect(NoticeWritingVO vo) {
		// 할일 상세보기 (아코디언)
		return null;
	}
	@Override
	public NoticeWritingVO insertTodo(NoticeWritingVO vo) {
		// 할일 입력
		return null;
	}
	@Override
	public NoticeWritingVO UpdateTodo(NoticeWritingVO vo) {
		// 할일 수정
		return null;
	}
	@Override
	public NoticeWritingVO DeleteTodo(NoticeWritingVO vo) {
		// 할일 삭제
		return null;
	}


	@Override
	public List<NoticeWritingVO> totalTask(NoticeWritingVO vo) {
		// 전체 업무 메뉴
		return map.totalTask(vo);
	}
	@Override
	public NoticeWritingVO taskSelect(NoticeWritingVO vo) {
		// 업무 상세보기 (팝업)
		return null;
	}
	
	
	@Override
	public List<NoticeWritingVO> scheSelectList(NoticeWritingVO vo) {
		// 전체 일정 메뉴
		return null;
	}
	@Override
	public NoticeWritingVO scheduleSelect(NoticeWritingVO vo) {
		// 일정 상세보기 (팝업)
		return null;
	}


	@Override
	public List<NoticeWritingVO> bookMarkSelectList(NoticeWritingVO vo) {
		// 북마크 메뉴
		return null;
	}
	@Override
	public NoticeWritingVO bookMarkSelect(NoticeWritingVO vo) {
		// 북마크 상세보기 (팝업)
		return null;
	}


	@Override
	public List<NoticeWritingVO> totalSchedule(NoticeWritingVO vo) {
		// 전체 일정 메뉴
		return null;
	}






}
