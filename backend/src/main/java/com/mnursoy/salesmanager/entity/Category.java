package com.mnursoy.salesmanager.entity;

import javax.persistence.Entity;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
@Entity
public class Category extends AbstractEntity {

	private String name;

}
