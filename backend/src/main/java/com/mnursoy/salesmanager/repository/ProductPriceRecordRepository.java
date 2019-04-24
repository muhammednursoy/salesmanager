package com.mnursoy.salesmanager.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mnursoy.salesmanager.entity.PriceRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductPriceRecordRepository extends JpaRepository<PriceRecord, Long> {

	@Query(value = "select pr from PriceRecord pr where "
		+ "pr.product.id = :productId and "
		+ "(cast(:startDate as date) is null or pr.createdAt >= :startDate) and "
		+ "(cast(:endDate as date) is null or pr.createdAt <= :endDate) "
		+ "order by created_at desc ")
	List<PriceRecord> searchPriceRecord(@Param("productId") Long productId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
