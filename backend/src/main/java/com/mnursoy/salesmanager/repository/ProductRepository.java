package com.mnursoy.salesmanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mnursoy.salesmanager.entity.Product;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("select prd from Product prd where lower(prd.name) like concat('%', lower(:name), '%') order by prd.name asc")
	Page<Product> searchProducts(@Param("name") String name, Pageable pageable);
}
