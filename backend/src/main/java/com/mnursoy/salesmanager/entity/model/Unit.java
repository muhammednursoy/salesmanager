package com.mnursoy.salesmanager.entity.model;

import java.math.BigDecimal;

/**
 * @author Muhammed Nursoy
 *
 */
public enum Unit {
	BY_PIECE(BigDecimal.valueOf(1)),
	GR(BigDecimal.valueOf(1000)),
	KG(BigDecimal.valueOf(1)),
	LT(BigDecimal.valueOf(1)),
	ML(BigDecimal.valueOf(1000));

	private BigDecimal unitAmount;

	Unit(BigDecimal unitAmount) {
		this.unitAmount = unitAmount;
	}

	public BigDecimal getUnitAmount() {
		return unitAmount;
	}
}
