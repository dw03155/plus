package co.plus.prj.company.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.plus.prj.company.serivce.CompanyService;
import co.plus.prj.company.vo.CompanyVO;

@Controller
public class CompanyController {
	@Autowired
	CompanyService service;
	
	@RequestMapping(value = "/getCompany.do", method = RequestMethod.GET)
	@ResponseBody
	public CompanyVO getCompany(@RequestParam("coUrl") String coUrl,
			CompanyVO vo,Model model) {
		vo.setCoUrl(coUrl);
		CompanyVO temp = service.getCompany(vo);
		return temp;
		
	}
}
