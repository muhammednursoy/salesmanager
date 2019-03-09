package com.mnursoy.salesmanager.entity;

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
public class Supplier extends AbstractEntity {

	private String name;
	@OneToMany
	private Set<Contact> contact;

}
