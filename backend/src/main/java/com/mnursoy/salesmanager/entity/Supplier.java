package com.mnursoy.salesmanager.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
public class Supplier extends AbstractEntity {

	private String name;
	private String address;
	private String phone;
	private String email;
	@Column(length = 1000)
	private String description;

	public void patch(Supplier supplier) {
		setName(supplier.getName());
		setAddress(supplier.getAddress());
		setPhone(supplier.getPhone());
		setEmail(supplier.getEmail());
		setDescription(supplier.getDescription());
	}
}
