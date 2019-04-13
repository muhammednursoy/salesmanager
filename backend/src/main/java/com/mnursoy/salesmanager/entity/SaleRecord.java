package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class SaleRecord extends AbstractEntity {

	private BigDecimal amount;
	@OneToOne
	private Product soldProduct;
	private BigDecimal collectedCash;
	@ManyToOne
	private PriceRecord priceRecord;
	@ManyToOne
	private SaleBasket basket;

}
