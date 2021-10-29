package co.plus.prj;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class menuController {

	@RequestMapping(value = "/allTask.do", method = RequestMethod.GET)
	public String allTask() {
		return "home/allTask";

	}

}
