package com.mnursoy.salesmanager.controller.model;

import java.util.List;

import com.mnursoy.salesmanager.entity.PriceRecord;
import com.mnursoy.salesmanager.entity.Product;

import lombok.Data;

/**
 * @author Muhammed Nursoy
 *
 */
@Data
public class PriceHistoryResponse {
	private Product product;
	private List<PriceRecord> records;
}
