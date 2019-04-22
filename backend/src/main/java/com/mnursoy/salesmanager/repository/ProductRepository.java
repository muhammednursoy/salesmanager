package com.mnursoy.salesmanager.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.mnursoy.salesmanager.entity.Product;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("select prd from Product prd "
		+ "where "
		+ "lower(prd.name) like concat('%', lower(:name), '%') and "
		+ "(:showDisabledProducts is null or :showDisabledProducts = true or prd.disabled = false) "
		+ "order by prd.name asc")
	Page<Product> searchProducts(@Param("name") String name, @Param("showDisabledProducts") Boolean showDisabledProducts, Pageable pageable);

	@Transactional
	@Modifying
	@Query(value = "update product set disabled = true where id = :id", nativeQuery = true)
	void disable(@Param("id") Long id);

	@Transactional
	@Modifying
	@Query(value = "update product set disabled = false where id = :id", nativeQuery = true)
	void enable(@Param("id") Long id);

}
