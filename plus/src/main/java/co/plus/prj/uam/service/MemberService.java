package co.plus.prj.uam.service;

import java.util.List;

import co.plus.prj.uam.vo.MemberVO;

public interface MemberService {
	// 회원전체목록
	public List<MemberVO> getMembetList();
	// 회원 1명 조회
	public MemberVO getMember(MemberVO member);
	// 회원로그인
	public MemberVO login(MemberVO memvber);
	// 새로운 회사 입력
	public int newCompanyInsert(MemberVO member);
	// 기존 회사 입력
	public int exCompanyInsert(MemberVO member);
	// 회원수정
	public int memberUpdate(MemberVO member);
	// 회원삭제
	public int memberDelete(MemberVO member);
	
	//회사service
	//회사url로 단일회사정보 가져오기
	public MemberVO getCompany(MemberVO vo);  
}
