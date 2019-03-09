package com.mnursoy.salesmanager.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class SaleBasket extends AbstractEntity {

	@OneToMany
	private Set<SaleRecord> saleRecords;
	private Date purchaseDate;

}
