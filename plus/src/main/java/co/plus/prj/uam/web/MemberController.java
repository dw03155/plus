package co.plus.prj.uam.web;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.uam.service.MemberService;
import co.plus.prj.uam.vo.MemberVO;

@Controller
public class MemberController {
	@Autowired
	JavaMailSender mailSender;
	@Autowired
	MemberService service;
	
	
	//회원가입=URL입력페이지
	@RequestMapping(value = "/companyJoin.do", method = RequestMethod.GET)
	public String companyJoin(Model model) {

		return "uam/join/companyJoin";
	}
	//회원가입=URL정보가져오기
	@RequestMapping(value = "/getCompany.do", method = RequestMethod.GET)
	@ResponseBody
	public MemberVO getCompany(@RequestParam("coUrl") String coUrl,
			MemberVO vo,Model model) {
		vo.setCoUrl(coUrl);
		MemberVO temp = service.getCompany(vo);
		return temp;
		
	}
	//회원가입=새로운 회사가입페이지(companyJoin에 입력한 url정보전달)
	@RequestMapping(value = "/adminJoin.do", method = RequestMethod.GET)
	public String newCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("newUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "uam/join/adminJoin";
	}
	//회원가입=새로운 회사가입 입력
	@RequestMapping(value = "/newCompanyInsert.do", method = RequestMethod.POST, consumes="application/json")
	@ResponseBody
	public Map newCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.newCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	//회원가입=기존 회사가입페이지(companyJoin에 입력한 url정보전달)
	@RequestMapping(value="/userJoin.do", method = RequestMethod.GET)
	public String exCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("exUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "uam/join/userJoin";
	}
	//회원가입=기존 회사가입 입력
	@RequestMapping(value="/exCompanyInsert.do", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map exCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.exCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	//회원가입=인증번호 메일발송
	@RequestMapping(value="/joinMail.do", method = RequestMethod.POST)
	@ResponseBody
	public String joinMail(String email, HttpSession session,Model model) {
		Random random = new Random();
		String key = "";
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		for(int i = 0; i<3; i++) {
			int index = random.nextInt(25)+65;
			key += (char)index;
		}
		int numIndex = random.nextInt(9999)+1000;
		key +=numIndex;
		System.out.println(key);
		message.setSubject("플러스 인증번호");
		message.setText("인증번호: "+key);
		mailSender.send(message);
		
		return key;
	}
	
	//로그인
	@RequestMapping(value = "login.do", method = RequestMethod.POST)
	public String login(MemberVO vo, Model model, HttpSession session) {
		String request = null;
		vo = service.login(vo);
		
		if(vo != null) {
			session.setAttribute("email", vo.getMemId());
			session.setAttribute("memPerm", vo.getMemPerm());
			request = "home/main";
		}else {
			model.addAttribute("message", "일치하는 정보가 없습니다.");
			request = "uam/login/login";
		}
		
		return request;
	}
	
	
	
	//회원설정
	
	
	
	
}
