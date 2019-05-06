package com.mnursoy.salesmanager.controller;

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

import com.mnursoy.salesmanager.entity.Supplier;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
import com.mnursoy.salesmanager.repository.SupplierRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api/suppliers")
public class SupplierController {
	private static final Logger LOG = LoggerFactory.getLogger(SupplierController.class);

	private final SupplierRepository repository;

	@Autowired
	public SupplierController(SupplierRepository repository) {
		this.repository = repository;
	}

	@GetMapping("{id}")
	public Supplier getSupplier(@PathVariable("id") Long id) {
		LOG.info("getSupplier::id={}",id);
		return repository.findById(id).orElseThrow(ResourceNotFoundException::new);
	}

	@GetMapping
	public Page<Supplier> searchSupplier(String name, Pageable pageable) {
		LOG.info("searchSupplier::name={}, pageable={}",name, pageable);
		return repository.searchSupplier(name, pageable);
	}

	@GetMapping("list")
	public List<Supplier> getSupplierList() {
		LOG.info("getSupplierList");
		return repository.findAll();
	}

	@PostMapping("create")
	public long createSupplier(@RequestBody Supplier supplier) {
		LOG.info("createSupplier::supplier={}",supplier);
		Supplier entity = repository.save(supplier);
		return entity.getId();
	}

	@PatchMapping("update")
	public void updateSupplier(@RequestBody Supplier supplier) {
		LOG.info("updateSupplier::supplier={}",supplier);
		Supplier entity = repository.findById(supplier.getId()).orElseThrow(ResourceNotFoundException::new);
		entity.patch(supplier);
		repository.save(entity);
	}
}
