package co.plus.prj.text.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import co.plus.prj.text.service.TextService;
import co.plus.prj.text.vo.TextVO;

@Controller
public class TextController {
	@Autowired
	private TextService textDao;
	
	
	
	@RequestMapping("/textSelect.do")			// 글 상세보기
	String textSelect(TextVO vo, Model model) {
		model.addAttribute("text", textDao.textSelect(vo));
		return "text/textSelect";
	}
	
	@RequestMapping("/textForm.do")			// 글 폼 조회
	String textForm() {
		return "text/textForm";
	}
	
	@RequestMapping("/textInsert")			// 글 생성
	String textInsert(TextVO vo, Model model) {
		return "redirect:textSelectList.do";
	}
	
	@RequestMapping("/textUpdate")			// 글 수정
	String textUpdate(TextVO vo, Model model) {
		return "redirect:textSelectList.do";
	}
	
	@RequestMapping("/textDelete")			// 글 삭제
	String textDelete(TextVO vo, Model model) {
		return "redirect:textSelectList.do";
	}
}
