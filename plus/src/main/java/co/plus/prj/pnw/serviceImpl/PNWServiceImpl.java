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
	public int cPrjInsert(PNWVO vo) { 			// 새 프로젝트(회사)
		return map.cPrjInsert(vo);
	}
	
	@Override
	public int nPrjInsert(PNWVO vo) { 			// 새 프로젝트(일반)
		return map.nPrjInsert(vo);
	}
	
	@Override
	public List<PNWVO> favorMyPrj(PNWVO vo) {	// 내 프로젝트 (즐겨찾기)
		return map.favorMyPrj(vo);
	}
	
	@Override
	public List<PNWVO> noMyPrj(PNWVO vo) {		// 내 프로젝트 (즐겨찾기X)
		return map.noMyPrj(vo);	//
	}

	@Override
	public List<PNWVO> openProject(PNWVO vo) {	// 회사 프로젝트
		return map.openProject(vo);
	}

	@Override
	public List<PNWVO> prjFolder(PNWVO vo) {	// 프로젝트 폴더 메뉴
		return map.prjFolder(vo);
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
	public String prjInfo(PNWVO vo) {			// 프로젝트 홈탭 : 프로젝트 정보
		return map.prjInfo(vo);
	}
	
	@Override
	public List<PNWVO> prjHomePin(PNWVO vo) {	// 프로젝트 홈탭 : 상단고정(핀셋) 목록
		return map.pnwPinList(vo);
	}
	
	@Override
	public List<PNWVO> prjHomeNW(PNWVO vo) {	// 프로젝트 홈탭 : 게시글 목록
		return map.pnwAllList(vo);
	}
	
	@Override
	public List<PNWVO> prjPartiList(PNWVO vo) {	// 프로젝트 홈탭 : 참여자 목록
		map.partiPM(vo);			// 참여자 목록(PM)
		map.partiUser(vo);			// 참여자 목록(User)
		return map.partiGuest(vo);	// 참여자 목록(Guest)
	}
	
	@Override
	public List<PNWVO> partiPM(PNWVO vo) {		// 프로젝트 홈탭 : PM 목록
		return map.partiPM(vo);
	}
	@Override
	public List<PNWVO> partiUser(PNWVO vo) {	// 프로젝트 홈탭 : User 목록
		return map.partiUser(vo);
	}
	@Override
	public List<PNWVO> partiGuest(PNWVO vo) {	// 프로젝트 홈탭 : Guest 목록
		return map.partiGuest(vo);
	}
	@Override
	public List<PNWVO> prjTsk(PNWVO vo) {				// 프로젝트 업무탭
		map.tskPrgList(vo);			// 업무 진행상태 목록
		return map.tskNWList(vo);	// 업무 게시글 목록
	}

	@Override
	public List<PNWVO> prjSche(PNWVO vo) {				// 프로젝트 일정탭
		return map.scheList(vo);	// 일정 게시글 목록
	}

	@Override
	public List<PNWVO> prjFile(PNWVO vo) {				// 프로젝트 파일탭
		return map.fileList(vo);
	}

	@Override	
	public int txtInsert(PNWVO vo) {					// 글 입력
		return map.txtInsert(vo);
	}

	@Override
	public int txtUpdate(PNWVO vo) {					// 글 생성
		return map.txtUpdate(vo);
	}

	@Override
	public int tskInsert(PNWVO vo) {					// 업무 생성
		return map.txtInsert(vo);
	}

	@Override	
	public int tskUpdate(PNWVO vo) {					// 업무 수정
		return map.tskUpdate(vo);
	}

	@Override
	public int scheInsert(PNWVO vo) {					// 일정 생성
		return map.scheInsert(vo);
	}

	@Override	
	public int scheUpdate(PNWVO vo) {					// 일정 수정
		return map.scheUpdate(vo);
	}

	@Override
	public int todoInsert(PNWVO vo) {					// 할일 생성
		return map.todoInsert(vo);
	}

	@Override
	public int todoUpdate(PNWVO vo) {					// 할일 수정
		return map.todoUpdate(vo);
	}

	@Override
	public int nwDelete(PNWVO vo) {						// 게시글 삭제
		return map.nwDelete(vo);
	}

	@Override	
	public int replyInsert(PNWVO vo) {					// 댓글 생성
		return map.replyInsert(vo);
	}

	@Override
	public int replyUpdate(PNWVO vo) {					// 댓글 수정
		return map.replyUpdate(vo);
	}

	@Override
	public int replyDelete(PNWVO vo) {					// 댓글 삭제
		return map.replyDelete(vo);
	}

}
