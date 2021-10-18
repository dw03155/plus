package co.plus.prj.member.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import co.plus.prj.member.service.MemberService;
import co.plus.prj.member.vo.MemberVO;

@Controller
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	
	@RequestMapping(value ="/member/{memId}", method = RequestMethod.POST)
	public Map memberInsert(@RequestBody MemberVO vo, Model model) {
		memberService.insertMember(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("result", "success");
		map.put("user", vo);
		return map;
	}
}
