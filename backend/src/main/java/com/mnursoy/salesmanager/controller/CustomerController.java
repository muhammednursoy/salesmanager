package com.mnursoy.salesmanager.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mnursoy.salesmanager.controller.model.EmailAndIdOnly;
import com.mnursoy.salesmanager.service.CustomerService;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api/customers")
public class CustomerController {
	private static final Logger LOG = LoggerFactory.getLogger(CustomerController.class);

	private final CustomerService customerService;

	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping("list")
	public List<EmailAndIdOnly> getCustomers() {
		return customerService.getCustomers();
	}

	@PostMapping("send-shopping-history-mail")
	public void sendShoppingHistoryMail(Long id) throws MessagingException {
		customerService.sendShoppingHistoryMail(id);
	}

}
