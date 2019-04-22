package com.mnursoy.salesmanager.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Contact extends AbstractEntity {

	private String name;
	private String phone;
	private String address;
	@ManyToOne
	private Supplier supplier;

}
