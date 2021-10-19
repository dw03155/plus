package co.plus.prj.member.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import co.plus.prj.member.mapper.MemberDAO;
import co.plus.prj.member.service.MemberService;
import co.plus.prj.member.vo.LoginVO;
import co.plus.prj.member.vo.MemberVO;

public class MemberServiceImpl implements MemberService, UserDetailsService {
	@Autowired
	MemberDAO memberdao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO vo = new MemberVO();
		vo.setMemId(username);
		LoginVO result = memberdao.login(vo);
		if(result == null) throw new UsernameNotFoundException("user not");
		return null;
	}

//	@Override
//	public MemberVO login(MemberVO vo) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public List<MemberVO> getMembetList(MemberVO member) {
		// 회원목록
		return memberdao.getMemberList(member);
	}

	@Override
	public int insertMember(MemberVO member) {
		// 회원입력
		return 0;
	}

	@Override
	public int updateMember(MemberVO member) {
		// 회원수정
		return 0;
	}

	@Override
	public int deleteMember(MemberVO member) {
		// 회원삭제
		return 0;
	}

}
