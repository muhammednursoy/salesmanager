package com.mnursoy.salesmanager.entity;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@ToString(callSuper = true)
@Entity
public class Product extends AbstractEntity {

	private String name;
	private String description;
	@JsonUnwrapped
	@Embedded
	private ProductPrice price;
	@ManyToOne
	private Category category;
	@ManyToOne
	private Supplier supplier;

	public void patch(Product product) {
		name = product.getName();
		description = product.getDescription();
		price = product.getPrice();
		category = product.getCategory();
		supplier = product.getSupplier();
	}
}
