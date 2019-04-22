package com.mnursoy.salesmanager.entity;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Muhammed Nursoy
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends AbstractEntity {

	private String name;

}
