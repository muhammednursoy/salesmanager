package com.mnursoy.salesmanager.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

public class CORSFilter extends GenericFilterBean {

	@Value("${allow.CORS:false}")
	private Boolean allowCORS = false;

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) servletRequest;
		final HttpServletResponse response = (HttpServletResponse) servletResponse;

		if (!request.getMethod().equals("OPTIONS")) {
			filterChain.doFilter(request, response);
			return;
		}

		if (BooleanUtils.isNotTrue(allowCORS)) {
			response.setStatus(HttpStatus.METHOD_NOT_ALLOWED.value());
			return;
		}

		response.setStatus(HttpStatus.OK.value());
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
	}
}
