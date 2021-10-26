package co.plus.prj.member.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.plus.prj.member.mapper.MemberMapper;
import co.plus.prj.member.service.MemberService;
import co.plus.prj.member.vo.MemberVO;

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

}
