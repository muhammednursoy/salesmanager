package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.mnursoy.salesmanager.entity.model.Currency;
import com.mnursoy.salesmanager.entity.model.ProductPriceUnit;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class SaleRecord extends AbstractEntity {

	private Double amount;
	@Enumerated(EnumType.STRING)
	private ProductPriceUnit unit;
	@OneToOne
	private Product soldProduct;
	private BigDecimal collectedCash;
	private Currency currency;
	private Date purchaseDate;
	@ManyToOne
	private SaleBasket basket;

}
