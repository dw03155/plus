package co.plus.prj.pnw.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public int prjInsert(PNWVO vo) { // 새 프로젝트
		map.prjInsert(vo);
		return map.prjPMInsert(vo);
	}
	
	@Override
	public List<PNWVO> ctgryList(PNWVO vo) { // 새 프로젝트 : 카테고리 목록가져오기
		return map.ctgryList(vo);
	}

	@Override
	public List<PNWVO> favorMyPrj(PNWVO vo) { // 내 프로젝트 (즐겨찾기)
		return map.favorMyPrj(vo);
	}

	@Override
	public List<PNWVO> noMyPrj(PNWVO vo) { // 내 프로젝트 (즐겨찾기X)
		return map.noMyPrj(vo); //
	}

	@Override
	public int prjFavorite(PNWVO vo) { // 즐겨찾기 추가
		return map.prjFavorite(vo);
	}
	
	@Override
	public int prjNoFavor(PNWVO vo) { // 즐겨찾기 삭제
		return map.prjNoFavor(vo);
	}
	
	@Override
	public int prjColorUpdate(PNWVO vo) { // 즐겨찾기 삭제
		return map.prjColorUpdate(vo);
	}
	
	@Override
	public int prjFolderSet(PNWVO vo) { // 폴더 설정
		return map.prjFolderSet(vo);
	}
	
	@Override
	public List<PNWVO> openProject(PNWVO vo) { // 전체 프로젝트
		return map.openProject(vo);
	}
	
	@Override
	public List<PNWVO> joinPrj(PNWVO vo) { // 즐겨찾기 (참여)
		return map.joinPrj(vo);
	}
	
	@Override
	public List<PNWVO> noJoinPrj(PNWVO vo) { // 즐겨찾기 (참여X)
		return map.noJoinPrj(vo);
	}
	
	@Override
	public List<PNWVO> allSchedule(PNWVO vo) { // 스케줄
		return map.allSchedule(vo);
	}
	
	@Override
	public List<PNWVO> folderMenu(PNWVO vo) { // 프로젝트 폴더 메뉴
		return map.folderMenu(vo);
	}

	@Override
	public List<PNWVO> prjFolder(PNWVO vo){ // 프로젝트 폴더 조회
		return map.prjFolder(vo);
	}

	@Override
	public int prjFoldInsert(PNWVO vo) { // 프로젝트 폴더 생성
		return map.prjFoldInsert(vo);
	}

	@Override
	public int prjFoldUpdate(PNWVO vo) { // 프로젝트 폴더 수정(폴더명)
		return map.prjFoldUpdate(vo);
	}

	@Override
	public int prjFoldDelete(PNWVO vo) { // 프로젝트 폴더 삭제
		return map.prjFoldDelete(vo);
	}

	@Override
	public int prjUpdate(PNWVO vo) { // 프로젝트 수정(프로젝트명, 색깔, 공개권한)
		return map.prjUpdate(vo);
	}

	@Override
	public int prjDelete(PNWVO vo) { // 프로젝트 삭제
		return map.prjDelete(vo);
	}

	@Override
	public PNWVO prjInfo(PNWVO vo) { // 프로젝트 홈탭 : 프로젝트 정보
		return map.prjInfo(vo);
	}
	
	@Override
	public List<PNWVO> allEmploys(PNWVO vo) { // 프로젝트 홈탭 : 참여자초대
		return map.allEmploys(vo);
	}
	
	@Override
	public List<PNWVO> prjTskCount(PNWVO vo) { // 프로젝트 홈탭 : 도넛차트
		return map.prjTskCount(vo);
	}

	@Override
	public List<PNWVO> prjHomePin(PNWVO vo) { // 프로젝트 홈탭 : 상단고정(핀셋) 목록
		return map.pnwPinList(vo);
	}

	@Override
	public List<PNWVO> prjHomeNW(PNWVO vo) { // 프로젝트 홈탭 : 게시글 목록
		return map.pnwAllList(vo);
	}

	@Override
	public int prjPartiCnt(PNWVO vo) { // 프로젝트 홈탭 : 전체 참여자 수
		return map.prjPartiCnt(vo); // 참여자 수
	}

	@Override
	public List<PNWVO> partiPM(PNWVO vo) { // 프로젝트 홈탭 : PM 목록
		return map.partiPM(vo);
	}

	@Override
	public List<PNWVO> partiUser(PNWVO vo) { // 프로젝트 홈탭 : User 목록
		return map.partiUser(vo);
	}

	@Override
	public List<PNWVO> partiGuest(PNWVO vo) { // 프로젝트 홈탭 : Guest 목록
		return map.partiGuest(vo);
	}

	@Override
	public List<PNWVO> prjPartiList(PNWVO vo) { // 프로젝트 홈탭 : 전체 참여자 수
		map.partiPM(vo); // PM 목록
		map.partiUser(vo); // User 목록
		return map.partiGuest(vo); // Guest 목록
	}

	@Override
	public Map<String, Object> prjHome(PNWVO vo) { // 프로젝트 홈탭
		Map<String, Object> result = new HashMap<>();
		result.put("prjInfo", map.prjInfo(vo));
		result.put("tskAllCnt",map.prjTskAllCount(vo));
		result.put("tskPrgsCnts", map.prjTskCount(vo));
		result.put("partiCnt", map.prjPartiCnt(vo));
		result.put("pincettes", map.pnwPinList(vo));
		result.put("nwLists", map.pnwAllList(vo));
		result.put("pms", map.partiPM(vo));
		result.put("users", map.partiUser(vo));
		result.put("guests", map.partiGuest(vo));
		result.put("particis", map.prjPartiList(vo));
		return result;
	}

	@Override
	public List<PNWVO> prjTsk(PNWVO vo) { // 프로젝트 업무탭
		map.tskPrgList(vo); // 업무 진행상태 목록
		return map.tskNWList(vo); // 업무 게시글 목록
	}

	@Override
	public List<PNWVO> prjSche(PNWVO vo) { // 프로젝트 일정탭
		return map.scheList(vo); // 일정 게시글 목록
	}

	@Override
	public PNWVO txtNW(PNWVO vo) { // 프로젝트 홈탭 : 글 상세보기
		return map.txtNW(vo); 
	}
	
	@Override
	public PNWVO tskNW(PNWVO vo) { // 프로젝트 홈탭 : 업무 상세보기
		return map.tskNW(vo); 
	}
	
	@Override
	public PNWVO subtskNW(PNWVO vo) { // 프로젝트 홈탭 : 하위업무 상세보기
		return map.subtskNW(vo); 
	}
	
	@Override
	public PNWVO scheNW(PNWVO vo) {	// 프로젝트 홈탭 : 일정 상세보기
		return map.scheNW(vo); 
	}
	
	@Override
	public List<PNWVO> TodoNW(PNWVO vo){ // 프로젝트 홈탭 : 할일 상세보기
		return map.TodoNW(vo); 
	}
	
	
	@Override
	public int txtInsert(PNWVO vo) { // 글 입력
		return map.txtInsert(vo);
	}

	@Override
	public int txtUpdate(PNWVO vo) { // 글 생성
		return map.txtUpdate(vo);
	}

	@Override
	public int tskInsert(PNWVO vo) { // 업무 생성
		return map.txtInsert(vo);
	}

	@Override
	public int tskUpdate(PNWVO vo) { // 업무 수정
		return map.tskUpdate(vo);
	}

	@Override
	public int scheInsert(PNWVO vo) { // 일정 생성
		return map.scheInsert(vo);
	}

	@Override
	public int scheUpdate(PNWVO vo) { // 일정 수정
		return map.scheUpdate(vo);
	}

	@Override
	public int todoInsert(PNWVO vo) { // 할일 생성
		return map.todoInsert(vo);
	}

	@Override
	public int todoUpdate(PNWVO vo) { // 할일 수정
		return map.todoUpdate(vo);
	}

	@Override
	public int nwDelete(PNWVO vo) { // 게시글 삭제
		return map.nwDelete(vo);
	}

}
