package co.plus.prj.pnw.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import co.plus.prj.pnw.service.PNWService;

@Controller
public class PNWController {
	@Autowired
	private PNWService service;

}
