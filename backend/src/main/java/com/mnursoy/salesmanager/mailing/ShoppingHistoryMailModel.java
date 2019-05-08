package com.mnursoy.salesmanager.mailing;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
public class ShoppingHistoryMailModel {
	private String date;
	private String productName;
	private BigDecimal amount;
	private String unit;
	private BigDecimal price;
}
