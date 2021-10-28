package co.plus.prj.uam.mapper;

import java.util.List;

import co.plus.prj.uam.vo.MemberVO;

public interface MemberMapper {
	//전체목록
	public List<MemberVO> getMemberList();
	//1명 조회
	public MemberVO getMember(MemberVO member);
	// 회원로그인(+상태업데이트)
	public MemberVO login1(MemberVO member);
	public MemberVO login2(MemberVO member);
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
	
}
