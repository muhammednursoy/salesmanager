package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.ShoppingBasket;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ShoppingBasketRepository extends JpaRepository<ShoppingBasket, Long> {

}
