package com.mnursoy.salesmanager.entity;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class Product extends AbstractEntity {

	private String name;
	private String description;
	@Embedded
	private ProductPrice price;
	@ManyToOne
	private Category category;
	@ManyToOne
	private Supplier supplier;

}
