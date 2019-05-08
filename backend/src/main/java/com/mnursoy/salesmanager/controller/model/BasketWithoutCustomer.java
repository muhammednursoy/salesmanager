package com.mnursoy.salesmanager.controller.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import com.mnursoy.salesmanager.entity.SaleRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface BasketWithoutCustomer {
	Long getId();

	Set<SaleRecord> getSaleRecords();

	Date getCreatedAt();

	BigDecimal getTotalPrice();

	Boolean getDisabled();
}
