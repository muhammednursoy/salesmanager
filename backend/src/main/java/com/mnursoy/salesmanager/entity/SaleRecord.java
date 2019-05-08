package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
public class SaleRecord extends AbstractEntity {

	private BigDecimal saleAmount;
	@ManyToOne
	private Product soldProduct;
	private BigDecimal collectedCash;
	@JsonUnwrapped
	@Embedded
	private ProductPrice price;
	private Boolean disabled = Boolean.FALSE;

	public void disable() {
		setDisabled(true);
	}

	public void enable() {
		setDisabled(false);
	}
}
