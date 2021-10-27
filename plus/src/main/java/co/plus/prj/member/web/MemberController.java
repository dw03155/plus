package co.plus.prj.member.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.member.service.MemberService;
import co.plus.prj.member.vo.MemberVO;

@Controller
public class MemberController {
	@Autowired
	JavaMailSender mailSender;
	MemberService service;
	
	//회원가입
	@RequestMapping(value = "/joinForm.do", method = RequestMethod.GET)
	public String joinFrom(Model model) {

		return "notiles/login/joinForm";
	}
	
	@RequestMapping(value = "/adminJoin.do", method = RequestMethod.GET)
	public String newCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("newUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "notiles/login/adminJoin";
	}
	
	@RequestMapping(value = "/companyJoin.do", method = RequestMethod.GET)
	public String companyJoin(Model model) {

		return "notiles/login/companyJoin";
	}
	
	@RequestMapping(value = "/newCompanyInsert.do", method = RequestMethod.POST, consumes="application/json")
	@ResponseBody
	public Map newCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.newCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	
	@RequestMapping(value="/userMenu.do", method = RequestMethod.GET)
	public String userMenu() {
		return "notiles/login/userMenu";
	}
	
	@RequestMapping(value="/userJoin.do", method = RequestMethod.GET)
	public String exCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("exUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "notiles/login/userJoin";
	}
	
	@RequestMapping(value="/exCompanyInsert.do", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map exCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.exCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	
	//로그인
	
	//회원설정
}
