package co.plus.prj.uam.service;

import java.util.List;

import co.plus.prj.pnw.vo.PNWVO;
import co.plus.prj.uam.vo.MemberVO;

public interface MemberService {
	
	//회원가입 service
	// 새로운 회사 입력
	public int newCompanyInsert(MemberVO member);
	// 기존 회사 입력
	public int exCompanyInsert(MemberVO member);
	//게스트 가입
	public int guestInsert(MemberVO member);
	
	//회사service
	//회사url로 단일회사정보 가져오기
	public MemberVO getCompany(MemberVO vo);
	public MemberVO getMailCheck(MemberVO vo); 
	
	//로그인
	//회원 로그인 체크
	public MemberVO loginStUpdate(MemberVO vo);
	//로그아웃
	public int loginoutStUpdate(MemberVO vo);
	
	//회원정보 수정
	//회원정보가져오기
	public MemberVO memberInfo(MemberVO vo);
	public int nameUpdate(MemberVO vo);
	public int wkpoUpdate(MemberVO vo);
	public int persTelUpdate(MemberVO vo);
	public int coTelUpdate(MemberVO vo);
	public int deptUpdate(MemberVO vo);
	public int pwdUpdate(MemberVO vo);
	
	//회원상태 변경
	public MemberVO memberStatus(MemberVO vo);
	public int memberOnline(MemberVO vo);
	public int memberOther(MemberVO vo);
	public int memberNotdesk(MemberVO vo);
	public int memberOffline(MemberVO vo);
	
	//회사 로고 가져오기
	public MemberVO getLogo(MemberVO vo);
	
	//탈퇴
	public int memberDelete(MemberVO vo);
	
	//회사 정보 수정
	public int companyNameUpdate(MemberVO vo);
	public int companyLogoUpdate(MemberVO vo);

	// 사용자 관리
	public List<MemberVO> getUsingMemberList(MemberVO vo);
	public List<MemberVO> getNotusedMemberList(MemberVO vo);
	public List<MemberVO> getOutstandMemberList(MemberVO vo);
	public List<MemberVO> getGuestMemberList(MemberVO vo);
	public List<MemberVO> getCategoryList(MemberVO vo);
	//사용자 승인/거절
	public int outstandIn(MemberVO vo);
	public int outstandOut(MemberVO vo);
	//게스트 사용자 승인/거절
	public int guestIn(MemberVO vo);
	public int guestOut(MemberVO vo);
	//정상사용자 삭제
	public int usingOut(MemberVO vo);
	//관리자 해제
	public int adminDel(MemberVO vo);
	//관리자 지정
	public int userDel(MemberVO vo);
	
	//사용자 일괄 등록
	public int AllMemberInsert1(MemberVO vo);
	public int AllMemberInsert2(MemberVO vo);
	
	//회사프로젝트list
	public List<MemberVO> getCoPrjList(MemberVO vo);
	//회사프로젝트 상세정보
	public List<MemberVO> getCoPrjInfo(MemberVO vo);
	//pm해제
	public int coPrjPMChange(MemberVO vo);
	//pm검색
	public List<MemberVO> prjUserList(MemberVO vo);
	//pm지정
	public int coPrjUserChange(MemberVO vo);

	//카테고리 삭제
	public int prjCategoryUpdate(MemberVO vo);
	//카테고리 추가
	public int categoryInsert(MemberVO vo);
	
	//파일 리스트
	public List<PNWVO> textFileList(PNWVO vo);
	public List<PNWVO> subTaskFileList(PNWVO vo);
	public List<PNWVO> taskFileList(PNWVO vo);
}
