package com.mnursoy.salesmanager.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mnursoy.salesmanager.controller.model.MonthlyReport;
import com.mnursoy.salesmanager.entity.SaleRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface SaleRecordRepository extends JpaRepository<SaleRecord, Long> {

	@Query(value = "select date_trunc('month', created_at) AS month, sum(collected_cash) as value "
		+ "from sale_record where "
		+ "(sold_product_id = :productId) and "
		+ "(date_trunc('month', created_at) >= cast(:fromDate as date)) and "
		+ "(date_trunc('month', created_at) <= cast(:toDate as date)) and "
		+ "(disabled = false)"
		+ "group by month", nativeQuery = true)
	List<MonthlyReport> getMonthlyIncome(@Param("productId") Long productId, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

	@Query(value = "select date_trunc('month', created_at) AS month, sum(sale_amount) as value "
		+ "from sale_record where "
		+ "(sold_product_id = :productId) and "
		+ "(date_trunc('month', created_at) >= cast(:fromDate as date)) and "
		+ "(date_trunc('month', created_at) <= cast(:toDate as date)) and "
		+ "(disabled = false)"
		+ "group by month", nativeQuery = true)
	List<MonthlyReport> getMonthlySales(@Param("productId") Long productId, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate);
}
