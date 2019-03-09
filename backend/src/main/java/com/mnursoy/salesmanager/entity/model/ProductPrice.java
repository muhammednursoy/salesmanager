package com.mnursoy.salesmanager.entity.model;

import java.math.BigDecimal;

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
	private ProductPriceUnit unit;
	private Double unitAmount;
	private BigDecimal price;

}
