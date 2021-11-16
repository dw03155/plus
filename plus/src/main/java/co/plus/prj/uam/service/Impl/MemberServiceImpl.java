package co.plus.prj.uam.service.Impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.pnw.vo.PNWVO;
import co.plus.prj.uam.mapper.MemberMapper;
import co.plus.prj.uam.service.MemberService;
import co.plus.prj.uam.vo.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberMapper map;
	
														//회원가입
	// 새 회원입력
	@Override
	public int newCompanyInsert(MemberVO member) {
		map.newCompanyInsert1(member);
		map.newCompanyInsert2(member);
		return map.newCompanyInsert3(member);
	}
	// 메일 중복 테스트
	@Override
	public MemberVO getMailCheck(MemberVO vo) {
		return map.getMailCheck(vo);
	}
	// 기존회사 입력
	@Override
	public int exCompanyInsert(MemberVO member) {
		map.exCompanyInsert1(member);
		return map.exCompanyInsert2(member);
	}
	@Override
	public int guestInsert(MemberVO member) {
		map.guestInsert2(member);
		return map.guestInsert(member);
	}
	// 회사Url
	@Override
	public MemberVO getCompany(MemberVO vo) {
		return map.getCompany(vo);
	}
	//엑셀가입 회원 정보
	@Override
	public MemberVO getUserMailCheck(MemberVO vo) {
		return map.getUserMailCheck(vo);
	}
	// 엑셀가입 비밀번호 업데이트
	@Override
	public int userPwdUpdate(MemberVO vo) {
		return map.userPwdUpdate(vo);
	}

														//로그인
	//로그인시 회원 정보 업데이트
	@Override
	public MemberVO loginStUpdate(MemberVO vo) {
		MemberVO vo2 = map.memberLogin(vo);
		if(vo2 != null) {			
			map.loginStUpdate(vo2);
		}
		return vo2;
	}
	// 로그아웃시 회원상태 오프라인으로 바꿔줌
	@Override
	public int loginoutStUpdate(MemberVO vo) {
		return map.loginoutStUpdate(vo);
	}

														//회원정보 수정
	// 회원정보 가져오기
	@Override
	public MemberVO memberInfo(MemberVO vo) {
		return map.memberInfo(vo);
	}
	// 회사로고 가져오기
	@Override
	public MemberVO getLogo(MemberVO vo) {
		return map.getLogo(vo);
	}
	

	// 회원 이름 수정
	@Override
	public int nameUpdate(MemberVO vo) {
		return map.nameUpdate(vo);
	}

	// 회원 직위 수정
	@Override
	public int wkpoUpdate(MemberVO vo) {
		return map.wkpoUpdate(vo);
	}

	// 회원 전화번호 수정
	@Override
	public int persTelUpdate(MemberVO vo) {
		return map.persTelUpdate(vo);
	}

	// 회원 회사번호 수정
	@Override
	public int coTelUpdate(MemberVO vo) {
		return map.coTelUpdate(vo);
	}

	// 회원 부서 수정
	@Override
	public int deptUpdate(MemberVO vo) {
		return map.deptUpdate(vo);
	}

	// 회원 비밀번호 수정
	@Override
	public int pwdUpdate(MemberVO vo) {
		return map.pwdUpdate(vo);
	}
	// 회원이미지 수정
	@Override
	public int memberImgUpdate(MemberVO vo) {
		return map.memberImgUpdate(vo);
	}
	// 회원이미지 가져오기
	@Override
	public MemberVO getMemberImg(MemberVO vo) {
		return map.getMemberImg(vo);
	}
	

														//회원상태 변경
	// 회원 현재 상태
	@Override
	public MemberVO memberStatus(MemberVO vo) {
		return map.memberStatus(vo);
	}
	
	// 온라인
	@Override
	public int memberOnline(MemberVO vo) {
		return map.memberOnline(vo);
	}

	// 다른용무
	@Override
	public int memberOther(MemberVO vo) {
		return map.memberOther(vo);
	}

	// 자리비움
	@Override
	public int memberNotdesk(MemberVO vo) {
		return map.memberNotdesk(vo);
	}

	// 오프라인
	@Override
	public int memberOffline(MemberVO vo) {
		return map.memberOffline(vo);
	}
														// 회원탈퇴
	@Override
	public int memberDelete(MemberVO member) {
		return map.memberDelete(member);
	}
														//회원정보 수정
	//회사이름 수정
	@Override
	public int companyNameUpdate(MemberVO vo) {
		return map.companyNameUpdate(vo);
	}

	// 회사로고 수정
	@Override
	public int companyLogoUpdate(MemberVO vo) {
		return map.companyLogoUpdate(vo);
	}

														// 사용자관리
	// 정상 사용자 조회
	@Override
	public List<MemberVO> getUsingMemberList(MemberVO vo) {
		return map.getUsingMemberList(vo);
	}
	// 정상사용자 삭제
	@Override
	public int usingOut(MemberVO vo) {
		return map.usingOut(vo);
	}
	// 관리자 사용자로 변경
	@Override
	public int adminDel(MemberVO vo) {
		return map.adminDel(vo);
	}
	// 사용자 관리자로 변경
	@Override
	public int userDel(MemberVO vo) {
		return map.userDel(vo);
	}
	
	
	// 사용중지 사용자 조회
	@Override
	public List<MemberVO> getNotusedMemberList(MemberVO vo) {
		return map.getNotusedMemberList(vo);
	}
	
	// 가입대기 사용자
	@Override
	public List<MemberVO> getOutstandMemberList(MemberVO vo) {
		return map.getOutstandMemberList(vo);
	}
	// 가입대기 사용자 승인
	@Override
	public int outstandIn(MemberVO vo) {
		return map.outstandIn(vo);
	}
	// 가입대기 사용자 거절
	@Override
	public int outstandOut(MemberVO vo) {
		return map.outstandOut(vo);
	}
	
	// 게스트
	@Override
	public List<MemberVO> getGuestMemberList(MemberVO vo) {
		return map.getGuestMemberList(vo);
	}
	// 게스트 사용자 승인
	@Override
	public int guestIn(MemberVO vo) {
		return map.guestIn(vo);
	}
	// 게스트 사용자 삭제
	@Override
	public int guestOut(MemberVO vo) {
		return map.guestOut(vo);
	}
														//회사프로젝트 관리
	//회사프로젝트 목록
	@Override
	public List<MemberVO> getCoPrjList(MemberVO vo) {
		return map.getCoPrjList(vo);
	}
	// 회사 프로젝트 상세정보
	@Override
	public List<MemberVO> getCoPrjInfo(MemberVO vo) {
		return map.getCoPrjInfo(vo);
	}
	// pm해제
	@Override
	public int coPrjPMChange(MemberVO vo) {
		return map.coPrjPMChange(vo);
	}
	// pm검색 
	@Override
	public List<MemberVO> prjUserList(MemberVO vo) {
		return map.prjUserList(vo);
	}
	// pm지정
	@Override
	public int coPrjUserChange(MemberVO vo) {
		return map.coPrjUserChange(vo);
	}
	// 회사프로젝트명 수정
	@Override
	public int prjNameUpdate(MemberVO vo) {
		return map.prjNameUpdate(vo);
	}
	
														// 사용자 일괄 등록
	// 사용자 일괄 등록
	@Override
	public int AllMemberInsert2(MemberVO vo) {
		map.AllMemberInsert1(vo);
		return map.AllMemberInsert2(vo);
	}
														//카테고리
	// 공개 카테고리 조회
	@Override
	public List<MemberVO> getCategoryList(MemberVO vo) {
		return map.getCategoryList(vo);
	}
	// 공개 카테고리 삭제
	@Override
	public int prjCategoryUpdate(MemberVO vo) {
		map.prjCategoryDelete(vo);
		return map.prjCategoryUpdate(vo);
	}
	// 카테고리 추가
	@Override
	public int categoryInsert(MemberVO vo) {
		return map.categoryInsert(vo);
	}
	
														//파일리스트
	// 게시글, 업무, 하위업무 파일 리스트
	@Override
	public List<PNWVO> taskFileList(PNWVO vo) {
		return map.taskFileList(vo);
	}
	@Override
	public List<PNWVO> textFileList(PNWVO vo) {
		return map.textFileList(vo);
	}
	@Override
	public List<PNWVO> subTaskFileList(PNWVO vo) {
		return map.subTaskFileList(vo);
	}
	
	
	
	

	

	
	
	
	
	
	




}
