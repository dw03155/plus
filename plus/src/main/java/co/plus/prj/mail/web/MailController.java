package co.plus.prj.mail.web;

import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MailController {
	@Autowired
	private JavaMailSender mailSender;
	
	@RequestMapping(value="/joinMail.do", method = RequestMethod.POST)
	@ResponseBody
	public String joinMail(String email, HttpSession session,Model model) {
		Random random = new Random();
		String key = "";
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		for(int i = 0; i<3; i++) {
			int index = random.nextInt(25)+65;
			key += (char)index;
		}
		int numIndex = random.nextInt(9999)+1000;
		key +=numIndex;
		System.out.println(key);
		message.setSubject("플러스 인증번호");
		message.setText("인증번호: "+key);
		mailSender.send(message);
		
		return key;
	}

}
