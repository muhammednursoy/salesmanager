package com.mnursoy.salesmanager.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class ShoppingBasket extends AbstractEntity {

	@OneToMany(cascade = CascadeType.ALL)
	private Set<SaleRecord> saleRecords;
	@ManyToOne
	private Customer customer;

}
