package co.plus.prj.nwm.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import co.plus.prj.nwm.service.NoticeWritingService;
import co.plus.prj.nwm.vo.NoticeWritingVO;
import co.plus.prj.pnw.vo.PNWVO;

@Controller
public class NoticeWritingController {
	@Autowired
	private NoticeWritingService nwDao;

	// 전체 메뉴
	@RequestMapping("/allTask.do") // 전체 메뉴 -> 전체 업무
	String allTask(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("tasks", nwDao.allTask(vo));
		return "nwm/allTask";
	}

	@RequestMapping("/detailTaskList.do") // 전체 업무 목록 내 항목들 출력
	String detailTaskList(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		System.out.println(vo);
		model.addAttribute("dtasks", nwDao.detailTaskList(vo));
		return "nwm/allTask";
	}

	@RequestMapping("/myPost.do") // 전체 메뉴 -> 내 게시물 목록
	String myPost(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("notices", nwDao.myPost(vo));
		return "nwm/myPostJSP";
	}

	@RequestMapping("/bookmark.do") // 전체 메뉴 -> 북마크
	String bookmark(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("bookmarks", nwDao.bookMarkList(vo));
		return "nwm/bookmark";
	}

	@RequestMapping("/myPostTxt.do") // 내 게시물 목록 -> 글 상세보기(팝업)
	public String myPostTxt(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("texts", nwDao.myPostTxt(vo));
	    model.addAttribute("prjcolortxt", nwDao.prjColorMyPost(vo)); 
		return "nwm/modal/myPostTxt";
	}

	@RequestMapping("/myPostTsk.do") // 내 게시물 목록 -> 업무 상세보기(팝업)
	public String myPostTsk(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		model.addAttribute("tasks", nwDao.myPostTsk(vo));
		model.addAttribute("prjcolortsk", nwDao.prjColorMyPost(vo));
		return "nwm/modal/myPostTsk";
	}

	@RequestMapping("/myPostSubtsk.do") // 내 게시물 목록 -> 하위업무 상세보기(팝업)
	public String myPostSubtsk(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("subtasks", nwDao.bookMarkList(vo));
		return "nwm/modal/myPostSubtsk";
	}

	@RequestMapping("/myPostSche.do") // 내 게시물 목록 -> 일정 상세보기(팝업)
	public String myPostSche(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("schedules", nwDao.myPostSche(vo));
		model.addAttribute("prjcolorsche", nwDao.prjColorMyPost(vo));
		return "nwm/modal/myPostSche";
	}

	@RequestMapping("/myPostTodo.do") // 내 게시물 목록 -> 할일 상세보기(팝업)
	public String myPostTodo(HttpSession session, Model model, NoticeWritingVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("todos", nwDao.myPostTodo(vo));
		model.addAttribute("prjcolortodo", nwDao.prjColorMyPost(vo));
		return "nwm/modal/myPostTodo";
	}

}
