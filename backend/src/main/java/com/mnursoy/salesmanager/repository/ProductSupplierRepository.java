package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.Supplier;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductSupplierRepository extends JpaRepository<Supplier, Long> {
}
