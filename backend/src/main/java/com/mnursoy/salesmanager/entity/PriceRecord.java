package com.mnursoy.salesmanager.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class PriceRecord extends AbstractEntity {

	@ManyToOne
	private Product product;
	private ProductPrice price;

}
