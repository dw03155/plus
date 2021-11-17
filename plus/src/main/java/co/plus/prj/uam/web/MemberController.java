package co.plus.prj.uam.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import co.plus.prj.pnw.vo.PNWVO;
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
		vo.setEmail(email);
		MemberVO temp = service.getMailCheck(vo);
		System.out.println(temp);
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
	//기존 회원가입폼(companyJoin에 입력한 url정보전달)
	@RequestMapping(value="/guestCompanyInsert.do", method = RequestMethod.GET)
	public String guestCompanyInsert(@RequestParam(required = false) String newCoUrl, Model model) {
		model.addAttribute("exUrl",newCoUrl);
		System.out.println(newCoUrl);
		
		return "uam/join/guestJoin";
	}
	//게스트 회사가입 회원가입완료
	@RequestMapping(value="/guestInsert.do", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public Map guestInsert(@RequestBody MemberVO vo, Model model) {
		service.guestInsert(vo);
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
	@RequestMapping(value = "memberLogin.do", method = RequestMethod.POST )
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
	
	//회사로고 가져오기
	@GetMapping("/getLogo.do")
	@ResponseBody
	public MemberVO getLogo(@RequestParam(required=false) String coUrl, MemberVO vo) {
		vo.setCoUrl(coUrl);
		MemberVO logo = service.getLogo(vo);
		return logo;
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
	public Map uploadLogo(MultipartFile[] logoInput, HttpSession session) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		String path = "C:\\Users\\trund\\git\\plus\\plus\\src\\main\\webapp\\logo";
		File Folder = new File(path);
		String coUrl = (String) session.getAttribute("coUrl");
		Random random = new Random();
		String key = "";
		
		for(int i = 0; i<3; i++) {
			int index = random.nextInt(25)+65;
			key += (char)index;
		}
		int numIndex = random.nextInt(9999)+1000;
		key += numIndex;
		
		String coUrlUni = coUrl+ "_" + key;
		System.out.println(coUrlUni);
		
		if(!Folder.exists()) {
			Folder.mkdir();
			System.out.println("폴더를 생성합니다.");
			
		}else {
			System.out.println("폴더가 이미 있습니다.");
		}
		
		File uploadFolder = Folder;
		
		for(MultipartFile file : logoInput) {
			String FileName = file.getOriginalFilename();
			String uploadFileName = coUrlUni +"_"+ FileName;
			File saveFile = new File(uploadFolder,uploadFileName);
			
			if(checkImageType(saveFile)) {  //이미지파일 썸네일 파일도 함께만든다.
			
					try {
						file.transferTo(saveFile);  //파일저장
					
					}catch(Exception e) {
					e.printStackTrace();
					}
			}// 썸네일 end
		}
		map.put("key", coUrlUni);
		return map;
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
	public String userManagement(Model model, MemberVO vo, HttpSession session) {
		vo.setCoUrl((String)session.getAttribute("coUrl"));
		model.addAttribute("using",service.getUsingMemberList(vo));
		model.addAttribute("notused",service.getNotusedMemberList(vo));
		model.addAttribute("outstand",service.getOutstandMemberList(vo));
		model.addAttribute("guest",service.getGuestMemberList(vo));
		return "uam/admin/menu/userManagement";
	}
	//정상사용자 삭제
	@PutMapping("/usingOut.do")
	@ResponseBody
	public MemberVO usingOut(@RequestBody MemberVO vo) {
		service.usingOut(vo);
		return vo;
	}
	//관리자 사용자로 변경
	@PutMapping("/adminDel.do")
	@ResponseBody
	public MemberVO adminDel(@RequestBody MemberVO vo) {
		service.adminDel(vo);
		return vo;
	}
	//사용자 관리자로 변경
	@PutMapping("/userDel.do")
	@ResponseBody
	public MemberVO userDel(@RequestBody MemberVO vo) {
		service.userDel(vo);
		return vo;
	}
	
	
	//사용자 승인
	@PutMapping("/outstandIn.do")
	@ResponseBody
	public MemberVO outstandIn(@RequestBody MemberVO vo) {
		service.outstandIn(vo);
		return vo;
	}
	//사용자 거절
	@PutMapping("/outstandOut.do")
	@ResponseBody
	public MemberVO outstandOut(@RequestBody MemberVO vo) {
		service.outstandOut(vo);
		return vo;
	}
	//사용자 승인
	@PutMapping("/guestIn.do")
	@ResponseBody
	public MemberVO guestIn(@RequestBody MemberVO vo) {
		service.guestIn(vo);
		return vo;
	}
	//사용자 거절
	@PutMapping("/guestOut.do")
	@ResponseBody
	public MemberVO guestOut(@RequestBody MemberVO vo) {
		service.guestOut(vo);
		return vo;
	}
	//사용자 숫자 실시간 업데이트
	//정상 사용자
	@RequestMapping(value="/getUsingMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getUsingMemberList( Model model, MemberVO vo){
		return service.getUsingMemberList(vo);
	}
	//이용중지 사용자
	@RequestMapping(value="/getNotusedMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getNotusedMemberList( Model model, MemberVO vo){
		return service.getNotusedMemberList(vo);
	}
	//기입대기 사용자
	@RequestMapping(value="/getOutstandMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getOutstandMemberList( Model model, MemberVO vo){
		return service.getOutstandMemberList(vo);
	}
	//게스트
	@RequestMapping(value="/getGuestMemberList.do", method = RequestMethod.GET)
	@ResponseBody
	public List<MemberVO> getGuestMemberList( Model model, MemberVO vo){
		return service.getGuestMemberList(vo);
	}
	//사용자 초대
	@GetMapping("/userInvite.do")
	public String userInvite() {
		return "uam/admin/menu/userInvite";
	}
	//회원가입 URL발송
	@RequestMapping(value="/userInviteMail.do", method = RequestMethod.POST)
	@ResponseBody
	public void userInviteMail(String coUrl, String email, HttpSession session,Model model) throws MessagingException {
		String mailText = "<div style='height: 300px;'>"+"<p>플러스에 가입해 보세요!</p>" +
							"<button style='padding: 10px 20px 10px 20px; background-color: #6449FC; color: white; border-radius: 5px; height: "
							+ "60px; margin-top: 10px; margin-bottom: 10px; font-weight: bold; font-size: 15px;' "
							+ "onclick='http://192.168.0.11/userJoin.do?newCoUrl="+ coUrl + "'>" +
							"플러스가입하기</button>"+
							"<p></p>" + "<div>";
		MimeMessage mail = mailSender.createMimeMessage();
		MimeMessageHelper message = new MimeMessageHelper(mail,true,"UTF-8");
		message.setTo(email);
		message.setSubject("플러스 초대");
		message.setText(mailText,true);
		mailSender.send(mail);
		
	}
	//엑셀서식다운
	@SuppressWarnings("resource")
	@GetMapping("/xlsxDonload.do")
	public void download(HttpServletResponse response, HttpServletRequest request) throws FileNotFoundException {
		try {
			String path = "C:\\Users\\trund\\git\\plus\\plus\\src\\main\\webapp\\xlsxFile\\xlsxdownload\\플러스 회원일괄초대 엑셀입력 양식.xls";

			File file = new File(path);
			response.setHeader("Content-Transfer-Encoding", "binary");
			FileInputStream fileInputStream = new FileInputStream(path);
	
			OutputStream out = response.getOutputStream();
			
			int read = 0;
			byte[] buffer = new byte[1024];
			while ((read = fileInputStream.read(buffer)) != -1) {
				out.write(buffer,0,read);
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("download error");
		}
		 
		 
	}
	//회원일괄 입력
	@PutMapping("/AllMemberInsert2.do")
	@ResponseBody
	public MemberVO AllMemberInsert2(@RequestBody MemberVO vo) {
		System.out.println("일괄등록 vo : " + vo);
		service.AllMemberInsert1(vo);
		service.AllMemberInsert2(vo);
		return vo;
	}
	
	
	//회사프로젝트
	@GetMapping("/coPrjMangement.do")
	public String coPrjMangement(Model model, MemberVO vo, HttpSession session) {
		vo.setCoUrl((String)session.getAttribute("coUrl"));
		model.addAttribute("coPrjs",service.getCoPrjList(vo));
		return "uam/admin/menu/coPrjMangement";
	}
	//회사프로젝트 상세
	@GetMapping("/getCoPrjInfo.do")
	@ResponseBody
	public List<MemberVO> getCoPrjInfo(MemberVO vo){
		System.out.println(vo);
		return service.getCoPrjInfo(vo);
	}
	//PM해제
	@PutMapping("/coPrjPMChange.do")
	@ResponseBody
	public MemberVO coPrjPMChange(@RequestBody MemberVO vo) {
		service.coPrjPMChange(vo);
		return vo;
	}
	//PM지정
	@GetMapping("/prjUserList.do")
	@ResponseBody
	public List<MemberVO> prjUserList(MemberVO vo){
		return service.prjUserList(vo);
	}
	//PM지정
	@PutMapping("/coPrjUserChange.do")
	@ResponseBody
	public MemberVO coPrjUserChange(@RequestBody MemberVO vo) {
		service.coPrjUserChange(vo);
		return vo;
	}
	
	
	//공개키테고리
	@GetMapping("/openPrjCategory.do")
	public String openPrjCategory(Model model, MemberVO vo, HttpSession session) {
		vo.setCoUrl((String)session.getAttribute("coUrl"));
		model.addAttribute("ctgrys",service.getCategoryList(vo));
		return "uam/admin/menu/openPrjCategory";
	}
	//공개키테고리 삭제
	@PutMapping("/prjCategoryUpdate.do")
	@ResponseBody
	public MemberVO prjCategoryUpdate(@RequestBody MemberVO vo) {
		service.prjCategoryUpdate(vo);
		return vo;
	}
	
	
	//공개 카테고리 추가
	@PostMapping(value="/categoryInsert.do", consumes = "application/json")
	@ResponseBody
	public Map categoryInsert(@RequestBody MemberVO vo) {
		service.categoryInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("category", vo);
		return map;
	}
	@GetMapping("/getCategoryList.do")
	@ResponseBody
	public List<MemberVO> getCategoryList(MemberVO vo) {
		return service.getCategoryList(vo);
	}
	
	@GetMapping("/allFile.do")
	public String allFile() {
		return "home/allFile";
	}
	
	@GetMapping("/taskFileList.do")
	@ResponseBody
	public List<PNWVO> taskFileList(PNWVO vo){
		return service.taskFileList(vo);
	}
	@GetMapping("/textFileList.do")
	@ResponseBody
	public List<PNWVO> textFileList(PNWVO vo){
		return service.textFileList(vo);
	}
	@GetMapping("/subTaskFileList.do")
	@ResponseBody
	public List<PNWVO> subTaskFileList(PNWVO vo){
		return service.subTaskFileList(vo);
	}
	
	 //게스트 회원가입 URL발송
	 /* 
	 * @RequestMapping(value="/userInviteMail.do", method = RequestMethod.POST)
	 * 
	 * @ResponseBody public void guestInviteMail(String name, String coUrl, String
	 * email, HttpSession session,Model model) throws MessagingException { String
	 * mailText = "<div style='height: 300px;'>"+"<p>"+name +"님이 게스트로 초대하셨습니다!</p>"+
	 * "<h1>플러스에 가입해 보세요!</h1>" +
	 * "<button style='padding: 10px 20px 10px 20px; background-color: #6449FC; color: white; border-radius: 5px; height: "
	 * +
	 * "60px; margin-top: 10px; margin-bottom: 10px; font-weight: bold; font-size: 15px;' "
	 * + "onclick='http://192.168.0.11/userJoin.do?newCoUrl="+ coUrl + "'>" +
	 * "플러스가입하기</button>"+ "<p></p>" + "<div>"; MimeMessage mail =
	 * mailSender.createMimeMessage(); MimeMessageHelper message = new
	 * MimeMessageHelper(mail,true,"UTF-8"); message.setTo(email);
	 * message.setSubject("플러스 초대"); message.setText(mailText,true);
	 * mailSender.send(mail);
	 * 
	 * }
	 */
	
}

