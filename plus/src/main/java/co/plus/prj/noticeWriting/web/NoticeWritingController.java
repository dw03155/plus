package co.plus.prj.noticeWriting.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.noticeWriting.service.NoticeWritingService;
import co.plus.prj.noticeWriting.vo.NoticeWritingVO;

@Controller
public class NoticeWritingController {
	@Autowired
	private NoticeWritingService nwDao;

	@RequestMapping("/noticeWritingSelectList.do") 					// 게시글 목록 조회
	String noticeWritingSelectList(Model model, NoticeWritingVO vo) {
		
		model.addAttribute("notices", nwDao.noticeWritingSelectList(vo));
		return "noticeWriting/noticeWritingSelectList";
	}

	@RequestMapping("/noticeWritingSelectTxt.do") 					// 글 상세보기 파업
	public String noticeWritingSelectTxt(Model model, NoticeWritingVO vo) {
		model.addAttribute("texts", nwDao.noticeWritingSelectTxt(vo));
		return "noticeWriting/noticeWritingSelectTxt"; 
	 }
	
	@RequestMapping("/noticeWritingSelectTsk.do") 					// 업무 상세보기 팝업
	public String noticeWritingSelectTsk(Model model, NoticeWritingVO vo) {
		model.addAttribute("tasks", nwDao.noticeWritingSelectTsk(vo));
		return "noticeWriting/noticeWritingSelectTsk"; 
	 }
	
	@RequestMapping("/noticeWritingSelectSubtsk.do") 				// 하위 상세보기 팝업
	@ResponseBody
	public NoticeWritingVO noticeWritingSelectSubtsk(Model model, NoticeWritingVO vo) {
		return nwDao.noticeWritingSelectSubtsk(vo); 
	 }
	
	@RequestMapping("/noticeWritingSelectSche.do") 					// 일정 상세보기 팝업
	public String noticeWritingSelectSche(Model model, NoticeWritingVO vo) {
		model.addAttribute("schedules", nwDao.noticeWritingSelectSche(vo));
		return "noticeWriting/noticeWritingSelectSche"; 
	 }
	
	@RequestMapping("/noticeWritingSelectTodo.do") 					// 할일 상세보기 팝업
	public String noticeWritingSelectTodo(Model model, NoticeWritingVO vo) {
		model.addAttribute("todos", nwDao.noticeWritingSelectTodo(vo));
		return "noticeWriting/noticeWritingSelectTodo"; 
	 }
	
	@RequestMapping("/noticeCount.do")		// 게시글 개수
	String noticeCount() {
		return "redirect:noticeWritingSelectList";
		
	}
}
