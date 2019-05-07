package com.mnursoy.salesmanager.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mnursoy.salesmanager.entity.Product;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
import com.mnursoy.salesmanager.repository.ProductRepository;
import com.mnursoy.salesmanager.repository.SaleRecordRepository;
import com.mnursoy.salesmanager.repository.ShoppingBasketRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api/reports")
public class ReportController {
	private static final Logger LOG = LoggerFactory.getLogger(ReportController.class);
	private static final String ALL_PRODUCTS = "All";

	private final ShoppingBasketRepository shoppingBasketRepository;
	private final ProductRepository productRepository;
	private final SaleRecordRepository saleRecordRepository;

	@Autowired
	public ReportController(ShoppingBasketRepository shoppingBasketRepository, ProductRepository productRepository,
		SaleRecordRepository saleRecordRepository) {
		this.shoppingBasketRepository = shoppingBasketRepository;
		this.productRepository = productRepository;
		this.saleRecordRepository = saleRecordRepository;
	}

	@GetMapping("income/monthly")
	public List<Map<String, Object>> getMonthlyIncome(@RequestParam("productIds") List<String> productIds, @DateTimeFormat(pattern = "dd/MM/yyyy") Date fromDate,
		@DateTimeFormat(pattern = "dd/MM/yyyy") Date toDate) {
		List<Map<String, Object>> response = new ArrayList<>();
		productIds.forEach(id -> {
			Map<String, Object> incomeMap = new HashMap<>();
			if (id.equals(ALL_PRODUCTS)) {
				incomeMap.put("product", "Tümü");
				incomeMap.put("values", shoppingBasketRepository.getMonthlyIncome(fromDate, toDate));
			} else {
				Product product = productRepository.findById(Long.valueOf(id)).orElseThrow(ResourceNotFoundException::new);
				incomeMap.put("product", product.getName());
				incomeMap.put("values", saleRecordRepository.getMonthlyIncome(product.getId(), fromDate, toDate));
			}
			response.add(incomeMap);
		});

		return response;
	}

	@GetMapping("sales/monthly")
	public List<Map<String, Object>> getMonthlySales(@RequestParam("productIds") List<String> productIds, @DateTimeFormat(pattern = "dd/MM/yyyy") Date fromDate,
		@DateTimeFormat(pattern = "dd/MM/yyyy") Date toDate) {
		List<Map<String, Object>> response = new ArrayList<>();
		productIds.forEach(id -> {
			Map<String, Object> incomeMap = new HashMap<>();
			Product product = productRepository.findById(Long.valueOf(id)).orElseThrow(ResourceNotFoundException::new);
			incomeMap.put("product", product.getName());
			incomeMap.put("unit", product.getPrice().getUnit());
			incomeMap.put("values", saleRecordRepository.getMonthlySales(product.getId(), fromDate, toDate));
			response.add(incomeMap);
		});

		return response;
	}

}
