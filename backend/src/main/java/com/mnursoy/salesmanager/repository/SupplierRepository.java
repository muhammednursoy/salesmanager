package com.mnursoy.salesmanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mnursoy.salesmanager.entity.Supplier;

/**
 * @author Muhammed Nursoy
 *
 */
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

	@Query("select supp from Supplier supp "
		+ "where "
		+ "lower(supp.name) like concat('%', lower(:name), '%') "
		+ "order by supp.name asc")
	Page<Supplier> searchSupplier(@Param("name") String name, Pageable pageable);
}
