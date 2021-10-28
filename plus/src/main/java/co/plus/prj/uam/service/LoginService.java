package co.plus.prj.uam.service;

import javax.servlet.http.HttpSession;

import co.plus.prj.uam.vo.MemberVO;

public interface LoginService {
	//회원 로그인 체크
	public boolean login(MemberVO vo, HttpSession session);
}
