package co.plus.prj.uam.web;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.mail.Session;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import co.plus.prj.uam.service.MemberService;
import co.plus.prj.uam.vo.MemberVO;

@Controller
public class MemberController {

	@Autowired
	JavaMailSender mailSender;
	@Autowired
	MemberService service;

	
	
	//회사URL입력페이지(companyJoin.jsp)
	@RequestMapping(value = "/companyJoin.do", method = RequestMethod.GET)
	public String companyJoin(Model model) {

		return "uam/join/companyJoin";
	}
	//회사URL정보가져오기(팝업)
	@RequestMapping(value = "/getCompany.do", method = RequestMethod.GET)
	@ResponseBody
	public MemberVO getCompany(@RequestParam("coUrl") String coUrl,
			MemberVO vo,Model model) {
		System.out.println(coUrl);
		vo.setCoUrl(coUrl);
		MemberVO temp = service.getCompany(vo);
		return temp;
		
	}
	//새로운 회사 회원가입폼(companyJoin에 입력한 url정보전달)
	@RequestMapping(value = "/adminJoin.do", method = RequestMethod.GET)
	public String newCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("newUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "uam/join/adminJoin";
	}
	//새로운 회사 회원가입완료
	@RequestMapping(value = "/newCompanyInsert.do", method = RequestMethod.POST, consumes="application/json")
	@ResponseBody
	public Map newCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.newCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	//기존 회원가입폼(companyJoin에 입력한 url정보전달)
	@RequestMapping(value="/userJoin.do", method = RequestMethod.GET)
	public String exCompany(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("exUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "uam/join/userJoin";
	}
	//기존 회사가입 회원가입완료
	@RequestMapping(value="/exCompanyInsert.do", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map exCompanyInsert(@RequestBody MemberVO vo, Model model) {
		service.exCompanyInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member", vo);
		return map;
	}
	//회원가입 인증번호 메일발송
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
	@RequestMapping(value = "memberLogin.do")
	public String login(MemberVO vo, Model model, HttpSession session) {

		String views = null;
		vo = service.loginStUpdate(vo);

		
		if(vo != null) {
			session.setAttribute("memId", vo.getMemId());
			session.setAttribute("name", vo.getName());
			session.setAttribute("memPerm", vo.getMemPerm());
			views = "home/myProject";
		}else {
			model.addAttribute("message", "일치하는 회원 정보가 없습니다.");
			views = "uam/login/login";
		}
		
		return views;
	}
	//로그아웃
	@RequestMapping("logout.do")
	public String logout(HttpSession session, MemberVO vo) {
		MemberVO vo2 = session.getAttribute("memId");
		
		session.invalidate();
		
		return "uam/login/login";		
	}
	
	
	
	//회원설정
	
	
	
	
}
