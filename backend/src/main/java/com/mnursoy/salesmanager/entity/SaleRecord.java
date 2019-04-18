package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.mnursoy.salesmanager.entity.model.ProductPrice;

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
	@JsonUnwrapped
	@Embedded
	private ProductPrice price;

}
