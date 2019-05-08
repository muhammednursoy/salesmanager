package com.mnursoy.salesmanager.entity;

import java.math.BigDecimal;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true, exclude="customer")
@ToString(exclude = "customer")
@Getter
@Setter
@Entity
public class ShoppingBasket extends AbstractEntity {

	@OneToMany(cascade = CascadeType.ALL)
	private Set<SaleRecord> saleRecords;
	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	private Customer customer;
	private BigDecimal totalPrice = new BigDecimal(0);
	private Boolean disabled = Boolean.FALSE;

	public void disable() {
		setDisabled(true);
		getSaleRecords().forEach(SaleRecord::disable);
	}

	public void enable() {
		setDisabled(false);
		getSaleRecords().forEach(SaleRecord::enable);
	}
}
