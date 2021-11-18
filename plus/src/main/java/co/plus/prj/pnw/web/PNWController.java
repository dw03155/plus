package co.plus.prj.pnw.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.pnw.service.PNWService;
import co.plus.prj.pnw.vo.PNWVO;

@Controller
public class PNWController {
	@Autowired
	private PNWService service;

	// 내 프로젝트
	@RequestMapping(value = "/myProject.do", method = RequestMethod.GET)
	public String myProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("favorPrjs", service.favorMyPrj(vo));
		model.addAttribute("noPrjs", service.noMyPrj(vo));
		return "pnw/myProject";

	}
	// 즐겨찾기 추가
	@RequestMapping(value = "/prjFavorite.do", method = RequestMethod.POST)
	@ResponseBody
	public String prjFavorite(HttpSession session, Model model, PNWVO vo) {
		service.prjFavorite(vo);
		return "redirect:myProject.do";
	}
	// 즐겨찾기 삭제
	@RequestMapping(value = "/prjNoFavor.do", method = RequestMethod.DELETE)
	@ResponseBody
	public String prjNoFavor(HttpSession session, Model model, PNWVO vo) {
		service.prjNoFavor(vo);
		return "redirect:myProject.do";
	}
	
	
	// 전체 프로젝트
	@RequestMapping(value = "/openProject.do", method = RequestMethod.GET)
	public String openProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		model.addAttribute("ctgrys",service.ctgryList(vo));
		model.addAttribute("prjs", service.openProject(vo));
		return "pnw/openProject";

	}
	
	// 즐겨찾기 프로젝트
	@RequestMapping(value = "/favoriteProject.do", method = RequestMethod.GET)
	public String favoriteProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("joinPrjs", service.joinPrj(vo));
		model.addAttribute("noJoinPrjs", service.noJoinPrj(vo));
		return "pnw/favoriteProject";

	}
	
		// 프로젝트 홈탭
	@RequestMapping(value = "/prjHome.do", method = RequestMethod.POST)
	public String prjHome(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		Map <String, Object> result = service.prjHome(vo);
		model.addAttribute("prjInfo", result.get("prjInfo"));
		model.addAttribute("tskAllCnt", result.get("tskAllCnt"));
		model.addAttribute("tskPrgsCnts", result.get("tskPrgsCnts"));
		model.addAttribute("partiCnt", result.get("partiCnt"));
		model.addAttribute("pincettes", result.get("pincettes"));
		model.addAttribute("nwLists", result.get("nwLists"));
		model.addAttribute("pms", result.get("pms"));
		model.addAttribute("users", result.get("users"));
		model.addAttribute("guests", result.get("guests"));
		return "pnw/prjHome";

	}

	// 프로젝트 홈탭 : 도넛차트
	@RequestMapping(value = "/doughnutChart.do", method = RequestMethod.POST)
	@ResponseBody
	public List<PNWVO> doughnutChart(HttpSession session, Model model, PNWVO vo) {
		return service.prjTskCount(vo);//업무 갯수

	}
	
	// 새 프로젝트 : 카테고리 종류 받기
	@RequestMapping(value = "/ctgryList.do", method = RequestMethod.POST)
	@ResponseBody
	public List<PNWVO> ctgryList(HttpSession session, Model model, PNWVO vo) {
		return service.ctgryList(vo);
	}
	
	// 새 프로젝트 : 프로젝트 생성
	@RequestMapping(value = "/prjInsert.do", method = RequestMethod.POST)
	@ResponseBody
	public Map prjInsert(HttpSession session, Model model, PNWVO vo) {
		service.prjInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("project", vo);
		return map;
	}

	// 프로젝트폴더 메뉴
	@RequestMapping(value = "/folderMenu.do",  method = RequestMethod.POST)
	@ResponseBody
	public List<PNWVO> folderMenu(HttpSession session, Model model, PNWVO vo) {
		return service.folderMenu(vo);
	}
	
	// 스케쥴 메뉴
	@RequestMapping(value = "/allSchedule.do",  method = RequestMethod.GET)
	public String allSchedule(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		model.addAttribute("nwLists",service.allSchedule(vo));
		return "home/allSchedule"; 		
	}
	
	// 프로젝트 폴더 생성하기
	@RequestMapping(value = "/prjFoldInsert.do", method = RequestMethod.POST)
	@ResponseBody
	public String prjFoldInsert(HttpSession session, Model model, PNWVO vo) {
		service.prjFoldInsert(vo);
		return "redirect:folderMenu.do";
	}
	
	// 프로젝트 폴더명 수정하기
	@RequestMapping(value = "/prjFoldUpdate.do", method = RequestMethod.PUT)
	@ResponseBody
	public String prjFoldUpdate(HttpSession session, Model model, PNWVO vo) {
		service.prjFoldUpdate(vo);
		return "redirect:folderMenu.do";
	}
	
	// 프로젝트 색깔 수정하기
	@RequestMapping(value = "/prjColorUpdate", method = RequestMethod.PUT)
	@ResponseBody
	public String prjColorUpdate(HttpSession session, Model model, PNWVO vo) {
		service.prjColorUpdate(vo);
		return "redirect:myProject.do";
	}
	
}
