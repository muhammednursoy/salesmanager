package com.mnursoy.salesmanager.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class ShoppingBasket extends AbstractEntity {

	@OneToMany(cascade = CascadeType.ALL)
	private Set<SaleRecord> saleRecords;
	@ManyToOne
	private Customer customer;

}
