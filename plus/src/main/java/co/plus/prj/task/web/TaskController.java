package co.plus.prj.task.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import co.plus.prj.task.service.TaskService;
import co.plus.prj.task.vo.TaskVO;

@Controller
public class TaskController {
	@Autowired 
	private TaskService taskDao;
	
	@RequestMapping("/taskSelectList.do")	// 업무 목록
	String taskSelectList(Model model) {
		model.addAttribute("tasks",taskDao.taskSelectList());
		return "task/taskSelectList"; 		
	}
	
	@RequestMapping("/taskSelect.do")		// 업무 상세조회
	String taskSelect(TaskVO vo, Model model) {
		//vo.setNotiId(0);				// 게시글 번호로 조회
		model.addAttribute("task",taskDao.taskSelect(vo));
		return "task/taskSelect";
	}
	
	@RequestMapping("/taskForm.do")			// 업무 폼 호출
	String taskForm() {
		return "task/taskForm";
	}
	
	@RequestMapping("/taskInsert.do")		// 업무 작성
	String taskInsert(TaskVO vo, Model model) {
		// vo.setMemId(0);				// 회원 번호로 조회
		taskDao.taskInsert(vo);
		return "redirect:taskSelectList.do"; 	// 작성 후 목록으로 가기
	}
	
	@RequestMapping("/taskUpdate.do")		// 업무 수정
	String taskUpdate(TaskVO vo, Model model) {
		return "redirect:taskSelectList.do";	// 수정 후 목록으로 가기
	}
	
	@RequestMapping("/taskDelete.do")		// 업무 삭제
	String taskDelete(TaskVO vo, Model model) {
		return "redirect:taskSelectList.do";	// 삭제 후 목록으로 가기
	}
} // End of Class
