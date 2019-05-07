package com.mnursoy.salesmanager.controller.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author Muhammed Nursoy
 *
 */
public interface MonthlyReport {
	BigDecimal getValue();

	Date getMonth();
}
