package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.Product;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
