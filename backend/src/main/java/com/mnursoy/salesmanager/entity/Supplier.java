package com.mnursoy.salesmanager.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Supplier extends AbstractEntity {

	private String name;
	private String address;
	private String phone;
	private String email;
	private String description;

	public void patch(Supplier supplier) {
		setName(supplier.getName());
		setAddress(supplier.getAddress());
		setPhone(supplier.getPhone());
		setEmail(supplier.getEmail());
		setDescription(supplier.getDescription());
	}
}
