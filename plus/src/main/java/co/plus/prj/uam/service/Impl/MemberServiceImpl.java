package co.plus.prj.uam.service.Impl;

import java.util.List;

import javax.servlet.http.HttpSession;

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
	
	//회원가입
	@Override
	public int newCompanyInsert(MemberVO member) {
		// 새 회원입력
		map.newCompanyInsert1(member);
		return map.newCompanyInsert2(member);
	}
	@Override
	public int exCompanyInsert(MemberVO member) {
		// 기존회사 입력
		return map.exCompanyInsert(member);;
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
		// 회사Url
		return map.getCompany(vo);
	}

	@Override
	public boolean login(MemberVO vo, HttpSession session) {
		// 로그인
		boolean reault = map.login(vo);
		
		return false;
	}


}
