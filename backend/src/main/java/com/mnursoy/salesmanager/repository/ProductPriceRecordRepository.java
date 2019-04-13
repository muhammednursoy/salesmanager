package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.PriceRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductPriceRecordRepository extends JpaRepository<PriceRecord, Long> {
}
