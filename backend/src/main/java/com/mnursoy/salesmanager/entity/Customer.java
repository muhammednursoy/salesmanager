package com.mnursoy.salesmanager.entity;

import java.util.Set;

import javax.persistence.Entity;
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
public class Customer extends AbstractEntity {

	private String email;
	@OneToMany
	private Set<ShoppingBasket> baskets;

}
