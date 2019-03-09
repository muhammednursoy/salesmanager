package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.Contact;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductSupplierContactRepository extends JpaRepository<Contact, Long> {
}
