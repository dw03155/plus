package co.plus.prj.pnw.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import co.plus.prj.pnw.service.PNWService;

@Controller
public class PNWController {
	@Autowired
	private PNWService service;


}
