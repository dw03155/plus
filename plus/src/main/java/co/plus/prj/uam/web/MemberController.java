package co.plus.prj.uam.web;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import co.plus.prj.uam.service.MemberService;
import co.plus.prj.uam.vo.MemberVO;
import net.coobird.thumbnailator.Thumbnails;

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
	@RequestMapping(value = "/getMailCheck.do", method = RequestMethod.GET)
	@ResponseBody
	public MemberVO getMailCheck(@RequestParam("email") String email,
			MemberVO vo,Model model) {
		System.out.println(email);
		vo.setEmail(email);
		MemberVO temp = service.getMailCheck(vo);
		return temp;
		
	}
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
			session.setAttribute("coUrl", vo.getCoUrl());
			views = "redirect:myProject.do";
		}else {
			model.addAttribute("message", "일치하는 회원 정보가 없습니다.");
			views = "uam/login/login";
		}
		
		return views;
	}
	//로그아웃
	@RequestMapping("logout.do")
	public String logout(HttpSession session, MemberVO vo) {
		vo.setMemId((String)session.getAttribute("memId"));
		service.loginoutStUpdate(vo);
		session.invalidate();
		
		return "uam/login/login";		
	}
	
	
	
	//회원설정
	@RequestMapping(value="memberInfo.do", method = RequestMethod.GET)
	@ResponseBody
	public MemberVO memberInfo(@RequestParam(required=false) String memId, MemberVO vo) {
		vo.setMemId(memId);
		MemberVO info = service.memberInfo(vo);
		return info;
	}
	//회원이름 수정
	@RequestMapping(value="/nameUpdate.do", method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO nameUpdate(@RequestBody MemberVO vo, Model model) {
		service.nameUpdate(vo);
		return vo;
	}
	//회원부서 수정
	@RequestMapping(value = "/deptUpdate.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO deptUpdate(@RequestBody MemberVO vo, Model model) {
		service.deptUpdate(vo);
		return vo;
	}
	//회원직책 수정
	@RequestMapping(value = "/wkpoUpdate.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO wkpoUpdate(@RequestBody MemberVO vo, Model model) {
		service.wkpoUpdate(vo);
		return vo;
	}
	//회원전화번호 수정
	@RequestMapping(value = "/persTelUpdate.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO persTelUpdate(@RequestBody MemberVO vo, Model model) {
		service.persTelUpdate(vo);
		return vo;
	}
	//회사전화번호 수정
	@RequestMapping(value = "/coTelUpdate.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO coTelUpdate(@RequestBody MemberVO vo, Model model) {
		service.coTelUpdate(vo);
		return vo;
	}
	//회사전화번호 수정
	@RequestMapping(value = "/pwdUpdate.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO pwdUpdate(@RequestBody MemberVO vo, Model model) {
		service.pwdUpdate(vo);
		return vo;
	}
	
	//현재 회원상태확인
	@RequestMapping(value="/memberStatus.do", method = RequestMethod.GET)
	@ResponseBody
	public MemberVO memberStatus(@RequestParam(required=false) String memId, MemberVO vo) {
		vo.setMemId(memId);
		MemberVO status = service.memberStatus(vo);
		return status;
	}
	//회원상태 온라인
	@RequestMapping(value = "/memberOnline.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO memberOnline(@RequestBody MemberVO vo, Model model) {
		service.memberOnline(vo);
		return vo;
	}
	//회원상태 다른용무
	@RequestMapping(value = "/memberOther.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO memberOther(@RequestBody MemberVO vo, Model model) {
		service.memberOther(vo);
		return vo;
	}
	//회원상태 자리비움
	@RequestMapping(value = "/memberNotdesk.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO memberNotdesk(@RequestBody MemberVO vo, Model model) {
		service.memberNotdesk(vo);
		return vo;
	}
	//회원상태 오프라인
	@RequestMapping(value = "/memberOffline.do",  method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO memberOffline(@RequestBody MemberVO vo, Model model) {
		service.memberOffline(vo);
		return vo;
	}
		
		
	//회원 탈퇴
	@RequestMapping(value="/memberDelete.do", method = RequestMethod.PUT,  consumes = "application/json")
	@ResponseBody
	public MemberVO memberDelete(@RequestBody MemberVO vo, Model model, HttpSession session) {
		service.memberDelete(vo);
		session.invalidate();
		return vo;
	}
	
	//관리자 회사설정
	@RequestMapping(value="/companyInfo.do", method = RequestMethod.GET)
	public String companyInfo(Model model) {
		return "uam/admin/menu/companyInfo";
	}
	//회사이름 변경
	@RequestMapping(value = "/coNameUpdate.do", method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody 
	public MemberVO coNameUpdate(@RequestBody MemberVO vo) {
		service.companyNameUpdate(vo);
		return vo;
	}
	
	@RequestMapping(value="/companyLogoUpdate.do", method = RequestMethod.PUT, consumes = "application/json")
	@ResponseBody
	public MemberVO companyLogoUpdate(@RequestBody MemberVO vo) {
		service.companyLogoUpdate(vo);
		return vo;
	}
	
	
	
	//파일 업로드
	@PostMapping("/uploadLogo.do")
	@ResponseBody
	public void uploadLogo(MultipartFile[] logoInput) {
		String uploadFolder = "C:\\Users\\admin\\git\\plus\\plus\\src\\main\\webapp\\logo";
		
		for(MultipartFile file : logoInput) {
			String uploadFileName = file.getOriginalFilename();
			File saveFile = new File(uploadFolder, uploadFileName);
			
			if(checkImageType(saveFile)) {  //이미지파일 썸네일 파일도 함께만든다.
			
					try {
						file.transferTo(saveFile);  //파일저장
					
						File thumbnail = 
								new File(uploadFolder, "s_" + uploadFileName);  //저장할 파일명만들기
						Thumbnails.of(saveFile)
								  .size(30,30)       //썸네일사이즈
								  .toFile(thumbnail);  //앞에 저장한파일에서 사이즈를 줄이고 만든 파일명을 붙힌다.
					
					}catch(Exception e) {
					e.printStackTrace();
					}
			}// 썸네일 end
		}
	}
	
	private boolean checkImageType(File file) {  //이미지파일인지 아닌지 비교
		try {
			String contentType = Files.probeContentType(file.toPath());
			return contentType.startsWith("image");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//관리자 사용자 관리
	@RequestMapping(value="/userManagement.do", method = RequestMethod.GET)
	public String userManagement(Model model) {
		return "uam/admin/menu/userManagement";
	}
	//정상 사용자
	@RequestMapping(value="getUsingMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getUsingMemberList( Model model, MemberVO vo){
		return service.getUsingMemberList(vo);
	}
	//이용중지 사용자
	@RequestMapping(value="getNotusedMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getNotusedMemberList( Model model, MemberVO vo){
		return service.getNotusedMemberList(vo);
	}
	//기입대기 사용자
	@RequestMapping(value="getOutstandMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getOutstandMemberList( Model model, MemberVO vo){
		return service.getOutstandMemberList(vo);
	}
	//게스트
	@RequestMapping(value="getGuestMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getGuestMemberList( Model model, MemberVO vo){
		return service.getGuestMemberList(vo);
	}
	
	
	
	
}

