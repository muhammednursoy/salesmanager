package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.SaleBasket;

/**
 * @author Muhammed Nursoy
 *
 */
public interface SaleBasketRepository extends JpaRepository<SaleBasket, Long> {

}
