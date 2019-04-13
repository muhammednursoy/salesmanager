package com.mnursoy.salesmanager.entity;

import java.util.Date;

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
public class PriceRecord extends AbstractEntity {

	@ManyToOne
	private Product product;
	private ProductPrice price;

}
