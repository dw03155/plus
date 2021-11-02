package co.plus.prj.uam.service.Impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.uam.mapper.MemberMapper;
import co.plus.prj.uam.service.MemberService;
import co.plus.prj.uam.vo.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberMapper map;

	// 목록
	@Override
	public List<MemberVO> getMembetList() {
		return map.getMemberList();
	}
	
														//회원가입
	// 새 회원입력
	@Override
	public int newCompanyInsert(MemberVO member) {
		map.newCompanyInsert1(member);
		return map.newCompanyInsert2(member);
	}
	// 기존회사 입력
	@Override
	public int exCompanyInsert(MemberVO member) {
		return map.exCompanyInsert(member);
	}
	// 회사Url
	@Override
	public MemberVO getCompany(MemberVO vo) {
		return map.getCompany(vo);
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
	@Override
	public MemberVO memberInfo(MemberVO vo) {
		// 회원정보 가져오기
		return map.memberInfo(vo);
	}
	
														// 회원삭제
	@Override
	public int memberDelete(MemberVO member) {
		return map.memberDelete(member);
	}

														//회원 정보 수정
	@Override
	public int nameUpdate(MemberVO vo) {
		// 회원 이름 수정
		return map.nameUpdate(vo);
	}

	@Override
	public int wkpoUpdate(MemberVO vo) {
		// 회원 직위 수정
		return map.wkpoUpdate(vo);
	}

	@Override
	public int persTelUpdate(MemberVO vo) {
		// 회원 전화번호 수정
		return map.persTelUpdate(vo);
	}

	@Override
	public int coTelUpdate(MemberVO vo) {
		// 회원 회사번호 수정
		return coTelUpdate(vo);
	}

	@Override
	public int deptUpdate(MemberVO vo) {
		// 회원 부서 수정
		return deptUpdate(vo);
	}





}
