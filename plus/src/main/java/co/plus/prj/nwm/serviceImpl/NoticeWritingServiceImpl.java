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
	
	
	// 전체 메뉴
	@Override
	public List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo) {
		// 전체 메뉴 -> 내 게시물 목록
		return map.noticeWritingSelectList(vo);
	}
	@Override
	public List<NoticeWritingVO> totalTask(NoticeWritingVO vo) {
		// 전체 메뉴 -> 전체 업무
		return map.totalTask(vo);
	}
	@Override
	public NoticeWritingVO taskSelect(NoticeWritingVO vo) {
		// 전체 업무 -> 업무 상세보기(팝업)
		return null;
	}
	@Override
	public List<NoticeWritingVO> totalSchedule(NoticeWritingVO vo) {
		// 전체 메뉴 -> 캘린더
		return map.totalSchedule(vo);
	}
	@Override
	public List<NoticeWritingVO> totalFile(NoticeWritingVO vo) {
		// 전체 메뉴 -> 파일
		return null;
	}
	@Override
	public NoticeWritingVO fileSelect(NoticeWritingVO vo) {
		// 파일 -> 파일 상세보기(팝업)
		return null;
	}
	@Override
	public List<NoticeWritingVO> bookMarkList(NoticeWritingVO vo) {
		// 전체 메뉴 -> 북마크
		return null;
	}
	@Override
	public NoticeWritingVO bookMarkSelect(NoticeWritingVO vo) {
		// 북마크 -> 북마크 상세보기(팝업)
		return null;
	}
	
	
	@Override
	public NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo) {			
		// 내 게시물 목록 -> 글 상세보기(팝업)
		return map.noticeWritingSelectTxt(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo) {			
		// 내 게시물 목록 -> 업무 상세보기(팝업)
		return map.noticeWritingSelectTsk(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo) {		
		//  내 게시물 목록 -> 하위업무 상세보기(팝업)
		return map.noticeWritingSelectSubtsk(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo) {		
		// 내 게시물 목록 -> 일정 상세보기(팝업)
		return map.noticeWritingSelectSche(vo);
	}
	@Override
	public NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo) {		
		// 내 게시물 목록 -> 할일 상세보기(팝업)
		return map.noticeWritingSelectTodo(vo);
	}
	
	@Override
	public int noticeCount(NoticeWritingVO vo) {								
		// 내 게시물 개수
		return map.noticeCount(vo);
	}
	

	 // 프로젝트 선택 후 메뉴
	@Override
	public List<NoticeWritingVO> totalNotice(NoticeWritingVO vo) {				
		// 프로젝트 선택 -> 홈 (게시물 목록 조회) 
		return map.totalNotice(vo);
	}
	
	@Override
	public NoticeWritingVO txtSelect(NoticeWritingVO vo) {
		// 글 자세히보기(아코디언)
		return null;
	}
	@Override
	public int insertTxt(NoticeWritingVO vo) {
		// 글 생성
		return 0;
	}
	@Override
	public int UpdateTxt(NoticeWritingVO vo) {
		// 글 수정
		return 0;
	}
	@Override
	public int DeleteTxt(NoticeWritingVO vo) {
		// 글 삭제
		return 0;
	}


	@Override
	public NoticeWritingVO tskList(NoticeWritingVO vo) {
		// 프로젝트 선택 후 -> 업무 (1개 프로젝트)
		return null;
	}
	@Override
	public NoticeWritingVO tskSelect(NoticeWritingVO vo) {
		// 업무 자세히보기(아코디언)
		return null;
	}
	@Override
	public int insertTsk(NoticeWritingVO vo) {
		// 업무 생성
		return 0;
	}
	@Override
	public int UpdateTsk(NoticeWritingVO vo) {
		// 업무 수정
		return 0;
	}
	@Override
	public int DeleteTsk(NoticeWritingVO vo) {
		// 업무 삭제
		return 0;
	}
	
	
	@Override
	public NoticeWritingVO scheList(NoticeWritingVO vo) {
		// 프로젝트 선택 후 -> 일정 (1개 프로젝트)
		return null;
	}
	@Override
	public NoticeWritingVO scheSelect(NoticeWritingVO vo) {
		// 일정 자세히보기(아코디언)
		return null;
	}
	@Override
	public int insertSche(NoticeWritingVO vo) {
		// 일정 생성
		return 0;
	}
	@Override
	public int UpdateSche(NoticeWritingVO vo) {
		// 일정 수정
		return 0;
	}
	@Override
	public int DeleteSche(NoticeWritingVO vo) {
		// 일정 삭제
		return 0;
	}


	@Override
	public NoticeWritingVO todoSelect(NoticeWritingVO vo) {
		// 할일 상세보기 (아코디언)
		return null;
	}
	@Override
	public int insertTodo(NoticeWritingVO vo) {
		// 할일 입력
		return 0;
	}
	@Override
	public int UpdateTodo(NoticeWritingVO vo) {
		// 할일 수정
		return 0;
	}
	@Override
	public int DeleteTodo(NoticeWritingVO vo) {
		// 할일 삭제
		return 0;
	}
	
	
	@Override
	public int replyInsert(NoticeWritingVO vo) {
		// 댓글 생성	
		return 0;
	}
	@Override
	public int replyUpdate(NoticeWritingVO vo) {
		// 댓글 수정
		return 0;
	}
	@Override
	public int replyDelete(NoticeWritingVO vo) {
		// 댓글 수정
		return 0;
	}

	
	


	






}
