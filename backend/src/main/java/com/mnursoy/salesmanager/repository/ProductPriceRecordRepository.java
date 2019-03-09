package com.mnursoy.salesmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.mnursoy.salesmanager.entity.PriceRecord;

/**
 * @author Muhammed Nursoy
 *
 */
public interface ProductPriceRecordRepository extends JpaRepository<PriceRecord, Long> {
}
