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
	@RequestMapping("/myProject.do")
	public String myProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("favorPrjs", service.favorMyPrj(vo));
		model.addAttribute("noPrjs", service.noMyPrj(vo));
		return "pnw/myProject";

	}
	
	// 즐겨찾기 추가
	@RequestMapping("/prjFavorite.do")
	@ResponseBody
	public Map prjFavorite(HttpSession session, Model model, PNWVO vo) {
		service.prjFavorite(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("prjFavorite", vo);
		return map;
	}
	
	// 즐겨찾기 삭제(**)
	@RequestMapping("/prjNoFavor.do")
	@ResponseBody
	public Map prjNoFavor(HttpSession session, Model model, PNWVO vo) {
		service.prjNoFavor(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("prjFavorite", vo);
		return map;
	}
	
	// 전체 프로젝트
	@RequestMapping("/openProject.do")
	public String openProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		model.addAttribute("ctgrys",service.ctgryList(vo));
		model.addAttribute("prjs", service.openProject(vo));
		return "pnw/openProject";
	}
	
	// 즐겨찾기 프로젝트
	@RequestMapping("/favoriteProject.do")
	public String favoriteProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("joinPrjs", service.joinPrj(vo));
		model.addAttribute("noJoinPrjs", service.noJoinPrj(vo));
		return "pnw/favoriteProject";
	}
	
	// 프로젝트 홈탭
	@RequestMapping("/prjHome.do")
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
		model.addAttribute("particis", result.get("particis"));
		model.addAttribute("employs", result.get("employs"));
		return "pnw/prjHome";
	}

	// 프로젝트 홈탭 : 도넛차트
	@RequestMapping("/doughnutChart.do")
	@ResponseBody
	public List<PNWVO> doughnutChart(HttpSession session, Model model, PNWVO vo) {
		return service.prjTskCount(vo);//업무 갯수
	}
	
	// 새 프로젝트 : 카테고리 종류 받기
	@RequestMapping("/ctgryList.do")
	@ResponseBody
	public List<PNWVO> ctgryList(HttpSession session, Model model, PNWVO vo) {
		return service.ctgryList(vo);
	}
	
	// 새 프로젝트 : 프로젝트 생성
	@RequestMapping("/prjInsert.do")
	@ResponseBody
	public Map prjInsert(HttpSession session, Model model, PNWVO vo) {
		service.prjInsert(vo);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("project", vo);
		return map;
	}

	// 프로젝트폴더 메뉴
	@RequestMapping("/folderMenu.do")
	@ResponseBody
	public List<PNWVO> folderMenu(HttpSession session, Model model, PNWVO vo) {
		return service.folderMenu(vo);
	}
	
	// 스케쥴 메뉴
	@RequestMapping("/allSchedule.do")
	public String allSchedule(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		model.addAttribute("nwLists",service.allSchedule(vo));
		return "home/allSchedule"; 		
	}
	
	// 프로젝트 폴더 생성하기
	@RequestMapping("/prjFoldInsert.do")
	@ResponseBody
	public String prjFoldInsert(HttpSession session, Model model, PNWVO vo) {
		service.prjFoldInsert(vo);
		return "redirect:folderMenu.do";
	}
	
	// 프로젝트 폴더명 수정하기
	@RequestMapping("/prjFoldUpdate.do")
	@ResponseBody
	public String prjFoldUpdate(HttpSession session, Model model, PNWVO vo) {
		service.prjFoldUpdate(vo);
		return "redirect:folderMenu.do";
	}
	
	// 프로젝트 색깔 수정하기
	@RequestMapping("/prjColorUpdate.do")
	@ResponseBody
	public String prjColorUpdate(HttpSession session, Model model, PNWVO vo) {
		service.prjColorUpdate(vo);
		return "redirect:myProject.do";
	}
	
	@RequestMapping("/prjFolderSet.do")
	@ResponseBody
	public int prjFolderSet(HttpSession session, Model model, PNWVO vo) {
		return service.prjFolderSet(vo);
	}
}
