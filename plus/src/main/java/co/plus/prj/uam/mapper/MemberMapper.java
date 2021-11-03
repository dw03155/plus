package co.plus.prj.uam.mapper;

import java.util.List;


import co.plus.prj.uam.vo.MemberVO;

public interface MemberMapper {
	
	//회원가입 mapper
	//전체목록
	public List<MemberVO> getMemberList();
	//새로운 회사 입력
	public int newCompanyInsert1(MemberVO member);
	public int newCompanyInsert2(MemberVO member);
	//기존 회사 입력
	public int exCompanyInsert(MemberVO member);
	
	//회사mapper
	//회사url로 단일회사정보 가져오기
	public MemberVO getCompany(MemberVO vo);
		
	//로그인
	//회원 로그인 체크
	public MemberVO memberLogin(MemberVO vo);
	public int loginStUpdate(MemberVO vo);
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
	
	//탈퇴
	public int memberDelete(MemberVO vo);
	
	//회사 정보 수정
	public int companyNameUpdate(MemberVO vo);


	
}
