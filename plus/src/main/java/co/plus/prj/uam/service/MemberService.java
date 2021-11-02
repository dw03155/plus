package co.plus.prj.uam.service;

import java.util.List;


import co.plus.prj.uam.vo.MemberVO;

public interface MemberService {
	
	//회원가입 service
	// 회원전체목록
	public List<MemberVO> getMembetList();
	// 새로운 회사 입력
	public int newCompanyInsert(MemberVO member);
	// 기존 회사 입력
	public int exCompanyInsert(MemberVO member);
	// 회원삭제
	public int memberDelete(MemberVO member);
	
	//회사service
	//회사url로 단일회사정보 가져오기
	public MemberVO getCompany(MemberVO vo);  
	
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

}
