package com.mnursoy.salesmanager.entity.model;

import java.math.BigDecimal;

/**
 * @author Muhammed Nursoy
 *
 */
public enum Unit {
	BY_PIECE(BigDecimal.valueOf(1), "tane"),
	GR(BigDecimal.valueOf(1000), "gr"),
	KG(BigDecimal.valueOf(1), "kg"),
	LT(BigDecimal.valueOf(1), "lt"),
	ML(BigDecimal.valueOf(1000), "ml");

	private BigDecimal unitAmount;
	private String trName;

	Unit(BigDecimal unitAmount, String trName) {
		this.unitAmount = unitAmount;
		this.trName = trName;
	}

	public BigDecimal getUnitAmount() {
		return unitAmount;
	}

	public String getTrName() {
		return trName;
	}
}
