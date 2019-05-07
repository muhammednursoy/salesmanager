package com.mnursoy.salesmanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.controller.model.EmailAndIdOnly;
import com.mnursoy.salesmanager.entity.Customer;

/**
 * @author Muhammed Nursoy
 *
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Optional<Customer> findByEmail(String email);

	List<EmailAndIdOnly> findBy();
}
