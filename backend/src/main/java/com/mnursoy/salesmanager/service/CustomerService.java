package com.mnursoy.salesmanager.service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mnursoy.salesmanager.controller.model.EmailAndIdOnly;
import com.mnursoy.salesmanager.entity.Customer;
import com.mnursoy.salesmanager.entity.SaleRecord;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
import com.mnursoy.salesmanager.mailing.EmailService;
import com.mnursoy.salesmanager.mailing.Mail;
import com.mnursoy.salesmanager.mailing.ShoppingHistoryMailModel;
import com.mnursoy.salesmanager.repository.CustomerRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@Service
public class CustomerService {

	private final CustomerRepository customerRepository;
	private final EmailService emailService;

	@Autowired
	public CustomerService(CustomerRepository customerRepository, EmailService emailService) {
		this.customerRepository = customerRepository;
		this.emailService = emailService;
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

	public Optional<Customer> getCustomer(Long id) {
		return customerRepository.findById(id);
	}

	public void sendShoppingHistoryMail(Long id) throws MessagingException {
		Customer customer = getCustomer(id).orElseThrow(ResourceNotFoundException::new);
		Mail mail = new Mail();
		mail.setFrom("bukoopsalesmanager@gmail.com");
		mail.setTo(customer.getEmail());
		mail.setSubject("BuKoop Alışveriş Detaylarınız");

		Map model = new HashMap();
		model.put("records", customer.getBaskets().stream().flatMap(shoppingBasket -> shoppingBasket.getSaleRecords().stream().map(this::getMailModel)).collect(Collectors.toSet()));
		mail.setModel(model);

		emailService.sendSimpleMessage(mail);
	}

	private ShoppingHistoryMailModel getMailModel(SaleRecord saleRecord) {
		ShoppingHistoryMailModel mailModel = new ShoppingHistoryMailModel();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		mailModel.setDate(sdf.format(saleRecord.getCreatedAt()));
		mailModel.setProductName(saleRecord.getSoldProduct().getName());
		mailModel.setAmount(saleRecord.getSaleAmount());
		mailModel.setUnit(saleRecord.getPrice().getUnit().getTrName());
		mailModel.setPrice(saleRecord.getCollectedCash());
		return mailModel;
	}
}
