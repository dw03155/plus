package co.plus.prj.pnw.web;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import co.plus.prj.pnw.service.PNWService;
import co.plus.prj.pnw.vo.PNWVO;

@Controller
public class PNWController {
	@Autowired
	private PNWService service;

	
	// 내 프로젝트
	@RequestMapping(value = "/myProject.do", method = RequestMethod.GET)
	public String myProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String)session.getAttribute("memId"));
		model.addAttribute("favorPrjs", service.favorMyPrj(vo));
		model.addAttribute("noPrjs", service.noMyPrj(vo));
		return "pnw/myProject";

	}
	// 전체 프로젝트(수정)
	@RequestMapping(value = "/openProject.do", method = RequestMethod.GET)
	public String cProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String)session.getAttribute("memId"));
		model.addAttribute("favorPrjs", service.favorMyPrj(vo));
		model.addAttribute("noPrjs", service.noMyPrj(vo));
		return "pnw/openProject";

	}
	
	// 프로젝트 홈탭
	@RequestMapping(value = "/prjHome.do", method = RequestMethod.POST)
	public String prjHome(@RequestParam(value="prjId", required=false)String prjId,HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String)session.getAttribute("memId"));
		vo.setPrjId(prjId);
		model.addAttribute("pincettes",service.prjHomePin(vo));
		model.addAttribute("nwLists", service.prjHomeNW(vo));
		model.addAttribute("partipants",service.prjPartiList(vo));
		model.addAttribute("pms",service.partiPM(vo));
		model.addAttribute("users",service.partiUser(vo));
		model.addAttribute("guests",service.partiGuest(vo));
		return "pnw/prjHome";

	}
	
}
