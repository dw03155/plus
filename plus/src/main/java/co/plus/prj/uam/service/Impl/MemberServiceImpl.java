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

	@Override
	public List<MemberVO> getMembetList() {
		// 목록
		return map.getMemberList();
	}

	@Override
	public MemberVO getMember(MemberVO member) {
		// 한명조회
		return map.getMember(member);
	}
	
	@Override
	public MemberVO login(MemberVO member) {
		// 로그인(+회원상태업데이트)
		map.login1(member);
		return map.login2(member);
	}

	@Override
	public int newCompanyInsert(MemberVO member) {
		// 새 회원입력
		map.newCompanyInsert1(member);
		return map.newCompanyInsert2(member);
	}
	
	@Override
	public int exCompanyInsert(MemberVO member) {
		// 기존회사 입력
		map.exCompanyInsert(member);
		return 0;
	}

	@Override
	public int memberUpdate(MemberVO member) {
		// TODO Auto-generated method stub
		return map.memberUpdate(member);
	}

	@Override
	public int memberDelete(MemberVO member) {
		// TODO Auto-generated method stub
		return map.memberDelete(member);
	}

	@Override
	public MemberVO getCompany(MemberVO vo) {
		// TODO Auto-generated method stub
		return map.getCompany(vo);
	}


}
