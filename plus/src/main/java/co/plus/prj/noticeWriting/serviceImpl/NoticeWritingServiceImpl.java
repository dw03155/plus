package co.plus.prj.noticeWriting.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.plus.prj.noticeWriting.service.NoticeWritingMapper;
import co.plus.prj.noticeWriting.service.NoticeWritingService;
import co.plus.prj.noticeWriting.vo.NoticeWritingVO;

@Repository("nwDao")
public class NoticeWritingServiceImpl implements NoticeWritingService {
	@Autowired
	private NoticeWritingMapper map;
	

	@Override
	public List<NoticeWritingVO> noticeWritingSelectList(NoticeWritingVO vo) {		// 게시글 목록 조회
		return map.noticeWritingSelectList(vo);
	}


	@Override
	public NoticeWritingVO noticeWritingSelectTxt(NoticeWritingVO vo) {				// 글 상세보기
		return map.noticeWritingSelectTxt(vo);
	}

	@Override
	public NoticeWritingVO noticeWritingSelectTsk(NoticeWritingVO vo) {				// 업무 상세보기
		return map.noticeWritingSelectTsk(vo);
	}

	@Override
	public NoticeWritingVO noticeWritingSelectSubtsk(NoticeWritingVO vo) {			// 하위업무 상세보기
		return map.noticeWritingSelectSubtsk(vo);
	}

	@Override
	public NoticeWritingVO noticeWritingSelectSche(NoticeWritingVO vo) {			// 일정 상세보기
		return map.noticeWritingSelectSche(vo);
	}

	@Override
	public NoticeWritingVO noticeWritingSelectTodo(NoticeWritingVO vo) {			// 할일 상세보기
		return map.noticeWritingSelectTodo(vo);
	}
	
	@Override
	public int noticeCount(NoticeWritingVO vo) {									// 게시글 개수
		return map.noticeCount(vo);
	}






}
