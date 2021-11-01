package co.plus.prj.pnw.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.pnw.mapper.PNWMapper;
import co.plus.prj.pnw.service.PNWService;
import co.plus.prj.pnw.vo.PNWVO;

@Service
public class PNWServiceImpl implements PNWService {
	@Autowired
	private PNWMapper map;

	@Override
	public int prjInsert(PNWVO vo) { 			// 새 프로젝트
		return map.prjInsert(vo);
	}

	@Override
	public List<PNWVO> myProject() {	// 내 프로젝트
		return map.myProject();
	}

	@Override
	public List<PNWVO> openProject() {	// 회사 프로젝트
		return map.openProject();
	}

	@Override
	public List<PNWVO> prjFolder() {	// 프로젝트 폴더 메뉴
		return map.prjFolder();
	}

	@Override
	public int prjFoldInsert(PNWVO vo) {		// 프로젝트 폴더 생성
		return map.prjFoldInsert(vo);
	}

	@Override
	public int prjFoldUpdate(PNWVO vo) {		// 프로젝트 폴더 수정(폴더명)
		return map.prjFoldUpdate(vo);
	}

	@Override
	public int prjFoldDelete(PNWVO vo) {		// 프로젝트 폴더 삭제
		return map.prjFoldDelete(vo);
	}

	@Override
	public int prjUpdate(PNWVO vo) {			// 프로젝트 수정(프로젝트명, 색깔, 공개권한)
		return map.prjUpdate(vo);
	}

	@Override
	public int prjDelete(PNWVO vo) {			// 프로젝트 삭제
		return map.prjDelete(vo);
	}
	
	
	@Override
	public List<PNWVO> home() {					// 프로젝트 홈탭
		map.pnwList();			// 게시글 리스트
		map.partiList();		// 참여자 리스트
		return map.replyList();	// 댓글 리스트
	}

	@Override
	public List<PNWVO> tskList() {				// 프로젝트 업무탭
		return map.tskList();
	}

	@Override
	public List<PNWVO> scheList() {				// 프로젝트 일정탭
		return map.scheList();
	}

	@Override
	public List<PNWVO> fileList() {				// 프로젝트 파일탭
		return map.fileList();
	}

	@Override
	public int txtInsert(PNWVO vo) {			// 글 입력
		return map.txtInsert(vo);
	}

	@Override
	public int txtUpdate(PNWVO vo) {			// 글 생성
		return map.txtUpdate(vo);
	}

	@Override
	public int tskInsert(PNWVO vo) {			// 업무 생성
		return map.txtInsert(vo);
	}

	@Override
	public int tskUpdate(PNWVO vo) {			// 업무 수정
		return map.tskUpdate(vo);
	}

	@Override
	public int scheInsert(PNWVO vo) {			// 일정 생성
		return map.scheInsert(vo);
	}

	@Override
	public int scheUpdate(PNWVO vo) {			// 일정 수정
		return map.scheUpdate(vo);
	}

	@Override
	public int todoInsert(PNWVO vo) {			// 할일 생성
		return map.todoInsert(vo);
	}

	@Override
	public int todoUpdate(PNWVO vo) {			// 할일 수정
		return map.todoUpdate(vo);
	}

	@Override
	public int nwDelete(PNWVO vo) {				// 게시글 삭제
		return map.nwDelete(vo);
	}

	@Override
	public int replyInsert(PNWVO vo) {			// 댓글 생성
		return map.replyInsert(vo);
	}

	@Override
	public int replyUpdate(PNWVO vo) {			// 댓글 수정
		return map.replyUpdate(vo);
	}

	@Override
	public int replyDelete(PNWVO vo) {			// 댓글 삭제
		return map.replyDelete(vo);
	}

}
