package co.plus.prj.pnw.web;

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

	// 전체 프로젝트(**)
	@RequestMapping(value = "/openProject.do", method = RequestMethod.GET)
	public String cProject(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
		model.addAttribute("favorPrjs", service.favorMyPrj(vo));
		model.addAttribute("noPrjs", service.noMyPrj(vo));
		return "pnw/openProject";

	}

	// 프로젝트 홈탭
	@RequestMapping(value = "/prjHome.do", method = RequestMethod.POST)
	public String prjHome(HttpSession session, Model model, PNWVO vo) {
		vo.setMemId((String) session.getAttribute("memId"));
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
	@RequestMapping(value = "/ctgryKnd.do", method = RequestMethod.POST)
	@ResponseBody
	public List<PNWVO> ctgryKnd(HttpSession session, Model model, PNWVO vo) {
		return service.ctgryKnd(vo);
	}
	
	// 새 프로젝트 (프로젝트 입력 처리)
	@RequestMapping(value = "/prjInsert.do", method = RequestMethod.POST)
	public String prjInsert(HttpSession session, Model model, PNWVO vo) {
		vo.setPrjTtl((String) model.getAttribute("prjTtlInput"));
		vo.setPrjCntn((String) model.getAttribute("prjCntnInput"));
		vo.setPrjKnd((String) model.getAttribute("prjKndSet"));
		vo.setCtgryId((String) model.getAttribute("ctgryIdSet"));
		vo.setPrjOpenPerm((String) model.getAttribute("prjOpenPermSet"));
		vo.setCoUrl((String) session.getAttribute("coUrl"));
		
		service.prjInsert(vo);
		return "myProject.do";
	}
	// 폴더 메뉴
	@RequestMapping(value = "/FolderMenu.do",  method = RequestMethod.POST)
	@ResponseBody
	public List<PNWVO> FolderMenu(HttpSession session, Model model, PNWVO vo) {
		return service.FolderMenu(vo);
	}
	
	
}
