package com.mnursoy.salesmanager.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mnursoy.salesmanager.controller.Request.PriceHistoryRequest;
import com.mnursoy.salesmanager.controller.model.NameAndIdOnly;
import com.mnursoy.salesmanager.controller.model.PriceHistoryResponse;
import com.mnursoy.salesmanager.entity.PriceRecord;
import com.mnursoy.salesmanager.entity.Product;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
import com.mnursoy.salesmanager.repository.ProductPriceRecordRepository;
import com.mnursoy.salesmanager.repository.ProductRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api/products")
public class ProductController {
	private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);

	private final ProductRepository repository;
	private final ProductPriceRecordRepository productPriceRecordRepository;

	@Autowired
	public ProductController(ProductRepository repository, ProductPriceRecordRepository productPriceRecordRepository) {
		this.repository = repository;
		this.productPriceRecordRepository = productPriceRecordRepository;
	}

	@GetMapping("{id}")
	public Product getProduct(@PathVariable("id") Long id) {
		LOG.info("getProduct::id={}",id);
		return repository.findById(id).orElseThrow(ResourceNotFoundException::new);
	}

	@GetMapping
	public Page<Product> searchProducts(String name, Boolean showDisabledProducts, Pageable pageable) {
		LOG.info("searchProducts::name={}, showDisabledProducts={}, pageable={}",name, showDisabledProducts, pageable);
		return repository.searchProducts(name, showDisabledProducts, pageable);
	}

	@GetMapping("list")
	public List<NameAndIdOnly> getProductList() {
		LOG.info("getProductList");
		return repository.findBy();
	}

	@PostMapping("create")
	public long createProduct(@RequestBody Product product) {
		LOG.info("createProduct::product={}",product);
		product.setDisabled(Boolean.FALSE);
		Product entity = repository.save(product);
		recordProductPrice(entity);
		return entity.getId();
	}

	@PatchMapping("update")
	public void updateProduct(@RequestBody Product product) {
		LOG.info("updateProduct::product={}",product);
		Product entity = repository.findById(product.getId()).orElseThrow(ResourceNotFoundException::new);
		boolean productPriceChanged = isProductPriceChanged(product, entity);
		entity.patch(product);
		entity = repository.save(entity);
		if (productPriceChanged) {
			recordProductPrice(entity);
		}
	}

	@PostMapping("disable")
	public void disableProduct(Long id) {
		LOG.info("disableProduct::id={}",id);
		Product product = repository.findById(id).orElseThrow(ResourceNotFoundException::new);
		product.disable();
		repository.save(product);
	}

	@PostMapping("enable")
	public void enableSProduct(Long id) {
		LOG.info("enableProduct::id={}",id);
		Product product = repository.findById(id).orElseThrow(ResourceNotFoundException::new);
		product.enable();
		repository.save(product);
	}

	@GetMapping("price-history")
	public PriceHistoryResponse getPriceHistory(PriceHistoryRequest priceHistoryRequest) {
		LOG.info("getPriceHistory::priceHistoryRequest={}", priceHistoryRequest);
		Calendar endDateCal = priceHistoryRequest.getEndDate();
		Date endDate = null;
		if (endDateCal != null) {
			endDateCal.add(Calendar.DAY_OF_MONTH, 1);
			endDate = new Date(endDateCal.getTimeInMillis());
		}
		Calendar startDateCal = priceHistoryRequest.getStartDate();
		Date startDate = null;
		if (startDateCal != null) {
			startDate = new Date(startDateCal.getTimeInMillis());
		}
		PriceHistoryResponse response = new PriceHistoryResponse();
		response.setProduct(repository.findById(priceHistoryRequest.getProductId()).orElseThrow(ResourceNotFoundException::new));
		response.setRecords(productPriceRecordRepository.searchPriceRecord(priceHistoryRequest.getProductId(), startDate, endDate));
		return response;
	}

	private boolean isProductPriceChanged(Product product, Product entity) {
		return !product.getPrice().getUnitPrice().equals(entity.getPrice().getUnitPrice());
	}

	private void recordProductPrice(Product product) {
		PriceRecord priceRecord = new PriceRecord();
		priceRecord.setPrice(product.getPrice());
		priceRecord.setProduct(product);
		priceRecord.setUnitPrice(product.getPrice().getUnitPrice());
		productPriceRecordRepository.save(priceRecord);
	}
}
