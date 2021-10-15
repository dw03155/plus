package co.plus.prj.member.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.plus.prj.member.mapper.MemberMapper;
import co.plus.prj.member.vo.MemberVO;

@Repository
public class MemberServiceImpl implements MemberMapper {
	@Autowired
	private MemberMapper map;

	@Override
	public MemberVO getMember(MemberVO member) {
		// TODO Auto-generated method stub
		return map.getMember(member);
	}

	@Override
	public int insertMember(MemberVO member) {
		// TODO Auto-generated method stub
		return map.insertMember(member);
	}

	@Override
	public int updateMember(MemberVO member) {
		// TODO Auto-generated method stub
		return map.updateMember(member);
	}

	@Override
	public int deleteMember(MemberVO member) {
		// TODO Auto-generated method stub
		return map.deleteMember(member);
	}

	@Override
	public List<MemberVO> getMembetList() {
		// TODO Auto-generated method stub
		return map.getMembetList();
	}

	@Override
	public MemberVO memberLogin(MemberVO member) {
		// TODO Auto-generated method stub
		return map.memberLogin(member);
	}

}
