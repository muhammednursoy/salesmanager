package com.mnursoy.salesmanager.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true, exclude = "baskets")
@ToString(exclude = "baskets")
@Getter
@Setter
@Entity
public class Customer extends AbstractEntity {

	@Column(unique = true)
	private String email;
	@OneToMany
	private Set<ShoppingBasket> baskets = new HashSet<>();

	public void addBasket(ShoppingBasket basket) {
		getBaskets().add(basket);
	}
}
