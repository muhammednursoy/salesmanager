package com.mnursoy.salesmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mnursoy.salesmanager.controller.model.EmailAndIdOnly;
import com.mnursoy.salesmanager.entity.Customer;
import com.mnursoy.salesmanager.repository.CustomerRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@Service
public class CustomerService {

	private final CustomerRepository customerRepository;

	@Autowired
	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	public List<EmailAndIdOnly> getCustomers() {
		return customerRepository.findBy();
	}

	public Customer getOrCreateCustomer(Customer customer) {
		return customerRepository.findByEmail(customer.getEmail()).orElseGet(() -> getNewCustomer(customer.getEmail()));
	}

	private Customer getNewCustomer(String email) {
		final Customer customer = new Customer();
		customer.setEmail(email);
		return customer;
	}
}
