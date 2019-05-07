package com.mnursoy.salesmanager.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mnursoy.salesmanager.controller.model.MonthlyReport;
import com.mnursoy.salesmanager.entity.ShoppingBasket;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ShoppingBasketRepository extends JpaRepository<ShoppingBasket, Long> {

	@Query(value = "select date_trunc('month', created_at) AS month, sum(total_price) as value "
		+ "from shopping_basket where "
		+ "(date_trunc('month', created_at) >= cast(:fromDate as date)) and "
		+ "(date_trunc('month', created_at) <= cast(:toDate as date)) and "
		+ "(disabled = false)"
		+ "group by month", nativeQuery = true)
	List<MonthlyReport> getMonthlyIncome(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);
}
