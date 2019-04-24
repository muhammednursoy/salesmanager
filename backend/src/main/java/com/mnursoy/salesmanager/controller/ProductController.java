package com.mnursoy.salesmanager.controller;

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
		repository.disable(id);
	}

	@PostMapping("enable")
	public void enableSProduct(Long id) {
		LOG.info("enableProduct::id={}",id);
		repository.enable(id);
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
