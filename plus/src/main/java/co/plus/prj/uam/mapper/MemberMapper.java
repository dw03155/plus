package co.plus.prj.uam.mapper;

import java.util.List;


import co.plus.prj.uam.vo.MemberVO;

public interface MemberMapper {
	
	//회원가입 mapper
	//전체목록
	public List<MemberVO> getMemberList();
	//1명 조회
	public MemberVO getMember(MemberVO member);
	//새로운 회사 입력
	public int newCompanyInsert1(MemberVO member);
	public int newCompanyInsert2(MemberVO member);
	//기존 회사 입력
	public int exCompanyInsert(MemberVO member);
	//수정
	public int memberUpdate(MemberVO member);
	//삭제
	public int memberDelete(MemberVO member);
	
	
	//회사mapper
	//회사url로 단일회사정보 가져오기
	public MemberVO getCompany(MemberVO vo);

		
	//로그인
	//회원 로그인 체크
	public MemberVO memberLogin(MemberVO vo);
	public int loginStUpdate(MemberVO vo);
	//로그아웃
	public MemberVO loginoutStUpdate(MemberVO vo);


	
}
