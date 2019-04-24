package com.mnursoy.salesmanager.entity.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Embeddable
public class ProductPrice {

	@Enumerated(EnumType.STRING)
	private Unit unit;
	private BigDecimal baseAmount;
	private BigDecimal price;

	public BigDecimal getUnitPrice() {
		BigDecimal unitAmount = unit.getUnitAmount();
		return price.multiply(unitAmount).divide(baseAmount, 2,RoundingMode.HALF_UP);
	}

}
