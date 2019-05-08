package com.mnursoy.salesmanager.entity;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@ToString(callSuper = true)
@Entity
public class Product extends AbstractEntity {

	private String name;
	@Column(length = 1000)
	private String description;
	@JsonUnwrapped
	@Embedded
	private ProductPrice price;
	@ManyToOne
	private Category category;
	@ManyToOne
	private Supplier supplier;
	private Boolean disabled = Boolean.FALSE;

	public void patch(Product product) {
		name = product.getName();
		description = product.getDescription();
		price = product.getPrice();
		category = product.getCategory();
		supplier = product.getSupplier();
	}

	public void disable() {
		setDisabled(true);
	}

	public void enable() {
		setDisabled(false);
	}
}
