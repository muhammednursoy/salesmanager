package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.Category;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductCategoryRepository extends JpaRepository<Category, Long> {
}
