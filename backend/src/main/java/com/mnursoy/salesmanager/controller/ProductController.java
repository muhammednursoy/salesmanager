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

import com.mnursoy.salesmanager.entity.Product;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
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

	@Autowired
	public ProductController(ProductRepository repository) {
		this.repository = repository;
	}

	@GetMapping("{id}")
	public Product getProduct(@PathVariable("id") Long id) {
		LOG.info("getProduct::id={}",id);
		return repository.findById(id).orElseThrow(ResourceNotFoundException::new);
	}

	@GetMapping
	public Page<Product> searchProducts(String name, Pageable pageable) {
		LOG.info("searchProducts::name={}, pageable={}",name, pageable);
		return repository.searchProducts(name, pageable);
	}

	@PostMapping("create")
	public long createProduct(@RequestBody Product product) {
		LOG.info("createProduct::product={}",product);
		return repository.save(product).getId();
	}

	@PatchMapping("update")
	public void updateProduct(@RequestBody Product product) {
		LOG.info("updateProduct::product={}",product);
		Product entity = repository.findById(product.getId()).orElseThrow(ResourceNotFoundException::new);
		entity.patch(product);
		repository.save(product);
	}

}
