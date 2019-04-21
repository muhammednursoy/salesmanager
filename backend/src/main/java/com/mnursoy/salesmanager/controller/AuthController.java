package com.mnursoy.salesmanager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api")
public class AuthController {

	@GetMapping("validate-login")
	public Map login() {
		return new HashMap<>();
	}
}
