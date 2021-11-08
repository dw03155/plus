package co.plus.prj;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@WebFilter("*.do")
public class loginFilter implements Filter{
	
	public void destroy() {
		
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpSession session = httpRequest.getSession(false);
		
		String uri = httpRequest.getRequestURI();
		String contextPath = httpRequest.getContextPath();
		String page = uri.substring(contextPath.length());
		
		boolean login = false;
		if(session != null) {
			if(session.getAttribute("memId") != null) {
				login = true;
			}
			if(page.equals("companyJoin.do") || page.equals("adminJoin.do") || page.equals("userJoin.do") ) {
				login = true;
			}
		}
		
		if(login) {
			chain.doFilter(request, response);
		} else {
			RequestDispatcher dispatcher = request.getRequestDispatcher("/home.do");
			dispatcher.forward(request, response);
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
