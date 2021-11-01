package co.plus.prj;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class menuController {

	@RequestMapping(value = "/myProject.do", method = RequestMethod.GET)
	public String myProject() {
		return "home/myProject";

	}
	
	@RequestMapping(value = "/allSchedule.do", method = RequestMethod.GET)
	public String allSchedule() {
		return "home/allSchedule";

	}
	
}
