package co.plus.prj.nwm.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.nwm.service.NoticeWritingService;
import co.plus.prj.nwm.vo.NoticeWritingVO;

@Controller
public class NoticeWritingController {
	@Autowired
	private NoticeWritingService nwDao;

	// 전체 메뉴
	@RequestMapping("/allTask.do")	// 전체 메뉴 -> 전체 업무
	String allTask(Model model, NoticeWritingVO vo) {
		model.addAttribute("tasks",nwDao.allTask(vo));
		return "nwm/allTask"; 		
	}
	
	@RequestMapping("/allSche.do") // 전체 메뉴 -> 캘린더
	String allSche(Model model, NoticeWritingVO vo) {
		model.addAttribute("sches",nwDao.allSche(vo));
		return "nwm/allSche"; 		
	}
	
	@RequestMapping("/myPost.do") // 전체 메뉴 -> 내 게시물 목록 
	String myPost(Model model, NoticeWritingVO vo) {
		vo.setMemId(5); // 구문
		model.addAttribute("notices", nwDao.myPost(vo));
		return "nwm/myPost";
	}
	
	@RequestMapping("/allFile.do") // 전체 메뉴 -> 파일함
	String allFile(Model model, NoticeWritingVO vo) {
		
		return "nwm/allFile";
	}

	@RequestMapping("/bookmark.do") // 전체 메뉴 -> 북마크
	String bookmark(Model model, NoticeWritingVO vo) {
		model.addAttribute("bookmarks", nwDao.bookMarkList(vo));
		return "nwm/bookmark";
	}
	
	@RequestMapping("/myPostTxt.do") // 내 게시물 목록 -> 글 상세보기(팝업)
	public String myPostTxt(Model model, NoticeWritingVO vo) {
		model.addAttribute("texts", nwDao.myPostTxt(vo));
		return "nwm/modal/myPostTxt"; 
	 }
	
	@RequestMapping("/myPostTsk.do") // 내 게시물 목록 -> 업무 상세보기(팝업)
	public String myPostTsk(Model model, NoticeWritingVO vo) {
		model.addAttribute("tasks", nwDao.myPostTsk(vo));
		return "nwm/modal/myPostTsk"; 
	 }
	
	@RequestMapping("/myPostSubtsk.do") // 내 게시물 목록 -> 하위업무 상세보기(팝업)
	@ResponseBody
	public NoticeWritingVO myPostSubtsk(Model model, NoticeWritingVO vo) {
		return nwDao.myPostSubtsk(vo); 
	 }
	
	@RequestMapping("/myPostSche.do") // 내 게시물 목록 -> 일정 상세보기(팝업)
	public String myPostSche(Model model, NoticeWritingVO vo) {
		model.addAttribute("schedules", nwDao.myPostSche(vo));
		return "nwm/modal/myPostSche"; 
	 }
	
	@RequestMapping("/myPostTodo.do") // 내 게시물 목록 -> 할일 상세보기(팝업)
	public String myPostTodo(Model model, NoticeWritingVO vo) {
		model.addAttribute("todos", nwDao.myPostTodo(vo));
		return "nwm/modal/myPostTodo"; 
	 }
	
	@RequestMapping("/noticeCount.do")	// 게시글 개수
	String noticeCount() {
		return "redirect:nwList";
		
	}
	
	
	// 프로젝트 선택 후 메뉴
	@RequestMapping("/totalNotice.do")	// 프로젝트 선택 -> 홈 (게시물 목록 조회)
	String totalNotice(Model model, NoticeWritingVO vo) {
		model.addAttribute("totals", nwDao.totalNotice(vo));
		return "nwm/totalNotice";
	}
	
	@RequestMapping("/tskList.do") 		// 프로젝트 선택 후 -> 업무 (1개 프로젝트)
	String tskList(Model model, NoticeWritingVO vo) {
		model.addAttribute("tsk", nwDao.tskList(vo));
		return "nwm/totalNotice";
	}
	
	
	@RequestMapping("/textForm.do")
	public String txtForm(@RequestParam(value="notiId",  defaultValue="1") int notiId, Model model){
		model.addAttribute("txtF", nwDao.UpdateTxt(notiId));
		return "nwm/textForm";
	}
	
	
}
