package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mnursoy.salesmanager.entity.SaleRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface SaleRecordRepository extends JpaRepository<SaleRecord, Long> {
}
