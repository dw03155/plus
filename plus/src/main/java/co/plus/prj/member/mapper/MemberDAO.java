package co.plus.prj.member.mapper;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.plus.prj.member.vo.LoginVO;
import co.plus.prj.member.vo.MemberVO;

@Repository
public class MemberDAO {
	@Autowired
	private SqlSessionTemplate mybatis;
	
	//로그인
	public LoginVO login(MemberVO vo) {
		return mybatis.selectOne("MemberDAO.login",vo);
	}
	//목록
	public List<MemberVO> getMemberList(MemberVO vo){
		return mybatis.selectList("MemberDAO.getMemberList", vo);
	}
	//입력
	public int insertMember(MemberVO vo) {
		return mybatis.insert("MemberDAO.insertMember",vo);
	}
	//수정
	public int updateMember(MemberVO vo) {
		return mybatis.update("MemberDAO.updateMember", vo);
	}
	//삭제
	public int deleteMember(MemberVO vo) {
		return mybatis.delete("MemberDAO.deleteMember", vo);
	}

}
