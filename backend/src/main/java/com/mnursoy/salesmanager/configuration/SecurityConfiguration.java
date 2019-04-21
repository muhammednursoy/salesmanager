package com.mnursoy.salesmanager.configuration;

import java.util.Collections;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;

/**
 * @author Muhammed Nursoy
 *
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	private static final String LOGOUT_URL = "/api/logout";
	private static final String LOGIN_URL = "/api/login";

	@Value("${app.username}")
	private String username;

	@Value("${app.password}")
	private String password;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this::loadUserByUsername);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.logout()
			.logoutSuccessHandler(logoutSuccessHandler())
			.logoutUrl(LOGOUT_URL)
			.addLogoutHandler(securityContextLogoutHandler())
			.and()

			.addFilterBefore(authenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class)

			.authenticationProvider(authenticationProvider())
			.authorizeRequests()
			.mvcMatchers("/api/**").authenticated()
			.anyRequest().permitAll()
			.and()

			.csrf() //
			.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) //
			.and() //
		;
	}

	private UsernamePasswordAuthenticationFilter authenticationProcessingFilter() throws Exception {
		UsernamePasswordAuthenticationFilter filter = new UsernamePasswordAuthenticationFilter();
		filter.setAuthenticationManager(authenticationManager());
		filter.setFilterProcessesUrl(LOGIN_URL);
		filter.setAuthenticationFailureHandler(authenticationFailureHandler());
		filter.setAuthenticationSuccessHandler(authenticationSuccessHandler());
		return filter;
	}

	@Override
	public void configure(WebSecurity web) {
		web.ignoring() //
			.antMatchers("/**/*.js") //
			.antMatchers("/**/*.json") //
			.antMatchers("/**/*.css") //
			.antMatchers("/**/*.jpg") //
			.antMatchers("/**/*.png") //
			.antMatchers("/**/*.gif") //
			.antMatchers("/**/*.svg") //
			.antMatchers("/**/*.ico") //
			.antMatchers("/**/*.html");
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		authenticationProvider.setUserDetailsService(this::loadUserByUsername);
		return authenticationProvider;
	}

	@Bean
	public MappingJackson2HttpMessageConverter jacksonMessageConverter() {
		final MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setSupportedMediaTypes(Lists.newArrayList(MediaType.APPLICATION_JSON));
		converter.setObjectMapper(new ObjectMapper());
		return converter;
	}

	@Bean
	public SecurityContextLogoutHandler securityContextLogoutHandler() {
		return new SecurityContextLogoutHandler();
	}

	private UserDetails loadUserByUsername(String username) {
		if (!this.username.equals(username)) {
			throw new UsernameNotFoundException("User not found!");
		}
		return new User(this.username, this.password, Collections.singletonList(new SimpleGrantedAuthority("USER")));
	}

	private AuthenticationSuccessHandler authenticationSuccessHandler() {
		return (request, response, authentication) -> {
			final HttpSession session = request.getSession(false);
			if (session == null) {
				return;
			}

			session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		};
	}

	private AuthenticationFailureHandler authenticationFailureHandler() {
		return (request, response, exception) -> {
			if (exception instanceof BadCredentialsException) {
				response.setStatus(HttpStatus.UNAUTHORIZED.value());
				return;
			}
			response.setStatus(HttpStatus.BAD_REQUEST.value());
		};
	}

	private LogoutSuccessHandler logoutSuccessHandler() {
		return (request, response, authentication) -> { };
	}
}
