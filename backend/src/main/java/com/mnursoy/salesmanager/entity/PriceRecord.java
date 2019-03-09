package com.mnursoy.salesmanager.entity;

import java.util.Date;

import javax.persistence.Entity;

import com.mnursoy.salesmanager.entity.model.ProductPrice;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class PriceRecord extends AbstractEntity {

	private Long productId;
	private ProductPrice price;
	private Date activationDate;

}
