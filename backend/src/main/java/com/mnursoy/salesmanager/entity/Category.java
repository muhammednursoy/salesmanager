package com.mnursoy.salesmanager.entity;

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
public class Category extends AbstractEntity {

	private String name;

}
