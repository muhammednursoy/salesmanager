package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

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
public class PriceRecord extends AbstractEntity {

	@ManyToOne
	private Product product;
	private ProductPrice price;
	private BigDecimal unitPrice;

}
