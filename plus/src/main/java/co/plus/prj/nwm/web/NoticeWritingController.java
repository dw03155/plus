package co.plus.prj.nwm.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.nwm.service.NoticeWritingService;
import co.plus.prj.nwm.vo.NoticeWritingVO;

@Controller
public class NoticeWritingController {
	@Autowired
	private NoticeWritingService nwDao;

	// 전체 메뉴
	@RequestMapping("/totalTask.do")	// 전체 메뉴 -> 전체 업무
	String totalTask(Model model, NoticeWritingVO vo) {
		model.addAttribute("tasks",nwDao.totalTask(vo));
		return "nwm/totalTask"; 		
	}
	
	@RequestMapping("/totalSchedule.do") // 전체 메뉴 -> 캘린더
	String totalSchedule(Model model, NoticeWritingVO vo) {
		model.addAttribute("sches",nwDao.totalSchedule(vo));
		return "nwm/totalSchedule"; 		
	}
	
	@RequestMapping("/nwList.do") // 전체 메뉴 -> 내 게시물 목록 
	String noticeWritingSelectList(Model model, NoticeWritingVO vo) {
		vo.setMemId(5); // 구문
		model.addAttribute("notices", nwDao.noticeWritingSelectList(vo));
		return "nwm/nwList";
	}

	@RequestMapping("/nwTxt.do") // 내 게시물 목록 -> 글 상세보기(팝업)
	public String noticeWritingSelectTxt(Model model, NoticeWritingVO vo) {
		model.addAttribute("texts", nwDao.noticeWritingSelectTxt(vo));
		return "nwm/nwTxt"; 
	 }
	
	@RequestMapping("/nwTsk.do") // 내 게시물 목록 -> 업무 상세보기(팝업)
	public String noticeWritingSelectTsk(Model model, NoticeWritingVO vo) {
		model.addAttribute("tasks", nwDao.noticeWritingSelectTsk(vo));
		return "nwm/nwTsk"; 
	 }
	
	@RequestMapping("/noticeWritingSelectSubtsk.do") // 내 게시물 목록 -> 하위업무 상세보기(팝업)
	@ResponseBody
	public NoticeWritingVO noticeWritingSelectSubtsk(Model model, NoticeWritingVO vo) {
		return nwDao.noticeWritingSelectSubtsk(vo); 
	 }
	
	@RequestMapping("/nwSche.do") // 내 게시물 목록 -> 일정 상세보기(팝업)
	public String noticeWritingSelectSche(Model model, NoticeWritingVO vo) {
		model.addAttribute("schedules", nwDao.noticeWritingSelectSche(vo));
		return "nwm/nwSche"; 
	 }
	
	@RequestMapping("/nwTodo.do") // 내 게시물 목록 -> 할일 상세보기(팝업)
	public String noticeWritingSelectTodo(Model model, NoticeWritingVO vo) {
		model.addAttribute("todos", nwDao.noticeWritingSelectTodo(vo));
		return "nwm/nwTodo"; 
	 }
	
	@RequestMapping("/noticeCount.do")	// 게시글 개수
	String noticeCount() {
		return "redirect:nwList";
		
	}
	
	
	// 프로젝트 선택 후 메뉴
	@RequestMapping("/totalNotice.do")	// 프로젝트 선택 -> 홈 (게시물 목록 조회)
	String totalNotice(Model model, NoticeWritingVO vo) {
		vo.setPrjId(5);
		model.addAttribute("totals", nwDao.totalNotice(vo));
		return "nwm/totalNotice";
	}
	
}
